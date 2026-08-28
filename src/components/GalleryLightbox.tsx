import React, { useState, useEffect, useCallback } from 'react';
import { GalleryPhoto } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../context/RouterContext';
import { X, ChevronLeft, ChevronRight, Calendar, Flag } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  initialIndex?: number;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  photos,
  initialIndex = 0,
  onClose
}) => {
  const { isBn, tText } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose, handlePrev, handleNext]);

  if (!photos || photos.length === 0) return null;

  const currentPhoto = photos[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={currentPhoto ? tText(currentPhoto.title) : 'Photo Gallery Lightbox'}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in outline-none"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev button */}
      <button
        type="button"
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Next button */}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white bg-slate-800/80 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Lightbox Content Window */}
      <div
        className="max-w-5xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
        onClick={e => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[65vh] overflow-hidden">
          <img
            src={getAssetUrl(currentPhoto.imageUrl)}
            alt={tText(currentPhoto.title)}
            className="max-h-full max-w-full object-contain select-none"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="p-4 sm:p-6 bg-slate-900 border-t border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-800 text-teal-200">
                {currentPhoto.category}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white">
                {tText(currentPhoto.title)}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              {tText(currentPhoto.caption)}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-teal-400" />
              {currentPhoto.date}
            </span>

            {currentPhoto.campaignSlug && (
              <Link
                to="campaigns/detail"
                slug={currentPhoto.campaignSlug}
                onClick={onClose}
                className="px-2.5 py-1 rounded bg-teal-900/80 hover:bg-teal-800 text-teal-200 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Flag className="w-3 h-3" />
                <span>{isBn ? 'ক্যাম্পেইন দেখুন' : 'Related Campaign'}</span>
              </Link>
            )}

            <span className="text-slate-500">
              {currentIndex + 1} / {photos.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

