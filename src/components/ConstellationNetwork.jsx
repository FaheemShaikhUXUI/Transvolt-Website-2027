import React, { useEffect, useRef } from 'react';

/**
 * ConstellationNetwork
 * Ported directly from Portfolio V2/V3 (Page 1) with:
 * - 80+ dynamic sinusoidal nodes with organic breathing motion
 * - Interactive magnetic gravitational cursor attraction (+40% pull)
 * - Dynamic electric blue (#1E90FF) cursor connections
 * - Multi-node geometric triangle mesh facets
 * - High-DPI retina canvas scaling
 * - Theme-aware styling (light vs dark mode)
 */
export const ConstellationNetwork = ({
  isDark = false,
  className = '',
  dense = false,
  nodeCount,
  electric = false,
  densityGradient = 'none', // 'right-to-center' | 'none'
  dotColor = null,          // e.g. 'rgba(84, 130, 53, 0.25)' (Green 25%)
  lineColor = null,         // e.g. 'rgba(68, 114, 196, 0.25)' (Branding Blue 25%)
  facetOpacity = null,      // e.g. 0.03 (3% opacity)
  fullHeight = false,       // fill complete top & bottom edge
  pulseTrigger = null,      // Reactive trigger when frame moves/rotates
}) => {
  const canvasRef = useRef(null);
  const isDarkRef = useRef(isDark);
  isDarkRef.current = isDark;
  const electricRef = useRef(electric);
  electricRef.current = electric;
  const densityGradientRef = useRef(densityGradient);
  densityGradientRef.current = densityGradient;
  const dotColorRef = useRef(dotColor);
  dotColorRef.current = dotColor;
  const lineColorRef = useRef(lineColor);
  lineColorRef.current = lineColor;
  const facetOpacityRef = useRef(facetOpacity);
  facetOpacityRef.current = facetOpacity;
  const fullHeightRef = useRef(fullHeight);
  fullHeightRef.current = fullHeight;

  const lastPulseRef = useRef(pulseTrigger);
  const pulseSurgeRef = useRef({ time: 0, active: false });

  useEffect(() => {
    if (pulseTrigger !== null && pulseTrigger !== undefined && pulseTrigger !== lastPulseRef.current) {
      lastPulseRef.current = pulseTrigger;
      pulseSurgeRef.current = { time: performance.now(), active: true };
    }
  }, [pulseTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let netW = 0;
    let netH = 0;
    const TOTAL_NODES = dense ? 150 : (nodeCount || 85);
    let nodes = [];
    const randomArcs = []; // Active spontaneous electric discharges

    // Mouse tracking state
    const mouse = { x: -9999, y: -9999, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Resize canvas with high DPI backing store
    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      netW = rect.width;
      netH = rect.height;
      if (netW === 0 || netH === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = netW * dpr;
      canvas.height = netH * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Re-initialize nodes on size change or initial load
      initNodes();
    }

    function initNodes() {
      nodes = [];
      const isRightToCenter = densityGradientRef.current === 'right-to-center';
      const isFullH = fullHeightRef.current || isRightToCenter;

      for (let i = 0; i < TOTAL_NODES; i++) {
        let bx, by;

        if (isRightToCenter) {
          // Requirement 1 & 5: 100% density on right edge, decreasing to 0% at center (netW * 0.48)
          // Math.pow(u, 0.52) biases distribution towards 1.0 (right edge)
          const t = Math.pow(Math.random(), 0.52);
          const startX = netW * 0.48;
          bx = startX + t * (netW - startX);

          // Requirement 5: Complete top to bottom edge distribution
          by = Math.random() * netH;
        } else if (isFullH) {
          bx = Math.random() * netW;
          by = Math.random() * netH;
        } else {
          // Standard organic cluster around center for hero screens
          const angle = Math.random() * Math.PI * 2;
          const radiusDist = Math.pow(Math.random(), 0.75);
          const rx = (netW * 0.48) * radiusDist;
          const ry = (netH * 0.48) * radiusDist;
          bx = netW * 0.5 + Math.cos(angle) * rx + (Math.random() - 0.5) * (netW * 0.2);
          by = netH * 0.5 + Math.sin(angle) * ry + (Math.random() - 0.5) * (netH * 0.2);
        }

        nodes.push({
          x: bx,
          y: by,
          bx: Math.max(0, Math.min(netW, bx)),
          by: Math.max(0, Math.min(netH, by)),
          radius: 1.1 + Math.random() * 1.5,
          ampX: 7 + Math.random() * 11,
          ampY: 7 + Math.random() * 11,
          freqX: 0.0006 + Math.random() * 0.0008,
          freqY: 0.0005 + Math.random() * 0.0007,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          driftVx: (Math.random() - 0.5) * 0.05,
          driftVy: (Math.random() - 0.5) * 0.05,
        });
      }
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    function animate(time) {
      if (!ctx || netW === 0 || netH === 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, netW, netH);

      const dark = isDarkRef.current;
      const isElectric = electricRef.current;

      // Electric Lightning Drawer with High-Frequency Harmonic Jitter
      function drawLightning(x1, y1, x2, y2, seed, alpha, isCursor = false) {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const dist = Math.hypot(dx, dy);
        if (dist < 2) return;

        const nx = -dy / dist;
        const ny = dx / dist;

        const segments = dist > 70 ? 5 : dist > 35 ? 4 : 3;
        const jitterBase = isCursor ? 4.8 : 2.8;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x1, y1);

        for (let s = 1; s < segments; s++) {
          const t = s / segments;
          const harmonic = Math.sin(time * 0.045 + seed * 9.7 + s * 4.1);
          const noise = Math.sin(time * 0.085 + seed * 17.3 + s * 6.7) * 0.55;
          const offset = (harmonic + noise) * jitterBase * Math.sin(t * Math.PI);

          const px = x1 + dx * t + nx * offset;
          const py = y1 + dy * t + ny * offset;
          ctx.lineTo(px, py);
        }

        ctx.lineTo(x2, y2);

        // Outer electric plasma aura
        ctx.strokeStyle = isCursor
          ? (dark ? `rgba(56, 189, 248, ${alpha.toFixed(2)})` : `rgba(34, 197, 94, ${alpha.toFixed(2)})`)
          : `rgba(74, 222, 128, ${(alpha * 0.95).toFixed(2)})`;
        ctx.lineWidth = isCursor ? 1.3 : 1.1;
        ctx.shadowColor = isCursor ? (dark ? 'rgba(56, 189, 248, 0.75)' : 'rgba(34, 197, 94, 0.65)') : 'rgba(74, 222, 128, 0.85)';
        ctx.shadowBlur = isCursor ? 8 : 5;
        ctx.stroke();

        // Core white hot filament
        if (alpha > 0.3) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${(alpha * 0.85).toFixed(2)})`;
          ctx.lineWidth = 0.7;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Dynamic breathing connection threshold
      const baseThreshold = dense ? 105 : 92;
      const currentThreshold = baseThreshold + Math.sin(time * 0.0007) * 14;

      // Mouse relative to canvas
      const rect = canvas.getBoundingClientRect();
      const mx = mouse.x - rect.left;
      const my = mouse.y - rect.top;
      const mouseNearby = mouse.active && mx >= -60 && mx <= netW + 60 && my >= -60 && my <= netH + 60;

      // Density taper helper for right-to-center gradual decrease
      const isRightToCenter = densityGradientRef.current === 'right-to-center';
      const getDensityFactor = (x) => {
        if (!isRightToCenter) return 1;
        const startX = netW * 0.48;
        if (x <= startX) return 0;
        return Math.min(1, Math.max(0, (x - startX) / (netW - startX)));
      };

      // Update positions with drift, organic breathing, and magnetic attraction
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.bx += n.driftVx;
        n.by += n.driftVy;

        // Soft bounce boundaries within canvas
        if (isRightToCenter) {
          const minX = netW * 0.46;
          if (n.bx < minX || n.bx > netW) n.driftVx *= -1;
          if (n.by < 0 || n.by > netH) n.driftVy *= -1;
        } else {
          if (n.bx < 0 || n.bx > netW) n.driftVx *= -1;
          if (n.by < 0 || n.by > netH) n.driftVy *= -1;
        }

        // Sinusoidal organic displacement
        n.x = n.bx + Math.sin(time * n.freqX + n.phaseX) * n.ampX;
        n.y = n.by + Math.cos(time * n.freqY + n.phaseY) * n.ampY;

        // Interactive Cursor Magnetic Attraction (50% reduced attraction force)
        if (mouseNearby) {
          const cdx = mx - n.x;
          const cdy = my - n.y;
          const cDist = Math.hypot(cdx, cdy);
          const attractRadius = isElectric ? 130 : 110;
          if (cDist < attractRadius && cDist > 24) {
            // Reduced by 50% from 34 to 17 (and 26 to 13)
            const force = (1 - cDist / attractRadius) * (isElectric ? 17 : 13);
            n.x += (cdx / cDist) * force;
            n.y += (cdy / cDist) * force;
          }
        }

        // Kinetic Wave Ripple when frame moves/rotates
        if (pulseSurgeRef.current.active) {
          const surgeElapsed = time - pulseSurgeRef.current.time;
          if (surgeElapsed > 0 && surgeElapsed < 950) {
            const progress = surgeElapsed / 950;
            const wave = Math.sin(progress * Math.PI);
            const centerDist = Math.hypot(n.bx - netW * 0.5, n.by - netH * 0.5);
            const wavePhase = Math.sin((centerDist * 0.015) - progress * Math.PI * 2);
            const surgeForce = wave * wavePhase * 18;
            const angle = Math.atan2(n.by - netH * 0.5, n.bx - netW * 0.5);
            n.x += Math.cos(angle) * surgeForce;
            n.y += Math.sin(angle) * surgeForce;
          } else if (surgeElapsed >= 950) {
            pulseSurgeRef.current.active = false;
          }
        }
      }

      // Track nodes touched by cursor
      const touchedNodes = new Set();

      // Dynamic electric lightning arcs to cursor if nearby
      if (mouseNearby && mx >= -50 && mx <= netW + 50 && my >= -50 && my <= netH + 50) {
        const cursorThreshold = isElectric ? 145 : 120;
        const nearbyCandidates = [];

        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const cdist = Math.hypot(n.x - mx, n.y - my);
          if (cdist < cursorThreshold) {
            nearbyCandidates.push({ node: n, dist: cdist, index: i });
          }
        }

        nearbyCandidates.sort((a, b) => a.dist - b.dist);
        const maxCursorArcs = isElectric ? 6 : 4;
        const activeCursorArcs = nearbyCandidates.slice(0, maxCursorArcs);

        for (const item of activeCursorArcs) {
          const { node: n, dist: cdist, index: i } = item;
          touchedNodes.add(i);
          const cAlpha = Math.pow(1 - cdist / cursorThreshold, 1.2) * (isElectric ? 0.75 : 0.45);
          if (isElectric) {
            drawLightning(n.x, n.y, mx, my, i * 13, cAlpha, true);
          } else {
            ctx.beginPath();
            ctx.moveTo(mx, my);
            ctx.lineTo(n.x, n.y);
            ctx.strokeStyle = `rgba(30, 144, 255, ${cAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      // Spontaneous Random Electric Discharges across network
      if (isElectric) {
        if (Math.random() < 0.32) {
          const i1 = Math.floor(Math.random() * nodes.length);
          const p1 = nodes[i1];
          for (let cand = 0; cand < 8; cand++) {
            const i2 = Math.floor(Math.random() * nodes.length);
            if (i1 === i2) continue;
            const p2 = nodes[i2];
            const d = Math.hypot(p1.x - p2.x, p1.y - p2.y);
            if (d < 115 && d > 20) {
              randomArcs.push({
                x1: p1.x,
                y1: p1.y,
                x2: p2.x,
                y2: p2.y,
                life: 1.0,
                decay: 0.16 + Math.random() * 0.14,
                seed: Math.random() * 100,
              });
              break;
            }
          }
        }

        // Draw and age active random arcs
        for (let r = randomArcs.length - 1; r >= 0; r--) {
          const arc = randomArcs[r];
          drawLightning(arc.x1, arc.y1, arc.x2, arc.y2, arc.seed, arc.life * 0.9, false);
          arc.life -= arc.decay;
          if (arc.life <= 0) {
            randomArcs.splice(r, 1);
          }
        }
      }

      // Draw connecting lines between nodes & triangular facets
      const len = nodes.length;
      for (let i = 0; i < len; i++) {
        const p1 = nodes[i];
        const p1Touched = touchedNodes.has(i);

        for (let j = i + 1; j < len; j++) {
          const p2 = nodes[j];
          const dx = p1.x - p2.x;
          if (Math.abs(dx) > currentThreshold) continue;
          const dy = p1.y - p2.y;
          if (Math.abs(dy) > currentThreshold) continue;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < currentThreshold) {
            const p2Touched = touchedNodes.has(j);
            const lineRatio = 1 - dist / currentThreshold;
            const isBlue = p1Touched || p2Touched;
            const midX = (p1.x + p2.x) * 0.5;
            const gradFactor = getDensityFactor(midX);
            if (gradFactor <= 0.001) continue;

            let strokeStyle;
            let lineWidth = 0.55;

            if (isRightToCenter || lineColorRef.current) {
              // Requirement 3: Branding Blue with 25% opacity, tapered from right (100%) to center (0%)
              const maxAlpha = 0.25;
              const lineAlpha = lineRatio * maxAlpha * gradFactor;
              strokeStyle = lineColorRef.current
                ? lineColorRef.current
                : `rgba(68, 114, 196, ${lineAlpha.toFixed(3)})`;
              lineWidth = 0.65;
            } else {
              const lineAlpha = lineRatio * (isBlue ? 0.40 : 0.18);
              strokeStyle = isBlue
                ? `rgba(30, 144, 255, ${lineAlpha})`
                : (dark
                    ? `rgba(255, 255, 255, ${lineAlpha * 0.85})`
                    : `rgba(84, 130, 53, ${lineAlpha * 0.75})`);
              lineWidth = isBlue ? 0.85 : 0.55;
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            // 3-node triangular facet (Reduced layer density by 75%)
            for (let k = j + 1; k < len; k++) {
              // If right-to-center gradient mode, filter out 75% of facet generation (only 1 in 4 formed)
              if (isRightToCenter && (i + j + k) % 4 !== 0) continue;

              const p3 = nodes[k];
              if (Math.abs(p1.x - p3.x) > currentThreshold * 0.82) continue;
              const d13 = Math.hypot(p1.x - p3.x, p1.y - p3.y);
              const d23 = Math.hypot(p2.x - p3.x, p2.y - p3.y);
              if (d13 < currentThreshold * 0.82 && d23 < currentThreshold * 0.82) {
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.lineTo(p3.x, p3.y);
                ctx.closePath();

                if (isRightToCenter || facetOpacityRef.current !== null) {
                  // Reduced layer opacity by 75% (0.008 base)
                  const facetMidX = (p1.x + p2.x + p3.x) / 3;
                  const fFactor = getDensityFactor(facetMidX);
                  const baseAlpha = facetOpacityRef.current ?? 0.008;
                  const facetAlpha = baseAlpha * fFactor;
                  ctx.fillStyle = `rgba(68, 114, 196, ${facetAlpha.toFixed(4)})`;
                } else {
                  ctx.fillStyle = isBlue
                    ? 'rgba(30, 144, 255, 0.07)'
                    : (dark
                        ? 'rgba(255, 255, 255, 0.035)'
                        : 'rgba(84, 130, 53, 0.035)');
                }
                ctx.fill();
                break; // limit to 1 triangle per pair for aesthetic balance
              }
            }
          }
        }
      }

      // Draw node dots (Requirement 2: Green with 25% opacity)
      for (let i = 0; i < len; i++) {
        const n = nodes[i];
        const isTouched = touchedNodes.has(i);
        const gradFactor = getDensityFactor(n.x);
        if (gradFactor <= 0.001) continue;

        ctx.beginPath();
        ctx.arc(n.x, n.y, isTouched ? n.radius + 0.4 : n.radius, 0, Math.PI * 2);

        if (isRightToCenter || dotColorRef.current) {
          // Requirement 2: Green with 25% opacity max, smoothly decreasing to center
          const dotAlpha = 0.25 * gradFactor;
          ctx.fillStyle = isTouched
            ? '#1E90FF'
            : (dotColorRef.current || `rgba(84, 130, 53, ${dotAlpha.toFixed(3)})`);
        } else {
          ctx.fillStyle = isTouched
            ? '#1E90FF'
            : (dark
                ? 'rgba(255, 255, 255, 0.38)'
                : 'rgba(84, 130, 53, 0.45)');
        }
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
    </div>
  );
};

