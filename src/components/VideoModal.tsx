import React, { useState, useEffect } from 'react';
import { X, Play, Video, AlertCircle, Sparkles, Check, Globe } from 'lucide-react';
import { VideoItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { detectAndNormalizeMedia, DEFAULT_VIDEO_THUMBNAIL } from '../lib/utils/mediaHelper';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoToEdit?: VideoItem | null;
  onSave: (videoData: Omit<VideoItem, 'id'> | VideoItem) => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoToEdit,
  onSave
}) => {
  const { isBn } = useLanguage();

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descBn, setDescBn] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [category, setCategory] = useState('Relief Campaigns');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<'published' | 'draft'>('published');
  const [isFeatured, setIsFeatured] = useState(false);
  const [customThumbnail, setCustomThumbnail] = useState('');

  // Reset or populate fields when modal opens/changes
  useEffect(() => {
    if (videoToEdit) {
      setTitleEn(typeof videoToEdit.title === 'string' ? videoToEdit.title : (videoToEdit.title?.en || ''));
      setTitleBn(typeof videoToEdit.title === 'string' ? videoToEdit.title : (videoToEdit.title?.bn || ''));
      setDescEn(typeof videoToEdit.description === 'string' ? videoToEdit.description : (videoToEdit.description?.en || ''));
      setDescBn(typeof videoToEdit.description === 'string' ? videoToEdit.description : (videoToEdit.description?.bn || ''));
      setVideoUrl(videoToEdit.videoUrl || '');
      setCategory(videoToEdit.category || 'Relief Campaigns');
      setDuration(videoToEdit.duration || '');
      setDate(videoToEdit.date || new Date().toISOString().split('T')[0]);
      setStatus((videoToEdit.status as 'published' | 'draft') || 'published');
      setIsFeatured(Boolean(videoToEdit.isFeatured));
      setCustomThumbnail(videoToEdit.thumbnailUrl || '');
    } else {
      setTitleEn('');
      setTitleBn('');
      setDescEn('');
      setDescBn('');
      setVideoUrl('');
      setCategory('Relief Campaigns');
      setDuration('3:30');
      setDate(new Date().toISOString().split('T')[0]);
      setStatus('published');
      setIsFeatured(false);
      setCustomThumbnail('');
    }
  }, [videoToEdit, isOpen]);

  if (!isOpen) return null;

  const detection = detectAndNormalizeMedia(videoUrl.trim());
  const effectiveThumbnail = customThumbnail.trim() || detection.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;

    const finalTitle = {
      en: titleEn.trim() || (isBn ? (titleBn.trim() || 'Field Documentation Video') : 'Field Documentation Video'),
      bn: titleBn.trim() || (titleEn.trim() || 'মাঠপর্যায়ের তথ্যচিত্র')
    };

    const finalDesc = {
      en: descEn.trim() || 'Team Infinity official field drive video footage.',
      bn: descBn.trim() || 'টিম ইনফিনিটি অফিশিয়াল মানবিক কার্যক্রমের ভিডিও চিত্র।'
    };

    const payload = {
      title: finalTitle,
      description: finalDesc,
      videoUrl: detection.originalUrl || videoUrl.trim(),
      embedUrl: detection.embedUrl || '',
      thumbnailUrl: effectiveThumbnail,
      platform: detection.platform === 'youtube' ? 'youtube' : detection.platform === 'facebook' ? 'facebook' : 'custom',
      duration: duration.trim() || 'Video',
      date: date.trim() || new Date().toISOString().split('T')[0],
      category,
      status,
      isFeatured,
      sourceType: detection.type === 'youtube' ? 'youtube' : 'url'
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

  const CATEGORIES = [
    'Relief Campaigns',
    'Volunteer Drives',
    'Community Impact',
    'Field Drives',
    'Youth Leadership',
    'Ramadan & Eid',
    'Winter Warmth',
    'Emergency Flood Relief'
  ];

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 my-8 max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 bg-[#FAF7F2] border-b border-[#EAE3D9] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#006A4E] text-white flex items-center justify-center">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 font-display">
                {videoToEdit
                  ? (isBn ? 'ভিডিও তথ্য সম্পাদনা' : 'Edit Video Details')
                  : (isBn ? 'নতুন ইউটিউব / ফেসবুক ভিডিও প্রকাশ করুন' : 'Publish New Video to Website')}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isBn
                  ? 'ভিডিও লিংক দিলে স্বয়ংক্রিয়ভাবে থাম্বনেইল ও প্লেয়ার এম্বেড তৈরি হবে।'
                  : 'Automatic YouTube ID extraction, HQ thumbnail generation, and public embed.'}
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

        {/* Modal Form Content */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          {/* Video URL Input */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-800">
              {isBn ? 'ভিডিও লিংক (YouTube / Facebook / Direct Video URL) *' : 'Video URL (YouTube / Facebook / Direct Video URL) *'}
            </label>
            <input
              type="text"
              required
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://youtu.be/..."
              className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl font-mono text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white transition-colors"
            />
            <p className="text-[10px] text-slate-500">
              Supports <code className="font-mono text-[#006A4E]">youtube.com/watch?v=...</code>, <code className="font-mono text-[#006A4E]">youtu.be/...</code>, <code className="font-mono text-[#006A4E]">/embed/</code>, and <code className="font-mono text-[#006A4E]">/shorts/</code>
            </p>
          </div>

          {/* Real-time Detection & Preview Box */}
          {videoUrl.trim() && (
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              {detection.isValid ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Detected: {detection.platform.toUpperCase()} ({detection.type})
                    </span>
                    {detection.videoId && (
                      <span className="font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                        ID: {detection.videoId}
                      </span>
                    )}
                  </div>

                  {/* Visual Preview */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Thumbnail Preview */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500">Auto-Generated Thumbnail:</span>
                      <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-200 relative">
                        <img
                          src={effectiveThumbnail}
                          alt="Thumbnail Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = DEFAULT_VIDEO_THUMBNAIL;
                          }}
                        />
                        <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white drop-shadow-md" />
                        </div>
                      </div>
                    </div>

                    {/* Embed Player Preview */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-500">Live Embed Player Preview:</span>
                      <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-200">
                        {detection.embedUrl ? (
                          <iframe
                            src={detection.embedUrl}
                            title="Preview"
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-400 text-[11px]">
                            Preview not available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{detection.errorMessage || 'Please enter a valid YouTube or Facebook video URL.'}</span>
                </div>
              )}
            </div>
          )}

          {/* Video Title (English & Bangla) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Video Title (English) *</label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={e => setTitleEn(e.target.value)}
                placeholder="e.g. Winter Clothes Distribution in Hathazari"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">ভিডিও শিরোনাম (বাংলা)</label>
              <input
                type="text"
                value={titleBn}
                onChange={e => setTitleBn(e.target.value)}
                placeholder="যেমন: হাটহাজারীতে শীতবস্ত্র বিতরণ কার্যক্রম"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:outline-none focus:border-[#006A4E] focus:bg-white"
              />
            </div>
          </div>

          {/* Category & Duration & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Duration (e.g. 4:15)</label>
              <input
                type="text"
                value={duration}
                onChange={e => setDuration(e.target.value)}
                placeholder="e.g. 3:45"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:border-[#006A4E]"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Publication Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
              />
            </div>
          </div>

          {/* Description (English & Bangla) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">Description (English)</label>
              <textarea
                rows={2}
                value={descEn}
                onChange={e => setDescEn(e.target.value)}
                placeholder="Brief summary of the video coverage..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-slate-700">বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={descBn}
                onChange={e => setDescBn(e.target.value)}
                placeholder="ভিডিওর বিষয়বস্তু সংক্ষেপে লিখুন..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:outline-none focus:border-[#006A4E] focus:bg-white"
              />
            </div>
          </div>

          {/* Status & Featured */}
          <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="font-bold text-slate-700">Publication Status:</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('published')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    status === 'published'
                      ? 'bg-[#006A4E] text-white shadow-warm-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Published (Live)
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('draft')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                    status === 'draft'
                      ? 'bg-amber-600 text-white shadow-warm-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Draft (Hidden)
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={e => setIsFeatured(e.target.checked)}
                className="w-4 h-4 text-[#006A4E] rounded border-slate-300 focus:ring-[#006A4E]"
              />
              <span className="font-bold text-slate-800">Feature on Homepage / Highlight</span>
            </label>
          </div>

          {/* Custom Thumbnail URL override (Optional) */}
          <div className="space-y-1">
            <label className="block font-bold text-slate-700">
              Custom Thumbnail Image URL (Optional - Auto-extracted by default):
            </label>
            <input
              type="text"
              value={customThumbnail}
              onChange={e => setCustomThumbnail(e.target.value)}
              placeholder="https://... (Leave blank to use official YouTube HQ thumbnail)"
              className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:border-[#006A4E]"
            />
          </div>

          {/* Submit & Cancel Buttons */}
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
              disabled={!videoUrl.trim()}
              className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] disabled:bg-slate-300 text-white text-xs font-bold shadow-warm-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{videoToEdit ? 'Save Changes' : 'Publish Video'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
