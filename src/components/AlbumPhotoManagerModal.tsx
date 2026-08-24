import React, { useState, useEffect } from 'react';
import { X, Check, Image as ImageIcon, Plus, Trash2, ArrowUp, ArrowDown, FolderPlus, Sparkles } from 'lucide-react';
import { GalleryAlbum, GalleryPhoto, MediaItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AlbumPhotoManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  album: GalleryAlbum | null;
  allGalleryPhotos: GalleryPhoto[];
  allMediaItems?: MediaItem[];
  onSavePhotos: (albumId: string, photoIds: string[]) => void;
  onOpenUploadModal?: () => void;
}

export const AlbumPhotoManagerModal: React.FC<AlbumPhotoManagerModalProps> = ({
  isOpen,
  onClose,
  album,
  allGalleryPhotos,
  allMediaItems = [],
  onSavePhotos,
  onOpenUploadModal
}) => {
  const { language } = useLanguage();
  const isBn = language === 'bn';

  // Current assigned photo IDs
  const [selectedPhotoIds, setSelectedPhotoIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'current' | 'browse'>('current');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (album) {
      const assigned = allGalleryPhotos.filter(g => g.albumId === album.id).map(g => g.id);
      setSelectedPhotoIds(assigned);
    } else {
      setSelectedPhotoIds([]);
    }
  }, [album, isOpen, allGalleryPhotos]);

  if (!isOpen || !album) return null;

  const currentPhotos = selectedPhotoIds
    .map(id => allGalleryPhotos.find(g => g.id === id))
    .filter((g): g is GalleryPhoto => Boolean(g));

  const availablePhotos = allGalleryPhotos.filter(g => {
    const matchesSearch = !searchQuery || 
      g.title.en.toLowerCase().includes(searchQuery.toLowerCase()) || 
      g.title.bn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (g.category && g.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const handleTogglePhoto = (id: string) => {
    if (selectedPhotoIds.includes(id)) {
      setSelectedPhotoIds(prev => prev.filter(pId => pId !== id));
    } else {
      setSelectedPhotoIds(prev => [...prev, id]);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...selectedPhotoIds];
    const temp = newIds[index - 1];
    newIds[index - 1] = newIds[index];
    newIds[index] = temp;
    setSelectedPhotoIds(newIds);
  };

  const handleMoveDown = (index: number) => {
    if (index === selectedPhotoIds.length - 1) return;
    const newIds = [...selectedPhotoIds];
    const temp = newIds[index + 1];
    newIds[index + 1] = newIds[index];
    newIds[index] = temp;
    setSelectedPhotoIds(newIds);
  };

  const handleSave = () => {
    onSavePhotos(album.id, selectedPhotoIds);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#EAE3D9] my-8 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#006A4E]/10 via-[#FAF7F2] to-amber-500/10 border-b border-[#EAE3D9] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#006A4E] text-white flex items-center justify-center shadow-warm-sm">
              <FolderPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 font-display">
                {album.title.en} — {isBn ? 'অ্যালবামের ছবি পরিচালনা' : 'Album Photo Manager'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? `বর্তমান ছবিতে মোট ${selectedPhotoIds.length}টি ছবি অন্তর্ভুক্ত রয়েছে।` : `Currently contains ${selectedPhotoIds.length} photographs.`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector & Controls */}
        <div className="px-6 py-3 bg-[#FAF7F2] border-b border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('current')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'current'
                  ? 'bg-[#006A4E] text-white shadow-warm-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{isBn ? 'অ্যালবামের ছবি' : 'Album Photos'} ({selectedPhotoIds.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('browse')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'browse'
                  ? 'bg-[#006A4E] text-white shadow-warm-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{isBn ? 'গ্যালারি থেকে যোগ করুন' : 'Browse & Add Photos'}</span>
            </button>
          </div>

          {activeTab === 'browse' && (
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search gallery photos..."
              className="px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:border-[#006A4E] outline-none w-full sm:w-60"
            />
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'current' ? (
            <div>
              {currentPhotos.length === 0 ? (
                <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300 space-y-3">
                  <ImageIcon className="w-10 h-10 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-700">No photos inside this album yet</p>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Switch to the "Browse & Add Photos" tab to select images from your gallery or media collection.
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab('browse')}
                    className="px-4 py-2 rounded-xl bg-[#006A4E] text-white text-xs font-bold cursor-pointer"
                  >
                    Browse Gallery Photos
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {currentPhotos.map((photo, index) => (
                    <div
                      key={photo.id}
                      className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                          {index + 1}
                        </span>

                        <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                          <img
                            src={photo.imageUrl}
                            alt={photo.title.en}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/winter-warmth.jpg';
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-900 truncate">{photo.title.en}</h4>
                          <p className="text-[11px] text-slate-500 truncate font-bengali">{photo.title.bn}</p>
                          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#E6F3EF] text-[#00523C]">
                            {photo.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleMoveUp(index)}
                          disabled={index === 0}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          title="Move up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveDown(index)}
                          disabled={index === currentPhotos.length - 1}
                          className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                          title="Move down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleTogglePhoto(photo.id)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 cursor-pointer ml-1"
                          title="Remove from album"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {availablePhotos.map(photo => {
                const isSelected = selectedPhotoIds.includes(photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => handleTogglePhoto(photo.id)}
                    className={`relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#006A4E] shadow-warm-md scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-square bg-slate-100">
                      <img
                        src={photo.imageUrl}
                        alt={photo.title.en}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/winter-warmth.jpg';
                        }}
                      />
                    </div>

                    <div className="p-2 bg-white">
                      <p className="text-[11px] font-bold text-slate-900 truncate">{photo.title.en}</p>
                      <p className="text-[9px] text-slate-500 truncate">{photo.category}</p>
                    </div>

                    <div
                      className={`absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-colors ${
                        isSelected
                          ? 'bg-[#006A4E] text-white'
                          : 'bg-white/90 text-slate-400 border border-slate-300'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#EAE3D9] flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            {selectedPhotoIds.length} {selectedPhotoIds.length === 1 ? 'photo' : 'photos'} assigned
          </p>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-white text-xs font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold shadow-warm-md flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
            >
              <Check className="w-4 h-4" />
              <span>Save Album Photos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
