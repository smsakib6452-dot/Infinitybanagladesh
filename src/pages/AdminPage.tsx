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
  ToggleRight
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
  GalleryAlbum,
  AdminProfile,
  AdminRole,
  PageRoute
} from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';
import { formatBDT } from '../lib/utils/formatters';
import { Toast } from '../components/Toast';
import { MediaPickerModal } from '../components/MediaPickerModal';
import { isSupabaseConfigured, signInWithEmail, signOutAdmin } from '../lib/supabase';

type AdminTab =
  | 'overview'
  | 'homepage'
  | 'about_cms'
  | 'campaigns'
  | 'programs'
  | 'impact'
  | 'stories'
  | 'media_library'
  | 'banners'
  | 'gallery_albums'
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
    news, addNews, updateNews, deleteNews,
    events, addEvent, updateEvent, deleteEvent,
    gallery, addGalleryPhoto, deleteGalleryPhoto,
    videos, addVideo, deleteVideo,
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
    galleryAlbums, addGalleryAlbum, updateGalleryAlbum, deleteGalleryAlbum,
    adminProfiles, addAdminProfile, updateAdminProfile, deleteAdminProfile,
    auditLogs,
    committees, addCommittee, updateCommittee, deleteCommittee, archiveCommittee, setActiveCommittee,
    persons, addPerson, updatePerson, deletePerson,
    positions, addPosition, updatePosition, deletePosition,
    committeeMembers, addCommitteeMember, updateCommitteeMember, deleteCommitteeMember, reorderCommitteeMembers, getMembersWithDetails,
    isLiveSupabase, isSyncing, syncWithSupabase, resetToDefaultData, exportDatabaseJSON, importDatabaseJSON
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

  const [editingBanner, setEditingBanner] = useState<BannerItem | null>(null);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

  const [editingAlbum, setEditingAlbum] = useState<GalleryAlbum | null>(null);
  const [isAlbumModalOpen, setIsAlbumModalOpen] = useState(false);

  const [editingNav, setEditingNav] = useState<NavigationItem | null>(null);
  const [isNavModalOpen, setIsNavModalOpen] = useState(false);

  const [editingAdmin, setEditingAdmin] = useState<AdminProfile | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>(committees[0]?.id || '');
  const [isCommitteeModalOpen, setIsCommitteeModalOpen] = useState(false);
  const [editingCommittee, setEditingCommittee] = useState<Committee | null>(null);

  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);

  const [isPersonModalOpen, setIsPersonModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState<Person | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const openMediaPicker = (onSelect: (url: string) => void) => {
    setMediaPickerCallback(() => onSelect);
    setMediaPickerOpen(true);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await signInWithEmail(authEmail, authPassword);
        if (data?.user) {
          setIsAuthenticated(true);
          localStorage.setItem('infinity_bd_admin_auth', 'true');
          showToast('Authenticated via Supabase');
          return;
        } else if (error) {
          console.warn('Supabase auth notice:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase auth failed, trying offline credentials fallback:', err);
      }
    }

    // Default Fallback Admin Password
    if (authPassword === 'admin123' || authPassword === 'infinity2026' || authPassword === 'infinity123') {
      setIsAuthenticated(true);
      localStorage.setItem('infinity_bd_admin_auth', 'true');
      showToast('Logged in as Administrator');
    } else {
      setAuthError(isBn ? 'ভুল পাসওয়ার্ড। আবার চেষ্টা করুন।' : 'Invalid credentials. Please enter a valid administrator password.');
    }
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
                placeholder="admin@infinitybangladesh.org"
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
              <button
                type="button"
                onClick={syncWithSupabase}
                disabled={isSyncing}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006A4E] hover:bg-[#008562] text-xs text-white font-bold transition-all cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Syncing...' : 'Sync DB'}</span>
              </button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Sidebar Menu */}
          <div className="lg:col-span-3 bg-white rounded-3xl border border-[#EAE3D9] p-4 shadow-warm-sm space-y-6">
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
            {/* TAB: HOMEPAGE EDITOR */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'homepage' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-8 shadow-warm-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'হোমপেজ হিরো ও সেকশন কনফিগারেশন' : 'Homepage Hero & Section Manager'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'হেডলাইন, স্লোগান, হিরো ইমেজ ও সেকশনের ক্রম পরিবর্তন করুন।' : 'Update headline, slogans, real cover photography, CTA buttons, and reorder sections.'}
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
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
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
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
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
                        className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                      />
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
            {/* TAB: MEDIA LIBRARY */}
            {/* -------------------------------------------------------- */}
            {activeTab === 'media_library' && (
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'মিডিয়া ও আলোকচিত্র লাইব্রেরি' : 'Media Assets & Authentic Photography'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'মাঠপর্যায়ের গ্রুপ ফটো, ইভেন্ট ও লোগো আপলোড ও ম্যানেজ করুন।' : 'Upload verified photographs from field drives, assign categories, and use anywhere on the website.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openMediaPicker((url) => {
                      showToast(`Asset selected: ${url}`);
                    })}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>{isBn ? 'নতুন ছবি আপলোড / নির্বাচন' : 'Upload / Pick Media'}</span>
                  </button>
                </div>

                {/* Media Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                  {mediaLibrary.map(media => (
                    <div
                      key={media.id}
                      className="rounded-2xl border border-[#EAE3D9] bg-[#FAF7F2] p-3 space-y-2 group relative overflow-hidden"
                    >
                      <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-200 border border-slate-300">
                        <img
                          src={getAssetUrl(media.url)}
                          alt={media.altText || media.fileName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-900 truncate">{media.fileName}</p>
                        <div className="flex items-center justify-between text-[10px] text-slate-500">
                          <span className="px-1.5 py-0.5 rounded bg-white font-bold">{media.category}</span>
                          <span>{media.fileSize || 'Standard'}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1 border-t border-slate-200/80">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(media.url);
                            showToast('Asset URL copied to clipboard');
                          }}
                          className="text-[11px] text-[#006A4E] font-bold hover:underline cursor-pointer"
                        >
                          Copy URL
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Delete media asset: ${media.fileName}?`)) {
                              deleteMediaItem(media.id);
                              showToast('Media asset removed');
                            }
                          }}
                          className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
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
                      {isBn ? 'হোমপেজ ও ক্যাম্পেইন পেজের ব্যানার পরিচালনা করুন।' : 'Configure hero carousel slides, campaign promotional banners, and CTAs.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const newBan: Omit<BannerItem, 'id'> = {
                        title: { en: 'New Humanitarian Banner', bn: 'নতুন মানবিক ব্যানার' },
                        desktopImageUrl: '/images/infinity-cover-hero.jpg',
                        ctaText: { en: 'Support Us', bn: 'সহায়তা করুন' },
                        ctaUrl: 'donate',
                        placement: 'homepage_hero',
                        displayOrder: banners.length + 1,
                        active: true
                      };
                      addBanner(newBan);
                      showToast('New banner added');
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Banner</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {banners.map((ban, idx) => (
                    <div
                      key={ban.id}
                      className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-xl bg-white text-slate-800 font-mono font-bold text-xs flex items-center justify-center border border-slate-200">
                            #{idx + 1}
                          </span>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{ban.title.en}</h4>
                            <p className="text-xs text-slate-500">{ban.title.bn} &bull; {ban.placement}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => openMediaPicker((url) => {
                              updateBanner(ban.id, { desktopImageUrl: url });
                              showToast('Banner image updated');
                            })}
                            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#006A4E] hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                          >
                            <FolderOpen className="w-3.5 h-3.5" />
                            <span>Change Image</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              updateBanner(ban.id, { active: !ban.active });
                              showToast(`Banner ${ban.active ? 'deactivated' : 'activated'}`);
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                              ban.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {ban.active ? 'Active' : 'Inactive'}
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (confirm('Delete banner?')) {
                                deleteBanner(ban.id);
                                showToast('Banner deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 cursor-pointer"
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

                <div className="space-y-3">
                  {volunteers.map(vol => (
                    <div
                      key={vol.id}
                      className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{vol.fullName}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                            {vol.bloodGroup || 'Blood: N/A'}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">Ref: {vol.id}</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          {vol.district} &bull; {vol.phone} &bull; {vol.email}
                        </p>
                        <p className="text-[11px] text-slate-500 italic">
                          Interests: {vol.interests?.join(', ') || 'General Relief'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <select
                          value={vol.status}
                          onChange={(e) => {
                            updateVolunteerStatus(vol.id, e.target.value as VolunteerApplication['status']);
                            showToast(`Status updated to ${e.target.value}`);
                          }}
                          className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                        >
                          <option value="New">New</option>
                          <option value="Reviewing">Reviewing</option>
                          <option value="Approved">Approved</option>
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
              <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold text-slate-900 font-display">
                      {isBn ? 'কমিটি ও নেতৃত্ব ব্যবস্থাপনা' : 'Committees & Leadership CMS'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {isBn ? 'কার্যনির্বাহী কমিটি ২০২৬, স্থায়ী কমিটি ও উপদেষ্টা মণ্ডলী পরিচালনা করুন।' : 'Manage 27 Executive Leaders, 9 Standing Committee Members, and past historical rosters.'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={selectedCommitteeId}
                      onChange={(e) => setSelectedCommitteeId(e.target.value)}
                      className="px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bold"
                    >
                      {committees.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name.en} ({c.term})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Roster of Members */}
                <div className="space-y-3">
                  {getMembersWithDetails(selectedCommitteeId).map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white text-[#006A4E] font-bold text-xs flex items-center justify-center border border-slate-200">
                          {idx + 1}
                        </span>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                            {item.person.banglaName} ({item.person.englishName})
                          </h4>
                          <p className="text-[11px] text-[#006A4E] font-semibold">
                            {item.position.name.bn} / {item.position.name.en}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm(`Remove ${item.person.englishName} from committee?`)) {
                              deleteCommitteeMember(item.id);
                              showToast('Member removed');
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 cursor-pointer"
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
          </div>
        </div>
      </div>

      {/* Universal Media Picker Modal */}
      <MediaPickerModal
        isOpen={mediaPickerOpen}
        onClose={() => setMediaPickerOpen(false)}
        onSelectMedia={(url) => {
          if (mediaPickerCallback) {
            mediaPickerCallback(url);
          }
          setMediaPickerOpen(false);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
};
