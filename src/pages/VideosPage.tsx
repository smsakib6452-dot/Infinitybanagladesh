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
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/80 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Video className="w-3.5 h-3.5" />
            {isBn ? 'ভিডিও গ্যালারি ও তথ্যচিত্র' : 'Video Gallery & Field Footage'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isBn ? 'আমাদের মাঠপর্যায়ের বাস্তব চিত্র' : 'Ground Realities & Campaign Stories'}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটির স্বেচ্ছাসেবী কার্যক্রম, ত্রাণ বিতরণ মুহূর্ত ও যুব নেতৃত্বের ভিডিওচিত্র এক নজরে দেখুন।'
              : 'Watch authentic glimpses of Team Infinity field drives, seasonal relief efforts, and youth volunteer leadership in Bangladesh.'}
          </p>
        </div>

        {/* Video Grid */}
        {videos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
            <Video className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-700 text-lg">
              {isBn ? 'কোনো ভিডিও পাওয়া যায়নি' : 'No Videos Published Yet'}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {isBn ? '[অফিসিয়াল ভিডিও লিঙ্ক অ্যাডমিন প্যানেল থেকে যুক্ত করুন]' : '[Official verified video links to be added via Admin]'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
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
                    <div className="w-14 h-14 rounded-full bg-teal-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-teal-600 transition-all">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>
                  {item.duration && (
                    <span className="absolute bottom-3 right-3 bg-slate-950/80 text-white text-xs px-2.5 py-1 rounded-md font-mono font-medium backdrop-blur-sm">
                      {item.duration}
                    </span>
                  )}
                  <span className="absolute top-3 left-3 bg-slate-950/75 text-teal-300 text-xs px-2.5 py-1 rounded-md font-semibold capitalize backdrop-blur-sm">
                    {item.platform}
                  </span>
                </div>

                {/* Video Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2">
                      {tText(item.title)}
                    </h3>
                    <p className="text-slate-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {tText(item.description)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span className="text-teal-700 font-semibold flex items-center gap-1">
                      {isBn ? 'ভিডিও চালান' : 'Watch Video'}
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800">
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-teal-400" />
                  <h3 className="font-bold text-sm md:text-base line-clamp-1">
                    {tText(selectedVideo.title)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Responsive Video Frame */}
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={getEmbedUrl(selectedVideo.videoUrl)}
                  title={tText(selectedVideo.title)}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 bg-slate-900 text-white space-y-3">
                <p className="text-sm text-slate-300 leading-relaxed">
                  {tText(selectedVideo.description)}
                </p>
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>Infinity Bangladesh Official Video Archive</span>
                  <a
                    href={selectedVideo.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors"
                  >
                    {isBn ? 'মূল প্ল্যাটফর্মে দেখুন' : 'Open in New Tab'}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white text-center max-w-4xl mx-auto shadow-xl space-y-6">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mx-auto">
            <Heart className="w-6 h-6 text-teal-300" />
          </div>
          <h2 className="text-2xl md:text-3xl font-black">
            {isBn ? 'আপনিও হতে পারেন পরবর্তী পরিবর্তনের সারথি' : 'Be Part of Our Next Humanitarian Drive'}
          </h2>
          <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটি দেশের প্রতিটি প্রান্তে অসহায় মানুষের মুখে হাসি ফোটাতে নিরন্তর কাজ করছে। যোগ দিন আমাদের স্বেচ্ছাসেবী পরিবারে।'
              : 'Join Team Infinity as an active volunteer and stand with us on the ground for humanity.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('volunteer')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-xl transition-colors shadow-md"
            >
              {isBn ? 'স্বেচ্ছাসেবক হিসেবে যোগ দিন' : 'Become a Volunteer'}
            </button>
            <button
              onClick={() => navigate('campaigns')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl transition-colors"
            >
              {isBn ? 'চলমান ক্যাম্পেইনসমূহ দেখুন' : 'Explore Active Campaigns'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
