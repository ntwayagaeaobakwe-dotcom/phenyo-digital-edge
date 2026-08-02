import { useEffect, useRef } from "react";

/**
 * Animated WebGL dot-matrix backdrop.
 *
 * Fills its nearest positioned ancestor, so wrap it in a `relative` container
 * and let it sit on a negative z-index behind content.
 *
 * Notes on behaviour:
 * - `three` is imported dynamically inside the effect, so it stays out of the
 *   initial bundle (Vite code-splits it) and never touches the SSR pass.
 * - Under `prefers-reduced-motion` a single settled frame is drawn and the
 *   render loop never starts — gentler, not absent.
 * - The loop is suspended while the element is offscreen or the tab is hidden.
 */
interface DotMatrixCanvasProps {
  className?: string;
  /** sRGB 0–1 triplets the dots are randomly drawn from. Max 6. */
  colors?: [number, number, number][];
  /** Grid cell pitch, in device pixels. */
  totalSize?: number;
  /** Dot edge length, in device pixels. */
  dotSize?: number;
  /** Global intensity multiplier for the whole layer (0–1). */
  opacity?: number;
  /** Seconds between dot re-randomisation. Higher is calmer. */
  cycleSeconds?: number;
}

const GOLD: [number, number, number] = [0.943, 0.735, 0.23];
const GOLD_SOFT: [number, number, number] = [0.955, 0.834, 0.501];
const GOLD_DEEP: [number, number, number] = [0.922, 0.586, 0];

const vertexShader = /* glsl */ `
  precision mediump float;
  uniform vec2 u_resolution;
  out vec2 fragCoord;

  void main() {
    gl_Position = vec4(position, 1.0);
    fragCoord = (position.xy + 1.0) * 0.5 * u_resolution;
    fragCoord.y = u_resolution.y - fragCoord.y;
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  in vec2 fragCoord;

  uniform float u_time;
  uniform float u_opacities[10];
  uniform vec3 u_colors[6];
  uniform float u_total_size;
  uniform float u_dot_size;
  uniform float u_opacity;
  uniform float u_frequency;
  uniform vec2 u_resolution;

  out vec4 fragColor;

  float PHI = 1.61803398874989484820459;

  float random(vec2 xy) {
    return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
  }

  void main() {
    vec2 st = fragCoord.xy;
    st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));
    st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));

    float opacity = step(0.0, st.x) * step(0.0, st.y);

    vec2 st2 = vec2(floor(st.x / u_total_size), floor(st.y / u_total_size));

    float show_offset = random(st2);
    float rand = random(st2 * floor((u_time / u_frequency) + show_offset + u_frequency));

    // Indices are clamped: the original indexed u_opacities[int(rand*10.0)] and
    // u_colors[int(show_offset*6.0)], both of which read out of bounds when the
    // random value lands on exactly 1.0.
    int opacityIndex = int(clamp(rand * 10.0, 0.0, 9.0));
    int colorIndex = int(clamp(show_offset * 6.0, 0.0, 5.0));

    opacity *= u_opacities[opacityIndex];
    opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
    opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

    vec3 color = u_colors[colorIndex];

    // Intro: dots resolve outward from the centre of the grid.
    float animation_speed_factor = 3.0;
    vec2 center_grid = u_resolution / 2.0 / u_total_size;
    float dist_from_center = distance(center_grid, st2);
    float intro_offset = dist_from_center * 0.01 + (random(st2) * 0.15);

    opacity *= step(intro_offset, u_time * animation_speed_factor);
    opacity *= clamp(
      (1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25,
      1.0,
      1.25
    );

    // Radial falloff so the field reads as depth rather than flat wallpaper.
    vec2 uv = fragCoord / u_resolution;
    float falloff = 1.0 - smoothstep(0.15, 0.85, distance(uv, vec2(0.5)));
    opacity *= falloff * u_opacity;

    fragColor = vec4(color, opacity);
    fragColor.rgb *= fragColor.a;
  }
`;

