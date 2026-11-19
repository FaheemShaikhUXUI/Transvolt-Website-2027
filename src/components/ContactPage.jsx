import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  ExternalLink,
  Download,
  Copy,
  Check,
  ArrowLeft,
  QrCode,
  Sparkles,
} from 'lucide-react';

/**
 * Compact Single-Screen Contact Page
 * Designed to fit completely within 100vh with ZERO scrolling required.
 *
 * 1. Background image at exact 70% opacity over 100% solid black base.
 * 2. Left Side QR: Google Maps location of Head Office (Kamala Mills, Lower Parel).
 * 3. Right Side QR: Direct phone vCard QR to save Transvolt Company contact details.
 */
export const ContactPage = ({ onNavigate }) => {
  const { isDark } = useTheme();
  const [copiedType, setCopiedType] = useState(null); // 'address' | 'phone' | 'email' | null

  const googleMapsUrl = 'https://maps.app.goo.gl/TFNLNUt2Erat2fWK6';
  const phone = '+91 8657 526 580';
  const email = 'info@transvolt.in';
  const address = '5th Floor, Trade Link, Tower A, Kamala Mills, Lower Parel, Mumbai 400013';

  // Copy to clipboard helper with auto-resetting feedback
  const handleCopy = (text, type) => {
    navigator.clipboard?.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType((prev) => (prev === type ? null : prev));
    }, 2000);
  };

  // Direct download of vCard for saving contact on phones & desktops
  const handleDownloadVCard = () => {
    const vCardContent = `BEGIN:VCARD
VERSION:3.0
N:;Transvolt Mobility Pvt. Ltd.;;;
FN:Transvolt Mobility Pvt. Ltd.
ORG:Transvolt Mobility Pvt. Ltd.
TITLE:EV Commercial Fleet Solutions
TEL;TYPE=WORK,VOICE:+918657526580
EMAIL;TYPE=WORK:info@transvolt.in
URL:https://transvolt.in
ADR;TYPE=WORK:;;5th Floor, Trade Link, Tower A, Kamala Mills;Lower Parel;Mumbai;400013;India
NOTE:Leading Electric Commercial Vehicle Fleet Operator in India
END:VCARD`;

    const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Transvolt_Mobility.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full h-screen max-h-screen overflow-hidden bg-black text-white select-none selection:bg-[#22c55e]/30 selection:text-[#22c55e] flex flex-col justify-center items-center px-5 sm:px-[34px] lg:px-12 pr-16 sm:pr-24 lg:pr-28">
      {/* =========================================================================
          1. 100% SOLID BLACK BASE WITH 70% OPACITY AERIAL IMAGE AS REQUESTED
          ========================================================================= */}
      <div className="fixed inset-0 bg-[#050608] z-0 pointer-events-none" />

      {/* Aerial Transit Infrastructure Background Image (Exact 70% Opacity) */}
      <img
        src="/contact_bg.jpg"
        alt="Aerial Transit Green Infrastructure"
        className="fixed inset-0 w-full h-full object-cover select-none pointer-events-none z-0"
        style={{ opacity: 0.7 }}
      />

      {/* Balanced Vignette for High Contrast & Text Legibility */}
      <div className="fixed inset-0 bg-gradient-to-b from-black/85 via-black/45 to-black/85 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.65)_100%)] pointer-events-none z-0" />

      {/* =========================================================================
          2. COMPACT CONTENT CONTAINER (FITS 100% IN SINGLE VIEWPORT, NO SCROLL)
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl lg:max-w-6xl flex flex-col items-center pt-6 sm:pt-8 pb-2">

        {/* Header Block: Minimal vertical footprint */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#22c55e] bg-[#22c55e]/15 border border-[#22c55e]/30 mb-2.5 backdrop-blur-md shadow-[0_0_10px_rgba(34,197,94,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping" />
            <span>Direct Connect • Powered Up</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] leading-tight">
            Get In Touch With Transvolt
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto drop-shadow leading-snug">
            Scan below with your phone camera to open our Mumbai HQ in Google Maps or save our complete company contacts.
          </p>
        </div>

        {/* Dual Horizontal QR Cards Grid (Scaled by +35%) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">

          {/* -------------------------------------------------------------------
              LEFT CARD: HEAD OFFICE GOOGLE MAPS QR
              ------------------------------------------------------------------- */}
          <div className="relative group rounded-3xl bg-neutral-900/85 hover:bg-neutral-900/95 backdrop-blur-2xl border border-white/15 hover:border-[#22c55e]/50 p-5 sm:p-6 lg:p-7 transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.75)] flex items-center gap-5 sm:gap-6 overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -left-16 w-36 h-36 bg-[#22c55e]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#22c55e]/30 transition-all duration-500" />

            {/* Scannable QR Code (+35% larger) */}
            <div className="relative shrink-0 p-2.5 sm:p-3 bg-white rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105 ring-1 ring-black/20">
              {/* Corner Viewfinder Target Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-[2.5px] border-l-[2.5px] border-[#22c55e]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#22c55e]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-[2.5px] border-l-[2.5px] border-[#22c55e]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-[2.5px] border-r-[2.5px] border-[#22c55e]" />

              <img
                src="/qr_head_office_maps.svg"
                alt="Google Maps Head Office QR Code"
                className="w-32 h-32 sm:w-36 sm:h-36 lg:w-[152px] lg:h-[152px] object-contain select-none"
              />

              {/* Center Floating Icon Pill */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#22c55e]">
                  <MapPin className="w-4 h-4 text-[#16a34a] fill-[#16a34a]/20" />
                </div>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#22c55e] bg-[#22c55e]/15 px-2.5 py-1 rounded-full border border-[#22c55e]/30">
                  Google Maps
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium">Head Office</span>
              </div>

              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                Lower Parel, Mumbai
              </h2>

              <p className="text-xs sm:text-[13px] text-gray-300 mt-1 line-clamp-2 leading-relaxed">
                5th Floor, Trade Link, Tower A, Kamala Mills, Lower Parel, Mumbai 400013
              </p>

              {/* Action Buttons */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-2.5">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-[0_0_14px_rgba(34,197,94,0.4)] transition-all duration-200 active:scale-95"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Maps</span>
                </a>

                <button
                  onClick={() => handleCopy(address, 'address')}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 active:scale-95 cursor-pointer"
                  title="Copy Address"
                >
                  {copiedType === 'address' ? (
                    <>
                      <Check className="w-4 h-4 text-[#22c55e]" />
                      <span className="text-[#22c55e]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-gray-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              RIGHT CARD: SAVE COMPANY CONTACT DETAILS (VCARD)
              ------------------------------------------------------------------- */}
          <div className="relative group rounded-3xl bg-neutral-900/85 hover:bg-neutral-900/95 backdrop-blur-2xl border border-white/15 hover:border-[#22c55e]/50 p-5 sm:p-6 lg:p-7 transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.75)] flex items-center gap-5 sm:gap-6 overflow-hidden">
            {/* Ambient Corner Glow */}
            <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#22c55e]/20 rounded-full blur-2xl pointer-events-none group-hover:bg-[#22c55e]/30 transition-all duration-500" />

            {/* Scannable vCard QR (+35% larger) */}
            <div className="relative shrink-0 p-2.5 sm:p-3 bg-white rounded-2xl shadow-xl transition-transform duration-300 group-hover:scale-105 ring-1 ring-black/20">
              {/* Corner Viewfinder Target Brackets */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-[2.5px] border-l-[2.5px] border-[#22c55e]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 border-t-[2.5px] border-r-[2.5px] border-[#22c55e]" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-[2.5px] border-l-[2.5px] border-[#22c55e]" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-[2.5px] border-r-[2.5px] border-[#22c55e]" />

              <img
                src="/qr_save_contact.svg"
                alt="Save Contact Details vCard QR Code"
                className="w-32 h-32 sm:w-36 sm:h-36 lg:w-[152px] lg:h-[152px] object-contain select-none"
              />

              {/* Center Floating Icon Pill */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center border-2 border-[#22c55e]">
                  <Phone className="w-4 h-4 text-[#16a34a] fill-[#16a34a]/20" />
                </div>
              </div>
            </div>

            {/* Info & Actions */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10.5px] sm:text-xs font-bold uppercase tracking-wider text-[#22c55e] bg-[#22c55e]/15 px-2.5 py-1 rounded-full border border-[#22c55e]/30">
                  Instant vCard
                </span>
                <span className="text-xs sm:text-sm text-gray-400 font-medium">Save Contact</span>
              </div>

              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight truncate">
                Transvolt Mobility
              </h2>

              <div className="mt-1.5 space-y-1 text-xs sm:text-[13px] text-gray-300">
                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-2 hover:text-[#22c55e] transition-colors truncate"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                    <span className="font-semibold">{phone}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(phone, 'phone')}
                    className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedType === 'phone' ? (
                      <Check className="w-4 h-4 text-[#22c55e]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-2 hover:text-[#22c55e] transition-colors truncate"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                    <span className="font-semibold">{email}</span>
                  </a>
                  <button
                    onClick={() => handleCopy(email, 'email')}
                    className="text-gray-400 hover:text-white p-1 transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedType === 'email' ? (
                      <Check className="w-4 h-4 text-[#22c55e]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-3.5 sm:mt-4 flex items-center gap-2.5">
                <button
                  onClick={handleDownloadVCard}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#16a34a] hover:bg-[#15803d] text-white shadow-[0_0_14px_rgba(34,197,94,0.4)] transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Save (.vcf)</span>
                </button>

                <a
                  href={`tel:${phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 border border-white/15 transition-all duration-200 active:scale-95"
                >
                  <Phone className="w-4 h-4 text-[#22c55e]" />
                  <span>Call</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Back to Home & All Locations Pill Buttons */}
        <div className="mt-4 sm:mt-5 flex items-center gap-3">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 hover:border-white/40 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#22c55e] transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
          <button
            onClick={() => onNavigate && onNavigate('contact')}
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide text-white bg-[#22c55e]/25 hover:bg-[#22c55e]/40 backdrop-blur-xl border border-[#22c55e]/40 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>All Locations & Inquiry Form</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#22c55e]" />
          </button>
        </div>

      </div>
    </div>
  );
};
