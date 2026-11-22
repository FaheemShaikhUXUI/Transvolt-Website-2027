import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Users,
  Handshake,
  Scale,
  HeartHandshake,
  Leaf,
  Award,
  Megaphone,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Share2,
  Check,
  Building2,
  FileCheck,
  Heart,
  Eye,
  SlidersHorizontal,
  Lock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Mail,
  HelpCircle,
  FileText,
  Play,
  Pause,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  governanceBanner,
  governancePolicies,
  governanceMission,
} from '../data/governanceData';

// Map icon string names to components
const iconMap = {
  ShieldAlert,
  Users,
  Handshake,
  Scale,
  HeartHandshake,
  Leaf,
  Award,
  Megaphone,
};

// High-Voltage 200ms Electric Spark Connector (HomePage2 Logic) from Hexagon to Main Tile
const ElectricSparkConnector = ({ isSparkActive, isTopicMoving }) => {
  const canvasRef = useRef(null);
  const sparkStartRef = useRef(0);

  useEffect(() => {
    if (isSparkActive) {
      sparkStartRef.current = performance.now();
    }
  }, [isSparkActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let isRunning = true;

    const render = (now) => {
      if (!isRunning) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // Start: Hexagon apex (right side, x=w) -> Target: Main Tile edge (left side, x=0)
      const startX = w;
      const startY = h / 2;
      const targetX = 0;
      const targetY = h / 2;

      const elapsed = isSparkActive ? now - (sparkStartRef.current || now) : 9999;
      const isSpark = isSparkActive && elapsed < 200;

      // -----------------------------------------------------------------
      // 1. ELECTRIC SPARK (Exact Home Page 2 / NewsBulletEffects Formulation)
      // -----------------------------------------------------------------
      if (isSpark) {
        const progress = Math.min(1, Math.max(0, elapsed / 200));
        // High visibility intensity envelope from Home Page 2
        const intensity = progress < 0.1 ? progress / 0.1 : (1 - progress) / 0.9;
        const safeIntensity = Math.max(0.45, intensity);

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

        // 1c. Impact Flash at Main Tile terminal (x=0)
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

        // 1d. Emission Flash at Hexagon Apex (x=w)
        ctx.beginPath();
        ctx.arc(startX, startY, (4.5 + Math.random() * 2) * safeIntensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${(0.85 * safeIntensity).toFixed(2)})`;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 10;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(startX, startY, 2.0 * safeIntensity, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${(0.98 * safeIntensity).toFixed(2)})`;
        ctx.fill();

        ctx.restore();
      } else {
        // Resting State: Sleek glowing circuit filament with continuous energy pulse
        ctx.save();
        // Base Glow Line (Reduced to exactly 30% opacity)
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = 'rgba(84, 130, 53, 0.30)';
        ctx.lineWidth = 1.8;
        ctx.shadowColor = '#548235';
        ctx.shadowBlur = 6;
        ctx.stroke();

        // Inner Core Line (Reduced to exactly 30% opacity)
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(targetX, targetY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.30)';
        ctx.lineWidth = 0.8;
        ctx.shadowBlur = 0;
        ctx.stroke();

        // Soft Gradient traveling electric bead pulse from Hexagon (startX) to Main Tile (targetX)
        const beadT = (now % 1200) / 1200;
        const beadX = startX + (targetX - startX) * beadT;

        // Subtle trailing comet tail behind the bead (subdued 30%-35% opacity)
        const tailLength = 14;
        const tailEndX = Math.min(startX, beadX + tailLength);
        if (tailEndX > beadX) {
          const trailGrad = ctx.createLinearGradient(beadX, startY, tailEndX, startY);
          trailGrad.addColorStop(0, 'rgba(110, 231, 183, 0.35)');
          trailGrad.addColorStop(0.5, 'rgba(52, 211, 153, 0.15)');
          trailGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');

          ctx.beginPath();
          ctx.moveTo(beadX, startY);
          ctx.lineTo(tailEndX, startY);
          ctx.strokeStyle = trailGrad;
          ctx.lineWidth = 1.4;
          ctx.shadowColor = 'rgba(52, 211, 153, 0.3)';
          ctx.shadowBlur = 4;
          ctx.stroke();
        }

        // Soft, low-opacity Radial Gradient for the traveling bead (subdued ~35% opacity)
        const beadGrad = ctx.createRadialGradient(beadX, startY, 0, beadX, startY, 4.5);
        beadGrad.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
        beadGrad.addColorStop(0.3, 'rgba(110, 231, 183, 0.35)');
        beadGrad.addColorStop(0.7, 'rgba(52, 211, 153, 0.15)');
        beadGrad.addColorStop(1, 'rgba(52, 211, 153, 0)');

        ctx.beginPath();
        ctx.arc(beadX, startY, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = beadGrad;
        ctx.shadowColor = 'rgba(52, 211, 153, 0.35)';
        ctx.shadowBlur = 5;
        ctx.fill();

        // Terminal Node at Main Tile (left) (subtle 35% opacity)
        ctx.beginPath();
        ctx.arc(targetX, targetY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(84, 130, 53, 0.35)';
        ctx.shadowColor = '#548235';
        ctx.shadowBlur = 5;
        ctx.fill();

        // Terminal Node at Hexagon Apex (right) (subtle 35% opacity)
        ctx.beginPath();
        ctx.arc(startX, startY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(118, 184, 74, 0.35)';
        ctx.shadowColor = '#76B84A';
        ctx.shadowBlur = 5;
        ctx.fill();

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };
  }, [isSparkActive]);

  return (
    <div
      className={`hidden lg:flex items-center shrink-0 w-12 xl:w-16 2xl:w-20 h-12 relative z-30 transition-opacity duration-300 ease-out ${
        isTopicMoving ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />
    </div>
  );
};

export const GovernancePage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState('ALL'); // 'ALL' | 'E' | 'S' | 'G'
  const [activePolicy, setActivePolicy] = useState(null); // Policy opened in Charter Inspector
  const [copiedId, setCopiedId] = useState(null);
  const [selectedPolicyId, setSelectedPolicyId] = useState('anti-bribery');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Synchronized Spark & Tile Motion Orchestration
  const [isTopicMoving, setIsTopicMoving] = useState(false);
  const [isSparkActive, setIsSparkActive] = useState(false);
  const [impactGlowKey, setImpactGlowKey] = useState(0);
  const isFirstMountRef = useRef(true);

  // Precise Orchestration of Topic Movement, Spark, and Big Tile Stroke:
  // 1. Topic moves for 500ms -> static line hides smoothly
  // 2. When topic tile stops completely (at 500ms) -> 200ms spark fires (500ms to 700ms)
  // 3. Spark touches Big Tile -> Right stroke lights up strongly with 4px-to-2px lava yellow stroke & dual glow (decays over 7s)
  // 4. Spark ends at 700ms -> static line fades back in and stays shown until next topic move
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      setIsTopicMoving(false);
      setIsSparkActive(false);
      return;
    }

    setIsTopicMoving(true);
    setIsSparkActive(false);

    // 500ms: topic tile transition completes & stops completely
    const stopTimer = setTimeout(() => {
      setIsTopicMoving(false);
      // Spark starts right as topic stops completely
      setIsSparkActive(true);

      // Stroke impact lights up right as spark strikes Big Tile
      setImpactGlowKey((k) => k + 1);

      // Spark runs for exactly 200ms
      const endSparkTimer = setTimeout(() => {
        setIsSparkActive(false);
      }, 200);

      return () => clearTimeout(endSparkTimer);
    }, 500);

    return () => clearTimeout(stopTimer);
  }, [selectedPolicyId]);

  // ESG Pillars Mapping
  const esgMapping = {
    'anti-bribery': 'G',
    'directors-conduct': 'G',
    'vendors-suppliers': 'G',
    'code-of-ethics': 'G',
    'posh-policy': 'S',
    'hse-policy': 'E',
    'quality-policy': 'E',
    'whistle-blower': 'G',
  };

  const selectedIndex = useMemo(() => {
    const idx = governancePolicies.findIndex((p) => p.id === selectedPolicyId);
    return idx >= 0 ? idx : 0;
  }, [selectedPolicyId]);

  const selectedPolicy = governancePolicies[selectedIndex] || governancePolicies[0];

  // Dynamic Edge Gradient Hide:
  // - Image 1: When at the very first topic (selectedIndex === 0), do NOT hide top; fade bottom as it touches bottom edge.
  // - When at the very last topic (selectedIndex === length - 1), do NOT hide bottom; fade top as it touches top edge.
  // - Image 2: When items touch both top and bottom (middle topics), apply gradient hide to both top and bottom edges.
  const maskGradient = useMemo(() => {
    const touchesTop = selectedIndex > 0;
    const touchesBottom = selectedIndex < governancePolicies.length - 1;

    if (!touchesTop && touchesBottom) {
      // First topic (Image 1): Crisp solid top (no hide), gradient hide only at bottom where list overflows
      return 'linear-gradient(to bottom, black 0%, black 86%, transparent 100%)';
    }
    if (touchesTop && !touchesBottom) {
      // Last topic: Gradient hide at top where list overflows, crisp solid bottom (no hide)
      return 'linear-gradient(to bottom, transparent 0%, black 14%, black 100%)';
    }
    if (!touchesTop && !touchesBottom) {
      return 'none';
    }
    // Middle topics (Image 2): List touches both top and bottom -> dual-edge gradient hide
    return 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)';
  }, [selectedIndex]);

  const handleNextCockpitPolicy = useCallback(() => {
    setSelectedPolicyId((prevId) => {
      const idx = governancePolicies.findIndex((p) => p.id === prevId);
      if (idx < 0 || idx >= governancePolicies.length - 1) {
        return governancePolicies[0]?.id || prevId;
      }
      return governancePolicies[idx + 1].id;
    });
    setProgress(0);
  }, []);

  const handlePrevCockpitPolicy = useCallback(() => {
    setSelectedPolicyId((prevId) => {
      const idx = governancePolicies.findIndex((p) => p.id === prevId);
      if (idx <= 0) {
        return governancePolicies[governancePolicies.length - 1]?.id || prevId;
      }
      return governancePolicies[idx - 1].id;
    });
    setProgress(0);
  }, []);

  // Reset progress bar on manual policy selection
  useEffect(() => {
    setProgress(0);
  }, [selectedPolicyId]);

  // 7-second auto-play timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = 50;
    const totalDurationMs = 7000;
    const step = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextCockpitPolicy();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, handleNextCockpitPolicy]);

  const handlePillarSelect = (pillar) => {
    setSelectedPillar(pillar);
    if (pillar === 'ALL') {
      setSelectedPolicyId(governancePolicies[0].id);
    } else {
      const match = governancePolicies.find((p) => esgMapping[p.id] === pillar);
      if (match) setSelectedPolicyId(match.id);
    }
    setProgress(0);
  };

  const filteredPolicies = useMemo(() => {
    return governancePolicies.filter((policy) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        policy.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        policy.content.toLowerCase().includes(searchQuery.toLowerCase());

      const pillar = esgMapping[policy.id] || 'G';
      const matchesPillar = selectedPillar === 'ALL' || pillar === selectedPillar;

      return matchesSearch && matchesPillar;
    });
  }, [searchQuery, selectedPillar]);

  const handleShare = (e, policy) => {
    e.stopPropagation();
    const url = `${window.location.origin}?page=governance#${policy.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(policy.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActivePolicy(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNextPolicy = () => {
    if (!activePolicy) return;
    const idx = filteredPolicies.findIndex((p) => p.id === activePolicy.id);
    if (idx < filteredPolicies.length - 1) {
      setActivePolicy(filteredPolicies[idx + 1]);
    } else {
      setActivePolicy(filteredPolicies[0]);
    }
  };

  const handlePrevPolicy = () => {
    if (!activePolicy) return;
    const idx = filteredPolicies.findIndex((p) => p.id === activePolicy.id);
    if (idx > 0) {
      setActivePolicy(filteredPolicies[idx - 1]);
    } else {
      setActivePolicy(filteredPolicies[filteredPolicies.length - 1]);
    }
  };

  // Dynamic Liquid Spotlight Cursor Tracking (Dual-Tier: 600px Color + 120px Solid No-Gap Core)
  const heroRef = useRef(null);
  const spotlightColorRef = useRef(null); // 600px color pixel grid
  const spotlightSolidRef = useRef(null); // 120px solid image (no pixel gaps)
  const targetPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  useEffect(() => {
    let animId;
    const animate = () => {
      if (heroRef.current) {
        if (isHovered.current) {
          // Smooth fluid lag / inertia
          currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
          currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

          const cx = currentPos.current.x;
          const cy = currentPos.current.y;
          const time = performance.now() * 0.003;

          // 1. Color Grid Radius: 600px
          const rxColor = 600 + Math.sin(time) * 12;
          const ryColor = 600 + Math.cos(time * 1.3) * 12;
          const maskColor = `radial-gradient(${rxColor.toFixed(1)}px ${ryColor.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px, black 0%, black 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.2) 85%, transparent 100%)`;

          // 2. Solid Merged Core Radius: 120px (90% merging near cursor -> 0% merging at 120px edge)
          const rxSolid = 120 + Math.sin(time) * 6;
          const rySolid = 120 + Math.cos(time * 1.3) * 6;
          const maskSolid = `radial-gradient(${rxSolid.toFixed(1)}px ${rySolid.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.82) 30%, rgba(0,0,0,0.5) 65%, rgba(0,0,0,0.15) 88%, transparent 100%)`;

          if (spotlightColorRef.current) {
            spotlightColorRef.current.style.maskImage = maskColor;
            spotlightColorRef.current.style.webkitMaskImage = maskColor;
          }
          if (spotlightSolidRef.current) {
            spotlightSolidRef.current.style.maskImage = maskSolid;
            spotlightSolidRef.current.style.webkitMaskImage = maskSolid;
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const updateDim = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        targetPos.current.width = rect.width;
        targetPos.current.height = rect.height;
      }
    };
    window.addEventListener('resize', updateDim);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', updateDim);
    };
  }, []);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetPos.current.x = x;
    targetPos.current.y = y;
    targetPos.current.width = rect.width;
    targetPos.current.height = rect.height;

    if (!isHovered.current) {
      isHovered.current = true;
      currentPos.current = { x, y };
      if (spotlightColorRef.current) spotlightColorRef.current.style.opacity = '1';
      if (spotlightSolidRef.current) spotlightSolidRef.current.style.opacity = '1';
    }
  };

  const handleHeroMouseLeave = () => {
    isHovered.current = false;
    if (spotlightColorRef.current) spotlightColorRef.current.style.opacity = '0';
    if (spotlightSolidRef.current) spotlightSolidRef.current.style.opacity = '0';
  };

  // 200px Radius Cursor Glow Spotlight for Background Grid Lines
  const blueStageRef = useRef(null);
  const handleBlueStageMouseMove = (e) => {
    if (!blueStageRef.current) return;
    const rect = blueStageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    blueStageRef.current.style.setProperty('--grid-x', `${x}px`);
    blueStageRef.current.style.setProperty('--grid-y', `${y}px`);
  };

  const handleBlueStageMouseLeave = () => {
    if (!blueStageRef.current) return;
    blueStageRef.current.style.setProperty('--grid-x', `-1000px`);
    blueStageRef.current.style.setProperty('--grid-y', `-1000px`);
  };

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#080C14] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* =========================================================================
          FULL-WIDTH CINEMATIC HERO SECTION (NEWS PAGE STYLE)
          ========================================================================= */}
      <section data-bg="dark" className="relative w-full overflow-hidden">
        {/* Full-Width Image Banner with Text Overlay (100% black on backside, 75% opacity image) */}
        <div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          data-bg="dark"
          className="relative w-full min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] pt-24 pb-10 sm:pt-28 sm:pb-12 flex items-center bg-black overflow-hidden"
        >
          {/* 100% Black Base Canvas */}
          {/* Base Layer: Ultra High Density Halftone Dot Raster Image Technology */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-[4] bg-black">
            <img
              src="/Governance_halftone.png?v=3"
              alt="Transvolt Governance Halftone"
              className="w-full h-full object-cover object-center opacity-75 brightness-110 transition-opacity duration-300 select-none"
            />
          </div>

          {/* Tier 2: 600px Radius Color Spotlight Reveal (Smooth photographic color under cursor) */}
          <div
            ref={spotlightColorRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] transition-opacity duration-300"
            style={{
              opacity: 0,
            }}
          >
            <img
              src="/Governance_2.png"
              alt="Transvolt Governance Focus Color"
              className="w-full h-full object-cover object-center opacity-95 select-none"
            />
          </div>

          {/* Tier 3: 120px Radius Solid Merged Core (ZERO pixel gaps, full solid photo beneath cursor) */}
          <div
            ref={spotlightSolidRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[6] transition-opacity duration-300"
            style={{
              opacity: 0,
            }}
          >
            <img
              src="/Governance_2.png"
              alt="Transvolt Governance Focus Solid"
              className="w-full h-full object-cover object-center opacity-100 select-none"
            />
          </div>

          {/* Scrim Overlay - Retains image brilliance while guaranteeing maximum text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none z-[7]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-[7]" />

          {/* Text Content & 4 Glassmorphic Tiles Directly OVER the Image */}
          <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full py-2 sm:py-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 xl:gap-10">
              {/* Left Column: Headlines & Subtitle */}
              <div className="max-w-xl lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-[#548235]/50 text-[#548235] dark:text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#548235] animate-pulse" />
                  <span>Institutional Integrity & Compliance</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-white drop-shadow-xl">
                  Governance Built on<br />
                  <span className="text-[#548235] text-transparent bg-clip-text bg-gradient-to-r from-[#548235] via-[#66b338] to-[#22c55e]">
                    Accountability & Trust
                  </span>
                </h1>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-200 font-normal drop-shadow-md max-w-xl">
                  At Transvolt, ethical leadership, transparent reporting, and zero-tolerance compliance govern every bus deployed, every depot operated, and every stakeholder relationship across India.
                </p>
              </div>

              {/* Right Column: 4 ESG Pillar Tiles in 2x2 Grid (Reduced Compact Size) */}
              <div className="w-full lg:w-[420px] xl:w-[460px] grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 shrink-0">
                {/* Tile 1: All Policies Pill */}
                <button
                  type="button"
                  onClick={() => handlePillarSelect('ALL')}
                  className={`relative group rounded-xl p-3 sm:p-3.5 backdrop-blur-xl border shadow-xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                    selectedPillar === 'ALL'
                      ? 'bg-[#548235]/35 border-[#548235] ring-2 ring-[#548235]/60 shadow-[0_8px_30px_rgba(84,130,53,0.35)] -translate-y-0.5'
                      : 'bg-black/45 border-white/20 hover:bg-black/65 hover:border-[#548235]/60 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/70 group-hover:text-white">
                      Complete Framework
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#548235] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="mt-1.5">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#84cc16] transition-colors">
                      All 8 Charters
                    </h3>
                    <p className="text-[11px] text-gray-300/90 mt-0.5 line-clamp-1">Universal statutory governance</p>
                  </div>
                </button>

                {/* Tile 2: Environmental Pillar */}
                <button
                  type="button"
                  onClick={() => handlePillarSelect('E')}
                  className={`relative group rounded-xl p-3 sm:p-3.5 backdrop-blur-xl border shadow-xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                    selectedPillar === 'E'
                      ? 'bg-[#10b981]/30 border-[#10b981] ring-2 ring-[#10b981]/60 shadow-[0_8px_30px_rgba(16,185,129,0.35)] -translate-y-0.5'
                      : 'bg-black/45 border-white/20 hover:bg-black/65 hover:border-[#10b981]/60 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/70 group-hover:text-white">
                      E • Environmental
                    </span>
                    <Leaf className="w-3.5 h-3.5 text-[#10b981] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="mt-1.5">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#34d399] transition-colors">
                      HSE & Quality
                    </h3>
                    <p className="text-[11px] text-gray-300/90 mt-0.5 line-clamp-1">Zero emissions, battery lifecycle</p>
                  </div>
                </button>

                {/* Tile 3: Social Pillar */}
                <button
                  type="button"
                  onClick={() => handlePillarSelect('S')}
                  className={`relative group rounded-xl p-3 sm:p-3.5 backdrop-blur-xl border shadow-xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                    selectedPillar === 'S'
                      ? 'bg-[#f59e0b]/30 border-[#f59e0b] ring-2 ring-[#f59e0b]/60 shadow-[0_8px_30px_rgba(245,158,11,0.35)] -translate-y-0.5'
                      : 'bg-black/45 border-white/20 hover:bg-black/65 hover:border-[#f59e0b]/60 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/70 group-hover:text-white">
                      S • Social & Human
                    </span>
                    <HeartHandshake className="w-3.5 h-3.5 text-[#f59e0b] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="mt-1.5">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#fbbf24] transition-colors">
                      POSH & Inclusion
                    </h3>
                    <p className="text-[11px] text-gray-300/90 mt-0.5 line-clamp-1">Safe workplaces & transit</p>
                  </div>
                </button>

                {/* Tile 4: Governance Pillar */}
                <button
                  type="button"
                  onClick={() => handlePillarSelect('G')}
                  className={`relative group rounded-xl p-3 sm:p-3.5 backdrop-blur-xl border shadow-xl flex flex-col justify-between text-left transition-all duration-300 cursor-pointer ${
                    selectedPillar === 'G'
                      ? 'bg-[#3b82f6]/30 border-[#3b82f6] ring-2 ring-[#3b82f6]/60 shadow-[0_8px_30px_rgba(59,130,246,0.35)] -translate-y-0.5'
                      : 'bg-black/45 border-white/20 hover:bg-black/65 hover:border-[#3b82f6]/60 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-white/70 group-hover:text-white">
                      G • Governance & Vigil
                    </span>
                    <Scale className="w-3.5 h-3.5 text-[#3b82f6] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="mt-1.5">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-[#60a5fa] transition-colors">
                      Anti-Bribery & Vigil
                    </h3>
                    <p className="text-[11px] text-gray-300/90 mt-0.5 line-clamp-1">Whistleblower & conduct</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. 1920x1080 BLUE COMPLIANCE STAGE: NEWS-STYLE BIG TILE + HEXAGON CONSOLE
          ========================================================================= */}
      <section
        ref={blueStageRef}
        onMouseMove={handleBlueStageMouseMove}
        onMouseLeave={handleBlueStageMouseLeave}
        data-bg="dark"
        className="relative w-full min-h-[850px] xl:min-h-[920px] bg-[#162E61] flex flex-col pt-3 sm:pt-4 pb-12 sm:pb-16 overflow-hidden border-b border-black/[0.06] dark:border-white/[0.08]"
        style={{
          background: 'radial-gradient(ellipse at top right, #4472C4 0%, #2A5199 40%, #1A3973 80%, #11244A 100%)',
        }}
      >
        {/* Ambient base electric grid (scaled down by 65% from 64px to 22px micro-mesh) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:22px_22px] pointer-events-none" />

        {/* 200px Radius Interactive Cursor Glow Spotlight Layer for Thin White Grid Lines (Matching 22px grid) */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.75) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            maskImage:
              'radial-gradient(200px circle at var(--grid-x, -1000px) var(--grid-y, -1000px), black 0%, rgba(0,0,0,0.7) 45%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(200px circle at var(--grid-x, -1000px) var(--grid-y, -1000px), black 0%, rgba(0,0,0,0.7) 45%, transparent 100%)',
          }}
        />

        {/* 200px Radius Gradient Light Aura Glow near Cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200"
          style={{
            background:
              'radial-gradient(200px circle at var(--grid-x, -1000px) var(--grid-y, -1000px), rgba(110, 231, 183, 0.25) 0%, rgba(68, 114, 196, 0.35) 45%, transparent 100%)',
          }}
        />

        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#4472C4]/30 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-1/4 w-[420px] h-[420px] bg-[#548235]/25 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full relative z-10">
          {/* Header Row: Top-aligned selection buttons & spacious supporting text */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5 xl:mb-6">
            <div>
              <h2 className="text-2xl sm:text-[42px] lg:text-[48px] xl:text-[52px] font-thin tracking-normal text-white drop-shadow-md leading-tight">
                Active Corporate Charters {governancePolicies.length}
              </h2>
              <p className="mt-3.5 sm:mt-4 text-xs sm:text-sm text-gray-200/90 max-w-xl font-light leading-relaxed">
                Select any charter from the right console to inspect enforceable compliance standards, audit metrics, and governance protocols.
              </p>
            </div>

            {/* Quick Pillar Filter Badges (Top-aligned with main heading text) */}
            <div className="flex items-center gap-2 flex-wrap pt-2 sm:pt-3 shrink-0">
              {[
                { id: 'ALL', label: 'All 8 Charters' },
                { id: 'E', label: 'E • Environment' },
                { id: 'S', label: 'S • Social' },
                { id: 'G', label: 'G • Governance' },
              ].map((pill) => {
                const isAct = selectedPillar === pill.id;
                return (
                  <button
                    key={pill.id}
                    type="button"
                    onClick={() => handlePillarSelect(pill.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                      isAct
                        ? 'bg-[#548235] text-white border-[#548235] shadow-lg shadow-[#548235]/30'
                        : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {pill.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Cockpit: Left Big Tile (News Style) + 200ms Electric Spark + Right Hexagon Column */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-0 relative">
            
            {/* =========================================================================
                LEFT SIDE: NEWS-PAGE STYLE BIG TILE (20% WIDER TOWARDS RIGHT SIDE)
                ========================================================================= */}
            <div className="w-full lg:w-[55%] xl:w-[56%] h-[680px] xl:h-[720px] relative flex flex-col">
              {/* Card Body with rounded corners & internal overflow protection */}
              <div className="w-full h-full flex flex-col rounded-3xl border border-white/20 shadow-2xl overflow-hidden relative">
                {/* Image Section on Top (Full Image in center filling height, blurred 60% opacity background over 100% black) */}
                <div className="relative h-[270px] sm:h-[300px] xl:h-[315px] w-full shrink-0 overflow-hidden bg-black">
                  {/* 100% Complete Black Background with Same Image Softly Blurred at 60% Opacity */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`blur-${selectedPolicy.id}`}
                      src={selectedPolicy.image}
                      alt=""
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.6 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 w-full h-full object-cover blur-md scale-105 pointer-events-none select-none"
                    />
                  </AnimatePresence>

                  {/* Centered Full Image Filling Height with Intact Aspect Ratio */}
                  <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`main-${selectedPolicy.id}`}
                        src={selectedPolicy.image}
                        alt={selectedPolicy.title}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className="h-full w-auto max-w-full object-contain object-center drop-shadow-2xl select-none"
                      />
                    </AnimatePresence>
                  </div>

                  {/* Soft Edge Scrim for Maximum Text Contrast */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-black/35 pointer-events-none" />

                  {/* Floating Badges over Image: Topic Tag with Pillar Tier on Top-Left & STAT on Top-Right */}
                  <div className="absolute z-20 top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 backdrop-blur-md text-[#76B84A] border border-white/15 text-xs font-bold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#548235]" />
                      <span>
                        Pillar {esgMapping[selectedPolicy.id]} ({esgMapping[selectedPolicy.id] === 'E' ? 'Environmental' : esgMapping[selectedPolicy.id] === 'S' ? 'Social' : 'Governance'}) • {selectedPolicy.category}
                      </span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-xs font-mono font-bold shadow-lg">
                      <span>STAT-{selectedPolicy.number}</span>
                    </span>
                  </div>

                  {/* Share Button Over Image on Bottom-Left Side */}
                  <div className="absolute z-30 bottom-3.5 left-3.5 flex items-center">
                    <button
                      type="button"
                      onClick={(e) => handleShare(e, selectedPolicy)}
                      className="px-3 py-1.5 rounded-xl border border-white/20 bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-white/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium shadow-xl"
                      title="Share Charter"
                    >
                      {copiedId === selectedPolicy.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-gray-200" />
                          <span>Share</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Controls (Left, Play/Pause, Right) Over Image on Bottom-Right Side */}
                  <div className="absolute z-30 bottom-3.5 right-3.5 flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-1 shadow-xl">
                    <button
                      type="button"
                      onClick={handlePrevCockpitPolicy}
                      className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                      title="Previous Charter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isPlaying
                          ? 'bg-[#548235]/80 text-white border-[#548235]/60'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                      title={isPlaying ? 'Pause 7s Auto-Play' : 'Resume 7s Auto-Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>

                    <span className="font-mono text-xs text-white/90 px-1.5 select-none font-semibold">
                      {selectedIndex + 1}/{governancePolicies.length}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextCockpitPolicy}
                      className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
                      title="Next Charter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* 7-Second Duration Progress Line at bottom edge of image area */}
                  <div className="absolute z-30 bottom-0 left-0 right-0 h-[1px] bg-black/40 backdrop-blur-xs overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] shadow-[0_0_8px_#22c55e] transition-[width] duration-75 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Lower Body Section: Single clean scroll area (Zero Double Scrollbars), About Page Section 5's Tile Fill Effect */}
                <div className="p-5 sm:p-6 xl:p-7 flex-1 flex flex-col justify-between backdrop-blur-xl bg-black/45 border-t border-white/20 shadow-2xl overflow-hidden">
                  <div className="flex-1 flex flex-col min-h-0">
                    {/* Headline Made Less Bold */}
                    <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight leading-snug mb-2.5 shrink-0">
                      {selectedPolicy.title}
                    </h3>

                    {/* Single Clean Scrollable Paragraph Content */}
                    <div className="space-y-2.5 overflow-y-auto pr-2 custom-scrollbar flex-1 mb-3">
                      {selectedPolicy.content.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-xs sm:text-[13px] text-gray-200 leading-relaxed font-normal">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Statutory Provisions Highlights */}
                    {selectedPolicy.highlights && (
                      <div className="pt-2 border-t border-white/10 shrink-0 space-y-1.5">
                        <span className="text-[10.5px] font-mono uppercase tracking-wider text-gray-400 font-semibold block">
                          Core Statutory Provisions:
                        </span>
                        {selectedPolicy.highlights.slice(0, 2).map((h, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-200 bg-white/[0.04] p-2 rounded-xl border border-white/[0.08]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#548235] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{h}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Spark Impact Stroke & Glow (Symmetrical Both Sides: Inside & Outside the Tile, Decays over 7s, Opacity reduced by 40%) */}
              <motion.div
                key={`spark-stroke-glow-${impactGlowKey}`}
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 7,
                  ease: 'easeOut',
                }}
                className="absolute -right-[60px] top-0 bottom-0 w-[120px] pointer-events-none z-40 overflow-visible flex items-center justify-center"
              >
                {/* 1. Soft Gradient Glow (Diffuse, zero hard edges, 40% softer opacity) */}
                <div
                  className="absolute inset-x-0 top-[18%] bottom-[18%]"
                  style={{
                    background:
                      'radial-gradient(ellipse 70px 220px at 60px 50%, rgba(250, 204, 21, 0.28) 0%, rgba(245, 158, 11, 0.16) 35%, rgba(245, 158, 11, 0.05) 65%, transparent 100%)',
                    filter: 'blur(18px)',
                  }}
                />

                {/* 2. Precision SVG 3px Overall Stroke centered on Card Border (X = 60) */}
                <svg
                  className="absolute inset-0 h-full w-full overflow-visible"
                  viewBox="0 0 120 720"
                  preserveAspectRatio="none"
                >
                  <defs>
                    {/* Soft Diffuse Radial Glow Gradient */}
                    <radialGradient id="softLavaGlowRadial" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.4" />
                      <stop offset="35%" stopColor="#FACC15" stopOpacity="0.22" />
                      <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.06" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                    </radialGradient>

                    {/* 3px Stroke Gradient: Yellow at Center 50% (Y=360), fading to 0% at 25% (Y=180) & 75% (Y=540) */}
                    <linearGradient id="lavaStroke3px" x1="0" y1="180" x2="0" y2="540" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FACC15" stopOpacity="0" />
                      <stop offset="25%" stopColor="#FBBF24" stopOpacity="0.3" />
                      <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.65" />
                      <stop offset="75%" stopColor="#FBBF24" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#FACC15" stopOpacity="0" />
                    </linearGradient>

                    {/* Inner Core Filament Gradient */}
                    <linearGradient id="lavaCoreLine3px" x1="0" y1="240" x2="0" y2="480" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
                      <stop offset="25%" stopColor="#FEF08A" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.65" />
                      <stop offset="75%" stopColor="#FEF08A" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </linearGradient>

                    {/* Dual-Sided Stroke Glow Filter */}
                    <filter id="bothSidesGlowFilterSoft" x="-300%" y="-30%" width="700%" height="160%">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur1" />
                      <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur2" />
                      <feMerge>
                        <feMergeNode in="blur2" />
                        <feMergeNode in="blur1" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Soft Radial Ellipse Glow behind the stroke (zero edges, pure ambient glow) */}
                  <ellipse
                    cx="60"
                    cy="360"
                    rx="46"
                    ry="170"
                    fill="url(#softLavaGlowRadial)"
                    style={{ filter: 'blur(14px)' }}
                  />

                  {/* High-Voltage 3px Glow Halo Line */}
                  <line
                    x1="60"
                    y1="180"
                    x2="60"
                    y2="540"
                    stroke="url(#lavaStroke3px)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    filter="url(#bothSidesGlowFilterSoft)"
                    opacity="0.5"
                  />

                  {/* 3px Overall Stroke along Big Tile Border (X=60) */}
                  <line
                    x1="60"
                    y1="180"
                    x2="60"
                    y2="540"
                    stroke="url(#lavaStroke3px)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 5px rgba(250, 204, 21, 0.6)) drop-shadow(0 0 10px rgba(234, 179, 8, 0.35))',
                    }}
                  />

                  {/* Inner White-Hot Core Line (1.2px) */}
                  <line
                    x1="60"
                    y1="240"
                    x2="60"
                    y2="480"
                    stroke="url(#lavaCoreLine3px)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </svg>
              </motion.div>
            </div>

            {/* =========================================================================
                MIDDLE: 200ms ELECTRIC SPARK CONNECTOR (FROM HEXAGON TO MAIN TILE)
                ========================================================================= */}
            <ElectricSparkConnector isSparkActive={isSparkActive} isTopicMoving={isTopicMoving} />

            {/* =========================================================================
                RIGHT SIDE: HEXAGON COLUMN (ALIGNED STRICTLY UNDER THEME BUTTON MARGIN)
                ========================================================================= */}
            <div className="w-full lg:w-[41%] xl:w-[40%] h-[680px] xl:h-[720px] relative">
              {/* Quick Stepper Buttons floating on upper/lower right */}
              <div className="absolute right-1 top-3 z-30 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={handlePrevCockpitPolicy}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                  title="Scroll Up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute right-1 bottom-3 z-30 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={handleNextCockpitPolicy}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all cursor-pointer shadow-lg"
                  title="Scroll Down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              {/* Viewport Mask Container (Fixed to Viewport, Dynamic Edge Gradient Hide) */}
              <div
                className="w-full h-full relative overflow-hidden"
                style={{
                  maskImage: maskGradient,
                  WebkitMaskImage: maskGradient,
                  transition: 'mask-image 0.3s ease, -webkit-mask-image 0.3s ease',
                }}
              >
                {/* Centering Track: top-1/2 with translateY guarantee item center is at 50% */}
                <div
                  className="w-full absolute left-0 right-0 top-1/2 flex flex-col items-start gap-3 transition-transform duration-500 ease-out"
                  style={{
                    transform: `translateY(-${selectedIndex * 118 + 53}px)`,
                  }}
                >
                  {governancePolicies.map((policy) => {
                  const isSelected = policy.id === selectedPolicyId;
                  const Icon = iconMap[policy.iconName] || ShieldCheck;

                  return (
                    <div
                      key={policy.id}
                      className="w-full relative flex items-center shrink-0"
                      style={{ height: '106px' }}
                    >
                      {/* Hexagon Tile */}
                      <div
                        onClick={() => setSelectedPolicyId(policy.id)}
                        className={`relative cursor-pointer transition-all duration-500 ease-out shrink-0 ${
                          isSelected
                            ? 'scale-100 opacity-100 z-20'
                            : 'scale-[0.80] opacity-65 hover:opacity-95 hover:scale-[0.84]'
                        }`}
                        style={{
                          width: 'calc(100% - 105px)',
                          maxWidth: '460px',
                          height: '106px',
                          transformOrigin: 'left center',
                        }}
                      >
                        {/* Hexagon Clipped Background & Content Container */}
                        <div
                          className="w-full h-full relative overflow-hidden bg-black"
                          style={{
                            clipPath:
                              'polygon(31.5px 0%, calc(100% - 31.5px) 0%, 100% 50%, calc(100% - 31.5px) 100%, 31.5px 100%, 0% 50%)',
                          }}
                        >
                          {/* 100% Black Fill Base */}
                          {/* Topic Image with 100% Opacity (Grayscale if non-selected, Color if selected) */}
                          <img
                            src={policy.image}
                            alt={policy.title}
                            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                              isSelected ? 'opacity-100 grayscale-0' : 'opacity-100 grayscale'
                            }`}
                          />

                          {/* Dark Gradient Scrim for crisp text contrast */}
                          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/80 z-[5]" />

                          {/* Content Container inside Hexagon: Left Inner Regular Hexagon (Concentric 8px margin) + Right Text */}
                          <div className="relative z-10 h-full w-full select-none">
                            {/* 1. Large Regular Equal-Sided Hexagon on Left Side (100% Concentric 60° Angles with 8.0px Uniform Gap) */}
                            <div className="absolute left-[11px] top-[10px] w-[99.3px] h-[86px] flex items-center justify-center z-10 pointer-events-none">
                              <svg
                                viewBox="0 0 99.3 86"
                                className="absolute inset-0 w-full h-full transition-all duration-300"
                                style={{
                                  filter: isSelected ? 'drop-shadow(0 2px 10px rgba(84,130,53,0.65))' : 'none',
                                }}
                              >
                                <polygon
                                  points="24.8,0 74.5,0 99.3,43 74.5,86 24.8,86 0,43"
                                  fill={isSelected ? '#548235' : 'rgba(255, 255, 255, 0.08)'}
                                  stroke={isSelected ? '#76B84A' : 'rgba(255, 255, 255, 0.22)'}
                                  strokeWidth={isSelected ? 1.8 : 1.2}
                                  className="transition-colors duration-300"
                                />
                              </svg>
                              {/* Topic Icon centered inside */}
                              <Icon
                                className={`relative z-10 w-6 h-6 transition-colors duration-300 ${
                                  isSelected ? 'text-white stroke-[2.4]' : 'text-gray-300 stroke-[2]'
                                }`}
                              />
                            </div>

                            {/* 2. Topic Details on the right of the inner hexagon */}
                            <div className="relative z-10 h-full pl-[122px] pr-8 sm:pr-10 py-2.5 flex flex-col justify-center">
                              <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-white/70 block">
                                STAT-{policy.number} • {policy.category}
                              </span>

                              {/* Clean White Headline with full opacity */}
                              <h4 className="text-white font-semibold text-sm sm:text-base leading-snug line-clamp-1 mt-0.5 opacity-100">
                                {policy.title}
                              </h4>

                              {/* Supporting Thin Text */}
                              <p className="text-white/80 font-light text-xs line-clamp-1 mt-0.5">
                                {policy.summary}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Precise Vector Fixed-Angle SVG Border (Left Cap, Right Cap, Horizontal Connecting Edges) */}
                        <div className="absolute inset-0 pointer-events-none z-20">
                          {/* Left Hexagon Cap Border (Fixed 60° Angle, 8.0px Concentric Gap Everywhere) */}
                          <svg
                            className="absolute left-0 top-0 h-[106px] w-[36px] pointer-events-none overflow-visible"
                            viewBox="0 0 36 106"
                            fill="none"
                          >
                            <path
                              d="M 36,2 L 31.5,2 L 2,53 L 31.5,104 L 36,104"
                              stroke={isSelected ? '#548235' : 'rgba(255, 255, 255, 0.22)'}
                              strokeWidth={isSelected ? 2.8 : 1}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                filter: isSelected ? 'drop-shadow(0 0 16px rgba(84,130,53,0.75))' : 'none',
                              }}
                            />
                          </svg>

                          {/* Right Hexagon Cap Border (Fixed 60° Angle) */}
                          <svg
                            className="absolute right-0 top-0 h-[106px] w-[36px] pointer-events-none overflow-visible"
                            viewBox="0 0 36 106"
                            fill="none"
                          >
                            <path
                              d="M 0,2 L 4.5,2 L 34,53 L 4.5,104 L 0,104"
                              stroke={isSelected ? '#548235' : 'rgba(255, 255, 255, 0.22)'}
                              strokeWidth={isSelected ? 2.8 : 1}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                filter: isSelected ? 'drop-shadow(0 0 16px rgba(84,130,53,0.75))' : 'none',
                              }}
                            />
                          </svg>

                          {/* Top and Bottom Horizontal Connecting Border Lines */}
                          <div
                            className="absolute left-[34px] right-[34px] pointer-events-none"
                            style={{
                              top: isSelected ? '0.6px' : '1.5px',
                              height: isSelected ? '2.8px' : '1px',
                              backgroundColor: isSelected ? '#548235' : 'rgba(255, 255, 255, 0.22)',
                              boxShadow: isSelected ? '0 0 16px rgba(84,130,53,0.75)' : 'none',
                            }}
                          />
                          <div
                            className="absolute left-[34px] right-[34px] pointer-events-none"
                            style={{
                              bottom: isSelected ? '0.6px' : '1.5px',
                              height: isSelected ? '2.8px' : '1px',
                              backgroundColor: isSelected ? '#548235' : 'rgba(255, 255, 255, 0.22)',
                              boxShadow: isSelected ? '0 0 16px rgba(84,130,53,0.75)' : 'none',
                            }}
                          />
                        </div>
                      </div>

                      {/* Transvolt Branding Dual Chevron Arrow + Razor-Thin Tile Count Number (Till Theme Button, Exact Vertical Center) */}
                      {isSelected && (
                        <div
                          className="absolute right-0 sm:right-1 top-0 bottom-0 h-full flex items-center gap-3 sm:gap-3.5 pointer-events-none z-30 transition-all duration-300 shrink-0 select-none"
                        >
                          {/* Dual Chevron Arrow (+30% Larger Size) */}
                          <svg
                            viewBox="0 0 1340 1070"
                            className="w-11 sm:w-12 xl:w-[48px] h-auto select-none shrink-0"
                            fill="none"
                          >
                            <polygon
                              points="0,0 395.83,0 778.77,534.52 395.83,1069.04 0,1069.04 382.93,534.52"
                              fill="#548235"
                            />
                            <polygon
                              points="561.05,0 956.89,0 1339.8,534.52 956.89,1069.04 561.05,1069.04 943.97,534.52"
                              fill="#4472C4"
                            />
                          </svg>

                          {/* Razor-Thin Hairline Long Narrow Text (Optically Centered with Arrow & Tile) */}
                          <div className="flex items-center justify-center -translate-y-[6px]">
                            <span
                              className="text-white/95 select-none tracking-normal leading-none font-thin"
                              style={{
                                fontFamily: "'Antonio', 'Ostrich Sans', 'Six Caps', 'Pathway Extreme', 'Teko', sans-serif",
                                fontSize: '88px',
                                lineHeight: '0.80',
                                fontWeight: 100,
                                WebkitFontSmoothing: 'antialiased',
                                MozOsxFontSmoothing: 'grayscale',
                              }}
                            >
                              {policy.number}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

      {/* =========================================================================
          4. INCLUSIVE MOBILITY MISSION SHOWCASE (AMAZING UX FEATURE)
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-10">
        <div
          className={`relative rounded-3xl overflow-hidden border p-8 sm:p-12 ${
            isDark
              ? 'bg-gradient-to-br from-[#0F172A] via-[#0E1524] to-[#0A0E1A] border-white/10'
              : 'bg-gradient-to-br from-white via-[#FAFDF9] to-[#F1F7EE] border-[#548235]/30 shadow-lg'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30 text-xs font-bold uppercase tracking-wider mb-3">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Social Inclusion Charter</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-semibold tracking-tight">
                {governanceMission.headline}
              </h3>

              <p
                className={`mt-4 text-sm sm:text-base leading-relaxed ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {governanceMission.body}
              </p>

              {/* Inclusion 3 Pillars */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-black/30 border-white/10' : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold text-[#548235] block mb-1">01 • Universal Access</span>
                  <p className="text-xs text-gray-400">Low-floor boarding ramps for specially-abled & senior citizens</p>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-black/30 border-white/10' : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold text-[#0ea5e9] block mb-1">02 • Zero Noise Pollution</span>
                  <p className="text-xs text-gray-400">Whisper-quiet electric powertrains protecting urban acoustics</p>
                </div>

                <div
                  className={`p-4 rounded-xl border ${
                    isDark ? 'bg-black/30 border-white/10' : 'bg-white border-gray-200'
                  }`}
                >
                  <span className="text-xs font-bold text-[#f59e0b] block mb-1">03 • Women Workforce</span>
                  <p className="text-xs text-gray-400">POSH-certified driver and depot maintenance opportunities</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-[#548235]/10 border border-[#548235]/20 text-center">
              <ShieldCheck className="w-12 h-12 text-[#548235] mb-3" />
              <h4 className="text-lg font-bold">Confidential Whistleblower Desk</h4>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                Employees, vendors, and partners can report any violation anonymously with guaranteed anti-retaliation protection.
              </p>
              <a
                href="mailto:whistleblower@transvolt.in"
                className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#548235] hover:bg-[#44692a] text-white transition-all shadow-sm"
              >
                Report to Vigilance Officer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. STATUTORY CHARTER INSPECTOR MODAL (DEEP DIVE UX)
          ========================================================================= */}
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border shadow-2xl flex flex-col justify-between ${
              isDark ? 'bg-[#0B101D] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {/* Header Sticky Bar */}
            <div
              className={`sticky top-0 z-30 px-6 py-4 border-b flex items-center justify-between backdrop-blur-xl ${
                isDark ? 'bg-[#0B101D]/90 border-white/10' : 'bg-white/90 border-gray-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#548235]/15 text-[#548235] dark:text-[#76B84A]">
                  STAT-{activePolicy.number}
                </span>
                <span className="text-xs text-gray-400 font-semibold">
                  {activePolicy.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => handleShare(e, activePolicy)}
                  className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  title="Copy link"
                >
                  {copiedId === activePolicy.id ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Share2 className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                <button
                  onClick={() => setActivePolicy(null)}
                  className="p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center shrink-0">
                  {React.createElement(iconMap[activePolicy.iconName] || ShieldCheck, {
                    className: 'w-8 h-8',
                  })}
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                    {activePolicy.title}
                  </h2>
                  <p className="text-xs font-mono uppercase tracking-wider text-gray-400 mt-1">
                    Compliance Classification: {activePolicy.category}
                  </p>
                </div>
              </div>

              {/* Highlights Deck */}
              {activePolicy.highlights && (
                <div
                  className={`p-5 rounded-2xl border ${
                    isDark ? 'bg-black/40 border-white/10' : 'bg-slate-50 border-gray-200'
                  }`}
                >
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#548235] mb-3">
                    Core Statutory Principles & Mandatory Mandates:
                  </h4>
                  <ul className="space-y-2.5">
                    {activePolicy.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#548235] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Charter Content */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Official Policy Statement:
                </h4>
                <div
                  className={`text-sm sm:text-base leading-relaxed whitespace-pre-line ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  {activePolicy.content}
                </div>
              </div>

              {/* Reporting / Escalation Pill */}
              <div
                className={`p-4 rounded-xl border flex items-center justify-between text-xs ${
                  isDark ? 'bg-white/[0.02] border-white/10' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 text-gray-400">
                  <Lock className="w-4 h-4 text-[#548235]" />
                  <span>Enforcement & Escalation: Designated Compliance Officer / Audit Committee</span>
                </div>
                <a
                  href="mailto:info@transvolt.in"
                  className="font-bold text-[#548235] hover:underline"
                >
                  Contact Vigilance
                </a>
              </div>
            </div>

            {/* Modal Footer Navigation */}
            <div
              className={`p-6 border-t flex items-center justify-between ${
                isDark ? 'border-white/10 bg-black/20' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <button
                onClick={handlePrevPolicy}
                className="inline-flex items-center gap-2 text-xs font-bold hover:text-[#548235] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Charter</span>
              </button>

              <button
                onClick={() => setActivePolicy(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#548235] text-white"
              >
                Close Inspector
              </button>

              <button
                onClick={handleNextPolicy}
                className="inline-flex items-center gap-2 text-xs font-bold hover:text-[#548235] transition-colors"
              >
                <span>Next Charter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
