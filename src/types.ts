export type Language = 'en' | 'bn';

export type PageRoute = 
  | 'home'
  | 'about'
  | 'about/story'
  | 'about/mission-vision'
  | 'about/team'
  | 'about/executive-committee'
  | 'about/standing-committees'
  | 'about/past-committees'
  | 'programs'
  | 'programs/detail'
  | 'campaigns'
  | 'campaigns/detail'
  | 'impact'
  | 'stories'
  | 'stories/detail'
  | 'events'
  | 'events/detail'
  | 'news'
  | 'news/detail'
  | 'gallery'
  | 'videos'
  | 'volunteer'
  | 'donate'
  | 'partners'
  | 'transparency'
  | 'reports'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'faq'
  | '404'
  | 'admin';

export interface BilingualText {
  en: string;
  bn: string;
}

export interface BilingualList {
  en: string[];
  bn: string[];
}

export type AdminRole = 'super_admin' | 'content_admin' | 'media_manager' | 'viewer';

export interface AdminProfile {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  avatarUrl?: string;
  lastLoginAt?: string;
  isActive: boolean;
}

// ----------------------------------------------------
// HOMEPAGE CONFIGURATION & SECTIONS
// ----------------------------------------------------
export interface HeroTrustIndicator {
  icon: string; // 'ShieldCheck' | 'CheckCircle2' | 'Sparkles' | 'Heart' | 'Users'
  text: BilingualText;
  active: boolean;
}

export interface HeroConfig {
  eyebrow: BilingualText;
  headlineMain: BilingualText;
  headlineHighlight: BilingualText;
  description: BilingualText;
  primaryCta: {
    text: BilingualText;
    url: string;
    openInNewTab?: boolean;
    active: boolean;
  };
  secondaryCta: {
    text: BilingualText;
    url: string;
    openInNewTab?: boolean;
    active: boolean;
  };
  storyCta: {
    text: BilingualText;
    url: string;
    active: boolean;
  };
  heroImageUrl: string;
  heroImageAlt: string;
  heroImageCaption?: string;
  heroImageCropPosition: string; // e.g. 'center center', 'center top', '50% 20%'
  badgeYear: string;
  badgeLocation: string;
  badgeTag: string;
  trustIndicators: HeroTrustIndicator[];
}

export interface AboutPreviewConfig {
  eyebrow: BilingualText;
  titleMain: BilingualText;
  titleHighlight: BilingualText;
  description: BilingualText;
  quoteText: BilingualText;
  quoteAuthor: string;
  ctaText: BilingualText;
  ctaUrl: string;
  imageUrl: string;
}

export interface HomepageVolunteerBanner {
  eyebrow?: BilingualText;
  badge?: BilingualText;
  title: BilingualText;
  subtitle?: BilingualText;
  description?: BilingualText;
  primaryCtaText?: BilingualText;
  primaryCtaUrl?: string;
  secondaryCtaText?: BilingualText;
  secondaryCtaUrl?: string;
  primaryButtonText?: BilingualText;
  primaryButtonUrl?: string;
  secondaryButtonText?: BilingualText;
  secondaryButtonUrl?: string;
}

export interface HomepageSupportBanner {
  title: BilingualText;
  subtitle?: BilingualText;
  description?: BilingualText;
  primaryCtaText?: BilingualText;
  primaryCtaUrl?: string;
  secondaryCtaText?: BilingualText;
  secondaryCtaUrl?: string;
  primaryButtonText?: BilingualText;
  primaryButtonUrl?: string;
  secondaryButtonText?: BilingualText;
  secondaryButtonUrl?: string;
}

export interface HomepageConfig {
  hero: HeroConfig;
  aboutPreview: AboutPreviewConfig;
  volunteerBanner?: HomepageVolunteerBanner;
  supportBanner?: HomepageSupportBanner;
  sectionOrder: string[]; // e.g. ['hero', 'impact', 'about', 'programs', 'campaigns', 'stories', 'gallery', 'volunteer', 'transparency', 'support']
  sectionVisibility: {
    hero: boolean;
    impact: boolean;
    about: boolean;
    programs: boolean;
    campaigns: boolean;
    stories: boolean;
    gallery: boolean;
    volunteer: boolean;
    transparency: boolean;
    support: boolean;
    [key: string]: boolean;
  };
}

