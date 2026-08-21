import React, { useState, useEffect } from 'react';
import { ImpactStory } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  X,
  Plus,
  Trash2,
  FolderOpen,
  Image as ImageIcon,
  Crop,
  Heart,
  CheckCircle2
} from 'lucide-react';
import { ImageEditorModal } from './ImageEditorModal';

interface StoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  story: ImpactStory | null;
  onSave: (storyData: Omit<ImpactStory, 'id'> | ImpactStory) => void;
  onOpenMediaPicker: (callback: (url: string) => void) => void;
  isBn?: boolean;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  isOpen,
  onClose,
  story,
  onSave,
  onOpenMediaPicker,
  isBn = false
}) => {
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [personEn, setPersonEn] = useState('');
  const [personBn, setPersonBn] = useState('');
  const [locationEn, setLocationEn] = useState('Hathazari, Chattogram');
  const [locationBn, setLocationBn] = useState('হাটহাজারী, চট্টগ্রাম');
  const [date, setDate] = useState('');
  const [storyEn, setStoryEn] = useState('');
  const [storyBn, setStoryBn] = useState('');
  const [impactEn, setImpactEn] = useState('');
  const [impactBn, setImpactBn] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/infinity-cover-hero.jpg');
  const [consentConfirmed, setConsentConfirmed] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (story) {
      setTitleEn(story.title?.en || '');
      setTitleBn(story.title?.bn || '');
      setSlug(story.slug || '');
      setPersonEn(story.personOrCommunity?.en || '');
      setPersonBn(story.personOrCommunity?.bn || '');
      setLocationEn(story.location?.en || 'Hathazari, Chattogram');
      setLocationBn(story.location?.bn || 'হাটহাজারী, চট্টগ্রাম');
      setDate(story.date || '');
      setStoryEn(story.story?.en || '');
      setStoryBn(story.story?.bn || '');
      setImpactEn(story.impact?.en || '');
      setImpactBn(story.impact?.bn || '');
      setImageUrl(story.imageUrl || '/images/infinity-cover-hero.jpg');
      setConsentConfirmed(story.consentConfirmed ?? true);
      setIsFeatured(Boolean(story.isFeatured));
    } else {
      setTitleEn('');
      setTitleBn('');
      setSlug('');
      setPersonEn('');
      setPersonBn('');
      setLocationEn('Hathazari, Chattogram');
      setLocationBn('হাটহাজারী, চট্টগ্রাম');
      setDate(`${new Date().getFullYear()}`);
      setStoryEn('');
      setStoryBn('');
      setImpactEn('');
      setImpactBn('');
      setImageUrl('/images/infinity-cover-hero.jpg');
      setConsentConfirmed(true);
      setIsFeatured(false);
    }
    setErrorMsg(null);
  }, [story, isOpen]);

  if (!isOpen) return null;

  const generateSlug = (text: string) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে ইংরেজি শিরোনাম দিন।' : 'Story English title is required.');
      return;
    }

    const finalSlug = slug.trim() || generateSlug(titleEn) || `story-${Date.now()}`;

    const storyData: Omit<ImpactStory, 'id'> = {
      slug: finalSlug,
      title: { en: titleEn.trim(), bn: titleBn.trim() || titleEn.trim() },
      personOrCommunity: { en: personEn.trim(), bn: personBn.trim() || personEn.trim() },
      location: { en: locationEn.trim(), bn: locationBn.trim() },
      date: date.trim() || `${new Date().getFullYear()}`,
      story: { en: storyEn.trim(), bn: storyBn.trim() },
      impact: { en: impactEn.trim(), bn: impactBn.trim() },
      imageUrl: imageUrl.trim() || '/images/infinity-cover-hero.jpg',
      consentConfirmed,
      isFeatured,
      status: 'published'
    };

    if (story) {
      onSave({ ...storyData, id: story.id } as ImpactStory);
    } else {
      onSave(storyData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#EAE3D9] shadow-warm-xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#11241E] text-white p-5 flex items-center justify-between border-b border-emerald-900/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#006A4E] text-white flex items-center justify-center font-bold shrink-0">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-display">
                {story ? (isBn ? 'গল্প সম্পাদনা' : `Edit Story: ${story.title.en}`) : (isBn ? 'নতুন বাস্তব জীবনের গল্প' : 'Publish New Impact Story')}
              </h3>
              <p className="text-xs text-emerald-200/80">
                {isBn ? 'সুবিধাভোগী বা রূপান্তরের গল্প সংরক্ষণ করুন।' : 'Document verified field transformation stories.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Story Title (English) *</label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => {
                  setTitleEn(e.target.value);
                  if (!story && !slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. Empowering Rina’s Education"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">গল্পের শিরোনাম (বাংলা)</label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: রীনার মুখে শিক্ষার হাসি"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm font-bengali"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Beneficiary / Person (EN)</label>
              <input
                type="text"
                value={personEn}
                onChange={(e) => setPersonEn(e.target.value)}
                placeholder="e.g. Rina Akter, Age 9"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">সুবিধাভোগী (বাংলা)</label>
              <input
                type="text"
                value={personBn}
                onChange={(e) => setPersonBn(e.target.value)}
                placeholder="যেমন: রীনা আক্তার, বয়স ৯"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Date / Year</label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2026"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#006A4E]" />
                <span>Story Photo</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenMediaPicker((url) => setImageUrl(url))}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[#006A4E] text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Pick Media</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsImageEditorOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-[#006A4E] text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <Crop className="w-3.5 h-3.5" />
                  <span>Crop & Adjust</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              <div className="sm:col-span-4 aspect-4/3 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                <img
                  src={getAssetUrl(imageUrl)}
                  alt="Story Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="sm:col-span-8">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Story Narrative (English)</label>
              <textarea
                rows={4}
                value={storyEn}
                onChange={(e) => setStoryEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">গল্পের বিবরণ (বাংলা)</label>
              <textarea
                rows={4}
                value={storyBn}
                onChange={(e) => setStoryBn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Impact Result (English)</label>
              <textarea
                rows={3}
                value={impactEn}
                onChange={(e) => setImpactEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">প্রভাব ও ফলাফল (বাংলা)</label>
              <textarea
                rows={3}
                value={impactBn}
                onChange={(e) => setImpactBn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#EAE3D9] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{story ? 'Save Story' : 'Publish Story'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Image Editor Modal */}
      {isImageEditorOpen && (
        <ImageEditorModal
          isOpen={isImageEditorOpen}
          onClose={() => setIsImageEditorOpen(false)}
          imageUrl={imageUrl}
          title={`Crop Story Photo: ${titleEn || 'Impact Story'}`}
          defaultAspectRatio="4:3"
          onSave={(croppedUrl) => {
            setImageUrl(croppedUrl);
            setIsImageEditorOpen(false);
          }}
          onOpenMediaLibrary={() => {
            setIsImageEditorOpen(false);
            onOpenMediaPicker((url) => setImageUrl(url));
          }}
        />
      )}
    </div>
  );
};
