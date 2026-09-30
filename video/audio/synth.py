"""Procedural soundtrack + sound design for the promo videos.

Everything is synthesised from the cue sheets in src/videos/*.cues.json, so
the music is royalty-free by construction and every impact, whoosh and
glitch lands on the exact frame the visuals use.

Usage: python3 audio/synth.py [AntoineOS|Trailer|CodeToReality ...]
Writes public/audio/<id>.wav (48 kHz, 16-bit stereo).
"""

import json
import sys
from pathlib import Path

import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, fftconvolve, sosfilt, sosfilt_zi

SR = 48000
FPS = 30
ROOT = Path(__file__).resolve().parent.parent
rng = np.random.default_rng(7)


def fs(frame):
    return int(round(frame / FPS * SR))


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def env_adsr(n, a=0.005, d=0.1, s=0.7, r=0.2, sustain_len=None):
    """Sample-accurate ADSR. `sustain_len` (s) is held before release."""
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    hold = n - a_n - d_n - r_n if sustain_len is None else int(sustain_len * SR)
    hold = max(hold, 0)
    e = np.concatenate(
        [
            np.linspace(0, 1, a_n, endpoint=False),
            np.linspace(1, s, d_n, endpoint=False),
            np.full(hold, s),
            np.linspace(s, 0, r_n),
        ]
    )
    return np.pad(e, (0, max(0, n - len(e))))[:n]


def exp_env(n, tau):
    return np.exp(-np.arange(n) / (tau * SR))


def phase_of(freq, n):
    f = np.broadcast_to(np.asarray(freq, dtype=float), (n,))
    return np.cumsum(f) / SR


def sine(freq, n, ph=0.0):
    return np.sin(2 * np.pi * (phase_of(freq, n) + ph))


def saw(freq, n, ph=0.0):
    # PolyBLEP keeps the high notes from aliasing into metallic hash
    f = np.broadcast_to(np.asarray(freq, dtype=float), (n,))
    t = (phase_of(f, n) + ph) % 1.0
    dt = np.clip(f / SR, 1e-6, 0.5)
    y = 2 * t - 1
    m1 = t < dt
    x = t[m1] / dt[m1]
    y[m1] -= x + x - x * x - 1
    m2 = t > 1 - dt
    x = (t[m2] - 1) / dt[m2]
    y[m2] -= x * x + x + x + 1
    return y


def square(freq, n, ph=0.0):
    return saw(freq, n, ph) - saw(freq, n, ph + 0.5)


def noise(n):
    return rng.standard_normal(n)


def filt(x, kind, cutoff, order=2):
    cutoff = np.clip(cutoff, 20, SR / 2 - 100)
    sos = butter(order, cutoff, btype=kind, fs=SR, output="sos")
    return sosfilt(sos, x, axis=0)


def sweep(x, kind, cutoffs, block=256, order=2):
    """Time-varying filter: coefficients per block, state carried across."""
    x = np.asarray(x, dtype=float)
    cut = np.broadcast_to(np.asarray(cutoffs, dtype=float), (len(x),))
    out = np.empty_like(x)
    zi = None
    for i in range(0, len(x), block):
        c = float(np.clip(cut[i], 25, SR / 2 - 200))
        sos = butter(order, c, btype=kind, fs=SR, output="sos")
        if zi is None:
            zi = sosfilt_zi(sos) * x[0]
        out[i : i + block], zi = sosfilt(sos, x[i : i + block], zi=zi)
    return out


def pan(sig, p):
    """Equal-power pan; p in [-1, 1]. Accepts an array for moving pans."""
    p = np.broadcast_to(np.asarray(p, dtype=float), sig.shape)
    a = (p + 1) * np.pi / 4
    return np.stack([sig * np.cos(a), sig * np.sin(a)], axis=1)


class Mix:
    def __init__(self, seconds):
        self.n = int(seconds * SR)
        self.buses = {}

    def bus(self, name):
        if name not in self.buses:
            self.buses[name] = np.zeros((self.n, 2))
        return self.buses[name]

    def add(self, name, sig, at, gain=1.0, p=0.0):
        if sig.ndim == 1:
            sig = pan(sig, p)
        b = self.bus(name)
        if at < 0:
            sig, at = sig[-at:], 0
        end = min(self.n, at + len(sig))
        if end > at:
            b[at:end] += sig[: end - at] * gain