// ----------------------------------------------------
// GLOBAL HEADER, FOOTER, AND NAVIGATION
// ----------------------------------------------------
export interface HeaderSettings {
  logoUrl: string;
  logoAlt: string;
  showNoticeBar: boolean;
  noticeBarText: BilingualText;
  noticeBarLink?: string;
  showSearch: boolean;
  showLanguageSwitcher: boolean;
  supportButtonText: BilingualText;
  supportButtonUrl: string;
  showSupportButton: boolean;
}

export interface FooterLinkItem {
  label: BilingualText;
  url: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: BilingualText;
  links: FooterLinkItem[];
}

export interface FooterSettings {
  footerLogoUrl: string;
  description: BilingualText;
  address: string;
  phone: string;
  email: string;
  copyrightText: BilingualText;
  establishedYear?: string;
  showNewsletter?: boolean;
  navColumns?: FooterColumn[];
  calloutEyebrow?: BilingualText;
  calloutTitle?: BilingualText;
  calloutSubtitle?: BilingualText;
  volunteerCtaText?: BilingualText;
  supportCtaText?: BilingualText;
}

export type SocialPlatform = 'facebook' | 'youtube' | 'instagram' | 'linkedin' | 'x' | 'whatsapp' | 'other';

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  label: string;
  active: boolean;
  displayOrder: number;
}

export interface NavigationSubItem {
  id: string;
  label: BilingualText;
  path: PageRoute | string;
  isExternal?: boolean;
  active?: boolean;
}

export interface NavigationItem {
  id: string;
  label: BilingualText;
  path: PageRoute | string;
  isExternal?: boolean;
  isDropdown?: boolean;
  children?: NavigationSubItem[];
  displayOrder: number;
  active: boolean;
}

// ----------------------------------------------------
// BANNERS & PROMOTIONS
// ----------------------------------------------------
export interface BannerItem {
  id: string;
  title: BilingualText;
  subtitle?: BilingualText;
  desktopImageUrl: string;
  mobileImageUrl?: string;
  ctaText?: BilingualText;
  ctaUrl?: string;
  startDate?: string;
  endDate?: string;
  placement: 'homepage_hero' | 'announcement_top' | 'campaign_feature' | 'popup';
  displayOrder: number;
  active: boolean;
}

// ----------------------------------------------------
// MEDIA LIBRARY & GALLERIES
// ----------------------------------------------------
export type MediaCategory =
  | 'Hero'
  | 'Campaigns'
  | 'Volunteers'
  | 'Events'
  | 'Children & Community'
  | 'Logos'
  | 'Banners'
  | 'Stories'
  | 'Gallery'
  | 'Documents'
  | 'General';

export type MediaType = 'image' | 'video';
export type MediaSourceType = 'upload' | 'url' | 'youtube' | 'facebook' | 'direct';
export type MediaPlatform = 'local' | 'cloudinary' | 'youtube' | 'facebook' | 'direct';

export interface MediaItem {
  id: string;
  fileName: string;
  url: string;
  fileSize: string;
  mimeType: string;
  category: MediaCategory;
  altText: string;
  caption?: string;
  uploadedAt: string;
  usageTags: string[]; // e.g. ['Homepage Hero', 'Eid Joy Campaign']
  type?: MediaType;
  sourceType?: MediaSourceType;
  platform?: MediaPlatform;
  embedUrl?: string;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
  aspectRatio?: '1:1' | '4:5' | '3:4' | '4:3' | '16:9' | '21:9' | 'free';
  status?: 'published' | 'draft';
  isFeatured?: boolean;
  duration?: string;
  updatedAt?: string;
}

export interface GalleryPhoto {
  id: string;
  albumId?: string;
  title: BilingualText;
  caption?: BilingualText;
  imageUrl: string;
  category: 'Campaigns' | 'Volunteers' | 'Children' | 'Events' | 'Distribution' | 'Awareness' | 'Community' | string;
  date: string;
  location?: BilingualText | string;
  campaignSlug?: string;
  displayOrder?: number;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  title: BilingualText;
  description: BilingualText;
  coverImageUrl: string;
  category: string;
  date: string;
  photos: GalleryPhoto[];
  isPublished: boolean;
  displayOrder: number;
}

// ----------------------------------------------------
// PROGRAM, CAMPAIGN & IMPACT ENTITIES
// ----------------------------------------------------
export interface ImpactMetric {
  id: string;
  label: BilingualText;
  value: string; // e.g. "15,000+", "350+", "45+", "10+ Years"
  description: BilingualText;
  iconName: string;
  order: number;
  active?: boolean;
}

