import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { ImpactCounter } from '../components/ImpactCounter';
import { StoryCard } from '../components/StoryCard';
import { VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import { ArrowLeft, ShieldCheck, Heart, MapPin, Sparkles } from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { metrics, stories } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <SectionHeading
        badge={isBn ? 'বাস্তব পরিবর্তন ও মূল্যায়ন' : 'Measurable Change'}
        title={isBn ? 'আমাদের কাজের প্রভাব ও পরিসংখ্যান' : 'Our Measured Community Impact'}
        subtitle={
          isBn
            ? 'প্রতিটি সংখ্যা মানুষের হাসির প্রতীক। সততা এবং মাঠপর্যায়ের হিসাবের ভিত্তিতে সংগৃহীত তথ্যাবলী।'
            : 'Explore the verified impact numbers and authentic stories of change across communities in Bangladesh.'
        }
      />

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(m => (
          <ImpactCounter key={m.id} metric={m} />
        ))}
      </div>

      {/* Verified Org Pledge */}
      <VerifiedOrganizationPledge />

      {/* Human Stories Section */}
      <div className="space-y-8 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
            {isBn ? 'মানবিক দলিল' : 'Human Stories'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            {isBn ? 'বাস্তব জীবনের অমলিন গল্প' : 'Stories of Hope and Transformation'}
          </h2>
          <p className="text-sm text-slate-600">
            {isBn
              ? 'ব্যক্তির আত্মসম্মান ও সম্মতি রক্ষা করে সংকলিত বাস্তব অভিজ্ঞতা।'
              : 'True narratives of dignity, relief, and hope documented with strict beneficiary consent.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const StoryDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug, navigate } = useRouter();
  const { stories } = useData();

  const story = stories.find(s => s.slug === currentSlug) || stories[0];

  if (!story) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'গল্পটি পাওয়া যায়নি' : 'Story Not Found'}
        </h2>
        <button
          type="button"
          onClick={() => navigate('impact')}
          className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold"
        >
          {isBn ? 'ইমপ্যাক্ট পাতায় ফিরে যান' : 'Back to Impact'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('impact')}
        className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isBn ? 'সকল গল্পে ফিরে যান' : 'Back to Stories & Impact'}</span>
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            {tText(story.personOrCommunity)}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-teal-700" />
            {tText(story.location)}
          </span>
          <span className="text-xs text-slate-400">&bull; {story.date}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          {tText(story.title)}
        </h1>
      </div>

      {/* Featured Photo */}
      <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-100 border border-slate-200">
        <img
          src={story.imageUrl}
          alt={tText(story.title)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Story Narrative */}
      <div className="p-8 sm:p-10 bg-white rounded-3xl border border-slate-200 space-y-6 shadow-xs">
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base sm:text-lg whitespace-pre-line">
          {tText(story.story)}
        </div>

        {/* Impact Box */}
        <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
          <div className="flex items-center gap-2 text-teal-950 font-bold text-base">
            <Sparkles className="w-5 h-5 text-teal-700" />
            <span>{isBn ? 'সৃষ্ট পরিবর্তন ও বাস্তব ফলাফল' : 'Direct Impact & Outcomes'}</span>
          </div>
          <p className="text-sm text-teal-900 leading-relaxed">
            {tText(story.impact)}
          </p>
        </div>

        {/* Dignity & Ethics declaration */}
        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0" />
          <span>
            {isBn
              ? 'এই তথ্য ও ছবি সম্পূর্ণ সম্মতি এবং আত্মমর্যাদা বজায় রেখে প্রকাশ করা হয়েছে।'
              : 'This story and photography were documented with explicit consent, upholding full dignity and privacy.'}
          </span>
        </div>
      </div>
    </div>
  );
};
