import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { RightMenu } from './components/RightMenu';
import { HomePage } from './components/HomePage';
import { HomePageV2 } from './components/HomePageV2';
import { AboutPage } from './components/AboutPage';
import { ServicesPage } from './components/ServicesPage';
import { BrandAssetsPage } from './components/BrandAssetsPage';
import { ContactPage } from './components/ContactPage';
import { MainContactPage } from './components/MainContactPage';
import { NewsPage } from './components/NewsPage';
import { GovernancePage } from './components/GovernancePage';
import { CareersPage } from './components/CareersPage';
import { LifePage } from './components/LifePage';
import JourneyPage from './components/JourneyPage';
import FirstPage from './components/FirstPage';
import HiringProcessPage from './components/HiringProcessPage';
import HiringFormBuilderPage from './components/HiringFormBuilderPage';
import { Footer } from './components/Footer';
import { DynamicFavicon } from './components/DynamicFavicon';

function AppContent() {
  const { isDark } = useTheme();
  const [activePage, setActivePage] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('page') === 'home-v1') return 'home-v1';
      if (params.get('page') === 'home-v2') return 'home';
      if (params.get('page') === 'services') return 'services';
      if (params.get('page') === 'news') return 'news';
      if (params.get('page') === 'governance') return 'governance';
      if (params.get('page') === 'about') return 'about';
      if (params.get('page') === 'contact') return 'contact';
      if (params.get('page') === 'contact-qr') return 'contact-qr';
      if (params.get('page') === 'careers' || params.get('page') === 'work' || params.get('page') === 'work-with-us') return 'work';
      if (params.get('page') === 'life' || params.get('page') === 'life-in-transvolt') return 'life';
      if (params.get('page') === 'journey' || params.get('page') === 'our-journey') return 'journey';
      if (params.get('page') === 'first' || params.get('page') === 'transvolt-first') return 'first';
      if (params.get('page') === 'hiring-process' || params.get('page') === 'hr-panel') return 'hiring-process';
      if (params.get('page') === 'hiring-form' || params.get('page') === 'hiring-form-builder') return 'hiring-form';
      if (window.location.hash === '#home-v1') return 'home-v1';
      if (window.location.hash === '#home-v2') return 'home';
      if (window.location.hash === '#services') return 'services';
      if (window.location.hash === '#news') return 'news';
      if (window.location.hash === '#governance') return 'governance';
      if (window.location.hash === '#about') return 'about';
      if (window.location.hash === '#contact') return 'contact';
      if (window.location.hash === '#contact-qr') return 'contact-qr';
      if (window.location.hash === '#careers' || window.location.hash === '#work' || window.location.hash === '#work-with-us') return 'work';
      if (window.location.hash === '#life' || window.location.hash === '#life-in-transvolt') return 'life';
      if (window.location.hash === '#journey' || window.location.hash === '#our-journey') return 'journey';
      if (window.location.hash === '#first' || window.location.hash === '#transvolt-first') return 'first';
      if (window.location.hash === '#hiring-process' || window.location.hash === '#hr-panel') return 'hiring-process';
      if (window.location.hash === '#hiring-form' || window.location.hash === '#hiring-form-builder') return 'hiring-form';
    }
    return 'home';
  }); // 'home' (Home Page 2) | 'home-v1' (Home Page 1) | 'about' | 'brand-assets' | 'services' | 'news' | 'governance' | 'contact' | 'contact-qr' | 'work' | 'life' | 'journey' | 'first' | 'hiring-process'
  const [currentPage, setCurrentPage] = useState(0);
  const [aboutSection, setAboutSection] = useState(0); // 0: 'Who We Are', 1: 'Our Presence'
  const [aboutFooterOpen, setAboutFooterOpen] = useState(false);
  const [servicesSection, setServicesSection] = useState(0);
  const isTransitioningRef = useRef(false);
  const footerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [footerHeight, setFooterHeight] = useState(520);
  const [hasScrollbar, setHasScrollbar] = useState(false);
  const [thumbHeight, setThumbHeight] = useState(60);
  const [thumbTop, setThumbTop] = useState(0);

  // Monitor scroll for custom 5px in-air floating scrollbar
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const updateScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const canScroll = scrollHeight > clientHeight + 10;
      setHasScrollbar(canScroll);
      if (canScroll) {
        const availableH = (typeof window !== 'undefined' ? window.innerHeight : 800) - 16;
        const h = Math.max(40, (clientHeight / scrollHeight) * availableH);
        setThumbHeight(h);
        const maxScroll = scrollHeight - clientHeight;
        const ratio = maxScroll > 0 ? scrollTop / maxScroll : 0;
        setThumbTop(ratio * (availableH - h));
      }
    };

    updateScroll();
    el.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', updateScroll);

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(updateScroll);
      ro.observe(el);
    }

    return () => {
      el.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', updateScroll);
      if (ro) ro.disconnect();
    };
  }, [activePage]);

  // Total pages configured for Home Page:
  // Slide 0: Home (Hero & Investors)
  // Slide 1: Who We Are (Pillars)
  // Slide 2: Our News (6 Tiles)
  // Slide 3: Footer (Revealed by scrolling down on last section)
  const totalPages = 4;

  useEffect(() => {
    const updateFooterHeight = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const measured = Math.ceil(Math.max(
          footerRef.current.offsetHeight || 0,
          footerRef.current.scrollHeight || 0,
          rect.height || 0
        ));
        if (measured > 100) {
          setFooterHeight(measured);
        }
      }
    };

    updateFooterHeight();
    const t1 = setTimeout(updateFooterHeight, 100);
    const t2 = setTimeout(updateFooterHeight, 400);

    let ro = null;
    if (footerRef.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateFooterHeight();
      });
      ro.observe(footerRef.current);
    }

    window.addEventListener('resize', updateFooterHeight);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', updateFooterHeight);
      if (ro) ro.disconnect();
    };
  }, [activePage, aboutSection, currentPage, aboutFooterOpen]);

  // Smoothly flip to a specific page index
  const goToPage = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, totalPages - 1));
    if (clampedIndex === currentPage) return;

    isTransitioningRef.current = true;
    setCurrentPage(clampedIndex);

    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 800);
  };

  // Universal Navigation Handler across Navbar, RightMenu & Footer
  const handleNavigation = (target) => {
    if (target === 'home' || target === 'home-v2' || target === 0) {
      setActivePage('home');
      goToPage(0);
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home-v1') {
      setActivePage('home-v1');
      goToPage(0);
      setAboutFooterOpen(false);
    } else if (target === 'brand-assets' || target === 'logo-color') {
      setActivePage('brand-assets');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'services') {
      setActivePage('services');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'news') {
      setActivePage('news');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'governance') {
      setActivePage('governance');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'about') {
      setActivePage('about');
      setAboutSection(0);
      setAboutFooterOpen(false);
    } else if (target === 'contact') {
      setActivePage('contact');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact-qr') {
      setActivePage('contact-qr');
      setAboutFooterOpen(false);
    } else if (target === 'work' || target === 'careers' || target === 'work-with-us') {
      setActivePage('work');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'life' || target === 'life-in-transvolt') {
      setActivePage('life');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'journey' || target === 'our-journey') {
      setActivePage('journey');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'first' || target === 'transvolt-first') {
      setActivePage('first');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'hiring-process' || target === 'hr-panel') {
      setActivePage('hiring-process');
      setAboutFooterOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'footer') {
      if (activePage === 'about') {
        setAboutSection(6);
        setAboutFooterOpen(true);
      } else if (activePage === 'home') {
        goToPage(3);
      } else {
        setActivePage('home-v1');
        goToPage(3);
      }
    } else if (typeof target === 'number') {
      if (activePage === 'home') {
        goToPage(target);
      } else if (activePage === 'about') {
        setAboutSection(Math.min(6, Math.max(0, target)));
        setAboutFooterOpen(false);
      } else {
        setActivePage('home-v1');
        goToPage(target);
      }
      setAboutFooterOpen(false);
    }
  };

  // Wheel and Keyboard Navigation for Home Page (both v1 and v2)
  useEffect(() => {
    if (activePage !== 'home' && activePage !== 'home-v1') return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isTransitioningRef.current) return;

      const threshold = 18;
      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0) {
        // Scroll Down / Next Page
        if (currentPage < totalPages - 1) {
          goToPage(currentPage + 1);
        }
      } else {
        // Scroll Up / Prev Page
        if (currentPage > 0) {
          goToPage(currentPage - 1);
        }
      }
    };

    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;
      if (e.key === 'Escape' && currentPage === 3) {
        e.preventDefault();
        goToPage(2);
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (currentPage < totalPages - 1) goToPage(currentPage + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentPage > 0) goToPage(currentPage - 1);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 35) {
        if (diffY > 0 && currentPage < totalPages - 1) {
          goToPage(currentPage + 1);
        } else if (diffY < 0 && currentPage > 0) {
          goToPage(currentPage - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activePage, currentPage, totalPages]);

  // Section & Universal Footer Navigation for About Page (Section 0 <-> Section 1 <-> Footer)
  useEffect(() => {
    if (activePage !== 'about') return;

    const handleAboutWheel = (e) => {
      e.preventDefault();
      if (isTransitioningRef.current) return;
      const threshold = 18;
      if (Math.abs(e.deltaY) < threshold) return;

      if (e.deltaY > 0) {
        // Scroll Down
        if (aboutFooterOpen && aboutSection === 6) {
          // Already at the very bottom with footer open
          return;
        }
        if (aboutSection === 0) {
          isTransitioningRef.current = true;
          setAboutSection(1);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 1) {
          isTransitioningRef.current = true;
          setAboutSection(2);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 2) {
          isTransitioningRef.current = true;
          setAboutSection(3);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 3) {
          isTransitioningRef.current = true;
          setAboutSection(4);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 4) {
          isTransitioningRef.current = true;
          setAboutSection(5);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 5) {
          const teamEl = document.getElementById('our-team-section');
          if (teamEl) {
            const isAtBottom = teamEl.scrollTop + teamEl.clientHeight >= teamEl.scrollHeight - 30;
            if (!isAtBottom) {
              teamEl.scrollBy({ top: e.deltaY * 1.5, behavior: 'auto' });
              return;
            }
          }
          isTransitioningRef.current = true;
          setAboutSection(6);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 6 && !aboutFooterOpen) {
          const partnersEl = document.getElementById('our-partners-section');
          if (partnersEl) {
            const isAtBottom = partnersEl.scrollTop + partnersEl.clientHeight >= partnersEl.scrollHeight - 30;
            if (!isAtBottom) {
              partnersEl.scrollBy({ top: e.deltaY * 1.5, behavior: 'auto' });
              return;
            }
          }
          isTransitioningRef.current = true;
          setAboutFooterOpen(true);
          setTimeout(() => { isTransitioningRef.current = false; }, 700);
        }
      } else {
        // Scroll Up
        if (aboutFooterOpen) {
          isTransitioningRef.current = true;
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 700);
        } else if (aboutSection === 6) {
          const partnersEl = document.getElementById('our-partners-section');
          if (partnersEl && partnersEl.scrollTop > 30) {
            partnersEl.scrollBy({ top: e.deltaY * 1.5, behavior: 'auto' });
            return;
          }
          isTransitioningRef.current = true;
          setAboutSection(5);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 5) {
          const teamEl = document.getElementById('our-team-section');
          if (teamEl && teamEl.scrollTop > 30) {
            teamEl.scrollBy({ top: e.deltaY * 1.5, behavior: 'auto' });
            return;
          }
          isTransitioningRef.current = true;
          setAboutSection(4);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 4) {
          isTransitioningRef.current = true;
          setAboutSection(3);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 3) {
          isTransitioningRef.current = true;
          setAboutSection(2);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 2) {
          isTransitioningRef.current = true;
          setAboutSection(1);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        } else if (aboutSection === 1) {
          isTransitioningRef.current = true;
          setAboutSection(0);
          setAboutFooterOpen(false);
          setTimeout(() => { isTransitioningRef.current = false; }, 600);
        }
      }
    };

    const handleAboutKeyDown = (e) => {
      if (isTransitioningRef.current) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (aboutFooterOpen) setAboutFooterOpen(false);
        else if (aboutSection === 6) { setAboutSection(5); setAboutFooterOpen(false); }
        else if (aboutSection === 5) { setAboutSection(4); setAboutFooterOpen(false); }
        else if (aboutSection === 4) { setAboutSection(3); setAboutFooterOpen(false); }
        else if (aboutSection === 3) { setAboutSection(2); setAboutFooterOpen(false); }
        else if (aboutSection === 2) { setAboutSection(1); setAboutFooterOpen(false); }
        else if (aboutSection === 1) { setAboutSection(0); setAboutFooterOpen(false); }
      } else if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        if (aboutSection === 0) { setAboutSection(1); setAboutFooterOpen(false); }
        else if (aboutSection === 1) { setAboutSection(2); setAboutFooterOpen(false); }
        else if (aboutSection === 2) { setAboutSection(3); setAboutFooterOpen(false); }
        else if (aboutSection === 3) { setAboutSection(4); setAboutFooterOpen(false); }
        else if (aboutSection === 4) { setAboutSection(5); setAboutFooterOpen(false); }
        else if (aboutSection === 5) { setAboutSection(6); setAboutFooterOpen(false); }
        else if (aboutSection === 6 && !aboutFooterOpen) setAboutFooterOpen(true);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (aboutFooterOpen) setAboutFooterOpen(false);
        else if (aboutSection === 6) { setAboutSection(5); setAboutFooterOpen(false); }
        else if (aboutSection === 5) { setAboutSection(4); setAboutFooterOpen(false); }
        else if (aboutSection === 4) { setAboutSection(3); setAboutFooterOpen(false); }
        else if (aboutSection === 3) { setAboutSection(2); setAboutFooterOpen(false); }
        else if (aboutSection === 2) { setAboutSection(1); setAboutFooterOpen(false); }
        else if (aboutSection === 1) { setAboutSection(0); setAboutFooterOpen(false); }
      }
    };

    let touchStartY = 0;
    const handleAboutTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleAboutTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartY - touchEndY;
      if (Math.abs(diffY) > 35) {
        if (diffY > 0) {
          if (aboutSection === 0) { setAboutSection(1); setAboutFooterOpen(false); }
          else if (aboutSection === 1) { setAboutSection(2); setAboutFooterOpen(false); }
          else if (aboutSection === 2) { setAboutSection(3); setAboutFooterOpen(false); }
          else if (aboutSection === 3) { setAboutSection(4); setAboutFooterOpen(false); }
          else if (aboutSection === 4) { setAboutSection(5); setAboutFooterOpen(false); }
          else if (aboutSection === 5) { setAboutSection(6); setAboutFooterOpen(false); }
          else if (aboutSection === 6 && !aboutFooterOpen) setAboutFooterOpen(true);
        } else {
          if (aboutFooterOpen) setAboutFooterOpen(false);
          else if (aboutSection === 6) { setAboutSection(5); setAboutFooterOpen(false); }
          else if (aboutSection === 5) { setAboutSection(4); setAboutFooterOpen(false); }
          else if (aboutSection === 4) { setAboutSection(3); setAboutFooterOpen(false); }
          else if (aboutSection === 3) { setAboutSection(2); setAboutFooterOpen(false); }
          else if (aboutSection === 2) { setAboutSection(1); setAboutFooterOpen(false); }
          else if (aboutSection === 1) { setAboutSection(0); setAboutFooterOpen(false); }
        }
      }
    };

    window.addEventListener('wheel', handleAboutWheel, { passive: false });
    window.addEventListener('keydown', handleAboutKeyDown);
    window.addEventListener('touchstart', handleAboutTouchStart, { passive: true });
    window.addEventListener('touchend', handleAboutTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleAboutWheel);
      window.removeEventListener('keydown', handleAboutKeyDown);
      window.removeEventListener('touchstart', handleAboutTouchStart);
      window.removeEventListener('touchend', handleAboutTouchEnd);
    };
  }, [activePage, aboutSection, aboutFooterOpen]);

  // Prevent any browser window scroll offset on section/page transition
  useEffect(() => {
    window.scrollTo(0, 0);
    if (document.scrollingElement) {
      document.scrollingElement.scrollTop = 0;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activePage, aboutSection, aboutFooterOpen]);

  // Keep scrollContainer strictly locked at scrollTop = 0 on full-page slider pages (about, home)
  useEffect(() => {
    if (activePage !== 'about' && activePage !== 'home' && activePage !== 'home-v1') return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleContainerScroll = () => {
      if (el.scrollTop !== 0) {
        el.scrollTop = 0;
      }
    };
    el.addEventListener('scroll', handleContainerScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleContainerScroll);
  }, [activePage]);

  // Enforce that aboutFooterOpen can ONLY ever be true on the last section (section 6)
  useEffect(() => {
    if (aboutSection !== 6 && aboutFooterOpen) {
      setAboutFooterOpen(false);
    }
  }, [aboutSection, aboutFooterOpen]);

  // Observer for Services Page sections
  useEffect(() => {
    if (activePage !== 'services') return;

    const ids = ['services-section-0', 'services-section-1', 'services-section-2'];
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = ids.indexOf(entry.target.id);
            if (idx !== -1) setServicesSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activePage]);

  const goToServicesSection = (idx) => {
    setServicesSection(idx);
    const el = document.getElementById(`services-section-${idx}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-screen h-screen ${
        activePage === 'services' || activePage === 'brand-assets' || activePage === 'news' || activePage === 'governance' || activePage === 'contact' || activePage === 'work' || activePage === 'careers' || activePage === 'life' || activePage === 'journey' || activePage === 'first' || activePage === 'hiring-process'
          ? 'overflow-y-auto overflow-x-hidden bg-white dark:bg-black no-scrollbar'
          : activePage === 'contact-qr'
          ? 'overflow-hidden bg-black'
          : 'overflow-hidden bg-white dark:bg-black'
      } select-none`}
    >
      {/* Running Arrow Tab Dynamic Favicon */}
      <DynamicFavicon />

      {/* Floating In-Air Scrollbar Body: 5px width, 30% opacity gray, floating directly over the right edge corridor of the menu bar */}
      {hasScrollbar && (
        <div
          className="fixed right-[5px] top-2 bottom-2 pointer-events-none z-[60]"
          style={{ width: '5px' }}
        >
          <div
            className="w-[5px] rounded-full bg-gray-400/30 hover:bg-gray-400/60 dark:bg-white/30 dark:hover:bg-white/60 transition-colors pointer-events-auto cursor-pointer shadow-sm select-none"
            style={{
              height: `${thumbHeight}px`,
              transform: `translateY(${thumbTop}px)`,
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const el = scrollContainerRef.current;
              if (!el) return;
              const startY = e.clientY;
              const startScrollTop = el.scrollTop;
              const maxScroll = el.scrollHeight - el.clientHeight;
              const availableTrack = window.innerHeight - 16 - thumbHeight;

              const onMouseMove = (moveEvent) => {
                const deltaY = moveEvent.clientY - startY;
                const scrollDelta = (deltaY / Math.max(1, availableTrack)) * maxScroll;
                el.scrollTop = startScrollTop + scrollDelta;
              };

              const onMouseUp = () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
              };

              window.addEventListener('mousemove', onMouseMove);
              window.addEventListener('mouseup', onMouseUp);
            }}
          />
        </div>
      )}

      {/* Top Fixed Navbar (Active on Home, About & Contact) */}
      {activePage !== 'brand-assets' && activePage !== 'hiring-process' && activePage !== 'hiring-form' && (
        <Navbar
          activePage={activePage}
          onNavigate={handleNavigation}
          isDarkBg={isDark || (activePage === 'home' && currentPage === 0) || (activePage === 'about' && aboutSection === 4) || activePage === 'contact-qr'}
        />
      )}

      {/* Right Floating Drawer Menu */}
      {activePage !== 'brand-assets' && activePage !== 'hiring-process' && activePage !== 'hiring-form' && (
        <RightMenu
          activeMenuId={activePage}
          onNavigate={handleNavigation}
          isDarkBg={isDark || (activePage === 'home' && currentPage === 0) || (activePage === 'about' && aboutSection === 4) || activePage === 'contact-qr'}
        />
      )}

      {/* Universal Left Vertical Section Stepper */}
      {(activePage === 'home' || activePage === 'home-v1' || activePage === 'about' || activePage === 'services') && (
        <nav aria-label="Page Sections Navigation" className="fixed left-3 sm:left-5 lg:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center gap-2.5 pointer-events-auto">
          {(() => {
            const config = {
              home: {
                current: currentPage === 3 ? 2 : currentPage,
                total: 3,
                titles: ['Home & Hero', 'Who We Are', 'Our News'],
                onSelect: (idx) => goToPage(idx),
              },
              'home-v1': {
                current: currentPage === 3 ? 2 : currentPage,
                total: 3,
                titles: ['Home & Hero', 'Who We Are', 'Our News'],
                onSelect: (idx) => goToPage(idx),
              },
              about: {
                current: aboutSection,
                total: 7,
                titles: ['Welcome & Who We Are', 'Strategic Roadmap', 'Our Presence', 'Fleet Management', 'Climate Commitment', 'Our Team', 'Our Partners'],
                onSelect: (idx) => {
                  setAboutSection(idx);
                  setAboutFooterOpen(false);
                },
              },
              services: {
                current: servicesSection,
                total: 3,
                titles: ['Zero Emission Platform', 'OEM Partner', 'Fleet Monitoring Applications'],
                onSelect: (idx) => goToServicesSection(idx),
              },
            }[activePage];

            if (!config) return null;

            const isDarkContext = isDark || (activePage === 'home' && currentPage === 0) || (activePage === 'about' && aboutSection === 4) || activePage === 'contact-qr';

            return Array.from({ length: config.total }, (_, idx) => {
              const isActive = config.current === idx;
              return (
                <button
                  key={idx}
                  onClick={() => config.onSelect(idx)}
                  className={`w-[18px] h-[36px] rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-[#548235] border border-[#548235] shadow-[0_0_10px_rgba(84,130,53,0.35)]'
                      : isDarkContext
                      ? 'bg-transparent border border-white/25 hover:border-white/50'
                      : 'bg-transparent border border-gray-300 hover:border-gray-500'
                  }`}
                  title={config.titles[idx] || `Section ${idx + 1}`}
                >
                  <span
                    className={`font-mono font-bold text-[9.5px] leading-none select-none ${
                      isActive
                        ? 'text-white/90'
                        : isDarkContext
                        ? 'text-white/50'
                        : 'text-gray-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                </button>
              );
            });
          })()}
        </nav>
      )}

      {/* Universal Page Container with Silky Smooth Attached Footer Reveal */}
      {activePage === 'brand-assets' ? (
        <BrandAssetsPage onBack={() => handleNavigation('home')} />
      ) : activePage === 'contact-qr' ? (
        <ContactPage onNavigate={handleNavigation} />
      ) : activePage === 'contact' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <MainContactPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'home' || activePage === 'home-v1' ? (
        <div
          className="w-full h-full"
          style={{
            transform: currentPage === 3 ? `translateY(-${footerHeight}px)` : 'translateY(0px)',
            transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {/* Main Home Presentation (Slides 0, 1, 2) - Never Squeezed */}
          <main className="w-full h-screen overflow-hidden relative">
            {activePage === 'home' ? (
              <HomePageV2 currentPage={Math.min(currentPage, 2)} onNavigate={handleNavigation} />
            ) : (
              <HomePage currentPage={Math.min(currentPage, 2)} onNavigate={handleNavigation} />
            )}
          </main>

          {/* Attached Footer - Stuck directly on bottom of last section */}
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'services' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <ServicesPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'news' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <NewsPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'governance' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <GovernancePage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'work' || activePage === 'careers' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <CareersPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'life' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <LifePage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'journey' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <JourneyPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'first' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <FirstPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'hiring-process' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <HiringProcessPage onNavigate={handleNavigation} />
          </main>
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      ) : activePage === 'hiring-form' ? (
        <div className="w-full min-h-screen bg-slate-50 dark:bg-black">
          <main className="w-full">
            <HiringFormBuilderPage
              isDark={isDark}
              onBack={() => handleNavigation('hiring-process')}
              onSaveSchema={() => {}}
            />
          </main>
        </div>
      ) : (
        <div
          className="w-full h-full"
          style={{
            transform: aboutFooterOpen && aboutSection === 6 ? `translateY(-${footerHeight}px)` : 'translateY(0px)',
            transition: 'transform 850ms cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'transform',
          }}
        >
          {/* About Page Screen with Section 0 & Section 1 - Never Squeezed */}
          <main className="w-full h-screen overflow-hidden relative">
            <AboutPage currentSection={aboutSection} onNavigate={handleNavigation} />
          </main>

          {/* Universal Attached Footer */}
          <div ref={footerRef} className="w-full">
            <Footer onNavigate={handleNavigation} />
          </div>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;