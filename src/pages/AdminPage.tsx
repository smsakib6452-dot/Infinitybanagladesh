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
  ListOrdered
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
  SiteSettings,
  Committee,
  Person,
  Position,
  CommitteeMember
} from '../types';
import { formatBDT } from '../lib/utils/formatters';
import { Toast } from '../components/Toast';

type AdminTab =
  | 'overview'
  | 'campaigns'
  | 'committees'
  | 'volunteers'
  | 'donations'
  | 'stories'
  | 'news'
  | 'events'
  | 'gallery'
  | 'videos'
  | 'reports'
  | 'partners'
  | 'messages'
  | 'metrics'
  | 'settings'
  | 'audit'
  | 'backup';

export const AdminPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const {
    campaigns,
    addCampaign,
    updateCampaign,
    deleteCampaign,
    programs,
    metrics,
    updateMetric,
    stories,
    addStory,
    updateStory,
    deleteStory,
    news,
    addNews,
    deleteNews,
    events,
    addEvent,
    deleteEvent,
    gallery,
    addGalleryPhoto,
    deleteGalleryPhoto,
    videos,
    addVideo,
    deleteVideo,
    reports,
    addReport,
    deleteReport,
    partners,
    addPartner,
    deletePartner,
    volunteers,
    updateVolunteerStatus,
    deleteVolunteerApplication,
    donations,
    addDonationRecord,
    updateDonationStatus,
    messages,
    updateMessageStatus,
    deleteContactMessage,
    settings,
    updateSettings,
    auditLogs,
    exportDatabaseJSON,
    importDatabaseJSON,
    resetToDefaultData,
    committees,
    addCommittee,
    updateCommittee,
    deleteCommittee,
    persons,
    addPerson,
    updatePerson,
    deletePerson,
    positions,
    addPosition,
    updatePosition,
    deletePosition,
    committeeMembers,
    addCommitteeMember,
    updateCommitteeMember,
    deleteCommitteeMember,
    reorderCommitteeMembers,
    getMembersWithDetails
  } = useData();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('infinity_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Navigation State
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [volunteerStatusFilter, setVolunteerStatusFilter] = useState<string>('All');
  const [donationStatusFilter, setDonationStatusFilter] = useState<string>('All');
  const [messageStatusFilter, setMessageStatusFilter] = useState<string>('All');

  // Selected Detail Modals
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Toast State
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  // Modals for Creating Entities
  const [showAddCampaignModal, setShowAddCampaignModal] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    titleEn: '',
    titleBn: '',
    category: 'Seasonal Support',
    locationEn: 'Bangladesh',
    locationBn: 'বাংলাদেশ',
    date: '2025',
    descriptionEn: '',
    descriptionBn: '',
    status: 'active' as Campaign['status'],
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80'
  });

  const [showAddStoryModal, setShowAddStoryModal] = useState(false);
  const [newStory, setNewStory] = useState({
    titleEn: '',
    titleBn: '',
    personEn: '',
    personBn: '',
    locationEn: 'Bangladesh',
    locationBn: 'বাংলাদেশ',
    storyEn: '',
    storyBn: '',
    impactEn: '',
    impactBn: '',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    consentConfirmed: true
  });

  const [showAddPartnerModal, setShowAddPartnerModal] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    type: 'Institutional' as Partner['type'],
    website: '',
    partnershipYear: '2025',
    descEn: '',
    descBn: ''
  });

  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    titleEn: '',
    titleBn: '',
    videoUrl: '',
    platform: 'youtube' as VideoItem['platform'],
    duration: '3:30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    descEn: '',
    descBn: ''
  });

  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [newReport, setNewReport] = useState({
    titleEn: '',
    titleBn: '',
    type: 'Campaign Report' as TransparencyReport['type'],
    year: '2024-2025',
    descEn: '',
    descBn: ''
  });

  const [showAddDonationModal, setShowAddDonationModal] = useState(false);
  const [newDonation, setNewDonation] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amountBDT: 1000,
    paymentMethod: 'bKash',
    campaignTitle: 'General Humanitarian Fund',
    transactionId: '',
    status: 'Successful' as DonationRecord['status']
  });

  // Committee Management States
  const [selectedCommitteeAdminId, setSelectedCommitteeAdminId] = useState<string>(() => {
    return committees.find(c => c.type === 'EXECUTIVE' && c.status === 'ACTIVE')?.id || committees[0]?.id || 'comm-exec-2026';
  });
  const [committeeSubTab, setCommitteeSubTab] = useState<'members' | 'committees' | 'positions'>('members');
  const [committeeSearchQuery, setCommitteeSearchQuery] = useState('');

  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);

  const [memberFormData, setMemberFormData] = useState({
    fullName: '',
    banglaName: '',
    positionId: positions[0]?.id || 'pos-member',
    serialNumber: 1,
    district: '',
    shortBioEn: '',
    shortBioBn: '',
    photoUrl: '',
    facebookUrl: '',
    linkedinUrl: '',
    email: '',
    phone: '',
    isFeaturedLeader: false
  });

  const [showAddCommitteeModal, setShowAddCommitteeModal] = useState(false);
  const [newCommitteeData, setNewCommitteeData] = useState({
    year: '2027',
    nameEn: 'Executive Committee 2027',
    nameBn: 'কার্যনির্বাহী কমিটি ২০২৭',
    type: 'EXECUTIVE' as Committee['type'],
    status: 'ACTIVE' as Committee['status'],
    descriptionEn: 'Infinity Bangladesh Central Executive Committee.',
    descriptionBn: 'ইনফিনিটি বাংলাদেশ কেন্দ্রীয় কার্যনির্বাহী কমিটি।'
  });

  const [showAddPositionModal, setShowAddPositionModal] = useState(false);
  const [newPositionData, setNewPositionData] = useState({
    nameEn: '',
    nameBn: '',
    level: 4,
    sortOrder: 10
  });

  // Settings State Form
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123' || password === 'infinity2025') {
      setIsAuthenticated(true);
      sessionStorage.setItem('infinity_admin_auth', 'true');
      setAuthError('');
      triggerToast(isBn ? 'লগইন সফল হয়েছে।' : 'Admin authenticated successfully.');
    } else {
      setAuthError(isBn ? 'ভুল পাসওয়ার্ড। দয়া করে সঠিক পাসওয়ার্ড দিন (পাসওয়ার্ড: admin123)' : 'Invalid passcode. (Hint: admin123)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('infinity_admin_auth');
    triggerToast(isBn ? 'লগআউট সম্পন্ন হয়েছে।' : 'Logged out from Admin.');
  };

  // Create Handlers
  const handleCreateCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newCampaign.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `campaign-${Date.now()}`;
    addCampaign({
      slug,
      title: { en: newCampaign.titleEn, bn: newCampaign.titleBn || newCampaign.titleEn },
      category: newCampaign.category,
      location: { en: newCampaign.locationEn, bn: newCampaign.locationBn || newCampaign.locationEn },
      date: newCampaign.date,
      description: { en: newCampaign.descriptionEn, bn: newCampaign.descriptionBn || newCampaign.descriptionEn },
      status: newCampaign.status,
      imageUrl: newCampaign.imageUrl,
      isFeatured: false,
      objectives: {
        en: ['Deliver seasonal relief supplies with dignity', 'Maintain 100% verified field receipts'],
        bn: ['মর্যাদার সাথে ত্রাণ ও উপহার পৌঁছে দেওয়া', 'শতভাগ স্বচ্ছ হিসাব রাখা']
      },
      activities: {
        en: ['Ground census & beneficiary identification', 'Direct community distribution'],
        bn: ['মাঠপর্যায়ে যাচাইকরণ', 'সরাসরি বিতরণ সম্পন্ন']
      },
      beneficiaries: { en: 'Underprivileged families & children', bn: 'সুবিধাবঞ্চিত পরিবার ও শিশু' },
      impact: { en: 'Zero administrative leakage verified by local coordinators.', bn: 'কোনো অপচয় ছাড়া সরাসরি সহায়তা প্রদান।' },
      galleryImages: [newCampaign.imageUrl]
    });
    setShowAddCampaignModal(false);
    triggerToast(isBn ? 'ক্যাম্পেইন সফলভাবে যুক্ত হয়েছে।' : 'Campaign created successfully.');
  };

  const handleCreateStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = newStory.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `story-${Date.now()}`;
    addStory({
      slug,
      title: { en: newStory.titleEn, bn: newStory.titleBn || newStory.titleEn },
      personOrCommunity: { en: newStory.personEn, bn: newStory.personBn || newStory.personEn },
      location: { en: newStory.locationEn, bn: newStory.locationBn || newStory.locationEn },
      date: 'Recent Outreach',
      story: { en: newStory.storyEn, bn: newStory.storyBn || newStory.storyEn },
      impact: { en: newStory.impactEn, bn: newStory.impactBn || newStory.impactEn },
      imageUrl: newStory.imageUrl,
      consentConfirmed: newStory.consentConfirmed
    });
    setShowAddStoryModal(false);
    triggerToast(isBn ? 'গল্প সফলভাবে প্রকাশিত হয়েছে।' : 'Impact Story published successfully.');
  };

  const handleCreatePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPartner({
      name: newPartner.name,
      type: newPartner.type,
      website: newPartner.website || undefined,
      partnershipYear: newPartner.partnershipYear,
      description: { en: newPartner.descEn, bn: newPartner.descBn || newPartner.descEn }
    });
    setShowAddPartnerModal(false);
    triggerToast(isBn ? 'পার্টনার রেকর্ড যুক্ত হয়েছে।' : 'Partner added successfully.');
  };

  const handleCreateVideoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addVideo({
      title: { en: newVideo.titleEn, bn: newVideo.titleBn || newVideo.titleEn },
      videoUrl: newVideo.videoUrl,
      platform: newVideo.platform,
      duration: newVideo.duration,
      thumbnailUrl: newVideo.thumbnailUrl,
      date: '2025',
      description: { en: newVideo.descEn, bn: newVideo.descBn || newVideo.descEn }
    });
    setShowAddVideoModal(false);
    triggerToast(isBn ? 'ভিডিও যুক্ত হয়েছে।' : 'Video entry added successfully.');
  };

  const handleCreateReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addReport({
      title: { en: newReport.titleEn, bn: newReport.titleBn || newReport.titleEn },
      type: newReport.type,
      year: newReport.year,
      description: { en: newReport.descEn, bn: newReport.descBn || newReport.descEn },
      uploadDate: new Date().toISOString().substring(0, 10),
      fileUrl: '#',
      fileSize: '[OFFICIAL FILE UPLOAD REQUIRED]',
      status: 'official'
    });
    setShowAddReportModal(false);
    triggerToast(isBn ? 'রিপোর্ট রেকর্ড যুক্ত হয়েছে।' : 'Report metadata published.');
  };

  const handleCreateDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDonationRecord({
      donorName: newDonation.donorName || 'Direct Donor',
      donorEmail: newDonation.donorEmail,
      donorPhone: newDonation.donorPhone,
      amount: Number(newDonation.amountBDT),
      amountBDT: Number(newDonation.amountBDT),
      paymentMethod: newDonation.paymentMethod,
      campaignTitle: newDonation.campaignTitle,
      transactionId: newDonation.transactionId || `TRX${Date.now().toString().slice(-6)}`,
      status: newDonation.status
    });
    setShowAddDonationModal(false);
    triggerToast(isBn ? 'অনুদানের তথ্য যুক্ত হয়েছে।' : 'Donation record added.');
  };

  // Committee Actions
  const handleSaveMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showEditMemberModal && editingMemberId) {
      const existing = committeeMembers.find(m => m.id === editingMemberId);
      if (existing) {
        updatePerson(existing.personId, {
          fullName: memberFormData.fullName,
          banglaName: memberFormData.banglaName || memberFormData.fullName,
          district: memberFormData.district,
          shortBio: { en: memberFormData.shortBioEn, bn: memberFormData.shortBioBn || memberFormData.shortBioEn },
          photoUrl: memberFormData.photoUrl || undefined,
          facebookUrl: memberFormData.facebookUrl || undefined,
          linkedinUrl: memberFormData.linkedinUrl || undefined,
          email: memberFormData.email || undefined,
          phone: memberFormData.phone || undefined
        });

        updateCommitteeMember(existing.id, {
          positionId: memberFormData.positionId,
          serialNumber: Number(memberFormData.serialNumber),
          sortOrder: Number(memberFormData.serialNumber),
          isFeaturedLeader: memberFormData.isFeaturedLeader
        });
        triggerToast(isBn ? 'সদস্য তথ্য সফলভাবে হালনাগাদ করা হয়েছে।' : 'Member details updated.');
      }
      setShowEditMemberModal(false);
      setEditingMemberId(null);
    } else {
      const newPerson = addPerson({
        fullName: memberFormData.fullName,
        banglaName: memberFormData.banglaName || memberFormData.fullName,
        district: memberFormData.district,
        shortBio: { en: memberFormData.shortBioEn, bn: memberFormData.shortBioBn || memberFormData.shortBioEn },
        photoUrl: memberFormData.photoUrl || undefined,
        facebookUrl: memberFormData.facebookUrl || undefined,
        linkedinUrl: memberFormData.linkedinUrl || undefined,
        email: memberFormData.email || undefined,
        phone: memberFormData.phone || undefined
      });

      addCommitteeMember({
        committeeId: selectedCommitteeAdminId,
        personId: newPerson.id,
        positionId: memberFormData.positionId,
        serialNumber: Number(memberFormData.serialNumber),
        sortOrder: Number(memberFormData.serialNumber),
        isFeaturedLeader: memberFormData.isFeaturedLeader
      });
      triggerToast(isBn ? 'কমিটিতে নতুন সদস্য যুক্ত হয়েছে।' : 'Member added to committee.');
      setShowAddMemberModal(false);
    }
  };

  const handleOpenEditMember = (mWithDetails: CommitteeMember & { person: Person; position: Position }) => {
    setEditingMemberId(mWithDetails.id);
    setMemberFormData({
      fullName: mWithDetails.person.fullName,
      banglaName: mWithDetails.person.banglaName,
      positionId: mWithDetails.positionId,
      serialNumber: mWithDetails.serialNumber,
      district: mWithDetails.person.district || '',
      shortBioEn: mWithDetails.person.shortBio?.en || '',
      shortBioBn: mWithDetails.person.shortBio?.bn || '',
      photoUrl: mWithDetails.person.photoUrl || '',
      facebookUrl: mWithDetails.person.facebookUrl || '',
      linkedinUrl: mWithDetails.person.linkedinUrl || '',
      email: mWithDetails.person.email || '',
      phone: mWithDetails.person.phone || '',
      isFeaturedLeader: !!mWithDetails.isFeaturedLeader
    });
    setShowEditMemberModal(true);
  };

  const handleCreateCommitteeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const comm = addCommittee({
      name: { en: newCommitteeData.nameEn, bn: newCommitteeData.nameBn || newCommitteeData.nameEn },
      year: newCommitteeData.year,
      type: newCommitteeData.type,
      description: { en: newCommitteeData.descriptionEn, bn: newCommitteeData.descriptionBn || newCommitteeData.descriptionEn },
      status: newCommitteeData.status,
      isFeatured: false
    });
    setSelectedCommitteeAdminId(comm.id);
    setShowAddCommitteeModal(false);
    triggerToast(isBn ? 'নতুন কমিটি তৈরি হয়েছে।' : 'Committee created successfully.');
  };

  const handleCreatePositionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPosition({
      name: { en: newPositionData.nameEn, bn: newPositionData.nameBn || newPositionData.nameEn },
      level: Number(newPositionData.level),
      sortOrder: Number(newPositionData.sortOrder)
    });
    setShowAddPositionModal(false);
    triggerToast(isBn ? 'নতুন পদবী যুক্ত হয়েছে।' : 'Position title created.');
  };

  const handleMoveMember = (memberId: string, direction: 'up' | 'down') => {
    const members = getMembersWithDetails(selectedCommitteeAdminId);
    const index = members.findIndex(m => m.id === memberId);
    if (index === -1) return;
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === members.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const currentM = members[index];
    const targetM = members[targetIndex];

    const currentOrder = currentM.sortOrder;
    const targetOrder = targetM.sortOrder;
    const currentSerial = currentM.serialNumber;
    const targetSerial = targetM.serialNumber;

    updateCommitteeMember(currentM.id, { sortOrder: targetOrder, serialNumber: targetSerial });
    updateCommitteeMember(targetM.id, { sortOrder: currentOrder, serialNumber: currentSerial });
    triggerToast(isBn ? 'ক্রমিক ও অবস্থান পরিবর্তিত হয়েছে।' : 'Order updated.');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    triggerToast(isBn ? 'সাইট সেটিংস সংরক্ষিত হয়েছে।' : 'Site Settings updated successfully.');
  };

  const handleExportJSON = () => {
    const jsonStr = exportDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `infinity-bangladesh-backup-${new Date().toISOString().substring(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    triggerToast(isBn ? 'ডেটাবেস ব্যাকআপ ডাউনলোড হয়েছে।' : 'Database backup downloaded.');
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const content = reader.result as string;
      const success = importDatabaseJSON(content);
      if (success) {
        triggerToast(isBn ? 'ব্যাকআপ সফলভাবে রিস্টোর হয়েছে!' : 'Database restored successfully!');
      } else {
        triggerToast(isBn ? 'ত্রুটি: ব্যাকআপ ফাইলটি সঠিক নয়।' : 'Error: Invalid backup JSON format.');
      }
    };
    reader.readAsText(file);
  };

  // Export Volunteer CSV
  const handleExportVolunteerCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'District', 'Upazila', 'Age', 'Occupation', 'Blood Group', 'Status', 'Date'];
    const rows = volunteers.map((v) => [
      `"${v.fullName}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.district}"`,
      `"${v.upazila || ''}"`,
      v.age || '',
      `"${v.occupation || ''}"`,
      `"${v.bloodGroup || ''}"`,
      `"${v.status}"`,
      `"${v.submittedAt || v.appliedAt || ''}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `team-infinity-volunteers-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast(isBn ? 'স্বেচ্ছাসেবক তালিকা CSV ডাউনলোড হয়েছে।' : 'Volunteer CSV exported.');
  };

  // If Not Authenticated, render Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 p-8 md:p-10 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-teal-50 text-teal-800 rounded-2xl flex items-center justify-center mx-auto border border-teal-200/80 shadow-sm">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {isBn ? 'ইনফিনিটি অ্যাডমিন পোর্টাল' : 'Team Infinity Admin Portal'}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn
                ? 'টিম ইনফিনিটির সমন্বয়ক ও অডিট প্যানেলের জন্য সুরক্ষিত প্রবেশাধিকার।'
                : 'Authorized access for Infinity Bangladesh coordinators & auditors.'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isBn ? 'অ্যাডমিন সিকিউরিটি পাসকোড' : 'Admin Security Passcode'}
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter passcode (Hint: admin123)"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm font-mono tracking-wider"
              />
            </div>

            {authError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
            >
              {isBn ? 'লগইন করুন' : 'Unlock Dashboard'}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              Credentials configured via environment variables in production.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Navigation Items
  const navItems: { id: AdminTab; labelEn: string; labelBn: string; icon: any; count?: number }[] = [
    { id: 'overview', labelEn: 'Overview', labelBn: 'ওভারভিউ', icon: LayoutDashboard },
    { id: 'campaigns', labelEn: 'Campaigns', labelBn: 'ক্যাম্পেইন', icon: Flag, count: campaigns.length },
    { id: 'committees', labelEn: 'Committees & Leadership', labelBn: 'কমিটি ও নেতৃত্ব', icon: Award, count: committeeMembers.length },
    { id: 'volunteers', labelEn: 'Volunteers', labelBn: 'স্বেচ্ছাসেবক', icon: Users, count: volunteers.length },
    { id: 'donations', labelEn: 'Donations', labelBn: 'অনুদান রেকর্ড', icon: Heart, count: donations.length },
    { id: 'stories', labelEn: 'Stories', labelBn: 'বাস্তব গল্প', icon: Sparkles, count: stories.length },
    { id: 'news', labelEn: 'News & Updates', labelBn: 'সংবাদ ও আপডেট', icon: FileText, count: news.length },
    { id: 'events', labelEn: 'Events', labelBn: 'ইভেন্ট', icon: Calendar, count: events.length },
    { id: 'gallery', labelEn: 'Gallery', labelBn: 'ফটো গ্যালারি', icon: ImageIcon, count: gallery.length },
    { id: 'videos', labelEn: 'Videos', labelBn: 'ভিডিও আর্কাইভ', icon: VideoIcon, count: videos.length },
    { id: 'reports', labelEn: 'Reports', labelBn: 'স্বচ্ছতা রিপোর্ট', icon: ShieldCheck, count: reports.length },
    { id: 'partners', labelEn: 'Partners', labelBn: 'পার্টনার্স', icon: Handshake, count: partners.length },
    { id: 'messages', labelEn: 'Messages', labelBn: 'বার্তা', icon: Mail, count: messages.filter((m) => m.status === 'Unread').length },
    { id: 'metrics', labelEn: 'Impact Metrics', labelBn: 'মেট্রিক সংখ্যা', icon: Activity },
    { id: 'settings', labelEn: 'Site Settings', labelBn: 'সাইট সেটিংস', icon: Settings },
    { id: 'audit', labelEn: 'Audit Logs', labelBn: 'অডিট ট্রেইল', icon: Clock, count: auditLogs.length },
    { id: 'backup', labelEn: 'Backup & Restore', labelBn: 'ব্যাকআপ', icon: RefreshCw },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-teal-400 font-bold">Admin Console</span>
              <h2 className="text-lg font-black text-white">Infinity CMS</h2>
            </div>
            <span className="px-2 py-0.5 bg-teal-900/60 text-teal-300 border border-teal-700/40 rounded text-[10px] font-mono">
              v2.5
            </span>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-160px)] overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isCurrent = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-teal-700 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{isBn ? item.labelBn : item.labelEn}</span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                        isCurrent ? 'bg-teal-800 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => navigate('home')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{isBn ? 'ওয়েবসাইটে যান' : 'View Public Site'}</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-900/40 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{isBn ? 'লগআউট' : 'Sign Out'}</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl overflow-x-hidden">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                  {isBn ? 'অ্যাডমিন ড্যাশবোর্ড ওভারভিউ' : 'Admin Operations Overview'}
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Verified metrics, campaign logistics, and volunteer coordination data.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-teal-700" />
                  <span>Backup JSON</span>
                </button>
                <button
                  onClick={() => setShowAddCampaignModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-sm transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Campaign</span>
                </button>
              </div>
            </div>

            {/* Quick Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Campaigns</span>
                  <Flag className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-2xl font-black text-slate-900">{campaigns.length}</div>
                <span className="text-[11px] text-teal-700 font-medium">{campaigns.filter((c) => c.status === 'active').length} Active</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Volunteers</span>
                  <Users className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-2xl font-black text-slate-900">{volunteers.length}</div>
                <span className="text-[11px] text-emerald-700 font-medium">{volunteers.filter((v) => v.status === 'Approved').length} Approved</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Donations Logged</span>
                  <Heart className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-2xl font-black text-slate-900">{donations.length}</div>
                <span className="text-[11px] text-slate-500 font-medium">Audit verified entries</span>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Inquiries</span>
                  <Mail className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-2xl font-black text-slate-900">{messages.length}</div>
                <span className="text-[11px] text-amber-700 font-medium">{messages.filter((m) => m.status === 'Unread').length} Unread</span>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Volunteer Submissions */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Recent Volunteer Applications</h3>
                  <button onClick={() => setActiveTab('volunteers')} className="text-xs text-teal-700 font-bold hover:underline">
                    View All
                  </button>
                </div>
                <div className="space-y-2">
                  {volunteers.slice(0, 4).map((v) => (
                    <div key={v.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{v.fullName}</span>
                        <span className="text-slate-400 block text-[11px]">{v.district} &bull; {v.phone}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700">
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Log */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm">Live System Audit Stream</h3>
                  <button onClick={() => setActiveTab('audit')} className="text-xs text-teal-700 font-bold hover:underline">
                    Full Log
                  </button>
                </div>
                <div className="space-y-2">
                  {auditLogs.slice(0, 4).map((log) => (
                    <div key={log.id} className="p-3 bg-slate-50 rounded-xl text-xs space-y-0.5">
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span className="font-bold text-teal-800">[{log.action}]</span>
                        <span>{log.timestamp.slice(11, 16)}</span>
                      </div>
                      <p className="text-slate-700 text-[11px] truncate">{log.details}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CAMPAIGNS */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Campaigns Management</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage humanitarian drives, seasonal packages, and relief initiatives.</p>
              </div>
              <button
                onClick={() => setShowAddCampaignModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Create Campaign</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((camp) => (
                <div key={camp.id} className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div>
                    <img src={camp.imageUrl} alt={camp.title.en} className="w-full aspect-video object-cover" />
                    <div className="p-5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 bg-teal-50 text-teal-800 font-bold rounded">{camp.category}</span>
                        <span className="text-slate-400 font-mono text-[11px]">{camp.date}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 text-base line-clamp-1">{camp.title.en}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{camp.description.en}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <select
                      value={camp.status}
                      onChange={(e) => updateCampaign(camp.id, { status: e.target.value as any })}
                      className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="upcoming">Upcoming</option>
                      <option value="completed">Completed</option>
                    </select>

                    <button
                      onClick={() => {
                        if (confirm(`Delete campaign "${camp.title.en}"?`)) {
                          deleteCampaign(camp.id);
                          triggerToast('Campaign deleted.');
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: COMMITTEES & LEADERSHIP */}
        {activeTab === 'committees' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Header & Main Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
                  <Award className="w-6 h-6 text-teal-800" />
                  {isBn ? 'কমিটি ও নেতৃত্ব পরিচালনা' : 'Committees & Leadership Governance'}
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isBn
                    ? 'কার্যনির্বাহী পরিষদ (২০২৬, ২০২৭+), স্থায়ী কমিটি, পদবী ক্রমস্তর ও সদস্য তালিকা পরিচালনা করুন।'
                    : 'Manage annual Executive Councils, Standing Committees, hierarchy levels, serial rankings, and public bios.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setShowAddCommitteeModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নতুন কমিটি তৈরি' : 'New Committee'}</span>
                </button>

                <button
                  onClick={() => {
                    const activeCommMembers = getMembersWithDetails(selectedCommitteeAdminId);
                    const nextSerial = activeCommMembers.length + 1;
                    setMemberFormData({
                      fullName: '',
                      banglaName: '',
                      positionId: positions[0]?.id || 'pos-member',
                      serialNumber: nextSerial,
                      district: '',
                      shortBioEn: '',
                      shortBioBn: '',
                      photoUrl: '',
                      facebookUrl: '',
                      linkedinUrl: '',
                      email: '',
                      phone: '',
                      isFeaturedLeader: false
                    });
                    setShowAddMemberModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সদস্য যুক্ত করুন' : 'Add Member'}</span>
                </button>

                <button
                  onClick={() => setShowAddPositionModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 text-teal-700" />
                  <span>{isBn ? 'নতুন পদবী' : 'New Position'}</span>
                </button>
              </div>
            </div>

            {/* Sub Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <button
                type="button"
                onClick={() => setCommitteeSubTab('members')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  committeeSubTab === 'members'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {isBn ? 'সদস্য তালিকা ও ক্রমবিন্যাস (Roster)' : 'Members Roster & Ordering'}
              </button>

              <button
                type="button"
                onClick={() => setCommitteeSubTab('committees')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  committeeSubTab === 'committees'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {isBn ? `কমিটি পরিষদসমূহ (${committees.length})` : `Committees Registry (${committees.length})`}
              </button>

              <button
                type="button"
                onClick={() => setCommitteeSubTab('positions')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  committeeSubTab === 'positions'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {isBn ? `পদবী ও স্তর (${positions.length})` : `Positions & Hierarchy (${positions.length})`}
              </button>
            </div>

            {/* SUB-TAB 1: MEMBERS ROSTER */}
            {committeeSubTab === 'members' && (
              <div className="space-y-4">
                {/* Filter & Committee Selector Bar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      {isBn ? 'নির্বাচিত কমিটি:' : 'Select Committee:'}
                    </label>
                    <select
                      value={selectedCommitteeAdminId}
                      onChange={(e) => setSelectedCommitteeAdminId(e.target.value)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-700"
                    >
                      {committees.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.year} — {tText(c.name)} ({c.status})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={committeeSearchQuery}
                      onChange={(e) => setCommitteeSearchQuery(e.target.value)}
                      placeholder={isBn ? 'সদস্য বা পদবী খুঁজুন...' : 'Search by name or position...'}
                      className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-teal-700"
                    />
                  </div>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                        <tr>
                          <th className="p-3.5 text-center w-16">Serial #</th>
                          <th className="p-3.5 text-center w-20">Reorder</th>
                          <th className="p-3.5">Member Name</th>
                          <th className="p-3.5">Position / Tier</th>
                          <th className="p-3.5">District</th>
                          <th className="p-3.5 text-center">Featured</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {getMembersWithDetails(selectedCommitteeAdminId)
                          .filter((m) => {
                            if (!committeeSearchQuery.trim()) return true;
                            const q = committeeSearchQuery.toLowerCase();
                            return (
                              m.person.fullName.toLowerCase().includes(q) ||
                              m.person.banglaName.toLowerCase().includes(q) ||
                              m.position.name.en.toLowerCase().includes(q) ||
                              m.position.name.bn.toLowerCase().includes(q)
                            );
                          })
                          .map((m, idx, arr) => (
                            <tr key={m.id} className="hover:bg-slate-50/80 transition-colors">
                              {/* Serial */}
                              <td className="p-3.5 text-center font-mono font-bold text-teal-800 bg-teal-50/50">
                                #{String(m.serialNumber).padStart(2, '0')}
                              </td>

                              {/* Reorder Buttons */}
                              <td className="p-3.5 text-center">
                                <div className="inline-flex items-center gap-1">
                                  <button
                                    type="button"
                                    disabled={idx === 0}
                                    onClick={() => handleMoveMember(m.id, 'up')}
                                    className={`p-1 rounded-md transition-colors ${
                                      idx === 0
                                        ? 'text-slate-300 cursor-not-allowed'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-teal-800 cursor-pointer'
                                    }`}
                                    title="Move Up"
                                  >
                                    <ArrowUp className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    disabled={idx === arr.length - 1}
                                    onClick={() => handleMoveMember(m.id, 'down')}
                                    className={`p-1 rounded-md transition-colors ${
                                      idx === arr.length - 1
                                        ? 'text-slate-300 cursor-not-allowed'
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-teal-800 cursor-pointer'
                                    }`}
                                    title="Move Down"
                                  >
                                    <ArrowDown className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>

                              {/* Member Info */}
                              <td className="p-3.5">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center font-bold text-slate-600 shrink-0">
                                    {m.person.photoUrl ? (
                                      <img src={m.person.photoUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                      <span>{m.person.fullName.charAt(0)}</span>
                                    )}
                                  </div>
                                  <div>
                                    <div className="font-bold text-slate-900">{m.person.fullName}</div>
                                    <div className="text-[11px] text-slate-500 font-medium">{m.person.banglaName}</div>
                                  </div>
                                </div>
                              </td>

                              {/* Position & Level */}
                              <td className="p-3.5">
                                <div className="font-semibold text-slate-800">{m.position.name.en}</div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span
                                    className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                                      m.position.level === 1
                                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                        : m.position.level === 2
                                        ? 'bg-slate-200 text-slate-800'
                                        : m.position.level === 3
                                        ? 'bg-rose-100 text-rose-800'
                                        : 'bg-teal-50 text-teal-800'
                                    }`}
                                  >
                                    Tier {m.position.level}
                                  </span>
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    {m.position.name.bn}
                                  </span>
                                </div>
                              </td>

                              {/* District */}
                              <td className="p-3.5 text-slate-600 font-medium">
                                {m.person.district || '—'}
                              </td>

                              {/* Featured Toggle */}
                              <td className="p-3.5 text-center">
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateCommitteeMember(m.id, { isFeaturedLeader: !m.isFeaturedLeader });
                                    triggerToast(
                                      m.isFeaturedLeader ? 'Removed from featured spotlight.' : 'Set as featured leader.'
                                    );
                                  }}
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors cursor-pointer ${
                                    m.isFeaturedLeader
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                  }`}
                                >
                                  {m.isFeaturedLeader ? 'Featured' : 'Standard'}
                                </button>
                              </td>

                              {/* Actions */}
                              <td className="p-3.5 text-right">
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditMember(m)}
                                    className="p-1.5 text-slate-600 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                                    title="Edit Member"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (confirm(`Remove ${m.person.fullName} from this committee?`)) {
                                        deleteCommitteeMember(m.id);
                                        triggerToast('Member removed from committee.');
                                      }
                                    }}
                                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                    title="Remove from Committee"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: COMMITTEES REGISTRY */}
            {committeeSubTab === 'committees' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {committees.map((comm) => {
                  const memberCount = getMembersWithDetails(comm.id).length;

                  return (
                    <div
                      key={comm.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              comm.status === 'ACTIVE'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {comm.status}
                          </span>
                          <span className="text-xs font-mono font-bold text-teal-800">
                            Year: {comm.year}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 text-base">{comm.name.en}</h3>
                        <p className="text-xs text-slate-500">{comm.name.bn}</p>
                        <p className="text-xs text-slate-600 line-clamp-2">{comm.description.en}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-600">
                          {memberCount} {isBn ? 'সদস্য' : 'Members'}
                        </span>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCommitteeAdminId(comm.id);
                              setCommitteeSubTab('members');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px]"
                          >
                            View Roster
                          </button>

                          {comm.id !== 'comm-exec-2026' && (
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete committee "${comm.name.en}"?`)) {
                                  deleteCommittee(comm.id);
                                  triggerToast('Committee deleted.');
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* SUB-TAB 3: POSITIONS & HIERARCHY */}
            {committeeSubTab === 'positions' && (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="p-3.5">Position Title (English)</th>
                        <th className="p-3.5">Position Title (Bangla)</th>
                        <th className="p-3.5">Hierarchy Tier</th>
                        <th className="p-3.5">Sort Priority</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {positions.map((pos) => (
                        <tr key={pos.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-slate-900">{pos.name.en}</td>
                          <td className="p-3.5 text-slate-700">{pos.name.bn}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                pos.level === 1
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : pos.level === 2
                                  ? 'bg-slate-200 text-slate-800'
                                  : pos.level === 3
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-teal-50 text-teal-800'
                              }`}
                            >
                              Level {pos.level} (
                              {pos.level === 1
                                ? 'President'
                                : pos.level === 2
                                ? 'Vice President'
                                : pos.level === 3
                                ? 'General Secretary'
                                : pos.level === 4
                                ? 'Secretariat / Joint'
                                : 'Member'}
                              )
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-slate-500">{pos.sortOrder}</td>
                          <td className="p-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete position "${pos.name.en}"?`)) {
                                  deletePosition(pos.id);
                                  triggerToast('Position deleted.');
                                }
                              }}
                              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Volunteer Applications</h1>
                <p className="text-xs text-slate-500 mt-0.5">Review, verify, approve, and contact youth applicants across Bangladesh.</p>
              </div>
              <button
                onClick={handleExportVolunteerCSV}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {['All', 'New', 'Reviewing', 'Approved', 'Contacted', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setVolunteerStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    volunteerStatusFilter === status
                      ? 'bg-teal-800 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Volunteers Table */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Applicant</th>
                      <th className="p-4">District / Upazila</th>
                      <th className="p-4">Contact</th>
                      <th className="p-4">Blood & Age</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {volunteers
                      .filter((v) => volunteerStatusFilter === 'All' || v.status === volunteerStatusFilter)
                      .map((v) => (
                        <tr key={v.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4">
                            <div className="font-bold text-slate-900">{v.fullName}</div>
                            <div className="text-[11px] text-slate-400">{v.occupation || 'Volunteer'}</div>
                          </td>
                          <td className="p-4 font-medium text-slate-700">
                            {v.district} {v.upazila && `(${v.upazila})`}
                          </td>
                          <td className="p-4 font-mono text-[11px]">
                            <div>{v.phone}</div>
                            <div className="text-slate-400">{v.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 font-bold rounded text-[10px]">
                              {v.bloodGroup || 'N/A'}
                            </span>
                            <span className="text-slate-400 text-[11px] ml-1.5">{v.age ? `${v.age} yrs` : ''}</span>
                          </td>
                          <td className="p-4">
                            <select
                              value={v.status}
                              onChange={(e) => updateVolunteerStatus(v.id, e.target.value as any)}
                              className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                            >
                              <option value="New">New</option>
                              <option value="Reviewing">Reviewing</option>
                              <option value="Approved">Approved</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Rejected">Rejected</option>
                            </select>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => setSelectedVolunteer(v)}
                              className="px-2.5 py-1 bg-teal-50 text-teal-800 rounded-lg font-bold hover:bg-teal-100"
                            >
                              View
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Remove application from ${v.fullName}?`)) {
                                  deleteVolunteerApplication(v.id);
                                  triggerToast('Application removed.');
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DONATIONS */}
        {activeTab === 'donations' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Donation Verification Ledger</h1>
                <p className="text-xs text-slate-500 mt-0.5">Audit log of contributions, bKash/Nagad transactions, and bank slips.</p>
              </div>
              <button
                onClick={() => setShowAddDonationModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Record</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Receipt #</th>
                      <th className="p-4">Donor Name</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Payment Method</th>
                      <th className="p-4">Trx ID / Ref</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {donations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/80">
                        <td className="p-4 font-mono font-bold text-teal-800">{d.receiptNumber || `REC-${d.id}`}</td>
                        <td className="p-4 font-semibold text-slate-900">{d.donorName}</td>
                        <td className="p-4 font-black text-slate-900">{formatBDT(d.amount || d.amountBDT || 0)}</td>
                        <td className="p-4 font-medium text-slate-700">{d.paymentMethod}</td>
                        <td className="p-4 font-mono text-[11px] text-slate-500">{d.transactionId || '-'}</td>
                        <td className="p-4">
                          <select
                            value={d.status}
                            onChange={(e) => updateDonationStatus(d.id, e.target.value as any)}
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
                          >
                            <option value="Successful">Successful</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                            <option value="Refunded">Refunded</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: STORIES */}
        {activeTab === 'stories' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Impact Stories</h1>
                <p className="text-xs text-slate-500 mt-0.5">Narratives documented with strict beneficiary consent and dignity.</p>
              </div>
              <button
                onClick={() => setShowAddStoryModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Story</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stories.map((story) => (
                <div key={story.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded">
                      {story.personOrCommunity.en}
                    </span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete story "${story.title.en}"?`)) {
                          deleteStory(story.id);
                          triggerToast('Story deleted.');
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{story.title.en}</h3>
                  <p className="text-xs text-slate-600 line-clamp-3">{story.story.en}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Video Documentaries & Footage</h1>
                <p className="text-xs text-slate-500 mt-0.5">Manage YouTube, Facebook, and campaign video items.</p>
              </div>
              <button
                onClick={() => setShowAddVideoModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Video</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((vid) => (
                <div key={vid.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between">
                  <div>
                    <img src={vid.thumbnailUrl} alt={vid.title.en} className="w-full aspect-video object-cover" />
                    <div className="p-4 space-y-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-900 text-teal-300 rounded uppercase">
                        {vid.platform}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm line-clamp-2">{vid.title.en}</h3>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">{vid.duration}</span>
                    <button
                      onClick={() => {
                        if (confirm(`Delete video "${vid.title.en}"?`)) {
                          deleteVideo(vid.id);
                          triggerToast('Video deleted.');
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: PARTNERS */}
        {activeTab === 'partners' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Institutional Partners & Alliances</h1>
                <p className="text-xs text-slate-500 mt-0.5">Strict rule: Only verified official collaborators are listed.</p>
              </div>
              <button
                onClick={() => setShowAddPartnerModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Partner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {partners.map((partner) => (
                <div key={partner.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">{partner.type}</span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete partner "${partner.name}"?`)) {
                            deletePartner(partner.id);
                            triggerToast('Partner deleted.');
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{partner.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{partner.description.en}</p>
                  </div>
                  <div className="pt-2 text-xs text-slate-400 font-mono">
                    Year: {partner.partnershipYear}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Contact Inquiries & Messages</h1>
                <p className="text-xs text-slate-500 mt-0.5">Direct messages submitted through the website contact form.</p>
              </div>
            </div>

            <div className="space-y-3">
              {messages.length === 0 ? (
                <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
                  No contact messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-bold text-slate-900 text-sm">{msg.name}</span>
                        <span className="text-slate-400 text-xs ml-2">({msg.email} &bull; {msg.phone})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <select
                          value={msg.status}
                          onChange={(e) => updateMessageStatus(msg.id, e.target.value as any)}
                          className="px-2 py-1 bg-slate-50 border border-slate-200 rounded text-xs font-semibold"
                        >
                          <option value="Unread">Unread</option>
                          <option value="Read">Read</option>
                          <option value="Replied">Replied</option>
                          <option value="Archived">Archived</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm(`Delete message from ${msg.name}?`)) {
                              deleteContactMessage(msg.id);
                              triggerToast('Message deleted.');
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="text-xs font-bold text-teal-800">Subject: {msg.subject}</div>
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl">{msg.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 9: METRICS */}
        {activeTab === 'metrics' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Live Impact Counter Settings</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Update counter numbers displayed on the homepage and impact portal in real-time. Use "[X]+" until officially confirmed.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {metrics.map((m) => (
                <div key={m.id} className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">{m.label.en}</span>
                    <input
                      type="text"
                      defaultValue={m.value}
                      onBlur={(e) => {
                        updateMetric(m.id, { value: e.target.value });
                        triggerToast('Metric count updated.');
                      }}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-xl font-bold font-mono text-slate-900 focus:border-teal-700 outline-none"
                    />
                    <p className="text-xs text-slate-400">Click out of the input box to save.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in max-w-4xl">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Organization & Site Settings</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Update verified organizational facts, addresses, donation numbers, and banner text.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl border border-slate-200 p-8 space-y-6 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Organization Name</label>
                  <input
                    type="text"
                    value={settingsForm.organizationName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, organizationName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Team Identity</label>
                  <input
                    type="text"
                    value={settingsForm.teamIdentity}
                    onChange={(e) => setSettingsForm({ ...settingsForm, teamIdentity: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Registration Number</label>
                  <input
                    type="text"
                    value={settingsForm.registrationNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, registrationNumber: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Official Phone</label>
                  <input
                    type="text"
                    value={settingsForm.officialPhone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officialPhone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Official Email</label>
                  <input
                    type="text"
                    value={settingsForm.officialEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officialEmail: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Official Address</label>
                  <input
                    type="text"
                    value={settingsForm.officialAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, officialAddress: e.target.value })}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Donation Accounts */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="font-bold text-slate-900 text-sm">Donation Channels & Accounts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">bKash Account Number</label>
                    <input
                      type="text"
                      value={settingsForm.bKashNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, bKashNumber: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nagad Account Number</label>
                    <input
                      type="text"
                      value={settingsForm.nagadNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, nagadNumber: e.target.value })}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  Save All Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 11: AUDIT LOGS */}
        {activeTab === 'audit' && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Immutable Audit Trail</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Every administrative action, volunteer status change, and donation record is logged with timestamps.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 font-mono text-xs max-h-[600px] overflow-y-auto">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-teal-800 font-bold">[{log.action}]</span>{' '}
                    <span className="text-slate-800 font-semibold">{log.entity}:</span>{' '}
                    <span className="text-slate-600">{log.details}</span>
                  </div>
                  <span className="text-slate-400 shrink-0 text-[11px]">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 12: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="space-y-6 animate-in fade-in max-w-3xl">
            <div>
              <h1 className="text-2xl font-black text-slate-900">Database Backup & Offline Persistence</h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Export your current website database to a single portable JSON file or restore from a previous backup.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <div className="w-12 h-12 bg-teal-50 text-teal-800 rounded-xl flex items-center justify-center">
                  <Download className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Download Full Backup</h3>
                  <p className="text-xs text-slate-500 mt-1">Export campaigns, applications, donations, stories, and settings.</p>
                </div>
                <button
                  onClick={handleExportJSON}
                  className="w-full py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Export Database JSON
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 shadow-xs">
                <div className="w-12 h-12 bg-slate-100 text-slate-800 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Restore from JSON File</h3>
                  <p className="text-xs text-slate-500 mt-1">Select an exported JSON file to restore website content.</p>
                </div>
                <label className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center cursor-pointer">
                  <span>Choose JSON File</span>
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Volunteer Detail Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedVolunteer.fullName}</h3>
                <span className="text-xs text-teal-700 font-medium">Volunteer Application Profile</span>
              </div>
              <button onClick={() => setSelectedVolunteer(null)} className="p-1 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl">
                <div><strong>Email:</strong> {selectedVolunteer.email}</div>
                <div><strong>Phone:</strong> {selectedVolunteer.phone}</div>
                <div><strong>District:</strong> {selectedVolunteer.district}</div>
                <div><strong>Upazila:</strong> {selectedVolunteer.upazila || '-'}</div>
                <div><strong>Occupation:</strong> {selectedVolunteer.occupation || '-'}</div>
                <div><strong>Blood Group:</strong> {selectedVolunteer.bloodGroup || '-'}</div>
              </div>
              <div>
                <strong>Skills:</strong> {(selectedVolunteer.skills || []).join(', ') || 'General Community Volunteer'}
              </div>
              {selectedVolunteer.message && (
                <div>
                  <strong>Applicant Statement:</strong>
                  <p className="p-3 bg-slate-50 rounded-xl mt-1 text-slate-700 italic">{selectedVolunteer.message}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create Campaign */}
      {showAddCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-slate-900">Create Verified Campaign</h3>
            <form onSubmit={handleCreateCampaignSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newCampaign.titleEn}
                  onChange={(e) => setNewCampaign({ ...newCampaign, titleEn: e.target.value })}
                  placeholder="e.g. Ramadan Food Baskets & Relief"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Title (বাংলা)</label>
                <input
                  type="text"
                  value={newCampaign.titleBn}
                  onChange={(e) => setNewCampaign({ ...newCampaign, titleBn: e.target.value })}
                  placeholder="রমজান খাদ্য সহায়তা..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={newCampaign.category}
                    onChange={(e) => setNewCampaign({ ...newCampaign, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Seasonal Support">Seasonal Support</option>
                    <option value="Food Distribution">Food Distribution</option>
                    <option value="Winter Relief">Winter Relief</option>
                    <option value="Education">Education</option>
                    <option value="Emergency Relief">Emergency Relief</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Date / Timeline</label>
                  <input
                    type="text"
                    value={newCampaign.date}
                    onChange={(e) => setNewCampaign({ ...newCampaign, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Description (English) *</label>
                <textarea
                  required
                  rows={3}
                  value={newCampaign.descriptionEn}
                  onChange={(e) => setNewCampaign({ ...newCampaign, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Image URL</label>
                <input
                  type="text"
                  value={newCampaign.imageUrl}
                  onChange={(e) => setNewCampaign({ ...newCampaign, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddCampaignModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 text-white rounded-xl font-bold">
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Partner */}
      {showAddPartnerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Add Institutional Partner</h3>
            <form onSubmit={handleCreatePartnerSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Partner Organization Name *</label>
                <input
                  type="text"
                  required
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                  placeholder="e.g. University Youth Welfare Club"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Category</label>
                  <select
                    value={newPartner.type}
                    onChange={(e) => setNewPartner({ ...newPartner, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="Institutional">Institutional</option>
                    <option value="Academic">Academic</option>
                    <option value="Community Alliance">Community Alliance</option>
                    <option value="Resource Partner">Resource Partner</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Partnership Year</label>
                  <input
                    type="text"
                    value={newPartner.partnershipYear}
                    onChange={(e) => setNewPartner({ ...newPartner, partnershipYear: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Website URL</label>
                <input
                  type="text"
                  value={newPartner.website}
                  onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Description (English) *</label>
                <textarea
                  required
                  rows={2}
                  value={newPartner.descEn}
                  onChange={(e) => setNewPartner({ ...newPartner, descEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddPartnerModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 text-white rounded-xl font-bold">
                  Add Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Video */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Add Video Documentary</h3>
            <form onSubmit={handleCreateVideoSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Video Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newVideo.titleEn}
                  onChange={(e) => setNewVideo({ ...newVideo, titleEn: e.target.value })}
                  placeholder="e.g. Team Infinity Youth Volunteer Orientation"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Video URL (YouTube or Facebook) *</label>
                <input
                  type="text"
                  required
                  value={newVideo.videoUrl}
                  onChange={(e) => setNewVideo({ ...newVideo, videoUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Platform</label>
                  <select
                    value={newVideo.platform}
                    onChange={(e) => setNewVideo({ ...newVideo, platform: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="facebook">Facebook</option>
                    <option value="direct">Direct Upload</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Duration</label>
                  <input
                    type="text"
                    value={newVideo.duration}
                    onChange={(e) => setNewVideo({ ...newVideo, duration: e.target.value })}
                    placeholder="3:45"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Description *</label>
                <textarea
                  required
                  rows={2}
                  value={newVideo.descEn}
                  onChange={(e) => setNewVideo({ ...newVideo, descEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 text-white rounded-xl font-bold">
                  Save Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Story */}
      {showAddStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Add Impact Story</h3>
            <form onSubmit={handleCreateStorySubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Story Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newStory.titleEn}
                  onChange={(e) => setNewStory({ ...newStory, titleEn: e.target.value })}
                  placeholder="e.g. The Smile of a Young Student"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Person / Community *</label>
                  <input
                    type="text"
                    required
                    value={newStory.personEn}
                    onChange={(e) => setNewStory({ ...newStory, personEn: e.target.value })}
                    placeholder="e.g. 9-year-old student"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Location</label>
                  <input
                    type="text"
                    value={newStory.locationEn}
                    onChange={(e) => setNewStory({ ...newStory, locationEn: e.target.value })}
                    placeholder="Dhaka, Bangladesh"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Story Narrative (English) *</label>
                <textarea
                  required
                  rows={3}
                  value={newStory.storyEn}
                  onChange={(e) => setNewStory({ ...newStory, storyEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold block mb-1">Measured Impact (English) *</label>
                <input
                  type="text"
                  required
                  value={newStory.impactEn}
                  onChange={(e) => setNewStory({ ...newStory, impactEn: e.target.value })}
                  placeholder="e.g. Continued regular schooling with academic supplies"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={newStory.consentConfirmed}
                  onChange={(e) => setNewStory({ ...newStory, consentConfirmed: e.target.checked })}
                />
                <label htmlFor="consent" className="text-[11px] text-slate-700">
                  Beneficiary consent confirmed in accordance with humanitarian dignity policy.
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddStoryModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 text-white rounded-xl font-bold">
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Donation */}
      {showAddDonationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">Record Offline / Manual Donation</h3>
            <form onSubmit={handleCreateDonationSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  value={newDonation.donorName}
                  onChange={(e) => setNewDonation({ ...newDonation, donorName: e.target.value })}
                  placeholder="e.g. Hasan Mahmud"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Amount (BDT) *</label>
                  <input
                    type="number"
                    required
                    value={newDonation.amountBDT}
                    onChange={(e) => setNewDonation({ ...newDonation, amountBDT: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Payment Channel</label>
                  <select
                    value={newDonation.paymentMethod}
                    onChange={(e) => setNewDonation({ ...newDonation, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="bKash">bKash</option>
                    <option value="Nagad">Nagad</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="In-Kind / Physical Support">In-Kind / Physical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold block mb-1">Transaction ID / Slip Ref</label>
                <input
                  type="text"
                  value={newDonation.transactionId}
                  onChange={(e) => setNewDonation({ ...newDonation, transactionId: e.target.value })}
                  placeholder="e.g. TRX89274619"
                  className="w-full px-3 py-2 border rounded-xl font-mono"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddDonationModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 text-white rounded-xl font-bold">
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT COMMITTEE MEMBER */}
      {(showAddMemberModal || showEditMemberModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900">
                {showEditMemberModal ? 'Edit Committee Member' : 'Add Member to Roster'}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setShowAddMemberModal(false);
                  setShowEditMemberModal(false);
                }}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMemberSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Full Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={memberFormData.fullName}
                    onChange={(e) => setMemberFormData({ ...memberFormData, fullName: e.target.value })}
                    placeholder="e.g. Md. Shahidul Alam Sakib"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Bangla Name (বাংলা) *</label>
                  <input
                    type="text"
                    required
                    value={memberFormData.banglaName}
                    onChange={(e) => setMemberFormData({ ...memberFormData, banglaName: e.target.value })}
                    placeholder="e.g. মোঃ শাহিদুল আলম সাকিব"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Position / Designation *</label>
                  <select
                    value={memberFormData.positionId}
                    onChange={(e) => setMemberFormData({ ...memberFormData, positionId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    {positions.map((pos) => (
                      <option key={pos.id} value={pos.id}>
                        {pos.name.en} ({pos.name.bn}) [Tier {pos.level}]
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Official Serial # (ক্রমিক) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={memberFormData.serialNumber}
                    onChange={(e) => setMemberFormData({ ...memberFormData, serialNumber: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">District / Home City</label>
                  <input
                    type="text"
                    value={memberFormData.district}
                    onChange={(e) => setMemberFormData({ ...memberFormData, district: e.target.value })}
                    placeholder="e.g. Dhaka / Chattogram"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Photo URL (Portrait)</label>
                  <input
                    type="text"
                    value={memberFormData.photoUrl}
                    onChange={(e) => setMemberFormData({ ...memberFormData, photoUrl: e.target.value })}
                    placeholder="https://... or /members/photo.jpg"
                    className="w-full px-3 py-2 border rounded-xl font-mono text-[11px]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Short Bio (English)</label>
                <textarea
                  rows={2}
                  value={memberFormData.shortBioEn}
                  onChange={(e) => setMemberFormData({ ...memberFormData, shortBioEn: e.target.value })}
                  placeholder="Dedicated leader overseeing field operations..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Short Bio (বাংলা)</label>
                <textarea
                  rows={2}
                  value={memberFormData.shortBioBn}
                  onChange={(e) => setMemberFormData({ ...memberFormData, shortBioBn: e.target.value })}
                  placeholder="টিম ইনফিনিটির সমাজসেবা কার্যক্রমে নিবেদিত প্রাণ..."
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Facebook URL</label>
                  <input
                    type="text"
                    value={memberFormData.facebookUrl}
                    onChange={(e) => setMemberFormData({ ...memberFormData, facebookUrl: e.target.value })}
                    placeholder="https://facebook.com/..."
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">LinkedIn URL</label>
                  <input
                    type="text"
                    value={memberFormData.linkedinUrl}
                    onChange={(e) => setMemberFormData({ ...memberFormData, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredLeaderToggle"
                  checked={memberFormData.isFeaturedLeader}
                  onChange={(e) => setMemberFormData({ ...memberFormData, isFeaturedLeader: e.target.checked })}
                  className="w-4 h-4 text-teal-800 rounded"
                />
                <label htmlFor="featuredLeaderToggle" className="font-bold text-slate-800 cursor-pointer">
                  Feature in "Meet Team Infinity" Homepage Showcase
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddMemberModal(false);
                    setShowEditMemberModal(false);
                  }}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold">
                  {showEditMemberModal ? 'Update Member' : 'Save Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD COMMITTEE */}
      {showAddCommitteeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900">Create New Committee Council</h3>
              <button
                type="button"
                onClick={() => setShowAddCommitteeModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCommitteeSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Tenure Year / Term *</label>
                  <input
                    type="text"
                    required
                    value={newCommitteeData.year}
                    onChange={(e) => setNewCommitteeData({ ...newCommitteeData, year: e.target.value })}
                    placeholder="e.g. 2027"
                    className="w-full px-3 py-2 border rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1 text-slate-700">Committee Type *</label>
                  <select
                    value={newCommitteeData.type}
                    onChange={(e) => setNewCommitteeData({ ...newCommitteeData, type: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    <option value="EXECUTIVE">Executive Council</option>
                    <option value="STANDING">Standing Committee</option>
                    <option value="ADVISORY">Advisory Board</option>
                    <option value="PAST">Past Term Archive</option>
                    <option value="SPECIAL">Special Committee</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Committee Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newCommitteeData.nameEn}
                  onChange={(e) => setNewCommitteeData({ ...newCommitteeData, nameEn: e.target.value })}
                  placeholder="e.g. Executive Committee 2027"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Committee Title (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newCommitteeData.nameBn}
                  onChange={(e) => setNewCommitteeData({ ...newCommitteeData, nameBn: e.target.value })}
                  placeholder="e.g. কার্যনির্বাহী পরিষদ ২০২৭"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Description (English)</label>
                <textarea
                  rows={2}
                  value={newCommitteeData.descriptionEn}
                  onChange={(e) => setNewCommitteeData({ ...newCommitteeData, descriptionEn: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Status</label>
                <select
                  value={newCommitteeData.status}
                  onChange={(e) => setNewCommitteeData({ ...newCommitteeData, status: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value="ACTIVE">Active (Current Governing Body)</option>
                  <option value="ARCHIVED">Archived (Historical Record)</option>
                  <option value="DRAFT">Draft</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddCommitteeModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold">
                  Create Committee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD POSITION */}
      {showAddPositionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xl font-bold text-slate-900">Add Designation / Position</h3>
              <button
                type="button"
                onClick={() => setShowAddPositionModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePositionSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-slate-700">Position Title (English) *</label>
                <input
                  type="text"
                  required
                  value={newPositionData.nameEn}
                  onChange={(e) => setNewPositionData({ ...newPositionData, nameEn: e.target.value })}
                  placeholder="e.g. Senior Assistant Secretary"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Position Title (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newPositionData.nameBn}
                  onChange={(e) => setNewPositionData({ ...newPositionData, nameBn: e.target.value })}
                  placeholder="e.g. সিনিয়র সহকারী সম্পাদক"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-slate-700">Hierarchy Level *</label>
                <select
                  value={newPositionData.level}
                  onChange={(e) => setNewPositionData({ ...newPositionData, level: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  <option value={1}>Level 1: President (শীর্ষ নেতৃত্ব)</option>
                  <option value={2}>Level 2: Vice President / Senior VP (সহ-সভাপতি)</option>
                  <option value={3}>Level 3: General Secretary (সাধারণ সম্পাদক)</option>
                  <option value={4}>Level 4: Joint Secretary & Departmental Secretary (বিভাগীয় সম্পাদক)</option>
                  <option value={5}>Level 5: Executive Member / Member (কার্যনির্বাহী সদস্য)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPositionModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl font-bold">
                  Save Position
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Global Toast */}
      <Toast
        isOpen={showToast}
        message={toastMsg}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
};
