import React, { useState, useEffect } from 'react';
import { Bus, Leaf, Fuel, Cloud, Trees, Sliders, Users, Heart } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// Transvolt Dual-Chevron Branding Arrow Component (Turns 100% pure white instantly on button hover)
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

// Animated Count-Up Number Counter component (from 0 to target on load/refresh, 20% slower speed)
const CountUpNumber = ({ target = 4990, suffix = '+', duration = 2750 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease-out cubic: rapid initial climb that smoothly decelerates to final number
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
    <span className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
};

export const HomePage = ({ currentPage = 0, onNavigate }) => {
  const { isDark } = useTheme();

  // Metrics from the mockup with animated targets (Persistent across all slides)
  const metrics = [
    { label: "Number of EV's", target: 4990, suffix: '+', icon: Bus },
    { label: 'Clean Kms Run', target: 4990, suffix: '+', icon: Leaf },
    { label: 'Fuel Saved', target: 4990, suffix: '+', icon: Fuel },
    { label: 'CO2 Saved', target: 4990, suffix: '+', icon: Cloud },
    { label: 'Trees Saved', target: 4990, suffix: '+', icon: Trees },
  ];

  // 3 Brand Pillars (WE PLAN, WE CARE, WE COMMIT) for Slide 1
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

  // 6 News Items for Slide 2 (Redesigned in Editorial Architecture Style matching reference)
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

  return (
    <section
      id="home"
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
      }}
    >
      {/* Absolute Starry Sky Background in Dark Theme (Fixed, Never Scrolls) */}
      {isDark && (
        <img
          src="/Dark-Sky-BG.png"
          alt="Transvolt Night Sky"
          className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0 opacity-40 -translate-y-[10%] scale-[1.15]"
        />
      )}

      {/* Permanent Base Clean Grass Background (Always Present Behind Every Layer, Completely Unaffected by Any Transition) */}
      <img
        src="/Home-BG_for_Clean_Grass_bg.png"
        alt="Transvolt Permanent Clean Grass Surface"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-[1]"
      />

      {/* Background Graphic Illustration (Fades out when Vehicles Touch Tree) */}
      <img
        src={isDark ? '/Home-BG_for_Black.png?v=2' : '/Home-BG_for_White.png?v=2'}
        alt="Transvolt Environmental Impact Illustration"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-[2] animate-bg-fade"
      />

      {/* Lush Green Living Tree Canopy (Smooth Transition when Vehicles Touch Tree) */}
      <img
        src="/Tree-Green-Lush-1080.png"
        alt="Transvolt Living Green Canopy"
        className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none z-[3] animate-tree-bloom"
      />

      {/* Atmospheric Vertical Thunder Lights in the Right Storm Cloud (Fades out when Vehicles Touch Tree) */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden animate-bg-fade">
        {/* Exact User-Selected Realistic Lightning Bolt */}
        <div
          className="absolute top-[215px] sm:top-[285px] lg:top-[318px] right-[5%] sm:right-[6%] lg:right-[7.5%] w-[125px] sm:w-[146px] lg:w-[166px] h-[188px] sm:h-[214px] lg:h-[228px]"
          style={{
            '--thunder-peak-opacity': isDark ? 0.12 : 0.20,
            '--thunder-glow-peak-opacity': isDark ? 0.12 : 0.15,
          }}
        >
          {/* Sky Blue Cloud Glow behind thunder */}
          <div className="absolute -inset-10 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.85)_0%,rgba(14,165,233,0.45)_35%,rgba(2,132,199,0.2)_55%,transparent_75%)] blur-2xl animate-thunder-flash" />

          {/* High-Resolution Exact Lightning Bolt */}
          <img
            src="/lightning_rot_cw.png"
            alt="Vertical Thunder Lightning"
            className={`absolute inset-0 w-full h-full object-contain animate-thunder-strike select-none pointer-events-none ${
              isDark
                ? 'drop-shadow-[0_0_6px_rgba(56,189,248,0.12)]'
                : 'drop-shadow-[0_0_6px_rgba(56,189,248,0.15)]'
            }`}
          />
        </div>
      </div>

      {/* Main Center Content Area */}
      <div className="relative z-10 w-full h-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-20 sm:pt-24 pb-4 flex flex-col justify-between">
        {/* Unified 12-Column Grid: Left Column Flips In-Place, Right Column Persists on ALL Slides */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-2">
          {/* Left Column: Flippable Container for Slide 0, Slide 1, and Slide 2 */}
          <div className="lg:col-span-7 relative w-full min-h-[540px] lg:min-h-[590px]">
            {/* SLIDE 0 CONTENT: Empowering to move / Description / Investors Card */}
            <div
              className={`absolute top-0 left-0 w-full flex flex-col justify-start max-w-2xl lg:max-w-4xl space-y-3 sm:space-y-3.5 transition-all duration-500 ease-in-out ${
                currentPage === 0
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-8 pointer-events-none'
              }`}
            >
              {/* Main Headline */}
              <h1
                className="text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[52px] font-extrabold tracking-tight animate-dynamic-green-gradient pb-1.5"
                style={{ lineHeight: 1.10 }}
              >
                Empowering to move
                <br />
                in a Clean, Green and Quiet
                <br />
                Environment with Safety
              </h1>

              {/* Description Subtext */}
              <p
                className={`text-sm sm:text-[15px] lg:text-[15.5px] leading-relaxed max-w-2xl font-normal ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                India's First OEM agnostic EV Platform for Heavy Commercial Vehicles -
                Electric Buses and Electric Trucks; Transvolt owns and operates the
                e-HCVs in B to G and B to B segments across India. Our solution covers
                Intra-City e-Buses, Corporate e-Bus Services, Scholl e-Buses, e-Trucks
              </p>

              {/* Institutional Investors Card */}
              <div
                className={`w-full max-w-[668px] rounded-2xl p-5 sm:p-6 border backdrop-blur-md shadow-sm transition-colors ${
                  isDark
                    ? 'bg-[#0E131E]/85 border-white/15 text-white'
                    : 'bg-white/92 border-gray-300/80 text-gray-900'
                }`}
              >
                <h2 className="text-base sm:text-lg lg:text-[19px] font-bold leading-snug mb-1.5">
                  A Milestone for Electric Mobility Backed by Global
                  Institutional Investors
                </h2>

                <p className="text-xs sm:text-[12.5px] font-medium text-[#548235] dark:text-[#72B347] mb-2 leading-relaxed">
                  Supported by IFC and Finnfund to accelerate the future of
                  sustainable commercial mobility.
                </p>

                <p
                  className={`text-xs sm:text-[12px] italic mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  "Globally, IFC's first equity investment in an EV fleet platform."
                </p>

                {/* Backed By Color Logos (IFC & Finnfund) */}
                <div className="pt-1">
                  <p className="text-[10.5px] font-bold tracking-wider text-gray-500 dark:text-gray-400 uppercase mb-2">
                    BACKED BY
                  </p>
                  <div className="flex flex-wrap items-center gap-6 sm:gap-8">
                    <div className="flex items-center gap-2">
                      <img
                        src={isDark ? '/IFC-Logo-White.png' : '/IFC-Logo.png'}
                        alt="International Finance Corporation"
                        className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={isDark ? '/Finfund_logo-White.png' : '/Finfund_logo.png'}
                        alt="Finnfund"
                        className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Text Below the Institutional Investors Tile */}
              <p className="text-sm sm:text-[14.5px] lg:text-[15px] font-semibold text-gray-800 dark:text-gray-200 max-w-xl leading-relaxed pt-2">
                where we're pioneering the charge towards a future of{' '}
                <span className="font-bold text-gray-900 dark:text-white">ZERO EMISSION</span> mobility, with
                Safety and Sustainability at the forefront!
              </p>
            </div>

            {/* SLIDE 1 CONTENT: WHO WE ARE (Full Paragraphs + 3 Redesigned Bento Pillars) */}
            <div
              className={`absolute top-0 left-0 w-full flex flex-col justify-start max-w-2xl lg:max-w-4xl space-y-4 sm:space-y-4.5 transition-all duration-500 ease-in-out ${
                currentPage === 1
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              {/* Main Title - Aligned with top of metric tiles */}
              <div className="flex flex-col space-y-2.5">
                <h2 className="text-2xl sm:text-[29px] lg:text-[35px] font-bold tracking-tight uppercase leading-none pt-0.5 inline-block animate-dynamic-green-gradient">
                  WHO WE ARE
                </h2>

                {/* Full Description Paragraphs */}
                <div className="space-y-2.5 max-w-3xl">
                  <p
                    className={`text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed font-normal ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    <strong className="font-bold text-gray-900 dark:text-white">Transvolt</strong> is more
                    than a business; it's a commitment to combating climate change and improving air quality
                    through zero-emission mobility solutions. We're dedicated to building a green platform
                    that offers <span className="font-bold text-gray-900 dark:text-white">ZEROEMISSION</span>{' '}
                    services, in alignment with global efforts towards sustainable transportation.
                  </p>

                  <p
                    className={`text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-relaxed font-normal ${
                      isDark ? 'text-gray-200' : 'text-gray-700'
                    }`}
                  >
                    With a dedicated team and support from top infrastructure funds and financial
                    institutions, we're leading the charge towards sustainable transportation in India and
                    beyond!
                  </p>
                </div>
              </div>

              {/* 3 Unique Latest UI Redesigned Tiles (WE PLAN, WE CARE, WE COMMIT) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-1 sm:pt-2">
                {pillars.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className={`group relative rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between border backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 min-h-[220px] sm:min-h-[235px] ${
                        isDark
                          ? 'bg-[#0E131E]/85 border-white/15 hover:border-[#72B347]/50 shadow-[0_4px_20px_rgba(0,0,0,0.45)] hover:shadow-[0_8px_25px_rgba(114,179,71,0.22)]'
                          : 'bg-white/90 border-gray-200/90 hover:border-[#548235]/50 shadow-sm hover:shadow-[0_8px_20px_rgba(84,130,53,0.18)]'
                      }`}
                    >
                      {/* Top ambient glow accent on hover */}
                      <div className="absolute top-0 right-0 w-24 h-24 bg-[#548235]/10 rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div>
                        {/* Top Bar: Floating Icon Badge & Pillar Number */}
                        <div className="flex items-center justify-between mb-2.5">
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                              isDark
                                ? 'bg-[#548235]/20 text-[#72B347] border border-[#548235]/40 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_12px_rgba(84,130,53,0.5)]'
                                : 'bg-[#548235]/10 text-[#456E2D] border border-[#548235]/25 group-hover:bg-[#548235] group-hover:text-white group-hover:shadow-[0_0_10px_rgba(84,130,53,0.35)]'
                            }`}
                          >
                            <Icon className="w-5 h-5 stroke-[2.2]" />
                          </div>
                          <span className="text-[11px] font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">
                            0{idx + 1}
                          </span>
                        </div>

                        {/* Pillar Title */}
                        <h3 className="text-sm sm:text-[15px] font-extrabold tracking-wide text-gray-900 dark:text-white uppercase mb-1.5 group-hover:text-[#548235] dark:group-hover:text-[#72B347] transition-colors">
                          {item.title}
                        </h3>

                        {/* Description Body */}
                        <p
                          className={`text-[11.5px] sm:text-[12px] leading-relaxed font-normal ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          {item.description}
                        </p>
                      </div>

                      {/* Bottom CTA: Read More with Branding Arrow */}
                      <div className="mt-3 pt-2.5 border-t border-gray-200/60 dark:border-white/10 flex items-center justify-between">
                        <span className="text-xs font-bold text-[#548235] dark:text-[#72B347] group-hover:text-[#456E2D] dark:group-hover:text-[#86efac] transition-colors">
                          Read More
                        </span>
                        <BrandArrow className="h-2.5 sm:h-3 w-auto group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SLIDE 2 CONTENT: OUR NEWS (Redesigned like the Reference Style) */}
            <div
              className={`absolute top-0 left-0 w-full flex flex-col justify-start max-w-2xl lg:max-w-4xl space-y-3 transition-all duration-500 ease-in-out ${
                currentPage === 2
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-8 pointer-events-none'
              }`}
            >
              {/* Header & Sub-paragraph */}
              <div className="flex flex-col space-y-1.5">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-[28px] lg:text-[34px] font-bold tracking-tight uppercase leading-none pt-0.5 inline-block animate-dynamic-green-gradient">
                    Our News
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#548235]/15 text-[#548235] dark:text-[#72B347] border border-[#548235]/30">
                    Latest Highlights
                  </span>
                </div>

                <p
                  className={`text-xs sm:text-[12.5px] lg:text-[13px] leading-relaxed font-normal max-w-2xl ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Stay updated with Transvolt's landmark financing deals, EV fleet deployments, and strategic partnerships driving India's zero-emission heavy commercial mobility revolution.
                </p>
              </div>

              {/* 6 News Tiles: Exact Reference Style with Generous Breathing Space & 30% Taller Images */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-5 sm:gap-x-6 gap-y-4 sm:gap-y-5 w-full pt-1">
                {newsList.map((item, idx) => (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Hero Thumbnail (10px Rounded Corners, 30% Taller: 158px/175px, Thin Light Gray Border, No Dark Shadow) */}
                    <div className="relative w-full h-[158px] sm:h-[175px] rounded-[10px] border border-gray-300 dark:border-[#283A52] overflow-hidden bg-black/20">
                      <img
                        src="/news-placeholder.jpg"
                        alt={item.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                      />

                      {/* Top-Right Number Pill (01, 02, etc.) */}
                      <div className="absolute top-2 right-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider backdrop-blur-md bg-white/85 dark:bg-black/75 text-gray-900 dark:text-white border border-gray-300/60 dark:border-white/20 shadow-xs">
                          {item.num}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Meta Bar: Title + Category/Year on Left, Arrow Box on Right */}
                    <div className="flex items-center justify-between pt-2 px-0.5">
                      <div className="flex flex-col pr-2 min-w-0">
                        <h3 className="text-[11px] sm:text-[12px] font-black tracking-wider uppercase text-gray-900 dark:text-white group-hover:text-[#548235] dark:group-hover:text-[#72B347] transition-colors truncate">
                          {item.shortTitle}
                        </h3>
                        <span className="text-[10px] sm:text-[10.5px] text-gray-500 dark:text-gray-400 font-medium mt-0.5 truncate">
                          {item.category} / {item.year}
                        </span>
                      </div>

                      {/* Right Arrow (Frameless Branding Arrow) */}
                      <div className="shrink-0 flex items-center pl-1">
                        <BrandArrow className="h-3 sm:h-3.5 w-auto group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Read More News CTA Button with Branding Arrow (5px curved only) */}
              <div className="pt-2 flex justify-start">
                <button
                  className={`inline-flex items-center gap-2.5 px-5 py-2 rounded-[5px] border backdrop-blur-md font-bold text-xs sm:text-[12.5px] tracking-wide group cursor-pointer transition-all duration-300 ${
                    isDark
                      ? 'bg-[#182335]/85 border-white/20 text-white hover:bg-[#548235] hover:border-[#548235] shadow-[0_4px_16px_rgba(0,0,0,0.4)]'
                      : 'bg-white/90 border-gray-300 text-gray-900 hover:bg-[#548235] hover:text-white hover:border-[#548235] shadow-sm'
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

          {/* Right Column: 5 Impact Metric Cards + News Ticker + Quote & Arrow (PERSISTENT ON ALL SLIDES AS IN IMAGE 2) */}
          <div className="lg:col-span-5 flex flex-col items-end space-y-3">
            {/* 5 Impact Metric Cards with Running Beam Border */}
            <div className="grid grid-cols-5 gap-2.5 sm:gap-3 w-full max-w-2xl">
              {metrics.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div
                    key={idx}
                    className={`relative p-[1.5px] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 ${
                      isDark ? 'bg-white/10' : 'bg-gray-200/80'
                    }`}
                  >
                    {/* Running Green Beam Light */}
                    <div
                      className="absolute inset-[-180%] animate-border-beam pointer-events-none"
                      style={{
                        background:
                          'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #548235 310deg, #22c55e 340deg, #86efac 360deg)',
                        animationDelay: `${idx * 0.75}s`,
                      }}
                    />

                    {/* Glassmorphic Inner Content */}
                    <div
                      className={`relative w-full h-full rounded-[14.5px] py-2 px-2 sm:py-2.5 sm:px-2.5 flex flex-col items-center justify-between text-center backdrop-blur-xl transition-all duration-200 ${
                        isDark
                          ? 'bg-[#0E131E]/75 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]'
                          : 'bg-white/75 text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]'
                      }`}
                    >
                      <Icon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#548235] dark:text-[#72B347] mb-1" />
                      <span className="text-[10px] sm:text-[11px] font-semibold text-gray-500 dark:text-gray-400 leading-tight h-6 flex items-center justify-center">
                        {m.label}
                      </span>
                      <span className="text-sm sm:text-base lg:text-[17px] font-extrabold text-gray-900 dark:text-white">
                        <CountUpNumber target={m.target} suffix={m.suffix} duration={2750} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* News Pill Ticker */}
            <div
              className={`w-full max-w-2xl rounded-full px-6 py-2 text-center border shadow-sm backdrop-blur-xl transition-all duration-200 ${
                isDark
                  ? 'bg-[#0E131E]/80 border-white/15 text-[#72B347] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]'
                  : 'bg-white/80 border-white/60 text-[#456E2D] shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]'
              }`}
            >
              <p className="text-xs sm:text-[13px] font-bold tracking-tight truncate">
                News: Transvolt Mobility signs Collaboration with IFC for over $600 million
              </p>
            </div>

            {/* Cursive Quote with Arrow */}
            <div className="w-full max-w-2xl flex items-center justify-end pt-4 sm:pt-6 pr-2 sm:pr-4 -translate-x-[25%] translate-y-[1vh]">
              <div className="flex items-center gap-4 animate-gentle-sway">
                <span className="font-cursive text-2xl sm:text-3xl lg:text-[34px] font-bold italic text-[#456E2D] dark:text-[#72B347] tracking-wide text-right leading-none whitespace-nowrap">
                  "We are Impacting on
                  <br />
                  Environment"
                </span>
                <img
                  src="/Arrow_homepage.svg"
                  alt="Transvolt Dynamic Arrow"
                  className="h-14 sm:h-16 lg:h-20 w-auto object-contain shrink-0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Area: ISO Certification (Flush left with content, persistent across slides) */}
        <div className="relative z-10 w-full flex flex-col justify-end pb-2">
          <div className="text-white font-bold text-xs sm:text-sm tracking-wide drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
            ISO 14001:2015 and 45001:2018 Certified Company
          </div>
        </div>
      </div>

      {/* Smoothly Running Commercial Vehicles - Positioned 1.8% lower, riding on the grass tips (Fixed, Never Scrolls) */}
      <div className="absolute bottom-[48px] sm:bottom-[54px] lg:bottom-[58px] left-0 right-0 w-full overflow-hidden pointer-events-none z-10 h-16 sm:h-20">
        <img
          src={isDark ? '/Vehicles-1-Dark.svg' : '/Vehicles-1.svg'}
          alt="Transvolt Electric Vehicles Running Smoothly on Grass Surface"
          className={`h-10 sm:h-12 lg:h-14 w-auto object-contain animate-drive-smooth ${
            isDark ? 'drop-shadow-[0_0_8px_rgba(9,203,7,0.38)]' : ''
          }`}
        />
      </div>
    </section>
  );
};