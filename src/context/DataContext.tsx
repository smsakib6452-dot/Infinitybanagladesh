import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  FAQItem
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
  INITIAL_FAQS
} from '../data/initialData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

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
  adminProfiles: AdminProfile[];
  auditLogs: AuditLog[];
  committees: Committee[];
  persons: Person[];
  positions: Position[];
  committeeMembers: CommitteeMember[];

  // System & Connection State
  isLiveSupabase: boolean;
  isSyncing: boolean;
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
  deleteGalleryPhoto: (id: string) => void;

  addVideo: (video: Omit<VideoItem, 'id'>) => VideoItem;
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
  const [previewMode, setPreviewMode] = useState(false);

  // 1. Site Settings & Global Configurations
  const [settings, setSettings] = useState<SiteSettings>(() => getStoredOrDefault('settings', INITIAL_SITE_SETTINGS));
  const [homepageConfig, setHomepageConfig] = useState<HomepageConfig>(() => getStoredOrDefault('homepageConfig', INITIAL_HOMEPAGE_CONFIG));
  const [aboutSettings, setAboutSettings] = useState<AboutSettings>(() => getStoredOrDefault('aboutSettings', INITIAL_ABOUT_SETTINGS));
  const [headerSettings, setHeaderSettings] = useState<HeaderSettings>(() => getStoredOrDefault('headerSettings', INITIAL_HEADER_SETTINGS));
  const [footerSettings, setFooterSettings] = useState<FooterSettings>(() => getStoredOrDefault('footerSettings', INITIAL_FOOTER_SETTINGS));
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => getStoredOrDefault('socialLinks', INITIAL_SOCIAL_LINKS));
  const [volunteerSettings, setVolunteerSettings] = useState<VolunteerSettings>(() => getStoredOrDefault('volunteerSettings', INITIAL_VOLUNTEER_SETTINGS));
  const [supportSettings, setSupportSettings] = useState<SupportSettings>(() => getStoredOrDefault('supportSettings', INITIAL_SUPPORT_SETTINGS));
  const [contactSettings, setContactSettings] = useState<ContactSettings>(() => getStoredOrDefault('contactSettings', INITIAL_CONTACT_SETTINGS));
  const [seoSettings, setSeoSettings] = useState<GlobalSEOSettings>(() => getStoredOrDefault('seoSettings', INITIAL_SEO_SETTINGS));
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>(() => getStoredOrDefault('navigationItems', INITIAL_NAVIGATION_ITEMS));
  const [banners, setBanners] = useState<BannerItem[]>(() => getStoredOrDefault('banners', INITIAL_BANNERS));
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>(() => getStoredOrDefault('mediaLibrary', INITIAL_MEDIA_LIBRARY));
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
  const [videos, setVideos] = useState<VideoItem[]>(() => getStoredOrDefault('videos', INITIAL_VIDEOS));
  const [reports, setReports] = useState<TransparencyReport[]>(() => getStoredOrDefault('reports', INITIAL_REPORTS));
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
    navigationItems, banners, mediaLibrary, galleryAlbums, adminProfiles,
    campaigns, programs, metrics, stories, news, events, gallery, videos,
    reports, partners, volunteers, donations, messages, faqs, auditLogs,
    committees, persons, positions, committeeMembers
  ]);

  // Audit Logging helper
  const logAudit = useCallback((action: string, entity: string, entityId: string, details: string) => {
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      user: 'Administrator',
      action,
      entity,
      entityId,
      details,
      timestamp: new Date().toISOString()
    };
    setAuditLogs(prev => [newLog, ...prev.slice(0, 99)]);
  }, []);

  // Supabase Fetch & Sync implementation
  const syncWithSupabase = useCallback(async () => {
    if (!supabase || !isSupabaseConfigured) return;

    try {
      setIsSyncing(true);

      // 1. Fetch site settings
      const { data: siteData } = await supabase.from('site_settings').select('*').single();
      if (siteData) {
        setSettings(prev => ({ ...prev, ...siteData }));
      }

      // 2. Fetch homepage config
      const { data: homeData } = await supabase.from('homepage_config').select('*').single();
      if (homeData) {
        setHomepageConfig(prev => ({
          ...prev,
          hero: homeData.hero || prev.hero,
          aboutPreview: homeData.about_preview || prev.aboutPreview,
          sectionOrder: homeData.section_order || prev.sectionOrder,
          sectionVisibility: homeData.section_visibility || prev.sectionVisibility
        }));
      }

      // 3. Fetch campaigns
      const { data: campData } = await supabase.from('campaigns').select('*').order('created_at', { ascending: false });
      if (campData && campData.length > 0) {
        const mappedCampaigns: Campaign[] = campData.map(c => ({
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
          imageUrl: c.image_url,
          galleryImages: c.gallery_images || [],
          videoUrl: c.video_url,
          reportUrl: c.report_url
        }));
        setCampaigns(mappedCampaigns);
      }

      // 4. Fetch stories
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
          imageUrl: s.image_url,
          campaignSlug: s.campaign_slug,
          consentConfirmed: s.consent_confirmed,
          isFeatured: s.is_featured,
          status: s.status
        })));
      }

      // 5. Fetch media library
      const { data: mediaData } = await supabase.from('media_library').select('*').order('created_at', { ascending: false });
      if (mediaData && mediaData.length > 0) {
        setMediaLibrary(mediaData.map(m => ({
          id: m.id,
          fileName: m.file_name,
          url: m.url,
          fileSize: m.file_size,
          mimeType: m.mime_type,
          category: m.category,
          altText: m.alt_text,
          caption: m.caption,
          uploadedAt: m.uploaded_at || m.created_at,
          usageTags: m.usage_tags || []
        })));
      }
    } catch (err) {
      console.error('Supabase sync exception:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Sync on initial mount if Supabase is configured
  useEffect(() => {
    if (isSupabaseConfigured) {
      syncWithSupabase();
    }
  }, [syncWithSupabase]);

  // MUTATIONS: Global Settings
  const updateHomepageConfig = useCallback((newConfig: Partial<HomepageConfig>) => {
    setHomepageConfig(prev => {
      const updated = {
        ...prev,
        ...newConfig,
        hero: newConfig.hero ? { ...prev.hero, ...newConfig.hero } : prev.hero,
        aboutPreview: newConfig.aboutPreview ? { ...prev.aboutPreview, ...newConfig.aboutPreview } : prev.aboutPreview,
        sectionVisibility: newConfig.sectionVisibility ? { ...prev.sectionVisibility, ...newConfig.sectionVisibility } : prev.sectionVisibility
      };
      logAudit('UPDATE', 'HomepageConfig', 'homepage', 'Updated homepage hero, sections, or visibility');

      // Async write to Supabase if live
      if (supabase && isSupabaseConfigured) {
        supabase.from('homepage_config').upsert({
          id: 'default',
          hero: updated.hero,
          about_preview: updated.aboutPreview,
          section_order: updated.sectionOrder,
          section_visibility: updated.sectionVisibility,
          updated_at: new Date().toISOString()
        }).then(({ error }) => {
          if (error) console.error('Supabase homepage_config write error:', error);
        });
      }

      return updated;
    });
  }, [logAudit]);

  const updateAboutSettings = useCallback((newSettings: Partial<AboutSettings>) => {
    setAboutSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'AboutSettings', 'about', 'Updated organization about settings');
      return updated;
    });
  }, [logAudit]);

  const updateHeaderSettings = useCallback((newSettings: Partial<HeaderSettings>) => {
    setHeaderSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'HeaderSettings', 'header', 'Updated header notice bar or navigation settings');
      return updated;
    });
  }, [logAudit]);

  const updateFooterSettings = useCallback((newSettings: Partial<FooterSettings>) => {
    setFooterSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'FooterSettings', 'footer', 'Updated footer text, address, or copyright');
      return updated;
    });
  }, [logAudit]);

  const updateVolunteerSettings = useCallback((newSettings: Partial<VolunteerSettings>) => {
    setVolunteerSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'VolunteerSettings', 'volunteer', 'Updated volunteer CTA, benefits or form link');
      return updated;
    });
  }, [logAudit]);

  const updateSupportSettings = useCallback((newSettings: Partial<SupportSettings>) => {
    setSupportSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'SupportSettings', 'support', 'Updated payment instructions, bKash, Nagad or bank details');
      return updated;
    });
  }, [logAudit]);

  const updateContactSettings = useCallback((newSettings: Partial<ContactSettings>) => {
    setContactSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'ContactSettings', 'contact', 'Updated official contact phone, email or address');
      return updated;
    });
  }, [logAudit]);

  const updateSEOSettings = useCallback((newSettings: Partial<GlobalSEOSettings>) => {
    setSeoSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'SEOSettings', 'seo', 'Updated global SEO meta tags');
      return updated;
    });
  }, [logAudit]);

  const updateSettings = useCallback((newSettings: Partial<SiteSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      logAudit('UPDATE', 'SiteSettings', 'site', 'Updated main site settings');
      return updated;
    });
  }, [logAudit]);

  // MUTATIONS: Social Links
  const addSocialLink = useCallback((link: Omit<SocialLink, 'id'>) => {
    const id = `soc-${Date.now()}`;
    const newLink: SocialLink = { ...link, id };
    setSocialLinks(prev => [...prev, newLink]);
    logAudit('CREATE', 'SocialLink', id, `Added ${link.platform} link`);
  }, [logAudit]);

  const updateSocialLink = useCallback((id: string, link: Partial<SocialLink>) => {
    setSocialLinks(prev => prev.map(s => s.id === id ? { ...s, ...link } : s));
    logAudit('UPDATE', 'SocialLink', id, 'Updated social link details');
  }, [logAudit]);

  const deleteSocialLink = useCallback((id: string) => {
    setSocialLinks(prev => prev.filter(s => s.id !== id));
    logAudit('DELETE', 'SocialLink', id, 'Deleted social link');
  }, [logAudit]);

  // MUTATIONS: Navigation Items
  const addNavigationItem = useCallback((item: Omit<NavigationItem, 'id'>) => {
    const id = `nav-${Date.now()}`;
    const newItem: NavigationItem = { ...item, id };
    setNavigationItems(prev => [...prev, newItem]);
    logAudit('CREATE', 'NavigationItem', id, `Added navigation link: ${item.label.en}`);
  }, [logAudit]);

  const updateNavigationItem = useCallback((id: string, item: Partial<NavigationItem>) => {
    setNavigationItems(prev => prev.map(n => n.id === id ? { ...n, ...item } : n));
    logAudit('UPDATE', 'NavigationItem', id, 'Updated navigation item');
  }, [logAudit]);

  const deleteNavigationItem = useCallback((id: string) => {
    setNavigationItems(prev => prev.filter(n => n.id !== id));
    logAudit('DELETE', 'NavigationItem', id, 'Deleted navigation item');
  }, [logAudit]);

  const reorderNavigationItems = useCallback((items: NavigationItem[]) => {
    setNavigationItems(items);
    logAudit('UPDATE', 'NavigationItems', 'reorder', 'Reordered navigation menu items');
  }, [logAudit]);

  // MUTATIONS: Banners
  const addBanner = useCallback((banner: Omit<BannerItem, 'id'>) => {
    const id = `ban-${Date.now()}`;
    const newBanner: BannerItem = { ...banner, id };
    setBanners(prev => [...prev, newBanner]);
    logAudit('CREATE', 'BannerItem', id, `Created banner: ${banner.title.en}`);
  }, [logAudit]);

  const updateBanner = useCallback((id: string, banner: Partial<BannerItem>) => {
    setBanners(prev => prev.map(b => b.id === id ? { ...b, ...banner } : b));
    logAudit('UPDATE', 'BannerItem', id, 'Updated banner details');
  }, [logAudit]);

  const deleteBanner = useCallback((id: string) => {
    setBanners(prev => prev.filter(b => b.id !== id));
    logAudit('DELETE', 'BannerItem', id, 'Deleted banner');
  }, [logAudit]);

  // MUTATIONS: Media Library & Albums
  const addMediaItem = useCallback((media: Omit<MediaItem, 'id' | 'uploadedAt'>) => {
    const id = `med-${Date.now()}`;
    const newMedia: MediaItem = {
      ...media,
      id,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaLibrary(prev => [newMedia, ...prev]);
    logAudit('CREATE', 'MediaItem', id, `Uploaded media: ${media.fileName}`);
    return newMedia;
  }, [logAudit]);

  const updateMediaItem = useCallback((id: string, media: Partial<MediaItem>) => {
    setMediaLibrary(prev => prev.map(m => m.id === id ? { ...m, ...media } : m));
    logAudit('UPDATE', 'MediaItem', id, 'Updated media metadata/alt-text');
  }, [logAudit]);

  const deleteMediaItem = useCallback((id: string) => {
    setMediaLibrary(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'MediaItem', id, 'Deleted media asset');
  }, [logAudit]);

  const addGalleryAlbum = useCallback((album: Omit<GalleryAlbum, 'id'>) => {
    const id = `alb-${Date.now()}`;
    const newAlbum: GalleryAlbum = { ...album, id };
    setGalleryAlbums(prev => [...prev, newAlbum]);
    logAudit('CREATE', 'GalleryAlbum', id, `Created album: ${album.title.en}`);
    return newAlbum;
  }, [logAudit]);

  const updateGalleryAlbum = useCallback((id: string, album: Partial<GalleryAlbum>) => {
    setGalleryAlbums(prev => prev.map(a => a.id === id ? { ...a, ...album } : a));
    logAudit('UPDATE', 'GalleryAlbum', id, 'Updated album details');
  }, [logAudit]);

  const deleteGalleryAlbum = useCallback((id: string) => {
    setGalleryAlbums(prev => prev.filter(a => a.id !== id));
    logAudit('DELETE', 'GalleryAlbum', id, 'Deleted gallery album');
  }, [logAudit]);

  // MUTATIONS: Campaigns
  const addCampaign = useCallback((campaign: Omit<Campaign, 'id'>) => {
    const id = `camp-${Date.now()}`;
    const newCampaign: Campaign = { ...campaign, id };
    setCampaigns(prev => [newCampaign, ...prev]);
    logAudit('CREATE', 'Campaign', id, `Added campaign: ${campaign.title.en}`);

    if (supabase && isSupabaseConfigured) {
      supabase.from('campaigns').insert({
        id,
        slug: campaign.slug,
        title: campaign.title,
        date: campaign.date,
        location: campaign.location,
        category: campaign.category,
        description: campaign.description,
        details: campaign.details,
        objectives: campaign.objectives,
        activities: campaign.activities,
        beneficiaries: campaign.beneficiaries,
        impact: campaign.impact,
        status: campaign.status,
        is_featured: campaign.isFeatured,
        image_url: campaign.imageUrl,
        gallery_images: campaign.galleryImages,
        created_at: new Date().toISOString()
      }).then(({ error }) => {
        if (error) console.error('Supabase campaign insert error:', error);
      });
    }

    return newCampaign;
  }, [logAudit]);

  const updateCampaign = useCallback((id: string, updatedFields: Partial<Campaign>) => {
    setCampaigns(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    logAudit('UPDATE', 'Campaign', id, 'Updated campaign details');

    if (supabase && isSupabaseConfigured) {
      supabase.from('campaigns').update({
        ...updatedFields,
        updated_at: new Date().toISOString()
      }).eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase campaign update error:', error);
      });
    }
  }, [logAudit]);

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== id));
    logAudit('DELETE', 'Campaign', id, 'Deleted campaign');

    if (supabase && isSupabaseConfigured) {
      supabase.from('campaigns').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase campaign delete error:', error);
      });
    }
  }, [logAudit]);

  // MUTATIONS: Programs
  const addProgram = useCallback((program: Omit<Program, 'id'>) => {
    const id = `prog-${Date.now()}`;
    const newProg: Program = { ...program, id };
    setPrograms(prev => [...prev, newProg]);
    logAudit('CREATE', 'Program', id, `Added program: ${program.title.en}`);
    return newProg;
  }, [logAudit]);

  const updateProgram = useCallback((id: string, updatedFields: Partial<Program>) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    logAudit('UPDATE', 'Program', id, 'Updated program details');
  }, [logAudit]);

  const deleteProgram = useCallback((id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Program', id, 'Deleted program');
  }, [logAudit]);

  // MUTATIONS: Metrics
  const addMetric = useCallback((metric: Omit<ImpactMetric, 'id'>) => {
    const id = `metric-${Date.now()}`;
    const newMetric: ImpactMetric = { ...metric, id };
    setMetrics(prev => [...prev, newMetric]);
    logAudit('CREATE', 'ImpactMetric', id, `Added metric: ${metric.label.en}`);
    return newMetric;
  }, [logAudit]);

  const updateMetric = useCallback((id: string, updatedFields: Partial<ImpactMetric>) => {
    setMetrics(prev => prev.map(m => m.id === id ? { ...m, ...updatedFields } : m));
    logAudit('UPDATE', 'ImpactMetric', id, 'Updated impact metric value/label');
  }, [logAudit]);

  const deleteMetric = useCallback((id: string) => {
    setMetrics(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'ImpactMetric', id, 'Deleted metric');
  }, [logAudit]);

  // MUTATIONS: Stories
  const addStory = useCallback((story: Omit<ImpactStory, 'id'>) => {
    const id = `story-${Date.now()}`;
    const newStory: ImpactStory = { ...story, id };
    setStories(prev => [newStory, ...prev]);
    logAudit('CREATE', 'ImpactStory', id, `Added story: ${story.title.en}`);
    return newStory;
  }, [logAudit]);

  const updateStory = useCallback((id: string, updatedFields: Partial<ImpactStory>) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, ...updatedFields } : s));
    logAudit('UPDATE', 'ImpactStory', id, 'Updated story content');
  }, [logAudit]);

  const deleteStory = useCallback((id: string) => {
    setStories(prev => prev.filter(s => s.id !== id));
    logAudit('DELETE', 'ImpactStory', id, 'Deleted story');
  }, [logAudit]);

  // MUTATIONS: News
  const addNews = useCallback((newsItem: Omit<NewsArticle, 'id'>) => {
    const id = `news-${Date.now()}`;
    const newArticle: NewsArticle = { ...newsItem, id };
    setNews(prev => [newArticle, ...prev]);
    logAudit('CREATE', 'NewsArticle', id, `Published news article: ${newsItem.title.en}`);
    return newArticle;
  }, [logAudit]);

  const updateNews = useCallback((id: string, updatedFields: Partial<NewsArticle>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updatedFields } : n));
    logAudit('UPDATE', 'NewsArticle', id, 'Updated news article');
  }, [logAudit]);

  const deleteNews = useCallback((id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
    logAudit('DELETE', 'NewsArticle', id, 'Deleted news article');
  }, [logAudit]);

  // MUTATIONS: Events
  const addEvent = useCallback((eventItem: Omit<EventItem, 'id'>) => {
    const id = `event-${Date.now()}`;
    const newEv: EventItem = { ...eventItem, id };
    setEvents(prev => [...prev, newEv]);
    logAudit('CREATE', 'EventItem', id, `Added event: ${eventItem.title.en}`);
    return newEv;
  }, [logAudit]);

  const updateEvent = useCallback((id: string, updatedFields: Partial<EventItem>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updatedFields } : e));
    logAudit('UPDATE', 'EventItem', id, 'Updated event details');
  }, [logAudit]);

  const deleteEvent = useCallback((id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
    logAudit('DELETE', 'EventItem', id, 'Deleted event');
  }, [logAudit]);

  // MUTATIONS: Photos & Videos
  const addGalleryPhoto = useCallback((photo: Omit<GalleryPhoto, 'id'>) => {
    const id = `gal-${Date.now()}`;
    const newPhoto: GalleryPhoto = { ...photo, id };
    setGallery(prev => [newPhoto, ...prev]);
    logAudit('CREATE', 'GalleryPhoto', id, `Added gallery photo: ${photo.title.en}`);
    return newPhoto;
  }, [logAudit]);

  const deleteGalleryPhoto = useCallback((id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    logAudit('DELETE', 'GalleryPhoto', id, 'Deleted gallery photo');
  }, [logAudit]);

  const addVideo = useCallback((video: Omit<VideoItem, 'id'>) => {
    const id = `vid-${Date.now()}`;
    const newVid: VideoItem = { ...video, id };
    setVideos(prev => [...prev, newVid]);
    logAudit('CREATE', 'VideoItem', id, `Added video: ${video.title.en}`);
    return newVid;
  }, [logAudit]);

  const deleteVideo = useCallback((id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    logAudit('DELETE', 'VideoItem', id, 'Deleted video');
  }, [logAudit]);

  // MUTATIONS: Transparency Reports
  const addReport = useCallback((report: Omit<TransparencyReport, 'id'>) => {
    const id = `rep-${Date.now()}`;
    const newRep: TransparencyReport = { ...report, id };
    setReports(prev => [newRep, ...prev]);
    logAudit('CREATE', 'TransparencyReport', id, `Uploaded audit/report: ${report.title.en}`);
    return newRep;
  }, [logAudit]);

  const updateReport = useCallback((id: string, updatedFields: Partial<TransparencyReport>) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, ...updatedFields } : r));
    logAudit('UPDATE', 'TransparencyReport', id, 'Updated transparency report status');
  }, [logAudit]);

  const deleteReport = useCallback((id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    logAudit('DELETE', 'TransparencyReport', id, 'Deleted transparency report');
  }, [logAudit]);

  // MUTATIONS: Partners
  const addPartner = useCallback((partner: Omit<Partner, 'id'>) => {
    const id = `part-${Date.now()}`;
    const newPart: Partner = { ...partner, id };
    setPartners(prev => [...prev, newPart]);
    logAudit('CREATE', 'Partner', id, `Added partner: ${partner.name}`);
    return newPart;
  }, [logAudit]);

  const updatePartner = useCallback((id: string, updatedFields: Partial<Partner>) => {
    setPartners(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    logAudit('UPDATE', 'Partner', id, 'Updated partner details');
  }, [logAudit]);

  const deletePartner = useCallback((id: string) => {
    setPartners(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Partner', id, 'Deleted partner');
  }, [logAudit]);

  // MUTATIONS: Volunteers
  const submitVolunteerApplication = useCallback((app: Omit<VolunteerApplication, 'id' | 'submittedAt' | 'status'>) => {
    const id = `vol-${Date.now()}`;
    const newApp: VolunteerApplication = {
      ...app,
      id,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };
    setVolunteers(prev => [newApp, ...prev]);
    logAudit('CREATE', 'VolunteerApplication', id, `New volunteer application received from ${app.fullName}`);
    return id;
  }, [logAudit]);

  const addVolunteerApplication = useCallback((app: Partial<VolunteerApplication>) => {
    const id = `vol-${Date.now()}`;
    const newApp: VolunteerApplication = {
      id,
      fullName: app.fullName || 'Anonymous',
      email: app.email || '',
      phone: app.phone || '',
      district: app.district || 'Chattogram',
      occupation: app.occupation || '',
      bloodGroup: app.bloodGroup || '',
      interests: app.interests || [],
      motivation: app.motivation || '',
      availability: app.availability || 'Weekends',
      agreedCodeOfConduct: app.agreedCodeOfConduct || true,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };
    setVolunteers(prev => [newApp, ...prev]);
    return id;
  }, []);

  const updateVolunteerStatus = useCallback((id: string, status: VolunteerApplication['status'], adminNotes?: string) => {
    setVolunteers(prev => prev.map(v => v.id === id ? { ...v, status, adminNotes: adminNotes ?? v.adminNotes } : v));
    logAudit('UPDATE', 'VolunteerApplication', id, `Updated volunteer status to: ${status}`);
  }, [logAudit]);

  const deleteVolunteerApplication = useCallback((id: string) => {
    setVolunteers(prev => prev.filter(v => v.id !== id));
    logAudit('DELETE', 'VolunteerApplication', id, 'Deleted volunteer record');
  }, [logAudit]);

  // MUTATIONS: Donations
  const submitDonation = useCallback((donation: Omit<DonationRecord, 'id' | 'date' | 'status'>) => {
    const id = `don-${Date.now()}`;
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = {
      ...donation,
      id,
      receiptNumber,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      donatedAt: new Date().toISOString(),
      status: 'Successful'
    };
    setDonations(prev => [newDonation, ...prev]);
    logAudit('CREATE', 'DonationRecord', id, `Recorded donation receipt: ${receiptNumber}`);
    return id;
  }, [logAudit]);

  const addDonationRecord = useCallback((donation: Partial<DonationRecord>) => {
    const id = `don-${Date.now()}`;
    const receiptNumber = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDonation: DonationRecord = {
      id,
      receiptNumber,
      donorName: donation.donorName || 'Anonymous Supporter',
      donorEmail: donation.donorEmail || '',
      donorPhone: donation.donorPhone || '',
      amount: donation.amount || 1000,
      amountBDT: donation.amountBDT || donation.amount || 1000,
      campaignSlug: donation.campaignSlug || 'general',
      paymentMethod: donation.paymentMethod || 'bKash',
      transactionId: donation.transactionId || `TRX${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: donation.status || 'Successful',
      notes: donation.notes || ''
    };
    setDonations(prev => [newDonation, ...prev]);
    return newDonation;
  }, []);

  const updateDonationStatus = useCallback((id: string, status: DonationRecord['status']) => {
    setDonations(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    logAudit('UPDATE', 'DonationRecord', id, `Updated donation status to: ${status}`);
  }, [logAudit]);

  // MUTATIONS: FAQs
  const addFAQ = useCallback((faq: Omit<FAQItem, 'id'>) => {
    const id = `faq-${Date.now()}`;
    const newFAQ: FAQItem = { ...faq, id };
    setFaqs(prev => [...prev, newFAQ]);
    logAudit('CREATE', 'FAQItem', id, `Added FAQ: ${faq.question.en}`);
    return newFAQ;
  }, [logAudit]);

  const updateFAQ = useCallback((id: string, updated: Partial<FAQItem>) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, ...updated } : f));
    logAudit('UPDATE', 'FAQItem', id, 'Updated FAQ content');
  }, [logAudit]);

  const deleteFAQ = useCallback((id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    logAudit('DELETE', 'FAQItem', id, 'Deleted FAQ');
  }, [logAudit]);

  // MUTATIONS: Contact Messages
  const addContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => {
    const id = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
    logAudit('CREATE', 'ContactMessage', id, `New contact message from ${msg.name} (${msg.email})`);
    return newMsg;
  }, [logAudit]);

  const submitContactMessage = useCallback((msg: Omit<ContactMessage, 'id' | 'submittedAt' | 'status'>) => {
    const id = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      ...msg,
      id,
      submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Unread'
    };
    setMessages(prev => [newMsg, ...prev]);
  }, []);

  const updateMessageStatus = useCallback((id: string, status: ContactMessage['status']) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    logAudit('UPDATE', 'ContactMessage', id, `Updated message status to: ${status}`);
  }, [logAudit]);

  const deleteContactMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'ContactMessage', id, 'Deleted contact message');
  }, [logAudit]);

  // MUTATIONS: Admin Profiles
  const addAdminProfile = useCallback((profile: Omit<AdminProfile, 'id'>) => {
    const id = `admin-${Date.now()}`;
    const newProfile: AdminProfile = { ...profile, id };
    setAdminProfiles(prev => [...prev, newProfile]);
    logAudit('CREATE', 'AdminProfile', id, `Created admin user: ${profile.email} (${profile.role})`);
    return newProfile;
  }, [logAudit]);

  const updateAdminProfile = useCallback((id: string, profile: Partial<AdminProfile>) => {
    setAdminProfiles(prev => prev.map(a => a.id === id ? { ...a, ...profile } : a));
    logAudit('UPDATE', 'AdminProfile', id, 'Updated admin role or permissions');
  }, [logAudit]);

  const deleteAdminProfile = useCallback((id: string) => {
    setAdminProfiles(prev => prev.filter(a => a.id !== id));
    logAudit('DELETE', 'AdminProfile', id, 'Removed admin user');
  }, [logAudit]);

  // MUTATIONS: Committees & Leadership
  const addCommittee = useCallback((committee: Omit<Committee, 'id'>) => {
    const id = `comm-${Date.now()}`;
    const newComm: Committee = { ...committee, id, createdAt: new Date().toISOString() };
    setCommittees(prev => [...prev, newComm]);
    logAudit('CREATE', 'Committee', id, `Created committee: ${committee.name.en}`);
    return newComm;
  }, [logAudit]);

  const updateCommittee = useCallback((id: string, updated: Partial<Committee>) => {
    setCommittees(prev => prev.map(c => c.id === id ? { ...c, ...updated, updatedAt: new Date().toISOString() } : c));
    logAudit('UPDATE', 'Committee', id, 'Updated committee details');
  }, [logAudit]);

  const deleteCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.filter(c => c.id !== id));
    setCommitteeMembers(prev => prev.filter(m => m.committeeId !== id));
    logAudit('DELETE', 'Committee', id, 'Deleted committee and associated rosters');
  }, [logAudit]);

  const archiveCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.map(c => c.id === id ? { ...c, status: 'ARCHIVED', updatedAt: new Date().toISOString() } : c));
    logAudit('UPDATE', 'Committee', id, 'Archived committee');
  }, [logAudit]);

  const setActiveCommittee = useCallback((id: string) => {
    setCommittees(prev => prev.map(c => ({
      ...c,
      status: c.id === id ? 'ACTIVE' : (c.type === 'EXECUTIVE' ? 'ARCHIVED' : c.status)
    })));
    logAudit('UPDATE', 'Committee', id, 'Set as active committee');
  }, [logAudit]);

  const addPerson = useCallback((person: Omit<Person, 'id'>) => {
    const id = `person-${Date.now()}`;
    const newPerson: Person = { ...person, id, createdAt: new Date().toISOString() };
    setPersons(prev => [...prev, newPerson]);
    logAudit('CREATE', 'Person', id, `Added person: ${person.englishName}`);
    return newPerson;
  }, [logAudit]);

  const updatePerson = useCallback((id: string, updated: Partial<Person>) => {
    setPersons(prev => prev.map(p => p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString() } : p));
    logAudit('UPDATE', 'Person', id, 'Updated person profile');
  }, [logAudit]);

  const deletePerson = useCallback((id: string) => {
    setPersons(prev => prev.filter(p => p.id !== id));
    setCommitteeMembers(prev => prev.filter(m => m.personId !== id));
    logAudit('DELETE', 'Person', id, 'Deleted person record');
  }, [logAudit]);

  const addPosition = useCallback((pos: Omit<Position, 'id'>) => {
    const id = `pos-${Date.now()}`;
    const newPos: Position = { ...pos, id };
    setPositions(prev => [...prev, newPos]);
    logAudit('CREATE', 'Position', id, `Added position: ${pos.name.en}`);
    return newPos;
  }, [logAudit]);

  const updatePosition = useCallback((id: string, updated: Partial<Position>) => {
    setPositions(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
    logAudit('UPDATE', 'Position', id, 'Updated leadership position');
  }, [logAudit]);

  const deletePosition = useCallback((id: string) => {
    setPositions(prev => prev.filter(p => p.id !== id));
    logAudit('DELETE', 'Position', id, 'Deleted position');
  }, [logAudit]);

  const addCommitteeMember = useCallback((member: Omit<CommitteeMember, 'id'>) => {
    const id = `cm-${Date.now()}`;
    const newMember: CommitteeMember = { ...member, id, status: member.status || 'ACTIVE' };
    setCommitteeMembers(prev => [...prev, newMember]);
    logAudit('CREATE', 'CommitteeMember', id, 'Assigned member to committee');
    return newMember;
  }, [logAudit]);

  const updateCommitteeMember = useCallback((id: string, updated: Partial<CommitteeMember>) => {
    setCommitteeMembers(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
    logAudit('UPDATE', 'CommitteeMember', id, 'Updated committee member appointment');
  }, [logAudit]);

  const deleteCommitteeMember = useCallback((id: string) => {
    setCommitteeMembers(prev => prev.filter(m => m.id !== id));
    logAudit('DELETE', 'CommitteeMember', id, 'Removed member from committee');
  }, [logAudit]);

  const reorderCommitteeMembers = useCallback((committeeId: string, orderedMemberIds: string[]) => {
    setCommitteeMembers(prev => {
      return prev.map(m => {
        if (m.committeeId === committeeId) {
          const index = orderedMemberIds.indexOf(m.id);
          if (index !== -1) {
            return { ...m, sortOrder: index + 1, serialNumber: index + 1 };
          }
        }
        return m;
      });
    });
    logAudit('UPDATE', 'CommitteeMembers', committeeId, 'Reordered committee members');
  }, [logAudit]);

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
    navigationItems, banners, mediaLibrary, galleryAlbums, adminProfiles,
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
        adminProfiles,
        auditLogs,
        committees,
        persons,
        positions,
        committeeMembers,

        isLiveSupabase: isSupabaseConfigured,
        isSyncing,
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
        deleteGalleryPhoto,

        addVideo,
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
