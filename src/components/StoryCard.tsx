import React from 'react';
import { ImpactStory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Heart, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';

interface StoryCardProps {
  story: ImpactStory;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={story.imageUrl}
          alt={tText(story.title)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-800 backdrop-blur-xs shadow-xs">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>{tText(story.personOrCommunity)}</span>
        </div>

        <div className="absolute bottom-3 left-3 text-xs text-white/90 bg-slate-900/60 px-2 py-0.5 rounded backdrop-blur-xs flex items-center gap-1">
          <MapPin className="w-3 h-3 text-teal-300" />
          <span>{tText(story.location)}</span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2">
            {tText(story.title)}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {tText(story.story)}
          </p>
        </div>

        <div className="p-3 bg-teal-50/60 rounded-xl border border-teal-100 text-xs text-teal-900 space-y-1">
          <strong className="block font-bold">{isBn ? 'বাস্তব প্রভাব:' : 'Impact Created:'}</strong>
          <span className="line-clamp-2">{tText(story.impact)}</span>
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('stories/detail', story.slug)}
            className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isBn ? 'সম্পূর্ণ গল্প পড়ুন' : 'Read Full Story'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            {isBn ? 'সম্মতিমূলক' : 'Consent-based'}
          </span>
        </div>
      </div>
    </div>
  );
};