def reverb_ir(seconds=2.4, damp=5500, seed=1):
    n = int(seconds * SR)
    r = np.random.default_rng(seed)
    t = np.arange(n) / SR
    decay = np.exp(-t * 6.9 / seconds)
    ir = np.stack([r.standard_normal(n), r.standard_normal(n)], axis=1)
    ir *= decay[:, None]
    ir = filt(ir, "lowpass", damp)
    ir[: int(0.012 * SR)] *= np.linspace(0, 1, int(0.012 * SR))[:, None]
    return ir / np.sqrt(np.sum(ir**2, axis=0))


def reverb(x, seconds=2.4, damp=5500, wet=0.3):
    ir = reverb_ir(seconds, damp)
    y = np.stack([fftconvolve(x[:, c], ir[:, c])[: len(x)] for c in range(2)], axis=1)
    return x * (1 - wet) + y * wet


def pingpong(x, delay_s, fb=0.45, repeats=6, mix=0.35):
    d = int(delay_s * SR)
    y = x.copy()
    for k in range(1, repeats + 1):
        g = mix * fb ** (k - 1)
        shifted = np.zeros_like(x)
        if k * d < len(x):
            shifted[k * d :] = x[: len(x) - k * d]
        # Alternate sides so the echoes bounce
        if k % 2:
            shifted = shifted[:, ::-1]
        y += shifted * g
    return y


# Drums


def kick(punch=1.0):
    n = int(0.45 * SR)
    f = 45 + 110 * np.exp(-np.arange(n) / (0.03 * SR))
    body = sine(f, n) * exp_env(n, 0.16)
    click = filt(noise(n), "highpass", 3000) * exp_env(n, 0.003) * 0.4
    return np.tanh((body + click) * 1.6 * punch)


def clap():
    n = int(0.35 * SR)
    e = np.zeros(n)
    for off in (0, 0.011, 0.022):
        s = int(off * SR)
        e[s:] += exp_env(n - s, 0.008)
    e += exp_env(n, 0.09) * 0.5
    return filt(filt(noise(n), "bandpass", [900, 5000]) * e, "highpass", 600) * 0.9


def snare():
    n = int(0.3 * SR)
    tone = sine(190, n) * exp_env(n, 0.05) * 0.6
    nz = filt(noise(n), "highpass", 1500) * exp_env(n, 0.07)
    return (tone + nz) * 0.8


def hat(open_=False):
    n = int((0.3 if open_ else 0.06) * SR)
    x = filt(noise(n), "highpass", 7500) * exp_env(n, 0.09 if open_ else 0.012)
    return x * 0.5


def tom(freq=70):
    n = int(0.9 * SR)
    f = freq * (1 + 0.6 * np.exp(-np.arange(n) / (0.04 * SR)))
    body = sine(f, n) * exp_env(n, 0.3)
    skin = filt(noise(n), "lowpass", 900) * exp_env(n, 0.05) * 0.5
    return np.tanh((body + skin) * 1.4)


# Tonal voices


def supersaw(freq, n, voices=5, detune=0.012, cutoff=2500):
    out = np.zeros((n, 2))
    for v in range(voices):
        d = 1 + detune * (v - (voices - 1) / 2) / ((voices - 1) / 2 or 1)
        s = saw(freq * d, n, ph=rng.random())
        out += pan(s, (v / max(voices - 1, 1)) * 1.6 - 0.8)
    out /= voices
    return filt(out, "lowpass", cutoff)


def pluck(freq, n, bright=4000):
    s = saw(freq, n) * 0.6 + square(freq * 2, n) * 0.2
    cut = 300 + bright * exp_env(n, 0.06)
    return sweep(s, "lowpass", cut) * exp_env(n, 0.18)


def bell(freq, n):
    partials = [(1, 1), (2.01, 0.5), (3.0, 0.3), (4.2, 0.18), (5.4, 0.1)]
    out = np.zeros(n)
    for ratio, g in partials:
        out += sine(freq * ratio, n) * g * exp_env(n, 1.2 / ratio)
    return out * 0.5


