import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { ProgramEvent, Program, MediaItem } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  X,
  Star,
  Plus,
  Trash2,
  Image as ImageIcon,
  Play,
  ArrowUp,
  ArrowDown,
  Search,
  Check,
  Sparkles,
  ExternalLink,
  Edit3
} from 'lucide-react';

interface EventMediaManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
  event: ProgramEvent;
}

export const EventMediaManagerModal: React.FC<EventMediaManagerModalProps> = ({
  isOpen,
  onClose,
  program,
  event
}) => {
  const { isBn, tText } = useLanguage();
  const {
    mediaLibrary,
    getEventMedia,
    getEventHighlights,
    addMediaToEvent,
    removeMediaFromEvent,
    toggleEventHighlight,
    reorderEventHighlights,
    updateProgramEvent
  } = useData();

  const [activeTab, setActiveTab] = useState<'highlights' | 'attach'>('highlights');
  const [searchMedia, setSearchMedia] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingCaptionMediaId, setEditingCaptionMediaId] = useState<string | null>(null);
  const [captionEn, setCaptionEn] = useState('');
  const [captionBn, setCaptionBn] = useState('');

  if (!isOpen) return null;

  const eventMedia = getEventMedia(event.id);
  const highlights = getEventHighlights(event.id);
  const attachedMediaIdSet = new Set(eventMedia.map(em => em.mediaId));

  // Filter media library items for attaching
  const filteredLibraryMedia = mediaLibrary.filter(m => {
    if (m.status === 'draft') return false;
    let matchesCat = true;
    if (selectedCategory !== 'All') {
      matchesCat = m.category?.toLowerCase() === selectedCategory.toLowerCase();
    }
    let matchesSearch = true;
    if (searchMedia.trim()) {
      const q = searchMedia.toLowerCase();
      matchesSearch = (m.fileName || '').toLowerCase().includes(q) ||
        (m.title || '').toLowerCase().includes(q) ||
        (m.altText || '').toLowerCase().includes(q);
    }
    return matchesCat && matchesSearch;
  });

  const handleMoveHighlight = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= highlights.length) return;

    const newOrder = [...highlights.map(h => h.mediaId)];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIdx];
    newOrder[targetIdx] = temp;

    reorderEventHighlights(event.id, newOrder);
  };

  const handleSaveCaption = (mediaId: string) => {
    const current = eventMedia.find(em => em.mediaId === mediaId);
    if (!current) return;

    // Remove and re-add with updated caption while preserving highlight state
    removeMediaFromEvent(event.id, mediaId);
    addMediaToEvent(
      event.id,
      mediaId,
      current.isHighlight,
      captionEn || captionBn ? { en: captionEn, bn: captionBn } : undefined
    );
    setEditingCaptionMediaId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#006A4E] uppercase tracking-wider">
              <span>{program.title.en}</span>
              <span>•</span>
              <span className="bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
                {event.year} Edition
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-display mt-0.5">
              {tText(event.title)} — {isBn ? 'মিডিয়া ও হাইলাইটস কিউরেশন' : 'Media & Highlights Curator'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold bg-slate-100 px-3 py-1.5 rounded-xl text-slate-700">
              <span>Attached: <strong className="text-slate-900">{eventMedia.length}</strong></span>
              <span>|</span>
              <span className="text-amber-700 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <strong>{highlights.length}</strong> Highlights
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50/70 flex gap-4">
          <button
            onClick={() => setActiveTab('highlights')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'highlights'
                ? 'border-[#006A4E] text-[#006A4E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
            <span>{isBn ? 'হাইলাইটস সাজান ও কিউরেট করুন' : 'Curate Highlights & Order'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-100 text-amber-800 font-extrabold">
              {highlights.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('attach')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'attach'
                ? 'border-[#006A4E] text-[#006A4E]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ImageIcon className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'মিডিয়া লাইব্রেরি থেকে ছবি/ভিডিও যুক্ত করুন' : 'Attach from Media Library'}</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-200 text-slate-700 font-extrabold">
              {eventMedia.length}
            </span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'highlights' ? (
            <div className="space-y-6">
              
              {/* Informational Guidance Alert */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200 text-xs sm:text-sm text-amber-900 flex items-start gap-3">
                <Star className="w-5 h-5 fill-amber-500 text-amber-500 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold">Single Source of Truth Highlights System</div>
                  <p className="text-amber-800/90 leading-relaxed text-xs">
                    Highlighted media is a curated subset of this Event's full gallery. They appear prominently on the Event Detail page. You can select any number of highlights (e.g. 2, 4, 10) and arrange their order with the arrows below.
                  </p>
                </div>
              </div>

              {eventMedia.length === 0 ? (
                <div className="text-center py-12 space-y-3 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                  <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
                  <h3 className="font-bold text-slate-800 text-sm">No Media Attached Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Please switch to the "Attach from Media Library" tab to attach photos or videos from your library to this event edition.
                  </p>
                  <button
                    onClick={() => setActiveTab('attach')}
                    className="px-4 py-2 rounded-xl bg-[#006A4E] text-white text-xs font-bold hover:bg-[#00523C] cursor-pointer"
                  >
                    Attach Media Now
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-slate-900">
                    All Attached Media ({eventMedia.length} items)
                  </h3>

                  <div className="space-y-2.5">
                    {eventMedia.map((item, idx) => {
                      const isHighlight = item.isHighlight;
                      const hIndex = highlights.findIndex(h => h.mediaId === item.mediaId);
                      const isVid = item.media.type === 'video' || item.media.embedUrl;
                      const isEditingCaption = editingCaptionMediaId === item.mediaId;

                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                            isHighlight
                              ? 'bg-amber-50/40 border-amber-200/90 shadow-warm-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          {/* Thumbnail & Info */}
                          <div className="flex items-center gap-3.5 flex-1 min-w-0">
                            <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                              <img
                                src={getAssetUrl(item.media.thumbnailUrl || item.media.url)}
                                alt={item.media.altText}
                                className="w-full h-full object-cover"
                              />
                              {isVid && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                                  <Play className="w-4 h-4 fill-white" />
                                </div>
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900 truncate">
                                  {item.media.fileName || item.media.title || 'Media Item'}
                                </span>
                                {isHighlight && (
                                  <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-black">
                                    ⭐ Highlight #{hIndex + 1}
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                                {item.customCaption
                                  ? `Custom: ${tText(item.customCaption)}`
                                  : item.media.caption || item.media.altText || 'No caption set'}
                              </p>
                            </div>
                          </div>

                          {/* Action Controls */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            {/* Toggle Highlight Button */}
                            <button
                              type="button"
                              onClick={() => toggleEventHighlight(event.id, item.mediaId)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                                isHighlight
                                  ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                                  : 'bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800'
                              }`}
                            >
                              <Star className={`w-3.5 h-3.5 ${isHighlight ? 'fill-white' : ''}`} />
                              <span>{isHighlight ? 'Highlighted' : 'Make Highlight'}</span>
                            </button>

                            {/* Reorder buttons if highlighted */}
                            {isHighlight && (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={hIndex === 0}
                                  onClick={() => handleMoveHighlight(hIndex, 'up')}
                                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                                  title="Move Highlight Up"
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={hIndex === highlights.length - 1}
                                  onClick={() => handleMoveHighlight(hIndex, 'down')}
                                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                                  title="Move Highlight Down"
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}

                            {/* Custom Caption Edit Toggle */}
                            <button
                              type="button"
                              onClick={() => {
                                if (isEditingCaption) {
                                  setEditingCaptionMediaId(null);
                                } else {
                                  setEditingCaptionMediaId(item.mediaId);
                                  setCaptionEn(item.customCaption?.en || item.media.caption || '');
                                  setCaptionBn(item.customCaption?.bn || item.media.altText || '');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
                              title="Edit Custom Caption"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            {/* Detach from Event */}
                            <button
                              type="button"
                              onClick={() => removeMediaFromEvent(event.id, item.mediaId)}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 cursor-pointer"
                              title="Detach from Event"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          {/* Caption Edit Form Popup inline */}
                          {isEditingCaption && (
                            <div className="w-full mt-3 pt-3 border-t border-slate-200 space-y-2">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={captionEn}
                                  onChange={(e) => setCaptionEn(e.target.value)}
                                  placeholder="Caption (English)..."
                                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                                <input
                                  type="text"
                                  value={captionBn}
                                  onChange={(e) => setCaptionBn(e.target.value)}
                                  placeholder="ক্যাপশন (বাংলা)..."
                                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs bg-white"
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <button
                                  type="button"
                                  onClick={() => setEditingCaptionMediaId(null)}
                                  className="px-3 py-1 rounded-lg text-xs bg-slate-100 hover:bg-slate-200"
                                >
                                  Cancel
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleSaveCaption(item.mediaId)}
                                  className="px-3 py-1 rounded-lg text-xs bg-[#006A4E] text-white font-bold"
                                >
                                  Save Caption
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Library search & category filter */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchMedia}
                    onChange={(e) => setSearchMedia(e.target.value)}
                    placeholder="Search media library photos and videos..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  />
                </div>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none"
                >
                  <option value="All">All Categories</option>
                  <option value="Events">Events</option>
                  <option value="Campaigns">Campaigns</option>
                  <option value="Volunteers">Volunteers</option>
                  <option value="Hero">Hero / Covers</option>
                </select>
              </div>

              {/* Media Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[55vh] overflow-y-auto p-1">
                {filteredLibraryMedia.map(item => {
                  const isAttached = attachedMediaIdSet.has(item.id);
                  const isVid = item.type === 'video' || item.embedUrl;

                  return (
                    <div
                      key={item.id}
                      className={`relative rounded-2xl overflow-hidden border p-2 flex flex-col justify-between transition-all ${
                        isAttached
                          ? 'bg-emerald-50/60 border-[#006A4E] ring-2 ring-[#006A4E]/20'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-900">
                        <img
                          src={getAssetUrl(item.thumbnailUrl || item.url)}
                          alt={item.altText}
                          className="w-full h-full object-cover"
                        />
                        {isVid && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Play className="w-5 h-5 fill-white" />
                          </div>
                        )}
                        {isAttached && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#006A4E] text-white flex items-center justify-center shadow-md">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <div className="text-[11px] font-bold text-slate-800 truncate">
                          {item.fileName || item.title || 'Media File'}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {item.category || 'General'}
                        </div>

                        <div className="pt-2">
                          {isAttached ? (
                            <button
                              type="button"
                              onClick={() => removeMediaFromEvent(event.id, item.id)}
                              className="w-full py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Remove
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => addMediaToEvent(event.id, item.id, false)}
                              className="w-full py-1.5 rounded-lg bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-[11px] transition-colors cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Attach to Event</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {eventMedia.length} attached media files • {highlights.length} curated highlights
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold shadow-warm-sm transition-all cursor-pointer"
          >
            Done & Close
          </button>
        </div>
      </div>
    </div>
  );
};
