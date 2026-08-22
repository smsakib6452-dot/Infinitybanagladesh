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
  ExternalLink,
  Lock
} from 'lucide-react';
import { PageRoute } from '../types';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, isBn, tText } = useLanguage();
  const { currentPage, navigate, setIsSearchOpen } = useRouter();
  const { headerSettings, navigationItems, settings } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsAdminAuthenticated(localStorage.getItem('infinity_bd_admin_auth') === 'true');
  }, [currentPage]);

  const handleNavClick = (path: string, isExternal?: boolean) => {
    if (isExternal || path.startsWith('http://') || path.startsWith('https://')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path as PageRoute);
    }
    setMobileMenuOpen(false);
    setActiveDropdownId(null);
  };

  const isItemActive = (path: string) => {
    if (path === 'home' && currentPage === 'home') return true;
    if (path === currentPage) return true;
    if (currentPage.startsWith(path + '/')) return true;
    return false;
  };

  const activeNavItems = navigationItems
    .filter(item => item.active)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* 1. Official Top Notice Bar */}
      {headerSettings.showNoticeBar && (
        <div className="bg-[#11241E] text-emerald-100 text-xs py-1.5 px-4 border-b border-emerald-900/60">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#006A4E] text-white shrink-0 tracking-wide">
                OFFICIAL
              </span>
              <span className="truncate text-emerald-200/90 text-xs font-medium">
                {tText(headerSettings.noticeBarText)}
              </span>
            </div>

            <div className="flex items-center gap-3.5 shrink-0 text-emerald-200">
              <button
                type="button"
                onClick={() => handleNavClick(headerSettings.noticeBarLink || 'transparency')}
                className="hover:text-white hidden sm:inline-flex items-center gap-1.5 transition-colors text-xs font-semibold cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isBn ? 'স্বচ্ছতা ও অডিট' : 'Transparency'}</span>
              </button>

              {headerSettings.showLanguageSwitcher && (
                <>
                  <span className="hidden sm:inline text-emerald-800">|</span>
                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 hover:text-white text-xs font-bold border border-emerald-700/50 transition-colors cursor-pointer"
                    title="Switch Language (English / বাংলা)"
                  >
                    <Globe className="w-3 h-3 text-emerald-400" />
                    <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
                  </button>
                </>
              )}

            </div>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-warm-sm py-2.5 border-b border-[#EAE3D9]'
            : 'bg-white py-3.5 border-b border-[#EAE3D9]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Official Brand Logo */}
          <div onClick={() => handleNavClick('home')} className="shrink-0 cursor-pointer">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-bold text-slate-700">
            {activeNavItems.map(item => {
              if (item.isDropdown && item.children && item.children.length > 0) {
                const isDropdownOpen = activeDropdownId === item.id;
                const isChildActive = item.children.some(c => isItemActive(c.path));
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setActiveDropdownId(item.id)}
                    onMouseLeave={() => setActiveDropdownId(null)}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.path, item.isExternal)}
                      className={`px-3 py-2 rounded-xl flex items-center gap-1 transition-colors cursor-pointer ${
                        isChildActive || isItemActive(item.path)
                          ? 'text-[#006A4E] bg-[#E6F3EF]'
                          : 'hover:text-[#006A4E] hover:bg-slate-50'
                      }`}
                    >
                      <span>{tText(item.label)}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#006A4E]' : 'text-slate-400'}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-warm-lg border border-[#EAE3D9] p-2 space-y-1 animate-in fade-in zoom-in-95 z-50">
                        {item.children.filter(c => c.active !== false).map(subItem => (
                          <button
                            key={subItem.id}
                            type="button"
                            onClick={() => handleNavClick(subItem.path, subItem.isExternal)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                              isItemActive(subItem.path)
                                ? 'bg-[#E6F3EF] text-[#00523C] font-bold'
                                : 'text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E]'
                            }`}
                          >
                            <span>{tText(subItem.label)}</span>
                            {subItem.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.path, item.isExternal)}
                  className={`px-3 py-2 rounded-xl transition-colors cursor-pointer ${
                    isItemActive(item.path)
                      ? 'text-[#006A4E] bg-[#E6F3EF]'
                      : 'hover:text-[#006A4E] hover:bg-slate-50'
                  }`}
                >
                  {tText(item.label)}
                </button>
              );
            })}
          </div>

          {/* Desktop Right Action Cluster (Large Screens) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            {headerSettings.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-600 hover:text-[#006A4E] border border-[#EAE3D9] transition-colors cursor-pointer"
                title={isBn ? 'অনুসন্ধান করুন (Search)' : 'Search Infinity Bangladesh'}
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {headerSettings.showSupportButton && (
              <button
                type="button"
                onClick={() => handleNavClick(headerSettings.supportButtonUrl || 'donate')}
                className="px-5 py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-xs sm:text-sm font-extrabold shadow-warm-sm hover:shadow-warm-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{tText(headerSettings.supportButtonText)}</span>
              </button>
            )}
          </div>

          {/* Mobile Right Action Cluster (Mobile & Tablet) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {headerSettings.showSupportButton && (
              <button
                type="button"
                onClick={() => handleNavClick(headerSettings.supportButtonUrl || 'donate')}
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-xs sm:text-sm font-extrabold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
                title={tText(headerSettings.supportButtonText)}
              >
                <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="whitespace-nowrap">{tText(headerSettings.supportButtonText)}</span>
              </button>
            )}

            {headerSettings.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-1.5 sm:p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-700 hover:text-[#006A4E] border border-[#EAE3D9] cursor-pointer"
                title={isBn ? 'অনুসন্ধান করুন (Search)' : 'Search'}
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-1.5 sm:p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer touch-min-btn flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#EAE3D9] bg-white px-4 pt-3 pb-8 space-y-3 animate-in slide-in-from-top-4 max-h-[82vh] overflow-y-auto shadow-2xl">
            <div className="space-y-1">
              {activeNavItems.map(item => {
                if (item.isDropdown && item.children && item.children.length > 0) {
                  return (
                    <div key={item.id} className="space-y-1">
                      <div className="px-3 py-2 text-xs font-extrabold uppercase text-[#006A4E] tracking-wider">
                        {tText(item.label)}
                      </div>
                      <div className="pl-3 space-y-1 border-l-2 border-slate-100 ml-3">
                        {item.children.filter(c => c.active !== false).map(subItem => (
                          <button
                            key={subItem.id}
                            type="button"
                            onClick={() => handleNavClick(subItem.path, subItem.isExternal)}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
                              isItemActive(subItem.path)
                                ? 'bg-[#E6F3EF] text-[#00523C] font-bold'
                                : 'text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span>{tText(subItem.label)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.path, item.isExternal)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                      isItemActive(item.path)
                        ? 'bg-[#E6F3EF] text-[#00523C]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tText(item.label)}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                onClick={() => handleNavClick(headerSettings.supportButtonUrl || 'donate')}
                className="w-full py-3 rounded-2xl bg-[#006A4E] text-white font-extrabold text-sm shadow-warm-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{tText(headerSettings.supportButtonText)}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <Globe className="w-4 h-4" />
                <span>Language: {language === 'en' ? 'Switch to বাংলা' : 'Switch to English'}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
