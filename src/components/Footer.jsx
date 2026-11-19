import React from 'react';
import { Mail, MapPin, Linkedin, ExternalLink, ShieldCheck, Sparkles, Palette, Users } from 'lucide-react';

const siteConfig = {
  tagline: 'OEM agnostic EV Platform for Heavy Commercial Vehicles',
  certification: 'ISO 14001:2015 and 45001:2018 Certified Company',
  copyright: 'Copyright © 2026 All rights reserved by Transvolt Mobility Private Limited',
};

const contactDetails = {
  email: 'info@transvolt.in',
  phone: '+91 8657 526 580',
  locations: [
    {
      title: 'Corporate HQ',
      address: 'Kamala Mills, Lower Parel, Mumbai 400013',
    },
    {
      title: 'Regional HQ',
      address: 'GSC Tower, Sector 30, Gurugram 122001',
    },
    {
      title: 'Public Transit Depots',
      address: 'Mira-Bhayandar (MBMC) & Ulhasnagar (UMC)',
    },
  ],
};

export const Footer = ({ onNavigate }) => {
  const handleNavClick = (sec) => {
    if (sec === 'hero' || sec === 'home') {
      if (onNavigate) onNavigate('home');
    } else if (sec === 'about') {
      if (onNavigate) onNavigate('about');
    } else if (sec === 'services') {
      if (onNavigate) onNavigate('services');
    } else if (sec === 'news') {
      if (onNavigate) onNavigate('news');
    } else if (sec === 'governance') {
      if (onNavigate) onNavigate('governance');
    } else if (sec === 'contact') {
      if (onNavigate) onNavigate('contact');
    } else if (sec === 'work' || sec === 'careers') {
      if (onNavigate) onNavigate('work');
    } else if (sec === 'life') {
      if (onNavigate) onNavigate('life');
    } else if (sec === 'journey') {
      if (onNavigate) onNavigate('journey');
    } else if (sec === 'first') {
      if (onNavigate) onNavigate('first');
    } else if (sec === 'hiring-process' || sec === 'hr-panel') {
      if (onNavigate) onNavigate('hiring-process');
    } else if (onNavigate) {
      onNavigate(0);
    }
  };

  return (
    <footer data-bg="dark" className="relative bg-[#0D1525] border-t border-white/10 pt-10 pb-12 sm:pb-16 text-gray-300 text-xs sm:text-sm w-full select-auto">
      {/* Background subtle radial glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-t from-[#4472C4]/15 to-transparent blur-3xl opacity-50" />

      {/* Aligned with content padding */}
      <div className="w-full max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-8 border-b border-white/10 items-start">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-3.5">
            {/* Frameless Transvolt Logo */}
            <div className="flex items-center">
              <img
                src="/logo_white.svg"
                alt="Transvolt Mobility"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="text-gray-300 text-xs sm:text-[13px] leading-relaxed max-w-sm">
              {siteConfig.tagline}. Accelerating India’s transition to zero-emission commercial transport across public bus concessions, heavy industrial freight, and ports.
            </p>

            {/* Unified Equal-Width Tabs Container: Top & Bottom Match Center Width Exactly */}
            <div className="w-full max-w-[430px] flex flex-col gap-2.5 pt-1.5">
              {/* Top Tab: ISO Certification (Full Width matching Center) */}
              <div className="w-full flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#72B347] bg-[#548235]/15 border border-[#548235]/35 px-3.5 py-2 rounded-xl justify-center sm:justify-start">
                <ShieldCheck className="w-4 h-4 text-[#72B347] shrink-0" />
                <span className="whitespace-nowrap">{siteConfig.certification}</span>
              </div>

              {/* Center Row: Two Symmetrical Equal-Width Tabs (LinkedIn & Branding Portal) */}
              <div className="w-full grid grid-cols-2 gap-2.5">
                <a
                  href="https://www.linkedin.com/company/transvolt-mobility-pvt-ltd/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#4472C4] hover:bg-[#4472C4]/20 transition-all text-xs font-medium"
                >
                  <Linkedin className="w-4 h-4 text-[#4472C4] shrink-0" />
                  <span className="whitespace-nowrap">Connect on LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>

                <a
                  href="#branding-portal"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white hover:border-[#548235] hover:bg-[#548235]/20 transition-all text-xs font-medium"
                >
                  <Sparkles className="w-4 h-4 text-[#72B347] shrink-0" />
                  <span className="whitespace-nowrap">Transvolt Branding Portal</span>
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                </a>
              </div>

              {/* Bottom Tab: Our Logo & Color Palette Button (Full Width matching Center) */}
              <button
                onClick={() => onNavigate && onNavigate('brand-assets')}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#548235] text-white transition-all text-xs font-semibold shadow-xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Palette className="w-4 h-4 text-[#72B347] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">Our Logo &amp; Color Palette</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#548235]/20 text-[#72B347] font-mono font-bold uppercase tracking-wider">
                  Official
                </span>
              </button>

              {/* HR Pannel Button */}
              <button
                onClick={() => onNavigate && onNavigate('hiring-process')}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 hover:border-[#4472C4] text-white transition-all text-xs font-semibold shadow-xs hover:shadow-md cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#4472C4] group-hover:scale-110 transition-transform shrink-0" />
                  <span className="whitespace-nowrap">HR Pannel</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#4472C4]/20 text-[#6893db] font-mono font-bold uppercase tracking-wider">
                  Portal
                </span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs font-mono mb-3.5">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {['hero', 'about', 'services', 'governance', 'news', 'contact', 'work', 'life', 'journey', 'first'].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => handleNavClick(sec)}
                    className="hover:text-white transition-colors capitalize text-left cursor-pointer"
                  >
                    {sec === 'hero' ? 'Home' : sec === 'work' ? 'Work With Us' : sec === 'life' ? 'Life in Transvolt' : sec === 'journey' ? 'Our Journey' : sec === 'first' ? 'Transvolt First' : sec.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs font-mono mb-3.5">
              Key Solutions
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>Intra-City & Inter-City e-Buses</li>
              <li>Corporate Employee Shuttles</li>
              <li>Port Logistics (Ashwa 55T)</li>
              <li>Cement & Steel Heavy Haulage</li>
              <li>Megawatt Fast Charging Stations</li>
              <li>GCC Public Bus Concessions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs font-mono mb-3.5">
              Contact Us
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-300">
              <li className="flex items-center gap-2 text-white">
                <Mail className="w-4 h-4 text-[#4472C4] shrink-0" />
                <a
                  href={`mailto:${contactDetails.email}`}
                  className="hover:text-[#4472C4] transition-colors"
                >
                  {contactDetails.email}
                </a>
              </li>
              {contactDetails.locations.map((loc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#72B347] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] font-bold text-gray-200 block">{loc.title}</span>
                    <span className="text-gray-400">{loc.address}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>{siteConfig.copyright}</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-[#72B347]">
              <span className="w-2 h-2 rounded-full bg-[#72B347]"></span>
              Powered by Clean Energy
            </span>
            <span>Designed for Enterprise EV Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
