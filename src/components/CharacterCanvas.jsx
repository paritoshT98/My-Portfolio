import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * CharacterCanvas
 * 60 FPS Zero-ghosting, zero-lag cursor tracking canvas renderer.
 * Strictly adheres to:
 * - NO CSS 3D transforms (canvas & container rock-solid motionless)
 * - NO video playback / seeking at runtime
 * - Exactly ONE crisp WebP frame drawn at 100% opacity per frame
 * - Shortest-path circular angular lerp (factor ~0.26, ~35ms latency)
 * - Deadzone eye-contact within ~12% screen radius
 */
export default function CharacterCanvas({ onTelemetryUpdate, onLoaded }) {
  const canvasRef = useRef(null);
  const framesRef = useRef([]);
  const centerImageRef = useRef(null);

  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Tracking state in refs for 60fps rAF loop without React re-render overhead
  const mousePosRef = useRef({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 });
  const hasMovedMouseRef = useRef(false);
  const smoothedAngleRef = useRef(0);
  const inDeadzoneRef = useRef(true); // Start in center eye contact
  const activeFrameIndexRef = useRef(0);

  // Preload all 64 frames + 1 center frame
  useEffect(() => {
    const TOTAL_FRAMES = 64;
    let loadedCount = 0;
    const frames = new Array(TOTAL_FRAMES);

    const checkComplete = () => {
      loadedCount++;
      const progress = Math.min(100, Math.round((loadedCount / (TOTAL_FRAMES + 1)) * 100));
      setLoadProgress(progress);

      if (loadedCount >= TOTAL_FRAMES + 1) {
        setIsReady(true);
        if (onLoaded) onLoaded();
      }
    };

    // Preload 64 directional frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(2, '0');
      img.src = `/frames/frame_${paddedIndex}.webp`;
      img.onload = checkComplete;
      img.onerror = checkComplete;
      frames[i] = img;
    }
    framesRef.current = frames;

    // Preload center frame
    const centerImg = new Image();
    centerImg.src = '/frames/center.webp';
    centerImg.onload = checkComplete;
    centerImg.onerror = checkComplete;
    centerImageRef.current = centerImg;

    return () => {
      // Cleanup image sources on unmount
      frames.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
      centerImg.onload = null;
      centerImg.onerror = null;
    };
  }, [onLoaded]);

  // Shortest-path circular angular lerp
  const lerpAngle = useCallback((current, target, factor) => {
    let diff = target - current;
    // Wrap to [-PI, PI] to guarantee shortest path around circle
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;
    return current + diff * factor;
  }, []);

  // Main 60 FPS Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); // alpha: false for maximum render speed

    let animationFrameId;

    // Handle high-DPI scaling & resize
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      hasMovedMouseRef.current = true;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        mousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        hasMovedMouseRef.current = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Render loop
    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Original video frame dimension
      const imgW = 1280;
      const imgH = 720;

      // Calculate object-fit: cover scale and offsets in CSS pixels
      const scale = Math.max(width / imgW, height / imgH);
      const drawW = imgW * scale;
      const drawH = imgH * scale;
      const drawX = (width - drawW) / 2;
      const drawY = (height - drawH) / 2;

      // Character's face center coordinate on screen
      // Calibrated at 50.0% horizontal, 38.9% vertical of video frame
      const faceX = drawX + 0.500 * drawW;
      const faceY = drawY + 0.389 * drawH;

      // Vector from face center to cursor
      const dx = mousePosRef.current.x - faceX;
      const dy = mousePosRef.current.y - faceY;
      const dist = Math.hypot(dx, dy);

      // Deadzone check: within ~12% of screen radius
      const screenRadius = Math.min(width, height);
      const deadzoneRadius = screenRadius * 0.12;
      const inDeadzone = !hasMovedMouseRef.current || dist <= deadzoneRadius;
      inDeadzoneRef.current = inDeadzone;

      // Target angle relative to face center [-PI, PI]
      const targetAngle = Math.atan2(dy, dx);

      // Fast response shortest-path lerp (0.26 factor gives ~35ms zero-lag response)
      smoothedAngleRef.current = lerpAngle(smoothedAngleRef.current, targetAngle, 0.26);

      // Normalize smoothed angle to [0, 2*PI)
      let normAngle = smoothedAngleRef.current;
      while (normAngle < 0) normAngle += Math.PI * 2;
      while (normAngle >= Math.PI * 2) normAngle -= Math.PI * 2;

      // Map [0, 2*PI) to 64 frame indices (0..63)
      const frameIndex = Math.round((normAngle / (Math.PI * 2)) * 64) % 64;
      activeFrameIndexRef.current = frameIndex;

      // Select frame: center.webp for deadzone, otherwise frame[frameIndex]
      const activeImage = inDeadzone
        ? centerImageRef.current
        : framesRef.current[frameIndex];

      // Draw EXACTLY ONE crisp frame at 100% opacity (no alpha blending to prevent ghosting)
      if (activeImage && activeImage.complete) {
        // Draw image directly over the frame area
        ctx.drawImage(activeImage, drawX, drawY, drawW, drawH);
      } else {
        // Fallback fill to match background seamlessly while image warms up
        ctx.fillStyle = '#729ec1';
        ctx.fillRect(0, 0, width, height);
      }

      // Dispatch telemetry data for radar / compass UI
      if (onTelemetryUpdate) {
        const degrees = Math.round((normAngle * 180) / Math.PI);
        onTelemetryUpdate({
          angle: degrees,
          frameIndex,
          inDeadzone,
          cursorDistance: Math.round(dist),
          deadzoneRadius: Math.round(deadzoneRadius),
          facePosition: { x: Math.round(faceX), y: Math.round(faceY) }
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [lerpAngle, onTelemetryUpdate]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
      {/* 
        CRITICAL CONSTRAINT: 
        NO CSS 3D transforms (no perspective, rotateX, rotateY). 
        Canvas and container remain 100% rock-solid motionless.
      */}
      <canvas
        ref={canvasRef}
        className="block w-full h-full bg-[#729ec1]"
        style={{
          width: '100vw',
          height: '100vh',
          imageRendering: '-webkit-optimize-contrast',
        }}
      />

      {/* Elegant loading progress indicator while WebP frames buffer */}
      {!isReady && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#729ec1] text-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-3xl font-cursive tracking-wide">Loading Experience</div>
            <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <div className="text-xs uppercase tracking-[0.2em] text-white/70">
              Buffering 64 frames • {loadProgress}%
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
