import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import {
  BloodDonor,
  BloodGroup,
  DonorAvailabilityStatus,
  EmergencyBloodRequest,
  EmergencyLevel
} from '../types';
import { BANGLADESH_DISTRICTS } from '../data/bangladeshData';
import { getUpazilasForDistrict } from '../data/bloodDonationData';
import { getAssetUrl } from '../lib/utils/assetHelper';
import { SectionHeading } from '../components/SectionHeading';
import { BloodDonorProfileModal } from '../components/BloodDonorProfileModal';
import { EmergencyBloodContactModal } from '../components/EmergencyBloodContactModal';
import {
  Droplet,
  Search,
  Heart,
  Users,
  ShieldCheck,
  MapPin,
  Calendar,
  Phone,
  Clock,
  Send,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Info,
  Award,
  Activity,
  UserPlus,
  HelpCircle,
  Check,
  Building2,
  Flame,
  Plus,
  Camera,
  Upload,
  Trash2,
  ImageIcon
} from 'lucide-react';

interface BloodDonationPageProps {
  initialTab?: 'find-donor' | 'become-donor' | 'emergency-request' | 'donors' | 'statistics' | 'guidelines';
}

export const BloodDonationPage: React.FC<BloodDonationPageProps> = ({
  initialTab = 'find-donor'
}) => {
  const { isBn, tText } = useLanguage();
  const {
    bloodDonors,
    emergencyBloodRequests,
    bloodDonationSettings,
    donorCategories,
    addBloodDonor,
    addEmergencyBloodRequest
  } = useData();
  const { currentPage, navigate } = useRouter();

  // Active tab state
  const [activeTab, setActiveTab] = useState<
    'find-donor' | 'become-donor' | 'emergency-request' | 'donors' | 'statistics' | 'guidelines'
  >(() => {
    if (currentPage === 'blood-donation/find-donor') return 'find-donor';
    if (currentPage === 'blood-donation/become-donor') return 'become-donor';
    if (currentPage === 'blood-donation/emergency-request') return 'emergency-request';
    if (currentPage === 'blood-donation/statistics') return 'statistics';
    return initialTab;
  });

  // Modals state
  const [selectedDonorForProfile, setSelectedDonorForProfile] = useState<BloodDonor | null>(null);
  const [selectedDonorForContact, setSelectedDonorForContact] = useState<BloodDonor | null>(null);

  // ----------------------------------------------------
  // SEARCH & FILTER STATE (FIND A DONOR)
  // ----------------------------------------------------
  const [searchBloodGroup, setSearchBloodGroup] = useState<string>('ALL');
  const [searchDistrict, setSearchDistrict] = useState<string>('ALL');
  const [searchUpazila, setSearchUpazila] = useState<string>('ALL');
  const [searchArea, setSearchArea] = useState<string>('');
  const [searchAvailability, setSearchAvailability] = useState<string>('ALL');
  const [searchOrgCategory, setSearchOrgCategory] = useState<string>('ALL');

  // Pagination for Donors Directory
  const [displayCount, setDisplayCount] = useState<number>(8);

  // Available Upazilas for selected district
  const availableUpazilas = useMemo(() => {
    if (searchDistrict === 'ALL') return [];
    return getUpazilasForDistrict(searchDistrict);
  }, [searchDistrict]);

  // ----------------------------------------------------
  // BECOME A DONOR FORM STATE
  // ----------------------------------------------------
  const [regFullName, setRegFullName] = useState('');
  const [regBloodGroup, setRegBloodGroup] = useState<BloodGroup>('O+');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhotoUrl, setRegPhotoUrl] = useState('');
  const [regPhotoFileName, setRegPhotoFileName] = useState('');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const regPhotoInputRef = useRef<HTMLInputElement>(null);
  const [regDistrict, setRegDistrict] = useState('Chattogram');
  const [regUpazila, setRegUpazila] = useState('Hathazari');
  const [regArea, setRegArea] = useState('');
  const [regDetailedAddress, setRegDetailedAddress] = useState('');
  const [regOrgCategory, setRegOrgCategory] = useState('Infinity Bangladesh Volunteer');
  const [regCommitteePosition, setRegCommitteePosition] = useState('');
  const [regAvailability, setRegAvailability] = useState<DonorAvailabilityStatus>('AVAILABLE_EMERGENCY');
  const [regFirstDonationDate, setRegFirstDonationDate] = useState('');
  const [regLastDonationDate, setRegLastDonationDate] = useState('');
  const [regTotalDonations, setRegTotalDonations] = useState<number>(0);
  const [regExperienceNotes, setRegExperienceNotes] = useState('');
  const [regConsent, setRegConsent] = useState(true);
  const [regShowPhone, setRegShowPhone] = useState(false);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regRefId, setRegRefId] = useState('');
  const [regFormError, setRegFormError] = useState<string | null>(null);

  // Handle Donor Photo Selection with Canvas Compression
  const handleDonorPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setRegFormError(
        isBn
          ? 'অনুগ্রহ করে JPG, JPEG, PNG বা WebP ফরম্যাটের ছবি আপলোড করুন।'
          : 'Please upload a JPG, JPEG, PNG, or WebP format image.'
      );
      return;
    }

    // Validate size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setRegFormError(
        isBn
          ? 'ছবির সাইজ ৫ মেগাবাইট (5MB)-এর কম হতে হবে।'
          : 'Image size must be under 5MB.'
      );
      return;
    }

    setRegPhotoFileName(file.name);
    setRegFormError(null);
    setIsUploadingPhoto(true);

    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        // Optimize and compress large images to maintain snappy client performance
        const maxDim = 800;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setRegPhotoUrl(compressedDataUrl);
        } else {
          setRegPhotoUrl(readerEvent.target?.result as string);
        }
        setIsUploadingPhoto(false);
      };
      img.onerror = () => {
        setRegPhotoUrl(readerEvent.target?.result as string);
        setIsUploadingPhoto(false);
      };
      img.src = readerEvent.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveDonorPhoto = () => {
    setRegPhotoUrl('');
    setRegPhotoFileName('');
    if (regPhotoInputRef.current) {
      regPhotoInputRef.current.value = '';
    }
  };

  const resetDonorRegistrationForm = () => {
    setRegFullName('');
    setRegBloodGroup('O+');
    setRegPhone('');
    setRegEmail('');
    setRegPhotoUrl('');
    setRegPhotoFileName('');
    if (regPhotoInputRef.current) {
      regPhotoInputRef.current.value = '';
    }
    setRegDistrict('Chattogram');
    setRegUpazila('Hathazari');
    setRegArea('');
    setRegDetailedAddress('');
    setRegOrgCategory('Infinity Bangladesh Volunteer');
    setRegCommitteePosition('');
    setRegAvailability('AVAILABLE_EMERGENCY');
    setRegFirstDonationDate('');
    setRegLastDonationDate('');
    setRegTotalDonations(0);
    setRegExperienceNotes('');
    setRegConsent(true);
    setRegShowPhone(false);
    setRegFormError(null);
    setRegSubmitted(false);
  };

  // ----------------------------------------------------
  // EMERGENCY BLOOD REQUEST FORM STATE
  // ----------------------------------------------------
  const [emgRequesterName, setEmgRequesterName] = useState('');
  const [emgContactNumber, setEmgContactNumber] = useState('');
  const [emgPatientName, setEmgPatientName] = useState('');
  const [emgBloodGroup, setEmgBloodGroup] = useState<BloodGroup>('O+');
  const [emgUnits, setEmgUnits] = useState<number>(1);
  const [emgHospital, setEmgHospital] = useState('');
  const [emgDistrict, setEmgDistrict] = useState('Chattogram');
  const [emgUpazila, setEmgUpazila] = useState('Hathazari');
  const [emgUrgency, setEmgUrgency] = useState<EmergencyLevel>('URGENT');
  const [emgRequiredDate, setEmgRequiredDate] = useState(new Date().toISOString().split('T')[0]);
  const [emgNotes, setEmgNotes] = useState('');
  const [emgSubmitted, setEmgSubmitted] = useState(false);
  const [emgRefId, setEmgRefId] = useState('');
  const [emgFormError, setEmgFormError] = useState<string | null>(null);

  // ----------------------------------------------------
  // LIVE COMPUTED STATISTICS
  // ----------------------------------------------------
  const stats = useMemo(() => {
    const approvedDonors = bloodDonors.filter(d => d.approvalStatus === 'APPROVED');
    const activeDonors = approvedDonors.filter(d => d.availabilityStatus === 'AVAILABLE_EMERGENCY');
    const totalDonationsCount = approvedDonors.reduce((acc, d) => acc + (d.totalDonations || 0), 0);

    const groupCounts: Record<BloodGroup, number> = {
      'A+': 0, 'A-': 0, 'B+': 0, 'B-': 0,
      'O+': 0, 'O-': 0, 'AB+': 0, 'AB-': 0
    };

    approvedDonors.forEach(d => {
      if (groupCounts[d.bloodGroup] !== undefined) {
        groupCounts[d.bloodGroup]++;
      }
    });

    const activeEmergencyRequests = emergencyBloodRequests.filter(
      r => r.status === 'PENDING' || r.status === 'PROCESSING'
    );

    return {
      totalDonors: approvedDonors.length,
      activeDonors: activeDonors.length,
      totalGroups: 8,
      totalDonations: totalDonationsCount,
      groupCounts,
      activeEmergencyRequests: activeEmergencyRequests.length
    };
  }, [bloodDonors, emergencyBloodRequests]);

  // ----------------------------------------------------
  // FILTERED DONORS FOR SEARCH
  // ----------------------------------------------------
  const filteredDonors = useMemo(() => {
    return bloodDonors.filter(d => {
      if (d.approvalStatus !== 'APPROVED') return false;
      if (searchBloodGroup !== 'ALL' && d.bloodGroup !== searchBloodGroup) return false;
      if (searchDistrict !== 'ALL' && d.district.toLowerCase() !== searchDistrict.toLowerCase()) return false;
      if (searchUpazila !== 'ALL' && d.upazila.toLowerCase() !== searchUpazila.toLowerCase()) return false;
      if (searchArea.trim() && !d.area.toLowerCase().includes(searchArea.toLowerCase())) return false;
      if (searchAvailability !== 'ALL' && d.availabilityStatus !== searchAvailability) return false;
      if (searchOrgCategory !== 'ALL' && d.orgCategory !== searchOrgCategory) return false;
      return true;
    });
  }, [
    bloodDonors,
    searchBloodGroup,
    searchDistrict,
    searchUpazila,
    searchArea,
    searchAvailability,
    searchOrgCategory
  ]);

  // ----------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------
  const handleDonorRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegFormError(null);

    if (!regFullName.trim() || !regPhone.trim() || !regDistrict || !regUpazila) {
      setRegFormError(isBn ? 'অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।' : 'Please fill in all required fields.');
      return;
    }

    // Validate 11-digit BD Phone Number (e.g. 01XXXXXXXXX)
    const cleanPhone = regPhone.replace(/\D/g, '');
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setRegFormError(
        isBn
          ? 'অনুগ্রহ করে সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর প্রদান করুন (যেমন: 018XXXXXXXX)'
          : 'Please enter a valid 11-digit Bangladeshi mobile number starting with 01 (e.g. 018XXXXXXXX)'
      );
      return;
    }

    // Validate No Future Dates for Blood Donation
    const todayStr = new Date().toISOString().split('T')[0];
    if (regLastDonationDate && regLastDonationDate > todayStr) {
      setRegFormError(
        isBn
          ? 'সর্বশেষ রক্তদানের তারিখ আজকের বা অতীতের তারিখ হতে হবে, ভবিষ্যতের তারিখ নির্বাচন করা যাবে না।'
          : 'Last donation date cannot be in the future. Please select today or a past date.'
      );
      return;
    }
    if (regFirstDonationDate && regFirstDonationDate > todayStr) {
      setRegFormError(
        isBn
          ? 'প্রথম রক্তদানের তারিখ আজকের বা অতীতের তারিখ হতে হবে, ভবিষ্যতের তারিখ নয়।'
          : 'First donation date cannot be in the future.'
      );
      return;
    }
    if (regFirstDonationDate && regLastDonationDate && regFirstDonationDate > regLastDonationDate) {
      setRegFormError(
        isBn
          ? 'প্রথম রক্তদানের তারিখ শেষ রক্তদানের তারিখের চেয়ে পরের হতে পারে না।'
          : 'First donation date cannot be after the last donation date.'
      );
      return;
    }

    const newDonor = addBloodDonor({
      fullName: regFullName.trim(),
      bloodGroup: regBloodGroup,
      phone: cleanPhone,
      email: regEmail.trim() || undefined,
      photoUrl: regPhotoUrl.trim() || undefined,
      district: regDistrict,
      upazila: regUpazila,
      area: regArea.trim(),
      detailedAddress: regDetailedAddress.trim() || undefined,
      orgCategory: regOrgCategory,
      committeePosition: regCommitteePosition.trim() || undefined,
      availabilityStatus: regAvailability,
      firstDonationDate: regFirstDonationDate || undefined,
      lastDonationDate: regLastDonationDate || undefined,
      totalDonations: Number(regTotalDonations) || 0,
      experienceNotes: regExperienceNotes.trim() || undefined,
      isVerified: false,
      approvalStatus: 'PENDING', // Awaiting Admin Review
      privacyConsent: regConsent,
      showPhonePublicly: regShowPhone,
      donationHistory: []
    });

    setRegRefId(newDonor.id);
    setRegSubmitted(true);
  };

  const handleEmergencyRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emgRequesterName.trim() || !emgContactNumber.trim() || !emgPatientName.trim() || !emgHospital.trim()) return;

    // Validate 11-digit BD Phone Number
    const cleanPhone = emgContactNumber.replace(/\D/g, '');
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      alert(
        isBn
          ? 'যোগাযোগের জন্য সঠিক ১১ ডিজিটের বাংলাদেশি মোবাইল নম্বর প্রদান করুন (যেমন: 018XXXXXXXX)'
          : 'Please enter a valid 11-digit Bangladeshi contact number (e.g. 018XXXXXXXX)'
      );
      return;
    }

    // Auto-match donors
    const matched = bloodDonors.filter(
      d => d.approvalStatus === 'APPROVED' && d.bloodGroup === emgBloodGroup && d.availabilityStatus !== 'UNAVAILABLE'
    ).map(d => d.id);

    const newReq = addEmergencyBloodRequest({
      requesterName: emgRequesterName.trim(),
      contactNumber: cleanPhone,
      patientName: emgPatientName.trim(),
      bloodGroup: emgBloodGroup,
      unitsNeeded: Number(emgUnits) || 1,
      hospitalName: emgHospital.trim(),
      district: emgDistrict,
      upazila: emgUpazila,
      emergencyLevel: emgUrgency,
      requiredDate: emgRequiredDate,
      additionalNotes: emgNotes.trim() || undefined,
      matchedDonorIds: matched
    });

    setEmgRefId(newReq.id);
    setEmgSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FCFBF8] pb-16 sm:pb-24">
      {/* 1. HERO SECTION & LIVE STATISTICS */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0F221D] via-[#152E27] to-[#1B3B32] text-white pt-12 sm:pt-16 pb-16 sm:pb-20 border-b border-emerald-900/50">
        <div className="absolute inset-0 bg-[radial-gradient(#006A4E_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Brand Hierarchy & Live Stats */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Parent Organization Tie-in Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-white/10 text-emerald-200 border border-white/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {tText(bloodDonationSettings.heroBadge) || (isBn ? 'ইনফিনিটি বাংলাদেশ-এর একটি মানবিক উদ্যোগ' : 'An Initiative by Infinity Bangladesh')}
                </span>
              </div>

              {/* Sub-brand Main Logo Card */}
              <div className="pt-1">
                <div className="inline-block p-4 sm:p-5 rounded-3xl bg-white text-slate-900 shadow-2xl border-2 border-white/40 max-w-md">
                  <img
                    src={getAssetUrl(bloodDonationSettings.wingLogoUrl || '/brand/Infinitylifeline-logo.png')}
                    alt="Infinity LifeLine - One Drop, Infinite Hope"
                    className="h-14 sm:h-16 w-auto object-contain mx-auto lg:mx-0"
                  />
                </div>
              </div>

              {/* Platform / Service Title & Humanitarian Subtitle */}
              <div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                  {tText(bloodDonationSettings.heroTitle) || (isBn ? 'রক্তদান নেটওয়ার্ক' : 'Blood Donation Network')}
                </h1>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl leading-relaxed mt-2">
                  {tText(bloodDonationSettings.heroSubtitle) || (isBn
                    ? 'জরুরি রোগীদের পাশে দ্রুত, বিশ্বস্ত ও মানবিক সহায়তায় সারা বাংলাদেশের স্বেচ্ছাসেবী রক্তদাতাদের মেলবন্ধন।'
                    : 'Connecting voluntary blood donors across Bangladesh to serve emergency patients with speed, verified trust, and compassion.')}
                </p>
              </div>

              {/* 4 Dynamic Statistics Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    {bloodDonationSettings.statTotalDonorsOverride ?? stats.totalDonors}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-200 mt-0.5">
                    {tText(bloodDonationSettings.statTotalDonorsLabel) || (isBn ? 'নিবন্ধিত রক্তদাতা' : 'Total Donors')}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-display">
                    {bloodDonationSettings.statActiveDonorsOverride ?? stats.activeDonors}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-200 mt-0.5">
                    {tText(bloodDonationSettings.statActiveDonorsLabel) || (isBn ? 'জরুরিতে প্রস্তুত' : 'Active Donors')}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-rose-300 font-display">
                    {bloodDonationSettings.statGroupsValue || '8/8'}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-200 mt-0.5">
                    {tText(bloodDonationSettings.statGroupsLabel) || (isBn ? 'সকল ব্লাড গ্রুপ' : 'Blood Groups')}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-display">
                    {bloodDonationSettings.statImpactOverride !== null && bloodDonationSettings.statImpactOverride !== undefined
                      ? `${bloodDonationSettings.statImpactOverride}+`
                      : `${stats.totalDonations}+`}
                  </p>
                  <p className="text-[11px] font-bold text-emerald-200 mt-0.5">
                    {tText(bloodDonationSettings.statImpactLabel) || (isBn ? 'মোট রক্তদান সম্পন্ন' : 'Lives Impacted')}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero CTA Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl bg-white p-7 sm:p-8 text-slate-900 shadow-2xl border-4 border-white/40 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                      <Droplet className="w-6 h-6 fill-current" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                        {tText(bloodDonationSettings.heroCtaBadge) || (isBn ? 'মানবতার আহ্বান' : 'JOIN THE CAUSE')}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 font-display">
                        {tText(bloodDonationSettings.heroCtaTitle) || (isBn ? 'জীবন বাঁচাতে এগিয়ে আসুন' : 'Be a Lifesaver')}
                      </h3>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tText(bloodDonationSettings.heroCtaDescription) || (isBn
                    ? 'আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মূল্যবান প্রাণ। ইনফিনিটি লাইফলাইন নেটওয়ার্কে রক্তদাতা হিসেবে যুক্ত হতে এখনই রেজিস্ট্রেশন করুন।'
                    : 'Every drop counts. Register as a voluntary blood donor with Infinity LifeLine and become someone’s lifeline in moments of crisis.')}
                </p>

                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('become-donor')}
                    className="w-full py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>
                      {tText(bloodDonationSettings.heroCtaBtn1Text) || (isBn ? 'রক্তদাতা হতে রেজিস্ট্রেশন করুন' : 'Become a Donor')}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('emergency-request')}
                    className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>
                      {tText(bloodDonationSettings.heroCtaBtn2Text) || (isBn ? 'জরুরি রক্তের আবেদন করুন' : 'Emergency Blood Request')}
                    </span>
                  </button>
                </div>

                {/* 24/7 Helpline Badge */}
                <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-bold">
                    <Phone className="w-3.5 h-3.5 text-[#006A4E]" />
                    <span>
                      {tText(bloodDonationSettings.helplineLabel) || (isBn ? '২৪/৭ ব্লাড হেল্পলাইন:' : '24/7 Helpline:')}
                    </span>
                  </div>
                  <a
                    href={`tel:${bloodDonationSettings.emergencyHelpline}`}
                    className="font-extrabold text-[#006A4E] hover:underline"
                  >
                    {bloodDonationSettings.emergencyHelpline}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NAVIGATION TABS */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-[#EAE3D9] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-3 scroll-smooth">
            {[
              { id: 'find-donor', label: isBn ? 'রক্তদাতা খুঁজুন' : 'Find a Donor', icon: Search },
              { id: 'become-donor', label: isBn ? 'রক্তদাতা হন' : 'Become a Donor', icon: UserPlus },
              { id: 'emergency-request', label: isBn ? 'জরুরি রক্তের আবেদন' : 'Emergency Request', icon: AlertTriangle, badge: stats.activeEmergencyRequests ? `${stats.activeEmergencyRequests}` : undefined },
              { id: 'donors', label: isBn ? 'রক্তদাতা তালিকা' : 'Our Donors', icon: Users },
              { id: 'statistics', label: isBn ? 'রক্তদান পরিসংখ্যান' : 'Blood Statistics', icon: Activity },
              { id: 'guidelines', label: isBn ? 'নির্দেশিকা ও তথ্য' : 'Guidelines', icon: Info }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#006A4E] text-white shadow-warm-sm ring-2 ring-emerald-500/20 scale-[1.02]'
                      : 'bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-black">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TAB VIEWS CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
        {/* ==================================================== */}
        {/* TAB 1: FIND A DONOR (ADVANCED SEARCH) */}
        {/* ==================================================== */}
        {activeTab === 'find-donor' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Search Filter Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-warm-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'স্বেচ্ছাসেবী রক্তদাতা অনুসন্ধান করুন' : 'Advanced Blood Donor Search'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {isBn ? 'রক্তের গ্রুপ, জেলা এবং এলাকা নির্বাচন করে নিকটস্থ রক্তদাতা খুঁজুন' : 'Filter by blood group, district, and area to locate matching donors near you'}
                  </p>
                </div>

                <div className="text-xs font-bold text-[#006A4E] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                  {filteredDonors.length} {isBn ? 'জন উপযুক্ত রক্তদাতা প্রস্তুত' : 'Donors Matched'}
                </div>
              </div>

              {/* Blood Group Quick Selector Pills */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  {isBn ? 'রক্তের গ্রুপ নির্বাচন করুন:' : 'Select Blood Group:'}
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
                  <button
                    type="button"
                    onClick={() => setSearchBloodGroup('ALL')}
                    className={`py-2 px-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                      searchBloodGroup === 'ALL'
                        ? 'bg-[#006A4E] text-white border-emerald-700 shadow-xs'
                        : 'bg-white text-slate-700 border-[#EAE3D9] hover:bg-slate-50'
                    }`}
                  >
                    {isBn ? 'সকল' : 'All'}
                  </button>
                  {(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as BloodGroup[]).map(bg => {
                    const isSelected = searchBloodGroup === bg;
                    return (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setSearchBloodGroup(bg)}
                        className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-rose-600 text-white border-rose-700 shadow-xs scale-105'
                            : 'bg-white text-slate-800 border-[#EAE3D9] hover:bg-rose-50 hover:text-rose-700'
                        }`}
                      >
                        {bg}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Filter Selectors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                {/* District */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">{isBn ? 'জেলা' : 'District'}</label>
                  <select
                    value={searchDistrict}
                    onChange={(e) => {
                      setSearchDistrict(e.target.value);
                      setSearchUpazila('ALL');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  >
                    <option value="ALL">{isBn ? 'সকল জেলা' : 'All Districts'}</option>
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d.nameEn} value={d.nameEn}>
                        {d.nameEn} ({d.nameBn})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">{isBn ? 'উপজেলা / থানা' : 'Upazila / Thana'}</label>
                  <select
                    value={searchUpazila}
                    onChange={(e) => setSearchUpazila(e.target.value)}
                    disabled={searchDistrict === 'ALL'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none disabled:opacity-50"
                  >
                    <option value="ALL">{isBn ? 'সকল উপজেলা' : 'All Upazilas'}</option>
                    {availableUpazilas.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </div>

                {/* Availability */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">{isBn ? 'প্রাপ্যতা স্ট্যাটাস' : 'Availability'}</label>
                  <select
                    value={searchAvailability}
                    onChange={(e) => setSearchAvailability(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-bold focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  >
                    <option value="ALL">{isBn ? 'সকল প্রাপ্যতা' : 'All Availability'}</option>
                    <option value="AVAILABLE_EMERGENCY">🟢 {isBn ? 'জরুরি রক্তদানে প্রস্তুত' : 'Available for Emergency'}</option>
                    <option value="AVAILABLE_NOTICE">🟡 {isBn ? 'পূর্বে জানালে প্রস্তুত' : 'Available with Notice'}</option>
                  </select>
                </div>

                {/* Organization Category */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">{isBn ? 'সংগঠনের ক্যাটাগরি' : 'Org Category'}</label>
                  <select
                    value={searchOrgCategory}
                    onChange={(e) => setSearchOrgCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-medium focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                  >
                    <option value="ALL">{isBn ? 'সকল ক্যাটাগরি' : 'All Categories'}</option>
                    {donorCategories.map(cat => (
                      <option key={cat.id} value={cat.name.en}>
                        {cat.name.en}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Donor Results Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-900 font-display">
                  {isBn ? 'উপলব্ধ রক্তদাতাবৃন্দ' : 'Available Blood Donors'} ({filteredDonors.length})
                </h3>
              </div>

              {filteredDonors.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-3xl border border-[#EAE3D9] shadow-warm-xs space-y-4 max-w-lg mx-auto">
                  <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center">
                    <Droplet className="w-8 h-8 fill-current" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-extrabold text-slate-900 font-display">
                      {isBn ? 'কোনো রক্তদাতা খুঁজে পাওয়া যায়নি' : 'No Matching Donors Found'}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isBn
                        ? 'আপনার নির্বাচিত ফিল্টারের সাথে কোনো রক্তদাতা মেলেনি। ফিল্টার পরিবর্তন করুন অথবা তাৎক্ষণিক জরুরি আবেদন পোস্ট করুন।'
                        : 'Try adjusting your search criteria or submit an emergency request to notify our voluntary coordinators.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('emergency-request')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-warm-sm transition-all cursor-pointer"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    <span>{isBn ? 'জরুরি রক্তের আবেদন করুন' : 'Post Emergency Request'}</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredDonors.slice(0, displayCount).map(donor => {
                    const isAvailEmg = donor.availabilityStatus === 'AVAILABLE_EMERGENCY';
                    return (
                      <div
                        key={donor.id}
                        className="p-5 sm:p-6 rounded-3xl bg-white border border-[#EAE3D9] shadow-warm-sm hover:shadow-warm-md transition-all hover:-translate-y-0.5 space-y-4 relative flex flex-col justify-between"
                      >
                        <div className="space-y-3.5">
                          {/* Card Header: Avatar, Blood Group & Availability */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-950 border-2 border-[#EAE3D9] shrink-0">
                                {donor.photoUrl ? (
                                  <img
                                    src={getAssetUrl(donor.photoUrl)}
                                    alt={donor.fullName}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-white text-base font-extrabold font-display bg-gradient-to-br from-emerald-800 to-emerald-950">
                                    {donor.fullName.charAt(0)}
                                  </div>
                                )}
                              </div>

                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-display truncate">
                                    {donor.fullName}
                                  </h4>
                                  {donor.isVerified && (
                                    <span title="Verified Donor" className="inline-flex shrink-0">
                                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    </span>
                                  )}
                                </div>
                                <span className="inline-block text-[11px] text-[#006A4E] font-bold truncate">
                                  {donor.orgCategory}
                                </span>
                              </div>
                            </div>

                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-600 text-white font-black text-xs font-display shadow-xs shrink-0">
                              {donor.bloodGroup}
                            </span>
                          </div>

                          {/* Location & Availability Pill */}
                          <div className="space-y-2 text-xs">
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate">{donor.area}, {donor.upazila}, {donor.district}</span>
                            </div>

                            <div className="flex items-center justify-between text-[11px]">
                              <span
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-extrabold ${
                                  isAvailEmg
                                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                    : donor.availabilityStatus === 'AVAILABLE_NOTICE'
                                    ? 'bg-amber-50 text-amber-800 border border-amber-200'
                                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isAvailEmg ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                                <span>{isAvailEmg ? (isBn ? 'জরুরিতে প্রস্তুত' : 'Ready for Emergency') : (isBn ? 'নোটিশে প্রস্তুত' : 'With Notice')}</span>
                              </span>

                              <span className="font-bold text-slate-500">
                                {donor.totalDonations} {isBn ? 'বার রক্তদান' : 'donations'}
                              </span>
                            </div>
                          </div>

                          {donor.experienceNotes && (
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed italic bg-[#FAF7F2] p-2.5 rounded-xl border border-[#EAE3D9]/60">
                              "{donor.experienceNotes}"
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setSelectedDonorForProfile(donor)}
                            className="py-2 px-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-slate-700 font-bold text-xs border border-[#EAE3D9] transition-all cursor-pointer text-center"
                          >
                            {isBn ? 'প্রোফাইল দেখুন' : 'View Profile'}
                          </button>

                          <button
                            type="button"
                            onClick={() => setSelectedDonorForContact(donor)}
                            className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{isBn ? 'যোগাযোগ' : 'Contact'}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Load More Button */}
              {filteredDonors.length > displayCount && (
                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => setDisplayCount(prev => prev + 6)}
                    className="px-6 py-2.5 rounded-2xl bg-white border border-[#EAE3D9] text-slate-700 font-extrabold text-xs hover:bg-[#FAF7F2] shadow-warm-xs transition-all cursor-pointer"
                  >
                    {isBn ? 'আরও রক্তদাতা লোড করুন' : 'Load More Donors'} ({filteredDonors.length - displayCount} remaining)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 2: BECOME A DONOR (REGISTRATION FORM) */}
        {/* ==================================================== */}
        {activeTab === 'become-donor' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in">
            {regSubmitted ? (
              <div className="p-8 sm:p-12 text-center bg-white rounded-3xl border border-emerald-200 shadow-warm-lg space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#006A4E] mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'আপনার রক্তদাতা নিবন্ধন সফল হয়েছে!' : 'Donor Registration Submitted!'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    {isBn
                      ? 'স্বেচ্ছাসেবী রক্তদাতা হিসেবে আবেদনের জন্য ধন্যবাদ। আমাদের টিম শীঘ্রই তথ্য যাচাই করে আপনার প্রোফাইলটি পাবলিক ডিরেক্টরিতে সক্রিয় করবে।'
                      : 'Thank you for registering. Your profile is currently under review by Team Infinity coordinators and will be verified shortly.'}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] inline-block text-xs font-mono font-bold text-slate-700">
                  Reference ID: <span className="text-[#006A4E]">{regRefId}</span>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      resetDonorRegistrationForm();
                      setActiveTab('find-donor');
                    }}
                    className="px-6 py-3 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm transition-all cursor-pointer"
                  >
                    {isBn ? 'রক্তদাতা ডিরেক্টরিতে ফিরে যান' : 'Back to Donor Directory'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-7 sm:p-10 border border-[#EAE3D9] shadow-warm-md space-y-8">
                <div className="border-b border-slate-100 pb-5 space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                    <UserPlus className="w-3.5 h-3.5 text-[#006A4E]" />
                    <span>{isBn ? 'নতুন রক্তদাতা অন্তর্ভুক্তি' : 'Volunteer Donor Onboarding'}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                    {isBn ? 'রক্তদাতা হিসেবে রেজিস্ট্রেশন করুন' : 'Become a Voluntary Blood Donor'}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500">
                    {isBn ? 'সঠিক তথ্য প্রদান করুন। সংবেদনশীল তথ্য গোপনীয়তা নীতিমালার অধীনে সংরক্ষিত থাকবে।' : 'Please provide verified information. Your sensitive contact details will remain protected under our privacy safeguards.'}
                  </p>
                </div>

                <form onSubmit={handleDonorRegisterSubmit} className="space-y-6">
                  {/* Basic Profile */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isBn ? '১. ব্যক্তিগত তথ্য ও রক্তের গ্রুপ' : '1. Personal Details & Blood Group'}
                    </h4>

                    {/* Optional Profile Photo Upload & URL */}
                    <div className="space-y-2.5 p-4 rounded-3xl bg-[#FAF7F2] border-2 border-dashed border-[#EAE3D9] hover:border-[#006A4E] transition-colors">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Camera className="w-4 h-4 text-[#006A4E]" />
                          <span>{isBn ? 'প্রোফাইল ছবি (ঐচ্ছিক)' : 'Profile Photo (Optional)'}</span>
                        </label>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                          {isBn ? 'ঐচ্ছিক — ছবি ছাড়াও জমা দেওয়া যাবে' : 'Optional — Can submit without photo'}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                        {regPhotoUrl ? (
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#006A4E] shadow-warm-sm shrink-0 bg-white group">
                            <img
                              src={getAssetUrl(regPhotoUrl)}
                              alt="Donor Preview"
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveDonorPhoto}
                              className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity cursor-pointer text-[10px] font-bold"
                              title={isBn ? 'ছবি মুছুন' : 'Remove Photo'}
                            >
                              <Trash2 className="w-4 h-4 text-rose-300" />
                              <span>{isBn ? 'মুছুন' : 'Remove'}</span>
                            </button>
                          </div>
                        ) : (
                          <div
                            onClick={() => regPhotoInputRef.current?.click()}
                            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-[#006A4E] hover:border-[#006A4E] transition-all cursor-pointer shrink-0 shadow-2xs group"
                            title={isBn ? 'ছবি আপলোড করতে ক্লিক করুন' : 'Click to upload photo'}
                          >
                            <Camera className="w-7 h-7 mb-1 text-slate-400 group-hover:scale-110 group-hover:text-[#006A4E] transition-all" />
                            <span className="text-[10px] font-bold uppercase text-center px-1 text-slate-600 group-hover:text-[#006A4E]">
                              {isBn ? 'ছবি আপলোড' : 'Upload'}
                            </span>
                          </div>
                        )}

                        <div className="space-y-2 text-center sm:text-left min-w-0 flex-1 w-full">
                          <input
                            ref={regPhotoInputRef}
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/jpg"
                            onChange={handleDonorPhotoUpload}
                            className="hidden"
                          />
                          <div className="flex flex-wrap sm:flex-nowrap gap-2">
                            <button
                              type="button"
                              onClick={() => regPhotoInputRef.current?.click()}
                              className="px-4 py-2.5 rounded-xl bg-white border border-[#EAE3D9] hover:bg-slate-100 text-slate-800 text-xs font-bold shadow-2xs inline-flex items-center justify-center gap-2 cursor-pointer transition-colors shrink-0"
                            >
                              <Upload className="w-3.5 h-3.5 text-[#006A4E]" />
                              <span>
                                {regPhotoUrl
                                  ? (isBn ? 'ছবি পরিবর্তন করুন' : 'Change Photo')
                                  : (isBn ? 'ডিভাইস থেকে ছবি আপলোড' : 'Upload from Device')}
                              </span>
                            </button>

                            <input
                              type="url"
                              value={regPhotoUrl.startsWith('data:') ? '' : regPhotoUrl}
                              onChange={(e) => {
                                setRegPhotoUrl(e.target.value);
                                setRegPhotoFileName('');
                              }}
                              placeholder={isBn ? 'অথবা সরাসরি ছবির লিঙ্ক দিন (URL)' : 'Or paste direct Image URL...'}
                              className="flex-1 min-w-0 px-3.5 py-2 rounded-xl border border-[#EAE3D9] bg-white text-xs focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                            />
                          </div>

                          <p className="text-[11px] text-slate-500">
                            {isBn
                              ? 'JPG, PNG বা WebP ফরম্যাট। সর্বোচ্চ সাইজ: ৫MB। (ছবি না দিলেও নিবন্ধন সম্পন্ন হবে)'
                              : 'Supported: JPG, PNG, WebP (max 5MB). Photo is optional.'}
                          </p>

                          {regPhotoFileName && (
                            <p className="text-[11px] font-mono text-[#006A4E] truncate flex items-center justify-center sm:justify-start gap-1 font-bold">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{regPhotoFileName}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                      <div className="sm:col-span-8 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'পূর্ণ নাম *' : 'Full Name *'}</label>
                        <input
                          type="text"
                          required
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="e.g. Tanvir Hossain"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-4 space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'রক্তের গ্রুপ *' : 'Blood Group *'}</label>
                        <select
                          value={regBloodGroup}
                          onChange={(e) => setRegBloodGroup(e.target.value as BloodGroup)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm font-black text-rose-700 focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        >
                          <option value="A+">A+ (Positive)</option>
                          <option value="A-">A- (Negative)</option>
                          <option value="B+">B+ (Positive)</option>
                          <option value="B-">B- (Negative)</option>
                          <option value="O+">O+ (Positive)</option>
                          <option value="O-">O- (Negative)</option>
                          <option value="AB+">AB+ (Positive)</option>
                          <option value="AB-">AB- (Negative)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'মোবাইল নম্বর *' : 'Mobile Number *'}</label>
                        <input
                          type="tel"
                          required
                          maxLength={11}
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                          placeholder="01XXXXXXXXX"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm font-mono focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                        <p className="text-[10px] text-slate-500 font-medium">
                          {isBn ? '১১ ডিজিটের মোবাইল নম্বর (যেমন: 018XXXXXXXX)' : '11-digit BD mobile number (e.g. 018XXXXXXXX)'}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'ইমেইল (ঐচ্ছিক)' : 'Email (Optional)'}</label>
                        <input
                          type="email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          placeholder="donor@example.com"
                          className="w-full px-4 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isBn ? '২. বর্তমান অবস্থান ও ঠিকানা' : '2. Location & Area'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'জেলা *' : 'District *'}</label>
                        <select
                          value={regDistrict}
                          onChange={(e) => {
                            setRegDistrict(e.target.value);
                            const ups = getUpazilasForDistrict(e.target.value);
                            setRegUpazila(ups[0] || 'Sadar');
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        >
                          {BANGLADESH_DISTRICTS.map(d => (
                            <option key={d.nameEn} value={d.nameEn}>
                              {d.nameEn} ({d.nameBn})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'উপজেলা / থানা *' : 'Upazila / Thana *'}</label>
                        <select
                          value={regUpazila}
                          onChange={(e) => setRegUpazila(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        >
                          {getUpazilasForDistrict(regDistrict).map(u => (
                            <option key={u} value={u}>{u}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'পাড়া / এলাকা *' : 'General Area *'}</label>
                        <input
                          type="text"
                          required
                          value={regArea}
                          onChange={(e) => setRegArea(e.target.value)}
                          placeholder="e.g. Fatehabad / College Road"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                        <span>{isBn ? 'বিস্তারিত আবাসিক ঠিকানা (গোপন রাখা হবে)' : 'Detailed Address (Protected & Private)'}</span>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">Private</span>
                      </label>
                      <input
                        type="text"
                        value={regDetailedAddress}
                        onChange={(e) => setRegDetailedAddress(e.target.value)}
                        placeholder="House #, Road #, Village..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Organization & Availability */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      {isBn ? '৩. সাংগঠনিক তথ্য ও প্রাপ্যতা' : '3. Organization & Availability'}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'সংগঠনের সাথে সম্পর্ক' : 'Organization Category'}</label>
                        <select
                          value={regOrgCategory}
                          onChange={(e) => setRegOrgCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        >
                          {donorCategories.map(cat => (
                            <option key={cat.id} value={cat.name.en}>
                              {cat.name.en} ({cat.name.bn})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'বর্তমান প্রাপ্যতা' : 'Availability Status'}</label>
                        <select
                          value={regAvailability}
                          onChange={(e) => setRegAvailability(e.target.value as DonorAvailabilityStatus)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        >
                          <option value="AVAILABLE_EMERGENCY">🟢 {isBn ? 'জরুরি প্রয়োজনে যেকোনো সময় প্রস্তুত' : 'Available for Emergency'}</option>
                          <option value="AVAILABLE_NOTICE">🟡 {isBn ? 'পূর্বে জানালে প্রস্তুত' : 'Available with Prior Notice'}</option>
                          <option value="UNAVAILABLE">🔴 {isBn ? 'সাময়িক বিরতিতে আছেন' : 'Temporarily Unavailable'}</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'পূর্বে মোট রক্তদান করেছেন' : 'Total Previous Donations'}</label>
                        <input
                          type="number"
                          min="0"
                          value={regTotalDonations}
                          onChange={(e) => setRegTotalDonations(Number(e.target.value))}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-800 flex items-center justify-between">
                          <span>{isBn ? 'সর্বশেষ রক্তদানের তারিখ' : 'Last Donation Date'}</span>
                          {regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0] && (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                              {isBn ? 'ভুল তারিখ' : 'Invalid Future Date'}
                            </span>
                          )}
                        </label>
                        <input
                          type="date"
                          max={new Date().toISOString().split('T')[0]}
                          value={regLastDonationDate}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRegLastDonationDate(val);
                            const today = new Date().toISOString().split('T')[0];
                            if (val > today) {
                              setRegFormError(
                                isBn
                                  ? 'সর্বশেষ রক্তদানের তারিখ আজকের বা অতীতের তারিখ হতে হবে, ভবিষ্যতের নয়।'
                                  : 'Last donation date cannot be in the future.'
                              );
                            } else if (regFormError?.includes('তারিখ') || regFormError?.includes('date')) {
                              setRegFormError(null);
                            }
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm transition-all focus:outline-none ${
                            regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0]
                              ? 'border-rose-500 bg-rose-50/60 text-rose-900 ring-2 ring-rose-300'
                              : 'border-[#EAE3D9] bg-[#FAF7F2] focus:bg-white focus:ring-2 focus:ring-[#006A4E]'
                          }`}
                        />
                        {regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0] ? (
                          <div className="p-2 rounded-xl bg-rose-100/90 border border-rose-300 text-rose-900 text-[11px] font-bold flex items-center gap-1.5 animate-in fade-in">
                            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                            <span>
                              {isBn
                                ? 'ভবিষ্যতের কোনো তারিখ রক্তদানের তারিখ হতে পারে না। অনুগ্রহ করে অতীতের বা আজকের সঠিক তারিখ দিন।'
                                : 'Future date cannot be a past blood donation date. Please select today or a past date.'}
                            </span>
                          </div>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-medium">
                            {isBn ? 'অতীতের যেকোনো রক্তদানের তারিখ দিন (ভবিষ্যতের তারিখ গ্রহণযোগ্য নয়)' : 'Must be today or a past date'}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-800">{isBn ? 'রক্তদানের অভিজ্ঞতা বা বিশেষ বার্তা' : 'Experience or Motivation'}</label>
                      <textarea
                        rows={2}
                        value={regExperienceNotes}
                        onChange={(e) => setRegExperienceNotes(e.target.value)}
                        placeholder="e.g. Regular voluntary blood donor..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs sm:text-sm focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Consent & Privacy Checkboxes */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-relaxed">
                      <input
                        type="checkbox"
                        required
                        checked={regConsent}
                        onChange={(e) => setRegConsent(e.target.checked)}
                        className="w-4 h-4 text-[#006A4E] rounded-md mt-0.5 focus:ring-[#006A4E]"
                      />
                      <span>
                        {tText(bloodDonationSettings.consentStatement) || (isBn
                          ? 'আমি স্বেচ্ছায় রক্তদাতা হিসেবে নিবন্ধিত হতে সম্মত এবং জরুরি প্রয়োজনে ইনফিনিটি বাংলাদেশ কর্তৃক রক্তদানের সমন্বয়ে তথ্য ব্যবহারে সম্মতি দিচ্ছি।'
                          : 'I agree to voluntary blood donor registration and consent to Team Infinity using my information for coordination.')}
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 leading-relaxed">
                      <input
                        type="checkbox"
                        checked={regShowPhone}
                        onChange={(e) => setRegShowPhone(e.target.checked)}
                        className="w-4 h-4 text-[#006A4E] rounded-md mt-0.5 focus:ring-[#006A4E]"
                      />
                      <span>
                        {isBn
                          ? 'রক্তগ্রহীতা যাতে সরাসরি আমার নম্বরে কল করতে পারেন, তার অনুমতি দিচ্ছি (বন্ধ রাখলে হেল্পলাইনের মাধ্যমে সমন্বয় করা হবে)।'
                          : 'Allow public users to view direct call button (if disabled, requests route through 24/7 Helpline).'}
                      </span>
                    </label>
                  </div>

                  {/* Prominent Error Banner */}
                  {regFormError && (
                    <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-900 text-xs sm:text-sm font-bold flex items-start gap-2.5 shadow-warm-xs animate-in fade-in">
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-extrabold text-rose-950">{isBn ? 'আবেদন জমাদানে ত্রুটি:' : 'Submission Error:'}</p>
                        <p className="font-medium text-rose-800 mt-0.5 leading-relaxed">{regFormError}</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={Boolean(regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0])}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-sm shadow-warm-md transition-all flex items-center justify-center gap-2 ${
                      regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0]
                        ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-80'
                        : 'bg-[#006A4E] hover:bg-[#00523C] text-white cursor-pointer transform hover:-translate-y-0.5'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {regLastDonationDate && regLastDonationDate > new Date().toISOString().split('T')[0]
                        ? (isBn ? 'ভবিষ্যতের তারিখ সংশোধন করুন' : 'Correct Future Date')
                        : (isBn ? 'রক্তদাতা আবেদন জমা দিন' : 'Submit Donor Registration')}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 3: EMERGENCY BLOOD REQUEST (FORM & LIVE BOARD) */}
        {/* ==================================================== */}
        {activeTab === 'emergency-request' && (
          <div className="space-y-10 animate-in fade-in">
            {/* Urgent Hotline Top Banner */}
            <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-rose-600 via-rose-700 to-rose-900 text-white shadow-warm-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                  <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white font-display">
                    {isBn ? 'তাৎক্ষণিক অতি-জরুরি রক্তের প্রয়োজন?' : 'Need Critical Emergency Blood Immediately?'}
                  </h3>
                  <p className="text-xs text-rose-100">
                    {isBn ? 'ইনফিনিটি বাংলাদেশ ২৪/৭ ইমার্জেন্সি ব্লাড হেল্পলাইনে সরাসরি কল করুন' : 'Call our 24/7 dedicated volunteer emergency helpline desk directly'}
                  </p>
                </div>
              </div>

              <a
                href={`tel:${bloodDonationSettings.emergencyHelpline}`}
                className="px-6 py-2.5 rounded-2xl bg-white text-rose-800 hover:bg-rose-50 font-extrabold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-rose-600" />
                <span>{bloodDonationSettings.emergencyHelpline}</span>
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Emergency Request Submission Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE3D9] shadow-warm-sm space-y-6">
                {emgSubmitted ? (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'জরুরি রক্তের আবেদন গৃহীত হয়েছে!' : 'Emergency Request Broadcasted!'}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isBn
                          ? 'আমাদের স্বেচ্ছাসেবক কো-অর্ডিনেটরগণ ম্যাচিং রক্তদাতাদের সাথে যোগাযোগ শুরু করেছেন।'
                          : 'Our voluntary team is actively coordinating matching available donors for this request.'}
                      </p>
                    </div>
                    <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] inline-block text-xs font-mono font-bold text-slate-700">
                      Req ID: <span className="text-rose-600">{emgRefId}</span>
                    </div>
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setEmgSubmitted(false)}
                        className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
                      >
                        {isBn ? 'নতুন আবেদন করুন' : 'Post Another Request'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="border-b border-slate-100 pb-3 space-y-0.5">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                        {isBn ? 'জরুরি রক্তের আবেদন ফরম' : 'Emergency Blood Request Form'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {isBn ? 'রোগীর সঠিক তথ্য ও হাসপাতালের বিবরণ প্রদান করুন' : 'Provide patient details and hospital location'}
                      </p>
                    </div>

                    <form onSubmit={handleEmergencyRequestSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'আবেদনকারীর নাম *' : 'Requester Name *'}</label>
                          <input
                            type="text"
                            required
                            value={emgRequesterName}
                            onChange={(e) => setEmgRequesterName(e.target.value)}
                            placeholder="e.g. Faruk Ahmed"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'যোগাযোগের মোবাইল নম্বর *' : 'Contact Phone *'}</label>
                          <input
                            type="tel"
                            required
                            maxLength={11}
                            value={emgContactNumber}
                            onChange={(e) => setEmgContactNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                            placeholder="01XXXXXXXXX"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-mono focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                          <p className="text-[10px] text-slate-500 font-medium">
                            {isBn ? '১১ ডিজিটের মোবাইল নম্বর' : '11-digit BD mobile number'}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                        <div className="sm:col-span-6 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'রোগীর নাম ও বয়স *' : 'Patient Name & Age *'}</label>
                          <input
                            type="text"
                            required
                            value={emgPatientName}
                            onChange={(e) => setEmgPatientName(e.target.value)}
                            placeholder="e.g. Rashedul Islam (Age 32)"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'প্রয়োজনীয় গ্রুপ *' : 'Blood Group *'}</label>
                          <select
                            value={emgBloodGroup}
                            onChange={(e) => setEmgBloodGroup(e.target.value as BloodGroup)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-black text-rose-700 focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          >
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                          </select>
                        </div>

                        <div className="sm:col-span-3 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'পরিমাণ (ব্যাগ) *' : 'Units (Bags) *'}</label>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            required
                            value={emgUnits}
                            onChange={(e) => setEmgUnits(Number(e.target.value))}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-bold focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        <div className="sm:col-span-1 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'জেলা *' : 'District *'}</label>
                          <select
                            value={emgDistrict}
                            onChange={(e) => {
                              setEmgDistrict(e.target.value);
                              const ups = getUpazilasForDistrict(e.target.value);
                              setEmgUpazila(ups[0] || 'Sadar');
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          >
                            {BANGLADESH_DISTRICTS.map(d => (
                              <option key={d.nameEn} value={d.nameEn}>{d.nameEn}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-1 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'উপজেলা / থানা *' : 'Upazila *'}</label>
                          <select
                            value={emgUpazila}
                            onChange={(e) => setEmgUpazila(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          >
                            {getUpazilasForDistrict(emgDistrict).map(u => (
                              <option key={u} value={u}>{u}</option>
                            ))}
                          </select>
                        </div>

                        <div className="sm:col-span-1 space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'জরুরিতা লেভেল *' : 'Urgency Level *'}</label>
                          <select
                            value={emgUrgency}
                            onChange={(e) => setEmgUrgency(e.target.value as EmergencyLevel)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs font-extrabold text-rose-700 focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          >
                            <option value="CRITICAL">🔴 Critical (তাৎক্ষণিক)</option>
                            <option value="URGENT">🟡 Urgent (আজকে)</option>
                            <option value="NORMAL">🟢 Normal (আগামীকাল/নির্ধারিত)</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'হাসপাতালের নাম *' : 'Hospital Name *'}</label>
                          <input
                            type="text"
                            required
                            value={emgHospital}
                            onChange={(e) => setEmgHospital(e.target.value)}
                            placeholder="e.g. CMCH / Parkview Hospital"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-xs font-bold text-slate-800">{isBn ? 'প্রয়োজনের তারিখ *' : 'Required Date *'}</label>
                          <input
                            type="date"
                            required
                            value={emgRequiredDate}
                            onChange={(e) => setEmgRequiredDate(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-slate-800">{isBn ? 'রোগীর বিবরণ / ওয়ার্ড / কেবিন নম্বর' : 'Ward / Bed / Notes'}</label>
                        <textarea
                          rows={2}
                          value={emgNotes}
                          onChange={(e) => setEmgNotes(e.target.value)}
                          placeholder="e.g. ICU Bed 12, surgery scheduled at 10 AM..."
                          className="w-full px-3.5 py-2 rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-xs focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Send className="w-4 h-4" />
                        <span>{isBn ? 'জরুরি আবেদন প্রচার করুন' : 'Broadcast Emergency Request'}</span>
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Right Column: Public Live Emergency Requests Board */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 font-display flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping" />
                    <span>{isBn ? 'লাইভ জরুরি রক্তের নোটিশ বোর্ড' : 'Live Emergency Board'}</span>
                  </h3>
                  <span className="text-xs font-bold text-slate-500">
                    {emergencyBloodRequests.length} {isBn ? 'টি আবেদন' : 'Requests'}
                  </span>
                </div>

                <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
                  {emergencyBloodRequests.map(req => {
                    const isPending = req.status === 'PENDING' || req.status === 'PROCESSING';
                    return (
                      <div
                        key={req.id}
                        className={`p-4 sm:p-5 rounded-3xl border transition-all space-y-3 ${
                          req.emergencyLevel === 'CRITICAL'
                            ? 'bg-rose-50/80 border-rose-200'
                            : 'bg-white border-[#EAE3D9]'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-base font-black text-rose-700 font-display">
                                {req.bloodGroup}
                              </span>
                              <span className="text-xs font-bold text-slate-700">
                                ({req.unitsNeeded} {isBn ? 'ব্যাগ প্রয়োজন' : 'Units Needed'})
                              </span>
                              <span
                                className={`px-2 py-0.2 rounded-md text-[10px] font-extrabold uppercase ${
                                  req.emergencyLevel === 'CRITICAL'
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-amber-100 text-amber-900'
                                }`}
                              >
                                {req.emergencyLevel}
                              </span>
                            </div>

                            <p className="text-xs font-extrabold text-slate-900">
                              {req.patientName}
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              req.status === 'FULFILLED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : req.status === 'PROCESSING'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {req.status}
                          </span>
                        </div>

                        <div className="text-xs text-slate-600 space-y-1">
                          <p className="flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-bold">{req.hospitalName}</span>
                          </p>
                          <p className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{req.upazila}, {req.district}</span>
                            <span className="text-slate-400">&bull; {req.requiredDate}</span>
                          </p>
                        </div>

                        {req.additionalNotes && (
                          <p className="text-[11px] text-slate-600 italic bg-white/70 p-2 rounded-xl border border-slate-100">
                            "{req.additionalNotes}"
                          </p>
                        )}

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-medium">
                            {isBn ? 'রক্ত দিতে আগ্রহী?' : 'Can you donate?'}
                          </span>
                          <a
                            href={`tel:${req.contactNumber}`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-xs transition-all"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{isBn ? 'সরাসরি কল করুন' : 'Call Contact'}</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 4: OUR DONORS DIRECTORY */}
        {/* ==================================================== */}
        {activeTab === 'donors' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                  {isBn ? 'আমাদের স্বেচ্ছাসেবী রক্তদাতাবৃন্দ' : 'Verified Voluntary Donors Directory'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  {isBn ? 'মানবতার সেবায় আত্মনিবেদিত টিম ইনফিনিটির গর্বিত রক্তযোদ্ধারা' : 'Proud blood donors standing united for humanity across Bangladesh'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('become-donor')}
                className="px-5 py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{isBn ? 'রক্তদাতা হিসেবে যুক্ত হন' : 'Join as a Donor'}</span>
              </button>
            </div>

            {/* Donor Table/Card Roster */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredDonors.map(donor => (
                <div
                  key={donor.id}
                  className="p-5 rounded-3xl bg-white border border-[#EAE3D9] shadow-warm-xs hover:shadow-warm-sm transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden bg-emerald-950 border border-[#EAE3D9] shrink-0">
                          {donor.photoUrl ? (
                            <img
                              src={getAssetUrl(donor.photoUrl)}
                              alt={donor.fullName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white text-base font-extrabold font-display bg-emerald-900">
                              {donor.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-extrabold text-slate-900 font-display truncate">
                            {donor.fullName}
                          </h4>
                          <span className="text-[11px] font-bold text-emerald-700 block truncate">
                            {donor.orgCategory}
                          </span>
                        </div>
                      </div>

                      <span className="px-2.5 py-1 rounded-xl bg-rose-600 text-white font-black text-xs font-display shrink-0">
                        {donor.bloodGroup}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1.5">
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{donor.area}, {donor.upazila}, {donor.district}</span>
                      </p>

                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span className="font-bold text-slate-500">
                          {isBn ? `মোট রক্তদান: ${donor.totalDonations} বার` : `Total: ${donor.totalDonations} times`}
                        </span>
                        {donor.isVerified && (
                          <span className="text-emerald-700 font-bold flex items-center gap-0.5">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{isBn ? 'যাচাইকৃত' : 'Verified'}</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedDonorForProfile(donor)}
                      className="flex-1 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE3D9] text-slate-800 font-bold text-xs border border-[#EAE3D9] transition-colors text-center cursor-pointer"
                    >
                      {isBn ? 'বিস্তারিত প্রোফাইল' : 'Full Profile'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedDonorForContact(donor)}
                      className="py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs transition-colors cursor-pointer"
                      title="Contact Donor"
                    >
                      <Phone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 5: BLOOD DONATION STATISTICS */}
        {/* ==================================================== */}
        {activeTab === 'statistics' && (
          <div className="space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                {isBn ? 'রক্তদান নেটওয়ার্ক পরিসংখ্যান' : 'Blood Donation Network Statistics'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isBn ? 'লাইভ ডাটাবেজ থেকে স্বয়ংক্রিয়ভাবে পরিগণিত রক্তদানের পরিসংখ্যান' : 'Dynamic verified statistics computed in real-time from our central database'}
              </p>
            </div>

            {/* 8 Blood Groups Distribution Grid */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider">
                {isBn ? 'রক্তের গ্রুপভিত্তিক রক্তদাতা বণ্টন' : 'Blood Group Donor Distribution'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'] as BloodGroup[]).map(bg => {
                  const count = stats.groupCounts[bg] || 0;
                  const percentage = stats.totalDonors > 0 ? Math.round((count / stats.totalDonors) * 100) : 0;
                  return (
                    <div
                      key={bg}
                      className="p-5 rounded-3xl bg-white border border-[#EAE3D9] shadow-warm-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="w-10 h-10 rounded-2xl bg-rose-600 text-white font-black text-sm font-display flex items-center justify-center shadow-xs">
                          {bg}
                        </span>
                        <span className="text-xs font-bold text-slate-400">
                          {percentage}%
                        </span>
                      </div>

                      <div>
                        <p className="text-2xl font-extrabold text-slate-900 font-display">
                          {count}
                        </p>
                        <p className="text-[11px] font-bold text-slate-500">
                          {isBn ? 'নিবন্ধিত রক্তদাতা' : 'Registered Donors'}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#006A4E] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, Math.max(5, percentage))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Network Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-[#E6F3EF] border border-[#C2E2D7] space-y-2">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  {isBn ? 'মোট সফল রক্তদান' : 'Total Successful Donations'}
                </p>
                <p className="text-3xl font-extrabold text-[#006A4E] font-display">
                  {stats.totalDonations} {isBn ? 'ব্যাগ' : 'Bags'}
                </p>
                <p className="text-xs text-emerald-900">
                  {isBn ? 'হাসপাতালে রোগীর সংকটকালীন মুহূর্তে প্রদত্ত' : 'Delivered directly to critical emergency cases'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-amber-50 border border-amber-200 space-y-2">
                <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                  {isBn ? 'সক্রিয় জরুরি আবেদন' : 'Active Emergency Requests'}
                </p>
                <p className="text-3xl font-extrabold text-amber-700 font-display">
                  {stats.activeEmergencyRequests}
                </p>
                <p className="text-xs text-amber-900">
                  {isBn ? 'কো-অর্ডিনেটরগণ সরাসরি পর্যবেক্ষণ করছেন' : 'Currently being coordinated by volunteer desk'}
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-rose-50 border border-rose-200 space-y-2">
                <p className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  {isBn ? 'জরুরি রক্তদানে প্রস্তুত' : 'Immediate Emergency Readiness'}
                </p>
                <p className="text-3xl font-extrabold text-rose-600 font-display">
                  {stats.activeDonors} {isBn ? 'জন' : 'Donors'}
                </p>
                <p className="text-xs text-rose-900">
                  {isBn ? 'তাৎক্ষণিক হাসপাতালে পৌঁছাতে প্রস্তুত' : 'Available within minimum response window'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* TAB 6: GUIDELINES & SAFETY TIPS */}
        {/* ==================================================== */}
        {activeTab === 'guidelines' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-2xl font-extrabold text-slate-900 font-display">
                {tText(bloodDonationSettings.guidelinesTitle) || (isBn ? 'রক্তদানের সাধারণ নিয়মাবলী ও স্বাস্থ্য তথ্য' : 'Blood Donation Guidelines & Health Safety')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                {isBn ? 'একজন সুস্থ মানুষ নিরাপদে রক্তদানের জন্য যে বিষয়গুলো জানা জরুরি' : 'Essential medical criteria and tips for safe voluntary blood donation'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Eligibility Criteria */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE3D9] shadow-warm-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#006A4E] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  {isBn ? 'রক্তদানের প্রাথমিক যোগ্যতা' : 'Basic Donor Eligibility'}
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <span>{isBn ? 'বয়স: ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে।' : 'Age between 18 and 60 years.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <span>{isBn ? 'ওজন: পুরুষদের ক্ষেত্রে ন্যূনতম ৫০ কেজি, নারীদের ৪৫ কেজি।' : 'Weight: Minimum 50kg for males, 45kg for females.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <span>{isBn ? 'ব্যবধান: পূর্ববর্তী রক্তদানের পর কমপক্ষে ৩-৪ মাস অতিক্রান্ত হতে হবে।' : 'Interval: At least 90-120 days since last donation.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <span>{isBn ? 'হিমোগ্লোবিন: স্বাভাবিক মাত্রা (পুরুষ ১২.৫+, নারী ১২.০+) বজায় থাকতে হবে।' : 'Hemoglobin: Within standard clinical thresholds.'}</span>
                  </li>
                </ul>
              </div>

              {/* Before Donation */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE3D9] shadow-warm-xs space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 font-display">
                  {isBn ? 'রক্তদানের পূর্বে ও পরের করণীয়' : 'Preparation & Post-Donation'}
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isBn ? 'রক্তদানের পূর্বে পর্যাপ্ত পানি ও পুষ্টিকর খাবার গ্রহণ করুন, খালি পেটে রক্তদান করবেন না।' : 'Drink plenty of water and eat a healthy meal prior to donation.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isBn ? 'পূর্ববর্তী রাতে কমপক্ষে ৬-৮ ঘণ্টা ভালো ঘুম নিশ্চিত করুন।' : 'Ensure 6-8 hours of sound sleep the night before.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isBn ? 'রক্তদানের পর ১০-১৫ মিনিট বিশ্রাম নিন এবং পর্যাপ্ত তরল পান করুন।' : 'Rest for 10-15 minutes and take fluids immediately after.'}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isBn ? 'রক্তদানের দিন ভারী শারীরিক ব্যায়াম বা পরিশ্রম থেকে বিরত থাকুন।' : 'Avoid heavy physical lifting for the remainder of the day.'}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Profile Detail Modal */}
      {selectedDonorForProfile && (
        <BloodDonorProfileModal
          isOpen={Boolean(selectedDonorForProfile)}
          donor={selectedDonorForProfile}
          onClose={() => setSelectedDonorForProfile(null)}
          onContactClick={(donor) => {
            setSelectedDonorForProfile(null);
            setSelectedDonorForContact(donor);
          }}
        />
      )}

      {/* Contact / Helpline Modal */}
      {selectedDonorForContact && (
        <EmergencyBloodContactModal
          isOpen={Boolean(selectedDonorForContact)}
          donor={selectedDonorForContact}
          emergencyHelpline={bloodDonationSettings.emergencyHelpline}
          onClose={() => setSelectedDonorForContact(null)}
          onOpenEmergencyRequest={() => {
            setSelectedDonorForContact(null);
            setActiveTab('emergency-request');
          }}
        />
      )}
    </div>
  );
};
