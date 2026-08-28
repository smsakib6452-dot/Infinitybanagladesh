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
 * Cooldown period in days between blood donations (120 days = 4 months)
 */
export const BLOOD_DONATION_COOLDOWN_DAYS = 120;

/**
 * Calculate blood donation eligibility based on 120 days interval
 */
export function isEligibleToDonate(lastDonationDate?: string): {
  eligible: boolean;
  daysRemaining: number;
  daysPassed: number | null;
  nextEligibleDateStr: string | null;
} {
  if (!lastDonationDate) {
    return {
      eligible: true,
      daysRemaining: 0,
      daysPassed: null,
      nextEligibleDateStr: null
    };
  }

  const lastDate = new Date(lastDonationDate);
  if (isNaN(lastDate.getTime())) {
    return {
      eligible: true,
      daysRemaining: 0,
      daysPassed: null,
      nextEligibleDateStr: null
    };
  }

  const today = new Date();
  const diffTime = today.getTime() - lastDate.getTime();
  const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const nextDate = new Date(lastDate);
  nextDate.setDate(nextDate.getDate() + BLOOD_DONATION_COOLDOWN_DAYS);
  const nextEligibleDateStr = nextDate.toISOString().split('T')[0];

  if (daysPassed >= BLOOD_DONATION_COOLDOWN_DAYS) {
    return {
      eligible: true,
      daysRemaining: 0,
      daysPassed,
      nextEligibleDateStr
    };
  }

  const daysRemaining = Math.max(0, BLOOD_DONATION_COOLDOWN_DAYS - daysPassed);
  return {
    eligible: false,
    daysRemaining,
    daysPassed: Math.max(0, daysPassed),
    nextEligibleDateStr
  };
}

/**
 * Format donation cooldown text for UI badges and banners
 */
export function getCooldownStatusInfo(lastDonationDate?: string, isBn: boolean = true) {
  const result = isEligibleToDonate(lastDonationDate);

  if (!lastDonationDate || result.daysPassed === null) {
    return {
      isEligible: true,
      badgeText: isBn ? 'রক্তদানে প্রস্তুত' : 'Eligible to Donate',
      badgeColorClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: isBn
        ? 'পূর্ববর্তী রক্তদানের কোনো রেকর্ড নেই, আপনি রক্তদানের জন্য সম্পূর্ণ প্রস্তুত।'
        : 'No previous donation record found. You are eligible to donate.'
    };
  }

  if (result.eligible) {
    return {
      isEligible: true,
      daysPassed: result.daysPassed,
      badgeText: isBn ? 'রক্তদানে সম্পূর্ণ প্রস্তুত' : 'Ready & Eligible to Donate',
      badgeColorClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: isBn
        ? `সর্বশেষ রক্তদানের পর ${result.daysPassed} দিন অতিক্রান্ত হয়েছে (১২০ দিন সম্পন্ন)। আপনি নিরাপদে রক্তদান করতে পারবেন।`
        : `${result.daysPassed} days have passed since your last donation (120-day cooldown complete). You are ready to donate safely.`
    };
  }

  return {
    isEligible: false,
    daysRemaining: result.daysRemaining,
    daysPassed: result.daysPassed,
    nextEligibleDateStr: result.nextEligibleDateStr,
    badgeText: isBn ? `১২০ দিন পূর্ণ হতে আর ${result.daysRemaining} দিন বাকি` : `${result.daysRemaining} days remaining in 120-day cooldown`,
    badgeColorClass: 'bg-rose-50 text-rose-800 border-rose-300',
    description: isBn
      ? `আপনার শেষ রক্তদানের পর ${result.daysPassed} দিন পার হয়েছে। সুস্থতার জন্য ১২০ দিন (৪ মাস) পূর্ণ হওয়া পর্যন্ত বিশ্রাম নেওয়া আবশ্যক। আগামী ${result.nextEligibleDateStr} থেকে রক্তদানে সক্ষম হবেন।`
      : `${result.daysPassed} days passed since last donation. 120-day cooldown required for safe donation. Eligible again on ${result.nextEligibleDateStr}.`
  };
}

/**
 * Calculate age in years from a Date of Birth string (YYYY-MM-DD)
 */
export function calculateAge(dobString?: string): number | null {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  if (isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : null;
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

