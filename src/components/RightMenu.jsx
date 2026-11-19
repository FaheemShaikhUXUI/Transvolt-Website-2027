import React, { useState, useEffect, useRef } from 'react';
import {
  Home,
  Layers,
  Info,
  Briefcase,
  Scale,
  Newspaper,
  HeartHandshake,
  Milestone,
  Award,
  Users,
  Mail,
  UserPlus,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const RightMenu = ({ activeMenuId = 'home', onNavigate, isDarkBg = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDark } = useTheme();
  const [autoDark, setAutoDark] = useState(false);
  const menuContainerRef = useRef(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, slideIndex: 0 },
    { id: 'home-v1', label: 'Home Page 1', icon: Layers },
    { id: 'about', label: 'About', icon: Info },
    { id: 'services', label: 'Services', icon: Briefcase },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'governance', label: 'Governance', icon: Scale },
    { id: 'life', label: 'Life in Transvolt', icon: HeartHandshake },
    { id: 'journey', label: 'Our journey', icon: Milestone },
    { id: 'first', label: 'Transvolt First', icon: Award },
    { id: 'contact', label: 'Contact Us', icon: Mail, slideIndex: 'footer' },
    { id: 'work', label: 'Work With us', icon: UserPlus },
  ];

  // Dynamic Background Darkness Detection for White Theme
  useEffect(() => {
    const detectDarkBg = () => {
      const x = window.innerWidth - 40;
      const rect = menuContainerRef.current?.getBoundingClientRect();
      const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
      const ySamplePoints = [
        Math.max(20, centerY - 140),
        centerY,
        Math.min(window.innerHeight - 20, centerY + 140),
      ];

      let isDarkDetected = false;

      for (const y of ySamplePoints) {
        const elements = document.elementsFromPoint(x, y) || [];
        let checkedBg = false;

        for (const el of elements) {
          if (menuContainerRef.current && (menuContainerRef.current === el || menuContainerRef.current.contains(el))) {
            continue;
          }

          // 1. Explicit light / dark attributes
          if (el.closest('[data-bg="light"]')) {
            isDarkDetected = false;
            checkedBg = true;
            break;
          }
          if (el.closest('[data-bg="dark"], [data-theme="dark"]')) {
            isDarkDetected = true;
            checkedBg = true;
            break;
          }

          // 2. Visual Media (Photos, Video, 3D Canvas) which in Transvolt are dark visual scenes
          const mediaEl = el.closest('img, video, canvas, [style*="background-image"]');
          if (mediaEl) {
            isDarkDetected = true;
            checkedBg = true;
            break;
          }

          // 3. Computed background color luminance
          let current = el;
          while (current && current !== document.body && current !== document.documentElement) {
            const style = window.getComputedStyle(current);
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
                  isDarkDetected = luminance < 145;
                  checkedBg = true;
                  break;
                }
              }
            }
            current = current.parentElement;
          }
          if (checkedBg) break;
        }

        if (isDarkDetected) break;
      }

      setAutoDark(isDarkDetected);
    };

    detectDarkBg();
    const interval = setInterval(detectDarkBg, 250);
    window.addEventListener('scroll', detectDarkBg, { passive: true, capture: true });
    window.addEventListener('resize', detectDarkBg, { passive: true });
    window.addEventListener('wheel', detectDarkBg, { passive: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', detectDarkBg, { capture: true });
      window.removeEventListener('resize', detectDarkBg);
      window.removeEventListener('wheel', detectDarkBg);
    };
  }, []);

  // For white theme only: whenever there is dark background, show white text
  const isDarkSurface = isDark || isDarkBg || autoDark;

  return (
    <div
      ref={menuContainerRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Outer ambient glow on open state */}
      {isOpen && (
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#548235]/25 rounded-full blur-3xl pointer-events-none" />
      )}

      {/* Menu Container: Completely touching right edge (right-0), flat right edge (rounded-r-none), scaled down 10% */}
      <div
        className={`relative transition-all duration-300 ease-out overflow-hidden shadow-2xl rounded-l-2xl sm:rounded-l-[28px] rounded-r-none p-[1.5px] border-l border-y border-r-0 ${
          isOpen
            ? 'w-[275px] sm:w-[298px] ' +
              (isDarkSurface
                ? 'border-white/20 bg-[#0B0F17]/85 text-white shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
                : 'border-white/60 bg-white/85 text-gray-900 shadow-xl')
            : 'w-[70px] sm:w-[75px] ' +
              (isDarkSurface ? 'bg-[#0B0F17]/75 text-white border-white/20 shadow-lg' : 'bg-gray-200/80 text-gray-900 border-black/10')
        } backdrop-blur-2xl cursor-pointer`}
      >
        {/* Running Green Beam Light from Metrics Tile - Flat on Right Edge (30% Opacity Only) */}
        {!isOpen && (
          <div
            className="absolute inset-0 rounded-l-2xl sm:rounded-l-[28px] rounded-r-none p-[1.5px] pointer-events-none overflow-hidden z-10 opacity-30"
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            <div
              className="absolute animate-border-beam pointer-events-none"
              style={{
                width: '850px',
                height: '850px',
                left: 'calc(50% - 425px)',
                top: 'calc(50% - 425px)',
                background:
                  'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, #548235 310deg, #22c55e 340deg, #86efac 360deg)',
              }}
            />
          </div>
        )}

        {/* Glassmorphic Inner Content */}
        <div
          className={`relative w-full h-full transition-all duration-300 rounded-l-[18px] sm:rounded-l-[24px] rounded-r-none py-5 sm:py-5.5 backdrop-blur-xl ${
            isOpen
              ? 'px-3.5 sm:px-4 ' +
                (isDarkSurface
                  ? 'bg-[#0E131E]/80 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
                  : 'bg-white/80 text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]')
              : 'pl-3 sm:pl-3.5 pr-7.5 sm:pr-8.5 ' +
                (isDarkSurface
                  ? 'bg-[#0E131E]/80 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]'
                  : 'bg-white/80 text-gray-800 shadow-[inset_0_1px_1px_rgba(255,255,255,0.95)]')
          }`}
        >
          {/* Menu Items List */}
          <div className={`flex flex-col space-y-2.5 ${isOpen ? 'items-stretch' : 'items-start'}`}>
            {menuItems.map((item) => {
              const isActive = item.id === activeMenuId;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate(item.id);
                    }
                  }}
                  className={`flex items-center gap-3.5 h-[38px] ${
                    isOpen ? 'w-full px-2' : 'w-auto px-0.5'
                  } text-left transition-all duration-200 rounded-xl group cursor-pointer ${
                    isActive
                      ? isOpen
                        ? isDarkSurface
                          ? 'text-[#72B347] font-semibold bg-white/15'
                          : 'text-[#548235] font-semibold bg-white/70 shadow-sm'
                        : 'text-[#548235] dark:text-[#72B347] bg-transparent shadow-none'
                      : isDarkSurface
                      ? 'text-white/90 hover:text-white hover:bg-white/15'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white/60'
                  }`}
                  title={item.label}
                >
                  {/* Icon box (30px) */}
                  <div
                    className={`w-[30px] h-[30px] shrink-0 rounded-lg flex items-center justify-center transition-all ${
                      isActive
                        ? 'bg-[#548235] text-white shadow-sm shadow-[#548235]/40'
                        : isDarkSurface
                        ? 'text-white/80 group-hover:text-white group-hover:bg-white/10'
                        : 'text-gray-500 group-hover:text-gray-900 group-hover:bg-white/40'
                    }`}
                  >
                    <Icon className="w-[17px] h-[17px] stroke-[2]" />
                  </div>

                  {/* Label (13px–13.5px) */}
                  {isOpen && (
                    <span
                      className={`text-[13px] sm:text-[13.5px] whitespace-nowrap tracking-wide transition-opacity duration-200 ${
                        isActive
                          ? 'font-bold text-[#548235] dark:text-[#72B347]'
                          : isDarkSurface
                          ? 'font-medium text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]'
                          : 'font-medium text-gray-800'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
