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
  ExternalLink,
  Lock
} from 'lucide-react';
import { PageRoute } from '../types';

export const Footer: React.FC = () => {
  const { isBn } = useLanguage();
  const { navigate } = useRouter();
  const { settings, programs, campaigns } = useData();

  const handleNav = (page: PageRoute, slug?: string) => {
    navigate(page, slug);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Banner: United for Humanity CTA */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-teal-950 py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1 max-w-2xl">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
              Team Infinity — United for Humanity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isBn
                ? 'সুবিধাবঞ্চিত মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যোগ দিন'
                : 'Stand with us to bring dignity, joy, and hope to communities in need.'}
            </h2>
            <p className="text-slate-400 text-sm">
              {isBn
                ? 'স্বেচ্ছাসেবী হিসেবে কিংবা সহযোগিতার হাত বাড়িয়ে দিয়ে আপনিও হতে পারেন পরিবর্তনের অংশ।'
                : 'Whether as an active youth volunteer or an honest supporter, every bit of empathy matters.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleNav('volunteer')}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Be a Volunteer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => handleNav('donate')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span>{isBn ? 'অনুদান দিন' : 'Support Our Work'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Identity & Description */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="light" size="lg" />
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর অলাভজনক সামাজিক ও মানবিক সংগঠন। সুবিধাবঞ্চিত শিশু, অসহায় পরিবার ও দুর্যোগকবলিত মানুষের পাশে দাঁড়িয়ে মানবিক মর্যাদা প্রতিষ্ঠায় আমরা প্রতিজ্ঞাবদ্ধ।'
                : 'Infinity Bangladesh (Team Infinity) is a youth-driven volunteer organization dedicated to humanitarian relief, child welfare, Eid happiness, and community dignity across Bangladesh.'}
            </p>

            {/* Official Social Media Channels */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2.5">
                {isBn ? 'অফিসিয়াল সামাজিক মাধ্যম' : 'Official Social Channels'}
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                  aria-label="Infinity Bangladesh Official Facebook"
                  title="Official Facebook Page"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={settings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-rose-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                  aria-label="YouTube Channel"
                  title="YouTube"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-sky-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation & About */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase">
              {isBn ? 'সংগঠন' : 'Organization'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'আমাদের পরিচয়' : 'Who We Are'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/mission-vision')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'লক্ষ্য ও উদ্দেশ্য' : 'Mission & Vision'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/executive-committee')}
                  className="hover:text-teal-400 font-semibold text-teal-300 transition-colors"
                >
                  {isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/standing-committees')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/past-committees')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about/team')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'টিম ইনফিনিটি' : 'Team Infinity Community'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('impact')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'প্রভাব ও ফলাফল' : 'Verified Impact'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('stories')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'বাস্তব গল্প' : 'Impact Stories'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('partners')}
                  className="hover:text-teal-400 transition-colors"
                >
                  {isBn ? 'অংশীদারবৃন্দ' : 'Institutional Partners'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Work */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase">
              {isBn ? 'কার্যক্রম ও সেবা' : 'Key Initiatives'}
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              {programs.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onClick={() => handleNav('programs/detail', p.slug)}
                    className="hover:text-teal-400 transition-colors text-left line-clamp-1"
                  >
                    {isBn ? p.title.bn : p.title.en}
                  </button>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('campaigns')}
                  className="text-teal-400 hover:text-teal-300 font-medium inline-flex items-center gap-1 transition-colors pt-1"
                >
                  <span>{isBn ? 'সকল ক্যাম্পেইন' : 'All Campaigns'}</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contacts & Transparency */}
          <div className="space-y-3">
            <h3 className="text-white text-sm font-bold tracking-wider uppercase">
              {isBn ? 'স্বচ্ছতা ও যোগাযোগ' : 'Transparency & Contact'}
            </h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{settings.officialAddress}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>{settings.officialPhone}</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span className="break-all">{settings.officialEmail}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleNav('transparency')}
                className="w-full px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-semibold border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isBn ? 'স্বচ্ছতা নীতিমালা ও অডিট' : 'Transparency & Audit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Strip */}
      <div className="bg-slate-950 py-5 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-center sm:text-left">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <strong className="text-slate-200">Infinity Bangladesh</strong> (Team Infinity).{' '}
              <span className="text-slate-400">{isBn ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Tagline: <span className="text-teal-300">United for Humanity</span> | Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              type="button"
              onClick={() => handleNav('privacy')}
              className="hover:text-slate-300 transition-colors"
            >
              {isBn ? 'গোপনীয়তা নীতিমালা' : 'Privacy Policy'}
            </button>
            <span>&bull;</span>
            <button
              type="button"
              onClick={() => handleNav('terms')}
              className="hover:text-slate-300 transition-colors"
            >
              {isBn ? 'ব্যবহারের শর্তাবলী' : 'Terms & Conditions'}
            </button>
            <button
              type="button"
              onClick={() => handleNav('admin')}
              className="text-slate-800 hover:text-slate-500 transition-colors p-1 cursor-default opacity-40 hover:opacity-100"
              title=""
            >
              <Lock className="w-2.5 h-2.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
