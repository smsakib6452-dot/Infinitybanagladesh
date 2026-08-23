/**
 * Media Helper & URL Normalization Utility for Infinity Bangladesh
 * 
 * Supports:
 * - YouTube URLs: watch?v=, youtu.be/, embed/, shorts/, live/
 * - Facebook Video URLs: watch/?v=, /videos/, /reel/, fb.watch/
 * - Direct video files: mp4, webm, ogg
 * - Image URLs: jpg, png, webp, svg, gif, Cloudinary URLs
 * - Safe embed generation preventing XSS and invalid iframes
 */

export type DetectedMediaType = 'youtube' | 'facebook' | 'direct_video' | 'image' | 'invalid';

export interface MediaDetectionResult {
  type: DetectedMediaType;
  isValid: boolean;
  platform: 'youtube' | 'facebook' | 'cloudinary' | 'direct' | 'unknown';
  originalUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  videoId?: string;
  suggestedTitle?: string;
  errorMessage?: string;
}

/**
 * Extract YouTube Video ID from any standard YouTube URL format
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const cleanUrl = url.trim();

  // Pattern 1: youtu.be/<id>
  const shortMatch = cleanUrl.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // Pattern 2: youtube.com/watch?v=<id>
  const watchMatch = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Pattern 3: youtube.com/embed/<id>
  const embedMatch = cleanUrl.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Pattern 4: youtube.com/shorts/<id>
  const shortsMatch = cleanUrl.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Pattern 5: youtube.com/live/<id>
  const liveMatch = cleanUrl.match(/youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i);
  if (liveMatch && liveMatch[1]) return liveMatch[1];

  // Pattern 6: Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl)) {
    return cleanUrl;
  }

  return null;
}

/**
 * Generate official, privacy-enhanced YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string, options?: { autoplay?: boolean; rel?: number }): string {
  const autoplayParam = options?.autoplay ? '&autoplay=1' : '';
  const relParam = options?.rel !== undefined ? `&rel=${options.rel}` : '&rel=0';
  return `https://www.youtube-nocookie.com/embed/${videoId}?modestbranding=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}${relParam}${autoplayParam}`;
}

/**
 * Extract YouTube Thumbnail
 */
export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' | 'default' = 'hq'): string {
  if (quality === 'maxres') {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

/**
 * Validate and format Facebook Video URL for official Facebook Embedded Video Player plugin
 */
export function isFacebookVideoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const lower = url.toLowerCase().trim();
  return (
    (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.me')) &&
    (lower.includes('/videos/') ||
      lower.includes('/watch') ||
      lower.includes('/reel/') ||
      lower.includes('v=') ||
      lower.includes('fb.watch'))
  );
}

/**
 * Generate official Facebook Video plugin embed URL
 */
export function getFacebookEmbedUrl(url: string, options?: { autoplay?: boolean }): string {
  const cleanUrl = url.trim();
  const encodedHref = encodeURIComponent(cleanUrl);
  const autoplay = options?.autoplay ? '&autoplay=true' : '';
  return `https://www.facebook.com/plugins/video.php?href=${encodedHref}&show_text=false&width=1280&allowfullscreen=true${autoplay}`;
}

/**
 * Check if URL is an image URL
 */
export function isImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.toLowerCase().trim();
  if (clean.startsWith('data:image/')) return true;
  if (clean.includes('cloudinary.com') && !clean.includes('/video/')) return true;
  return /\.(jpeg|jpg|png|webp|svg|gif|avif)(\?.*)?$/i.test(clean);
}

/**
 * Check if URL is a direct video file URL
 */
export function isDirectVideoUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const clean = url.toLowerCase().trim();
  if (clean.startsWith('data:video/')) return true;
  if (clean.includes('cloudinary.com/video/')) return true;
  return /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(clean);
}

/**
 * Auto-detect media platform, parse video ID, generate safe embed URL and thumbnail
 */
export function detectAndNormalizeMedia(rawUrl: string): MediaDetectionResult {
  const url = (rawUrl || '').trim();

  if (!url) {
    return {
      type: 'invalid',
      isValid: false,
      platform: 'unknown',
      originalUrl: '',
      embedUrl: '',
      thumbnailUrl: '',
      errorMessage: 'Please enter a valid URL.'
    };
  }

  // 1. YouTube Check
  const ytId = extractYouTubeId(url);
  if (ytId) {
    return {
      type: 'youtube',
      isValid: true,
      platform: 'youtube',
      originalUrl: url,
      videoId: ytId,
      embedUrl: getYouTubeEmbedUrl(ytId),
      thumbnailUrl: getYouTubeThumbnail(ytId, 'hq'),
      suggestedTitle: `Infinity Bangladesh YouTube Video (${ytId})`
    };
  }

  // 2. Facebook Video Check
  if (isFacebookVideoUrl(url)) {
    return {
      type: 'facebook',
      isValid: true,
      platform: 'facebook',
      originalUrl: url,
      embedUrl: getFacebookEmbedUrl(url),
      thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      suggestedTitle: 'Infinity Bangladesh Facebook Video'
    };
  }

  // 3. Direct Video Check
  if (isDirectVideoUrl(url)) {
    return {
      type: 'direct_video',
      isValid: true,
      platform: 'direct',
      originalUrl: url,
      embedUrl: url,
      thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      suggestedTitle: url.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Direct Video'
    };
  }

  // 4. Image Check
  if (isImageUrl(url)) {
    const isCloud = url.includes('cloudinary.com');
    return {
      type: 'image',
      isValid: true,
      platform: isCloud ? 'cloudinary' : 'direct',
      originalUrl: url,
      embedUrl: url,
      thumbnailUrl: url,
      suggestedTitle: url.split('/').pop()?.replace(/\.[^/.]+$/, '') || 'Image Asset'
    };
  }

  // 5. Fallback for potential generic HTTP URL
  if (/^https?:\/\//i.test(url)) {
    return {
      type: 'invalid',
      isValid: false,
      platform: 'unknown',
      originalUrl: url,
      embedUrl: '',
      thumbnailUrl: '',
      errorMessage: 'Unsupported media URL. Please provide a YouTube, Facebook video, or direct image/video URL.'
    };
  }

  return {
    type: 'invalid',
    isValid: false,
    platform: 'unknown',
    originalUrl: url,
    embedUrl: '',
    thumbnailUrl: '',
    errorMessage: 'Invalid URL format. Make sure it starts with http:// or https://'
  };
}
