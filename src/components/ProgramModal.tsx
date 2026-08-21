import React, { useState, useEffect } from 'react';
import { Program } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  X,
  Plus,
  Trash2,
  FolderOpen,
  Image as ImageIcon,
  Crop,
  Handshake,
  CheckCircle2
} from 'lucide-react';
import { ImageEditorModal } from './ImageEditorModal';

interface ProgramModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program | null;
  onSave: (programData: Omit<Program, 'id'> | Program) => void;
  onOpenMediaPicker: (callback: (url: string) => void) => void;
  isBn?: boolean;
}

export const ProgramModal: React.FC<ProgramModalProps> = ({
  isOpen,
  onClose,
  program,
  onSave,
  onOpenMediaPicker,
  isBn = false
}) => {
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('Child Welfare');
  const [status, setStatus] = useState<Program['status']>('active');
  const [shortDescEn, setShortDescEn] = useState('');
  const [shortDescBn, setShortDescBn] = useState('');
  const [fullDetailsEn, setFullDetailsEn] = useState('');
  const [fullDetailsBn, setFullDetailsBn] = useState('');
  const [imageUrl, setImageUrl] = useState('/images/infinity-cover-hero.jpg');
  const [iconName, setIconName] = useState('Heart');
  const [highlightsEn, setHighlightsEn] = useState<string[]>(['']);
  const [highlightsBn, setHighlightsBn] = useState<string[]>(['']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (program) {
      setTitleEn(program.title?.en || '');
      setTitleBn(program.title?.bn || '');
      setSlug(program.slug || '');
      setCategory(program.category || 'Child Welfare');
      setStatus(program.status || 'active');
      setShortDescEn(program.shortDescription?.en || '');
      setShortDescBn(program.shortDescription?.bn || '');
      setFullDetailsEn(program.fullDetails?.en || '');
      setFullDetailsBn(program.fullDetails?.bn || '');
      setImageUrl(program.imageUrl || '/images/infinity-cover-hero.jpg');
      setIconName(program.iconName || 'Heart');
      setHighlightsEn(program.impactHighlights?.en?.length ? program.impactHighlights.en : ['']);
      setHighlightsBn(program.impactHighlights?.bn?.length ? program.impactHighlights.bn : ['']);
    } else {
      setTitleEn('');
      setTitleBn('');
      setSlug('');
      setCategory('Child Welfare');
      setStatus('active');
      setShortDescEn('');
      setShortDescBn('');
      setFullDetailsEn('');
      setFullDetailsBn('');
      setImageUrl('/images/infinity-cover-hero.jpg');
      setIconName('Heart');
      setHighlightsEn(['Direct humanitarian service', 'Continuous community support']);
      setHighlightsBn(['সরাসরি মানবিক সেবা প্রদান', 'ধারাবাহিক সামাজিক সহায়তা']);
    }
    setErrorMsg(null);
  }, [program, isOpen]);

  if (!isOpen) return null;

  const generateSlug = (text: string) => {
    return text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) {
      setErrorMsg(isBn ? 'অনুগ্রহ করে ইংরেজি শিরোনাম দিন।' : 'Program English title is required.');
      return;
    }

    const finalSlug = slug.trim() || generateSlug(titleEn) || `program-${Date.now()}`;

    const programData: Omit<Program, 'id'> = {
      slug: finalSlug,
      title: { en: titleEn.trim(), bn: titleBn.trim() || titleEn.trim() },
      category,
      status,
      shortDescription: {
        en: shortDescEn.trim() || titleEn.trim(),
        bn: shortDescBn.trim() || titleBn.trim() || titleEn.trim()
      },
      fullDetails: {
        en: fullDetailsEn.trim() || shortDescEn.trim(),
        bn: fullDetailsBn.trim() || shortDescBn.trim()
      },
      imageUrl: imageUrl.trim() || '/images/infinity-cover-hero.jpg',
      iconName,
      impactHighlights: {
        en: highlightsEn.filter(h => h.trim().length > 0),
        bn: highlightsBn.filter(h => h.trim().length > 0)
      }
    };

    if (program) {
      onSave({ ...programData, id: program.id } as Program);
    } else {
      onSave(programData);
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
              <Handshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-extrabold font-display">
                {program ? (isBn ? 'প্রোগ্রাম সম্পাদনা' : `Edit Program: ${program.title.en}`) : (isBn ? 'নতুন মানবিক প্রোগ্রাম' : 'Create New Program')}
              </h3>
              <p className="text-xs text-emerald-200/80">
                {isBn ? 'সেবামূলক কর্মসূচির বিস্তারিত বিবরণ সংরক্ষণ করুন।' : 'Configure humanitarian core program and impact highlights.'}
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
              <label className="block text-xs font-bold text-slate-800">Program Title (English) *</label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => {
                  setTitleEn(e.target.value);
                  if (!program && !slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="e.g. Underprivileged Child Welfare"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">প্রোগ্রাম শিরোনাম (বাংলা)</label>
              <input
                type="text"
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: সুবিধাবঞ্চিত শিশু কল্যাণ ও শিক্ষা"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm font-bengali"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold"
              >
                <option value="active">Active (সক্রিয়)</option>
                <option value="planning">Planning (পরিকল্পনাধীন)</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#006A4E]" />
                <span>Program Cover Image</span>
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
                  alt="Program Preview"
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
              <label className="block text-xs font-bold text-slate-800">Short Summary (English)</label>
              <textarea
                rows={3}
                value={shortDescEn}
                onChange={(e) => setShortDescEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">সংক্ষিপ্ত বিবরণ (বাংলা)</label>
              <textarea
                rows={3}
                value={shortDescBn}
                onChange={(e) => setShortDescBn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">Full Details (English)</label>
              <textarea
                rows={3}
                value={fullDetailsEn}
                onChange={(e) => setFullDetailsEn(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800">সম্পূর্ণ বিবরণ (বাংলা)</label>
              <textarea
                rows={3}
                value={fullDetailsBn}
                onChange={(e) => setFullDetailsBn(e.target.value)}
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
              <span>{program ? 'Save Program' : 'Create Program'}</span>
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
          title={`Crop Program Cover: ${titleEn || 'New Program'}`}
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
