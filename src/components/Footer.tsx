import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { BrandLogo } from './BrandLogo';
import {
  Heart,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { SocialPlatform } from '../types';

export const Footer: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { footerSettings, socialLinks, settings, programs } = useData();

  const renderSocialIcon = (platform: SocialPlatform) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'youtube':
        return <Youtube className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <ExternalLink className="w-4 h-4" />;
    }
  };

  const activeSocials = socialLinks
    .filter(s => s.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

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
              <span>
                {tText(footerSettings.calloutEyebrow) || `${settings.teamIdentity || 'Team Infinity'} — ${isBn ? (settings.primary_slogan?.bn || 'মানবতার জন্য একতাবদ্ধ') : (settings.primary_slogan?.en || settings.tagline || 'United for Humanity')}`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              {tText(footerSettings.calloutTitle) || (isBn
                ? 'সুবিধাবঞ্চিত মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যোগ দিন'
                : 'Stand with us to bring dignity, joy, and hope to communities in need.')}
            </h2>
            <p className="text-emerald-200/80 text-xs sm:text-sm leading-relaxed">
              {tText(footerSettings.calloutSubtitle) || (isBn
                ? 'স্বেচ্ছাসেবী হিসেবে কিংবা সহযোগিতার হাত বাড়িয়ে দিয়ে আপনিও হতে পারেন মানবকল্যাণের অগ্রণী অংশ।'
                : 'Whether as an active youth volunteer or a transparent supporter, your empathy creates lasting change.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <Link
              to={footerSettings.volunteerCtaUrl || 'volunteer'}
              className="px-6 py-3 rounded-xl bg-[#006A4E] hover:bg-[#008562] active:bg-[#004D38] text-white font-bold text-xs sm:text-sm shadow-warm-md transition-all duration-200 inline-flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <span>{tText(footerSettings.volunteerCtaText) || (isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={footerSettings.supportCtaUrl || 'donate'}
              className="px-6 py-3 rounded-xl bg-white hover:bg-emerald-50 active:bg-emerald-100 text-[#006A4E] font-bold text-xs sm:text-sm shadow-warm-sm border border-emerald-200 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>{tText(footerSettings.supportCtaText) || (isBn ? 'সহায়তা করুন' : 'Support Our Work')}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="home" className="inline-block focus:outline-none group">
              <BrandLogo variant="light" size="lg" />
            </Link>
            <p className="text-xs sm:text-sm text-emerald-200/80 leading-relaxed pr-4">
              {tText(footerSettings.description)}
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-[11px] text-emerald-300 font-semibold">
              <span>Established {settings.establishedYear || '2015'} &bull; {typeof footerSettings.address === 'object' ? tText(footerSettings.address as any) : (footerSettings.address || settings.officialAddress || 'Hathazari, Chattogram, Bangladesh')}</span>
            </div>

            {/* Official Social Channels */}
            <div className="pt-2">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider block mb-2.5">
                {isBn ? 'অফিসিয়াল সামাজিক মাধ্যম' : 'Official Social Channels'}
              </span>
              <div className="flex items-center gap-2.5">
                {activeSocials.map(soc => (
                  <a
                    key={soc.id}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={soc.label || soc.platform}
                    className="w-8 h-8 rounded-lg bg-emerald-950/80 hover:bg-[#006A4E] text-emerald-200 hover:text-white flex items-center justify-center border border-emerald-800/60 transition-colors"
                  >
                    {renderSocialIcon(soc.platform)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: About & Leadership */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              {isBn ? 'সংগঠন ও পরিচয়' : 'About & Leadership'}
            </span>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li>
                <Link to="about/story" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'আমাদের গল্প ও যাত্রা' : 'Our Story & Journey'}
                </Link>
              </li>
              <li>
                <Link to="about/mission-vision" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'লক্ষ্য ও দর্শন' : 'Mission & Vision'}
                </Link>
              </li>
              <li>
                <Link to="about/executive-committee" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'কার্যনির্বাহী কমিটি ২০২৬' : 'Executive Committee 2026'}
                </Link>
              </li>
              <li>
                <Link to="about/standing-committees" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'স্থায়ী কমিটি' : 'Standing Committees'}
                </Link>
              </li>
              <li>
                <Link to="about/past-committees" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'প্রাক্তন কমিটিসমূহ' : 'Past Committees Archive'}
                </Link>
              </li>
              <li>
                <Link to="transparency" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'স্বচ্ছতা ও জবাবদিহিতা' : 'Transparency & Governance'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Field Work */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              {isBn ? 'কার্যক্রম ও ক্যাম্পেইন' : 'Field Initiatives'}
            </span>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              {programs.slice(0, 4).map(p => (
                <li key={p.id}>
                  <Link to="programs/detail" slug={p.slug} className="hover:text-white transition-colors cursor-pointer text-left block">
                    {tText(p.title)}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="campaigns" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'সকল মানবিক ক্যাম্পেইন' : 'All Humanitarian Campaigns'}
                </Link>
              </li>
              <li>
                <Link to="media-coverage" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'গণমাধ্যমে ইনফিনিটি (প্রেস)' : 'In The News & Press'}
                </Link>
              </li>
              <li>
                <Link to="stories" className="hover:text-white transition-colors cursor-pointer block">
                  {isBn ? 'বাস্তব জীবনের গল্প' : 'Impact Stories'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Legal Info */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-white uppercase tracking-wider block">
              {isBn ? 'অফিসিয়াল যোগাযোগ' : 'Official Contact'}
            </span>
            <ul className="space-y-2.5 text-xs text-emerald-200/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{typeof footerSettings.address === 'object' ? tText(footerSettings.address as any) : (footerSettings.address || settings.officialAddress)}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${footerSettings.phone || settings.officialPhone}`} className="hover:text-white transition-colors">
                  {footerSettings.phone || settings.officialPhone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${footerSettings.email || settings.officialEmail}`} className="hover:text-white transition-colors">
                  {footerSettings.email || settings.officialEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3. Bottom Legal Copyright Bar */}
      <div className="bg-[#0A1612] py-4 border-t border-emerald-950 text-emerald-300/70 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <p>{tText(footerSettings.copyrightText)}</p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <Link to="privacy" className="hover:text-white transition-colors cursor-pointer">
              {isBn ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}
            </Link>
            <span>&bull;</span>
            <Link to="terms" className="hover:text-white transition-colors cursor-pointer">
              {isBn ? 'টার্মস অ্যান্ড কন্ডিশন' : 'Terms & Verification'}
            </Link>
            <span>&bull;</span>
            <Link to="contact" className="hover:text-white transition-colors cursor-pointer">
              {isBn ? 'হেল্পডেস্ক' : 'Official Helpdesk'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

