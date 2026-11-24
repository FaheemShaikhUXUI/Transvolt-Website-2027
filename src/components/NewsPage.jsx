import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Share2,
  Check,
  Building2,
  TrendingUp,
  LayoutGrid,
  GitCommit,
  ListFilter,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  ShieldCheck,
  FileText,
  Clock,
  Layers,
  Award,
  Globe,
  Quote,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { newsBannerImage, newsArticles } from '../data/newsData';

export const NewsPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [archiveSearch, setArchiveSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArticleId, setSelectedArticleId] = useState(newsArticles[0].id);
  const [copiedId, setCopiedId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  // Grouped Categories for clean UX
  const categories = [
    'All',
    'Strategic Financing',
    'Municipal Concession',
    'Global Institutional Equity',
    'Port Infrastructure',
    'Corporate & Tech Mobility',
    'ESG & Sustainability',
  ];

  // Filtered Articles based on Search and Category
  const filteredArticles = useMemo(() => {
    return newsArticles.filter((article) => {
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        q === '' ||
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        (article.date && article.date.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategory === 'All' ||
        (selectedCategory === 'Strategic Financing' &&
          (article.category === 'Strategic Financing' ||
            article.category === 'Green Bonds' ||
            article.category === 'Strategic Mandate')) ||
        (selectedCategory === 'Municipal Concession' &&
          (article.category === 'Municipal Concession' ||
            article.category === 'Public Transportation')) ||
        (selectedCategory === 'Global Institutional Equity' &&
          (article.category === 'Global Institutional Equity' ||
            article.category === 'World Bank Group Investment')) ||
        (selectedCategory === 'Port Infrastructure' &&
          (article.category === 'Port Infrastructure' ||
            article.category === 'First & Last Mile')) ||
        (selectedCategory === 'Corporate & Tech Mobility' &&
          (article.category === 'Corporate & Tech Mobility' ||
            article.category === 'Airport Transit')) ||
        (selectedCategory === 'ESG & Sustainability' &&
          article.category === 'ESG & Sustainability') ||
        article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Archive list filtered by its dedicated search input
  const archiveArticles = useMemo(() => {
    const q = archiveSearch.trim().toLowerCase();
    if (!q) return newsArticles;
    return newsArticles.filter((article) => {
      return (
        article.title.toLowerCase().includes(q) ||
        article.category.toLowerCase().includes(q) ||
        (article.date && article.date.toLowerCase().includes(q)) ||
        (article.summary && article.summary.toLowerCase().includes(q))
      );
    });
  }, [archiveSearch]);

  // Current Active Article in Left 70% Viewer
  const currentArticle = useMemo(() => {
    return (
      newsArticles.find((a) => a.id === selectedArticleId) ||
      filteredArticles[0] ||
      newsArticles[0]
    );
  }, [selectedArticleId, filteredArticles]);

  const currentIndex = useMemo(() => {
    return newsArticles.findIndex((a) => a.id === currentArticle.id);
  }, [currentArticle]);

  // Cycle to Previous News
  const handlePrevArticle = useCallback(() => {
    setSelectedArticleId((prevId) => {
      const idx = newsArticles.findIndex((a) => a.id === prevId);
      if (idx <= 0) {
        return newsArticles[newsArticles.length - 1]?.id || prevId;
      }
      return newsArticles[idx - 1].id;
    });
    setProgress(0);
  }, []);

  // Cycle to Next News
  const handleNextArticle = useCallback(() => {
    setSelectedArticleId((prevId) => {
      const idx = newsArticles.findIndex((a) => a.id === prevId);
      if (idx < 0 || idx >= newsArticles.length - 1) {
        return newsArticles[0]?.id || prevId;
      }
      return newsArticles[idx + 1].id;
    });
    setProgress(0);
  }, []);

  // Reset progress bar on manual story selection
  useEffect(() => {
    setProgress(0);
  }, [selectedArticleId]);

  // 7-second auto-play timer with smooth progress bar
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = 50;
    const totalDurationMs = 7000;
    const step = (intervalMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextArticle();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, handleNextArticle]);

  const contentScrollRef = useRef(null);
  const activeItemRef = useRef(null);

  // Smooth auto-scroll for active archive item & scroll-to-top on big tile content
  useEffect(() => {
    contentScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    activeItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [selectedArticleId]);

  // Category Carousel Scrolling & Edge State
  const categoryScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkCategoryScroll = useCallback(() => {
    const el = categoryScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    checkCategoryScroll();
    const el = categoryScrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkCategoryScroll, { passive: true });
    window.addEventListener('resize', checkCategoryScroll);
    return () => {
      el.removeEventListener('scroll', checkCategoryScroll);
      window.removeEventListener('resize', checkCategoryScroll);
    };
  }, [checkCategoryScroll]);

  const handleScrollCategories = (direction) => {
    const el = categoryScrollRef.current;
    if (!el) return;
    const distance = direction === 'left' ? -220 : 220;
    el.scrollBy({ left: distance, behavior: 'smooth' });
  };

  const handleShare = (e, article) => {
    e.stopPropagation();
    const url = `${window.location.origin}?page=news#${article.id}`;
    navigator.clipboard?.writeText(url);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
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

          // 2. Solid No-Gap Merged Core Radius: 120px (90% merging near cursor -> 0% at 120px edge)
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

  return (
    <div
      className={`w-full min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0A0E17] text-white' : 'bg-[#F8FAFC] text-[#0F172A]'
      }`}
    >
      {/* =========================================================================
          FULL-WIDTH CINEMATIC HERO SECTION
          ========================================================================= */}
      <section data-bg="dark" className="relative w-full overflow-hidden border-b border-black/[0.06] dark:border-white/[0.08]">
        {/* Full-Width Image Banner with Text Overlay (100% black on backside, 75% opacity image) */}
        <div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          data-bg="dark"
          className="relative w-full min-h-[300px] sm:min-h-[340px] lg:min-h-[380px] pt-24 pb-10 sm:pt-28 sm:pb-12 flex items-center bg-black overflow-hidden"
        >
          {/* 100% Black Base Canvas */}
          {/* Base Image: rendered strictly INSIDE the 2px square dots at 100% opacity with 0.5px gap */}
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
              src="/Neon_Holographic_Smart_Cityscape.png"
              alt="Neon Holographic Smart Cityscape"
              className="w-full h-full object-cover object-bottom opacity-100 grayscale select-none"
            />
          </div>

          {/* Tier 2: 600px Radius Color Pixel Grid Layer (2px pixel + 0.5px gap, in full natural color) */}
          <div
            ref={spotlightColorRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-[5] transition-opacity duration-300"
            style={{
              opacity: 0,
            }}
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
                src="/Neon_Holographic_Smart_Cityscape.png"
                alt="Neon Holographic Smart Cityscape Color Grid"
                className="w-full h-full object-cover object-bottom opacity-100 select-none"
              />
            </div>
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
              src="/Neon_Holographic_Smart_Cityscape.png"
              alt="Neon Holographic Smart Cityscape Solid"
              className="w-full h-full object-cover object-bottom opacity-100 select-none"
            />
          </div>

          {/* Scrim Overlay - Retains image brilliance while guaranteeing maximum text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent pointer-events-none z-[7]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none z-[7]" />

          {/* Text Content Directly OVER the Image */}
          <div className="relative z-10 max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 w-full">
            <div className="max-w-2xl lg:max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 border border-[#548235]/50 text-[#548235] dark:text-[#76B84A] text-xs font-semibold tracking-wider uppercase mb-3 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#548235] animate-pulse" />
                <span>Media &amp; Intelligence Room</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] drop-shadow-xl">
                Headlines Shaping India&apos;s EV Future
              </h1>

              <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm lg:text-[15px] leading-relaxed text-gray-200 font-normal drop-shadow-md max-w-2xl">
                Institutional partnerships, municipal gross cost contract concessions, global equity infusions, and operational breakthroughs powering zero-emission transport at scale.
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          NEWS COCKPIT: 70% NEWS VIEWER + 30% ARCHIVE TIMELINE
          ========================================================================= */}
      <section data-bg={isDark ? 'dark' : 'light'} className="relative w-full py-6 sm:py-8">
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 space-y-4 sm:space-y-6">
          {/* Header Row: Headline "Our latest News" on Left & 7 Topic Tiles on Right Top-Aligned */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="shrink-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235]">
                Our latest News
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                Official press releases, strategic financing facilities, and municipal concession milestones.
              </p>
            </div>

            {/* Category Carousel with Left/Right Arrows & Edge Gradient Fades (No Native Scrollbar) */}
            <div className="relative flex items-center lg:ml-auto self-start max-w-full overflow-hidden shrink min-w-0 py-0.5">
              {/* Left Arrow Button */}
              {canScrollLeft && (
                <button
                  onClick={() => handleScrollCategories('left')}
                  className={`p-1.5 rounded-full border transition-all shrink-0 mr-1.5 cursor-pointer z-20 ${
                    isDark
                      ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 shadow-xs'
                  }`}
                  title="Scroll Categories Left"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
              )}

              {/* Left Gradient Fade Mask */}
              {canScrollLeft && (
                <div
                  className={`absolute left-7 top-0 bottom-0 w-8 pointer-events-none z-10 ${
                    isDark
                      ? 'bg-gradient-to-r from-[#0A0E17] to-transparent'
                      : 'bg-gradient-to-r from-[#F8FAFC] to-transparent'
                  }`}
                />
              )}

              {/* Scrollable Track with overflow-x-hidden (No visible scrollbar) */}
              <div
                ref={categoryScrollRef}
                className="flex items-center gap-1.5 overflow-x-hidden scroll-smooth py-0.5"
              >
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        const matched = newsArticles.find((a) => {
                          if (cat === 'All') return true;
                          return a.category.toLowerCase().includes(cat.toLowerCase());
                        });
                        if (matched) setSelectedArticleId(matched.id);
                      }}
                      className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all border cursor-pointer shrink-0 ${
                        isActive
                          ? 'bg-[#548235] text-white border-[#548235] shadow-sm'
                          : isDark
                          ? 'bg-white/[0.04] text-gray-300 border-white/[0.08] hover:border-white/20 hover:text-white'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 shadow-xs'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Right Gradient Fade Mask */}
              {canScrollRight && (
                <div
                  className={`absolute right-7 top-0 bottom-0 w-12 pointer-events-none z-10 ${
                    isDark
                      ? 'bg-gradient-to-l from-[#0A0E17] via-[#0A0E17]/80 to-transparent'
                      : 'bg-gradient-to-l from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent'
                  }`}
                />
              )}

              {/* Right Arrow Button */}
              {canScrollRight && (
                <button
                  onClick={() => handleScrollCategories('right')}
                  className={`p-1.5 rounded-full border transition-all shrink-0 ml-1.5 cursor-pointer z-20 ${
                    isDark
                      ? 'bg-white/10 text-white border-white/20 hover:bg-white/20 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100 shadow-xs'
                  }`}
                  title="Scroll Categories Right"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Two-Column Cockpit: Left 70% Big Tile (News Viewer) + Right 30% Archive Timeline List */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch pt-2">
            {/* Left Side: Big Tile News Viewer (70% width) - Fixed Height & Dimensions for all news */}
            <div
              className={`w-full lg:w-[70%] h-[740px] flex flex-col rounded-3xl border overflow-hidden shadow-xl transition-all duration-300 ${
                isDark
                  ? 'bg-[#111726]/90 border-white/10 shadow-black/50'
                  : 'bg-white border-gray-200/90 shadow-slate-200/60'
              }`}
            >
              {/* Image Section on Top (Full Image in center filling height, blurred 60% opacity background over 100% black) */}
              <div className="relative h-[285px] sm:h-[318px] lg:h-[336px] w-full shrink-0 overflow-hidden bg-black">
                {/* 100% Complete Black Background with Same Image Softly Blurred at 60% Opacity */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`blur-${currentArticle.id}`}
                    src={currentArticle.images?.[0]?.src}
                    alt=""
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover blur-md scale-105 pointer-events-none select-none"
                  />
                </AnimatePresence>

                {/* Centered Full Image Filling Height with Intact Aspect Ratio */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`main-${currentArticle.id}`}
                      src={currentArticle.images?.[0]?.src}
                      alt={currentArticle.images?.[0]?.alt || currentArticle.title}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="h-full w-auto max-w-full object-contain object-center drop-shadow-2xl select-none"
                    />
                  </AnimatePresence>
                </div>

                {/* Soft Edge Scrim to enhance frosted glass legibility without darkening */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />

                {/* Floating Badges over Image (Frosted Transparent BG Blur) */}
                <div className="absolute z-20 top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#76B84A] border border-white/20 text-xs font-bold shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#548235]" />
                    <span>{currentArticle.category}</span>
                  </span>

                  {currentArticle.impactMetric && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 border border-white/20 text-xs font-bold shadow-lg">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{currentArticle.impactMetric}</span>
                    </span>
                  )}
                </div>

                {/* Bottom Controls Overlay over Image: Share on Left, 3 Buttons on Right (Frosted Transparent BG Blur) */}
                <div className="absolute z-20 bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs">
                  {/* Left Side: Share Button & Date */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShare(e, currentArticle)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/35 transition-all cursor-pointer shadow-lg"
                      title="Copy Link to Article"
                    >
                      {copiedId === currentArticle.id ? (
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

                    <span className="px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-md text-gray-200 font-mono text-[11px] flex items-center gap-1.5 border border-white/20 shadow-md">
                      <Calendar className="w-3 h-3 text-[#548235]" />
                      {currentArticle.date}
                    </span>
                  </div>

                  {/* Right Side: Story Index & 3 Action Buttons (<, Play/Pause, >) */}
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-md text-gray-200 text-[10.5px] font-medium border border-white/20 shadow-md hidden sm:inline-block">
                      Story #{currentIndex + 1} of {newsArticles.length}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {/* Left Arrow Button */}
                      <button
                        onClick={handlePrevArticle}
                        className="p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/35 transition-colors cursor-pointer shadow-lg"
                        title="Previous Release"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      {/* Play-Pause Button */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className={`p-1.5 rounded-xl border transition-colors cursor-pointer shadow-lg ${
                          isPlaying
                            ? 'bg-[#548235]/80 backdrop-blur-md text-white border-[#548235]/60'
                            : 'bg-white/10 backdrop-blur-md text-white border-white/20 hover:bg-white/20 hover:border-white/35'
                        }`}
                        title={isPlaying ? 'Pause 7s Auto-Play' : 'Resume 7s Auto-Play'}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </button>

                      {/* Right Arrow Button */}
                      <button
                        onClick={handleNextArticle}
                        className="p-1.5 rounded-xl bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white/20 hover:border-white/35 transition-colors cursor-pointer shadow-lg"
                        title="Next Release"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 7-Second Duration Progress Line at the very bottom edge of image area (High-Visibility Vibrant Neon Green with Glow) */}
                <div className="absolute z-30 bottom-0 left-0 right-0 h-[1px] bg-black/40 backdrop-blur-xs overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#16a34a] via-[#22c55e] to-[#4ade80] shadow-[0_0_8px_#22c55e] transition-[width] duration-75 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Content Section Below Image (Scrollable inside fixed height container with soft upward float transition) */}
              <div
                ref={contentScrollRef}
                className="flex-1 overflow-y-auto p-5 sm:p-6"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentArticle.id}
                    initial={{ opacity: 0, y: 26 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4 sm:space-y-5"
                  >
                    {/* Article Headline */}
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-snug text-gray-900 dark:text-white">
                      {currentArticle.title}
                    </h3>

                    {/* Lead Summary Box */}
                    <div
                      className={`p-3.5 sm:p-4 rounded-xl border-l-4 border-[#548235] ${
                        isDark ? 'bg-white/[0.03] text-gray-200' : 'bg-emerald-50/60 text-gray-800'
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {currentArticle.summary}
                      </p>
                    </div>

                    {/* Executive Quote Card (if available) */}
                    {currentArticle.quote && (
                      <div
                        className={`p-4 rounded-xl border ${
                          isDark
                            ? 'bg-black/30 border-white/10 text-gray-300'
                            : 'bg-white border-gray-200 text-gray-700 shadow-xs'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Quote className="w-4 h-4 text-[#548235] shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs italic leading-relaxed font-serif">
                              &ldquo;{currentArticle.quote.text}&rdquo;
                            </p>
                            <div className="mt-1.5 text-xs font-bold text-[#548235] dark:text-[#76B84A]">
                              — {currentArticle.quote.author},{' '}
                              <span className="font-normal text-gray-400">
                                {currentArticle.quote.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Full Article Content */}
                    <div
                      className={`space-y-3.5 text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      {currentArticle.content.split('\n\n').map((paragraph, idx) => {
                        if (paragraph.startsWith('•') || paragraph.includes('\n•')) {
                          const items = paragraph.split('\n');
                          return (
                            <ul key={idx} className="space-y-1.5 my-2.5 pl-2">
                              {items.map((line, lIdx) => (
                                <li key={lIdx} className="flex items-start gap-2">
                                  <span className="text-[#548235] font-bold text-sm leading-none mt-0.5">•</span>
                                  <span>{line.replace(/^•\s*/, '')}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        }
                        return (
                          <p key={idx} className="leading-relaxed">
                            {paragraph}
                          </p>
                        );
                      })}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Side: Archive Timeline List (30% width) - On Air Style with No Frame */}
            <div className="relative w-full lg:w-[30%] h-[740px] flex flex-col transition-all duration-300 overflow-hidden">
              {/* Gradual Blur Mask Backdrop: 100% Blur & Opacity at Top, Smoothly Fading to 0% at Bottom with Zero Edge Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-28 pointer-events-none z-10 [mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_35%,transparent_100%)] backdrop-blur-md transition-colors ${
                  isDark
                    ? 'bg-gradient-to-b from-[#0A0E17] via-[#0A0E17]/80 to-transparent'
                    : 'bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC]/80 to-transparent'
                }`}
              />

              {/* Floating Header Content: Archive Title & Search Bar (100% Sharp, Clickable, Z-20) */}
              <div className="absolute top-0 left-0 right-0 z-20 pt-1 pb-3 px-1 flex items-center justify-between gap-3 pointer-events-auto">
                <div className="flex items-center gap-2 shrink-0">
                  <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    Archived
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#548235]/15 text-[#548235] dark:text-[#76B84A] border border-[#548235]/30">
                    {archiveArticles.length}
                  </span>
                </div>

                {/* Inline Search Bar Without Frame */}
                <div className="relative flex-1 max-w-[180px] sm:max-w-[210px]">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                  <input
                    type="text"
                    value={archiveSearch}
                    onChange={(e) => setArchiveSearch(e.target.value)}
                    placeholder="Search..."
                    className={`w-full pl-8 pr-7 py-1.5 rounded-full text-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#548235]/40 ${
                      isDark
                        ? 'bg-white/[0.08] border border-white/15 text-white placeholder-gray-400 focus:border-[#548235]'
                        : 'bg-white/90 border border-gray-200/90 text-gray-900 placeholder-gray-400 focus:border-[#548235] shadow-xs'
                    }`}
                  />
                  {archiveSearch && (
                    <button
                      onClick={() => setArchiveSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Scrollable Archive Timeline Body (Scrolls up underneath the header blur layer, starting naturally below header) */}
              <div className="flex-1 overflow-y-auto px-1 pt-14 pb-4 pr-1.5 scrollbar-thin">
                {archiveArticles.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xs text-gray-400">No releases match &ldquo;{archiveSearch}&rdquo;</p>
                    <button
                      onClick={() => setArchiveSearch('')}
                      className="mt-3 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#548235] text-white"
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    {archiveArticles.map((article, idx) => {
                      const isActive = article.id === currentArticle.id;
                      const activeIndex = archiveArticles.findIndex((a) => a.id === currentArticle.id);
                      const isCompleted = activeIndex !== -1 && idx < activeIndex;
                      return (
                        <div
                          key={article.id}
                          ref={isActive ? activeItemRef : null}
                          onClick={() => {
                            setSelectedArticleId(article.id);
                            setProgress(0);
                          }}
                          className="relative pl-8 sm:pl-9 mb-3 last:mb-0 cursor-pointer group"
                        >
                          {/* Top Line Segment (from top of row to dot center at vertical 50%) */}
                          <div
                            className={`absolute left-[15px] -translate-x-1/2 top-0 bottom-1/2 w-[2px] transition-colors duration-500 ${
                              isCompleted || isActive ? 'bg-[#548235]' : 'bg-gray-200 dark:bg-white/10'
                            }`}
                          />

                          {/* Bottom Line Segment (from dot center at vertical 50% across mb-3 gap to next card) */}
                          <div
                            className={`absolute left-[15px] -translate-x-1/2 top-1/2 -bottom-3 w-[2px] transition-colors duration-500 ${
                              isCompleted ? 'bg-[#548235]' : 'bg-gray-200 dark:bg-white/10'
                            } ${idx === archiveArticles.length - 1 ? 'hidden' : ''}`}
                          />

                          {/* Timeline Dot Centered Vertically at 50% directly in front of the tile */}
                          <div className="absolute left-[15px] -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                            {isActive && (
                              <motion.span
                                layoutId="timelineActiveRipple"
                                className="absolute w-6 h-6 rounded-full bg-[#548235]/30 animate-ping pointer-events-none"
                              />
                            )}
                            <div
                              className={`rounded-full transition-all duration-300 ${
                                isActive
                                  ? 'w-3.5 h-3.5 bg-[#548235] ring-4 ring-[#548235]/35 shadow-md shadow-[#548235]/40 scale-110'
                                  : isCompleted
                                  ? 'w-2.5 h-2.5 bg-[#548235]'
                                  : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 group-hover:bg-[#548235] group-hover:scale-125'
                              }`}
                            />
                          </div>

                          {/* Tab Card: Unselected is Frameless (only white on hover); Selected has Green Frame */}
                          <div
                            className={`p-3 sm:p-3.5 rounded-2xl transition-all duration-200 ${
                              isActive
                                ? isDark
                                  ? 'bg-[#111726] border-2 border-[#548235] shadow-lg shadow-[#548235]/15 ring-2 ring-[#548235]/25 translate-x-0.5'
                                  : 'bg-white border-2 border-[#548235] shadow-lg shadow-[#548235]/15 ring-2 ring-[#548235]/20 translate-x-0.5'
                                : isDark
                                ? 'border border-transparent hover:bg-white/[0.06] hover:shadow-xs'
                                : 'border border-transparent hover:bg-white hover:shadow-xs'
                            }`}
                          >
                            <div className="flex items-start gap-2.5">
                              {/* Mini Thumbnail */}
                              {article.images?.[0]?.src && (
                                <img
                                  src={article.images[0].src}
                                  alt={article.title}
                                  className={`w-12 h-12 rounded-lg object-cover shrink-0 border ${
                                    isActive
                                      ? 'border-[#548235]'
                                      : isDark
                                      ? 'border-white/10'
                                      : 'border-gray-200'
                                  }`}
                                />
                              )}

                              <div className="flex-1 min-w-0">
                                {/* Meta Tag: Date & Category */}
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span
                                    className={`text-[9.5px] font-mono font-bold ${
                                      isActive
                                        ? 'text-[#548235] dark:text-[#76B84A]'
                                        : 'text-gray-400'
                                    }`}
                                  >
                                    {article.date}
                                  </span>
                                  <span className="text-gray-300 dark:text-gray-600 text-[9.5px]">•</span>
                                  <span
                                    className={`text-[9px] font-semibold uppercase tracking-wider truncate max-w-[110px] ${
                                      isActive
                                        ? 'text-[#548235] dark:text-[#76B84A]'
                                        : 'text-gray-500 dark:text-gray-400'
                                    }`}
                                  >
                                    {article.category}
                                  </span>
                                </div>

                                {/* Title (2 lines clamp) */}
                                <h4
                                  className={`text-xs sm:text-[13px] font-bold line-clamp-2 leading-snug transition-colors ${
                                    isActive
                                      ? 'text-[#548235] dark:text-[#76B84A]'
                                      : isDark
                                      ? 'text-gray-200 group-hover:text-white'
                                      : 'text-gray-800 group-hover:text-gray-950'
                                  }`}
                                >
                                  {article.title}
                                </h4>

                                {/* Active Highlight Badge */}
                                {isActive && (
                                  <div className="mt-1.5 inline-flex items-center gap-1 text-[9.5px] font-bold text-[#548235] dark:text-[#76B84A]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#548235] animate-ping" />
                                    <span>Now Viewing</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};
