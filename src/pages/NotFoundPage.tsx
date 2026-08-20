import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Home, Search, Heart, ArrowLeft, HelpCircle } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { navigate, setIsSearchOpen } = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="relative inline-block">
          <div className="text-8xl md:text-9xl font-black text-slate-200 tracking-tighter select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-3xl bg-teal-800 text-white flex items-center justify-center shadow-xl">
              <Heart className="w-8 h-8 text-teal-200" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
            {isBn ? 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি' : 'Page Not Found'}
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {isBn
              ? 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি পরিবর্তিত হয়েছে। আপনি মূল পাতায় ফিরে যেতে পারেন।'
              : 'The page you are looking for might have been moved or is currently unavailable. Let us help you find your way.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => navigate('home')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}</span>
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 transition-colors"
          >
            <Search className="w-4 h-4 text-teal-700" />
            <span>{isBn ? 'অনুসন্ধান করুন' : 'Search Website'}</span>
          </button>
        </div>

        <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-500">
          <button onClick={() => navigate('campaigns')} className="hover:text-teal-800 transition-colors">
            {isBn ? 'ক্যাম্পেইন' : 'Campaigns'}
          </button>
          <span>&bull;</span>
          <button onClick={() => navigate('volunteer')} className="hover:text-teal-800 transition-colors">
            {isBn ? 'স্বেচ্ছাসেবক' : 'Volunteer'}
          </button>
          <span>&bull;</span>
          <button onClick={() => navigate('donate')} className="hover:text-teal-800 transition-colors">
            {isBn ? 'অনুদান' : 'Donate'}
          </button>
          <span>&bull;</span>
          <button onClick={() => navigate('transparency')} className="hover:text-teal-800 transition-colors">
            {isBn ? 'স্বচ্ছতা' : 'Transparency'}
          </button>
        </div>
      </div>
    </div>
  );
};
