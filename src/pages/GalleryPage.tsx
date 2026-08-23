import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { Image as ImageIcon, Video, Newspaper, Calendar, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

export const GalleryPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate, currentPage } = useRouter();
  const { gallery } = useData();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const categories = ['All', 'Eid Drives', 'Winter Relief', 'Ramadan', 'Child Welfare', 'Volunteer Teams'];

  const filteredPhotos = gallery.filter(item => {
    if (activeCategory === 'All') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{isBn ? 'মাঠপর্যায়ের স্মৃতি ও তথ্যচিত্র' : 'Visual Archives'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'আলোকচিত্র ও মাঠপর্যায়ের গ্যালারি' : 'Photo Documentation Gallery'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {isBn
            ? 'আমাদের বিভিন্ন কার্যক্রম, ত্রাণ বিতরণ ও মানবিক মুহূর্তের সংরক্ষিত আলোকচিত্র।'
            : 'Explore ground-level documentation capturing moments of hope, solidarity, and volunteer dedication.'}
        </p>

        {/* Media & Gallery In-Page Sub Navigation Switcher */}
        <div className="pt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            type="button"
            className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#006A4E] text-white shadow-warm-sm flex items-center gap-1.5 cursor-pointer"
          >
            <ImageIcon className="w-4 h-4" />
            <span>{isBn ? 'আলোকচিত্র গ্যালারি' : 'Photo Gallery'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('videos')}
            className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Video className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'ভিডিও তথ্যচিত্র' : 'Video Documentation'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('news')}
            className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Newspaper className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'সংবাদ ও বিজ্ঞপ্তি' : 'News & Announcements'}</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('events')}
            className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'ইভেন্ট ও কর্মসূচি' : 'Events & Schedules'}</span>
          </button>
        </div>
      </div>

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
