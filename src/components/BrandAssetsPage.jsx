import React, { useState } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  Download,
  Palette,
  ShieldCheck,
  AlertTriangle,
  FileCode,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';

export const BrandAssetsPage = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState(null);
  const [activePaletteTab, setActivePaletteTab] = useState('hex'); // 'hex' | 'rgb' | 'cmyk'

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Color Palette Data (Exact values from Transvolt Branding Portal V4)
  const colorData = [
    {
      name: 'Transvolt Green',
      hex: '#548235',
      rgb: 'R: 84 / G: 130 / B: 53',
      cmyk: 'C: 64 / M: 9 / Y: 95 / K: 35',
      role: 'Primary Sustainability & Growth Brand Color',
      textColor: '#FFFFFF',
    },
    {
      name: 'Transvolt Blue',
      hex: '#4472C4',
      rgb: 'R: 68 / G: 114 / B: 196',
      cmyk: 'C: 65 / M: 42 / Y: 0 / K: 23',
      role: 'Primary Technology & Trust Brand Color',
      textColor: '#FFFFFF',
    },
    {
      name: 'Transvolt Black',
      hex: '#000000',
      rgb: 'R: 0 / G: 0 / B: 0',
      cmyk: 'C: 0 / M: 0 / Y: 0 / K: 100',
      role: 'Typography, Structure & Strong Contrast',
      textColor: '#FFFFFF',
    },
  ];

  // Official Logo Assets
  const basicLogos = [
    {
      id: 'logo-basic-black',
      name: 'Basic Logo (Black)',
      bg: 'bg-gray-50 border-gray-200',
      imgSrc: '/logos/PNG/Logo_Black.png',
      svgSrc: '/logos/SVG/Logo_Black.svg',
      pngSrc: '/logos/PNG/Logo_Black.png',
      cdrSrc: '/logos/CDR/Logo_Black_CDR15.cdr',
      usage: 'Standard light backgrounds, white paper, documentation.',
    },
    {
      id: 'logo-basic-white',
      name: 'Basic Logo (White with Color Arrows)',
      bg: 'bg-[#0D1525] border-gray-800 text-white',
      imgSrc: '/logos/PNG/Logo_White.png',
      svgSrc: '/logos/SVG/Logo_White.svg',
      pngSrc: '/logos/PNG/Logo_White.png',
      cdrSrc: '/logos/CDR/Logo_White_CDR15.cdr',
      usage: 'Dark digital headers, navy blue backdrops, mobile app bars.',
    },
    {
      id: 'logo-basic-full-white',
      name: 'Basic Logo (Monochrome Full White)',
      bg: 'bg-[#548235] border-[#446d2a] text-white',
      imgSrc: '/logos/PNG/Logo_Full_White.png',
      svgSrc: '/logos/SVG/Logo_Full_White.svg',
      pngSrc: '/logos/PNG/Logo_Full_White.png',
      cdrSrc: '/logos/CDR/Logo_Full_White_CDR15.cdr',
      usage: 'Solid brand green livery, vehicle vinyl wraps, dark merchandise.',
    },
  ];

  const taglineLogos = [
    {
      id: 'logo-tagline-black',
      name: 'Logo With Tagline (Black)',
      bg: 'bg-gray-50 border-gray-200',
      imgSrc: '/logos/PNG/Logo_Black_Tagline.png',
      svgSrc: '/logos/SVG/Logo_Black_Tagline.svg',
      pngSrc: '/logos/PNG/Logo_Black_Tagline.png',
      cdrSrc: '/logos/CDR/Logo_Black_Tagline_CDR15.cdr',
      usage: 'Corporate letterheads, formal business proposals, print media.',
    },
    {
      id: 'logo-tagline-white',
      name: 'Logo With Tagline (White with Color Arrows)',
      bg: 'bg-[#0D1525] border-gray-800 text-white',
      imgSrc: '/logos/PNG/Logo_White_Tagline.png',
      svgSrc: '/logos/SVG/Logo_White_Tagline.svg',
      pngSrc: '/logos/PNG/Logo_White_Tagline.png',
      cdrSrc: '/logos/CDR/Logo_White_Tagline_CDR15.cdr',
      usage: 'High-visibility investor decks, website footers, keynote slides.',
    },
    {
      id: 'logo-tagline-full-white',
      name: 'Logo With Tagline (Monochrome Full White)',
      bg: 'bg-[#4472C4] border-[#365ca0] text-white',
      imgSrc: '/logos/PNG/Logo_Full_White_Tagline.png',
      svgSrc: '/logos/SVG/Logo_Full_White_Tagline.svg',
      pngSrc: '/logos/PNG/Logo_Full_White_Tagline.png',
      cdrSrc: '/logos/CDR/Logo_Full_White_Tagline_CDR15.cdr',
      usage: 'Branded fleet decals, charging station totems, dark industrial banners.',
    },
  ];

  const quickLogoRules = [
    { title: 'Use Approved Logos Only', desc: 'Select logos exclusively from official repository assets.' },
    { title: 'Do Not Modify', desc: 'Never alter colours, proportions, typography, or orientation.' },
    { title: 'Maintain Proportions', desc: 'Always preserve original aspect ratio when resizing.' },
    { title: 'Respect Clear Space', desc: 'Maintain sufficient padding around the logo for legibility.' },
    { title: 'Use the Right Version', desc: 'Select the appropriate logo version based on background contrast.' },
    { title: 'No Visual Effects', desc: 'Do not add drop shadows, outer glows, strokes, or 3D extrusions.' },
  ];

  const quickColorRules = [
    { title: 'Use Exact Values', desc: 'Follow exact HEX, RGB, and CMYK color codes listed below.' },
    { title: 'Primary Brand Balance', desc: 'Transvolt Green (#548235) and Blue (#4472C4) lead key elements.' },
    { title: 'Never Eyeball Colors', desc: 'Never sample colors from compressed screenshots or phone photos.' },
    { title: 'Consistent Cross-Platform', desc: 'Same approved palette across all web, app, and fleet collateral.' },
  ];

  return (
    <div className="w-full min-h-screen bg-white text-gray-900 select-auto">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-300 hover:border-gray-900 text-gray-700 hover:text-gray-900 text-xs font-semibold transition-all cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Website</span>
            </button>
            <div className="h-5 w-px bg-gray-200" />
            <div className="flex items-center gap-2.5">
              <img
                src="/logos/PNG/Logo_Black.png"
                alt="Transvolt"
                className="h-6 w-auto object-contain"
              />
              <span className="text-xs font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-600 border border-gray-200">
                Brand Standards
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/logos/Transvolt_Logos_PNG.zip"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-all border border-gray-300"
            >
              <Download className="w-3.5 h-3.5 text-gray-600" />
              <span>PNG Package (.zip)</span>
            </a>
            <a
              href="/logos/Transvolt_Logos_SVG.zip"
              download
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#548235] hover:bg-[#446d2a] text-white text-xs font-semibold transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Vector SVG Package (.zip)</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="max-w-[1780px] mx-auto px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28 py-10 space-y-12">
        {/* Hero Title Section with Running Brand Gradient */}
        <div className="border-b border-gray-200 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#548235]">
            <ShieldCheck className="w-4 h-4" />
            <span>Official Identity Guidelines & Asset Vault</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight inline-block animate-dynamic-green-gradient">
            Our Logo &amp; Color Palette
          </h1>

          <p className="text-sm sm:text-base text-gray-600 max-w-4xl leading-relaxed pt-1">
            The Transvolt logo and color palette are the foundational visual assets of the brand. This page
            serves as the official single source of truth for authorized logos, vector artwork, print assets,
            and digital hex/RGB/CMYK specifications across all Transvolt Mobility operations.
          </p>
        </div>

        {/* SECTION 1: OFFICIAL BRAND COLOR PALETTE */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] uppercase">
                Official Color Palette
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 pt-0.5">
                Exact color formulations calibrated for high visual impact across web, print, and vehicle livery.
              </p>
            </div>

            {/* Format Selector Pills (HEX / RGB / CMYK) */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 self-start sm:self-auto">
              {[
                { id: 'hex', label: 'Hex Code' },
                { id: 'rgb', label: 'RGB (Digital)' },
                { id: 'cmyk', label: 'CMYK (Print)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePaletteTab(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activePaletteTab === tab.id
                      ? 'bg-white text-gray-900 shadow-xs border border-gray-200'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Color Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {colorData.map((color) => {
              const activeCode =
                activePaletteTab === 'hex'
                  ? color.hex
                  : activePaletteTab === 'rgb'
                  ? color.rgb
                  : color.cmyk;

              const isCopied = copiedCode === color.name;

              return (
                <div
                  key={color.name}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                  className="group relative rounded-2xl p-5 text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer overflow-hidden border border-black/10 flex flex-col justify-between min-h-[160px]"
                  style={{ backgroundColor: color.hex }}
                  title="Click to copy Hex code"
                >
                  {/* Subtle top sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20 pointer-events-none" />

                  {/* Top Bar: Name + Copy Button */}
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 block">
                        Transvolt Brand
                      </span>
                      <h3 className="text-lg font-extrabold tracking-tight text-white">
                        {color.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/25 backdrop-blur-sm text-xs font-semibold text-white border border-white/20 group-hover:bg-black/40 transition-all">
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-green-300" />
                          <span className="text-[11px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Copy Hex</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bottom Bar: Values */}
                  <div className="relative z-10 pt-4 border-t border-white/20">
                    <p className="text-[11px] text-white/80 leading-snug pb-1.5">{color.role}</p>
                    <div className="flex items-center justify-between font-mono text-xs font-bold">
                      <span className="bg-black/30 px-2 py-0.5 rounded text-white tracking-wide">
                        {activeCode}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: AUTHENTIC BASIC LOGOS */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4472C4] to-[#548235] uppercase">
              1. Basic Logo Set
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 pt-0.5">
              Official horizontal wordmark with iconic dual-chevron electric chevrons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {basicLogos.map((logo) => (
              <div
                key={logo.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Visual Canvas Box */}
                <div
                  className={`w-full h-44 flex items-center justify-center p-6 border-b transition-colors ${logo.bg}`}
                >
                  <img
                    src={logo.imgSrc}
                    alt={logo.name}
                    className="max-h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Info & Download Actions */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{logo.name}</h3>
                    <p className="text-xs text-gray-500 pt-1 leading-relaxed">{logo.usage}</p>
                  </div>

                  {/* Format Download Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <a
                      href={logo.svgSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-[#548235] text-gray-700 hover:text-white border border-gray-200 hover:border-[#548235] text-xs font-bold transition-all"
                      title="Download Vector SVG"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </a>
                    <a
                      href={logo.pngSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-[#4472C4] text-gray-700 hover:text-white border border-gray-200 hover:border-[#4472C4] text-xs font-bold transition-all"
                      title="Download High-Res Transparent PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PNG</span>
                    </a>
                    <a
                      href={logo.cdrSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-800 text-gray-700 hover:text-white border border-gray-200 hover:border-gray-800 text-xs font-bold transition-all"
                      title="Download CorelDraw CDR Format"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CDR</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: AUTHENTIC LOGOS WITH TAGLINE */}
        <section className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 uppercase">
              2. Logo With Tagline
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 pt-0.5">
              Official corporate lockup featuring the verified company mission tagline: "Safety and Sustainability".
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {taglineLogos.map((logo) => (
              <div
                key={logo.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                {/* Visual Canvas Box */}
                <div
                  className={`w-full h-44 flex items-center justify-center p-6 border-b transition-colors ${logo.bg}`}
                >
                  <img
                    src={logo.imgSrc}
                    alt={logo.name}
                    className="max-h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Info & Download Actions */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{logo.name}</h3>
                    <p className="text-xs text-gray-500 pt-1 leading-relaxed">{logo.usage}</p>
                  </div>

                  {/* Format Download Buttons */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                    <a
                      href={logo.svgSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-[#548235] text-gray-700 hover:text-white border border-gray-200 hover:border-[#548235] text-xs font-bold transition-all"
                      title="Download Vector SVG"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>SVG</span>
                    </a>
                    <a
                      href={logo.pngSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-[#4472C4] text-gray-700 hover:text-white border border-gray-200 hover:border-[#4472C4] text-xs font-bold transition-all"
                      title="Download High-Res Transparent PNG"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PNG</span>
                    </a>
                    <a
                      href={logo.cdrSrc}
                      download
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-800 text-gray-700 hover:text-white border border-gray-200 hover:border-gray-800 text-xs font-bold transition-all"
                      title="Download CorelDraw CDR Format"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>CDR</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: QUICK USAGE RULES & GOVERNANCE POLICY */}
        <section className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-gray-900 uppercase">
              Brand Guidelines &amp; Governance Policy
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 pt-0.5">
              Core rules to maintain consistency, credibility, and brand equity across all touchpoints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Logo Usage Rules */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4472C4] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Quick Logo Usage Rules</span>
              </h3>
              <ul className="space-y-2">
                {quickLogoRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full bg-[#4472C4]/15 text-[#4472C4] flex items-center justify-center font-bold text-[9px]">
                      ✓
                    </span>
                    <span>
                      <strong className="font-semibold text-gray-900">{rule.title}</strong> — {rule.desc}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Color Usage Rules */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#548235] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Quick Color Usage Rules</span>
              </h3>
              <ul className="space-y-2">
                {quickColorRules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full bg-[#548235]/15 text-[#548235] flex items-center justify-center font-bold text-[9px]">
                      ✓
                    </span>
                    <span>
                      <strong className="font-semibold text-gray-900">{rule.title}</strong> — {rule.desc}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-gray-200">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11.5px] text-amber-900 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Strict Enforcement:</strong> Only logo files and color values from this page are
                    authorized. Never recreate the logo from scratch or use unapproved third-party derivatives.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

