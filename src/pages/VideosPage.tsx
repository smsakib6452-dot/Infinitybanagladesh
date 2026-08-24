import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import {
  Video,
  Play,
  ExternalLink,
  Calendar,
  Clock,
  X,
  Heart,
  ShieldCheck,
  Sparkles,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';
import { VideoItem } from '../types';
import { detectAndNormalizeMedia, DEFAULT_VIDEO_THUMBNAIL, getYouTubeEmbedUrl } from '../lib/utils/mediaHelper';

export const VideosPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { videos } = useData();
  const { navigate } = useRouter();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Filter Categories / Platforms
  const filterTabs = [
    { id: 'All', labelEn: 'All Footage', labelBn: 'সকল ভিডিও' },
    { id: 'youtube', labelEn: 'YouTube', labelBn: 'ইউটিউব' },
    { id: 'facebook', labelEn: 'Facebook', labelBn: 'ফেসবুক' },
    { id: 'Relief Campaigns', labelEn: 'Relief Campaigns', labelBn: 'ত্রাণ অভিযান' },
    { id: 'Volunteer Drives', labelEn: 'Volunteer Drives', labelBn: 'স্বেচ্ছাসেবী কার্যক্রম' },
    { id: 'Community Impact', labelEn: 'Community Impact', labelBn: 'সামাজিক প্রভাব' }
  ];

  // Prevent background scroll when video modal is active & handle Escape key
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setSelectedVideo(null);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedVideo]);

  // Filter & Search videos
  const filteredVideos = useMemo(() => {
    return videos.filter(item => {
      // Hide drafts if status is draft
      if (item.status === 'draft') return false;

      // Platform / Category filter
      let matchesFilter = true;
      const platformLower = (item.platform || '').toLowerCase();
      const itemCat = (item.category || '').toLowerCase();

      if (activeFilter === 'youtube') {
        matchesFilter = platformLower === 'youtube';
      } else if (activeFilter === 'facebook') {
        matchesFilter = platformLower === 'facebook';
      } else if (activeFilter !== 'All') {
        const filterLower = activeFilter.toLowerCase();
        matchesFilter = itemCat.includes(filterLower) || filterLower.includes(itemCat);
      }

      // Search query filter
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const rawTitle = item.title as any;
        const rawDesc = item.description as any;
        const titleEn = typeof rawTitle === 'string' ? rawTitle.toLowerCase() : (rawTitle?.en ? String(rawTitle.en).toLowerCase() : '');
        const titleBn = typeof rawTitle === 'string' ? rawTitle.toLowerCase() : (rawTitle?.bn ? String(rawTitle.bn).toLowerCase() : '');
        const descEn = typeof rawDesc === 'string' ? rawDesc.toLowerCase() : (rawDesc?.en ? String(rawDesc.en).toLowerCase() : '');
        const descBn = typeof rawDesc === 'string' ? rawDesc.toLowerCase() : (rawDesc?.bn ? String(rawDesc.bn).toLowerCase() : '');
        const cat = (item.category || '').toLowerCase();
        matchesSearch = titleEn.includes(q) || titleBn.includes(q) || descEn.includes(q) || descBn.includes(q) || cat.includes(q);
      }

      return matchesFilter && matchesSearch;
    });
  }, [videos, activeFilter, searchQuery]);

  // Compute safe embed URL for active modal
  const activeEmbedInfo = useMemo(() => {
    if (!selectedVideo) return null;
    const det = detectAndNormalizeMedia(selectedVideo.videoUrl || '');
    if (det.type === 'youtube' && det.videoId) {
      return {
        ...det,
        embedUrl: getYouTubeEmbedUrl(det.videoId, { autoplay: true, rel: 0 })
      };
    }
    return det;
  }, [selectedVideo]);

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E6F3EF] border border-[#C2E2D7] rounded-full text-[#00523C] text-xs font-extrabold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-[#006A4E]" />
            <span>{isBn ? 'ভিডিও গ্যালারি ও মাঠপর্যায়ের তথ্যচিত্র' : 'Video Gallery & Field Footage'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            {isBn ? 'আমাদের মাঠপর্যায়ের বাস্তব চিত্র' : 'Ground Realities & Campaign Stories'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটির স্বেচ্ছাসেবী কার্যক্রম, ত্রাণ বিতরণ মুহূর্ত ও যুব নেতৃত্বের প্রামাণ্য ভিডিও এক নজরে দেখুন।'
              : 'Watch authentic glimpses of Team Infinity field drives, emergency relief efforts, and youth volunteer leadership across Bangladesh.'}
          </p>

          {/* Media & Gallery In-Page Sub Navigation Switcher */}
          <div className="pt-3 flex flex-wrap justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('gallery')}
              className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'আলোকচিত্র গ্যালারি' : 'Photo Gallery'}</span>
            </button>
            <button
              type="button"
              className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#006A4E] text-white shadow-warm-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Video className="w-4 h-4" />
              <span>{isBn ? 'ভিডিও তথ্যচিত্র' : 'Video Documentation'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('news')}
              className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'সংবাদ ও বিজ্ঞপ্তি' : 'News & Announcements'}</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('events')}
              className="px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'ইভেন্ট ও কর্মসূচি' : 'Events & Schedules'}</span>
            </button>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {filterTabs.map(tab => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#006A4E] text-white shadow-warm-sm scale-102'
                      : 'bg-white border border-[#EAE3D9] text-slate-700 hover:bg-[#FAF7F2]'
                  }`}
                >
                  {isBn ? tab.labelBn : tab.labelEn}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'ভিডিও খুঁজুন...' : 'Search videos...'}
              className="w-full pl-9 pr-4 py-2 bg-white border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] shadow-warm-xs"
            />
          </div>
        </div>

        {/* Video Grid */}
        {filteredVideos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3D9] shadow-warm-sm max-w-lg mx-auto space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-slate-800 text-base">
              {isBn ? 'কোনো ভিডিও পাওয়া যায়নি' : 'No Videos Found'}
            </h3>
            <p className="text-slate-500 text-xs">
              {isBn
                ? 'অনুসন্ধানের সাথে মিলে এমন কোনো ভিডিও নেই। ভিন্ন শব্দ দিয়ে অনুসন্ধান করুন।'
                : 'No videos match the selected filter or search query.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredVideos.map((item) => {
              const detection = detectAndNormalizeMedia(item.videoUrl || '');
              const displayThumbnail = item.thumbnailUrl || detection.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL;
              const videoTitle = tText(item.title) || 'Infinity Bangladesh Video';
              const videoDesc = tText(item.description);

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                  onClick={() => setSelectedVideo(item)}
                >
                  {/* Thumbnail with Play Overlay */}
                  <div className="relative aspect-video bg-slate-950 overflow-hidden">
                    <img
                      src={displayThumbnail}
                      alt={videoTitle}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = DEFAULT_VIDEO_THUMBNAIL;
                      }}
                    />
                    <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-[#006A4E]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#006A4E] transition-all">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      </div>
                    </div>

                    {item.duration && (
                      <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-[11px] px-2.5 py-1 rounded-lg font-mono font-medium backdrop-blur-sm shadow-xs">
                        {item.duration}
                      </span>
                    )}

                    <span className="absolute top-3 left-3 bg-[#006A4E]/90 text-white text-[10px] px-2.5 py-0.5 rounded-full font-extrabold uppercase tracking-wide backdrop-blur-sm shadow-xs">
                      {item.platform === 'youtube' ? 'YouTube' : item.platform === 'facebook' ? 'Facebook' : (item.platform || 'Video')}
                    </span>
                  </div>

                  {/* Video Info */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#006A4E] transition-colors line-clamp-2 font-display">
                        {videoTitle}
                      </h3>
                      {videoDesc && (
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-normal">
                          {videoDesc}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                        <span>{item.date || 'Recent'}</span>
                      </span>
                      <span className="text-[#006A4E] font-extrabold inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        <span>{isBn ? 'ভিডিও দেখুন' : 'Watch Video'}</span>
                        <Play className="w-3 h-3 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && activeEmbedInfo && (
          <div
            className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 flex flex-col max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-[#FAF7F2]">
                <div className="flex items-center gap-2.5 truncate max-w-[85%]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006A4E]" />
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base font-display truncate">
                    {tText(selectedVideo.title) || 'Field Documentation Video'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Close Video (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Player Container */}
              <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                {activeEmbedInfo.isValid && activeEmbedInfo.embedUrl ? (
                  activeEmbedInfo.type === 'direct_video' ? (
                    <video
                      src={activeEmbedInfo.originalUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <iframe
                      src={activeEmbedInfo.embedUrl}
                      title={tText(selectedVideo.title) || 'Video Player'}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )
                ) : (
                  <div className="p-8 text-center text-white space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                    <p className="text-sm font-bold">
                      {isBn ? 'এই ভিডিওটি সরাসরি এম্বেড করা সম্ভব হচ্ছে না।' : 'This video cannot be played directly inside the embedded player.'}
                    </p>
                    <p className="text-xs text-slate-400">
                      {activeEmbedInfo.errorMessage || (isBn ? 'প্ল্যাটফর্মের প্রাইভেসি নিয়মের কারণে ভিডিওটি মূল প্ল্যাটফর্মে দেখুন।' : 'Platform privacy or permission settings may require viewing on the original source.')}
                    </p>
                    <a
                      href={selectedVideo.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#006A4E] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#00523C] transition-colors mt-2"
                    >
                      <span>{isBn ? 'মূল প্ল্যাটফর্মে ভিডিওটি দেখুন' : 'Watch on Original Platform'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Details Footer */}
              <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {tText(selectedVideo.description)}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                      <span>{selectedVideo.date || 'Recent'}</span>
                    </span>
                    {selectedVideo.duration && (
                      <span className="flex items-center gap-1.5 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedVideo.duration}</span>
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-slate-700 font-bold border border-[#EAE3D9] uppercase text-[10px]">
                      {selectedVideo.platform || 'Video'}
                    </span>
                  </div>

                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#006A4E] text-xs font-extrabold rounded-xl border border-[#EAE3D9] transition-colors"
                  >
                    <span>{isBn ? 'মূল প্ল্যাটফর্মে দেখুন' : 'Watch on Official Platform'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

