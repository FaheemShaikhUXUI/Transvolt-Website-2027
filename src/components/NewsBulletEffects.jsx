import React, { useEffect, useRef } from 'react';

/**
 * NewsBulletEffects
 * 1. Single electric spark line (200ms) shooting from complete left edge (x=0) to Green Bullet Dot at start of hold time.
 * 2. Ethereal gray smoke (2.4s) at 30% opacity drifting slowly upward from the bullet point for remaining hold time.
 *
 * Persistent z-50 canvas guaranteeing zero missed sparks on every news slide.
 */
export default function NewsBulletEffects({ isSparkActive, isSmokeActive, targetRef }) {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const sparkStartRef = useRef(0);
  const smokeStartRef = useRef(0);
  const prevSmokeActiveRef = useRef(false);
  const particlesRef = useRef([]);
  const lastSpawnRef = useRef(0);

  // When isSparkActive becomes true (new news cycle), reset start time AND clear old particles to avoid stacking!
  useEffect(() => {
    if (isSparkActive) {
      sparkStartRef.current = performance.now();
      particlesRef.current = []; // Fresh reset on each cycle so opacity never builds up
      lastSpawnRef.current = 0;
    }
  }, [isSparkActive]);

  // When isSmokeActive becomes true, record start timestamp for 2.4s yellow lava glow and gradual unglowing
  useEffect(() => {
    if (isSmokeActive && !prevSmokeActiveRef.current) {
      smokeStartRef.current = performance.now();
      particlesRef.current = []; // Clear any leftover particles at the start of smoke
      lastSpawnRef.current = 0;
    }
    prevSmokeActiveRef.current = isSmokeActive;
  }, [isSmokeActive]);

  // Main render loop driven by isSparkActive and isSmokeActive
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
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let isRunning = true;

    const render = (now) => {
      if (!isRunning) return;

      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        resize();
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Locate Green Bullet Dot on screen
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
        hasDot = rect.width > 0 && rect.top > 0;
      }

      // -----------------------------------------------------------------
      // 1. ELECTRIC SPARK (Active for 200ms at start of hold)
      // -----------------------------------------------------------------
      if (isSparkActive && hasDot) {
        const elapsed = now - (sparkStartRef.current || now);
        const progress = Math.min(1, Math.max(0, elapsed / 200));
        // High visibility intensity envelope
        const intensity = progress < 0.1 ? progress / 0.1 : (1 - progress) / 0.9;
        const safeIntensity = Math.max(0.45, intensity);

        const startX = 0; // Complete left edge of the screen
        const startY = dotY + Math.sin(now * 0.04) * 3;
        const targetX = dotX;
        const targetY = dotY;

        const dx = targetX - startX;
        const dy = targetY - startY;
        const dist = Math.hypot(dx, dy);

        const segments = Math.max(14, Math.min(28, Math.floor(dist / 20)));
        const nx = -dy / dist;
        const ny = dx / dist;

        const path = [{ x: startX, y: startY }];
        for (let s = 1; s < segments; s++) {
          const t = s / segments;
          const envelope = Math.sin(t * Math.PI);
          const jitter = (Math.random() - 0.5) * 15 * envelope * safeIntensity;
          const px = startX + dx * t + nx * jitter;
          const py = startY + dy * t + ny * jitter;
          path.push({ x: px, y: py });
        }
        path.push({ x: targetX, y: targetY });

        ctx.save();

        // 1a. Outer Plasma Aura Glow
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let p = 1; p < path.length; p++) {
          ctx.lineTo(path[p].x, path[p].y);
        }
        ctx.strokeStyle = `rgba(52, 211, 153, ${(0.95 * safeIntensity).toFixed(2)})`;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // 1b. Inner White-Hot Filament
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let p = 1; p < path.length; p++) {
          ctx.lineTo(path[p].x, path[p].y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.98 * safeIntensity).toFixed(2)})`;
        ctx.lineWidth = 1.1;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // 1c. Impact Flash at Green Bullet Dot
        ctx.beginPath();
        ctx.arc(targetX, targetY, (6 + Math.random() * 3) * safeIntensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(110, 231, 183, ${(0.75 * safeIntensity).toFixed(2)})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(targetX, targetY, 2.8 * safeIntensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.98 * safeIntensity).toFixed(2)})`;
        ctx.fill();

        ctx.restore();
      }

      // -----------------------------------------------------------------
      // 2. MOLTEN YELLOW LAVA GLOW & GLOWING GRAY SMOKE (20% opacity, 50% reduced glow, 2.4s unglow)
      // -----------------------------------------------------------------
      if (isSmokeActive && hasDot) {
        // Calculate 2.4s cooldown / unglowing curve
        const smokeElapsed = Math.max(0, now - (smokeStartRef.current || now));
        const smokeProgress = Math.min(1, smokeElapsed / 2400); // 0.0 at spark impact -> 1.0 at 2.4s
        const lavaIntensity = Math.pow(1 - smokeProgress, 1.35); // Begins soft yellow lava, smoothly unglows till end

        // Render Molten Yellow Lava Glow on and around the bullet dot (+30% radius)
        if (lavaIntensity > 0.005) {
          ctx.save();
          // Fiery lava outer aura (+30% larger radius: 11px + 4px)
          const auraRadius = 11 * lavaIntensity + 4;
          const lavaGrad = ctx.createRadialGradient(dotX, dotY, 1, dotX, dotY, auraRadius);
          lavaGrad.addColorStop(0, `rgba(255, 235, 90, ${(0.42 * lavaIntensity).toFixed(3)})`); // soft lava yellow
          lavaGrad.addColorStop(0.40, `rgba(245, 175, 20, ${(0.32 * lavaIntensity).toFixed(3)})`); // soft molten gold
          lavaGrad.addColorStop(0.75, `rgba(235, 90, 10, ${(0.16 * lavaIntensity).toFixed(3)})`); // subtle amber fringe
          lavaGrad.addColorStop(1, 'rgba(230, 80, 10, 0)');
          ctx.fillStyle = lavaGrad;
          ctx.beginPath();
          ctx.arc(dotX, dotY, auraRadius, 0, Math.PI * 2);
          ctx.fill();

          // Soft molten yellow core on the bullet dot (+30% radius)
          ctx.beginPath();
          ctx.arc(dotX, dotY, 3.1 * (0.85 + 0.25 * lavaIntensity), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 190, ${(0.42 * lavaIntensity).toFixed(2)})`;
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 7 * lavaIntensity;
          ctx.fill();

          ctx.restore();
        }

        if (now - lastSpawnRef.current > 160) {
          lastSpawnRef.current = now;

          // 1. Slow upward rising gray smoke (drift over 2.4s, strictly 20% max opacity, non-stacking)
          particlesRef.current.push({
            isPerimeter: false,
            x: dotX + (Math.random() - 0.5) * 2.5,
            y: dotY - 1,
            vx: (Math.random() - 0.5) * 0.06,
            vy: -(0.16 + Math.random() * 0.14), // slow, gentle upward drift over 2.4s
            radius: 2.2 + Math.random() * 1.3,
            maxRadius: 9.5 + Math.random() * 5.0,
            maxAlpha: 0.20, // strictly 20% max opacity
            age: 0,
            life: 2400, // 2.4 sec duration
            phase: Math.random() * Math.PI * 2,
            curlSpeed: 0.0016 + Math.random() * 0.0012,
          });

          // 2. Small percent (30% chance) hovering near/around the bullet point
          if (Math.random() < 0.30) {
            const angle = Math.random() * Math.PI * 2;
            const dist = 1.5 + Math.random() * 3.5;
            particlesRef.current.push({
              isPerimeter: true,
              x: dotX + Math.cos(angle) * dist,
              y: dotY + Math.sin(angle) * dist,
              vx: (Math.random() - 0.5) * 0.03,
              vy: -(0.02 + Math.random() * 0.04), // lingers around the dot
              radius: 1.6 + Math.random() * 1.0,
              maxRadius: 3.8 + Math.random() * 2.0,
              maxAlpha: 0.10, // subtle 10% opacity near dot
              age: 0,
              life: 1400 + Math.random() * 600,
              phase: Math.random() * Math.PI * 2,
              curlSpeed: 0.002,
            });
          }
        }

        // Render ambient soft smoke haze right around the bullet point
        ctx.save();
        const haloPulse = 0.02 + Math.sin(now * 0.003) * 0.01;
        const haloGrad = ctx.createRadialGradient(dotX, dotY, 1, dotX, dotY, 7);
        haloGrad.addColorStop(0, `rgba(180, 185, 190, ${haloPulse.toFixed(3)})`);
        haloGrad.addColorStop(0.5, `rgba(150, 155, 160, ${(haloPulse * 0.5).toFixed(3)})`);
        haloGrad.addColorStop(1, 'rgba(130, 135, 140, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Render active smoke particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.age += 16;

        if (p.age >= p.life) {
          particles.splice(i, 1);
          continue;
        }

        const progress = p.age / p.life;
        p.x += p.vx + Math.sin(p.age * p.curlSpeed + p.phase) * (p.isPerimeter ? 0.04 : 0.10);
        p.y += p.vy;

        const currentRadius = p.radius + (p.maxRadius - p.radius) * Math.pow(progress, 0.65);

        let alpha = 0;
        if (progress < 0.15) {
          alpha = (progress / 0.15) * p.maxAlpha;
        } else {
          alpha = (1 - (progress - 0.15) / 0.85) * p.maxAlpha;
        }

        alpha = Math.min(alpha, 0.20); // strictly capped at 20% opacity
        if (alpha <= 0.004) continue;

        ctx.save();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0, `rgba(185, 190, 195, ${alpha.toFixed(3)})`);
        grad.addColorStop(0.5, `rgba(155, 160, 165, ${(alpha * 0.55).toFixed(3)})`);
        grad.addColorStop(1, 'rgba(130, 135, 140, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      if (isSparkActive || isSmokeActive || particles.length > 0) {
        animRef.current = requestAnimationFrame(render);
      } else {
        animRef.current = null;
      }
    };

    if (isSparkActive || isSmokeActive || particlesRef.current.length > 0) {
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(render);
      }
    }

    return () => {
      isRunning = false;
      window.removeEventListener('resize', resize);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
  }, [isSparkActive, isSmokeActive, targetRef]);

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
