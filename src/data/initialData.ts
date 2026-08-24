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
  SiteSettings,
  VolunteerApplication,
  DonationRecord,
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
  FAQItem,
  PressCoverage
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  organizationName: 'Infinity Bangladesh',
  teamIdentity: 'Team Infinity',
  tagline: 'United for Humanity',
  slogan: {
    en: 'United for Humanity',
    bn: 'মানবতার জন্য একতাবদ্ধ'
  },
  primary_slogan: {
    en: 'United for Humanity',
    bn: 'মানবতার জন্য একতাবদ্ধ'
  },
  establishedYear: '2015',
  headquartersLocation: 'Hathazari, Chattogram, Bangladesh',
  logoUrl: '/brand/infinity-logo.png',
  faviconUrl: '/brand/infinity-logo.png',
  country: 'Bangladesh',
  officialAddress: 'Hathazari, Chattogram, Bangladesh',
  officialPhone: '+880 1800-000000',
  officialEmail: 'contact@infinitybangladesh.org',
  facebookUrl: 'https://www.facebook.com/infinitybangladesh',
  youtubeUrl: 'https://youtube.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  bKashNumber: '01800-000000',
  nagadNumber: '01800-000000',
  bankDetails: {
    bankName: '[OFFICIAL BANK NAME REQUIRED]',
    accountName: 'Infinity Bangladesh / Team Infinity',
    accountNumber: '[OFFICIAL ACCOUNT NUMBER REQUIRED]',
    branchName: 'Hathazari Branch, Chattogram',
    routingNumber: '[OFFICIAL ROUTING NUMBER REQUIRED]'
  },
  bannerAnnouncement: {
    en: 'Welcome to the official digital platform of Infinity Bangladesh — Team Infinity | United for Humanity | Est. 2015',
    bn: 'ইনফিনিটি বাংলাদেশ-এর অফিসিয়াল ডিজিটাল প্ল্যাটফর্মে স্বাগতম — টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ | প্রতিষ্ঠিত ২০১৫'
  },
  showAnnouncementBanner: true,
  registrationNumber: 'Hathazari, Chattogram • Established 2015'
};

export const INITIAL_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    eyebrow: {
      en: 'TEAM INFINITY — UNITED FOR HUMANITY',
      bn: 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ'
    },
    headlineMain: {
      en: 'Together, We Can Create a',
      bn: 'একসাথে, আমরা গড়ব'
    },
    headlineHighlight: {
      en: 'Better Tomorrow.',
      bn: 'এক সুন্দর মানবিক'
    },
    description: {
      en: 'Infinity Bangladesh is a volunteer-led social organization driven by passionate youth. From humanitarian support and festive Eid initiatives to emergency relief and community development, we work to protect dignity and create meaningful change across Bangladesh.',
      bn: 'ইনফিনিটি বাংলাদেশ একটি তারুণ্যনির্ভর অলাভজনক সামাজিক উদ্যোগ। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু করে উৎসবের নতুন পোশাক, রমজান খাদ্য সহায়তা, জরুরি দুর্যোগ সেবা ও শিক্ষা সহায়তা প্রদানের মাধ্যমে আমরা মানুষের মর্যাদা রক্ষায় কাজ করে চলেছি।'
    },
    primaryCta: {
      text: { en: 'Support Our Work', bn: 'সহায়তা করুন' },
      url: 'donate',
      active: true
    },
    secondaryCta: {
      text: { en: 'Become a Volunteer', bn: 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' },
      url: 'volunteer',
      active: true
    },
    storyCta: {
      text: { en: 'Our Story', bn: 'আমাদের গল্প জানুন' },
      url: 'about',
      active: true
    },
    heroImageUrl: '/images/infinity-cover-hero.jpg',
    heroImageAlt: 'Infinity Bangladesh Humanitarian Group Photo',
    heroImageCaption: 'Team Infinity Volunteers with Children & Youth in Hathazari, Chattogram',
    heroImageCropPosition: 'center center',
    badgeYear: '2015',
    badgeLocation: 'Hathazari, Chattogram',
    badgeTag: 'Team Infinity',
    trustIndicators: [
      {
        icon: 'ShieldCheck',
        text: { en: '100% Verified Accountability', bn: '১০০% স্বচ্ছ ও জবাবদিহিতা' },
        active: true
      },
      {
        icon: 'CheckCircle2',
        text: { en: 'Direct Ground-Level Delivery', bn: 'সরাসরি মাঠপর্যায়ে বিতরণ' },
        active: true
      },
      {
        icon: 'Sparkles',
        text: { en: 'Youth Volunteer Network', bn: 'তারুণ্যনির্ভর স্বেচ্ছাসেবী' },
        active: true
      }
    ]
  },
  aboutPreview: {
    eyebrow: { en: 'Who We Are', bn: 'আমাদের পরিচয় ও লক্ষ্য' },
    titleMain: { en: 'People First. Humanity Always.', bn: 'মানুষের পাশে দাঁড়ানোই আমাদের ব্রত —' },
    titleHighlight: { en: 'Serving with Empathy.', bn: 'মানুষ প্রথম, মানবতাই মূল।' },
    description: {
      en: 'Founded in Hathazari, Chattogram in 2015, Infinity Bangladesh has grown into a transparent youth humanitarian platform.',
      bn: '২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে যাত্রা শুরু করে ইনফিনিটি বাংলাদেশ আজ দেশজুড়ে এক স্বচ্ছ ও নিবেদিত তারুণ্যের শক্তিতে পরিণত হয়েছে।'
    },
    quoteText: {
      en: '“Youth with Purpose. Community with Empathy.”',
      bn: '“মানবতার জয়গান গাইতে তারুণ্যের এই নিঃস্বার্থ ঐক্য।”'
    },
    quoteAuthor: 'Team Infinity',
    ctaText: { en: 'Explore Our Full Journey', bn: 'আমাদের সম্পূর্ণ গল্প জানুন' },
    ctaUrl: 'about',
    imageUrl: '/images/events/winter-warmth.jpg'
  },
  volunteerBanner: {
    eyebrow: { en: 'Be Part of Team Infinity', bn: 'স্বেচ্ছাসেবী পরিবারে স্বাগতম' },
    title: { en: 'Empower Communities with Your Time & Passion', bn: 'মানবতার সেবায় আপনিও হতে পারেন অগ্রদূত' },
    description: {
      en: 'Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.',
      bn: 'টিম ইনফিনিটি একটি তারুণ্যনির্ভর স্বচ্ছ মানবিক পরিবার। আপনার মেধা ও সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যুক্ত হোন।'
    },
    primaryCtaText: { en: 'Become a Volunteer', bn: 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' },
    primaryCtaUrl: 'volunteer',
    secondaryCtaText: { en: 'Meet Our Team', bn: 'আমাদের নেতৃত্ব দেখুন' },
    secondaryCtaUrl: 'about/executive-committee'
  },
  supportBanner: {
    title: { en: 'Stand With Infinity Bangladesh', bn: 'সহযোগিতার হাত বাড়িয়ে দিন' },
    description: {
      en: 'Your contributions directly fund verified clothes, nourishment, and winter protection for those who need it most.',
      bn: 'আপনার আর্থিক সহযোগিতা সরাসরি সুবিধাবঞ্চিত শিশুদের নতুন পোশাক, রমজানের খাদ্য এবং শীতের কম্বল হিসেবে রূপান্তরিত হয়।'
    },
    primaryCtaText: { en: 'Donate to Infinity Bangladesh', bn: 'অনলাইন অনুদান প্রদান' },
    primaryCtaUrl: 'donate',
    secondaryCtaText: { en: 'Audit & Expense Logs', bn: 'স্বচ্ছতা ও অডিট রিপোর্ট' },
    secondaryCtaUrl: 'transparency'
  },
  sectionOrder: [
    'hero',
    'impact',
    'about',
    'programs',
    'campaigns',
    'stories',
    'gallery',
    'volunteer',
    'transparency',
    'support'
  ],
  sectionVisibility: {
    hero: true,
    impact: true,
    about: true,
    programs: true,
    campaigns: true,
    stories: true,
    gallery: true,
    volunteer: true,
    transparency: true,
    support: true
  }
};

export const INITIAL_ABOUT_SETTINGS: AboutSettings = {
  title: {
    en: 'About Infinity Bangladesh',
    bn: 'ইনফিনিটি বাংলাদেশ সম্পর্কে'
  },
  subtitle: {
    en: 'United for Humanity Since 2015',
    bn: '২০১৫ সাল থেকে মানবতার সেবায় একতাবদ্ধ'
  },
  mission: {
    en: 'To restore human dignity and bring hope to vulnerable communities through transparent, youth-led humanitarian action, seasonal relief, and education support.',
    bn: 'স্বচ্ছ ও তারুণ্যনির্ভর মানবিক কার্যক্রম, মৌসুমী ত্রাণ এবং শিক্ষা সহায়তার মাধ্যমে প্রান্তিক মানুষের সামাজিক মর্যাদা ও অধিকার প্রতিষ্ঠা করা।'
  },
  vision: {
    en: 'A compassionate society where every underprivileged individual receives dignity, nourishment, warmth, and educational opportunity without discrimination.',
    bn: 'একটি সমানুভূতিশীল সমাজ গঠন যেখানে প্রতিটি সুবিধাবঞ্চিত মানুষ ভেদাভেদহীনভাবে মর্যাদা, পুষ্টি, নিরাপত্তা এবং শিক্ষার সমান সুযোগ পায়।'
  },
  history: {
    en: 'Infinity Bangladesh began its humble journey in Hathazari, Chattogram in 2015 when a small circle of passionate students united to share festival joy with street children. Over the past decade, it has evolved into a disciplined, ethical youth network with 350+ volunteers serving tens of thousands of beneficiaries.',
    bn: '২০১৫ সালে চট্টগ্রামের হাটহাজারীতে একদল নিবেদিতপ্রাণ তরুণ শিক্ষার্থীদের উদ্যোগে যাত্রা শুরু করে ইনফিনিটি বাংলাদেশ। বিগত এক দশকে এটি ৩৫০+ নিবেদিতপ্রাণ স্বেচ্ছাসেবকের এক সুসংগঠিত পরিবারে পরিণত হয়েছে।'
  },
  establishedYear: '2015',
  location: 'Hathazari, Chattogram, Bangladesh',
  heroImageUrl: '/images/infinity-cover-hero.jpg',
  secondaryImageUrl: '/images/events/winter-warmth.jpg',
  ctaText: { en: 'Join Our Volunteer Mission', bn: 'আমাদের স্বেচ্ছাসেবী অভিযানে যোগ দিন' },
  ctaUrl: 'volunteer'
};

export const INITIAL_HEADER_SETTINGS: HeaderSettings = {
  logoUrl: '/brand/infinity-logo.png',
  logoAlt: 'Infinity Bangladesh Official Logo',
  showNoticeBar: true,
  noticeBarText: {
    en: 'Welcome to the official digital platform of Infinity Bangladesh — Team Infinity | United for Humanity | Est. 2015',
    bn: 'ইনফিনিটি বাংলাদেশ-এর অফিসিয়াল ডিজিটাল প্ল্যাটফর্মে স্বাগতম — টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ | প্রতিষ্ঠিত ২০১৫'
  },
  noticeBarLink: 'transparency',
  showSearch: true,
  showLanguageSwitcher: true,
  supportButtonText: {
    en: 'Support Us',
    bn: 'সহায়তা করুন'
  },
  supportButtonUrl: 'donate',
  showSupportButton: true
};

