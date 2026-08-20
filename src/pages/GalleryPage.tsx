import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { GalleryPhoto } from '../types';
import { Image as ImageIcon, Video, Filter, Sparkles } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { gallery } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Eid Drives', 'Winter Relief', 'Ramadan', 'Child Welfare', 'Volunteer Teams'];

  const filteredPhotos = gallery.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SectionHeading
        badge={isBn ? 'মাঠপর্যায়ের স্মৃতি ও তথ্যচিত্র' : 'Visual Archives'}
        title={isBn ? 'আলোকচিত্র ও ভিডিও গ্যালারি' : 'Photo & Media Gallery'}
        subtitle={
          isBn
            ? 'আমাদের বিভিন্ন কার্যক্রম, বিতরণ ও মানবিক মুহূর্তের সংরক্ষিত আলোকচিত্র।'
            : 'Explore ground-level documentation capturing moments of hope, solidarity, and volunteer dedication.'
        }
      />

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of photos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            onClick={() => setSelectedImageIndex(index)}
            className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={photo.imageUrl}
                alt={tText(photo.title)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/70 text-white backdrop-blur-xs">
                {photo.category}
              </span>
              <div className="absolute inset-0 bg-teal-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="p-3.5 space-y-1 flex-1 flex flex-col justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                {tText(photo.title)}
              </h4>
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[70%]">{tText(photo.caption)}</span>
                <span>{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImageIndex !== null && (
        <GalleryLightbox
          photos={filteredPhotos}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </div>
  );
};
