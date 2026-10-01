import React, { useLayoutEffect, useRef } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'

const VERT = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

const COMMON = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uIntensity;
uniform vec3 uA;
uniform vec3 uB;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 11.7; a *= 0.5; }
  return v;
}
`

// Domain-warped fbm: slow nebula for the AI beats
const AURORA = `${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y * 2.2;
  float t = uTime * 0.12;
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.0 * q + vec2(8.3, 2.8)));
  float f = fbm(p + 2.5 * r);
  vec3 col = mix(uA, uB, clamp(f * f * 2.2, 0.0, 1.0));
  col *= smoothstep(0.15, 0.95, f) * 1.6;
  col += 0.35 * uB * pow(clamp(r.x, 0.0, 1.0), 4.0);
  float vig = smoothstep(1.25, 0.2, length((uv - 0.5) * vec2(1.0, 1.2)));
  gl_FragColor = vec4(col * vig * uIntensity, 1.0);
}
`

// Volumetric beams fanning from a light above the frame, with drifting haze
const BEAMS = `${COMMON}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 src = vec2(0.5, 1.15);
  vec2 d = uv - src;
  float ang = atan(d.x, -d.y);
  float dist = length(d);
  float rays = 0.0;
  rays += pow(noise(vec2(ang * 9.0, uTime * 0.25)), 3.0);
  rays += 0.6 * pow(noise(vec2(ang * 23.0 + 4.0, uTime * 0.4)), 4.0);
  float cone = smoothstep(0.9, 0.0, abs(ang)) * smoothstep(1.6, 0.1, dist);
  float haze = fbm(uv * vec2(3.0, 2.0) + vec2(uTime * 0.03, -uTime * 0.05));
  vec3 col = uA * rays * cone * (0.6 + 0.8 * haze);
  col += uB * pow(smoothstep(0.7, 0.0, dist), 3.0) * 0.6;
  col += uA * haze * 0.05;
  gl_FragColor = vec4(col * uIntensity, 1.0);
}
`

// Infinite perspective grid scrolling towards the camera
const GRID = `${COMMON}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float horizon = -0.05;
  vec3 col = vec3(0.0);
  if (uv.y < horizon) {
    float z = 0.35 / (horizon - uv.y);
    vec2 g = vec2(uv.x * z, z + uTime * 1.2);
    vec2 w = abs(fract(g) - 0.5) / fwidthApprox(g);
    float line = 1.0 - min(min(w.x, w.y), 1.0);
    float fade = smoothstep(18.0, 1.0, z);
    col = uA * line * fade;
  }
  col += uB * pow(smoothstep(0.35, 0.0, abs(uv.y - horizon)), 3.0) * 0.5;
  gl_FragColor = vec4(col * uIntensity, 1.0);
}
`

const PRESETS = {
  aurora: AURORA,
  beams: BEAMS,
  // WebGL1 has no fwidth without an extension: approximate from depth
  grid: GRID.replace(
    'fwidthApprox(g)',
    'vec2(0.02 * z + 0.01, 0.02 * z * z / 0.35 + 0.01)'
  ),
}

const toVec3 = (hex: string) => {
  const n = parseInt(hex.replace('#', ''), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

type GLState = {
  gl: WebGLRenderingContext
  prog: WebGLProgram
  loc: Record<string, WebGLUniformLocation | null>
}

/**
 * Full-frame GLSL background. Drawn synchronously in a layout effect with
 * preserveDrawingBuffer so the frame is on the canvas when Remotion
 * captures it.
 */
export const ShaderBackground: React.FC<{
  preset: keyof typeof PRESETS
  colorA?: string
  colorB?: string
  intensity?: number
  speed?: number
  style?: React.CSSProperties
}> = ({
  preset,
  colorA = '#0071e3',
  colorB = '#7b5cff',
  intensity = 1,
  speed = 1,
  style,
}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  const state = useRef<GLState | null>(null)
  const frame = useCurrentFrame()
  const { width, height, fps } = useVideoConfig()

  useLayoutEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    if (!state.current) {
      const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true })
      if (!gl) throw new Error('WebGL unavailable')
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)
        if (!s) throw new Error('createShader failed')
        gl.shaderSource(s, src)
        gl.compileShader(s)
        if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
          throw new Error(gl.getShaderInfoLog(s) ?? 'shader error')
        }
        return s
      }
      const prog = gl.createProgram()
      if (!prog) throw new Error('createProgram failed')
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, PRESETS[preset]))
      gl.linkProgram(prog)
      gl.useProgram(prog)
      const buf = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buf)
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      )
      const p = gl.getAttribLocation(prog, 'p')
      gl.enableVertexAttribArray(p)
      gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0)
      const loc = Object.fromEntries(
        ['uRes', 'uTime', 'uIntensity', 'uA', 'uB'].map((n) => [
          n,
          gl.getUniformLocation(prog, n),
        ])
      )
      state.current = { gl, prog, loc }
    }
    const { gl, loc } = state.current
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(loc.uRes, canvas.width, canvas.height)
    gl.uniform1f(loc.uTime, (frame / fps) * speed)
    gl.uniform1f(loc.uIntensity, intensity)
    gl.uniform3fv(loc.uA, toVec3(colorA))
    gl.uniform3fv(loc.uB, toVec3(colorB))
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }, [frame, fps, preset, colorA, colorB, intensity, speed])

  // Half resolution: these are soft fields, the upscale is invisible and it
  // quarters the cost on the software rasteriser
  return (
    <canvas
      ref={ref}
      width={width / 2}
      height={height / 2}
      style={{ position: 'absolute', inset: 0, width, height, ...style }}
    />
  )
}
