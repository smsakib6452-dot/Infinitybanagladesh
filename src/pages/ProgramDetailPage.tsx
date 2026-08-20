import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { CampaignCard } from '../components/CampaignCard';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Users,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const ProgramDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug, navigate } = useRouter();
  const { programs, campaigns } = useData();

  const program = programs.find(p => p.slug === currentSlug) || programs[0];

  if (!program) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'কর্মসূচি পাওয়া যায়নি' : 'Program Not Found'}
        </h2>
        <button
          type="button"
          onClick={() => navigate('programs')}
          className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold"
        >
          {isBn ? 'সকল কর্মসূচিতে ফিরে যান' : 'Back to Programs'}
        </button>
      </div>
    );
  }

  // Related campaigns
  const relatedCampaigns = campaigns.filter(c => c.category === program.category || c.slug.includes(program.slug.slice(0, 4)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate('programs')}
        className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isBn ? 'সকল কার্যক্রমে ফিরে যান' : 'Back to All Programs'}</span>
      </button>

      {/* Program Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            {program.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            {tText(program.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
            {tText(program.shortDescription)}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('donate')}
              className="px-6 py-3 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm inline-flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? 'এই উদ্যোগে সহায়তা দিন' : 'Support This Program'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('volunteer')}
              className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Users className="w-4 h-4 text-teal-700" />
              <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer With Us'}</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-100">
            <img
              src={program.imageUrl}
              alt={tText(program.title)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Program Details & Impact Points */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {isBn ? 'কর্মসূচির বিস্তারিত বিবরণ' : 'In-depth Overview & Implementation'}
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {tText(program.fullDetails)}
            </p>
          </div>

          {/* Highlights & Ethics */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {isBn ? 'কাজের মূল বৈশিষ্ট্য ও প্রভাব' : 'Key Highlights & Methodologies'}
            </h3>
            <div className="space-y-3">
              {(isBn ? program.impactHighlights.bn : program.impactHighlights.en).map((hl, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-800 font-medium">{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-900 text-white rounded-3xl space-y-4 shadow-md">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-400" />
              {isBn ? 'স্বচ্ছতা ও মাঠপর্যায়ের হিসাব' : 'Field Auditing Policy'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn
                ? 'এই কর্মসূচির আওতায় সংগৃহীত সকল অনুদান সরাসরি সামগ্রী ক্রয়ে ব্যবহৃত হয়। প্রতি ধাপের বিতরণ তালিকা অডিট কমিটি দ্বারা সংরক্ষিত থাকে।'
                : 'All donations allocated to this program are directly utilized for procurement and logistics without administrative leaks.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('transparency')}
              className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs transition-colors"
            >
              {isBn ? 'স্বচ্ছতা রিপোর্ট দেখুন' : 'View Transparency Policy'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Campaigns */}
      {relatedCampaigns.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">
            {isBn ? 'সম্পর্কিত ক্যাম্পেইনসমূহ' : 'Related Campaigns Under This Pillar'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCampaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
