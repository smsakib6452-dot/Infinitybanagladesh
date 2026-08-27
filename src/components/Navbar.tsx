import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Link } from './Link';
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
  const { currentPage, currentSlug, setIsSearchOpen } = useRouter();
  const { headerSettings, navigationItems, committees } = useData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);
  const [activeNestedDropdownId, setActiveNestedDropdownId] = useState<string | null>(null);
  const [mobilePastCommitteesOpen, setMobilePastCommitteesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const nestedDropdownTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Dynamic Past Committees sorted descending
  const pastCommittees = committees
    .filter(c => c.type === 'PAST' || c.status === 'ARCHIVED')
    .sort((a, b) => {
      const yearA = parseInt(a.year || '0', 10);
      const yearB = parseInt(b.year || '0', 10);
      return yearB - yearA;
    });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-dropdown-container')) {
        setActiveDropdownId(null);
        setActiveNestedDropdownId(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleMouseEnterDropdown = (itemId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdownId(itemId);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdownId(null);
      setActiveNestedDropdownId(null);
    }, 220);
  };

  const handleMouseEnterNested = (subId: string) => {
    if (nestedDropdownTimeoutRef.current) {
      clearTimeout(nestedDropdownTimeoutRef.current);
      nestedDropdownTimeoutRef.current = null;
    }
    setActiveNestedDropdownId(subId);
  };

  const handleMouseLeaveNested = () => {
    if (nestedDropdownTimeoutRef.current) {
      clearTimeout(nestedDropdownTimeoutRef.current);
    }
    nestedDropdownTimeoutRef.current = setTimeout(() => {
      setActiveNestedDropdownId(null);
    }, 180);
  };

  const isItemActive = (path: string) => {
    if (path === 'home' && currentPage === 'home') return true;
    if (path === currentPage) return true;
    if (currentPage.startsWith(path + '/')) return true;
    if (path === 'team' && (
      currentPage === 'team' ||
      currentPage === 'team/executive-committee' ||
      currentPage === 'about/executive-committee' ||
      currentPage === 'team/standing-committee' ||
      currentPage === 'about/standing-committees' ||
      currentPage === 'team/past-committees' ||
      currentPage === 'about/past-committees'
    )) return true;
    if (path === 'gallery' && (currentPage === 'gallery' || currentPage === 'videos' || currentPage === 'media-coverage')) return true;
    if (path === 'about' && (currentPage === 'about' || currentPage === 'about/story' || currentPage === 'about/mission-vision' || currentPage === 'about/team')) return true;
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
              {headerSettings.showNoticeBarButton !== false && (
                <Link
                  to={headerSettings.noticeBarLink || 'transparency'}
                  className="hover:text-white hidden sm:inline-flex items-center gap-1.5 transition-colors text-xs font-semibold cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{tText(headerSettings.noticeBarButtonText) || (isBn ? 'স্বচ্ছতা ও অডিট' : 'Transparency')}</span>
                </Link>
              )}

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
        <div className="max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 flex items-center justify-between gap-2 xl:gap-4">
          {/* Official Brand Logo */}
          <Link to="home" className="shrink-0 block focus:outline-none group">
            <BrandLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center justify-center gap-0.5 xl:gap-1.5 2xl:gap-2 text-[13px] xl:text-[13.5px] 2xl:text-sm font-bold text-slate-700 whitespace-nowrap flex-1 min-w-0 px-1">
            {activeNavItems.map(item => {
              if (item.isDropdown && item.children && item.children.length > 0) {
                const isDropdownOpen = activeDropdownId === item.id;
                const isChildActive = item.children.some(c => isItemActive(c.path));
                const isTeamMenu = item.path === 'team' || item.id === 'nav-5';

                return (
                  <div
                    key={item.id}
                    className="relative nav-dropdown-container shrink-0"
                    onMouseEnter={() => handleMouseEnterDropdown(item.id)}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <div className="flex items-center">
                      {/* Clickable Main Text */}
                      <Link
                        to={item.path}
                        isExternal={item.isExternal}
                        onClick={() => setActiveDropdownId(null)}
                        className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 xl:py-2 rounded-l-xl flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                          isChildActive || isItemActive(item.path)
                            ? 'text-[#006A4E] bg-[#E6F3EF]'
                            : 'hover:text-[#006A4E] hover:bg-slate-50'
                        }`}
                      >
                        <span className="whitespace-nowrap">{tText(item.label)}</span>
                      </Link>

                      {/* Dropdown Arrow Toggle Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveDropdownId(prev => (prev === item.id ? null : item.id));
                        }}
                        className={`py-1.5 xl:py-2 pr-1.5 xl:pr-2 pl-0.5 rounded-r-xl transition-colors cursor-pointer shrink-0 ${
                          isChildActive || isItemActive(item.path)
                            ? 'text-[#006A4E] bg-[#E6F3EF]'
                            : 'hover:text-[#006A4E] hover:bg-slate-50 text-slate-400'
                        }`}
                        aria-label="Toggle Submenu"
                      >
                        <ChevronDown className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-[#006A4E]' : ''}`} />
                      </button>
                    </div>

                    {/* Dropdown Menu with Seamless Hover Bridge */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 pt-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-white rounded-2xl shadow-warm-lg border border-[#EAE3D9] p-2 space-y-1">
                          {item.children.filter(c => c.active !== false).map(subItem => {
                            const isPastCommitteeSub = subItem.isNestedDropdown || subItem.id === 'sub-past' || subItem.path.includes('past-committees');

                            if (isPastCommitteeSub && isTeamMenu) {
                              const isNestedOpen = activeNestedDropdownId === subItem.id;
                              return (
                                <div
                                  key={subItem.id}
                                  className="relative group/nested"
                                  onMouseEnter={() => handleMouseEnterNested(subItem.id)}
                                  onMouseLeave={handleMouseLeaveNested}
                                >
                                  <Link
                                    to="team/past-committees"
                                    onClick={() => {
                                      setActiveDropdownId(null);
                                      setActiveNestedDropdownId(null);
                                    }}
                                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                                      currentPage.includes('past-committees')
                                        ? 'bg-[#E6F3EF] text-[#00523C] font-bold'
                                        : 'text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E]'
                                    }`}
                                  >
                                    <span>{tText(subItem.label)}</span>
                                    <ChevronDown className="-rotate-90 w-3 h-3 text-slate-400 group-hover/nested:text-[#006A4E]" />
                                  </Link>

                                  {/* Dynamic Nested Flyout Submenu for Past Committees */}
                                  {isNestedOpen && (
                                    <div className="absolute left-full top-0 pl-1.5 w-64 z-50 animate-in fade-in zoom-in-95 duration-150">
                                      <div className="bg-white rounded-2xl shadow-warm-xl border border-[#EAE3D9] p-2 space-y-1">
                                        <div className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                                          {isBn ? 'প্রাক্তন কার্যনির্বাহী পরিষদ' : 'Historic Executive Councils'}
                                        </div>

                                        {pastCommittees.map(pComm => (
                                          <Link
                                            key={pComm.id}
                                            to="team/past-committees"
                                            slug={pComm.id}
                                            onClick={() => {
                                              setActiveDropdownId(null);
                                              setActiveNestedDropdownId(null);
                                            }}
                                            className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E] cursor-pointer"
                                          >
                                            <span className="truncate">
                                              {isBn
                                                ? (pComm.name?.bn || `কার্যনির্বাহী পরিষদ — ${pComm.year}`)
                                                : (pComm.name?.en || `Executive Committee — ${pComm.year}`)}
                                            </span>
                                            <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                                              {pComm.year}
                                            </span>
                                          </Link>
                                        ))}

                                        <div className="pt-1 border-t border-slate-100">
                                          <Link
                                            to="team/past-committees"
                                            onClick={() => {
                                              setActiveDropdownId(null);
                                              setActiveNestedDropdownId(null);
                                            }}
                                            className="w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#006A4E] hover:bg-[#E6F3EF] flex items-center justify-between cursor-pointer"
                                          >
                                            <span>{isBn ? 'সকল আর্কাইভ ভিউয়ার' : 'All Past Archives →'}</span>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            }

                            return (
                              <Link
                                key={subItem.id}
                                to={subItem.path}
                                isExternal={subItem.isExternal}
                                onClick={() => {
                                  setActiveDropdownId(null);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                                  isItemActive(subItem.path)
                                    ? 'bg-[#E6F3EF] text-[#00523C] font-bold'
                                    : 'text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E]'
                                }`}
                              >
                                <span>{tText(subItem.label)}</span>
                                {subItem.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  isExternal={item.isExternal}
                  className={`px-2 xl:px-2.5 2xl:px-3 py-1.5 xl:py-2 rounded-xl transition-colors cursor-pointer shrink-0 whitespace-nowrap ${
                    isItemActive(item.path)
                      ? 'text-[#006A4E] bg-[#E6F3EF]'
                      : 'hover:text-[#006A4E] hover:bg-slate-50'
                  }`}
                >
                  <span className="whitespace-nowrap">{tText(item.label)}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Action Cluster (Large Screens) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2.5 shrink-0">
            {headerSettings.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 xl:p-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-600 hover:text-[#006A4E] border border-[#EAE3D9] transition-colors cursor-pointer shrink-0"
                title={isBn ? 'অনুসন্ধান করুন (Search)' : 'Search Infinity Bangladesh'}
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            {headerSettings.showSupportButton && (
              <Link
                to={headerSettings.supportButtonUrl || 'donate'}
                className="px-3.5 xl:px-5 py-2 xl:py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-xs xl:text-sm font-extrabold shadow-warm-sm hover:shadow-warm-md transition-all flex items-center gap-1.5 xl:gap-2 cursor-pointer transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
              >
                <Heart className="w-3.5 h-3.5 xl:w-4 xl:h-4 fill-white shrink-0" />
                <span className="whitespace-nowrap">{tText(headerSettings.supportButtonText)}</span>
              </Link>
            )}
          </div>

          {/* Mobile Right Action Cluster (Mobile & Tablet) */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {headerSettings.showSupportButton && (
              <Link
                to={headerSettings.supportButtonUrl || 'donate'}
                className="hidden sm:flex px-3 py-1.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-xs font-extrabold shadow-xs transition-all items-center gap-1.5 cursor-pointer shrink-0"
                title={tText(headerSettings.supportButtonText)}
              >
                <Heart className="w-3.5 h-3.5 fill-white shrink-0" />
                <span className="whitespace-nowrap">{tText(headerSettings.supportButtonText)}</span>
              </Link>
            )}

            {headerSettings.showSearch && (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-700 hover:text-[#006A4E] border border-[#EAE3D9] cursor-pointer shrink-0"
                title={isBn ? 'অনুসন্ধান করুন (Search)' : 'Search'}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 sm:p-2.5 rounded-xl bg-[#006A4E] text-white hover:bg-[#00523C] transition-colors cursor-pointer shrink-0 flex items-center justify-center shadow-xs"
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
                      <div className="flex items-center justify-between px-3 py-2 bg-[#FAF7F2] rounded-xl">
                        <Link
                          to={item.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs font-extrabold uppercase text-[#006A4E] tracking-wider cursor-pointer"
                        >
                          {tText(item.label)}
                        </Link>
                      </div>

                      <div className="pl-3 space-y-1 border-l-2 border-slate-100 ml-3">
                        {item.children.filter(c => c.active !== false).map(subItem => {
                          const isPastCommitteeSub = subItem.isNestedDropdown || subItem.id === 'sub-past' || subItem.path.includes('past-committees');

                          if (isPastCommitteeSub) {
                            return (
                              <div key={subItem.id} className="space-y-1">
                                <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-50">
                                  <Link
                                    to="team/past-committees"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="cursor-pointer"
                                  >
                                    {tText(subItem.label)}
                                  </Link>
                                  <button
                                    type="button"
                                    onClick={() => setMobilePastCommitteesOpen(!mobilePastCommitteesOpen)}
                                    className="p-1 text-slate-500 hover:text-[#006A4E] cursor-pointer"
                                    aria-label="Expand Past Committees"
                                  >
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobilePastCommitteesOpen ? 'rotate-180 text-[#006A4E]' : ''}`} />
                                  </button>
                                </div>

                                {mobilePastCommitteesOpen && (
                                  <div className="pl-3 space-y-1 border-l-2 border-amber-200 ml-3">
                                    {pastCommittees.map(pComm => (
                                      <Link
                                        key={pComm.id}
                                        to="team/past-committees"
                                        slug={pComm.id}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:bg-[#FAF7F2] hover:text-[#006A4E] cursor-pointer"
                                      >
                                        <span>
                                          {isBn
                                            ? (pComm.name?.bn || `কার্যনির্বাহী পরিষদ ${pComm.year}`)
                                            : (pComm.name?.en || `Executive Committee ${pComm.year}`)}
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          }

                          return (
                            <Link
                              key={subItem.id}
                              to={subItem.path}
                              isExternal={subItem.isExternal}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                                isItemActive(subItem.path)
                                  ? 'bg-[#E6F3EF] text-[#00523C] font-bold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span>{tText(subItem.label)}</span>
                              {subItem.isExternal && <ExternalLink className="w-3 h-3 text-slate-400" />}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    isExternal={item.isExternal}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
                      isItemActive(item.path)
                        ? 'bg-[#E6F3EF] text-[#00523C]'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {tText(item.label)}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Footer Links (Transparency, Donate, Volunteer) */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <Link
                to="transparency"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#FAF7F2] text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                <span>{isBn ? 'স্বচ্ছতা ও আর্থিক রিপোর্ট' : 'Transparency & Financial Reports'}</span>
              </Link>

              <Link
                to="volunteer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-[#006A4E]" />
                <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Join as Volunteer'}</span>
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <Link
                to={headerSettings.supportButtonUrl || 'donate'}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-2xl bg-[#006A4E] text-white font-extrabold text-sm shadow-warm-sm flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{tText(headerSettings.supportButtonText)}</span>
              </Link>

              <button
                type="button"
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
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
