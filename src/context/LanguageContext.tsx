import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, BilingualText } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tText: (bilingualText?: BilingualText) => string;
  isBn: boolean;
}

const UI_TRANSLATIONS: Record<string, { en: string; bn: string }> = {
  // Brand & Tagline
  'brand.orgName': { en: 'Infinity Bangladesh', bn: 'ইনফিনিটি বাংলাদেশ' },
  'brand.team': { en: 'Team Infinity', bn: 'টিম ইনফিনিটি' },
  'brand.tagline': { en: 'United for Humanity', bn: 'মানবতার জন্য একতাবদ্ধ' },
  'brand.country': { en: 'Bangladesh', bn: 'বাংলাদেশ' },

  // Navigation
  'nav.home': { en: 'Home', bn: 'হোম' },
  'nav.about': { en: 'About Us', bn: 'আমাদের সম্পর্কে' },
  'nav.ourWork': { en: 'Our Work', bn: 'আমাদের কার্যক্রম' },
  'nav.programs': { en: 'Programs', bn: 'প্রোগ্রামসমূহ' },
  'nav.campaigns': { en: 'Campaigns', bn: 'ক্যাম্পেইনসমূহ' },
  'nav.impact': { en: 'Impact', bn: 'প্রভাব ও ফলাফল' },
  'nav.stories': { en: 'Stories', bn: 'বাস্তব গল্প' },
  'nav.media': { en: 'Media', bn: 'মিডিয়া' },
  'nav.gallery': { en: 'Photo Gallery', bn: 'ফটো গ্যালারি' },
  'nav.videos': { en: 'Videos', bn: 'ভিডিও গ্যালারি' },
  'nav.news': { en: 'News & Updates', bn: 'সংবাদ ও আপডেট' },
  'nav.events': { en: 'Events', bn: 'ইভেন্টসমূহ' },
  'nav.volunteer': { en: 'Get Involved / Volunteer', bn: 'স্বেচ্ছাসেবী হন' },
  'nav.transparency': { en: 'Transparency & Reports', bn: 'স্বচ্ছতা ও রিপোর্ট' },
  'nav.partners': { en: 'Partners', bn: 'অংশীদারবৃন্দ' },
  'nav.contact': { en: 'Contact', bn: 'যোগাযোগ' },
  'nav.donate': { en: 'Support Our Work / Donate', bn: 'সহায়তা / অনুদান' },
  'nav.admin': { en: 'Admin Portal', bn: 'অ্যাডমিন পোর্টাল' },

  // Common CTAs & Labels
  'cta.supportWork': { en: 'Support Our Work', bn: 'আমাদের কাজে সহায়তা করুন' },
  'cta.becomeVolunteer': { en: 'Become a Volunteer', bn: 'স্বেচ্ছাসেবী হিসেবে যুক্ত হোন' },
  'cta.learnMore': { en: 'Learn More About Us', bn: 'আমাদের সম্পর্কে বিস্তারিত' },
  'cta.exploreCampaigns': { en: 'Explore All Campaigns', bn: 'সকল ক্যাম্পেইন দেখুন' },
  'cta.viewAllStories': { en: 'Read All Impact Stories', bn: 'সকল গল্প পড়ুন' },
  'cta.viewGallery': { en: 'View Full Gallery', bn: 'সম্পূর্ণ গ্যালারি দেখুন' },
  'cta.viewReports': { en: 'Access Transparency Reports', bn: 'স্বচ্ছতা রিপোর্ট দেখুন' },
  'cta.donateNow': { en: 'Donate Now', bn: 'অনুদান দিন' },
  'cta.applyNow': { en: 'Submit Application', bn: 'আবেদন জমা দিন' },
  'cta.search': { en: 'Search campaigns, news, reports...', bn: 'ক্যাম্পেইন, খবর, রিপোর্ট খুঁজুন...' },
  'cta.backToHome': { en: 'Back to Home', bn: 'হোমে ফিরে যান' },
  'cta.share': { en: 'Share This Page', bn: 'শেয়ার করুন' },

  // Transparency notices
  'notice.officialRequired': { en: '[OFFICIAL INFORMATION REQUIRED]', bn: '[অফিসিয়াল তথ্য হালনাগাদ আবশ্যক]' },
  'notice.officialLogoRequired': { en: '[OFFICIAL INFINITY BANGLADESH LOGO REQUIRED]', bn: '[অফিসিয়াল ইনফিনিটি বাংলাদেশ লোগো প্রয়োজন]' },
  'notice.transparencyMessage': { 
    en: 'Infinity Bangladesh maintains strict transparency. Official audit figures, verified bank accounts, and registration documentation are published as certified by organization trustees.', 
    bn: 'ইনফিনিটি বাংলাদেশ শতভাগ স্বচ্ছতায় বিশ্বাসী। সকল প্রকার অডিট হিসাব ও অফিসিয়াল তথ্য যাচাই সাপেক্ষে প্রকাশ করা হয়।' 
  },

  // Homepage sections
  'home.heroHeadline': { en: 'Together, We Can Create a Better Tomorrow.', bn: 'একসাথে, আমরা গড়ব এক সুন্দর আগামী।' },
  'home.heroSubhead': { 
    en: 'A youth-driven Bangladeshi humanitarian initiative standing shoulder-to-shoulder with underprivileged children and struggling families.', 
    bn: 'সুবিধাবঞ্চিত শিশু ও অসহায় মানুষের পাশে দাঁড়াতে নিবেদিতপ্রাণ তরুণদের একটি সামাজিক ও মানবিক উদ্যোগ।' 
  },
  'home.impactStatsTitle': { en: 'Our Groundwork & Reach', bn: 'আমাদের মাঠপর্যায়ের প্রভাব' },
  'home.whoWeAreTitle': { en: 'Who We Are', bn: 'আমরা কারা' },
  'home.whoWeAreSub': { en: 'Youth with Purpose. Community with Empathy.', bn: 'উদ্দেশ্যনিষ্ঠ তরুণ প্রজন্ম। সহানুভূতিশীল মানবিক সমাজ।' },
  'home.whatWeDoTitle': { en: 'What We Do', bn: 'আমাদের মূল কার্যক্রম' },
  'home.featuredCampaignTitle': { en: 'Featured Campaign', bn: 'বিশেষ ক্যাম্পেইন' },
  'home.recentStoriesTitle': { en: 'Impact & Humanity', bn: 'বাস্তব প্রভাব ও মানবিক গল্প' },
  'home.volunteerBannerTitle': { en: 'Be Part of Team Infinity', bn: 'টিম ইনফিনিটির অংশ হোন' },
  'home.volunteerBannerSub': { en: 'United for Humanity starts with people who care. Join our network of passionate changemakers across Bangladesh.', bn: 'মানবতার সেবা শুরু হয় সচেতন মানুষের আন্তরিকতা থেকে। দেশের তরুণ সমাজের সাথে আপনিও যুক্ত হোন।' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('infinity_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('infinity_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  const t = (key: string): string => {
    const item = UI_TRANSLATIONS[key];
    if (!item) return key;
    return item[language] || item.en || key;
  };

  const tText = (bilingualText?: BilingualText): string => {
    if (!bilingualText) return '';
    return bilingualText[language] || bilingualText.en || bilingualText.bn || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t,
        tText,
        isBn: language === 'bn'
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
