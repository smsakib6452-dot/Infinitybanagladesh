import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
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
  VolunteerApplication,
  DonationRecord,
  ContactMessage,
  SiteSettings,
  AuditLog,
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
import {
  INITIAL_CAMPAIGNS,
  INITIAL_PROGRAMS,
  INITIAL_IMPACT_METRICS,
  INITIAL_IMPACT_STORIES,
  INITIAL_NEWS,
  INITIAL_EVENTS,
  INITIAL_GALLERY,
  INITIAL_VIDEOS,
  INITIAL_REPORTS,
  INITIAL_PARTNERS,
  INITIAL_SITE_SETTINGS,
  INITIAL_VOLUNTEER_APPLICATIONS,
  INITIAL_DONATIONS,
  INITIAL_POSITIONS,
  INITIAL_COMMITTEES,
  INITIAL_PERSONS,
  INITIAL_COMMITTEE_MEMBERS,
  INITIAL_HOMEPAGE_CONFIG,
  INITIAL_ABOUT_SETTINGS,
  INITIAL_HEADER_SETTINGS,
  INITIAL_FOOTER_SETTINGS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_VOLUNTEER_SETTINGS,
  INITIAL_SUPPORT_SETTINGS,
  INITIAL_CONTACT_SETTINGS,
  INITIAL_SEO_SETTINGS,
  INITIAL_NAVIGATION_ITEMS,
  INITIAL_BANNERS,
  INITIAL_MEDIA_LIBRARY,
  INITIAL_GALLERY_ALBUMS,
  INITIAL_ADMIN_PROFILES,
  INITIAL_FAQS,
  INITIAL_PRESS_COVERAGE
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { getFreshImageUrl } from '../lib/cloudinary';
import { detectAndNormalizeMedia, DEFAULT_VIDEO_THUMBNAIL } from '../lib/utils/mediaHelper';

interface DataContextType {
  // Entities
  campaigns: Campaign[];
  programs: Program[];
  metrics: ImpactMetric[];
  stories: ImpactStory[];
  news: NewsArticle[];
  events: EventItem[];
  gallery: GalleryPhoto[];
  videos: VideoItem[];
  reports: TransparencyReport[];
  partners: Partner[];
  volunteers: VolunteerApplication[];
  donations: DonationRecord[];
  messages: ContactMessage[];
  faqs: FAQItem[];
  settings: SiteSettings;
  homepageConfig: HomepageConfig;
  aboutSettings: AboutSettings;
  headerSettings: HeaderSettings;
  footerSettings: FooterSettings;
  socialLinks: SocialLink[];
  volunteerSettings: VolunteerSettings;
  supportSettings: SupportSettings;
  contactSettings: ContactSettings;
  seoSettings: GlobalSEOSettings;
  navigationItems: NavigationItem[];
  banners: BannerItem[];
  mediaLibrary: MediaItem[];
  galleryAlbums: GalleryAlbum[];
  pressCoverages: PressCoverage[];
  adminProfiles: AdminProfile[];
  auditLogs: AuditLog[];
  committees: Committee[];
  persons: Person[];
  positions: Position[];
  committeeMembers: CommitteeMember[];

  // System & Connection State
  isLiveSupabase: boolean;
  isSyncing: boolean;
  lastSyncedAt: Date | null;
  previewMode: boolean;

  // Mutations: Homepage & Global CMS Settings
  updateHomepageConfig: (newConfig: Partial<HomepageConfig>) => void;
  updateAboutSettings: (newSettings: Partial<AboutSettings>) => void;
  updateHeaderSettings: (newSettings: Partial<HeaderSettings>) => void;
  updateFooterSettings: (newSettings: Partial<FooterSettings>) => void;
  updateVolunteerSettings: (newSettings: Partial<VolunteerSettings>) => void;
  updateSupportSettings: (newSettings: Partial<SupportSettings>) => void;
  updateContactSettings: (newSettings: Partial<ContactSettings>) => void;
  updateSEOSettings: (newSettings: Partial<GlobalSEOSettings>) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // FAQs
  addFAQ: (faq: Omit<FAQItem, 'id'>) => FAQItem;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Contact Messages
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => ContactMessage;

  // Social Links
  addSocialLink: (link: Omit<SocialLink, 'id'>) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;

  // Navigation
  addNavigationItem: (item: Omit<NavigationItem, 'id'>) => void;
  updateNavigationItem: (id: string, item: Partial<NavigationItem>) => void;
  deleteNavigationItem: (id: string) => void;
  reorderNavigationItems: (items: NavigationItem[]) => void;

  // Banners
  addBanner: (banner: Omit<BannerItem, 'id'>) => void;
  updateBanner: (id: string, banner: Partial<BannerItem>) => void;
  deleteBanner: (id: string) => void;

  // Media Library & Albums
  addMediaItem: (media: Omit<MediaItem, 'id' | 'uploadedAt'>) => MediaItem;
  updateMediaItem: (id: string, media: Partial<MediaItem>) => void;
  deleteMediaItem: (id: string) => void;
  addGalleryAlbum: (album: Omit<GalleryAlbum, 'id'>) => GalleryAlbum;
  updateGalleryAlbum: (id: string, album: Partial<GalleryAlbum>) => void;
  deleteGalleryAlbum: (id: string) => void;
  setAlbumPhotos: (albumId: string, photoIds: string[]) => void;

  // Press & Media Coverage
  addPressCoverage: (press: Omit<PressCoverage, 'id'>) => PressCoverage;
  updatePressCoverage: (id: string, press: Partial<PressCoverage>) => void;
  deletePressCoverage: (id: string) => void;

  // Core Programs & Campaigns
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Campaign;
  updateCampaign: (id: string, campaign: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;

  addProgram: (program: Omit<Program, 'id'>) => Program;
  updateProgram: (id: string, program: Partial<Program>) => void;
  deleteProgram: (id: string) => void;

  addMetric: (metric: Omit<ImpactMetric, 'id'>) => ImpactMetric;
  updateMetric: (id: string, metric: Partial<ImpactMetric>) => void;
  deleteMetric: (id: string) => void;

  addStory: (story: Omit<ImpactStory, 'id'>) => ImpactStory;
  updateStory: (id: string, story: Partial<ImpactStory>) => void;
  deleteStory: (id: string) => void;

  addNews: (newsItem: Omit<NewsArticle, 'id'>) => NewsArticle;
  updateNews: (id: string, newsItem: Partial<NewsArticle>) => void;
  deleteNews: (id: string) => void;

  addEvent: (eventItem: Omit<EventItem, 'id'>) => EventItem;
  updateEvent: (id: string, eventItem: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => GalleryPhoto;
  updateGalleryPhoto: (id: string, photo: Partial<GalleryPhoto>) => void;
  deleteGalleryPhoto: (id: string) => void;

  addVideo: (video: Omit<VideoItem, 'id'>) => VideoItem;
  updateVideo: (id: string, video: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;

  addReport: (report: Omit<TransparencyReport, 'id'>) => TransparencyReport;
  updateReport: (id: string, report: Partial<TransparencyReport>) => void;
  deleteReport: (id: string) => void;

  addPartner: (partner: Omit<Partner, 'id'>) => Partner;
  updatePartner: (id: string, partner: Partial<Partner>) => void;
  deletePartner: (id: string) => void;

  // Interactions: Volunteers, Donations, Messages
  submitVolunteerApplication: (app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => string;
  addVolunteerApplication: (app: Partial<VolunteerApplication>) => string;
  updateVolunteerStatus: (id: string, status: VolunteerApplication['status'], adminNotes?: string) => void;
  deleteVolunteerApplication: (id: string) => void;

  submitDonation: (donation: Omit<DonationRecord, 'id' | 'date' | 'status'>) => string;
  addDonationRecord: (donation: Partial<DonationRecord>) => DonationRecord;
  updateDonationStatus: (id: string, status: DonationRecord['status']) => void;

  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContactMessage: (id: string) => void;

  // Admin Profiles & Roles
  addAdminProfile: (profile: Omit<AdminProfile, 'id'>) => AdminProfile;
  updateAdminProfile: (id: string, profile: Partial<AdminProfile>) => void;
  deleteAdminProfile: (id: string) => void;

  // Committee & Leadership Mutations
  addCommittee: (committee: Omit<Committee, 'id'>) => Committee;
  updateCommittee: (id: string, committee: Partial<Committee>) => void;
  deleteCommittee: (id: string) => void;
  archiveCommittee: (id: string) => void;
  setActiveCommittee: (id: string) => void;

  addPerson: (person: Omit<Person, 'id'>) => Person;
  updatePerson: (id: string, person: Partial<Person>) => void;
  deletePerson: (id: string) => void;

  addPosition: (pos: Omit<Position, 'id'>) => Position;
  updatePosition: (id: string, pos: Partial<Position>) => void;
  deletePosition: (id: string) => void;

  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => CommitteeMember;
  updateCommitteeMember: (id: string, member: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;
  reorderCommitteeMembers: (committeeId: string, orderedMemberIds: string[]) => void;
  getMembersWithDetails: (committeeId?: string) => (CommitteeMember & { person: Person; position: Position; committee?: Committee })[];

  // Global System Controls
  setPreviewMode: (enabled: boolean) => void;
  syncWithSupabase: () => Promise<void>;
  pushAllToSupabase: () => Promise<{ success: boolean; message: string }>;
  resetToDefaultData: () => void;
  exportDatabaseJSON: () => string;
  importDatabaseJSON: (jsonStr: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_PREFIX = 'infinity_bd_v2_';

function getStoredOrDefault<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return saved ? JSON.parse(saved) : fallback;
  } catch (err) {
    console.error(`Error loading key ${key} from storage:`, err);
    return fallback;
  }
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Deleted IDs tracker to prevent resurrection across page reloads & sync
  const deletedIdsRef = useRef<Set<string>>(new Set(getStoredOrDefault<string[]>('deleted_video_ids', [])));

  // 1. Site Settings & Global Configurations
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredOrDefault('settings', INITIAL_SITE_SETTINGS));
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => {
    const stored = getStoredOrDefault<HomepageConfig>('homepageConfig', INITIAL_HOMEPAGE_CONFIG);
    if (
      stored?.hero?.eyebrow?.en === 'TEAM INFINITY — UNITED FOR HUMANITY' ||
      stored?.hero?.eyebrow?.bn === 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' ||
      stored?.hero?.eyebrow?.bn === 'টিম ইনফিনিটি — ইউনাইটেড ফর হিউম্যানিটি'
    ) {
      stored.hero.eyebrow = INITIAL_HOMEPAGE_CONFIG.hero.eyebrow;
    }
    return stored;
  });
  const [aboutSettings, setAboutSettings] = useState<AboutSettings>(() => getStoredOrDefault('aboutSettings', INITIAL_ABOUT_SETTINGS));
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>(() => {
    const stored = getStoredOrDefault<HeaderSettings>('headerSettings', INITIAL_HEADER_SETTINGS);
    if (
      stored?.noticeBarText?.en?.includes('Team Infinity | United for Humanity') ||
      stored?.noticeBarText?.bn?.includes('টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ')
    ) {
      stored.noticeBarText = INITIAL_HEADER_SETTINGS.noticeBarText;
    }
    return stored;
  });
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => getStoredOrDefault('footerSettings', INITIAL_FOOTER_SETTINGS));
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => getStoredOrDefault('socialLinks', INITIAL_SOCIAL_LINKS));
  const [volunteerSettings, setVolunteerSettings] = useState<VolunteerSettings>(() => getStoredOrDefault('volunteerSettings', INITIAL_VOLUNTEER_SETTINGS));
  const [supportSettings, setSupportSettings] = useState<SupportSettings>(() => getStoredOrDefault('supportSettings', INITIAL_SUPPORT_SETTINGS));
  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => getStoredOrDefault('contactSettings', INITIAL_CONTACT_SETTINGS));
  const [seoSettings, setSeoSettings] = useState<GlobalSEOSettings>(() => getStoredOrDefault('seoSettings', INITIAL_SEO_SETTINGS));
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(() => getStoredOrDefault('navigationItems', INITIAL_NAVIGATION_ITEMS));
  const [banners, setBanners] = useState<BannerItem[]>(() => getStoredOrDefault('banners', INITIAL_BANNERS));
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => {
    const stored = getStoredOrDefault<MediaItem[]>('mediaLibrary', INITIAL_MEDIA_LIBRARY);
    const deletedSet = new Set(getStoredOrDefault<string[]>('deleted_video_ids', []));
    return stored.filter(m => m.id !== 'vid-1' && !deletedSet.has(m.id) && !(m.url && m.url.includes('dQw4w9WgXcQ')));
  });
  const [galleryAlbums, setGalleryAlbums] = useState<GalleryAlbum[]>(() => getStoredOrDefault('galleryAlbums', INITIAL_GALLERY_ALBUMS));
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>(() => getStoredOrDefault('adminProfiles', INITIAL_ADMIN_PROFILES));

  // 2. Core Entities
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => getStoredOrDefault('campaigns', INITIAL_CAMPAIGNS));
  const [programs, setPrograms] = useState<Program[]>(() => getStoredOrDefault('programs', INITIAL_PROGRAMS));
  const [metrics, setMetrics] = useState<ImpactMetric[]>(() => getStoredOrDefault('metrics', INITIAL_IMPACT_METRICS));
  const [stories, setStories] = useState<ImpactStory[]>(() => getStoredOrDefault('stories', INITIAL_IMPACT_STORIES));
  const [news, setNews] = useState<NewsArticle[]>(() => getStoredOrDefault('news', INITIAL_NEWS));
  const [events, setEvents] = useState<EventItem[]>(() => getStoredOrDefault('events', INITIAL_EVENTS));
  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => getStoredOrDefault('gallery', INITIAL_GALLERY));
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const stored = getStoredOrDefault<VideoItem[]>('videos', INITIAL_VIDEOS);
    const deletedSet = new Set(getStoredOrDefault<string[]>('deleted_video_ids', []));
    return stored.filter(v => v.id !== 'vid-1' && !deletedSet.has(v.id) && !(v.videoUrl && v.videoUrl.includes('dQw4w9WgXcQ')));
  });
  const [reports, setReports] = useState<TransparencyReport[]>(() => getStoredOrDefault('reports', INITIAL_REPORTS));
  const [pressCoverages, setPressCoverages] = useState<PressCoverage[]>(() => getStoredOrDefault('pressCoverages', INITIAL_PRESS_COVERAGE));
  const [partners, setPartners] = useState<Partner[]>(() => getStoredOrDefault('partners', INITIAL_PARTNERS));
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(() => getStoredOrDefault('volunteers', INITIAL_VOLUNTEER_APPLICATIONS));
  const [donations, setDonations] = useState<DonationRecord[]>(() => getStoredOrDefault('donations', INITIAL_DONATIONS));
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStoredOrDefault('messages', []));
  const [faqs, setFaqs] = useState<FAQItem[]>(() => getStoredOrDefault('faqs', INITIAL_FAQS));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => getStoredOrDefault('auditLogs', []));

  // 3. Committees & Leadership
  const [committees, setCommittees] = useState<Committee[]>(() => getStoredOrDefault('committees', INITIAL_COMMITTEES));
  const [persons, setPersons] = useState<Person[]>(() => getStoredOrDefault('persons', INITIAL_PERSONS));
  const [positions, setPositions] = useState<Position[]>(() => getStoredOrDefault('positions', INITIAL_POSITIONS));
  const [committeeMembers, setCommitteeMembers] = useState<CommitteeMember[]>(() => getStoredOrDefault('committeeMembers', INITIAL_COMMITTEE_MEMBERS));

  // Local storage auto-sync
  useEffect(() => {
    localStorage.setItem(`${STORAGE_PREFIX}settings`, JSON.stringify(settings));
    localStorage.setItem(`${STORAGE_PREFIX}homepageConfig`, JSON.stringify(homepageConfig));
    localStorage.setItem(`${STORAGE_PREFIX}aboutSettings`, JSON.stringify(aboutSettings));
    localStorage.setItem(`${STORAGE_PREFIX}headerSettings`, JSON.stringify(headerSettings));
    localStorage.setItem(`${STORAGE_PREFIX}footerSettings`, JSON.stringify(footerSettings));
    localStorage.setItem(`${STORAGE_PREFIX}socialLinks`, JSON.stringify(socialLinks));
    localStorage.setItem(`${STORAGE_PREFIX}volunteerSettings`, JSON.stringify(volunteerSettings));
    localStorage.setItem(`${STORAGE_PREFIX}supportSettings`, JSON.stringify(supportSettings));
    localStorage.setItem(`${STORAGE_PREFIX}contactSettings`, JSON.stringify(contactSettings));
    localStorage.setItem(`${STORAGE_PREFIX}seoSettings`, JSON.stringify(seoSettings));
    localStorage.setItem(`${STORAGE_PREFIX}navigationItems`, JSON.stringify(navigationItems));
    localStorage.setItem(`${STORAGE_PREFIX}banners`, JSON.stringify(banners));
    localStorage.setItem(`${STORAGE_PREFIX}mediaLibrary`, JSON.stringify(mediaLibrary));
    localStorage.setItem(`${STORAGE_PREFIX}galleryAlbums`, JSON.stringify(galleryAlbums));
    localStorage.setItem(`${STORAGE_PREFIX}pressCoverages`, JSON.stringify(pressCoverages));
    localStorage.setItem(`${STORAGE_PREFIX}adminProfiles`, JSON.stringify(adminProfiles));
    localStorage.setItem(`${STORAGE_PREFIX}campaigns`, JSON.stringify(campaigns));
    localStorage.setItem(`${STORAGE_PREFIX}programs`, JSON.stringify(programs));
    localStorage.setItem(`${STORAGE_PREFIX}metrics`, JSON.stringify(metrics));
    localStorage.setItem(`${STORAGE_PREFIX}stories`, JSON.stringify(stories));
    localStorage.setItem(`${STORAGE_PREFIX}news`, JSON.stringify(news));
    localStorage.setItem(`${STORAGE_PREFIX}events`, JSON.stringify(events));
    localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(gallery));
    localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(videos));
    localStorage.setItem(`${STORAGE_PREFIX}reports`, JSON.stringify(reports));
    localStorage.setItem(`${STORAGE_PREFIX}partners`, JSON.stringify(partners));
    localStorage.setItem(`${STORAGE_PREFIX}volunteers`, JSON.stringify(volunteers));
    localStorage.setItem(`${STORAGE_PREFIX}donations`, JSON.stringify(donations));
    localStorage.setItem(`${STORAGE_PREFIX}messages`, JSON.stringify(messages));
    localStorage.setItem(`${STORAGE_PREFIX}faqs`, JSON.stringify(faqs));
    localStorage.setItem(`${STORAGE_PREFIX}auditLogs`, JSON.stringify(auditLogs));
    localStorage.setItem(`${STORAGE_PREFIX}committees`, JSON.stringify(committees));
    localStorage.setItem(`${STORAGE_PREFIX}persons`, JSON.stringify(persons));
    localStorage.setItem(`${STORAGE_PREFIX}positions`, JSON.stringify(positions));
    localStorage.setItem(`${STORAGE_PREFIX}committeeMembers`, JSON.stringify(committeeMembers));
  }, [
    settings, homepageConfig, aboutSettings, headerSettings, footerSettings,
    socialLinks, volunteerSettings, supportSettings, contactSettings, seoSettings,
    navigationItems, banners, mediaLibrary, galleryAlbums, pressCoverages, adminProfiles,
    campaigns, programs, metrics, stories, news, events, gallery, videos,
    reports, partners, volunteers, donations, messages, faqs, auditLogs,
    committees, persons, positions, committeeMembers
  ]);

  // Multi-tab cross-storage auto synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key || !e.newValue || !e.key.startsWith(STORAGE_PREFIX)) return;
      try {
        const entityKey = e.key.replace(STORAGE_PREFIX, '');
        const parsed = JSON.parse(e.newValue);
        if (entityKey === 'videos' && Array.isArray(parsed)) {
          setVideos(parsed);
        } else if (entityKey === 'campaigns' && Array.isArray(parsed)) {
          setCampaigns(parsed);
        } else if (entityKey === 'programs' && Array.isArray(parsed)) {
          setPrograms(parsed);
        } else if (entityKey === 'mediaLibrary' && Array.isArray(parsed)) {
          setMediaLibrary(parsed);
        } else if (entityKey === 'gallery' && Array.isArray(parsed)) {
          setGallery(parsed);
        } else if (entityKey === 'persons' && Array.isArray(parsed)) {
          setPersons(parsed);
        } else if (entityKey === 'committees' && Array.isArray(parsed)) {
          setCommittees(parsed);
        } else if (entityKey === 'positions' && Array.isArray(parsed)) {
          setPositions(parsed);
        } else if (entityKey === 'committeeMembers' && Array.isArray(parsed)) {
          setCommitteeMembers(parsed);
        } else if (entityKey === 'news' && Array.isArray(parsed)) {
          setNews(parsed);
        } else if (entityKey === 'events' && Array.isArray(parsed)) {
          setEvents(parsed);
        }
      } catch (err) {
        console.warn('Storage sync error:', err);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Audit Logging helper
  const logAudit = useCallback((action: string, entity: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user: sessionStorage.getItem('infinity_admin_user') || 'Admin',
      action,
      entity,
      entityId,
      timestamp: new Date().toISOString(),
      details
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  }, []);

  // Generic DB Upsert helper with fallback for column compatibility
  const safeDbUpsert = useCallback(async (tableName: string, data: any) => {
    if (!supabase || !isSupabaseConfigured) return;
    try {
      const { error } = await supabase.from(tableName).upsert(data);
      if (error) {
        console.warn(`Supabase upsert error on ${tableName}:`, error.message);
        // Column fallback retry if remote schema is missing extra columns like aspect_ratio or is_shorts
        if (error.message && (error.message.includes('aspect_ratio') || error.message.includes('is_shorts') || error.message.includes('column'))) {
          const fallbackData = { ...data };
          delete fallbackData.aspect_ratio;
          delete fallbackData.is_shorts;
          const { error: retryErr } = await supabase.from(tableName).upsert(fallbackData);
          if (!retryErr) {
            console.info(`Supabase upsert on ${tableName} succeeded with compatible columns fallback`);
          }
        }
      }
    } catch (err: any) {
      console.warn(`Supabase network error on ${tableName}:`, err.message);
    }
  }, []);

  const safeDbDelete = useCallback(async (tableName: string, matchColumn: string, matchValue: any) => {
    if (!supabase || !isSupabaseConfigured) return;
    try {
      const { error } = await supabase.from(tableName).delete().eq(matchColumn, matchValue);
      if (error) {
        console.warn(`Supabase delete error on ${tableName}:`, error.message);
      }
    } catch (err: any) {
      console.warn(`Supabase network delete error on ${tableName}:`, err.message);
    }
  }, []);

  // Supabase Fetch & Sync implementation: Queries ALL tables across the CMS
  const syncWithSupabase = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) return;

    try {
      setIsSyncing(true);

      // 1. Site Settings
      const { data: siteData } = await supabase.from('site_settings').select('*').single();
      if (siteData) {
        setSettings(prev => ({
          ...prev,
          organizationName: siteData.organization_name || prev.organizationName,
          teamIdentity: siteData.team_identity || prev.teamIdentity,
          tagline: siteData.tagline || prev.tagline,
          officialAddress: siteData.official_address || prev.officialAddress,
          officialPhone: siteData.official_phone || prev.officialPhone,
          officialEmail: siteData.official_email || prev.officialEmail,
          establishedYear: siteData.established_year || prev.establishedYear,
          logoUrl: getFreshImageUrl(siteData.logo_url || prev.logoUrl),
          faviconUrl: getFreshImageUrl(siteData.favicon_url || prev.faviconUrl),
          country: siteData.country || prev.country
        }));
      }

      // 2. Homepage Config
      const { data: homeData } = await supabase.from('homepage_config').select('*').single();
      if (homeData) {
        setHomepageConfig(prev => {
          let syncedHero = {
            ...prev.hero,
            ...(homeData.hero || {}),
            headlineMain: (homeData.hero?.headlineMain && homeData.hero.headlineMain.bn) ? homeData.hero.headlineMain : prev.hero.headlineMain,
            headlineHighlight: (homeData.hero?.headlineHighlight && homeData.hero.headlineHighlight.bn) ? homeData.hero.headlineHighlight : prev.hero.headlineHighlight,
            description: (homeData.hero?.description && homeData.hero.description.bn) ? homeData.hero.description : prev.hero.description,
            heroImageUrl: getFreshImageUrl(homeData.hero?.heroImageUrl || prev.hero.heroImageUrl)
          };
          if (
            !syncedHero.eyebrow ||
            syncedHero.eyebrow.en === 'TEAM INFINITY — UNITED FOR HUMANITY' ||
            syncedHero.eyebrow.bn === 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' ||
            syncedHero.eyebrow.bn === 'টিম ইনফিনিটি — ইউনাইটেড ফর হিউম্যানিটি'
          ) {
            syncedHero.eyebrow = INITIAL_HOMEPAGE_CONFIG.hero.eyebrow;
            safeDbUpsert('homepage_config', {
              id: 'default',
              hero: syncedHero,
              about_preview: homeData.about_preview || prev.aboutPreview,
              volunteer_banner: homeData.volunteer_banner || prev.volunteerBanner,
              support_banner: homeData.support_banner || prev.supportBanner,
              section_order: homeData.section_order || prev.sectionOrder,
              section_visibility: homeData.section_visibility || prev.sectionVisibility,
              updated_at: new Date().toISOString()
            });
          }
          return {
            ...prev,
            hero: syncedHero,
            aboutPreview: {
              ...prev.aboutPreview,
              ...(homeData.about_preview || {}),
              titleMain: (homeData.about_preview?.titleMain && homeData.about_preview.titleMain.bn) ? homeData.about_preview.titleMain : prev.aboutPreview.titleMain,
              description: (homeData.about_preview?.description && homeData.about_preview.description.bn) ? homeData.about_preview.description : prev.aboutPreview.description,
              imageUrl: getFreshImageUrl(homeData.about_preview?.imageUrl || prev.aboutPreview.imageUrl)
            },
            volunteerBanner: { ...prev.volunteerBanner, ...(homeData.volunteer_banner || {}) },
            supportBanner: { ...prev.supportBanner, ...(homeData.support_banner || {}) },
            sectionOrder: (Array.isArray(homeData.section_order) && homeData.section_order.length > 0) ? homeData.section_order : prev.sectionOrder,
            sectionVisibility: (homeData.section_visibility && Object.keys(homeData.section_visibility).length > 0) ? { ...prev.sectionVisibility, ...homeData.section_visibility } : prev.sectionVisibility
          };
        });
      }

      // 3. About Settings
      const { data: aboutData } = await supabase.from('about_settings').select('*').single();
      if (aboutData) {
        setAboutSettings(prev => ({
          ...prev,
          title: (aboutData.title && aboutData.title.bn) ? aboutData.title : prev.title,
          subtitle: (aboutData.subtitle && aboutData.subtitle.bn) ? aboutData.subtitle : prev.subtitle,
          mission: (aboutData.mission && aboutData.mission.bn) ? aboutData.mission : prev.mission,
          vision: (aboutData.vision && aboutData.vision.bn) ? aboutData.vision : prev.vision,
          history: (aboutData.history && aboutData.history.bn) ? aboutData.history : prev.history,
          establishedYear: aboutData.established_year || prev.establishedYear,
          location: aboutData.location || prev.location,
          heroImageUrl: getFreshImageUrl(aboutData.hero_image_url || prev.heroImageUrl),
          secondaryImageUrl: getFreshImageUrl(aboutData.secondary_image_url || prev.secondaryImageUrl)
        }));
      }

      // 4. Header Settings
      const { data: headerData } = await supabase.from('header_settings').select('*').single();
      if (headerData) {
        setHeaderSettings(prev => {
          let syncedNotice = (headerData.notice_bar_text && headerData.notice_bar_text.bn) ? headerData.notice_bar_text : prev.noticeBarText;
          if (
            !syncedNotice ||
            syncedNotice.en?.includes('Team Infinity | United for Humanity') ||
            syncedNotice.bn?.includes('টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ') ||
            syncedNotice.bn?.includes('টিম ইনফিনিটি | ইউনাইটেড ফর হিউম্যানিটি')
          ) {
            syncedNotice = INITIAL_HEADER_SETTINGS.noticeBarText;
            safeDbUpsert('header_settings', {
              id: 'default',
              logo_url: headerData.logo_url || prev.logoUrl,
              show_notice_bar: headerData.show_notice_bar ?? prev.showNoticeBar,
              notice_bar_text: syncedNotice,
              notice_bar_link: headerData.notice_bar_link || prev.noticeBarLink || 'transparency',
              support_button_text: headerData.support_button_text || prev.supportButtonText,
              support_button_url: headerData.support_button_url || prev.supportButtonUrl || 'donate',
              show_support_button: headerData.show_support_button ?? prev.showSupportButton ?? true,
              updated_at: new Date().toISOString()
            });
          }
          return {
            ...prev,
            logoUrl: getFreshImageUrl(headerData.logo_url || prev.logoUrl),
            showNoticeBar: headerData.show_notice_bar ?? prev.showNoticeBar,
            noticeBarText: syncedNotice,
            noticeBarLink: headerData.notice_bar_link || prev.noticeBarLink,
            supportButtonText: (headerData.support_button_text && headerData.support_button_text.bn) ? headerData.support_button_text : prev.supportButtonText,
            supportButtonUrl: headerData.support_button_url || prev.supportButtonUrl,
            showSupportButton: headerData.show_support_button ?? prev.showSupportButton
          };
        });
      }

      // 5. Footer Settings
      const { data: footerData } = await supabase.from('footer_settings').select('*').single();
      if (footerData) {
        setFooterSettings(prev => ({
          ...prev,
          footerLogoUrl: getFreshImageUrl(footerData.footer_logo_url || prev.footerLogoUrl),
          description: (footerData.description && footerData.description.bn) ? footerData.description : prev.description,
          address: (footerData.address && footerData.address.bn) ? footerData.address : prev.address,
          phone: footerData.phone || prev.phone,
          email: footerData.email || prev.email,
          copyrightText: (footerData.copyright_text && footerData.copyright_text.bn) ? footerData.copyright_text : prev.copyrightText,
          calloutEyebrow: footerData.callout_eyebrow || prev.calloutEyebrow,
          calloutTitle: footerData.callout_title || prev.calloutTitle,
          calloutSubtitle: footerData.callout_subtitle || prev.calloutSubtitle,
          volunteerCtaText: footerData.volunteer_cta_text || prev.volunteerCtaText,
          volunteerCtaUrl: footerData.volunteer_cta_url || prev.volunteerCtaUrl,
          supportCtaText: footerData.support_cta_text || prev.supportCtaText,
          supportCtaUrl: footerData.support_cta_url || prev.supportCtaUrl
        }));
      }

      // 6. Programs
      const { data: progData } = await supabase.from('programs').select('*').order('display_order', { ascending: true });
      if (progData && progData.length > 0) {
        setPrograms(progData.map(p => ({
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          shortDescription: p.short_description,
          fullDetails: p.full_details,
          impactHighlights: p.impact_highlights || { en: [], bn: [] },
          imageUrl: getFreshImageUrl(p.image_url),
          iconName: p.icon_name || 'HeartHandshake',
          status: p.status as Program['status'],
          displayOrder: p.display_order
        })));
      }

      // 7. Campaigns
      const { data: campData } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
      if (campData && campData.length > 0) {
        setCampaigns(campData.map(c => ({
          id: c.id,
          slug: c.slug,
          title: c.title,
          date: c.date,
          endDate: c.end_date,
          location: c.location,
          category: c.category,
          description: c.description,
          details: c.details,
          objectives: c.objectives || { en: [], bn: [] },
          activities: c.activities || { en: [], bn: [] },
          beneficiaries: c.beneficiaries,
          beneficiariesCount: c.beneficiaries_count,
          volunteersCount: c.volunteers_count,
          impact: c.impact,
          status: c.status as Campaign['status'],
          isFeatured: c.is_featured,
          targetAmountBDT: c.target_amount_bdt,
          raisedAmountBDT: c.raised_amount_bdt,
          imageUrl: getFreshImageUrl(c.image_url),
          galleryImages: (c.gallery_images || []).map((img: string) => getFreshImageUrl(img)),
          videoUrl: c.video_url,
          reportUrl: c.report_url
        })));
      }

      // 8. Stories
      const { data: storyData } = await supabase.from('stories').select('*').order('created_at', { ascending: false });
      if (storyData && storyData.length > 0) {
        setStories(storyData.map(s => ({
          id: s.id,
          slug: s.slug,
          title: s.title,
          personOrCommunity: s.person_or_community,
          location: s.location,
          date: s.date,
          story: s.story,
          impact: s.impact,
          imageUrl: getFreshImageUrl(s.image_url),
          campaignSlug: s.campaign_slug,
          consentConfirmed: s.consent_confirmed,
          isFeatured: s.is_featured,
          status: s.status
        })));
      }

      // 9. Persons & Leadership (Committee Members)
      const { data: personData } = await supabase.from('persons').select('*').order('created_at', { ascending: true });
      if (personData && personData.length > 0) {
        setPersons(personData.map(p => ({
          id: p.id,
          fullName: p.full_name,
          banglaName: p.bangla_name,
          englishName: p.english_name,
          photoUrl: getFreshImageUrl(p.photo_url),
          photoPosition: p.photo_position || 'center top',
          photoZoom: Number(p.photo_zoom) || 1.0,
          shortBio: p.short_bio,
          fullBio: p.full_bio,
          district: p.district,
          facebookUrl: p.facebook_url,
          linkedinUrl: p.linkedin_url,
          email: p.email,
          phone: p.phone,
          socialLinks: p.social_links,
          joiningYear: p.joining_year,
          active: p.active
        })));
      }

      // 9.5. Positions
      const { data: posData } = await supabase.from('positions').select('*').order('sort_order', { ascending: true });
      if (posData && posData.length > 0) {
        setPositions(posData.map(p => ({
          id: p.id,
          name: p.name,
          level: Number(p.level) || 5,
          sortOrder: Number(p.sort_order) || 10,
          description: p.description
        })));
      }

      // 10. Committees
      const { data: comData } = await supabase.from('committees').select('*').order('sort_order', { ascending: true });
      if (comData && comData.length > 0) {
        setCommittees(comData.map(c => ({
          id: c.id,
          slug: c.slug,
          name: c.name,
          type: c.type,
          year: c.year,
          description: c.description,
          status: c.status,
          sortOrder: c.sort_order,
          isFeatured: c.is_featured,
          bannerImageUrl: getFreshImageUrl(c.banner_image_url)
        })));
      }

      // 11. Committee Members mapping
      const { data: memData } = await supabase.from('committee_members').select('*').order('sort_order', { ascending: true });
      if (memData && memData.length > 0) {
        setCommitteeMembers(memData.map(m => ({
          id: m.id,
          committeeId: m.committee_id,
          personId: m.person_id,
          positionId: m.position_id,
          serialNumber: m.serial_number,
          sortOrder: m.sort_order,
          isFeaturedLeader: m.is_featured_leader,
          startDate: m.start_date,
          endDate: m.end_date,
          status: m.status
        })));
      }

      // 12. Media Library
      const { data: mediaData } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (mediaData && Array.isArray(mediaData)) {
        const remoteMedia: MediaItem[] = mediaData
          .filter(m => m.id !== 'vid-1' && !deletedIdsRef.current.has(m.id) && !(m.url && m.url.includes('dQw4w9WgXcQ')))
          .map(m => ({
            id: m.id,
            fileName: m.file_name,
            url: getFreshImageUrl(m.url),
            fileSize: m.file_size,
            mimeType: m.mime_type,
            category: m.category,
            altText: m.alt_text,
            caption: m.caption,
            uploadedAt: m.uploaded_at || m.created_at,
            usageTags: m.usage_tags || []
          }));

        setMediaLibrary(prevLocal => {
          const remoteIds = new Set(remoteMedia.map(r => r.id));
          const localOnly = prevLocal.filter(l => 
            l.id !== 'vid-1' && 
            !remoteIds.has(l.id) && 
            !deletedIdsRef.current.has(l.id) && 
            !(l.url && l.url.includes('dQw4w9WgXcQ'))
          );
          const merged = localOnly.length > 0 ? [...localOnly, ...remoteMedia] : remoteMedia;
          try {
            localStorage.setItem(`${STORAGE_PREFIX}mediaLibrary`, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }

      // 13. Gallery Photos
      const { data: galData } = await supabase.from('gallery_photos').select('*').order('created_at', { ascending: false });
      if (galData && Array.isArray(galData)) {
        const remoteGallery = galData
          .filter(g => !deletedIdsRef.current.has(g.id))
          .map(g => ({
            id: g.id,
            albumId: g.album_id,
            title: g.title,
            caption: g.caption,
            imageUrl: getFreshImageUrl(g.image_url),
            category: g.category,
            date: g.date,
            location: g.location,
            campaignSlug: g.campaign_slug,
            displayOrder: g.display_order
          }));

        setGallery(prevLocal => {
          const remoteIds = new Set(remoteGallery.map(r => r.id));
          const localOnly = prevLocal.filter(l => !remoteIds.has(l.id) && !deletedIdsRef.current.has(l.id));
          const merged = localOnly.length > 0 ? [...localOnly, ...remoteGallery] : remoteGallery;
          try {
            localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(merged));
          } catch {}
          return merged;
        });
      }

      // 14. Partners
      const { data: partData } = await supabase.from('partners').select('*').order('partnership_year', { ascending: false });
      if (partData && partData.length > 0) {
        setPartners(partData.map(p => ({
          id: p.id,
          name: p.name,
          logoUrl: getFreshImageUrl(p.logo_url),
          website: p.website,
          type: p.type,
          description: p.description,
          partnershipYear: p.partnership_year
        })));
      }

      // 15. News & Articles
      const { data: newsData } = await supabase.from('news_articles').select('*').order('created_at', { ascending: false });
      if (newsData && newsData.length > 0) {
        setNews(newsData.map(n => ({
          id: n.id,
          slug: n.slug,
          title: n.title,
          excerpt: n.excerpt,
          content: n.content,
          category: n.category,
          author: n.author,
          date: n.date,
          imageUrl: getFreshImageUrl(n.image_url),
          tags: n.tags || [],
          status: n.status
        })));
      }

      // 16. Events
      const { data: evData } = await supabase.from('event_items').select('*').order('created_at', { ascending: false });
      if (evData && evData.length > 0) {
        setEvents(evData.map(e => ({
          id: e.id,
          slug: e.slug,
          title: e.title,
          date: e.date,
          time: e.time,
          location: e.location,
          description: e.description,
          imageUrl: getFreshImageUrl(e.image_url),
          status: e.status,
          registrationOpen: e.registration_open
        })));
      }

      // 17. Video Documentation & Footage
      const { data: vidData } = await supabase.from('video_items').select('*').order('created_at', { ascending: false });
      if (vidData && Array.isArray(vidData)) {
        const remoteVideos: VideoItem[] = vidData
          .filter(v => v.id !== 'vid-1' && !deletedIdsRef.current.has(v.id) && !(v.video_url && v.video_url.includes('dQw4w9WgXcQ')))
          .map(v => {
            const det = detectAndNormalizeMedia(v.video_url || '');
            const isShorts = v.is_shorts ?? det.isShorts;
            const aspectRatio = v.aspect_ratio || det.aspectRatio || (isShorts ? '9/16' : '16/9');
            return {
              id: v.id,
              title: v.title,
              videoUrl: det.originalUrl || v.video_url,
              embedUrl: v.embed_url || det.embedUrl || '',
              thumbnailUrl: getFreshImageUrl(v.thumbnail_url || det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL),
              platform: v.platform || det.platform || 'youtube',
              duration: v.duration || (isShorts ? 'Shorts' : 'Video'),
              date: v.date || '',
              description: v.description || { en: '', bn: '' },
              category: v.category || 'General',
              status: v.status || 'published',
              isFeatured: v.is_featured ?? false,
              sourceType: v.source_type || 'url',
              aspectRatio,
              isShorts,
              createdAt: v.created_at,
              updatedAt: v.updated_at
            };
          });

        setVideos(prevLocal => {
          const remoteIds = new Set(remoteVideos.map(r => r.id));
          const localOnly = prevLocal.filter(l => 
            l.id !== 'vid-1' && 
            !remoteIds.has(l.id) && 
            !deletedIdsRef.current.has(l.id) && 
            !(l.videoUrl && l.videoUrl.includes('dQw4w9WgXcQ'))
          );
          if (localOnly.length > 0) {
            // Re-sync local unsynced videos to Supabase in background
            localOnly.forEach(l => {
              safeDbUpsert('video_items', {
                id: l.id,
                title: l.title,
                video_url: l.videoUrl,
                embed_url: l.embedUrl || '',
                thumbnail_url: l.thumbnailUrl,
                platform: l.platform,
                duration: l.duration || '',
                date: l.date,
                description: l.description,
                category: l.category,
                status: l.status,
                is_featured: l.isFeatured,
                source_type: l.sourceType,
                aspect_ratio: l.aspectRatio || '16/9',
                is_shorts: l.isShorts || false,
                created_at: l.createdAt,
                updated_at: l.updatedAt
              });
            });
            const merged = [...localOnly, ...remoteVideos];
            try {
              localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(merged));
            } catch {}
            return merged;
          }
          try {
            localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(remoteVideos));
          } catch {}
          return remoteVideos;
        });
      } else {
        setVideos(prevLocal => {
          const cleaned = prevLocal.filter(l => 
            l.id !== 'vid-1' && 
            !deletedIdsRef.current.has(l.id) && 
            !(l.videoUrl && l.videoUrl.includes('dQw4w9WgXcQ'))
          );
          try {
            localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(cleaned));
          } catch {}
          return cleaned;
        });
      }

      // 18. Press & Media Coverage
      const { data: pressData } = await supabase.from('press_coverage').select('*').order('published_date', { ascending: false });
      if (pressData && Array.isArray(pressData) && pressData.length > 0) {
        const remotePress: PressCoverage[] = pressData.map(p => ({
          id: p.id,
          outletName: p.outlet_name || p.outletName || '',
          outletLogoUrl: getFreshImageUrl(p.outlet_logo_url || p.outletLogoUrl),
          title: p.title || { en: '', bn: '' },
          articleUrl: p.article_url || p.articleUrl || '',
          excerpt: p.excerpt || { en: '', bn: '' },
          coverageType: p.coverage_type || p.coverageType || 'newspaper',
          publishedDate: p.published_date || p.publishedDate || '',
          imageUrl: getFreshImageUrl(p.image_url || p.imageUrl),
          isFeatured: p.is_featured ?? p.isFeatured ?? false,
          status: p.status || 'published',
          createdAt: p.created_at,
          updatedAt: p.updated_at
        }));
        setPressCoverages(prevLocal => {
          const remoteIds = new Set(remotePress.map(r => r.id));
          const localOnly = prevLocal.filter(l => !remoteIds.has(l.id));
          if (localOnly.length > 0) {
            localOnly.forEach(l => {
              safeDbUpsert('press_coverage', {
                id: l.id,
                outlet_name: l.outletName,
                outlet_logo_url: l.outletLogoUrl,
                title: l.title,
                article_url: l.articleUrl,
                excerpt: l.excerpt,
                coverage_type: l.coverageType,
                published_date: l.publishedDate,
                image_url: l.imageUrl,
                is_featured: l.isFeatured,
                status: l.status,
                created_at: l.createdAt || new Date().toISOString(),
                updated_at: l.updatedAt || new Date().toISOString()
              });
            });
            return [...localOnly, ...remotePress];
          }
          return remotePress;
        });
      }

      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Supabase sync exception:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Sync on initial mount & dynamic window revalidation
  useEffect(() => {
    if (isSupabaseConfigured) {
      syncWithSupabase();
    }

    // Dynamic revalidation when user switches tabs or window regains focus
    const handleRevalidate = () => {
      if (isSupabaseConfigured && document.visibilityState === 'visible') {
        syncWithSupabase();
      }
    };

    window.addEventListener('focus', handleRevalidate);
    window.addEventListener('online', handleRevalidate);
    document.addEventListener('visibilitychange', handleRevalidate);

    return () => {
      window.removeEventListener('focus', handleRevalidate);
      window.removeEventListener('online', handleRevalidate);
      document.removeEventListener('visibilitychange', handleRevalidate);
    };
  }, [syncWithSupabase]);

  // Real-time Supabase Broadcast/Change subscription
  useEffect(() => {
    if (!supabase || !isSupabaseConfigured) return;

    try {
      const channel = supabase
        .channel('infinity-cms-changes')
        .on('postgres_changes', { event: '*', schema: 'public' }, () => {
          // Whenever an update happens remotely, pull the latest data
          syncWithSupabase();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime channel error:', err);
    }
  }, [syncWithSupabase]);

  // Push ALL local state to Supabase in one click
  const pushAllToSupabase = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    if (!supabase || !isSupabaseConfigured) {
      return { success: false, message: 'Supabase credentials are not configured in .env' };
    }

    try {
      setIsSyncing(true);

      // Site settings
      await supabase.from('site_settings').upsert({
        id: 'default',
        organization_name: settings.organizationName,
        team_identity: settings.teamIdentity,
        tagline: settings.tagline,
        country: settings.country,
        official_address: settings.officialAddress,
        official_phone: settings.officialPhone,
        official_email: settings.officialEmail,
        established_year: settings.establishedYear || '2015',
        logo_url: settings.logoUrl || '',
        favicon_url: settings.faviconUrl || '',
        updated_at: new Date().toISOString()
      });

      // Homepage config
      await supabase.from('homepage_config').upsert({
        id: 'default',
        hero: homepageConfig.hero,
        about_preview: homepageConfig.aboutPreview,
        volunteer_banner: homepageConfig.volunteerBanner,
        support_banner: homepageConfig.supportBanner,
        section_order: homepageConfig.sectionOrder,
        section_visibility: homepageConfig.sectionVisibility,
        updated_at: new Date().toISOString()
      });

      // About settings
      await supabase.from('about_settings').upsert({
        id: 'default',
        title: aboutSettings.title,
        subtitle: aboutSettings.subtitle,
        mission: aboutSettings.mission,
        vision: aboutSettings.vision,
        history: aboutSettings.history,
        established_year: aboutSettings.establishedYear,
        location: aboutSettings.location,
        hero_image_url: aboutSettings.heroImageUrl,
        secondary_image_url: aboutSettings.secondaryImageUrl || '',
        updated_at: new Date().toISOString()
      });

      // Header settings
      await supabase.from('header_settings').upsert({
        id: 'default',
        logo_url: headerSettings.logoUrl,
        show_notice_bar: headerSettings.showNoticeBar,
        notice_bar_text: headerSettings.noticeBarText,
        notice_bar_link: headerSettings.noticeBarLink || 'transparency',
        show_search: headerSettings.showSearch,
        show_language_switcher: headerSettings.showLanguageSwitcher,
        support_button_text: headerSettings.supportButtonText,
        support_button_url: headerSettings.supportButtonUrl || 'donate',
        show_support_button: headerSettings.showSupportButton,
        updated_at: new Date().toISOString()
      });

      // Footer settings
      await supabase.from('footer_settings').upsert({
        id: 'default',
        footer_logo_url: footerSettings.footerLogoUrl,
        description: footerSettings.description,
        address: footerSettings.address,
        phone: footerSettings.phone,
        email: footerSettings.email,
        copyright_text: footerSettings.copyrightText,
        callout_eyebrow: footerSettings.calloutEyebrow,
        callout_title: footerSettings.calloutTitle,
        callout_subtitle: footerSettings.calloutSubtitle,
        volunteer_cta_text: footerSettings.volunteerCtaText,
        volunteer_cta_url: footerSettings.volunteerCtaUrl || 'volunteer',
        support_cta_text: footerSettings.supportCtaText,
        support_cta_url: footerSettings.supportCtaUrl || 'donate',
        updated_at: new Date().toISOString()
      });

      // Programs
      for (const p of programs) {
        await supabase.from('programs').upsert({
          id: p.id,
          slug: p.slug,
          title: p.title,
          category: p.category,
          short_description: p.shortDescription,
          full_details: p.fullDetails,
          impact_highlights: p.impactHighlights,
          image_url: p.imageUrl,
          icon_name: p.iconName,
          status: p.status,
          display_order: p.displayOrder || 0,
          updated_at: new Date().toISOString()
        });
      }

      // Campaigns
      for (const c of campaigns) {
        await supabase.from('campaigns').upsert({
          id: c.id,
          slug: c.slug,
          title: c.title,
          date: c.date,
          end_date: c.endDate || '',
          location: c.location,
          category: c.category,
          description: c.description,
          details: c.details,
          objectives: c.objectives,
          activities: c.activities,
          beneficiaries: c.beneficiaries,
          beneficiaries_count: c.beneficiariesCount,
          volunteers_count: c.volunteersCount,
          impact: c.impact,
          status: c.status,
          is_featured: c.isFeatured,
          target_amount_bdt: c.targetAmountBDT || '',
          raised_amount_bdt: c.raisedAmountBDT || '',
          image_url: c.imageUrl,
          gallery_images: c.galleryImages,
          video_url: c.videoUrl || '',
          report_url: c.reportUrl || '',
          display_order: c.displayOrder || 0,
          updated_at: new Date().toISOString()
        });
      }

      // Persons & Leadership photos
      for (const per of persons) {
        await supabase.from('persons').upsert({
          id: per.id,
          full_name: per.fullName,
          bangla_name: per.banglaName,
          english_name: per.englishName,
          photo_url: per.photoUrl || '',
          photo_position: per.photoPosition || 'center top',
          photo_zoom: per.photoZoom || 1.0,
          short_bio: per.shortBio,
          full_bio: per.fullBio,
          district: per.district || '',
          facebook_url: per.facebookUrl || '',
          linkedin_url: per.linkedinUrl || '',
          email: per.email || '',
          phone: per.phone || '',
          social_links: per.socialLinks,
          joining_year: per.joiningYear || '',
          active: per.active,
          updated_at: new Date().toISOString()
        });
      }

      // Positions
      for (const pos of positions) {
        await supabase.from('positions').upsert({
          id: pos.id,
          name: pos.name,
          level: pos.level,
          sort_order: pos.sortOrder,
          description: pos.description
        });
      }

      // Committees
      for (const com of committees) {
        await supabase.from('committees').upsert({
          id: com.id,
          slug: com.slug,
          name: com.name,
          type: com.type,
          year: com.year,
          description: com.description,
          status: com.status,
          sort_order: com.sortOrder,
          is_featured: com.isFeatured,
          banner_image_url: com.bannerImageUrl || '',
          updated_at: new Date().toISOString()
        });
      }

      // Committee Members
      for (const mem of committeeMembers) {
        await supabase.from('committee_members').upsert({
          id: mem.id,
          committee_id: mem.committeeId,
          person_id: mem.personId,
          position_id: mem.positionId,
          serial_number: mem.serialNumber,
          sort_order: mem.sortOrder,
          is_featured_leader: mem.isFeaturedLeader,
          start_date: mem.startDate || '',
          end_date: mem.endDate || '',
          status: mem.status
        });
      }

      // Media Library
      for (const med of mediaLibrary) {
        await supabase.from('media_library').upsert({
          id: med.id,
          file_name: med.fileName,
          url: med.url,
          file_size: med.fileSize,
          mime_type: med.mimeType,
          category: med.category,
          alt_text: med.altText,
          caption: med.caption || '',
          usage_tags: med.usageTags,
          uploaded_at: new Date().toISOString()
        });
      }

      // Videos Documentation & Footage
      for (const vid of videos) {
        const det = detectAndNormalizeMedia(vid.videoUrl || '');
        await supabase.from('video_items').upsert({
          id: vid.id,
          title: vid.title,
          video_url: vid.videoUrl,
          embed_url: vid.embedUrl || det.embedUrl || '',
          thumbnail_url: vid.thumbnailUrl || det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL,
          platform: vid.platform || det.platform || 'youtube',
          duration: vid.duration || '',
          date: vid.date || new Date().toISOString().split('T')[0],
          description: vid.description,
          category: vid.category || 'General',
          status: vid.status || 'published',
          is_featured: vid.isFeatured || false,
          source_type: vid.sourceType || 'url',
          aspect_ratio: vid.aspectRatio || '16/9',
          is_shorts: vid.isShorts || false,
          created_at: vid.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }

      setLastSyncedAt(new Date());
      logAudit('SYNC', 'Database', 'full_push', 'Pushed all local CMS entities to Supabase Cloud Database');
      return { success: true, message: 'Successfully synchronized all CMS data and cloud image URLs to Supabase!' };
    } catch (err: any) {
      console.error('Push to Supabase failed:', err);
      return { success: false, message: err.message || 'Failed to push data to Supabase.' };
    } finally {
      setIsSyncing(false);
    }
  }, [
    settings, homepageConfig, aboutSettings, headerSettings, footerSettings,
    programs, campaigns, positions, persons, committees, committeeMembers, mediaLibrary, videos, logAudit
  ]);

  // MUTATIONS: Global Settings
  const updateHomepageConfig = useCallback((newConfig: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => {
      const updated = {
        ...prev,
        ...newConfig,
        hero: newConfig.hero
          ? {
              ...prev.hero,
              ...newConfig.hero,
              heroImageUrl: getFreshImageUrl(newConfig.hero.heroImageUrl || prev.hero.heroImageUrl)
            }
          : prev.hero,
        aboutPreview: newConfig.aboutPreview
          ? {
              ...prev.aboutPreview,
              ...newConfig.aboutPreview,
              imageUrl: getFreshImageUrl(newConfig.aboutPreview.imageUrl || prev.aboutPreview.imageUrl)
            }
          : prev.aboutPreview,
        volunteerBanner: newConfig.volunteerBanner ? { ...prev.volunteerBanner, ...newConfig.volunteerBanner } : prev.volunteerBanner,
        supportBanner: newConfig.supportBanner ? { ...prev.supportBanner, ...newConfig.supportBanner } : prev.supportBanner,
        sectionVisibility: newConfig.sectionVisibility ? { ...prev.sectionVisibility, ...newConfig.sectionVisibility } : prev.sectionVisibility
      };
      logAudit('UPDATE', 'HomepageConfig', 'homepage', 'Updated homepage hero, sections, or visibility');

      safeDbUpsert('homepage_config', {
        id: 'default',
        hero: updated.hero,
        about_preview: updated.aboutPreview,
        volunteer_banner: updated.volunteerBanner,
        support_banner: updated.supportBanner,
        section_order: updated.sectionOrder,
        section_visibility: updated.sectionVisibility,
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateAboutSettings = useCallback((newSettings: Partial<AboutSettings>) => {
    setAboutSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        heroImageUrl: getFreshImageUrl(newSettings.heroImageUrl || prev.heroImageUrl),
        secondaryImageUrl: getFreshImageUrl(newSettings.secondaryImageUrl || prev.secondaryImageUrl)
      };
      logAudit('UPDATE', 'AboutSettings', 'about', 'Updated organization about settings');

      safeDbUpsert('about_settings', {
        id: 'default',
        title: updated.title,
        subtitle: updated.subtitle,
        mission: updated.mission,
        vision: updated.vision,
        history: updated.history,
        established_year: updated.establishedYear,
        location: updated.location,
        hero_image_url: updated.heroImageUrl,
        secondary_image_url: updated.secondaryImageUrl || '',
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateHeaderSettings = useCallback((newSettings: Partial<HeaderSettings>) => {
    setHeaderSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        logoUrl: getFreshImageUrl(newSettings.logoUrl || prev.logoUrl)
      };
      logAudit('UPDATE', 'HeaderSettings', 'header', 'Updated header notice bar or navigation settings');

      safeDbUpsert('header_settings', {
        id: 'default',
        logo_url: updated.logoUrl,
        show_notice_bar: updated.showNoticeBar,
        notice_bar_text: updated.noticeBarText,
        notice_bar_link: updated.noticeBarLink || 'transparency',
        show_search: updated.showSearch,
        show_language_switcher: updated.showLanguageSwitcher,
        support_button_text: updated.supportButtonText,
        support_button_url: updated.supportButtonUrl || 'donate',
        show_support_button: updated.showSupportButton,
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateFooterSettings = useCallback((newSettings: Partial<FooterSettings>) => {
    setFooterSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        footerLogoUrl: getFreshImageUrl(newSettings.footerLogoUrl || prev.footerLogoUrl)
      };
      logAudit('UPDATE', 'FooterSettings', 'footer', 'Updated footer text, address, or copyright');

      safeDbUpsert('footer_settings', {
        id: 'default',
        footer_logo_url: updated.footerLogoUrl,
        description: updated.description,
        address: updated.address,
        phone: updated.phone,
        email: updated.email,
        copyright_text: updated.copyrightText,
        callout_eyebrow: updated.calloutEyebrow,
        callout_title: updated.calloutTitle,
        callout_subtitle: updated.calloutSubtitle,
        volunteer_cta_text: updated.volunteerCtaText,
        volunteer_cta_url: updated.volunteerCtaUrl || 'volunteer',
        support_cta_text: updated.supportCtaText,
        support_cta_url: updated.supportCtaUrl || 'donate',
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateVolunteerSettings = useCallback((newSettings: Partial<VolunteerSettings>) => {
    setVolunteerSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        coverImageUrl: getFreshImageUrl(newSettings.coverImageUrl || prev.coverImageUrl)
      };
      logAudit('UPDATE', 'VolunteerSettings', 'volunteer', 'Updated volunteer CTA, benefits or form link');

      safeDbUpsert('volunteer_settings', {
        id: 'default',
        cta_text: updated.ctaText,
        google_form_url: updated.googleFormUrl,
        description: updated.description,
        cover_image_url: updated.coverImageUrl,
        benefits: updated.benefits,
        requirements: updated.requirements,
        contact_email: updated.contactEmail,
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateSupportSettings = useCallback((newSettings: Partial<SupportSettings>) => {
    setSupportSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        qrCodeImageUrl: getFreshImageUrl(newSettings.qrCodeImageUrl || prev.qrCodeImageUrl)
      };
      logAudit('UPDATE', 'SupportSettings', 'support', 'Updated payment instructions, bKash, Nagad or bank details');

      safeDbUpsert('support_settings', {
        id: 'default',
        cta_text: updated.ctaText,
        description: updated.description,
        bkash_number: updated.bKashNumber || updated.bkashNumber,
        bkash_type: updated.bKashType,
        nagad_number: updated.nagadNumber,
        nagad_type: updated.nagadType,
        bank_details: updated.bankDetails,
        qr_code_image_url: updated.qrCodeImageUrl || '',
        payment_instructions: updated.paymentInstructions,
        support_email: updated.supportEmail,
        support_phone: updated.supportPhone,
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateContactSettings = useCallback((newSettings: Partial<ContactSettings>) => {
    setContactSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'ContactSettings', 'contact', 'Updated official contact phone, email or address');

      safeDbUpsert('contact_settings', {
        id: 'default',
        address: updated.address,
        phone: updated.phone,
        email: updated.email,
        office_hours: updated.officeHours,
        google_maps_embed_url: updated.googleMapsEmbedUrl,
        emergency_helpline: updated.emergencyHelpline || '',
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateSEOSettings = useCallback((newSettings: Partial<GlobalSEOSettings>) => {
    setSeoSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        ogImageUrl: getFreshImageUrl(newSettings.ogImageUrl || prev.ogImageUrl)
      };
      logAudit('UPDATE', 'SEOSettings', 'seo', 'Updated global SEO meta tags');

      safeDbUpsert('seo_settings', {
        id: 'default',
        site_title: updated.siteTitle,
        meta_description: updated.metaDescription,
        keywords: updated.keywords,
        og_image_url: updated.ogImageUrl,
        organization_name: updated.organizationName,
        canonical_url: updated.canonicalUrl,
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = {
        ...prev,
        ...newSettings,
        logoUrl: getFreshImageUrl(newSettings.logoUrl || prev.logoUrl),
        faviconUrl: getFreshImageUrl(newSettings.faviconUrl || prev.faviconUrl)
      };
      logAudit('UPDATE', 'SiteSettings', 'site', 'Updated main site settings');

      safeDbUpsert('site_settings', {
        id: 'default',
        organization_name: updated.organizationName,
        team_identity: updated.teamIdentity,
        tagline: updated.tagline,
        country: updated.country,
        official_address: updated.officialAddress,
        official_phone: updated.officialPhone,
        official_email: updated.officialEmail,
        established_year: updated.establishedYear || '2015',
        logo_url: updated.logoUrl || '',
        favicon_url: updated.faviconUrl || '',
        updated_at: new Date().toISOString()
      });

      return updated;
    });
  }, [logAudit, safeDbUpsert]);

  // MUTATIONS: Social Links
  const addSocialLink = useCallback((link: Omit<SocialLink, 'id'>) => {
    const id = `soc-${Date.now()}`;
    const newLink: SocialLink = { ...link, id };
    setSocialLinks(prev => [...prev, newLink]);
    logAudit('CREATE', 'SocialLink', id, `Added ${link.platform} link`);
    safeDbUpsert('social_links', newLink);
  }, [logAudit, safeDbUpsert]);

  const updateSocialLink = useCallback((id: string, link: Partial<SocialLink>) => {
    setSocialLinks(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, ...link } : s);
      const match = updated.find(s => s.id === id);
      if (match) safeDbUpsert('social_links', match);
      return updated;
    });
    logAudit('UPDATE', 'SocialLink', id, 'Updated social link details');
  }, [logAudit, safeDbUpsert]);

  const deleteSocialLink = useCallback((id: string) => {
    setSocialLinks(prev => prev.filter(s => s.id !== id));
    logAudit('DELETE', 'SocialLink', id, 'Deleted social link');
    safeDbDelete('social_links', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Navigation Items
  const addNavigationItem = useCallback((item: Omit<NavigationItem, 'id'>) => {
    const id = `nav-${Date.now()}`;
    const newItem: NavigationItem = { ...item, id };
    setNavigationItems(prev => [...prev, newItem]);
    logAudit('CREATE', 'NavigationItem', id, `Added navigation link: ${item.label.en}`);
    safeDbUpsert('navigation_items', newItem);
  }, [logAudit, safeDbUpsert]);

  const updateNavigationItem = useCallback((id: string, item: Partial<NavigationItem>) => {
    setNavigationItems(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, ...item } : n);
      const match = updated.find(n => n.id === id);
      if (match) safeDbUpsert('navigation_items', match);
      return updated;
    });
    logAudit('UPDATE', 'NavigationItem', id, 'Updated navigation item');
  }, [logAudit, safeDbUpsert]);

  const deleteNavigationItem = useCallback((id: string) => {
    setNavigationItems(prev => prev.filter(n => n.id !== id));
    logAudit('DELETE', 'NavigationItem', id, 'Deleted navigation item');
    safeDbDelete('navigation_items', 'id', id);
  }, [logAudit, safeDbDelete]);

  const reorderNavigationItems = useCallback((items: NavigationItem[]) => {
    setNavigationItems(items);
    logAudit('UPDATE', 'NavigationItems', 'reorder', 'Reordered navigation menu items');
  }, [logAudit]);

  // MUTATIONS: Banners
  const addBanner = useCallback((banner: Omit<BannerItem, 'id'>) => {
    const id = `ban-${Date.now()}`;
    const newBanner: BannerItem = {
      ...banner,
      id,
      desktopImageUrl: getFreshImageUrl(banner.desktopImageUrl),
      mobileImageUrl: banner.mobileImageUrl ? getFreshImageUrl(banner.mobileImageUrl) : ''
    };
    setBanners(prev => [...prev, newBanner]);
    logAudit('CREATE', 'BannerItem', id, `Created banner: ${banner.title.en}`);
    safeDbUpsert('banners', newBanner);
  }, [logAudit, safeDbUpsert]);

  const updateBanner = useCallback((id: string, banner: Partial<BannerItem>) => {
    setBanners(prev => {
      const updated = prev.map(b => {
        if (b.id !== id) return b;
        return {
          ...b,
          ...banner,
          desktopImageUrl: banner.desktopImageUrl ? getFreshImageUrl(banner.desktopImageUrl) : b.desktopImageUrl,
          mobileImageUrl: banner.mobileImageUrl ? getFreshImageUrl(banner.mobileImageUrl) : b.mobileImageUrl
        };
      });
      const match = updated.find(b => b.id === id);
      if (match) safeDbUpsert('banners', match);
      return updated;
    });
    logAudit('UPDATE', 'BannerItem', id, 'Updated banner details');
  }, [logAudit, safeDbUpsert]);

  const deleteBanner = useCallback((id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    logAudit('DELETE', 'BannerItem', id, 'Deleted banner');
    safeDbDelete('banners', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Media Library & Albums
  const addMediaItem = useCallback((media: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const id = `med-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMedia: MediaItem = {
      ...media,
      id,
      url: getFreshImageUrl(media.url),
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaLibrary(prev => [newMedia, ...prev]);
    logAudit('CREATE', 'MediaItem', id, `Uploaded media: ${media.fileName}`);

    safeDbUpsert('media_library', {
      id: newMedia.id,
      file_name: newMedia.fileName,
      url: newMedia.url,
      file_size: newMedia.fileSize,
      mime_type: newMedia.mimeType,
      category: newMedia.category,
      alt_text: newMedia.altText,
      caption: newMedia.caption || '',
      usage_tags: newMedia.usageTags,
      uploaded_at: new Date().toISOString()
    });

    return newMedia;
  }, [logAudit, safeDbUpsert]);

  const updateMediaItem = useCallback((id: string, media: Partial<MediaItem>) => {
    setMediaLibrary(prev => {
      const updated = prev.map(m => {
        if (m.id !== id) return m;
        return {
          ...m,
          ...media,
          url: media.url ? getFreshImageUrl(media.url) : m.url
        };
      });
      const match = updated.find(m => m.id === id);
      if (match) {
        safeDbUpsert('media_library', {
          id: match.id,
          file_name: match.fileName,
          url: match.url,
          file_size: match.fileSize,
          mime_type: match.mimeType,
          category: match.category,
          alt_text: match.altText,
          caption: match.caption || '',
          usage_tags: match.usageTags
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'MediaItem', id, 'Updated media metadata/alt-text');
  }, [logAudit, safeDbUpsert]);

  const deleteMediaItem = useCallback(async (id: string) => {
    deletedIdsRef.current.add(id);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}deleted_video_ids`, JSON.stringify(Array.from(deletedIdsRef.current)));
    } catch (e) {
      console.warn('Storage error on deleted_video_ids:', e);
    }

    setMediaLibrary(prev => {
      const next = prev.filter(m => m.id !== id && m.url !== id);
      try {
        localStorage.setItem(`${STORAGE_PREFIX}mediaLibrary`, JSON.stringify(next));
      } catch {}
      return next;
    });

    setVideos(prev => {
      const next = prev.filter(v => v.id !== id && v.videoUrl !== id);
      try {
        localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(next));
      } catch {}
      return next;
    });

    setGallery(prev => {
      const next = prev.filter(g => g.id !== id && g.imageUrl !== id);
      try {
        localStorage.setItem(`${STORAGE_PREFIX}gallery`, JSON.stringify(next));
      } catch {}
      return next;
    });

    logAudit('DELETE', 'MediaItem', id, 'Deleted media asset');

    if (supabase && isSupabaseConfigured) {
      try {
        const [res1, res2, res3] = await Promise.allSettled([
          supabase.from('media_library').delete().eq('id', id),
          supabase.from('video_items').delete().eq('id', id),
          supabase.from('gallery_photos').delete().eq('id', id)
        ]);
        if (res1.status === 'rejected' || (res1.status === 'fulfilled' && res1.value.error)) {
          console.error('Supabase media_library delete warning:', res1);
        }
        if (res2.status === 'rejected' || (res2.status === 'fulfilled' && res2.value.error)) {
          console.error('Supabase video_items delete warning:', res2);
        }
      } catch (err) {
        console.error('Supabase delete exception:', err);
      }
    }
  }, [logAudit]);

  const addGalleryAlbum = useCallback((album: Omit<GalleryAlbum, 'id'>) => {
    const id = `alb-${Date.now()}`;
    const newAlbum: GalleryAlbum = {
      ...album,
      id,
      coverImageUrl: getFreshImageUrl(album.coverImageUrl)
    };
    setGalleryAlbums(prev => [...prev, newAlbum]);
    logAudit('CREATE', 'GalleryAlbum', id, `Created album: ${album.title.en}`);

    safeDbUpsert('gallery_albums', {
      id: newAlbum.id,
      slug: newAlbum.slug,
      title: newAlbum.title,
      description: newAlbum.description,
      cover_image_url: newAlbum.coverImageUrl,
      category: newAlbum.category,
      date: newAlbum.date,
      is_published: newAlbum.isPublished,
      display_order: newAlbum.displayOrder
    });

    return newAlbum;
  }, [logAudit, safeDbUpsert]);

  const updateGalleryAlbum = useCallback((id: string, album: Partial<GalleryAlbum>) => {
    setGalleryAlbums(prev => {
      const updated = prev.map(a => {
        if (a.id !== id) return a;
        return {
          ...a,
          ...album,
          coverImageUrl: album.coverImageUrl ? getFreshImageUrl(album.coverImageUrl) : a.coverImageUrl
        };
      });
      const match = updated.find(a => a.id === id);
      if (match) {
        safeDbUpsert('gallery_albums', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          description: match.description,
          cover_image_url: match.coverImageUrl,
          category: match.category,
          date: match.date,
          is_published: match.isPublished,
          display_order: match.displayOrder
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'GalleryAlbum', id, 'Updated gallery album');
  }, [logAudit, safeDbUpsert]);

  const deleteGalleryAlbum = useCallback((id: string) => {
    setGalleryAlbums(prev => prev.filter(a => a.id !== id));
    logAudit('DELETE', 'GalleryAlbum', id, 'Deleted gallery album');
    safeDbDelete('gallery_albums', 'id', id);
  }, [logAudit, safeDbDelete]);

  const setAlbumPhotos = useCallback((albumId: string, photoIds: string[]) => {
    setGallery(prev => {
      const updated = prev.map(photo => {
        if (photoIds.includes(photo.id)) {
          const newPhoto = { ...photo, albumId, displayOrder: photoIds.indexOf(photo.id) + 1 };
          safeDbUpsert('gallery_photos', {
            id: newPhoto.id,
            album_id: albumId,
            title: newPhoto.title,
            caption: newPhoto.caption,
            image_url: newPhoto.imageUrl,
            category: newPhoto.category,
            date: newPhoto.date,
            location: newPhoto.location,
            campaign_slug: newPhoto.campaignSlug || '',
            display_order: newPhoto.displayOrder || 0
          });
          return newPhoto;
        } else if (photo.albumId === albumId) {
          const newPhoto = { ...photo, albumId: undefined };
          safeDbUpsert('gallery_photos', {
            id: newPhoto.id,
            album_id: null,
            title: newPhoto.title,
            caption: newPhoto.caption,
            image_url: newPhoto.imageUrl,
            category: newPhoto.category,
            date: newPhoto.date,
            location: newPhoto.location,
            campaign_slug: newPhoto.campaignSlug || '',
            display_order: newPhoto.displayOrder || 0
          });
          return newPhoto;
        }
        return photo;
      });
      return updated;
    });

    setGalleryAlbums(prev => {
      return prev.map(alb => {
        if (alb.id !== albumId) return alb;
        return {
          ...alb,
          photos: gallery.filter(g => photoIds.includes(g.id))
        };
      });
    });

    logAudit('UPDATE', 'GalleryAlbum', albumId, `Updated photos in album (${photoIds.length} photos assigned)`);
  }, [gallery, logAudit, safeDbUpsert]);

  // MUTATIONS: Press & Media Coverage
  const addPressCoverage = useCallback((press: Omit<PressCoverage, 'id'>) => {
    const id = `press-${Date.now()}`;
    const newPress: PressCoverage = {
      ...press,
      id,
      imageUrl: press.imageUrl ? getFreshImageUrl(press.imageUrl) : undefined,
      outletLogoUrl: press.outletLogoUrl ? getFreshImageUrl(press.outletLogoUrl) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setPressCoverages(prev => [newPress, ...prev]);
    logAudit('CREATE', 'PressCoverage', id, `Added press coverage: ${press.title.en}`);

    safeDbUpsert('press_coverage', {
      id: newPress.id,
      outlet_name: newPress.outletName,
      outlet_logo_url: newPress.outletLogoUrl,
      title: newPress.title,
      article_url: newPress.articleUrl,
      excerpt: newPress.excerpt,
      coverage_type: newPress.coverageType,
      published_date: newPress.publishedDate,
      image_url: newPress.imageUrl,
      is_featured: newPress.isFeatured,
      status: newPress.status,
      created_at: newPress.createdAt,
      updated_at: newPress.updatedAt
    });

    return newPress;
  }, [logAudit, safeDbUpsert]);

  const updatePressCoverage = useCallback((id: string, press: Partial<PressCoverage>) => {
    setPressCoverages(prev => {
      const updated = prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...press,
          imageUrl: press.imageUrl ? getFreshImageUrl(press.imageUrl) : p.imageUrl,
          outletLogoUrl: press.outletLogoUrl ? getFreshImageUrl(press.outletLogoUrl) : p.outletLogoUrl,
          updatedAt: new Date().toISOString()
        };
      });
      const match = updated.find(p => p.id === id);
      if (match) {
        safeDbUpsert('press_coverage', {
          id: match.id,
          outlet_name: match.outletName,
          outlet_logo_url: match.outletLogoUrl,
          title: match.title,
          article_url: match.articleUrl,
          excerpt: match.excerpt,
          coverage_type: match.coverageType,
          published_date: match.publishedDate,
          image_url: match.imageUrl,
          is_featured: match.isFeatured,
          status: match.status,
          created_at: match.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'PressCoverage', id, 'Updated press coverage details');
  }, [logAudit, safeDbUpsert]);

  const deletePressCoverage = useCallback((id: string) => {
    setPressCoverages(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'PressCoverage', id, 'Deleted press coverage item');
    safeDbDelete('press_coverage', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Core Programs & Campaigns
  const addCampaign = useCallback((campaign: Omit<Campaign, 'id'>) => {
    const id = `camp-${Date.now()}`;
    const newCamp: Campaign = {
      ...campaign,
      id,
      imageUrl: getFreshImageUrl(campaign.imageUrl),
      galleryImages: (campaign.galleryImages || []).map(img => getFreshImageUrl(img))
    };
    setCampaigns(prev => [newCamp, ...prev]);
    logAudit('CREATE', 'Campaign', id, `Created campaign: ${campaign.title.en}`);

    safeDbUpsert('campaigns', {
      id: newCamp.id,
      slug: newCamp.slug,
      title: newCamp.title,
      date: newCamp.date,
      end_date: newCamp.endDate || '',
      location: newCamp.location,
      category: newCamp.category,
      description: newCamp.description,
      details: newCamp.details,
      objectives: newCamp.objectives,
      activities: newCamp.activities,
      beneficiaries: newCamp.beneficiaries,
      beneficiaries_count: newCamp.beneficiariesCount,
      volunteers_count: newCamp.volunteersCount,
      impact: newCamp.impact,
      status: newCamp.status,
      is_featured: newCamp.isFeatured,
      target_amount_bdt: newCamp.targetAmountBDT || '',
      raised_amount_bdt: newCamp.raisedAmountBDT || '',
      image_url: newCamp.imageUrl,
      gallery_images: newCamp.galleryImages,
      video_url: newCamp.videoUrl || '',
      report_url: newCamp.reportUrl || '',
      display_order: newCamp.displayOrder || 0,
      updated_at: new Date().toISOString()
    });

    return newCamp;
  }, [logAudit, safeDbUpsert]);

  const updateCampaign = useCallback((id: string, campaign: Partial<Campaign>) => {
    setCampaigns(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c;
        return {
          ...c,
          ...campaign,
          imageUrl: campaign.imageUrl ? getFreshImageUrl(campaign.imageUrl) : c.imageUrl,
          galleryImages: campaign.galleryImages ? campaign.galleryImages.map(img => getFreshImageUrl(img)) : c.galleryImages
        };
      });
      const match = updated.find(c => c.id === id);
      if (match) {
        safeDbUpsert('campaigns', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          date: match.date,
          end_date: match.endDate || '',
          location: match.location,
          category: match.category,
          description: match.description,
          details: match.details,
          objectives: match.objectives,
          activities: match.activities,
          beneficiaries: match.beneficiaries,
          beneficiaries_count: match.beneficiariesCount,
          volunteers_count: match.volunteersCount,
          impact: match.impact,
          status: match.status,
          is_featured: match.isFeatured,
          target_amount_bdt: match.targetAmountBDT || '',
          raised_amount_bdt: match.raisedAmountBDT || '',
          image_url: match.imageUrl,
          gallery_images: match.galleryImages,
          video_url: match.videoUrl || '',
          report_url: match.reportUrl || '',
          display_order: match.displayOrder || 0,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'Campaign', id, 'Updated campaign details or gallery');
  }, [logAudit, safeDbUpsert]);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    logAudit('DELETE', 'Campaign', id, 'Deleted campaign');
    safeDbDelete('campaigns', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addProgram = useCallback((program: Omit<Program, 'id'>) => {
    const id = `prog-${Date.now()}`;
    const newProg: Program = {
      ...program,
      id,
      imageUrl: getFreshImageUrl(program.imageUrl)
    };
    setPrograms(prev => [...prev, newProg]);
    logAudit('CREATE', 'Program', id, `Created program: ${program.title.en}`);

    safeDbUpsert('programs', {
      id: newProg.id,
      slug: newProg.slug,
      title: newProg.title,
      category: newProg.category,
      short_description: newProg.shortDescription,
      full_details: newProg.fullDetails,
      impact_highlights: newProg.impactHighlights,
      image_url: newProg.imageUrl,
      icon_name: newProg.iconName,
      status: newProg.status,
      display_order: newProg.displayOrder || 0,
      updated_at: new Date().toISOString()
    });

    return newProg;
  }, [logAudit, safeDbUpsert]);

  const updateProgram = useCallback((id: string, program: Partial<Program>) => {
    setPrograms(prev => {
      const updated = prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...program,
          imageUrl: program.imageUrl ? getFreshImageUrl(program.imageUrl) : p.imageUrl
        };
      });
      const match = updated.find(p => p.id === id);
      if (match) {
        safeDbUpsert('programs', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          category: match.category,
          short_description: match.shortDescription,
          full_details: match.fullDetails,
          impact_highlights: match.impactHighlights,
          image_url: match.imageUrl,
          icon_name: match.iconName,
          status: match.status,
          display_order: match.displayOrder || 0,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'Program', id, 'Updated program info');
  }, [logAudit, safeDbUpsert]);

  const deleteProgram = useCallback((id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Program', id, 'Deleted program');
    safeDbDelete('programs', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addMetric = useCallback((metric: Omit<ImpactMetric, 'id'>) => {
    const id = `met-${Date.now()}`;
    const newMet: ImpactMetric = { ...metric, id };
    setMetrics(prev => [...prev, newMet]);
    logAudit('CREATE', 'ImpactMetric', id, `Added metric: ${metric.label.en}`);
    safeDbUpsert('impact_metrics', newMet);
    return newMet;
  }, [logAudit, safeDbUpsert]);

  const updateMetric = useCallback((id: string, metric: Partial<ImpactMetric>) => {
    setMetrics(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...metric } : m);
      const match = updated.find(m => m.id === id);
      if (match) safeDbUpsert('impact_metrics', match);
      return updated;
    });
    logAudit('UPDATE', 'ImpactMetric', id, 'Updated impact metric');
  }, [logAudit, safeDbUpsert]);

  const deleteMetric = useCallback((id: string) => {
    setMetrics(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'ImpactMetric', id, 'Deleted metric');
    safeDbDelete('impact_metrics', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addStory = useCallback((story: Omit<ImpactStory, 'id'>) => {
    const id = `story-${Date.now()}`;
    const newStory: ImpactStory = {
      ...story,
      id,
      imageUrl: getFreshImageUrl(story.imageUrl)
    };
    setStories(prev => [newStory, ...prev]);
    logAudit('CREATE', 'ImpactStory', id, `Published story: ${story.title.en}`);

    safeDbUpsert('stories', {
      id: newStory.id,
      slug: newStory.slug,
      title: newStory.title,
      person_or_community: newStory.personOrCommunity,
      location: newStory.location,
      date: newStory.date,
      story: newStory.story,
      impact: newStory.impact,
      image_url: newStory.imageUrl,
      campaign_slug: newStory.campaignSlug || '',
      consent_confirmed: newStory.consentConfirmed,
      is_featured: newStory.isFeatured,
      status: newStory.status,
      updated_at: new Date().toISOString()
    });

    return newStory;
  }, [logAudit, safeDbUpsert]);

  const updateStory = useCallback((id: string, story: Partial<ImpactStory>) => {
    setStories(prev => {
      const updated = prev.map(s => {
        if (s.id !== id) return s;
        return {
          ...s,
          ...story,
          imageUrl: story.imageUrl ? getFreshImageUrl(story.imageUrl) : s.imageUrl
        };
      });
      const match = updated.find(s => s.id === id);
      if (match) {
        safeDbUpsert('stories', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          person_or_community: match.personOrCommunity,
          location: match.location,
          date: match.date,
          story: match.story,
          impact: match.impact,
          image_url: match.imageUrl,
          campaign_slug: match.campaignSlug || '',
          consent_confirmed: match.consentConfirmed,
          is_featured: match.isFeatured,
          status: match.status,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'ImpactStory', id, 'Updated story content');
  }, [logAudit, safeDbUpsert]);

  const deleteStory = useCallback((id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
    logAudit('DELETE', 'ImpactStory', id, 'Deleted story');
    safeDbDelete('stories', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addNews = useCallback((newsItem: Omit<NewsArticle, 'id'>) => {
    const id = `news-${Date.now()}`;
    const newN: NewsArticle = {
      ...newsItem,
      id,
      imageUrl: getFreshImageUrl(newsItem.imageUrl)
    };
    setNews(prev => [newN, ...prev]);
    logAudit('CREATE', 'NewsArticle', id, `Added news: ${newsItem.title.en}`);

    safeDbUpsert('news_articles', {
      id: newN.id,
      slug: newN.slug,
      title: newN.title,
      excerpt: newN.excerpt,
      content: newN.content,
      category: newN.category,
      author: newN.author,
      date: newN.date,
      image_url: newN.imageUrl,
      tags: newN.tags,
      status: newN.status,
      updated_at: new Date().toISOString()
    });

    return newN;
  }, [logAudit, safeDbUpsert]);

  const updateNews = useCallback((id: string, newsItem: Partial<NewsArticle>) => {
    setNews(prev => {
      const updated = prev.map(n => {
        if (n.id !== id) return n;
        return {
          ...n,
          ...newsItem,
          imageUrl: newsItem.imageUrl ? getFreshImageUrl(newsItem.imageUrl) : n.imageUrl
        };
      });
      const match = updated.find(n => n.id === id);
      if (match) {
        safeDbUpsert('news_articles', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          excerpt: match.excerpt,
          content: match.content,
          category: match.category,
          author: match.author,
          date: match.date,
          image_url: match.imageUrl,
          tags: match.tags,
          status: match.status,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'NewsArticle', id, 'Updated news article');
  }, [logAudit, safeDbUpsert]);

  const deleteNews = useCallback((id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    logAudit('DELETE', 'NewsArticle', id, 'Deleted news article');
    safeDbDelete('news_articles', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addEvent = useCallback((eventItem: Omit<EventItem, 'id'>) => {
    const id = `ev-${Date.now()}`;
    const newEv: EventItem = {
      ...eventItem,
      id,
      imageUrl: getFreshImageUrl(eventItem.imageUrl)
    };
    setEvents(prev => [newEv, ...prev]);
    logAudit('CREATE', 'EventItem', id, `Added event: ${eventItem.title.en}`);

    safeDbUpsert('event_items', {
      id: newEv.id,
      slug: newEv.slug,
      title: newEv.title,
      date: newEv.date,
      time: newEv.time,
      location: newEv.location,
      description: newEv.description,
      image_url: newEv.imageUrl,
      status: newEv.status,
      registration_open: newEv.registrationOpen,
      updated_at: new Date().toISOString()
    });

    return newEv;
  }, [logAudit, safeDbUpsert]);

  const updateEvent = useCallback((id: string, eventItem: Partial<EventItem>) => {
    setEvents(prev => {
      const updated = prev.map(e => {
        if (e.id !== id) return e;
        return {
          ...e,
          ...eventItem,
          imageUrl: eventItem.imageUrl ? getFreshImageUrl(eventItem.imageUrl) : e.imageUrl
        };
      });
      const match = updated.find(e => e.id === id);
      if (match) {
        safeDbUpsert('event_items', {
          id: match.id,
          slug: match.slug,
          title: match.title,
          date: match.date,
          time: match.time,
          location: match.location,
          description: match.description,
          image_url: match.imageUrl,
          status: match.status,
          registration_open: match.registrationOpen,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'EventItem', id, 'Updated event details');
  }, [logAudit, safeDbUpsert]);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    logAudit('DELETE', 'EventItem', id, 'Deleted event');
    safeDbDelete('event_items', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addGalleryPhoto = useCallback((photo: Omit<GalleryPhoto, 'id'>) => {
    const id = `gal-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newPhoto: GalleryPhoto = {
      ...photo,
      id,
      imageUrl: getFreshImageUrl(photo.imageUrl)
    };
    setGallery(prev => [newPhoto, ...prev]);
    logAudit('CREATE', 'GalleryPhoto', id, `Added gallery photo: ${photo.title.en}`);

    safeDbUpsert('gallery_photos', {
      id: newPhoto.id,
      album_id: newPhoto.albumId || null,
      title: newPhoto.title,
      caption: newPhoto.caption,
      image_url: newPhoto.imageUrl,
      category: newPhoto.category,
      date: newPhoto.date,
      location: newPhoto.location,
      campaign_slug: newPhoto.campaignSlug || '',
      display_order: newPhoto.displayOrder || 0
    });

    return newPhoto;
  }, [logAudit, safeDbUpsert]);

  const updateGalleryPhoto = useCallback((id: string, photo: Partial<GalleryPhoto>) => {
    setGallery(prev => {
      const updated = prev.map(g => {
        if (g.id !== id) return g;
        return {
          ...g,
          ...photo,
          imageUrl: photo.imageUrl ? getFreshImageUrl(photo.imageUrl) : g.imageUrl
        };
      });
      const match = updated.find(g => g.id === id);
      if (match) {
        safeDbUpsert('gallery_photos', {
          id: match.id,
          album_id: match.albumId || null,
          title: match.title,
          caption: match.caption,
          image_url: match.imageUrl,
          category: match.category,
          date: match.date,
          location: match.location,
          campaign_slug: match.campaignSlug || '',
          display_order: match.displayOrder || 0
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'GalleryPhoto', id, 'Updated gallery photo metadata');
  }, [logAudit, safeDbUpsert]);

  const deleteGalleryPhoto = useCallback((id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    logAudit('DELETE', 'GalleryPhoto', id, 'Deleted photo');
    safeDbDelete('gallery_photos', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addVideo = useCallback((video: Omit<VideoItem, 'id'>) => {
    const id = `vid-${Date.now()}`;
    const det = detectAndNormalizeMedia(video.videoUrl || '');
    const cleanThumbnail = video.thumbnailUrl || det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL;
    const cleanEmbed = video.embedUrl || det.embedUrl || '';
    const cleanTitle = typeof video.title === 'string'
      ? { en: video.title, bn: video.title }
      : (video.title || { en: 'Field Video', bn: 'মাঠপর্যায়ের ভিডিও' });
    const cleanDescription = typeof video.description === 'string'
      ? { en: video.description, bn: video.description }
      : (video.description || { en: '', bn: '' });

    const isShorts = video.isShorts ?? det.isShorts;
    const aspectRatio = video.aspectRatio || det.aspectRatio || (isShorts ? '9/16' : '16/9');

    const newVid: VideoItem = {
      ...video,
      id,
      title: cleanTitle,
      description: cleanDescription,
      videoUrl: det.originalUrl || video.videoUrl,
      embedUrl: cleanEmbed,
      thumbnailUrl: getFreshImageUrl(cleanThumbnail),
      platform: video.platform || det.platform || 'youtube',
      category: video.category || 'General',
      status: video.status || 'published',
      isFeatured: video.isFeatured ?? false,
      sourceType: video.sourceType || 'url',
      aspectRatio,
      isShorts,
      date: video.date || new Date().toISOString().split('T')[0],
      duration: video.duration || (isShorts ? 'Shorts' : 'Video'),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setVideos(prev => [newVid, ...prev]);
    logAudit('CREATE', 'VideoItem', id, `Added video: ${cleanTitle.en || cleanTitle.bn}`);

    // Also mirror to mediaLibrary so it appears across media tabs and gallery
    setMediaLibrary(prev => {
      if (prev.some(m => m.id === id || m.url === newVid.videoUrl)) return prev;
      const newMedia: MediaItem = {
        id,
        fileName: cleanTitle.en || cleanTitle.bn || 'Video Asset',
        url: newVid.videoUrl,
        type: 'video',
        thumbnailUrl: newVid.thumbnailUrl,
        fileSize: 'External Stream',
        mimeType: 'video/embed',
        category: (newVid.category as any) || 'General',
        altText: cleanTitle.en || cleanTitle.bn,
        caption: cleanDescription.en || cleanDescription.bn,
        platform: newVid.platform as any,
        duration: newVid.duration,
        aspectRatio: newVid.aspectRatio,
        isShorts: newVid.isShorts,
        usageTags: ['Video Gallery', 'Field Footage'],
        uploadedAt: new Date().toISOString(),
        isFeatured: newVid.isFeatured,
        status: (newVid.status === 'draft' ? 'draft' : 'published') as 'published' | 'draft'
      };
      safeDbUpsert('media_library', {
        id: newMedia.id,
        file_name: newMedia.fileName,
        url: newMedia.url,
        file_size: newMedia.fileSize,
        mime_type: newMedia.mimeType,
        category: newMedia.category,
        alt_text: newMedia.altText,
        caption: newMedia.caption || '',
        usage_tags: newMedia.usageTags,
        uploaded_at: newMedia.uploadedAt
      });
      return [newMedia, ...prev];
    });

    safeDbUpsert('video_items', {
      id: newVid.id,
      title: newVid.title,
      video_url: newVid.videoUrl,
      embed_url: newVid.embedUrl || '',
      thumbnail_url: newVid.thumbnailUrl,
      platform: newVid.platform,
      duration: newVid.duration || '',
      date: newVid.date,
      description: newVid.description,
      category: newVid.category,
      status: newVid.status,
      is_featured: newVid.isFeatured,
      source_type: newVid.sourceType,
      aspect_ratio: newVid.aspectRatio,
      is_shorts: newVid.isShorts,
      created_at: newVid.createdAt,
      updated_at: newVid.updatedAt
    });

    return newVid;
  }, [logAudit, safeDbUpsert]);

  const updateVideo = useCallback((id: string, video: Partial<VideoItem>) => {
    setVideos(prev => {
      const updated = prev.map(v => {
        if (v.id !== id) return v;
        const nextVideoUrl = video.videoUrl !== undefined ? video.videoUrl : v.videoUrl;
        const det = detectAndNormalizeMedia(nextVideoUrl);
        const nextThumbnail = video.thumbnailUrl !== undefined
          ? (video.thumbnailUrl || det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL)
          : (v.thumbnailUrl || det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL);
        const nextEmbed = video.embedUrl !== undefined
          ? (video.embedUrl || det.embedUrl || '')
          : (v.embedUrl || det.embedUrl || '');
        const isShorts = video.isShorts !== undefined ? video.isShorts : (v.isShorts ?? det.isShorts);
        const aspectRatio = video.aspectRatio !== undefined ? video.aspectRatio : (v.aspectRatio || det.aspectRatio);

        return {
          ...v,
          ...video,
          videoUrl: det.originalUrl || nextVideoUrl,
          embedUrl: nextEmbed,
          thumbnailUrl: nextThumbnail ? getFreshImageUrl(nextThumbnail) : v.thumbnailUrl,
          aspectRatio,
          isShorts,
          updatedAt: new Date().toISOString()
        };
      });

      const match = updated.find(v => v.id === id);
      if (match) {
        safeDbUpsert('video_items', {
          id: match.id,
          title: match.title,
          video_url: match.videoUrl,
          embed_url: match.embedUrl || '',
          thumbnail_url: match.thumbnailUrl,
          platform: match.platform,
          duration: match.duration || '',
          date: match.date,
          description: match.description,
          category: match.category || 'General',
          status: match.status || 'published',
          is_featured: match.isFeatured || false,
          source_type: match.sourceType || 'url',
          aspect_ratio: match.aspectRatio || '16/9',
          is_shorts: match.isShorts || false,
          created_at: match.createdAt || new Date().toISOString(),
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'VideoItem', id, 'Updated video metadata');
  }, [logAudit, safeDbUpsert]);

  const deleteVideo = useCallback(async (id: string) => {
    deletedIdsRef.current.add(id);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}deleted_video_ids`, JSON.stringify(Array.from(deletedIdsRef.current)));
    } catch (e) {
      console.warn('Storage error on deleted_video_ids:', e);
    }

    setVideos(prev => {
      const next = prev.filter(v => v.id !== id && v.videoUrl !== id);
      try {
        localStorage.setItem(`${STORAGE_PREFIX}videos`, JSON.stringify(next));
      } catch {}
      return next;
    });

    setMediaLibrary(prev => {
      const next = prev.filter(m => m.id !== id && m.url !== id);
      try {
        localStorage.setItem(`${STORAGE_PREFIX}mediaLibrary`, JSON.stringify(next));
      } catch {}
      return next;
    });

    logAudit('DELETE', 'VideoItem', id, 'Deleted video permanently');

    if (supabase && isSupabaseConfigured) {
      try {
        const [res1, res2] = await Promise.allSettled([
          supabase.from('video_items').delete().eq('id', id),
          supabase.from('media_library').delete().eq('id', id)
        ]);
        if (res1.status === 'rejected' || (res1.status === 'fulfilled' && res1.value.error)) {
          console.error('Supabase video_items delete failed:', res1);
        }
        if (res2.status === 'rejected' || (res2.status === 'fulfilled' && res2.value.error)) {
          console.error('Supabase media_library delete failed:', res2);
        }
      } catch (err) {
        console.error('Supabase delete exception:', err);
      }
    }
  }, [logAudit]);

  const addReport = useCallback((report: Omit<TransparencyReport, 'id'>) => {
    const id = `rep-${Date.now()}`;
    const newRep: TransparencyReport = { ...report, id };
    setReports(prev => [...prev, newRep]);
    logAudit('CREATE', 'TransparencyReport', id, `Added report: ${report.title.en}`);

    safeDbUpsert('transparency_reports', {
      id: newRep.id,
      title: newRep.title,
      type: newRep.type,
      year: newRep.year,
      description: newRep.description,
      upload_date: newRep.uploadDate,
      file_url: newRep.fileUrl,
      file_size: newRep.fileSize,
      status: newRep.status,
      display_order: newRep.displayOrder || 0,
      updated_at: new Date().toISOString()
    });

    return newRep;
  }, [logAudit, safeDbUpsert]);

  const updateReport = useCallback((id: string, report: Partial<TransparencyReport>) => {
    setReports(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, ...report } : r);
      const match = updated.find(r => r.id === id);
      if (match) safeDbUpsert('transparency_reports', match);
      return updated;
    });
    logAudit('UPDATE', 'TransparencyReport', id, 'Updated report');
  }, [logAudit, safeDbUpsert]);

  const deleteReport = useCallback((id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    logAudit('DELETE', 'TransparencyReport', id, 'Deleted report');
    safeDbDelete('transparency_reports', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addPartner = useCallback((partner: Omit<Partner, 'id'>) => {
    const id = `part-${Date.now()}`;
    const newPart: Partner = {
      ...partner,
      id,
      logoUrl: partner.logoUrl ? getFreshImageUrl(partner.logoUrl) : ''
    };
    setPartners(prev => [...prev, newPart]);
    logAudit('CREATE', 'Partner', id, `Added partner: ${partner.name}`);

    safeDbUpsert('partners', {
      id: newPart.id,
      name: newPart.name,
      logo_url: newPart.logoUrl || '',
      website: newPart.website || '',
      type: newPart.type,
      description: newPart.description,
      partnership_year: newPart.partnershipYear,
      updated_at: new Date().toISOString()
    });

    return newPart;
  }, [logAudit, safeDbUpsert]);

  const updatePartner = useCallback((id: string, partner: Partial<Partner>) => {
    setPartners(prev => {
      const updated = prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...partner,
          logoUrl: partner.logoUrl ? getFreshImageUrl(partner.logoUrl) : p.logoUrl
        };
      });
      const match = updated.find(p => p.id === id);
      if (match) {
        safeDbUpsert('partners', {
          id: match.id,
          name: match.name,
          logo_url: match.logoUrl || '',
          website: match.website || '',
          type: match.type,
          description: match.description,
          partnership_year: match.partnershipYear,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'Partner', id, 'Updated partner details');
  }, [logAudit, safeDbUpsert]);

  const deletePartner = useCallback((id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Partner', id, 'Deleted partner');
    safeDbDelete('partners', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Volunteers, Donations, Messages
  const submitVolunteerApplication = useCallback((app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>): string => {
    const id = `vol-${Date.now()}`;
    const newApp: VolunteerApplication = {
      ...app,
      id,
      submittedAt: new Date().toISOString(),
      status: 'New'
    };
    setVolunteers(prev => [newApp, ...prev]);
    logAudit('SUBMIT', 'VolunteerApplication', id, `New application from ${app.fullName}`);
    safeDbUpsert('volunteer_applications', newApp);
    return id;
  }, [logAudit, safeDbUpsert]);

  const addVolunteerApplication = useCallback((app: Partial<VolunteerApplication>): string => {
    const id = app.id || `vol-${Date.now()}`;
    const newApp: VolunteerApplication = {
      id,
      fullName: app.fullName || 'Anonymous Volunteer',
      email: app.email || '',
      phone: app.phone || '',
      district: app.district || 'Chattogram',
      submittedAt: app.submittedAt || new Date().toISOString(),
      status: app.status || 'New',
      ...app
    };
    setVolunteers(prev => [newApp, ...prev]);
    logAudit('CREATE', 'VolunteerApplication', id, `Added manual volunteer record: ${newApp.fullName}`);
    safeDbUpsert('volunteer_applications', newApp);
    return id;
  }, [logAudit, safeDbUpsert]);

  const updateVolunteerStatus = useCallback((id: string, status: VolunteerApplication['status'], adminNotes?: string) => {
    setVolunteers(prev => {
      const updated = prev.map(v => v.id === id ? { ...v, status, adminNotes: adminNotes !== undefined ? adminNotes : v.adminNotes } : v);
      const match = updated.find(v => v.id === id);
      if (match) safeDbUpsert('volunteer_applications', match);
      return updated;
    });
    logAudit('UPDATE', 'VolunteerApplication', id, `Changed status to ${status}`);
  }, [logAudit, safeDbUpsert]);

  const deleteVolunteerApplication = useCallback((id: string) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
    logAudit('DELETE', 'VolunteerApplication', id, 'Deleted volunteer application');
    safeDbDelete('volunteer_applications', 'id', id);
  }, [logAudit, safeDbDelete]);

  const submitDonation = useCallback((donation: Omit<DonationRecord, 'id' | 'date' | 'status'>): string => {
    const id = `don-${Date.now()}`;
    const newDon: DonationRecord = {
      ...donation,
      id,
      date: new Date().toISOString(),
      status: 'Pending'
    };
    setDonations(prev => [newDon, ...prev]);
    logAudit('SUBMIT', 'DonationRecord', id, `Donation submitted by ${donation.donorName}: ৳${donation.amountBDT || donation.amount || 0}`);
    safeDbUpsert('donation_records', newDon);
    return id;
  }, [logAudit, safeDbUpsert]);

  const addDonationRecord = useCallback((donation: Partial<DonationRecord>): DonationRecord => {
    const id = donation.id || `don-${Date.now()}`;
    const newDon: DonationRecord = {
      id,
      donorName: donation.donorName || 'Anonymous Supporter',
      paymentMethod: donation.paymentMethod || 'bKash',
      date: donation.date || new Date().toISOString(),
      status: donation.status || 'Successful',
      ...donation
    };
    setDonations(prev => [newDon, ...prev]);
    logAudit('CREATE', 'DonationRecord', id, `Recorded donation: ৳${newDon.amountBDT || newDon.amount || 0}`);
    safeDbUpsert('donation_records', newDon);
    return newDon;
  }, [logAudit, safeDbUpsert]);

  const updateDonationStatus = useCallback((id: string, status: DonationRecord['status']) => {
    setDonations(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, status } : d);
      const match = updated.find(d => d.id === id);
      if (match) safeDbUpsert('donation_records', match);
      return updated;
    });
    logAudit('UPDATE', 'DonationRecord', id, `Changed donation status to ${status}`);
  }, [logAudit, safeDbUpsert]);

  const submitContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => {
    const id = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toISOString(),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    logAudit('SUBMIT', 'ContactMessage', id, `Received message from ${msg.name}`);
    safeDbUpsert('contact_messages', newMsg);
  }, [logAudit, safeDbUpsert]);

  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>): ContactMessage => {
    const id = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toISOString(),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    logAudit('SUBMIT', 'ContactMessage', id, `Received message from ${msg.name}`);
    safeDbUpsert('contact_messages', newMsg);
    return newMsg;
  }, [logAudit, safeDbUpsert]);

  const updateMessageStatus = useCallback((id: string, status: ContactMessage['status']) => {
    setMessages(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, status } : m);
      const match = updated.find(m => m.id === id);
      if (match) safeDbUpsert('contact_messages', match);
      return updated;
    });
    logAudit('UPDATE', 'ContactMessage', id, `Changed status to ${status}`);
  }, [logAudit, safeDbUpsert]);

  const deleteContactMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'ContactMessage', id, 'Deleted contact message');
    safeDbDelete('contact_messages', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Admin Profiles
  const addAdminProfile = useCallback((profile: Omit<AdminProfile, 'id'>): AdminProfile => {
    const id = `adm-${Date.now()}`;
    const newProf: AdminProfile = {
      ...profile,
      id,
      avatarUrl: profile.avatarUrl ? getFreshImageUrl(profile.avatarUrl) : ''
    };
    setAdminProfiles(prev => [...prev, newProf]);
    logAudit('CREATE', 'AdminProfile', id, `Added admin profile: ${profile.fullName}`);
    return newProf;
  }, [logAudit]);

  const updateAdminProfile = useCallback((id: string, profile: Partial<AdminProfile>) => {
    setAdminProfiles(prev => prev.map(p => {
      if (p.id !== id) return p;
      return {
        ...p,
        ...profile,
        avatarUrl: profile.avatarUrl ? getFreshImageUrl(profile.avatarUrl) : p.avatarUrl
      };
    }));
    logAudit('UPDATE', 'AdminProfile', id, 'Updated admin profile');
  }, [logAudit]);

  const deleteAdminProfile = useCallback((id: string) => {
    setAdminProfiles(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'AdminProfile', id, 'Deleted admin profile');
  }, [logAudit]);

  // MUTATIONS: FAQs
  const addFAQ = useCallback((faq: Omit<FAQItem, 'id'>): FAQItem => {
    const id = `faq-${Date.now()}`;
    const newFAQ: FAQItem = { ...faq, id };
    setFaqs(prev => [...prev, newFAQ]);
    logAudit('CREATE', 'FAQ', id, `Added FAQ: ${faq.question.en}`);
    safeDbUpsert('faqs', newFAQ);
    return newFAQ;
  }, [logAudit, safeDbUpsert]);

  const updateFAQ = useCallback((id: string, faq: Partial<FAQItem>) => {
    setFaqs(prev => {
      const updated = prev.map(f => f.id === id ? { ...f, ...faq } : f);
      const match = updated.find(f => f.id === id);
      if (match) safeDbUpsert('faqs', match);
      return updated;
    });
    logAudit('UPDATE', 'FAQ', id, 'Updated FAQ');
  }, [logAudit, safeDbUpsert]);

  const deleteFAQ = useCallback((id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    logAudit('DELETE', 'FAQ', id, 'Deleted FAQ');
    safeDbDelete('faqs', 'id', id);
  }, [logAudit, safeDbDelete]);

  // MUTATIONS: Committees & Leadership
  const addCommittee = useCallback((committee: Omit<Committee, 'id'>): Committee => {
    const id = `com-${Date.now()}`;
    const newCom: Committee = {
      ...committee,
      id,
      bannerImageUrl: committee.bannerImageUrl ? getFreshImageUrl(committee.bannerImageUrl) : ''
    };
    setCommittees(prev => [...prev, newCom]);
    logAudit('CREATE', 'Committee', id, `Created committee: ${committee.name.en}`);

    safeDbUpsert('committees', {
      id: newCom.id,
      slug: newCom.slug,
      name: newCom.name,
      type: newCom.type,
      year: newCom.year,
      description: newCom.description,
      status: newCom.status,
      sort_order: newCom.sortOrder,
      is_featured: newCom.isFeatured,
      banner_image_url: newCom.bannerImageUrl || '',
      updated_at: new Date().toISOString()
    });

    return newCom;
  }, [logAudit, safeDbUpsert]);

  const updateCommittee = useCallback((id: string, committee: Partial<Committee>) => {
    setCommittees(prev => {
      const updated = prev.map(c => {
        if (c.id !== id) return c;
        return {
          ...c,
          ...committee,
          bannerImageUrl: committee.bannerImageUrl ? getFreshImageUrl(committee.bannerImageUrl) : c.bannerImageUrl
        };
      });
      const match = updated.find(c => c.id === id);
      if (match) {
        safeDbUpsert('committees', {
          id: match.id,
          slug: match.slug,
          name: match.name,
          type: match.type,
          year: match.year,
          description: match.description,
          status: match.status,
          sort_order: match.sortOrder,
          is_featured: match.isFeatured,
          banner_image_url: match.bannerImageUrl || '',
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'Committee', id, 'Updated committee information');
  }, [logAudit, safeDbUpsert]);

  const deleteCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.filter(c => c.id !== id));
    setCommitteeMembers(prev => prev.filter(m => m.committeeId !== id));
    logAudit('DELETE', 'Committee', id, 'Deleted committee and linked member mappings');
    safeDbDelete('committees', 'id', id);
  }, [logAudit, safeDbDelete]);

  const archiveCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.map(c => c.id === id ? { ...c, status: 'ARCHIVED' } : c));
    logAudit('UPDATE', 'Committee', id, 'Archived committee');
  }, [logAudit]);

  const setActiveCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.map(c => ({
      ...c,
      status: c.id === id ? 'ACTIVE' : (c.status === 'ACTIVE' ? 'ARCHIVED' : c.status)
    })));
    logAudit('UPDATE', 'Committee', id, 'Set as current active executive committee');
  }, [logAudit]);

  const addPerson = useCallback((person: Omit<Person, 'id'>): Person => {
    const id = `per-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newPerson: Person = {
      ...person,
      id,
      photoUrl: person.photoUrl ? getFreshImageUrl(person.photoUrl) : ''
    };
    setPersons(prev => [...prev, newPerson]);
    logAudit('CREATE', 'Person', id, `Added person: ${person.englishName}`);

    safeDbUpsert('persons', {
      id: newPerson.id,
      full_name: newPerson.fullName,
      bangla_name: newPerson.banglaName,
      english_name: newPerson.englishName,
      photo_url: newPerson.photoUrl || '',
      photo_position: newPerson.photoPosition || 'center top',
      photo_zoom: newPerson.photoZoom || 1.0,
      short_bio: newPerson.shortBio,
      full_bio: newPerson.fullBio,
      district: newPerson.district || '',
      facebook_url: newPerson.facebookUrl || '',
      linkedin_url: newPerson.linkedinUrl || '',
      email: newPerson.email || '',
      phone: newPerson.phone || '',
      social_links: newPerson.socialLinks,
      joining_year: newPerson.joiningYear || '',
      active: newPerson.active,
      updated_at: new Date().toISOString()
    });

    return newPerson;
  }, [logAudit, safeDbUpsert]);

  const updatePerson = useCallback((id: string, person: Partial<Person>) => {
    setPersons(prev => {
      const updated = prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          ...person,
          photoUrl: person.photoUrl ? getFreshImageUrl(person.photoUrl) : p.photoUrl
        };
      });
      const match = updated.find(p => p.id === id);
      if (match) {
        safeDbUpsert('persons', {
          id: match.id,
          full_name: match.fullName,
          bangla_name: match.banglaName,
          english_name: match.englishName,
          photo_url: match.photoUrl || '',
          photo_position: match.photoPosition || 'center top',
          photo_zoom: match.photoZoom || 1.0,
          short_bio: match.shortBio,
          full_bio: match.fullBio,
          district: match.district || '',
          facebook_url: match.facebookUrl || '',
          linkedin_url: match.linkedinUrl || '',
          email: match.email || '',
          phone: match.phone || '',
          social_links: match.socialLinks,
          joining_year: match.joiningYear || '',
          active: match.active,
          updated_at: new Date().toISOString()
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'Person', id, 'Updated person profile/photo');
  }, [logAudit, safeDbUpsert]);

  const deletePerson = useCallback((id: string) => {
    setPersons(prev => prev.filter(p => p.id !== id));
    setCommitteeMembers(prev => prev.filter(m => m.personId !== id));
    logAudit('DELETE', 'Person', id, 'Deleted person profile');
    safeDbDelete('persons', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addPosition = useCallback((pos: Omit<Position, 'id'>): Position => {
    const id = `pos-${Date.now()}`;
    const newPos: Position = { ...pos, id };
    setPositions(prev => [...prev, newPos]);
    logAudit('CREATE', 'Position', id, `Added position: ${pos.name.en}`);
    safeDbUpsert('positions', newPos);
    return newPos;
  }, [logAudit, safeDbUpsert]);

  const updatePosition = useCallback((id: string, pos: Partial<Position>) => {
    setPositions(prev => {
      const updated = prev.map(p => p.id === id ? { ...p, ...pos } : p);
      const match = updated.find(p => p.id === id);
      if (match) safeDbUpsert('positions', match);
      return updated;
    });
    logAudit('UPDATE', 'Position', id, 'Updated position');
  }, [logAudit, safeDbUpsert]);

  const deletePosition = useCallback((id: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Position', id, 'Deleted position');
    safeDbDelete('positions', 'id', id);
  }, [logAudit, safeDbDelete]);

  const addCommitteeMember = useCallback((member: Omit<CommitteeMember, 'id'>): CommitteeMember => {
    const id = `cm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newMem: CommitteeMember = { ...member, id };
    setCommitteeMembers(prev => [...prev, newMem]);
    logAudit('CREATE', 'CommitteeMember', id, `Added member to committee ${member.committeeId}`);

    safeDbUpsert('committee_members', {
      id: newMem.id,
      committee_id: newMem.committeeId,
      person_id: newMem.personId,
      position_id: newMem.positionId,
      serial_number: newMem.serialNumber,
      sort_order: newMem.sortOrder,
      is_featured_leader: newMem.isFeaturedLeader,
      start_date: newMem.startDate || '',
      end_date: newMem.endDate || '',
      status: newMem.status
    });

    return newMem;
  }, [logAudit, safeDbUpsert]);

  const updateCommitteeMember = useCallback((id: string, member: Partial<CommitteeMember>) => {
    setCommitteeMembers(prev => {
      const updated = prev.map(m => m.id === id ? { ...m, ...member } : m);
      const match = updated.find(m => m.id === id);
      if (match) {
        safeDbUpsert('committee_members', {
          id: match.id,
          committee_id: match.committeeId,
          person_id: match.personId,
          position_id: match.positionId,
          serial_number: match.serialNumber,
          sort_order: match.sortOrder,
          is_featured_leader: match.isFeaturedLeader,
          start_date: match.startDate || '',
          end_date: match.endDate || '',
          status: match.status
        });
      }
      return updated;
    });
    logAudit('UPDATE', 'CommitteeMember', id, 'Updated committee member assignment');
  }, [logAudit, safeDbUpsert]);

  const deleteCommitteeMember = useCallback((id: string) => {
    setCommitteeMembers(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'CommitteeMember', id, 'Removed member from committee');
    safeDbDelete('committee_members', 'id', id);
  }, [logAudit, safeDbDelete]);

  const reorderCommitteeMembers = useCallback((committeeId: string, orderedMemberIds: string[]) => {
    setCommitteeMembers(prev => {
      return prev.map(m => {
        if (m.committeeId === committeeId) {
          const index = orderedMemberIds.indexOf(m.id);
          if (index !== -1) {
            const newOrder = index + 1;
            safeDbUpsert('committee_members', {
              id: m.id,
              committee_id: m.committeeId,
              person_id: m.personId,
              position_id: m.positionId,
              serial_number: newOrder,
              sort_order: newOrder,
              is_featured_leader: m.isFeaturedLeader,
              status: m.status
            });
            return {
              ...m,
              serialNumber: newOrder,
              sortOrder: newOrder
            };
          }
        }
        return m;
      });
    });
    logAudit('UPDATE', 'CommitteeMembers', committeeId, 'Reordered committee members lineup');
  }, [logAudit, safeDbUpsert]);

  const getMembersWithDetails = useCallback((committeeId?: string) => {
    const filtered = committeeId
      ? committeeMembers.filter(m => m.committeeId === committeeId)
      : committeeMembers;

    return filtered
      .map(m => {
        const person = persons.find(p => p.id === m.personId) || {
          id: m.personId,
          fullName: 'Unknown Member',
          banglaName: 'সদস্য',
          englishName: 'Unknown Member',
          active: true
        };
        const position = positions.find(pos => pos.id === m.positionId) || {
          id: m.positionId,
          name: { en: 'Executive Member', bn: 'কার্যনির্বাহী সদস্য' },
          level: 5,
          sortOrder: 20
        };
        const committee = committees.find(c => c.id === m.committeeId);
        return {
          ...m,
          person,
          position,
          committee
        };
      })
      .sort((a, b) => (a.sortOrder || a.serialNumber || 0) - (b.sortOrder || b.serialNumber || 0));
  }, [committeeMembers, persons, positions, committees]);

  // GLOBAL DATABASE BACKUP, EXPORT & IMPORT
  const exportDatabaseJSON = useCallback(() => {
    const data = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      organization: 'Infinity Bangladesh',
      slogan: 'United for Humanity',
      settings,
      homepageConfig,
      aboutSettings,
      headerSettings,
      footerSettings,
      socialLinks,
      volunteerSettings,
      supportSettings,
      contactSettings,
      seoSettings,
      navigationItems,
      banners,
      mediaLibrary,
      galleryAlbums,
      pressCoverages,
      adminProfiles,
      campaigns,
      programs,
      metrics,
      stories,
      news,
      events,
      gallery,
      videos,
      reports,
      partners,
      volunteers,
      donations,
      messages,
      committees,
      persons,
      positions,
      committeeMembers,
      auditLogs
    };
    return JSON.stringify(data, null, 2);
  }, [
    settings, homepageConfig, aboutSettings, headerSettings, footerSettings,
    socialLinks, volunteerSettings, supportSettings, contactSettings, seoSettings,
    navigationItems, banners, mediaLibrary, galleryAlbums, pressCoverages, adminProfiles,
    campaigns, programs, metrics, stories, news, events, gallery, videos,
    reports, partners, volunteers, donations, messages, committees,
    persons, positions, committeeMembers, auditLogs
  ]);

  const importDatabaseJSON = useCallback((jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.homepageConfig) setHomepageConfig(parsed.homepageConfig);
      if (parsed.aboutSettings) setAboutSettings(parsed.aboutSettings);
      if (parsed.headerSettings) setHeaderSettings(parsed.headerSettings);
      if (parsed.footerSettings) setFooterSettings(parsed.footerSettings);
      if (parsed.socialLinks) setSocialLinks(parsed.socialLinks);
      if (parsed.volunteerSettings) setVolunteerSettings(parsed.volunteerSettings);
      if (parsed.supportSettings) setSupportSettings(parsed.supportSettings);
      if (parsed.contactSettings) setContactSettings(parsed.contactSettings);
      if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      if (parsed.navigationItems) setNavigationItems(parsed.navigationItems);
      if (parsed.banners) setBanners(parsed.banners);
      if (parsed.mediaLibrary) setMediaLibrary(parsed.mediaLibrary);
      if (parsed.galleryAlbums) setGalleryAlbums(parsed.galleryAlbums);
      if (parsed.pressCoverages) setPressCoverages(parsed.pressCoverages);
      if (parsed.adminProfiles) setAdminProfiles(parsed.adminProfiles);
      if (parsed.campaigns) setCampaigns(parsed.campaigns);
      if (parsed.programs) setPrograms(parsed.programs);
      if (parsed.metrics) setMetrics(parsed.metrics);
      if (parsed.stories) setStories(parsed.stories);
      if (parsed.news) setNews(parsed.news);
      if (parsed.events) setEvents(parsed.events);
      if (parsed.gallery) setGallery(parsed.gallery);
      if (parsed.videos) setVideos(parsed.videos);
      if (parsed.reports) setReports(parsed.reports);
      if (parsed.partners) setPartners(parsed.partners);
      if (parsed.volunteers) setVolunteers(parsed.volunteers);
      if (parsed.donations) setDonations(parsed.donations);
      if (parsed.messages) setMessages(parsed.messages);
      if (parsed.committees) setCommittees(parsed.committees);
      if (parsed.persons) setPersons(parsed.persons);
      if (parsed.positions) setPositions(parsed.positions);
      if (parsed.committeeMembers) setCommitteeMembers(parsed.committeeMembers);

      logAudit('IMPORT', 'Database', 'full_restore', 'Restored complete database snapshot from JSON backup');
      return true;
    } catch (err) {
      console.error('Import failed:', err);
      return false;
    }
  }, [logAudit]);

  const resetToDefaultData = useCallback(() => {
    setSettings(INITIAL_SITE_SETTINGS);
    setHomepageConfig(INITIAL_HOMEPAGE_CONFIG);
    setAboutSettings(INITIAL_ABOUT_SETTINGS);
    setHeaderSettings(INITIAL_HEADER_SETTINGS);
    setFooterSettings(INITIAL_FOOTER_SETTINGS);
    setSocialLinks(INITIAL_SOCIAL_LINKS);
    setVolunteerSettings(INITIAL_VOLUNTEER_SETTINGS);
    setSupportSettings(INITIAL_SUPPORT_SETTINGS);
    setContactSettings(INITIAL_CONTACT_SETTINGS);
    setSeoSettings(INITIAL_SEO_SETTINGS);
    setNavigationItems(INITIAL_NAVIGATION_ITEMS);
    setBanners(INITIAL_BANNERS);
    setMediaLibrary(INITIAL_MEDIA_LIBRARY);
    setGalleryAlbums(INITIAL_GALLERY_ALBUMS);
    setPressCoverages(INITIAL_PRESS_COVERAGE);
    setAdminProfiles(INITIAL_ADMIN_PROFILES);
    setCampaigns(INITIAL_CAMPAIGNS);
    setPrograms(INITIAL_PROGRAMS);
    setMetrics(INITIAL_IMPACT_METRICS);
    setStories(INITIAL_IMPACT_STORIES);
    setNews(INITIAL_NEWS);
    setEvents(INITIAL_EVENTS);
    setGallery(INITIAL_GALLERY);
    setVideos(INITIAL_VIDEOS);
    setReports(INITIAL_REPORTS);
    setPartners(INITIAL_PARTNERS);
    setVolunteers(INITIAL_VOLUNTEER_APPLICATIONS);
    setDonations(INITIAL_DONATIONS);
    setMessages([]);
    setCommittees(INITIAL_COMMITTEES);
    setPersons(INITIAL_PERSONS);
    setPositions(INITIAL_POSITIONS);
    setCommitteeMembers(INITIAL_COMMITTEE_MEMBERS);
    setAuditLogs([]);

    // Clear local storage keys
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(STORAGE_PREFIX) || key.startsWith('infinity_bd_')) {
        localStorage.removeItem(key);
      }
    });

    logAudit('RESET', 'Database', 'factory_reset', 'Reset all CMS entities to verified official defaults');
  }, [logAudit]);

  return (
    <DataContext.Provider
      value={{
        campaigns,
        programs,
        metrics,
        stories,
        news,
        events,
        gallery,
        videos,
        reports,
        partners,
        volunteers,
        donations,
        messages,
        faqs,
        settings,
        homepageConfig,
        aboutSettings,
        headerSettings,
        footerSettings,
        socialLinks,
        volunteerSettings,
        supportSettings,
        contactSettings,
        seoSettings,
        navigationItems,
        banners,
        mediaLibrary,
        galleryAlbums,
        pressCoverages,
        adminProfiles,
        auditLogs,
        committees,
        persons,
        positions,
        committeeMembers,

        isLiveSupabase: isSupabaseConfigured,
        isSyncing,
        lastSyncedAt,
        previewMode,

        updateHomepageConfig,
        updateAboutSettings,
        updateHeaderSettings,
        updateFooterSettings,
        updateVolunteerSettings,
        updateSupportSettings,
        updateContactSettings,
        updateSEOSettings,
        updateSettings,

        addFAQ,
        updateFAQ,
        deleteFAQ,

        addContactMessage,

        addSocialLink,
        updateSocialLink,
        deleteSocialLink,

        addNavigationItem,
        updateNavigationItem,
        deleteNavigationItem,
        reorderNavigationItems,

        addBanner,
        updateBanner,
        deleteBanner,

        addMediaItem,
        updateMediaItem,
        deleteMediaItem,
        addGalleryAlbum,
        updateGalleryAlbum,
        deleteGalleryAlbum,
        setAlbumPhotos,

        addPressCoverage,
        updatePressCoverage,
        deletePressCoverage,

        addCampaign,
        updateCampaign,
        deleteCampaign,

        addProgram,
        updateProgram,
        deleteProgram,

        addMetric,
        updateMetric,
        deleteMetric,

        addStory,
        updateStory,
        deleteStory,

        addNews,
        updateNews,
        deleteNews,

        addEvent,
        updateEvent,
        deleteEvent,

        addGalleryPhoto,
        updateGalleryPhoto,
        deleteGalleryPhoto,

        addVideo,
        updateVideo,
        deleteVideo,

        addReport,
        updateReport,
        deleteReport,

        addPartner,
        updatePartner,
        deletePartner,

        submitVolunteerApplication,
        addVolunteerApplication,
        updateVolunteerStatus,
        deleteVolunteerApplication,

        submitDonation,
        addDonationRecord,
        updateDonationStatus,

        submitContactMessage,
        updateMessageStatus,
        deleteContactMessage,

        addAdminProfile,
        updateAdminProfile,
        deleteAdminProfile,

        addCommittee,
        updateCommittee,
        deleteCommittee,
        archiveCommittee,
        setActiveCommittee,

        addPerson,
        updatePerson,
        deletePerson,

        addPosition,
        updatePosition,
        deletePosition,

        addCommitteeMember,
        updateCommitteeMember,
        deleteCommitteeMember,
        reorderCommitteeMembers,
        getMembersWithDetails,

        setPreviewMode,
        syncWithSupabase,
        pushAllToSupabase,
        resetToDefaultData,
        exportDatabaseJSON,
        importDatabaseJSON
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
