import React, { useState, useEffect } from 'react';
import {
  X,
  Play,
  Film,
  AlertCircle,
  Check,
  Calendar,
  Sparkles,
  Link2,
  FolderOpen,
  Eye,
  Clock,
  Layers,
  Tag
} from 'lucide-react';
import { JourneyVideo } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { detectAndNormalizeMedia, DEFAULT_VIDEO_THUMBNAIL } from '../lib/utils/mediaHelper';
import { MediaPickerModal } from './MediaPickerModal';

interface JourneyVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoToEdit?: JourneyVideo | null;
  onSave: (videoData: Omit<JourneyVideo, 'id' | 'createdAt' | 'updatedAt'> | JourneyVideo) => void;
  existingVideosCount?: number;
}

const PREDEFINED_CATEGORIES = [
  'Organizational Journey',
  'Eid Distribution Program',
  'Winter Clothing Distribution',
  'Flood Relief Activities',
  'Educational Support',
  'Emergency Humanitarian Response',
  'Anniversary Documentary',
  'Special Milestone',
  'Youth & Volunteers',
  'General'
];

export const JourneyVideoModal: React.FC<JourneyVideoModalProps> = ({
  isOpen,
  onClose,
  videoToEdit,
  onSave,
  existingVideosCount = 0
}) => {
  const { isBn } = useLanguage();

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [timelineEn, setTimelineEn] = useState('');
  const [timelineBn, setTimelineBn] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [category, setCategory] = useState('Organizational Journey');
  const [customCategory, setCustomCategory] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPlatform, setVideoPlatform] = useState<string>('auto');
  const [customThumbnail, setCustomThumbnail] = useState('');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [isPublished, setIsPublished] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);

  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState<boolean>(false);

  // Populate fields when modal opens or edit target changes
  useEffect(() => {
    if (videoToEdit) {
      setTitleEn(videoToEdit.title?.en || (typeof videoToEdit.title === 'string' ? videoToEdit.title : ''));
      setTitleBn(videoToEdit.title?.bn || (typeof videoToEdit.title === 'string' ? videoToEdit.title : ''));
      setTimelineEn(videoToEdit.timelineLabel?.en || (typeof videoToEdit.timelineLabel === 'string' ? videoToEdit.timelineLabel : ''));
      setTimelineBn(videoToEdit.timelineLabel?.bn || (typeof videoToEdit.timelineLabel === 'string' ? videoToEdit.timelineLabel : ''));
      setDescEn(videoToEdit.description?.en || (typeof videoToEdit.description === 'string' ? videoToEdit.description : ''));
      setDescBn(videoToEdit.description?.bn || (typeof videoToEdit.description === 'string' ? videoToEdit.description : ''));
      
      const cat = videoToEdit.category || 'Organizational Journey';
      if (PREDEFINED_CATEGORIES.includes(cat)) {
        setCategory(cat);
        setCustomCategory('');
      } else {
        setCategory('Other');
        setCustomCategory(cat);
      }

      setVideoUrl(videoToEdit.videoUrl || '');
      setVideoPlatform(videoToEdit.videoPlatform || 'auto');
      setCustomThumbnail(videoToEdit.thumbnailUrl || '');
      setDisplayOrder(videoToEdit.displayOrder ?? 1);
      setIsPublished(videoToEdit.isPublished !== false);
      setIsFeatured(Boolean(videoToEdit.isFeatured));
    } else {
      setTitleEn('Infinity Bangladesh Journey');
      setTitleBn('ইনফিনিটি বাংলাদেশ পরিক্রমা');
      setTimelineEn('');
      setTimelineBn('');
      setDescEn('');
      setDescBn('');
      setCategory('Organizational Journey');
      setCustomCategory('');
      setVideoUrl('');
      setVideoPlatform('auto');
      setCustomThumbnail('');
      setDisplayOrder(existingVideosCount + 1);
      setIsPublished(true);
      setIsFeatured(existingVideosCount === 0);
    }
  }, [videoToEdit, isOpen, existingVideosCount]);

  if (!isOpen) return null;

  const detection = detectAndNormalizeMedia(videoUrl.trim());
  const effectiveThumbnail = customThumbnail.trim() || detection.thumbnailUrl || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalCategory = category === 'Other' && customCategory.trim()
      ? customCategory.trim()
      : category;

    const payload = {
      title: {
        en: titleEn.trim() || (titleBn.trim() || 'Infinity Bangladesh Journey'),
        bn: titleBn.trim() || (titleEn.trim() || 'ইনফিনিটি বাংলাদেশ পরিক্রমা')
      },
      timelineLabel: {
        en: timelineEn.trim() || 'Journey Archive',
        bn: timelineBn.trim() || (timelineEn.trim() || 'পরিক্রমা')
      },
      description: {
        en: descEn.trim(),
        bn: descBn.trim()
      },
      category: finalCategory,
      videoUrl: detection.originalUrl || videoUrl.trim(),
      videoPlatform: videoPlatform === 'auto' ? (detection.platform || 'auto') : videoPlatform,
      embedUrl: detection.embedUrl || '',
      thumbnailUrl: effectiveThumbnail,
      displayOrder: Number(displayOrder) || 1,
      isPublished,
      isFeatured
    };

    if (videoToEdit && videoToEdit.id) {
      onSave({
        ...videoToEdit,
        ...payload
      });
    } else {
      onSave(payload);
    }

    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 z-[9990] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 my-8 max-h-[92vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="px-6 py-4.5 bg-[#FAF7F2] border-b border-[#EAE3D9] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white flex items-center justify-center shadow-warm-xs">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-slate-900 font-display">
                  {videoToEdit
                    ? (isBn ? 'জার্নি ভিডিও সম্পাদনা' : 'Edit Journey Video')
                    : (isBn ? 'নতুন জার্নি ভিডিও যুক্ত করুন' : 'Add New Journey Video')}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {isBn
                    ? 'আবাউট পেইজের “আমাদের গল্প ও পরিচিতি” সেকশনের জন্য পরিক্রমা ভিডিও সংরক্ষণ করুন।'
                    : 'Manage humanitarian journey milestone documentaries for About → Overview & Story.'}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
            {/* 1. Timeline Label & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1 sm:col-span-1">
                <label className="block font-bold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>Timeline Label (English) *</span>
                </label>
                <input
                  type="text"
                  required
                  value={timelineEn}
                  onChange={e => setTimelineEn(e.target.value)}
                  placeholder="e.g. 2015–2019, 2025–2026, Feb 2026"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold focus:outline-none focus:border-[#006A4E] focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="block font-bold text-slate-800 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>টাইমলাইন লেবেল (বাংলা)</span>
                </label>
                <input
                  type="text"
                  value={timelineBn}
                  onChange={e => setTimelineBn(e.target.value)}
                  placeholder="যেমন: ২০১৫–২০১৯, ২০২৫–২০২৬"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:outline-none focus:border-[#006A4E] focus:bg-white transition-colors"
                />
              </div>

              <div className="space-y-1 sm:col-span-1">
                <label className="block font-bold text-slate-800 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>Category</span>
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] cursor-pointer"
                >
                  {PREDEFINED_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                  <option value="Other">Other (Custom Category)</option>
                </select>
              </div>
            </div>

            {category === 'Other' && (
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Custom Category Name</label>
                <input
                  type="text"
                  value={customCategory}
                  onChange={e => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category name..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                />
              </div>
            )}

            {/* 2. Video Title */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Video Title (English) *</label>
                <input
                  type="text"
                  required
                  value={titleEn}
                  onChange={e => setTitleEn(e.target.value)}
                  placeholder="e.g. Infinity Bangladesh Journey 2015–2019"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">ভিডিও শিরোনাম (বাংলা)</label>
                <input
                  type="text"
                  value={titleBn}
                  onChange={e => setTitleBn(e.target.value)}
                  placeholder="যেমন: ইনফিনিটি বাংলাদেশ পরিক্রমা ২০১৫–২০১৯"
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:outline-none focus:border-[#006A4E] focus:bg-white"
                />
              </div>
            </div>

            {/* 3. Short Description */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">Short Description (English)</label>
                <textarea
                  rows={2}
                  value={descEn}
                  onChange={e => setDescEn(e.target.value)}
                  placeholder="Our beginning, early humanitarian activities, and first years..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-bold text-slate-700">সংক্ষিপ্ত বিবরণ (বাংলা)</label>
                <textarea
                  rows={2}
                  value={descBn}
                  onChange={e => setDescBn(e.target.value)}
                  placeholder="আমাদের সূচনা পর্ব, প্রাথমিক মানবিক কার্যক্রম ও অনুপ্রেরণার গল্প..."
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:outline-none focus:border-[#006A4E] focus:bg-white"
                />
              </div>
            </div>

            {/* 4. Video URL & Platform Selection */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-[#006A4E]" />
                  <span>Public Video Link (YouTube / Facebook / Direct URL)</span>
                </span>
                <span className="text-[10px] text-slate-500">Leave blank for "Video Coming Soon" state</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-8">
                  <input
                    type="text"
                    value={videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="e.g. https://www.youtube.com/watch?v=... or https://facebook.com/.../videos/..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#EAE3D9] rounded-xl font-mono text-xs focus:outline-none focus:border-[#006A4E]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <select
                    value={videoPlatform}
                    onChange={e => setVideoPlatform(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] cursor-pointer"
                  >
                    <option value="auto">Auto Detect Platform</option>
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="direct">Direct Video Stream</option>
                  </select>
                </div>
              </div>

              {/* Real-time Detection Status Feedback */}
              {videoUrl.trim() ? (
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Detected: {detection.platform.toUpperCase()} ({detection.isValid ? 'Valid Embed Support' : 'Check URL'})
                  </span>
                  {detection.videoId && (
                    <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[10px]">
                      ID: {detection.videoId}
                    </span>
                  )}
                </div>
              ) : (
                <p className="text-[11px] text-amber-700 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>When URL is empty, the public website will display a clean "Video Coming Soon" placeholder.</span>
                </p>
              )}
            </div>

            {/* 5. Custom Thumbnail */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block font-bold text-slate-800">
                  Custom Thumbnail Image (Optional — Auto-extracted if blank):
                </label>
                <button
                  type="button"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="text-xs text-[#006A4E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FolderOpen className="w-3.5 h-3.5" />
                  <span>Pick from Media Library</span>
                </button>
              </div>
              <input
                type="text"
                value={customThumbnail}
                onChange={e => setCustomThumbnail(e.target.value)}
                placeholder="https://... (Leave blank to use YouTube HQ thumbnail or default)"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:border-[#006A4E]"
              />
            </div>

            {/* 6. Display Order, Publication Status & Featured Toggle */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              {/* Display Order */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Display Order</label>
                <input
                  type="number"
                  min="1"
                  value={displayOrder}
                  onChange={e => setDisplayOrder(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold"
                />
              </div>

              {/* Status Toggle */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Publication Status</label>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsPublished(true)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-xs ${
                      isPublished
                        ? 'bg-[#006A4E] text-white shadow-warm-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Published
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsPublished(false)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer text-xs ${
                      !isPublished
                        ? 'bg-amber-600 text-white shadow-warm-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Draft
                  </button>
                </div>
              </div>

              {/* Featured Toggle */}
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">Featured Video</label>
                <label className="flex items-center gap-2 p-2 bg-white rounded-xl border border-slate-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={e => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 text-[#006A4E] rounded border-slate-300 focus:ring-[#006A4E]"
                  />
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Set as Featured Journey</span>
                  </span>
                </label>
              </div>
            </div>

            {/* 7. Live Preview */}
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Preview Card Output:
              </span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-16 rounded-xl overflow-hidden bg-slate-950 border border-slate-700 shrink-0 relative">
                  {effectiveThumbnail ? (
                    <img
                      src={effectiveThumbnail}
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Film className="w-5 h-5" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-800 text-emerald-100">
                      {timelineEn || 'Timeline'}
                    </span>
                    {isFeatured && (
                      <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-slate-950">
                        Featured
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs truncate mt-1 text-white">{titleEn || 'Video Title'}</h4>
                  <p className="text-[11px] text-slate-300 truncate">{descEn || 'No description provided'}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold shadow-warm-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>{videoToEdit ? 'Save Changes' : 'Save Journey Video'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => {
          setCustomThumbnail(url);
          setIsMediaPickerOpen(false);
        }}
        title="Select Thumbnail Image"
      />
    </>
  );
};
