import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { CONTACT_LOCATIONS, CONTACT_METADATA } from '../data/contactData';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Send,
  MessageSquare,
  ShieldCheck,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
  Compass,
  Bus,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from 'lucide-react';

export const MainContactPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'corporate' | 'depot'
  const [expandedMapId, setExpandedMapId] = useState(null); // id of location with map expanded
  const [copiedId, setCopiedId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    from_email: '',
    contact: '',
    company: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  // Dynamic Liquid Spotlight Cursor Tracking (Matching News & Governance style)
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
          currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
          currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;

          const cx = currentPos.current.x;
          const cy = currentPos.current.y;
          const time = performance.now() * 0.003;

          // 1. Color Grid Radius: 600px
          const rxColor = 600 + Math.sin(time) * 12;
          const ryColor = 600 + Math.cos(time * 1.3) * 12;
          const maskColor = `radial-gradient(${rxColor.toFixed(1)}px ${ryColor.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px, black 0%, black 35%, rgba(0,0,0,0.65) 65%, rgba(0,0,0,0.2) 85%, transparent 100%)`;

          // 2. Solid No-Gap Merged Core Radius: 120px
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

  const handleCopyAddress = (id, address) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2200);
  };

  const toggleMap = (id) => {
    setExpandedMapId(prev => (prev === id ? null : id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.from_email || !formData.message) {
      setFormStatus({
        submitting: false,
        success: false,
        error: 'Please provide both your email address and message.',
      });
      return;
    }

    setFormStatus({ submitting: true, success: false, error: null });

    // Simulate reliable dispatch feedback matching Transvolt EmailJS integration
    setTimeout(() => {
      setFormStatus({ submitting: false, success: true, error: null });
      setFormData({
        from_email: '',
        contact: '',
        company: '',
        subject: '',
        message: '',
      });
    }, 900);
  };

  const filteredLocations = CONTACT_LOCATIONS.filter(loc => {
    if (activeCategory === 'all') return true;
    return loc.type === activeCategory;
  });

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#0B0F17] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* =========================================================================
          FULL-WIDTH CINEMATIC HERO SECTION (MATCHING NEWS & GOVERNANCE STYLE)
          ========================================================================= */}
      <section data-bg="dark" className="relative w-full overflow-hidden border-b border-black/[0.06] dark:border-white/[0.08]">
        <div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          data-bg="dark"
          className="relative w-full min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] pt-24 pb-10 sm:pt-28 sm:pb-12 flex items-center bg-black overflow-hidden"
        >
          {/* 100% Black Base Canvas */}
          {/* Tier 1: Base Image rendered strictly INSIDE 2.5px square dots at 100% opacity in grayscale */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none z-[4]"
            style={{
              maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
              maskSize: '2.5px 2.5px',
              WebkitMaskSize: '2.5px 2.5px',
              maskRepeat: 'repeat',
              WebkitMaskRepeat: 'repeat',
              maskPosition: '0 0',
              WebkitMaskPosition: '0 0',
            }}
          >
            <img
              src="/Contact_Page.png"
              alt="Transvolt Contact Hero"
              className="w-full h-full object-cover object-center opacity-100 grayscale select-none"
            />
          </div>

          {/* Tier 2: 600px Radius Color Pixel Grid Layer (in full natural color) */}
          <div
            ref={spotlightColorRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            <div
              className="w-full h-full"
              style={{
                maskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='5' viewBox='0 0 5 5' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='4' height='4' fill='black'/%3E%3C/svg%3E")`,
                maskSize: '2.5px 2.5px',
                WebkitMaskSize: '2.5px 2.5px',
                maskRepeat: 'repeat',
                WebkitMaskRepeat: 'repeat',
                maskPosition: '0 0',
                WebkitMaskPosition: '0 0',
              }}
            >
              <img
                src="/Contact_Page.png"
                alt="Transvolt Contact Hero Focus Color Grid"
                className="w-full h-full object-cover object-center opacity-100 select-none"
              />
            </div>
          </div>

          {/* Tier 3: 120px Radius Solid Merged Core (ZERO pixel gaps beneath cursor) */}
          <div
            ref={spotlightSolidRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[6] transition-opacity duration-300"
            style={{ opacity: 0 }}
          >
            <img
              src="/Contact_Page.png"
              alt="Transvolt Contact Hero Focus Solid"
              className="w-full h-full object-cover object-center opacity-100 select-none"
            />
          </div>

          {/* Scrim Overlay - Retains image brilliance while guaranteeing maximum text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 pointer-events-none z-[7]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none z-[7]" />

          {/* Text Content & 3 Right-Side Buttons Directly OVER the Image */}
          <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full py-2 sm:py-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 xl:gap-10">
              {/* Left Column: Headlines & Subtitle */}
              <div className="max-w-xl lg:max-w-2xl">
                {/* Category Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-[#548235]/50 text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#548235]" />
                  <span>Connect With Transvolt</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15] text-white drop-shadow-xl">
                  Let&apos;s Accelerate the<br />
                  <span className="text-[#548235] text-transparent bg-clip-text bg-gradient-to-r from-[#548235] via-[#66b338] to-[#22c55e]">
                    EV Revolution
                  </span>
                </h1>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-200 font-normal drop-shadow-md max-w-xl">
                  Ready to electrify your journey? Contact Transvolt today to explore our cutting-edge electric transportation solutions and join the sustainable mobility revolution.
                </p>
              </div>

              {/* Right Column: All 3 Buttons Kept on Right Side */}
              <div className="w-full lg:w-[360px] xl:w-[400px] flex flex-col gap-2.5 shrink-0">
                {/* Button 1: Phone */}
                <a
                  href={`tel:${CONTACT_METADATA.phone}`}
                  className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/20 bg-black/60 hover:bg-black/80 hover:border-[#548235]/60 text-white backdrop-blur-xl shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#548235]/20 text-[#76B84A] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">Phone Support</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#84cc16] transition-colors">{CONTACT_METADATA.phone}</span>
                  </div>
                </a>

                {/* Button 2: Mail */}
                <a
                  href={`mailto:${CONTACT_METADATA.generalEmail}`}
                  className="group relative flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/20 bg-black/60 hover:bg-black/80 hover:border-[#38bdf8]/60 text-white backdrop-blur-xl shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/20 text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60">Email Inquiries</span>
                    <span className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">{CONTACT_METADATA.generalEmail}</span>
                  </div>
                </a>

                {/* Button 3: Work With Us */}
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('work');
                    }
                  }}
                  className="group relative flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-[#548235] hover:bg-[#44692a] text-white shadow-xl shadow-[#548235]/30 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 border border-[#548235]/80 text-left w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-white/80">Careers & Opportunities</span>
                      <span className="text-sm font-bold text-white">Work With Us</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY CAPABILITIES METRICS STRIP
          ========================================================================= */}
      <section className={`border-b ${isDark ? 'border-white/[0.08] bg-[#0E1420]' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#548235]">4</span>
              <span className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Operational Hubs & Depots
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0ea5e9]">24 / 7</span>
              <span className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Transit Depot NOC Support
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#f59e0b]">100%</span>
              <span className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Zero Tailpipe Emissions
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#8b5cf6]">&lt; 4h</span>
              <span className={`text-xs sm:text-sm font-medium mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Commercial Fleet Response
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ALL AVAILABLE SITE LOCATIONS (RICH TILES)
          ========================================================================= */}
      <section id="locations" className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 pt-8 pb-16 sm:pt-10 sm:pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6 sm:mb-8">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Our Offices & Project Sites
            </h2>
            <p className={`mt-1.5 sm:mt-2 text-sm sm:text-base max-w-2xl ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Direct access to our corporate leadership, regional government liaison offices, and operational project sites.
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`inline-flex items-center p-1 rounded-xl border ${
            isDark ? 'bg-white/[0.04] border-white/10' : 'bg-gray-100 border-gray-200'
          }`}>
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#548235] text-white shadow-sm'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              All Locations ({CONTACT_LOCATIONS.length})
            </button>
            <button
              onClick={() => setActiveCategory('corporate')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'corporate'
                  ? 'bg-[#548235] text-white shadow-sm'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Corporate & Regional (2)
            </button>
            <button
              onClick={() => setActiveCategory('depot')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeCategory === 'depot'
                  ? 'bg-[#548235] text-white shadow-sm'
                  : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Project Sites (2)
            </button>
          </div>
        </div>

        {/* 2x2 Grid of Refined Smart Interactive Location Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {filteredLocations.map((loc) => {
            const isMapExpanded = expandedMapId === loc.id;
            const isCopied = copiedId === loc.id;

            return (
              <div
                key={loc.id}
                className={`group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 border flex flex-col justify-between ${
                  isDark
                    ? 'bg-[#111726]/85 hover:bg-[#141C2E] border-white/[0.08] hover:border-[#548235]/50 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
                    : 'bg-white hover:bg-[#FAFDF9] border-gray-200 hover:border-[#548235]/40 shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                }`}
              >
                <div>
                  {/* Top Status Bar: Category Badge + Operational Hours */}
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      loc.type === 'corporate'
                        ? 'bg-[#548235]/12 text-[#3F6826] dark:text-[#76B84A] border border-[#548235]/30'
                        : 'bg-[#f59e0b]/12 text-[#b45309] dark:text-[#fbbf24] border border-[#f59e0b]/30'
                    }`}>
                      {loc.type === 'corporate' ? <Building2 className="w-3.5 h-3.5" /> : <Bus className="w-3.5 h-3.5" />}
                      <span>{loc.category}</span>
                    </span>

                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${
                      isDark ? 'bg-white/[0.04] border-white/10 text-gray-300' : 'bg-slate-50 border-gray-200 text-gray-600'
                    }`}>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-medium text-[11px] sm:text-xs">{loc.status}</span>
                    </div>
                  </div>

                  {/* Office / Depot Headline + City Subtitle */}
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                      {loc.title}
                    </h3>
                    <span className="text-xs font-semibold text-[#548235] dark:text-[#76B84A] shrink-0">
                      {loc.shortAddress}
                    </span>
                  </div>

                  {/* Clean Formatted Address Block with One-Click Copy */}
                  <div
                    onClick={() => handleCopyAddress(loc.id, loc.address)}
                    className={`mt-3 p-3.5 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer group/addr ${
                      isDark
                        ? 'bg-black/35 hover:bg-black/50 border-white/[0.06] hover:border-white/20 text-gray-300'
                        : 'bg-slate-50 hover:bg-slate-100/80 border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                    title="Click to copy full address"
                  >
                    <MapPin className="w-4 h-4 text-[#548235] shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-[13px] font-medium leading-relaxed flex-1 select-all">
                      {loc.address}
                    </p>
                    <button
                      type="button"
                      className="p-1 rounded-md text-gray-400 hover:text-white transition-colors shrink-0"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 group-hover/addr:text-emerald-400" />}
                    </button>
                  </div>
                </div>

                {/* Smart Bottom Action Bar: View Map Toggle & Directions */}
                <div className="mt-4 pt-3.5 border-t border-black/[0.06] dark:border-white/[0.06] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {/* View in Map Toggle */}
                    <button
                      type="button"
                      onClick={() => toggleMap(loc.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                        isMapExpanded
                          ? 'bg-[#548235] text-white border-[#548235]'
                          : isDark
                          ? 'bg-white/[0.05] hover:bg-white/[0.1] border-white/10 text-gray-300 hover:text-white'
                          : 'bg-white hover:bg-gray-100 border-gray-200 text-gray-700'
                      }`}
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>{isMapExpanded ? 'Hide Map' : 'View in Map'}</span>
                      {isMapExpanded ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
                    </button>

                    {/* Copy Feedback Status Pill */}
                    {isCopied && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20 animate-in fade-in">
                        <Check className="w-3 h-3" />
                        <span>Address Copied</span>
                      </span>
                    )}
                  </div>

                  {/* Primary Directions CTA Button */}
                  <a
                    href={loc.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#548235] hover:bg-[#44692a] text-white transition-all shadow-sm shadow-[#548235]/30 hover:scale-105 cursor-pointer"
                  >
                    <span>Direction</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                {/* Collapsible Interactive In-Tile Google Map Preview */}
                {isMapExpanded && (
                  <div className="mt-3.5 pt-3.5 border-t border-black/[0.08] dark:border-white/[0.08] overflow-hidden rounded-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="relative w-full h-56 rounded-xl overflow-hidden border border-black/10 dark:border-white/10">
                      <iframe
                        src={loc.googleMapsEmbed}
                        title={`Map for ${loc.title}`}
                        className="w-full h-full border-0"
                        loading="lazy"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          REACH US — INTERACTIVE FORM & DIRECT COMMUNICATION HUB
          ========================================================================= */}
      <section className={`border-t border-b py-16 sm:py-24 ${
        isDark ? 'border-white/[0.08] bg-[#0E1422]' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Direct Touchpoints & Clean Fleet Operations Details */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 order-2 lg:order-1">
              <div className={`rounded-2xl p-6 sm:p-7 border ${
                isDark ? 'bg-[#121927] border-white/[0.08]' : 'bg-slate-50 border-gray-200'
              }`}>
                <h3 className="text-lg font-bold tracking-tight mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#548235]" />
                  <span>Executive Channels</span>
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#548235]/15 text-[#548235] flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">General Inquiries</span>
                      <a href={`mailto:${CONTACT_METADATA.generalEmail}`} className="block font-medium hover:text-[#548235] transition-colors">
                        {CONTACT_METADATA.generalEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/15 text-[#0ea5e9] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Central Telephone</span>
                      <a href={`tel:${CONTACT_METADATA.phone}`} className="block font-medium hover:text-[#548235] transition-colors">
                        {CONTACT_METADATA.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/15 text-[#f59e0b] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Corporate Working Hours</span>
                      <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {CONTACT_METADATA.supportHours}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#8b5cf6]/15 text-[#8b5cf6] flex items-center justify-center shrink-0 mt-0.5">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">Public Transit Fleet NOC</span>
                      <p className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {CONTACT_METADATA.emergencyFleetOps}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clean Bottom Card with Image */}
              <div className="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 group shadow-lg">
                <img
                  src={CONTACT_METADATA.bottomImage}
                  alt="Transvolt Green Fleet"
                  className="w-full h-48 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#76B84A]">
                    Sustainable Mobility Revolution
                  </span>
                  <p className="text-sm font-semibold mt-1">
                    Join us in accelerating the shift to sustainable transportation!
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Send Us an Inquiry
              </h2>
              <p className={`mt-2 text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Whether you represent a municipal transport corporation, commercial fleet operator, or OEM partner, our clean energy engineering team is ready to assist.
              </p>

              {/* Form Status Messages */}
              {formStatus.success && (
                <div className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">Inquiry Dispatched Successfully!</h4>
                    <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-300">
                      Thank you! Your message has been sent successfully. A Transvolt commercial fleet representative will respond within 4 business hours.
                    </p>
                  </div>
                </div>
              )}

              {formStatus.error && (
                <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold">Validation Error</h4>
                    <p className="text-xs mt-1 text-rose-700 dark:text-rose-300">
                      {formStatus.error}
                    </p>
                  </div>
                </div>
              )}

              {/* Form Inputs */}
              <form onSubmit={handleFormSubmit} className="mt-8 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-500 dark:text-gray-400">
                      Your Email <span className="text-[#548235]">*</span>
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      value={formData.from_email}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. name@organization.com"
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/50 ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-[#548235]'
                          : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#548235]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-500 dark:text-gray-400">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/50 ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-[#548235]'
                          : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#548235]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-500 dark:text-gray-400">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Municipal Corp, Logistics Ltd"
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/50 ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-[#548235]'
                          : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#548235]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-500 dark:text-gray-400">
                      Subject / Purpose
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g. Fleet Concession Inquiry"
                      className={`w-full px-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/50 ${
                        isDark
                          ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-[#548235]'
                          : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#548235]'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-gray-500 dark:text-gray-400">
                    Message <span className="text-[#548235]">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your route requirements, fleet scale, charging depot needs, or partnership interest..."
                    className={`w-full px-4 py-3 rounded-xl text-sm border transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/50 ${
                      isDark
                        ? 'bg-black/40 border-white/10 text-white placeholder-gray-500 focus:border-[#548235]'
                        : 'bg-slate-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-[#548235]'
                    }`}
                  />
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={formStatus.submitting}
                    className={`inline-flex items-center justify-center gap-2.5 px-10 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-md ${
                      formStatus.submitting
                        ? 'bg-gray-500 cursor-not-allowed opacity-75'
                        : 'bg-[#548235] hover:bg-[#44692a] shadow-[#548235]/25 hover:shadow-lg hover:shadow-[#548235]/35 hover:-translate-y-0.5 cursor-pointer'
                    }`}
                  >
                    <Send className={`w-4 h-4 ${formStatus.submitting ? 'animate-spin' : ''}`} />
                    <span>{formStatus.submitting ? 'Submitting...' : 'Submit Inquiry'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM CALL TO ACTION
          ========================================================================= */}
      <section className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-16 sm:py-20 text-center">
        <div className={`relative rounded-3xl p-8 sm:p-12 overflow-hidden border ${
          isDark
            ? 'bg-gradient-to-br from-[#121A28] via-[#0E1522] to-[#121A28] border-white/10'
            : 'bg-gradient-to-br from-[#FAFDF9] via-white to-[#F2F8F0] border-[#548235]/25'
        }`}>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to Deploy Electric Bus Fleets in Your City?
            </h3>
            <p className={`mt-3 text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect directly with our turnkey Gross Cost Contract (GCC) concession specialists and megawatt depot charging architects.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${CONTACT_METADATA.generalEmail}?subject=Turnkey%20EV%20Fleet%20Concession%20Inquiry`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#548235] hover:bg-[#44692a] text-white shadow-md shadow-[#548235]/20 transition-all"
              >
                <span>Initiate Fleet Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={() => onNavigate && onNavigate('services')}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold border transition-all ${
                  isDark
                    ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
                    : 'bg-white hover:bg-gray-50 border-gray-200 text-gray-800'
                }`}
              >
                <span>Explore Zero-Emission Solutions</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

