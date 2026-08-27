import {
  BloodDonor,
  EmergencyBloodRequest,
  BloodDonationSettings,
  DonorCategoryOption
} from '../types';

/**
 * Common Upazilas / Thanas for Chattogram and major divisions
 */
export const CHATTOGRAM_UPAZILAS = [
  'Hathazari',
  'Raozan',
  'Fatikchhari',
  'Sitakunda',
  'Mirsharai',
  'Boalkhali',
  'Patiya',
  'Anwara',
  'Chandanaish',
  'Satkania',
  'Lohagara',
  'Banshkhali',
  'Karnafuli',
  'Rangunia',
  'Sandwip',
  'Panchlaish (City)',
  'Kotwali (City)',
  'Khulshi (City)',
  'Halishahar (City)',
  'Agrabad / Double Mooring',
  'Bayezid (City)',
  'Bakalia (City)',
  'Chandgaon (City)',
  'Chawkbazar (City)',
  'Pahartali (City)',
  'Patenga (City)'
];

export const DHAKA_UPAZILAS = [
  'Dhanmondi',
  'Mirpur',
  'Mohammadpur',
  'Gulshan',
  'Banani',
  'Uttara',
  'Motijheel',
  'Shahbagh',
  'Badda',
  'Tejgaon',
  'Savar',
  'Dhamrai',
  'Keraniganj'
];

/**
 * Helper to get available upazilas by district
 */
export function getUpazilasForDistrict(districtName: string): string[] {
  const norm = (districtName || '').toLowerCase().trim();
  if (norm === 'chattogram' || norm === 'chittagong') {
    return CHATTOGRAM_UPAZILAS;
  }
  if (norm === 'dhaka') {
    return DHAKA_UPAZILAS;
  }
  return [
    'Sadar / Central',
    'North Upazila',
    'South Upazila',
    'East Upazila',
    'West Upazila'
  ];
}

/**
 * Predefined Organization Categories for Blood Donors
 */
export const DEFAULT_DONOR_CATEGORIES: DonorCategoryOption[] = [
  {
    id: 'cat-vol',
    name: {
      en: 'Infinity Bangladesh Volunteer',
      bn: 'ইনফিনিটি বাংলাদেশ ভলান্টিয়ার'
    },
    badgeColor: '#006A4E',
    displayOrder: 1,
    isDefault: true
  },
  {
    id: 'cat-exec',
    name: {
      en: 'Executive Committee',
      bn: 'কার্যনির্বাহী পরিষদ'
    },
    badgeColor: '#D97706',
    displayOrder: 2,
    isDefault: true
  },
  {
    id: 'cat-work',
    name: {
      en: 'Working Committee',
      bn: 'কর্মপরিষদ ও শাখা কমিটি'
    },
    badgeColor: '#0284C7',
    displayOrder: 3,
    isDefault: true
  },
  {
    id: 'cat-perm',
    name: {
      en: 'Permanent Committee',
      bn: 'স্থায়ী কমিটি ও উপদেষ্টা'
    },
    badgeColor: '#7C3AED',
    displayOrder: 4,
    isDefault: true
  },
  {
    id: 'cat-former',
    name: {
      en: 'Former Member / Volunteer',
      bn: 'প্রাক্তন সদস্য ও শুভানুধ্যায়ী'
    },
    badgeColor: '#475569',
    displayOrder: 5,
    isDefault: true
  },
  {
    id: 'cat-ext',
    name: {
      en: 'External Blood Donor',
      bn: 'বহিরাগত স্বেচ্ছাসেবী রক্তদাতা'
    },
    badgeColor: '#E11D48',
    displayOrder: 6,
    isDefault: true
  }
];

/**
 * Initial Default Blood Donation Settings
 */
