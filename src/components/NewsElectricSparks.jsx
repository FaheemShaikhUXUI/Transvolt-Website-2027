import React, { useEffect, useRef } from 'react';

/**
 * NewsElectricSparks
 * Renders a single electric spark line shooting from the complete left edge of the screen (x = 0)
 * to strike the Green Bullet Dot.
 * Duration: exactly 200ms on each new news slide arrival.
 */
export default function NewsElectricSparks({ active, duration = 200, targetRef }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!active) {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fullscreen canvas
    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Target point: exact center of the green bullet dot
    let el = targetRef && targetRef.current;
    if (!el) {
      el = document.querySelector('[data-news-dot="true"]');
    }
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    // Origin: Complete edge of the left side (x = 0)
    const startX = 0;
    const startY = targetY + (Math.random() - 0.5) * 8;

    startTimeRef.current = performance.now();

    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.hypot(dx, dy);

    // Segments proportional to distance from edge
    const segments = Math.max(12, Math.min(26, Math.floor(dist / 22)));

    const render = (now) => {
      const elapsed = now - startTimeRef.current;
      const progress = elapsed / duration;

      if (progress >= 1) {
        ctx.clearRect(0, 0, width, height);
        animRef.current = null;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Fast attack & quick fade across 200ms
      const intensity = progress < 0.2 ? progress / 0.2 : (1 - progress) / 0.8;

      // Generate single electric spark lightning path
      const path = [{ x: startX, y: startY }];
      const nx = -dy / dist;
      const ny = dx / dist;

      for (let s = 1; s < segments; s++) {
        const t = s / segments;
        const envelope = Math.sin(t * Math.PI);
        const jitter = (Math.random() - 0.5) * 14 * envelope * intensity;
        const px = startX + dx * t + nx * jitter;
        const py = startY + dy * t + ny * jitter;
        path.push({ x: px, y: py });
      }
      path.push({ x: targetX, y: targetY });

      ctx.save();

      // 1. Single Outer Electric Aura
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let p = 1; p < path.length; p++) {
        ctx.lineTo(path[p].x, path[p].y);
      }
      ctx.strokeStyle = `rgba(52, 211, 153, ${(0.95 * intensity).toFixed(2)})`;
      ctx.lineWidth = 2.0;
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur = 10;
      ctx.stroke();

      // 2. Single Inner White-Hot Filament
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      for (let p = 1; p < path.length; p++) {
        ctx.lineTo(path[p].x, path[p].y);
      }
      ctx.strokeStyle = `rgba(255, 255, 255, ${(0.98 * intensity).toFixed(2)})`;
      ctx.lineWidth = 1.0;
      ctx.shadowBlur = 0;
      ctx.stroke();

      // 3. Impact Flash at Green Bullet Dot
      ctx.beginPath();
      ctx.arc(targetX, targetY, (5 + Math.random() * 3) * intensity, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(110, 231, 183, ${(0.65 * intensity).toFixed(2)})`;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.5 * intensity, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${(0.95 * intensity).toFixed(2)})`;
      ctx.fill();

      ctx.restore();

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [active, duration, targetRef]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
}
