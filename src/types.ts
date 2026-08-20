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

export interface ImpactMetric {
  id: string;
  label: BilingualText;
  value: string; // e.g. "[X]+", "100%", "[OFFICIAL NUMBER REQUIRED]"
  description: BilingualText;
  iconName: string;
  order: number;
}

export interface Program {
  id: string;
  slug: string;
  title: BilingualText;
  category: string;
  shortDescription: BilingualText;
  fullDetails: BilingualText;
  impactHighlights: BilingualList;
  imageUrl: string;
  iconName: string;
  status: 'active' | 'planning' | 'archived';
}

export interface Campaign {
  id: string;
  slug: string;
  title: BilingualText;
  date: string;
  location: BilingualText;
  category: string;
  description: BilingualText;
  objectives: BilingualList;
  activities: BilingualList;
  beneficiaries: BilingualText;
  impact: BilingualText;
  status: 'active' | 'upcoming' | 'completed';
  isFeatured: boolean;
  targetAmountBDT?: string;
  raisedAmountBDT?: string;
  imageUrl: string;
  galleryImages: string[];
  videoUrl?: string;
  reportUrl?: string;
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

export interface GalleryPhoto {
  id: string;
  title: BilingualText;
  caption: BilingualText;
  imageUrl: string;
  category: 'Campaigns' | 'Volunteers' | 'Children' | 'Events' | 'Distribution' | 'Awareness' | 'Community';
  date: string;
  location?: BilingualText;
  campaignSlug?: string;
}

export interface VideoItem {
  id: string;
  title: BilingualText;
  videoUrl: string;
  platform: 'youtube' | 'facebook' | 'direct';
  duration: string;
  thumbnailUrl: string;
  date: string;
  description: BilingualText;
}

export interface TransparencyReport {
  id: string;
  title: BilingualText;
  type: 'Annual Report' | 'Campaign Report' | 'Financial Audit' | 'Policy' | 'Legal/Registration Document';
  year: string;
  description: BilingualText;
  uploadDate: string;
  fileUrl: string;
  fileSize: string;
  status: 'official' | 'pending_verification' | 'draft';
}

export interface Partner {
  id: string;
  name: string;
  logoUrl?: string;
  website?: string;
  type: 'Institutional' | 'Community Alliance' | 'Resource Partner' | 'Academic';
  description: BilingualText;
  partnershipYear: string;
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

export interface SiteSettings {
  organizationName: string;
  teamIdentity: string;
  tagline: string;
  country: string;
  officialAddress: string;
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

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  entity: string;
  entityId: string;
  timestamp: string;
  details: string;
}

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
  // populated / helper fields
  person?: Person;
  position?: Position;
  committee?: Committee;
}
