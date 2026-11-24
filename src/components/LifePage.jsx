import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  LIFE_METADATA,
  CULTURE_PILLARS,
  DAY_IN_LIFE_TRACKS,
  PERKS_BENEFITS,
  CULTURE_GALLERY,
} from '../data/lifeData';
import {
  Sparkles,
  ArrowRight,
  Leaf,
  Zap,
  ShieldCheck,
  Heart,
  Bus,
  GraduationCap,
  Clock,
  Award,
  Users,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Maximize2,
  X,
  Briefcase,
  Play,
  Pause,
  Quote,
} from 'lucide-react';

export const LifePage = ({ onNavigate }) => {
  const { isDark } = useTheme();

  // Active States
  const [activePillarId, setActivePillarId] = useState(CULTURE_PILLARS[0].id);
  const [activeTrackId, setActiveTrackId] = useState(DAY_IN_LIFE_TRACKS[0].id);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [activeLightboxImg, setActiveLightboxImg] = useState(null);

  // Culture Pillars 5s Duration Timer State
  const [isPillarsPlaying, setIsPillarsPlaying] = useState(true);
  const [pillarProgress, setPillarProgress] = useState(0);

  // Auto-advance Culture Pillars every 5 seconds with live progress
  useEffect(() => {
    if (!isPillarsPlaying) return;

    const stepMs = 50;
    const durationMs = 5000;
    const increment = (stepMs / durationMs) * 100;

    const timer = setInterval(() => {
      setPillarProgress((prev) => {
        if (prev + increment >= 100) {
          setActivePillarId((currentId) => {
            const currentIdx = CULTURE_PILLARS.findIndex((p) => p.id === currentId);
            const nextIdx = (currentIdx + 1) % CULTURE_PILLARS.length;
            return CULTURE_PILLARS[nextIdx].id;
          });
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPillarsPlaying]);

  const handleSelectPillar = (id) => {
    setActivePillarId(id);
    setPillarProgress(0);
  };

  // 1920x1080 Hero Slideshow Images in Ordered Numbering
  const HERO_SLIDES = useMemo(
    () => [
      '/life/1.JPG',
      '/life/2.JPG',
      '/life/2.1.JPG',
      '/life/3.jpeg',
      '/life/4.jpeg',
      '/life/5.JPG',
      '/life/6.JPG',
      '/life/7.JPG',
      '/life/8.jpg',
      '/life/9.jpg',
    ],
    []
  );

  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [isSlideshowPlaying, setIsSlideshowPlaying] = useState(true);

  // Auto-play slideshow timer (every 4.5 seconds)
  useEffect(() => {
    if (!isSlideshowPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isSlideshowPlaying, HERO_SLIDES.length]);

  const handlePrevSlide = () => {
    setCurrentSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNextSlide = () => {
    setCurrentSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  // Gallery categories
  const galleryCategories = useMemo(() => {
    const cats = ['All'];
    CULTURE_GALLERY.forEach((item) => {
      if (!cats.includes(item.category)) cats.push(item.category);
    });
    return cats;
  }, []);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === 'All') return CULTURE_GALLERY;
    return CULTURE_GALLERY.filter((item) => item.category === galleryFilter);
  }, [galleryFilter]);

  const activeTrack = useMemo(() => {
    return DAY_IN_LIFE_TRACKS.find((t) => t.id === activeTrackId) || DAY_IN_LIFE_TRACKS[0];
  }, [activeTrackId]);

  const activePillar = useMemo(() => {
    return CULTURE_PILLARS.find((p) => p.id === activePillarId) || CULTURE_PILLARS[0];
  }, [activePillarId]);

  // Helper to render icon by name
  const renderIcon = (name, className = 'w-5 h-5') => {
    switch (name) {
      case 'Leaf':
        return <Leaf className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'ShieldCheck':
        return <ShieldCheck className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Bus':
        return <Bus className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Clock':
        return <Clock className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-black text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
      {/* =========================================================================
          HERO SECTION - 1920x1080 SLIDESHOW (100% BLACK BG, 75% IMAGE, NO VIGNETTE)
          ========================================================================= */}
      <section className="relative w-full h-screen min-h-[640px] max-h-[1080px] max-w-[1920px] mx-auto bg-black overflow-hidden select-none border-b border-white/[0.08] flex flex-col justify-between">
        {/* Slideshow Layer: 100% Pure Black BG, 75% Opacity Images, No Vignette */}
        <div className="absolute inset-0 w-full h-full bg-black overflow-hidden pointer-events-none">
          {HERO_SLIDES.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Life at Transvolt slide ${idx + 1}`}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out select-none ${
                currentSlideIdx === idx ? 'opacity-75' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        {/* Hero Content Directly Over the 75% Images - Anchored Top Center */}
        <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full pt-20 sm:pt-24 pb-2 flex flex-col items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center">
            {/* Category Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/75 border border-[#548235]/60 text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-2.5 backdrop-blur-md shadow-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#548235]" />
              <span>{LIFE_METADATA.badge}</span>
            </div>

            {/* Headline: Clean White */}
            <h1 className="text-2xl sm:text-4xl lg:text-[44px] xl:text-5xl font-bold tracking-tight leading-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
              Powering Purpose. Driving Tomorrow.
            </h1>

            {/* Supporting Text Directly Below Headline */}
            <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-100 font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-3xl text-center">
              {LIFE_METADATA.subtitle}
            </p>

            {/* Hero Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4 sm:mt-5">
              <a
                href="#culture-pillars"
                className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-xl hover:shadow-2xl flex items-center gap-2 cursor-pointer border border-[#548235]/80"
              >
                <span>Our Culture Pillars</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => onNavigate && onNavigate('work')}
                className="px-5 py-2.5 rounded-xl border border-white/30 bg-black/60 hover:bg-black/80 text-white text-xs sm:text-sm font-semibold transition-all backdrop-blur-md flex items-center gap-2 cursor-pointer shadow-xl hover:border-white/50"
              >
                <Briefcase className="w-4 h-4" />
                <span>View Open Positions</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: 2 Metric Tiles Left | Centered Slideshow Controls | 2 Metric Tiles Right */}
        <div className="relative z-10 w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-10 pr-16 sm:pr-24 lg:pr-28 pb-4 sm:pb-6">
          <div className="flex flex-wrap xl:flex-nowrap items-center justify-center gap-2.5 sm:gap-3 lg:gap-3.5">
            {/* 2 Tiles Left of Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {LIFE_METADATA.stats.slice(0, 2).map((stat, idx) => (
                <div
                  key={idx}
                  className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-[10px] bg-[#548235]/10 hover:bg-[#548235]/15 backdrop-blur-sm border border-[#548235]/70 hover:border-[#548235] shadow-2xl flex items-center gap-2.5 sm:gap-3 transition-all hover:-translate-y-0.5"
                >
                  <span className="text-base sm:text-lg font-extrabold text-[#76B84A] tracking-tight shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {stat.value}
                  </span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] sm:text-xs font-bold text-white leading-tight truncate">
                      {stat.label}
                    </span>
                    <span className="text-[9.5px] sm:text-[10px] text-gray-300 font-medium truncate mt-0.5">
                      {stat.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Centered Controls Island: 10% Blue Fill & Low Blur */}
            <div className="inline-flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#4472C4]/10 hover:bg-[#4472C4]/15 backdrop-blur-sm border border-[#4472C4]/35 shadow-2xl shrink-0 transition-colors">
              {/* Left: Pill Indicators for all 10 numbered slides */}
              <div className="flex items-center gap-1.5 py-0.5">
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlideIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentSlideIdx === idx
                        ? 'w-6 sm:w-8 bg-[#548235] shadow-[0_0_8px_rgba(84,130,53,0.9)]'
                        : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Go to Slide ${idx + 1}`}
                    aria-label={`Go to Slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Subtle Divider */}
              <div className="w-[1px] h-4 bg-white/20" />

              {/* Right: Buttons with blur fill & Counter */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsSlideshowPlaying((prev) => !prev)}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  title={isSlideshowPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                  aria-label={isSlideshowPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                >
                  {isSlideshowPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                </button>

                <button
                  onClick={handlePrevSlide}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  title="Previous Slide"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleNextSlide}
                  className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/15 transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                  title="Next Slide"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <span className="text-xs font-mono font-bold text-white/90 pl-1">
                  {String(currentSlideIdx + 1).padStart(2, '0')}{' '}
                  <span className="text-white/40">/ {String(HERO_SLIDES.length).padStart(2, '0')}</span>
                </span>
              </div>
            </div>

            {/* 2 Tiles Right of Controls */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {LIFE_METADATA.stats.slice(2, 4).map((stat, idx) => (
                <div
                  key={idx}
                  className="py-2 sm:py-2.5 px-4 sm:px-5 rounded-[10px] bg-[#548235]/10 hover:bg-[#548235]/15 backdrop-blur-sm border border-[#548235]/70 hover:border-[#548235] shadow-2xl flex items-center gap-2.5 sm:gap-3 transition-all hover:-translate-y-0.5"
                >
                  <span className="text-base sm:text-lg font-extrabold text-[#76B84A] tracking-tight shrink-0 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                    {stat.value}
                  </span>
                  <div className="flex flex-col min-w-0">
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
        </div>
      </section>

      {/* =========================================================================
          SECTION 1: CULTURE PILLARS (INTERACTIVE HIGHLIGHT TABS)
          ========================================================================= */}
      <section id="culture-pillars" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            Core Values
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            The Principles We Live By
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            Every route scheduled, bus charged, and telemetry packet logged is guided by four foundational beliefs.
          </p>
        </div>

        {/* 4 Pillars Interactive Layout - Vertically Centered Grid with 5s Duration Logic */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: 4 Pillar Selection Cards - Hexagon Shape & Vertically Centered */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-3.5">
            {CULTURE_PILLARS.map((pillar) => {
              const isActive = pillar.id === activePillarId;

              return (
                <div
                  key={pillar.id}
                  onClick={() => handleSelectPillar(pillar.id)}
                  className={`relative transition-all duration-300 cursor-pointer p-[1.5px] ${
                    isActive
                      ? 'bg-gradient-to-r from-[#76B84A] to-[#548235] shadow-lg shadow-[#548235]/25 scale-[1.01]'
                      : isDark
                      ? 'bg-white/15 hover:bg-[#548235]/60'
                      : 'bg-gray-200 hover:bg-[#548235]/50'
                  }`}
                  style={{
                    clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%)',
                  }}
                >
                  <button
                    type="button"
                    className={`w-full h-full pl-6 pr-5 py-4 sm:py-4.5 text-left transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 ${
                      isActive
                        ? 'bg-[#548235] text-white'
                        : isDark
                        ? 'bg-[#0B0F17] text-gray-300 hover:bg-white/[0.04]'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    style={{
                      clipPath: 'polygon(20px 0%, calc(100% - 20px) 0%, 100% 50%, calc(100% - 20px) 100%, 20px 100%, 0% 50%)',
                    }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-10 h-10 flex items-center justify-center shrink-0 transition-transform ${
                          isActive
                            ? 'bg-white/20 text-white scale-110'
                            : isDark
                            ? 'bg-white/[0.06] text-[#76B84A]'
                            : 'bg-[#548235]/10 text-[#548235]'
                        }`}
                        style={{
                          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                        }}
                      >
                        {renderIcon(pillar.iconName, 'w-5 h-5')}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold ${isActive ? 'text-white/80' : 'text-gray-400'}`}>
                            {pillar.number}
                          </span>
                          <span
                            className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded ${
                              isActive
                                ? 'bg-black/20 text-white'
                                : isDark
                                ? 'bg-white/10 text-gray-300'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {pillar.badge}
                          </span>
                        </div>
                        <h3 className={`text-sm sm:text-base font-bold truncate mt-0.5 ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'translate-x-1 text-white' : 'text-gray-400'}`} />
                  </button>

                  {/* Active Hexagon 5s Duration Progress Indicator */}
                  {isActive && (
                    <div className="absolute bottom-0 left-[20px] right-[20px] h-[2.5px] bg-black/25 overflow-hidden z-20 pointer-events-none rounded-full">
                      <div
                        className="h-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] transition-[width] duration-75 ease-linear"
                        style={{ width: `${pillarProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Pillar Spotlight Details Card */}
          <div className="lg:col-span-7">
            <div
              className={`h-full rounded-2xl border p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${
                isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-md'
              }`}
            >
              {/* Duration Progress Line on Top Stroke of Big Tile */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-black/10 dark:bg-white/10 overflow-hidden z-20">
                <div
                  className="h-full bg-gradient-to-r from-[#548235] via-[#76B84A] to-[#22c55e] shadow-[0_0_8px_rgba(118,184,74,0.8)] transition-[width] duration-75 ease-linear"
                  style={{ width: `${pillarProgress}%` }}
                />
              </div>

              {/* Background ambient watermark icon */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 opacity-[0.04] dark:opacity-[0.06] pointer-events-none">
                {renderIcon(activePillar.iconName, 'w-full h-full')}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#548235] dark:text-[#76B84A]">
                    Pillar {activePillar.number} • {activePillar.badge}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPillarsPlaying((prev) => !prev)}
                      className="p-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                      title={isPillarsPlaying ? 'Pause 5s Duration' : 'Resume 5s Duration'}
                      aria-label={isPillarsPlaying ? 'Pause 5s Duration' : 'Resume 5s Duration'}
                    >
                      {isPillarsPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>
                    <div className="w-9 h-9 rounded-xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center">
                      {renderIcon(activePillar.iconName, 'w-5 h-5')}
                    </div>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {activePillar.title}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-[#548235] dark:text-[#76B84A] mt-1">
                  &ldquo;{activePillar.tagline}&rdquo;
                </p>

                <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 mt-4">
                  {activePillar.description}
                </p>

                {/* Highlights List */}
                <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10">
                  <span className="text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-gray-400 font-bold block mb-3">
                    What This Looks Like Day-to-Day:
                  </span>
                  <div className="space-y-2.5">
                    {activePillar.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#548235] dark:text-[#76B84A] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-white/10 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Transvolt Mobility Culture Operating Charter</span>
                <button
                  onClick={() => onNavigate && onNavigate('work')}
                  className="text-xs text-[#548235] dark:text-[#76B84A] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Join this mission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: A DAY IN THE LIFE (TIMELINE & VOICES ACROSS TRACKS)
          ========================================================================= */}
      <section className={`border-y py-12 sm:py-16 ${isDark ? 'bg-[#080C14] border-white/[0.08]' : 'bg-slate-100/70 border-gray-200'}`}>
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
              Behind the Scenes
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              A Day in the Life at Transvolt
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
              From depot charging yards to software telematics NOCs, explore how our multidisciplinary teams power the EV shift.
            </p>
          </div>

          {/* Track Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {DAY_IN_LIFE_TRACKS.map((track) => {
              const isActive = track.id === activeTrackId;

              return (
                <button
                  key={track.id}
                  onClick={() => setActiveTrackId(track.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#548235] text-white shadow-md'
                      : isDark
                      ? 'bg-white/[0.05] hover:bg-white/10 text-gray-300 border border-white/10'
                      : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-xs'
                  }`}
                >
                  {track.role}
                </button>
              );
            })}
          </div>

          {/* Active Track Container */}
          <div
            className={`rounded-2xl border p-6 sm:p-8 lg:p-10 ${
              isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-lg'
            }`}
          >
            {/* Quote & Person Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center shrink-0 mt-1">
                  <Quote className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm sm:text-base lg:text-[17px] font-medium italic text-gray-800 dark:text-gray-200 max-w-3xl leading-relaxed">
                    &ldquo;{activeTrack.quote}&rdquo;
                  </p>
                  <div className="mt-2.5 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white font-semibold">{activeTrack.person}</strong>
                    <span>•</span>
                    <span>{activeTrack.personTitle}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/[0.06] border border-gray-200 dark:border-white/10 text-xs text-gray-600 dark:text-gray-300 shrink-0 self-start lg:self-auto">
                <MapPin className="w-3.5 h-3.5 text-[#548235]" />
                <span>{activeTrack.location}</span>
              </div>
            </div>

            {/* Daily Operational Timeline */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
              {activeTrack.timeline.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-xl border relative transition-all duration-300 hover:-translate-y-1 ${
                    isDark ? 'bg-white/[0.03] border-white/10' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30">
                      {step.time}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">Step 0{idx + 1}</span>
                  </div>

                  <h4 className="text-sm font-bold text-gray-900 dark:text-white">{step.title}</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BENTO GRID OF PERKS & COMPREHENSIVE WELL-BEING
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1.5">
            Total Rewards
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            How We Support Our People
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-2">
            A sustainable future begins with taking care of our team members and their families.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PERKS_BENEFITS.map((perk, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 ${
                isDark
                  ? 'bg-[#0B0F17] border-white/10 hover:border-[#548235]/50 hover:shadow-[0_8px_30px_rgba(84,130,53,0.12)]'
                  : 'bg-white border-gray-200 hover:border-[#548235]/40 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] flex items-center justify-center group-hover:scale-110 transition-transform">
                  {renderIcon(perk.iconName, 'w-5 h-5')}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-black/5 dark:bg-white/[0.06] text-gray-500 dark:text-gray-400">
                  {perk.category}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#548235] dark:group-hover:text-[#76B84A] transition-colors">
                {perk.title}
              </h3>
              <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CULTURE PHOTO GALLERY & MOMENTS MOSAIC
          ========================================================================= */}
      <section className={`border-t py-12 sm:py-16 ${isDark ? 'bg-[#080C14] border-white/[0.08]' : 'bg-slate-100/60 border-gray-200'}`}>
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#548235] dark:text-[#76B84A] font-bold block mb-1">
                Visual Energy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Life on the Ground & In the Hubs
              </h2>
            </div>

            {/* Gallery Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setGalleryFilter(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    galleryFilter === cat
                      ? 'bg-[#548235] text-white shadow-sm'
                      : isDark
                      ? 'bg-white/[0.06] hover:bg-white/[0.12] text-gray-300'
                      : 'bg-white hover:bg-gray-200 text-gray-700 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Mosaic Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxImg(item)}
                className={`group relative rounded-2xl overflow-hidden border cursor-pointer aspect-[16/10] sm:aspect-[4/3] transition-all duration-300 ${
                  isDark ? 'border-white/10 bg-[#0B0F17]' : 'border-gray-200 bg-white'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Card Meta Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 flex flex-col justify-end text-white z-10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-[#548235]/40 text-[#84cc16] border border-[#548235]/50">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-medium text-gray-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#76B84A]" />
                      {item.location}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-[#76B84A] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                {/* Lightbox hint icon */}
                <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-black/60 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: CAREER CONVERSION CALL-TO-ACTION BANNER
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-14 sm:py-20">
        <div
          className={`rounded-3xl border p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center max-w-4xl mx-auto shadow-2xl ${
            isDark
              ? 'bg-gradient-to-b from-[#0E1524] to-[#070B13] border-white/15'
              : 'bg-gradient-to-b from-white to-emerald-50/40 border-gray-200'
          }`}
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#548235]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] text-xs font-bold uppercase tracking-wider mb-4 border border-[#548235]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Shape What Matters</span>
            </div>

            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Ready to Accelerate the Clean Mobility Revolution?
            </h3>

            <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
              Whether you are an electrical systems technician, cloud IoT architect, or public transit strategist, your next big career chapter starts here.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
              <button
                onClick={() => onNavigate && onNavigate('work')}
                className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4" />
                <span>Explore Open Opportunities</span>
              </button>

              <button
                onClick={() => onNavigate && onNavigate('contact')}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-white/[0.06] hover:bg-white/[0.12] text-white border-white/20'
                    : 'bg-white hover:bg-gray-100 text-gray-900 border-gray-300'
                }`}
              >
                <span>Connect With Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          LIGHTBOX MODAL FOR GALLERY PHOTOS
          ========================================================================= */}
      {activeLightboxImg && (
        <div
          onClick={() => setActiveLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden bg-[#0B0F17] border border-white/20 shadow-2xl cursor-default"
          >
            <button
              onClick={() => setActiveLightboxImg(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-[16/10] max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activeLightboxImg.image}
                alt={activeLightboxImg.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 bg-[#0E1420] text-white border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#76B84A] font-bold block mb-1">
                  {activeLightboxImg.category} • {activeLightboxImg.location}
                </span>
                <h4 className="text-base font-bold">{activeLightboxImg.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{activeLightboxImg.caption}</p>
              </div>

              <button
                onClick={() => {
                  setActiveLightboxImg(null);
                  if (onNavigate) onNavigate('work');
                }}
                className="px-4 py-2 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shrink-0 cursor-pointer self-start sm:self-auto"
              >
                Work With Us
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
