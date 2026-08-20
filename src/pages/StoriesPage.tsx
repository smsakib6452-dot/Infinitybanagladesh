import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import { StoryCard } from '../components/StoryCard';
import { SocialShareModal } from '../components/SocialShareModal';
import { Heart, Sparkles, ShieldCheck, Share2, MapPin, Calendar, ArrowRight } from 'lucide-react';

export const StoriesPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { stories } = useData();
  const { navigate } = useRouter();

  const [shareStory, setShareStory] = useState<{ title: string; slug: string } | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/80 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5" />
            {isBn ? 'মানবিক দলিল ও বাস্তব গল্প' : 'Impact Stories & Human Realities'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isBn ? 'প্রতিটি মানুষের মুখে হাসি ফোটানোর গল্প' : 'Stories of Dignity, Hope & Transformation'}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটির স্বেচ্ছাসেবী কার্যক্রম কীভাবে প্রান্তিক মানুষের জীবনে ইতিবাচক প্রভাব ফেলেছে তার সত্য ও মর্যাদাপূর্ণ বিবরণ।'
              : 'Authentic accounts of change across communities in Bangladesh, documented with strict beneficiary consent and human dignity.'}
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo with Consent Badge */}
                <div className="relative aspect-16/9 bg-slate-900 overflow-hidden">
                  <img
                    src={story.imageUrl}
                    alt={tText(story.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md text-teal-300 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{tText(story.location)}</span>
                  </div>
                  {story.consentConfirmed && (
                    <div className="absolute bottom-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-emerald-500/30">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isBn ? 'সম্মতি নিশ্চিতকৃত' : 'Consent Verified'}</span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="font-semibold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-md">
                      {tText(story.personOrCommunity)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {story.date}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors leading-snug">
                    {tText(story.title)}
                  </h2>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {tText(story.story)}
                  </p>

                  <div className="bg-teal-50/70 border border-teal-100 rounded-2xl p-4 space-y-1">
                    <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-700" />
                      {isBn ? 'বাস্তব প্রভাব ও পরিবর্তন' : 'Measured Impact'}
                    </span>
                    <p className="text-xs text-teal-950 leading-relaxed font-medium">
                      {tText(story.impact)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 md:p-8 pt-0 flex items-center justify-between border-t border-slate-100 mt-4">
                <button
                  onClick={() => navigate('stories/detail', story.slug)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-950 transition-colors"
                >
                  <span>{isBn ? 'সম্পূর্ণ গল্পটি পড়ুন' : 'Read Full Story'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShareStory({ title: tText(story.title), slug: story.slug })}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
                  title="Share Story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Privacy Note */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-800">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            {isBn ? 'আমাদের মানবিক মিডিয়া অঙ্গীকার' : 'Our Humanitarian Media Code'}
          </div>
          <p className="text-xs text-slate-500 leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটি কখনোই সুবিধাভোগী ব্যক্তিদের দারিদ্র্যকে প্রচারণার স্বার্থে অসম্মান করে না। সকল তথ্য ও ছবি ব্যক্তির আত্মমর্যাদা ও নিরাপত্তার নিশ্চয়তা দিয়ে সংগৃহীত।'
              : 'Team Infinity adheres strictly to non-exploitative storytelling. Every beneficiary profile is published with full consent, preserving dignity and human respect.'}
          </p>
        </div>
      </div>

      {shareStory && (
        <SocialShareModal
          isOpen={Boolean(shareStory)}
          onClose={() => setShareStory(null)}
          title={shareStory.title}
          url={typeof window !== 'undefined' ? `${window.location.origin}/#/stories/${shareStory.slug}` : undefined}
        />
      )}
    </div>
  );
};
