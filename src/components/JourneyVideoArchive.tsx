import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { JourneyVideo } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  detectAndNormalizeMedia,
  DEFAULT_VIDEO_THUMBNAIL,
  getYouTubeEmbedUrl,
  isFacebookVideoUrl
} from '../lib/utils/mediaHelper';
import {
  Play,
  Calendar,
  ExternalLink,
  ChevronDown,
  Clock,
  Sparkles,
  Film,
  RotateCcw,
  Volume2,
  AlertCircle
} from 'lucide-react';

interface JourneyVideoArchiveProps {
  headLocation?: string;
  estYear?: string;
}

export const JourneyVideoArchive: React.FC<JourneyVideoArchiveProps> = ({
  headLocation = 'Hathazari, Chattogram, Bangladesh',
  estYear = '2015'
}) => {
  const { isBn, tText } = useLanguage();
  const { journeyVideos, aboutSettings, settings } = useData();

  const effectiveLocation = headLocation || aboutSettings.location || settings.officialAddress || 'Hathazari, Chattogram, Bangladesh';
  const effectiveEstYear = estYear || aboutSettings.establishedYear || settings.establishedYear || '2015';

  // 1. Filter published videos and sort by display order
  const publishedVideos = useMemo(() => {
    return journeyVideos
      .filter(v => v.isPublished !== false)
      .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  }, [journeyVideos]);

  // 2. Select initial active video: featured one, or first available
  const defaultVideoId = useMemo(() => {
    const featured = publishedVideos.find(v => v.isFeatured);
    if (featured) return featured.id;
    return publishedVideos[0]?.id || '';
  }, [publishedVideos]);

  const [selectedId, setSelectedId] = useState<string>(defaultVideoId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [embedError, setEmbedError] = useState<boolean>(false);

  // Sync selectedId when publishedVideos changes if current selection is invalid
  useEffect(() => {
    if (!publishedVideos.some(v => v.id === selectedId)) {
      setSelectedId(defaultVideoId);
      setIsPlaying(false);
      setEmbedError(false);
    }
  }, [publishedVideos, defaultVideoId, selectedId]);

  // Reset playing state when switching timeline tab
  const handleSelectTimeline = (id: string) => {
    if (id === selectedId) return;
    setSelectedId(id);
    setIsPlaying(false);
    setEmbedError(false);
    setIsDropdownOpen(false);
  };

  // Find currently selected video record
  const currentVideo: JourneyVideo | undefined = useMemo(() => {
    return publishedVideos.find(v => v.id === selectedId) || publishedVideos[0];
  }, [publishedVideos, selectedId]);

  // Detect media URL format & embed information
  const mediaInfo = useMemo(() => {
    if (!currentVideo || !currentVideo.videoUrl?.trim()) return null;
    const det = detectAndNormalizeMedia(currentVideo.videoUrl.trim());
    if (det.type === 'youtube' && det.videoId) {
      return {
        ...det,
        embedUrl: getYouTubeEmbedUrl(det.videoId, { autoplay: true, rel: 0 })
      };
    }
    return det;
  }, [currentVideo]);

  const rawThumbnail = currentVideo?.thumbnailUrl || mediaInfo?.thumbnailUrl || aboutSettings.heroImageUrl || '/images/infinity-cover-hero.jpg';
  const effectiveThumbnail = getAssetUrl(rawThumbnail);
  const hasValidVideoUrl = Boolean(currentVideo && currentVideo.videoUrl && currentVideo.videoUrl.trim().length > 0);

  // Limit direct top buttons to first 3 items if more exist, tucking the rest into an elegant "More Journeys" menu
  const primaryPills = publishedVideos.slice(0, 3);
  const extraPills = publishedVideos.slice(3);

  // If no published videos at all, show fallback photo
  if (publishedVideos.length === 0) {
    return (
      <div className="relative">
        <div className="rounded-3xl overflow-hidden shadow-warm-xl border-4 border-white aspect-4/3 bg-slate-100">
          <img
            src={getAssetUrl(aboutSettings.heroImageUrl || '/images/infinity-cover-hero.jpg')}
            alt="Infinity Bangladesh Field Service"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute -bottom-4 -left-4 bg-[#006A4E] text-white p-4 rounded-2xl shadow-warm-md text-xs font-bold border border-emerald-400">
          <span>{effectiveLocation.split(',')[0]} &bull; Est. {effectiveEstYear}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {/* 1. Dynamic Timeline Navigation Bar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar scroll-smooth py-1 max-w-full">
          {primaryPills.map(video => {
            const isSelected = video.id === currentVideo?.id;
            const timelineText = tText(video.timelineLabel) || (typeof video.timelineLabel === 'string' ? video.timelineLabel : 'Timeline');
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelectTimeline(video.id)}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#006A4E] text-white shadow-warm-sm ring-2 ring-emerald-500/20 scale-[1.02]'
                    : 'bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9] hover:border-[#006A4E]/30'
                }`}
                title={tText(video.title)}
              >
                <Calendar className={`w-3 h-3 ${isSelected ? 'text-emerald-200' : 'text-slate-400'}`} />
                <span>{timelineText}</span>
              </button>
            );
          })}

          {/* Extra journeys dropdown if > 3 exist */}
          {extraPills.length > 0 && (
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-1 border ${
                  extraPills.some(v => v.id === currentVideo?.id)
                    ? 'bg-[#006A4E] text-white border-emerald-600 shadow-warm-sm'
                    : 'bg-white hover:bg-[#FAF7F2] text-slate-700 border-[#EAE3D9]'
                }`}
              >
                <span>{isBn ? 'আরও ভিডিও' : 'More Videos'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-1.5 w-56 rounded-2xl bg-white border border-[#EAE3D9] shadow-warm-lg z-30 py-1.5 overflow-hidden animate-in fade-in zoom-in-95">
                    {extraPills.map(video => {
                      const isSelected = video.id === currentVideo?.id;
                      const timelineText = tText(video.timelineLabel) || (typeof video.timelineLabel === 'string' ? video.timelineLabel : 'Timeline');
                      return (
                        <button
                          key={video.id}
                          type="button"
                          onClick={() => handleSelectTimeline(video.id)}
                          className={`w-full text-left px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? 'bg-[#E6F3EF] text-[#00523C] font-extrabold'
                              : 'text-slate-700 hover:bg-[#FAF7F2]'
                          }`}
                        >
                          <span className="truncate">{timelineText} — {tText(video.title)}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#006A4E] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Category Pill Tag */}
        {currentVideo?.category && (
          <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 shrink-0">
            {currentVideo.category}
          </span>
        )}
      </div>

      {/* 2. Interactive Video Card & Player Container */}
      <div className="relative group">
        <div className="rounded-3xl overflow-hidden shadow-warm-xl border-4 border-white aspect-4/3 bg-slate-950 relative flex items-center justify-center">
          {/* STATE A: ACTIVE EMBEDDED PLAYER */}
          {isPlaying && hasValidVideoUrl && mediaInfo?.embedUrl && !embedError ? (
            <div className="w-full h-full relative bg-black">
              <iframe
                src={mediaInfo.embedUrl}
                title={tText(currentVideo.title) || 'Infinity Bangladesh Journey Video'}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                onError={() => setEmbedError(true)}
              />
              <button
                type="button"
                onClick={() => setIsPlaying(false)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 hover:bg-black text-white text-xs backdrop-blur-sm transition-all cursor-pointer z-10 flex items-center gap-1 px-2.5"
                title="Return to Preview"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="text-[10px] font-bold">{isBn ? 'সংক্ষিপ্ত রূপ' : 'Preview'}</span>
              </button>
            </div>
          ) : isPlaying && hasValidVideoUrl && embedError ? (
            /* STATE B: EMBED ERROR / BLOCKED IFRAME FALLBACK */
            <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center text-white bg-slate-900">
              <img
                src={effectiveThumbnail}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-25 filter blur-xs"
              />
              <div className="relative z-10 space-y-3 max-w-sm">
                <div className="w-12 h-12 rounded-2xl bg-white/10 mx-auto flex items-center justify-center text-amber-400 border border-white/20">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h4 className="font-extrabold text-sm sm:text-base">
                  {mediaInfo?.platform === 'facebook'
                    ? (isBn ? 'ফেসবুকে ভিডিওটি দেখুন' : 'Watch this video on Facebook')
                    : (isBn ? 'ইউটিউবে ভিডিওটি খুলুন' : 'Open Video on YouTube')}
                </h4>
                <p className="text-xs text-slate-300">
                  {isBn
                    ? 'ব্রাউজার সীমাবদ্ধতার কারণে ভিডিওটি সরাসরি অফিসিয়াল মাধ্যমে দেখার পরামর্শ দেওয়া হচ্ছে।'
                    : 'Direct embed playback is restricted by your browser. You can watch the full video directly on the source platform.'}
                </p>
                <a
                  href={currentVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-md transition-all cursor-pointer"
                >
                  <span>{isBn ? 'সরাসরি ভিডিও প্লে করুন' : 'Watch Original Video'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : hasValidVideoUrl ? (
            /* STATE C: THUMBNAIL WITH PLAY OVERLAY */
            <div
              className="w-full h-full relative cursor-pointer group/thumb"
              onClick={() => setIsPlaying(true)}
            >
              <img
                src={effectiveThumbnail}
                alt={tText(currentVideo.title) || 'Infinity Bangladesh Journey'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-105"
                onError={(e) => {
                  const target = e.currentTarget as HTMLImageElement;
                  target.onerror = null;
                  target.src = DEFAULT_VIDEO_THUMBNAIL;
                }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent transition-opacity" />

              {/* Centered Pulsing Play Button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-emerald-500/30 animate-ping" />
                  <div className="relative w-16 sm:w-18 h-16 sm:h-18 rounded-full bg-[#006A4E] text-white flex items-center justify-center shadow-2xl transition-all duration-300 transform group-hover/thumb:scale-110 group-hover/thumb:bg-emerald-600 border-2 border-white/50">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                  </div>
                </div>
              </div>

              {/* Floating Timeline Tag on Top Right */}
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5 shadow-warm-sm">
                <Clock className="w-3 h-3 text-amber-400" />
                <span>{tText(currentVideo.timelineLabel)}</span>
              </div>

              {/* Card Footer Details Overlaid on Thumbnail */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white space-y-1.5 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#006A4E] text-emerald-100 border border-emerald-400/40">
                    {isBn ? 'ভিডিও ডকুমেন্টারি' : 'Official Journey Archive'}
                  </span>
                  {currentVideo.isFeatured && (
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/90 text-white flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span>{isBn ? 'বিশেষ পরিক্রমা' : 'Featured'}</span>
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-display text-white drop-shadow-md">
                  {tText(currentVideo.title)}
                </h3>

                {tText(currentVideo.description) && (
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed drop-shadow-sm">
                    {tText(currentVideo.description)}
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* STATE D: CLEAN "VIDEO COMING SOON" STATE */
            <div className="w-full h-full relative flex flex-col items-center justify-center p-6 text-center text-white bg-gradient-to-br from-[#11241E] to-[#0A1612]">
              {effectiveThumbnail && (
                <img
                  src={effectiveThumbnail}
                  alt="Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xs"
                />
              )}
              <div className="relative z-10 space-y-3 max-w-xs sm:max-w-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-800/80 shadow-warm-sm">
                  <Film className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-900/60 text-emerald-300 border border-emerald-700/50 mb-1.5">
                    {tText(currentVideo.timelineLabel)}
                  </span>
                  <h4 className="font-extrabold text-base sm:text-lg text-white font-display">
                    {tText(currentVideo.title)}
                  </h4>
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  {tText(currentVideo.description) || (isBn
                    ? 'আমাদের এই পর্বের প্রামাণ্যচিত্রটি শীঘ্রই এখানে সরাসরি উপভোগ করতে পারবেন।'
                    : 'The documentary video for this milestone journey is being finalized and will be uploaded shortly.')}
                </p>
                <div className="pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-emerald-100 text-xs font-bold border border-white/15">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>{isBn ? 'ভিডিওটি শীঘ্রই আসছে' : 'Video Coming Soon'}</span>
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating Est. Badge at bottom left matching original card */}
        <div className="absolute -bottom-4 -left-4 bg-[#006A4E] text-white p-3.5 sm:p-4 rounded-2xl shadow-warm-md text-xs font-bold border border-emerald-400 z-10 flex items-center gap-2">
          <span>{effectiveLocation.split(',')[0]} &bull; Est. {effectiveEstYear}</span>
        </div>
      </div>
    </div>
  );
};