export const INITIAL_BLOOD_SETTINGS: BloodDonationSettings = {
  wingLogoUrl: '/brand/Infinitylifeline-logo.png',
  heroBadge: {
    en: 'An Initiative by Infinity Bangladesh',
    bn: 'ইনফিনিটি বাংলাদেশ-এর একটি মানবিক উদ্যোগ'
  },
  heroTitle: {
    en: 'Blood Donation Network',
    bn: 'রক্তদান নেটওয়ার্ক'
  },
  heroSubtitle: {
    en: 'Connecting voluntary blood donors across Bangladesh to serve emergency patients with speed, verified trust, and compassion.',
    bn: 'জরুরি রোগীদের পাশে দ্রুত, বিশ্বস্ত ও মানবিক সহায়তায় সারা বাংলাদেশের স্বেচ্ছাসেবী রক্তদাতাদের মেলবন্ধন।'
  },
  heroCtaBadge: {
    en: 'JOIN THE CAUSE',
    bn: 'মানবতার আহ্বান'
  },
  heroCtaTitle: {
    en: 'Be a Lifesaver',
    bn: 'জীবন বাঁচাতে এগিয়ে আসুন'
  },
  heroCtaDescription: {
    en: 'Every drop counts. Register as a voluntary blood donor with Infinity LifeLine and become someone’s lifeline in moments of crisis.',
    bn: 'আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মূল্যবান প্রাণ। ইনফিনিটি লাইফলাইন নেটওয়ার্কে রক্তদাতা হিসেবে যুক্ত হতে এখনই রেজিস্ট্রেশন করুন।'
  },
  heroCtaBtn1Text: {
    en: 'Become a Donor',
    bn: 'রক্তদাতা হতে রেজিস্ট্রেশন করুন'
  },
  heroCtaBtn2Text: {
    en: 'Emergency Blood Request',
    bn: 'জরুরি রক্তের আবেদন করুন'
  },
  statTotalDonorsLabel: {
    en: 'Total Donors',
    bn: 'নিবন্ধিত রক্তদাতা'
  },
  statActiveDonorsLabel: {
    en: 'Active Donors',
    bn: 'জরুরিতে প্রস্তুত'
  },
  statGroupsLabel: {
    en: 'Blood Groups',
    bn: 'সকল ব্লাড গ্রুপ'
  },
  statGroupsValue: '8/8',
  statImpactLabel: {
    en: 'Lives Impacted',
    bn: 'মোট রক্তদান সম্পন্ন'
  },
  statTotalDonorsOverride: null,
  statActiveDonorsOverride: null,
  statImpactOverride: null,
  emergencyHelpline: '+880 1839-008339',
  helplineLabel: {
    en: '24/7 Helpline:',
    bn: '২৪/৭ ব্লাড হেল্পলাইন:'
  },
  coordinationEmail: 'blood@infinitybangladesh.org',
  guidelinesTitle: {
    en: 'Blood Donation Guidelines & Eligibility',
    bn: 'রক্তদানের সাধারণ নিয়মাবলী ও যোগ্যতা'
  },
  guidelinesText: {
    en: 'Age must be between 18 and 60 years. Minimum body weight: 45 kg for females and 50 kg for males. Minimum interval between whole blood donations is 90 to 120 days (3-4 months). Blood pressure, pulse, and hemoglobin levels must be within normal clinical ranges.',
    bn: 'বয়স ন্যূনতম ১৮ থেকে ৬০ বছরের মধ্যে হতে হবে। শারীরিক ওজন মহিলাদের ক্ষেত্রে কমপক্ষে ৪৫ কেজি এবং পুরুষদের ক্ষেত্রে ৫০ কেজি হওয়া আবশ্যক। প্রতি ৩ থেকে ৪ মাস পর পর একজন সুস্থ মানুষ নিরাপদে রক্তদান করতে পারেন।'
  },
  consentStatement: {
    en: 'I agree to the appropriate use of my provided information for emergency blood donation and coordination by Infinity Bangladesh.',
    bn: 'আমি স্বেচ্ছায় রক্তদাতা হিসেবে রেজিস্ট্রেশন করছি এবং জরুরি প্রয়োজনে ইনফিনিটি বাংলাদেশ কর্তৃক যোগাযোগের জন্য তথ্যের ব্যবহারে সম্মতি প্রদান করছি।'
  },
  enablePublicDirectContact: true
};

/**
 * Initial Seed Blood Donors (covering all 8 blood groups with realistic verified data)
 */
