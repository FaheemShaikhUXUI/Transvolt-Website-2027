import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { VenomContactButton } from './VenomContactButton';

export const Navbar = ({ onNavigate, isDarkBg = false, activePage = 'home', introStage = 4 }) => {
  const { isDark, toggleTheme } = useTheme();
  const [autoDark, setAutoDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    const handleScroll = (e) => {
      const target = e?.target;
      let scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      if (target && target.scrollTop !== undefined) {
        scrollTop = Math.max(scrollTop, target.scrollTop);
      }
      setIsScrolled(scrollTop > 15);
    };

    window.addEventListener('scroll', handleScroll, { capture: true, passive: true });

    const checkElementIsDark = (el) => {
      if (!el || el.closest('header')) return null;

      // 1. Explicit light / dark markup
      if (el.closest('[data-bg="light"]')) return false;
      if (el.closest('[data-bg="dark"], [data-theme="dark"]')) return true;

      // 2. Class check & ancestor style scan
      let cur = el;
      while (cur && cur !== document.body && cur !== document.documentElement) {
        const cls = cur.className || '';
        if (typeof cls === 'string') {
          if (
            cls.includes('bg-black') ||
            cls.includes('bg-[#0A0E17]') ||
            cls.includes('bg-[#0D1525]') ||
            cls.includes('bg-[#0B1120]') ||
            cls.includes('bg-neutral-900') ||
            cls.includes('bg-neutral-950') ||
            cls.includes('bg-slate-900') ||
            cls.includes('bg-slate-950') ||
            cls.includes('from-black')
          ) {
            return true;
          }
        }

        const style = window.getComputedStyle(cur);
        const bg = style.backgroundColor;
        if (bg && bg !== 'transparent' && !bg.startsWith('rgba(0, 0, 0, 0)')) {
          const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
          if (match) {
            const r = parseInt(match[1], 10);
            const g = parseInt(match[2], 10);
            const b = parseInt(match[3], 10);
            const a = match[4] !== undefined ? parseFloat(match[4]) : 1;
            if (a > 0.25) {
              const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
              return luminance < 140;
            }
          }
        }

        cur = cur.parentElement;
      }
      return null;
    };

    const detectDarkBg = () => {
      // If props or dark theme already dictate dark, skip heavy inspection
      if (isDark || isDarkBg) {
        setAutoDark(true);
        return;
      }

      // 1. Position & scroll check for pages with known top dark hero banner
      const scrollEl = document.querySelector('.no-scrollbar') || document.querySelector('.overflow-y-auto');
      const st = scrollEl ? scrollEl.scrollTop : (window.scrollY || document.documentElement.scrollTop || 0);

      if (activePage === 'news' || activePage === 'governance' || activePage === 'contact' || activePage === 'work' || activePage === 'careers' || activePage === 'life') {
        // Hero banner height is ~340-380px; while scrolled in top 300px, it is definitely dark
        if (st < 300) {
          setAutoDark(true);
          return;
        }
      }

      // 2. Multi-point DOM sampling (Logo left, Contact Us button right)
      const points = [];
      if (logoRef.current) {
        const rect = logoRef.current.getBoundingClientRect();
        points.push({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        points.push({ x: 80, y: 36 });
      }

      const btn = document.getElementById('nav-btn-contact');
      if (btn) {
        const rect = btn.getBoundingClientRect();
        points.push({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      } else {
        points.push({ x: window.innerWidth - 120, y: 36 });
      }

      let detected = false;
      for (const pt of points) {
        const elements = document.elementsFromPoint(pt.x, pt.y) || [];
        for (const el of elements) {
          const res = checkElementIsDark(el);
          if (res === true) {
            detected = true;
            break;
          } else if (res === false) {
            break;
          }
        }
        if (detected) break;
      }

      setAutoDark(detected);
    };

    detectDarkBg();
    const interval = setInterval(detectDarkBg, 150);
    window.addEventListener('scroll', detectDarkBg, { capture: true, passive: true });
    window.addEventListener('resize', detectDarkBg, { passive: true });
    window.addEventListener('wheel', detectDarkBg, { capture: true, passive: true });
    window.addEventListener('touchmove', detectDarkBg, { capture: true, passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('scroll', detectDarkBg, { capture: true });
      window.removeEventListener('resize', detectDarkBg);
      window.removeEventListener('wheel', detectDarkBg, { capture: true });
      window.removeEventListener('touchmove', detectDarkBg, { capture: true });
    };
  }, [activePage, isDark, isDarkBg]);

  // Logo automatically detects underlying content luminosity (e.g. over dark images)
  const effectiveIsDark = isDark || isDarkBg || autoDark;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 py-6 pointer-events-none transition-all duration-700 ease-out transform ${
        introStage >= 1
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Pure Background Blur Without Any Fill Color (Completely Transparent Fill) */}
      <div
        className={`absolute inset-x-0 top-0 h-[88px] sm:h-[98px] pointer-events-none transition-opacity duration-300 ease-out ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'transparent',
          backgroundColor: 'transparent',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
        }}
      />
      <div className="w-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 flex items-center justify-between">
        {/* Brand Logo - Perfectly aligned with left content, automatically adapts to dark backgrounds */}
        <div ref={logoRef} className="pointer-events-auto">
          <button
            onClick={() => onNavigate && onNavigate(0)}
            className="inline-block group focus:outline-none cursor-pointer"
            aria-label="Transvolt Mobility"
          >
            <div className="relative h-7 sm:h-8 flex items-center">
              {/* Black Logo (for Light Backgrounds) */}
              <img
                src="/logo_black.svg"
                alt="Transvolt Logo"
                className={`h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 group-hover:scale-105 ${
                  effectiveIsDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />
              {/* White Logo (for Dark Backgrounds - Automatically Enabled) */}
              <img
                src="/logo_white.svg"
                alt="Transvolt Logo"
                className={`absolute left-0 top-0 h-7 sm:h-8 w-auto object-contain transition-opacity duration-300 group-hover:scale-105 ${
                  effectiveIsDark ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Right Action Group: Contact Us on Left, Theme Toggle on Right (Flush right-aligned with cards below) */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Sticky Venom Contact Button from Portfolio V3 */}
          <VenomContactButton
            onClick={() => onNavigate && onNavigate('contact')}
            onPlugConnect={() => onNavigate && onNavigate('contact-qr')}
            label="Contact Us"
            isDarkBg={effectiveIsDark}
            hidePlug={activePage === 'contact' || activePage === 'contact-qr' || introStage < 1}
          />

          {/* Super Glassmorphism Theme Toggle Button */}
          <button
            onClick={(e) => toggleTheme(e)}
            aria-label={isDark ? 'Switch to White Theme' : 'Switch to Black Theme'}
            title={isDark ? 'Switch to White Theme' : 'Switch to Black Theme'}
            className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-2xl ${
              effectiveIsDark
                ? 'bg-white/[0.08] border border-white/30 hover:border-white/50 shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.5),inset_0_-1.5px_2px_rgba(0,0,0,0.5),0_8px_24px_rgba(0,0,0,0.5)]'
                : 'bg-white/40 border border-white/80 hover:border-white shadow-[inset_0_1.5px_2.5px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]'
            }`}
          >
            {/* Reactive Inner Glass Glow Refraction */}
            <div
              className={`absolute inset-0.5 rounded-full pointer-events-none blur-xs transition-opacity duration-300 ${
                effectiveIsDark ? 'bg-white/[0.12] opacity-80' : 'bg-slate-400/[0.14] opacity-70'
              }`}
            />

            {isDark ? (
              /* Solid Sun Icon in White with Ethereal White Glass Glow */
              <Sun className="relative z-10 w-4 h-4 text-white fill-white stroke-[2.2] drop-shadow-[0_0_6px_rgba(255,255,255,0.95)] drop-shadow-[0_0_12px_rgba(255,255,255,0.45)] transition-transform duration-300 group-hover:rotate-45" />
            ) : (
              /* Solid Moon Icon: White with glow over dark bg, Black over light bg */
              <Moon className={`relative z-10 w-4 h-4 transition-transform duration-300 group-hover:-rotate-12 ${
                effectiveIsDark
                  ? 'text-white fill-white stroke-[1.8] drop-shadow-[0_0_6px_rgba(255,255,255,0.85)]'
                  : 'text-black fill-black stroke-[1.8] drop-shadow-[0_0_5px_rgba(0,0,0,0.35)] drop-shadow-[0_0_10px_rgba(100,116,139,0.30)]'
              }`} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
