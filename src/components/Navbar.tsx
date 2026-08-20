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
  FileText,
  ShieldAlert,
  Sparkles,
  PhoneCall,
  Lock
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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageRoute) => {
    navigate(page);
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
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Notification Announcement Bar */}
      {settings.showAnnouncementBanner && (
        <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4 border-b border-slate-800">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-600/40 text-teal-300 border border-teal-500/30 shrink-0">
                Official
              </span>
              <span className="truncate text-slate-300">
                {isBn ? settings.bannerAnnouncement.bn : settings.bannerAnnouncement.en}
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0 text-slate-300">
              <button
                type="button"
                onClick={() => handleNavClick('transparency')}
                className="hover:text-white hidden sm:inline-flex items-center gap-1 transition-colors"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-teal-400" />
                <span>{isBn ? 'স্বচ্ছতা ও রিপোর্ট' : 'Transparency'}</span>
              </button>

              {/* Language Switcher Button */}
              <button
                type="button"
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
                title="Switch Language (English / বাংলা)"
              >
                <Globe className="w-3 h-3 text-teal-400" />
                <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200 py-2.5'
            : 'bg-white border-b border-slate-200 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div onClick={() => handleNavClick('home')}>
            <BrandLogo variant="dark" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('home')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
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
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('about')
                    ? 'text-teal-800 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
                }`}
              >
                <span>{isBn ? 'আমাদের সম্পর্কে' : 'About'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('about')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'সংক্ষিপ্ত পরিচয় ও গল্প' : 'Overview & Story'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/mission-vision')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'লক্ষ্য, রূপকল্প ও মূল্যবোধ' : 'Mission, Vision & Values'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/executive-committee')}
                    className="w-full text-left px-4 py-2 text-sm text-teal-800 hover:bg-teal-50 font-bold flex items-center justify-between"
                  >
                    <span>{isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}</span>
                    <span className="px-1.5 py-0.2 bg-teal-100 text-teal-800 text-[10px] rounded font-mono">2026</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/standing-committees')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/past-committees')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('about/team')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium border-t border-slate-100 mt-1 pt-2"
                  >
                    {isBn ? 'টিম ইনফিনিটি পরিবার' : 'Team Infinity Network'}
                  </button>
                </div>
              )}
            </div>

            {/* Programs Link */}
            <button
              type="button"
              onClick={() => handleNavClick('programs')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('programs')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'কার্যক্রম' : 'Our Work'}
            </button>

            {/* Campaigns Link */}
            <button
              type="button"
              onClick={() => handleNavClick('campaigns')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('campaigns')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'ক্যাম্পেইন' : 'Campaigns'}
            </button>

            {/* Impact & Stories */}
            <button
              type="button"
              onClick={() => handleNavClick('impact')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('impact')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'প্রভাব ও ফলাফল' : 'Impact'}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('stories')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('stories')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'বাস্তব গল্প' : 'Stories'}
            </button>

            {/* Media Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMediaDropdownOpen(true)}
              onMouseLeave={() => setMediaDropdownOpen(false)}
            >
              <button
                type="button"
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isActive('gallery') || isActive('news') || isActive('events')
                    ? 'text-teal-800 bg-teal-50 font-bold'
                    : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
                }`}
              >
                <span>{isBn ? 'মিডিয়া ও সংবাদ' : 'Media'}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {mediaDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-1">
                  <button
                    type="button"
                    onClick={() => handleNavClick('gallery')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'ফটো গ্যালারি' : 'Photo Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('videos')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('news')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'সংবাদ ও আপডেট' : 'News & Articles'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleNavClick('events')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-800 font-medium"
                  >
                    {isBn ? 'ইভেন্টসমূহ' : 'Events & Gatherings'}
                  </button>
                </div>
              )}
            </div>

            {/* Volunteer */}
            <button
              type="button"
              onClick={() => handleNavClick('volunteer')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('volunteer')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'স্বেচ্ছাসেবী' : 'Volunteer'}
            </button>

            {/* Transparency */}
            <button
              type="button"
              onClick={() => handleNavClick('transparency')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('transparency')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'স্বচ্ছতা' : 'Transparency'}
            </button>

            {/* Contact */}
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive('contact')
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:text-teal-800 hover:bg-slate-50'
              }`}
            >
              {isBn ? 'যোগাযোগ' : 'Contact'}
            </button>
          </div>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Global Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-slate-600 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Search (Cmd+K)"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Primary Donate CTA */}
            <button
              type="button"
              onClick={() => handleNavClick('donate')}
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-bold shadow-xs hover:shadow transition-all duration-200 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white text-white" />
              <span>{isBn ? 'সহায়তা করুন' : 'Support Work'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-teal-800 hover:bg-slate-100 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-lg max-h-[80vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => handleNavClick('home')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'হোম' : 'Home'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'আমাদের সম্পর্কে' : 'About Infinity Bangladesh'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/executive-committee')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-xs font-bold text-teal-800 bg-teal-50/50 hover:bg-teal-100 flex items-center justify-between"
            >
              <span>{isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}</span>
              <span className="px-1.5 py-0.2 bg-teal-200 text-teal-900 text-[10px] rounded font-mono">2026</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/standing-committees')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50"
            >
              {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('about/past-committees')}
              className="w-full text-left pl-6 pr-3 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-teal-50"
            >
              {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('programs')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'কার্যক্রম (Programs)' : 'Our Work & Programs'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('campaigns')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'ক্যাম্পেইনসমূহ (Campaigns)' : 'Campaigns'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('impact')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'প্রভাব ও ফলাফল' : 'Impact & Metrics'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('stories')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'বাস্তব গল্প (Stories)' : 'Impact Stories'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('gallery')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'ফটো গ্যালারি' : 'Photo Gallery'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('videos')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'ভিডিও গ্যালারি' : 'Video Gallery'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('news')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'সংবাদ ও আপডেট' : 'News & Announcements'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('events')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'ইভেন্টসমূহ' : 'Upcoming Events'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('volunteer')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-teal-800 bg-teal-50"
            >
              {isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer With Team Infinity'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('transparency')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'স্বচ্ছতা ও রিপোর্ট' : 'Transparency & Reports'}
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-teal-50 hover:text-teal-800"
            >
              {isBn ? 'যোগাযোগ' : 'Contact Us'}
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
