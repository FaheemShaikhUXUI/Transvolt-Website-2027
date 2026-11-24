import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ConstellationNetwork } from './ConstellationNetwork';
import {
  FIRST_METADATA,
  TRANSVOLT_FIRSTS,
  UPCOMING_FIRSTS_RADAR,
} from '../data/firstData';
import {
  Sparkles,
  Award,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bus,
  Cpu,
  Zap,
  ShieldCheck,
  Truck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Flame,
  Layers,
  Filter,
} from 'lucide-react';

export default function FirstPage({ onNavigate }) {
  const { isDark } = useTheme();

  // Category Filter State & 3D Coverflow Stack State
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardProgress, setCardProgress] = useState(0); // 0 to 100 duration progress line
  const [isHovered, setIsHovered] = useState(false);
  const [activeToggleTab, setActiveToggleTab] = useState({}); // 'solution' or 'problem' per card id
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const categories = useMemo(() => {
    return ['All', 'Public Transit', 'Fleet OS & Tech', 'Megawatt Depots', 'Industrial Haulage', 'Governance'];
  }, []);

  const total = TRANSVOLT_FIRSTS.length;

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
    setCardProgress(0);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
    setCardProgress(0);
  };

  // Continuous auto-play loop with live duration progress line (pauses on hover)
  useEffect(() => {
    if (isHovered) return;

    const stepMs = 40; // 25fps smooth progress updates
    const durationMs = 5000; // 5 seconds per breakthrough
    const increment = (stepMs / durationMs) * 100;

    const timer = setInterval(() => {
      setCardProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveIndex((curr) => (curr + 1) % total);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isHovered, total]);

  // Sync category pill with active card
  useEffect(() => {
    const current = TRANSVOLT_FIRSTS[activeIndex];
    if (!current) return;
    if (current.id === 'gcc-concessions') setActiveCategory('Public Transit');
    else if (current.id === 'oem-agnostic-os') setActiveCategory('Fleet OS & Tech');
    else if (current.id === 'megawatt-depots') setActiveCategory('Megawatt Depots');
    else if (current.id === 'heavy-freight-corridor') setActiveCategory('Industrial Haulage');
    else if (current.id === 'dual-iso-certification' || current.id === 'cell-health-analytics') setActiveCategory('Governance');
  }, [activeIndex]);

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setCardProgress(0);
    if (cat === 'All') {
      setActiveIndex(0);
      return;
    }
    const targetIdx = TRANSVOLT_FIRSTS.findIndex((f) => {
      if (cat === 'Public Transit') return f.id === 'gcc-concessions';
      if (cat === 'Fleet OS & Tech') return f.id === 'oem-agnostic-os';
      if (cat === 'Megawatt Depots') return f.id === 'megawatt-depots';
      if (cat === 'Industrial Haulage') return f.id === 'heavy-freight-corridor';
      if (cat === 'Governance') return f.id === 'dual-iso-certification' || f.id === 'cell-health-analytics';
      return false;
    });
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx);
    }
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  // Calculate 3D Stack positioning where active card is centered and others hide behind with 20% peeking
  const getCardTransform = (idx) => {
    const N = TRANSVOLT_FIRSTS.length;
    let offset = idx - activeIndex;
    if (offset > N / 2) offset -= N;
    if (offset < -N / 2) offset += N;

    if (offset === 0) {
      // CENTER ACTIVE CARD: Full prominence, interactive, 100% visible
      return {
        style: {
          transform: 'translate3d(-50%, 0, 0) scale(1)',
          zIndex: 30,
          opacity: 1,
          pointerEvents: 'auto',
        },
        offset: 0,
        isCenter: true,
      };
    }

    if (offset === -1) {
      // LEFT PEEKING CARD: Hiding behind center, exactly ~20% visible from the left side
      return {
        style: {
          transform: 'translate3d(calc(-50% - 25%), 0, 0) scale(0.90)',
          zIndex: 20,
          opacity: 0.65,
          pointerEvents: 'auto',
          cursor: 'pointer',
        },
        offset: -1,
        isCenter: false,
      };
    }

    if (offset === 1) {
      // RIGHT PEEKING CARD: Hiding behind center, exactly ~20% visible from the right side
      return {
        style: {
          transform: 'translate3d(calc(-50% + 25%), 0, 0) scale(0.90)',
          zIndex: 20,
          opacity: 0.65,
          pointerEvents: 'auto',
          cursor: 'pointer',
        },
        offset: 1,
        isCenter: false,
      };
    }

    if (offset === -2) {
      // Deeper left stack behind
      return {
        style: {
          transform: 'translate3d(calc(-50% - 35%), 0, 0) scale(0.82)',
          zIndex: 10,
          opacity: 0.15,
          pointerEvents: 'none',
        },
        offset: -2,
        isCenter: false,
      };
    }

    if (offset === 2) {
      // Deeper right stack behind
      return {
        style: {
          transform: 'translate3d(calc(-50% + 35%), 0, 0) scale(0.82)',
          zIndex: 10,
          opacity: 0.15,
          pointerEvents: 'none',
        },
        offset: 2,
        isCenter: false,
      };
    }

    // Fully hidden background cards
    return {
      style: {
        transform: 'translate3d(-50%, 0, 0) scale(0.75)',
        zIndex: 5,
        opacity: 0,
        pointerEvents: 'none',
      },
      offset,
      isCenter: false,
    };
  };

  const renderIcon = (name, className) => {
    switch (name) {
      case 'Bus':
        return <Bus className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Truck':
        return <Truck className={className} />;
      case 'Award':
        return <Award className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const getCardMode = (id) => {
    return activeToggleTab[id] || 'solution';
  };

  const setCardMode = (id, mode) => {
    setActiveToggleTab((prev) => ({ ...prev, [id]: mode }));
  };

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-black text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
      {/* =========================================================================
          HERO SECTION - 1920x1080 CINEMATIC CANVAS (100% BLACK BG, 75% IMAGE OPACITY)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] max-w-[1920px] mx-auto bg-black overflow-hidden select-none border-b border-white/[0.08] flex flex-col justify-between">
        {/* Background Visual Layer */}
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none">
          <img
            src="/life/2.JPG"
            alt="Transvolt First Hero"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75 select-none transition-opacity duration-1000"
          />
        </div>

        {/* Hero Content: Anchored to Top Center */}
        <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full pt-20 sm:pt-24 pb-2 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-[#548235]/60 text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md shadow-xl">
              <Award className="w-3.5 h-3.5 text-[#548235]" />
              <span>{FIRST_METADATA.badge}</span>
            </div>

            {/* Headline: Clean White */}
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              Pioneering the Standards Others Measure By.
            </h1>

            {/* Supporting Text Directly Below Headline */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-100 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-3xl text-center">
              {FIRST_METADATA.subtitle}
            </p>

            {/* Hero Quick Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-5">
              <a
                href="#firsts-showcase"
                className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer border border-[#548235]/80"
              >
                <span>Explore The Firsts</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#next-firsts"
                className="px-5 py-2.5 rounded-xl border border-white/30 bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-xl hover:border-white/50"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>The Next First Radar</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 4 Impact Metric Tiles (Expo Glass Effect: 12px curve, specular glare, frosted glass fill) */}
        <div className="relative z-10 w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-10 pr-16 sm:pr-24 lg:pr-28 pb-4 sm:pb-6">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {FIRST_METADATA.stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden py-2 sm:py-2.5 px-4 sm:px-5 rounded-[12px] bg-[#548235]/16 hover:bg-[#548235]/24 backdrop-blur-xl border border-[#548235]/75 hover:border-[#76B84A] shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.45),0_12px_32px_rgba(0,0,0,0.5)] flex items-center gap-2.5 sm:gap-3 transition-all hover:-translate-y-0.5 group"
              >
                <div className="expo-glass-glare" />
                <div className="expo-glass-sheen" />
                <span className="relative z-10 text-base sm:text-lg font-extrabold text-[#76B84A] tracking-tight shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  {stat.value}
                </span>
                <div className="relative z-10 flex flex-col min-w-0">
                  <span className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                    {stat.label}
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] text-gray-200 font-medium truncate mt-0.5">
                    {stat.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: THE FIRSTS SHOWCASE (FILTER TABS + BENTO FIRSTS)
          ========================================================================= */}
      <section id="firsts-showcase" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            Industry Benchmarks
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Historical Breakthroughs
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Every entry below marks an Indian commercial EV industry milestone first conceived, engineered, or deployed by Transvolt.
          </p>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#548235] text-white shadow-md shadow-[#548235]/30'
                      : 'bg-white dark:bg-[#0B0F17] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:border-[#548235]/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Stacked Coverflow Showcase (Center Card Prominent, Others Hiding Behind with ~20% Visible Peeking) */}
        <div
          className="relative w-full max-w-[1360px] mx-auto py-4 select-none overflow-hidden sm:overflow-visible"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Floating Left Navigation Arrow Button */}
          <button
            onClick={goToPrev}
            aria-label="Previous Breakthrough"
            className="hidden sm:flex absolute left-0 lg:left-2 top-1/2 -translate-y-1/2 z-40 w-9 sm:w-10 h-14 sm:h-16 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-xl hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Cards Stage Container */}
          <div className="relative w-full max-w-[760px] lg:max-w-[800px] mx-auto min-h-[580px] sm:min-h-[520px]">
            {/* In-flow ghost card to set natural responsive container height */}
            <div className="opacity-0 pointer-events-none select-none invisible w-full rounded-2xl p-6 sm:p-7 border flex flex-col justify-between" aria-hidden="true">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-[#548235]/15 text-[#548235] flex items-center justify-center">
                      <Bus className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                      2023 • FIRST #01
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded-full">
                    HISTORIC MILESTONE
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold leading-snug">
                  First Dedicated Long-Term Municipal GCC Electric Bus Operations in MMR
                </h3>
                <p className="mt-1.5 text-xs font-semibold">
                  &ldquo;De-risking municipal electrification through asset ownership, depot charging, and performance-linked SLA delivery.&rdquo;
                </p>
                <p className="mt-3 text-xs leading-relaxed">
                  Transvolt was the pioneer private operator in the Mumbai Metropolitan Region to structure, fund, and operationalize long-term Gross Cost Contract (GCC) electric bus concessions for municipal corporations.
                </p>
                <div className="mt-5 p-3.5 rounded-xl border">
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-[10.5px] font-bold px-2 py-1 rounded">Transvolt Breakthrough</span>
                  </div>
                  <div className="text-xs">Transvolt took full ownership of the vehicle assets, depot charging equipment, and maintenance overheads.</div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="text-center"><span className="text-xs font-extrabold block">57+ E-Buses</span></div>
                  <div className="text-center"><span className="text-xs font-extrabold block">99.4% Delivery</span></div>
                  <div className="text-center"><span className="text-xs font-extrabold block">100% Zero</span></div>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2 border-t">
                  <span className="text-[9.5px] font-mono px-2 py-0.5 rounded">Gross Cost Contract</span>
                </div>
              </div>
            </div>

            {/* 6 Breakthrough Cards in 3D Stack */}
            {TRANSVOLT_FIRSTS.map((first, idx) => {
              const { style, offset, isCenter } = getCardTransform(idx);
              const mode = getCardMode(first.id);

              return (
                <div
                  key={first.id}
                  style={{
                    ...style,
                    transition: 'transform 650ms cubic-bezier(0.22, 1, 0.36, 1), opacity 650ms ease, box-shadow 650ms ease',
                  }}
                  className={`absolute top-0 left-1/2 w-full max-w-[760px] lg:max-w-[800px] h-full rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#0E1420] border flex flex-col justify-between group overflow-hidden ${
                    isCenter
                      ? 'border-[#548235]/40 dark:border-[#548235]/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_10px_30px_rgba(84,130,53,0.15)] ring-1 ring-[#548235]/25 cursor-default'
                      : 'border-gray-200/80 dark:border-white/10 shadow-xl cursor-pointer hover:opacity-90'
                  }`}
                >
                  {/* Click Catcher for Background Peeking Cards (Clicking Peeking Card Moves It to Center) */}
                  {!isCenter && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (offset < 0) goToPrev();
                        else goToNext();
                      }}
                      className="absolute inset-0 z-30 bg-slate-900/10 dark:bg-black/40 hover:bg-slate-900/5 dark:hover:bg-black/20 rounded-2xl transition-colors cursor-pointer"
                      title={offset < 0 ? 'Click to view previous breakthrough' : 'Click to view next breakthrough'}
                    />
                  )}

                  {/* Ambient Top Stroke */}
                  <div className={`absolute top-0 left-0 right-0 h-[2.5px] transition-colors ${isCenter ? 'bg-[#548235]' : 'bg-[#548235]/30'}`} />

                  <div>
                    {/* Card Header: Year, Seal & Category */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center">
                          {renderIcon(first.iconName, 'w-4 h-4')}
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                          {first.year} • FIRST #{first.number}
                        </span>
                      </div>

                      <span className="text-[9.5px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30">
                        {first.highlightBadge}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug group-hover:text-[#548235] dark:group-hover:text-[#76B84A] transition-colors">
                      {first.title}
                    </h3>

                    <p className="mt-1.5 text-xs text-[#548235] dark:text-[#76B84A] font-semibold">
                      &ldquo;{first.tagline}&rdquo;
                    </p>

                    <p className="mt-3 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                      {first.overview}
                    </p>

                    {/* Interactive Problem vs Transvolt Solution Toggle Tabs */}
                    <div className="mt-5 p-3.5 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06] relative z-20">
                      <div className="flex items-center gap-2 mb-2.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardMode(first.id, 'solution');
                          }}
                          className={`text-[10.5px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                            mode === 'solution'
                              ? 'bg-[#548235] text-white shadow-xs'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          Transvolt Breakthrough
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCardMode(first.id, 'problem');
                          }}
                          className={`text-[10.5px] font-bold px-2 py-1 rounded transition-colors cursor-pointer ${
                            mode === 'problem'
                              ? 'bg-rose-600 text-white shadow-xs'
                              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                          }`}
                        >
                          The Industry Problem Before
                        </button>
                      </div>

                      {mode === 'solution' ? (
                        <div className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-200">
                          <CheckCircle2 className="w-4 h-4 text-[#548235] shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{first.transvoltSolution}</span>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-300">
                          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{first.problemBefore}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Bottom Impact Metrics & Technical Badges */}
                  <div className="mt-6 pt-4 border-t border-gray-100 dark:border-white/[0.08] relative z-20">
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {first.impactMetrics.map((kpi, kIdx) => (
                        <div key={kIdx} className="text-center">
                          <span className="text-[10px] font-mono text-gray-400 block truncate">
                            {kpi.label}
                          </span>
                          <span className="text-xs font-extrabold text-[#548235] dark:text-[#76B84A] block truncate mt-0.5">
                            {kpi.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Technical Tag Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100 dark:border-white/[0.04]">
                      {first.technicalBadges.map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-gray-100 dark:bg-white/[0.06] text-gray-600 dark:text-gray-300"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Duration Progress Line at Bottom Stroke (Only on Center Active Open Tile) */}
                  {isCenter && (
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100 dark:bg-white/10 overflow-hidden z-30 rounded-b-2xl">
                      <div
                        style={{ width: `${cardProgress}%` }}
                        className="h-full bg-gradient-to-r from-[#4472C4] via-[#548235] to-[#76B84A] shadow-[0_0_8px_rgba(84,130,53,0.8)] transition-[width] duration-75 ease-linear"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floating Right Navigation Arrow Button */}
          <button
            onClick={goToNext}
            aria-label="Next Breakthrough"
            className="hidden sm:flex absolute right-0 lg:right-2 top-1/2 -translate-y-1/2 z-40 w-9 sm:w-10 h-14 sm:h-16 rounded-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border border-gray-300 dark:border-white/20 shadow-xl hover:bg-[#548235] hover:text-white hover:border-[#548235] text-gray-700 dark:text-gray-200 items-center justify-center transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Bottom Capsule Dot Stepper */}
        <div className="flex flex-col items-center justify-center mt-7 sm:mt-9 gap-3">
          {/* Capsule Controller Pill */}
          <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/95 dark:bg-[#0D1525]/95 border border-gray-200/80 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/40 backdrop-blur-xl select-none">
            {/* Left Step Arrow */}
            <button
              onClick={goToPrev}
              aria-label="Previous Breakthrough"
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#548235] dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#548235] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots (Active Expands to Capsule Pill) */}
            <div className="flex items-center gap-2 px-1">
              {TRANSVOLT_FIRSTS.map((item, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setCardProgress(0);
                    }}
                    aria-label={`Go to breakthrough #${item.number}`}
                    className={`transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-8 h-2.5 rounded-full bg-gradient-to-r from-[#4472C4] to-[#548235] shadow-[0_0_10px_rgba(84,130,53,0.45)]'
                        : 'w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-white/20 hover:bg-[#548235]/60 hover:scale-125'
                    }`}
                    title={`${item.year} - ${item.title}`}
                  />
                );
              })}
            </div>

            {/* Right Step Arrow */}
            <button
              onClick={goToNext}
              aria-label="Next Breakthrough"
              className="w-7 h-7 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#548235] dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#548235] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Active Counter & Milestone Indicator */}
          <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400 select-none">
            <span className="font-bold text-[#548235] dark:text-[#76B84A]">
              {TRANSVOLT_FIRSTS[activeIndex].year} • FIRST #{TRANSVOLT_FIRSTS[activeIndex].number}
            </span>
            <span className="text-gray-400 dark:text-gray-500">•</span>
            <span>{activeIndex + 1} of {TRANSVOLT_FIRSTS.length}</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "THE NEXT FIRST" INNOVATION R&D PIPELINE
          ========================================================================= */}
      <section id="next-firsts" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16 border-t border-gray-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            The Innovation Horizon
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Next First: Our R&D Pipeline
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Pioneering does not stop at what has been done. Here is a glimpse of the breakthrough technologies currently in our engineering testbeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {UPCOMING_FIRSTS_RADAR.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-gradient-to-b from-white via-white to-gray-50 dark:from-[#0E1420] dark:via-[#0B0F17] dark:to-black border border-gray-200 dark:border-white/10 shadow-sm relative overflow-hidden group hover:border-[#548235]/60 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#548235]/15 text-[#548235] dark:text-[#76B84A]">
                  {item.phase}
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  {item.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#548235] dark:group-hover:text-[#76B84A] transition-colors">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>

              <div className="mt-5 pt-3.5 border-t border-gray-100 dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-gray-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#548235] animate-pulse" />
                  <span>{item.readiness}</span>
                </span>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 group-hover:text-[#548235] transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: CALL TO ACTION BRIDGE
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#1c3811] via-[#0D1525] to-[#12233f] border border-[#548235]/40 text-white relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Constellation Network (Full Tile Height Top-to-Bottom, 100% on Right Edge to 0% at Center) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
            <ConstellationNetwork
              isDark={true}
              dense={true}
              electric={false}
              densityGradient="right-to-center"
              facetOpacity={0.0075}
              fullHeight={true}
              nodeCount={140}
              className="w-full h-full"
            />
          </div>

          {/* Ambient Cosmic Backlight Glow on Right */}
          <div className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 w-80 h-80 bg-[#4472c4]/20 rounded-full blur-[90px] -z-0" />

          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#76B84A] font-bold block mb-2">
              Pioneer Together
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Bring India’s First-Choice Commercial EV Partner to Your Concession
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              From high-capacity municipal electric bus concessions to industrial corridor decarbonization, Transvolt engineers zero-emission transport that works on day one.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 relative z-10 shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer border border-[#548235]"
            >
              <span>Initiate Concession Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('journey')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Explore Our Journey</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
