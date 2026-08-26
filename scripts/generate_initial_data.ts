import fs from 'fs';

const raw = fs.readFileSync('scripts/incoming_user_data.json', 'utf8');
const data = JSON.parse(raw);

// Sync public and docs JSON files
fs.writeFileSync('public/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync('docs/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');

const formatTsObj = (val: any, indent = 0) => {
  return JSON.stringify(val, null, 2);
};

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

export const INITIAL_SOCIAL_LINKS: SocialLink[] = ${formatTsObj(data.socialLinks)};

export const INITIAL_VOLUNTEER_SETTINGS: VolunteerSettings = ${formatTsObj(data.volunteerSettings)};

export const INITIAL_SUPPORT_SETTINGS: SupportSettings = ${formatTsObj(data.supportSettings)};

export const INITIAL_CONTACT_SETTINGS: ContactSettings = ${formatTsObj(data.contactSettings)};

export const INITIAL_SEO_SETTINGS: GlobalSEOSettings = ${formatTsObj(data.seoSettings)};

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = ${formatTsObj(data.navigationItems)};

export const INITIAL_BANNERS: BannerItem[] = ${formatTsObj(data.banners)};

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = ${formatTsObj(data.mediaLibrary)};

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = ${formatTsObj(data.galleryAlbums)};

export const INITIAL_PRESS_COVERAGE: PressCoverage[] = ${formatTsObj(data.pressCoverages || [])};

export const INITIAL_ADMIN_PROFILES: AdminProfile[] = ${formatTsObj(data.adminProfiles)};

export const INITIAL_CAMPAIGNS: Campaign[] = ${formatTsObj(data.campaigns)};

export const INITIAL_PROGRAMS: Program[] = ${formatTsObj(data.programs)};

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = ${formatTsObj(data.metrics)};

export const INITIAL_IMPACT_STORIES: ImpactStory[] = ${formatTsObj(data.stories)};

export const INITIAL_NEWS: NewsArticle[] = ${formatTsObj(data.news)};

export const INITIAL_EVENTS: EventItem[] = ${formatTsObj(data.events)};

export const INITIAL_GALLERY: GalleryPhoto[] = ${formatTsObj(data.gallery)};

export const INITIAL_VIDEOS: VideoItem[] = ${formatTsObj(data.videos)};

export const INITIAL_REPORTS: TransparencyReport[] = ${formatTsObj(data.reports)};

export const INITIAL_PARTNERS: Partner[] = ${formatTsObj(data.partners)};

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = ${formatTsObj(data.volunteers)};

export const INITIAL_DONATIONS: DonationRecord[] = ${formatTsObj(data.donations)};

export const INITIAL_FAQS: FAQItem[] = ${formatTsObj(data.faqs || [])};

export const INITIAL_COMMITTEES: Committee[] = ${formatTsObj(data.committees)};

export const INITIAL_PERSONS: Person[] = ${formatTsObj(data.persons)};

export const INITIAL_POSITIONS: Position[] = ${formatTsObj(data.positions)};

export const INITIAL_COMMITTEE_MEMBERS: CommitteeMember[] = ${formatTsObj(data.committeeMembers)};
`;

fs.writeFileSync('src/data/initialData.ts', tsContent, 'utf8');
console.log('✓ Successfully generated src/data/initialData.ts from incoming JSON!');
