import React, { useState, useEffect, useRef } from 'react';
import {
  Bus,
  Leaf,
  Fuel,
  Cloud,
  Trees,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sliders,
  Users,
  Heart,
} from 'lucide-react';
import { ConstellationNetwork } from './ConstellationNetwork';
import NewsBulletEffects from './NewsBulletEffects';
import MizuEarthGlobe from './MizuEarthGlobe';
import { newsArticles } from '../data/newsData';
import { useTheme } from '../context/ThemeContext';

// Transvolt Dual-Chevron Branding Arrow Component
const BrandArrow = ({ className = 'h-3.5 w-auto', hoverWhite = false }) => (
  <svg
    viewBox="0 0 411 330"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} inline-block shrink-0`}
  >
    <path
      d="M0 0H121.428L238.899 164.997L121.428 329.995H0L117.471 164.997L0 0Z"
      className={hoverWhite ? 'fill-[#548235] group-hover:fill-white transition-none' : 'fill-[#548235]'}
    />
    <path
      d="M172.11 0H293.538L411 164.997L293.538 329.995H172.11L289.576 164.997L172.11 0Z"
      className={hoverWhite ? 'fill-[#4472C4] group-hover:fill-white transition-none' : 'fill-[#4472C4]'}
    />
  </svg>
);

// Animated Count-Up Number Counter component
const CountUpNumber = ({ target = 4725, suffix = '+', duration = 2400 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// Controlled Video component: only plays when active (large tile), pauses when behind
// Small tiles show static Black & White thumbnails; when active/large, transitions to full color and plays
const ProjectCardVideo = ({ src, isPlaying, isTransitioning = true }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (isPlaying) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      style={{
        borderRadius: 'inherit',
        filter: isPlaying ? 'grayscale(0%) contrast(100%)' : 'grayscale(100%) contrast(105%)',
        transition: isTransitioning
          ? 'filter 900ms cubic-bezier(0.25, 1, 0.3, 1)'
          : 'none',
      }}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none"
    />
  );
};

// 4 Strategic Turnkey Projects Videos
const PROJECT_VIDEOS = [
  {
    id: 'public-transport',
    title: 'Public Transport',
    category: 'MUNICIPAL CONCESSION',
    location: 'Mira-Bhayandar & Ulhasnagar',
    specs: '57+ AC Electric Buses',
    video: '/services-videos/1_trimmed.mp4',
    tag: 'GCC Model',
  },
  {
    id: 'mining-pit',
    title: 'Mining Logistics',
    category: 'HEAVY PIT HAULAGE',
    location: 'Mineral & Ore Corridors',
    specs: '55T Electric Dump Trucks',
    video: '/services-videos/2.mp4',
    tag: 'Industrial',
  },
  {
    id: 'cement-plant',
    title: 'Cement Plant',
    category: 'BULK CARGO LOGISTICS',
    location: 'Limestone & Clinker Supply',
    specs: 'Heavy Payload EV Fleet',
    video: '/services-videos/3.mp4',
    tag: 'Bulk Haulage',
  },
  {
    id: 'port-logistics',
    title: 'Port Logistics',
    category: 'CONTAINER DRAYAGE',
    location: 'JNPT Maritime Gateway',
    specs: '66 Electric Tractors',
    video: '/services-videos/4.mp4',
    tag: 'Maritime',
  },
];

// Green Dot Matrix decorative graphic for Section 2 Collage (3 rows x 11 columns)
const DotMatrix = ({ className = '' }) => (
  <div
    className={`grid grid-rows-3 grid-flow-col gap-1.5 pointer-events-none select-none ${className}`}
    aria-hidden="true"
  >
    {Array.from({ length: 33 }).map((_, i) => (
      <span key={i} className="w-[4.5px] h-[4.5px] rounded-full bg-[#548235]" />
    ))}
  </div>
);

// Exact CSS cubic-bezier(0.25, 1, 0.3, 1) evaluator matching the carousel card scale transition
const getCubicBezier = (x1, y1, x2, y2) => {
  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let s = t;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * s * (1 - s) * (1 - s) * x1 + 3 * s * s * (1 - s) * x2 + s * s * s;
      const dx = currentX - t;
      if (Math.abs(dx) < 1e-4) break;
      const slope = 3 * (1 - s) * (1 - s) * x1 + 6 * s * (1 - s) * (x2 - x1) + 3 * s * s * (1 - x2);
      if (Math.abs(slope) < 1e-4) break;
      s -= dx / slope;
    }
    s = Math.max(0, Math.min(1, s));
    return 3 * s * (1 - s) * (1 - s) * y1 + 3 * s * s * (1 - s) * y2 + s * s * s;
  };
};

const tileGrowthEase = getCubicBezier(0.25, 1, 0.3, 1);

// Thin Harmonic Electric Attraction Waves bridging the Big Active Tile to the Next Upcoming Tile
// Physical cycle:
// 1. When big tile is stopped (rest period): Waves are active and latch onto the upcoming tile
// 2. When upcoming tile is moving & becoming big (during slide transition): Wave length contracts in real-time sync with tile motion (pulling effect)
// 3. Dissolves smoothly as tile docks
// 4. When new tile stops: Waves emerge and repeat!
const TileAttractionElectricWaves = ({ currentIndex, isTransitioning = true }) => {
  const canvasRef = useRef(null);
  const slideStartTimeRef = useRef(0); // 0 means currently stopped/idle on initial mount
  const prevIndexRef = useRef(currentIndex);

  // When currentIndex advances, start the slide transition lifecycle
  useEffect(() => {
    if (!isTransitioning) {
      prevIndexRef.current = currentIndex;
      slideStartTimeRef.current = 0;
      return;
    }
    if (currentIndex !== prevIndexRef.current) {
      prevIndexRef.current = currentIndex;
      slideStartTimeRef.current = performance.now();
    }
  }, [currentIndex, isTransitioning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isRunning = true;

    // Electric attraction strands:
    // Left side: ALL 3 strands on upper side connect into ONE single point (344, 85) on the Big Tile (upside wave point).
    //            ALL 3 strands on downside connect into ONE single point (344, 555) on the Big Tile (downside wave point).
    // Right side: All 3 strands fan out and connect directly to the Small Tile's edge (top: y=112; bottom: y=528).
    // waveIdx (0, 1, 2) controls the sequential one-by-one emergence from 0% opacity!
    const strands = [
      // Upper side: Single left upside wave point (344, 85) branching to 3 points on the small tile's top edge (y=112)
      { isTop: true, waveIdx: 0, x1: 344, y1: 85, x2: 395, y2: 112, seed: 1.2, speed: 0.009, freq: 16, amp: 4.8, color: 'rgba(56, 189, 248, 0.85)' },
      { isTop: true, waveIdx: 1, x1: 344, y1: 85, x2: 435, y2: 112, seed: 3.9, speed: 0.011, freq: 14, amp: 5.4, color: 'rgba(52, 211, 153, 0.80)' },
      { isTop: true, waveIdx: 2, x1: 344, y1: 85, x2: 475, y2: 112, seed: 6.4, speed: 0.008, freq: 18, amp: 4.4, color: 'rgba(56, 189, 248, 0.75)' },
      // Downside: Single left downside wave point (344, 555) branching to 3 points on the small tile's bottom edge (y=528)
      { isTop: false, waveIdx: 0, x1: 344, y1: 555, x2: 395, y2: 528, seed: 2.7, speed: 0.009, freq: 16, amp: 4.8, color: 'rgba(56, 189, 248, 0.85)' },
      { isTop: false, waveIdx: 1, x1: 344, y1: 555, x2: 435, y2: 528, seed: 5.1, speed: 0.011, freq: 14, amp: 5.4, color: 'rgba(52, 211, 153, 0.80)' },
      { isTop: false, waveIdx: 2, x1: 344, y1: 555, x2: 475, y2: 528, seed: 8.3, speed: 0.008, freq: 18, amp: 4.4, color: 'rgba(56, 189, 248, 0.75)' },
    ];

    const render = (now) => {
      if (!isRunning) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = 920;
      const h = 640;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const START_OPACITY = 0.50; // 50% steady opacity
      const slideStart = slideStartTimeRef.current;
      const elapsed = slideStart === 0 ? 0 : (now - slideStart);

      // Calculates individual wave state:
      // 1. Pulling phase: Keeps same opacity (50%), shrinking in length, then 0% until completely pulled
      // 2. Stopped phase: All 3 waves emerge from 0% opacity one by one!
      const getWaveState = (waveIdx) => {
        if (slideStart === 0) {
          return { opacity: START_OPACITY, lengthFactor: 1.0, tension: 1.0 };
        }

        if (elapsed < 900) {
          // =================================================================
          // PHASE A: Actively pulling the small slide!
          // "when start pulling keep the same opecity and keep it 0% untill completely pulled"
          // Keep 50% opacity during the magnetic pull while shrinking;
          // as card finishes docking, stays at 0% until completely pulled (900ms)
          // =================================================================
          if (elapsed < 760) {
            const pullProgress = tileGrowthEase(elapsed / 760);
            const len = Math.max(0.0, 1.0 - pullProgress);
            const tension = 1.0 + 0.45 * Math.sin((elapsed / 760) * Math.PI);
            return { opacity: START_OPACITY, lengthFactor: len, tension };
          } else {
            // Completely pulled & docked: keep 0% until 900ms
            return { opacity: 0.0, lengthFactor: 0.0, tension: 1.0 };
          }
        } else {
          // =================================================================
          // PHASE B: The tile is completely pulled and STOPPED moving!
          // "and again make it comes from zero opecity all 3 waves one by one"
          // All 3 waves emerge from 0% opacity sequentially one by one:
          // Wave 0: starts at 60ms, emerges to 50% by 220ms
          // Wave 1: starts at 200ms, emerges to 50% by 360ms
          // Wave 2: starts at 340ms, emerges to 50% by 500ms
          // =================================================================
          const stopElapsed = elapsed - 900;
          const startDelay = 60 + waveIdx * 140;
          const duration = 160;

          if (stopElapsed < startDelay) {
            return { opacity: 0.0, lengthFactor: 0.0, tension: 1.0 };
          } else if (stopElapsed < startDelay + duration) {
            const t = (stopElapsed - startDelay) / duration;
            const ease = 0.5 - 0.5 * Math.cos(t * Math.PI);
            return {
              opacity: START_OPACITY * ease, // emerges smoothly from 0% opacity!
              lengthFactor: ease,            // shoots out from 0 to 1.0!
              tension: 1.0,
            };
          } else {
            // Full magnetic lock at 50% opacity
            return { opacity: START_OPACITY, lengthFactor: 1.0, tension: 1.0 };
          }
        }
      };

      // Glowing Magnetic Attractor Emitter Nodes on the Big Card:
      // Exactly 1 single upside wave point (344, 85) and 1 single downside wave point (344, 555)
      let maxWaveOpacity = 0;
      for (let idx = 0; idx < strands.length; idx++) {
        const state = getWaveState(strands[idx].waveIdx);
        if (state.opacity > maxWaveOpacity) maxWaveOpacity = state.opacity;
      }

      const isBigTileVisible = (slideStart === 0 || elapsed >= 900);
      if (isBigTileVisible && maxWaveOpacity > 0.02) {
        ctx.save();
        ctx.globalAlpha = maxWaveOpacity;
        for (const origin of [{ x: 344, y: 85 }, { x: 344, y: 555 }]) {
          ctx.beginPath();
          ctx.arc(origin.x, origin.y, 4.0, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(52, 211, 153, 0.88)';
          ctx.shadowColor = '#34d399';
          ctx.shadowBlur = 12;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(origin.x, origin.y, 1.6, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.shadowBlur = 0;
          ctx.fill();
        }
        ctx.restore();
      }

      for (let idx = 0; idx < strands.length; idx++) {
        const st = strands[idx];
        const { opacity, lengthFactor, tension: tensionSurge } = getWaveState(st.waveIdx);

        if (opacity <= 0.005 || lengthFactor <= 0.005) continue;

        // Length contraction: target endpoint pulls inward toward big tile's edge (x1, y1)
        const targetX2 = st.x1 + (st.x2 - st.x1) * lengthFactor;
        const targetY2 = st.y1 + (st.y2 - st.y1) * lengthFactor;

        const dx = targetX2 - st.x1;
        const dy = targetY2 - st.y1;
        const dist = Math.hypot(dx, dy);
        if (dist < 2) continue;

        const segments = Math.max(10, Math.floor(dist / 4));
        const nx = -dy / dist;
        const ny = dx / dist;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.beginPath();
        ctx.moveTo(st.x1, st.y1);

        const path = [{ x: st.x1, y: st.y1 }];
        for (let i = 1; i < segments; i++) {
          const t = i / segments;
          const env = Math.sin(t * Math.PI);

          // Graceful arch in open air: upper waves bow slightly upwards, downside waves bow downwards
          const arch = st.isTop ? (-16 * env) : (16 * env);

          // Traveling wave harmonics flowing inward toward the big tile
          const wave1 = Math.sin(t * st.freq + now * st.speed + st.seed);
          const wave2 = Math.cos(t * (st.freq * 1.5) - now * (st.speed * 1.2) + st.seed * 2.1) * 0.45;
          const microJitter = (Math.random() - 0.5) * 1.0;

          const disp = (wave1 + wave2 + microJitter) * st.amp * env * tensionSurge;
          const px = st.x1 + dx * t + nx * disp;
          const py = st.y1 + dy * t + arch + ny * disp;
          path.push({ x: px, y: py });
          ctx.lineTo(px, py);
        }
        path.push({ x: targetX2, y: targetY2 });
        ctx.lineTo(targetX2, targetY2);

        // Thin outer electric wave aura
        ctx.strokeStyle = st.color;
        ctx.lineWidth = 1.3;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Thin inner white-hot filament
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let p = 1; p < path.length; p++) ctx.lineTo(path[p].x, path[p].y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.82)';
        ctx.lineWidth = 0.65;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // 1. Electric Contact Anchor Claws on the Small Card's edge (the physical grip!)
        ctx.beginPath();
        ctx.arc(targetX2, targetY2, 3.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.88)';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(targetX2, targetY2, 1.4, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = 0;
        ctx.fill();

        // 2. Kinetic Suction Sparks: 2 high-velocity sparks streaming from the small card INTO the big tile
        for (let sp = 0; sp < 2; sp++) {
          const speedRate = 0.0012 + (st.speed * 0.08);
          const pProgress = (1 - ((now * speedRate + sp * 0.5 + st.seed * 0.28) % 1));
          const pIdx = Math.floor(pProgress * (path.length - 1));
          const pt = path[pIdx];
          if (pt) {
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.fill();
          }
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 920, height: 640 }}
      className="absolute inset-0 pointer-events-none z-0 select-none"
      aria-hidden="true"
    />
  );
};

// 4 Strategic Photos for Section 2 Interactive Rotating Collage
const COLLAGE_ITEMS = [
  {
    id: 1,
    src: '/home_page2_collage/1_opt.jpg',
    fallbackSrc: '/home_page2_collage/1.JPG',
    title: 'Transvolt Milestone & Strategic Backers',
  },
  {
    id: 2,
    src: '/home_page2_collage/2_opt.jpg',
    fallbackSrc: '/home_page2_collage/2.jpg',
    title: 'Field Operations & Skilled Fleet Pilots',
  },
  {
    id: 3,
    src: '/home_page2_collage/4_opt.jpg',
    fallbackSrc: '/home_page2_collage/4.JPG',
    title: 'Nagpur & Mumbai Heavy Electric Fleet',
  },
  {
    id: 4,
    src: '/home_page2_collage/3_opt.jpg',
    fallbackSrc: '/home_page2_collage/3.JPG',
    title: 'Corporate Leadership & Fleet Tech Team',
  },
];

// Exact 4 Geometrical Slots in the Collage
// Frame: 636px x 636px, gap: 16px
// Slot 0 (Top-Left): 440x440 (Over 40% bigger main colored tile, extends 48px OUTSIDE above and left of other frames!)
// Slot 1 (Top-Right): 180x392 (Vertical frame with smooth 32px-48px edge curves)
// Slot 2 (Bottom-Right): 180x180 (Bottom-right curved 96px hugging green arc)
// Slot 3 (Bottom-Left): 392x180 (Horizontal frame with smooth 32px-48px edge curves)
const COLLAGE_SLOTS = [
  {
    left: 0,
    top: 0,
    width: 440,
    height: 440,
    borderTopLeftRadius: '136px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
    isBig: true,
  },
  {
    left: 456,
    top: 48,
    width: 180,
    height: 392,
    borderTopLeftRadius: '80px',
    borderTopRightRadius: '80px',
    borderBottomRightRadius: '80px',
    borderBottomLeftRadius: '80px',
    isBig: false,
  },
  {
    left: 456,
    top: 456,
    width: 180,
    height: 180,
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottomRightRadius: '96px',
    borderBottomLeftRadius: '0px',
    isBig: false,
  },
  {
    left: 48,
    top: 456,
    width: 392,
    height: 180,
    borderTopLeftRadius: '80px',
    borderTopRightRadius: '80px',
    borderBottomRightRadius: '80px',
    borderBottomLeftRadius: '80px',
    isBig: false,
  },
];

// Ultra-Dense Single Electric Spark Line connecting the two sharp edge corner points of the collage frames
// Connects (440, 440) [sharp bottom-right of active tile] <-> (456, 456) [sharp top-left of bottom-right tile]
// Signature Home Page 2 Electric Spark Engine (from NewsBulletEffects)
const CollageElectricSpark = ({ isActive }) => {
  const canvasRef = useRef(null);
  const sparkStartRef = useRef(0);

  useEffect(() => {
    if (isActive) {
      sparkStartRef.current = performance.now();
    }
  }, [isActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isRunning = true;

    const render = (now) => {
      if (!isRunning) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = 636;
      const h = 636;

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (!isActive) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = now - (sparkStartRef.current || now);
      if (elapsed > 1000) {
        animId = requestAnimationFrame(render);
        return;
      }

      // The two exact sharp corner points facing each other across the 16px diagonal gap
      const p1 = { x: 440, y: 440 }; // Bottom-right corner of active tile (Slot 0)
      const p2 = { x: 456, y: 456 }; // Top-left corner of opposite tile (Slot 2)
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      ctx.save();

      // Atmospheric Radial Background Glow BEHIND the spark
      // Starts when spark begins, smoothly reduces till 1 second (1000ms)
      const glowProgress = Math.min(1, Math.max(0, elapsed / 1000));
      const glowAttack = elapsed < 40 ? elapsed / 40 : 1;
      const glowDecay = Math.pow(1 - glowProgress, 1.8);
      const glowIntensity = glowAttack * glowDecay;

      if (glowIntensity > 0.005) {
        const radGrad = ctx.createRadialGradient(midX, midY, 0, midX, midY, 90);
        radGrad.addColorStop(0, `rgba(56, 189, 248, ${(0.55 * glowIntensity).toFixed(3)})`);
        radGrad.addColorStop(0.3, `rgba(52, 211, 153, ${(0.42 * glowIntensity).toFixed(3)})`);
        radGrad.addColorStop(0.65, `rgba(16, 185, 129, ${(0.18 * glowIntensity).toFixed(3)})`);
        radGrad.addColorStop(1, 'rgba(16, 185, 129, 0)');

        ctx.beginPath();
        ctx.arc(midX, midY, 90, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();
      }

      // Exact Home Page 2 Electric Spark Line & Impact Flashes (active for 220ms strike)
      if (elapsed <= 240) {
        const progress = Math.min(1, Math.max(0, elapsed / 220));
        // High visibility intensity envelope matching Home Page 2
        const intensity = progress < 0.12 ? progress / 0.12 : (1 - progress) / 0.88;
        const safeIntensity = Math.max(0.4, intensity);

        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const dist = Math.hypot(dx, dy);

        const segments = 8;
        const nx = -dy / dist;
        const ny = dx / dist;

        const path = [{ x: p1.x, y: p1.y }];
        for (let s = 1; s < segments; s++) {
          const t = s / segments;
          const envelope = Math.sin(t * Math.PI);
          // Pure random high-speed jagged lightning jitter matching Home Page 2 NewsBulletEffects
          const jitter = (Math.random() - 0.5) * 8 * envelope * safeIntensity;
          const px = p1.x + dx * t + nx * jitter;
          const py = p1.y + dy * t + ny * jitter;
          path.push({ x: px, y: py });
        }
        path.push({ x: p2.x, y: p2.y });

        // 1. Outer Emerald Plasma Aura Glow (Home Page 2 exact style)
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

        // 2. Inner White-Hot Filament (Home Page 2 exact style)
        ctx.beginPath();
        ctx.moveTo(path[0].x, path[0].y);
        for (let p = 1; p < path.length; p++) {
          ctx.lineTo(path[p].x, path[p].y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${(0.98 * safeIntensity).toFixed(2)})`;
        ctx.lineWidth = 1.1;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // 3. Impact Flash at Both Contact Points (Home Page 2 exact style)
        for (const pt of [p1, p2]) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, (5.0 + Math.random() * 2.5) * safeIntensity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(110, 231, 183, ${(0.75 * safeIntensity).toFixed(2)})`;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 14;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.4 * safeIntensity, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${(0.98 * safeIntensity).toFixed(2)})`;
          ctx.shadowBlur = 0;
          ctx.fill();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };
  }, [isActive]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 636, height: 636 }}
      className="absolute inset-0 pointer-events-none z-30 select-none"
      aria-hidden="true"
    />
  );
};

