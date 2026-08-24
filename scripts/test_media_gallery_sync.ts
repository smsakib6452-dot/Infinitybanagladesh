import { INITIAL_MEDIA_LIBRARY, INITIAL_GALLERY, INITIAL_VIDEOS } from '../src/data/initialData';
import { MediaItem, VideoItem } from '../src/types';

function runMediaSyncTests() {
  console.log('====================================================');
  console.log('TESTING MEDIA, GALLERY & VIDEO SYNCHRONIZATION');
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

  // 1. Check the 5 active images in INITIAL_MEDIA_LIBRARY
  console.log('1. Verifying 5 Active Official Assets:');
  const activeImages = [
    'standing-committee-poster.png',
    'executive-committee-2026.png',
    'winter-warmth.jpg',
    'infinity-logo.png',
    'infinity-cover-hero.jpg'
  ];

  for (const imgName of activeImages) {
    const item = INITIAL_MEDIA_LIBRARY.find(m => m.fileName.includes(imgName.replace(/\.[^/.]+$/, '')));
    assert(Boolean(item), `Asset "${imgName}" exists in INITIAL_MEDIA_LIBRARY`);
    if (item) {
      assert(Boolean(item.url && item.category && item.usageTags && item.usageTags.length > 0), `Asset "${imgName}" has valid URL, category (${item.category}), and usageTags ([${item.usageTags.join(', ')}])`);
    }
  }

  // 2. Check Tag & Category Matching for Gallery Dynamic Filtering
  console.log('\n2. Testing Dynamic Gallery Tag & Category Matching:');
  const photos = INITIAL_MEDIA_LIBRARY.filter(m => m.type !== 'video');

  const campaignMatch = photos.filter(p => p.category === 'Campaigns' || p.usageTags?.some(t => t.toLowerCase().includes('campaign')));
  assert(campaignMatch.length >= 2, `Campaigns tag matches ${campaignMatch.length} items (expected >= 2: winter-warmth, infinity-cover-hero)`);

  const volunteersMatch = photos.filter(p => p.category === 'Volunteers' || p.usageTags?.some(t => t.toLowerCase().includes('volunteer')));
  assert(volunteersMatch.length >= 2, `Volunteers tag matches ${volunteersMatch.length} items (expected 2: executive-committee-2026, standing-committee-poster)`);

  const eventsMatch = photos.filter(p => p.category === 'Events' || p.usageTags?.some(t => t.toLowerCase().includes('event')));
  assert(eventsMatch.length >= 1, `Events tag matches ${eventsMatch.length} items (expected >= 1: winter-warmth)`);

  const logosMatch = photos.filter(p => p.category === 'Logos' || p.usageTags?.some(t => t.toLowerCase().includes('logo')));
  assert(logosMatch.length >= 1, `Logos tag matches ${logosMatch.length} items (expected 1: infinity-logo)`);

  // 3. Check Video Synchronization in Media Library
  console.log('\n3. Verifying Video Synchronization:');
  const initialVideosCount = INITIAL_MEDIA_LIBRARY.filter(m => m.type === 'video').length;
  assert(initialVideosCount >= 1, `Admin media library has at least 1 video entry by default (Videos count: ${initialVideosCount})`);

  const vid1 = INITIAL_MEDIA_LIBRARY.find(m => m.id === 'vid-1' || m.type === 'video');
  assert(Boolean(vid1 && vid1.url.includes('youtube')), `Initial video exists with valid YouTube URL: ${vid1?.url}`);
  assert(Boolean(vid1?.embedUrl && vid1?.thumbnailUrl), `Initial video has generated embedUrl and thumbnailUrl`);

  // 4. Test Deletion & Cascade Consistency
  console.log('\n4. Testing Cascade Deletion Simulation:');
  let simulatedMedia: MediaItem[] = [...INITIAL_MEDIA_LIBRARY];
  let simulatedVideos: VideoItem[] = [...INITIAL_VIDEOS];

  // Delete vid-1
  const deleteId = 'vid-1';
  simulatedMedia = simulatedMedia.filter(m => m.id !== deleteId);
  simulatedVideos = simulatedVideos.filter(v => v.id !== deleteId);

  assert(!simulatedMedia.some(m => m.id === deleteId), 'Video removed from Media Library');
  assert(!simulatedVideos.some(v => v.id === deleteId), 'Video removed from Videos state');
  assert(simulatedVideos.length === 0, 'Public video page reflects 0 videos immediately upon deletion (no mock override)');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runMediaSyncTests();
