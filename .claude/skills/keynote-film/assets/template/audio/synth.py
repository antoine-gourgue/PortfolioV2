"""Procedural soundtrack and sound design for the film.

Everything is synthesised from src/timeline.json, the same file the scenes
are placed from: the music follows its bar-based sections, and every sound
cue lands on the exact frame of the scene that declares it. Royalty-free by
construction.

Usage: python3 audio/synth.py   (writes public/audio/<id>.wav, 48 kHz stereo)
Needs numpy and scipy.
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


def sfx_tap():
    n = int(0.06 * SR)
    x = sine(1300, n) * exp_env(n, 0.006) * 0.5
    x += filt(noise(n), "bandpass", [2000, 6000]) * exp_env(n, 0.002) * 0.3
    return pan(x, 0)


def sfx_unlock():
    n = int(0.2 * SR)
    out = np.zeros(n)
    for off, f0 in ((0, 1600), (0.07, 2200)):
        s = int(off * SR)
        m = int(0.04 * SR)
        out[s : s + m] += sine(f0, m) * exp_env(m, 0.008)
    return pan(out * 0.45, 0)


def sfx_drop():
    # Map pin landing: short downward blip with a soft thud
    n = int(0.18 * SR)
    f = 700 * np.exp(-np.arange(n) / (0.05 * SR)) + 220
    x = sine(f, n) * exp_env(n, 0.05) * 0.6
    x += sine(90, n) * exp_env(n, 0.04) * 0.5
    return pan(x, 0)


def sfx_send():
    # Mail "sent": a quick rising swoosh
    n = int(0.5 * SR)
    t = np.linspace(0, 1, n)
    x = sweep(filt(noise(n), "highpass", 400), "lowpass", 900 + 7000 * t**1.5)
    x *= np.sin(np.pi * t) ** 2
    return pan(x * 0.6, np.linspace(-0.4, 0.6, n))


def sfx_ring():
    # Marimba-like ringtone phrase, two short bursts
    n = int(0.9 * SR)
    out = np.zeros(n)
    for k, m in enumerate((76, 79, 84, 79, 76, 79)):
        s = int(k * 0.12 * SR)
        m_n = int(0.5 * SR)
        note = bell(midi(m), m_n)
        out[s : s + m_n] += note[: n - s]
    return pan(out * 0.4, 0)


def sfx_tail():
    n = int(5 * SR)
    out = np.zeros((n, 2))
    for m in (57, 64, 69, 72, 76):
        out += supersaw(midi(m), n, voices=3, cutoff=1800) * 0.12
    out *= env_adsr(n, 0.05, 0.5, 0.6, 3.5, sustain_len=0.5)[:, None]
    return reverb(out, 4.0, 5000, 0.5)


# Relative levels under the music. Whooshes ("slides") sit lowest: they
# should be felt more than heard.
SFX_LEVEL = {
    "whoosh": 0.32,
    "swoosh": 0.3,
    "send": 0.35,
    "impact": 0.5,
    "hit": 0.45,
    "glitch": 0.4,
    "riser": 0.45,
    "swell": 0.55,
    "sub": 0.55,
    "pop": 0.5,
    "tick": 0.45,
    "tap": 0.6,
    "unlock": 0.6,
    "drop": 0.6,
    "scan": 0.5,
    "counter": 0.5,
    "notify": 0.7,
    "ring": 0.6,
    "click": 0.6,
    "type": 0.45,
    "chime": 0.8,
    "tail": 0.9,
    "braam": 0.8,
    "tom": 0.8,
}


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
        "tap": lambda: sfx_tap(),
        "unlock": lambda: sfx_unlock(),
        "drop": lambda: sfx_drop(),
        "send": lambda: sfx_send(),
        "ring": lambda: sfx_ring(),
        "braam": lambda: braam(midi(cue.get("note", 33)), int(4 * SR)),
        "tom": lambda: pan(tom(), 0),
    }
    sig = table[kind]() * SFX_LEVEL.get(kind, 0.6)
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


# What plays in each named section of a pop-style cue sheet
POP_LAYERS = {
    "intro": {"pad", "arp"},
    "groove": {"pad", "kick", "clap", "hat", "bass", "arp"},
    "lite": {"pad", "kick2", "hat", "bass", "arp"},
    "break": {"pad", "kick1", "hat", "arp"},
    "groove2": {"pad", "kick", "clap", "ohat", "bass", "arp"},
    "build": {"pad", "kick", "roll", "arp"},
    "finale": {"pad", "kick", "hat", "bass", "arp"},
    "outro": {"pad", "arp"},
    # "One more thing": everything drops out but a dark pad
    "hush": {"pad"},
}


def arrange_pop(sheet, mix, soft=False):
    # vi - IV - I - V in C: bright but not saccharine
    prog = [(57, [57, 60, 64, 71]), (53, [53, 57, 60, 67]), (48, [55, 60, 64, 67]), (55, [55, 59, 62, 69])]
    dark = [(57, [57, 60, 64, 67]), (53, [53, 57, 60, 64]), (50, [50, 57, 62, 65]), (52, [52, 56, 59, 64])]
    # The outro sits on the tonic so the video resolves instead of stopping
    tonic = (48, [48, 55, 60, 64, 67])
    beat_len = 60 / sheet["bpm"]
    kicks = []
    outro_played = False
    for f, bar, b, sec in beats(sheet):
        if sec is None:
            continue
        at = fs(f)
        layers = POP_LAYERS.get(sec, POP_LAYERS["groove"])
        root, chord = tonic if sec == "outro" else (dark if sec == "break" else prog)[bar % 4]
        # The outro is one long chord from its first beat, whatever the bar
        outro_start = sec == "outro" and not outro_played
        if (b == 0 and "pad" in layers and sec != "outro") or outro_start:
            n = int(beat_len * 4 * SR)
            if sec == "outro":
                outro_played = True
                n = mix.n - at
            cut = {"intro": 900, "break": 1400, "outro": 2000, "lite": 2200, "hush": 600}.get(sec, 3000)
            pad = np.zeros((n, 2))
            for m in chord:
                pad += supersaw(midi(m), n, cutoff=cut) * 0.1
            if sec == "outro":
                # Held at full level under the closing card, gone by the end
                fade = min(n, int(2.5 * SR))
                env = np.ones(n)
                env[-fade:] = np.linspace(1, 0, fade) ** 1.5
                env[: int(0.03 * SR)] = np.linspace(0, 1, int(0.03 * SR))
                pad *= env[:, None]
            else:
                pad *= env_adsr(n, 0.15 if sec == "intro" else 0.03, 0.3, 0.8, 0.4)[:, None]
            mix.add("pad", pad, at, gain=2.4 if sec == "outro" else 1.0)
        kick_gain = 0.6 if soft else 0.95
        if (
            "kick" in layers and (sec != "build" or b < 3)
            or "kick2" in layers and b in (0, 2)
            or "kick1" in layers and b == 0
        ):
            mix.add("drums", kick(), at, gain=kick_gain)
            kicks.append(f)
        if "clap" in layers and b in (1, 3) and not (soft and sec == "groove"):
            mix.add("drums", clap(), at, gain=0.5, p=0.05)
        if "hat" in layers or "ohat" in layers:
            off = at + int(beat_len / 2 * SR)
            mix.add("drums", hat(open_="ohat" in layers), off, gain=0.3, p=0.25)
        if "bass" in layers:
            for e in range(2):
                n = int(beat_len / 2 * SR)
                mix.add("bass", bass_note(midi(root - 24), n, 700 + 500 * e), at + e * n, gain=0.5)
        if "arp" in layers:
            pattern = [chord[0], chord[2], chord[1] + 12, chord[3]]
            for s16 in range(4):
                n = int(beat_len / 4 * SR)
                note = pattern[(b * 4 + s16) % 4] + (12 if sec == "groove2" else 0)
                bright = {"intro": 1200, "break": 2500, "lite": 3000, "outro": 1500}.get(sec, 4500)
                mix.add("arp", pluck(midi(note), n * 2, bright), at + s16 * n, gain=0.28, p=0.3 * ((s16 % 2) * 2 - 1))
        if "roll" in layers:
            # Snare roll accelerating into the drop
            subdiv = 4 if b < 2 else 8
            for k in range(subdiv):
                pos = at + int(k * beat_len / subdiv * SR)
                g = 0.2 + 0.4 * ((b * subdiv + k) / 32)
                mix.add("drums", snare(), pos, gain=g)
    return kicks


def arrange_soft(sheet, mix):
    return arrange_pop(sheet, mix, soft=True)


ARRANGERS = {"pop": arrange_pop, "soft": arrange_soft}


def load_sheet():
    """The timeline as an absolute cue sheet: scenes placed end to end,
    music sections from their bar counts, sound cues offset by their scene."""
    tl = json.loads((ROOT / "src" / "timeline.json").read_text())
    bar = 4 * 60 / tl["bpm"] * FPS
    sections, at = [], 0.0
    for s in tl["music"]:
        sections.append({"name": s["name"], "from": int(round(at)), "to": int(round(at + s["bars"] * bar))})
        at += s["bars"] * bar
    sfx, start = [], 0
    for scene in tl["scenes"]:
        for cue in scene.get("sfx", []):
            sfx.append({**cue, "at": start + cue["at"]})
        start += scene["len"]
    if abs(at - start) > bar / 4:
        print(f"warning: music lasts {at:.0f} frames, the scenes {start}: adjust the bars")
    return {
        "id": tl["id"],
        "durationInFrames": start,
        "bpm": tl["bpm"],
        "gridOffset": tl.get("gridOffset", 0),
        "style": tl.get("style", "pop"),
        "sections": sections,
        "sfx": sorted(sfx, key=lambda c: c["at"]),
    }


def render():
    sheet = load_sheet()
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
    out = music * 0.9 + mix.bus("sfx") * 0.8

    # Gentle bus glue then a soft clipper instead of a hard limiter
    out = np.tanh(out * 1.1) / np.tanh(1.1)
    peak = np.max(np.abs(out)) or 1
    out = out / peak * 0.89
    fade = int(0.02 * SR)
    out[:fade] *= np.linspace(0, 1, fade)[:, None]
    # Last second and a half fades out: the closing card should not end on
    # a cut-off sound
    tail = int(1.5 * SR)
    out[-tail:] *= (np.linspace(1, 0, tail) ** 2)[:, None]

    dest = ROOT / "public" / "audio" / f"{sheet['id']}.wav"
    dest.parent.mkdir(parents=True, exist_ok=True)
    wavfile.write(dest, SR, (out * 32767).astype(np.int16))
    print(f"Wrote {dest} ({seconds:.1f}s)")


if __name__ == "__main__":
    render()
