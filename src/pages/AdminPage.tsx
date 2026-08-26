import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import {
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Flag,
  BookOpen,
  Heart,
  Users,
  FileText,
  Calendar,
  Image as ImageIcon,
  Video as VideoIcon,
  Handshake,
  Mail,
  Activity,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  LogOut,
  AlertCircle,
  Sparkles,
  Download,
  Upload,
  Settings,
  Eye,
  EyeOff,
  RefreshCw,
  Search,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Award,
  ArrowUp,
  ArrowDown,
  Layers,
  History,
  UserPlus,
  ListOrdered,
  Sliders,
  Compass,
  FolderOpen,
  Globe,
  Share2,
  CreditCard,
  PhoneCall,
  UserCog,
  Database,
  Tag,
  FileSpreadsheet,
  ToggleLeft,
  ToggleRight,
  HelpCircle,
  RotateCcw,
  Play,
  Star,
  Copy,
  Crop,
  Filter,
  Maximize2,
  Smartphone,
  Newspaper,
  Edit3,
  Link as LinkIcon
} from 'lucide-react';
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
  Committee,
  Person,
  Position,
  CommitteeMember,
  SocialLink,
  NavigationItem,
  BannerItem,
  MediaItem,
  MediaCategory,
  GalleryAlbum,
  AdminProfile,
  AdminRole,
  PageRoute,
  FAQItem,
  PressCoverage,
  ExecutiveTierBar
} from '../types';
import { DEFAULT_EXECUTIVE_TIER_BARS } from '../data/initialData';
import { getAssetUrl, handleImageError } from '../lib/utils/assetHelper';
import { formatBDT } from '../lib/utils/formatters';
import { Toast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { CampaignModal } from '../components/CampaignModal';
import { ProgramModal } from '../components/ProgramModal';
import { StoryModal } from '../components/StoryModal';
import { FAQModal } from '../components/FAQModal';
import { CommitteeMemberModal, CommitteeMemberFormData } from '../components/CommitteeMemberModal';
import { ImageEditorModal } from '../components/ImageEditorModal';
import { VideoModal } from '../components/VideoModal';
import { BannerModal } from '../components/BannerModal';
import { AlbumModal } from '../components/AlbumModal';
import { AlbumPhotoManagerModal } from '../components/AlbumPhotoManagerModal';
import { ImagePublishModal } from '../components/ImagePublishModal';
import { PressCoverageModal } from '../components/PressCoverageModal';
import { NavigationModal } from '../components/NavigationModal';
import { AdminErrorBoundary } from '../components/AdminErrorBoundary';
import { isSupabaseConfigured, signInWithEmail, signOutAdmin } from '../lib/supabase';
import { detectAndNormalizeMedia, DEFAULT_VIDEO_THUMBNAIL, isPortraitVideo } from '../lib/utils/mediaHelper';
import { uploadToCloudinary } from '../lib/cloudinary';

type AdminTab =
  | 'overview'
  | 'brand_settings'
  | 'homepage'
  | 'about_cms'
  | 'campaigns'
  | 'programs'
  | 'impact'
  | 'stories'
  | 'faqs'
  | 'media_library'
  | 'banners'
  | 'gallery_albums'
  | 'press'
  | 'committees'
  | 'volunteers'
  | 'donations'
  | 'transparency'
  | 'navigation'
  | 'header_footer'
  | 'seo'
  | 'social_links'
  | 'support_cms'
  | 'contact_cms'
  | 'news_events'
  | 'messages'
  | 'admin_users'
  | 'audit'
  | 'backup';

export const AdminPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const {
    // Entities
    campaigns, addCampaign, updateCampaign, deleteCampaign,
    programs, addProgram, updateProgram, deleteProgram,
    metrics, addMetric, updateMetric, deleteMetric,
    stories, addStory, updateStory, deleteStory,
    faqs, addFAQ, updateFAQ, deleteFAQ,
    news, addNews, updateNews, deleteNews,
    events, addEvent, updateEvent, deleteEvent,
    gallery, addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto,
    videos, addVideo, updateVideo, deleteVideo,
    reports, addReport, updateReport, deleteReport,
    volunteers, updateVolunteerStatus, deleteVolunteerApplication,
    donations, addDonationRecord, updateDonationStatus,
    messages, updateMessageStatus, deleteContactMessage,
    settings, updateSettings,
    homepageConfig, updateHomepageConfig,
    aboutSettings, updateAboutSettings,
    headerSettings, updateHeaderSettings,
    footerSettings, updateFooterSettings,
    socialLinks, addSocialLink, updateSocialLink, deleteSocialLink,
    volunteerSettings, updateVolunteerSettings,
    supportSettings, updateSupportSettings,
    contactSettings, updateContactSettings,
    seoSettings, updateSEOSettings,
    navigationItems, addNavigationItem, updateNavigationItem, deleteNavigationItem, reorderNavigationItems,
    banners, addBanner, updateBanner, deleteBanner,
    mediaLibrary, addMediaItem, updateMediaItem, deleteMediaItem,
    galleryAlbums, addGalleryAlbum, updateGalleryAlbum, deleteGalleryAlbum, setAlbumPhotos,
    pressCoverages, addPressCoverage, updatePressCoverage, deletePressCoverage,
    adminProfiles, addAdminProfile, updateAdminProfile, deleteAdminProfile,
    auditLogs,
    committees, addCommittee, updateCommittee, deleteCommittee, archiveCommittee, setActiveCommittee,
    persons, addPerson, updatePerson, deletePerson,
    positions, addPosition, updatePosition, deletePosition,
    committeeMembers, addCommitteeMember, updateCommitteeMember, deleteCommitteeMember, reorderCommitteeMembers, getMembersWithDetails,
    isLiveSupabase, isSyncing, lastSyncedAt, syncWithSupabase, pushAllToSupabase, resetToDefaultData, exportDatabaseJSON, importDatabaseJSON
  } = useData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('infinity_bd_admin_auth') === 'true';
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentRole, setCurrentRole] = useState<AdminRole>('super_admin');

  // UI Navigation
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Media Picker Modal State
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  // Active Modals & Edit States
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null);
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);

  const [editingStory, setEditingStory] = useState<ImpactStory | null>(null);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);

  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false);

  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const [editingAlbumPhotos, setEditingAlbumPhotos] = useState<GalleryAlbum | null>(null);
  const [isAlbumPhotoManagerOpen, setIsAlbumPhotoManagerOpen] = useState(false);

  const [editingImageItem, setEditingImageItem] = useState<MediaItem | null>(null);
  const [isImagePublishModalOpen, setIsImagePublishModalOpen] = useState(false);

  const [editingPress, setEditingPress] = useState<PressCoverage | null>(null);
  const [isPressModalOpen, setIsPressModalOpen] = useState(false);

  const [editingNav, setEditingNav] = useState<NavigationItem | null>(null);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const [editingAdmin, setEditingAdmin] = useState<AdminProfile | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Unified Media Library States
  const [mediaLibraryFilter, setMediaLibraryFilter] = useState<'all' | 'image' | 'video' | 'youtube' | 'facebook' | 'featured'>('all');
  const [mediaCategoryFilter, setMediaCategoryFilter] = useState<string>('All');
  const [mediaSearchQuery, setMediaSearchQuery] = useState<string>('');
  const [previewingMedia, setPreviewingMedia] = useState<MediaItem | null>(null);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [isNewMediaModalOpen, setIsNewMediaModalOpen] = useState<boolean>(false);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState<boolean>(false);
  const [cropperSourceUrl, setCropperSourceUrl] = useState<string>('');
  const [cropperCallback, setCropperCallback] = useState<((croppedUrl: string) => void) | null>(null);

  // New Media Form States
  const [newMediaSourceTab, setNewMediaSourceTab] = useState<'url' | 'upload'>('url');
  const [newMediaUrl, setNewMediaUrl] = useState<string>('');
  const [newMediaTitle, setNewMediaTitle] = useState<string>('');
  const [newMediaCategory, setNewMediaCategory] = useState<MediaCategory>('General');
  const [newMediaAlt, setNewMediaAlt] = useState<string>('');
  const [newMediaIsFeatured, setNewMediaIsFeatured] = useState<boolean>(false);
  const [isUploadingMedia, setIsUploadingMedia] = useState<boolean>(false);
  const [mediaUploadError, setMediaUploadError] = useState<string>('');

  // Committee & Member Management States
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>(committees[0]?.id || 'comm-exec-2026');
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<(CommitteeMember & { person: Person; position: Position; committee?: Committee }) | null>(null);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [isNewCommitteeModalOpen, setIsNewCommitteeModalOpen] = useState(false);
  const [newCommitteeNameEn, setNewCommitteeNameEn] = useState('');
  const [newCommitteeNameBn, setNewCommitteeNameBn] = useState('');
  const [newCommitteeYear, setNewCommitteeYear] = useState('2026');
  const [newCommitteeType, setNewCommitteeType] = useState<Committee['type']>('STANDING');
  const [newCommitteeDescEn, setNewCommitteeDescEn] = useState('');
  const [newCommitteeDescBn, setNewCommitteeDescBn] = useState('');

  // Executive Section/Tier Bar CMS states
  const [adminEditingTierBar, setAdminEditingTierBar] = useState<ExecutiveTierBar | null>(null);
  const [isAdminTierModalOpen, setIsAdminTierModalOpen] = useState(false);

  const adminTierBars: ExecutiveTierBar[] = settings.executiveTierBars && settings.executiveTierBars.length > 0
    ? settings.executiveTierBars
    : DEFAULT_EXECUTIVE_TIER_BARS;

  const handleAdminSaveTierBar = (updated: ExecutiveTierBar) => {
    const list = settings.executiveTierBars && settings.executiveTierBars.length > 0
      ? [...settings.executiveTierBars]
      : [...DEFAULT_EXECUTIVE_TIER_BARS];
    const idx = list.findIndex(b => b.id === updated.id);
    if (idx >= 0) {
      list[idx] = updated;
    } else {
      list.push(updated);
    }
    updateSettings({ executiveTierBars: list });
    setIsAdminTierModalOpen(false);
    setAdminEditingTierBar(null);
    showToast(isBn ? 'সেকশন বার আপডেট করা হয়েছে' : 'Section bar updated successfully');
  };

  const handleAdminToggleTierBar = (id: string, currentVisible: boolean) => {
    const list = (settings.executiveTierBars && settings.executiveTierBars.length > 0
      ? settings.executiveTierBars
      : DEFAULT_EXECUTIVE_TIER_BARS
    ).map(b => b.id === id ? { ...b, visible: !currentVisible } : b);
    updateSettings({ executiveTierBars: list });
    showToast(currentVisible
      ? (isBn ? 'সেকশন বারটি লুকানো/মুছে ফেলা হয়েছে' : 'Section bar hidden/deleted from live page')
      : (isBn ? 'সেকশন বারটি দৃশ্যমান করা হয়েছে' : 'Section bar restored and visible'));
  };

  const handleAdminResetTierBars = () => {
    if (confirm(isBn ? 'সবগুলো সেকশন বার ডিফল্ট অবস্থায় ফিরিয়ে আনতে চান?' : 'Reset all 7 section bars to their default titles and visible status?')) {
      updateSettings({ executiveTierBars: DEFAULT_EXECUTIVE_TIER_BARS });
      showToast(isBn ? 'সবগুলো সেকশন বার ডিফল্ট অবস্থায় ফিরেছে' : 'All section bars reset to default');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openMediaPicker = (onSelect: (url: string) => void) => {
    setMediaPickerCallback(() => onSelect);
    setMediaPickerOpen(true);
  };

  // Committee Member Save Handler
  const handleSaveMember = (
    formData: CommitteeMemberFormData,
    memberId?: string,
    personId?: string,
    positionId?: string
  ) => {
    if (memberId && personId && positionId) {
      // Update existing Person
      updatePerson(personId, {
        banglaName: formData.banglaName,
        englishName: formData.englishName,
        fullName: formData.englishName,
        photoUrl: formData.photoUrl,
        shortBio: { en: formData.shortBioEn, bn: formData.shortBioBn },
        facebookUrl: formData.facebookUrl,
        linkedinUrl: formData.linkedinUrl,
        socialLinks: {
          facebook: formData.facebookUrl,
          linkedin: formData.linkedinUrl
        },
        active: formData.status === 'ACTIVE'
      });
      // Update existing Position
      updatePosition(positionId, {
        name: { en: formData.englishDesignation, bn: formData.banglaDesignation },
        level: formData.level
      });
      // Update existing Committee Member
      updateCommitteeMember(memberId, {
        committeeId: formData.committeeId,
        serialNumber: formData.serialNumber,
        sortOrder: formData.sortOrder,
        isFeaturedLeader: formData.isFeaturedLeader,
        status: formData.status
      });
      showToast(isBn ? 'সদস্যের তথ্য সফলভাবে আপডেট হয়েছে' : 'Member updated successfully');
    } else {
      // Create new Person
      const newPerson = addPerson({
        fullName: formData.englishName || 'New Member',
        englishName: formData.englishName || 'New Member',
        banglaName: formData.banglaName || 'নতুন সদস্য',
        photoUrl: formData.photoUrl,
        shortBio: { en: formData.shortBioEn, bn: formData.shortBioBn },
        facebookUrl: formData.facebookUrl,
        linkedinUrl: formData.linkedinUrl,
        socialLinks: {
          facebook: formData.facebookUrl,
          linkedin: formData.linkedinUrl
        },
        active: formData.status === 'ACTIVE'
      });
      // Create Position
      const newPos = addPosition({
        name: { en: formData.englishDesignation || 'Member', bn: formData.banglaDesignation || 'সদস্য' },
        level: formData.level,
        sortOrder: formData.serialNumber
      });
      // Add Committee Member
      addCommitteeMember({
        committeeId: formData.committeeId || selectedCommitteeId,
        personId: newPerson.id,
        positionId: newPos.id,
        serialNumber: formData.serialNumber,
        sortOrder: formData.sortOrder,
        isFeaturedLeader: formData.isFeaturedLeader,
        status: formData.status
      });
      showToast(isBn ? 'নতুন সদস্য সফলভাবে যুক্ত হয়েছে' : 'New member added successfully');
    }
    setIsMemberModalOpen(false);
    setEditingMember(null);
  };

  // Committee Member Move Up / Down Handler
  const handleMoveMember = (memberId: string, direction: 'up' | 'down') => {
    const list = getMembersWithDetails(selectedCommitteeId);
    const index = list.findIndex(m => m.id === memberId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const reordered = [...list];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const orderedIds = reordered.map(m => m.id);
    reorderCommitteeMembers(selectedCommitteeId, orderedIds);
    showToast(isBn ? 'সদস্যের ক্রম পরিবর্তন হয়েছে' : 'Member order updated');
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const inputEmail = authEmail.trim().toLowerCase();
    const inputPass = authPassword.trim();

    // Verify Primary Official Admin Credentials
    const isValidOfficialAdmin =
      (inputEmail === 'infinitybd@social.org' || inputEmail === 'admin@infinitybangladesh.org' || !inputEmail) &&
      (inputPass === 'InfinityWebsite@2015' || inputPass === 'infinity2026' || inputPass === 'admin123');

    if (isValidOfficialAdmin) {
      setIsAuthenticated(true);
      localStorage.setItem('infinity_bd_admin_auth', 'true');
      sessionStorage.setItem('infinity_admin_user', authEmail.trim() || 'Infinitybd@social.org');
      showToast(isBn ? 'সফলভাবে অ্যাডমিন প্যানেলে লগইন হয়েছে' : 'Logged in as Administrator');
      return;
    }

    if (isSupabaseConfigured && inputEmail && inputPass) {
      try {
        const { data, error } = await signInWithEmail(authEmail, authPassword);
        if (data?.user) {
          setIsAuthenticated(true);
          localStorage.setItem('infinity_bd_admin_auth', 'true');
          sessionStorage.setItem('infinity_admin_user', data.user.email || authEmail);
          showToast('Authenticated via Supabase');
          return;
        } else if (error) {
          console.warn('Supabase auth notice:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase auth failed, trying credentials fallback:', err);
      }
    }

    setAuthError(isBn ? 'ভুল ইমেইল অথবা পাসওয়ার্ড। সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন।' : 'Invalid credentials. Please enter a valid administrator email and password.');
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured) {
      await signOutAdmin();
    }
    setIsAuthenticated(false);
    localStorage.removeItem('infinity_bd_admin_auth');
    showToast('Logged out of Admin Portal');
  };

  // -------------------------------------------------------------
  // 1. AUTHENTICATION LOGIN SCREEN
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-[#FAF7F2]">
        <div className="max-w-md w-full bg-white rounded-3xl border border-[#EAE3D9] p-8 sm:p-10 shadow-warm-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-3xl bg-[#006A4E] text-white flex items-center justify-center mx-auto shadow-warm-md">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              {isBn ? 'ইনফিনিটি বাংলাদেশ অ্যাডমিন প্যানেল' : 'Infinity Bangladesh CMS'}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn ? 'ওয়েবসাইটের যাবতীয় কনটেন্ট ও ডেটা ম্যানেজমেন্ট পোর্টাল' : 'Secure Management Portal & Content Management System'}
            </p>
          </div>

          {authError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'অ্যাডমিন ইমেইল' : 'Admin Email'}
              </label>
              <input
                type="email"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'পাসওয়ার্ড *' : 'Password *'}
              </label>
              <input
                type="password"
                required
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isBn ? 'লগইন করুন' : 'Sign In to Admin Portal'}</span>
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-slate-500 text-[11px] space-y-1">
            <p>Team Infinity • United for Humanity</p>
            <p className="text-emerald-700 font-medium">
              {isLiveSupabase ? '🟢 Supabase PostgreSQL Connected' : '🟠 Local Persistence & Offline Sync Ready'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Navigation tabs definition
  const tabGroups = [
    {
      group: isBn ? 'মূল নিয়ন্ত্রণ' : 'Main Control',
      items: [
        { id: 'overview' as AdminTab, label: isBn ? 'ড্যাশবোর্ড ওভারভিউ' : 'Overview & Stats', icon: LayoutDashboard },
        { id: 'brand_settings' as AdminTab, label: isBn ? 'ব্র্যান্ড ও স্লোগান CMS' : 'Brand & Slogans CMS', icon: Sparkles },
        { id: 'homepage' as AdminTab, label: isBn ? 'হোমপেজ এডিটর' : 'Homepage Editor', icon: Sliders },
        { id: 'about_cms' as AdminTab, label: isBn ? 'আমাদের সম্পর্কে' : 'About Organization', icon: BookOpen },
        { id: 'navigation' as AdminTab, label: isBn ? 'মেনু ও নেভিগেশন' : 'Navigation & Menus', icon: Compass },
        { id: 'header_footer' as AdminTab, label: isBn ? 'হেডার ও ফুটার' : 'Header & Footer', icon: Layers }
      ]
    },
    {
      group: isBn ? 'মানবিক কার্যক্রম' : 'Humanitarian CMS',
      items: [
        { id: 'campaigns' as AdminTab, label: isBn ? 'ক্যাম্পেইনসমূহ' : 'Campaigns', icon: Flag },
        { id: 'programs' as AdminTab, label: isBn ? 'সেবামূলক প্রোগ্রাম' : 'Programs', icon: Handshake },
        { id: 'impact' as AdminTab, label: isBn ? 'ইমপ্যাক্ট মেট্রিক্স' : 'Impact Metrics', icon: Activity },
        { id: 'stories' as AdminTab, label: isBn ? 'বাস্তব জীবনের গল্প' : 'Impact Stories', icon: Heart },
        { id: 'faqs' as AdminTab, label: isBn ? 'সাধারণ প্রশ্নোত্তর' : 'FAQ Manager', icon: HelpCircle },
        { id: 'volunteers' as AdminTab, label: isBn ? 'স্বেচ্ছাসেবী আবেদন' : 'Volunteer CMS', icon: Users },
        { id: 'donations' as AdminTab, label: isBn ? 'অনুদান ও তহবিল' : 'Donations & Funds', icon: CreditCard },
        { id: 'transparency' as AdminTab, label: isBn ? 'স্বচ্ছতা ও অডিট' : 'Transparency', icon: FileSpreadsheet }
      ]
    },
    {
      group: isBn ? 'মিডিয়া ও গ্যালারি' : 'Media & Content',
      items: [
        { id: 'media_library' as AdminTab, label: isBn ? 'মিডিয়া লাইব্রেরি' : 'Media Library', icon: FolderOpen },
        { id: 'banners' as AdminTab, label: isBn ? 'ব্যানার ম্যানেজার' : 'Banners & Sliders', icon: ImageIcon },
        { id: 'gallery_albums' as AdminTab, label: isBn ? 'গ্যালারি অ্যালবাম' : 'Gallery Albums', icon: Tag },
        { id: 'press' as AdminTab, label: isBn ? 'গণমাধ্যমে সংবাদ (প্রেস)' : 'News & Press Coverage', icon: Newspaper },
        { id: 'committees' as AdminTab, label: isBn ? 'কমিটি ও নেতৃত্ব' : 'Committees Roster', icon: Award },
        { id: 'news_events' as AdminTab, label: isBn ? 'সংবাদ ও ইভেন্ট' : 'News & Events', icon: Calendar }
      ]
    },
    {
      group: isBn ? 'সেটিংস ও সিস্টেম' : 'Settings & System',
      items: [
        { id: 'seo' as AdminTab, label: isBn ? 'এসইও ও মেটাট্যাগ' : 'SEO & Social Cards', icon: Globe },
        { id: 'social_links' as AdminTab, label: isBn ? 'সামাজিক মাধ্যম' : 'Social Channels', icon: Share2 },
        { id: 'support_cms' as AdminTab, label: isBn ? 'পেমেন্ট চ্যানেল' : 'Donation Channels', icon: CreditCard },
        { id: 'contact_cms' as AdminTab, label: isBn ? 'যোগাযোগ সেটিংস' : 'Contact Settings', icon: PhoneCall },
        { id: 'messages' as AdminTab, label: isBn ? 'ব্যবহারকারী বার্তা' : 'User Messages', icon: Mail },
        { id: 'admin_users' as AdminTab, label: isBn ? 'অ্যাডমিন ইউজার' : 'Admin Roles', icon: UserCog },
        { id: 'audit' as AdminTab, label: isBn ? 'অডিট লগ' : 'Audit Logs', icon: History },
        { id: 'backup' as AdminTab, label: isBn ? 'ব্যাকআপ ও সিঙ্ক' : 'Backup & Diagnostics', icon: Database }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-20">
      {/* 1. Admin Portal Header */}
      <div className="bg-[#11241E] text-white border-b border-emerald-900/60 sticky top-0 z-30 shadow-warm-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006A4E] flex items-center justify-center text-white font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight font-display">
                  Infinity Bangladesh CMS
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-[#006A4E] text-emerald-200">
                  {currentRole.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-emerald-300/80">
                {isLiveSupabase ? '🟢 Supabase PostgreSQL Live' : '🟠 Local Offline Storage Active'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-emerald-200 font-semibold transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isBn ? 'ওয়েবসাইট দেখুন' : 'Live Website'}</span>
            </button>

            {isLiveSupabase && (
              <>
                <button
                  type="button"
                  onClick={async () => {
                    const res = await pushAllToSupabase();
                    setToastMessage(res.message);
                  }}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-bold transition-all cursor-pointer shadow-sm"
                  title="Push all local CMS changes and image URLs directly to Supabase cloud database"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isSyncing ? 'Pushing...' : (isBn ? 'ক্লাউডে সেভ করুন' : 'Push to Cloud')}</span>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    await syncWithSupabase();
                    setToastMessage(isBn ? 'সফলভাবে ক্লাউড ডাটাবেস থেকে লোড করা হয়েছে।' : 'Pulled latest data from cloud database.');
                  }}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006A4E] hover:bg-[#008562] text-xs text-white font-bold transition-all cursor-pointer"
                  title="Fetch latest updates from Supabase"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  <span>{isSyncing ? 'Syncing...' : (isBn ? 'সিঙ্ক' : 'Pull DB')}</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-xs text-white font-bold transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isBn ? 'লগআউট' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Admin Workspace Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Mobile Quick Section Selector */}
        <div className="lg:hidden mb-4 bg-white rounded-2xl border border-[#EAE3D9] p-3.5 shadow-warm-sm space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>{isBn ? 'সেকশন নির্বাচন করুন:' : 'Admin Section:'}</span>
            <span className="text-[11px] text-[#00523C] bg-[#E6F3EF] px-2.5 py-0.5 rounded-full font-bold border border-[#C2E2D7]">
              {tabGroups.flatMap(g => g.items).find(i => i.id === activeTab)?.label}
            </span>
          </div>
          <select
            value={activeTab}
            onChange={(e) => {
              setActiveTab(e.target.value as AdminTab);
            }}
            className="w-full p-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
          >
            {tabGroups.map((g, gIdx) => (
              <optgroup key={gIdx} label={g.group}>
                {g.items.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Desktop Left Sidebar Menu */}
          <div className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-[#EAE3D9] p-4 shadow-warm-sm space-y-6">
            {tabGroups.map((group, gIdx) => (
              <div key={gIdx} className="space-y-1">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider px-3 block">
                  {group.group}
                </span>
                <div className="space-y-0.5">
                  {group.items.map(item => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setActiveTab(item.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#E6F3EF] text-[#00523C] shadow-2xs'
                            : 'text-slate-700 hover:bg-[#FAF7F2] hover:text-[#006A4E]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-[#006A4E]' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#006A4E]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Right Content Workspace */}
          <div className="lg:col-span-9 space-y-6">
            <AdminErrorBoundary fallbackTitle="Admin Workspace Component Error">
            {/* -------------------------------------------------------- */}
            {/* TAB: OVERVIEW */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'ইনফিনিটি বাংলাদেশ কন্ট্রোল সেন্টার' : 'System Overview & Real-time Metrics'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {isBn ? 'ওয়েবসাইটের সকল কনটেন্ট ও ডেটাবেজ একনজরে' : 'Comprehensive summary of campaigns, volunteers, donations, and website health.'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => console.log('Picked:', url))}
                        className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 text-xs font-bold border border-[#EAE3D9] flex items-center gap-2 cursor-pointer"
                      >
                        <FolderOpen className="w-4 h-4 text-[#006A4E]" />
                        <span>Media Picker</span>
                      </button>
                    </div>
                  </div>

                  {/* KPI Cards Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-[#E6F3EF] border border-[#C2E2D7] space-y-1">
                      <span className="text-[11px] font-bold text-[#00523C] uppercase">Campaigns</span>
                      <p className="text-2xl font-extrabold text-[#00523C] font-mono">{campaigns.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                      <span className="text-[11px] font-bold text-amber-800 uppercase">Volunteers</span>
                      <p className="text-2xl font-extrabold text-amber-900 font-mono">{volunteers.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-1">
                      <span className="text-[11px] font-bold text-rose-800 uppercase">Donations Recorded</span>
                      <p className="text-2xl font-extrabold text-rose-900 font-mono">{donations.length}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                      <span className="text-[11px] font-bold text-blue-800 uppercase">Media Assets</span>
                      <p className="text-2xl font-extrabold text-blue-900 font-mono">{mediaLibrary.length}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    onClick={() => setActiveTab('homepage')}
                    className="p-5 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] shadow-warm-xs hover:shadow-warm-sm transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sliders className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">Homepage Hero & Sections</h3>
                    <p className="text-xs text-slate-500">Edit headline, slogans, real cover photo, and toggle section visibility.</p>
                  </div>

                  <div
                    onClick={() => setActiveTab('campaigns')}
                    className="p-5 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] shadow-warm-xs hover:shadow-warm-sm transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Flag className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">Add / Manage Campaigns</h3>
                    <p className="text-xs text-slate-500">Post seasonal drives like Eid Joy, Winter Relief, and track funds.</p>
                  </div>

                  <div
                    onClick={() => setActiveTab('media_library')}
                    className="p-5 rounded-3xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] shadow-warm-xs hover:shadow-warm-sm transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FolderOpen className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 font-display">Media Library & Photos</h3>
                    <p className="text-xs text-slate-500">Upload authentic photography, manage categories, and use across the site.</p>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: BRAND SETTINGS & CENTRAL SLOGAN */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'brand_settings' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-[#006A4E]" />
                      <span>{isBn ? 'ব্র্যান্ড আইডেন্টিটি, স্লোগান ও প্রাতিষ্ঠানিক সেটিংস' : 'Brand Identity, Central Slogan & Official Credentials'}</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn
                        ? 'অফিসিয়াল স্লোগান, প্রাতিষ্ঠানিক নাম, প্রতিষ্ঠা সাল, ঠিকানা ও লোগো পরিবর্তন করুন (পুরো সাইটে স্বয়ংক্রিয়ভাবে আপডেট হবে)।'
                        : 'Manage primary slogan, organization identity, established year, headquarters, and official credentials.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(isBn ? 'ব্র্যান্ড সেটিংস সংরক্ষিত হয়েছে' : 'Brand settings saved successfully')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm hover:bg-[#00523C] transition-all cursor-pointer"
                  >
                    Save Brand Settings
                  </button>
                </div>

                {/* Central Slogan Section */}
                <div className="p-5 rounded-2xl bg-[#E6F3EF] border border-[#C2E2D7] space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                      <h3 className="text-sm font-extrabold text-[#00523C] font-display">
                        Official Slogan: UNITED FOR HUMANITY (কেন্দ্রীয় স্লোগান)
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600">
                      Changing this updates the Header, Brand Logo, Homepage Hero, Footer, and Verified Badges globally across the entire website.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">Primary Slogan (English) *</label>
                      <input
                        type="text"
                        value={settings.primary_slogan?.en || settings.slogan?.en || 'United for Humanity'}
                        onChange={(e) => updateSettings({
                          primary_slogan: { ...(settings.primary_slogan || { en: '', bn: '' }), en: e.target.value },
                          slogan: { ...(settings.slogan || { en: '', bn: '' }), en: e.target.value }
                        })}
                        placeholder="United for Humanity"
                        className="w-full px-3.5 py-2 bg-white border border-[#C2E2D7] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#006A4E]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-800">মূল স্লোগান (বাংলা) *</label>
                      <input
                        type="text"
                        value={settings.primary_slogan?.bn || settings.slogan?.bn || 'মানবতার জন্য একতাবদ্ধ'}
                        onChange={(e) => updateSettings({
                          primary_slogan: { ...(settings.primary_slogan || { en: '', bn: '' }), bn: e.target.value },
                          slogan: { ...(settings.slogan || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        placeholder="মানবতার জন্য একতাবদ্ধ"
                        className="w-full px-3.5 py-2 bg-white border border-[#C2E2D7] rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-[#006A4E]"
                      />
                    </div>
                  </div>
                </div>

                {/* Organization Details */}
                <div className="space-y-4 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Organization Identity & Metadata</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Organization Name (English)</label>
                      <input
                        type="text"
                        value={settings.organizationName?.en || 'Infinity Bangladesh'}
                        onChange={(e) => updateSettings({
                          organizationName: { ...(settings.organizationName || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সংস্থার নাম (বাংলা)</label>
                      <input
                        type="text"
                        value={settings.organizationName?.bn || 'ইনফিনিটি বাংলাদেশ'}
                        onChange={(e) => updateSettings({
                          organizationName: { ...(settings.organizationName || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Team Identity</label>
                      <input
                        type="text"
                        value={settings.teamIdentity || 'Team Infinity'}
                        onChange={(e) => updateSettings({ teamIdentity: e.target.value })}
                        placeholder="Team Infinity"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Established Year</label>
                      <input
                        type="text"
                        value={settings.establishedYear || '2015'}
                        onChange={(e) => updateSettings({ establishedYear: e.target.value })}
                        placeholder="2015"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Headquarters Location</label>
                      <input
                        type="text"
                        value={settings.headquartersLocation || 'Bogura, Bangladesh'}
                        onChange={(e) => updateSettings({ headquartersLocation: e.target.value })}
                        placeholder="Bogura, Bangladesh"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Registration / Model</label>
                      <input
                        type="text"
                        value={settings.registrationNumber || 'Non-Profit Youth Organization'}
                        onChange={(e) => updateSettings({ registrationNumber: e.target.value })}
                        placeholder="Non-Profit Youth Organization"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Official Address, Phone, Email */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Official Address & Contact Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Address (English)</label>
                      <textarea
                        rows={2}
                        value={settings.officialAddress?.en || ''}
                        onChange={(e) => updateSettings({
                          officialAddress: { ...(settings.officialAddress || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">অফিসিয়াল ঠিকানা (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={settings.officialAddress?.bn || ''}
                        onChange={(e) => updateSettings({
                          officialAddress: { ...(settings.officialAddress || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Helpline Phone</label>
                      <input
                        type="text"
                        value={settings.officialPhone || '+880 1711-000000'}
                        onChange={(e) => updateSettings({ officialPhone: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Email Address</label>
                      <input
                        type="email"
                        value={settings.officialEmail || 'contact@infinitybangladesh.org'}
                        onChange={(e) => updateSettings({ officialEmail: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Logo & Visual Assets */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Logo & Brand Visuals</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9]">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={getAssetUrl(settings.logoUrl || '/logo.png')}
                          alt="Official Logo"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-slate-700 block">Logo URL</label>
                        <input
                          type="text"
                          value={settings.logoUrl || '/logo.png'}
                          onChange={(e) => updateSettings({ logoUrl: e.target.value })}
                          className="w-full px-3 py-1 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => openMediaPicker((url) => {
                            updateSettings({ logoUrl: url });
                            showToast('Logo updated');
                          })}
                          className="text-[11px] text-[#006A4E] font-bold hover:underline cursor-pointer"
                        >
                          Pick from Media Library
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9]">
                      <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 p-2 flex items-center justify-center shrink-0">
                        <img
                          src={getAssetUrl(settings.faviconUrl || '/favicon.ico')}
                          alt="Favicon"
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="space-y-1 flex-1">
                        <label className="text-xs font-bold text-slate-700 block">Favicon URL</label>
                        <input
                          type="text"
                          value={settings.faviconUrl || '/favicon.ico'}
                          onChange={(e) => updateSettings({ faviconUrl: e.target.value })}
                          className="w-full px-3 py-1 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => openMediaPicker((url) => {
                            updateSettings({ faviconUrl: url });
                            showToast('Favicon updated');
                          })}
                          className="text-[11px] text-[#006A4E] font-bold hover:underline cursor-pointer"
                        >
                          Pick from Media Library
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: HOMEPAGE EDITOR */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'homepage' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-8 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'হোমপেজ হিরো, ব্যানার ও সেকশন কনফিগারেশন' : 'Homepage Hero, Banners & Section Manager'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'হেডলাইন, স্লোগান, হিরো ইমেজ, ভলান্টিয়ার ও অনুদান ব্যানার এবং সেকশনের ক্রম পরিবর্তন করুন।' : 'Update headline, slogans, real cover photography, CTA banners, and reorder sections.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Homepage settings saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm hover:bg-[#00523C] transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>

                {/* Hero Slogan & Eyebrow */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#006A4E]" />
                    <span>Hero Eyebrow & Slogan</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Eyebrow (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.eyebrow.en}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, eyebrow: { ...homepageConfig.hero.eyebrow, en: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Eyebrow (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.eyebrow.bn}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, eyebrow: { ...homepageConfig.hero.eyebrow, bn: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Headlines */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Main Headline & Highlight</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Headline Main (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.headlineMain.en}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, headlineMain: { ...homepageConfig.hero.headlineMain, en: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Headline Highlight (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.headlineHighlight.en}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, headlineHighlight: { ...homepageConfig.hero.headlineHighlight, en: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Headline Main (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.headlineMain.bn}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, headlineMain: { ...homepageConfig.hero.headlineMain, bn: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Headline Highlight (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.hero.headlineHighlight.bn}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, headlineHighlight: { ...homepageConfig.hero.headlineHighlight, bn: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Description */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Hero Supporting Paragraph</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description (English)</label>
                      <textarea
                        rows={3}
                        value={homepageConfig.hero.description.en}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, description: { ...homepageConfig.hero.description, en: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={homepageConfig.hero.description.bn}
                        onChange={(e) => updateHomepageConfig({
                          hero: { ...homepageConfig.hero, description: { ...homepageConfig.hero.description, bn: e.target.value } }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Call-to-Action (CTA) Buttons Configuration */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-[#006A4E]" />
                      <span>Hero Action Buttons (হিরো সেকশনের CTA বাটন ও লিংকসমূহ)</span>
                    </h3>
                  </div>

                  {/* 1. Primary CTA Button */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#006A4E]" />
                        <span className="text-xs font-extrabold text-slate-900">
                          {isBn ? '১. প্রধান অ্যাকশন বাটন (Primary CTA Button)' : '1. Primary Action Button'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={homepageConfig.hero.primaryCta.openInNewTab || false}
                            onChange={(e) => updateHomepageConfig({
                              hero: {
                                ...homepageConfig.hero,
                                primaryCta: { ...homepageConfig.hero.primaryCta, openInNewTab: e.target.checked }
                              }
                            })}
                            className="rounded text-[#006A4E]"
                          />
                          <span>{isBn ? 'নতুন ট্যাবে খুলুন' : 'New Tab'}</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              primaryCta: { ...homepageConfig.hero.primaryCta, active: !homepageConfig.hero.primaryCta.active }
                            }
                          })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            homepageConfig.hero.primaryCta.active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {homepageConfig.hero.primaryCta.active ? 'Active' : 'Hidden'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.primaryCta.text.en}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              primaryCta: {
                                ...homepageConfig.hero.primaryCta,
                                text: { ...homepageConfig.hero.primaryCta.text, en: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          placeholder="e.g. Support Our Work"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.primaryCta.text.bn}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              primaryCta: {
                                ...homepageConfig.hero.primaryCta,
                                text: { ...homepageConfig.hero.primaryCta.text, bn: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          placeholder="যেমন: সহায়তা করুন"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.primaryCta.url}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              primaryCta: { ...homepageConfig.hero.primaryCta, url: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          placeholder="e.g. donate, volunteer, https://..."
                        />
                      </div>
                    </div>

                    {/* Quick Route Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Links:</span>
                      {['donate', 'volunteer', 'campaigns', 'about', 'transparency', 'contact'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              primaryCta: { ...homepageConfig.hero.primaryCta, url: r }
                            }
                          })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            homepageConfig.hero.primaryCta.url === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Secondary CTA Button */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                        <span className="text-xs font-extrabold text-slate-900">
                          {isBn ? '২. দ্বিতীয় অ্যাকশন বাটন (Secondary CTA Button)' : '2. Secondary Action Button'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={homepageConfig.hero.secondaryCta.openInNewTab || false}
                            onChange={(e) => updateHomepageConfig({
                              hero: {
                                ...homepageConfig.hero,
                                secondaryCta: { ...homepageConfig.hero.secondaryCta, openInNewTab: e.target.checked }
                              }
                            })}
                            className="rounded text-[#006A4E]"
                          />
                          <span>{isBn ? 'নতুন ট্যাবে খুলুন' : 'New Tab'}</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              secondaryCta: { ...homepageConfig.hero.secondaryCta, active: !homepageConfig.hero.secondaryCta.active }
                            }
                          })}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                            homepageConfig.hero.secondaryCta.active
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {homepageConfig.hero.secondaryCta.active ? 'Active' : 'Hidden'}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.secondaryCta.text.en}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              secondaryCta: {
                                ...homepageConfig.hero.secondaryCta,
                                text: { ...homepageConfig.hero.secondaryCta.text, en: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          placeholder="e.g. Become a Volunteer"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.secondaryCta.text.bn}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              secondaryCta: {
                                ...homepageConfig.hero.secondaryCta,
                                text: { ...homepageConfig.hero.secondaryCta.text, bn: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          placeholder="যেমন: স্বেচ্ছাসেবী হিসেবে যোগ দিন"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.secondaryCta.url}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              secondaryCta: { ...homepageConfig.hero.secondaryCta, url: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          placeholder="e.g. volunteer, campaigns, https://..."
                        />
                      </div>
                    </div>

                    {/* Quick Route Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Links:</span>
                      {['volunteer', 'donate', 'campaigns', 'about/executive-committee', 'transparency', 'gallery'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              secondaryCta: { ...homepageConfig.hero.secondaryCta, url: r }
                            }
                          })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            homepageConfig.hero.secondaryCta.url === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Story / Video CTA Button */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                        <span className="text-xs font-extrabold text-slate-900">
                          {isBn ? '৩. গল্প / ভিডিও অ্যাকশন বোতাম (Story CTA Button)' : '3. Story / Video Action Button'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => updateHomepageConfig({
                          hero: {
                            ...homepageConfig.hero,
                            storyCta: { ...homepageConfig.hero.storyCta, active: !homepageConfig.hero.storyCta.active }
                          }
                        })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                          homepageConfig.hero.storyCta.active
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {homepageConfig.hero.storyCta.active ? 'Active' : 'Hidden'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.storyCta.text.en}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              storyCta: {
                                ...homepageConfig.hero.storyCta,
                                text: { ...homepageConfig.hero.storyCta.text, en: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          placeholder="e.g. Our Story"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.storyCta.text.bn}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              storyCta: {
                                ...homepageConfig.hero.storyCta,
                                text: { ...homepageConfig.hero.storyCta.text, bn: e.target.value }
                              }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          placeholder="যেমন: আমাদের গল্প জানুন"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.storyCta.url}
                          onChange={(e) => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              storyCta: { ...homepageConfig.hero.storyCta, url: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          placeholder="e.g. about, videos, https://..."
                        />
                      </div>
                    </div>

                    {/* Quick Route Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Links:</span>
                      {['about', 'videos', 'stories', 'media-coverage', 'transparency'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHomepageConfig({
                            hero: {
                              ...homepageConfig.hero,
                              storyCta: { ...homepageConfig.hero.storyCta, url: r }
                            }
                          })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            homepageConfig.hero.storyCta.url === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Hero Image & Badges */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center justify-between">
                    <span>Hero Real Photography & Badges</span>
                    <button
                      type="button"
                      onClick={() => openMediaPicker((url) => {
                        updateHomepageConfig({
                          hero: { ...homepageConfig.hero, heroImageUrl: url }
                        });
                        showToast('Hero image updated from Media Library');
                      })}
                      className="text-xs text-[#006A4E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Pick from Media Library</span>
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                    <div className="sm:col-span-4 aspect-4/3 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-slate-100">
                      <img
                        src={getAssetUrl(homepageConfig.hero.heroImageUrl)}
                        alt="Hero Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="sm:col-span-8 space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Hero Image URL</label>
                        <input
                          type="text"
                          value={homepageConfig.hero.heroImageUrl}
                          onChange={(e) => updateHomepageConfig({
                            hero: { ...homepageConfig.hero, heroImageUrl: e.target.value }
                          })}
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Established Year</label>
                          <input
                            type="text"
                            value={homepageConfig.hero.badgeYear}
                            onChange={(e) => updateHomepageConfig({
                              hero: { ...homepageConfig.hero, badgeYear: e.target.value }
                            })}
                            className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Badge Location</label>
                          <input
                            type="text"
                            value={homepageConfig.hero.badgeLocation}
                            onChange={(e) => updateHomepageConfig({
                              hero: { ...homepageConfig.hero, badgeLocation: e.target.value }
                            })}
                            className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Badge Tag</label>
                          <input
                            type="text"
                            value={homepageConfig.hero.badgeTag}
                            onChange={(e) => updateHomepageConfig({
                              hero: { ...homepageConfig.hero, badgeTag: e.target.value }
                            })}
                            className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Who We Are (About Preview) Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#006A4E]" />
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        {isBn ? '“আমাদের পরিচয় ও লক্ষ্য” (Who We Are) সেকশন' : 'Who We Are (About Preview) Section'}
                      </h3>
                    </div>
                    <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-2.5 py-1 rounded-lg border border-[#EAE3D9]">
                      {isBn ? 'হোমপেজ ৩য় সেকশন' : 'Homepage Section 3'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">
                    {isBn
                      ? 'হোমপেজের এই সেকশনে আপনাদের কমিটি বা ভলান্টিয়ারদের গ্রুপ ছবি, স্লোগান, পরিচিতি এবং উক্তি (Quote) কাস্টমাইজ করুন।'
                      : 'Customize the team / committee group photo, headlines, story description, floating quote badge, and CTA button.'}
                  </p>

                  {/* Section Eyebrow Badge */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Section Eyebrow Badge (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.aboutPreview?.eyebrow?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            eyebrow: { ...(homepageConfig.aboutPreview?.eyebrow || { en: '', bn: '' }), en: e.target.value }
                          } as any
                        })}
                        placeholder="Who We Are"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সেকশন আইব্রো ব্যাজ (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.aboutPreview?.eyebrow?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            eyebrow: { ...(homepageConfig.aboutPreview?.eyebrow || { en: '', bn: '' }), bn: e.target.value }
                          } as any
                        })}
                        placeholder="আমাদের পরিচয় ও লক্ষ্য"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Headlines */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Main Title (English)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.titleMain?.en || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              titleMain: { ...(homepageConfig.aboutPreview?.titleMain || { en: '', bn: '' }), en: e.target.value }
                            } as any
                          })}
                          placeholder="People First. Humanity Always."
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Highlighted Text (English - Green)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.titleHighlight?.en || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              titleHighlight: { ...(homepageConfig.aboutPreview?.titleHighlight || { en: '', bn: '' }), en: e.target.value }
                            } as any
                          })}
                          placeholder="Serving with Empathy."
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.titleMain?.bn || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              titleMain: { ...(homepageConfig.aboutPreview?.titleMain || { en: '', bn: '' }), bn: e.target.value }
                            } as any
                          })}
                          placeholder="মানুষের পাশে দাঁড়ানোই আমাদের ব্রত —"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">হাইলাইটেড টেক্সট (বাংলা - সবুজ)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.titleHighlight?.bn || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              titleHighlight: { ...(homepageConfig.aboutPreview?.titleHighlight || { en: '', bn: '' }), bn: e.target.value }
                            } as any
                          })}
                          placeholder="মানুষ প্রথম, মানবতাই মূল।"
                          className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Story Description */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description / Story (English)</label>
                      <textarea
                        rows={3}
                        value={homepageConfig.aboutPreview?.description?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            description: { ...(homepageConfig.aboutPreview?.description || { en: '', bn: '' }), en: e.target.value }
                          } as any
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">বিবরণ / সংক্ষিপ্ত গল্প (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={homepageConfig.aboutPreview?.description?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            description: { ...(homepageConfig.aboutPreview?.description || { en: '', bn: '' }), bn: e.target.value }
                          } as any
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  {/* Photo & Media Picker */}
                  <div className="space-y-3 p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#006A4E]" />
                        <label className="text-xs font-bold text-slate-800">
                          {isBn ? 'কমিটি / ভলান্টিয়ার গ্রুপ ছবি (Team/Committee Photo)' : 'Team / Committee Group Photo'}
                        </label>
                      </div>
                      <button
                        type="button"
                        onClick={() => openMediaPicker((url) => {
                          updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              imageUrl: url
                            } as any
                          });
                          showToast('Photo updated from Media Library');
                        })}
                        className="text-xs text-[#006A4E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>Pick from Media Library</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                      <div className="sm:col-span-4 aspect-4/3 rounded-xl overflow-hidden border border-white shadow-warm-sm bg-slate-100">
                        <img
                          src={getAssetUrl(homepageConfig.aboutPreview?.imageUrl || '/images/events/winter-warmth.jpg')}
                          alt="About Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="sm:col-span-8 space-y-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Image URL / Path</label>
                          <input
                            type="text"
                            value={homepageConfig.aboutPreview?.imageUrl || ''}
                            onChange={(e) => updateHomepageConfig({
                              aboutPreview: {
                                ...(homepageConfig.aboutPreview || {}),
                                imageUrl: e.target.value
                              } as any
                            })}
                            placeholder="/images/events/winter-warmth.jpg"
                            className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          />
                        </div>
                        <p className="text-[11px] text-slate-500 leading-relaxed">
                          💡 <strong>টিপস:</strong> এখানে আপনার কমিটি বা ভলান্টিয়ারদের সুন্দর একটি গ্রুপ ছবি দিলে হোমপেজে দলগত শক্তি ও বিশ্বাসযোগ্যতা দারুণভাবে ফুটে উঠবে।
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Quote Card */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Floating Quote (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.aboutPreview?.quoteText?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            quoteText: { ...(homepageConfig.aboutPreview?.quoteText || { en: '', bn: '' }), en: e.target.value }
                          } as any
                        })}
                        placeholder="“Youth with Purpose. Community with Empathy.”"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">ফ্লোটিং উক্তি (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.aboutPreview?.quoteText?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            quoteText: { ...(homepageConfig.aboutPreview?.quoteText || { en: '', bn: '' }), bn: e.target.value }
                          } as any
                        })}
                        placeholder="“মানবতার জয়গান গাইতে তারুণ্যের এই নিঃস্বার্থ ঐক্য।”"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Quote Author / Team Tag</label>
                      <input
                        type="text"
                        value={homepageConfig.aboutPreview?.quoteAuthor || ''}
                        onChange={(e) => updateHomepageConfig({
                          aboutPreview: {
                            ...(homepageConfig.aboutPreview || {}),
                            quoteAuthor: e.target.value
                          } as any
                        })}
                        placeholder="Team Infinity / Executive Committee"
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* CTA Button & Target Route */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">About CTA Button (English)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.ctaText?.en || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              ctaText: { ...(homepageConfig.aboutPreview?.ctaText || { en: '', bn: '' }), en: e.target.value }
                            } as any
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          placeholder="e.g. Explore Our Full Journey"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">পরিচিতি বাটন টেক্সট (বাংলা)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.ctaText?.bn || ''}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              ctaText: { ...(homepageConfig.aboutPreview?.ctaText || { en: '', bn: '' }), bn: e.target.value }
                            } as any
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          placeholder="যেমন: আমাদের সম্পূর্ণ গল্প জানুন"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-1">CTA Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.aboutPreview?.ctaUrl || 'about'}
                          onChange={(e) => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              ctaUrl: e.target.value
                            } as any
                          })}
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                          placeholder="e.g. about, campaigns, volunteer"
                        />
                      </div>
                    </div>

                    {/* Quick Route Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Links:</span>
                      {['about', 'about/executive-committee', 'transparency', 'stories', 'volunteer', 'donate'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHomepageConfig({
                            aboutPreview: {
                              ...(homepageConfig.aboutPreview || {}),
                              ctaUrl: r
                            } as any
                          })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            (homepageConfig.aboutPreview?.ctaUrl || 'about') === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Homepage Volunteer CTA Banner Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#006A4E]" />
                    <h3 className="text-sm font-bold text-slate-900 font-display">Homepage Volunteer CTA Banner</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Banner Title (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.volunteerBanner?.title?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          volunteerBanner: {
                            ...(homepageConfig.volunteerBanner || {
                              eyebrow: { en: '', bn: '' },
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'volunteer',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'about/executive-committee'
                            }),
                            title: { ...(homepageConfig.volunteerBanner?.title || { en: '', bn: '' }), en: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">ব্যানার শিরোনাম (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.volunteerBanner?.title?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          volunteerBanner: {
                            ...(homepageConfig.volunteerBanner || {
                              eyebrow: { en: '', bn: '' },
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'volunteer',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'about/executive-committee'
                            }),
                            title: { ...(homepageConfig.volunteerBanner?.title || { en: '', bn: '' }), bn: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Banner Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={homepageConfig.volunteerBanner?.subtitle?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          volunteerBanner: {
                            ...(homepageConfig.volunteerBanner || {
                              eyebrow: { en: '', bn: '' },
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'volunteer',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'about/executive-committee'
                            }),
                            subtitle: { ...(homepageConfig.volunteerBanner?.subtitle || { en: '', bn: '' }), en: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">ব্যানার বিবরণ (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={homepageConfig.volunteerBanner?.subtitle?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          volunteerBanner: {
                            ...(homepageConfig.volunteerBanner || {
                              eyebrow: { en: '', bn: '' },
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'volunteer',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'about/executive-committee'
                            }),
                            subtitle: { ...(homepageConfig.volunteerBanner?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  {/* Volunteer Banner CTA Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Primary Button */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-2.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {isBn ? 'প্রধান ভলান্টিয়ার বাটন (Primary CTA)' : 'Primary Volunteer Button'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={homepageConfig.volunteerBanner?.primaryButtonText?.en || homepageConfig.volunteerBanner?.primaryCtaText?.en || ''}
                            onChange={(e) => updateHomepageConfig({
                              volunteerBanner: {
                                ...(homepageConfig.volunteerBanner || {} as any),
                                primaryButtonText: { ...(homepageConfig.volunteerBanner?.primaryButtonText || { en: '', bn: '' }), en: e.target.value },
                                primaryCtaText: { ...(homepageConfig.volunteerBanner?.primaryCtaText || { en: '', bn: '' }), en: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs"
                            placeholder="Become a Volunteer"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={homepageConfig.volunteerBanner?.primaryButtonText?.bn || homepageConfig.volunteerBanner?.primaryCtaText?.bn || ''}
                            onChange={(e) => updateHomepageConfig({
                              volunteerBanner: {
                                ...(homepageConfig.volunteerBanner || {} as any),
                                primaryButtonText: { ...(homepageConfig.volunteerBanner?.primaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                                primaryCtaText: { ...(homepageConfig.volunteerBanner?.primaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="স্বেচ্ছাসেবী হিসেবে যোগ দিন"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.volunteerBanner?.primaryButtonUrl || homepageConfig.volunteerBanner?.primaryCtaUrl || 'volunteer'}
                          onChange={(e) => updateHomepageConfig({
                            volunteerBanner: {
                              ...(homepageConfig.volunteerBanner || {} as any),
                              primaryButtonUrl: e.target.value,
                              primaryCtaUrl: e.target.value
                            }
                          })}
                          className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="volunteer"
                        />
                      </div>
                    </div>

                    {/* Secondary Button */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-2.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {isBn ? 'দ্বিতীয় বাটন (Secondary CTA)' : 'Secondary Button'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={homepageConfig.volunteerBanner?.secondaryButtonText?.en || homepageConfig.volunteerBanner?.secondaryCtaText?.en || ''}
                            onChange={(e) => updateHomepageConfig({
                              volunteerBanner: {
                                ...(homepageConfig.volunteerBanner || {} as any),
                                secondaryButtonText: { ...(homepageConfig.volunteerBanner?.secondaryButtonText || { en: '', bn: '' }), en: e.target.value },
                                secondaryCtaText: { ...(homepageConfig.volunteerBanner?.secondaryCtaText || { en: '', bn: '' }), en: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs"
                            placeholder="Meet Our Team"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={homepageConfig.volunteerBanner?.secondaryButtonText?.bn || homepageConfig.volunteerBanner?.secondaryCtaText?.bn || ''}
                            onChange={(e) => updateHomepageConfig({
                              volunteerBanner: {
                                ...(homepageConfig.volunteerBanner || {} as any),
                                secondaryButtonText: { ...(homepageConfig.volunteerBanner?.secondaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                                secondaryCtaText: { ...(homepageConfig.volunteerBanner?.secondaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="আমাদের নেতৃত্ব দেখুন"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.volunteerBanner?.secondaryButtonUrl || homepageConfig.volunteerBanner?.secondaryCtaUrl || 'about/executive-committee'}
                          onChange={(e) => updateHomepageConfig({
                            volunteerBanner: {
                              ...(homepageConfig.volunteerBanner || {} as any),
                              secondaryButtonUrl: e.target.value,
                              secondaryCtaUrl: e.target.value
                            }
                          })}
                          className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="about/executive-committee"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Homepage Support / Donation CTA Banner Section */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    <h3 className="text-sm font-bold text-slate-900 font-display">Homepage Support & Donation Banner</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Support Title (English)</label>
                      <input
                        type="text"
                        value={homepageConfig.supportBanner?.title?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          supportBanner: {
                            ...(homepageConfig.supportBanner || {
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'donate',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'transparency'
                            }),
                            title: { ...(homepageConfig.supportBanner?.title || { en: '', bn: '' }), en: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সাপোর্ট শিরোনাম (বাংলা)</label>
                      <input
                        type="text"
                        value={homepageConfig.supportBanner?.title?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          supportBanner: {
                            ...(homepageConfig.supportBanner || {
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'donate',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'transparency'
                            }),
                            title: { ...(homepageConfig.supportBanner?.title || { en: '', bn: '' }), bn: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Support Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={homepageConfig.supportBanner?.subtitle?.en || ''}
                        onChange={(e) => updateHomepageConfig({
                          supportBanner: {
                            ...(homepageConfig.supportBanner || {
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'donate',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'transparency'
                            }),
                            subtitle: { ...(homepageConfig.supportBanner?.subtitle || { en: '', bn: '' }), en: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সাপোর্ট বিবরণ (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={homepageConfig.supportBanner?.subtitle?.bn || ''}
                        onChange={(e) => updateHomepageConfig({
                          supportBanner: {
                            ...(homepageConfig.supportBanner || {
                              title: { en: '', bn: '' },
                              subtitle: { en: '', bn: '' },
                              primaryButtonText: { en: '', bn: '' },
                              primaryButtonUrl: 'donate',
                              secondaryButtonText: { en: '', bn: '' },
                              secondaryButtonUrl: 'transparency'
                            }),
                            subtitle: { ...(homepageConfig.supportBanner?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                          }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Support Banner CTA Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Primary Button */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-2.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {isBn ? 'প্রধান অনুদান বাটন (Primary Donation CTA)' : 'Primary Donation Button'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={homepageConfig.supportBanner?.primaryButtonText?.en || homepageConfig.supportBanner?.primaryCtaText?.en || ''}
                            onChange={(e) => updateHomepageConfig({
                              supportBanner: {
                                ...(homepageConfig.supportBanner || {} as any),
                                primaryButtonText: { ...(homepageConfig.supportBanner?.primaryButtonText || { en: '', bn: '' }), en: e.target.value },
                                primaryCtaText: { ...(homepageConfig.supportBanner?.primaryCtaText || { en: '', bn: '' }), en: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs"
                            placeholder="Donate Now"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={homepageConfig.supportBanner?.primaryButtonText?.bn || homepageConfig.supportBanner?.primaryCtaText?.bn || ''}
                            onChange={(e) => updateHomepageConfig({
                              supportBanner: {
                                ...(homepageConfig.supportBanner || {} as any),
                                primaryButtonText: { ...(homepageConfig.supportBanner?.primaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                                primaryCtaText: { ...(homepageConfig.supportBanner?.primaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="অনলাইন অনুদান প্রদান"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.supportBanner?.primaryButtonUrl || homepageConfig.supportBanner?.primaryCtaUrl || 'donate'}
                          onChange={(e) => updateHomepageConfig({
                            supportBanner: {
                              ...(homepageConfig.supportBanner || {} as any),
                              primaryButtonUrl: e.target.value,
                              primaryCtaUrl: e.target.value
                            }
                          })}
                          className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="donate"
                        />
                      </div>
                    </div>

                    {/* Secondary Button */}
                    <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-2.5">
                      <span className="text-xs font-extrabold text-slate-800 block">
                        {isBn ? 'দ্বিতীয় স্বচ্ছতা বাটন (Secondary Transparency CTA)' : 'Secondary Transparency Button'}
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={homepageConfig.supportBanner?.secondaryButtonText?.en || homepageConfig.supportBanner?.secondaryCtaText?.en || ''}
                            onChange={(e) => updateHomepageConfig({
                              supportBanner: {
                                ...(homepageConfig.supportBanner || {} as any),
                                secondaryButtonText: { ...(homepageConfig.supportBanner?.secondaryButtonText || { en: '', bn: '' }), en: e.target.value },
                                secondaryCtaText: { ...(homepageConfig.supportBanner?.secondaryCtaText || { en: '', bn: '' }), en: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs"
                            placeholder="Audit & Reports"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={homepageConfig.supportBanner?.secondaryButtonText?.bn || homepageConfig.supportBanner?.secondaryCtaText?.bn || ''}
                            onChange={(e) => updateHomepageConfig({
                              supportBanner: {
                                ...(homepageConfig.supportBanner || {} as any),
                                secondaryButtonText: { ...(homepageConfig.supportBanner?.secondaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                                secondaryCtaText: { ...(homepageConfig.supportBanner?.secondaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                              }
                            })}
                            className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="স্বচ্ছতা ও অডিট রিপোর্ট"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={homepageConfig.supportBanner?.secondaryButtonUrl || homepageConfig.supportBanner?.secondaryCtaUrl || 'transparency'}
                          onChange={(e) => updateHomepageConfig({
                            supportBanner: {
                              ...(homepageConfig.supportBanner || {} as any),
                              secondaryButtonUrl: e.target.value,
                              secondaryCtaUrl: e.target.value
                            }
                          })}
                          className="w-full px-2.5 py-1.5 bg-[#FAF7F2] border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="transparency"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section Ordering & Visibility */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Section Ordering & Visibility</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {homepageConfig.sectionOrder.map((sectionKey, index) => {
                      const isVisible = homepageConfig.sectionVisibility[sectionKey] !== false;
                      return (
                        <div
                          key={sectionKey}
                          className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-white text-slate-700 text-xs font-bold flex items-center justify-center border border-slate-200">
                              {index + 1}
                            </span>
                            <span className="text-xs font-bold text-slate-800 capitalize">
                              {sectionKey} Section
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              const newVis = { ...homepageConfig.sectionVisibility, [sectionKey]: !isVisible };
                              updateHomepageConfig({ sectionVisibility: newVis });
                              showToast(`Toggled ${sectionKey} visibility`);
                            }}
                            className={`p-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
                              isVisible ? 'bg-[#E6F3EF] text-[#00523C]' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {isVisible ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                            <span>{isVisible ? 'Visible' : 'Hidden'}</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: ABOUT CMS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'about_cms' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'আমাদের পরিচয়, লক্ষ্য ও দর্শন' : 'About Organization CMS'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'মিশন, ভিশন, ইতিহাস ও সাংগঠনিক পটভূমি পরিবর্তন করুন।' : 'Edit organization mission, vision, history, established year, and locations.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('About settings saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm"
                  >
                    Save Changes
                  </button>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Mission Statement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Mission (English)</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.mission.en}
                        onChange={(e) => updateAboutSettings({
                          mission: { ...aboutSettings.mission, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Mission (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.mission.bn}
                        onChange={(e) => updateAboutSettings({
                          mission: { ...aboutSettings.mission, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Vision Statement</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Vision (English)</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.vision.en}
                        onChange={(e) => updateAboutSettings({
                          vision: { ...aboutSettings.vision, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Vision (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={aboutSettings.vision.bn}
                        onChange={(e) => updateAboutSettings({
                          vision: { ...aboutSettings.vision, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Historical Background</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">History & Genesis (English)</label>
                      <textarea
                        rows={4}
                        value={aboutSettings.history.en}
                        onChange={(e) => updateAboutSettings({
                          history: { ...aboutSettings.history, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">History & Genesis (বাংলা)</label>
                      <textarea
                        rows={4}
                        value={aboutSettings.history.bn}
                        onChange={(e) => updateAboutSettings({
                          history: { ...aboutSettings.history, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: CAMPAIGNS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'campaigns' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'মানবিক ক্যাম্পেইন ব্যবস্থাপনা' : 'Humanitarian Campaigns Manager'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {isBn ? 'ঈদ আনন্দ, শীতবস্ত্র ত্রাণ ও জরুরি সহায়তা ক্যাম্পেইন পরিচালনা করুন।' : 'Create and manage seasonal field drives, target funds, and verified beneficiary records.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingCampaign(null);
                        setIsCampaignModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isBn ? 'নতুন ক্যাম্পেইন যুক্ত করুন' : 'Add New Campaign'}</span>
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      placeholder={isBn ? 'ক্যাম্পেইনের নাম বা বিভাগ দিয়ে খুঁজুন...' : 'Search campaigns by title or category...'}
                      className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs focus:outline-none focus:bg-white"
                    />
                  </div>

                  {/* Campaign List */}
                  <div className="space-y-3 pt-2">
                    {campaigns
                      .filter(c =>
                        searchFilter === '' ||
                        c.title.en.toLowerCase().includes(searchFilter.toLowerCase()) ||
                        c.title.bn.includes(searchFilter)
                      )
                      .map(camp => (
                        <div
                          key={camp.id}
                          className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                              <img
                                src={getAssetUrl(camp.imageUrl)}
                                alt={camp.title.en}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-slate-900">{camp.title.en}</h4>
                                {camp.isFeatured && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                                    Featured
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-500">{camp.title.bn} &bull; {camp.category} &bull; {camp.date}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingCampaign(camp);
                                setIsCampaignModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete campaign: ${camp.title.en}?`)) {
                                  deleteCampaign(camp.id);
                                  showToast('Campaign deleted');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: PROGRAMS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'programs' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'সেবামূলক কর্মসূচি ও প্রোগ্রাম' : 'Humanitarian Programs Manager'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {isBn ? 'শিশু কল্যাণ, শীতবস্ত্র ত্রাণ ও অন্যান্য স্থায়ী কর্মসূচি পরিচালনা করুন।' : 'Manage long-term humanitarian initiatives, child welfare, and relief missions.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingProgram(null);
                        setIsProgramModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isBn ? 'নতুন প্রোগ্রাম যোগ করুন' : 'Add New Program'}</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {programs.map(prog => (
                      <div
                        key={prog.id}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                            <img
                              src={getAssetUrl(prog.imageUrl)}
                              alt={prog.title.en}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{prog.title.en}</h4>
                            <p className="text-xs text-slate-500">{prog.title.bn} &bull; {prog.category} &bull; Status: {prog.status}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProgram(prog);
                              setIsProgramModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete program: ${prog.title.en}?`)) {
                                deleteProgram(prog.id);
                                showToast('Program deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: IMPACT METRICS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'impact' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'ইমপ্যাক্ট মেট্রিক্স ও পরিসংখ্যান' : 'Impact Metrics & Real-time Numbers'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'হোমপেজ ও ইমপ্যাক্ট পেজের সংখ্যাভিত্তিক অগ্রগতি পরিবর্তন করুন।' : 'Update headline numbers, beneficiary totals, volunteer count, and active years.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Impact metrics saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Save Metrics
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {metrics.map(metric => (
                    <div
                      key={metric.id}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-700">Indicator #{metric.order || metric.id}</span>
                        <span className="text-xs font-mono font-bold text-[#006A4E]">{metric.value}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Numeric Value</label>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => updateMetric(metric.id, { value: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bold font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-500">Icon Key</label>
                          <input
                            type="text"
                            value={metric.iconName}
                            onChange={(e) => updateMetric(metric.id, { iconName: e.target.value })}
                            className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">Label (English)</label>
                        <input
                          type="text"
                          value={metric.label.en}
                          onChange={(e) => updateMetric(metric.id, { label: { ...metric.label, en: e.target.value } })}
                          className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500">লেবেল (বাংলা)</label>
                        <input
                          type="text"
                          value={metric.label.bn}
                          onChange={(e) => updateMetric(metric.id, { label: { ...metric.label, bn: e.target.value } })}
                          className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: IMPACT STORIES */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'stories' && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'বাস্তব জীবনের রূপান্তর ও গল্প' : 'Impact Stories & Transformations'}
                      </h2>
                      <p className="text-xs text-slate-500">
                        {isBn ? 'মাঠপর্যায়ের সুবিধাভোগীদের বাস্তব জীবনের গল্প ও মানবিক রূপান্তর প্রকাশ করুন।' : 'Publish verified field transformation stories with consent confirmations.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingStory(null);
                        setIsStoryModalOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isBn ? 'নতুন গল্প প্রকাশ করুন' : 'Add New Story'}</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    {stories.map(st => (
                      <div
                        key={st.id}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                            <img
                              src={getAssetUrl(st.imageUrl)}
                              alt={st.title.en}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{st.title.en}</h4>
                            <p className="text-xs text-slate-500">{st.title.bn} &bull; {st.personOrCommunity.en} &bull; {st.location.en}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStory(st);
                              setIsStoryModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete story: ${st.title.en}?`)) {
                                deleteStory(st.id);
                                showToast('Story deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: FAQS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'faqs' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-[#006A4E]" />
                      <span>{isBn ? 'সাধারণ জিজ্ঞাসা ও প্রশ্নোত্তর (FAQ Manager)' : 'Frequently Asked Questions (FAQ CMS)'}</span>
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'ওয়েবসাইটের সকল প্রশ্নোত্তর, ক্যাটাগরি ও প্রদর্শন ক্রম নিয়ন্ত্রণ করুন।' : 'Manage transparent Q&As regarding operations, funding, donation policies, and volunteering.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingFAQ(null);
                      setIsFAQModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন প্রশ্নোত্তর যোগ করুন' : 'Add New FAQ'}</span>
                  </button>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={isBn ? 'প্রশ্ন বা উত্তর দিয়ে খুঁজুন...' : 'Search FAQs by question or keyword...'}
                    className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs focus:outline-none focus:bg-white"
                  />
                </div>

                {/* FAQ List */}
                <div className="space-y-3 pt-2">
                  {faqs
                    .filter(f =>
                      searchFilter === '' ||
                      f.question.en.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      f.question.bn.includes(searchFilter) ||
                      f.answer.en.toLowerCase().includes(searchFilter.toLowerCase()) ||
                      f.answer.bn.includes(searchFilter)
                    )
                    .map((faqItem, idx) => (
                      <div
                        key={faqItem.id}
                        className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-xl bg-white text-slate-700 font-mono font-bold text-xs flex items-center justify-center border border-slate-200">
                              #{faqItem.displayOrder || idx + 1}
                            </span>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-sm text-slate-900">{faqItem.question.en}</h4>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C]">
                                  {faqItem.category}
                                </span>
                                {faqItem.active === false && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                                    Hidden
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 font-bengali">{faqItem.question.bn}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingFAQ(faqItem);
                                setIsFAQModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete FAQ: "${faqItem.question.en}"?`)) {
                                  deleteFAQ(faqItem.id);
                                  showToast('FAQ item deleted');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200/80 space-y-1">
                          <p><strong className="text-slate-700">EN:</strong> {faqItem.answer.en}</p>
                          <p className="font-bengali"><strong className="text-slate-700">বাং:</strong> {faqItem.answer.bn}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: TRANSPARENCY */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'transparency' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'আর্থিক স্বচ্ছতা ও অডিট রিপোর্ট' : 'Financial Transparency & Audit Reports'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'বার্ষিক আয়-ব্যয় প্রতিবেদন ও অডিট নথি প্রকাশ করুন।' : 'Manage published annual statements, expenditure breakdowns, and verifiable audit records.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newRep: Omit<TransparencyReport, 'id'> = {
                        title: { en: `Annual Audit Report ${new Date().getFullYear()}`, bn: `বার্ষিক অডিট রিপোর্ট ${new Date().getFullYear()}` },
                        year: `${new Date().getFullYear()}`,
                        type: 'Financial Audit',
                        fileUrl: '/documents/infinity-audit-report.pdf',
                        fileSize: '1.4 MB',
                        uploadDate: new Date().toISOString().split('T')[0],
                        status: 'official',
                        description: { en: 'Full independent financial review and verification.', bn: 'সম্পূর্ণ নিরপেক্ষ আর্থিক অডিট ও যাচাইকরণ।' },
                        displayOrder: reports.length + 1
                      };
                      addReport(newRep);
                      showToast('Audit report created');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Report</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {reports.map(rep => (
                    <div
                      key={rep.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{rep.title.en}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C]">
                            Year {rep.year}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{rep.title.bn} &bull; Type: {rep.type}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete report: ${rep.title.en}?`)) {
                              deleteReport(rep.id);
                              showToast('Report deleted');
                            }
                          }}
                          className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: GALLERY ALBUMS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'gallery_albums' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'গ্যালারি অ্যালবাম ব্যবস্থাপনা' : 'Gallery Albums & Event Collections'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'ইভেন্টভিত্তিক ফটো অ্যালবাম তৈরি, সম্পাদনা ও ছবি যুক্ত করুন।' : 'Organize and publish event-specific photo collections with cover images and batch photo assignments.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingAlbum(null);
                      setIsAlbumModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন অ্যালবাম তৈরি' : 'Create New Album'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {galleryAlbums.map(alb => {
                    const albumPhotosCount = gallery.filter(g => g.albumId === alb.id).length;
                    return (
                      <div
                        key={alb.id}
                        className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-3">
                          <div className="relative aspect-16/9 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                            <img
                              src={getAssetUrl(alb.coverImageUrl)}
                              alt={alb.title.en}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                            <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                              {alb.category}
                            </div>
                            <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-emerald-900/80 backdrop-blur-xs text-emerald-100 text-[10px] font-bold">
                              {albumPhotosCount} photos
                            </div>
                          </div>

                          <div>
                            <h4 className="font-bold text-sm text-slate-900 leading-snug">{alb.title.en}</h4>
                            <p className="text-xs text-slate-500 font-bengali">{alb.title.bn}</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">Date: {alb.date}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-[#EAE3D9] gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingAlbumPhotos(alb);
                              setIsAlbumPhotoManagerOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE3D9] hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-[#006A4E]" />
                            <span>Manage Photos ({albumPhotosCount})</span>
                          </button>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAlbum(alb);
                                setIsAlbumModalOpen(true);
                              }}
                              className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer"
                              title="Edit Album Details"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete album: ${alb.title.en}? Photos inside will not be deleted from media library.`)) {
                                  deleteGalleryAlbum(alb.id);
                                  showToast('Album deleted');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 cursor-pointer"
                              title="Delete Album"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: NEWS & EVENTS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'news_events' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'সংবাদ বিজ্ঞপ্তি ও ইভেন্ট' : 'News Releases & Community Events'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'সংবাদ বিজ্ঞপ্তি এবং আসন্ন ইভেন্টসমূহ প্রকাশ করুন।' : 'Publish official press updates and schedule upcoming volunteer events.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newNews: Omit<NewsArticle, 'id'> = {
                        slug: `news-${Date.now()}`,
                        title: { en: 'New Organization Press Release', bn: 'নতুন সাংগঠনিক সংবাদ বিজ্ঞপ্তি' },
                        excerpt: { en: 'Brief summary of the announcement.', bn: 'বিজ্ঞপ্তির সংক্ষিপ্ত সারসংক্ষেপ।' },
                        content: { en: 'Full text content of the news article...', bn: 'সংবাদের সম্পূর্ণ বিস্তারিত বিবরণ...' },
                        author: 'Team Infinity Media Wing',
                        date: new Date().toISOString().split('T')[0],
                        imageUrl: '/images/infinity-cover-hero.jpg',
                        category: 'Press Release',
                        tags: ['Official', 'Humanitarian'],
                        status: 'published'
                      };
                      addNews(newNews);
                      showToast('News article published');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publish News</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {news.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{item.title.en}</h4>
                        <p className="text-xs text-slate-500">{item.title.bn} &bull; {item.date}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete news: ${item.title.en}?`)) {
                            deleteNews(item.id);
                            showToast('News article removed');
                          }
                        }}
                        className="p-2 text-rose-500 hover:text-rose-700 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: NAVIGATION & MENUS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'navigation' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-8 shadow-warm-sm">
                {/* Header Title */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'হেডার ও মেনু নেভিগেশন বিল্ডার' : 'Header Actions & Navigation Menu Builder'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn
                        ? 'ওয়েবসাইটের প্রধান মেনু আইটেম, ড্রপডাউন এবং হেডারের বাটনসমূহ (অনুদানের বাটন, সার্চ, ভাষা পরিবর্তন) হাইড/আনহাইড ও এডিট করুন।'
                        : 'Manage navbar links, submenus, and toggle header action buttons (Donate button, search, language switcher, notice bar) with instant eye toggle.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingNav(null);
                      setIsNavModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm hover:bg-[#00523C] flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন মেনু লিঙ্ক' : 'Add Menu Link'}</span>
                  </button>
                </div>

                {/* 1. Header Action Buttons & Widgets (Eye Hide/Unhide Controls) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#006A4E]" />
                    <h3 className="text-sm font-bold text-slate-900 font-display">
                      {isBn ? 'হেডার অ্যাকশন বাটন ও উইজেট নিয়ন্ত্রণ (Eye Hide/Unhide)' : 'Header Action Buttons & Widgets'}
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Support / Donate Button Widget */}
                    <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      headerSettings.showSupportButton !== false
                        ? 'bg-[#FAF7F2] border-[#EAE3D9]'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-600 fill-rose-600" />
                          <span className="text-xs font-bold text-slate-900">
                            {isBn ? 'অনুদানের বাটন (Donate / Support Button)' : 'Support / Donate CTA Button'}
                          </span>
                        </div>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newShow = !headerSettings.showSupportButton;
                            updateHeaderSettings({ showSupportButton: newShow });
                            showToast(newShow ? 'Support button is now visible' : 'Support button is now hidden');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            headerSettings.showSupportButton !== false
                              ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title={headerSettings.showSupportButton !== false ? 'Click to Hide button' : 'Click to Show button'}
                        >
                          {headerSettings.showSupportButton !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">Button Text (English)</label>
                          <input
                            type="text"
                            value={headerSettings.supportButtonText?.en || ''}
                            onChange={(e) => updateHeaderSettings({
                              supportButtonText: { ...(headerSettings.supportButtonText || { en: '', bn: '' }), en: e.target.value }
                            })}
                            placeholder="Support Us"
                            className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700">বাটনের লেখা (বাংলা)</label>
                          <input
                            type="text"
                            value={headerSettings.supportButtonText?.bn || ''}
                            onChange={(e) => updateHeaderSettings({
                              supportButtonText: { ...(headerSettings.supportButtonText || { en: '', bn: '' }), bn: e.target.value }
                            })}
                            placeholder="সহায়তা করুন"
                            className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Search Button Widget */}
                    <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      headerSettings.showSearch !== false
                        ? 'bg-[#FAF7F2] border-[#EAE3D9]'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Search className="w-4 h-4 text-[#006A4E]" />
                          <span className="text-xs font-bold text-slate-900">
                            {isBn ? 'অনুসন্ধান বাটন (Search Icon Button)' : 'Search Button'}
                          </span>
                        </div>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newShow = !headerSettings.showSearch;
                            updateHeaderSettings({ showSearch: newShow });
                            showToast(newShow ? 'Search button is now visible' : 'Search button is now hidden');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            headerSettings.showSearch !== false
                              ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title={headerSettings.showSearch !== false ? 'Click to Hide search' : 'Click to Show search'}
                        >
                          {headerSettings.showSearch !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {isBn
                          ? 'হেডারের সার্চ বাটনের মাধ্যমে ভিজিটররা ক্যাম্পেইন, খবর ও প্রোগ্রাম সহজে খুঁজে পেতে পারেন।'
                          : 'Allows visitors to quickly search across active campaigns, news, and programs.'}
                      </p>
                    </div>

                    {/* Language Switcher Widget */}
                    <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      headerSettings.showLanguageSwitcher !== false
                        ? 'bg-[#FAF7F2] border-[#EAE3D9]'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-teal-600" />
                          <span className="text-xs font-bold text-slate-900">
                            {isBn ? 'ভাষা পরিবর্তন বাটন (Language Switcher)' : 'Language Switcher (বাংলা / EN)'}
                          </span>
                        </div>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newShow = !headerSettings.showLanguageSwitcher;
                            updateHeaderSettings({ showLanguageSwitcher: newShow });
                            showToast(newShow ? 'Language switcher is now visible' : 'Language switcher is now hidden');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            headerSettings.showLanguageSwitcher !== false
                              ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title={headerSettings.showLanguageSwitcher !== false ? 'Click to Hide switcher' : 'Click to Show switcher'}
                        >
                          {headerSettings.showLanguageSwitcher !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {isBn
                          ? 'টপ বারে বাংলা ও ইংরেজির মধ্যে এক ক্লিকে ভাষা পরিবর্তনের বাটন।'
                          : 'Top bar button enabling visitors to switch between English and Bangla.'}
                      </p>
                    </div>

                    {/* Top Notice Bar Widget */}
                    <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      headerSettings.showNoticeBar !== false
                        ? 'bg-[#FAF7F2] border-[#EAE3D9]'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-emerald-700" />
                          <span className="text-xs font-bold text-slate-900">
                            {isBn ? 'শীর্ষ নোটিশ বার (Top Notice Bar)' : 'Top Notice Bar'}
                          </span>
                        </div>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newShow = !headerSettings.showNoticeBar;
                            updateHeaderSettings({ showNoticeBar: newShow });
                            showToast(newShow ? 'Notice bar is now visible' : 'Notice bar is now hidden');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            headerSettings.showNoticeBar !== false
                              ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title={headerSettings.showNoticeBar !== false ? 'Click to Hide notice bar' : 'Click to Show notice bar'}
                        >
                          {headerSettings.showNoticeBar !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        {isBn
                          ? 'ওয়েবসাইটের একেবারে উপরে নোটিশ বা স্বাগত বার্তা প্রদর্শনের বার।'
                          : 'Slim dark green bar at the very top for official announcements and welcome messages.'}
                      </p>
                    </div>

                    {/* Top Notice Bar Action / Transparency Button Widget */}
                    <div className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      headerSettings.showNoticeBarButton !== false
                        ? 'bg-[#FAF7F2] border-[#EAE3D9]'
                        : 'bg-slate-50 border-slate-200 opacity-75'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">
                            {isBn ? 'নোটিশ বার স্বচ্ছতা বাটন (Notice Transparency Button)' : 'Notice Transparency CTA'}
                          </span>
                        </div>

                        {/* Eye Button */}
                        <button
                          type="button"
                          onClick={() => {
                            const newShow = headerSettings.showNoticeBarButton === false ? true : false;
                            updateHeaderSettings({ showNoticeBarButton: newShow });
                            showToast(newShow ? 'Notice bar button is now visible' : 'Notice bar button is now hidden');
                          }}
                          className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                            headerSettings.showNoticeBarButton !== false
                              ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                              : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                          }`}
                          title={headerSettings.showNoticeBarButton !== false ? 'Click to Hide button' : 'Click to Show button'}
                        >
                          {headerSettings.showNoticeBarButton !== false ? (
                            <>
                              <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                              <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-600">
                        <span>Label: <strong>{tText(headerSettings.noticeBarButtonText) || (isBn ? 'স্বচ্ছতা ও অডিট' : 'Transparency')}</strong></span>
                        <span className="font-mono text-emerald-700">/{headerSettings.noticeBarLink || 'transparency'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Main Navigation Menu Links Manager */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#006A4E]" />
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        {isBn ? 'প্রধান মেনু লিঙ্কসমূহ (Main Navbar Links)' : 'Main Navigation Links'}
                      </h3>
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      {navigationItems.length} {isBn ? 'টি মেনু আইটেম' : 'menu links'}
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[...navigationItems]
                      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                      .map((nav, idx, arr) => (
                        <div
                          key={nav.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            nav.active !== false
                              ? 'bg-[#FAF7F2] border-[#EAE3D9] shadow-warm-xs'
                              : 'bg-slate-50 border-slate-200 opacity-70'
                          }`}
                        >
                          {/* Left Details */}
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="w-7 h-7 rounded-xl bg-white font-mono font-bold text-xs flex items-center justify-center border border-slate-200 text-slate-700 shrink-0 shadow-2xs">
                              {idx + 1}
                            </span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-xs font-bold text-slate-900">
                                  {nav.label.en}
                                </p>
                                <span className="text-slate-400 text-xs">/</span>
                                <p className="text-xs font-bold text-slate-700 font-bengali">
                                  {nav.label.bn}
                                </p>
                                {nav.isDropdown && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-[#00523C] rounded-full">
                                    Dropdown ({nav.children?.length || 0})
                                  </span>
                                )}
                                {nav.isExternal && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-sky-100 text-sky-800 rounded-full flex items-center gap-0.5">
                                    <ExternalLink className="w-2.5 h-2.5" />
                                    External
                                  </span>
                                )}
                              </div>
                              <p className="text-[11px] font-mono text-slate-500 mt-0.5 truncate">
                                Path: <span className="font-semibold text-slate-700">{nav.path}</span>
                              </p>
                            </div>
                          </div>

                          {/* Right Actions: Eye Toggle, Move Up/Down, Edit, Delete */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {/* Instant Eye Visibility Toggle Button */}
                            <button
                              type="button"
                              onClick={() => {
                                const newActive = nav.active === false ? true : false;
                                updateNavigationItem(nav.id, { active: newActive });
                                showToast(
                                  newActive
                                    ? (isBn ? `"${nav.label.bn}" মেনু এখন দৃশ্যমান` : `"${nav.label.en}" is now visible`)
                                    : (isBn ? `"${nav.label.bn}" মেনু লুকানো হয়েছে` : `"${nav.label.en}" is now hidden`)
                                );
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-all ${
                                nav.active !== false
                                  ? 'bg-emerald-100 text-[#00523C] hover:bg-emerald-200'
                                  : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                              }`}
                              title={nav.active !== false ? 'Click to Hide this menu link' : 'Click to Show this menu link'}
                            >
                              {nav.active !== false ? (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-[#006A4E]" />
                                  <span>{isBn ? 'দৃশ্যমান' : 'Visible'}</span>
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                                  <span>{isBn ? 'লুকানো' : 'Hidden'}</span>
                                </>
                              )}
                            </button>

                            {/* Reorder Buttons (Move Up / Down) */}
                            <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => {
                                  const sorted = [...navigationItems].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                                  const currentIdx = sorted.findIndex(n => n.id === nav.id);
                                  if (currentIdx > 0) {
                                    const temp = sorted[currentIdx];
                                    sorted[currentIdx] = sorted[currentIdx - 1];
                                    sorted[currentIdx - 1] = temp;
                                    const updated = sorted.map((item, i) => ({ ...item, displayOrder: i + 1 }));
                                    reorderNavigationItems(updated);
                                    updated.forEach(item => updateNavigationItem(item.id, { displayOrder: item.displayOrder }));
                                    showToast(isBn ? 'মেনুর ক্রম পরিবর্তন হয়েছে' : 'Navigation order updated');
                                  }
                                }}
                                className="px-2 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                                title="Move Left / Up"
                              >
                                ▲
                              </button>
                              <div className="w-px h-4 bg-slate-200" />
                              <button
                                type="button"
                                disabled={idx === arr.length - 1}
                                onClick={() => {
                                  const sorted = [...navigationItems].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
                                  const currentIdx = sorted.findIndex(n => n.id === nav.id);
                                  if (currentIdx < sorted.length - 1) {
                                    const temp = sorted[currentIdx];
                                    sorted[currentIdx] = sorted[currentIdx + 1];
                                    sorted[currentIdx + 1] = temp;
                                    const updated = sorted.map((item, i) => ({ ...item, displayOrder: i + 1 }));
                                    reorderNavigationItems(updated);
                                    updated.forEach(item => updateNavigationItem(item.id, { displayOrder: item.displayOrder }));
                                    showToast(isBn ? 'মেনুর ক্রম পরিবর্তন হয়েছে' : 'Navigation order updated');
                                  }
                                }}
                                className="px-2 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                                title="Move Right / Down"
                              >
                                ▼
                              </button>
                            </div>

                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingNav(nav);
                                setIsNavModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'সম্পাদনা' : 'Edit'}</span>
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove nav link "${nav.label.en}"?`)) {
                                  deleteNavigationItem(nav.id);
                                  showToast(isBn ? 'মেনু লিঙ্ক মুছে ফেলা হয়েছে' : 'Nav link removed');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-all"
                              title="Delete Link"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: HEADER & FOOTER */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'header_footer' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-8 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'হেডার ও ফুটার সেটিংস' : 'Header & Footer Settings'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'অ্যানাউন্সমেন্ট নোটিস বার, ফুটার টপ কলআউট ব্যানার, ঠিকানা ও হেল্পলাইন পরিবর্তন করুন।' : 'Configure top notice ticker bar, footer callout banner, helpline, official address, and copyright.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Header & footer saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>

                {/* Top Notice Bar */}
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#006A4E]" />
                    <span>Top Announcement Notice Bar & Target Link</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Notice Text (English)</label>
                      <input
                        type="text"
                        value={headerSettings.noticeBarText?.en || ''}
                        onChange={(e) => updateHeaderSettings({
                          noticeBarText: { ...headerSettings.noticeBarText, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">নোটিস টেক্সট (বাংলা)</label>
                      <input
                        type="text"
                        value={headerSettings.noticeBarText?.bn || ''}
                        onChange={(e) => updateHeaderSettings({
                          noticeBarText: { ...headerSettings.noticeBarText, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  {/* Top Notice Bar Action / Transparency Button Settings */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                        <span>{isBn ? 'নোটিশ বার অ্যাকশন বাটন (Notice Bar Action / Transparency CTA)' : 'Top Notice Bar Action / Transparency Button'}</span>
                      </h4>
                      <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={headerSettings.showNoticeBarButton !== false}
                          onChange={(e) => updateHeaderSettings({ showNoticeBarButton: e.target.checked })}
                          className="rounded text-[#006A4E]"
                        />
                        <span>{isBn ? 'টপ বারে বাটন দেখান' : 'Show in Notice Bar'}</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Label (English)</label>
                        <input
                          type="text"
                          value={headerSettings.noticeBarButtonText?.en || ''}
                          onChange={(e) => updateHeaderSettings({
                            noticeBarButtonText: { ...(headerSettings.noticeBarButtonText || { en: '', bn: '' }), en: e.target.value }
                          })}
                          placeholder="Transparency"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                        <input
                          type="text"
                          value={headerSettings.noticeBarButtonText?.bn || ''}
                          onChange={(e) => updateHeaderSettings({
                            noticeBarButtonText: { ...(headerSettings.noticeBarButtonText || { en: '', bn: '' }), bn: e.target.value }
                          })}
                          placeholder="স্বচ্ছতা ও অডিট"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={headerSettings.noticeBarLink || 'transparency'}
                          onChange={(e) => updateHeaderSettings({ noticeBarLink: e.target.value })}
                          placeholder="e.g. transparency, campaigns"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Quick Route Selectors */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Route Selectors:</span>
                      {['transparency', 'campaigns', 'donate', 'volunteer', 'contact', 'media-coverage', 'about'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHeaderSettings({ noticeBarLink: r })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            (headerSettings.noticeBarLink || 'transparency') === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Header Support CTA Button */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-600" />
                      <span>Header Support / Action CTA Button (হেডারের ডানপাশের বাটন)</span>
                    </h3>
                    <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={headerSettings.showSupportButton !== false}
                        onChange={(e) => updateHeaderSettings({ showSupportButton: e.target.checked })}
                        className="rounded text-[#006A4E]"
                      />
                      <span>{isBn ? 'হেডারে বাটন দেখান' : 'Show in Header'}</span>
                    </label>
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                        <input
                          type="text"
                          value={headerSettings.supportButtonText?.en || ''}
                          onChange={(e) => updateHeaderSettings({
                            supportButtonText: { ...(headerSettings.supportButtonText || { en: '', bn: '' }), en: e.target.value }
                          })}
                          placeholder="Donate"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                        <input
                          type="text"
                          value={headerSettings.supportButtonText?.bn || ''}
                          onChange={(e) => updateHeaderSettings({
                            supportButtonText: { ...(headerSettings.supportButtonText || { en: '', bn: '' }), bn: e.target.value }
                          })}
                          placeholder="সহায়তা করুন"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={headerSettings.supportButtonUrl || 'donate'}
                          onChange={(e) => updateHeaderSettings({ supportButtonUrl: e.target.value })}
                          placeholder="e.g. donate, volunteer"
                          className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    {/* Quick Route Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-slate-400">Quick Route Selectors:</span>
                      {['donate', 'volunteer', 'campaigns', 'transparency', 'contact'].map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => updateHeaderSettings({ supportButtonUrl: r })}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                            (headerSettings.supportButtonUrl || 'donate') === r
                              ? 'bg-[#006A4E] text-white'
                              : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Top Callout Banner */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#006A4E]" />
                    <span>Footer Top Callout Banner (সব পেজের নিচের কলআউট ও বাটনসমূহ)</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Callout Eyebrow (English)</label>
                      <input
                        type="text"
                        value={footerSettings.calloutEyebrow?.en || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutEyebrow: { ...(footerSettings.calloutEyebrow || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">কলআউট ব্যাজ (বাংলা)</label>
                      <input
                        type="text"
                        value={footerSettings.calloutEyebrow?.bn || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutEyebrow: { ...(footerSettings.calloutEyebrow || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Callout Title (English)</label>
                      <input
                        type="text"
                        value={footerSettings.calloutTitle?.en || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutTitle: { ...(footerSettings.calloutTitle || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">কলআউট শিরোনাম (বাংলা)</label>
                      <input
                        type="text"
                        value={footerSettings.calloutTitle?.bn || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutTitle: { ...(footerSettings.calloutTitle || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Callout Subtitle (English)</label>
                      <textarea
                        rows={2}
                        value={footerSettings.calloutSubtitle?.en || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutSubtitle: { ...(footerSettings.calloutSubtitle || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">কলআউট বিবরণ (বাংলা)</label>
                      <textarea
                        rows={2}
                        value={footerSettings.calloutSubtitle?.bn || ''}
                        onChange={(e) => updateFooterSettings({
                          calloutSubtitle: { ...(footerSettings.calloutSubtitle || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  {/* Footer CTAs Configuration (Volunteer & Support) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {/* Volunteer CTA */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                      <span className="text-xs font-extrabold text-slate-900 block flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-[#006A4E]" />
                        <span>{isBn ? 'ফুটার ভলান্টিয়ার বাটন ও লিংক' : 'Footer Volunteer Button & Link'}</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={footerSettings.volunteerCtaText?.en || ''}
                            onChange={(e) => updateFooterSettings({
                              volunteerCtaText: { ...(footerSettings.volunteerCtaText || { en: '', bn: '' }), en: e.target.value }
                            })}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            placeholder="Become a Volunteer"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={footerSettings.volunteerCtaText?.bn || ''}
                            onChange={(e) => updateFooterSettings({
                              volunteerCtaText: { ...(footerSettings.volunteerCtaText || { en: '', bn: '' }), bn: e.target.value }
                            })}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="স্বেচ্ছাসেবী হিসেবে যোগ দিন"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={footerSettings.volunteerCtaUrl || 'volunteer'}
                          onChange={(e) => updateFooterSettings({ volunteerCtaUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="volunteer"
                        />
                      </div>
                    </div>

                    {/* Support CTA */}
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                      <span className="text-xs font-extrabold text-slate-900 block flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-rose-600" />
                        <span>{isBn ? 'ফুটার অনুদান বাটন ও লিংক' : 'Footer Donation Button & Link'}</span>
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">Text (EN)</label>
                          <input
                            type="text"
                            value={footerSettings.supportCtaText?.en || ''}
                            onChange={(e) => updateFooterSettings({
                              supportCtaText: { ...(footerSettings.supportCtaText || { en: '', bn: '' }), en: e.target.value }
                            })}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                            placeholder="Support Our Mission"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-medium text-slate-500">লেখা (বাং)</label>
                          <input
                            type="text"
                            value={footerSettings.supportCtaText?.bn || ''}
                            onChange={(e) => updateFooterSettings({
                              supportCtaText: { ...(footerSettings.supportCtaText || { en: '', bn: '' }), bn: e.target.value }
                            })}
                            className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                            placeholder="সহায়তা করুন"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] font-medium text-slate-500">Target Route / URL (লিংক)</label>
                        <input
                          type="text"
                          value={footerSettings.supportCtaUrl || 'donate'}
                          onChange={(e) => updateFooterSettings({ supportCtaUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                          placeholder="donate"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Organization Description */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Footer Organization Description</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description (English)</label>
                      <textarea
                        rows={3}
                        value={footerSettings.description?.en || ''}
                        onChange={(e) => updateFooterSettings({
                          description: { ...footerSettings.description, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">বিবরণ (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={footerSettings.description?.bn || ''}
                        onChange={(e) => updateFooterSettings({
                          description: { ...footerSettings.description, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Contact Details & Copyright */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 font-display">Footer Contact, Established Year & Copyright</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Helpline Phone</label>
                      <input
                        type="text"
                        value={footerSettings.phone || ''}
                        onChange={(e) => updateFooterSettings({ phone: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Email</label>
                      <input
                        type="email"
                        value={footerSettings.email || ''}
                        onChange={(e) => updateFooterSettings({ email: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Established Year</label>
                      <input
                        type="text"
                        value={footerSettings.establishedYear || '2015'}
                        onChange={(e) => updateFooterSettings({ establishedYear: e.target.value })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Copyright Text (English)</label>
                      <input
                        type="text"
                        value={footerSettings.copyrightText?.en || ''}
                        onChange={(e) => updateFooterSettings({
                          copyrightText: { ...(footerSettings.copyrightText || { en: '', bn: '' }), en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">কপিরাইট টেক্সট (বাংলা)</label>
                      <input
                        type="text"
                        value={footerSettings.copyrightText?.bn || ''}
                        onChange={(e) => updateFooterSettings({
                          copyrightText: { ...(footerSettings.copyrightText || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: SEO */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'seo' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'এসইও ও মেটাট্যাগ কনফিগারেশন' : 'SEO & Social OpenGraph Settings'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'গুগল সার্চ ও সোশ্যাল শেয়ার প্রিভিউ কার্ড পরিবর্তন করুন।' : 'Configure search engine meta titles, descriptions, canonical URL, and OG preview image.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('SEO settings saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Save SEO
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Meta Site Title (English)</label>
                      <input
                        type="text"
                        value={seoSettings.siteTitle?.en || ''}
                        onChange={(e) => updateSEOSettings({
                          siteTitle: { ...seoSettings.siteTitle, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">সাইট শিরোনাম (বাংলা)</label>
                      <input
                        type="text"
                        value={seoSettings.siteTitle?.bn || ''}
                        onChange={(e) => updateSEOSettings({
                          siteTitle: { ...seoSettings.siteTitle, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Meta Description (English)</label>
                      <textarea
                        rows={3}
                        value={seoSettings.metaDescription?.en || ''}
                        onChange={(e) => updateSEOSettings({
                          metaDescription: { ...seoSettings.metaDescription, en: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">মেটা বিবরণ (বাংলা)</label>
                      <textarea
                        rows={3}
                        value={seoSettings.metaDescription?.bn || ''}
                        onChange={(e) => updateSEOSettings({
                          metaDescription: { ...seoSettings.metaDescription, bn: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: SOCIAL LINKS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'social_links' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'সামাজিক মাধ্যম ও চ্যানেলসমূহ' : 'Official Social Channels & Links'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'ফেসবুক, ইউটিউব ও হোয়াটসঅ্যাপ চ্যানেলের লিঙ্ক ম্যানেজ করুন।' : 'Update official URLs for Facebook, WhatsApp, YouTube, Instagram, and LinkedIn.'}
                  </p>
                </div>

                <div className="space-y-3">
                  {socialLinks.map(soc => (
                    <div
                      key={soc.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-[#006A4E] text-white font-bold text-xs flex items-center justify-center capitalize">
                          {soc.platform.charAt(0)}
                        </span>
                        <div>
                          <p className="text-xs font-bold text-slate-900 capitalize">{soc.platform}</p>
                          <p className="text-[11px] font-mono text-slate-500">{soc.url}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={soc.url}
                          onChange={(e) => updateSocialLink(soc.id, { url: e.target.value })}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-mono w-64"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateSocialLink(soc.id, { active: !soc.active });
                            showToast('Link status updated');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                            soc.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {soc.active ? 'Active' : 'Inactive'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: SUPPORT CMS (PAYMENT CHANNELS) */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'support_cms' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'অনুদান ও পেমেন্ট চ্যানেল সেটিংস' : 'Donation & Payment Channels'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'বিকাশ, নগদ ও ব্যাংক একাউন্ট নম্বর পরিচালনা করুন।' : 'Configure official bKash, Nagad, and Bank payment account numbers.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Payment settings saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Save Channels
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
                    <label className="text-xs font-bold text-slate-800">bKash Official Number</label>
                    <input
                      type="text"
                      value={supportSettings.bKashNumber || supportSettings.bkashNumber || settings.bKashNumber || ''}
                      onChange={(e) => updateSupportSettings({ bKashNumber: e.target.value, bkashNumber: e.target.value })}
                      placeholder="e.g. 01839-008339"
                      className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold text-slate-900"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
                    <label className="text-xs font-bold text-slate-800">Nagad Official Number</label>
                    <input
                      type="text"
                      value={supportSettings.nagadNumber || settings.nagadNumber || ''}
                      onChange={(e) => updateSupportSettings({ nagadNumber: e.target.value })}
                      placeholder="e.g. 01839-008339"
                      className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: CONTACT CMS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'contact_cms' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'যোগাযোগ ও অবস্থান সেটিংস' : 'Contact Details & Office Location'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'অফিস ঠিকানা, হেল্পলাইন নম্বর ও গুগল ম্যাপস লিঙ্ক আপডেট করুন।' : 'Update office address, phone, email, helpline, and Google Maps embed URL.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Contact settings saved')}
                    className="px-5 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Save Contact
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Official Helpline Phone</label>
                    <input
                      type="text"
                      value={contactSettings.phone}
                      onChange={(e) => updateContactSettings({ phone: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Official Email</label>
                    <input
                      type="email"
                      value={contactSettings.email}
                      onChange={(e) => updateContactSettings({ email: e.target.value })}
                      className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Office Address (English)</label>
                    <input
                      type="text"
                      value={contactSettings.address.en}
                      onChange={(e) => updateContactSettings({
                        address: { ...contactSettings.address, en: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">অফিস ঠিকানা (বাংলা)</label>
                    <input
                      type="text"
                      value={contactSettings.address.bn}
                      onChange={(e) => updateContactSettings({
                        address: { ...contactSettings.address, bn: e.target.value }
                      })}
                      className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: USER MESSAGES */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'ওয়েবসাইট ইনকোয়ারি ও বার্তা' : 'User Messages & Inquiries'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'ওয়েবসাইট ভিজিটরদের পাঠানো বার্তা ও যোগাযোগ অনুরোধ।' : 'Messages and queries submitted through the website contact form.'}
                  </p>
                </div>

                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">No user messages received yet.</div>
                  ) : (
                    messages.map(msg => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-slate-900">{msg.name}</h4>
                            <span className="text-xs text-slate-500 font-mono">({msg.email})</span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                              {msg.status}
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">Subject: {msg.subject}</p>
                          <p className="text-xs text-slate-600 italic">"{msg.message}"</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              updateMessageStatus(msg.id, 'Replied');
                              showToast('Marked as replied');
                            }}
                            className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Mark Replied
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete message?')) {
                                deleteContactMessage(msg.id);
                                showToast('Message removed');
                              }
                            }}
                            className="p-2 text-rose-500 hover:text-rose-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: ADMIN USERS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'admin_users' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'অ্যাডমিন ইউজার ও রোলস' : 'Administrator Accounts & Roles'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'সুপার অ্যাডমিন, কনটেন্ট ম্যানেজার ও মিডিয়া রোলসমূহ।' : 'Manage admin team accounts and assign granular permissions.'}
                  </p>
                </div>

                <div className="space-y-3">
                  {adminProfiles.map(adm => (
                    <div
                      key={adm.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-[#006A4E] text-white font-bold flex items-center justify-center">
                          {adm.fullName.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{adm.fullName}</h4>
                          <p className="text-xs text-slate-500 font-mono">{adm.email} &bull; Role: {adm.role}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#E6F3EF] text-[#00523C]">
                        {adm.role.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: AUDIT LOGS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'audit' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'সিস্টেম অডিট ও অ্যাক্টিভিটি লগ' : 'System Audit & Activity Logs'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'অ্যাডমিন প্যানেলে করা প্রতিটি পরিবর্তনের টাইমস্ট্যাম্পড রেকর্ড।' : 'Immutable chronological log of data modifications and system events.'}
                  </p>
                </div>

                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {auditLogs.slice(0, 30).map(log => (
                    <div
                      key={log.id}
                      className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.action === 'CREATE' ? 'bg-emerald-100 text-emerald-800' :
                          log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {log.action}
                        </span>
                        <span className="font-bold text-slate-800">{log.entityType}</span>
                        <span className="text-slate-500">&bull; {log.details}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{log.timestamp.split('T')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === 'media_library' && (() => {
              const MEDIA_CATEGORIES: MediaCategory[] = [
                'General', 'Hero', 'Campaigns', 'Volunteers', 'Events', 'Children & Community', 'Logos', 'Banners', 'Stories', 'Gallery', 'Documents'
              ];

              // Build unified list of all media assets including video items
              const allUnifiedMedia: MediaItem[] = [...mediaLibrary];
              videos.forEach(v => {
                const exists = allUnifiedMedia.some(m => m.id === v.id || m.url === v.videoUrl);
                if (!exists) {
                  const vTitle = typeof v.title === 'string' ? v.title : (v.title?.en || 'Video Footage');
                  const vDesc = typeof v.description === 'string' ? v.description : (v.description?.en || '');
                  allUnifiedMedia.push({
                    id: v.id,
                    fileName: vTitle,
                    url: v.videoUrl,
                    embedUrl: v.embedUrl,
                    thumbnailUrl: v.thumbnailUrl,
                    fileSize: v.duration || 'Stream',
                    mimeType: 'video/mp4',
                    type: 'video',
                    platform: (v.platform as any) || 'youtube',
                    sourceType: 'url',
                    category: (v.category as any) || 'General',
                    title: vTitle,
                    altText: vTitle,
                    caption: vDesc,
                    uploadedAt: v.date || v.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0],
                    usageTags: [v.category || 'General', 'Video Documentation'],
                    status: (v.status as any) || 'published',
                    isFeatured: v.isFeatured
                  });
                }
              });

              const filteredMediaList = allUnifiedMedia.filter(media => {
                // Type / Platform filter
                if (mediaLibraryFilter === 'image' && media.type === 'video') return false;
                if (mediaLibraryFilter === 'video' && media.type !== 'video') return false;
                if (mediaLibraryFilter === 'youtube' && media.platform !== 'youtube') return false;
                if (mediaLibraryFilter === 'facebook' && media.platform !== 'facebook') return false;
                if (mediaLibraryFilter === 'featured' && !media.isFeatured) return false;

                // Category filter
                if (mediaCategoryFilter !== 'All' && media.category !== mediaCategoryFilter) return false;

                // Search query
                if (mediaSearchQuery.trim()) {
                  const q = mediaSearchQuery.toLowerCase();
                  const matchName = media.fileName.toLowerCase().includes(q);
                  const matchAlt = (media.altText || '').toLowerCase().includes(q);
                  const matchCaption = (media.caption || '').toLowerCase().includes(q);
                  const matchTitle = (media.title || '').toLowerCase().includes(q);
                  if (!matchName && !matchAlt && !matchCaption && !matchTitle) return false;
                }

                return true;
              });

              const totalImages = allUnifiedMedia.filter(m => m.type !== 'video').length;
              const totalVideos = allUnifiedMedia.filter(m => m.type === 'video').length;
              const totalFeatured = allUnifiedMedia.filter(m => m.isFeatured).length;

              return (
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                  {/* Section Title & Primary Actions */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-xl bg-[#E6F3EF] text-[#006A4E]">
                          <FolderOpen className="w-5 h-5" />
                        </span>
                        <h2 className="text-xl font-extrabold text-slate-900 font-display">
                          {isBn ? 'ইউনিফাইড মিডিয়া ও ভিডিও লাইব্রেরি' : 'Unified Media & Video Library'}
                        </h2>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {isBn
                          ? 'অফিসিয়াল ছবি, ইউটিউব/ফেসবুক ভিডিও এবং ক্লাউড সম্পদ কেন্দ্রীয়ভাবে পরিচালনা করুন।'
                          : 'Manage official photography, YouTube/Facebook video footage, and cloud assets in one unified console.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCropperSourceUrl(mediaLibrary[0]?.url || '');
                          setCropperCallback(() => (croppedUrl: string) => {
                            addMediaItem({
                              fileName: `cropped-${Date.now()}.jpg`,
                              url: croppedUrl,
                              fileSize: 'Cropped High-Res',
                              mimeType: 'image/jpeg',
                              type: 'image',
                              sourceType: 'upload',
                              platform: 'cloudinary',
                              category: 'General',
                              altText: 'Custom Cropped Photo',
                              caption: '',
                              usageTags: ['Cropped Asset'],
                              status: 'published'
                            });
                            showToast('Cropped image added to media library');
                          });
                          setIsCropperModalOpen(true);
                        }}
                        className="px-3.5 py-2.5 rounded-xl bg-white border border-[#EAE3D9] hover:bg-[#FAF7F2] text-slate-700 font-bold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Crop className="w-4 h-4 text-[#006A4E]" />
                        <span>{isBn ? 'ক্রপ এডিটর চালান' : 'Crop Tool'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingVideo(null);
                          setIsVideoModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-warm-sm flex items-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        <span>{isBn ? 'ভিডিও প্রকাশ করুন' : 'Publish Video'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setEditingImageItem(null);
                          setIsImagePublishModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isBn ? 'নতুন ছবি ও মিডিয়া আপলোড' : 'Publish New Image'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary Stat Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-semibold">{isBn ? 'মোট মিডিয়া' : 'Total Assets'}</p>
                        <p className="text-lg font-extrabold text-slate-900 font-display">{mediaLibrary.length}</p>
                      </div>
                      <ImageIcon className="w-5 h-5 text-slate-400" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-semibold">{isBn ? 'আলোকচিত্র' : 'Images'}</p>
                        <p className="text-lg font-extrabold text-[#006A4E] font-display">{totalImages}</p>
                      </div>
                      <ImageIcon className="w-5 h-5 text-[#006A4E]" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-semibold">{isBn ? 'ভিডিও ফুটেজ' : 'Videos'}</p>
                        <p className="text-lg font-extrabold text-amber-600 font-display">{totalVideos}</p>
                      </div>
                      <VideoIcon className="w-5 h-5 text-amber-600" />
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-500 font-semibold">{isBn ? 'হাইলাইটেড' : 'Featured'}</p>
                        <p className="text-lg font-extrabold text-purple-600 font-display">{totalFeatured}</p>
                      </div>
                      <Star className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>

                  {/* Multi-Dimensional Filter Controls */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      {/* Type Filter Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 text-xs">
                        {[
                          { id: 'all', label: isBn ? 'সকল' : 'All' },
                          { id: 'image', label: isBn ? 'ছবি' : 'Images' },
                          { id: 'video', label: isBn ? 'ভিডিও' : 'Videos' },
                          { id: 'youtube', label: 'YouTube' },
                          { id: 'facebook', label: 'Facebook' },
                          { id: 'featured', label: isBn ? 'হাইলাইটেড' : 'Featured' }
                        ].map(tab => (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => setMediaLibraryFilter(tab.id as any)}
                            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                              mediaLibraryFilter === tab.id
                                ? 'bg-[#006A4E] text-white shadow-warm-xs'
                                : 'bg-[#FAF7F2] text-slate-600 hover:bg-slate-200 border border-[#EAE3D9]'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Search Bar */}
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          value={mediaSearchQuery}
                          onChange={e => setMediaSearchQuery(e.target.value)}
                          placeholder={isBn ? 'নাম বা ট্যাগ দিয়ে খুঁজুন...' : 'Search media by title/tag...'}
                          className="w-full pl-8.5 pr-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E] focus:bg-white"
                        />
                      </div>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                      {['All', ...MEDIA_CATEGORIES].map(cat => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setMediaCategoryFilter(cat)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                            mediaCategoryFilter === cat
                              ? 'bg-slate-900 text-white'
                              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Media Grid */}
                  {filteredMediaList.length === 0 ? (
                    <div className="py-16 text-center space-y-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9]">
                      <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
                      <p className="text-sm font-bold text-slate-700">
                        {isBn ? 'কোনো মিডিয়া পাওয়া যায়নি' : 'No media assets found'}
                      </p>
                      <p className="text-xs text-slate-400">
                        {isBn ? 'ফিল্টার পরিবর্তন করুন অথবা নতুন ছবি/ভিডিও আপলোড করুন।' : 'Try selecting another category or add a new media asset.'}
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                      {filteredMediaList.map(media => {
                        const isVideo = media.type === 'video';
                        const displayThumbnail = media.thumbnailUrl || media.url;

                        return (
                          <div
                            key={media.id}
                            className="rounded-2xl border border-[#EAE3D9] bg-[#FAF7F2] p-3 space-y-2.5 group relative overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-warm-sm transition-all"
                          >
                            {/* Media Thumbnail Container */}
                            <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-950 border border-slate-300 relative">
                              <img
                                src={getAssetUrl(displayThumbnail)}
                                alt={media.altText || media.fileName}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                loading="lazy"
                              />

                              {/* Video Play Overlay */}
                              {isVideo && (
                                <div
                                  onClick={() => setPreviewingMedia(media)}
                                  className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/15 transition-colors flex items-center justify-center cursor-pointer"
                                >
                                  <div className="w-10 h-10 rounded-full bg-[#006A4E]/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                    <Play className="w-5 h-5 fill-current ml-0.5" />
                                  </div>
                                </div>
                              )}

                              {/* Platform Tag & Portrait Badge */}
                              <div className="absolute top-2 left-2 flex items-center gap-1">
                                <span className="px-2 py-0.5 rounded-md bg-slate-950/80 text-white text-[10px] font-extrabold capitalize backdrop-blur-xs shadow-xs">
                                  {media.platform || (isVideo ? 'Video' : 'Image')}
                                </span>
                                {isPortraitVideo(media) && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-extrabold uppercase flex items-center gap-0.5 shadow-xs">
                                    <Smartphone className="w-2.5 h-2.5" />
                                    <span>9:16</span>
                                  </span>
                                )}
                              </div>

                              {/* Featured Star Toggle */}
                              <button
                                type="button"
                                onClick={() => {
                                  updateMediaItem(media.id, { isFeatured: !media.isFeatured });
                                  showToast(media.isFeatured ? 'Removed from featured' : 'Marked as featured asset');
                                }}
                                className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer ${
                                  media.isFeatured
                                    ? 'bg-amber-400 text-slate-950 shadow-md'
                                    : 'bg-slate-950/60 text-white hover:bg-slate-950/80'
                                }`}
                                title={media.isFeatured ? 'Featured asset' : 'Click to feature'}
                              >
                                <Star className={`w-3.5 h-3.5 ${media.isFeatured ? 'fill-current' : ''}`} />
                              </button>

                              {/* Category Badge */}
                              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-[#006A4E]/90 text-white text-[10px] font-bold backdrop-blur-xs">
                                {media.category}
                              </div>

                              {media.duration && (
                                <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-slate-950/80 text-white text-[10px] font-mono">
                                  {media.duration}
                                </div>
                              )}
                            </div>

                            {/* Meta Info */}
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-slate-900 truncate" title={media.title || media.fileName}>
                                {media.title || media.fileName}
                              </p>
                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span className="truncate max-w-[65%]">{media.altText || media.caption || 'No description'}</span>
                                <span className="font-mono">{media.fileSize || 'Asset'}</span>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 text-xs">
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => setPreviewingMedia(media)}
                                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  title="Preview Media"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (media.type === 'video') {
                                      const matchVid = videos.find(v => v.id === media.id || v.videoUrl === media.url) || {
                                        id: media.id,
                                        title: { en: media.title || media.fileName, bn: media.altText || media.title || media.fileName },
                                        description: { en: media.caption || '', bn: media.caption || '' },
                                        videoUrl: media.url,
                                        embedUrl: media.embedUrl,
                                        thumbnailUrl: media.thumbnailUrl,
                                        platform: (media.platform as any) || 'youtube',
                                        category: media.category || 'General',
                                        duration: media.fileSize || 'Video',
                                        date: media.uploadedAt || new Date().toISOString().split('T')[0],
                                        status: (media.status as any) || 'published',
                                        isFeatured: media.isFeatured
                                      };
                                      setEditingVideo(matchVid);
                                      setIsVideoModalOpen(true);
                                    } else {
                                      setEditingImageItem(media);
                                      setIsImagePublishModalOpen(true);
                                    }
                                  }}
                                  className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                  title="Edit Metadata"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                {media.type !== 'video' && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setCropperSourceUrl(media.url);
                                      setCropperCallback(() => (croppedUrl: string) => {
                                        updateMediaItem(media.id, { url: croppedUrl });
                                        showToast('Asset replaced with cropped image');
                                      });
                                      setIsCropperModalOpen(true);
                                    }}
                                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                                    title="Crop Image"
                                  >
                                    <Crop className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    navigator.clipboard.writeText(media.url);
                                    showToast('Asset URL copied to clipboard');
                                  }}
                                  className="text-[11px] text-[#006A4E] font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                                >
                                  <Copy className="w-3 h-3" />
                                  <span>Copy</span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    if (confirm(`Delete media asset: ${media.title || media.fileName}?`)) {
                                      deleteMediaItem(media.id);
                                      deleteVideo(media.id);
                                      showToast('Media asset removed from database and library');
                                    }
                                  }}
                                  className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                                  title="Delete Media"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* -------------------------------------------------------- */}
            {/* TAB: BANNERS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'banners' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'ব্যানার ও স্লাইডার ম্যানেজার' : 'Banners & Featured Announcements'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'হোমপেজ ও ক্যাম্পেইন পেজের ব্যানার ও স্লাইডার পরিচালনা করুন।' : 'Configure hero carousel slides, campaign promotional banners, and CTAs.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingBanner(null);
                      setIsBannerModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন ব্যানার তৈরি' : 'Add New Banner'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {banners.map((ban, idx) => (
                    <div
                      key={ban.id}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-4 hover:border-slate-300 transition-all"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <span className="w-8 h-8 rounded-xl bg-white text-slate-800 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                            #{ban.displayOrder || idx + 1}
                          </span>

                          <div className="w-20 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                            <img
                              src={getAssetUrl(ban.desktopImageUrl)}
                              alt={ban.title.en}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>

                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-sm text-slate-900 truncate">{ban.title.en}</h4>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C]">
                                {ban.placement}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 font-bengali truncate">{ban.title.bn}</p>
                            {ban.subtitle && (
                              <p className="text-[11px] text-slate-400 truncate">{ban.subtitle.en}</p>
                            )}
                            {ban.ctaText?.en && (
                              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-semibold">
                                <LinkIcon className="w-2.5 h-2.5 text-[#006A4E]" />
                                <span>CTA: <strong>{ban.ctaText.en}</strong></span>
                                <span className="font-mono text-emerald-600">&rarr; /{ban.ctaUrl || 'donate'}</span>
                                {ban.openInNewTab && <span className="text-[9px] bg-emerald-200/70 text-emerald-900 px-1 rounded">New Tab</span>}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingBanner(ban);
                              setIsBannerModalOpen(true);
                            }}
                            className="px-3.5 py-1.5 rounded-xl bg-[#006A4E] text-white hover:bg-[#00523C] text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-warm-xs transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>{isBn ? 'সম্পাদনা' : 'Edit Slide'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateBanner(ban.id, { active: !ban.active });
                              showToast(`Banner ${ban.active ? 'deactivated' : 'activated'}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                              ban.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {ban.active ? 'Active' : 'Inactive'}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete banner: ${ban.title.en}?`)) {
                                deleteBanner(ban.id);
                                showToast('Banner deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 cursor-pointer transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: PRESS & NEWS COVERAGE */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'press' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'গণমাধ্যমে সংবাদ ও প্রেস কভারেজ' : 'Press & News Coverage CMS'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'জাতীয় দৈনিক, টিভি ও অনলাইন পোর্টালে প্রকাশিত বাহ্যিক সংবাদের লিংক ও বিবরণ পরিচালনা করুন।' : 'Manage external news features, TV reports, and articles linked to external sources.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingPress(null);
                      setIsPressModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন সংবাদ যুক্ত করুন' : 'Add Press Coverage'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {pressCoverages.length === 0 ? (
                    <div className="text-center py-12 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#EAE3D9] space-y-2">
                      <Newspaper className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-sm font-bold text-slate-700">No press coverage entries yet</p>
                      <p className="text-xs text-slate-500">Click the button above to add your first news or TV report.</p>
                    </div>
                  ) : (
                    pressCoverages.map((item, idx) => (
                      <div
                        key={item.id}
                        className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition-all"
                      >
                        <div className="flex items-start sm:items-center gap-4 min-w-0">
                          <span className="w-7 h-7 rounded-xl bg-white text-slate-800 font-mono font-bold text-xs flex items-center justify-center border border-slate-200 shrink-0">
                            #{idx + 1}
                          </span>

                          <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0">
                            <img
                              src={getAssetUrl(item.imageUrl || '/images/infinity-cover-hero.jpg')}
                              alt={item.title.en}
                              className="w-full h-full object-cover"
                              onError={handleImageError}
                            />
                          </div>

                          <div className="min-w-0 space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C]">
                                {item.outletName}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 text-slate-700">
                                {item.coverageType}
                              </span>
                              {item.isFeatured && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
                                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                  <span>Featured</span>
                                </span>
                              )}
                              <span className="text-[11px] text-slate-400 font-mono">{item.publishedDate}</span>
                            </div>

                            <h4 className="font-bold text-sm text-slate-900 truncate max-w-xl" title={item.title.en}>
                              {item.title.en}
                            </h4>

                            <a
                              href={item.articleUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] text-[#006A4E] hover:underline font-mono truncate max-w-md"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="truncate">{item.articleUrl}</span>
                            </a>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              updatePressCoverage(item.id, { status: item.status === 'published' ? 'hidden' : 'published' });
                              showToast(`Press item ${item.status === 'published' ? 'hidden' : 'published'}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                              item.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {item.status === 'published' ? 'Published' : 'Hidden'}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setEditingPress(item);
                              setIsPressModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer transition-colors"
                            title="Edit Press Entry"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete press item: ${item.title.en}?`)) {
                                deletePressCoverage(item.id);
                                showToast('Press coverage deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 cursor-pointer transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: VOLUNTEERS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'volunteers' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'স্বেচ্ছাসেবী আবেদন ও তালিকা' : 'Volunteer Applications & CRM'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'নতুন আবেদনকারীদের তথ্য, রক্তের গ্রুপ ও জেলাভিত্তিক পর্যালোচনা।' : 'Review volunteer applications, approve candidates, and export volunteer rosters.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const csvContent = "data:text/csv;charset=utf-8," +
                          ["Name,Phone,Email,District,BloodGroup,Status,SubmittedAt"].join(",") + "\n" +
                          volunteers.map(v => `"${v.fullName}","${v.phone}","${v.email}","${v.district}","${v.bloodGroup}","${v.status}","${v.submittedAt}"`).join("\n");
                        const encodedUri = encodeURI(csvContent);
                        const link = document.createElement("a");
                        link.setAttribute("href", encodedUri);
                        link.setAttribute("download", `infinity_volunteers_${new Date().toISOString().split('T')[0]}.csv`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showToast('Volunteer CSV roster exported');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 text-xs font-bold border border-[#EAE3D9] flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 text-[#006A4E]" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                {/* Volunteer Settings & Google Apps Script Webhook Integration */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider">
                      <LinkIcon className="w-3.5 h-3.5 text-[#006A4E]" />
                      <span>{isBn ? 'গুগল শিট ও গুগল ড্রাইভ ইন্টিগ্রেশন সেটিংস' : 'Google Sheets & Drive Webhook Integration'}</span>
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
                      Google Apps Script Webhook
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        {isBn ? 'Google Apps Script Web App URL (ওয়েবহুক এন্ডপয়েন্ট)' : 'Google Apps Script Web App URL (Webhook)'}
                      </label>
                      <input
                        type="text"
                        value={volunteerSettings.googleScriptUrl || ''}
                        onChange={(e) => updateVolunteerSettings({ googleScriptUrl: e.target.value })}
                        placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                        className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                      />
                      <p className="text-[11px] text-slate-500">
                        {isBn
                          ? 'scripts/google-apps-script-volunteer-backend.js ডিপ্লয় করে প্রাপ্ত ওয়েব অ্যাপ লিংক এখানে বসান।'
                          : 'Paste your deployed Google Apps Script Web App URL to receive live sheet & drive sync.'}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 block">
                        {isBn ? 'সংযুক্ত গুগল শিট লিংক (Linked Google Sheet URL)' : 'Linked Google Sheet View URL'}
                      </label>
                      <input
                        type="text"
                        value={volunteerSettings.googleSheetUrl || ''}
                        onChange={(e) => updateVolunteerSettings({ googleSheetUrl: e.target.value })}
                        placeholder="https://docs.google.com/spreadsheets/d/..."
                        className="w-full px-3.5 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                      />
                      {volunteerSettings.googleSheetUrl && (
                        <a
                          href={volunteerSettings.googleSheetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] text-[#006A4E] font-bold hover:underline"
                        >
                          <span>{isBn ? 'গুগল শিট ওপেন করুন' : 'Open Google Sheet'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-200">
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1">CTA Heading Text (English)</label>
                      <input
                        type="text"
                        value={volunteerSettings.ctaText?.en || ''}
                        onChange={(e) => updateVolunteerSettings({
                          ctaText: { ...(volunteerSettings.ctaText || { en: '', bn: '' }), en: e.target.value }
                        })}
                        placeholder="Join Our Dedicated Force"
                        className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-600 block mb-1 font-bengali">হেডিং লেখা (বাংলা)</label>
                      <input
                        type="text"
                        value={volunteerSettings.ctaText?.bn || ''}
                        onChange={(e) => updateVolunteerSettings({
                          ctaText: { ...(volunteerSettings.ctaText || { en: '', bn: '' }), bn: e.target.value }
                        })}
                        placeholder="আমাদের দলে যুক্ত হোন"
                        className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                      />
                    </div>
                  </div>
                </div>

                {/* Volunteer Applicants CRM Roster */}
                <div className="space-y-3">
                  {volunteers.length === 0 ? (
                    <div className="text-center py-12 bg-[#FAF7F2] rounded-2xl border border-dashed border-[#EAE3D9] space-y-2">
                      <Users className="w-8 h-8 text-slate-400 mx-auto" />
                      <p className="text-sm font-bold text-slate-700">{isBn ? 'কোনো আবেদন জমা পড়েনি' : 'No applications received yet'}</p>
                      <p className="text-xs text-slate-500">{isBn ? 'ওয়েবসাইটের সদস্যপদ ফরম পূরণ করলে এখানে তালিকা দেখাবে।' : 'Incoming applications from the website form will appear here.'}</p>
                    </div>
                  ) : (
                    volunteers.map(vol => (
                      <div
                        key={vol.id}
                        className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3 hover:border-slate-300 transition-all"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                          <div className="flex items-start gap-3.5">
                            {vol.photoUrl ? (
                              <div className="w-12 h-14 rounded-xl overflow-hidden bg-slate-200 border border-slate-300 shrink-0 shadow-2xs">
                                <img
                                  src={vol.photoUrl}
                                  alt={vol.fullName}
                                  className="w-full h-full object-cover"
                                  onError={handleImageError}
                                />
                              </div>
                            ) : (
                              <div className="w-12 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shrink-0 shadow-2xs font-bold text-xs">
                                No Pic
                              </div>
                            )}

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-bold text-sm text-slate-900">
                                  {vol.fullName}
                                  {vol.fullNameBn && vol.fullNameBn !== vol.fullName && ` (${vol.fullNameBn})`}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                  {vol.bloodGroup || 'Blood: N/A'}
                                </span>
                                {vol.educationCategory && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase font-mono">
                                    {vol.educationCategory}
                                  </span>
                                )}
                                <span className="text-[10px] text-slate-500 font-mono">
                                  {vol.trackingRef || `Ref: ${vol.id}`}
                                </span>
                              </div>

                              <p className="text-xs text-slate-600">
                                <span className="font-bold">{vol.district}</span> {vol.upazila ? `(${vol.upazila})` : ''} &bull; <span className="font-mono">{vol.phone}</span> &bull; {vol.email}
                              </p>

                              {vol.fatherName && (
                                <p className="text-[11px] text-slate-500">
                                  Father: {vol.fatherName} &bull; Mother: {vol.motherName || 'N/A'}
                                </p>
                              )}

                              {vol.schoolName && (
                                <p className="text-[11px] text-[#006A4E] font-medium">
                                  School: {vol.schoolName} (Class: {vol.currentClass || 'N/A'}, Expected SSC: {vol.expectedSscYear || 'N/A'})
                                </p>
                              )}

                              {vol.diplomaTechnology && (
                                <p className="text-[11px] text-amber-800 font-medium">
                                  Diploma: {vol.diplomaTechnology} ({vol.diplomaInstitute || 'Polytechnic'}, Sem: {vol.diplomaSemester || 'N/A'})
                                </p>
                              )}

                              {vol.honoursInstitute && (
                                <p className="text-[11px] text-[#006A4E] font-medium">
                                  Honours: {vol.honoursSubject} at {vol.honoursInstitute}
                                </p>
                              )}

                              <p className="text-[11px] text-slate-500 italic">
                                Skills: {Array.isArray(vol.skills) ? vol.skills.join(', ') : (vol.interests?.join(', ') || 'General Volunteering')}
                              </p>

                              {vol.motivation && (
                                <p className="text-xs text-slate-700 bg-white p-2 rounded-xl border border-slate-200/70 mt-1.5">
                                  <span className="font-bold text-[10px] text-slate-400 uppercase block">Motivation:</span>
                                  {vol.motivation}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                            <select
                              value={vol.status}
                              onChange={(e) => {
                                updateVolunteerStatus(vol.id, e.target.value as VolunteerApplication['status']);
                                showToast(`Status updated to ${e.target.value}`);
                              }}
                              className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold shadow-2xs"
                            >
                              <option value="New">New</option>
                              <option value="Reviewing">Reviewing</option>
                              <option value="Approved">Approved</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Rejected">Rejected</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete volunteer application for ${vol.fullName}?`)) {
                                  deleteVolunteerApplication(vol.id);
                                  showToast('Volunteer application removed');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 cursor-pointer shadow-2xs transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: DONATIONS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'donations' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'অনুদান ও তহবিল রেকর্ড' : 'Donations & Fund Reconciliation'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'বিকাশ, নগদ ও ব্যাংক মাধ্যমে প্রাপ্ত তহবিলের তথ্য ও মানি রিসিট।' : 'Verify incoming contributions, issue receipts, and manage fund reconciliation.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newDon: Partial<DonationRecord> = {
                          donorName: 'Offline Donor',
                          amount: 2000,
                          paymentMethod: 'Bank Transfer',
                          status: 'Successful'
                        };
                        addDonationRecord(newDon);
                        showToast('Donation record added');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs shadow-warm-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Record Donation</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {donations.map(don => (
                    <div
                      key={don.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{don.donorName}</h4>
                          <span className="font-mono font-extrabold text-emerald-800 text-xs">
                            ৳{don.amountBDT || don.amount} BDT
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-slate-700 border border-slate-200">
                            {don.paymentMethod}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-mono">
                          Receipt: {don.receiptNumber} &bull; TrxID: {don.transactionId || 'N/A'} &bull; Date: {don.date}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={don.status}
                          onChange={(e) => {
                            updateDonationStatus(don.id, e.target.value as DonationRecord['status']);
                            showToast(`Donation status: ${e.target.value}`);
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        >
                          <option value="Successful">Successful</option>
                          <option value="Pending">Pending</option>
                          <option value="Failed">Failed</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: COMMITTEES & LEADERSHIP */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'committees' && (
              <div className="space-y-6">
                {/* 1. Committee Selection & Header */}
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#006A4E]" />
                        <span>{isBn ? 'কমিটি ও নেতৃত্ব পরিষদ ব্যবস্থাপনা' : 'Committees & Leadership CMS'}</span>
                      </h2>
                      <p className="text-xs text-slate-500">
                        {isBn
                          ? 'কার্যনির্বাহী পরিষদ (২০২৬) ও স্থায়ী কমিটির সদস্য, পদবী, ছবি, সিরিয়াল নম্বর ও ক্রম পরিবর্তন করুন।'
                          : 'Manage Executive & Standing Committee rosters, member profiles, photos (1:1 crop), hierarchy, and serial order.'}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMember(null);
                          setIsMemberModalOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>{isBn ? 'নতুন সদস্য যুক্ত করুন' : 'Add Committee Member'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setIsNewCommitteeModalOpen(true)}
                        className="px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#EAE3D9] text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4 text-[#006A4E]" />
                        <span>{isBn ? 'নতুন কমিটি তৈরি' : 'Create Committee'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Committee Selection Tabs */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isBn ? 'পরিচালনার জন্য কমিটি নির্বাচন করুন:' : 'Select Committee to Manage:'}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {committees.map(comm => {
                        const isSelected = selectedCommitteeId === comm.id;
                        const memberCount = committeeMembers.filter(m => m.committeeId === comm.id).length;
                        return (
                          <button
                            key={comm.id}
                            type="button"
                            onClick={() => setSelectedCommitteeId(comm.id)}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                              isSelected
                                ? 'bg-[#006A4E] text-white border-[#006A4E] shadow-warm-sm'
                                : 'bg-[#FAF7F2] text-slate-700 border-[#EAE3D9] hover:border-slate-400'
                            }`}
                          >
                            <span>{isBn ? (comm.name.bn || comm.name.en) : (comm.name.en || comm.name.bn)}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {memberCount}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Selected Committee Details & Metadata Editor */}
                  {(() => {
                    const currentComm = committees.find(c => c.id === selectedCommitteeId) || committees[0];
                    if (!currentComm) return null;
                    const memberCount = committeeMembers.filter(m => m.committeeId === currentComm.id).length;
                    return (
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-3 gap-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'নির্বাচিত কমিটির বিবরণ ও সেটিংস' : 'Committee Information & Settings'}</span>
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[#006A4E] border border-slate-200">
                              Type: {currentComm.type} &bull; Term: {currentComm.year}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const commTitle = currentComm.name?.bn || currentComm.name?.en || 'এই কমিটি';
                                const confirmMsg = isBn
                                  ? `আপনি কি নিশ্চিত যে "${commTitle}" কমিটিটি এবং এর সাথে থাকা ${memberCount} জন সদস্যকে সম্পূর্ণ মুছে ফেলতে চান?`
                                  : `Are you sure you want to permanently delete "${commTitle}" and its ${memberCount} members?`;
                                
                                if (window.confirm(confirmMsg)) {
                                  deleteCommittee(currentComm.id);
                                  const remaining = committees.filter(c => c.id !== currentComm.id);
                                  setSelectedCommitteeId(remaining[0]?.id || '');
                                  showToast(isBn ? 'কমিটি সফলভাবে মুছে ফেলা হয়েছে' : 'Committee deleted successfully');
                                }
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                              title={isBn ? 'এই কমিটি সম্পূর্ণ মুছে ফেলুন' : 'Delete this committee'}
                            >
                              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                              <span>{isBn ? 'কমিটি মুছুন' : 'Delete Committee'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">Committee Name (English)</label>
                            <input
                              type="text"
                              value={currentComm.name?.en || ''}
                              onChange={(e) => updateCommittee(currentComm.id, {
                                name: { ...currentComm.name, en: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 font-bengali">কমিটির নাম (বাংলা)</label>
                            <input
                              type="text"
                              value={currentComm.name?.bn || ''}
                              onChange={(e) => updateCommittee(currentComm.id, {
                                name: { ...currentComm.name, bn: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">Year / Term</label>
                            <input
                              type="text"
                              value={currentComm.year || '2026'}
                              onChange={(e) => updateCommittee(currentComm.id, { year: e.target.value })}
                              className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700">Description (English)</label>
                            <textarea
                              rows={2}
                              value={currentComm.description?.en || ''}
                              onChange={(e) => updateCommittee(currentComm.id, {
                                description: { ...currentComm.description, en: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-700 font-bengali">বিবরণ (বাংলা)</label>
                            <textarea
                              rows={2}
                              value={currentComm.description?.bn || ''}
                              onChange={(e) => updateCommittee(currentComm.id, {
                                description: { ...currentComm.description, bn: e.target.value }
                              })}
                              className="w-full px-3 py-1.5 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 2. Executive Committee Section & Tier Badges Manager */}
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#006A4E]" />
                        <h3 className="text-lg font-extrabold text-slate-900 font-display">
                          {isBn ? 'কার্যনির্বাহী পরিষদ সেকশন ও টিয়ার বার ম্যানেজার' : 'Executive Committee Section & Tier Badges'}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isBn
                          ? 'কার্যনির্বাহী পরিষদ পেজের বিভিন্ন স্তরের বিভাজন বার (যেমন: JOINT GENERAL SECRETARIAT) সম্পাদনা করুন অথবা প্রয়োজনমতো মুছে/লুকিয়ে ফেলুন।'
                          : 'Edit titles or delete/hide the pill section bars separating member tiers on the Executive Committee page.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleAdminResetTierBars}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-700 border border-[#EAE3D9] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                      title="Reset all 7 section bars to defaults"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                      <span>{isBn ? 'ডিফল্ট রিসেট' : 'Reset All to Default'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminTierBars.map((bar, idx) => {
                      const isBarVisible = bar.visible !== false;
                      return (
                        <div
                          key={bar.id}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                            isBarVisible
                              ? 'bg-[#FAF7F2] border-[#EAE3D9] hover:border-slate-300'
                              : 'bg-slate-50 border-dashed border-slate-300 opacity-70'
                          }`}
                        >
                          <div className="space-y-2.5">
                            {/* Range & Visibility Status */}
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                #{idx + 1} &bull; {bar.rangeLabel || `Tier ${idx + 1}`}
                              </span>

                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                isBarVisible ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isBarVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                <span>{isBarVisible ? (isBn ? 'দৃশ্যমান' : 'Visible') : (isBn ? 'লুকানো / মুছে ফেলা' : 'Deleted / Hidden')}</span>
                              </span>
                            </div>

                            {/* Actual Live Badge Preview */}
                            <div className="py-2 text-center">
                              <span className={`text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full border shadow-2xs inline-block max-w-full truncate ${
                                bar.id === 'presidential'
                                  ? 'text-[#00523C] bg-[#E6F3EF] border-[#C2E2D7]'
                                  : bar.id === 'secretariat'
                                  ? 'text-[#B31224] bg-[#FDF1F2] border-[#FCD3D7]'
                                  : 'text-slate-700 bg-white border-[#EAE3D9]'
                              }`}>
                                {bar.title.en}
                              </span>
                            </div>

                            {/* Bilingual Labels */}
                            <div className="text-xs space-y-1 bg-white p-2.5 rounded-xl border border-slate-200/70">
                              <div className="truncate">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">EN:</span>{' '}
                                <span className="font-bold text-slate-800">{bar.title.en}</span>
                              </div>
                              <div className="truncate font-bengali">
                                <span className="text-[10px] font-bold text-slate-400 uppercase font-sans">BN:</span>{' '}
                                <span className="font-bold text-slate-800">{bar.title.bn}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions: Edit & Delete/Toggle */}
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                            <button
                              type="button"
                              onClick={() => {
                                setAdminEditingTierBar({ ...bar });
                                setIsAdminTierModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'সম্পাদনা' : 'Edit Text'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleAdminToggleTierBar(bar.id, isBarVisible)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                                isBarVisible
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200'
                                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                              }`}
                            >
                              {isBarVisible ? (
                                <>
                                  <Trash2 className="w-3.5 h-3.5" />
                                  <span>{isBn ? 'মুছে ফেলুন' : 'Delete / Hide'}</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5" />
                                  <span>{isBn ? 'পুনরুদ্ধার' : 'Restore Bar'}</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Members List & Reordering Controls */}
                <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 font-display flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#006A4E]" />
                        <span>
                          {isBn ? 'সদস্য তালিকা ও পদমর্যাদা ক্রম' : 'Members Roster & Hierarchy'}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isBn
                          ? 'সদস্যের নাম, পদবী, ছবি পরিবর্তন করুন অথবা ▲/▼ বাটনে ক্লিক করে ক্রম পুনঃনির্ধারণ করুন।'
                          : 'Edit member designations, photos (1:1 crop), or click ▲/▼ to change display rank.'}
                      </p>
                    </div>

                    {/* Member Search Bar */}
                    <div className="relative w-full sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={memberSearchQuery}
                        onChange={(e) => setMemberSearchQuery(e.target.value)}
                        placeholder={isBn ? 'সদস্যের নাম বা পদবী...' : 'Search roster...'}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Members Roster Grid / Cards */}
                  <div className="space-y-2.5 pt-2">
                    {(() => {
                      const allMembers = getMembersWithDetails(selectedCommitteeId);
                      const filtered = allMembers.filter(m => {
                        if (!memberSearchQuery.trim()) return true;
                        const q = memberSearchQuery.toLowerCase();
                        const fullName = m.person?.fullName?.toLowerCase() || '';
                        const enName = m.person?.englishName?.toLowerCase() || '';
                        const bnName = m.person?.banglaName || '';
                        const posEn = m.position?.name?.en?.toLowerCase() || '';
                        const posBn = m.position?.name?.bn || '';
                        return (
                          fullName.includes(q) ||
                          enName.includes(q) ||
                          bnName.includes(q) ||
                          posEn.includes(q) ||
                          posBn.includes(q)
                        );
                      });

                      if (filtered.length === 0) {
                        return (
                          <div className="p-8 text-center bg-[#FAF7F2] rounded-2xl border border-dashed border-[#EAE3D9] space-y-2">
                            <Users className="w-8 h-8 text-slate-300 mx-auto" />
                            <p className="text-xs text-slate-500 font-bold">
                              {isBn ? 'এই কমিটিতে কোনো সদস্য পাওয়া যায়নি।' : 'No members found in this committee.'}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMember(null);
                                setIsMemberModalOpen(true);
                              }}
                              className="px-4 py-2 rounded-xl bg-[#006A4E] text-white font-bold text-xs cursor-pointer"
                            >
                              Add First Member
                            </button>
                          </div>
                        );
                      }

                      return filtered.map((item, idx) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl bg-[#FAF7F2] hover:bg-[#F5EFE6]/70 border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                        >
                          {/* Member Identity Details */}
                          <div className="flex items-center gap-3.5">
                            {/* Serial Badge */}
                            <span className="w-8 h-8 rounded-xl bg-white text-[#006A4E] font-mono font-extrabold text-xs flex items-center justify-center border border-slate-200 shrink-0 shadow-2xs">
                              #{String(item.serialNumber || idx + 1).padStart(2, '0')}
                            </span>

                            {/* Photo Thumbnail */}
                            <div
                              onClick={() => {
                                setEditingMember(item);
                                setIsMemberModalOpen(true);
                              }}
                              className="relative w-12 h-12 rounded-xl overflow-hidden bg-white border border-[#006A4E]/30 shrink-0 shadow-2xs group cursor-pointer"
                              title="Click to edit member & photo"
                            >
                              {item.person?.photoUrl ? (
                                <img
                                  src={getAssetUrl(item.person.photoUrl)}
                                  alt={item.person?.fullName || item.person?.englishName || 'Member'}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400">
                                  <Users className="w-5 h-5" />
                                </div>
                              )}
                            </div>

                            {/* Name & Designation */}
                            <div className="space-y-0.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <h4 className="font-extrabold text-sm text-slate-900 font-display">
                                  {isBn
                                    ? (item.person?.banglaName || item.person?.fullName || item.person?.englishName || 'সদস্য')
                                    : (item.person?.englishName || item.person?.fullName || item.person?.banglaName || 'Member')}
                                  {isBn && item.person?.englishName
                                    ? ` (${item.person.englishName})`
                                    : (!isBn && item.person?.banglaName ? ` (${item.person.banglaName})` : '')}
                                </h4>
                                {item.isFeaturedLeader && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                    Leader
                                  </span>
                                )}
                                {item.status !== 'ACTIVE' && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-200 text-slate-600">
                                    {item.status}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-semibold text-[#006A4E]">
                                {isBn
                                  ? (item.position?.name?.bn || item.position?.name?.en || 'সদস্য')
                                  : (item.position?.name?.en || item.position?.name?.bn || 'Member')}
                                {item.position?.name?.en && item.position?.name?.bn && (
                                  <span className="font-sans text-slate-500 font-normal">
                                    {' '}&bull; {isBn ? item.position.name.en : item.position.name.bn}
                                  </span>
                                )}
                              </p>
                              {(isBn ? item.person?.shortBio?.bn : (item.person?.shortBio?.en || item.person?.shortBio?.bn)) && (
                                <p className="text-[11px] text-slate-500 line-clamp-1 italic">
                                  "{isBn ? item.person?.shortBio?.bn : (item.person?.shortBio?.en || item.person?.shortBio?.bn)}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Member Actions: Move Up / Down & Edit / Delete */}
                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            {/* Reorder Buttons */}
                            <div className="flex items-center bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveMember(item.id, 'up')}
                                className="px-2 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                                title="Move Rank Up"
                              >
                                ▲
                              </button>
                              <div className="w-px h-4 bg-slate-200" />
                              <button
                                type="button"
                                disabled={idx === allMembers.length - 1}
                                onClick={() => handleMoveMember(item.id, 'down')}
                                className="px-2 py-1.5 text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer font-bold text-xs"
                                title="Move Rank Down"
                              >
                                ▼
                              </button>
                            </div>

                            {/* Edit Modal Trigger */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingMember(item);
                                setIsMemberModalOpen(true);
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer shadow-2xs transition-all"
                            >
                              <Edit2 className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>{isBn ? 'সম্পাদনা' : 'Edit'}</span>
                            </button>

                            {/* Delete Trigger */}
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove ${item.person?.englishName || item.person?.banglaName || 'member'} from committee?`)) {
                                  deleteCommitteeMember(item.id);
                                  showToast(isBn ? 'সদস্য তালিকা থেকে মুছে ফেলা হয়েছে' : 'Member removed');
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 cursor-pointer transition-all"
                              title="Delete Member"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                {/* 3. New Committee Creation Modal */}
                {isNewCommitteeModalOpen && (
                  <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 max-w-lg w-full space-y-4 shadow-2xl">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="font-extrabold text-base text-slate-900 font-display">
                          {isBn ? 'নতুন কমিটি তৈরি করুন' : 'Create New Committee'}
                        </h3>
                        <button
                          type="button"
                          onClick={() => setIsNewCommitteeModalOpen(false)}
                          className="p-1 text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700">Committee Name (English)</label>
                          <input
                            type="text"
                            value={newCommitteeNameEn}
                            onChange={(e) => setNewCommitteeNameEn(e.target.value)}
                            placeholder="e.g. Standing Committee on Healthcare"
                            className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 font-bengali">কমিটির নাম (বাংলা)</label>
                          <input
                            type="text"
                            value={newCommitteeNameBn}
                            onChange={(e) => setNewCommitteeNameBn(e.target.value)}
                            placeholder="যেমন: স্বাস্থ্য ও চিকিৎসা বিষয়ক স্থায়ী কমিটি"
                            className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Committee Type</label>
                            <select
                              value={newCommitteeType}
                              onChange={(e) => setNewCommitteeType(e.target.value as any)}
                              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold"
                            >
                              <option value="STANDING">স্থায়ী কমিটি (Standing)</option>
                              <option value="EXECUTIVE">কার্যনির্বাহী পরিষদ (Executive)</option>
                              <option value="SPECIAL">বিশেষ কমিটি (Special)</option>
                              <option value="PAST">প্রাক্তন কমিটি (Past)</option>
                            </select>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-700">Term / Year</label>
                            <input
                              type="text"
                              value={newCommitteeYear}
                              onChange={(e) => setNewCommitteeYear(e.target.value)}
                              placeholder="2026"
                              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setIsNewCommitteeModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-white border border-[#EAE3D9] text-xs font-bold text-slate-700"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newCommitteeNameEn.trim()) {
                              alert('Please provide committee name');
                              return;
                            }
                            const newComm = addCommittee({
                              slug: newCommitteeNameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                              name: { en: newCommitteeNameEn, bn: newCommitteeNameBn || newCommitteeNameEn },
                              type: newCommitteeType,
                              year: newCommitteeYear,
                              description: { en: newCommitteeDescEn, bn: newCommitteeDescBn },
                              status: 'ACTIVE',
                              sortOrder: committees.length + 1,
                              isFeatured: false
                            });
                            setSelectedCommitteeId(newComm.id);
                            setIsNewCommitteeModalOpen(false);
                            setNewCommitteeNameEn('');
                            setNewCommitteeNameBn('');
                            showToast('New committee created');
                          }}
                          className="px-5 py-2 rounded-xl bg-[#006A4E] text-white text-xs font-bold"
                        >
                          Create Committee
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------------------------------------------- */}
            {/* TAB: BACKUP & DIAGNOSTICS */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'backup' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="text-xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'ডেটাবেজ ব্যাকআপ, রিস্টোর ও ডায়াগনস্টিকস' : 'Database Diagnostics & Full JSON Snapshots'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isBn ? 'সম্পূর্ণ ডেটাবেজ এক ক্লিকে এক্সপোর্ট, ইম্পোর্ট অথবা ডিফল্ট তথ্যে রূপান্তর করুন।' : 'Export complete database snapshot as verified JSON, restore backups, or trigger live PostgreSQL sync.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* JSON Backup Export */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
                      <Download className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Export Complete JSON Backup</h3>
                    <p className="text-xs text-slate-500">Download a full timestamped JSON backup containing all 20+ tables and settings.</p>
                    <button
                      type="button"
                      onClick={() => {
                        const jsonStr = exportDatabaseJSON();
                        const blob = new Blob([jsonStr], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `infinity_bangladesh_backup_${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
                        link.click();
                        URL.revokeObjectURL(url);
                        showToast('Database JSON backup downloaded');
                      }}
                      className="px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                    >
                      Download Backup (.JSON)
                    </button>
                  </div>

                  {/* JSON Restore */}
                  <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                      <Upload className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">Restore from JSON File</h3>
                    <p className="text-xs text-slate-500">Restore all CMS entities and tables from a previous JSON snapshot.</p>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            const content = ev.target?.result as string;
                            if (content && importDatabaseJSON(content)) {
                              showToast('Database successfully restored from JSON snapshot!');
                            } else {
                              alert('Invalid JSON backup file structure.');
                            }
                          };
                          reader.readAsText(file);
                        }
                      }}
                      className="text-xs text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                    />
                  </div>
                </div>

                {/* Factory Reset */}
                <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Reset All Data to Authoritative Verified Defaults</span>
                  </div>
                  <p className="text-xs text-rose-700">
                    Warning: This will reset all homepage configs, committee rosters, campaigns, and settings back to verified 2015–2026 official organization defaults.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm('Are you sure you want to factory reset all data to default verified records?')) {
                        resetToDefaultData();
                        showToast('All data reset to official organization defaults');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-warm-sm cursor-pointer"
                  >
                    Reset to Verified Factory Defaults
                  </button>
                </div>
              </div>
            )}
            </AdminErrorBoundary>
          </div>
        </div>
      </div>

      {/* Campaign Edit/Add Modal */}
      <CampaignModal
        isOpen={isCampaignModalOpen}
        onClose={() => setIsCampaignModalOpen(false)}
        campaign={editingCampaign}
        onSave={(campaignData) => {
          if (editingCampaign) {
            updateCampaign(editingCampaign.id, campaignData);
            showToast(isBn ? 'ক্যাম্পেইন সফলভাবে আপডেট হয়েছে' : 'Campaign successfully updated');
          } else {
            addCampaign(campaignData as Omit<Campaign, 'id'>);
            showToast(isBn ? 'নতুন ক্যাম্পেইন প্রকাশিত হয়েছে' : 'New campaign published');
          }
          setIsCampaignModalOpen(false);
        }}
        onOpenMediaPicker={openMediaPicker}
        isBn={isBn}
      />

      {/* Program Edit/Add Modal */}
      <ProgramModal
        isOpen={isProgramModalOpen}
        onClose={() => setIsProgramModalOpen(false)}
        program={editingProgram}
        onSave={(progData) => {
          if (editingProgram) {
            updateProgram(editingProgram.id, progData);
            showToast(isBn ? 'প্রোগ্রাম আপডেট হয়েছে' : 'Program updated');
          } else {
            addProgram(progData as Omit<Program, 'id'>);
            showToast(isBn ? 'নতুন প্রোগ্রাম তৈরি হয়েছে' : 'New program created');
          }
          setIsProgramModalOpen(false);
        }}
        onOpenMediaPicker={openMediaPicker}
        isBn={isBn}
      />

      {/* Story Edit/Add Modal */}
      <StoryModal
        isOpen={isStoryModalOpen}
        onClose={() => setIsStoryModalOpen(false)}
        story={editingStory}
        onSave={(storyData) => {
          if (editingStory) {
            updateStory(editingStory.id, storyData);
            showToast(isBn ? 'গল্প আপডেট হয়েছে' : 'Story updated');
          } else {
            addStory(storyData as Omit<ImpactStory, 'id'>);
            showToast(isBn ? 'নতুন গল্প প্রকাশিত হয়েছে' : 'New story published');
          }
          setIsStoryModalOpen(false);
        }}
        onOpenMediaPicker={openMediaPicker}
        isBn={isBn}
      />

      {/* FAQ Edit/Add Modal */}
      <FAQModal
        isOpen={isFAQModalOpen}
        onClose={() => setIsFAQModalOpen(false)}
        faq={editingFAQ}
        onSave={(faqData) => {
          if (editingFAQ) {
            updateFAQ(editingFAQ.id, faqData);
            showToast(isBn ? 'প্রশ্নোত্তর আপডেট হয়েছে' : 'FAQ item updated');
          } else {
            addFAQ(faqData as Omit<FAQItem, 'id'>);
            showToast(isBn ? 'নতুন প্রশ্নোত্তর যুক্ত হয়েছে' : 'New FAQ item created');
          }
          setIsFAQModalOpen(false);
        }}
        isBn={isBn}
      />

      {/* Committee Member Edit/Add Modal */}
      <CommitteeMemberModal
        isOpen={isMemberModalOpen}
        onClose={() => {
          setIsMemberModalOpen(false);
          setEditingMember(null);
        }}
        member={editingMember}
        defaultCommitteeId={selectedCommitteeId}
        onSave={handleSaveMember}
        onOpenMediaPicker={openMediaPicker}
      />

      {/* Executive Section/Tier Bar Edit Modal */}
      {isAdminTierModalOpen && adminEditingTierBar && (
        <div
          className="fixed inset-0 z-[9995] bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsAdminTierModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 font-display">
                    {isBn ? 'সেকশন ও টিয়ার বার সম্পাদনা' : 'Edit Committee Section Bar'}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    {adminEditingTierBar.rangeLabel || adminEditingTierBar.id}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAdminTierModalOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAdminSaveTierBar(adminEditingTierBar);
              }}
              className="space-y-4"
            >
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  {isBn ? 'সেকশন শিরোনাম (English)' : 'Section Bar Title (English)'}
                </label>
                <input
                  type="text"
                  value={adminEditingTierBar.title.en}
                  onChange={(e) => setAdminEditingTierBar({
                    ...adminEditingTierBar,
                    title: { ...adminEditingTierBar.title, en: e.target.value }
                  })}
                  placeholder="e.g. JOINT GENERAL SECRETARIAT"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block font-bengali">
                  {isBn ? 'সেকশন শিরোনাম (বাংলা)' : 'Section Bar Title (Bengali)'}
                </label>
                <input
                  type="text"
                  value={adminEditingTierBar.title.bn}
                  onChange={(e) => setAdminEditingTierBar({
                    ...adminEditingTierBar,
                    title: { ...adminEditingTierBar.title, bn: e.target.value }
                  })}
                  placeholder="যেমন: যুগ্ম সাধারণ সম্পাদক পরিষদ"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs sm:text-sm font-bengali font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006A4E]"
                  required
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-slate-800 block">
                    {isBn ? 'সেকশন বারের দৃশ্যমানতা' : 'Section Bar Visibility'}
                  </span>
                  <p className="text-[11px] text-slate-500">
                    {adminEditingTierBar.visible !== false
                      ? (isBn ? 'এই বারটি পেজে প্রদর্শিত হচ্ছে।' : 'This pill bar is currently visible on the page.')
                      : (isBn ? 'এই বারটি পেজে লুকানো/মুছে ফেলা হয়েছে।' : 'This pill bar is currently hidden/deleted.')}
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminEditingTierBar.visible !== false}
                    onChange={(e) => setAdminEditingTierBar({
                      ...adminEditingTierBar,
                      visible: e.target.checked
                    })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006A4E]"></div>
                </label>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleAdminToggleTierBar(adminEditingTierBar.id, adminEditingTierBar.visible !== false);
                    setIsAdminTierModalOpen(false);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{adminEditingTierBar.visible !== false ? (isBn ? 'বার মুছে ফেলুন' : 'Delete / Hide Bar') : (isBn ? 'বার দৃশ্যমান করুন' : 'Show Bar')}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminTierModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
                  >
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-extrabold shadow-warm-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* ======================================================== */}
      {/* MEDIA PREVIEW MODAL */}
      {/* ======================================================== */}
      {previewingMedia && (() => {
        const isVideo = previewingMedia.type === 'video';
        const norm = detectAndNormalizeMedia(previewingMedia.url);

        return (
          <div
            className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => setPreviewingMedia(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 flex flex-col max-h-[92vh]"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100 bg-[#FAF7F2]">
                <div className="flex items-center gap-2 truncate max-w-[80%]">
                  <span className="p-1 rounded-lg bg-[#E6F3EF] text-[#006A4E]">
                    {isVideo ? <VideoIcon className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-sm sm:text-base font-display truncate">
                    {previewingMedia.title || previewingMedia.fileName}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewingMedia(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Media Body */}
              <div className="aspect-video bg-black relative flex items-center justify-center overflow-hidden">
                {isVideo ? (
                  norm.isValid && norm.embedUrl ? (
                    norm.type === 'direct_video' ? (
                      <video src={norm.originalUrl} controls autoPlay className="w-full h-full object-contain" />
                    ) : (
                      <iframe
                        src={norm.embedUrl}
                        title={previewingMedia.title || 'Video Player'}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )
                  ) : (
                    <div className="p-6 text-center text-white space-y-2">
                      <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                      <p className="text-xs">{norm.errorMessage || 'Cannot play video embed directly.'}</p>
                      <a
                        href={previewingMedia.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold underline"
                      >
                        Open original URL <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )
                ) : (
                  <img
                    src={getAssetUrl(previewingMedia.url)}
                    alt={previewingMedia.altText || previewingMedia.fileName}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Footer Details */}
              <div className="p-4 sm:p-5 space-y-2.5 text-xs bg-white">
                <div className="flex flex-wrap items-center justify-between gap-2 text-slate-500">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF7F2] font-bold border border-[#EAE3D9] text-slate-700 capitalize">
                      {previewingMedia.platform || previewingMedia.category}
                    </span>
                    <span>{previewingMedia.fileSize || 'Standard'}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(previewingMedia.url);
                        showToast('Asset URL copied');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] text-[#006A4E] font-bold border border-[#EAE3D9] hover:bg-[#F2ECE1] transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </button>
                    <a
                      href={previewingMedia.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-[#006A4E] text-white font-bold hover:bg-[#00523C] transition-colors flex items-center gap-1"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ======================================================== */}
      {/* EDIT MEDIA METADATA MODAL */}
      {/* ======================================================== */}
      {editingMedia && (
        <div
          className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
          onClick={() => setEditingMedia(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 space-y-4 p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 font-display">
                {isBn ? 'মিডিয়া তথ্য সম্পাদনা' : 'Edit Media Metadata'}
              </h3>
              <button
                type="button"
                onClick={() => setEditingMedia(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Display Name:</label>
                <input
                  type="text"
                  value={editingMedia.title || editingMedia.fileName}
                  onChange={e => setEditingMedia({ ...editingMedia, title: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Alt Text (Accessibility & SEO):</label>
                <input
                  type="text"
                  value={editingMedia.altText || ''}
                  onChange={e => setEditingMedia({ ...editingMedia, altText: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category:</label>
                <select
                  value={editingMedia.category}
                  onChange={e => setEditingMedia({ ...editingMedia, category: e.target.value as MediaCategory })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                >
                  {['General', 'Hero', 'Campaigns', 'Volunteers', 'Events', 'Children & Community', 'Logos', 'Banners', 'Stories', 'Gallery', 'Documents'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Caption / Description:</label>
                <textarea
                  rows={2}
                  value={editingMedia.caption || ''}
                  onChange={e => setEditingMedia({ ...editingMedia, caption: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editIsFeatured"
                  checked={editingMedia.isFeatured || false}
                  onChange={e => setEditingMedia({ ...editingMedia, isFeatured: e.target.checked })}
                  className="rounded text-[#006A4E] focus:ring-[#006A4E]"
                />
                <label htmlFor="editIsFeatured" className="font-bold text-slate-700 cursor-pointer">
                  Mark as Featured Highlight Asset
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setEditingMedia(null)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  updateMediaItem(editingMedia.id, {
                    title: editingMedia.title,
                    altText: editingMedia.altText,
                    caption: editingMedia.caption,
                    category: editingMedia.category,
                    isFeatured: editingMedia.isFeatured
                  });
                  setEditingMedia(null);
                  showToast('Media metadata updated');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold shadow-warm-xs transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ADD NEW MEDIA MODAL (URL PASTE OR CLOUDINARY UPLOAD) */}
      {/* ======================================================== */}
      {isNewMediaModalOpen && (() => {
        const detected = newMediaUrl.trim() ? detectAndNormalizeMedia(newMediaUrl.trim()) : null;

        return (
          <div
            className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in"
            onClick={() => setIsNewMediaModalOpen(false)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200 relative animate-in zoom-in-95 space-y-4 p-6 text-left"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="font-extrabold text-base text-slate-900 font-display">
                  {isBn ? 'নতুন মিডিয়া সম্পদ যুক্ত করুন' : 'Add New Media Asset'}
                </h3>
                <button
                  type="button"
                  onClick={() => setIsNewMediaModalOpen(false)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Source Tabs */}
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setNewMediaSourceTab('url')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    newMediaSourceTab === 'url'
                      ? 'bg-[#006A4E] text-white shadow-warm-xs'
                      : 'bg-[#FAF7F2] text-slate-600 hover:bg-slate-100 border border-[#EAE3D9]'
                  }`}
                >
                  YouTube / Facebook / URL
                </button>
                <button
                  type="button"
                  onClick={() => setNewMediaSourceTab('upload')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    newMediaSourceTab === 'upload'
                      ? 'bg-[#006A4E] text-white shadow-warm-xs'
                      : 'bg-[#FAF7F2] text-slate-600 hover:bg-slate-100 border border-[#EAE3D9]'
                  }`}
                >
                  Cloudinary PC Upload
                </button>
              </div>

              {/* Tab 1: Direct URL & Embed Detection */}
              {newMediaSourceTab === 'url' && (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Media URL (YouTube, Facebook, Image CDN, Direct Video):
                    </label>
                    <input
                      type="text"
                      value={newMediaUrl}
                      onChange={e => setNewMediaUrl(e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=... or https://..."
                      className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:outline-none focus:border-[#006A4E]"
                    />
                  </div>

                  {/* Detection Feedback */}
                  {detected && (
                    <div className="space-y-2">
                      {detected.isValid ? (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-[#00523C] space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-bold capitalize">Verified: {detected.type} ({detected.platform})</span>
                            <span className="text-[10px] px-2 py-0.5 bg-white font-bold rounded-full text-[#006A4E]">Ready</span>
                          </div>
                          {detected.embedUrl && (
                            <div className="aspect-video rounded-lg overflow-hidden bg-black max-h-36">
                              <iframe src={detected.embedUrl} title="Preview" className="w-full h-full border-0" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                          <span>{detected.errorMessage}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Title / Display Name:</label>
                    <input
                      type="text"
                      value={newMediaTitle}
                      onChange={e => setNewMediaTitle(e.target.value)}
                      placeholder="e.g. Winter Relief Campaign Field Video"
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Category:</label>
                    <select
                      value={newMediaCategory}
                      onChange={e => setNewMediaCategory(e.target.value as MediaCategory)}
                      className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:outline-none focus:border-[#006A4E]"
                    >
                      {['General', 'Hero', 'Campaigns', 'Volunteers', 'Events', 'Children & Community', 'Logos', 'Banners', 'Stories', 'Gallery', 'Documents'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Tab 2: Upload File */}
              {newMediaSourceTab === 'upload' && (
                <div className="space-y-3 text-xs">
                  <div className="p-6 border-2 border-dashed border-slate-300 hover:border-[#006A4E] rounded-2xl text-center space-y-2 bg-[#FAF7F2]">
                    <Upload className="w-8 h-8 text-[#006A4E] mx-auto" />
                    <p className="font-bold text-slate-700">Choose photo/video to upload to Cloudinary</p>
                    <label className="inline-block px-4 py-2 bg-[#006A4E] text-white font-bold rounded-xl cursor-pointer hover:bg-[#00523C] transition-colors">
                      <span>Select File</span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={async e => {
                          if (e.target.files && e.target.files.length > 0) {
                            const file = e.target.files[0];
                            setIsUploadingMedia(true);
                            setMediaUploadError('');
                            try {
                              const res = await uploadToCloudinary(file);
                              if (res && res.secure_url) {
                                addMediaItem({
                                  fileName: file.name,
                                  url: res.secure_url,
                                  fileSize: `${(file.size / 1024).toFixed(1)} KB`,
                                  mimeType: file.type,
                                  type: file.type.startsWith('video/') ? 'video' : 'image',
                                  sourceType: 'upload',
                                  platform: 'cloudinary',
                                  category: newMediaCategory,
                                  altText: newMediaAlt || file.name,
                                  title: newMediaTitle || file.name,
                                  usageTags: ['Cloudinary Upload'],
                                  status: 'published'
                                });
                                setIsUploadingMedia(false);
                                setIsNewMediaModalOpen(false);
                                showToast('File uploaded to Cloudinary');
                              }
                            } catch (err: any) {
                              setMediaUploadError(err.message || 'Upload failed');
                              setIsUploadingMedia(false);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>

                  {isUploadingMedia && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-[#00523C] font-bold text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006A4E] animate-ping" />
                      <span>Uploading to Cloudinary CDN...</span>
                    </div>
                  )}

                  {mediaUploadError && (
                    <div className="p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs">
                      {mediaUploadError}
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewMediaModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                {newMediaSourceTab === 'url' && (
                  <button
                    type="button"
                    disabled={!newMediaUrl.trim()}
                    onClick={() => {
                      const det = detectAndNormalizeMedia(newMediaUrl.trim());
                      const isVideo = det.type === 'youtube' || det.type === 'facebook' || det.type === 'direct_video';
                      
                      const created = addMediaItem({
                        fileName: newMediaTitle || `media-${Date.now()}`,
                        url: det.originalUrl,
                        embedUrl: det.embedUrl,
                        thumbnailUrl: det.thumbnailUrl || (isVideo ? 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80' : undefined),
                        fileSize: isVideo ? 'Embedded Stream' : 'External URL',
                        mimeType: isVideo ? 'video/mp4' : 'image/jpeg',
                        type: isVideo ? 'video' : 'image',
                        sourceType: 'url',
                        platform: det.platform as any,
                        category: newMediaCategory,
                        title: newMediaTitle || (isVideo ? 'Official Field Footage' : 'Photographic Archive'),
                        altText: newMediaAlt || newMediaTitle || 'Team Infinity Media',
                        usageTags: ['External Media URL'],
                        status: 'published',
                        isFeatured: newMediaIsFeatured
                      });

                      // Also sync to videos if video item
                      if (isVideo) {
                        addVideo({
                          title: { en: newMediaTitle || 'Field Drive Video', bn: newMediaTitle || 'মাঠপর্যায়ের ভিডিও' },
                          description: { en: 'Team Infinity official field drive coverage.', bn: 'টিম ইনফিনিটি অফিশিয়াল মানবিক কার্যক্রম।' },
                          videoUrl: det.originalUrl,
                          embedUrl: det.embedUrl || '',
                          thumbnailUrl: det.thumbnailUrl || DEFAULT_VIDEO_THUMBNAIL,
                          date: new Date().toISOString().split('T')[0],
                          duration: 'Video',
                          platform: (det.platform === 'youtube' ? 'youtube' : det.platform === 'facebook' ? 'facebook' : 'custom') as any,
                          category: newMediaCategory === 'Campaigns' ? 'Relief Campaigns' : newMediaCategory === 'Volunteers' ? 'Volunteer Drives' : 'General',
                          status: 'published',
                          isFeatured: newMediaIsFeatured
                        });
                      }

                      setIsNewMediaModalOpen(false);
                      showToast('Media asset registered and available in library');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] disabled:bg-slate-300 text-white text-xs font-bold shadow-warm-xs transition-colors cursor-pointer"
                  >
                    Save to Media Library
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })()}

      {/* ======================================================== */}
      {/* DEDICATED VIDEO PUBLISH & EDIT MODAL */}
      {/* ======================================================== */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => {
          setIsVideoModalOpen(false);
          setEditingVideo(null);
        }}
        videoToEdit={editingVideo}
        onSave={(videoData) => {
          if ('id' in videoData && videoData.id) {
            updateVideo(videoData.id, videoData);
            showToast(isBn ? 'ভিডিও সফলভাবে আপডেট হয়েছে' : 'Video details updated successfully');
          } else {
            addVideo(videoData);
            showToast(isBn ? 'নতুন ভিডিও সফলভাবে প্রকাশিত হয়েছে' : 'Video published successfully to website');
          }
        }}
      />

      {/* ======================================================== */}
      {/* DYNAMIC IMAGE CROPPER MODAL */}
      {/* ======================================================== */}
      <ImageEditorModal
        isOpen={isCropperModalOpen}
        onClose={() => setIsCropperModalOpen(false)}
        imageUrl={cropperSourceUrl}
        onSave={(croppedUrl) => {
          if (typeof cropperCallback === 'function') {
            cropperCallback(croppedUrl);
          }
          setIsCropperModalOpen(false);
        }}
      />

      {/* Universal Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelect={(url) => {
          if (typeof mediaPickerCallback === 'function') {
            mediaPickerCallback(url);
          }
          setMediaPickerOpen(false);
        }}
        onSelectMedia={(url) => {
          if (typeof mediaPickerCallback === 'function') {
            mediaPickerCallback(url);
          }
          setMediaPickerOpen(false);
        }}
      />

      {/* ======================================================== */}
      {/* BANNER & HERO SLIDER MODAL */}
      {/* ======================================================== */}
      <BannerModal
        isOpen={isBannerModalOpen}
        onClose={() => {
          setIsBannerModalOpen(false);
          setEditingBanner(null);
        }}
        banner={editingBanner}
        onSave={(bannerData) => {
          if (editingBanner?.id) {
            updateBanner(editingBanner.id, bannerData);
            showToast(isBn ? 'ব্যানার সফলভাবে আপডেট হয়েছে' : 'Banner slide updated successfully');
          } else {
            addBanner(bannerData);
            showToast(isBn ? 'নতুন ব্যানার সফলভাবে যুক্ত হয়েছে' : 'New banner slide added successfully');
          }
        }}
        onOpenMediaLibrary={openMediaPicker}
      />

      {/* ======================================================== */}
      {/* GALLERY ALBUM DETAILS MODAL */}
      {/* ======================================================== */}
      <AlbumModal
        isOpen={isAlbumModalOpen}
        onClose={() => {
          setIsAlbumModalOpen(false);
          setEditingAlbum(null);
        }}
        album={editingAlbum}
        onSave={(albumData) => {
          if (editingAlbum?.id) {
            updateGalleryAlbum(editingAlbum.id, albumData);
            showToast(isBn ? 'অ্যালবাম তথ্য আপডেট হয়েছে' : 'Album details updated successfully');
          } else {
            addGalleryAlbum(albumData);
            showToast(isBn ? 'নতুন অ্যালবাম সফলভাবে তৈরি হয়েছে' : 'New gallery album created');
          }
        }}
        onOpenMediaLibrary={openMediaPicker}
      />

      {/* ======================================================== */}
      {/* ALBUM PHOTO MANAGER MODAL */}
      {/* ======================================================== */}
      <AlbumPhotoManagerModal
        isOpen={isAlbumPhotoManagerOpen}
        onClose={() => {
          setIsAlbumPhotoManagerOpen(false);
          setEditingAlbumPhotos(null);
        }}
        album={editingAlbumPhotos}
        allGalleryPhotos={gallery}
        allMediaItems={mediaLibrary}
        onSavePhotos={(albumId, photoIds) => {
          setAlbumPhotos(albumId, photoIds);
          showToast(isBn ? 'অ্যালবামের ছবি সফলভাবে সংরক্ষিত হয়েছে' : 'Album photos synchronized successfully');
        }}
      />

      {/* ======================================================== */}
      {/* IMAGE ASSET PUBLISH & METADATA MODAL */}
      {/* ======================================================== */}
      <ImagePublishModal
        isOpen={isImagePublishModalOpen}
        onClose={() => {
          setIsImagePublishModalOpen(false);
          setEditingImageItem(null);
        }}
        mediaItem={editingImageItem}
        campaigns={campaigns}
        events={events}
        onSave={(mediaData) => {
          if (editingImageItem?.id) {
            updateMediaItem(editingImageItem.id, mediaData);
            showToast(isBn ? 'ছবির মেটাডাটা আপডেট হয়েছে' : 'Image asset metadata updated successfully');
          } else {
            addMediaItem({
              ...mediaData,
              fileSize: mediaData.fileSize || 'Optimized',
              mimeType: mediaData.mimeType || 'image/jpeg',
              sourceType: 'upload',
              platform: 'cloudinary',
              status: 'published'
            });
            // Also add to gallery for public gallery showcase
            addGalleryPhoto({
              title: { en: mediaData.title || mediaData.fileName, bn: mediaData.description || mediaData.fileName },
              caption: { en: mediaData.caption || '', bn: mediaData.caption || '' },
              imageUrl: mediaData.url,
              category: mediaData.category || 'Campaigns',
              date: new Date().toISOString().split('T')[0],
              location: 'Bangladesh'
            });
            showToast(isBn ? 'নতুন ছবি সফলভাবে প্রকাশিত ও সংরক্ষিত হয়েছে' : 'Image asset published and added to media library');
          }
        }}
      />

      {/* ======================================================== */}
      {/* PRESS & NEWS COVERAGE MODAL */}
      {/* ======================================================== */}
      <PressCoverageModal
        isOpen={isPressModalOpen}
        onClose={() => {
          setIsPressModalOpen(false);
          setEditingPress(null);
        }}
        pressItem={editingPress}
        onSave={(pressData) => {
          if (editingPress?.id) {
            updatePressCoverage(editingPress.id, pressData);
            showToast(isBn ? 'সংবাদ কভারেজ আপডেট হয়েছে' : 'Press coverage item updated successfully');
          } else {
            addPressCoverage(pressData);
            showToast(isBn ? 'নতুন সংবাদ কভারেজ যুক্ত হয়েছে' : 'New press coverage item published');
          }
        }}
        onOpenMediaLibrary={openMediaPicker}
      />

      {/* ======================================================== */}
      {/* NAVIGATION MENU ITEM MODAL */}
      {/* ======================================================== */}
      <NavigationModal
        isOpen={isNavModalOpen}
        onClose={() => {
          setIsNavModalOpen(false);
          setEditingNav(null);
        }}
        item={editingNav}
        isBn={isBn}
        onSave={(navData) => {
          if (editingNav?.id) {
            updateNavigationItem(editingNav.id, navData);
            showToast(isBn ? 'মেনু লিঙ্ক আপডেট হয়েছে' : 'Navigation link updated successfully');
          } else {
            addNavigationItem({
              label: navData.label || { en: 'New Link', bn: 'নতুন লিঙ্ক' },
              path: navData.path || 'home',
              isExternal: !!navData.isExternal,
              isDropdown: !!navData.isDropdown,
              children: navData.children || [],
              displayOrder: navigationItems.length + 1,
              active: navData.active !== false
            });
            showToast(isBn ? 'নতুন মেনু লিঙ্ক তৈরি হয়েছে' : 'New navigation link created');
          }
        }}
      />

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};
