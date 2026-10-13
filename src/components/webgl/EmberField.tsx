"use client";

import { useEffect, useRef, useState } from "react";
import type { MotionValue } from "motion/react";

/**
 * EmberField — Vollflächiger WebGL-Shader.
 * Domain-warped fBm-Feuer, das vom unteren Rand aufsteigt, eine Hitzequelle,
 * die dem Cursor folgt, und aufsteigende Glutfunken. Ohne Three.js, ~2 KB Shader.
 */

const vert = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uRes;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uIntro;
uniform float uPower;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.5;
  }
  return v;
}

float embers(vec2 p, float scale, float speed, float seed) {
  vec2 g = p * scale;
  g.y -= uTime * speed;
  g.x += sin(g.y * 0.6 + seed + uTime * 0.4) * 0.45;
  vec2 id = floor(g);
  vec2 gv = fract(g) - 0.5;
  float h = hash(id + seed);
  if (h < 0.86) return 0.0;
  vec2 o = vec2(hash(id + 3.1) - 0.5, hash(id + 7.7) - 0.5) * 0.6;
  float d = length(gv - o);
  float flick = 0.45 + 0.55 * sin(uTime * (4.0 + h * 6.0) + h * 40.0);
  return smoothstep(0.1, 0.0, d) * flick;
}

void main() {
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 p = vec2((uv.x - 0.5) * aspect, uv.y);
  vec2 m = vec2((uMouse.x - 0.5) * aspect, uMouse.y);
  float t = uTime * 0.32;

  vec2 q = vec2(fbm(p * 2.1 + vec2(0.0, -t * 1.2)),
                fbm(p * 2.1 + vec2(5.2, -t * 1.45)));
  vec2 r = vec2(fbm(p * 1.7 + q * 1.8 + vec2(1.7, -t * 1.9)),
                fbm(p * 1.7 + q * 1.8 + vec2(8.3, -t * 1.6)));
  float f = fbm(p * 2.4 + r * 1.5 + vec2(0.0, -t * 2.1));

  // Glutbett am unteren Rand, das nach oben ausfranst
  float rise = uv.y + (f - 0.5) * 0.65 - (1.0 - uScroll) * 0.04;
  float bed = smoothstep(0.95 - uPower * 0.15, -0.15, rise);

  // Hitzequelle am Cursor
  vec2 dm = p - m;
  dm.y *= 0.8;
  float d2 = dot(dm, dm);
  float heat = exp(-d2 * 8.0) * (0.4 + 0.55 * f);

  float fire = (bed * 0.95 + heat) * f * 1.35;
  fire *= mix(1.0, 0.25, uScroll);

  vec3 ink = vec3(0.059, 0.047, 0.055);
  vec3 c1 = vec3(0.30, 0.05, 0.05);
  vec3 c2 = vec3(1.0, 0.416, 0.169);
  vec3 c3 = vec3(1.0, 0.765, 0.43);
  vec3 c4 = vec3(1.0, 0.88, 0.62);

  vec3 fc = mix(c1, c2, smoothstep(0.18, 0.55, fire));
  fc = mix(fc, c3, smoothstep(0.55, 0.9, fire));
  fc = mix(fc, c4, smoothstep(0.95, 1.3, fire));
  vec3 col = mix(ink, fc, smoothstep(0.04, 0.62, fire));

  // Funken in zwei Tiefen
  float e = embers(p, 9.0, 1.15, 1.0) + embers(p, 17.0, 1.7, 9.0) * 0.7;
  float eMask = smoothstep(1.15, 0.15, uv.y) * mix(1.0, 0.4, uScroll);
  col += vec3(1.0, 0.62, 0.3) * e * eMask * 1.3;

  // Vignette + Dithering gegen Banding
  float vig = smoothstep(1.35, 0.35, length((uv - vec2(0.5, 0.45)) * vec2(aspect * 0.8, 1.0)));
  col *= mix(0.55, 1.0, vig);
  col += (hash(uv * uRes + uTime) - 0.5) / 255.0 * 2.0;

  gl_FragColor = vec4(col * uIntro + ink * (1.0 - uIntro), 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

type Props = {
  progress?: MotionValue<number>;
  active: boolean;
  className?: string;
};

export default function EmberField({ progress, active, className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, vert);
    const fs = compile(gl, gl.FRAGMENT_SHADER, frag);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = {
      time: gl.getUniformLocation(prog, "uTime"),
      res: gl.getUniformLocation(prog, "uRes"),
      mouse: gl.getUniformLocation(prog, "uMouse"),
      scroll: gl.getUniformLocation(prog, "uScroll"),
      intro: gl.getUniformLocation(prog, "uIntro"),
      power: gl.getUniformLocation(prog, "uPower"),
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const quality = coarse ? 0.6 : 0.85;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * quality;
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(u.res, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const target = { x: 0.5, y: 0.28 };
    const mouse = { x: 0.5, y: 0.28 };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target.x = (e.clientX - rect.left) / rect.width;
      target.y = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    let intro = 0;
    let power = 0;
    const start = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = (now - start) / 1000;
      mouse.x += (target.x - mouse.x) * 0.06;
      mouse.y += (target.y - mouse.y) * 0.06;
      if (activeRef.current) {
        intro += (1 - intro) * 0.025;
        power += (1 - power) * 0.012;
      }
      gl.uniform1f(u.time, reduced ? 8 : t);
      gl.uniform2f(u.mouse, mouse.x, mouse.y);
      gl.uniform1f(u.scroll, progress ? Math.min(1, Math.max(0, progress.get())) : 0);
      gl.uniform1f(u.intro, intro);
      gl.uniform1f(u.power, power);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [progress]);

  if (failed) {
    return (
      <div
        aria-hidden
        className={className}
        style={{
          background:
            "radial-gradient(120% 70% at 50% 110%, #ff6a2b 0%, #4d0d0c 38%, #0f0c0e 70%)",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
