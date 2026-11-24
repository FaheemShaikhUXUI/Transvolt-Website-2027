import React, { useEffect } from 'react';

// Static Transvolt Dual-Chevron Branding Favicon (Green #548235 & Blue #4472C4)
const SVG_BRAND_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1340 1070" width="32" height="32"><polygon points="0,0 395.83,0 778.77,534.52 395.83,1069.04 0,1069.04 382.93,534.52" fill="%23548235"/><polygon points="561.05,0 956.89,0 1339.8,534.52 956.89,1069.04 561.05,1069.04 943.97,534.52" fill="%234472C4"/></svg>`;

const BRAND_FAVICON_URI = `data:image/svg+xml;utf8,${SVG_BRAND_ICON}`;

export function DynamicFavicon() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Remove any previous dynamic favicon links in head
    document.querySelectorAll("link[rel*='icon']").forEach((el) => {
      try {
        if (el.id !== 'tv-tab-favicon' && el.getAttribute('href') !== '/favicon.svg') {
          el.remove();
        }
      } catch (e) {}
    });

    // Set static brand favicon (no interval, completely static)
    let link = document.getElementById('tv-tab-favicon');
    if (!link) {
      link = document.createElement('link');
      link.id = 'tv-tab-favicon';
      link.rel = 'icon';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
    link.href = BRAND_FAVICON_URI;
  }, []);

  return null;
}

