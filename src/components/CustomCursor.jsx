import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * CustomCursor
 * Adaptive Cursor:
 * - Visible Light Gray stroke (#d1d5db / #e2e8f0) on any dark surface (no matter the theme)
 * - Visible Dark Gray stroke (#374151) on any light surface (no matter the theme)
 * - 7px radius circle (14px diameter), 1.5px crisp stroke, transparent fill
 * - Hover clickable: Fills with Blue color (#3b82f6)
 * - Click dot fill: Vibrant Electric Blue (#0070f3) for 100ms
 * - Click stamp: 1-second Glowing Vibrant Blue STROKE ONLY Stamp
 */
export const CustomCursor = () => {
  const { isDark } = useTheme();
  const trackerRef = useRef(null);
  const dotRef = useRef(null);
  const canvasRef = useRef(null);
  const lavaTimerRef = useRef(null);

  const isDarkSurfaceRef = useRef(isDark);
  const isClickableRef = useRef(false);
  const isLavaClickRef = useRef(false);

  // Helper: Parse rgb/rgba background color to perceived luminance
  const parseLuminance = (colorStr) => {
    if (!colorStr || colorStr === 'transparent' || colorStr === 'rgba(0, 0, 0, 0)') {
      return null;
    }
    const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
    if (a < 0.2) return null; // Treat mostly transparent background as inherited
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    // Standard perceptual luminance formula
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };

  // Helper: Bulletproof surface darkness detection (Light Gray on Dark, Dark Gray on Light)
  const isDarkBackground = (target) => {
    if (!target) {
      return isDark || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
    }

    let el = target.nodeType === 1 ? target : target.parentElement;
    if (!el) {
      return isDark || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
    }

    // 1. Fast direct tag & attribute checks
    try {
      if (el.closest('footer, [data-bg="dark"]')) return true;
      if (el.closest('[data-bg="light"]')) return false;
    } catch (e) {
      // ignore
    }

    // 2. Walk up ancestors inspecting rendered background color
    try {
      let curr = el;
      let depth = 0;
      while (curr && curr !== document.documentElement && depth < 12) {
        depth++;
        if (curr.tagName === 'FOOTER') return true;

        if (curr.getAttribute) {
          const bgAttr = curr.getAttribute('data-bg');
          if (bgAttr === 'dark') return true;
          if (bgAttr === 'light') return false;
        }

        // Check computed background-color
        const style = window.getComputedStyle(curr);
        const lum = parseLuminance(style.backgroundColor);
        if (lum !== null) {
          return lum < 0.5;
        }

        curr = curr.parentElement;
      }
    } catch (e) {
      // ignore
    }

    // 3. Fallback to active theme
    return isDark || (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));
  };

  // Helper: Bulletproof clickable detection
  const isClickableElement = (target) => {
    if (!target) return false;
    let el = target.nodeType === 1 ? target : target.parentElement;
    if (!el) return false;

    try {
      if (typeof el.closest === 'function') {
        return el.closest('a, button, [role="button"], input, select, textarea, .cursor-pointer, [onclick]') !== null;
      }
    } catch (e) {
      // ignore
    }

    try {
      let curr = el;
      let depth = 0;
      while (curr && curr !== document.body && depth < 15) {
        depth++;
        const tag = curr.tagName;
        if (tag === 'A' || tag === 'BUTTON' || tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA') return true;
        if (curr.getAttribute && (curr.getAttribute('role') === 'button' || curr.getAttribute('onclick'))) return true;
        const cls = curr.className;
        if (typeof cls === 'string' && cls.includes('cursor-pointer')) return true;
        curr = curr.parentElement;
      }
    } catch (e) {
      // ignore
    }

    return false;
  };

  // Sync stroke color immediately on theme toggle
  useEffect(() => {
    isDarkSurfaceRef.current = isDark;
    if (dotRef.current && !isLavaClickRef.current && !isClickableRef.current) {
      // Light gray on dark surface, Dark gray on light surface
      dotRef.current.style.borderColor = isDark ? '#d1d5db' : '#374151';
      dotRef.current.style.boxShadow = isDark
        ? '0 0 4px rgba(209, 213, 219, 0.8), 0 0 1px #ffffff'
        : '0 0 2px rgba(0, 0, 0, 0.25)';
    }
  }, [isDark]);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse / trackpad)
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const tracker = trackerRef.current;
    const dot = dotRef.current;
    const canvas = canvasRef.current;
    if (!tracker || !canvas || !dot) return;

    // Fast zero-re-render direct DOM style synchronizer
    const syncDotStyles = () => {
      if (!dot) return;

      if (isLavaClickRef.current) {
        dot.style.backgroundColor = '#0070f3';
        dot.style.borderColor = '#60a5fa';
        dot.style.transform = 'scale(1.25)';
        dot.style.boxShadow = '0 0 14px #0070f3, 0 0 22px rgba(0, 112, 243, 0.9)';
      } else if (isClickableRef.current) {
        dot.style.backgroundColor = '#3b82f6';
        dot.style.borderColor = isDarkSurfaceRef.current ? '#e5e7eb' : '#2563eb';
        dot.style.transform = 'scale(1.35)';
        dot.style.boxShadow = isDarkSurfaceRef.current
          ? '0 0 12px rgba(59, 130, 246, 0.9), 0 0 4px #ffffff'
          : '0 0 10px rgba(59, 130, 246, 0.7)';
      } else {
        const isDarkSur = isDarkSurfaceRef.current;
        dot.style.backgroundColor = 'transparent';
        // Light Gray (#d1d5db) on dark surface, Dark Gray (#374151) on light surface
        dot.style.borderColor = isDarkSur ? '#d1d5db' : '#374151';
        dot.style.transform = 'scale(1)';
        dot.style.boxShadow = isDarkSur
          ? '0 0 4px rgba(209, 213, 219, 0.85), 0 0 1px #ffffff'
          : '0 0 2px rgba(0, 0, 0, 0.25)';
      }
    };
    syncDotStyles();

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Retina / High-DPI screen support
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Effect collections
    const lavaStamps = [];

    let isVisible = false;
    let lastX = -100;
    let lastY = -100;

    // Fast robust animation loop for canvas effects
    let animId = null;
    const animate = (now) => {
      try {
        ctx.clearRect(0, 0, width, height);

        let hasActiveEffects = false;

        // Draw 1-second Vibrant Blue Glowing STROKE ONLY Stamp
        for (let i = lavaStamps.length - 1; i >= 0; i--) {
          const stamp = lavaStamps[i];
          const age = now - stamp.birth;
          if (age < 0) continue;
          const progress = Math.min(1, Math.max(0, age / stamp.duration));

          if (progress >= 1) {
            lavaStamps.splice(i, 1);
            continue;
          }

          hasActiveEffects = true;
          const opacity = (1 - progress) * 0.95;

          ctx.save();
          // Outer bloom glow pass (vibrant blue bloom)
          ctx.lineWidth = 2.4;
          ctx.strokeStyle = `rgba(0, 112, 243, ${opacity * 0.9})`;
          ctx.shadowColor = '#0070f3';
          ctx.shadowBlur = 18 * (1 - progress * 0.25);
          ctx.beginPath();
          ctx.arc(stamp.x, stamp.y, stamp.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Crisp electric blue inner glow core pass
          ctx.lineWidth = 1.8;
          ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`;
          ctx.shadowColor = '#60a5fa';
          ctx.shadowBlur = 9 * (1 - progress * 0.25);
          ctx.beginPath();
          ctx.arc(stamp.x, stamp.y, stamp.radius, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (hasActiveEffects) {
          animId = requestAnimationFrame(animate);
        } else {
          ctx.clearRect(0, 0, width, height);
          animId = null;
        }
      } catch (err) {
        console.error('CustomCursor animate error:', err);
        animId = null;
      }
    };

    const triggerCanvasLoop = () => {
      if (!animId) {
        animId = requestAnimationFrame(animate);
      }
    };

    // Ultra-Fast Zero-Reflow Pointer Tracking (0ms lag, zero forced reflows)
    const updatePointer = (clientX, clientY, target) => {
      lastX = clientX;
      lastY = clientY;

      if (!isVisible) {
        isVisible = true;
        tracker.style.opacity = '1';
      }

      tracker.style.transform = `translate3d(${clientX - 7}px, ${clientY - 7}px, 0)`;

      if (target) {
        const clickable = isClickableElement(target);
        const isDarkSur = isDarkBackground(target);

        let changed = false;
        if (isDarkSur !== isDarkSurfaceRef.current) {
          isDarkSurfaceRef.current = isDarkSur;
          changed = true;
        }

        if (clickable !== isClickableRef.current) {
          isClickableRef.current = clickable;
          changed = true;
        }

        if (changed) {
          syncDotStyles();
        }
      }
    };

    const onPointerMove = (e) => {
      updatePointer(e.clientX, e.clientY, e.target);
    };

    const onPointerEnter = () => {
      isVisible = true;
      tracker.style.opacity = '1';
    };

    const onMouseLeave = () => {
      isVisible = false;
      tracker.style.opacity = '0';
    };

    // Update cursor style on scroll even when pointer is stationary
    const onScroll = () => {
      if (lastX >= 0 && lastY >= 0) {
        try {
          const el = document.elementFromPoint(lastX, lastY);
          if (el) {
            updatePointer(lastX, lastY, el);
          }
        } catch (e) {
          // ignore
        }
      }
    };

    // 100% Reliable Click Impact Handling (Uses Capture Phase)
    let lastClickTime = 0;
    const handleImpact = (clientX, clientY) => {
      const now = performance.now();
      if (now - lastClickTime < 30) return;
      lastClickTime = now;

      const x = clientX;
      const y = clientY;

      // 1. Vibrant Blue dot fill for 100ms with instant direct DOM update
      isLavaClickRef.current = true;
      syncDotStyles();
      if (lavaTimerRef.current) clearTimeout(lavaTimerRef.current);
      lavaTimerRef.current = setTimeout(() => {
        isLavaClickRef.current = false;
        syncDotStyles();
      }, 100);

      // 2. Spawn 1-second Glowing Vibrant Blue STROKE ONLY Stamp (Matching cursor radius 7px)
      lavaStamps.push({
        x,
        y,
        radius: 7,
        birth: now,
        duration: 1000,
      });

      triggerCanvasLoop();
    };

    const onPointerDown = (e) => {
      handleImpact(e.clientX, e.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerenter', onPointerEnter, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('pointerdown', onPointerDown, { capture: true, passive: true });
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerenter', onPointerEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('pointerdown', onPointerDown, { capture: true });
      window.removeEventListener('scroll', onScroll, { capture: true });
      if (lavaTimerRef.current) clearTimeout(lavaTimerRef.current);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isDark]);

  return (
    <>
      {/* Fullscreen Canvas for Electric Sparks, Shockwaves, Lava Stamp */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99999998]"
        aria-hidden="true"
      />

      {/* Outer Tracker: Strictly 1:1 hardware locked to pointer (NO transition, 0ms lag) */}
      <div
        ref={trackerRef}
        className="fixed top-0 left-0 pointer-events-none z-[99999999] opacity-0"
        style={{
          width: '14px',
          height: '14px',
          willChange: 'transform',
          transition: 'opacity 100ms ease',
        }}
        aria-hidden="true"
      >
        {/* Inner Circle Dot: 7px radius (14px diameter) with light gray / dark gray stroke */}
        <div
          ref={dotRef}
          className="w-full h-full rounded-full"
          style={{
            border: `1.5px solid ${isDark ? '#d1d5db' : '#374151'}`,
            backgroundColor: 'transparent',
            transform: 'scale(1)',
            transition: 'background-color 100ms ease-out, border-color 100ms ease, transform 100ms ease-out, box-shadow 100ms ease',
            boxShadow: isDark
              ? '0 0 4px rgba(209, 213, 219, 0.85), 0 0 1px #ffffff'
              : '0 0 2px rgba(0, 0, 0, 0.25)',
          }}
        />
      </div>
    </>
  );
};

export default CustomCursor;
