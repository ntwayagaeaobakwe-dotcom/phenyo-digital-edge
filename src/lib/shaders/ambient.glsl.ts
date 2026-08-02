/**
 * Site-Wide Ambient Background Shader
 * Single clip-space fullscreen triangle fragment shader.
 * Matte institutional aesthetic (Palantir/Goldman Sachs register).
 */

export const VERTEX_SHADER = `
attribute vec3 position;
varying vec2 vUv;

void main() {
  // Fullscreen triangle mapping clip-space [-1..3] to UV coordinates [0..2]
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const FRAGMENT_SHADER = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uPointer;
uniform float uScroll;
uniform vec3 uPalette[4];

varying vec2 vUv;

// ─── SECTION A: SIMPLEX NOISE & FBM UTILITIES ──────────────────────────────
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(
    0.211324865405187,  // (3.0 - sqrt(3.0)) / 6.0
    0.366025403784439,  // 0.5 * (sqrt(3.0) - 1.0)
    -0.577350269189626, // -1.0 + 2.0 * C.x
    0.024390243902439   // 1.0 / 41.0
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  // 3-octave FBM for organic ambient flow
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p * frequency);
    p += vec2(1.7, 9.2);
    frequency *= 2.05;
    amplitude *= 0.48;
  }
  return value;
}

// ─── SECTION B: MAIN SHADER PIPELINE ───────────────────────────────────────
void main() {
  // Normalize UV coordinates for aspect ratio
  vec2 aspectUv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  
  // Slow ambient fog translation
  float slowTime = uTime * 0.025;
  vec2 st = aspectUv * 1.3 + vec2(slowTime * 0.4, slowTime * 0.2);

  // ─── SECTION C: DOMAIN WARPING FBM DRIFT ────────────────────────────────
  vec2 q = vec2(
    fbm(st + vec2(0.0, 0.0)),
    fbm(st + vec2(5.2, 1.3) + vec2(uScroll * 0.15))
  );

  vec2 r = vec2(
    fbm(st + 3.0 * q + vec2(1.7, 9.2) + slowTime * 0.5),
    fbm(st + 3.0 * q + vec2(8.3, 2.8) + slowTime * 0.3)
  );

  float fbmVal = fbm(st + 2.5 * r);

  // ─── SECTION D: DESIGN PALETTE BLENDING ──────────────────────────────────
  // uPalette[0]: Base background slate
  // uPalette[1]: Muted navy depth
  // uPalette[2]: Electric primary accent light
  // uPalette[3]: Gold soft accent halo

  vec3 color = mix(uPalette[0], uPalette[1], clamp(fbmVal * 1.2, 0.0, 1.0));
  color = mix(color, uPalette[2], clamp(length(q) * 0.4, 0.0, 0.45));
  color = mix(color, uPalette[3], clamp(r.g * r.g * 0.3, 0.0, 0.25));

  // ─── SECTION E: INTERACTION & SPOTLIGHT ──────────────────────────────────
  // Smooth mouse pointer influence
  vec2 pointerAspect = (uPointer - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float pointerDist = length(aspectUv - pointerAspect);
  float pointerGlow = smoothstep(0.85, 0.0, pointerDist);
  color += uPalette[2] * pointerGlow * 0.08;

  // Scroll depth shift
  float scrollFade = smoothstep(0.0, 1.0, uScroll);
  color = mix(color, color * 0.9 + uPalette[1] * 0.1, scrollFade * 0.2);

  // ─── SECTION F: MICRO-GRAIN DITHERING & VIGNETTE ─────────────────────────
  // High-frequency dither noise to prevent color banding
  float grain = (fract(sin(dot(vUv * (uTime + 1.0), vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.02;
  color += grain;

  // Soft corner vignette for depth
  float vignette = smoothstep(1.3, 0.3, length(vUv - 0.5) * 1.3);
  color *= vignette;

  gl_FragColor = vec4(color, 1.0);
}
`;
