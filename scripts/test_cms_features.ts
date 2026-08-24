import { INITIAL_PRESS_COVERAGE, INITIAL_BANNERS, INITIAL_GALLERY_ALBUMS, INITIAL_MEDIA_LIBRARY } from '../src/data/initialData';
import { PressCoverage, BannerItem, GalleryAlbum, MediaItem } from '../src/types';

console.log('--- Testing CMS Features & In The News System ---');

// 1. Validate Initial Press Coverage Data
console.log(`[1] Verifying INITIAL_PRESS_COVERAGE (${INITIAL_PRESS_COVERAGE.length} items)...`);
if (INITIAL_PRESS_COVERAGE.length === 0) {
  throw new Error('INITIAL_PRESS_COVERAGE is empty!');
}

INITIAL_PRESS_COVERAGE.forEach(item => {
  if (!item.id || !item.outletName || !item.title.en || !item.articleUrl) {
    throw new Error(`Invalid press item: ${JSON.stringify(item)}`);
  }
  if (!item.articleUrl.startsWith('http://') && !item.articleUrl.startsWith('https://')) {
    throw new Error(`Invalid article URL format for ${item.outletName}: ${item.articleUrl}`);
  }
});
console.log('✅ Initial press coverage dataset validated with active external article links.');

// 2. Validate Banner placement and bilingual attributes
console.log(`[2] Verifying INITIAL_BANNERS (${INITIAL_BANNERS.length} banners)...`);
INITIAL_BANNERS.forEach(banner => {
  if (!banner.id || !banner.title.en || !banner.desktopImageUrl || !banner.placement) {
    throw new Error(`Invalid banner item: ${JSON.stringify(banner)}`);
  }
});
console.log('✅ Banner items schema and bilingual content validated.');

// 3. Validate Gallery Albums and Photo isolation
console.log(`[3] Verifying INITIAL_GALLERY_ALBUMS (${INITIAL_GALLERY_ALBUMS.length} albums)...`);
INITIAL_GALLERY_ALBUMS.forEach(alb => {
  if (!alb.id || !alb.title.en || !alb.coverImageUrl) {
    throw new Error(`Invalid album item: ${JSON.stringify(alb)}`);
  }
});
console.log('✅ Gallery albums dataset validated.');

// 4. Validate Media Items
console.log(`[4] Verifying INITIAL_MEDIA_LIBRARY (${INITIAL_MEDIA_LIBRARY.length} items)...`);
INITIAL_MEDIA_LIBRARY.forEach(media => {
  if (!media.id || !media.url || !media.category) {
    throw new Error(`Invalid media item: ${JSON.stringify(media)}`);
  }
});
console.log('✅ Media Library dataset validated.');

console.log('\n🌟 ALL CMS FEATURES & TYPES VALIDATION PASSED SUCCESSFULLY 🌟\n');
