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
  CommitteeMember
} from '../types';

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  organizationName: 'Infinity Bangladesh',
  teamIdentity: 'Team Infinity',
  tagline: 'United for Humanity',
  country: 'Bangladesh',
  officialAddress: '[OFFICIAL ADDRESS REQUIRED]',
  officialPhone: '[OFFICIAL PHONE REQUIRED]',
  officialEmail: 'contact@infinitybangladesh.org [OFFICIAL EMAIL TO BE VERIFIED]',
  facebookUrl: 'https://www.facebook.com/infinitybangladesh',
  youtubeUrl: 'https://youtube.com',
  instagramUrl: 'https://instagram.com',
  linkedinUrl: 'https://linkedin.com',
  bKashNumber: '[OFFICIAL BKASH MERCHANT/PERSONAL NUMBER REQUIRED]',
  nagadNumber: '[OFFICIAL NAGAD NUMBER REQUIRED]',
  bankDetails: {
    bankName: '[OFFICIAL BANK NAME REQUIRED]',
    accountName: 'Infinity Bangladesh / Team Infinity [OFFICIAL TITLE REQUIRED]',
    accountNumber: '[OFFICIAL ACCOUNT NUMBER REQUIRED]',
    branchName: '[OFFICIAL BRANCH REQUIRED]',
    routingNumber: '[OFFICIAL ROUTING NUMBER REQUIRED]'
  },
  bannerAnnouncement: {
    en: 'Welcome to the official digital platform of Infinity Bangladesh — Team Infinity | United for Humanity.',
    bn: 'ইনফিনিটি বাংলাদেশ-এর অফিসিয়াল ডিজিটাল প্ল্যাটফর্মে স্বাগতম — টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ।'
  },
  showAnnouncementBanner: true,
  registrationNumber: '[OFFICIAL REGISTRATION NUMBER REQUIRED]'
};

export const INITIAL_IMPACT_METRICS: ImpactMetric[] = [
  {
    id: 'metric-1',
    label: { en: 'People Reached', bn: 'মানুষের কাছে পৌঁছানো' },
    value: '[X]+',
    description: {
      en: 'Lives touched through humanitarian aid, seasonal campaigns, and community support.',
      bn: 'মানবিক সহায়তা, মৌসুমি ক্যাম্পেইন এবং সামাজিক সহযোগিতার মাধ্যমে উপকৃত মানুষ।'
    },
    iconName: 'Users',
    order: 1
  },
  {
    id: 'metric-2',
    label: { en: 'Children Supported', bn: 'সহায়তাপ্রাপ্ত শিশু' },
    value: '[X]+',
    description: {
      en: 'Underprivileged children provided with educational supplies, Eid clothes, and care.',
      bn: 'সুবিধাবঞ্চিত শিশুদের জন্য শিক্ষা উপকরণ, নতুন পোশাক ও সুরক্ষা সহায়তা।'
    },
    iconName: 'HeartHandshake',
    order: 2
  },
  {
    id: 'metric-3',
    label: { en: 'Campaigns Completed', bn: 'সম্পন্ন ক্যাম্পেইন' },
    value: '[X]+',
    description: {
      en: 'Field initiatives across seasonal relief, winter drives, and Ramadan food packages.',
      bn: 'শীতবস্ত্র বিতরণ, রমজান ফুড প্যাক এবং জরুরি সহায়তা ভিত্তিক মাঠপর্যায়ের কার্যক্রম।'
    },
    iconName: 'Flag',
    order: 3
  },
  {
    id: 'metric-4',
    label: { en: 'Dedicated Volunteers', bn: 'নিবেদিতপ্রাণ স্বেচ্ছাসেবক' },
    value: '[X]+',
    description: {
      en: 'Youth changemakers actively contributing their time, effort, and empathy.',
      bn: 'মানবতার সেবায় নিবেদিত তরুন ও নিবেদিতপ্রাণ স্বেচ্ছাসেবী সদস্য।'
    },
    iconName: 'Sparkles',
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
    id: 'gal-1',
    title: { en: 'Eid Clothes Distribution', bn: 'ঈদ পোশাক বিতরণ' },
    caption: { en: 'Distributing new clothes with respect and dignity to young boys and girls.', bn: 'সম্মান ও ভালোবাসার সাথে শিশুদের মাঝে নতুন পোশাক বিতরণ।' },
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    category: 'Campaigns',
    date: 'Seasonal Drive',
    campaignSlug: 'eid-anondo-underprivileged'
  },
  {
    id: 'gal-2',
    title: { en: 'Volunteer Sorting Hub', bn: 'স্বেচ্ছাসেবকদের কার্যক্রম' },
    caption: { en: 'Team Infinity youth volunteers packing dry groceries for families.', bn: 'টিম ইনফিনিটির তরুণদের খাদ্যসামগ্রী প্যাকেটজাতকরণ।' },
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    category: 'Volunteers',
    date: 'Fieldwork'
  },
  {
    id: 'gal-3',
    title: { en: 'Winter Warmth Fieldwork', bn: 'শীতবস্ত্র বিতরণ মুহূর্ত' },
    caption: { en: 'Distributing high-density blankets to rural seniors.', bn: 'অসহায় প্রবীণদের মাঝে মানসম্মত কম্বল বিতরণ।' },
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    category: 'Distribution',
    date: 'Winter Season'
  },
  {
    id: 'gal-4',
    title: { en: 'Education Kit Supplies', bn: 'শিক্ষা উপকরণ প্রদান' },
    caption: { en: 'Children receiving stationery and bags for the school term.', bn: 'নতুন শিক্ষাবর্ষে শিশুদের শিক্ষা উপকরণ প্রাপ্তির মুহূর্ত।' },
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    category: 'Children',
    date: 'Academic Term'
  },
  {
    id: 'gal-5',
    title: { en: 'Community Engagement', bn: 'সামাজিক সম্পৃক্ততা' },
    caption: { en: 'Youth leaders connecting with local community members.', bn: 'স্থানীয় মানুষের সাথে যুব নেতাদের মতবিনিময়।' },
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80',
    category: 'Community',
    date: 'Community Outreach'
  },
  {
    id: 'gal-6',
    title: { en: 'Team Unity & Spirit', bn: 'টিমের একতা ও সংকল্প' },
    caption: { en: 'Volunteers standing united for humanitarian service.', bn: 'মানবতার সেবায় একতাবদ্ধ স্বেচ্ছাসেবক দল।' },
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    category: 'Volunteers',
    date: 'Orientation'
  }
];

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: {
      en: 'Team Infinity: United for Humanity — Who We Are',
      bn: 'টিম ইনফিনিটি: মানবতার জন্য একতাবদ্ধ — আমাদের পরিচয়'
    },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    platform: 'youtube',
    duration: '3:45',
    thumbnailUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80',
    date: 'Recent',
    description: {
      en: 'An overview of our volunteer-driven initiatives, seasonal drives, and vision for compassionate youth empowerment.',
      bn: 'আমাদের স্বেচ্ছাসেবকদের কার্যক্রম ও ভবিষ্যৎ ভাবনার সারসংক্ষেপ।'
    }
  }
];

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
  { id: 'cm-sc-9', committeeId: 'comm-stand-central', personId: 'person-sc-9', positionId: 'pos-member', serialNumber: 9, sortOrder: 9, isFeaturedLeader: false, status: 'ACTIVE' }
];
