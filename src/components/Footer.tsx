import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { BrandLogo } from './BrandLogo';
import {
  Heart,
  ShieldCheck,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { PageRoute } from '../types';

export const Footer: React.FC = () => {
  const { isBn } = useLanguage();
  const { navigate } = useRouter();
  const { settings, programs } = useData();

  const handleNav = (page: PageRoute, slug?: string) => {
    navigate(page, slug);
  };

  return (
    <footer className="bg-[#11241E] text-emerald-100 border-t border-emerald-900/60">
      {/* 1. Top Callout Banner: United for Humanity */}
      <div className="bg-gradient-to-r from-[#0D1C17] via-[#132A23] to-[#0D1C17] py-10 sm:py-12 border-b border-emerald-900/40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Team Infinity — United for Humanity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              {isBn
                ? 'সুবিধাবঞ্চিত মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যোগ দিন'
                : 'Stand with us to bring dignity, joy, and hope to communities in need.'}
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed">
              {isBn
                ? 'স্বেচ্ছাসেবী হিসেবে কিংবা সহযোগিতার হাত বাড়িয়ে দিয়ে আপনিও হতে পারেন মানবকল্যাণের অগ্রণী অংশ।'
                : 'Whether as an active youth volunteer or a transparent supporter, your empathy creates lasting change.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('volunteer')}
              className="px-6 py-3 rounded-xl bg-[#006A4E] hover:bg-[#008562] active:bg-[#004D38] text-white font-bold text-xs sm:text-sm shadow-warm-md transition-all duration-200 inline-flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('donate')}
              className="px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-100 text-[#006A4E] font-bold text-xs sm:text-sm shadow-warm-sm border border-emerald-200 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{isBn ? 'সহায়তা করুন' : 'Support Our Work'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed pr-4">
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর অলাভজনক সামাজিক ও মানবিক সংগঠন। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু করে আজ দেশজুড়ে সুবিধাবঞ্চিত শিশু, অসহায় পরিবার ও দুর্যোগকবলিত মানুষের পাশে দাঁড়িয়ে মানবিক মর্যাদা প্রতিষ্ঠায় আমরা প্রতিজ্ঞাবদ্ধ।'
                : 'Infinity Bangladesh (Team Infinity) is a youth-driven volunteer social organization founded in Hathazari, Chattogram in 2015. Dedicated to child education, festive Eid happiness, winter warmth, and community dignity across Bangladesh.'}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-[11px] text-emerald-300 font-semibold">
              <span>Established 2015 &bull; Hathazari, Chattogram, Bangladesh</span>
            </div>

            {/* Official Social Channels */}
            <div className="pt-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-2.5">
                {isBn ? 'অফিসিয়াল সামাজিক মাধ্যম' : 'Official Social Channels'}
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-950/80 hover:bg-[#006A4E] text-emerald-200 hover:text-white flex items-center justify-center transition-all border border-emerald-800/60 hover:scale-105"
                  aria-label="Infinity Bangladesh Official Facebook"
                  title="Official Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-950/80 hover:bg-rose-700 text-emerald-200 hover:text-white flex items-center justify-center transition-all border border-emerald-800/60 hover:scale-105"
                  aria-label="YouTube Channel"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-950/80 hover:bg-pink-700 text-emerald-200 hover:text-white flex items-center justify-center transition-all border border-emerald-800/60 hover:scale-105"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-emerald-950/80 hover:bg-sky-700 text-emerald-200 hover:text-white flex items-center justify-center transition-all border border-emerald-800/60 hover:scale-105"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation / About */}
          <div className="space-y-3">
            <h3 className="text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              {isBn ? 'সংগঠন' : 'Organization'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'আমাদের পরিচয়' : 'Who We Are'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/mission-vision')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission & Vision'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/executive-committee')}
                  className="hover:text-white font-semibold text-emerald-300 transition-colors cursor-pointer"
                >
                  {isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/standing-committees')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/past-committees')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('impact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'প্রভাব ও ফলাফল' : 'Verified Impact'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('stories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  {isBn ? 'বাস্তব গল্প' : 'Impact Stories'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Initiatives */}
          <div className="space-y-3">
            <h3 className="text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              {isBn ? 'কার্যক্রম ও সেবা' : 'Key Initiatives'}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200/80">
              {programs.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handleNav('programs/detail', p.slug)}
                    className="hover:text-white transition-colors text-left line-clamp-1 cursor-pointer"
                  >
                    {isBn ? p.title.bn : p.title.en}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('campaigns')}
                  className="text-amber-300 hover:text-amber-200 font-bold inline-flex items-center gap-1 transition-colors pt-1 cursor-pointer"
                >
                  <span>{isBn ? 'সকল ক্যাম্পেইন দেখুন' : 'All Campaigns'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts & Transparency */}
          <div className="space-y-3">
            <h3 className="text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase">
              {isBn ? 'স্বচ্ছতা ও যোগাযোগ' : 'Transparency & Contact'}
            </h3>
            <div className="space-y-2.5 text-xs text-emerald-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{settings.officialAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.officialPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="break-all">{settings.officialEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleNav('transparency')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white text-xs font-bold border border-emerald-800/80 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'স্বচ্ছতা নীতিমালা ও অডিট' : 'Transparency & Audit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal & Official Digital Platform Strip */}
      <div className="bg-[#0A1612] py-5 border-t border-emerald-950 text-xs text-emerald-300/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <strong className="text-white">Infinity Bangladesh</strong> (Team Infinity).{' '}
              <span>{isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</span>
            </p>
            <p className="text-[11px] text-emerald-400/80 mt-0.5">
              Tagline: <span className="text-white font-semibold">United for Humanity</span> &bull; Hathazari, Chattogram, Bangladesh (Est. 2015)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => handleNav('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isBn ? 'গোপনীয়তা নীতিমালা' : 'Privacy Policy'}
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleNav('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="text-emerald-950 hover:text-emerald-700 transition-colors p-1 cursor-default opacity-40 hover:opacity-100"
              title=""
            >
              <Lock className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
