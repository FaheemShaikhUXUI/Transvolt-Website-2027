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
const ProjectCardVideo = ({ src, isPlaying }) => {
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
      style={{ borderRadius: 'inherit' }}
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

export const HomePageV2 = ({ currentPage = 0, onNavigate }) => {
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
      icon: Sliders,
      description:
        'Revolutionizing transportation! We are teaming up with private schools, transportation unions, and government bodies to deploy large-scale ZERO EMISSION mobility solutions.',
    },
    {
      title: 'WE CARE',
      icon: Users,
      description:
        "Stepping into passengers' shoes to create top-notch solutions! Trust is our foundation - we're forging strong relationships with public transport authorities for a sustainable future.",
    },
    {
      title: 'WE COMMIT',
      icon: Heart,
      description:
        "Delivering on promises! At Transvolt, we're committed to safety, quality, and reliability for all our users, transport authorities, and the planet. Join the mobility revolution!",
    },
  ];

  // 6 News Items for Slide 2
  const newsList = [
    {
      num: '01',
      shortTitle: 'TATA CAPITAL FINANCING',
      title: 'Tata Capital partners with Transvolt to finance the deployment of 100+ electric trucks across India.',
      category: 'Financing',
      year: '2026',
    },
    {
      num: '02',
      shortTitle: 'GREEN BOND FACILITY',
      title: 'Transvolt secures Green Bond financing from Alternates by Axis AMC for 150+ electric trucks.',
      category: 'Green Bonds',
      year: '2026',
    },
    {
      num: '03',
      shortTitle: 'NAGPUR E-BUS FLEET',
      title: 'Transvolt has commenced e-buses for Nagpur Municipal Corporation.',
      category: 'Operations',
      year: '2026',
    },
    {
      num: '04',
      shortTitle: 'PORT LOGISTICS EXPANSION',
      title: 'Transvolt Mobility Enters Port Logistics with 66 Electric Heavy Trucks',
      category: 'Port Logistics',
      year: '2026',
    },
    {
      num: '05',
      shortTitle: 'IMPACT REPORT 2026',
      title: 'Transvolt Mobility Releases Impact Report 2026',
      category: 'ESG Report',
      year: '2026',
    },
    {
      num: '06',
      shortTitle: 'FINNFUND EQUITY ROUND',
      title: 'Finnfund Announces Equity Investment in Transvolt Mobility',
      category: 'Equity Round',
      year: '2026',
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
            className="w-full h-full object-cover select-none"
            style={{
              maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.45) 100%)',
              WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.10) 0%, rgba(0, 0, 0, 0.45) 100%)',
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
                className="text-[26px] sm:text-[34px] lg:text-[38px] xl:text-[44px] font-bold tracking-tight text-white pb-0.5 leading-[1.12]"
              >
                Empowering to move
                <br />
                <span className="whitespace-nowrap">in a Clean, Green and Quiet</span>
                <br />
                Environment with Safety
              </h1>

              {/* Description Subtext - Crisp White */}
              <p className="text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed max-w-xl font-normal text-white/95">
                India's First OEM agnostic EV Platform for Heavy Commercial Vehicles -
                Electric Buses and Electric Trucks; Transvolt owns and operates the
                e-HCVs in B to G and B to B segments across India.
              </p>

              {/* Institutional Investors Content */}
              <div className="w-full text-white space-y-1 py-1">
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
                <div className="pt-1.5 flex items-center gap-6 sm:gap-8">
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
              <div className="pt-1.5 flex items-center gap-4">
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

              {/* Frameless Vertical Flip: 3 Latest News with identical smooth motion, 2.6s hold, +30% lower */}
              <div
                className="pt-[90px] sm:pt-[125px] md:pt-[156px] w-[840px] lg:w-[920px] max-w-none h-12 sm:h-14 relative overflow-hidden select-none"
                onMouseEnter={() => setIsNewsHovered(true)}
                onMouseLeave={() => setIsNewsHovered(false)}
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
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
                          ? 'translateY(-16px)'
                          : 'translateY(16px)',
                      opacity: newsAnimState === 'center' ? 1 : 0,
                      transition:
                        newsAnimState === 'enter'
                          ? 'none'
                          : 'transform 750ms cubic-bezier(0.16, 1, 0.3, 1), opacity 750ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    className="absolute inset-0 flex items-center gap-3 text-sm sm:text-[15.5px] text-white/95 cursor-pointer group/news transition-colors whitespace-nowrap"
                  >
                    {/* Bullet Dot: Electric impact on spark, molten yellow lava glow on touch unglowing over 2.4s */}
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

                    <span className="text-[12.5px] sm:text-[13px] font-mono font-bold tracking-wider text-emerald-400 uppercase shrink-0">
                      {latestNews[activeNewsIdx].category || 'NEWS'}
                    </span>
                    <span className="font-medium text-white/95 group-hover/news:text-white group-hover/news:underline underline-offset-4 decoration-emerald-400 whitespace-nowrap">
                      {latestNews[activeNewsIdx].title}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: 3 Standing Video Tiles with Constellation Network Effect Behind (Overall +30% larger) */}
            <div className="hidden md:flex flex-col items-end shrink-0 relative origin-right scale-[0.85] lg:scale-[0.92] xl:scale-100">
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
                {/* Sliding Track vertically centered starting with 48px (pl-12) left breathing room */}
                <div
                  className="flex items-center gap-5 pl-12"
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

          {/* SLIDE 1: WHO WE ARE (Full Paragraphs + 3 Redesigned Bento Pillars) */}
          <div
            className={`w-full h-full flex flex-col justify-center transition-all duration-500 ease-in-out ${
              currentPage === 1
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none hidden'
            }`}
          >
            {/* Who We Are Title & Paragraphs */}
            <div className="flex flex-col space-y-2 mb-4">
              <h2 className={`text-2xl sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight uppercase leading-none ${
                isDark
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-white'
                  : 'text-gray-900'
              }`}>
                WHO WE ARE
              </h2>
              <div className="space-y-2 max-w-4xl">
                <p className={`text-xs sm:text-[13.5px] lg:text-[14.5px] leading-relaxed font-normal ${
                  isDark ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  <strong className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Transvolt</strong> is more than a business; it's a commitment to combating climate change and improving air quality through zero-emission mobility solutions. We're dedicated to building a green platform that offers <span className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>ZEROEMISSION</span> services, in alignment with global efforts towards sustainable transportation.
                </p>
                <p className={`text-xs sm:text-[13.5px] lg:text-[14.5px] leading-relaxed font-normal ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  With a dedicated team and support from top infrastructure funds and financial institutions, we're leading the charge towards sustainable transportation in India and beyond!
                </p>
              </div>
            </div>

            {/* 3 Bento Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 pt-1 max-w-5xl">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 min-h-[220px] sm:min-h-[240px] ${
                      isDark
                        ? 'border-white/15 bg-[#0E131E]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:border-[#72B347]/60 hover:shadow-[0_8px_30px_rgba(114,179,71,0.25)]'
                        : 'border-gray-200/90 bg-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:border-[#548235]/60 hover:shadow-[0_10px_30px_rgba(84,130,53,0.18)]'
                    }`}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-[#548235]/15 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                          isDark
                            ? 'bg-[#548235]/20 text-[#72B347] border-[#548235]/40 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_14px_rgba(84,130,53,0.5)]'
                            : 'bg-emerald-50 text-[#548235] border-emerald-200 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_14px_rgba(84,130,53,0.3)]'
                        }`}>
                          <Icon className="w-5 h-5 stroke-[2.2]" />
                        </div>
                        <span className={`text-xs font-mono font-bold tracking-wider uppercase ${
                          isDark ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className={`text-base sm:text-lg font-extrabold tracking-wide uppercase mb-2 transition-colors ${
                        isDark
                          ? 'text-white group-hover:text-[#72B347]'
                          : 'text-gray-900 group-hover:text-[#548235]'
                      }`}>
                        {item.title}
                      </h3>
                      <p className={`text-xs sm:text-[12.5px] leading-relaxed font-normal ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                    <div className={`mt-4 pt-3 border-t flex items-center justify-between ${
                      isDark ? 'border-white/10' : 'border-gray-100'
                    }`}>
                      <span className={`text-xs font-bold transition-colors ${
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

          {/* SLIDE 2: OUR NEWS (6 News Tiles + Read More News button) */}
          <div
            className={`w-full h-full flex flex-col justify-center transition-all duration-500 ease-in-out ${
              currentPage === 2
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-8 pointer-events-none hidden'
            }`}
          >
            {/* Header & Sub-paragraph */}
            <div className="flex flex-col space-y-1.5 mb-3">
              <div className="flex items-center gap-3">
                <h2 className={`text-2xl sm:text-[30px] lg:text-[38px] font-extrabold tracking-tight uppercase leading-none pt-0.5 inline-block ${
                  isDark
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-300 to-white'
                    : 'text-gray-900'
                }`}>
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

            {/* 6 News Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 w-full pt-1">
              {newsList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate && onNavigate('news')}
                  className={`group relative flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 rounded-xl p-2.5 backdrop-blur-md ${
                    isDark
                      ? 'bg-[#0E131E]/70 border border-white/15 hover:border-[#72B347]/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                      : 'bg-white border border-gray-200/90 hover:border-[#548235]/60 shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(84,130,53,0.14)]'
                  }`}
                >
                  <div className={`relative w-full h-[120px] sm:h-[135px] rounded-lg border overflow-hidden ${
                    isDark ? 'border-white/15 bg-black/40' : 'border-gray-200/80 bg-gray-100'
                  }`}>
                    <img
                      src="/news-placeholder.jpg"
                      alt={item.title}
                      className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider backdrop-blur-md rounded border ${
                        isDark ? 'bg-black/75 text-white border-white/20' : 'bg-white/90 text-gray-800 border-gray-200 shadow-sm'
                      }`}>
                        {item.num}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2.5 px-0.5">
                    <div className="flex flex-col pr-2 min-w-0">
                      <h3 className={`text-[11px] sm:text-[12px] font-black tracking-wider uppercase transition-colors truncate ${
                        isDark ? 'text-white group-hover:text-[#72B347]' : 'text-gray-900 group-hover:text-[#548235]'
                      }`}>
                        {item.shortTitle}
                      </h3>
                      <span className={`text-[10px] font-medium mt-0.5 truncate ${
                        isDark ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {item.category} / {item.year}
                      </span>
                    </div>
                    <div className="shrink-0 flex items-center pl-1">
                      <BrandArrow className="h-3 w-auto group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Read More News CTA Button */}
            <div className="pt-3 flex justify-start">
              <button
                onClick={() => onNavigate && onNavigate('news')}
                className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border font-bold text-xs sm:text-[12.5px] tracking-wide group cursor-pointer transition-all duration-300 shadow-lg ${
                  isDark
                    ? 'border-white/20 bg-[#182335]/90 hover:bg-[#548235] hover:border-[#548235] text-white shadow-black/40'
                    : 'border-gray-300 bg-white hover:bg-[#548235] hover:border-[#548235] text-gray-800 hover:text-white shadow-gray-200'
                }`}
              >
                <span>Read More News</span>
                <BrandArrow
                  hoverWhite={true}
                  className="h-3 sm:h-3.5 w-auto group-hover:translate-x-1 transition-transform duration-150"
                />
              </button>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: 5 Tiles with Green Fill & Dynamic Theme Styling */}
        <div className="w-full pt-2 mb-4 sm:mb-5">
          {/* 5 Equal Distributed Tiles Aligned till Theme Button */}
          <div className="grid grid-cols-5 gap-3 sm:gap-4 w-full items-center px-1 sm:px-2">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-2 sm:px-3 text-center rounded-xl sm:rounded-2xl backdrop-blur-md border group cursor-default transition-all duration-200 hover:-translate-y-0.5 ${
                    isDarkSection
                      ? 'bg-[#548235]/[0.11] border-[#548235]/55 shadow-[0_0_14px_rgba(84,130,53,0.35),inset_0_0_8px_rgba(84,130,53,0.15)] hover:bg-[#548235]/[0.18] hover:border-[#548235]/90 hover:shadow-[0_0_22px_rgba(84,130,53,0.60),inset_0_0_12px_rgba(84,130,53,0.25)]'
                      : 'bg-white/90 border-[#548235]/35 shadow-[0_4px_16px_rgba(84,130,53,0.12),inset_0_0_6px_rgba(84,130,53,0.06)] hover:bg-emerald-50/70 hover:border-[#548235]/70 hover:shadow-[0_8px_24px_rgba(84,130,53,0.22)]'
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 sm:w-6 sm:h-6 mb-1.5 group-hover:scale-110 drop-shadow-md transition-transform ${
                      isDarkSection ? 'text-white opacity-95' : 'text-[#548235]'
                    }`}
                    strokeWidth={2.2}
                  />
                  <span
                    className={`text-[11px] sm:text-[12.5px] font-semibold tracking-wide leading-tight mb-1 drop-shadow-sm ${
                      isDarkSection ? 'text-white/90' : 'text-gray-700'
                    }`}
                  >
                    {metric.label}
                  </span>
                  <span
                    className={`text-2xl sm:text-[26px] lg:text-[31px] font-extrabold tracking-tight tabular-nums drop-shadow-md leading-tight mt-0.5 ${
                      isDarkSection ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    <CountUpNumber target={metric.target} suffix={metric.suffix} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
