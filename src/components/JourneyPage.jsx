import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import { ConstellationNetwork } from './ConstellationNetwork';
import {
  JOURNEY_METADATA,
  JOURNEY_ERAS,
  ROADMAP_PILLARS,
} from '../data/journeyData';
import {
  Sparkles,
  Milestone,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Play,
  Pause,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe2,
  Briefcase,
  Layers,
} from 'lucide-react';

export default function JourneyPage({ onNavigate }) {
  const { isDark } = useTheme();

  // Active Era State & Auto-play Duration Timer
  const [activeEraIdx, setActiveEraIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const activeEra = useMemo(() => {
    return JOURNEY_ERAS[activeEraIdx] || JOURNEY_ERAS[0];
  }, [activeEraIdx]);

  // Auto-play 6-second duration timer per era
  useEffect(() => {
    if (!isPlaying) return;

    const stepMs = 50;
    const durationMs = 6000;
    const increment = (stepMs / durationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= 100) {
          setActiveEraIdx((current) => (current + 1) % JOURNEY_ERAS.length);
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSelectEra = (idx) => {
    setActiveEraIdx(idx);
    setProgress(0);
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
            src="/life/1.JPG"
            alt="Transvolt Journey Hero"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-75 select-none transition-opacity duration-1000"
          />
        </div>

        {/* Hero Content: Anchored to Top Center */}
        <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full pt-20 sm:pt-24 pb-2 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-[#548235]/60 text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md shadow-xl">
              <Milestone className="w-3.5 h-3.5 text-[#548235]" />
              <span>{JOURNEY_METADATA.badge}</span>
            </div>

            {/* Headline: Less Bold & Single Line */}
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              <span>From First Volt</span>{' '}
              <span className="text-[#548235] text-transparent bg-clip-text bg-gradient-to-r from-[#548235] via-[#66b338] to-[#22c55e]">
                to Nationwide Clean Corridors.
              </span>
            </h1>

            {/* Supporting Text Directly Below Headline */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-100 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-3xl text-center">
              {JOURNEY_METADATA.subtitle}
            </p>

            {/* Hero Quick Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-5">
              <a
                href="#chronology"
                className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer border border-[#548235]/80"
              >
                <span>Explore Chronology</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#strategic-roadmap"
                className="px-5 py-2.5 rounded-xl border border-white/30 bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-xl hover:border-white/50"
              >
                <TrendingUp className="w-4 h-4" />
                <span>Mission 2027 Roadmap</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 4 Impact Metric Tiles (Expo Glass Effect: 12px curve, specular glare, frosted glass fill) */}
        <div className="relative z-10 w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-10 pr-16 sm:pr-24 lg:pr-28 pb-4 sm:pb-6">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {JOURNEY_METADATA.stats.map((stat, idx) => (
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
          SECTION 1: INTERACTIVE CHRONOLOGY STAGE (TIMELINE SCRUBBER + ERA DECK)
          ========================================================================= */}
      <section id="chronology" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            Evolutionary Milestones
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Timeline of Transformation
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Click any era or let the auto-playback take you through Transvolt’s pioneering milestones.
          </p>
        </div>

        {/* =========================================================================
            CONNECTED TIMELINE SCRUBBER (Top Year Capsules -> Connected Dots -> Tiles)
            ========================================================================= */}
        <div className="mb-8 w-full">
          <div className="relative rounded-2xl bg-white/80 dark:bg-[#0B0F17]/90 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-4 sm:p-5 shadow-sm overflow-x-auto no-scrollbar">
            
            {/* Top Bar: Title ("Milestone Timeline") & Play / Pause Controller */}
            <div className="flex items-center justify-between mb-4 pb-2.5 border-b border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#548235] animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-gray-700 dark:text-gray-300">
                  Milestone Timeline
                </span>
              </div>
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 text-xs font-semibold transition-all cursor-pointer"
                title={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
                aria-label={isPlaying ? 'Pause Auto-Play' : 'Resume Auto-Play'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-mono">Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span className="text-[11px] font-mono">Auto-Play</span>
                  </>
                )}
              </button>
            </div>

            {/* Timeline Schematic Grid with Static Height (Zero Layout Shifts) */}
            <div className="relative min-w-[760px] pt-1">
              
              {/* Continuous Horizontal Connector Line (Strictly BEHIND Year Capsules at z-0) */}
              <div className="absolute top-[14px] left-[8.33%] right-[8.33%] h-[2.5px] bg-gray-200 dark:bg-white/10 z-0 pointer-events-none">
                {/* Completed Green Track Line up to active stage */}
                <div
                  className="h-full bg-gradient-to-r from-[#548235] to-[#76B84A] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(84,130,53,0.7)]"
                  style={{
                    width: `${(activeEraIdx / (JOURNEY_ERAS.length - 1)) * 100}%`
                  }}
                />
              </div>

              {/* Grid of Columns: (1) Top Capsule with Year, (2) Connected Dots & Stem, (3) Static-Height Morphing Tile */}
              <div className="grid grid-cols-6 gap-3 relative z-10">
                {JOURNEY_ERAS.map((era, idx) => {
                  const isSelected = idx === activeEraIdx;
                  const isCompleted = idx < activeEraIdx;

                  return (
                    <div
                      key={era.year}
                      onClick={() => handleSelectEra(idx)}
                      className="group flex flex-col items-center cursor-pointer select-none"
                    >
                      {/* 1. TOP CAPSULE-TYPE DOT (Solid Opaque Fill at z-20 so Line is Strictly BEHIND) */}
                      <div
                        className={`relative z-20 px-3 py-0.5 rounded-full text-xs font-mono font-black transition-all duration-300 flex items-center justify-center shadow-xs ${
                          isSelected
                            ? 'bg-[#548235] text-white shadow-lg shadow-[#548235]/40 border border-[#76B84A] scale-110 ring-4 ring-[#548235]/25'
                            : isCompleted
                            ? 'bg-[#eef5e7] dark:bg-[#132219] text-[#548235] dark:text-[#76B84A] border border-[#548235] hover:border-[#76B84A]'
                            : 'bg-white dark:bg-[#121A28] text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-white/20 group-hover:border-[#548235]/70 group-hover:text-gray-900 dark:group-hover:text-white'
                        }`}
                      >
                        <span>{era.year}</span>
                      </div>

                      {/* 2. CONNECTED DOTS & VERTICAL STEM (Green when Completed or Active) */}
                      <div className="flex flex-col items-center my-1.5 z-10">
                        <div
                          className={`w-[2px] h-3 transition-colors duration-300 ${
                            isSelected
                              ? 'bg-[#548235] shadow-[0_0_6px_#548235]'
                              : isCompleted
                              ? 'bg-[#548235]'
                              : 'bg-gray-200 dark:bg-white/15 group-hover:bg-[#548235]/50'
                          }`}
                        />
                        <div
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            isSelected
                              ? 'bg-[#76B84A] ring-2 ring-[#548235] scale-125'
                              : isCompleted
                              ? 'bg-[#548235] ring-2 ring-[#548235]/40'
                              : 'bg-gray-300 dark:bg-white/20 group-hover:bg-[#548235]'
                          }`}
                        />
                        <div
                          className={`w-[2px] h-2 transition-colors duration-300 ${
                            isSelected
                              ? 'bg-[#548235]'
                              : isCompleted
                              ? 'bg-[#548235]'
                              : 'bg-gray-200 dark:bg-white/15 group-hover:bg-[#548235]/50'
                          }`}
                        />
                      </div>

                      {/* 3. TILE BELOW (Reduced Height for Inactive: 52px, Active: 84px with Inside Duration Line) */}
                      <div className="w-full h-[88px] flex flex-col justify-start">
                        <div
                          className={`relative overflow-hidden rounded-xl border transition-all duration-500 ease-out flex flex-col justify-between w-full select-none ${
                            isSelected
                              ? 'h-[84px] p-3 bg-gradient-to-br from-[#548235] to-[#456c2b] text-white shadow-xl shadow-[#548235]/30 border-[#76B84A]/70 scale-[1.01]'
                              : isCompleted
                              ? 'h-[52px] p-2 bg-[#548235]/[0.07] hover:bg-[#548235]/[0.13] dark:bg-[#548235]/[0.10] dark:hover:bg-[#548235]/[0.18] border-[#548235]/35 dark:border-[#548235]/50 hover:border-[#548235]/70 hover:-translate-y-0.5'
                              : 'h-[52px] p-2 bg-gray-50/80 dark:bg-white/[0.04] hover:bg-gray-100 dark:hover:bg-white/[0.08] border-gray-200/80 dark:border-white/10 hover:border-[#548235]/50 hover:-translate-y-0.5'
                          }`}
                        >
                          {/* Specular Glare (Fades in when active) */}
                          <div className={`expo-glass-glare transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />

                          {/* Top Info Row (Phase & Year) - Only shown on Active Tile */}
                          <div
                            className={`transition-all duration-500 ease-out overflow-hidden flex items-center justify-between gap-1 shrink-0 ${
                              isSelected
                                ? 'max-h-6 opacity-100 mb-1 translate-y-0'
                                : 'max-h-0 opacity-0 mb-0 -translate-y-2 pointer-events-none'
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/90 bg-black/25 px-2 py-0.5 rounded-md shrink-0">
                              {era.phase}
                            </span>
                            <span className="text-xs font-mono font-black text-[#85e14d] drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] shrink-0">
                              {era.year}
                            </span>
                          </div>

                          {/* Topic Title - Inactive tile displays ONLY this topic title */}
                          <div
                            className={`text-xs font-bold leading-snug line-clamp-2 transition-all duration-500 flex-1 flex items-center ${
                              isSelected
                                ? 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] text-left justify-start'
                                : isCompleted
                                ? 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white text-center justify-center'
                                : 'text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white text-center justify-center'
                            }`}
                          >
                            {era.theme}
                          </div>

                          {/* Duration Progress Indicator on Active Tile Bottom Edge */}
                          {isSelected && (
                            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-black/35 overflow-hidden rounded-b-xl">
                              <div
                                className="h-full bg-gradient-to-r from-[#85e14d] to-[#76B84A] shadow-[0_0_8px_#85e14d]"
                                style={{
                                  width: `${progress}%`,
                                  transition: isPlaying ? 'width 50ms linear' : 'none'
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Active Era Spotlight Stage: Left Story Narrative + Right Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Era Deep-Dive Narrative (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0E1420] border border-gray-200 dark:border-white/10 shadow-lg relative overflow-hidden">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#548235]/15 text-[#548235] dark:text-[#76B84A]">
                    {activeEra.phase} • {activeEra.year}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                    {activeEra.category}
                  </span>
                </div>

                <span className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Era {activeEraIdx + 1} of {JOURNEY_ERAS.length}</span>
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 dark:text-white leading-snug">
                {activeEra.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm font-semibold text-[#548235] dark:text-[#76B84A]">
                &ldquo;{activeEra.tagline}&rdquo;
              </p>

              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                {activeEra.summary}
              </p>

              {/* Milestone Checklist */}
              <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold mb-3">
                  Historic Milestones Delivered:
                </h4>
                <div className="space-y-2.5">
                  {activeEra.keyMilestones.map((milestone, mIdx) => (
                    <div key={mIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                      <CheckCircle2 className="w-4 h-4 text-[#548235] dark:text-[#76B84A] mt-0.5 shrink-0" />
                      <span>{milestone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom KPI Highlights Strip */}
            <div className="mt-8 pt-5 border-t border-gray-200 dark:border-white/10 grid grid-cols-3 gap-3">
              {activeEra.impactKPIs.map((kpi, kIdx) => (
                <div key={kIdx} className="p-3 rounded-xl bg-gray-50 dark:bg-white/[0.04] border border-gray-100 dark:border-white/[0.06]">
                  <span className="text-[10.5px] font-mono text-gray-500 dark:text-gray-400 block truncate">
                    {kpi.label}
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-[#548235] dark:text-[#76B84A] mt-0.5 block truncate">
                    {kpi.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Showcase & Operational Focus (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-lg h-[320px] sm:h-[380px] bg-black">
              <img
                src={activeEra.image}
                alt={activeEra.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#76B84A] font-bold block mb-1">
                  Operational Snapshot • {activeEra.year}
                </span>
                <p className="text-xs sm:text-sm font-semibold line-clamp-2 drop-shadow-md">
                  {activeEra.theme}
                </p>
              </div>
            </div>

            {/* Quick Navigation Controls */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-[#0B0F17] border border-gray-200 dark:border-white/10 shadow-sm">
              <button
                onClick={() => handleSelectEra((activeEraIdx - 1 + JOURNEY_ERAS.length) % JOURNEY_ERAS.length)}
                className="px-3.5 py-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>&larr;</span>
                <span>Previous Era</span>
              </button>

              <span className="text-xs font-mono font-bold text-gray-500">
                {activeEraIdx + 1} / {JOURNEY_ERAS.length}
              </span>

              <button
                onClick={() => handleSelectEra((activeEraIdx + 1) % JOURNEY_ERAS.length)}
                className="px-3.5 py-2 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Era</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MISSION 2027 STRATEGIC ROADMAP (THE NEXT HORIZON)
          ========================================================================= */}
      <section id="strategic-roadmap" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16 border-t border-gray-200 dark:border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            Mission 2027
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Pillars of Our Future Horizon
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Scaling from 57+ to 1,500+ commercial zero-emission vehicles with integrated renewable microgrid charging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ROADMAP_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#0B0F17] border border-gray-200 dark:border-white/10 shadow-sm hover:border-[#548235]/60 dark:hover:border-[#548235]/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#548235]/15 text-[#548235] dark:text-[#76B84A]">
                    {pillar.tag}
                  </span>
                  <span className="text-xs font-mono font-bold text-gray-400">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#548235] dark:group-hover:text-[#76B84A] transition-colors">
                  {pillar.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-extrabold text-[#548235] dark:text-[#76B84A]">
                  {pillar.stat}
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
              Join The Mission
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Ready to Accelerate Your Fleet’s Decarbonization Journey?
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
              Whether you represent a municipal transport corporation or a corporate freight fleet, Transvolt delivers zero upfront capex electrification backed by guaranteed uptime SLAs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 relative z-10 shrink-0">
            <button
              onClick={() => onNavigate && onNavigate('contact')}
              className="px-6 py-3 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer border border-[#548235]"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate && onNavigate('work')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer border border-white/20"
            >
              <Briefcase className="w-4 h-4" />
              <span>Explore Open Roles</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
