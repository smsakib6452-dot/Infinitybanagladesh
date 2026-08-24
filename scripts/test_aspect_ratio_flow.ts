import {
  detectAndNormalizeMedia,
  extractYouTubeId,
  getYouTubeEmbedUrl,
  isPortraitVideo,
  getVideoAspectRatio,
  getFacebookEmbedUrl
} from '../src/lib/utils/mediaHelper';
import { VideoItem } from '../src/types';

function runAspectRatioTests() {
  console.log('====================================================');
  console.log('TESTING DYNAMIC ASPECT RATIO & PLAYER EMBED SUPPORT');
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

  // 1. YouTube Shorts URL Parsing & Aspect Ratio
  console.log('1. YouTube Shorts Detection & Embed Format:');
  const shortsUrl = 'https://www.youtube.com/shorts/dQw4w9WgXcQ';
  const shortsDet = detectAndNormalizeMedia(shortsUrl);
  assert(shortsDet.isValid, 'Shorts URL is marked as valid');
  assert(shortsDet.type === 'youtube', 'Detected as YouTube');
  assert(shortsDet.videoId === 'dQw4w9WgXcQ', 'Video ID extracted correctly: dQw4w9WgXcQ');
  assert(shortsDet.isShorts === true, 'isShorts flagged as true');
  assert(shortsDet.aspectRatio === '9/16', 'aspectRatio detected as 9/16');
  assert(shortsDet.embedUrl === 'https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0', `Standardized embedUrl format: ${shortsDet.embedUrl}`);

  // 2. Standard YouTube 16:9 Landscape Video
  console.log('\n2. Standard 16:9 Landscape YouTube Video:');
  const stdUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const stdDet = detectAndNormalizeMedia(stdUrl);
  assert(stdDet.isValid, 'Standard watch URL is valid');
  assert(stdDet.isShorts === false, 'isShorts flagged as false');
  assert(stdDet.aspectRatio === '16/9', 'aspectRatio detected as 16/9');

  // 3. Facebook Reel
  console.log('\n3. Facebook Reel Detection:');
  const fbReelUrl = 'https://www.facebook.com/reel/1022938485769201';
  const fbDet = detectAndNormalizeMedia(fbReelUrl);
  assert(fbDet.isValid, 'Facebook Reel URL is valid');
  assert(fbDet.isShorts === true, 'Facebook Reel isShorts is true');
  assert(fbDet.aspectRatio === '9/16', 'Facebook Reel aspectRatio is 9/16');
  assert(fbDet.embedUrl.includes('plugins/video.php'), 'Facebook plugin embedUrl generated properly');

  // 4. Helper Function Tests (isPortraitVideo & getVideoAspectRatio)
  console.log('\n4. Aspect Ratio Helper Functions:');
  const testShortsItem: Partial<VideoItem> = {
    id: 'vid-test-1',
    videoUrl: 'https://www.youtube.com/shorts/abc12345678',
    aspectRatio: '9/16',
    isShorts: true
  };
  const testLandscapeItem: Partial<VideoItem> = {
    id: 'vid-test-2',
    videoUrl: 'https://www.youtube.com/watch?v=abc12345678',
    aspectRatio: '16/9',
    isShorts: false
  };

  assert(isPortraitVideo(testShortsItem as VideoItem) === true, 'isPortraitVideo returns true for testShortsItem');
  assert(getVideoAspectRatio(testShortsItem as VideoItem) === '9/16', 'getVideoAspectRatio returns 9/16 for testShortsItem');
  assert(isPortraitVideo(testLandscapeItem as VideoItem) === false, 'isPortraitVideo returns false for testLandscapeItem');
  assert(getVideoAspectRatio(testLandscapeItem as VideoItem) === '16/9', 'getVideoAspectRatio returns 16/9 for testLandscapeItem');

  // Test inferred portrait from URL alone
  const testUrlOnlyItem: Partial<VideoItem> = {
    id: 'vid-test-3',
    videoUrl: 'https://youtube.com/shorts/xyz98765432'
  };
  assert(isPortraitVideo(testUrlOnlyItem as VideoItem) === true, 'isPortraitVideo infers portrait from /shorts/ in URL');
  assert(getVideoAspectRatio(testUrlOnlyItem as VideoItem) === '9/16', 'getVideoAspectRatio infers 9/16 from /shorts/ in URL');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runAspectRatioTests();