def bass_note(freq, n, cutoff=900):
    s = saw(freq, n) * 0.7 + sine(freq / 2, n) * 0.5
    return filt(s, "lowpass", cutoff) * env_adsr(n, 0.004, 0.08, 0.8, 0.04)


def braam(freq, n):
    out = np.zeros((n, 2))
    for mult, g in ((1, 1), (2, 0.6), (1.5, 0.35), (0.5, 0.8)):
        out += supersaw(freq * mult, n, voices=4, detune=0.02, cutoff=20000) * g
    cut = 200 + 2400 * np.minimum(np.arange(n) / (0.35 * SR), 1) * exp_env(n, 1.4)
    out = np.stack([sweep(out[:, c], "lowpass", cut) for c in range(2)], axis=1)
    return np.tanh(out * env_adsr(n, 0.02, 0.4, 0.7, 1.2)[:, None] * 1.3) * 0.7


# Sound design


def sfx_impact(scale=1.0):
    n = int(3.2 * SR)
    sub = sine(28 + 45 * np.exp(-np.arange(n) / (0.12 * SR)), n) * exp_env(n, 0.7)
    boom = filt(noise(n), "lowpass", 700) * exp_env(n, 0.25) * 0.9
    crack = filt(noise(n), "highpass", 2500) * exp_env(n, 0.03) * 0.5
    x = np.tanh((sub * 1.3 + boom + crack) * 1.3) * scale
    return reverb(pan(x, 0), 3.2, 4000, 0.35)


def sfx_hit():
    n = int(1.5 * SR)
    k = kick(1.3)
    sn = snare()
    x = np.pad(k, (0, n - len(k))) + np.pad(sn, (0, n - len(sn))) * 0.7
    x += filt(noise(n), "highpass", 5000) * exp_env(n, 0.35) * 0.25
    return reverb(pan(np.tanh(x), 0), 1.8, 6000, 0.3)


def sfx_whoosh(length=0.7, up=True):
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    shape = np.sin(np.pi * t) ** 2 if up else np.exp(-t * 4)
    cut = 400 + 5000 * np.sin(np.pi * t) ** 1.5
    x = sweep(noise(n), "lowpass", cut)
    x = filt(x, "highpass", 250) * shape
    return pan(x * 0.9, np.linspace(-0.7, 0.7, n))


def sfx_riser(length):
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    nz = sweep(noise(n), "highpass", 200 + 6000 * t**2) * t**2
    tone = supersaw(200 * 2 ** (t * 2.5), n, voices=3, cutoff=6000)
    return pan(nz * 0.6, 0) + tone * (t**3)[:, None] * 0.25


def sfx_swell(length):
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    x = filt(noise(n), "highpass", 1500) * t**3
    return reverb(pan(x * 0.5, 0), 2.0, 7000, 0.4)


def sfx_glitch(seed):
    r = np.random.default_rng(seed)
    n = int(0.28 * SR)
    out = np.zeros(n)
    pos = 0
    while pos < n:
        seg = int(r.uniform(0.008, 0.035) * SR)
        kind = r.integers(3)
        if kind == 0:
            s = square(r.uniform(80, 1400), seg)
        elif kind == 1:
            s = noise(seg)
        else:
            s = np.zeros(seg)
        # Sample-and-hold "bitcrush"
        hold = int(r.integers(4, 30))
        s = np.repeat(s[::hold], hold)[:seg]
        out[pos : pos + seg] = s[: n - pos] * r.uniform(0.3, 0.9)
        pos += seg
    return pan(out * 0.55, r.uniform(-0.5, 0.5))


def sfx_sub():
    n = int(2.2 * SR)
    f = 55 * np.exp(-np.arange(n) / (0.9 * SR)) + 22
    return pan(np.tanh(sine(f, n) * 1.5) * exp_env(n, 0.9) * 0.9, 0)


