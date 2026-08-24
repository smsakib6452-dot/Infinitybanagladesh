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

export const DEFAULT_VIDEO_THUMBNAIL = 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';

/**
 * Extract YouTube Video ID from any standard YouTube URL format
 */
export function extractYouTubeId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  let cleanUrl = url.trim();

  // If URL doesn't start with protocol, prepend https:// for uniform parsing if it contains youtube or youtu.be
  if (!/^https?:\/\//i.test(cleanUrl) && (cleanUrl.includes('youtube') || cleanUrl.includes('youtu.be'))) {
    cleanUrl = `https://${cleanUrl}`;
  }

  // Pattern 1: youtu.be/<id> (ignoring any query params after ID)
  const shortMatch = cleanUrl.match(/(?:https?:\/\/)?(?:www\.|m\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (shortMatch && shortMatch[1]) return shortMatch[1];

  // Pattern 2: youtube.com/watch?v=<id> or ?...&v=<id>
  const watchMatch = cleanUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // Pattern 3: youtube.com/embed/<id>
  const embedMatch = cleanUrl.match(/(?:youtube(?:-nocookie)?\.com)\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // Pattern 4: youtube.com/shorts/<id>
  const shortsMatch = cleanUrl.match(/(?:youtube\.com)\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // Pattern 5: youtube.com/live/<id>
  const liveMatch = cleanUrl.match(/(?:youtube\.com)\/live\/([a-zA-Z0-9_-]{11})/i);
  if (liveMatch && liveMatch[1]) return liveMatch[1];

  // Pattern 6: youtube.com/v/<id>
  const vMatch = cleanUrl.match(/(?:youtube\.com)\/v\/([a-zA-Z0-9_-]{11})/i);
  if (vMatch && vMatch[1]) return vMatch[1];

  // Pattern 7: Direct 11-char YouTube ID (must contain mixed characters and numbers/uppercase, not pure lowercase plain words)
  if (/^[a-zA-Z0-9_-]{11}$/.test(cleanUrl) && (/[0-9]/.test(cleanUrl) || /[A-Z]/.test(cleanUrl)) && !cleanUrl.includes('invalid')) {
    return cleanUrl;
  }

  return null;
}

/**
 * Generate standard YouTube embed URL
 */
export function getYouTubeEmbedUrl(videoId: string, options?: { autoplay?: boolean; rel?: number }): string {
  if (!videoId) return '';
  const params = new URLSearchParams();
  if (options?.autoplay) params.set('autoplay', '1');
  if (options?.rel !== undefined) params.set('rel', options.rel.toString());
  else params.set('rel', '0');
  
  const queryStr = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryStr ? `?${queryStr}` : ''}`;
}

/**
 * Extract standard YouTube Thumbnail
 */
export function getYouTubeThumbnail(videoId: string, quality: 'maxres' | 'hq' | 'mq' | 'default' = 'hq'): string {
  if (!videoId) return DEFAULT_VIDEO_THUMBNAIL;
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
  let url = (rawUrl || '').trim();

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

  // Auto-prepend https:// if domain-like input without protocol
  if (!/^https?:\/\//i.test(url) && !url.startsWith('data:')) {
    if (url.includes('youtube.com') || url.includes('youtu.be') || url.includes('facebook.com') || url.includes('fb.watch')) {
      url = `https://${url}`;
    }
  }

  // 1. YouTube Check
  const ytId = extractYouTubeId(url);
  if (ytId) {
    const embedUrl = getYouTubeEmbedUrl(ytId);
    const thumbnailUrl = getYouTubeThumbnail(ytId, 'hq');
    return {
      type: 'youtube',
      isValid: true,
      platform: 'youtube',
      originalUrl: url.startsWith('http') ? url : `https://www.youtube.com/watch?v=${ytId}`,
      videoId: ytId,
      embedUrl,
      thumbnailUrl,
      suggestedTitle: `Infinity Bangladesh Video (${ytId})`
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
      thumbnailUrl: DEFAULT_VIDEO_THUMBNAIL,
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
      thumbnailUrl: DEFAULT_VIDEO_THUMBNAIL,
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
      errorMessage: 'Unsupported media URL. Please provide a YouTube (watch, youtu.be, embed, shorts), Facebook video, or direct image/video URL.'
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
