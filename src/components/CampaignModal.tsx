import React, { useState, useEffect } from 'react';
import { Campaign, BilingualText, BilingualList } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  X,
  Plus,
  Trash2,
  FolderOpen,
  Image as ImageIcon,
  Crop,
  Flag,
  Calendar,
  MapPin,
  Heart,
  DollarSign,
  Users,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ImageEditorModal } from './ImageEditorModal';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | null;
  onSave: (campaignData: Omit<Campaign, 'id'> | Campaign) => void;
  onOpenMediaPicker: (callback: (url: string) => void) => void;
  isBn?: boolean;
}

export const CampaignModal: React.FC<CampaignModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onSave,
  onOpenMediaPicker,
  isBn = false
}) => {
  // Form State
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Seasonal Support');
  const [status, setStatus] = useState<Campaign['status']>('active');
  const [isFeatured, setIsFeatured] = useState(false);
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [locationEn, setLocationEn] = useState('Hathazari, Chattogram');
  const [locationBn, setLocationBn] = useState('হাটহাজারী, চট্টগ্রাম');
  const [targetAmountBDT, setTargetAmountBDT] = useState('');
  const [raisedAmountBDT, setRaisedAmountBDT] = useState('');
  const [beneficiariesEn, setBeneficiariesEn] = useState('');
  const [beneficiariesBn, setBeneficiariesBn] = useState('');
  const [beneficiariesCount, setBeneficiariesCount] = useState<string | number>('500');
  const [volunteersCount, setVolunteersCount] = useState<string | number>('50');
  const [imageUrl, setImageUrl] = useState('/images/infinity-cover-hero.jpg');
  const [videoUrl, setVideoUrl] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionBn, setDescriptionBn] = useState('');
  const [detailsEn, setDetailsEn] = useState('');
  const [detailsBn, setDetailsBn] = useState('');
  const [impactEn, setImpactEn] = useState('');
  const [impactBn, setImpactBn] = useState('');
  const [objectivesEn, setObjectivesEn] = useState<string[]>(['']);
  const [objectivesBn, setObjectivesBn] = useState<string[]>(['']);
  const [activitiesEn, setActivitiesEn] = useState<string[]>(['']);
  const [activitiesBn, setActivitiesBn] = useState<string[]>(['']);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [activeFormTab, setActiveFormTab] = useState<'general' | 'content' | 'financials' | 'media'>('general');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync state when editing an existing campaign or adding a new one
  useEffect(() => {
    if (campaign) {
      setTitleEn(campaign.title?.en || '');
      setTitleBn(campaign.title?.bn || '');
      setSlug(campaign.slug || '');
      setCategory(campaign.category || 'Seasonal Support');
      setStatus(campaign.status || 'active');
      setIsFeatured(Boolean(campaign.isFeatured));
      setDate(campaign.date || '');
      setEndDate(campaign.endDate || '');
      setLocationEn(campaign.location?.en || 'Hathazari, Chattogram');
      setLocationBn(campaign.location?.bn || 'হাটহাজারী, চট্টগ্রাম');
      setTargetAmountBDT(campaign.targetAmountBDT || '');
      setRaisedAmountBDT(campaign.raisedAmountBDT || '');
      setBeneficiariesEn(campaign.beneficiaries?.en || '');
      setBeneficiariesBn(campaign.beneficiaries?.bn || '');
      setBeneficiariesCount(campaign.beneficiariesCount || '500');
      setVolunteersCount(campaign.volunteersCount || '50');
      setImageUrl(campaign.imageUrl || '/images/infinity-cover-hero.jpg');
      setVideoUrl(campaign.videoUrl || '');
      setDescriptionEn(campaign.description?.en || '');
      setDescriptionBn(campaign.description?.bn || '');
      setDetailsEn(campaign.details?.en || '');
      setDetailsBn(campaign.details?.bn || '');
      setImpactEn(campaign.impact?.en || '');
      setImpactBn(campaign.impact?.bn || '');
      setObjectivesEn(campaign.objectives?.en?.length ? campaign.objectives.en : ['']);
      setObjectivesBn(campaign.objectives?.bn?.length ? campaign.objectives.bn : ['']);
      setActivitiesEn(campaign.activities?.en?.length ? campaign.activities.en : ['']);
      setActivitiesBn(campaign.activities?.bn?.length ? campaign.activities.bn : ['']);
      setGalleryImages(campaign.galleryImages || []);
    } else {
      // Clean defaults for new campaign
      setTitleEn('');
      setTitleBn('');
      setSlug('');
      setCategory('Seasonal Support');
      setStatus('active');
      setIsFeatured(false);
      setDate(`Season ${new Date().getFullYear()}`);
      setEndDate('');
      setLocationEn('Hathazari, Chattogram');
      setLocationBn('হাটহাজারী, চট্টগ্রাম');
      setTargetAmountBDT('250000');
      setRaisedAmountBDT('0');
      setBeneficiariesEn('500+ Underprivileged Children & Families');
      setBeneficiariesBn('৫০০+ সুবিধাবঞ্চিত শিশু ও পরিবার');
      setBeneficiariesCount('500');
      setVolunteersCount('40');
      setImageUrl('/images/infinity-cover-hero.jpg');
      setVideoUrl('');
      setDescriptionEn('');
      setDescriptionBn('');
      setDetailsEn('');
      setDetailsBn('');
      setImpactEn('');
      setImpactBn('');
      setObjectivesEn(['Direct festive gift distribution', 'Emergency relief food packets']);
      setObjectivesBn(['সরাসরি ঈদ উপহার সামগ্রী বিতরণ', 'জরুরি খাদ্য ও পুষ্টি সহায়তা']);
      setActivitiesEn(['Field beneficiary survey', 'Transparent door-to-door distribution']);
      setActivitiesBn(['মাঠপর্যায়ে তালিকা তৈরি ও যাচাইকরণ', 'স্বচ্ছভাবে সরাসরি বিতরণ কার্যক্রম']);
      setGalleryImages([]);
    }
    setErrorMsg(null);
    setActiveFormTab('general');
  }, [campaign, isOpen]);

  if (!isOpen) return null;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleEnChange = (val: string) => {
    setTitleEn(val);
    if (!campaign && (!slug || slug === generateSlug(titleEn))) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে ইংরেজি শিরোনাম দিন।' : 'Campaign English title is required.');
      setActiveFormTab('general');
      return;
    }

    const finalSlug = slug.trim() || generateSlug(titleEn) || `campaign-${Date.now()}`;

    const campaignData: Omit<Campaign, 'id'> = {
      slug: finalSlug,
      title: {
        en: titleEn.trim(),
        bn: titleBn.trim() || titleEn.trim()
      },
      category: category.trim() || 'Seasonal Support',
      date: date.trim() || `${new Date().getFullYear()}`,
      endDate: endDate.trim() || undefined,
      location: {
        en: locationEn.trim() || 'Hathazari, Chattogram',
        bn: locationBn.trim() || 'হাটহাজারী, চট্টগ্রাম'
      },
      status,
      isFeatured,
      targetAmountBDT: targetAmountBDT.trim() || undefined,
      raisedAmountBDT: raisedAmountBDT.trim() || undefined,
      beneficiaries: {
        en: beneficiariesEn.trim() || `${beneficiariesCount} Beneficiaries`,
        bn: beneficiariesBn.trim() || `${beneficiariesCount} সুবিধাভোগী`
      },
      beneficiariesCount: beneficiariesCount ? Number(beneficiariesCount) || beneficiariesCount : undefined,
      volunteersCount: volunteersCount ? Number(volunteersCount) || volunteersCount : undefined,
      imageUrl: imageUrl.trim() || '/images/infinity-cover-hero.jpg',
      videoUrl: videoUrl.trim() || undefined,
      description: {
        en: descriptionEn.trim() || titleEn.trim(),
        bn: descriptionBn.trim() || titleBn.trim() || titleEn.trim()
      },
      details: {
        en: detailsEn.trim() || descriptionEn.trim(),
        bn: detailsBn.trim() || descriptionBn.trim()
      },
      impact: {
        en: impactEn.trim(),
        bn: impactBn.trim()
      },
      objectives: {
        en: objectivesEn.filter(o => o.trim().length > 0),
        bn: objectivesBn.filter(o => o.trim().length > 0)
      },
      activities: {
        en: activitiesEn.filter(a => a.trim().length > 0),
        bn: activitiesBn.filter(a => a.trim().length > 0)
      },
      galleryImages: galleryImages.filter(g => g.trim().length > 0)
    };

    if (campaign) {
      onSave({ ...campaignData, id: campaign.id } as Campaign);
    } else {
      onSave(campaignData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#EAE3D9] shadow-warm-xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#11241E] text-white p-5 sm:p-6 flex items-center justify-between border-b border-emerald-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#006A4E] text-white flex items-center justify-center font-bold shrink-0">
              <Flag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-display">
                {campaign
                  ? (isBn ? 'ক্যাম্পেইন সম্পাদনা করুন' : `Edit Campaign: ${campaign.title?.en || ''}`)
                  : (isBn ? 'নতুন মানবিক ক্যাম্পেইন তৈরি করুন' : 'Create New Humanitarian Campaign')}
              </h3>
              <p className="text-xs text-emerald-200/80">
                {isBn
                  ? 'ক্যাম্পেইনের বিস্তারিত তথ্য, লক্ষ্যমাত্রা এবং মাঠপর্যায়ের ছবি সংরক্ষণ করুন।'
                  : 'Manage campaign objectives, targets, dates, cover photo, and impact.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tab Navigation */}
        <div className="flex border-b border-[#EAE3D9] bg-[#FAF7F2] px-4 sm:px-6 pt-2 shrink-0 gap-2 overflow-x-auto">
          {[
            { id: 'general', label: isBn ? 'সাধারণ তথ্য' : '1. General & Status', icon: Sparkles },
            { id: 'financials', label: isBn ? 'তহবিল ও পরিসংখ্যান' : '2. Funds & Impact', icon: DollarSign },
            { id: 'content', label: isBn ? 'বর্ণনা ও কার্যক্রম' : '3. Content & Objectives', icon: Heart },
            { id: 'media', label: isBn ? 'ছবি ও মিডিয়া' : '4. Cover & Media', icon: ImageIcon }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeFormTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFormTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-[#006A4E] text-[#006A4E] bg-white rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center justify-between">
            <span>{errorMsg}</span>
            <button onClick={() => setErrorMsg(null)} className="text-rose-500 hover:text-rose-800">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* TAB 1: GENERAL */}
          {activeFormTab === 'general' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Campaign Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => handleTitleEnChange(e.target.value)}
                    placeholder="e.g. Eid Joy for Underprivileged Children"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    ক্যাম্পেইন শিরোনাম (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={titleBn}
                    onChange={(e) => setTitleBn(e.target.value)}
                    placeholder="যেমন: সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    URL Slug / Identifier
                  </label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="eid-joy-2026"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold focus:outline-none focus:bg-white"
                  >
                    <option value="Seasonal Support">Seasonal Support (ঈদ/উৎসব)</option>
                    <option value="Winter Relief">Winter Relief (শীতবস্ত্র ত্রাণ)</option>
                    <option value="Child Welfare">Child Welfare (শিশু কল্যাণ)</option>
                    <option value="Emergency Relief">Emergency Relief (জরুরি সহায়তা)</option>
                    <option value="Food Security">Food Security (খাদ্য সহায়তা)</option>
                    <option value="Education">Education (শিক্ষা সহায়তা)</option>
                    <option value="Health & Hygiene">Health & Hygiene (স্বাস্থ্যসেবা)</option>
                    <option value="Community Dignity">Community Dignity</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Campaign['status'])}
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold focus:outline-none focus:bg-white"
                  >
                    <option value="active">Active (চলমান)</option>
                    <option value="upcoming">Upcoming (আসন্ন)</option>
                    <option value="completed">Completed (সম্পন্ন)</option>
                    <option value="archived">Archived (আর্কাইভ)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Date / Season (e.g. Ramadan 2026)
                  </label>
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Eid-ul-Fitr 2026"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Location (English)
                  </label>
                  <input
                    type="text"
                    value={locationEn}
                    onChange={(e) => setLocationEn(e.target.value)}
                    placeholder="Hathazari, Chattogram"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    অবস্থান (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={locationBn}
                    onChange={(e) => setLocationBn(e.target.value)}
                    placeholder="হাটহাজারী, চট্টগ্রাম"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E6F3EF] border border-[#C2E2D7] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#00523C]">Homepage Feature Status</h4>
                  <p className="text-[11px] text-[#006A4E]">Pin this campaign on homepage top featured cards.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006A4E]"></div>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: FINANCIALS & IMPACT */}
          {activeFormTab === 'financials' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9]">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-[#006A4E]" />
                    <span>Target Fundraising Goal (BDT ৳)</span>
                  </label>
                  <input
                    type="text"
                    value={targetAmountBDT}
                    onChange={(e) => setTargetAmountBDT(e.target.value)}
                    placeholder="e.g. 500000"
                    className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold text-slate-900"
                  />
                  <p className="text-[10px] text-slate-500">Numeric BDT value for progress bar calculation.</p>
                </div>

                <div className="space-y-1.5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9]">
                  <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Raised Amount (BDT ৳)</span>
                  </label>
                  <input
                    type="text"
                    value={raisedAmountBDT}
                    onChange={(e) => setRaisedAmountBDT(e.target.value)}
                    placeholder="e.g. 350000"
                    className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold text-emerald-800"
                  />
                  <p className="text-[10px] text-slate-500">Current collected funds.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Beneficiaries Summary (English)
                  </label>
                  <input
                    type="text"
                    value={beneficiariesEn}
                    onChange={(e) => setBeneficiariesEn(e.target.value)}
                    placeholder="500+ Underprivileged Children & Families"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    সুবিধাভোগী বিবরণ (বাংলা)
                  </label>
                  <input
                    type="text"
                    value={beneficiariesBn}
                    onChange={(e) => setBeneficiariesBn(e.target.value)}
                    placeholder="৫০০+ সুবিধাবঞ্চিত শিশু ও পরিবার"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Approximate Beneficiary Count
                  </label>
                  <input
                    type="number"
                    value={beneficiariesCount}
                    onChange={(e) => setBeneficiariesCount(e.target.value)}
                    placeholder="500"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Active Volunteers Involved
                  </label>
                  <input
                    type="number"
                    value={volunteersCount}
                    onChange={(e) => setVolunteersCount(e.target.value)}
                    placeholder="50"
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONTENT & OBJECTIVES */}
          {activeFormTab === 'content' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Short Summary (English)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Brief description shown on cards and lists..."
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    সংক্ষিপ্ত বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={3}
                    value={descriptionBn}
                    onChange={(e) => setDescriptionBn(e.target.value)}
                    placeholder="কার্ড এবং তালিকায় প্রদর্শিত সংক্ষিপ্ত বিবরণ..."
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    Full Detailed Story (English)
                  </label>
                  <textarea
                    rows={4}
                    value={detailsEn}
                    onChange={(e) => setDetailsEn(e.target.value)}
                    placeholder="Comprehensive overview for the campaign detail page..."
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    সম্পূর্ণ বিস্তারিত বিবরণ (বাংলা)
                  </label>
                  <textarea
                    rows={4}
                    value={detailsBn}
                    onChange={(e) => setDetailsBn(e.target.value)}
                    placeholder="ক্যাম্পেইন বিস্তারিত পেজে প্রদর্শনের জন্য সম্পূর্ণ বিবরণ..."
                    className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                  />
                </div>
              </div>

              {/* Objectives List */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-900">Key Objectives (মূল লক্ষ্যসমূহ)</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setObjectivesEn([...objectivesEn, '']);
                      setObjectivesBn([...objectivesBn, '']);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#006A4E] text-[11px] font-bold flex items-center gap-1 hover:bg-slate-50 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Objective</span>
                  </button>
                </div>

                {objectivesEn.map((objEn, i) => (
                  <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                    <input
                      type="text"
                      value={objEn}
                      onChange={(e) => {
                        const arr = [...objectivesEn];
                        arr[i] = e.target.value;
                        setObjectivesEn(arr);
                      }}
                      placeholder={`Objective #${i + 1} (English)`}
                      className="sm:col-span-5 px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                    />
                    <input
                      type="text"
                      value={objectivesBn[i] || ''}
                      onChange={(e) => {
                        const arr = [...objectivesBn];
                        arr[i] = e.target.value;
                        setObjectivesBn(arr);
                      }}
                      placeholder={`লক্ষ্য #${i + 1} (বাংলা)`}
                      className="sm:col-span-6 px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setObjectivesEn(objectivesEn.filter((_, idx) => idx !== i));
                        setObjectivesBn(objectivesBn.filter((_, idx) => idx !== i));
                      }}
                      className="sm:col-span-1 p-1.5 text-rose-500 hover:text-rose-700 flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: COVER & MEDIA */}
          {activeFormTab === 'media' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#006A4E]" />
                    <span>Cover Photo URL (মূল আলোকচিত্র)</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenMediaPicker((pickedUrl) => setImageUrl(pickedUrl))}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[#006A4E] text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Pick Media</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsImageEditorOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[#006A4E] text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Crop className="w-3.5 h-3.5" />
                      <span>Crop & Adjust</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                  <div className="sm:col-span-4 aspect-4/3 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                    <img
                      src={getAssetUrl(imageUrl)}
                      alt="Campaign Cover Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/infinity-cover-hero.jpg';
                      }}
                    />
                  </div>
                  <div className="sm:col-span-8 space-y-2">
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="/images/infinity-cover-hero.jpg or https://..."
                      className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                    />
                    <p className="text-[11px] text-slate-500">
                      Use high-resolution ground photos from Hathazari field distributions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Optional YouTube Video URL
                </label>
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
            >
              {isBn ? 'বাতিল করুন' : 'Cancel'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {campaign
                    ? (isBn ? 'পরিবর্তন সংরক্ষণ করুন' : 'Save Campaign Changes')
                    : (isBn ? 'ক্যাম্পেইন প্রকাশ করুন' : 'Publish New Campaign')}
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Image Editor Modal */}
      {isImageEditorOpen && (
        <ImageEditorModal
          isOpen={isImageEditorOpen}
          onClose={() => setIsImageEditorOpen(false)}
          imageUrl={imageUrl}
          title={`Crop Campaign Cover: ${titleEn || 'New Campaign'}`}
          defaultAspectRatio="4:3"
          onSave={(croppedUrl) => {
            setImageUrl(croppedUrl);
            setIsImageEditorOpen(false);
          }}
          onOpenMediaLibrary={() => {
            setIsImageEditorOpen(false);
            onOpenMediaPicker((pickedUrl) => setImageUrl(pickedUrl));
          }}
        />
      )}
    </div>
  );
};