export function DotMatrixCanvas({
  className = "",
  colors = [GOLD, GOLD_SOFT, GOLD, GOLD_DEEP, GOLD_SOFT, GOLD],
  totalSize = 22,
  dotSize = 3,
  opacity = 1,
  cycleSeconds = 5,
}: DotMatrixCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Read live values inside the effect without re-creating the WebGL context.
  const settingsRef = useRef({ colors, totalSize, dotSize, opacity, cycleSeconds });
  settingsRef.current = { colors, totalSize, dotSize, opacity, cycleSeconds };

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let disposed = false;
    let frameId = 0;
    let teardown: (() => void) | undefined;

    void (async () => {
      const THREE = await import("three");
      // The dynamic import can resolve after unmount.
      if (disposed) return;

      const { colors, totalSize, dotSize, opacity, cycleSeconds } = settingsRef.current;

      const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      const palette = Array.from(
        { length: 6 },
        (_, i) => new THREE.Vector3(...(colors[i % colors.length] ?? GOLD)),
      );

      const uniforms = {
        u_time: { value: 0 },
        u_resolution: { value: new THREE.Vector2(1, 1) },
        u_opacities: { value: [0.05, 0.1, 0.15, 0.25, 0.35, 0.45, 0.6, 0.75, 0.9, 1.0] },
        u_colors: { value: palette },
        u_total_size: { value: totalSize },
        u_dot_size: { value: dotSize },
        u_opacity: { value: opacity },
        u_frequency: { value: cycleSeconds },
      };

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const resize = () => {
        const { clientWidth, clientHeight } = host;
        if (clientWidth === 0 || clientHeight === 0) return;
        renderer.setSize(clientWidth, clientHeight, false);
        uniforms.u_resolution.value.set(clientWidth * dpr, clientHeight * dpr);
      };
      resize();

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const disposeGpu = () => {
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
      };

      if (prefersReducedMotion) {
        // One settled frame: past the intro sweep, then held still.
        uniforms.u_time.value = 5;
        renderer.render(scene, camera);

        const staticResize = () => {
          resize();
          renderer.render(scene, camera);
        };
        const ro = new ResizeObserver(staticResize);
        ro.observe(host);
        teardown = () => {
          ro.disconnect();
          disposeGpu();
        };
        // The effect may have been torn down while `three` was still loading.
        if (disposed) teardown();
        return;
      }

      const start = performance.now();
      let visible = true;
      let onscreen = true;

      const render = () => {
        uniforms.u_time.value = (performance.now() - start) / 1000;
        renderer.render(scene, camera);
      };

      const loop = () => {
        if (disposed) return;
        render();
        frameId = requestAnimationFrame(loop);
      };

      const sync = () => {
        const shouldRun = visible && onscreen;
        if (shouldRun && !frameId) {
          frameId = requestAnimationFrame(loop);
        } else if (!shouldRun && frameId) {
          cancelAnimationFrame(frameId);
          frameId = 0;
        }
      };

      const onVisibility = () => {
        visible = document.visibilityState === "visible";
        sync();
      };
      document.addEventListener("visibilitychange", onVisibility);

      const io = new IntersectionObserver(
        ([entry]) => {
          onscreen = entry.isIntersecting;
          sync();
        },
        { threshold: 0 },
      );
      io.observe(host);

      const ro = new ResizeObserver(resize);
      ro.observe(host);

      sync();

      teardown = () => {
        document.removeEventListener("visibilitychange", onVisibility);
        io.disconnect();
        ro.disconnect();
        disposeGpu();
      };
      // The effect may have been torn down while `three` was still loading.
      if (disposed) teardown();
    })().catch(() => {
      // WebGL unavailable or the chunk failed to load — the layer is purely
      // decorative, so the section simply renders without it.
    });

    return () => {
      disposed = true;
      if (frameId) cancelAnimationFrame(frameId);
      // If `three` is still loading, teardown is undefined here — the async
      // block re-checks `disposed` once it finishes and cleans up itself.
      teardown?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none h-full w-full ${className}`}
    />
  );
}

export default DotMatrixCanvas;
