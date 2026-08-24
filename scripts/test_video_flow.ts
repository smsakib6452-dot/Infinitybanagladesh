import {
  extractYouTubeId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnail,
  detectAndNormalizeMedia,
  DEFAULT_VIDEO_THUMBNAIL
} from '../src/lib/utils/mediaHelper';
import { ApiService } from '../src/lib/services/apiService';

async function runTests() {
  console.log('====================================================');
  console.log('TESTING VIDEO EXTRACTION, SYNC & DATA FLOW');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, msg: string) {
    if (condition) {
      console.log(`  ✓ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. YouTube URL extraction test cases
  console.log('1. YouTube URL Extraction Test Suite:');
  const testUrls = [
    { url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Standard watch?v=' },
    { url: 'https://youtu.be/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Shortened youtu.be' },
    { url: 'https://youtu.be/dQw4w9WgXcQ?si=trackingParam123', expected: 'dQw4w9WgXcQ', desc: 'youtu.be with tracking query parameters' },
    { url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Embed URL' },
    { url: 'https://youtube-nocookie.com/embed/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Privacy nocookie embed' },
    { url: 'https://www.youtube.com/shorts/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'YouTube Shorts' },
    { url: 'https://www.youtube.com/live/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'YouTube Live' },
    { url: 'https://www.youtube.com/v/dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'YouTube /v/ format' },
    { url: 'youtube.com/watch?feature=share&v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Without protocol and query params before v=' },
    { url: 'dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ', desc: 'Direct 11-character video ID' }
  ];

  for (const t of testUrls) {
    const extracted = extractYouTubeId(t.url);
    assert(extracted === t.expected, `${t.desc} -> ${extracted}`);
  }

  // 2. Embed URL & Thumbnail Generation
  console.log('\n2. Standard Embed & Thumbnail Generation:');
  const testId = 'dQw4w9WgXcQ';
  const embedUrl = getYouTubeEmbedUrl(testId);
  const embedUrlAutoplay = getYouTubeEmbedUrl(testId, { autoplay: true, rel: 0 });
  const hqThumbnail = getYouTubeThumbnail(testId, 'hq');

  assert(embedUrl === 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', `Clean embed URL: ${embedUrl}`);
  assert(embedUrlAutoplay === 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0', `Autoplay embed URL: ${embedUrlAutoplay}`);
  assert(hqThumbnail === 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', `HQ Thumbnail: ${hqThumbnail}`);

  // 3. detectAndNormalizeMedia
  console.log('\n3. Media Detection & Normalization:');
  const detection1 = detectAndNormalizeMedia('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  assert(detection1.isValid === true && detection1.type === 'youtube', 'Detects YouTube correctly');
  assert(detection1.embedUrl === 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', 'Produces correct embedUrl in detection');
  assert(detection1.thumbnailUrl === 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg', 'Produces correct thumbnailUrl in detection');

  const detection2 = detectAndNormalizeMedia('https://www.facebook.com/InfinityBangladesh/videos/1234567890/');
  assert(detection2.isValid === true && detection2.type === 'facebook', 'Detects Facebook video correctly');

  const detection3 = detectAndNormalizeMedia('invalid-url');
  assert(detection3.isValid === false, 'Flags invalid URL properly');

  // 4. ApiService CRUD Operations
  console.log('\n4. ApiService Video CRUD Methods:');
  const initialVideos = await ApiService.getVideos();
  assert(Array.isArray(initialVideos) && initialVideos.length > 0, `getVideos() returned ${initialVideos.length} items`);

  const createdVideo = await ApiService.createVideo({
    title: { en: 'Test Humanitarian Drive', bn: 'টেস্ট মানবিক অভিযান' },
    description: { en: 'Field drive description', bn: 'মাঠপর্যায়ের বিবরণ' },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    platform: 'youtube',
    date: '2026-02-24',
    category: 'Relief Campaigns',
    status: 'published'
  });

  assert(Boolean(createdVideo.id && createdVideo.id.startsWith('vid-')), `createVideo created video with ID: ${createdVideo.id}`);
  assert(createdVideo.status === 'published', 'New video default status is published');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Test execution exception:', err);
  process.exit(1);
});
