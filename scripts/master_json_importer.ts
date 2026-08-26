import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

export async function importMasterJson(jsonPathOrObject: string | any) {
  let data: any;
  if (typeof jsonPathOrObject === 'string') {
    if (fs.existsSync(jsonPathOrObject)) {
      data = JSON.parse(fs.readFileSync(jsonPathOrObject, 'utf8'));
    } else {
      data = JSON.parse(jsonPathOrObject);
    }
  } else {
    data = jsonPathOrObject;
  }

  // 1. Sync public & docs JSON files
  fs.writeFileSync('public/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
  fs.writeFileSync('docs/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');

  // 2. Generate TypeScript initialData.ts
  const formatTsObj = (val: any) => JSON.stringify(val ?? {}, null, 2);

  const tsContent = `import {
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
  PressCoverage
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = ${formatTsObj(data.settings)};

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = ${formatTsObj(data.homepageConfig)};

export const INITIAL_ABOUT_SETTINGS: AboutSettings = ${formatTsObj(data.aboutSettings)};

export const INITIAL_HEADER_SETTINGS: HeaderSettings = ${formatTsObj(data.headerSettings)};

export const INITIAL_FOOTER_SETTINGS: FooterSettings = ${formatTsObj(data.footerSettings)};

export const INITIAL_SOCIAL_LINKS: SocialLink[] = ${formatTsObj(data.socialLinks || [])};

export const INITIAL_VOLUNTEER_SETTINGS: VolunteerSettings = ${formatTsObj(data.volunteerSettings)};

export const INITIAL_SUPPORT_SETTINGS: SupportSettings = ${formatTsObj(data.supportSettings)};

export const INITIAL_CONTACT_SETTINGS: ContactSettings = ${formatTsObj(data.contactSettings)};

export const INITIAL_SEO_SETTINGS: GlobalSEOSettings = ${formatTsObj(data.seoSettings)};

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = ${formatTsObj(data.navigationItems || [])};

export const INITIAL_BANNERS: BannerItem[] = ${formatTsObj(data.banners || [])};

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = ${formatTsObj(data.mediaLibrary || [])};

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = ${formatTsObj(data.galleryAlbums || [])};

export const INITIAL_PRESS_COVERAGE: PressCoverage[] = ${formatTsObj(data.pressCoverages || [])};

export const INITIAL_ADMIN_PROFILES: AdminProfile[] = ${formatTsObj(data.adminProfiles || [])};

export const INITIAL_CAMPAIGNS: Campaign[] = ${formatTsObj(data.campaigns || [])};

export const INITIAL_PROGRAMS: Program[] = ${formatTsObj(data.programs || [])};

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = ${formatTsObj(data.metrics || [])};

export const INITIAL_IMPACT_STORIES: ImpactStory[] = ${formatTsObj(data.stories || [])};

export const INITIAL_NEWS: NewsArticle[] = ${formatTsObj(data.news || [])};

export const INITIAL_EVENTS: EventItem[] = ${formatTsObj(data.events || [])};

export const INITIAL_GALLERY: GalleryPhoto[] = ${formatTsObj(data.gallery || [])};

export const INITIAL_VIDEOS: VideoItem[] = ${formatTsObj(data.videos || [])};

export const INITIAL_REPORTS: TransparencyReport[] = ${formatTsObj(data.reports || [])};

export const INITIAL_PARTNERS: Partner[] = ${formatTsObj(data.partners || [])};

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = ${formatTsObj(data.volunteers || [])};

export const INITIAL_DONATIONS: DonationRecord[] = ${formatTsObj(data.donations || [])};

export const INITIAL_FAQS: FAQItem[] = ${formatTsObj(data.faqs || [])};

export const INITIAL_COMMITTEES: Committee[] = ${formatTsObj(data.committees || [])};

export const INITIAL_PERSONS: Person[] = ${formatTsObj(data.persons || [])};

export const INITIAL_POSITIONS: Position[] = ${formatTsObj(data.positions || [])};

export const INITIAL_COMMITTEE_MEMBERS: CommitteeMember[] = ${formatTsObj(data.committeeMembers || [])};
`;

  fs.writeFileSync('src/data/initialData.ts', tsContent, 'utf8');
  console.log('✓ Master JSON Importer: Generated src/data/initialData.ts!');

  // 3. Sync critical settings to Supabase
  try {
    const supabaseUrl = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
    const supabaseAnonKey = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    if (data.settings) {
      await supabase.from('site_settings').upsert({
        id: 'default',
        organization_name: data.settings.organizationName || 'Infinity Bangladesh',
        team_identity: data.settings.teamIdentity || 'Team Infinity',
        tagline: data.settings.tagline || 'United for Humanity',
        official_phone: data.settings.officialPhone || '+880 1839008339',
        official_email: data.settings.officialEmail || 'contact@infinitybangladesh.org',
        official_address: data.settings.officialAddress || 'Hathazari, Chattogram, Bangladesh',
        bkash_number: data.supportSettings?.bKashNumber || data.settings?.bKashNumber || '01839-008339',
        nagad_number: data.supportSettings?.nagadNumber || data.settings?.nagadNumber || '01839-008339',
        updated_at: new Date().toISOString()
      });
      console.log('✓ Master JSON Importer: Synced site_settings to Supabase!');
    }
  } catch (err) {
    console.error('Supabase sync warning:', err);
  }

  // 4. Auto bump version in DataContext.tsx
  const dataContextPath = 'src/context/DataContext.tsx';
  let dc = fs.readFileSync(dataContextPath, 'utf8');
  const newVer = `2026.08.26.${Date.now()}`;
  dc = dc.replace(/const CURRENT_DATA_VERSION = '[^']+';/, `const CURRENT_DATA_VERSION = '${newVer}';`);
  fs.writeFileSync(dataContextPath, dc, 'utf8');
  console.log(`✓ Master JSON Importer: Bumped CURRENT_DATA_VERSION to ${newVer}!`);
}

if (process.argv[1].endsWith('master_json_importer.ts')) {
  const filePath = process.argv[2] || 'scripts/incoming_user_data.json';
  importMasterJson(filePath).catch(console.error);
}
