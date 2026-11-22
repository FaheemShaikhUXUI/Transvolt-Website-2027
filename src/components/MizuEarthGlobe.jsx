import React, { useEffect, useRef } from 'react';

/**
 * MizuEarthGlobe
 * Features:
 * - Dynamic Sun / Light Source smoothly tracking pointer coordinates (0ms lag, smooth lerp)
 * - 100% Circular Yellow-to-Black Radial Gradient BG dynamically following cursor direction
 * - Seamless 360-degree rotating Earth sphere with 80% opacity on illuminated side
 * - Adaptive spherical shadow mask dynamically casting opposite to cursor
 * - 4 3D Dotted Green Orbital Lines (2px thickness, radius +20%)
 * - The lines themselves physically REVOLVE around the globe in 3D:
 *   - Anti-Clockwise (top moves left <-, bottom moves right -> matching user diagram)
 *   - Clockwise (top moves right ->, bottom moves left <-)
 * - Glowing green satellite flares revolving around the globe with the lines
 * - Telemetry data badges (unclipped, fully opaque, elevated z-30)
 */
const MizuEarthGlobe = ({ isDark = true, className = '', showLabels = true }) => {
  const globeRef = useRef(null);
  const earthMaskRef = useRef(null);
  const surfaceRimRef = useRef(null);
  const auraRef = useRef(null);

  const targetDir = useRef({ x: -1, y: 0 }); // Default: illuminated from left
  const currentDir = useRef({ x: -1, y: 0 });
  const animRef = useRef(null);
  const isDarkRef = useRef(isDark);

  // Overall Earth Style calibrated precisely to match reference image:
  // 1. Earth Glow side color & strength (brilliant warm sunlight + golden continent wash)
  // 2. Earth dark side color & strength (warm dusky espresso shadow with visible night continents)
  // 3. Earth outer glow & color & strength (large, soft golden-cream solar flare on lit side, 0 on dark side)
  // 4. Earth texture (high-contrast, rich topographic vegetation & terrain relief)
  const applyLighting = (nx, ny, dark) => {
    // Radial light highlight location on sphere
    const lightX = 50 + nx * 46;
    const lightY = 50 + ny * 46;

    // Inset glow rim follows illuminated side (toward light source, -nx, -ny)
    const glowX = -nx * 20;
    const glowY = -ny * 20;

    // Outer glow rim radiates outward into space towards the cursor (nx, ny)
    const outerX = nx * 18;
    const outerY = ny * 18;

    if (globeRef.current) {
      // 1. Glow side & 2. Dark side: Golden-cream solar core -> warm amber dusk -> deep dusky espresso shadow -> +25% darker edge (#000000)
      globeRef.current.style.background = `radial-gradient(circle at ${lightX.toFixed(1)}% ${lightY.toFixed(1)}%,
        rgba(255, 255, 235, 0.75) 0%,
        rgba(255, 225, 55, 0.65) 12%,
        rgba(235, 175, 15, 0.48) 25%,
        rgba(185, 120, 10, 0.35) 38%,
        rgba(110, 65, 5, 0.25) 50%,
        rgba(25, 15, 8, 0.90) 65%,
        #0a0705 80%,
        #000000 92%,
        #000000 100%)`;

      // 3. Outer Glow (Reduced by 80%): Subtle, refined warm solar haze
      globeRef.current.style.boxShadow = `
        ${outerX.toFixed(1)}px ${outerY.toFixed(1)}px 16px rgba(255, 245, 160, 0.15),
        ${(outerX * 1.4).toFixed(1)}px ${(outerY * 1.4).toFixed(1)}px 30px rgba(255, 210, 65, 0.11),
        ${(outerX * 2.0).toFixed(1)}px ${(outerY * 2.0).toFixed(1)}px 48px rgba(255, 165, 25, 0.06),
        ${(outerX * 2.8).toFixed(1)}px ${(outerY * 2.8).toFixed(1)}px 68px rgba(255, 125, 10, 0.03)
      `;
    }

    if (earthMaskRef.current) {
      // 2. Dark side strength: Retains terrain visibility, deepening by 25% at the outer edge (from 0.34 to 0.25)
      const mask = `radial-gradient(circle at ${lightX.toFixed(1)}% ${lightY.toFixed(1)}%,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0.96) 28%,
        rgba(0, 0, 0, 0.82) 46%,
        rgba(0, 0, 0, 0.60) 60%,
        rgba(0, 0, 0, 0.40) 75%,
        rgba(0, 0, 0, 0.25) 100%)`;
      earthMaskRef.current.style.webkitMaskImage = mask;
      earthMaskRef.current.style.maskImage = mask;
    }

    if (surfaceRimRef.current) {
      // 1. Glow side strength + dark side edge shadow (+25% darkness on dark edge)
      surfaceRimRef.current.style.boxShadow = `
        inset ${glowX.toFixed(1)}px ${glowY.toFixed(1)}px 22px rgba(255, 252, 195, 0.92),
        inset ${(glowX * 1.6).toFixed(1)}px ${(glowY * 1.6).toFixed(1)}px 48px rgba(255, 210, 45, 0.75),
        inset ${(glowX * 2.4).toFixed(1)}px ${(glowY * 2.4).toFixed(1)}px 82px rgba(215, 130, 15, 0.52),
        inset ${(-glowX * 0.9).toFixed(1)}px ${(-glowY * 0.9).toFixed(1)}px 24px rgba(0, 0, 0, 0.60)
      `;
    }

    if (auraRef.current) {
      // 3. Outer Glow (Reduced by 80%): Soft, delicate backing solar aura
      auraRef.current.style.background = `radial-gradient(circle at ${lightX.toFixed(1)}% ${lightY.toFixed(1)}%,
        rgba(255, 253, 225, 0.19) 0%,
        rgba(255, 235, 110, 0.15) 20%,
        rgba(255, 200, 50, 0.08) 45%,
        rgba(255, 150, 20, 0.03) 65%,
        transparent 80%)`;
      auraRef.current.style.transform = `translate(calc(-50% + ${(nx * 10).toFixed(1)}px), calc(-50% + ${(ny * 10).toFixed(1)}px))`;
    }
  };

  // Sync theme changes immediately without waiting for pointer events
  useEffect(() => {
    isDarkRef.current = isDark;
    const len = Math.hypot(currentDir.current.x, currentDir.current.y) || 1;
    applyLighting(currentDir.current.x / len, currentDir.current.y / len, isDark);
  }, [isDark]);

  useEffect(() => {
    // Smooth lerp animation loop for dynamic illumination
    const updateLighting = () => {
      const dx = targetDir.current.x - currentDir.current.x;
      const dy = targetDir.current.y - currentDir.current.y;

      if (Math.abs(dx) > 0.0004 || Math.abs(dy) > 0.0004) {
        // Brisk, silky-smooth easing (0.13) for responsive tracking
        currentDir.current.x += dx * 0.13;
        currentDir.current.y += dy * 0.13;

        const len = Math.hypot(currentDir.current.x, currentDir.current.y) || 1;
        const nx = currentDir.current.x / len;
        const ny = currentDir.current.y / len;

        applyLighting(nx, ny, isDarkRef.current);

        animRef.current = requestAnimationFrame(updateLighting);
      } else {
        animRef.current = null;
      }
    };

    const startLoop = () => {
      if (!animRef.current) {
        animRef.current = requestAnimationFrame(updateLighting);
      }
    };

    // Ultra-reliable cached center coordinates
    const cachedCenter = { x: 0, y: 0, lastCheck: 0 };
    const resetCenter = () => {
      cachedCenter.x = 0;
      cachedCenter.y = 0;
      cachedCenter.lastCheck = 0;
    };

    const onPointerMove = (e) => {
      const globe = globeRef.current;
      if (!globe) return;
      const now = performance.now();
      if (now - cachedCenter.lastCheck > 400 || !cachedCenter.x) {
        cachedCenter.lastCheck = now;
        const rect = globe.getBoundingClientRect();
        if (rect.width > 0) {
          cachedCenter.x = rect.left + rect.width / 2;
          cachedCenter.y = rect.top + rect.height / 2;
        }
      }

      const cx = cachedCenter.x || window.innerWidth / 2;
      const cy = cachedCenter.y || window.innerHeight / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const len = Math.hypot(dx, dy) || 1;

      targetDir.current.x = dx / len;
      targetDir.current.y = dy / len;
      startLoop();
    };

    // Listen on capture phase on window to guarantee 100% reliable tracking across entire viewport
    window.addEventListener('pointermove', onPointerMove, { passive: true, capture: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true, capture: true });
    window.addEventListener('resize', resetCenter, { passive: true });
    window.addEventListener('scroll', resetCenter, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove, { capture: true });
      window.removeEventListener('mousemove', onPointerMove, { capture: true });
      window.removeEventListener('resize', resetCenter);
      window.removeEventListener('scroll', resetCenter);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);
  // Exactly 4 3D Orbital Lines revolving around the globe (clockwise & anti-clockwise)
  const orbits = [
    // Orbit 1: Diagonal matching user drawing, Anti-Clockwise (top moves left <-, bottom moves right ->)
    { tiltX: 68, tiltZ: -32, dur: 18, reverse: true },
    // Orbit 2: Crossing diagonal, Clockwise (top moves right ->, bottom moves left <-)
    { tiltX: 62, tiltZ: 36, dur: 22, reverse: false },
    // Orbit 3: Steep polar diagonal, Anti-Clockwise
    { tiltX: 74, tiltZ: -65, dur: 26, reverse: true },
    // Orbit 4: Inclined diagonal, Clockwise
    { tiltX: 54, tiltZ: 48, dur: 20, reverse: false },
  ];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <style>{`
        @keyframes mizuRotateEarth {
          0% { background-position: 0 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes mizuRotateClouds {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-400px); }
        }

        ${orbits
          .map(
            (o, i) => `
          @keyframes mizuRevolveOrbit${i} {
            0% {
              transform: translate(-50%, -50%) rotateY(${o.reverse ? 360 : 0}deg) rotateX(${o.tiltX}deg) rotateZ(${o.tiltZ}deg);
            }
            100% {
              transform: translate(-50%, -50%) rotateY(${o.reverse ? 0 : 360}deg) rotateX(${o.tiltX}deg) rotateZ(${o.tiltZ}deg);
            }
          }
        `
          )
          .join('\n')}
      `}</style>

      {/* SVG Smoke / Flame Displacement Filter from Mizu */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
        <filter id="mizu-flame-smoke-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.025"
            numOctaves="4"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              values="0.015 0.025; 0.018 0.03; 0.015 0.025"
              dur="8s"
              calcMode="spline"
              keyTimes="0; 0.5; 1"
              keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="40"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* 3. Outer Atmospheric Aura Backing: Reduced by 80% */}
      <div
        ref={auraRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none z-0 transition-transform duration-700 ease-out"
        style={{
          width: '120%',
          height: '120%',
          background:
            'radial-gradient(circle at 4% 50%, rgba(255, 253, 225, 0.19) 0%, rgba(255, 235, 110, 0.15) 20%, rgba(255, 200, 50, 0.08) 45%, rgba(255, 150, 20, 0.03) 65%, transparent 80%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Main 3D Spherical Earth Wrapper */}
      <div
        className="relative w-[300px] sm:w-[360px] lg:w-[390px] xl:w-[430px] aspect-square flex items-center justify-center z-10"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        {/* Exactly 4 3D Dotted Green Orbital Lines Revolving Around the Globe (2px thickness, radius +20%) */}
        {orbits.map((o, idx) => (
          <div
            key={idx}
            className="absolute top-1/2 left-1/2 w-[124%] h-[124%] pointer-events-none z-20 rounded-full"
            style={{
              animation: `mizuRevolveOrbit${idx} ${o.dur}s linear infinite`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Dotted Green Orbit Line: Exactly 2px Thickness */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full overflow-visible"
              style={{ filter: 'drop-shadow(0 0 5px rgba(52, 211, 153, 0.8))' }}
            >
              <circle
                cx="50"
                cy="50"
                r="49"
                fill="none"
                stroke="#34d399"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeDasharray="4 6"
                strokeLinecap="round"
                strokeOpacity={0.9}
              />
            </svg>

            {/* Glowing Green Satellite Flare Dot Traveling with the Orbit */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#34d399',
                boxShadow: '0 0 8px #34d399, 0 0 16px rgba(52, 211, 153, 0.95)',
              }}
            />

            {/* Secondary Opposite Flare on Orbit */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: '#72B347',
                boxShadow: '0 0 6px #72B347, 0 0 12px rgba(114, 179, 71, 0.8)',
              }}
            />
          </div>
        ))}

        {/* Main Globe Sphere: 1. Glow Side & 2. Dark Side (matching reference image) */}
        <div
          ref={globeRef}
          className="relative w-full h-full rounded-full overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 4% 50%, rgba(255, 255, 235, 0.75) 0%, rgba(255, 225, 55, 0.65) 12%, rgba(235, 175, 15, 0.48) 25%, rgba(185, 120, 10, 0.35) 38%, rgba(110, 65, 5, 0.25) 50%, rgba(25, 15, 8, 0.90) 65%, #0a0705 80%, #000000 92%, #000000 100%)',
            boxShadow:
              '-18px 0px 16px rgba(255, 245, 160, 0.15), -25px 0px 30px rgba(255, 210, 65, 0.11), -36px 0px 48px rgba(255, 165, 25, 0.06), -50px 0px 68px rgba(255, 125, 10, 0.03)',
          }}
        >
          {/* Earth Image Layer (Spherical circular terminator mask with visible dark side terrain) */}
          <div
            ref={earthMaskRef}
            className="absolute inset-0 w-full h-full rounded-full overflow-hidden"
            style={{
              WebkitMaskImage:
                'radial-gradient(circle at 4% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.96) 28%, rgba(0, 0, 0, 0.82) 46%, rgba(0, 0, 0, 0.60) 60%, rgba(0, 0, 0, 0.40) 75%, rgba(0, 0, 0, 0.25) 100%)',
              maskImage:
                'radial-gradient(circle at 4% 50%, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.96) 28%, rgba(0, 0, 0, 0.82) 46%, rgba(0, 0, 0, 0.60) 60%, rgba(0, 0, 0, 0.40) 75%, rgba(0, 0, 0, 0.25) 100%)',
            }}
          >
            {/* 4. Rotating Earth Map Texture: High-contrast rich topographic terrain relief */}
            <div
              className="absolute inset-0 w-full h-full rounded-full"
              style={{
                background: "url('/earth/earth_map.jpg') repeat-x center center",
                backgroundSize: 'auto 100%',
                animation: 'mizuRotateEarth 40s linear infinite',
                filter: 'contrast(1.22) saturate(1.30) brightness(1.08)',
              }}
            />

            {/* Subtle, non-obscuring Cloud Drift Layer */}
            <div
              className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
              style={{
                mixBlendMode: 'screen',
                opacity: 0.05,
              }}
            >
              <div
                className="absolute top-0 left-0 h-full"
                style={{
                  width: 'calc(100% + 400px)',
                  background: "url('/earth/grey_clouds.jpg') repeat center center",
                  backgroundSize: '400px auto',
                  animation: 'mizuRotateClouds 33.3s linear infinite',
                }}
              />
            </div>
          </div>

          {/* 1. Luminous Surface Sunlight Rim */}
          <div
            ref={surfaceRimRef}
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow:
                'inset 20px 0px 22px rgba(255, 252, 195, 0.92), inset 32px 0px 48px rgba(255, 210, 45, 0.75), inset 48px 0px 82px rgba(215, 130, 15, 0.52), inset -18px 0px 24px rgba(0, 0, 0, 0.60)',
            }}
          />
        </div>

        {/* Telemetry Data Badges from Mizu (Outside mask: fully crisp, 100% opaque, unclipped, elevated z-30) */}
        {showLabels && (
          <>
            {/* Top-Left Data Badge */}
            <div
              className={`absolute top-[16%] -left-3 sm:-left-6 z-30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold tracking-wider backdrop-blur-md border shadow-lg transition-transform hover:scale-105 ${
                isDark
                  ? 'bg-black/75 text-emerald-400 border-emerald-500/30 shadow-emerald-950/40'
                  : 'bg-white/90 text-[#3d6524] border-[#548235]/30 shadow-slate-300/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>EARTH TEMP: +1.2°C</span>
              </div>
            </div>

            {/* Mid-Right Data Badge */}
            <div
              className={`absolute top-[48%] -right-3 sm:-right-6 z-30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold tracking-wider backdrop-blur-md border shadow-lg transition-transform hover:scale-105 ${
                isDark
                  ? 'bg-black/75 text-emerald-300 border-emerald-500/30 shadow-emerald-950/40'
                  : 'bg-white/90 text-[#3d6524] border-[#548235]/30 shadow-slate-300/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>EMISSIONS: RISING</span>
              </div>
            </div>

            {/* Bottom-Left Data Badge */}
            <div
              className={`absolute bottom-[16%] -left-1 sm:-left-3 z-30 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg font-mono text-[9px] sm:text-[10px] font-bold tracking-wider backdrop-blur-md border shadow-lg transition-transform hover:scale-105 ${
                isDark
                  ? 'bg-black/75 text-emerald-400 border-emerald-500/30 shadow-emerald-950/40'
                  : 'bg-white/90 text-[#3d6524] border-[#548235]/30 shadow-slate-300/60'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span>FOSSIL FUEL: UNSUSTAINABLE</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MizuEarthGlobe;
