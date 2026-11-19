import React, { useEffect, useRef } from 'react';

/**
 * BulletGlowingSmoke
 * Renders slow, silky gray smoke (30% opacity) drifting gently upward over 2.4s
 * plus a subtle smoke haze and micro-wisps near/around the Green Bullet Dot.
 */
export default function BulletGlowingSmoke({ active, targetRef }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particlesRef = useRef([]);
  const lastSpawnRef = useRef(0);
  const activeRef = useRef(active);

  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = (now) => {
      // Find current dot position on screen
      let el = targetRef && targetRef.current;
      if (!el) {
        el = document.querySelector('[data-news-dot="true"]');
      }

      let dotX = 0;
      let dotY = 0;
      let hasDot = false;

      if (el) {
        const rect = el.getBoundingClientRect();
        dotX = rect.left + rect.width / 2;
        dotY = rect.top + rect.height / 2;
        hasDot = true;
      }

      // Spawn new slow gray smoke particles while active (spaced out to avoid dense compounding)
      if (activeRef.current && hasDot) {
        if (now - lastSpawnRef.current > 110) {
          lastSpawnRef.current = now;

          // 1. Slow upward rising gray smoke (drift over 2.4 sec)
          particlesRef.current.push({
            isPerimeter: false,
            x: dotX + (Math.random() - 0.5) * 2.5,
            y: dotY - 1,
            vx: (Math.random() - 0.5) * 0.06,
            vy: -(0.16 + Math.random() * 0.14), // slow, gentle upward drift over 2.4s
            radius: 2.0 + Math.random() * 1.2,
            maxRadius: 8.5 + Math.random() * 4.5,
            maxAlpha: 0.30, // 30% opacity
            age: 0,
            life: 2400, // 2.4 sec duration
            phase: Math.random() * Math.PI * 2,
            curlSpeed: 0.0016 + Math.random() * 0.0012,
          });

          // 2. Small percent (35% chance) hovering near/around the bullet point
          if (Math.random() < 0.35) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 1.5 + Math.random() * 3.5;
            particlesRef.current.push({
              isPerimeter: true,
              x: dotX + Math.cos(angle) * dist,
              y: dotY + Math.sin(angle) * dist,
              vx: (Math.random() - 0.5) * 0.03,
              vy: -(0.02 + Math.random() * 0.04), // barely rises, stays right around the dot
              radius: 1.5 + Math.random() * 1.0,
              maxRadius: 3.5 + Math.random() * 1.8,
              maxAlpha: 0.20, // subtle 20% opacity near dot
              age: 0,
              life: 1400 + Math.random() * 600,
              phase: Math.random() * Math.PI * 2,
              curlSpeed: 0.002,
            });
          }
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle ambient smoke haze right around the bullet point (5% - 10% soft haze)
      if (activeRef.current && hasDot) {
        ctx.save();
        const haloPulse = 0.06 + Math.sin(now * 0.003) * 0.025; // very subtle 5% - 8.5%
        const haloGrad = ctx.createRadialGradient(dotX, dotY, 1, dotX, dotY, 7);
        haloGrad.addColorStop(0, `rgba(200, 205, 210, ${haloPulse.toFixed(3)})`);
        haloGrad.addColorStop(0.5, `rgba(170, 175, 180, ${(haloPulse * 0.5).toFixed(3)})`);
        haloGrad.addColorStop(1, 'rgba(150, 155, 160, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += 16;

        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.age / p.life;

        // Slow smooth upward motion with gentle swaying
        p.x += p.vx + Math.sin(p.age * p.curlSpeed + p.phase) * (p.isPerimeter ? 0.04 : 0.10);
        p.y += p.vy;

        // Gradual smoke puff expansion
        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.65);

        // Alpha envelope capped strictly at 30% opacity
        let alpha = 0;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * p.maxAlpha;
        } else {
          alpha = (1 - (progress - 0.15) / 0.85) * p.maxAlpha;
        }

        alpha = Math.min(alpha, 0.30); // 30% max opacity
        if (alpha <= 0.004) continue;

        // Render neutral gray smoke puff
        ctx.save();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        // Light gray smoke center
        grad.addColorStop(0, `rgba(210, 215, 220, ${alpha.toFixed(3)})`);
        // Neutral gray smoke mid
        grad.addColorStop(0.45, `rgba(175, 180, 186, ${(alpha * 0.6).toFixed(3)})`);
        // Feathery transparent outer
        grad.addColorStop(1, 'rgba(150, 155, 160, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (activeRef.current || particles.length > 0) {
        animRef.current = requestAnimationFrame(render);
      } else {
        animRef.current = null;
      }
    };

    if (active || particlesRef.current.length > 0) {
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [active, targetRef]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
      style={{
        width: '100vw',
        height: '100vh',
        opacity: 0.30,
      }}
    />
  );
}
