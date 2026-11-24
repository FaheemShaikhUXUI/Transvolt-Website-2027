import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  CAREERS_METADATA,
  CAREER_DEPARTMENTS,
  CAREER_LOCATIONS,
  OPEN_POSITIONS,
} from '../data/careersData';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Mail,
  Copy,
  Check,
  Send,
  X,
  Building2,
  Zap,
  Shield,
  Layers,
  GraduationCap,
  ExternalLink,
} from 'lucide-react';

export const CareersPage = ({ onNavigate }) => {
  const { isDark } = useTheme();

  // Search & Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedWorkplace, setSelectedWorkplace] = useState('All'); // 'All' | 'On-site' | 'Hybrid'
  const [expandedJobId, setExpandedJobId] = useState(null);

  // Application Modal State
  const [activeApplyJob, setActiveApplyJob] = useState(null);
  const [applyForm, setApplyForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    note: '',
  });
  const [applyStatus, setApplyStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  // General email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Dynamic Liquid Spotlight Cursor Tracking for Hero Section (matching News/Governance/Contact style)
  const heroRef = useRef(null);
  const spotlightColorRef = useRef(null);
  const spotlightSolidRef = useRef(null);
  const isHovered = useRef(false);
  const currentPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const lerp = (start, end, factor) => start + (end - start) * factor;

    const render = () => {
      if (isHovered.current) {
        currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08);
        currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08);

        const cx = `${currentPos.current.x}px`;
        const cy = `${currentPos.current.y}px`;

        if (spotlightColorRef.current) {
          const colorMask = `radial-gradient(circle 320px at ${cx} ${cy}, black 0%, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)`;
          spotlightColorRef.current.style.maskImage = colorMask;
          spotlightColorRef.current.style.webkitMaskImage = colorMask;
        }

        if (spotlightSolidRef.current) {
          const solidMask = `radial-gradient(circle 120px at ${cx} ${cy}, black 0%, black 70%, transparent 100%)`;
          spotlightSolidRef.current.style.maskImage = solidMask;
          spotlightSolidRef.current.style.webkitMaskImage = solidMask;
        }
      }
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
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

  // Filtered Positions Calculation
  const filteredPositions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return OPEN_POSITIONS.filter((pos) => {
      // Department filter
      if (selectedDept !== 'All' && pos.department !== selectedDept) {
        return false;
      }

      // Location filter
      if (selectedLocation !== 'All Locations' && pos.location !== selectedLocation) {
        return false;
      }

      // Workplace filter
      if (selectedWorkplace !== 'All' && pos.workplace !== selectedWorkplace) {
        return false;
      }

      // Search Query filter
      if (q) {
        const matchesTitle = pos.title.toLowerCase().includes(q);
        const matchesDept = pos.department.toLowerCase().includes(q);
        const matchesLocation = pos.location.toLowerCase().includes(q);
        const matchesSummary = pos.summary.toLowerCase().includes(q);
        const matchesSkills = pos.skills.some((skill) => skill.toLowerCase().includes(q));
        const matchesReq = pos.requirements.some((req) => req.toLowerCase().includes(q));
        const matchesResp = pos.responsibilities.some((resp) => resp.toLowerCase().includes(q));

        if (
          !matchesTitle &&
          !matchesDept &&
          !matchesLocation &&
          !matchesSummary &&
          !matchesSkills &&
          !matchesReq &&
          !matchesResp
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedDept, selectedLocation, selectedWorkplace]);

  const toggleExpandJob = (id) => {
    setExpandedJobId((prev) => (prev === id ? null : id));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CAREERS_METADATA.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleOpenApplyModal = (job) => {
    setActiveApplyJob(job);
    setApplyStatus({ submitting: false, success: false, error: null });
    setApplyForm({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      note: '',
    });
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!applyForm.name || !applyForm.email) {
      setApplyStatus({
        submitting: false,
        success: false,
        error: 'Please enter both your full name and valid email address.',
      });
      return;
    }

    setApplyStatus({ submitting: true, success: false, error: null });

    // Simulate submission
    setTimeout(() => {
      setApplyStatus({ submitting: false, success: true, error: null });
      setTimeout(() => {
        setActiveApplyJob(null);
      }, 2000);
    }, 900);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedDept('All');
    setSelectedLocation('All Locations');
    setSelectedWorkplace('All');
  };

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-black text-gray-100' : 'bg-slate-50 text-gray-900'}`}>
      {/* =========================================================================
          HERO SECTION - CINEMATIC SPOTLIGHT DESIGN MATCHING NEWS & GOVERNANCE
          ========================================================================= */}
      <section className="relative w-full overflow-hidden select-none border-b border-black/[0.06] dark:border-white/[0.08]">
        <div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          className="relative w-full min-h-[300px] sm:min-h-[340px] lg:min-h-[370px] overflow-hidden flex items-center bg-[#070b12] pt-24 pb-10 sm:pt-28 sm:pb-12"
        >
          {/* Base Layer: Grayscale Micro-Dots */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none z-[4] opacity-35"
            style={{
              maskImage: 'radial-gradient(circle, #000 2.5px, transparent 2.5px)',
              WebkitMaskImage: 'radial-gradient(circle, #000 2.5px, transparent 2.5px)',
              maskSize: '6px 6px',
              WebkitMaskSize: '6px 6px',
            }}
          >
            <img
              src="/Contact_Page.png"
              alt="Transvolt Careers Background Base"
              className="w-full h-full object-cover object-center filter grayscale contrast-125 select-none"
            />
          </div>

          {/* Tier 2: 320px Color Spotlight Grid with Fluid Inertia */}
          <div
            ref={spotlightColorRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            <div
              className="w-full h-full"
              style={{
                maskImage: 'radial-gradient(circle, #000 2.5px, transparent 2.5px)',
                WebkitMaskImage: 'radial-gradient(circle, #000 2.5px, transparent 2.5px)',
                maskSize: '6px 6px',
                WebkitMaskSize: '6px 6px',
              }}
            >
              <img
                src="/Contact_Page.png"
                alt="Transvolt Careers Color Focus"
                className="w-full h-full object-cover object-center opacity-100 select-none"
              />
            </div>
          </div>

          {/* Tier 3: 120px Solid Core Spotlight */}
          <div
            ref={spotlightSolidRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[6] transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            <img
              src="/Contact_Page.png"
              alt="Transvolt Careers Solid Core"
              className="w-full h-full object-cover object-center opacity-100 select-none"
            />
          </div>

          {/* Dual Scrims for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35 pointer-events-none z-[7]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-[7]" />

          {/* Hero Content */}
          <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full py-2 sm:py-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
              {/* Left Headline */}
              <div className="max-w-xl lg:max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-[#548235]/50 text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#548235]" />
                  <span>Careers & Opportunities at Transvolt</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] drop-shadow-xl">
                  Work With Transvolt
                </h1>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-200 font-normal drop-shadow-md max-w-xl">
                  {CAREERS_METADATA.subtitle}
                </p>
              </div>

              {/* Right Quick Metrics Card */}
              <div className="w-full lg:w-[380px] xl:w-[420px] shrink-0 bg-black/60 border border-white/20 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-2xl">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                  <div className="flex items-center gap-2.5 text-white">
                    <div className="w-8 h-8 rounded-lg bg-[#548235]/20 text-[#76B84A] flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase text-white/60 tracking-wider block">Opportunities</span>
                      <span className="text-sm font-bold text-white">{OPEN_POSITIONS.length} Active Positions</span>
                    </div>
                  </div>
                  <a
                    href="#open-positions"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#548235] hover:bg-[#44692a] text-white text-xs font-semibold transition-all shadow-md"
                  >
                    <span>View Roles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-base sm:text-lg font-bold text-[#76B84A] block">4</span>
                    <span className="text-[10.5px] text-gray-300 font-medium">Depot Hubs</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-base sm:text-lg font-bold text-[#38bdf8] block">100%</span>
                    <span className="text-[10.5px] text-gray-300 font-medium">Electric Transit</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-base sm:text-lg font-bold text-amber-400 block">Fast</span>
                    <span className="text-[10.5px] text-gray-300 font-medium">Hiring Process</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SEARCH & FILTER COMMAND BAR
          ========================================================================= */}
      <section
        id="open-positions"
        className={`sticky top-0 z-30 border-b backdrop-blur-xl transition-colors duration-200 ${
          isDark
            ? 'bg-black/90 border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-white/95 border-gray-200 shadow-sm'
        }`}
      >
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-4 sm:py-5">
          <div className="flex flex-col gap-3.5">
            {/* Search Input Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Primary Search Input */}
              <div className="relative flex-1">
                <Search
                  className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by job title, department, skills (e.g. CAN-bus, IoT, Depot, Charging)..."
                  className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-sm font-medium transition-all outline-none border ${
                    isDark
                      ? 'bg-white/[0.05] border-white/15 text-white placeholder-gray-400 focus:border-[#548235] focus:bg-white/[0.08]'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#548235] focus:bg-white'
                  }`}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-200 transition-colors"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Location Dropdown */}
              <div className="sm:w-56 shrink-0 relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all outline-none border appearance-none cursor-pointer ${
                    isDark
                      ? 'bg-[#0E1420] border-white/15 text-white focus:border-[#548235]'
                      : 'bg-white border-gray-300 text-gray-900 focus:border-[#548235]'
                  }`}
                >
                  {CAREER_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc} className={isDark ? 'bg-[#0E1420]' : 'bg-white'}>
                      {loc}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none opacity-60" />
              </div>

              {/* Workplace Mode Toggle */}
              <div className="flex items-center rounded-xl p-1 border shrink-0 bg-black/5 dark:bg-white/[0.04] border-gray-200 dark:border-white/10">
                {['All', 'On-site', 'Hybrid'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSelectedWorkplace(mode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedWorkplace === mode
                        ? 'bg-[#548235] text-white shadow-sm'
                        : isDark
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Department Filter Pills Row & Live Count */}
            <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                {CAREER_DEPARTMENTS.map((dept) => {
                  const count =
                    dept === 'All'
                      ? OPEN_POSITIONS.length
                      : OPEN_POSITIONS.filter((p) => p.department === dept).length;
                  const isActive = selectedDept === dept;

                  return (
                    <button
                      key={dept}
                      onClick={() => setSelectedDept(dept)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#548235] text-white shadow-sm'
                          : isDark
                          ? 'bg-white/[0.05] hover:bg-white/[0.1] text-gray-300 border border-white/10'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
                      }`}
                    >
                      <span>{dept}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                          isActive
                            ? 'bg-black/30 text-white'
                            : isDark
                            ? 'bg-white/10 text-gray-300'
                            : 'bg-black/10 text-gray-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Results status indicator */}
              <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>
                  Showing <strong className="text-[#548235] dark:text-[#76B84A]">{filteredPositions.length}</strong>{' '}
                  of {OPEN_POSITIONS.length} positions
                </span>
                {(searchQuery || selectedDept !== 'All' || selectedLocation !== 'All Locations' || selectedWorkplace !== 'All') && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#548235] dark:text-[#76B84A] underline hover:no-underline font-semibold"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OPEN OPPORTUNITIES LIST / REQUIREMENTS GRID
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-8 sm:py-12">
        {filteredPositions.length === 0 ? (
          /* Empty Search State */
          <div
            className={`rounded-2xl border p-12 text-center max-w-xl mx-auto ${
              isDark ? 'bg-[#0B0F17] border-white/10' : 'bg-white border-gray-200'
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#548235]/15 text-[#548235] flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">No Matching Openings Found</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              We couldn&apos;t find any roles matching your current search criteria. Try modifying your keywords or
              department filter.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-5 px-5 py-2 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {filteredPositions.map((job) => {
              const isExpanded = expandedJobId === job.id;

              return (
                <div
                  key={job.id}
                  id={job.id}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isDark
                      ? 'bg-[#0B0F17]/90 border-white/[0.08] hover:border-[#548235]/50 hover:shadow-[0_8px_30px_rgba(84,130,53,0.12)]'
                      : 'bg-white border-gray-200/90 hover:border-[#548235]/40 hover:shadow-lg'
                  }`}
                >
                  {/* Card Header & Summary Bar */}
                  <div className="p-5 sm:p-6 lg:p-7">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                      {/* Left: Job Meta & Title */}
                      <div className="flex-1 min-w-0">
                        {/* Badges Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold tracking-wide uppercase bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30">
                            {job.department}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                              isDark
                                ? 'bg-white/[0.04] text-gray-300 border-white/10'
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            }`}
                          >
                            {job.workplace}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                              isDark
                                ? 'bg-white/[0.04] text-gray-300 border-white/10'
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            }`}
                          >
                            {job.type}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-md text-[11px] font-medium border ${
                              isDark
                                ? 'bg-white/[0.04] text-gray-300 border-white/10'
                                : 'bg-gray-100 text-gray-700 border-gray-200'
                            }`}
                          >
                            Exp: {job.experience}
                          </span>
                          {job.urgent && (
                            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase bg-rose-500/15 text-rose-500 dark:text-rose-400 border border-rose-500/30 animate-pulse">
                              Urgent Need
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 dark:text-white group-hover:text-[#548235] dark:group-hover:text-[#76B84A] transition-colors">
                          {job.title}
                        </h2>

                        {/* Location Subtitle */}
                        <div className="flex items-center gap-1.5 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                          <MapPin className="w-3.5 h-3.5 text-[#548235] shrink-0" />
                          <span>{job.location}</span>
                        </div>

                        {/* Summary description */}
                        <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                          {job.summary}
                        </p>

                        {/* Skills / Tech Tags */}
                        <div className="flex flex-wrap items-center gap-1.5 mt-4">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                                isDark
                                  ? 'bg-white/[0.03] text-gray-300 border-white/10'
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Actions: View Requirements toggle & Apply Now Button */}
                      <div className="flex sm:flex-row lg:flex-col items-center gap-2.5 shrink-0 pt-2 lg:pt-0">
                        <button
                          onClick={() => handleOpenApplyModal(job)}
                          className="flex-1 sm:flex-none w-full sm:w-auto lg:w-44 px-4 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Apply Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => toggleExpandJob(job.id)}
                          className={`flex-1 sm:flex-none w-full sm:w-auto lg:w-44 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                            isExpanded
                              ? 'bg-black/10 dark:bg-white/10 border-[#548235] text-[#548235] dark:text-[#76B84A]'
                              : isDark
                              ? 'bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 border-white/15'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-800 border-gray-300'
                          }`}
                        >
                          <span>{isExpanded ? 'Hide Details' : 'View Requirements'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Detailed Requirements & Responsibilities Drawer */}
                  {isExpanded && (
                    <div
                      className={`border-t px-5 sm:px-7 py-6 sm:py-7 transition-all ${
                        isDark ? 'bg-black/40 border-white/[0.08]' : 'bg-gray-50/80 border-gray-200'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Key Responsibilities */}
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#548235] dark:text-[#76B84A] mb-3">
                            <Layers className="w-4 h-4" />
                            <span>What You Will Own & Deliver</span>
                          </div>
                          <ul className="space-y-2.5">
                            {job.responsibilities.map((resp, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#548235] mt-2 shrink-0" />
                                <span>{resp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Core Qualifications & Requirements */}
                        <div>
                          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#548235] dark:text-[#76B84A] mb-3">
                            <GraduationCap className="w-4 h-4" />
                            <span>Qualifications & Requirements</span>
                          </div>
                          <ul className="space-y-2.5">
                            {job.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                <CheckCircle2 className="w-4 h-4 text-[#548235] dark:text-[#76B84A] mt-0.5 shrink-0" />
                                <span>{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Bottom Drawer CTA Bar */}
                      <div className="mt-6 pt-5 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          Role Reference ID: <span className="font-mono font-bold text-gray-700 dark:text-gray-200">{job.id.toUpperCase()}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <a
                            href={`mailto:${CAREERS_METADATA.contactEmail}?subject=Application for ${encodeURIComponent(job.title)} (${job.id.toUpperCase()})`}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all inline-flex items-center gap-1.5 ${
                              isDark
                                ? 'border-white/20 text-gray-300 hover:text-white hover:bg-white/10'
                                : 'border-gray-300 text-gray-700 hover:text-black hover:bg-gray-100'
                            }`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Apply via Email</span>
                          </a>

                          <button
                            onClick={() => handleOpenApplyModal(job)}
                            className="px-5 py-2 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs font-bold transition-all shadow-sm"
                          >
                            Submit Online Application
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================================
            SPONTANEOUS APPLICATION / GENERAL OPPORTUNITIES CARD
            ========================================================================= */}
        <div
          className={`mt-12 rounded-2xl border p-6 sm:p-8 relative overflow-hidden ${
            isDark ? 'bg-[#0E1420] border-white/10' : 'bg-white border-gray-200 shadow-md'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                <span>General Opportunities</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Don&apos;t See Your Exact Role?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                We are continually scaling our electric mobility operations across India. If you are passionate about
                megawatt charging, EV fleet systems, or municipal transit concessions, send your CV directly to our talent
                team.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={handleCopyEmail}
                className={`px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  copiedEmail
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : isDark
                    ? 'bg-white/[0.05] hover:bg-white/[0.1] text-white border-white/15'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900 border-gray-300'
                }`}
              >
                {copiedEmail ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? 'Email Copied!' : CAREERS_METADATA.contactEmail}</span>
              </button>

              <a
                href={`mailto:${CAREERS_METADATA.contactEmail}?subject=General Application / Talent Network - Transvolt Mobility`}
                className="px-5 py-3 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Your CV</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAST APPLICATION MODAL
          ========================================================================= */}
      {activeApplyJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 sm:p-7 shadow-2xl relative transition-all ${
              isDark ? 'bg-[#0E1420] border-white/20 text-white' : 'bg-white border-gray-200 text-gray-900'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveApplyJob(null)}
              className="absolute right-4 top-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-100 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#548235] dark:text-[#76B84A] font-bold block mb-1">
                Applying For Position
              </span>
              <h3 className="text-lg sm:text-xl font-bold">{activeApplyJob.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {activeApplyJob.department} • {activeApplyJob.location}
              </p>
            </div>

            {/* Submission Status Message */}
            {applyStatus.success ? (
              <div className="py-8 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-500">Application Submitted!</h4>
                <p className="text-xs text-gray-400 mt-1.5">
                  Our talent acquisition team will review your profile and reach out shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-3.5">
                {applyStatus.error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                    {applyStatus.error}
                  </div>
                )}

                <div>
                  <label className="text-[11px] font-medium block mb-1 opacity-70">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={applyForm.name}
                    onChange={(e) => setApplyForm({ ...applyForm, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
                      isDark ? 'bg-white/5 border-white/15 focus:border-[#548235]' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-medium block mb-1 opacity-70">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={applyForm.email}
                      onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
                        isDark ? 'bg-white/5 border-white/15 focus:border-[#548235]' : 'bg-gray-50 border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-medium block mb-1 opacity-70">Contact Number</label>
                    <input
                      type="tel"
                      value={applyForm.phone}
                      onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
                        isDark ? 'bg-white/5 border-white/15 focus:border-[#548235]' : 'bg-gray-50 border-gray-300'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-medium block mb-1 opacity-70">LinkedIn / Portfolio URL</label>
                  <input
                    type="url"
                    value={applyForm.linkedin}
                    onChange={(e) => setApplyForm({ ...applyForm, linkedin: e.target.value })}
                    placeholder="https://linkedin.com/in/username"
                    className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none ${
                      isDark ? 'bg-white/5 border-white/15 focus:border-[#548235]' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium block mb-1 opacity-70">
                    Brief Note & Relevant Experience
                  </label>
                  <textarea
                    rows={3}
                    value={applyForm.note}
                    onChange={(e) => setApplyForm({ ...applyForm, note: e.target.value })}
                    placeholder="Briefly highlight your years of experience, current notice period, and why you want to join Transvolt..."
                    className={`w-full px-3 py-2 rounded-xl text-xs sm:text-sm border outline-none resize-none ${
                      isDark ? 'bg-white/5 border-white/15 focus:border-[#548235]' : 'bg-gray-50 border-gray-300'
                    }`}
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => setActiveApplyJob(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-white/10 transition-colors opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applyStatus.submitting}
                    className="px-5 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white text-xs sm:text-sm font-bold transition-all shadow-md disabled:opacity-50"
                  >
                    {applyStatus.submitting ? 'Submitting...' : 'Send Application'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
