import React, { useEffect, useRef, useState } from 'react';

/**
 * CustomMagneticCursor
 * Glowing white custom cursor dot with a smooth trailing aura ring
 * that scales up and glows on interactive hover.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const isMouseDownRef = useRef(false);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = Boolean(
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[data-hover]') ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'A'
      );
      isHoveredRef.current = isInteractive;
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth trailing loop
    let rafId;
    const animate = () => {
      // Ring follows mouse with smooth damping (lerp)
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      if (ringRef.current) {
        const scale = isMouseDownRef.current
          ? 0.75
          : isHoveredRef.current
          ? 1.9
          : 1.0;

        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Smooth Trailing Aura Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 w-11 h-11 rounded-full border border-white/50 backdrop-blur-[1px] bg-white/[0.04] shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-[border-color,background-color] duration-200 ease-out will-change-transform"
        style={{
          boxShadow: '0 0 25px rgba(255, 255, 255, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.2)',
        }}
      />

      {/* Glowing White Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 w-2 h-2 rounded-full bg-white shadow-[0_0_12px_#ffffff] will-change-transform"
      />
    </div>
  );
}
