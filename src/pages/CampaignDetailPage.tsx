import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { CampaignCard } from '../components/CampaignCard';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Heart,
  CheckCircle2,
  Share2,
  FileText,
  Video,
  ShieldCheck,
  Sparkles,
  Users
} from 'lucide-react';

export const CampaignDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug, navigate } = useRouter();
  const { campaigns } = useData();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const campaign = campaigns.find(c => c.slug === currentSlug) || campaigns[0];

  if (!campaign) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'ক্যাম্পেইন পাওয়া যায়নি' : 'Campaign Not Found'}
        </h2>
        <button
          type="button"
          onClick={() => navigate('campaigns')}
          className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold"
        >
          {isBn ? 'সকল ক্যাম্পেইনে ফিরে যান' : 'Back to Campaigns'}
        </button>
      </div>
    );
  }

  const otherCampaigns = campaigns.filter(c => c.id !== campaign.id).slice(0, 3);

  // Gallery items formatted for lightbox
  const galleryItems = campaign.galleryImages.map((img, i) => ({
    id: `camp-img-${i}`,
    title: campaign.title,
    caption: campaign.title,
    imageUrl: img,
    category: 'Campaigns' as const,
    date: campaign.date
  }));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tText(campaign.title),
        text: tText(campaign.description),
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(isBn ? 'লিঙ্কটি কপি করা হয়েছে!' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Back button and Share */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate('campaigns')}
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isBn ? 'সকল ক্যাম্পেইনে ফিরে যান' : 'Back to All Campaigns'}</span>
        </button>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{isBn ? 'শেয়ার করুন' : 'Share Campaign'}</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
            {campaign.category}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
            {campaign.status === 'active' ? (isBn ? 'চলমান' : 'Active') : campaign.status}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-tight">
          {tText(campaign.title)}
        </h1>

        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-700" />
            {campaign.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-teal-700" />
            {tText(campaign.location)}
          </span>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 max-h-[520px] bg-slate-100 border border-slate-200">
          <img
            src={campaign.imageUrl}
            alt={tText(campaign.title)}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Campaign Storytelling Body */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Overview */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 font-display">
              {isBn ? 'ক্যাম্পেইনের পটভূমি ও বিবরণ' : 'Campaign Overview & Story'}
            </h2>
            <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
              {tText(campaign.description)}
            </p>
          </div>

          {/* Objectives */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {isBn ? 'মূল উদ্দেশ্যসমূহ' : 'Key Campaign Objectives'}
            </h3>
            <div className="space-y-3">
              {(isBn ? campaign.objectives.bn : campaign.objectives.en).map((obj, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-teal-50/60 border border-teal-100">
                  <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-800 font-medium">{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 font-display">
              {isBn ? 'মাঠপর্যায়ে পরিচালিত কার্যক্রম' : 'Activities & Ground Execution'}
            </h3>
            <div className="space-y-3">
              {(isBn ? campaign.activities.bn : campaign.activities.en).map((act, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-slate-700">
                  <span className="w-2 h-2 rounded-full bg-teal-600 mt-2 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficiaries & Impact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                {isBn ? 'উপকারভোগী গোষ্ঠী' : 'Target Beneficiaries'}
              </span>
              <p className="text-sm text-slate-800 font-medium leading-relaxed">
                {tText(campaign.beneficiaries)}
              </p>
            </div>

            <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wider block">
                {isBn ? 'বাস্তব প্রভাব ও পরিবর্তন' : 'Measured Impact & Dignity'}
              </span>
              <p className="text-sm text-teal-950 font-medium leading-relaxed">
                {tText(campaign.impact)}
              </p>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          {campaign.galleryImages && campaign.galleryImages.length > 0 && (
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-slate-900">
                {isBn ? 'ক্যাম্পেইনের আলোকচিত্র' : 'Field Photo Documentation'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {campaign.galleryImages.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setLightboxIndex(idx)}
                    className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-md group"
                  >
                    <img
                      src={img}
                      alt={`${tText(campaign.title)} photo ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      {isBn ? 'বড় করে দেখুন' : 'Click to View'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Donation Support Box */}
          <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl border border-teal-800">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                {isBn ? 'সহায়তার সুযোগ' : 'Make a Difference'}
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {isBn ? 'এই ক্যাম্পেইনে পাশে দাঁড়ান' : 'Support This Campaign'}
              </h3>
              <p className="text-xs text-teal-100/80 leading-relaxed">
                {isBn
                  ? 'আপনার আন্তরিক সহযোগিতা সরাসরি শিশুদের নতুন পোশাক ও পরিবারের প্রয়োজনীয় খাদ্য সরবরাহে ব্যবহৃত হবে।'
                  : 'Your contribution is directly mapped to transparent procurement for this specific field campaign.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('donate')}
              className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-slate-950" />
              <span>{isBn ? 'অনুদানের তথ্য দেখুন' : 'Donate to Campaign'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('volunteer')}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-200 font-bold text-xs border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Volunteer in this Drive'}</span>
            </button>
          </div>

          {/* Transparency & Audit Box */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs text-xs">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              {isBn ? 'ক্যাম্পেইন অডিট নীতিমালা' : 'Audited Campaign Protocol'}
            </div>
            <p className="text-slate-600 leading-relaxed">
              {isBn
                ? 'ক্যাম্পেইনের প্রতিটি ব্যয় রসিদ ও বিতরণ তালিকা স্বচ্ছতার সাথে অডিট সেলে সংরক্ষিত রয়েছে।'
                : 'All expenditures, distribution logs, and donor receipts for this campaign are preserved in our central audit records.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('transparency')}
              className="text-xs font-bold text-teal-800 hover:underline block"
            >
              {isBn ? 'স্বচ্ছতা ও রিপোর্ট পাতায় যান &rarr;' : 'Go to Transparency Portal &rarr;'}
            </button>
          </div>
        </div>
      </div>

      {/* Related Campaigns */}
      {otherCampaigns.length > 0 && (
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-2xl font-bold text-slate-900">
            {isBn ? 'অন্যান্য ক্যাম্পেইনসমূহ' : 'Other Verified Campaigns'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCampaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          photos={galleryItems}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};
