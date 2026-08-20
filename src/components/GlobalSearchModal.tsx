import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import {
  Search,
  X,
  Flag,
  BookOpen,
  Heart,
  FileText,
  Calendar,
  Image,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { PageRoute } from '../types';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate } = useRouter();
  const { isBn, tText } = useLanguage();
  const { campaigns, programs, news, stories, events, reports, gallery } = useData();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Search through all entities
  const matchingCampaigns = cleanQuery
    ? campaigns.filter(
        c =>
          c.title.en.toLowerCase().includes(cleanQuery) ||
          c.title.bn.toLowerCase().includes(cleanQuery) ||
          c.description.en.toLowerCase().includes(cleanQuery) ||
          c.description.bn.toLowerCase().includes(cleanQuery) ||
          c.category.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingPrograms = cleanQuery
    ? programs.filter(
        p =>
          p.title.en.toLowerCase().includes(cleanQuery) ||
          p.title.bn.toLowerCase().includes(cleanQuery) ||
          p.shortDescription.en.toLowerCase().includes(cleanQuery) ||
          p.shortDescription.bn.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingStories = cleanQuery
    ? stories.filter(
        s =>
          s.title.en.toLowerCase().includes(cleanQuery) ||
          s.title.bn.toLowerCase().includes(cleanQuery) ||
          s.story.en.toLowerCase().includes(cleanQuery) ||
          s.story.bn.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingNews = cleanQuery
    ? news.filter(
        n =>
          n.title.en.toLowerCase().includes(cleanQuery) ||
          n.title.bn.toLowerCase().includes(cleanQuery) ||
          n.excerpt.en.toLowerCase().includes(cleanQuery) ||
          n.excerpt.bn.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingEvents = cleanQuery
    ? events.filter(
        e =>
          e.title.en.toLowerCase().includes(cleanQuery) ||
          e.title.bn.toLowerCase().includes(cleanQuery) ||
          e.description.en.toLowerCase().includes(cleanQuery) ||
          e.description.bn.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingReports = cleanQuery
    ? reports.filter(
        r =>
          r.title.en.toLowerCase().includes(cleanQuery) ||
          r.title.bn.toLowerCase().includes(cleanQuery) ||
          r.description.en.toLowerCase().includes(cleanQuery) ||
          r.type.toLowerCase().includes(cleanQuery)
      )
    : [];

  const totalResults =
    matchingCampaigns.length +
    matchingPrograms.length +
    matchingStories.length +
    matchingNews.length +
    matchingEvents.length +
    matchingReports.length;

  const handleSelect = (page: PageRoute, slug?: string) => {
    setIsSearchOpen(false);
    navigate(page, slug);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-teal-700 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={
              isBn
                ? 'ক্যাম্পেইন, প্রোগ্রাম, সংবাদ, গল্প কিংবা রিপোর্ট খুঁজুন...'
                : 'Search campaigns, programs, news, stories, reports...'
            }
            className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md font-medium"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 divide-y divide-slate-100">
          {!cleanQuery && (
            <div className="py-8 text-center text-slate-500 text-sm space-y-2">
              <p className="font-medium text-slate-700">
                {isBn ? 'ইনফিনিটি বাংলাদেশ-এর তথ্যাবলী খুঁজুন' : 'Search Infinity Bangladesh Knowledge Base'}
              </p>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'যেমন: সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ, রমজান ফুড প্যাক, শীতবস্ত্র, স্বেচ্ছাসেবী, অডিট...'
                  : 'Try typing "Eid", "Ramadan", "Winter", "Volunteer", "Audit", "Child Welfare"...'}
              </p>
            </div>
          )}

          {cleanQuery && totalResults === 0 && (
            <div className="py-12 text-center text-slate-500 text-sm space-y-2">
              <p className="font-semibold text-slate-700">
                {isBn ? 'কোনো ফলাফল পাওয়া যায়নি' : 'No results found for this search'}
              </p>
              <p className="text-xs text-slate-400">
                {isBn ? 'অনুগ্রহ করে ভিন্ন কোনো শব্দ দিয়ে চেষ্টা করুন।' : 'Try using different keywords or check spelling.'}
              </p>
            </div>
          )}

          {/* Campaigns */}
          {matchingCampaigns.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2">
                <Flag className="w-3.5 h-3.5" />
                {isBn ? 'ক্যাম্পেইনসমূহ' : 'Campaigns'} ({matchingCampaigns.length})
              </span>
              <div className="space-y-1.5">
                {matchingCampaigns.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelect('campaigns/detail', c.slug)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                        {tText(c.title)}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tText(c.description)}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Programs */}
          {matchingPrograms.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                {isBn ? 'কার্যক্রম / প্রোগ্রাম' : 'Programs'} ({matchingPrograms.length})
              </span>
              <div className="space-y-1.5">
                {matchingPrograms.map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => handleSelect('programs/detail', p.slug)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                        {tText(p.title)}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tText(p.shortDescription)}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stories */}
          {matchingStories.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2">
                <Heart className="w-3.5 h-3.5" />
                {isBn ? 'মানবিক গল্প' : 'Impact Stories'} ({matchingStories.length})
              </span>
              <div className="space-y-1.5">
                {matchingStories.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleSelect('stories/detail', s.slug)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                        {tText(s.title)}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tText(s.story)}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* News */}
          {matchingNews.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2">
                <FileText className="w-3.5 h-3.5" />
                {isBn ? 'সংবাদ ও আপডেট' : 'News Articles'} ({matchingNews.length})
              </span>
              <div className="space-y-1.5">
                {matchingNews.map(n => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => handleSelect('news/detail', n.slug)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                        {tText(n.title)}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-1">{tText(n.excerpt)}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Transparency Reports */}
          {matchingReports.length > 0 && (
            <div className="pt-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isBn ? 'স্বচ্ছতা ও রিপোর্ট' : 'Transparency Reports'} ({matchingReports.length})
              </span>
              <div className="space-y-1.5">
                {matchingReports.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleSelect('transparency')}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-teal-50/80 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900 group-hover:text-teal-800">
                        {tText(r.title)}
                      </div>
                      <div className="text-xs text-slate-500">{r.type} &bull; {r.year}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>{isBn ? 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' : 'Team Infinity — United for Humanity'}</span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
