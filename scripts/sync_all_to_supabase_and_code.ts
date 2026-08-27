import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runFullSync() {
  console.log('🚀 Starting Full Backup Integration & Supabase Sync...');

  const raw = fs.readFileSync('scripts/incoming_user_data.json', 'utf8');
  const data = JSON.parse(raw);

  // 1. Sync public & docs JSON
  fs.writeFileSync('public/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
  fs.writeFileSync('docs/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ Updated public/infinity-bangladesh-data.json & docs/infinity-bangladesh-data.json');

  // 2. Generate src/data/initialData.ts
  const formatTs = (val: any) => JSON.stringify(val ?? {}, null, 2);

  const initialDataContent = `import {
  Campaign,
  Program,
  ImpactMetric,
  ImpactStory,
  NewsArticle,
  EventItem,
  GalleryPhoto,
  VideoItem,
  TransparencyReport,
  Partner,
  SiteSettings,
  VolunteerApplication,
  DonationRecord,
  Committee,
  Person,
  Position,
  CommitteeMember,
  HomepageConfig,
  AboutSettings,
  HeaderSettings,
  FooterSettings,
  SocialLink,
  VolunteerSettings,
  SupportSettings,
  ContactSettings,
  GlobalSEOSettings,
  NavigationItem,
  BannerItem,
  MediaItem,
  GalleryAlbum,
  AdminProfile,
  FAQItem,
  PressCoverage,
  ExecutiveTierBar,
  JourneyVideo,
  BloodDonor,
  EmergencyBloodRequest,
  BloodDonationSettings,
  DonorCategoryOption
} from '../types';
export {
  INITIAL_BLOOD_DONORS,
  INITIAL_EMERGENCY_REQUESTS,
  INITIAL_BLOOD_SETTINGS,
  DEFAULT_DONOR_CATEGORIES
} from './bloodDonationData';

export const DEFAULT_EXECUTIVE_TIER_BARS: ExecutiveTierBar[] = ${formatTs(data.settings?.executiveTierBars || [])};

export const INITIAL_SITE_SETTINGS: SiteSettings = ${formatTs(data.settings)};

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = ${formatTs(data.homepageConfig)};

export const INITIAL_ABOUT_SETTINGS: AboutSettings = ${formatTs(data.aboutSettings)};

export const INITIAL_HEADER_SETTINGS: HeaderSettings = ${formatTs(data.headerSettings)};

export const INITIAL_FOOTER_SETTINGS: FooterSettings = ${formatTs(data.footerSettings)};

export const INITIAL_SOCIAL_LINKS: SocialLink[] = ${formatTs(data.socialLinks || [])};

export const INITIAL_VOLUNTEER_SETTINGS: VolunteerSettings = ${formatTs(data.volunteerSettings)};

export const INITIAL_SUPPORT_SETTINGS: SupportSettings = ${formatTs(data.supportSettings)};

export const INITIAL_CONTACT_SETTINGS: ContactSettings = ${formatTs(data.contactSettings)};

export const INITIAL_SEO_SETTINGS: GlobalSEOSettings = ${formatTs(data.seoSettings)};

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = ${formatTs(data.navigationItems || [])};

export const INITIAL_BANNERS: BannerItem[] = ${formatTs(data.banners || [])};

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = ${formatTs(data.mediaLibrary || [])};

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = ${formatTs(data.galleryAlbums || [])};

export const INITIAL_PRESS_COVERAGE: PressCoverage[] = ${formatTs(data.pressCoverages || [])};

export const INITIAL_ADMIN_PROFILES: AdminProfile[] = ${formatTs(data.adminProfiles || [])};

export const INITIAL_CAMPAIGNS: Campaign[] = ${formatTs(data.campaigns || [])};

export const INITIAL_PROGRAMS: Program[] = ${formatTs(data.programs || [])};

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = ${formatTs(data.metrics || [])};

export const INITIAL_IMPACT_STORIES: ImpactStory[] = ${formatTs(data.stories || [])};

export const INITIAL_NEWS: NewsArticle[] = ${formatTs(data.news || [])};

export const INITIAL_EVENTS: EventItem[] = ${formatTs(data.events || [])};

export const INITIAL_GALLERY: GalleryPhoto[] = ${formatTs(data.gallery || [])};

export const INITIAL_VIDEOS: VideoItem[] = ${formatTs(data.videos || [])};

export const INITIAL_JOURNEY_VIDEOS: JourneyVideo[] = ${formatTs(data.journeyVideos || [])};

export const INITIAL_REPORTS: TransparencyReport[] = ${formatTs(data.reports || [])};

export const INITIAL_PARTNERS: Partner[] = ${formatTs(data.partners || [])};

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = ${formatTs(data.volunteers || [])};

export const INITIAL_DONATIONS: DonationRecord[] = ${formatTs(data.donations || [])};

export const INITIAL_FAQS: FAQItem[] = ${formatTs(data.faqs || [])};

export const INITIAL_COMMITTEES: Committee[] = ${formatTs(data.committees || [])};

export const INITIAL_PERSONS: Person[] = ${formatTs(data.persons || [])};

export const INITIAL_POSITIONS: Position[] = ${formatTs(data.positions || [])};

export const INITIAL_COMMITTEE_MEMBERS: CommitteeMember[] = ${formatTs(data.committeeMembers || [])};
`;

  fs.writeFileSync('src/data/initialData.ts', initialDataContent, 'utf8');
  console.log('✓ Generated updated src/data/initialData.ts');

  // 3. Push all CMS tables to Supabase
  console.log('☁️ Pushing all entities to Supabase Cloud Database...');

  // Site Settings
  if (data.settings) {
    const { error } = await supabase.from('site_settings').upsert({
      id: 'default',
      organization_name: data.settings.organizationName || 'Infinity Bangladesh',
      team_identity: data.settings.teamIdentity || 'Team Infinity',
      tagline: data.settings.tagline || 'United for Humanity',
      country: data.settings.country || 'Bangladesh',
      official_phone: data.settings.officialPhone || '+880 1839008339',
      official_email: data.settings.officialEmail || 'contact@infinitybangladesh.org',
      official_address: data.settings.officialAddress || 'Hathazari, Chattogram, Bangladesh',
      bkash_number: data.supportSettings?.bKashNumber || data.settings?.bKashNumber || '01839-008339',
      nagad_number: data.supportSettings?.nagadNumber || data.settings?.nagadNumber || '01839-008339',
      bank_details: data.settings.bankDetails || {},
      logo_url: data.settings.logoUrl || '/brand/infinity-logo.png',
      favicon_url: data.settings.faviconUrl || '/brand/infinity-logo.png',
      banner_announcement: data.settings.bannerAnnouncement?.bn || data.settings.bannerAnnouncement?.en || '',
      show_announcement_banner: Boolean(data.settings.showAnnouncementBanner),
      updated_at: new Date().toISOString()
    });
    if (error) console.warn('site_settings upsert error:', error.message);
    else console.log('✓ Synced site_settings to Supabase');
  }

  // Homepage Config
  if (data.homepageConfig) {
    const { error } = await supabase.from('homepage_config').upsert({
      id: 'default',
      hero: data.homepageConfig.hero,
      about_preview: data.homepageConfig.aboutPreview,
      volunteer_banner: data.homepageConfig.volunteerBanner,
      support_banner: data.homepageConfig.supportBanner,
      section_order: data.homepageConfig.sectionOrder,
      section_visibility: data.homepageConfig.sectionVisibility,
      updated_at: new Date().toISOString()
    });
    if (error) console.warn('homepage_config upsert error:', error.message);
    else console.log('✓ Synced homepage_config to Supabase');
  }

  // Persons
  if (Array.isArray(data.persons) && data.persons.length > 0) {
    for (const p of data.persons) {
      await supabase.from('persons').upsert({
        id: p.id,
        full_name: p.fullName || p.name,
        bangla_name: p.banglaName || p.name_bn,
        english_name: p.englishName || p.fullName,
        photo_url: p.photoUrl,
        photo_position: p.photoPosition,
        photo_zoom: p.photoZoom,
        short_bio: p.shortBio,
        full_bio: p.fullBio,
        district: p.district,
        facebook_url: p.facebookUrl,
        linkedin_url: p.linkedinUrl,
        email: p.email,
        phone: p.phone,
        joining_year: p.joiningYear,
        active: p.active ?? true,
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.persons.length} persons to Supabase`);
  }

  // Positions
  if (Array.isArray(data.positions) && data.positions.length > 0) {
    for (const pos of data.positions) {
      await supabase.from('positions').upsert({
        id: pos.id,
        name: pos.name,
        level: pos.level || 1,
        sort_order: pos.sortOrder || 1,
        description: pos.description,
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.positions.length} positions to Supabase`);
  }

  // Committees
  if (Array.isArray(data.committees) && data.committees.length > 0) {
    for (const c of data.committees) {
      await supabase.from('committees').upsert({
        id: c.id,
        slug: c.slug,
        name: c.name,
        type: c.type,
        year: c.year,
        description: c.description,
        status: c.status || 'ACTIVE',
        sort_order: c.sortOrder || 1,
        is_featured: c.isFeatured ?? true,
        banner_image_url: c.bannerImageUrl || '',
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.committees.length} committees to Supabase`);
  }

  // Committee Members
  if (Array.isArray(data.committeeMembers) && data.committeeMembers.length > 0) {
    for (const cm of data.committeeMembers) {
      await supabase.from('committee_members').upsert({
        id: cm.id,
        committee_id: cm.committeeId,
        person_id: cm.personId,
        position_id: cm.positionId,
        serial_number: cm.serialNumber,
        sort_order: cm.sortOrder || cm.serialNumber,
        is_featured_leader: cm.isFeaturedLeader ?? false,
        status: cm.status || 'ACTIVE',
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.committeeMembers.length} committee members to Supabase`);
  }

  // Campaigns
  if (Array.isArray(data.campaigns) && data.campaigns.length > 0) {
    for (const camp of data.campaigns) {
      await supabase.from('campaigns').upsert({
        id: camp.id,
        slug: camp.slug,
        title: camp.title,
        date: camp.date,
        location: camp.location,
        category: camp.category,
        description: camp.description,
        objectives: camp.objectives,
        activities: camp.activities,
        beneficiaries: camp.beneficiaries,
        impact: camp.impact,
        status: camp.status || 'active',
        is_featured: camp.isFeatured ?? false,
        image_url: camp.imageUrl,
        gallery_images: camp.galleryImages || [],
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.campaigns.length} campaigns to Supabase`);
  }

  // Programs
  if (Array.isArray(data.programs) && data.programs.length > 0) {
    for (const prog of data.programs) {
      await supabase.from('programs').upsert({
        id: prog.id,
        slug: prog.slug,
        title: prog.title,
        category: prog.category,
        short_description: prog.shortDescription,
        full_details: prog.fullDetails,
        impact_highlights: prog.impactHighlights,
        image_url: prog.imageUrl,
        icon_name: prog.iconName,
        status: prog.status || 'active',
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.programs.length} programs to Supabase`);
  }

  // Videos & Journey Videos
  if (Array.isArray(data.videos) && data.videos.length > 0) {
    for (const v of data.videos) {
      await supabase.from('videos').upsert({
        id: v.id,
        title: v.title,
        video_url: v.videoUrl,
        embed_url: v.embedUrl,
        thumbnail_url: v.thumbnailUrl,
        platform: v.platform,
        duration: v.duration,
        date: v.date,
        description: v.description,
        category: v.category,
        status: v.status || 'published',
        is_featured: v.isFeatured ?? false,
        aspect_ratio: v.aspectRatio || '16/9',
        is_shorts: v.isShorts ?? false,
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.videos.length} videos to Supabase`);
  }

  // Gallery Photos
  if (Array.isArray(data.gallery) && data.gallery.length > 0) {
    for (const g of data.gallery) {
      await supabase.from('gallery_photos').upsert({
        id: g.id,
        title: g.title,
        caption: g.caption,
        image_url: g.imageUrl,
        category: g.category,
        date: g.date,
        location: g.location,
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.gallery.length} gallery photos to Supabase`);
  }

  // News Articles
  if (Array.isArray(data.news) && data.news.length > 0) {
    for (const n of data.news) {
      await supabase.from('news_articles').upsert({
        id: n.id,
        slug: n.slug,
        title: n.title,
        excerpt: n.excerpt,
        content: n.content,
        category: n.category,
        author: n.author,
        date: n.date,
        image_url: n.imageUrl,
        tags: n.tags || [],
        status: n.status || 'published',
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.news.length} news articles to Supabase`);
  }

  // Impact Metrics
  if (Array.isArray(data.metrics) && data.metrics.length > 0) {
    for (const m of data.metrics) {
      await supabase.from('impact_metrics').upsert({
        id: m.id,
        label: m.label,
        value: m.value,
        description: m.description,
        icon_name: m.iconName,
        sort_order: m.order || 1,
        updated_at: new Date().toISOString()
      });
    }
    console.log(`✓ Synced ${data.metrics.length} metrics to Supabase`);
  }

  // Bump Data Version in DataContext.tsx
  const dataContextPath = 'src/context/DataContext.tsx';
  let dc = fs.readFileSync(dataContextPath, 'utf8');
  const newVer = `2026.08.27.${Date.now()}`;
  dc = dc.replace(/const CURRENT_DATA_VERSION = '[^']+';/, `const CURRENT_DATA_VERSION = '${newVer}';`);
  fs.writeFileSync(dataContextPath, dc, 'utf8');
  console.log(`✓ DataContext data version bumped to: ${newVer}`);

  console.log('🎉 Full Sync & Integration Completed Successfully!');
}

runFullSync().catch(console.error);
