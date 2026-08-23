import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Image as ImageIcon } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-14">
      <SectionHeading
        badge={isBn ? 'মাঠপর্যায়ের স্মৃতি ও তথ্যচিত্র' : 'Visual Archives'}
        title={isBn ? 'আলোকচিত্র ও মাঠপর্যায়ের গ্যালারি' : 'Photo Documentation Gallery'}
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
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-[#006A4E] text-white shadow-warm-sm'
                : 'bg-white border border-[#EAE3D9] text-slate-700 hover:bg-[#FAF7F2]'
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
            className="group bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all cursor-pointer flex flex-col"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
              <img
                src={getAssetUrl(photo.imageUrl)}
                alt={tText(photo.title)}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                loading="lazy"
              />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#006A4E]/90 text-white backdrop-blur-xs shadow-xs">
                {photo.category}
              </span>
              <div className="absolute inset-0 bg-[#006A4E]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="p-4 space-y-1 flex-1 flex flex-col justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#006A4E] transition-colors line-clamp-1 font-display">
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
