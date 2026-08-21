import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Home, Search, Heart } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { navigate, setIsSearchOpen } = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="text-8xl md:text-9xl font-extrabold text-slate-200 tracking-tighter select-none font-display">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-[#006A4E] text-white flex items-center justify-center shadow-warm-lg">
              <Heart className="w-8 h-8 fill-emerald-200 text-emerald-200" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            {isBn ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            {isBn
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি পরিবর্তিত হয়েছে। আপনি মূল পাতায় ফিরে যেতে পারেন।'
              : 'The page you are looking for might have been moved or is currently unavailable. Let us help you find your way.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#006A4E] hover:bg-[#00523C] text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-warm-sm cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold rounded-2xl border border-[#EAE3D9] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'অনুসন্ধান করুন' : 'Search Website'}</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-500">
          <button type="button" onClick={() => navigate('campaigns')} className="hover:text-[#006A4E] transition-colors cursor-pointer">
            {isBn ? 'ক্যাম্পেইন' : 'Campaigns'}
          </button>
          <span>&bull;</span>
          <button type="button" onClick={() => navigate('volunteer')} className="hover:text-[#006A4E] transition-colors cursor-pointer">
            {isBn ? 'স্বেচ্ছাসেবক' : 'Volunteer'}
          </button>
          <span>&bull;</span>
          <button type="button" onClick={() => navigate('donate')} className="hover:text-[#006A4E] transition-colors cursor-pointer">
            {isBn ? 'অনুদান' : 'Donate'}
          </button>
          <span>&bull;</span>
          <button type="button" onClick={() => navigate('transparency')} className="hover:text-[#006A4E] transition-colors cursor-pointer">
            {isBn ? 'স্বচ্ছতা' : 'Transparency'}
          </button>
        </div>
      </div>
    </div>
  );
};
