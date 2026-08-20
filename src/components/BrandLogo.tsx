import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Info } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = true
}) => {
  const { isBn } = useLanguage();
  const [showModal, setShowModal] = useState(false);

  const isLight = variant === 'light';

  const [imgError, setImgError] = useState(false);

  const logoSizes = {
    sm: { icon: 'w-7 h-7', title: 'text-base font-bold', sub: 'text-[10px]' },
    md: { icon: 'w-10 h-10', title: 'text-xl font-extrabold', sub: 'text-xs' },
    lg: { icon: 'w-14 h-14', title: 'text-2xl sm:text-3xl font-extrabold', sub: 'text-sm' }
  };

  const currentSize = logoSizes[size];

  return (
    <>
      <div className="flex items-center gap-3 select-none group cursor-pointer" onClick={() => setShowModal(false)}>
        {/* Official Brand Identity Emblem */}
        <div
          className={`relative ${currentSize.icon} rounded-xl overflow-hidden flex items-center justify-center font-black transition-transform duration-300 group-hover:scale-105 shadow-sm border ${
            isLight
              ? 'bg-teal-900/90 text-teal-300 border-teal-700/50'
              : 'bg-gradient-to-br from-teal-700 via-emerald-800 to-slate-900 text-white border-teal-600/30'
          }`}
          title="Infinity Bangladesh (Team Infinity — United for Humanity)"
        >
          {!imgError ? (
            <img
              src={getAssetUrl('/brand/infinity-logo.png')}
              alt="Infinity Bangladesh Official Logo"
              className="w-full h-full object-cover rounded-xl"
              onError={() => setImgError(true)}
            />
          ) : (
            <>
              {/* Authentic Infinity Symbol Mark representation */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3/4 h-3/4 transform -rotate-12"
              >
                <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.356-8-5.096 0-5.096 8 0 8 5.223 0 7.261-8 12.356-8z" />
              </svg>

              {/* Bangladesh Sun Accent dot */}
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
            </>
          )}
        </div>

        {/* Brand Typography */}
        <div className="flex flex-col leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`tracking-tight font-display ${currentSize.title} ${
                isLight ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isBn ? 'ইনফিনিটি বাংলাদেশ' : 'Infinity Bangladesh'}
            </span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-semibold bg-teal-100 text-teal-800 border border-teal-200">
              Team Infinity
            </span>
          </div>

          {showTagline && (
            <span
              className={`tracking-wider font-medium uppercase ${currentSize.sub} ${
                isLight ? 'text-teal-200/80' : 'text-slate-600'
              }`}
            >
              {isBn ? 'মানবতার জন্য একতাবদ্ধ' : 'United for Humanity'}
            </span>
          )}
        </div>

        {/* Information badge indicator */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className={`p-1 rounded-full opacity-60 hover:opacity-100 transition-opacity ${
            isLight ? 'text-teal-300 hover:text-white' : 'text-slate-400 hover:text-teal-700'
          }`}
          title="Brand asset & official verification guidelines"
          aria-label="Brand Asset Information"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Brand Asset Guideline Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2 text-teal-800 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
                Official Brand Identity Architecture
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">
                Organization: <span className="text-teal-700">Infinity Bangladesh</span>
              </p>
              <p>
                Team Identity: <span className="font-medium">Team Infinity</span>
              </p>
              <p>
                Tagline: <span className="font-medium text-emerald-700">United for Humanity</span>
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <p className="font-bold text-slate-800">Official Brand Assets Directory:</p>
                <code className="block bg-white p-2 rounded border border-slate-200 text-slate-700">
                  /public/brand/infinity-logo.svg<br />
                  /public/brand/infinity-logo.png<br />
                  /public/brand/infinity-logo-white.svg
                </code>
                <p className="text-slate-600">
                  As mandated by official guidelines, brand marks are preserved in authentic proportions without arbitrary recoloring or artificial redesigns.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