export const INITIAL_BLOOD_DONORS: BloodDonor[] = [
  {
    id: 'donor-1',
    fullName: 'Shadman Sakib',
    bloodGroup: 'O+',
    phone: '+880 1839-008339',
    email: 'sakib@infinitybangladesh.org',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Hathazari',
    area: 'Fatehabad / College Road',
    detailedAddress: 'Fatehabad, Hathazari, Chattogram',
    orgCategory: 'Executive Committee',
    committeePosition: 'Founding Member & Central Executive',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2018-04-12',
    lastDonationDate: '2025-11-20',
    totalDonations: 8,
    experienceNotes: 'Regular voluntary donor since 2018. Actively coordinates emergency thalassemia patients and disaster relief donations.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: true,
    donationHistory: [
      {
        id: 'hist-1-1',
        donorId: 'donor-1',
        donationDate: '2025-11-20',
        hospital: 'Chattogram Medical College Hospital (CMCH)',
        district: 'Chattogram',
        donationType: 'EMERGENCY',
        recipientReference: 'Accident Emergency Patient',
        notes: '1 Unit whole blood provided urgently at ICU.',
        isVerified: true
      },
      {
        id: 'hist-1-2',
        donorId: 'donor-1',
        donationDate: '2025-06-15',
        hospital: 'Hathazari Upazila Health Complex',
        district: 'Chattogram',
        donationType: 'VOLUNTARY',
        recipientReference: 'Maternity Case',
        notes: 'Safe delivery support blood donation.',
        isVerified: true
      }
    ],
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2026-02-15T12:00:00Z'
  },
  {
    id: 'donor-2',
    fullName: 'Tanvir Hossain Chowdhury',
    bloodGroup: 'A+',
    phone: '+880 1812-445566',
    email: 'tanvir@infinitybangladesh.org',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Hathazari',
    area: 'Hathazari Sadar / Bus Stand',
    detailedAddress: 'Near Hathazari Govt College, Hathazari',
    orgCategory: 'Infinity Bangladesh Volunteer',
    committeePosition: 'Field Volunteer Coordinator',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2020-02-14',
    lastDonationDate: '2025-12-05',
    totalDonations: 6,
    experienceNotes: 'Passionate youth volunteer. Donates every 4 months consistently.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [
      {
        id: 'hist-2-1',
        donorId: 'donor-2',
        donationDate: '2025-12-05',
        hospital: 'Parkview Hospital, Chattogram',
        district: 'Chattogram',
        donationType: 'VOLUNTARY',
        recipientReference: 'Thalassemia Child',
        notes: 'Regular scheduled thalassemia transfusion.',
        isVerified: true
      }
    ],
    createdAt: '2025-02-01T11:00:00Z',
    updatedAt: '2026-01-20T10:00:00Z'
  },
  {
    id: 'donor-3',
    fullName: 'Nusrat Jahan Mim',
    bloodGroup: 'B+',
    phone: '+880 1711-998877',
    email: 'nusrat@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Panchlaish (City)',
    area: 'Probortok / Medical Gate',
    detailedAddress: 'Probortok Circle, Panchlaish, Chattogram',
    orgCategory: 'Working Committee',
    committeePosition: 'Medical Welfare Secretary',
    availabilityStatus: 'AVAILABLE_NOTICE',
    firstDonationDate: '2021-08-10',
    lastDonationDate: '2025-10-18',
    totalDonations: 5,
    experienceNotes: 'Available with 12 hours prior notice. Regular donor for pediatric emergencies.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [
      {
        id: 'hist-3-1',
        donorId: 'donor-3',
        donationDate: '2025-10-18',
        hospital: 'Chattogram Maa-O-Shishu Hospital',
        district: 'Chattogram',
        donationType: 'EMERGENCY',
        notes: 'Pediatric urgent surgery support.',
        isVerified: true
      }
    ],
    createdAt: '2025-03-12T09:00:00Z',
    updatedAt: '2026-01-15T08:30:00Z'
  },
  {
    id: 'donor-4',
    fullName: 'Mahfuzur Rahman',
    bloodGroup: 'AB+',
    phone: '+880 1822-334455',
    email: 'mahfuz@infinitybangladesh.org',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Raozan',
    area: 'Pahartali / CUET Gate',
    detailedAddress: 'Near CUET Gate, Raozan',
    orgCategory: 'Infinity Bangladesh Volunteer',
    committeePosition: 'Campus Ambassador',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2022-01-05',
    lastDonationDate: '2025-11-10',
    totalDonations: 4,
    experienceNotes: 'Universal plasma donor. Ready for urgent hospital calls.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: true,
    donationHistory: [],
    createdAt: '2025-04-05T14:00:00Z',
    updatedAt: '2026-02-01T10:00:00Z'
  },
  {
    id: 'donor-5',
    fullName: 'Kazi Farhan Ahmed',
    bloodGroup: 'O-',
    phone: '+880 1911-223344',
    email: 'kazi.farhan@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Kotwali (City)',
    area: 'Anderkilla / Jamalkhan',
    detailedAddress: 'Jamalkhan Road, Kotwali, Chattogram',
    orgCategory: 'Permanent Committee',
    committeePosition: 'Honorary Advisor',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2016-03-20',
    lastDonationDate: '2025-09-12',
    totalDonations: 14,
    experienceNotes: 'Rare O- Negative Universal Red Cell Donor. Dedicated voluntary donor for critical ICU transfusions.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [
      {
        id: 'hist-5-1',
        donorId: 'donor-5',
        donationDate: '2025-09-12',
        hospital: 'National Hospital, Chattogram',
        district: 'Chattogram',
        donationType: 'EMERGENCY',
        notes: 'Critical emergency cardiac bypass surgery support.',
        isVerified: true
      }
    ],
    createdAt: '2025-01-05T08:00:00Z',
    updatedAt: '2026-02-10T11:00:00Z'
  },
  {
    id: 'donor-6',
    fullName: 'Rezaul Karim Rimon',
    bloodGroup: 'A-',
    phone: '+880 1855-667788',
    email: 'rezaul@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Sitakunda',
    area: 'Kumira / Bhatiary',
    detailedAddress: 'Kumira, Sitakunda, Chattogram',
    orgCategory: 'External Blood Donor',
    availabilityStatus: 'AVAILABLE_NOTICE',
    firstDonationDate: '2021-05-18',
    lastDonationDate: '2025-08-30',
    totalDonations: 5,
    experienceNotes: 'Rare Negative group voluntary donor. Available on weekends and prior notice.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: true,
    donationHistory: [],
    createdAt: '2025-05-10T12:00:00Z',
    updatedAt: '2026-01-28T09:00:00Z'
  },
  {
    id: 'donor-7',
    fullName: 'Jannatul Ferdous',
    bloodGroup: 'B-',
    phone: '+880 1733-445566',
    email: 'jannat@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    area: 'Road 27 / Rangs Plaza',
    detailedAddress: 'Dhanmondi, Dhaka',
    orgCategory: 'Former Member / Volunteer',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2022-09-10',
    lastDonationDate: '2025-12-12',
    totalDonations: 4,
    experienceNotes: 'Rare B- donor based in central Dhaka. Fast responder for maternal care.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [
      {
        id: 'hist-7-1',
        donorId: 'donor-7',
        donationDate: '2025-12-12',
        hospital: 'Dhaka Medical College Hospital (DMCH)',
        district: 'Dhaka',
        donationType: 'EMERGENCY',
        notes: 'Emergency platelet transfusion.',
        isVerified: true
      }
    ],
    createdAt: '2025-06-01T15:00:00Z',
    updatedAt: '2026-01-05T16:00:00Z'
  },
  {
    id: 'donor-8',
    fullName: 'Abdullah Al Mamun',
    bloodGroup: 'AB-',
    phone: '+880 1866-778899',
    email: 'mamun@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Hathazari',
    area: 'Nazirhat / Katirhat',
    detailedAddress: 'Nazirhat, Hathazari',
    orgCategory: 'Infinity Bangladesh Volunteer',
    committeePosition: 'Disaster Emergency Volunteer',
    availabilityStatus: 'AVAILABLE_EMERGENCY',
    firstDonationDate: '2023-01-15',
    lastDonationDate: '2025-11-28',
    totalDonations: 3,
    experienceNotes: 'Extremely rare AB- donor. Coordinates blood drives in North Chattogram.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: true,
    donationHistory: [],
    createdAt: '2025-06-20T10:30:00Z',
    updatedAt: '2026-02-18T14:20:00Z'
  },
  {
    id: 'donor-9',
    fullName: 'Shahriar Kabir',
    bloodGroup: 'O+',
    phone: '+880 1877-112233',
    email: 'shahriar@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Fatikchhari',
    area: 'Bibifatema / Sadar',
    detailedAddress: 'Fatikchhari, Chattogram',
    orgCategory: 'External Blood Donor',
    availabilityStatus: 'AVAILABLE_NOTICE',
    firstDonationDate: '2020-11-05',
    lastDonationDate: '2025-07-20',
    totalDonations: 7,
    experienceNotes: 'Regular volunteer blood donor. Available in Fatikchhari and Hathazari radius.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [],
    createdAt: '2025-07-01T11:00:00Z',
    updatedAt: '2026-01-10T10:00:00Z'
  },
  {
    id: 'donor-10',
    fullName: 'Sadia Sultana',
    bloodGroup: 'A+',
    phone: '+880 1799-223344',
    email: 'sadia@gmail.com',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    district: 'Chattogram',
    upazila: 'Chawkbazar (City)',
    area: 'Chawkbazar / Parade Corner',
    detailedAddress: 'Chawkbazar, Chattogram',
    orgCategory: 'Infinity Bangladesh Volunteer',
    committeePosition: 'Student Wing Volunteer',
    availabilityStatus: 'UNAVAILABLE',
    firstDonationDate: '2024-03-10',
    lastDonationDate: '2026-02-15',
    totalDonations: 3,
    experienceNotes: 'Recently donated in February 2026. Available again from May 2026.',
    isVerified: true,
    approvalStatus: 'APPROVED',
    privacyConsent: true,
    showPhonePublicly: false,
    donationHistory: [
      {
        id: 'hist-10-1',
        donorId: 'donor-10',
        donationDate: '2026-02-15',
        hospital: 'CSCR Hospital, Chattogram',
        district: 'Chattogram',
        donationType: 'EMERGENCY',
        notes: 'Urgent cancer chemotherapy transfusion.',
        isVerified: true
      }
    ],
    createdAt: '2025-08-15T09:00:00Z',
    updatedAt: '2026-02-16T12:00:00Z'
  }
];