export interface Program {
  id: string;
  slug: string;
  title: BilingualText;
  category: string;
  shortDescription: BilingualText;
  fullDetails: BilingualText;
  fullDescription?: BilingualText;
  impactHighlights: BilingualList;
  impactPoints?: BilingualList | string[];
  imageUrl: string;
  iconName: string;
  status: 'active' | 'planning' | 'archived';
  displayOrder?: number;
}

export interface Campaign {
  id: string;
  slug: string;
  title: BilingualText;
  date: string;
  endDate?: string;
  location: BilingualText;
  category: string;
  description: BilingualText;
  details?: BilingualText;
  objectives: BilingualList;
  activities: BilingualList;
  beneficiaries?: BilingualText;
  beneficiariesCount?: number | string;
  volunteersCount?: number | string;
  impact?: BilingualText;
  status: 'active' | 'upcoming' | 'completed' | 'archived';
  isFeatured: boolean;
  targetAmountBDT?: string;
  raisedAmountBDT?: string;
  imageUrl: string;
  galleryImages: string[];
  videoUrl?: string;
  reportUrl?: string;
  displayOrder?: number;
}

export interface ImpactStory {
  id: string;
  slug: string;
  title: BilingualText;
  personOrCommunity: BilingualText;
  location: BilingualText;
  date: string;
  story: BilingualText;
  impact: BilingualText;
  imageUrl: string;
  campaignSlug?: string;
  consentConfirmed: boolean;
  isFeatured?: boolean;
  status?: 'published' | 'draft' | 'archived';
  tags?: string[];
  seoTitle?: BilingualText;
  seoDescription?: BilingualText;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: BilingualText;
  excerpt: BilingualText;
  content: BilingualText;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
  status: 'published' | 'draft' | 'archived';
}

export interface EventItem {
  id: string;
  slug: string;
  title: BilingualText;
  date: string;
  time: string;
  location: BilingualText;
  description: BilingualText;
  imageUrl: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registrationOpen: boolean;
}

export interface VideoItem {
  id: string;
  title: BilingualText;
  videoUrl: string;
  platform: 'youtube' | 'facebook' | 'direct' | 'custom' | string;
  duration?: string;
  thumbnailUrl: string;
  date: string;
  description: BilingualText;
  embedUrl?: string;
  category?: string;
  status?: 'published' | 'draft' | string;
  isFeatured?: boolean;
  sourceType?: 'youtube' | 'facebook' | 'url' | 'upload' | string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransparencyReport {
  id: string;
  title: BilingualText;
  type: 'Annual Report' | 'Campaign Report' | 'Financial Audit' | 'Policy' | 'Legal/Registration Document' | string;
  year: string;
  description: BilingualText;
  uploadDate: string;
  fileUrl: string;
  fileSize: string;
  status: 'official' | 'pending_verification' | 'draft';
  displayOrder?: number;
}

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  type: 'Institutional' | 'Community Alliance' | 'Resource Partner' | 'Academic';
  description: BilingualText;
  partnershipYear: string;
  since?: string;
}

// ----------------------------------------------------
// VOLUNTEER, DONATION & CONTACT SETTINGS
// ----------------------------------------------------
export interface VolunteerSettings {
  ctaText: BilingualText;
  googleFormUrl: string;
  description: BilingualText;
  coverImageUrl: string;
  benefits: BilingualList;
  requirements: BilingualList;
  contactEmail: string;
}

export interface SupportSettings {
  ctaText: BilingualText;
  description: BilingualText;
  bKashNumber: string;
  bkashNumber?: string;
  bKashType: string;
  nagadNumber: string;
  nagadType: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branchName: string;
    routingNumber: string;
  };
  qrCodeImageUrl?: string;
  paymentInstructions: BilingualText;
  supportEmail: string;
  supportPhone: string;
}

export interface ContactSettings {
  address: BilingualText;
  phone: string;
  email: string;
  officeHours: BilingualText;
  workingHours?: BilingualText | string;
  title?: BilingualText | string;
  subtitle?: BilingualText | string;
  googleMapsEmbedUrl: string;
  emergencyHelpline?: string;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  district: string;
  upazila?: string;
  age?: number | string;
  occupation?: string;
  bloodGroup?: string;
  skills?: string[];
  areasOfInterest?: string[];
  interests?: string[];
  motivation?: string;
  previousExperience?: string;
  availability?: string;
  message?: string;
  consent?: boolean;
  agreedCodeOfConduct?: boolean;
  submittedAt?: string;
  appliedAt?: string;
  status: 'New' | 'Reviewing' | 'Approved' | 'Rejected' | 'Contacted' | 'approved' | 'pending' | 'contacted';
  adminNotes?: string;
}

