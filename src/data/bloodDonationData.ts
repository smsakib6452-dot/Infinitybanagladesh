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
  wingLogoUrl: '/brand/Infinitylifeline-logo.svg',
  wingLogoSize: 480,
  wingLogoZoom: 1,
  wingLogoCrop: 'contain',
  heroBadge: {
    en: 'Emergency Blood Donation & Coordination',
    bn: 'জরুরি রক্তদান ও সমন্বয় নেটওয়ার্ক'
  },
  heroTitle: {
    en: 'Blood Donation Network',
    bn: 'রক্তদান নেটওয়ার্ক'
  },
  heroSubtitle: {
    en: 'A blood donation initiative by Infinity Bangladesh',
    bn: 'ইনফিনিটি বাংলাদেশ-এর একটি মানবিক রক্তদান উদ্যোগ'
  },
  heroCtaBadge: {
    en: 'JOIN THE CAUSE',
    bn: 'মানবতার আহ্বান'
  },
  heroCtaTitle: {
    en: 'Be a Donor, Be a Hero',
    bn: 'রক্তদাতা হোন, জীবন বাঁচান'
  },
  heroCtaDescription: {
    en: 'Every drop counts. Register as a voluntary blood donor with Team Infinity and become someone’s lifeline in moments of crisis.',
    bn: 'আপনার এক ব্যাগ রক্ত বাঁচাতে পারে একটি মূল্যবান প্রাণ। টিম ইনফিনিটির সাথে রক্তদাতা হিসেবে যুক্ত হতে এখনই রেজিস্ট্রেশন করুন।'
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
 * Initial Seed Blood Donors (Real donor records added by admin)
 */
export const INITIAL_BLOOD_DONORS: BloodDonor[] = [];

/**
 * Initial Active Emergency Blood Requests (Real requests submitted via form or admin)
 */
export const INITIAL_EMERGENCY_REQUESTS: EmergencyBloodRequest[] = [];