/**
 * Initial Active Emergency Blood Requests
 */
export const INITIAL_EMERGENCY_REQUESTS: EmergencyBloodRequest[] = [
  {
    id: 'req-1',
    requesterName: 'Mohammad Faruk',
    contactNumber: '+880 1819-887766',
    patientName: 'Rashedul Islam (Age 34)',
    bloodGroup: 'O+',
    unitsNeeded: 2,
    hospitalName: 'Chattogram Medical College Hospital (CMCH)',
    district: 'Chattogram',
    upazila: 'Panchlaish (City)',
    emergencyLevel: 'CRITICAL',
    requiredDate: '2026-08-28',
    additionalNotes: 'Urgent blood needed for emergency surgery following road accident. Patient in ICU Bed 14.',
    status: 'PENDING',
    matchedDonorIds: ['donor-1', 'donor-9'],
    createdAt: '2026-08-27T08:30:00Z',
    updatedAt: '2026-08-27T08:30:00Z'
  },
  {
    id: 'req-2',
    requesterName: 'Abul Kalam',
    contactNumber: '+880 1712-334455',
    patientName: 'Baby Tahmina (Age 6)',
    bloodGroup: 'A-',
    unitsNeeded: 1,
    hospitalName: 'Chattogram Maa-O-Shishu Hospital',
    district: 'Chattogram',
    upazila: 'Agrabad / Double Mooring',
    emergencyLevel: 'URGENT',
    requiredDate: '2026-08-29',
    additionalNotes: 'Thalassemia routine monthly blood transfusion. Fresh washed red blood cells requested.',
    status: 'PROCESSING',
    matchedDonorIds: ['donor-6'],
    createdAt: '2026-08-26T14:15:00Z',
    updatedAt: '2026-08-27T09:00:00Z'
  }
];
