import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://pzpnphgnexfaxxaorqsq.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Vqapvc2C91UpllwvFevK9w_OJPdTi3V';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function processJsonSync(data: any) {
  console.log('🚀 Processing & Syncing incoming JSON data...');

  // Save to incoming_user_data.json
  fs.writeFileSync('scripts/incoming_user_data.json', JSON.stringify(data, null, 2), 'utf8');

  // 1. Sync public & docs JSON
  fs.writeFileSync('public/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
  if (fs.existsSync('docs')) {
    fs.writeFileSync('docs/infinity-bangladesh-data.json', JSON.stringify(data, null, 2), 'utf8');
  }
  console.log('✓ Updated public/infinity-bangladesh-data.json & docs/infinity-bangladesh-data.json');

  // 2. Update bloodDonationData.ts with new bloodDonors, emergencyBloodRequests, bloodDonationSettings, donorCategories
  let bloodDataFile = fs.readFileSync('src/data/bloodDonationData.ts', 'utf8');
  
  if (data.bloodDonationSettings) {
    const bloodSettingsStr = `export const INITIAL_BLOOD_SETTINGS: BloodDonationSettings = ${JSON.stringify(data.bloodDonationSettings, null, 2)};`;
    bloodDataFile = bloodDataFile.replace(/export const INITIAL_BLOOD_SETTINGS: BloodDonationSettings = [\s\S]*?;\n\n\/\*\*/, `${bloodSettingsStr}\n\n/**`);
  }

  if (Array.isArray(data.donorCategories) && data.donorCategories.length > 0) {
    const donorCatStr = `export const DEFAULT_DONOR_CATEGORIES: DonorCategoryOption[] = ${JSON.stringify(data.donorCategories, null, 2)};`;
    bloodDataFile = bloodDataFile.replace(/export const DEFAULT_DONOR_CATEGORIES: DonorCategoryOption\[\] = [\s\S]*?;\n\nexport const INITIAL_BLOOD_SETTINGS/, `${donorCatStr}\n\nexport const INITIAL_BLOOD_SETTINGS`);
  }

  if (Array.isArray(data.bloodDonors)) {
    const donorsStr = `export const INITIAL_BLOOD_DONORS: BloodDonor[] = ${JSON.stringify(data.bloodDonors, null, 2)};`;
    bloodDataFile = bloodDataFile.replace(/export const INITIAL_BLOOD_DONORS: BloodDonor\[\] = [\s\S]*?;\n\n\/\*\*/, `${donorsStr}\n\n/**`);
  }

  if (Array.isArray(data.emergencyBloodRequests)) {
    const reqsStr = `export const INITIAL_EMERGENCY_REQUESTS: EmergencyBloodRequest[] = ${JSON.stringify(data.emergencyBloodRequests, null, 2)};\n`;
    bloodDataFile = bloodDataFile.replace(/export const INITIAL_EMERGENCY_REQUESTS: EmergencyBloodRequest\[\] = [\s\S]*?;\n*$/, `${reqsStr}`);
  }

  fs.writeFileSync('src/data/bloodDonationData.ts', bloodDataFile, 'utf8');
  console.log('✓ Updated src/data/bloodDonationData.ts');

  // 3. Generate initialData.ts
  const formatTs = (val: any) => JSON.stringify(val ?? {}, null, 2);

  const initialDataContent = `import {
  Campaign,
  Program,
  ProgramEvent,
  EventMedia,
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

export const INITIAL_PROGRAM_EVENTS: ProgramEvent[] = ${formatTs(data.programEvents || [])};

export const INITIAL_EVENT_MEDIA: EventMedia[] = ${formatTs(data.eventMediaList || [])};

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

  // 4. Bump Data Version in DataContext.tsx
  const dataContextPath = 'src/context/DataContext.tsx';
  let dc = fs.readFileSync(dataContextPath, 'utf8');
  const newVer = `2026.08.29.${Date.now()}`;
  dc = dc.replace(/const CURRENT_DATA_VERSION = '[^']+';/, `const CURRENT_DATA_VERSION = '${newVer}';`);
  fs.writeFileSync(dataContextPath, dc, 'utf8');
  console.log(`✓ DataContext data version bumped to: ${newVer}`);

  // 5. Push to Supabase
  try {
    console.log('☁️ Pushing updated entities to Supabase...');
    if (data.settings) {
      await supabase.from('site_settings').upsert({
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
    }

    if (Array.isArray(data.bloodDonors)) {
      for (const donor of data.bloodDonors) {
        await supabase.from('blood_donors').upsert({
          id: donor.id,
          full_name: donor.fullName,
          blood_group: donor.bloodGroup,
          gender: donor.gender,
          phone: donor.phone,
          email: donor.email,
          photo_url: donor.photoUrl,
          district: donor.district,
          upazila: donor.upazila,
          area: donor.area,
          detailed_address: donor.detailedAddress,
          org_category: donor.orgCategory,
          availability_status: donor.availabilityStatus,
          last_donation_date: donor.lastDonationDate,
          total_donations: donor.totalDonations,
          privacy_consent: donor.privacyConsent,
          show_phone_publicly: donor.showPhonePublicly,
          approval_status: donor.approvalStatus,
          is_verified: donor.isVerified,
          donation_history: donor.donationHistory || [],
          updated_at: new Date().toISOString()
        });
      }
      console.log(`✓ Synced ${data.bloodDonors.length} blood donors to Supabase`);
    }

    if (Array.isArray(data.emergencyBloodRequests)) {
      for (const req of data.emergencyBloodRequests) {
        await supabase.from('emergency_blood_requests').upsert({
          id: req.id,
          requester_name: req.requesterName,
          contact_number: req.contactNumber,
          patient_name: req.patientName,
          blood_group: req.bloodGroup,
          units_needed: req.unitsNeeded,
          hospital_name: req.hospitalName,
          district: req.district,
          upazila: req.upazila,
          emergency_level: req.emergencyLevel,
          required_date: req.requiredDate,
          additional_notes: req.additionalNotes,
          status: req.status,
          matched_donor_ids: req.matchedDonorIds || [],
          updated_at: new Date().toISOString()
        });
      }
      console.log(`✓ Synced ${data.emergencyBloodRequests.length} emergency requests to Supabase`);
    }
  } catch (err) {
    console.warn('Supabase sync warning:', err);
  }

  console.log('🎉 Full Import & Sync Complete!');
}
