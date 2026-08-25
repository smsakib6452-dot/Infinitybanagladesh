import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { CampaignCard } from '../components/CampaignCard';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

export const ProgramDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug } = useRouter();
  const { programs, campaigns } = useData();

  const program = programs.find(p => p.slug === currentSlug) || programs[0];

  if (!program) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'কর্মসূচি পাওয়া যায়নি' : 'Program Not Found'}
        </h2>
        <Link
          to="programs"
          className="px-5 py-2.5 bg-[#006A4E] text-white rounded-2xl text-sm font-bold shadow-warm-sm cursor-pointer inline-block"
        >
          {isBn ? 'সকল কর্মসূচিতে ফিরে যান' : 'Back to Programs'}
        </Link>
      </div>
    );
  }

  // Related campaigns
  const relatedCampaigns = campaigns.filter(c => c.category === program.category || c.slug.includes(program.slug.slice(0, 4)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Back Button */}
      <Link
        to="programs"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#006A4E] hover:text-[#00523C] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isBn ? 'সকল কার্যক্রমে ফিরে যান' : 'Back to All Programs'}</span>
      </Link>

      {/* Program Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5">
          <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
            {program.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            {tText(program.title)}
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
            {tText(program.shortDescription)}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="donate"
              className="px-6 py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm inline-flex items-center gap-2 shadow-warm-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? 'এই উদ্যোগে সহায়তা দিন' : 'Support This Program'}</span>
            </Link>

            <Link
              to="volunteer"
              className="px-6 py-3.5 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 font-bold text-sm border border-[#EAE3D9] inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <Users className="w-4 h-4 text-[#006A4E]" />
              <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer With Us'}</span>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="aspect-4/3 rounded-[2.5rem] overflow-hidden shadow-warm-xl border-4 border-white bg-slate-100">
            <img
              src={getAssetUrl(program.imageUrl)}
              alt={tText(program.title)}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Program Details & Impact Points */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
          <h3 className="text-xl font-bold text-slate-900 font-display">
            {isBn ? 'কর্মসূচির বিশদ বিবরণ ও কৌশল' : 'Program Scope & Approach'}
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {tText(program.fullDescription || program.fullDetails)}
          </p>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">
              {isBn ? 'মূল কার্যপদ্ধতি ও লক্ষ্যসমূহ:' : 'Key Methodologies & Goals:'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(() => {
                const hl = program.impactHighlights || (program.impactPoints as any);
                if (!hl) return null;
                const list = isBn ? hl.bn : hl.en;
                if (!Array.isArray(list)) return null;
                return list.map((point: string, index: number) => (
                  <div key={index} className="flex items-start gap-2.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Sidebar info */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 space-y-4 shadow-warm-sm">
            <h4 className="font-bold text-slate-900 text-base font-display">
              {isBn ? 'কর্মসূচি সম্পর্কিত তথ্য' : 'Program Metadata'}
            </h4>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'ক্যাটাগরি:' : 'Category:'}</span>
                <span className="font-bold text-slate-900">{program.category}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'মডেল:' : 'Model:'}</span>
                <span className="font-bold text-[#006A4E]">{isBn ? 'স্বেচ্ছাসেবী পরিচালিত' : 'Volunteer-Driven'}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-slate-500">{isBn ? 'জবাবদিহিতা:' : 'Auditing:'}</span>
                <span className="font-bold text-emerald-700">{isBn ? 'শতভাগ নিরীক্ষিত' : '100% Verified'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Campaigns */}
      {relatedCampaigns.length > 0 && (
        <div className="pt-8 border-t border-slate-200 space-y-6">
          <h3 className="text-2xl font-extrabold text-slate-900 font-display">
            {isBn ? 'এই কর্মসূচির আওতায় পরিচালিত ক্যাম্পেইন' : 'Campaigns Under This Program'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedCampaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