export const INITIAL_FOOTER_SETTINGS: FooterSettings = {
  footerLogoUrl: '/brand/infinity-logo.png',
  description: {
    en: 'Infinity Bangladesh (Team Infinity) is a youth-driven volunteer social organization founded in Hathazari, Chattogram in 2015. Dedicated to child education, festive Eid happiness, winter warmth, and community dignity across Bangladesh.',
    bn: 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর অলাভজনক সামাজিক ও মানবিক সংগঠন। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু করে আজ দেশজুড়ে সুবিধাবঞ্চিত শিশু, অসহায় পরিবার ও দুর্যোগকবলিত মানুষের পাশে দাঁড়িয়ে মানবিক মর্যাদা প্রতিষ্ঠায় আমরা প্রতিজ্ঞাবদ্ধ।'
  },
  address: 'Hathazari, Chattogram, Bangladesh',
  phone: '+880 1800-000000',
  email: 'contact@infinitybangladesh.org',
  copyrightText: {
    en: '© 2015–2026 Infinity Bangladesh. All rights reserved. United for Humanity.',
    bn: '© ২০১৫–২০২৬ ইনফিনিটি বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত। মানবতার জন্য একতাবদ্ধ।'
  },
  showNewsletter: true,
  calloutEyebrow: {
    en: 'Team Infinity — United for Humanity',
    bn: 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ'
  },
  calloutTitle: {
    en: 'Stand with us to bring dignity, joy, and hope to communities in need.',
    bn: 'সুবিধাবঞ্চিত মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যোগ দিন'
  },
  calloutSubtitle: {
    en: 'Whether as an active youth volunteer or a transparent supporter, your empathy creates lasting change.',
    bn: 'স্বেচ্ছাসেবী হিসেবে কিংবা সহযোগিতার হাত বাড়িয়ে দিয়ে আপনিও হতে পারেন মানবকল্যাণের অগ্রণী অংশ।'
  },
  volunteerCtaText: {
    en: 'Become a Volunteer',
    bn: 'স্বেচ্ছাসেবী হিসেবে যোগ দিন'
  },
  supportCtaText: {
    en: 'Support Our Work',
    bn: 'সহায়তা করুন'
  }
};

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      en: 'What is Infinity Bangladesh and who runs it?',
      bn: 'ইনফিনিটি বাংলাদেশ কী এবং কারা এটি পরিচালনা করেন?'
    },
    answer: {
      en: 'Infinity Bangladesh (Team Infinity) is an authentic, youth-driven humanitarian and social organization founded in Hathazari, Chattogram in 2015. It is operated entirely by passionate youth volunteers, student leaders, and young professionals dedicated to upholding human dignity through transparent relief, education support, and community welfare.',
      bn: 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে যাত্রা শুরু করা একটি তারুণ্যনির্ভর সামাজিক ও মানবিক সংগঠন। দেশের সচেতন ছাত্রসমাজ ও তরুণ পেশাজীবীদের নিঃস্বার্থ স্বেচ্ছাসেবার মাধ্যমে সুবিধাবঞ্চিত শিশু, শ্রমজীবী মানুষ এবং প্রান্তিক জনগোষ্ঠীর মুখে হাসি ফোটানো এবং মর্যাদা রক্ষায় এটি পরিচালিত হয়।'
    },
    category: 'Organization',
    displayOrder: 1,
    active: true
  },
  {
    id: 'faq-2',
    question: {
      en: 'How does Team Infinity ensure 100% financial transparency?',
      bn: 'টিম ইনফিনিটি কীভাবে শতভাগ আর্থিক স্বচ্ছতা নিশ্চিত করে?'
    },
    answer: {
      en: 'We enforce a radical transparency protocol: every Taka collected is directly tied to verified procurement receipts and public audit summaries. We never inflate statistics, and regular financial audit summaries are published on our Transparency Portal for open inspection.',
      bn: 'আমরা কঠোর আর্থিক সততা নীতি মেনে চলি: সংগৃহীত প্রতিটি টাকার সরাসরি ক্রয় রসিদ এবং মাঠপর্যায়ের বিতরণ রিপোর্ট সংরক্ষণ করা হয়। কোনো প্রশাসনিক অপচয় বা ভুয়া হিসাব সহ্য করা হয় না এবং আমাদের স্বচ্ছতা পোর্টালে অডিট রিপোর্ট উন্মুক্ত রাখা হয়।'
    },
    category: 'Transparency',
    displayOrder: 2,
    active: true
  },
  {
    id: 'faq-3',
    question: {
      en: 'What is the "Dignity First" beneficiary principle?',
      bn: 'উপকারভোগীর "মর্যাদাপূর্ণ মানবিক সেবা" নীতি কী?'
    },
    answer: {
      en: 'Aid is a basic human right, not a favor. Team Infinity strictly opposes humiliating public photo ops of distressed individuals. We distribute seasonal gifts, food, and clothes with absolute respect, privacy, and beneficiary consent.',
      bn: 'সহায়তা কোনো অনুগ্রহ নয়, মানুষের অধিকার। ক্যামেরার সামনে দরিদ্র মানুষকে অপদস্থ করে ছবি তোলার প্রচলিত ধারার বিপরীতে আমরা সম্পূর্ণ সম্মানজনক ও মর্যাদাপূর্ণ উপায়ে উপহারসামগ্রী পৌঁছে দেই।'
    },
    category: 'Values',
    displayOrder: 3,
    active: true
  },
  {
    id: 'faq-4',
    question: {
      en: 'How can I become a volunteer with Team Infinity?',
      bn: 'আমি কীভাবে টিম ইনফিনিটির স্বেচ্ছাসেবক হতে পারি?'
    },
    answer: {
      en: 'Anyone passionate about humanitarian work can apply through our Volunteer Registration page. Select your district, areas of interest (field distribution, logistics, photography, emergency response), and agree to our code of conduct. Our coordination desk will connect with you.',
      bn: 'মানবিক কাজে আগ্রহী যেকোনো ব্যক্তি আমাদের স্বেচ্ছাসেবী নিবন্ধন পাতার মাধ্যমে আবেদন করতে পারেন। আপনার জেলা এবং আগ্রহের ক্ষেত্র (ত্রাণ বিতরণ, লজিস্টিকস, আলোকচিত্র ইত্যাদি) নির্বাচন করে আবেদন জমা দিলে আমাদের টিম আপনার সাথে যোগাযোগ করবে।'
    },
    category: 'Volunteering',
    displayOrder: 4,
    active: true
  },
  {
    id: 'faq-5',
    question: {
      en: 'Can I donate to a specific campaign like Eid Joy or Winter Clothes?',
      bn: 'আমি কি নির্দিষ্ট কোনো ক্যাম্পেইনে (যেমন: ঈদ আনন্দ বা শীতবস্ত্র) অনুদান দিতে পারি?'
    },
    answer: {
      en: 'Yes! On our Donate page, you can select the specific campaign or project you wish to fund. Your donation will be exclusively earmarked for that cause and documented with a digital receipt.',
      bn: 'হ্যাঁ! আমাদের অনুদান পাতায় গিয়ে আপনি নির্দিষ্ট ক্যাম্পেইন বা সাধারণ তহবিল নির্বাচন করতে পারেন। আপনার প্রদত্ত অনুদান নির্দিষ্ট সেই খাতেই ব্যয় করা হবে এবং একটি ডিজিটাল প্রাপ্তিস্বীকার রসিদ প্রদান করা হবে।'
    },
    category: 'Donation',
    displayOrder: 5,
    active: true
  },
  {
    id: 'faq-6',
    question: {
      en: 'Where is Infinity Bangladesh headquartered?',
      bn: 'ইনফিনিটি বাংলাদেশ-এর কেন্দ্রীয় কার্যালয় কোথায়?'
    },
    answer: {
      en: 'Infinity Bangladesh was established in 2015 and is proudly rooted in Hathazari, Chattogram, Bangladesh, carrying out verified humanitarian relief operations throughout the region and country.',
      bn: 'ইনফিনিটি বাংলাদেশ ২০১৫ সালে প্রতিষ্ঠিত হয়ে চট্টগ্রামের হাটহাজারীতে কেন্দ্রীয় কার্যালয় রেখে দেশব্যাপী মানবিক ও সামাজিক সেবামূলক কার্যক্রম পরিচালনা করছে।'
    },
    category: 'Organization',
    displayOrder: 6,
    active: true
  }
];

export const INITIAL_SOCIAL_LINKS: SocialLink[] = [
  { id: 'soc-1', platform: 'facebook', url: 'https://www.facebook.com/infinitybangladesh', label: 'Facebook', active: true, displayOrder: 1 },
  { id: 'soc-2', platform: 'youtube', url: 'https://youtube.com', label: 'YouTube', active: true, displayOrder: 2 },
  { id: 'soc-3', platform: 'instagram', url: 'https://instagram.com', label: 'Instagram', active: true, displayOrder: 3 },
  { id: 'soc-4', platform: 'linkedin', url: 'https://linkedin.com', label: 'LinkedIn', active: true, displayOrder: 4 },
  { id: 'soc-5', platform: 'whatsapp', url: 'https://wa.me/8801800000000', label: 'WhatsApp', active: true, displayOrder: 5 }
];

export const INITIAL_VOLUNTEER_SETTINGS: VolunteerSettings = {
  ctaText: { en: 'Become a Volunteer', bn: 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' },
  googleFormUrl: '', // Editable by admin if external Google Form is linked
  description: {
    en: 'Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.',
    bn: 'আপনার মেধা, সময় এবং সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে টিম ইনফিনিটির সাথে যুক্ত হোন।'
  },
  coverImageUrl: '/images/events/winter-warmth.jpg',
  benefits: {
    en: [
      'Hands-on grassroots field experience across seasonal drives',
      'Official Certificate of Humanitarian Service & leadership recognition',
      'Disaster preparedness, event management & ethical volunteering training',
      'Vibrant network of passionate young changemakers across Bangladesh'
    ],
    bn: [
      'মাঠপর্যায়ে সরাসরি সামাজিক কাজের বাস্তব অভিজ্ঞতা ও টিমওয়ার্ক',
      'অফিসিয়াল সার্টিফিকেট ও নেতৃত্বের স্বীকৃতি',
      'দুর্যোগ মোকাবেলা, ইভেন্ট ব্যবস্থাপনা ও মাঠপর্যায়ের মানবিক প্রশিক্ষণ',
      'দেশজুড়ে মানবিক কাজে নিবেদিত তরুণদের সাথে ইতিবাচক সম্পর্ক'
    ]
  },
  requirements: {
    en: [
      'Dedication to selfless humanitarian service with compassion',
      'Strict adherence to Team Infinity Code of Conduct & child safety rules',
      'Mutual respect, teamwork, and reliability during field drives'
    ],
    bn: [
      'মানবকল্যাণে কাজ করার আন্তরিক ইচ্ছা ও নিষ্ঠা',
      'সংগঠনের নৈতিক আচরণবিধি ও শিশু সুরক্ষা নীতিমালার প্রতি শ্রদ্ধাশীলতা',
      'মাঠপর্যায়ের কাজে দায়িত্বশীলতা ও শৃঙ্খলা বজায় রাখা'
    ]
  },
  contactEmail: 'volunteer@infinitybangladesh.org'
};

export const INITIAL_SUPPORT_SETTINGS: SupportSettings = {
  ctaText: { en: 'Support Our Humanitarian Work', bn: 'মানবতার সেবায় সহায়তা করুন' },
  description: {
    en: 'Your contribution transforms directly into verified aid on the ground. 100% transparent and audited with itemized receipts published.',
    bn: 'আপনার সহায়তা সরাসরি মাঠপর্যায়ে সুবিধাবঞ্চিত মানুষের কাছে পৌঁছে দেওয়া হয়। শতভাগ স্বচ্ছ ও জবাবদিহিতামূলক।'
  },
  bKashNumber: '01800-000000 [Official Helpline/Merchant]',
  bKashType: 'Merchant / Personal Number',
  nagadNumber: '01800-000000 [Official Nagad]',
  nagadType: 'Official Personal / Merchant',
  bankDetails: {
    bankName: '[OFFICIAL BANK NAME REQUIRED]',
    accountName: 'Infinity Bangladesh / Team Infinity',
    accountNumber: '[OFFICIAL ACCOUNT NUMBER REQUIRED]',
    branchName: 'Hathazari Branch, Chattogram',
    routingNumber: '[OFFICIAL ROUTING NUMBER REQUIRED]'
  },
  qrCodeImageUrl: '',
  paymentInstructions: {
    en: 'Please include your name and campaign reference in the transaction counter or note. An automated digital receipt can be downloaded.',
    bn: 'অনুগ্রহ করে ট্রানজেকশনে আপনার নাম ও রেফারেন্স উল্লেখ করুন। অনুদান নিশ্চিতকরণের পর ডিজিটাল মানি রিসিট ডাউনলোড করতে পারবেন।'
  },
  supportEmail: 'donate@infinitybangladesh.org',
  supportPhone: '+880 1800-000000'
};

export const INITIAL_CONTACT_SETTINGS: ContactSettings = {
  address: {
    en: 'Hathazari, Chattogram, Bangladesh',
    bn: 'হাটহাজারী, চট্টগ্রাম, বাংলাদেশ'
  },
  phone: '+880 1800-000000',
  email: 'contact@infinitybangladesh.org',
  officeHours: {
    en: 'Saturday – Thursday: 10:00 AM – 6:00 PM (Friday Closed)',
    bn: 'শনিবার – বৃহস্পতিবার: সকাল ১০:০০ – সন্ধ্যা ৬:০০ (শুক্রবার বন্ধ)'
  },
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2736208047025!2d91.8049!3d22.5073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2f1a6f022417%3A0x7d6f51c11bb8c8e9!2sHathazari%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
  emergencyHelpline: '+880 1800-000000'
};

export const INITIAL_SEO_SETTINGS: GlobalSEOSettings = {
  siteTitle: {
    en: 'Infinity Bangladesh | United for Humanity | Official Website',
    bn: 'ইনফিনিটি বাংলাদেশ | মানবতার জন্য একতাবদ্ধ | অফিসিয়াল ওয়েবসাইট'
  },
  metaDescription: {
    en: 'Infinity Bangladesh (Team Infinity) is a youth-driven humanitarian organization founded in 2015 in Hathazari, Chattogram. Standing united for humanity.',
    bn: 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর সামাজিক ও মানবিক সংগঠন। প্রতিষ্ঠিত ২০১৫, হাটহাজারী, চট্টগ্রাম। মানবতার জন্য একতাবদ্ধ।'
  },
  keywords: [
    'Infinity Bangladesh',
    'Team Infinity',
    'United for Humanity',
    'Hathazari',
    'Chattogram',
    'Eid Joy',
    'Winter Relief',
    'Humanitarian NGO Bangladesh',
    'Youth Volunteers Bangladesh'
  ],
  ogImageUrl: '/images/infinity-cover-hero.jpg',
  organizationName: 'Infinity Bangladesh',
  canonicalUrl: 'https://infinitybangladesh.org'
};

export const INITIAL_NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'nav-1',
    label: { en: 'Home', bn: 'হোম' },
    path: 'home',
    displayOrder: 1,
    active: true
  },
  {
    id: 'nav-2',
    label: { en: 'About', bn: 'আমাদের সম্পর্কে' },
    path: 'about',
    isDropdown: true,
    children: [
      { id: 'sub-1', label: { en: 'Story & History', bn: 'আমাদের গল্প ও ইতিহাস' }, path: 'about/story', active: true },
      { id: 'sub-2', label: { en: 'Mission & Vision', bn: 'লক্ষ্য ও দর্শন' }, path: 'about/mission-vision', active: true },
      { id: 'sub-3', label: { en: 'Executive Committee 2026', bn: 'কার্যনির্বাহী কমিটি ২০২৬' }, path: 'about/executive-committee', active: true },
      { id: 'sub-4', label: { en: 'Standing Committee', bn: 'স্থায়ী কমিটি' }, path: 'about/standing-committees', active: true },
      { id: 'sub-5', label: { en: 'Past Committees', bn: 'প্রাক্তন কমিটিসমূহ' }, path: 'about/past-committees', active: true }
    ],
    displayOrder: 2,
    active: true
  },
  {
    id: 'nav-3',
    label: { en: 'Our Work', bn: 'আমাদের কাজ' },
    path: 'programs',
    displayOrder: 3,
    active: true
  },
  {
    id: 'nav-4',
    label: { en: 'Campaigns', bn: 'ক্যাম্পেইন' },
    path: 'campaigns',
    displayOrder: 4,
    active: true
  },
  {
    id: 'nav-5',
    label: { en: 'Impact', bn: 'প্রভাব' },
    path: 'impact',
    displayOrder: 5,
    active: true
  },
  {
    id: 'nav-6',
    label: { en: 'Stories', bn: 'বাস্তব গল্প' },
    path: 'stories',
    displayOrder: 6,
    active: true
  },
  {
    id: 'nav-7',
    label: { en: 'Media & Gallery', bn: 'মিডিয়া ও গ্যালারি' },
    path: 'gallery',
    isDropdown: true,
    children: [
      { id: 'sub-6', label: { en: 'Photo Gallery', bn: 'আলোকচিত্র গ্যালারি' }, path: 'gallery', active: true },
      { id: 'sub-7', label: { en: 'Video Documentation', bn: 'ভিডিও ডকুমেন্টেশন' }, path: 'videos', active: true },
      { id: 'sub-7-press', label: { en: 'In The News (Press)', bn: 'গণমাধ্যমে ইনফিনিটি' }, path: 'media-coverage', active: true },
      { id: 'sub-8', label: { en: 'News & Announcements', bn: 'সংবাদ ও নোটিশ' }, path: 'news', active: true },
      { id: 'sub-9', label: { en: 'Events & Schedules', bn: 'ইভেন্ট ও সময়সূচি' }, path: 'events', active: true }
    ],
    displayOrder: 7,
    active: true
  },
  {
    id: 'nav-8',
    label: { en: 'Volunteer', bn: 'স্বেচ্ছাসেবী' },
    path: 'volunteer',
    displayOrder: 8,
    active: true
  },
  {
    id: 'nav-9',
    label: { en: 'Transparency', bn: 'স্বচ্ছতা ও অডিট' },
    path: 'transparency',
    displayOrder: 9,
    active: true
  },
  {
    id: 'nav-10',
    label: { en: 'Contact', bn: 'যোগাযোগ' },
    path: 'contact',
    displayOrder: 10,
    active: true
  }
];

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'ban-1',
    title: { en: 'United for Humanity — Est. 2015', bn: 'মানবতার জন্য একতাবদ্ধ — প্রতিষ্ঠিত ২০১৫' },
    subtitle: { en: 'Empowering youth to bring smiles and dignity across Bangladesh', bn: 'তারুণ্যের শক্তিতে সুবিধাবঞ্চিত মানুষের মুখে হাসি ফোটানোর প্রত্যয়' },
    desktopImageUrl: '/images/infinity-cover-hero.jpg',
    mobileImageUrl: '/images/infinity-cover-hero.jpg',
    ctaText: { en: 'Support Our Mission', bn: 'সহায়তা করুন' },
    ctaUrl: 'donate',
    placement: 'homepage_hero',
    displayOrder: 1,
    active: true
  },
  {
    id: 'ban-2',
    title: { en: 'Eid Joy Drive for Underprivileged Children', bn: 'সুবিধাবঞ্চিত শিশুদের সাথে ঈদ আনন্দ' },
    subtitle: { en: 'Join our seasonal drive to gift new clothes to marginalized children', bn: 'নতুন জামা ও ঈদের খুশি পৌঁছে দিতে আমাদের সাথে থাকুন' },
    desktopImageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    ctaText: { en: 'Learn More', bn: 'বিস্তারিত দেখুন' },
    ctaUrl: 'campaigns',
    placement: 'campaign_feature',
    displayOrder: 2,
    active: true
  }
];

