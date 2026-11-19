import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { flushSync, createPortal } from 'react-dom';

const ThemeContext = createContext({
  theme: 'white',
  isDark: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }) {
  // Default to 'white' (light mode)
  const [theme, setThemeState] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tv-v2-theme');
      if (saved === 'black' || saved === 'dark') return 'black';
      return 'white';
    }
    return 'white';
  });

  const [wave, setWave] = useState(null);
  const isTransitioningRef = useRef(false);

  const isDark = theme === 'black' || theme === 'dark';

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('tv-v2-theme', 'black');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('tv-v2-theme', 'white');
    }
  }, [isDark]);

  // Exact View-Transition Circular Gradient Theme Transition from Portal V4
  const toggleTheme = useCallback(
    (event) => {
      const targetTheme = isDark ? 'white' : 'black';

      if (isTransitioningRef.current) return;

      // Extract click origin coordinates
      let x = event?.clientX ?? event?.nativeEvent?.clientX ?? 0;
      let y = event?.clientY ?? event?.nativeEvent?.clientY ?? 0;

      if (!x || !y || x <= 0 || y <= 0) {
        const targetEl = event?.currentTarget || event?.target;
        if (targetEl?.getBoundingClientRect) {
          const rect = targetEl.getBoundingClientRect();
          x = rect.left + rect.width / 2;
          y = rect.top + rect.height / 2;
        } else {
          x = window.innerWidth - 80;
          y = 36;
        }
      }

      x = Math.round(x);
      y = Math.round(y);

      const w = window.innerWidth;
      const h = window.innerHeight;
      const endRadius = Math.hypot(Math.max(x, w - x), Math.max(y, h - y));
      const targetRadius = endRadius + 600;

      document.documentElement.style.setProperty('--theme-x', `${x}px`);
      document.documentElement.style.setProperty('--theme-y', `${y}px`);
      document.documentElement.style.setProperty('--mask-radius', '0px');

      let maskStyle = document.getElementById('theme-view-transition-coords');
      if (!maskStyle) {
        maskStyle = document.createElement('style');
        maskStyle.id = 'theme-view-transition-coords';
        document.head.appendChild(maskStyle);
      }
      maskStyle.textContent = `
        ::view-transition-new(root) {
          -webkit-mask-image: radial-gradient(
            circle at ${x}px ${y}px,
            #000 0%,
            #000 calc(var(--mask-radius, 0px) - 520px),
            rgba(0, 0, 0, 0.94) calc(var(--mask-radius, 0px) - 420px),
            rgba(0, 0, 0, 0.80) calc(var(--mask-radius, 0px) - 320px),
            rgba(0, 0, 0, 0.60) calc(var(--mask-radius, 0px) - 220px),
            rgba(0, 0, 0, 0.38) calc(var(--mask-radius, 0px) - 140px),
            rgba(0, 0, 0, 0.18) calc(var(--mask-radius, 0px) - 70px),
            rgba(0, 0, 0, 0.04) calc(var(--mask-radius, 0px) - 20px),
            transparent var(--mask-radius, 0px)
          ) !important;
          mask-image: radial-gradient(
            circle at ${x}px ${y}px,
            #000 0%,
            #000 calc(var(--mask-radius, 0px) - 520px),
            rgba(0, 0, 0, 0.94) calc(var(--mask-radius, 0px) - 420px),
            rgba(0, 0, 0, 0.80) calc(var(--mask-radius, 0px) - 320px),
            rgba(0, 0, 0, 0.60) calc(var(--mask-radius, 0px) - 220px),
            rgba(0, 0, 0, 0.38) calc(var(--mask-radius, 0px) - 140px),
            rgba(0, 0, 0, 0.18) calc(var(--mask-radius, 0px) - 70px),
            rgba(0, 0, 0, 0.04) calc(var(--mask-radius, 0px) - 20px),
            transparent var(--mask-radius, 0px)
          ) !important;
        }
      `;

      // Portal V4 Soft Gradient Aura Colors for Black and White
      const glowColor = targetTheme === 'black' ? 'rgba(68, 114, 196, 0.65)' : 'rgba(84, 130, 53, 0.55)';
      const accentColor = targetTheme === 'black' ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)';

      setWave({
        x,
        y,
        endRadius,
        glowColor,
        accentColor,
        key: Date.now(),
      });

      const duration = 2860; // 30% slower for ultra-silky, luxurious glide

      setTimeout(() => {
        setWave(null);
        isTransitioningRef.current = false;
        document.documentElement.style.removeProperty('--theme-x');
        document.documentElement.style.removeProperty('--theme-y');
        document.documentElement.style.removeProperty('--mask-radius');
        const tag = document.getElementById('theme-view-transition-coords');
        if (tag) tag.remove();
      }, duration + 200);

      isTransitioningRef.current = true;

      const doc = document;
      if (typeof doc.startViewTransition === 'function') {
        const transition = doc.startViewTransition(() => {
          flushSync(() => {
            setThemeState(targetTheme);
          });
        });

        transition.ready
          .then(() => {
            const startTime = performance.now();

            try {
              document.documentElement.animate(
                {
                  '--mask-radius': ['0px', `${targetRadius}px`],
                },
                {
                  duration,
                  easing: 'cubic-bezier(0.12, 1, 0.28, 1)',
                  pseudoElement: '::view-transition-new(root)',
                }
              );
            } catch {}

            function animateMask(now) {
              const elapsed = now - startTime;
              const progress = Math.min(1, elapsed / duration);
              const eased = 1 - Math.pow(1 - progress, 3.6);
              const currentR = eased * targetRadius;

              document.documentElement.style.setProperty('--mask-radius', `${currentR.toFixed(1)}px`);

              if (progress < 1) {
                requestAnimationFrame(animateMask);
              }
            }

            requestAnimationFrame(animateMask);
          })
          .catch(() => {
            setThemeState(targetTheme);
          });
      } else {
        setTimeout(() => {
          setThemeState(targetTheme);
        }, 600);
      }
    },
    [isDark]
  );

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme: setThemeState }}>
      {children}
      {wave && typeof document !== 'undefined' && createPortal(
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[9999999] overflow-hidden select-none"
        >
          <div
            key={wave.key}
            className="theme-circular-wave-anim rounded-full"
            style={{
              position: 'absolute',
              left: `${wave.x}px`,
              top: `${wave.y}px`,
              width: `${Math.round(wave.endRadius * 2.8)}px`,
              height: `${Math.round(wave.endRadius * 2.8)}px`,
              background: `radial-gradient(circle at center, transparent 0%, transparent 35%, ${wave.glowColor} 65%, ${wave.accentColor} 82%, transparent 100%)`,
              filter: 'blur(72px)',
            }}
          />
        </div>,
        document.body
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
