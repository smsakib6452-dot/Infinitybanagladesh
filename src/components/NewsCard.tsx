import React from 'react';
import { NewsArticle } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

interface NewsCardProps {
  article: NewsArticle;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();

  return (
    <article className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative aspect-16/9 overflow-hidden bg-slate-100">
        <img
          src={getAssetUrl(article.imageUrl)}
          alt={tText(article.title)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-800 text-white backdrop-blur-xs">
          {article.category}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-600" />
              {article.date}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span className="truncate">{article.author}</span>
            </span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2">
            {tText(article.title)}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {tText(article.excerpt)}
          </p>
        </div>

        {/* Tags and Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1 text-[11px] text-slate-400 truncate max-w-[60%]">
            <Tag className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">{article.tags.join(', ')}</span>
          </div>

          <button
            type="button"
            onClick={() => navigate('news/detail', article.slug)}
            className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1 cursor-pointer"
          >
            <span>{isBn ? 'পড়ুন' : 'Read Article'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