export const INITIAL_MEDIA_LIBRARY: MediaItem[] = [
  {
    id: 'med-hero-1',
    fileName: 'infinity-cover-hero.jpg',
    url: '/images/infinity-cover-hero.jpg',
    fileSize: '974 KB',
    mimeType: 'image/jpeg',
    type: 'image',
    category: 'Hero',
    title: 'Infinity Bangladesh Official Group Photo with Children in Hathazari',
    altText: 'Infinity Bangladesh Official Group Photo with Children in Hathazari',
    caption: 'Official Team Infinity Field Gathering with Eid Joy Banner',
    uploadedAt: '2025-01-01',
    usageTags: ['Homepage Hero', 'About Hero', 'Campaigns'],
    status: 'published'
  },
  {
    id: 'med-logo-1',
    fileName: 'infinity-logo.png',
    url: '/brand/infinity-logo.png',
    fileSize: '38 KB',
    mimeType: 'image/png',
    type: 'image',
    category: 'Logos',
    title: 'Infinity Bangladesh Official Authoritative Logo',
    altText: 'Infinity Bangladesh Official Authoritative Logo',
    caption: 'United for Humanity Brand Mark with Infinity Wings',
    uploadedAt: '2025-01-01',
    usageTags: ['Header Logo', 'Footer Logo', 'Brand System'],
    status: 'published'
  },
  {
    id: 'med-event-1',
    fileName: 'winter-warmth.jpg',
    url: '/images/events/winter-warmth.jpg',
    fileSize: '915 KB',
    mimeType: 'image/jpeg',
    type: 'image',
    category: 'Events',
    title: 'Team Infinity Volunteers during Winter Blanket Distribution',
    altText: 'Team Infinity Volunteers during Winter Blanket Distribution',
    caption: 'Direct ground-level delivery to cold-affected communities',
    uploadedAt: '2025-01-05',
    usageTags: ['About Section Preview', 'Winter Relief Campaign', 'Events'],
    status: 'published'
  },
  {
    id: 'med-ref-1',
    fileName: 'executive-committee-2026.png',
    url: '/reference/executive-committee-2026.png',
    fileSize: '465 KB',
    mimeType: 'image/png',
    type: 'image',
    category: 'Volunteers',
    title: 'Executive Committee 2026 Official Declaration Poster',
    altText: 'Executive Committee 2026 Official Declaration Poster',
    caption: 'Official roster of 27 executive leaders',
    uploadedAt: '2026-01-01',
    usageTags: ['Executive Committee Page', 'Volunteers', 'Committees'],
    status: 'published'
  },
  {
    id: 'med-ref-2',
    fileName: 'standing-committee-poster.png',
    url: '/reference/standing-committee-poster.png',
    fileSize: '336 KB',
    mimeType: 'image/png',
    type: 'image',
    category: 'Volunteers',
    title: 'Standing Committee Official Declaration Poster',
    altText: 'Standing Committee Official Declaration Poster',
    caption: 'Official roster of 9 standing committee members',
    uploadedAt: '2026-01-01',
    usageTags: ['Standing Committee Page', 'Volunteers', 'Committees'],
    status: 'published'
  }
];

export const INITIAL_GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'alb-1',
    slug: 'eid-joy-underprivileged',
    title: { en: 'Eid Joy for Underprivileged (সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ)', bn: 'সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ' },
    description: { en: 'Distribution of brand new festive clothes and food packets to street children and families.', bn: 'সুবিধাবঞ্চিত শিশুদের মাঝে নতুন জামা ও উপহার বিতরণ।' },
    coverImageUrl: '/images/infinity-cover-hero.jpg',
    category: 'Campaigns',
    date: 'Eid-ul-Fitr',
    isPublished: true,
    displayOrder: 1,
    photos: []
  },
  {
    id: 'alb-2',
    slug: 'winter-warmth-blanket-relief',
    title: { en: 'Winter Warmth & Blanket Relief', bn: 'শীতবস্ত্র ও কম্বল বিতরণ কার্যক্রম' },
    description: { en: 'Late-night blanket distribution to pavement dwellers and remote village elders.', bn: 'শীতার্ত মানুষের মাঝে উষ্ণতার পরশ পৌঁছে দেওয়ার উদ্যোগ।' },
    coverImageUrl: '/images/events/winter-warmth.jpg',
    category: 'Distribution',
    date: 'Winter Season',
    isPublished: true,
    displayOrder: 2,
    photos: []
  }
];

export const INITIAL_ADMIN_PROFILES: AdminProfile[] = [
  {
    id: 'admin-1',
    email: 'admin@infinitybangladesh.org',
    fullName: 'Chief Administrator (Super Admin)',
    role: 'super_admin',
    avatarUrl: '/brand/infinity-logo.png',
    isActive: true
  },
  {
    id: 'admin-2',
    email: 'editor@infinitybangladesh.org',
    fullName: 'Content Lead (Content Admin)',
    role: 'content_admin',
    isActive: true
  },
  {
    id: 'admin-3',
    email: 'media@infinitybangladesh.org',
    fullName: 'Media Manager',
    role: 'media_manager',
    isActive: true
  },
  {
    id: 'admin-4',
    email: 'auditor@infinitybangladesh.org',
    fullName: 'Governance Viewer (Read-only)',
    role: 'viewer',
    isActive: true
  }
];


export const INITIAL_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'metric-1',
    label: { en: 'People Reached', bn: 'মানুষের কাছে পৌঁছানো' },
    value: '15,000+',
    description: {
      en: 'Lives touched through humanitarian aid, festive Eid gifts, and community relief across Bangladesh.',
      bn: 'মানবিক সহায়তা, ঈদ উপহার এবং সামাজিক সহযোগিতার মাধ্যমে সরাসরি উপকৃত মানুষ।'
    },
    iconName: 'Users',
    order: 1
  },
  {
    id: 'metric-2',
    label: { en: 'Dedicated Volunteers', bn: 'নিবেদিতপ্রাণ স্বেচ্ছাসেবক' },
    value: '350+',
    description: {
      en: 'Passionate youth volunteers actively serving on the ground from Hathazari to remote districts.',
      bn: 'হাটহাজারী ও দেশের বিভিন্ন প্রান্তে মাঠপর্যায়ে নিরলস সেবায় নিয়োজিত তরুণ স্বেচ্ছাসেবী।'
    },
    iconName: 'Sparkles',
    order: 2
  },
  {
    id: 'metric-3',
    label: { en: 'Field Campaigns', bn: 'মাঠপর্যায়ের ক্যাম্পেইন' },
    value: '45+',
    description: {
      en: 'Verified field drives covering Eid clothing, Ramadan food hampers, winter relief, and disaster aid.',
      bn: 'ঈদ উপহার, রমজান খাদ্য সহায়তা, শীতবস্ত্র বিতরণ এবং জরুরি সাহায্য ভিত্তিক মাঠপর্যায়ের ক্যাম্পেইন।'
    },
    iconName: 'Flag',
    order: 3
  },
  {
    id: 'metric-4',
    label: { en: 'Years of Service', bn: 'নিরবচ্ছিন্ন সেবার বছর' },
    value: '10+ Years',
    description: {
      en: 'Serving humanity with dignity, transparency, and youth empowerment since 2015.',
      bn: '২০১৫ সাল থেকে সততা, মর্যাদা ও স্বচ্ছতার সাথে সুবিধাবঞ্চিত মানুষের পাশে।'
    },
    iconName: 'HeartHandshake',
    order: 4
  }
];