export interface DonationRecord {
  id: string;
  receiptNumber?: string;
  donorName: string;
  donorEmail?: string;
  donorPhone?: string;
  amount?: number;
  amountBDT?: number;
  currency?: string;
  campaignSlug?: string;
  campaignTitle?: string;
  donationType?: 'one-time' | 'monthly' | 'campaign-specific' | string;
  paymentMethod: 'bKash' | 'Nagad' | 'Bank Transfer' | 'Online Gateway' | 'In-Kind / Physical Support' | string;
  transactionId?: string;
  date?: string;
  donatedAt?: string;
  status: 'Pending' | 'Successful' | 'Failed' | 'Refunded' | 'received' | 'pending' | string;
  isAnonymous?: boolean;
  notes?: string;
  note?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
}

export interface FAQItem {
  id: string;
  question: BilingualText;
  answer: BilingualText;
  category?: string;
  displayOrder?: number;
  active?: boolean;
}

// ----------------------------------------------------
// SITE SETTINGS, SEO & AUDIT
// ----------------------------------------------------
export interface SiteSettings {
  organizationName: any;
  teamIdentity: string;
  tagline: string;
  slogan?: BilingualText;
  primary_slogan?: BilingualText;
  establishedYear?: string;
  headquartersLocation?: string;
  logoUrl?: string;
  faviconUrl?: string;
  country: string;
  officialAddress: any;
  officialPhone: string;
  officialEmail: string;
  facebookUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  bKashNumber: string;
  nagadNumber: string;
  bankDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
    branchName: string;
    routingNumber: string;
  };
  bannerAnnouncement: BilingualText;
  showAnnouncementBanner: boolean;
  registrationNumber: string;
}

export interface AboutSettings {
  title: BilingualText;
  subtitle: BilingualText;
  mission: BilingualText;
  vision: BilingualText;
  history: BilingualText;
  establishedYear: string;
  location: string;
  heroImageUrl: string;
  secondaryImageUrl?: string;
  ctaText?: BilingualText;
  ctaUrl?: string;
}

export interface GlobalSEOSettings {
  siteTitle: BilingualText;
  metaDescription: BilingualText;
  keywords: string[];
  ogImageUrl: string;
  organizationName: string;
  canonicalUrl: string;
}

export interface PageSEO {
  id: string;
  pageRoute: string;
  title: BilingualText;
  metaDescription: BilingualText;
  ogTitle?: BilingualText;
  ogDescription?: BilingualText;
  ogImageUrl?: string;
  keywords?: string[];
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityType?: string;
  entityId: string;
  timestamp: string;
  details: string;
}

// ----------------------------------------------------
// COMMITTEES & LEADERSHIP
// ----------------------------------------------------
export type CommitteeType = 'EXECUTIVE' | 'STANDING' | 'SPECIAL' | 'PAST' | 'OTHER';

export interface Committee {
  id: string;
  slug: string;
  name: BilingualText;
  type: CommitteeType;
  year: string;
  description: BilingualText;
  status: 'ACTIVE' | 'ARCHIVED' | 'DRAFT';
  sortOrder: number;
  isFeatured: boolean;
  bannerImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Person {
  id: string;
  fullName: string;
  banglaName: string;
  englishName: string;
  photoUrl?: string;
  photoPosition?: string; // e.g. 'center top', '50% 15%', 'center center'
  photoZoom?: number; // scale multiplier e.g. 1.0 to 2.0
  shortBio?: BilingualText;
  fullBio?: BilingualText;
  district?: string;
  facebookUrl?: string;
  linkedinUrl?: string;
  email?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
    phone?: string;
  };
  joiningYear?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Position {
  id: string;
  name: BilingualText;
  level: number; // 1 = President/Top, 2 = VP/Senior VP, 3 = GS, 4 = Joint/Dept Secretary, 5 = Member
  sortOrder: number;
  description?: BilingualText;
}

export interface CommitteeMember {
  id: string;
  committeeId: string;
  personId: string;
  positionId: string;
  serialNumber: number; // 1, 2, 3 ... 27
  sortOrder: number;
  isFeaturedLeader: boolean;
  startDate?: string;
  endDate?: string;
  status: 'ACTIVE' | 'FORMER' | 'INACTIVE';
  person?: Person;
  position?: Position;
  committee?: Committee;
}
