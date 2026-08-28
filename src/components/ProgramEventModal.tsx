import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProgramEvent, Program } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import { X, Plus, Trash2, Image as ImageIcon, Calendar, MapPin, Sparkles, Star } from 'lucide-react';

interface ProgramEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
  eventToEdit?: ProgramEvent | null;
}

export const ProgramEventModal: React.FC<ProgramEventModalProps> = ({
  isOpen,
  onClose,
  program,
  eventToEdit
}) => {
  const { isBn } = useLanguage();
  const { addProgramEvent, updateProgramEvent } = useData();

  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [slug, setSlug] = useState('');
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [dateRangeEn, setDateRangeEn] = useState('');
  const [dateRangeBn, setDateRangeBn] = useState('');
  const [locationEn, setLocationEn] = useState('Hathazari, Chattogram');
  const [locationBn, setLocationBn] = useState('হাটহাজারী, চট্টগ্রাম');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [shortDescEn, setShortDescEn] = useState('');
  const [shortDescBn, setShortDescBn] = useState('');
  const [fullStoryEn, setFullStoryEn] = useState('');
  const [fullStoryBn, setFullStoryBn] = useState('');
  const [status, setStatus] = useState<'completed' | 'ongoing' | 'upcoming' | 'archived'>('completed');
  const [isFeatured, setIsFeatured] = useState(false);
  const [displayOrder, setDisplayOrder] = useState<number>(1);

  // Objectives lists
  const [objectivesEn, setObjectivesEn] = useState<string[]>([]);
  const [objectivesBn, setObjectivesBn] = useState<string[]>([]);
  const [newObjEn, setNewObjEn] = useState('');
  const [newObjBn, setNewObjBn] = useState('');

  // Impact metrics
  const [impactMetrics, setImpactMetrics] = useState<{ label: { en: string; bn: string }; value: string }[]>([]);
  const [newMetricVal, setNewMetricVal] = useState('');
  const [newMetricLblEn, setNewMetricLblEn] = useState('');
  const [newMetricLblBn, setNewMetricLblBn] = useState('');

  useEffect(() => {
    if (eventToEdit) {
      setTitleEn(eventToEdit.title.en);
      setTitleBn(eventToEdit.title.bn);
      setSlug(eventToEdit.slug);
      setYear(eventToEdit.year);
      setDateRangeEn(eventToEdit.dateRange?.en || '');
      setDateRangeBn(eventToEdit.dateRange?.bn || '');
      setLocationEn(eventToEdit.location.en);
      setLocationBn(eventToEdit.location.bn);
      setCoverImageUrl(eventToEdit.coverImageUrl || '');
      setShortDescEn(eventToEdit.shortDescription.en);
      setShortDescBn(eventToEdit.shortDescription.bn);
      setFullStoryEn(eventToEdit.fullStory?.en || '');
      setFullStoryBn(eventToEdit.fullStory?.bn || '');
      setStatus(eventToEdit.status);
      setIsFeatured(eventToEdit.isFeatured || false);
      setDisplayOrder(eventToEdit.displayOrder || 1);
      setObjectivesEn(eventToEdit.objectives?.en || []);
      setObjectivesBn(eventToEdit.objectives?.bn || []);
      setImpactMetrics(eventToEdit.impactMetrics || []);
    } else {
      const currentYr = new Date().getFullYear();
      setTitleEn(`${program.title.en} (${currentYr})`);
      setTitleBn(`${program.title.bn} (${currentYr})`);
      setSlug(`${program.slug}-${currentYr}`);
      setYear(currentYr);
      setDateRangeEn('');
      setDateRangeBn('');
      setLocationEn('Hathazari, Chattogram');
      setLocationBn('হাটহাজারী, চট্টগ্রাম');
      setCoverImageUrl(program.imageUrl || '');
      setShortDescEn('');
      setShortDescBn('');
      setFullStoryEn('');
      setFullStoryBn('');
      setStatus('completed');
      setIsFeatured(false);
      setDisplayOrder(1);
      setObjectivesEn([]);
      setObjectivesBn([]);
      setImpactMetrics([]);
    }
  }, [eventToEdit, program, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim() || !titleBn.trim() || !slug.trim()) {
      alert('Please provide title and slug.');
      return;
    }

    const payload = {
      programId: program.id,
      slug: slug.trim(),
      title: { en: titleEn.trim(), bn: titleBn.trim() },
      year: Number(year),
      dateRange: dateRangeEn || dateRangeBn ? { en: dateRangeEn.trim(), bn: dateRangeBn.trim() } : undefined,
      location: { en: locationEn.trim(), bn: locationBn.trim() },
      coverImageUrl: coverImageUrl.trim(),
      shortDescription: { en: shortDescEn.trim(), bn: shortDescBn.trim() },
      fullStory: fullStoryEn || fullStoryBn ? { en: fullStoryEn.trim(), bn: fullStoryBn.trim() } : undefined,
      objectives: objectivesEn.length > 0 || objectivesBn.length > 0 ? { en: objectivesEn, bn: objectivesBn } : undefined,
      impactMetrics: impactMetrics.length > 0 ? impactMetrics : undefined,
      status,
      isFeatured,
      displayOrder: Number(displayOrder)
    };

    if (eventToEdit) {
      updateProgramEvent(eventToEdit.id, payload);
    } else {
      addProgramEvent(payload);
    }

    onClose();
  };

  const handleAddObjective = () => {
    if (!newObjEn.trim() && !newObjBn.trim()) return;
    setObjectivesEn([...objectivesEn, newObjEn.trim()]);
    setObjectivesBn([...objectivesBn, newObjBn.trim() || newObjEn.trim()]);
    setNewObjEn('');
    setNewObjBn('');
  };

  const handleRemoveObjective = (index: number) => {
    setObjectivesEn(objectivesEn.filter((_, i) => i !== index));
    setObjectivesBn(objectivesBn.filter((_, i) => i !== index));
  };

  const handleAddMetric = () => {
    if (!newMetricVal.trim() || !newMetricLblEn.trim()) return;
    setImpactMetrics([
      ...impactMetrics,
      {
        value: newMetricVal.trim(),
        label: { en: newMetricLblEn.trim(), bn: newMetricLblBn.trim() || newMetricLblEn.trim() }
      }
    ]);
    setNewMetricVal('');
    setNewMetricLblEn('');
    setNewMetricLblBn('');
  };

  const handleRemoveMetric = (index: number) => {
    setImpactMetrics(impactMetrics.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#006A4E] uppercase tracking-wider">
              {program.title.en}
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {eventToEdit ? (isBn ? 'আসর / ইভেন্ট সম্পাদনা' : 'Edit Event Edition') : (isBn ? 'নতুন আসর / ইভেন্ট যুক্ত করুন' : 'Add New Event Edition')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Basic Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Year / সাল *
              </label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => {
                  const y = Number(e.target.value);
                  setYear(y);
                  if (!eventToEdit) {
                    setSlug(`${program.slug}-${y}`);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">
                URL Slug * (Unique per initiative)
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Edition Title (English) *
              </label>
              <input
                type="text"
                required
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="e.g. Eid Joy 11 (2026)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Edition Title (বাংলা) *
              </label>
              <input
                type="text"
                required
                value={titleBn}
                onChange={(e) => setTitleBn(e.target.value)}
                placeholder="যেমন: সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ-১১ (২০২৬)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Location & Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Location (English) *
              </label>
              <input
                type="text"
                required
                value={locationEn}
                onChange={(e) => setLocationEn(e.target.value)}
                placeholder="Hathazari, Chattogram"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Location (বাংলা) *
              </label>
              <input
                type="text"
                required
                value={locationBn}
                onChange={(e) => setLocationBn(e.target.value)}
                placeholder="হাটহাজারী, চট্টগ্রাম"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Date Range (English)
              </label>
              <input
                type="text"
                value={dateRangeEn}
                onChange={(e) => setDateRangeEn(e.target.value)}
                placeholder="e.g. April 6 – April 9, 2024"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Date Range (বাংলা)
              </label>
              <input
                type="text"
                value={dateRangeBn}
                onChange={(e) => setDateRangeBn(e.target.value)}
                placeholder="যেমন: ৬ এপ্রিল – ৯ এপ্রিল, ২০২৪"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Edition Cover Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                placeholder="https://... or /images/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
              {coverImageUrl && (
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-300">
                  <img src={getAssetUrl(coverImageUrl)} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Short Descriptions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Short Summary (English) *
              </label>
              <textarea
                rows={2}
                required
                value={shortDescEn}
                onChange={(e) => setShortDescEn(e.target.value)}
                placeholder="Brief summary of this year's edition..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Short Summary (বাংলা) *
              </label>
              <textarea
                rows={2}
                required
                value={shortDescBn}
                onChange={(e) => setShortDescBn(e.target.value)}
                placeholder="এই আসরের সংক্ষিপ্ত বিবরণ..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Full Narrative Story */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Event Story (English)
              </label>
              <textarea
                rows={4}
                value={fullStoryEn}
                onChange={(e) => setFullStoryEn(e.target.value)}
                placeholder="Detailed story and narrative of the event drive..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Event Story (বাংলা)
              </label>
              <textarea
                rows={4}
                value={fullStoryBn}
                onChange={(e) => setFullStoryBn(e.target.value)}
                placeholder="কার্যক্রমের বিস্তারিত প্রেক্ষাপট ও বাস্তবায়ন গল্প..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>
          </div>

          {/* Key Objectives */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="block font-bold text-slate-900">
              Key Objectives & Milestones (মূল লক্ষ্যসমূহ)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                value={newObjEn}
                onChange={(e) => setNewObjEn(e.target.value)}
                placeholder="Objective in English..."
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
              />
              <input
                type="text"
                value={newObjBn}
                onChange={(e) => setNewObjBn(e.target.value)}
                placeholder="বাংলায় লক্ষ্য..."
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleAddObjective}
              className="px-3.5 py-1.5 rounded-xl bg-[#006A4E] text-white text-xs font-bold hover:bg-[#00523C] inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Objective</span>
            </button>

            {objectivesEn.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {objectivesEn.map((obj, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold">{obj}</span>
                      {objectivesBn[idx] && <span className="text-slate-500 ml-2">({objectivesBn[idx]})</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveObjective(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Impact Metrics */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <label className="block font-bold text-slate-900">
              Impact Metric Counters (পরিসংখ্যান)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                value={newMetricVal}
                onChange={(e) => setNewMetricVal(e.target.value)}
                placeholder="Value (e.g. 750)"
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
              />
              <input
                type="text"
                value={newMetricLblEn}
                onChange={(e) => setNewMetricLblEn(e.target.value)}
                placeholder="Label EN (e.g. Children Gifted)"
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
              />
              <input
                type="text"
                value={newMetricLblBn}
                onChange={(e) => setNewMetricLblBn(e.target.value)}
                placeholder="Label BN (e.g. পোশাকপ্রাপ্ত শিশু)"
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
              />
            </div>
            <button
              type="button"
              onClick={handleAddMetric}
              className="px-3.5 py-1.5 rounded-xl bg-[#006A4E] text-white text-xs font-bold hover:bg-[#00523C] inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>

            {impactMetrics.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
                {impactMetrics.map((met, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="font-extrabold text-[#006A4E]">{met.value}</div>
                      <div className="text-[11px] text-slate-600">{met.label.en}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMetric(idx)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status & Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              >
                <option value="completed">Completed (সম্পন্ন)</option>
                <option value="ongoing">Ongoing (চলমান)</option>
                <option value="upcoming">Upcoming (আসন্ন)</option>
                <option value="archived">Archived (আর্কাইভ)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
              />
            </div>

            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#006A4E] rounded"
                />
                <span>Featured Edition (প্রধান আসর)</span>
              </label>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm transition-all cursor-pointer"
            >
              {eventToEdit ? 'Save Changes' : 'Create Edition'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
