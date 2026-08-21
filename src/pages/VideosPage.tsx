import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import { Video, Play, ExternalLink, Calendar, Clock, X, Heart, ShieldCheck } from 'lucide-react';
import { VideoItem } from '../types';

export const VideosPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { videos } = useData();
  const { navigate } = useRouter();

  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Helper to format embed URL for YouTube
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return url;
  };

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E6F3EF] border border-[#C2E2D7] rounded-full text-[#00523C] text-xs font-extrabold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            <span>{isBn ? 'ভিডিও গ্যালারি ও তথ্যচিত্র' : 'Video Gallery & Field Footage'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
            {isBn ? 'আমাদের মাঠপর্যায়ের বাস্তব চিত্র' : 'Ground Realities & Campaign Stories'}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটির স্বেচ্ছাসেবী কার্যক্রম, ত্রাণ বিতরণ মুহূর্ত ও যুব নেতৃত্বের ভিডিওচিত্র এক নজরে দেখুন।'
              : 'Watch authentic glimpses of Team Infinity field drives, seasonal relief efforts, and youth volunteer leadership in Bangladesh.'}
          </p>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EAE3D9] shadow-warm-sm max-w-lg mx-auto">
            <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-base">
              {isBn ? 'কোনো ভিডিও পাওয়া যায়নি' : 'No Videos Published Yet'}
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              {isBn ? '[অফিসিয়াল ভিডিও লিঙ্ক অ্যাডমিন প্যানেল থেকে যুক্ত করুন]' : '[Official verified video links to be added via Admin]'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-warm-sm hover:shadow-warm-md transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedVideo(item)}
              >
                {/* Thumbnail with Play Overlay */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'}
                    alt={tText(item.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/10 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#006A4E]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-[#006A4E] transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-xs px-2.5 py-1 rounded-md font-mono font-medium backdrop-blur-sm">
                      {item.duration}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-[#006A4E]/90 text-white text-[11px] px-2.5 py-1 rounded-full font-bold capitalize backdrop-blur-sm">
                    {item.platform}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#006A4E] transition-colors line-clamp-2 font-display">
                      {tText(item.title)}
                    </h3>
                    <p className="text-slate-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {tText(item.description)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="text-[#006A4E] font-bold inline-flex items-center gap-1 group-hover:underline">
                      <span>{isBn ? 'ভিডিও চালান' : 'Watch Now'}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 flex items-center justify-between border-b border-slate-100 bg-[#FAF7F2]">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base font-display truncate max-w-[80%]">
                  {tText(selectedVideo.title)}
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Video Embed Frame */}
              <div className="aspect-video bg-black">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={tText(selectedVideo.title)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Modal Footer Info */}
              <div className="p-5 space-y-3">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tText(selectedVideo.description)}
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#006A4E]" />
                      {selectedVideo.date}
                    </span>
                    {selectedVideo.duration && (
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {selectedVideo.duration}
                      </span>
                    )}
                  </div>

                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#006A4E] text-xs font-bold rounded-xl border border-[#EAE3D9] transition-colors"
                  >
                    <span>{isBn ? 'মূল প্ল্যাটফর্মে দেখুন' : 'Open in New Tab'}</span>
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
