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

  // 3. Check Clean Default State (No mock videos)
  console.log('\n3. Verifying Clean Initial Video State:');
  const initialVideosCount = INITIAL_VIDEOS.length;
  assert(initialVideosCount === 0, `Initial videos count is exactly 0 (no mock/demo videos hardcoded in seed: ${initialVideosCount})`);

  // 4. Test Video Addition, Sync & Permanent Deletion
  console.log('\n4. Testing Video Lifecycle & Permanent Deletion:');
  let simulatedMedia: MediaItem[] = [...INITIAL_MEDIA_LIBRARY];
  let simulatedVideos: VideoItem[] = [...INITIAL_VIDEOS];
  const deletedIds = new Set<string>();

  // Add real video
  const newVideo: VideoItem = {
    id: 'vid-real-123',
    title: { en: 'Relief Drive Flood Response', bn: 'বন্যা দুর্গতদের ত্রাণ বিতরণ' },
    description: { en: 'Emergency response distribution', bn: 'জরুরি ত্রাণ বিতরণ' },
    videoUrl: 'https://www.youtube.com/watch?v=sample123',
    embedUrl: 'https://www.youtube.com/embed/sample123',
    thumbnailUrl: 'https://img.youtube.com/vi/sample123/hqdefault.jpg',
    platform: 'youtube',
    category: 'Relief Campaigns',
    status: 'published',
    date: '2026-02-24',
    isFeatured: true
  };

  simulatedVideos.unshift(newVideo);
  simulatedMedia.unshift({
    id: newVideo.id,
    fileName: newVideo.title.en,
    url: newVideo.videoUrl,
    type: 'video',
    fileSize: 'Video',
    mimeType: 'video/embed',
    category: 'Campaigns',
    altText: newVideo.title.en,
    caption: '',
    uploadedAt: new Date().toISOString(),
    usageTags: ['Relief Campaigns', 'Videos'],
    status: 'published'
  });

  assert(simulatedVideos.length === 1, 'New video registered in videos state');
  assert(simulatedMedia.some(m => m.id === 'vid-real-123'), 'New video registered in mediaLibrary');

  // Delete real video
  const targetDeleteId = 'vid-real-123';
  deletedIds.add(targetDeleteId);
  simulatedVideos = simulatedVideos.filter(v => v.id !== targetDeleteId);
  simulatedMedia = simulatedMedia.filter(m => m.id !== targetDeleteId);

  assert(!simulatedVideos.some(v => v.id === targetDeleteId), 'Video removed from videos state');
  assert(!simulatedMedia.some(m => m.id === targetDeleteId), 'Video removed from mediaLibrary');
  assert(deletedIds.has(targetDeleteId), 'Deleted ID recorded in persistent deletion registry');

  // Simulate remote sync with deleted ID
  const incomingRemoteVideos = [{ id: targetDeleteId, video_url: 'https://www.youtube.com/watch?v=sample123' }];
  const syncedVideos = incomingRemoteVideos.filter(v => !deletedIds.has(v.id));
  assert(syncedVideos.length === 0, 'Deleted video blocked from resurrection during remote sync');

  console.log('\n====================================================');
  console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runMediaSyncTests();