def sfx_chime():
    n = int(4.0 * SR)
    out = np.zeros(n)
    for m in (48, 55, 60, 64, 67, 72):
        out += (sine(midi(m), n) + 0.3 * sine(midi(m) * 2, n)) * exp_env(n, 1.4)
    out *= env_adsr(n, 0.01, 0.2, 0.9, 2.5, sustain_len=0.2)
    return reverb(pan(out * 0.12, 0), 3.0, 6000, 0.45)


def sfx_pop(freq=900):
    n = int(0.12 * SR)
    f = freq * (1 + 0.8 * np.minimum(np.arange(n) / (0.03 * SR), 1))
    return pan(sine(f, n) * exp_env(n, 0.03) * 0.5, 0)


def sfx_tick():
    n = int(0.05 * SR)
    return pan(sine(2400, n) * exp_env(n, 0.006) * 0.3, 0)


def sfx_scan(length=1.6):
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    f = 700 + 1500 * t
    x = sine(f, n) * (0.5 + 0.5 * np.sin(2 * np.pi * 18 * t)) * np.sin(np.pi * t)
    return pingpong(pan(x * 0.12, 0), 0.25, 0.4, 4, 0.4)


def sfx_counter(length):
    n = int(length * SR)
    out = np.zeros(n)
    t = 0.0
    k = 0
    while t < length:
        s = int(t * SR)
        blip = sine(1800 + (k % 3) * 200, int(0.02 * SR)) * exp_env(int(0.02 * SR), 0.004)
        out[s : s + len(blip)] += blip[: n - s]
        # Decelerates like the number easing out
        t += 0.025 + 0.12 * (t / length) ** 2
        k += 1
    return pan(out * 0.25, 0)


def sfx_notify():
    n = int(1.2 * SR)
    a = bell(midi(88), n)
    b = np.pad(bell(midi(83), n), (int(0.11 * SR), 0))[:n]
    return reverb(pan((a + b) * 0.35, 0.2), 1.5, 8000, 0.3)


def sfx_click():
    n = int(0.04 * SR)
    x = filt(noise(n), "bandpass", [1500, 6000]) * exp_env(n, 0.003)
    return pan(x * 0.6, 0)


def sfx_type(length, seed=3):
    """Mechanical keyboard bursts at typing speed."""
    r = np.random.default_rng(seed)
    n = int(length * SR)
    out = np.zeros(n)
    t = 0.0
    while t < length:
        s = int(t * SR)
        m = int(0.03 * SR)
        k = filt(noise(m), "bandpass", [r.uniform(1800, 2600), 7000]) * exp_env(m, 0.004)
        k += sine(r.uniform(180, 260), m) * exp_env(m, 0.01) * 0.4
        out[s : s + m] += k[: n - s] * r.uniform(0.5, 1)
        t += r.uniform(0.035, 0.09)
    return pan(out * 0.35, 0.1)


def sfx_tail():
    n = int(5 * SR)
    out = np.zeros((n, 2))
    for m in (57, 64, 69, 72, 76):
        out += supersaw(midi(m), n, voices=3, cutoff=1800) * 0.12
    out *= env_adsr(n, 0.05, 0.5, 0.6, 3.5, sustain_len=0.5)[:, None]
    return reverb(out, 4.0, 5000, 0.5)


def place_sfx(mix, cue, bus="sfx"):
    at = fs(cue["at"])
    kind = cue["type"]
    length = cue.get("len", 30) / FPS
    table = {
        "impact": lambda: sfx_impact(),
        "hit": lambda: sfx_hit(),
        "whoosh": lambda: sfx_whoosh(0.8),
        "swoosh": lambda: sfx_whoosh(0.45),
        "riser": lambda: sfx_riser(length),
        "swell": lambda: sfx_swell(length),
        "glitch": lambda: sfx_glitch(cue["at"]),
        "sub": lambda: sfx_sub(),
        "chime": lambda: sfx_chime(),
        "pop": lambda: sfx_pop(),
        "tick": lambda: sfx_tick(),
        "scan": lambda: sfx_scan(),
        "counter": lambda: sfx_counter(length),
        "notify": lambda: sfx_notify(),
        "click": lambda: sfx_click(),
        "type": lambda: sfx_type(length, cue["at"]),
        "tail": lambda: sfx_tail(),
        "braam": lambda: braam(midi(cue.get("note", 33)), int(4 * SR)),
        "tom": lambda: pan(tom(), 0),
    }
    sig = table[kind]()
    # Whooshes and risers are cued at their peak, so they start before it
    lead = {"whoosh": 0.8 * 0.55, "swoosh": 0.45 * 0.55}.get(kind, 0)
    if kind in ("riser", "swell"):
        lead = 0
    mix.add(bus, sig, at - int(lead * SR), gain=cue.get("gain", 1.0))