export const INITIAL_PROGRAMS: Program[] = [
  {
    id: 'prog-1',
    slug: 'eid-for-underprivileged',
    title: {
      en: 'Eid Joy for Underprivileged (সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ)',
      bn: 'সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ'
    },
    category: 'Seasonal Support',
    shortDescription: {
      en: 'Distributing new clothes, festive gifts, and special food packages to underprivileged children and families during Eid.',
      bn: 'সুবিধাবঞ্চিত শিশু ও পরিবারের মুখে হাসি ফোটাতে নতুন জামা, উপহার এবং বিশেষ ঈদ উপহার বিতরণ।'
    },
    fullDetails: {
      en: 'Eid should be a time of universal joy and dignity. Team Infinity brings together youth volunteers across Bangladesh to collect, pack, and distribute brand-new Eid attire and festive food parcels directly into the hands of underprivileged street children and marginalized families.',
      bn: 'ঈদ সবার জন্য আনন্দের ও মর্যাদার বার্তা নিয়ে আসে। টিম ইনফিনিটি সুবিধাবঞ্চিত শিশু এবং অসহায় পরিবারের কাছে নতুন পোশাক এবং পুষ্টিকর ঈদ সামগ্রী পৌঁছে দিতে কাজ করে।'
    },
    impactHighlights: {
      en: [
        'Direct door-to-door and community distribution with full transparency',
        'Prioritizing orphans, street-connected children, and elderly individuals',
        'Ensuring dignity and joy without patronizing public photography'
      ],
      bn: [
        'সম্পূর্ণ স্বচ্ছতার সাথে সরাসরি সুবিধাবঞ্চিতদের হাতে সহায়তা পৌঁছানো',
        'পথশিশু, এতিম এবং অসহায় প্রবীণদের সর্বোচ্চ অগ্রাধিকার প্রদান',
        'মানবিক মর্যাদা অক্ষুণ্ণ রেখে উৎসবের আনন্দ ভাগাভাগি'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Gift',
    status: 'active'
  },
  {
    id: 'prog-2',
    slug: 'ramadan-food-relief',
    title: {
      en: 'Ramadan Iftar & Grocery Aid',
      bn: 'রমজান ইফতার ও খাদ্য সহায়তা'
    },
    category: 'Food Distribution',
    shortDescription: {
      en: 'Providing month-long grocery baskets and wholesome Iftar packages to daily wage earners and struggling families.',
      bn: 'দরিদ্র ও দিনমজুর পরিবারের জন্য মাসব্যাপী প্রয়োজনীয় খাদ্যসামগ্রী এবং পুষ্টিকর ইফতার সামগ্রী বিতরণ।'
    },
    fullDetails: {
      en: 'Throughout the holy month of Ramadan, Team Infinity delivers curated dry grocery packages (rice, lentils, oil, chickpeas, dates, flour) ensuring low-income families can observe fasting with food security and dignity.',
      bn: 'পবিত্র রমজান মাসে স্বল্পআয়ের পরিবারের জন্য চাল, ডাল, তেল, ছোলা, খেজুর ইত্যাদি জরুরি খাদ্যসামগ্রীর সমন্বয়ে তৈরি খাদ্য সহায়তা প্যাকেজ বিতরণ করা হয়।'
    },
    impactHighlights: {
      en: [
        'Nutritionally balanced Ramadan grocery hampers',
        'Community Iftar drives for laborers, rickshaw pullers, and street workers',
        'Volunteer-managed packing and neighborhood delivery logistics'
      ],
      bn: [
        'পুষ্টিকর ও প্রয়োজনীয় খাদ্যপণ্যের সমন্বয়ে তৈরি প্যাকেজ',
        'দিনমজুর, রিকশাচালক ও ছিন্নমূল মানুষের জন্য সম্মিলিত ইফতার আয়োজন',
        'স্বেচ্ছাসেবকদের সরাসরি তদারকিতে নিরপেক্ষভাবে তালিকা প্রণয়ন ও বিতরণ'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Utensils',
    status: 'active'
  },
  {
    id: 'prog-3',
    slug: 'winter-warmth-initiative',
    title: {
      en: 'Winter Warmth & Blanket Drive',
      bn: 'শীতবস্ত্র ও কম্বল বিতরণ কার্যক্রম'
    },
    category: 'Winter Relief',
    shortDescription: {
      en: 'Distributing warm blankets and heavy winter clothing to vulnerable rural communities and pavement dwellers facing severe cold.',
      bn: 'তীব্র শীতে কাতর উত্তরবঙ্গ ও প্রত্যন্ত অঞ্চলের অসহায় মানুষ এবং ভাসমান গৃহহীনদের মাঝে উষ্ণ কম্বল ও শীতবস্ত্র বিতরণ।'
    },
    fullDetails: {
      en: 'Winter brings harsh vulnerability to thousands of pavement dwellers and rural families without proper shelter. Our volunteers conduct late-night and remote field surveys to deliver high-quality blankets directly where the cold is felt most severely.',
      bn: 'শীতকালে উপযুক্ত কাপড়ের অভাবে বহু শিশু ও প্রবীণ কষ্ট পান। টিম ইনফিনিটির সদস্যরা সরাসরি স্পট পরিদর্শন করে অসহায়দের মাঝে মানসম্মত কম্বল ও জ্যাকেট পৌঁছে দেন।'
    },
    impactHighlights: {
      en: [
        'Targeting remote rural villages and urban pavement dwellers',
        'Focus on elderly individuals, newborns, and cold-vulnerable groups',
        'Direct verification by youth volunteers'
      ],
      bn: [
        'প্রত্যন্ত গ্রামাঞ্চল ও শহুরে ভাসমান মানুষদের অগ্রাধিকার',
        'বয়োবৃদ্ধ ও শিশুদের সুরক্ষায় বিশেষ নজর',
        'স্বেচ্ছাসেবকদের মাধ্যমে প্রকৃত অসহায়দের চিহ্নিতকরণ'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Sun',
    status: 'active'
  },
  {
    id: 'prog-4',
    slug: 'child-education-support',
    title: {
      en: 'Education & Child Welfare',
      bn: 'শিক্ষা ও শিশু কল্যাণ উদ্যোগ'
    },
    category: 'Education',
    shortDescription: {
      en: 'Supplying school bags, notebooks, stationery, and learning aids to keep underprivileged children in school.',
      bn: 'সুবিধাবঞ্চিত শিশুদের ঝরে পড়া রোধে খাতা, কলম, স্কুলব্যাগ ও পাঠ্য উপকরণ সরবরাহ।'
    },
    fullDetails: {
      en: 'Education is the ultimate equalizer. Infinity Bangladesh supports children from impoverished backgrounds with required academic materials, mentoring sessions, and tuition guidance so financial barriers do not halt their dreams.',
      bn: 'শিক্ষাই পরিবর্তনের প্রধান হাতিয়ার। সুবিধাবঞ্চিত শিশুদের মেধা বিকাশ ও নিয়মিত পড়াশোনা নিশ্চিত করতে টিম ইনফিনিটি শিক্ষা উপকরণ ও মেন্টরশিপ প্রদান করে।'
    },
    impactHighlights: {
      en: [
        'School essentials kit (backpacks, books, notebooks, pens, geometry boxes)',
        'Volunteer-led basic literacy and ethical awareness sessions',
        'Long-term dropout prevention tracking'
      ],
      bn: [
        'সম্পূর্ণ শিক্ষাসামগ্রী কিট বিতরণ',
        'স্বেচ্ছাসেবকদের দ্বারা মৌলিক নৈতিকতা ও শিক্ষা সেশন পরিচালনা',
        'স্কুল থেকে ঝরে পড়া রোধে নিয়মিত যোগাযোগ'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
    iconName: 'BookOpen',
    status: 'active'
  },
  {
    id: 'prog-5',
    slug: 'emergency-disaster-response',
    title: {
      en: 'Emergency & Disaster Response',
      bn: 'জরুরি ও দুর্যোগকালীন সহায়তা'
    },
    category: 'Emergency Relief',
    shortDescription: {
      en: 'Rapid deployment of rescue supplies, clean drinking water, dry food, and medical essentials during floods and natural crises.',
      bn: 'বন্যা ও প্রাকৃতিক দুর্যোগের সময় উদ্ধারকাজ, বিশুদ্ধ পানি, শুকনো খাবার ও জরুরি প্রাথমিক চিকিৎসা সহায়তা।'
    },
    fullDetails: {
      en: 'When floods or unforeseen emergencies strike Bangladesh, Team Infinity mobilizes volunteer emergency squads to dispatch water purification tablets, dry rations, emergency medicines, and temporary rehabilitation materials.',
      bn: 'বন্যা বা আকস্মিক দুর্যোগ দেখা দিলে টিম ইনফিনিটি দ্রুত ত্রাণ সামগ্রী, স্যালাইন ও শুকনো খাদ্য নিয়ে দুর্গত এলাকার মানুষের পাশে দাঁড়ায়।'
    },
    impactHighlights: {
      en: [
        'Rapid response within hours of critical natural emergencies',
        'Clean water, oral saline, and emergency medication supply',
        'Direct field coordination with local community members'
      ],
      bn: [
        'জরুরি দুর্যোগে দ্রুততম সময়ে মাঠপর্যায়ে সাড়াদান',
        'বিশুদ্ধ পানি, খাবার স্যালাইন ও জরুরি ওষুধ বিতরণ',
        'স্থানীয় সম্প্রদায়ের সাথে একাত্ম হয়ে কাজ'
      ]
    },
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80',
    iconName: 'ShieldAlert',
    status: 'active'
  }
];

export const INITIAL_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    slug: 'eid-anondo-underprivileged',
    title: {
      en: 'Eid Joy for Underprivileged (সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ)',
      bn: 'সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ'
    },
    date: 'Eid-ul-Fitr Seasonal Drive',
    location: { en: 'Dhaka & Rural Target Districts, Bangladesh', bn: 'ঢাকা ও প্রত্যন্ত জেলাসমূহ, বাংলাদেশ' },
    category: 'Seasonal Support',
    description: {
      en: 'Bringing genuine smiles to street children and underprivileged families on Eid by providing new festive clothes, gift boxes, and special food packages.',
      bn: 'সুবিধাবঞ্চিত শিশুদের মুখে হাসি ফোটাতে নতুন জামা ও উৎসব সামগ্রী উপহার দেওয়ার বিশেষ ঈদ ক্যাম্পেইন।'
    },
    objectives: {
      en: [
        'Distribute brand-new Eid outfits tailored for children',
        'Provide festive food baskets containing vermicelli, sugar, milk, and spices to impoverished households',
        'Foster compassion and youth civic participation across communities'
      ],
      bn: [
        'সুবিধাবঞ্চিত শিশুদের জন্য নতুন পোশাক প্রদান',
        'অসহায় পরিবারের জন্য বিশেষ সেমাই, চিনি, দুধ ও মসলা সমৃদ্ধ খাদ্য সহায়তা',
        'যুবসমাজের মধ্যে মানবসেবার মানসিকতা জোরদার করা'
      ]
    },
    activities: {
      en: [
        'Field census identifying children who have never received new Eid clothes',
        'Volunteer procurement, sorting, and personalized packaging',
        'Dignified community distribution sessions'
      ],
      bn: [
        'মাঠপর্যায়ে তালিকা তৈরি ও শিশুদের মাপ অনুযায়ী পোশাক সংগ্রহ',
        'স্বেচ্ছাসেবকদের সরাসরি অংশগ্রহণ ও সুন্দর প্যাকেজিং',
        'সম্মানজনক পরিবেশে উপহার হস্তান্তর'
      ]
    },
    beneficiaries: {
      en: 'Street children, orphans, children of day laborers, and ultra-poor families.',
      bn: 'পথশিশু, এতিম এবং অতিদরিদ্র পরিবারের সদস্যবৃন্দ।'
    },
    impact: {
      en: 'Transformed Eid from a day of isolation into a celebration of dignity, belonging, and boundless joy.',
      bn: 'ঈদকে কেবল একটি দিন নয়, বরং ভালোবাসা ও মর্যাদার মিলনমেলায় পরিণত করা।'
    },
    status: 'active',
    isFeatured: true,
    targetAmountBDT: '[TARGET DEFINED PER DRIVE]',
    raisedAmountBDT: '[OFFICIAL AUDIT REPORT LINKED]',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'camp-2',
    slug: 'ramadan-iftar-grocery-drive',
    title: {
      en: 'Ramadan Food Baskets & Street Iftar Drive',
      bn: 'রমজান খাদ্য প্যাকেজ ও পথচারী ইফতার বিতরণ'
    },
    date: 'Holy Month of Ramadan',
    location: { en: 'Multiple Hubs in Bangladesh', bn: 'বাংলাদেশের বিভিন্ন অঞ্চল' },
    category: 'Food Security',
    description: {
      en: 'Ensuring daily wage earners, rickshaw pullers, and struggling families have adequate provisions for Suhoor and Iftar throughout Ramadan.',
      bn: 'পবিত্র মাহে রমজানে দরিদ্র ও পথচারী রোজাদারদের মাঝে ইফতার ও মাসব্যাপী খাদ্যপণ্য বিতরণ কর্মসূচি।'
    },
    objectives: {
      en: [
        'Deliver complete monthly food baskets to vulnerable households',
        'Distribute warm, hygienic daily Iftar meals to working street laborers',
        'Minimize food insecurity during the holy month'
      ],
      bn: [
        'অসহায় পরিবারের মাঝে পুরো মাসের প্রয়োজনীয় খাদ্যসামগ্রী প্রদান',
        'রাস্তার খেটে খাওয়া মানুষদের জন্য স্বাস্থ্যকর ইফতার সরবরাহ',
        'রমজানে খাদ্য নিরাপত্তাহীনতা দূরীকরণ'
      ]
    },
    activities: {
      en: [
        'Sourcing quality grains and staples from wholesale suppliers',
        'Youth volunteer assembly lines for safe hygienic packaging',
        'Direct distribution in low-income settlements and busy transit points'
      ],
      bn: [
        'মানসম্পন্ন খাদ্যপণ্য পাইকারি সংগ্রহ ও স্বাস্থ্যসম্মত প্যাকেজিং',
        'স্বেচ্ছাসেবীদের দ্বারা সরাসরি বস্তি ও শ্রমজীবী এলাকায় বিতরণ',
        'প্রতিদিন আসরের পর পথচারী রোজাদারদের মাঝে ইফতার পৌঁছানো'
      ]
    },
    beneficiaries: {
      en: 'Daily wage laborers, domestic workers, rickshaw pullers, and marginalized elders.',
      bn: 'দিনমজুর, গৃহকর্মী, রিকশাচালক ও অসহায় প্রবীণ ব্যক্তিবর্গ।'
    },
    impact: {
      en: 'Relieved severe financial stress for families during Ramadan, allowing them to observe their faith in peace.',
      bn: 'স্বল্পআয়ের মানুষের রমজানের খাদ্য দুশ্চিন্তা লাঘব।'
    },
    status: 'upcoming',
    isFeatured: true,
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'camp-3',
    slug: 'winter-warmth-blanket-relief',
    title: {
      en: 'Winter Warmth: Blanket & Clothes Drive',
      bn: 'উষ্ণতার পরশ: শীতবস্ত্র ও কম্বল বিতরণ'
    },
    date: 'Winter Season',
    location: { en: 'Cold-affected Northern & Rural Districts', bn: 'শীতপ্রবণ উত্তরাঞ্চল ও প্রত্যন্ত জেলা' },
    category: 'Winter Relief',
    description: {
      en: 'Reaching cold-wave affected areas with durable blankets and heavy winter sweaters for elders and children.',
      bn: 'শৈত্যপ্রবাহে ক্ষতিগ্রস্ত অঞ্চলের অসহায় শিশু ও প্রবীণদের মাঝে উষ্ণ কম্বল ও শীতের পোশাক বিতরণ।'
    },
    objectives: {
      en: [
        'Shield vulnerable citizens from severe winter cold waves',
        'Prevent cold-related respiratory illnesses in children and seniors',
        'Reach remote villages that receive minimal aid'
      ],
      bn: [
        'তীব্র শৈত্যপ্রবাহ থেকে অসহায় মানুষকে রক্ষা করা',
        'শীতজনিত রোগবালাই প্রতিরোধে সহায়তা করা',
        'প্রত্যন্ত চরাঞ্চল ও অবহেলিত গ্রামে সেবা পৌঁছানো'
      ]
    },
    activities: {
      en: [
        'Pre-distribution surveys to target families without warm bedding',
        'Night-time distribution to street sleepers in urban centers',
        'Rural distribution camps managed with local community leaders'
      ],
      bn: [
        'প্রকৃত শীতার্তদের তালিকা প্রণয়ন ও নিরপেক্ষ যাচাইকরণ',
        'শহরের ফুটপাতে রাতে অবস্থানরতদের মাঝে কম্বল বিতরণ',
        'গ্রামাঞ্চলে ক্যাম্পের মাধ্যমে সুশৃঙ্খল বিতরণ'
      ]
    },
    beneficiaries: {
      en: 'Ultra-poor villagers, riverbank inhabitants, and homeless individuals.',
      bn: 'চরের বাসিন্দা, ভূমিহীন ও রাস্তার পাশে আশ্রয় নেওয়া মানুষ।'
    },
    impact: {
      en: 'Protected hundreds of individuals from the biting cold, restoring health and comfort.',
      bn: 'অগণিত মানুষকে শীতের তীব্র কষ্ট থেকে সুরক্ষা প্রদান।'
    },
    status: 'completed',
    isFeatured: false,
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

export const INITIAL_IMPACT_STORIES: ImpactStory[] = [
  {
    id: 'story-1',
    slug: 'smile-of-a-little-dreamer',
    title: {
      en: 'The Smile of a Young Student',
      bn: 'একটি ছোট্ট শিশুর মুখের অমলিন হাসি'
    },
    personOrCommunity: { en: 'A 9-year-old student and family', bn: '৯ বছর বয়সী শিক্ষার্থী ও তার পরিবার' },
    location: { en: 'Urban Community, Bangladesh', bn: 'নগর এলাকা, বাংলাদেশ' },
    date: 'Recent Outreach',
    story: {
      en: 'A young girl whose father worked long hours as a daily cart puller was on the verge of stopping her studies because simple notebook and pen costs were too heavy for the household. When Team Infinity visited with our education kit and new school uniforms, she held her new notebook to her chest and whispered that she wanted to become a teacher.',
      bn: 'একটি ছোট্ট মেয়ে যার বাবা দিনমজুর হিসেবে কঠোর পরিশ্রম করেন, খাতা-কলমের অভাবে তার স্কুলে যাওয়া অনিশ্চিত হয়ে পড়েছিল। টিম ইনফিনিটির সদস্যরা যখন তার হাতে নতুন স্কুলব্যাগ ও খাতা-কলম তুলে দেন, তখন তার চোখের আনন্দ ছিল দেখার মতো।'
    },
    impact: {
      en: 'Continued in regular school attendance with renewed motivation and confidence.',
      bn: 'বিদ্যালয়ে নিয়মিত উপস্থিতি নিশ্চিত এবং উচ্চশিক্ষার স্বপ্ন পুনরুজ্জীবিত।'
    },
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    consentConfirmed: true
  },
  {
    id: 'story-2',
    slug: 'dignity-through-ramadan',
    title: {
      en: 'Dignity Through Hard Times',
      bn: 'কঠিন সময়ে সম্মানের সাথে বেঁচে থাকা'
    },
    personOrCommunity: { en: 'Elderly artisan and community elders', bn: 'প্রবীণ কারিগর ও স্থানীয় বাসিন্দা' },
    location: { en: 'Rural Settlement, Bangladesh', bn: 'গ্রামাঞ্চল, বাংলাদেশ' },
    date: 'Seasonal Fieldwork',
    story: {
      en: 'During tough seasonal slowdowns, elderly craft workers often struggle in silence without seeking charity. Team Infinity delivered discreet, dignified food hampers directly to their homes after sunset, ensuring privacy and respect.',
      bn: 'কাজের সংকটকালে অনেক প্রবীণ মানুষ লোকলজ্জার ভয়ে কারো কাছে হাত পাততে পারেন না। টিম ইনফিনিটির সদস্যরা অত্যন্ত গোপনীয়তা ও শ্রদ্ধার সাথে তাদের ঘরে প্রয়োজনীয় খাদ্যসামগ্রী পৌঁছে দিয়েছেন।'
    },
    impact: {
      en: 'Food security maintained for the entire month without compromising self-respect.',
      bn: 'আত্মসম্মান বজায় রেখে পুরো মাসের খাদ্য নিরাপত্তা নিশ্চিত।'
    },
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    consentConfirmed: true
  }
];

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    slug: 'team-infinity-launches-youth-volunteer-drive',
    title: {
      en: 'Infinity Bangladesh Launches Nationwide Volunteer Registration Drive',
      bn: 'দেশব্যাপী স্বেচ্ছাসেবী নিবন্ধন কার্যক্রম শুরু করল ইনফিনিটি বাংলাদেশ'
    },
    excerpt: {
      en: 'Young changemakers across Bangladesh are invited to join hands under Team Infinity to serve humanitarian causes with integrity and compassion.',
      bn: 'মানবতার সেবায় কাজ করতে টিম ইনফিনিটি-তে যুক্ত হতে দেশের সচেতন তরুণ সমাজকে আহ্বান জানানো হচ্ছে।'
    },
    content: {
      en: 'Infinity Bangladesh (Team Infinity) has officially opened volunteer applications for youth passionate about community service, disaster preparedness, child welfare, and seasonal relief drives. Volunteers receive orientation in field ethics, emergency coordination, and community dignity.',
      bn: 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) সামাজিক উন্নয়ন ও মানবিক কার্যক্রমে অংশ নিতে ইচ্ছুক তরুণদের জন্য স্বেচ্ছাসেবী নিবন্ধন আহ্বান করেছে। ফিল্ড এথিক্স এবং মানবিক সহায়তা বিষয়ে আগ্রহীদের প্রশিক্ষণ দেওয়া হবে।'
    },
    category: 'Announcement',
    author: 'Infinity Bangladesh Media Desk',
    date: '2025-02-15',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    tags: ['Volunteer', 'Youth', 'Community', 'Bangladesh'],
    status: 'published'
  },
  {
    id: 'news-2',
    slug: 'transparency-first-approach-to-humanitarian-aid',
    title: {
      en: 'Our Commitment: Transparency & Public Accountability in Every Campaign',
      bn: 'আমাদের অঙ্গীকার: প্রতিটি মানবিক কার্যক্রমে শতভাগ স্বচ্ছতা ও জবাবদিহিতা'
    },
    excerpt: {
      en: 'How Team Infinity structures fund utilization, field auditing, and reporting for every single donation received.',
      bn: 'টিম ইনফিনিটি কীভাবে প্রাপ্ত প্রতিটি অনুদানের সঠিক ব্যবহার ও নিরীক্ষা প্রতিবেদন নিশ্চিত করে।'
    },
    content: {
      en: 'Transparency is not an afterthought for Team Infinity; it is the cornerstone of everything we do. All campaign expenses, distribution lists, and receipts are recorded and made available for review by donors and community members.',
      bn: 'স্বচ্ছতা টিম ইনফিনিটির মূল চালিকাশক্তি। প্রতিটি ক্যাম্পেইনের যাবতীয় আয়-ব্যয়ের হিসাব ও কার্যক্রমের সঠিক তথ্য সবার জন্য উন্মুক্ত রাখতে আমরা প্রতিশ্রুতিবদ্ধ।'
    },
    category: 'Transparency',
    author: 'Audit & Accountability Wing',
    date: '2025-01-28',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1000&q=80',
    tags: ['Transparency', 'Audit', 'Ethics'],
    status: 'published'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'event-1',
    slug: 'youth-volunteer-orientation-2025',
    title: {
      en: 'Team Infinity Youth Volunteer Meet & Orientation',
      bn: 'টিম ইনফিনিটি যুব স্বেচ্ছাসেবী মিলনমেলা ও পরিচিতি সভা'
    },
    date: 'Upcoming Schedule',
    time: '3:00 PM – 6:00 PM',
    location: {
      en: 'Dhaka, Bangladesh [VENUE DETAILS SHARED WITH REGISTERED VOLUNTEERS]',
      bn: 'ঢাকা, বাংলাদেশ [নিবন্ধিত স্বেচ্ছাসেবকদের ভেন্যু জানানো হবে]'
    },
    description: {
      en: 'An interactive gathering for new and existing volunteers to discuss humanitarian ethics, upcoming campaign roadmaps, and community leadership.',
      bn: 'নতুন ও পুরাতন স্বেচ্ছাসেবকদের পারস্পরিক পরিচিতি, মানবিক মূল্যবোধ ও আসন্ন ক্যাম্পেইনের রূপরেখা নিয়ে আলোচনা।'
    },
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1000&q=80',
    status: 'upcoming',
    registrationOpen: true
  },
  {
    id: 'event-2',
    slug: 'eid-gift-packaging-drive',
    title: {
      en: 'Eid Gift Packaging & Sorting Workshop',
      bn: 'ঈদ উপহার প্যাকেটজাতকরণ ও বাছাই কর্মশালা'
    },
    date: 'Seasonal Pre-Eid Schedule',
    time: '10:00 AM – 4:00 PM',
    location: {
      en: 'Central Volunteer Hub, Dhaka',
      bn: 'সেন্ট্রাল ভলান্টিয়ার হাব, ঢাকা'
    },
    description: {
      en: 'Volunteers gather to quality-check, fold, and package new clothes and gifts for underprivileged children.',
      bn: 'সুবিধাবঞ্চিত শিশুদের জন্য সংগৃহীত নতুন পোশাক ও উপহার সামগ্রী সুন্দরভাবে প্যাকেটজাত করার সম্মিলিত উদ্যোগ।'
    },
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1000&q=80',
    status: 'upcoming',
    registrationOpen: true
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-hero-1',
    title: { en: 'Infinity Bangladesh Official Gathering', bn: 'টিম ইনফিনিটি অফিশিয়াল সমাবেশ ও শিশুদের মিলনমেলা' },
    caption: { en: 'Team Infinity volunteers and children gather together in solidarity and joy in Hathazari.', bn: 'হাটহাজারীতে শিশুদের মুখে হাসি ফোটানোর মুহূর্তে টিম ইনফিনিটির ভলান্টিয়ারবৃন্দ।' },
    imageUrl: '/images/infinity-cover-hero.jpg',
    category: 'Campaigns',
    date: 'Official Fieldwork',
    location: 'Hathazari, Chattogram',
    campaignSlug: 'eid-anondo-underprivileged'
  },
  {
    id: 'gal-event-1',
    title: { en: 'Winter Warmth Blanket Drive', bn: 'শীতবস্ত্র ও কম্বল বিতরণ কার্যক্রম' },
    caption: { en: 'Direct ground-level delivery of warm blankets to vulnerable families during peak winter.', bn: 'তীব্র শীতে অসহায় পরিবারের মাঝে সরাসরি কম্বল পৌঁছে দেওয়ার মানবিক উদ্যোগ।' },
    imageUrl: '/images/events/winter-warmth.jpg',
    category: 'Events',
    date: 'Winter Season',
    location: 'Hathazari & Northern Bangladesh'
  },
  {
    id: 'gal-ref-1',
    title: { en: 'Executive Committee 2026 Declaration', bn: 'কার্যনির্বাহী কমিটি ২০২৬ ঘোষণা' },
    caption: { en: 'Official declaration and leadership roster of 27 dedicated executive leaders leading the organization.', bn: 'সংগঠনের নেতৃত্ব প্রদানকারী ২৭ সদস্যবিশিষ্ট কার্যনির্বাহী পরিষদের আনুষ্ঠানিক ঘোষণাপত্র।' },
    imageUrl: '/reference/executive-committee-2026.png',
    category: 'Volunteers',
    date: '2026 Session',
    location: 'Central Committee Hub'
  },
  {
    id: 'gal-ref-2',
    title: { en: 'Standing Committee Official Announcement', bn: 'স্থায়ী কমিটি ২০২৬ ঘোষণা' },
    caption: { en: 'Standing committee members guiding structural governance, transparency, and strategic oversight.', bn: 'সাংগঠনিক সিদ্ধান্ত ও পরিচালনায় দিকনির্দেশনা প্রদানকারী স্থায়ী কমিটির সদস্যবৃন্দ।' },
    imageUrl: '/reference/standing-committee-poster.png',
    category: 'Volunteers',
    date: '2026 Session',
    location: 'Central Committee Hub'
  },
  {
    id: 'gal-logo-1',
    title: { en: 'Infinity Bangladesh Official Emblem', bn: 'ইনফিনিটি বাংলাদেশ অফিশিয়াল প্রতীক' },
    caption: { en: 'United for Humanity authoritative brand symbol representing endless compassion and youth power.', bn: 'মানবতার সেবায় একতাবদ্ধ ইনফিনিটি বাংলাদেশের অফিশিয়াল ব্রান্ড প্রতীক।' },
    imageUrl: '/brand/infinity-logo.png',
    category: 'Logos',
    date: 'Brand Identity',
    location: 'Official Archive'
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [];

export const INITIAL_REPORTS: TransparencyReport[] = [
  {
    id: 'rep-1',
    title: {
      en: 'Campaign Execution & Distribution Transparency Document (Template/Official Archive)',
      bn: 'ক্যাম্পেইন পরিচালনা ও বিতরণ স্বচ্ছতা দলিল'
    },
    type: 'Campaign Report',
    year: '2024-2025',
    description: {
      en: 'Standard organizational report outlining campaign goals, field methodologies, volunteer hours, and verified item distribution.',
      bn: 'ক্যাম্পেইনের লক্ষ্য, মাঠপর্যায়ের পদ্ধতি ও সামগ্রী বিতরণের বিস্তারিত বিবরণ।'
    },
    uploadDate: '2025-01-10',
    fileUrl: '#',
    fileSize: '[OFFICIAL FILE UPLOAD REQUIRED]',
    status: 'pending_verification'
  },
  {
    id: 'rep-2',
    title: {
      en: 'Financial Accountability & Donation Utilization Policy',
      bn: 'আর্থিক স্বচ্ছতা ও অনুদান ব্যবহার নীতিমালা'
    },
    type: 'Policy',
    year: '2024-2025',
    description: {
      en: 'Official principles governing zero-waste fund allocation, direct beneficiary delivery, and donation auditing.',
      bn: 'অনুদানের সঠিক বণ্টন ও হিসাব নিরীক্ষার প্রাতিষ্ঠানিক নীতিমালা।'
    },
    uploadDate: '2024-12-05',
    fileUrl: '#',
    fileSize: '[OFFICIAL FILE UPLOAD REQUIRED]',
    status: 'pending_verification'
  }
];

export const INITIAL_PRESS_COVERAGE: PressCoverage[] = [
  {
    id: 'press-1',
    outletName: 'Prothom Alo',
    outletLogoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80',
    title: {
      en: 'Youth Volunteer Movement "Infinity Bangladesh" Distributes Winter Clothes Across Remote Villages',
      bn: 'শীতবস্ত্র নিয়ে প্রত্যন্ত অঞ্চলে তরুণদের প্ল্যাটফর্ম ‘ইনফিনিটি বাংলাদেশ’'
    },
    articleUrl: 'https://www.prothomalo.com',
    excerpt: {
      en: 'Volunteers of Infinity Bangladesh reached over 2,000 cold-affected underprivileged families with thick blankets and warm sweaters in northern districts.',
      bn: 'উত্তরাঞ্চলের শীতার্ত অসহায় মানুষের মাঝে কম্বল ও শীতবস্ত্র পৌঁছে দিল ইনফিনিটি বাংলাদেশের একঝাঁক উদ্যমী তরুণ।'
    },
    coverageType: 'newspaper',
    publishedDate: '2025-01-15',
    imageUrl: '/images/infinity-cover-hero.jpg',
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'press-2',
    outletName: 'The Daily Star',
    outletLogoUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=200&q=80',
    title: {
      en: 'Infinity Bangladesh Sets Benchmark in Transparency for Youth Non-Profits',
      bn: 'স্বেচ্ছাসেবী কার্যক্রমে স্বচ্ছতার দৃষ্টান্ত স্থাপন করছে ইনফিনিটি বাংলাদেশ'
    },
    articleUrl: 'https://www.thedailystar.net',
    excerpt: {
      en: 'By publishing every expense voucher and donation ledger online, Team Infinity is creating a culture of trust and ethical social leadership.',
      bn: 'প্রতিটি আর্থিক হিসাব ও বিতরণ তালিকা উন্মুক্ত করে স্বেচ্ছাসেবার ক্ষেত্রে শতভাগ স্বচ্ছতা বজায় রাখছে সংগঠনটি।'
    },
    coverageType: 'newspaper',
    publishedDate: '2025-02-02',
    imageUrl: '/images/winter-warmth.jpg',
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'press-3',
    outletName: 'Somoy TV News',
    outletLogoUrl: 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=200&q=80',
    title: {
      en: 'Video Report: Emergency Flood Relief Delivered to Trapped Families in Feni & Noakhali',
      bn: 'ভিডিও প্রতিবেদন: ফেনী ও নোয়াখালীর পানিবন্দী মানুষের কাছে ইনফিনিটির জরুরি ত্রাণ'
    },
    articleUrl: 'https://somoynews.tv',
    excerpt: {
      en: 'Special field coverage on rescue boats and dry ration packets distributed during the devastating flash floods by Infinity volunteers.',
      bn: 'ভয়াবহ বন্যায় ঝুঁকি নিয়ে নৌকায় করে দুর্গতদের দোরগোড়ায় পৌঁছে দেওয়া হয় শুকনো খাবার ও জীবনরক্ষাকারী ওষুধ।'
    },
    coverageType: 'tv',
    publishedDate: '2024-09-10',
    imageUrl: '/images/infinity-cover-hero.jpg',
    isFeatured: true,
    status: 'published'
  },
  {
    id: 'press-4',
    outletName: 'Dhaka Tribune',
    outletLogoUrl: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=200&q=80',
    title: {
      en: 'Empowering Street Children Through Joyful Learning: "Patho Shishu Smile" Initiative',
      bn: 'সুবিধাবঞ্চিত শিশুদের জন্য ইনফিনিটি বাংলাদেশের শিক্ষা ও পুষ্টি কর্মসূচি'
    },
    articleUrl: 'https://www.dhakatribune.com',
    excerpt: {
      en: 'An in-depth feature highlighting basic literacy, moral education, and healthy meals provided to over 150 slum kids every weekend.',
      bn: 'সাপ্তাহিক ক্লাসের মাধ্যমে শিশুদের প্রাথমিক শিক্ষা ও পুষ্টিকর খাবার সরবরাহ করছে টিম ইনফিনিটি।'
    },
    coverageType: 'online',
    publishedDate: '2024-11-20',
    imageUrl: '/images/winter-warmth.jpg',
    isFeatured: false,
    status: 'published'
  }
];

export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'part-1',
    name: '[OFFICIAL PARTNER/INSTITUTIONAL COLLABORATOR SLOT]',
    website: 'https://infinitybangladesh.org',
    type: 'Institutional',
    description: {
      en: 'Verified academic clubs, student unions, and social welfare alliances partnering on youth volunteer drives.',
      bn: 'স্বেচ্ছাসেবী কার্যক্রমে অংশীদারিত্বের জন্য উন্মুক্ত সুযোগ।'
    },
    partnershipYear: '2025'
  }
];

export const INITIAL_VOLUNTEER_APPLICATIONS: VolunteerApplication[] = [
  {
    id: 'vol-1',
    fullName: 'Demo Applicant (Sample for Admin Verification)',
    email: 'volunteer.sample@example.com',
    phone: '+8801700000000',
    district: 'Dhaka',
    upazila: 'Dhanmondi',
    age: 22,
    occupation: 'University Student',
    bloodGroup: 'B+',
    skills: ['Event Management', 'Photography', 'Field Coordination'],
    areasOfInterest: ['Child Welfare', 'Eid Campaigns', 'Emergency Relief'],
    interests: ['Field Distribution & Relief', 'Logistics & Packing'],
    previousExperience: 'Organized local campus donation drive.',
    availability: 'Weekends & Holidays (10-15 hours/month)',
    message: 'I want to stand with Team Infinity and support vulnerable children in Bangladesh.',
    consent: true,
    agreedCodeOfConduct: true,
    submittedAt: '2025-02-18 14:30',
    appliedAt: '2025-02-18 14:30',
    status: 'Reviewing',
    adminNotes: 'Sample entry to test admin approval workflow.'
  }
];

export const INITIAL_DONATIONS: DonationRecord[] = [
  {
    id: 'don-1',
    receiptNumber: 'REC-2025-001',
    donorName: 'Anonymous Supporter',
    donorEmail: 'donor@example.com',
    donorPhone: '+8801800000000',
    amount: 1500,
    amountBDT: 1500,
    currency: 'BDT',
    campaignSlug: 'eid-anondo-underprivileged',
    campaignTitle: 'সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ (Eid Joy Drive)',
    donationType: 'campaign-specific',
    paymentMethod: 'bKash',
    transactionId: 'TRX9827364510',
    date: '2025-02-19 18:22',
    donatedAt: '2025-02-19 18:22',
    status: 'Successful',
    isAnonymous: true,
    notes: 'For underprivileged children Eid dresses.'
  }
];

export const INITIAL_POSITIONS: Position[] = [
  { id: 'pos-1', name: { en: 'President', bn: 'সভাপতি' }, level: 1, sortOrder: 1, description: { en: 'Chief Executive Leader', bn: 'প্রধান নির্বাহী ও নেতৃত্ব' } },
  { id: 'pos-chairman', name: { en: 'Chairman', bn: 'চেয়ারম্যান' }, level: 1, sortOrder: 1, description: { en: 'Standing Committee Chairman', bn: 'স্থায়ী কমিটির চেয়ারম্যান' } },
  { id: 'pos-2', name: { en: 'Senior Vice President', bn: 'সিনিয়র সহ-সভাপতি' }, level: 2, sortOrder: 2 },
  { id: 'pos-vice-chairman', name: { en: 'Vice-Chairman', bn: 'ভাইস-চেয়ারম্যান' }, level: 2, sortOrder: 2, description: { en: 'Standing Committee Vice-Chairman', bn: 'স্থায়ী কমিটির ভাইস-চেয়ারম্যান' } },
  { id: 'pos-3', name: { en: 'Vice President', bn: 'সহ-সভাপতি' }, level: 2, sortOrder: 3 },
  { id: 'pos-4', name: { en: 'General Secretary', bn: 'সাধারণ সম্পাদক' }, level: 3, sortOrder: 4, description: { en: 'Executive Secretariat Lead', bn: 'সাংগঠনিক প্রশাসন ও কার্যক্রম সমন্বয়' } },
  { id: 'pos-5', name: { en: 'Joint General Secretary', bn: 'যুগ্ম সাধারণ সম্পাদক' }, level: 4, sortOrder: 5 },
  { id: 'pos-6', name: { en: 'Joint Organizing Secretary', bn: 'যুগ্ম সাংগঠনিক সম্পাদক' }, level: 4, sortOrder: 6 },
  { id: 'pos-7', name: { en: 'Organizing Secretary', bn: 'সাংগঠনিক সম্পাদক' }, level: 4, sortOrder: 7 },
  { id: 'pos-8', name: { en: 'Finance Secretary', bn: 'অর্থ সম্পাদক' }, level: 4, sortOrder: 8 },
  { id: 'pos-9', name: { en: 'Joint Finance Secretary', bn: 'যুগ্ম অর্থ সম্পাদক' }, level: 4, sortOrder: 9 },
  { id: 'pos-10', name: { en: 'Student Affairs Secretary (Female)', bn: 'ছাত্রী বিষয়ক সম্পাদক' }, level: 4, sortOrder: 10 },
  { id: 'pos-11', name: { en: 'Joint Student Affairs Secretary (Female)', bn: 'যুগ্ম ছাত্রী বিষয়ক সম্পাদক' }, level: 4, sortOrder: 11 },
  { id: 'pos-12', name: { en: 'Publicity Secretary', bn: 'প্রচার সম্পাদক' }, level: 4, sortOrder: 12 },
  { id: 'pos-13', name: { en: 'Joint Publicity Secretary', bn: 'যুগ্ম প্রচার সম্পাদক' }, level: 4, sortOrder: 13 },
  { id: 'pos-14', name: { en: 'Office Secretary', bn: 'দপ্তর সম্পাদক' }, level: 4, sortOrder: 14 },
  { id: 'pos-15', name: { en: 'Cultural Secretary', bn: 'সাংস্কৃতিক সম্পাদক' }, level: 4, sortOrder: 15 },
  { id: 'pos-16', name: { en: 'Relief and Disaster Affairs Secretary', bn: 'ত্রাণ ও দুর্যোগ বিষয়ক সম্পাদক' }, level: 4, sortOrder: 16 },
  { id: 'pos-17', name: { en: 'Sports Secretary', bn: 'ক্রীড়া সম্পাদক' }, level: 4, sortOrder: 17 },
  { id: 'pos-18', name: { en: 'Social Welfare Secretary', bn: 'সমাজকল্যাণ সম্পাদক' }, level: 4, sortOrder: 18 },
  { id: 'pos-member', name: { en: 'Member', bn: 'সদস্য' }, level: 5, sortOrder: 25, description: { en: 'Committee Member', bn: 'কমিটি সদস্য' } }
];

export const INITIAL_COMMITTEES: Committee[] = [
  {
    id: 'comm-exec-2026',
    slug: 'executive-committee-2026',
    name: { en: 'Infinity Bangladesh Executive Committee — 2026', bn: 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী কমিটি — ২০২৬' },
    type: 'EXECUTIVE',
    year: '2026',
    description: {
      en: 'The elected executive leadership driving humanitarian field drives, child welfare programs, and volunteer operations across Bangladesh for the year 2026.',
      bn: '২০২৬ সালের জন্য মানবিক ত্রাণ কার্যক্রম, শিশু অধিকার ও স্বেচ্ছাসেবা পরিচালনার দায়িত্বে নিয়োজিত নির্বাচিত কার্যনির্বাহী পরিষদ।'
    },
    status: 'ACTIVE',
    sortOrder: 1,
    isFeatured: true,
    createdAt: '2026-01-01'
  },
  {
    id: 'comm-stand-central',
    slug: 'standing-committee',
    name: { en: 'Infinity Bangladesh Standing Committee', bn: 'ইনফিনিটি বাংলাদেশ স্থায়ী কমিটি' },
    type: 'STANDING',
    year: '2026',
    description: {
      en: 'The central standing committee providing strategic direction, institutional policy oversight, and governance continuity for Infinity Bangladesh.',
      bn: 'ইনফিনিটি বাংলাদেশ-এর নীতি নির্ধারণ, দীর্ঘমেয়াদী দিকনির্দেশনা ও প্রাতিষ্ঠানিক তত্ত্বাবধানকারী কেন্দ্রীয় স্থায়ী কমিটি।'
    },
    status: 'ACTIVE',
    sortOrder: 1,
    isFeatured: true,
    createdAt: '2026-01-01'
  },
  {
    id: 'comm-stand-youth',
    slug: 'standing-youth-education',
    name: { en: 'Standing Committee on Youth & Education', bn: 'যুব উন্নয়ন ও শিক্ষা বিষয়ক স্থায়ী কমিটি' },
    type: 'STANDING',
    year: '2026',
    description: {
      en: 'Permanent oversight body dedicated to youth skill development, scholarship distribution, and school support for underprivileged children.',
      bn: 'সুবিধাবঞ্চিত শিশুদের প্রাথমিক শিক্ষা ও তরুণদের সামাজিক নেতৃত্ব বিকাশে নিবেদিত স্থায়ী কমিটি।'
    },
    status: 'ACTIVE',
    sortOrder: 2,
    isFeatured: false,
    createdAt: '2026-01-01'
  },
  {
    id: 'comm-stand-relief',
    slug: 'standing-relief-disaster',
    name: { en: 'Standing Committee on Relief & Disaster Response', bn: 'ত্রাণ ও দুর্যোগ ব্যবস্থাপনা স্থায়ী কমিটি' },
    type: 'STANDING',
    year: '2026',
    description: {
      en: 'Standing emergency response body managing rapid flood relief, winter blanket distribution, and urgent food assistance logistics.',
      bn: 'বন্যা, দুর্যোগ ও শীতবস্ত্র বিতরণের দ্রুত মানবিক সহায়তা পরিচালনায় নিবেদিত স্থায়ী কমিটি।'
    },
    status: 'ACTIVE',
    sortOrder: 3,
    isFeatured: false,
    createdAt: '2026-01-01'
  },
  {
    id: 'comm-stand-child',
    slug: 'standing-child-welfare',
    name: { en: 'Standing Committee on Child Welfare & Dignity', bn: 'শিশু অধিকার ও সামাজিক মর্যাদা স্থায়ী কমিটি' },
    type: 'STANDING',
    year: '2026',
    description: {
      en: 'Permanent committee focused on orphan care, street children protection, and dignity-first social inclusion drives.',
      bn: 'সুবিধাবঞ্চিত ও ছিন্নমূল শিশুদের সুরক্ষা এবং মর্যাদা রক্ষায় নিয়োজিত স্থায়ী কমিটি।'
    },
    status: 'ACTIVE',
    sortOrder: 4,
    isFeatured: false,
    createdAt: '2026-01-01'
  },
  {
    id: 'comm-exec-2025',
    slug: 'executive-committee-2025',
    name: { en: 'Infinity Bangladesh Executive Committee — 2025', bn: 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী কমিটি — ২০২৫' },
    type: 'PAST',
    year: '2025',
    description: {
      en: 'Archived executive leadership of Infinity Bangladesh for the service year 2025.',
      bn: '২০২৫ সালের জন্য ইনফিনিটি বাংলাদেশের দায়িত্ব পালনকারী প্রাক্তন কার্যনির্বাহী পরিষদ।'
    },
    status: 'ARCHIVED',
    sortOrder: 5,
    isFeatured: false,
    createdAt: '2025-01-01'
  }
];

export const INITIAL_PERSONS: Person[] = [
  {
    id: 'person-1',
    fullName: 'MD. SHAHIDUL ALAM SAKIB',
    banglaName: 'মোঃ শাহিদুল আলম সাকিব',
    englishName: 'MD. SHAHIDUL ALAM SAKIB',
    photoUrl: '/images/members/exec-1-md-shahidul-alam-sakib.png',
    shortBio: { en: 'President, Infinity Bangladesh (Executive Committee 2026)', bn: 'সভাপতি, ইনফিনিটি বাংলাদেশ (কার্যনির্বাহী পরিষদ ২০২৬)' },
    active: true
  },
  {
    id: 'person-2',
    fullName: 'MOHAMMAD ISMAIL',
    banglaName: 'মোহাম্মদ ইসমাইল',
    englishName: 'MOHAMMAD ISMAIL',
    photoUrl: '/images/members/exec-2-mohammad-ismail.png',
    shortBio: { en: 'Senior Vice President, Infinity Bangladesh', bn: 'সিনিয়র সহ-সভাপতি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-3',
    fullName: 'JOINUL ABEDIN',
    banglaName: 'জয়নুল আবেদীন',
    englishName: 'JOINUL ABEDIN',
    photoUrl: '/images/members/exec-3-joinul-abedin.png',
    shortBio: { en: 'Vice President, Infinity Bangladesh', bn: 'সহ-সভাপতি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-4',
    fullName: 'SOHEL AKRAM SOBUJ',
    banglaName: 'সোহেল আকরাম সবুজ',
    englishName: 'SOHEL AKRAM SOBUJ',
    photoUrl: '/images/members/exec-4-sohel-akram-sobuj.png',
    shortBio: { en: 'Vice President, Infinity Bangladesh', bn: 'সহ-সভাপতি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-5',
    fullName: 'SALIMUR RAHMAN OPI',
    banglaName: 'সলিমুর রহমান অপি',
    englishName: 'SALIMUR RAHMAN OPI',
    photoUrl: '/images/members/exec-5-salimur-rahman-opi.png',
    shortBio: { en: 'General Secretary, Infinity Bangladesh', bn: 'সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-6',
    fullName: 'ANAYET ULLAH FARHAD',
    banglaName: 'এনায়েত উল্লাহ ফারহাদ',
    englishName: 'ANAYET ULLAH FARHAD',
    photoUrl: '/images/members/exec-6-anayet-ullah-farhad.png',
    shortBio: { en: 'Joint General Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-7',
    fullName: 'MD. NIAJ UDDIN SAKIB',
    banglaName: 'মোঃ নিয়াজ উদ্দিন সাকিব',
    englishName: 'MD. NIAJ UDDIN SAKIB',
    photoUrl: '/images/members/exec-7-md-niaj-udden-sakib.png',
    shortBio: { en: 'Joint General Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-8',
    fullName: 'REAZ UDDIN',
    banglaName: 'রিয়াজ উদ্দিন',
    englishName: 'REAZ UDDIN',
    photoUrl: '/images/members/exec-8-reaz-uddin.png',
    shortBio: { en: 'Joint General Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-9',
    fullName: 'SHAHADAT ISLAM',
    banglaName: 'শাহাদাত ইসলাম',
    englishName: 'SHAHADAT ISLAM',
    photoUrl: '/images/members/exec-9-shahadat-islam.png',
    shortBio: { en: 'Joint General Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-10',
    fullName: 'KAISAR AHMED IRFAN',
    banglaName: 'কায়সার আহমেদ ইরফান',
    englishName: 'KAISAR AHMED IRFAN',
    photoUrl: '/images/members/exec-10-kaisar-ahmed-irfan.png',
    shortBio: { en: 'Joint General Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাধারণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-11',
    fullName: 'MD. ISMAIL NUR SAKIB',
    banglaName: 'মোঃ ইসমাইল নুর সাকিব',
    englishName: 'MD. ISMAIL NUR SAKIB',
    photoUrl: '/images/members/exec-11-md-ismail-nur-sakib.png',
    shortBio: { en: 'Joint Organizing Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাংগঠনিক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-12',
    fullName: 'MD ARFAT',
    banglaName: 'মোঃ আরফাত',
    englishName: 'MD ARFAT',
    photoUrl: '/images/members/exec-12-md-arfat.png',
    shortBio: { en: 'Organizing Secretary, Infinity Bangladesh', bn: 'সাংগঠনিক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-13',
    fullName: 'KAISAR AHMED OVI',
    banglaName: 'কায়সার আহমেদ অভি',
    englishName: 'KAISAR AHMED OVI',
    photoUrl: '/images/members/exec-13-kaisar-ahmed-ovi.png',
    shortBio: { en: 'Joint Organizing Secretary, Infinity Bangladesh', bn: 'যুগ্ম সাংগঠনিক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-14',
    fullName: 'MUNMUN BANIK',
    banglaName: 'মুনমুন বণিক',
    englishName: 'MUNMUN BANIK',
    photoUrl: '/images/members/exec-14-munmun-banik.png',
    shortBio: { en: 'Joint Finance Secretary, Infinity Bangladesh', bn: 'যুগ্ম অর্থ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-15',
    fullName: 'MD SHAHADAD ALAM',
    banglaName: 'মোঃ শাহাদাত আলম',
    englishName: 'MD SHAHADAD ALAM',
    photoUrl: '/images/members/exec-15-md-shahadad-alam.png',
    shortBio: { en: 'Finance Secretary, Infinity Bangladesh', bn: 'অর্থ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-16',
    fullName: 'MD MEHEDI HASAN',
    banglaName: 'মোঃ মেহেদী হাসান',
    englishName: 'MD MEHEDI HASAN',
    photoUrl: '/images/members/exec-16-md-mehedi-hasan.png',
    shortBio: { en: 'Joint Finance Secretary, Infinity Bangladesh', bn: 'যুগ্ম অর্থ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-17',
    fullName: 'SUMAYA IMROZ',
    banglaName: 'সুমাইয়া ইমরোজ',
    englishName: 'SUMAYA IMROZ',
    photoUrl: '/images/members/exec-17-sumaya-imroz.png',
    shortBio: { en: 'Joint Student Affairs Secretary (Female), Infinity Bangladesh', bn: 'যুগ্ম ছাত্রী বিষয়ক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-18',
    fullName: 'SHANZIDA SHARMIN',
    banglaName: 'শানজিদা শারমিন',
    englishName: 'SHANZIDA SHARMIN',
    photoUrl: '/images/members/exec-18-shanzida-sharmin.png',
    shortBio: { en: 'Student Affairs Secretary (Female), Infinity Bangladesh', bn: 'ছাত্রী বিষয়ক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-19',
    fullName: 'DIPA SHIL',
    banglaName: 'দীপা শীল',
    englishName: 'DIPA SHIL',
    photoUrl: '/images/members/exec-19-dipa-shil.png',
    shortBio: { en: 'Joint Student Affairs Secretary (Female), Infinity Bangladesh', bn: 'যুগ্ম ছাত্রী বিষয়ক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-20',
    fullName: 'REFAT SHARIF',
    banglaName: 'রিফাত শরীফ',
    englishName: 'REFAT SHARIF',
    photoUrl: '/images/members/exec-20-refat-sharif.png',
    shortBio: { en: 'Joint Publicity Secretary, Infinity Bangladesh', bn: 'যুগ্ম প্রচার সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-21',
    fullName: 'MD RAMJAN',
    banglaName: 'মোঃ রমজান',
    englishName: 'MD RAMJAN',
    photoUrl: '/images/members/exec-21-md-ramjan.png',
    shortBio: { en: 'Publicity Secretary, Infinity Bangladesh', bn: 'প্রচার সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-22',
    fullName: 'SUSMITA RANI NATH',
    banglaName: 'সুস্মিতা রানী নাথ',
    englishName: 'SUSMITA RANI NATH',
    photoUrl: '/images/members/exec-22-susmita-rani-nath.png',
    shortBio: { en: 'Joint Publicity Secretary, Infinity Bangladesh', bn: 'যুগ্ম প্রচার সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-23',
    fullName: 'TANVIR RANA RIYAD',
    banglaName: 'তানভীর রানা রিয়াদ',
    englishName: 'TANVIR RANA RIYAD',
    photoUrl: '/images/members/exec-23-tanvir-rana-riyad.png',
    shortBio: { en: 'Office Secretary, Infinity Bangladesh', bn: 'দপ্তর সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-24',
    fullName: 'JOY NATH',
    banglaName: 'জয় নাথ',
    englishName: 'JOY NATH',
    photoUrl: '/images/members/exec-24-joy-nath.png',
    shortBio: { en: 'Cultural Secretary, Infinity Bangladesh', bn: 'সাংস্কৃতিক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-25',
    fullName: 'RAKIBUL KARIM',
    banglaName: 'রকিবুল করিম',
    englishName: 'RAKIBUL KARIM',
    photoUrl: '/images/members/exec-25-rakibul-karim.png',
    shortBio: { en: 'Relief and Disaster Affairs Secretary, Infinity Bangladesh', bn: 'ত্রাণ ও দুর্যোগ বিষয়ক সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-26',
    fullName: 'TANJIT HOSSEN',
    banglaName: 'তানজিত হোসেন',
    englishName: 'TANJIT HOSSEN',
    photoUrl: '/images/members/exec-26-tanjit-hossen.png',
    shortBio: { en: 'Sports Secretary, Infinity Bangladesh', bn: 'ক্রীড়া সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-27',
    fullName: 'AZIZUR RAHMAN',
    banglaName: 'আজিজুর রহমান',
    englishName: 'AZIZUR RAHMAN',
    photoUrl: '/images/members/exec-27-azizur-rahman.png',
    shortBio: { en: 'Social Welfare Secretary, Infinity Bangladesh', bn: 'সমাজকল্যাণ সম্পাদক, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  // Standing Committee Official Members (from official poster)
  {
    id: 'person-sc-1',
    fullName: 'Sakib Al Karim',
    banglaName: 'সাকিব আল করিম',
    englishName: 'Sakib Al Karim',
    photoUrl: '/images/members/sc-1-sakib-al-karim.png',
    shortBio: { en: 'Chairman, Standing Committee, Infinity Bangladesh', bn: 'চেয়ারম্যান, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-2',
    fullName: 'Tamimul Hasib Rimad',
    banglaName: 'তামীমুল হাসিব রিমাদ',
    englishName: 'Tamimul Hasib Rimad',
    photoUrl: '/images/members/sc-2-tamimul-hasib-rimad.png',
    shortBio: { en: 'Vice-Chairman, Standing Committee, Infinity Bangladesh', bn: 'ভাইস-চেয়ারম্যান, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-3',
    fullName: 'Shifat Sattar',
    banglaName: 'শিফাত সাত্তার',
    englishName: 'Shifat Sattar',
    photoUrl: '/images/members/sc-3-shifat-sattar.png',
    shortBio: { en: 'Vice-Chairman, Standing Committee, Infinity Bangladesh', bn: 'ভাইস-চেয়ারম্যান, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-4',
    fullName: 'Ishtiaqe Ahmed',
    banglaName: 'ইশতিয়াক আহমেদ',
    englishName: 'Ishtiaqe Ahmed',
    photoUrl: '/images/members/sc-4-ishtiaqe-ahmed.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্য, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-5',
    fullName: 'Chaity Debi Piya',
    banglaName: 'চৈতি দেবী পিয়া',
    englishName: 'Chaity Debi Piya',
    photoUrl: '/images/members/sc-5-chaity-debi-piya.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্যা, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-6',
    fullName: 'Rakib Ahmed',
    banglaName: 'রাকিব আহমেদ',
    englishName: 'Rakib Ahmed',
    photoUrl: '/images/members/sc-6-rakib-ahmed.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্য, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-7',
    fullName: 'Md Ashraful Islam',
    banglaName: 'মোঃ আশরাফুল ইসলাম',
    englishName: 'Md Ashraful Islam',
    photoUrl: '/images/members/sc-7-md-ashraful-islam.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্য, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-8',
    fullName: 'Tanveer Haidar Rakib',
    banglaName: 'তানভীর হায়দার রাকিব',
    englishName: 'Tanveer Haidar Rakib',
    photoUrl: '/images/members/sc-8-tanveer-haidar-rakib.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্য, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  },
  {
    id: 'person-sc-9',
    fullName: 'Md Arshad',
    banglaName: 'মোঃ এরশাদ',
    englishName: 'Md Arshad',
    photoUrl: '/images/members/sc-9-md-arshad.png',
    shortBio: { en: 'Member, Standing Committee, Infinity Bangladesh', bn: 'সদস্য, স্থায়ী কমিটি, ইনফিনিটি বাংলাদেশ' },
    active: true
  }
];

export const INITIAL_COMMITTEE_MEMBERS: CommitteeMember[] = [
  // Executive Committee 2026
  // 01 - President
  { id: 'cm-1', committeeId: 'comm-exec-2026', personId: 'person-1', positionId: 'pos-1', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ACTIVE' },
  // 02 - Senior Vice President
  { id: 'cm-2', committeeId: 'comm-exec-2026', personId: 'person-2', positionId: 'pos-2', serialNumber: 2, sortOrder: 2, isFeaturedLeader: true, status: 'ACTIVE' },
  // 03 - Vice President
  { id: 'cm-3', committeeId: 'comm-exec-2026', personId: 'person-3', positionId: 'pos-3', serialNumber: 3, sortOrder: 3, isFeaturedLeader: true, status: 'ACTIVE' },
  // 04 - Vice President
  { id: 'cm-4', committeeId: 'comm-exec-2026', personId: 'person-4', positionId: 'pos-3', serialNumber: 4, sortOrder: 4, isFeaturedLeader: true, status: 'ACTIVE' },
  // 05 - General Secretary
  { id: 'cm-5', committeeId: 'comm-exec-2026', personId: 'person-5', positionId: 'pos-4', serialNumber: 5, sortOrder: 5, isFeaturedLeader: true, status: 'ACTIVE' },
  // 06 - Joint General Secretary
  { id: 'cm-6', committeeId: 'comm-exec-2026', personId: 'person-6', positionId: 'pos-5', serialNumber: 6, sortOrder: 6, isFeaturedLeader: false, status: 'ACTIVE' },
  // 07 - Joint General Secretary
  { id: 'cm-7', committeeId: 'comm-exec-2026', personId: 'person-7', positionId: 'pos-5', serialNumber: 7, sortOrder: 7, isFeaturedLeader: false, status: 'ACTIVE' },
  // 08 - Joint General Secretary
  { id: 'cm-8', committeeId: 'comm-exec-2026', personId: 'person-8', positionId: 'pos-5', serialNumber: 8, sortOrder: 8, isFeaturedLeader: false, status: 'ACTIVE' },
  // 09 - Joint General Secretary
  { id: 'cm-9', committeeId: 'comm-exec-2026', personId: 'person-9', positionId: 'pos-5', serialNumber: 9, sortOrder: 9, isFeaturedLeader: false, status: 'ACTIVE' },
  // 10 - Joint General Secretary
  { id: 'cm-10', committeeId: 'comm-exec-2026', personId: 'person-10', positionId: 'pos-5', serialNumber: 10, sortOrder: 10, isFeaturedLeader: false, status: 'ACTIVE' },
  // 11 - Joint Organizing Secretary
  { id: 'cm-11', committeeId: 'comm-exec-2026', personId: 'person-11', positionId: 'pos-6', serialNumber: 11, sortOrder: 11, isFeaturedLeader: false, status: 'ACTIVE' },
  // 12 - Organizing Secretary
  { id: 'cm-12', committeeId: 'comm-exec-2026', personId: 'person-12', positionId: 'pos-7', serialNumber: 12, sortOrder: 12, isFeaturedLeader: false, status: 'ACTIVE' },
  // 13 - Joint Organizing Secretary
  { id: 'cm-13', committeeId: 'comm-exec-2026', personId: 'person-13', positionId: 'pos-6', serialNumber: 13, sortOrder: 13, isFeaturedLeader: false, status: 'ACTIVE' },
  // 14 - Joint Finance Secretary
  { id: 'cm-14', committeeId: 'comm-exec-2026', personId: 'person-14', positionId: 'pos-9', serialNumber: 14, sortOrder: 14, isFeaturedLeader: false, status: 'ACTIVE' },
  // 15 - Finance Secretary
  { id: 'cm-15', committeeId: 'comm-exec-2026', personId: 'person-15', positionId: 'pos-8', serialNumber: 15, sortOrder: 15, isFeaturedLeader: false, status: 'ACTIVE' },
  // 16 - Joint Finance Secretary
  { id: 'cm-16', committeeId: 'comm-exec-2026', personId: 'person-16', positionId: 'pos-9', serialNumber: 16, sortOrder: 16, isFeaturedLeader: false, status: 'ACTIVE' },
  // 17 - Joint Student Affairs Secretary (Female)
  { id: 'cm-17', committeeId: 'comm-exec-2026', personId: 'person-17', positionId: 'pos-11', serialNumber: 17, sortOrder: 17, isFeaturedLeader: false, status: 'ACTIVE' },
  // 18 - Student Affairs Secretary (Female)
  { id: 'cm-18', committeeId: 'comm-exec-2026', personId: 'person-18', positionId: 'pos-10', serialNumber: 18, sortOrder: 18, isFeaturedLeader: false, status: 'ACTIVE' },
  // 19 - Joint Student Affairs Secretary (Female)
  { id: 'cm-19', committeeId: 'comm-exec-2026', personId: 'person-19', positionId: 'pos-11', serialNumber: 19, sortOrder: 19, isFeaturedLeader: false, status: 'ACTIVE' },
  // 20 - Joint Publicity Secretary
  { id: 'cm-20', committeeId: 'comm-exec-2026', personId: 'person-20', positionId: 'pos-13', serialNumber: 20, sortOrder: 20, isFeaturedLeader: false, status: 'ACTIVE' },
  // 21 - Publicity Secretary
  { id: 'cm-21', committeeId: 'comm-exec-2026', personId: 'person-21', positionId: 'pos-12', serialNumber: 21, sortOrder: 21, isFeaturedLeader: false, status: 'ACTIVE' },
  // 22 - Joint Publicity Secretary
  { id: 'cm-22', committeeId: 'comm-exec-2026', personId: 'person-22', positionId: 'pos-13', serialNumber: 22, sortOrder: 22, isFeaturedLeader: false, status: 'ACTIVE' },
  // 23 - Office Secretary
  { id: 'cm-23', committeeId: 'comm-exec-2026', personId: 'person-23', positionId: 'pos-14', serialNumber: 23, sortOrder: 23, isFeaturedLeader: false, status: 'ACTIVE' },
  // 24 - Cultural Secretary
  { id: 'cm-24', committeeId: 'comm-exec-2026', personId: 'person-24', positionId: 'pos-15', serialNumber: 24, sortOrder: 24, isFeaturedLeader: false, status: 'ACTIVE' },
  // 25 - Relief and Disaster Affairs Secretary
  { id: 'cm-25', committeeId: 'comm-exec-2026', personId: 'person-25', positionId: 'pos-16', serialNumber: 25, sortOrder: 25, isFeaturedLeader: false, status: 'ACTIVE' },
  // 26 - Sports Secretary
  { id: 'cm-26', committeeId: 'comm-exec-2026', personId: 'person-26', positionId: 'pos-17', serialNumber: 26, sortOrder: 26, isFeaturedLeader: false, status: 'ACTIVE' },
  // 27 - Social Welfare Secretary
  { id: 'cm-27', committeeId: 'comm-exec-2026', personId: 'person-27', positionId: 'pos-18', serialNumber: 27, sortOrder: 27, isFeaturedLeader: false, status: 'ACTIVE' },

  // Standing Committee (9 Official Members)
  // 01 - Chairman
  { id: 'cm-sc-1', committeeId: 'comm-stand-central', personId: 'person-sc-1', positionId: 'pos-chairman', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ACTIVE' },
  // 02 - Vice-Chairman
  { id: 'cm-sc-2', committeeId: 'comm-stand-central', personId: 'person-sc-2', positionId: 'pos-vice-chairman', serialNumber: 2, sortOrder: 2, isFeaturedLeader: true, status: 'ACTIVE' },
  // 03 - Vice-Chairman
  { id: 'cm-sc-3', committeeId: 'comm-stand-central', personId: 'person-sc-3', positionId: 'pos-vice-chairman', serialNumber: 3, sortOrder: 3, isFeaturedLeader: true, status: 'ACTIVE' },
  // 04 - Member
  { id: 'cm-sc-4', committeeId: 'comm-stand-central', personId: 'person-sc-4', positionId: 'pos-member', serialNumber: 4, sortOrder: 4, isFeaturedLeader: false, status: 'ACTIVE' },
  // 05 - Member
  { id: 'cm-sc-5', committeeId: 'comm-stand-central', personId: 'person-sc-5', positionId: 'pos-member', serialNumber: 5, sortOrder: 5, isFeaturedLeader: false, status: 'ACTIVE' },
  // 06 - Member
  { id: 'cm-sc-6', committeeId: 'comm-stand-central', personId: 'person-sc-6', positionId: 'pos-member', serialNumber: 6, sortOrder: 6, isFeaturedLeader: false, status: 'ACTIVE' },
  // 07 - Member
  { id: 'cm-sc-7', committeeId: 'comm-stand-central', personId: 'person-sc-7', positionId: 'pos-member', serialNumber: 7, sortOrder: 7, isFeaturedLeader: false, status: 'ACTIVE' },
  // 08 - Member
  { id: 'cm-sc-8', committeeId: 'comm-stand-central', personId: 'person-sc-8', positionId: 'pos-member', serialNumber: 8, sortOrder: 8, isFeaturedLeader: false, status: 'ACTIVE' },
  // 09 - Member
  { id: 'cm-sc-9', committeeId: 'comm-stand-central', personId: 'person-sc-9', positionId: 'pos-member', serialNumber: 9, sortOrder: 9, isFeaturedLeader: false, status: 'ACTIVE' },

  // Standing Committee on Youth & Education
  { id: 'cm-sc-youth-1', committeeId: 'comm-stand-youth', personId: 'person-sc-4', positionId: 'pos-chairman', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ACTIVE' },
  { id: 'cm-sc-youth-2', committeeId: 'comm-stand-youth', personId: 'person-sc-5', positionId: 'pos-member', serialNumber: 2, sortOrder: 2, isFeaturedLeader: false, status: 'ACTIVE' },

  // Standing Committee on Relief & Disaster Response
  { id: 'cm-sc-relief-1', committeeId: 'comm-stand-relief', personId: 'person-sc-6', positionId: 'pos-chairman', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ACTIVE' },
  { id: 'cm-sc-relief-2', committeeId: 'comm-stand-relief', personId: 'person-sc-7', positionId: 'pos-member', serialNumber: 2, sortOrder: 2, isFeaturedLeader: false, status: 'ACTIVE' },

  // Standing Committee on Child Welfare & Dignity
  { id: 'cm-sc-child-1', committeeId: 'comm-stand-child', personId: 'person-sc-8', positionId: 'pos-chairman', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ACTIVE' },
  { id: 'cm-sc-child-2', committeeId: 'comm-stand-child', personId: 'person-sc-9', positionId: 'pos-member', serialNumber: 2, sortOrder: 2, isFeaturedLeader: false, status: 'ACTIVE' },

  // Past Committee 2025 Archive
  { id: 'cm-past-25-1', committeeId: 'comm-exec-2025', personId: 'person-1', positionId: 'pos-1', serialNumber: 1, sortOrder: 1, isFeaturedLeader: true, status: 'ARCHIVED' },
  { id: 'cm-past-25-2', committeeId: 'comm-exec-2025', personId: 'person-6', positionId: 'pos-5', serialNumber: 2, sortOrder: 2, isFeaturedLeader: true, status: 'ARCHIVED' },
  { id: 'cm-past-25-3', committeeId: 'comm-exec-2025', personId: 'person-2', positionId: 'pos-2', serialNumber: 3, sortOrder: 3, isFeaturedLeader: false, status: 'ARCHIVED' }
];