// Rotating Image Collage Component with Smooth Geometric Physical Rotation & Corner Morphing
const Section2ImageCollage = ({ isDark }) => {
  const [step, setStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isSparkActive, setIsSparkActive] = useState(false);

  // Auto-advance geometric rotation every 4.2 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4200);
    return () => clearInterval(interval);
  }, [isHovered]);

  // Trigger electric spark connecting the two sharp edge points right when tiles stop moving (at 900ms)
  useEffect(() => {
    setIsSparkActive(false);
    const stopTimer = setTimeout(() => {
      setIsSparkActive(true);
      const sparkEndTimer = setTimeout(() => {
        setIsSparkActive(false);
      }, 1000);
      return () => clearTimeout(sparkEndTimer);
    }, 900);

    return () => clearTimeout(stopTimer);
  }, [step]);

  return (
    <div
      className="relative select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes collageActiveZoom {
          0% { transform: scale(1.03); }
          50% { transform: scale(1.08); }
          100% { transform: scale(1.04); }
        }
      `}</style>

      {/* Dynamic Constellation Network (Behind & Surrounding Four Photo Frames - Services Page Section 1 Style) */}
      <ConstellationNetwork
        isDark={isDark}
        pulseTrigger={step}
        nodeCount={175}
        electric={true}
        className="absolute -inset-16 sm:-inset-24 lg:-inset-28 z-0 pointer-events-none"
      />

      {/* Top-Right Decorative Dot Matrix (Directly above Slot 1) */}
      <DotMatrix className="absolute top-4 right-0 z-0" />

      {/* Bottom-Left Decorative Dot Matrix (Directly below Slot 3) */}
      <DotMatrix className="absolute -bottom-8 left-12 z-0" />

      {/* Bottom-Right Curved Green Accent Arc */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          right: '-10px',
          bottom: '-10px',
          width: '120px',
          height: '120px',
          borderBottomRightRadius: '104px',
          borderBottom: '8px solid #548235',
          borderRight: '8px solid #548235',
        }}
        aria-hidden="true"
      />

      {/* Main Collage Frame (Scaled appropriately to fit any screen) */}
      <div className="w-[636px] h-[636px] relative z-10 origin-center scale-[0.76] sm:scale-[0.82] lg:scale-[0.88] xl:scale-[0.96]">
        {COLLAGE_ITEMS.map((item, idx) => {
          // Calculate physical slot position for this photo
          const slotIndex = (idx + step) % 4;
          const slot = COLLAGE_SLOTS[slotIndex];

          return (
            <div
              key={item.id}
              onClick={() => setStep((4 - (idx % 4)) % 4)}
              title={slot.isBig ? 'Active Featured Showcase' : 'Click to rotate to main showcase'}
              style={{
                position: 'absolute',
                left: `${slot.left}px`,
                top: `${slot.top}px`,
                width: `${slot.width}px`,
                height: `${slot.height}px`,
                borderTopLeftRadius: slot.borderTopLeftRadius,
                borderTopRightRadius: slot.borderTopRightRadius,
                borderBottomRightRadius: slot.borderBottomRightRadius,
                borderBottomLeftRadius: slot.borderBottomLeftRadius,
                zIndex: slot.isBig ? 25 : 10,
                transition:
                  'left 900ms cubic-bezier(0.4, 0, 0.2, 1), top 900ms cubic-bezier(0.4, 0, 0.2, 1), width 900ms cubic-bezier(0.4, 0, 0.2, 1), height 900ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 900ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 900ms ease',
              }}
              className={`overflow-hidden border cursor-pointer group ${
                slot.isBig
                  ? isDark
                    ? 'border-[#548235]/60 shadow-[0_24px_60px_rgba(0,0,0,0.75),0_0_30px_rgba(84,130,53,0.35)]'
                    : 'border-[#548235]/50 shadow-[0_24px_60px_rgba(0,0,0,0.20),0_0_30px_rgba(84,130,53,0.22)]'
                  : isDark
                  ? 'border-white/10 hover:border-[#548235]/60 shadow-md'
                  : 'border-slate-200/90 hover:border-[#548235]/60 shadow-md'
              }`}
            >
              {/* Inner Image with Smooth Color / Grayscale and Zoom Transition */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  onError={(e) => {
                    if (item.fallbackSrc && e.target.src !== item.fallbackSrc) {
                      e.target.src = item.fallbackSrc;
                    }
                  }}
                  style={{
                    animation: slot.isBig ? 'collageActiveZoom 7s ease-in-out infinite alternate' : 'none',
                  }}
                  className={`w-full h-full object-cover object-center select-none transition-all duration-900 ease-out ${
                    slot.isBig
                      ? 'filter grayscale-0 saturate-[1.15] contrast-[1.05] scale-[1.05]'
                      : 'filter grayscale contrast-[1.1] brightness-[0.92] scale-100 group-hover:scale-105 group-hover:grayscale-0'
                  }`}
                />

                {/* Subtle vignette overlay on big tile */}
                {slot.isBig && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none transition-opacity duration-900" />
                )}

                {/* Grayscale slight dimming on smaller tiles, fades away on hover */}
                {!slot.isBig && (
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300 pointer-events-none" />
                )}
              </div>
            </div>
          );
        })}

        {/* High-Voltage Electric Spark Connecting Sharp Edge Points when Tiles Stop Moving */}
        <CollageElectricSpark isActive={isSparkActive} />
      </div>
    </div>
  );
};

export const HomePageV2 = ({ currentPage = 0, onNavigate, introStage = 4 }) => {
  const { isDark } = useTheme();
  const metrics = [
    { label: "Number of EV's", target: 4725, suffix: '+', icon: Bus },
    { label: 'Clean Kms Run', target: 4725, suffix: '+', icon: Leaf },
    { label: 'Fuel Saved', target: 4725, suffix: '+', icon: Fuel },
    { label: 'CO2 Saved', target: 4725, suffix: '+', icon: Cloud },
    { label: 'Trees Saved', target: 4725, suffix: '+', icon: Trees },
  ];

  // 3 Brand Pillars for Slide 1 (WE PLAN, WE CARE, WE COMMIT)
  const pillars = [
    {
      title: 'WE PLAN',
      tag: 'Strategic Fleet Electrification',
      icon: Sliders,
      description:
        'Revolutionizing transportation! We team up with private schools, corporate parks, transport unions, and transit authorities to architect large-scale ZERO EMISSION mobility platforms.',
    },
    {
      title: 'WE CARE',
      tag: 'Passenger & Transit Trust',
      icon: Users,
      description:
        "Stepping into passengers' shoes to engineer clean, quiet, and reliable transit solutions. Trust is our foundation as we forge long-term partnerships with municipal authorities.",
    },
    {
      title: 'WE COMMIT',
      tag: 'Safety, Quality & ESG Delivery',
      icon: Heart,
      description:
        "Delivering on promises! At Transvolt, we are dedicated to passenger safety, operational reliability, and measurable decarbonization for transport authorities and the planet.",
    },
  ];

  // 6 News Items for Slide 2
  const newsList = [
    {
      num: '01',
      shortTitle: 'TATA CAPITAL FINANCING',
      title: 'Tata Capital partners with Transvolt to finance deployment of 100+ electric trucks across India.',
      category: 'Financing',
      year: '2026',
      date: 'July 2026',
      image: '/news/Tata_Capital_News-50lgO3Mg.jpg',
    },
    {
      num: '02',
      shortTitle: 'GREEN BOND FACILITY',
      title: 'Transvolt secures Green Bond financing from Alternates by Axis AMC for 150+ electric trucks.',
      category: 'Green Bonds',
      year: '2026',
      date: 'July 2026',
      image: '/news/AXIS_NEWS-CeNzoLgF.jpg',
    },
    {
      num: '03',
      shortTitle: 'NAGPUR E-BUS FLEET',
      title: 'Transvolt commences e-buses for Nagpur Municipal Corporation under long-term concession.',
      category: 'Municipal Concession',
      year: '2026',
      date: 'May 2026',
      image: '/news/Nagpur_News-Di56FjQh.jpg',
    },
    {
      num: '04',
      shortTitle: 'PORT LOGISTICS EXPANSION',
      title: 'Transvolt Mobility enters port logistics with 66 electric heavy trucks across JNPT & Kandla.',
      category: 'Port Infrastructure',
      year: '2026',
      date: 'April 2026',
      image: '/news/PortLogisticNews-CYIhlUi7.jpg',
    },
    {
      num: '05',
      shortTitle: 'IMPACT REPORT 2026',
      title: 'Transvolt Mobility releases Impact Report 2026 showcasing 13.15M km electrified.',
      category: 'ESG & Sustainability',
      year: '2026',
      date: 'March 2026',
      image: '/news/impact-report-DLwDNbkq.jpg',
    },
    {
      num: '06',
      shortTitle: 'FINNFUND EQUITY ROUND',
      title: 'Finnfund announces strategic equity investment in Transvolt Mobility alongside IFC.',
      category: 'Institutional Equity',
      year: '2026',
      date: 'January 2026',
      image: '/news/Finnfund-pB2S_zOO.jpg',
    },
  ];

  // Carousel State & Seamless Infinite Auto-Loop
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const totalProjects = PROJECT_VIDEOS.length; // 4
  // 3 News with identical text as requested
  const sameNewsItem = {
    id: 'nagpur-news',
    category: 'MUNICIPAL CONCESSION',
    title: 'Transvolt has commenced e-buses for Nagpur Municipal Corporation',
  };
  const latestNews = [sameNewsItem, sameNewsItem, sameNewsItem];

  // Vertical bottom-to-top News ticker state (0% -> 100% at center -> hold 2.6s -> 100% -> 0% top)
  const dotRef = useRef(null);
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);
  const [newsAnimState, setNewsAnimState] = useState('center'); // 'enter' | 'center' | 'exit'
  const [isNewsHovered, setIsNewsHovered] = useState(false);
  const [isSparkActive, setIsSparkActive] = useState(true);
  const [isSmokeActive, setIsSmokeActive] = useState(false);

  // News ticker sequence: 750ms enter -> START OF 2.6s HOLD (200ms spark fires, then 2.4s smoke) -> 750ms exit
  useEffect(() => {
    if (isNewsHovered || latestNews.length === 0) return;

    let isCancelled = false;
    let timerId = null;

    const runNewsCycle = () => {
      // 1. START OF HOLD TIME:
      // Slide has arrived at center. Fire electric spark for 200ms, then glowing smoke for remaining 2.4s!
      setIsSparkActive(true);
      setIsSmokeActive(false);

      setTimeout(() => {
        if (!isCancelled) {
          setIsSparkActive(false);
          setIsSmokeActive(true);
        }
      }, 200);

      // 2. Hold at center for full 2.6 seconds (200ms spark + 2400ms smoke)
      timerId = setTimeout(() => {
        if (isCancelled) return;

        setIsSparkActive(false);
        setIsSmokeActive(false);
        // 3. Move smoothly to top (750ms exit)
        setNewsAnimState('exit');

        timerId = setTimeout(() => {
          if (isCancelled) return;

          // 4. Switch to next news item and position at bottom (opacity 0)
          setActiveNewsIdx((prev) => (prev + 1) % latestNews.length);
          setNewsAnimState('enter');

          timerId = setTimeout(() => {
            if (isCancelled) return;

            // 5. Animate smoothly from bottom to center (750ms motion, NO spark/smoke during movement)
            setNewsAnimState('center');

            timerId = setTimeout(() => {
              if (isCancelled) return;

              // 6. Arrival complete at center! Start next hold cycle (sparks fire here, then smoke)
              runNewsCycle();
            }, 750);
          }, 40);
        }, 750);
      }, 2600);
    };

    // Start cycle on mount or when unhovered
    runNewsCycle();

    return () => {
      isCancelled = true;
      if (timerId) clearTimeout(timerId);
    };
  }, [isNewsHovered, latestNews.length]);

  // Card geometry: base cardWidth = 240px, gap = 20px (overall +30% larger)
  // 3 cards (240+20+240+20+240+20 = 780px) + 33% of 4th card (0.33 * 240 = 80px) -> 860px container
  const cardWidth = 240;
  const cardGap = 20;
  const slideStep = cardWidth + cardGap; // 260px

  // Auto-advance loop every 3.5 seconds when not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Seamless Wrap-around reset
  const handleTransitionEnd = () => {
    if (currentIndex >= totalProjects) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalProjects - 1));
  };

  // Render 8 items (4 original + 4 cloned for seamless wrap)
  const extendedProjects = [...PROJECT_VIDEOS, ...PROJECT_VIDEOS];

  const isDarkSection = currentPage === 0 || isDark;

  return (
    <div
      data-bg={isDarkSection ? "dark" : "light"}
      className={`relative w-full h-screen overflow-hidden flex flex-col justify-between select-none transition-colors duration-500 ${
        currentPage === 0
          ? 'bg-black text-white'
          : isDark
          ? 'bg-[#0A0E17] text-white'
          : 'bg-[#F8FAFC] text-gray-900'
      }`}
    >
      {/* Unified Bullet Effects: 200ms spark from complete left edge, followed by 2.4s slow gray smoke */}
      <NewsBulletEffects isSparkActive={isSparkActive} isSmokeActive={isSmokeActive} targetRef={dotRef} />

      {/* Background: Seamless Looping Aerial Fleet Video ONLY on Section 1 / Slide 0 */}
      {currentPage === 0 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden transition-opacity duration-500">
          <video
            src="/home_page2_bg_video.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/home_v2_bg.jpg"
            className="w-full h-full object-cover select-none transition-all duration-1000 ease-out"
            style={{
              maskImage: introStage >= 3 ? 'linear-gradient(to right, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.45) 100%)' : 'none',
              WebkitMaskImage: introStage >= 3 ? 'linear-gradient(to right, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.45) 100%)' : 'none',
            }}
          />
        </div>
      )}

      {/* Ambient background gradients for Section 2 (Who We Are) and Section 3 (Our News) */}
      {currentPage > 0 && isDark && (
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0D1829]/70 via-[#0A0E17] to-black" />
      )}
      {currentPage > 0 && !isDark && (
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-slate-50/80 via-white to-slate-100/60" />
      )}

      {/* Main Container - Flex Between Top Content and Bottom Metrics Bar */}
      <div className="relative z-10 w-full h-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-22 pb-4 sm:pb-5 flex flex-col justify-between">
        
        {/* Center Content Area: Flippable between Slide 0 (Hero & Projects), Slide 1 (Who We Are), Slide 2 (Our News) */}
        <div className="flex-1 relative min-h-0 py-2 w-full flex items-center">
          
          {/* SLIDE 0: Hero & Standing Video Projects Carousel */}
          <div
            className={`w-full h-full flex items-center justify-between gap-6 lg:gap-8 xl:gap-12 transition-all duration-500 ease-in-out ${
              currentPage === 0
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-8 pointer-events-none hidden'
            }`}
          >
            {/* Left Column: Headlines, Backed By, Mission Subtext */}
            <div className="w-full max-w-xl lg:max-w-[580px] xl:max-w-[640px] shrink-0 space-y-2.5 sm:space-y-3 z-10">
              {/* Main Headline - Crisp White */}
              <h1
                style={{
                  transitionDelay: introStage >= 3 ? '60ms' : '0ms',
                }}
                className={`text-[26px] sm:text-[34px] lg:text-[38px] xl:text-[44px] font-bold tracking-tight pb-0.5 leading-[1.12] text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] transition-all duration-700 ease-out transform ${
                  introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                Empowering to move
                <br />
                <span className="whitespace-nowrap">in a Clean, Green and Quiet</span>
                <br />
                Environment with Safety
              </h1>

              {/* Description Subtext - Crisp White */}
              <p
                style={{
                  transitionDelay: introStage >= 3 ? '220ms' : '0ms',
                }}
                className={`text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed max-w-xl font-normal text-white/95 transition-all duration-700 ease-out transform ${
                  introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                India's First OEM agnostic EV Platform for Heavy Commercial Vehicles -
                Electric Buses and Electric Trucks; Transvolt owns and operates the
                e-HCVs in B to G and B to B segments across India.
              </p>

              {/* Institutional Investors Content */}
              <div
                style={{
                  transitionDelay: introStage >= 3 ? '380ms' : '0ms',
                }}
                className={`w-full text-white space-y-1 py-1 transition-all duration-700 ease-out transform ${
                  introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <h2 className="text-xs sm:text-sm lg:text-[15px] font-bold leading-snug text-white">
                  A Milestone for Electric Mobility Backed by Global Institutional Investors
                </h2>

                <p className="text-[11px] sm:text-xs font-semibold text-emerald-300 leading-relaxed">
                  Supported by IFC and Finnfund to accelerate the future of sustainable commercial mobility.
                </p>

                <p className="text-[10.5px] sm:text-[11.5px] italic text-white/85">
                  &ldquo;Globally, IFC&apos;s first equity investment in an EV fleet platform.&rdquo;
                </p>

                {/* Backed By Logos */}
                <div
                  style={{
                    transitionDelay: introStage >= 3 ? '520ms' : '0ms',
                  }}
                  className={`pt-1.5 flex items-center gap-6 sm:gap-8 transition-all duration-700 ease-out transform ${
                    introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                  }`}
                >
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white/70 uppercase">
                    BACKED BY
                  </span>
                  <div className="flex items-center gap-6 sm:gap-8">
                    <img
                      src="/IFC-Logo-White.png"
                      alt="International Finance Corporation"
                      className="h-9 sm:h-[42px] w-auto object-contain brightness-100"
                    />
                    <img
                      src="/Finfund_logo-White.png"
                      alt="Finnfund"
                      className="h-7 sm:h-8 w-auto object-contain brightness-100"
                    />
                  </div>
                </div>
              </div>

              {/* Explore Button & Zero Emission Strip */}
              <div
                style={{
                  transitionDelay: introStage >= 3 ? '660ms' : '0ms',
                }}
                className={`pt-1.5 flex items-center gap-4 transition-all duration-700 ease-out transform ${
                  introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
              >
                <button
                  onClick={() => onNavigate && onNavigate('services')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#548235] to-[#22c55e] hover:from-[#44692a] hover:to-[#16a34a] text-white text-xs font-bold shadow-lg shadow-[#548235]/30 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-[11px] sm:text-xs font-medium text-white/80">
                  Pioneering <span className="font-extrabold text-white underline decoration-emerald-400 decoration-2 underline-offset-4">ZERO EMISSION</span> Mobility
                </span>
              </div>

              {/* Frameless Vertical Flip: 3 Latest News with green text above, white text below */}
              <div
                className={`pt-[90px] sm:pt-[125px] md:pt-[156px] w-[840px] lg:w-[920px] max-w-none h-16 sm:h-20 relative overflow-hidden select-none transition-all duration-700 ease-out transform ${
                  introStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                onMouseEnter={() => setIsNewsHovered(true)}
                onMouseLeave={() => setIsNewsHovered(false)}
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                  transitionDelay: introStage >= 3 ? '800ms' : '0ms',
                }}
              >
                {latestNews[activeNewsIdx] && (
                  <div
                    key={activeNewsIdx}
                    onClick={() => onNavigate && onNavigate('news')}
                    title="Click to view full news article"
                    style={{
                      transform:
                        newsAnimState === 'center'
                          ? 'translateY(0px)'
                          : newsAnimState === 'exit'
                          ? 'translateY(-24px)'
                          : 'translateY(24px)',
                      opacity: newsAnimState === 'center' ? 1 : 0,
                      transition:
                        newsAnimState === 'enter'
                          ? 'none'
                          : 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 750ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="absolute inset-0 flex flex-col justify-center gap-1 sm:gap-1.5 cursor-pointer group/news transition-colors select-none"
                  >
                    {/* Top Row: Green Category text with glowing status indicator dot */}
                    <div className="flex items-center gap-2">
                      <div className="relative flex items-center justify-center shrink-0 w-2.5 h-2.5">
                        <span
                          ref={dotRef}
                          data-news-dot="true"
                          className={`w-2 h-2 rounded-full shrink-0 transition-all duration-300 ${
                            isSparkActive
                              ? 'bg-emerald-200 scale-125 shadow-[0_0_12px_#34d399,0_0_22px_#10b981,0_0_35px_#38bdf8]'
                              : isSmokeActive
                              ? 'bg-yellow-300 shadow-[0_0_6px_#fde047,0_0_11px_#eab308]'
                              : 'bg-emerald-400 animate-pulse'
                          }`}
                        />
                      </div>

                      <span className="text-[12px] sm:text-[12.5px] font-mono font-bold tracking-wider text-emerald-400 uppercase shrink-0">
                        {latestNews[activeNewsIdx].category || 'NEWS'}
                      </span>
                    </div>

                    {/* Bottom Row: White Title text */}
                    <span className="text-sm sm:text-[15.5px] font-medium text-white/95 group-hover/news:text-white group-hover/news:underline underline-offset-4 decoration-emerald-400 whitespace-nowrap">
                      {latestNews[activeNewsIdx].title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: 3 Standing Video Tiles with Constellation Network Effect Behind (Overall +30% larger) */}
            <div
              style={{
                transitionDelay: introStage >= 3 ? '60ms' : '0ms',
              }}
              className={`hidden md:flex flex-col items-end shrink-0 relative origin-right scale-[0.85] lg:scale-[0.92] xl:scale-100 transition-all duration-900 ease-out transform ${
                introStage >= 3
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-44 opacity-0 pointer-events-none'
              }`}
            >
              {/* Dynamic Dense Electric Constellation Network Behind Standing Tiles */}
              <ConstellationNetwork
                isDark={true}
                dense={true}
                electric={true}
                className="absolute -inset-16 lg:-inset-24 z-0 pointer-events-none"
              />

              {/* Carousel Viewport: 920px with safe 640px height ensuring zero screen or edge clipping */}
              <div
                className="w-[920px] h-[640px] relative z-10 rounded-none flex items-center"
                style={{
                  overflowX: 'clip',
                  overflowY: 'visible',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14px, black calc(100% - 90px), transparent 100%)',
                  maskImage: 'linear-gradient(to right, transparent 0%, black 14px, black calc(100% - 90px), transparent 100%)',
                }}
              >
                {/* Thin Harmonic Electric Attraction Waves: pulling upcoming tile into big slot */}
                <TileAttractionElectricWaves currentIndex={currentIndex} isTransitioning={isTransitioning} />
                {/* Sliding Track vertically centered starting with 48px (pl-12) left breathing room */}
                <div
                  className="flex items-center gap-5 pl-12 relative z-10"
                  style={{
                    transform: `translateX(-${currentIndex * slideStep}px)`,
                    transition: isTransitioning ? 'transform 900ms cubic-bezier(0.25, 1, 0.3, 1)' : 'none',
                  }}
                  onTransitionEnd={handleTransitionEnd}
                >
                  {extendedProjects.map((project, idx) => {
                    const relPos = idx - currentIndex;
                    const isLargeLeftTile = relPos === 0;
                    const isBehindPeekingTile = relPos === 3;
                    const isExited = relPos < 0; // Exited card to the left: completely hidden

                    // Exited cards: preserve exact flex geometry but render zero visual DOM (completely hides left stray image)
                    if (isExited) {
                      return (
                        <div
                          key={`${project.id}-${idx}`}
                          className="shrink-0 w-[240px] h-[416px] pointer-events-none invisible opacity-0"
                          aria-hidden="true"
                        />
                      );
                    }

                    return (
                      <div
                        key={`${project.id}-${idx}`}
                        onClick={() => onNavigate && onNavigate('services')}
                        onMouseEnter={() => {
                          if (isLargeLeftTile) setIsHovered(true);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                        }}
                        style={{
                          transform: isLargeLeftTile ? 'scale(1.26)' : 'scale(1.0)',
                          transformOrigin: 'left center',
                          zIndex: isLargeLeftTile ? 30 : isBehindPeekingTile ? 5 : 15,
                          transition: isTransitioning
                            ? 'transform 900ms cubic-bezier(0.25, 1, 0.3, 1)'
                            : 'none',
                        }}
                        className="relative shrink-0 w-[240px] h-[416px] group cursor-pointer"
                      >
                        {/* Dynamic Traveling Glow Layer 1 */}
                        <div
                          className="absolute pointer-events-none -z-10"
                          style={{
                            inset: isLargeLeftTile ? '-8px' : '-4px',
                            borderRadius: isLargeLeftTile ? '34px' : '4px',
                            background: isLargeLeftTile ? '#548235' : 'rgba(0, 0, 0, 0.70)',
                            opacity: isLargeLeftTile ? 0.24 : 0.55,
                            filter: isLargeLeftTile ? 'blur(12px)' : 'blur(6px)',
                            boxShadow: isLargeLeftTile
                              ? '0 0 20px rgba(84, 130, 53, 0.35)'
                              : '0 8px 18px rgba(0, 0, 0, 0.70)',
                            transition: isTransitioning
                              ? 'all 900ms cubic-bezier(0.25, 1, 0.3, 1)'
                              : 'none',
                          }}
                        />

                        {/* Dynamic Traveling Glow Layer 2 */}
                        <div
                          className="absolute pointer-events-none -z-20"
                          style={{
                            inset: isLargeLeftTile ? '-14px' : '-8px',
                            borderRadius: isLargeLeftTile ? '40px' : '6px',
                            background: isLargeLeftTile ? '#548235' : 'rgba(0, 0, 0, 0.40)',
                            opacity: isLargeLeftTile ? 0.16 : 0.30,
                            filter: isLargeLeftTile ? 'blur(18px)' : 'blur(10px)',
                            transition: isTransitioning
                              ? 'all 900ms cubic-bezier(0.25, 1, 0.3, 1)'
                              : 'none',
                          }}
                        />

                        {/* Card Body */}
                        <div
                          style={{
                            borderRadius: isLargeLeftTile ? '30px' : '0px',
                            transform: 'translateZ(0)',
                            willChange: 'border-radius, box-shadow, border-color',
                            transition: isTransitioning
                              ? 'border-radius 900ms cubic-bezier(0.25, 1, 0.3, 1), border-color 900ms ease'
                              : 'none',
                          }}
                          className={`relative w-full h-full overflow-hidden backdrop-blur-md ${
                            isLargeLeftTile
                              ? 'border-2 border-[#548235] shadow-[inset_0_0_10px_rgba(84,130,53,0.20)]'
                              : 'border-2 border-white/20 shadow-[0_12px_28px_rgba(0,0,0,0.65)] hover:border-[#548235]/60'
                          }`}
                        >
                          <ProjectCardVideo
                            src={project.video}
                            isPlaying={isLargeLeftTile}
                            isTransitioning={isTransitioning}
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/10 pointer-events-none" />

                          <div
                            style={{
                              borderRadius: isLargeLeftTile ? '9999px' : '0px',
                              transition: isTransitioning
                                ? 'border-radius 900ms cubic-bezier(0.25, 1, 0.3, 1)'
                                : 'none',
                            }}
                            className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-md border border-white/20 text-[10.5px] font-bold text-emerald-400 uppercase tracking-wider"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{project.tag}</span>
                          </div>

                          <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                            <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                              {project.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-extrabold tracking-tight leading-snug drop-shadow-md truncate">
                              {project.title}
                            </h3>
                            <p className="text-xs text-gray-300 font-medium truncate mt-0.5">
                              {project.location}
                            </p>
                            <div className="mt-2.5 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-white/80">
                              <span className="font-mono">{project.specs}</span>
                              <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Footer Controls */}
              <div className="w-[920px] mt-1.5 relative z-10 flex items-center justify-between pl-12 pr-2 text-white">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-gray-400">
                  <span className="text-white font-bold text-sm sm:text-base">
                    {String((currentIndex % totalProjects) + 1).padStart(2, '0')}
                  </span>
                  <span>/</span>
                  <span>{String(totalProjects).padStart(2, '0')}</span>
                  <span className="ml-2 text-xs font-sans font-semibold text-emerald-400 uppercase tracking-wider">
                    • {PROJECT_VIDEOS[currentIndex % totalProjects].title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="w-9 h-9 rounded-none border border-white/20 bg-white/10 hover:bg-[#548235] hover:border-[#548235] flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                    title="Previous Project"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="w-9 h-9 rounded-none border border-white/20 bg-white/10 hover:bg-[#548235] hover:border-[#548235] flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer backdrop-blur-md"
                    title="Next Project"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 1: WHO WE ARE (2-Column: Content + 3 Bento Pillars on Left, Rotating Collage on Right) */}
          <div
            className={`w-full h-full flex items-center justify-between gap-6 lg:gap-8 xl:gap-12 transition-all duration-500 ease-in-out ${
              currentPage === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none hidden'
            }`}
          >
            {/* Left Column: Heading, Paragraphs, 3 Bento Pillars */}
            <div className="flex-1 min-w-0 max-w-[760px] xl:max-w-[840px] flex flex-col justify-center">
              {/* Header & Mission Statement */}
              <div className="flex flex-col space-y-2 mb-3.5 sm:mb-4">
                <div className="inline-flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#548235] animate-pulse" />
                  <span className={`text-[11px] sm:text-xs font-mono font-bold tracking-widest uppercase ${
                    isDark ? 'text-emerald-400' : 'text-[#548235]'
                  }`}>
                    CORE PILLARS & PURPOSE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-[32px] lg:text-[40px] font-bold tracking-tight uppercase leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                  WHO WE ARE
                </h2>
                <div className="space-y-1.5 pt-0.5 max-w-3xl">
                  <p className={`text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-normal ${
                    isDark ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    <strong className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transvolt</strong> is more than a business; it's a commitment to combating climate change and improving air quality through zero-emission mobility solutions. We're dedicated to building a green platform that offers <span className={`font-extrabold ${isDark ? 'text-emerald-400' : 'text-[#548235]'}`}>ZERO EMISSION</span> services, in alignment with global efforts towards sustainable transportation.
                  </p>
                  <p className={`text-[11px] sm:text-[12px] leading-relaxed font-normal ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    With a dedicated team and support from top infrastructure funds and financial institutions, we're leading the charge towards sustainable transportation in India and beyond!
                  </p>
                </div>
              </div>

              {/* 3 Bento Pillar Tiles with Increased Height & Faded Color Aura Behind Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 w-full pt-1">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`group relative rounded-2xl p-4.5 sm:p-5 flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 min-h-[250px] sm:min-h-[268px] ${
                        isDark
                          ? 'border-white/12 bg-[#0E1420]/85 shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-[#548235]/60 hover:shadow-[0_12px_32px_rgba(84,130,53,0.22)]'
                          : 'border-slate-200/90 bg-white/95 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-[#548235]/60 hover:shadow-[0_12px_32px_rgba(84,130,53,0.18)]'
                      }`}
                    >
                      {/* Top ambient radial glow */}
                      <div className="absolute top-0 right-0 w-28 h-28 bg-[#548235]/12 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div>
                        {/* Top Row: Icon with Faded Color Glow + Number Tag */}
                        <div className="flex items-center justify-between mb-3.5">
                          <div className="relative flex items-center justify-center">
                            {/* Enlarged Soft Radiant Faded Color Aura Behind Icon (Reduced Opacity by 30%) */}
                            <div
                              className={`absolute -inset-6 sm:-inset-7 rounded-full blur-xl pointer-events-none transition-all duration-500 ${
                                isDark
                                  ? 'bg-emerald-500/[0.20] group-hover:bg-emerald-400/[0.32]'
                                  : 'bg-emerald-400/[0.22] group-hover:bg-emerald-500/[0.35]'
                              }`}
                            />
                            <div className={`relative w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                              isDark
                                ? 'bg-[#548235]/25 text-[#72B347] border-[#548235]/50 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_14px_rgba(84,130,53,0.6)]'
                                : 'bg-emerald-50 text-[#548235] border-emerald-300/80 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_14px_rgba(84,130,53,0.35)]'
                            }`}>
                              <Icon className="w-5.5 h-5.5 stroke-[2.2]" />
                            </div>
                          </div>
                          
                          <span className={`text-[10.5px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${
                            isDark
                              ? 'bg-white/5 border-white/10 text-emerald-400'
                              : 'bg-slate-100 border-slate-200 text-[#548235]'
                          }`}>
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`text-[15px] sm:text-[16px] font-black tracking-wide uppercase mb-1 transition-colors ${
                          isDark
                            ? 'text-white group-hover:text-[#72B347]'
                            : 'text-gray-900 group-hover:text-[#548235]'
                        }`}>
                          {item.title}
                        </h3>

                        {/* Focus Sub-detail Tag */}
                        <p className={`text-[10px] sm:text-[10.5px] font-mono font-semibold tracking-wider uppercase mb-2 ${
                          isDark ? 'text-emerald-400/90' : 'text-[#548235]'
                        }`}>
                          {item.tag}
                        </p>
                        
                        {/* Full Detailed Description (No truncation) */}
                        <p className={`text-[11.5px] sm:text-[12px] leading-relaxed font-normal ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {item.description}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                        isDark ? 'border-white/10' : 'border-slate-100'
                      }`}>
                        <span className={`text-[11.5px] font-bold tracking-wide transition-colors ${
                          isDark
                            ? 'text-[#72B347] group-hover:text-[#86efac]'
                            : 'text-[#548235] group-hover:text-[#44692a]'
                        }`}>
                          Read More
                        </span>
                        <BrandArrow className="h-3 w-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Rotating 4-Image Collage Graphics */}
            <div className="shrink-0 hidden md:flex items-center justify-center pl-2">
              <Section2ImageCollage isDark={isDark} />
            </div>
          </div>

          {/* SLIDE 2: OUR NEWS (Left: News Tiles; Right: Rotating Earth Globe from Mizu) */}
          <div
            className={`w-full h-full flex items-center justify-between gap-6 lg:gap-10 xl:gap-14 transition-all duration-500 ease-in-out ${
              currentPage === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none hidden'
            }`}
          >
            {/* Left Column: News Header, 6 News Cards, Read More Button */}
            <div className="flex flex-col justify-center max-w-3xl lg:max-w-4xl xl:max-w-[880px] shrink-0">
              {/* Header & Sub-paragraph */}
              <div className="flex flex-col space-y-1.5 mb-3 max-w-5xl">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-[32px] lg:text-[38px] font-bold tracking-tight uppercase leading-none pt-0.5 inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                    Our News
                  </h2>
                  <span className={`px-3 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider backdrop-blur-md ${
                    isDark
                      ? 'bg-[#548235]/20 text-[#72B347] border border-[#548235]/40'
                      : 'bg-emerald-100/70 text-[#548235] border border-emerald-200'
                  }`}>
                    Latest Highlights
                  </span>
                </div>
                <p className={`text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-normal max-w-3xl ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Stay updated with Transvolt's landmark financing deals, EV fleet deployments, and strategic partnerships driving India's zero-emission heavy commercial mobility revolution.
                </p>
              </div>

              {/* 6 News Tiles: Left-Aligned in 2 Rows of 3 - Scaled Down by 25% with Compact Width */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-4 w-full pt-1">
                {newsList.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate && onNavigate('news')}
                    className={`group relative flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 rounded-xl overflow-hidden backdrop-blur-md min-h-[268px] sm:min-h-[280px] ${
                      isDark
                        ? 'bg-[#0E1420]/80 border border-[#283A52] hover:border-[#548235]/70 shadow-[0_6px_20px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_26px_rgba(84,130,53,0.18)]'
                        : 'bg-white/95 border border-slate-200/90 hover:border-[#548235]/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_26px_rgba(84,130,53,0.14)]'
                    }`}
                  >
                    {/* News Image with Date Pill - 100% Black BG with 70% Opacity Image */}
                    <div className={`relative w-full h-[126px] sm:h-[134px] lg:h-[142px] overflow-hidden border-b bg-black ${
                      isDark ? 'border-[#1E2C40]' : 'border-slate-100'
                    }`}>
                      <img
                        src={item.image || '/news-placeholder.jpg'}
                        alt={item.title}
                        className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-85 group-hover:scale-108 transition-all duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider backdrop-blur-md rounded border shadow-sm ${
                          isDark
                            ? 'bg-black/75 text-white border-[#283A52]'
                            : 'bg-white/90 text-gray-900 border-gray-200'
                        }`}>
                          {item.date || item.year}
                        </span>
                      </div>
                    </div>

                    {/* News Body */}
                    <div className="flex flex-col justify-between p-3 sm:p-3.5 flex-1">
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-1">
                          <span className="text-[9.5px] font-mono font-bold tracking-wider uppercase text-[#548235]">
                            {item.category}
                          </span>
                          <span className={`text-[9.5px] font-mono font-bold ${
                            isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {item.num}
                          </span>
                        </div>
                        <h3 className={`text-[11.5px] sm:text-[12px] lg:text-[12.5px] font-bold tracking-tight line-clamp-2 leading-snug transition-colors ${
                          isDark ? 'text-white group-hover:text-[#72B347]' : 'text-gray-900 group-hover:text-[#548235]'
                        }`}>
                          {item.title}
                        </h3>
                      </div>

                      <div className={`mt-2.5 pt-2 border-t flex items-center justify-between ${
                        isDark ? 'border-[#1E2C40]' : 'border-slate-100'
                      }`}>
                        <span className={`text-[10.5px] font-bold transition-colors ${
                          isDark ? 'text-gray-300 group-hover:text-[#72B347]' : 'text-gray-600 group-hover:text-[#548235]'
                        }`}>
                          Read Story
                        </span>
                        <BrandArrow className="h-2.5 w-auto group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Read More News CTA Button - Aligned to Left */}
              <div className="pt-3.5 sm:pt-4 flex justify-start">
                <button
                  onClick={() => onNavigate && onNavigate('news')}
                  className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border font-bold text-xs sm:text-[12.5px] tracking-wide group cursor-pointer transition-all duration-300 shadow-md ${
                    isDark
                      ? 'border-white/20 bg-[#182335]/90 hover:bg-[#548235] hover:border-[#548235] text-white shadow-black/40'
                      : 'border-slate-300 bg-white hover:bg-[#548235] hover:border-[#548235] text-gray-800 hover:text-white shadow-slate-200'
                  }`}
                >
                  <span>Read More News</span>
                  <BrandArrow
                    hoverWhite={true}
                    className="h-3 sm:h-3.5 w-auto group-hover:translate-x-1.5 transition-transform duration-150"
                  />
                </button>
              </div>
            </div>

            {/* Right Column: Rotating Earth Globe from Mizu */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative pl-2 xl:pl-6">
              <MizuEarthGlobe isDark={isDark} />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: 5 Numbers Tiles ONLY Shown on Section 1 / Slide 0 */}
        {currentPage === 0 && (
          <div
            className={`w-full pt-2 mb-4 sm:mb-5 transition-all duration-700 ease-out transform ${
              introStage >= 2
                ? 'translate-y-0 opacity-100'
                : 'translate-y-24 opacity-0 pointer-events-none'
            }`}
          >
            {/* 5 Equal Distributed Tiles Aligned till Theme Button */}
            <div className="grid grid-cols-5 gap-3 sm:gap-4 w-full items-center px-1 sm:px-2">
              {metrics.map((metric, idx) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={idx}
                    style={{
                      transitionDelay: introStage >= 2 ? `${idx * 60}ms` : '0ms',
                    }}
                    className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-2 sm:px-3 text-center rounded-xl sm:rounded-2xl backdrop-blur-md border group cursor-default transition-all duration-600 hover:-translate-y-0.5 bg-[#548235]/[0.11] border-[#548235]/55 shadow-[0_0_14px_rgba(84,130,53,0.35),inset_0_0_8px_rgba(84,130,53,0.15)] hover:bg-[#548235]/[0.18] hover:border-[#548235]/90 hover:shadow-[0_0_22px_rgba(84,130,53,0.60),inset_0_0_12px_rgba(84,130,53,0.25)] transform ${
                      introStage >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                    }`}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6 mb-1.5 group-hover:scale-110 drop-shadow-md transition-transform text-white opacity-95"
                      strokeWidth={2.2}
                    />
                    <span
                      className="text-[11px] sm:text-[12.5px] font-semibold tracking-wide leading-tight mb-1 drop-shadow-sm text-white/90"
                    >
                      {metric.label}
                    </span>
                    <span
                      className="text-2xl sm:text-[26px] lg:text-[31px] font-extrabold tracking-tight tabular-nums drop-shadow-md leading-tight mt-0.5 text-white"
                    >
                      <CountUpNumber target={metric.target} suffix={metric.suffix} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