def section_at(sheet, frame):
    for s in sheet["sections"]:
        if s["from"] <= frame < s["to"]:
            return s["name"]
    return None


def beats(sheet):
    """(frame, bar, beat_in_bar, section) for every beat of the grid."""
    step = 60 / sheet["bpm"] * FPS
    f = sheet["gridOffset"]
    k = 0
    while f < sheet["durationInFrames"]:
        yield f, k // 4, k % 4, section_at(sheet, int(f))
        f += step
        k += 1


def sidechain(mix, kick_frames, depth=0.6, release=0.16):
    duck = np.ones(mix.n)
    for f in kick_frames:
        s = fs(f)
        m = min(mix.n - s, int(release * 4 * SR))
        if m > 0:
            duck[s : s + m] = np.minimum(
                duck[s : s + m], 1 - depth * np.exp(-np.arange(m) / (release * SR))
            )
    return duck[:, None]


# Arrangements


def arrange_pop(sheet, mix):
    # vi - IV - I - V in C: bright but not saccharine
    prog = [(57, [57, 60, 64, 71]), (53, [53, 57, 60, 67]), (48, [55, 60, 64, 67]), (55, [55, 59, 62, 69])]
    dark = [(57, [57, 60, 64, 67]), (53, [53, 57, 60, 64]), (50, [50, 57, 62, 65]), (52, [52, 56, 59, 64])]
    beat_len = 60 / sheet["bpm"]
    kicks = []
    for f, bar, b, sec in beats(sheet):
        at = fs(f)
        chords = dark if sec == "break" else prog
        root, chord = chords[bar % 4]
        # First two outro bars keep the groove under the end card
        early_outro = sec == "outro" and bar - sheet_bar(sheet, section_start(sheet, "outro")) < 2
        if b == 0 and sec is not None:
            n = int(beat_len * 4 * SR)
            cut = {"intro": 900, "break": 1400, "outro": 2200}.get(sec, 3000)
            pad = np.zeros((n, 2))
            for m in chord:
                pad += supersaw(midi(m), n, cutoff=cut) * 0.1
            pad *= env_adsr(n, 0.15 if sec == "intro" else 0.03, 0.3, 0.8, 0.4)[:, None]
            mix.add("pad", pad, at, gain=1.0 if sec != "outro" else 1.2)
        if sec in ("groove", "groove2", "build") or (sec == "break" and b == 0) or early_outro:
            if sec != "build" or b < 3:
                mix.add("drums", kick(), at, gain=0.95)
                kicks.append(f)
        if sec in ("groove", "groove2") and b in (1, 3):
            mix.add("drums", clap(), at, gain=0.55, p=0.05)
        if sec in ("groove", "groove2", "break") or early_outro:
            off = at + int(beat_len / 2 * SR)
            mix.add("drums", hat(open_=(sec == "groove2")), off, gain=0.35, p=0.25)
        if sec in ("groove", "groove2") or early_outro:
            for e in range(2):
                n = int(beat_len / 2 * SR)
                mix.add("bass", bass_note(midi(root - 24), n, 700 + 500 * e), at + e * n, gain=0.55)
        if sec in ("intro", "groove", "break", "groove2", "build"):
            pattern = [chord[0], chord[2], chord[1] + 12, chord[3]]
            for s16 in range(4):
                n = int(beat_len / 4 * SR)
                note = pattern[(b * 4 + s16) % 4] + (12 if sec == "groove2" else 0)
                bright = {"intro": 1200, "break": 2500}.get(sec, 4500)
                mix.add("arp", pluck(midi(note), n * 2, bright), at + s16 * n, gain=0.28, p=0.3 * ((s16 % 2) * 2 - 1))
        if sec == "build":
            # 16ths snare roll accelerating into the last drop
            subdiv = 4 if b < 2 else 8
            for k in range(subdiv):
                pos = at + int(k * beat_len / subdiv * SR)
                g = 0.25 + 0.5 * ((b * subdiv + k) / 32)
                mix.add("drums", snare(), pos, gain=g)
    return kicks


