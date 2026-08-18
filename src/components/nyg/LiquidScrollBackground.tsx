import { useEffect, useRef, useState, useCallback } from "react";

const VIDEO_DESKTOP_MP4 = "/bg-video/bg-desktop.mp4";
const VIDEO_DESKTOP_WEBM = "/bg-video/bg-desktop.webm";
const VIDEO_MOBILE_MP4 = "/bg-video/bg-mobile.mp4";
const POSTER_WEBP = "/bg-video/poster.webp";

const VIDEO_DURATION = 8.0; // 8 seconds

export function LiquidScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);

  // Mutable animation state in refs
  const scrollProgressRef = useRef<number>(0);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  // Opacity & range state
  const targetOpacityRef = useRef<number>(0);
  const currentOpacityRef = useRef<number>(0);

  // Pointer state for liquid refraction
  const mousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const smoothedMousePosRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const mouseVelocityRef = useRef<number>(0);
  const lastMouseTimeRef = useRef<number>(0);

  // Click ripple state
  const rippleRef = useRef<{
    active: boolean;
    x: number;
    y: number;
    radius: number;
    strength: number;
    startTime: number;
  }>({
    active: false,
    x: -1000,
    y: -1000,
    radius: 0,
    strength: 0,
    startTime: 0,
  });

  // WebGL resources
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const uniformsRef = useRef<{ [key: string]: WebGLUniformLocation | null }>({});

  const isVisibleRef = useRef<boolean>(true);
  const isTabActiveRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);
  const isNeedsRenderRef = useRef<boolean>(true);

  // 1. Initial Device & Accessibility check
  useEffect(() => {
    const checkMedia = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches);
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    };
    checkMedia();

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotion);

    window.addEventListener("resize", checkMedia, { passive: true });
    return () => {
      motionQuery.removeEventListener("change", handleMotion);
      window.removeEventListener("resize", checkMedia);
    };
  }, []);

  // 2. Setup WebGL2 shaders & pipeline
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      console.warn("WebGL2 not supported, falling back to 2D");
      return;
    }

    glRef.current = gl;

    const vsSource = `#version 300 es
      in vec2 a_position;
      out vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      uniform sampler2D u_texture;
      uniform vec2 u_resolution;
      uniform vec2 u_videoResolution;
      uniform vec2 u_pointer;
      uniform float u_velocity;
      uniform float u_rippleRadius;
      uniform float u_rippleStrength;
      uniform float u_opacity;

      in vec2 v_uv;
      out vec4 fragColor;

      void main() {
        vec2 screenCoord = vec2(v_uv.x * u_resolution.x, (1.0 - v_uv.y) * u_resolution.y);
        
        // Calculate cover fit UV mapping
        float screenAspect = u_resolution.x / u_resolution.y;
        float videoAspect = u_videoResolution.x / u_videoResolution.y;
        vec2 texCoord = v_uv;
        
        if (screenAspect > videoAspect) {
          float scale = screenAspect / videoAspect;
          texCoord.y = (v_uv.y - 0.5) / scale + 0.5;
        } else {
          float scale = videoAspect / screenAspect;
          // Keep subject slightly right on desktop
          texCoord.x = (v_uv.x - 0.5) / scale + 0.5;
        }

        // WebGL vs Video texture coordinate flip
        texCoord.y = 1.0 - texCoord.y;

        vec2 distortion = vec2(0.0);
        float specular = 0.0;

        // Pointer lens refraction
        if (u_velocity > 0.005) {
          float dist = distance(screenCoord, u_pointer);
          float radius = 110.0;
          if (dist < radius && dist > 0.0) {
            float normDist = dist / radius;
            float factor = sin(normDist * 3.14159265);
            vec2 dir = normalize(screenCoord - u_pointer);
            float displacement = factor * (5.5 * u_velocity);
            distortion += (dir * displacement) / u_resolution;
            specular += pow(factor, 3.0) * 0.18 * u_velocity;
          }
        }

        // Click ripple
        if (u_rippleStrength > 0.005) {
          float rDist = distance(screenCoord, u_pointer);
          float diff = abs(rDist - u_rippleRadius);
          float ringWidth = 32.0;
          if (diff < ringWidth) {
            float wave = cos((diff / ringWidth) * 3.14159265 * 0.5);
            vec2 dir = normalize(screenCoord - u_pointer + 0.001);
            float waveDisp = wave * 7.0 * u_rippleStrength;
            distortion += (dir * waveDisp) / u_resolution;
            specular += wave * 0.22 * u_rippleStrength;
          }
        }

        // Chromatic dispersion (Cyan edge separation)
        vec2 uvR = texCoord + distortion;
        vec2 uvG = texCoord + distortion * 0.96;
        vec2 uvB = texCoord + distortion * 0.88;

        // Clamp inside valid texture bounds
        vec4 colorR = texture(u_texture, clamp(uvR, 0.0, 1.0));
        vec4 colorG = texture(u_texture, clamp(uvG, 0.0, 1.0));
        vec4 colorB = texture(u_texture, clamp(uvB, 0.0, 1.0));

        vec3 finalColor = vec3(colorR.r, colorG.g, colorB.b);
        
        // Add subtle cyan highlight
        finalColor += vec3(0.47, 0.91, 1.0) * specular;

        fragColor = vec4(finalColor, u_opacity);
      }
    `;

    // Compile helper
    const compileShader = (src: string, type: number) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(vsSource, gl.VERTEX_SHADER);
    const fs = compileShader(fsSource, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    programRef.current = program;
    gl.useProgram(program);

    // Full screen quad geometry
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    uniformsRef.current = {
      u_texture: gl.getUniformLocation(program, "u_texture"),
      u_resolution: gl.getUniformLocation(program, "u_resolution"),
      u_videoResolution: gl.getUniformLocation(program, "u_videoResolution"),
      u_pointer: gl.getUniformLocation(program, "u_pointer"),
      u_velocity: gl.getUniformLocation(program, "u_velocity"),
      u_rippleRadius: gl.getUniformLocation(program, "u_rippleRadius"),
      u_rippleStrength: gl.getUniformLocation(program, "u_rippleStrength"),
      u_opacity: gl.getUniformLocation(program, "u_opacity"),
    };

    // Create Video Texture
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    textureRef.current = texture;
  }, []);

  // 3. Scroll tracking mapped from diagnostic (#diagnostic) through contact (#contact)
  useEffect(() => {
    const handleScroll = () => {
      const systemsEl = document.getElementById("systems");
      const diagnosticEl = document.getElementById("diagnostic");
      const contactEl = document.getElementById("contact");

      const scrollY = window.scrollY;

      // When the opaque #systems (System Studio) section is covering the screen,
      // completely suspend liquid background rendering to save GPU/CPU.
      if (diagnosticEl) {
        const diagRect = diagnosticEl.getBoundingClientRect();
        const winH = window.innerHeight;

        // Diagnostic section entrance: start fading in as diagnostic approaches viewport
        if (diagRect.top > winH) {
          // Inside #hero-stage or #systems (opaque paper section) -> 0% opacity
          targetOpacityRef.current = 0;
        } else if (diagRect.top > 0) {
          // Transitioning from #systems into #diagnostic
          const fadeProgress = (winH - diagRect.top) / winH;
          targetOpacityRef.current = Math.min(1, Math.max(0, fadeProgress));
        } else {
          // Fully past systems, inside mineral/teal/dark sections
          const contactRect = contactEl ? contactEl.getBoundingClientRect() : null;
          const contactBottomAbsolute = contactEl
            ? scrollY + contactRect!.bottom
            : document.body.scrollHeight;
          const endFade = contactBottomAbsolute - winH * 0.6;
          const fadeOutComplete = contactBottomAbsolute;

          if (scrollY >= endFade && scrollY <= fadeOutComplete) {
            targetOpacityRef.current = Math.max(
              0,
              1 - (scrollY - endFade) / (fadeOutComplete - endFade),
            );
          } else if (scrollY > fadeOutComplete) {
            targetOpacityRef.current = 0;
          } else {
            targetOpacityRef.current = 1.0;
          }
        }
      } else if (systemsEl) {
        const sysRect = systemsEl.getBoundingClientRect();
        if (sysRect.bottom > 0) {
          targetOpacityRef.current = 0;
        }
      }

      // Content scroll progress (from diagnostic entrance to Contact section end)
      if (diagnosticEl) {
        const diagTopAbsolute = scrollY + diagnosticEl.getBoundingClientRect().top;
        const contactRect = contactEl ? contactEl.getBoundingClientRect() : null;
        const contactBottomAbsolute = contactEl
          ? scrollY + contactRect!.bottom
          : document.body.scrollHeight;
        const totalContentDistance = Math.max(
          1,
          contactBottomAbsolute - diagTopAbsolute - window.innerHeight,
        );

        const rawProgress = Math.min(
          Math.max(0, (scrollY - diagTopAbsolute) / totalContentDistance),
          1,
        );

        scrollProgressRef.current = rawProgress;
        targetTimeRef.current = rawProgress * VIDEO_DURATION;
      }

      isNeedsRenderRef.current = true;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. Pointer movement & click listener for liquid refraction
  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      const prevX = mousePosRef.current.x;
      const prevY = mousePosRef.current.y;
      const dt = Math.max(16, now - lastMouseTimeRef.current);

      mousePosRef.current = { x: e.clientX, y: e.clientY };

      if (prevX > 0) {
        const dx = e.clientX - prevX;
        const dy = e.clientY - prevY;
        const dist = Math.hypot(dx, dy);
        const speed = dist / dt; // pixels per ms
        mouseVelocityRef.current = Math.min(1.0, speed * 1.8);
      }

      lastMouseTimeRef.current = now;
      isNeedsRenderRef.current = true;
    };

    const handlePointerLeave = () => {
      mouseVelocityRef.current = 0;
      mousePosRef.current = { x: -1000, y: -1000 };
      isNeedsRenderRef.current = true;
    };

    const handleClick = (e: MouseEvent) => {
      rippleRef.current = {
        active: true,
        x: e.clientX,
        y: e.clientY,
        radius: 20,
        strength: 1.0,
        startTime: performance.now(),
      };
      isNeedsRenderRef.current = true;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("click", handleClick, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("click", handleClick);
    };
  }, [isMobile, prefersReducedMotion]);

  // 5. Video initialization & seeking loop
  useEffect(() => {
    initWebGL();

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
      video.pause();
      isNeedsRenderRef.current = true;
    };

    video.addEventListener("canplay", handleCanPlay);
    video.load();

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [initWebGL]);

  // 6. Master Render & Seeking rAF Engine
  useEffect(() => {
    let lastTime = performance.now();

    const renderLoop = (time: number) => {
      rafIdRef.current = requestAnimationFrame(renderLoop);

      if (!isVisibleRef.current || !isTabActiveRef.current) return;

      const dt = Math.min(50, time - lastTime);
      lastTime = time;

      const video = videoRef.current;
      const gl = glRef.current;
      const program = programRef.current;
      const canvas = canvasRef.current;

      // A. Smooth video currentTime interpolation (spring seeking) - only when background is becoming or is active
      const targetTime = targetTimeRef.current;
      const curTime = currentTimeRef.current;
      const timeDiff = targetTime - curTime;

      const isEffectActive = currentOpacityRef.current > 0.01 || targetOpacityRef.current > 0.01;

      if (isEffectActive && Math.abs(timeDiff) > 0.005) {
        currentTimeRef.current += timeDiff * 0.12; // Responsive smooth lerp
        if (video && video.readyState >= 2) {
          video.currentTime = currentTimeRef.current;
        }
        isNeedsRenderRef.current = true;
      } else if (!isEffectActive) {
        // Keep target time stored so it jumps smoothly to the right frame upon entering
        currentTimeRef.current = targetTime;
      }

      // B. Smooth opacity crossfade
      const opDiff = targetOpacityRef.current - currentOpacityRef.current;
      if (Math.abs(opDiff) > 0.005) {
        currentOpacityRef.current += opDiff * 0.08;
        isNeedsRenderRef.current = true;
      }

      // C. Pointer inertial tracking & decay (only when visible)
      if (isEffectActive && !isMobile && !prefersReducedMotion) {
        const mxDiff = mousePosRef.current.x - smoothedMousePosRef.current.x;
        const myDiff = mousePosRef.current.y - smoothedMousePosRef.current.y;

        smoothedMousePosRef.current.x += mxDiff * 0.15;
        smoothedMousePosRef.current.y += myDiff * 0.15;

        // Velocity decay over ~350ms
        if (mouseVelocityRef.current > 0.001) {
          mouseVelocityRef.current *= Math.pow(0.92, dt / 16);
          isNeedsRenderRef.current = true;
        } else {
          mouseVelocityRef.current = 0;
        }

        // Ripple animation update (expand from 30px to 130px over 600ms)
        const ripple = rippleRef.current;
        if (ripple.active) {
          const elapsed = time - ripple.startTime;
          const duration = 600;
          if (elapsed < duration) {
            const progress = elapsed / duration;
            ripple.radius = 25 + progress * 105;
            ripple.strength = (1 - progress) * (1 - progress);
            isNeedsRenderRef.current = true;
          } else {
            ripple.active = false;
            ripple.strength = 0;
          }
        }
      }

      // If opacity is practically zero, skip GPU drawing
      if (currentOpacityRef.current < 0.01) {
        return;
      }

      // D. Draw frame with WebGL2 (if needs render)
      if (gl && program && canvas && video && video.readyState >= 2) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.useProgram(program);

        // Update video texture
        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);

        // Pass uniforms
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        gl.uniform2f(uniformsRef.current.u_resolution, canvas.width, canvas.height);
        gl.uniform2f(
          uniformsRef.current.u_videoResolution,
          video.videoWidth || 1600,
          video.videoHeight || 900,
        );

        // Pointer coords in canvas buffer pixels
        gl.uniform2f(
          uniformsRef.current.u_pointer,
          smoothedMousePosRef.current.x * dpr,
          smoothedMousePosRef.current.y * dpr,
        );
        gl.uniform1f(uniformsRef.current.u_velocity, mouseVelocityRef.current);
        gl.uniform1f(uniformsRef.current.u_rippleRadius, rippleRef.current.radius * dpr);
        gl.uniform1f(uniformsRef.current.u_rippleStrength, rippleRef.current.strength);

        // Target visual intensity: ~0.25 to 0.32
        const displayOpacity = currentOpacityRef.current * 0.3;
        gl.uniform1f(uniformsRef.current.u_opacity, displayOpacity);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        isNeedsRenderRef.current = false;
      }
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isMobile, prefersReducedMotion]);

  // 7. Canvas Resize handling with DPR capping
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      isNeedsRenderRef.current = true;
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 8. Tab visibility listeners
  useEffect(() => {
    const handleVisibility = () => {
      isTabActiveRef.current = !document.hidden;
      if (isTabActiveRef.current) isNeedsRenderRef.current = true;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Hidden Paused Video Element Source for Texture Sampling */}
      <video ref={videoRef} muted playsInline preload="auto" className="hidden" aria-hidden="true">
        <source src={isMobile ? VIDEO_MOBILE_MP4 : VIDEO_DESKTOP_WEBM} type="video/webm" />
        <source src={isMobile ? VIDEO_MOBILE_MP4 : VIDEO_DESKTOP_MP4} type="video/mp4" />
      </video>

      {/* Reduced-Motion & No-WebGL Poster Fallback */}
      {prefersReducedMotion && (
        <img
          src={POSTER_WEBP}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
        />
      )}

      {/* Active WebGL2 Liquid Refraction Canvas */}
      {!prefersReducedMotion && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      )}

      {/* Section-wide atmospheric teal/ink grading tint */}
      <div className="absolute inset-0 bg-[#080A09]/45 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#080A09] via-transparent to-[#080A09] pointer-events-none opacity-80" />
    </div>
  );
}
