import {
  WebGLRenderer,
  Scene,
  BufferGeometry,
  BufferAttribute,
  Mesh,
  RawShaderMaterial,
  Vector2,
  Vector3,
  Camera,
} from "three";
import { VERTEX_SHADER, FRAGMENT_SHADER } from "./shaders/ambient.glsl";

// Hardware & capability tiering check
export function isSupportedHardware(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  // 1. Reduced motion preference check
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return false;

  // 2. Hardware concurrency check (CPU cores <= 4)
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return false;

  // 3. Device memory check (RAM <= 4GB)
  // @ts-expect-error deviceMemory is a non-standard navigator property in Chrome/Edge
  if (navigator.deviceMemory && navigator.deviceMemory <= 4) return false;

  // 4. WebGL2 context availability check
  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2");
    if (!gl) return false;
    // Lose test context cleanly
    const loseContext = gl.getExtension("WEBGL_lose_context");
    if (loseContext) loseContext.loseContext();
  } catch {
    return false;
  }

  return true;
}

// Convert CSS color variables to normalized float Vector3
function parseCssColorToVec3(colorStr: string, fallback: Vector3): Vector3 {
  if (typeof document === "undefined") return fallback;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (!ctx) return fallback;
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);
    const data = ctx.getImageData(0, 0, 1, 1).data;
    return new Vector3(data[0] / 255, data[1] / 255, data[2] / 255);
  } catch {
    return fallback;
  }
}

function getDesignPalette(): Vector3[] {
  const styles = getComputedStyle(document.documentElement);
  const bgStr = styles.getPropertyValue("--background").trim() || "oklch(0.09 0.012 260)";
  const navyStr = styles.getPropertyValue("--navy").trim() || "oklch(0.18 0.04 265)";
  const primaryStr = styles.getPropertyValue("--primary").trim() || "oklch(0.74 0.19 230)";
  const goldSoftStr = styles.getPropertyValue("--gold-soft").trim() || "oklch(0.88 0.12 225)";

  return [
    parseCssColorToVec3(bgStr, new Vector3(0.09, 0.09, 0.11)),
    parseCssColorToVec3(navyStr, new Vector3(0.1, 0.12, 0.2)),
    parseCssColorToVec3(primaryStr, new Vector3(0.2, 0.6, 0.9)),
    parseCssColorToVec3(goldSoftStr, new Vector3(0.8, 0.7, 0.4)),
  ];
}

export function initAmbientRenderer(
  canvas: HTMLCanvasElement,
  onInitialized: () => void
): () => void {
  let isDisposed = false;
  let animFrameId: number | null = null;

  // 1. WebGL Renderer
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
    powerPreference: "low-power",
  });

  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 2. Fullscreen Clip-Space Triangle (3 vertices, itemSize 3, no camera math)
  const geometry = new BufferGeometry();
  // Vertices covering clip-space: (-1,-1,0), (3,-1,0), (-1,3,0)
  const positions = new Float32Array([
    -1, -1, 0,
     3, -1, 0,
    -1,  3, 0,
  ]);
  geometry.setAttribute("position", new BufferAttribute(positions, 3));

  // 3. Uniforms & Design Tokens
  const palette = getDesignPalette();
  const uniforms = {
    uResolution: { value: new Vector2(window.innerWidth * dpr, window.innerHeight * dpr) },
    uTime: { value: 0 },
    uPointer: { value: new Vector2(0.5, 0.5) },
    uScroll: { value: 0 },
    uPalette: { value: palette },
  };

  const material = new RawShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms,
    depthWrite: false,
    depthTest: false,
  });

  const scene = new Scene();
  const mesh = new Mesh(geometry, material);
  mesh.frustumCulled = false;
  scene.add(mesh);
  const camera = new Camera(); // Identity camera for clip-space render

  // 4. Pointer & Scroll Tracking with Smoothed Lerp
  let targetPointerX = 0.5;
  let targetPointerY = 0.5;
  let currentPointerX = 0.5;
  let currentPointerY = 0.5;
  let targetScroll = 0;
  let currentScroll = 0;

  const handlePointerMove = (e: MouseEvent | TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    targetPointerX = clientX / window.innerWidth;
    targetPointerY = 1.0 - clientY / window.innerHeight; // Invert for GL UV space
  };

  const handleScroll = () => {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );
    targetScroll = Math.min(1, Math.max(0, window.scrollY / maxScroll));
  };

  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  window.addEventListener("touchmove", handlePointerMove, { passive: true });
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Initial scroll update
  handleScroll();

  // 5. Debounced Resize Listener
  let resizeTimeout: number | null = null;
  const handleResize = () => {
    if (resizeTimeout) window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(() => {
      if (isDisposed) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * dpr, h * dpr);
    }, 150);
  };
  window.addEventListener("resize", handleResize);

  // 6. ~30 FPS Frame Accumulator Loop & Visibility Control
  const targetInterval = 1000 / 30; // ~33.33ms per frame
  let lastTime = performance.now();
  let accumulatedDelta = 0;
  let totalTime = 0;

  const loop = (now: number) => {
    if (isDisposed) return;

    animFrameId = requestAnimationFrame(loop);

    if (document.hidden) return; // Pause frame loop when tab is hidden

    const elapsed = now - lastTime;
    lastTime = now;
    accumulatedDelta += elapsed;

    // Clamp delta to prevent time jumps after tab switch
    const clampedDelta = Math.min(elapsed / 1000, 0.1);

    if (accumulatedDelta >= targetInterval) {
      accumulatedDelta %= targetInterval;
      totalTime += clampedDelta;

      // Lerp interactions
      currentPointerX += (targetPointerX - currentPointerX) * 0.05;
      currentPointerY += (targetPointerY - currentPointerY) * 0.05;
      currentScroll += (targetScroll - currentScroll) * 0.08;

      uniforms.uTime.value = totalTime;
      uniforms.uPointer.value.set(currentPointerX, currentPointerY);
      uniforms.uScroll.value = currentScroll;

      renderer.render(scene, camera);
    }
  };

  // 7. Context Loss Management
  const handleContextLost = (e: Event) => {
    e.preventDefault();
    if (animFrameId) cancelAnimationFrame(animFrameId);
  };

  const handleContextRestored = () => {
    if (!isDisposed) {
      lastTime = performance.now();
      animFrameId = requestAnimationFrame(loop);
    }
  };

  canvas.addEventListener("webglcontextlost", handleContextLost, false);
  canvas.addEventListener("webglcontextrestored", handleContextRestored, false);

  // Start loop and notify caller
  animFrameId = requestAnimationFrame(loop);
  onInitialized();

  // Return Clean Disposal Function
  return () => {
    isDisposed = true;
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (resizeTimeout) window.clearTimeout(resizeTimeout);

    window.removeEventListener("mousemove", handlePointerMove);
    window.removeEventListener("touchmove", handlePointerMove);
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);
    canvas.removeEventListener("webglcontextlost", handleContextLost);
    canvas.removeEventListener("webglcontextrestored", handleContextRestored);

    geometry.dispose();
    material.dispose();
    renderer.dispose();

    try {
      renderer.forceContextLoss();
    } catch {
      // Ignore force context loss errors on teardown
    }
  };
}
