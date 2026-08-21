import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { BrandLogo } from './BrandLogo';
import {
  Search,
  Heart,
  Menu,
  X,
  ChevronDown,
  Globe,
  Users,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  HandHeart,
  FileText
} from 'lucide-react';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, isBn } = useLanguage();
  const { currentPage, navigate, setIsSearchOpen } = useRouter();
  const { settings } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageRoute, param?: string) => {
    navigate(page, param);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setMediaDropdownOpen(false);
  };

  const isActive = (page: PageRoute) => {
    if (page === 'home' && currentPage === 'home') return true;
    if (page.startsWith('about') && currentPage.startsWith('about')) return true;
    if (page.startsWith('programs') && currentPage.startsWith('programs')) return true;
    if (page.startsWith('campaigns') && currentPage.startsWith('campaigns')) return true;
    if (page === 'impact' && currentPage === 'impact') return true;
    if (page.startsWith('stories') && currentPage.startsWith('stories')) return true;
    if (page === 'gallery' && (currentPage === 'gallery' || currentPage === 'videos')) return true;
    if (page.startsWith('news') && currentPage.startsWith('news')) return true;
    if (page.startsWith('events') && currentPage.startsWith('events')) return true;
    if (page === 'transparency' && (currentPage === 'transparency' || currentPage === 'reports')) return true;
    if (page === 'volunteer' && currentPage === 'volunteer') return true;
    if (page === 'contact' && currentPage === 'contact') return true;
    if (page === 'donate' && currentPage === 'donate') return true;
    return currentPage === page;
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Official Top Notice Bar */}
      {settings.showAnnouncementBanner && (
        <div className="bg-[#11241E] text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006A4E] text-white shrink-0 tracking-wide">
                OFFICIAL
              </span>
              <span className="truncate text-emerald-200/90 text-xs font-medium">
                {isBn ? settings.bannerAnnouncement.bn : settings.bannerAnnouncement.en}
              </span>
            </div>

            <div className="flex items-center gap-3.5 shrink-0 text-emerald-200">
              <button
                type="button"
                onClick={() => handleNavClick('transparency')}
                className="hover:text-white hidden sm:inline-flex items-center gap-1.5 transition-colors text-xs font-semibold"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'স্বচ্ছতা ও অডিট' : 'Transparency'}</span>
              </button>

              <span className="hidden sm:inline text-emerald-800">|</span>

              {/* Language Switcher */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white text-xs font-bold border border-emerald-700/50 transition-colors cursor-pointer"
                title="Switch Language (English / বাংলা)"
              >
                <Globe className="w-3 h-3 text-emerald-400" />
                <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-warm-md border-b border-[#EAE3D9] py-2.5'
            : 'bg-[#FAF7F2] border-b border-[#EAE3D9]/80 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Official Brand Logo */}
          <div onClick={() => handleNavClick('home')}>
            <BrandLogo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('home')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'হোম' : 'Home'}
            </button>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => handleNavClick('about')}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('about')
                    ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                    : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
                }`}
              >
                <span>{isBn ? 'আমাদের সম্পর্কে' : 'About'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-68 bg-white rounded-2xl shadow-warm-xl border border-[#EAE3D9] p-2 z-50 animate-in fade-in slide-in-from-top-2 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'সংক্ষিপ্ত পরিচয় ও গল্প' : 'Overview & Story'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/mission-vision')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'লক্ষ্য, রূপকল্প ও মূল্যবোধ' : 'Mission, Vision & Values'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/executive-committee')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-[#006A4E] hover:bg-[#E6F3EF] font-bold flex items-center justify-between transition-colors"
                  >
                    <span>{isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}</span>
                    <span className="px-1.5 py-0.2 bg-[#006A4E] text-white text-[10px] rounded font-mono">2026</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/standing-committees')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/past-committees')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
                  </button>
                  <div className="border-t border-slate-100 my-1 pt-1">
                    <button
                      type="button"
                      onClick={() => handleNavClick('about/team')}
                      className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                    >
                      {isBn ? 'টিম ইনফিনিটি পরিবার' : 'Team Infinity Network'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Our Work Link */}
            <button
              type="button"
              onClick={() => handleNavClick('programs')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('programs')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'কার্যক্রম' : 'Our Work'}
            </button>

            {/* Campaigns Link */}
            <button
              type="button"
              onClick={() => handleNavClick('campaigns')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('campaigns')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'ক্যাম্পেইন' : 'Campaigns'}
            </button>

            {/* Impact */}
            <button
              type="button"
              onClick={() => handleNavClick('impact')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('impact')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'প্রভাব' : 'Impact'}
            </button>

            {/* Stories */}
            <button
              type="button"
              onClick={() => handleNavClick('stories')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('stories')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'গল্প' : 'Stories'}
            </button>

            {/* Media Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMediaDropdownOpen(true)}
              onMouseLeave={() => setMediaDropdownOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive('gallery') || isActive('news') || isActive('events')
                    ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                    : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
                }`}
              >
                <span>{isBn ? 'মিডিয়া' : 'Media'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {mediaDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-warm-xl border border-[#EAE3D9] p-2 z-50 animate-in fade-in slide-in-from-top-2 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => handleNavClick('gallery')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'ফটো গ্যালারি' : 'Photo Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('videos')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('news')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'সংবাদ ও আপডেট' : 'News & Announcements'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('events')}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs sm:text-sm text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] font-semibold transition-colors"
                  >
                    {isBn ? 'ইভেন্টসমূহ' : 'Events & Meets'}
                  </button>
                </div>
              )}
            </div>

            {/* Volunteer */}
            <button
              type="button"
              onClick={() => handleNavClick('volunteer')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('volunteer')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'স্বেচ্ছাসেবী' : 'Volunteer'}
            </button>

            {/* Transparency */}
            <button
              type="button"
              onClick={() => handleNavClick('transparency')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('transparency')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'স্বচ্ছতা' : 'Transparency'}
            </button>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                isActive('contact')
                  ? 'text-[#006A4E] bg-[#E6F3EF] shadow-xs'
                  : 'text-slate-700 hover:text-[#006A4E] hover:bg-white/80'
              }`}
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </button>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 text-slate-600 hover:text-[#006A4E] hover:bg-white rounded-xl transition-colors border border-transparent hover:border-[#EAE3D9] cursor-pointer"
              title="Search (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Primary Support Our Work CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('donate')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-xs sm:text-sm font-bold shadow-warm-sm hover:shadow-warm-md transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>{isBn ? 'সহায়তা করুন' : 'Support Our Work'}</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 text-slate-700 hover:text-[#006A4E] hover:bg-white rounded-xl border border-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE3D9] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-1 shadow-warm-xl max-h-[85vh] overflow-y-auto animate-in fade-in">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'হোম' : 'Home'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'আমাদের সম্পর্কে' : 'About Infinity Bangladesh'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/executive-committee')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-xl text-xs font-bold text-[#006A4E] bg-[#E6F3EF] flex items-center justify-between"
            >
              <span>{isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}</span>
              <span className="px-1.5 py-0.2 bg-[#006A4E] text-white text-[10px] rounded font-mono">2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/standing-committees')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#FAF7F2]"
            >
              {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/past-committees')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-[#FAF7F2]"
            >
              {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('programs')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'কার্যক্রম (Programs)' : 'Our Work & Programs'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('campaigns')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'ক্যাম্পেইনসমূহ' : 'Campaigns'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('impact')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'প্রভাব ও ফলাফল' : 'Impact & Metrics'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('stories')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'বাস্তব গল্প' : 'Impact Stories'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('gallery')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'ফটো গ্যালারি' : 'Photo Gallery'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('videos')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('news')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'সংবাদ ও আপডেট' : 'News & Announcements'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('events')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'ইভেন্টসমূহ' : 'Events'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('volunteer')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-[#006A4E] bg-[#E6F3EF]"
            >
              {isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer With Team Infinity'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('transparency')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'স্বচ্ছতা ও অডিট রিপোর্ট' : 'Transparency & Reports'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold text-slate-800 hover:bg-[#E6F3EF] hover:text-[#006A4E]"
            >
              {isBn ? 'যোগাযোগ' : 'Contact Us'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