def section_start(sheet, name):
    return next(s["from"] for s in sheet["sections"] if s["name"] == name)


def sheet_bar(sheet, frame):
    return int((frame - sheet["gridOffset"]) // (60 / sheet["bpm"] * FPS * 4))


def arrange_trailer(sheet, mix):
    beat_len = 60 / sheet["bpm"]
    kicks = []
    n_total = mix.n
    # Low drone under everything, swelling with the sections
    drone = supersaw(midi(33), n_total, voices=5, detune=0.008, cutoff=380) * 0.35
    drone += pan(sine(midi(21), n_total) * 0.25, 0)
    lvl = np.full(n_total, 0.5)
    for s in sheet["sections"]:
        v = {"intro": 0.6, "reveal": 0.8, "numbers": 0.9, "build": 1.0, "portrait": 0.55, "finale": 0.9}.get(s["name"], 0.6)
        lvl[fs(s["from"]) : fs(s["to"])] = v
    lvl = np.convolve(lvl, np.ones(SR // 2) / (SR // 2), mode="same")
    fade_out = np.ones(n_total)
    fade_out[-int(2.5 * SR) :] = np.linspace(1, 0, int(2.5 * SR))
    mix.add("pad", drone * (lvl * fade_out)[:, None], 0)
    chords = [[45, 52, 57, 60, 64], [41, 48, 53, 57, 60], [43, 50, 55, 59, 62], [40, 47, 52, 56, 59]]
    for f, bar, b, sec in beats(sheet):
        at = fs(f)
        chord = chords[bar % 4]
        if sec in ("reveal", "numbers", "build") and b == 0:
            n = int(beat_len * 4 * SR)
            strings = np.zeros((n, 2))
            for m in chord[1:]:
                strings += supersaw(midi(m), n, voices=4, detune=0.006, cutoff=1600) * 0.07
            strings *= env_adsr(n, 0.4, 0.3, 0.9, 0.6)[:, None]
            mix.add("pad", strings, at)
        if sec in ("numbers", "build"):
            mix.add("drums", sfx_tick(), at, gain=1.4)
        if sec == "build":
            # Driving 8th ostinato on the root
            for e in range(2):
                n = int(beat_len / 2 * SR)
                mix.add("arp", pluck(midi(chord[0]), n * 2, 1800), at + e * n, gain=0.35)
                mix.add("arp", pluck(midi(chord[0] + 12), n * 2, 2500), at + e * n, gain=0.18, p=0.4)
            if b in (0, 2):
                mix.add("drums", tom(62), at, gain=0.8)
                kicks.append(f)
            if b == 3:
                mix.add("drums", tom(90), at + int(beat_len / 2 * SR), gain=0.5)
        if sec == "numbers" and b in (0, 2):
            mix.add("drums", tom(55), at, gain=0.6)
        if sec == "portrait" and b in (0, 2):
            n = int(3 * SR)
            note = chord[2 + (bar + b // 2) % 3] + 12
            mix.add("arp", pingpong(pan(bell(midi(note), n) * 0.35, 0), beat_len * 0.75, 0.4, 5, 0.35), at)
        if sec == "finale" and b == 0:
            n = int(beat_len * 4 * SR)
            strings = np.zeros((n, 2))
            for m in chords[0]:
                strings += supersaw(midi(m + 12), n, voices=5, detune=0.01, cutoff=2600) * 0.08
            strings *= env_adsr(n, 0.05, 0.3, 0.85, 0.8)[:, None]
            mix.add("pad", strings, at)
    return kicks


def arrange_tech(sheet, mix):
    beat_len = 60 / sheet["bpm"]
    kicks = []
    # Minor, driving: i - VI - III - VII in A minor
    prog = [(45, [57, 60, 64]), (41, [57, 60, 65]), (48, [55, 60, 64]), (43, [55, 59, 62])]
    for f, bar, b, sec in beats(sheet):
        at = fs(f)
        root, chord = prog[bar % 4]
        if b == 0 and sec is not None:
            n = int(beat_len * 4 * SR)
            cut = {"typing": 700, "ai": 1500, "face": 1200}.get(sec, 2200)
            pad = np.zeros((n, 2))
            for m in chord:
                pad += supersaw(midi(m), n, voices=4, cutoff=cut) * 0.08
            pad *= env_adsr(n, 0.2 if sec in ("typing", "face") else 0.02, 0.3, 0.8, 0.5)[:, None]
            mix.add("pad", pad, at)
        drums_on = sec in ("build", "terminal", "deploy") or (sec == "ai" and b in (0, 2))
        if drums_on:
            mix.add("drums", kick(), at, gain=0.95)
            kicks.append(f)
        if sec in ("build", "terminal", "deploy"):
            for k in range(4):
                mix.add("drums", hat(), at + int(k * beat_len / 4 * SR), gain=0.18 + 0.12 * (k == 2), p=0.2)
            if b in (1, 3):
                mix.add("drums", clap(), at, gain=0.45)
        if sec in ("build", "terminal", "ai", "deploy"):
            # Acid-flavoured 16th bassline with a resonant-ish filter wobble
            for s16 in range(4):
                n = int(beat_len / 4 * SR)
                note = root - 12 + (12 if s16 == 2 else 0) + (7 if s16 == 3 and b % 2 else 0)
                cut = 500 + 1600 * (0.5 + 0.5 * np.sin(2 * np.pi * (bar * 4 + b + s16 / 4) / 8))
                mix.add("bass", bass_note(midi(note), n, cut), at + s16 * n, gain=0.5)
        if sec in ("ai", "face"):
            for s16 in (0, 3):
                n = int(beat_len / 4 * SR)
                note = chord[(b + s16) % 3] + 12
                mix.add("arp", pingpong(pan(bell(midi(note), n * 6) * 0.3, 0), beat_len * 0.75, 0.45, 5, 0.4), at + s16 * n)
    return kicks


ARRANGERS = {"pop": arrange_pop, "trailer": arrange_trailer, "tech": arrange_tech}


def render(video_id):
    sheet = json.loads((ROOT / "src" / "videos" / f"{video_id}.cues.json").read_text())
    seconds = sheet["durationInFrames"] / FPS + 0.1
    mix = Mix(seconds)
    kicks = ARRANGERS[sheet["style"]](sheet, mix)
    for cue in sheet["sfx"]:
        place_sfx(mix, cue)

    duck = sidechain(mix, kicks + [c["at"] for c in sheet["sfx"] if c["type"] in ("impact", "hit")])
    music = (
        mix.bus("pad") * duck * 0.9
        + mix.bus("bass") * duck
        + reverb(pingpong(mix.bus("arp"), 60 / sheet["bpm"] * 0.75, 0.35, 4, 0.25), 2.2, 6000, 0.25) * duck
        + mix.bus("drums")
    )
    music = reverb(music, 1.6, 7000, 0.12)
    out = music * 0.85 + mix.bus("sfx")

    # Gentle bus glue then a soft clipper instead of a hard limiter
    out = np.tanh(out * 1.1) / np.tanh(1.1)
    peak = np.max(np.abs(out)) or 1
    out = out / peak * 0.89
    fade = int(0.02 * SR)
    out[:fade] *= np.linspace(0, 1, fade)[:, None]
    out[-fade:] *= np.linspace(1, 0, fade)[:, None]

    dest = ROOT / "public" / "audio" / f"{video_id}.wav"
    dest.parent.mkdir(parents=True, exist_ok=True)
    wavfile.write(dest, SR, (out * 32767).astype(np.int16))
    print(f"Wrote {dest} ({seconds:.1f}s)")


if __name__ == "__main__":
    ids = sys.argv[1:] or ["AntoineOS", "Trailer", "CodeToReality"]
    for vid in ids:
        if (ROOT / "src" / "videos" / f"{vid}.cues.json").exists():
            render(vid)
