import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { NewsCard } from '../components/NewsCard';
import {
  ArrowLeft,
  Calendar,
  User,
  Share2,
  Tag,
  BookOpen
} from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { news } = useData();

  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'Campaign Updates', 'Announcements', 'Relief Drives', 'Press Release'];

  const filteredNews = news.filter(n => {
    if (categoryFilter === 'All') return true;
    return n.category === categoryFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SectionHeading
        badge={isBn ? 'সংবাদ ও হালনাগাদ' : 'Press & Updates'}
        title={isBn ? 'সংবাদ ও বিজ্ঞপ্তি' : 'Latest News & Announcements'}
        subtitle={
          isBn
            ? 'টিম ইনফিনিটির মাঠপর্যায়ের কার্যক্রম, নতুন উদ্যোগ ও প্রাতিষ্ঠানিক খবরাখবর।'
            : 'Read the official stories, media releases, and operational updates from Infinity Bangladesh.'
        }
      />

      {/* Categories */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-teal-800 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export const NewsDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug, navigate } = useRouter();
  const { news } = useData();

  const article = news.find(n => n.slug === currentSlug) || news[0];

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'সংবাদ পাওয়া যায়নি' : 'Article Not Found'}
        </h2>
        <button
          type="button"
          onClick={() => navigate('news')}
          className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold"
        >
          {isBn ? 'সকল সংবাদে ফিরে যান' : 'Back to News'}
        </button>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tText(article.title),
        text: tText(article.excerpt),
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isBn ? 'লিঙ্ক কপি হয়েছে!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back and share */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('news')}
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? 'সকল সংবাদে ফিরে যান' : 'Back to News'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{isBn ? 'শেয়ার' : 'Share'}</span>
        </button>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
          {article.category}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
          {tText(article.title)}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-700" />
            {article.date}
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-teal-700" />
            {article.author}
          </span>
        </div>
      </div>

      {/* Featured Photo */}
      <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-100 border border-slate-200">
        <img
          src={article.imageUrl}
          alt={tText(article.title)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-8 sm:p-10 bg-white rounded-3xl border border-slate-200 space-y-6 shadow-xs">
        <p className="text-lg text-slate-800 font-semibold leading-relaxed border-b border-slate-100 pb-4">
          {tText(article.excerpt)}
        </p>

        <div className="text-slate-700 leading-relaxed space-y-4 text-base whitespace-pre-line">
          {tText(article.content)}
        </div>

        {/* Tags */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-slate-400" />
          {article.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
