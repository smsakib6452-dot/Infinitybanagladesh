-- ==============================================================================
-- INFINITY BANGLADESH — PRODUCTION DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- Organization: Infinity Bangladesh (Team Infinity — United for Humanity)
-- Established: 2015 | Hathazari, Chattogram, Bangladesh
-- Slogan: UNITED FOR HUMANITY (Official Permanent Slogan)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ENUMS & DOMAINS
-- ==============================================================================
DO $$ BEGIN
  CREATE TYPE admin_role AS ENUM ('super_admin', 'content_admin', 'media_manager', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE publish_status AS ENUM ('published', 'draft', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE campaign_status AS ENUM ('active', 'upcoming', 'completed', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE volunteer_app_status AS ENUM ('new', 'reviewing', 'approved', 'rejected', 'contacted');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE donation_record_status AS ENUM ('pending', 'successful', 'failed', 'refunded');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE contact_msg_status AS ENUM ('unread', 'read', 'replied', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 2. HELPER FUNCTIONS & TRIGGERS
-- ==============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. CORE SITE SETTINGS & CONFIGURATION TABLES
-- ==============================================================================

-- Site Settings
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  organization_name TEXT NOT NULL DEFAULT 'Infinity Bangladesh',
  team_identity TEXT NOT NULL DEFAULT 'Team Infinity',
  tagline TEXT NOT NULL DEFAULT 'United for Humanity',
  country TEXT NOT NULL DEFAULT 'Bangladesh',
  official_address TEXT NOT NULL DEFAULT 'Hathazari, Chattogram, Bangladesh',
  official_phone TEXT NOT NULL DEFAULT '+880 1800-000000',
  official_email TEXT NOT NULL DEFAULT 'contact@infinitybangladesh.org',
  registration_info TEXT NOT NULL DEFAULT 'Hathazari, Chattogram • Established 2015',
  established_year TEXT NOT NULL DEFAULT '2015',
  default_language TEXT NOT NULL DEFAULT 'bn',
  maintenance_mode BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Homepage Configuration (Complete Editor)
CREATE TABLE IF NOT EXISTS public.homepage_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  hero JSONB NOT NULL DEFAULT '{
    "eyebrow": { "en": "TEAM INFINITY — UNITED FOR HUMANITY", "bn": "টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ" },
    "headlineMain": { "en": "Together, We Can Create a", "bn": "একসাথে, আমরা গড়ব" },
    "headlineHighlight": { "en": "Better Tomorrow.", "bn": "এক সুন্দর মানবিক" },
    "description": {
      "en": "Infinity Bangladesh is a volunteer-led social organization driven by passionate youth. From humanitarian support and festive Eid initiatives to emergency relief and community development, we work to protect dignity and create meaningful change across Bangladesh.",
      "bn": "ইনফিনিটি বাংলাদেশ একটি তারুণ্যনির্ভর অলাভজনক সামাজিক উদ্যোগ। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু করে উৎসবের নতুন পোশাক, রমজান খাদ্য সহায়তা, জরুরি দুর্যোগ সেবা ও শিক্ষা সহায়তা প্রদানের মাধ্যমে আমরা মানুষের মর্যাদা রক্ষায় কাজ করে চলেছি।"
    },
    "primaryCta": { "text": { "en": "Support Our Work", "bn": "সহায়তা করুন" }, "url": "donate", "active": true },
    "secondaryCta": { "text": { "en": "Become a Volunteer", "bn": "স্বেচ্ছাসেবী হিসেবে যোগ দিন" }, "url": "volunteer", "active": true },
    "storyCta": { "text": { "en": "Our Story", "bn": "আমাদের গল্প জানুন" }, "url": "about", "active": true },
    "heroImageUrl": "/images/infinity-cover-hero.jpg",
    "heroImageAlt": "Infinity Bangladesh Humanitarian Group Photo",
    "heroImageCropPosition": "center center",
    "badgeYear": "2015",
    "badgeLocation": "Hathazari, Chattogram",
    "badgeTag": "Team Infinity",
    "trustIndicators": [
      { "icon": "ShieldCheck", "text": { "en": "100% Verified Accountability", "bn": "১০০% স্বচ্ছ ও জবাবদিহিতা" }, "active": true },
      { "icon": "CheckCircle2", "text": { "en": "Direct Ground-Level Delivery", "bn": "সরাসরি মাঠপর্যায়ে বিতরণ" }, "active": true },
      { "icon": "Sparkles", "text": { "en": "Youth Volunteer Network", "bn": "তারুণ্যনির্ভর স্বেচ্ছাসেবী" }, "active": true }
    ]
  }'::jsonb,
  about_preview JSONB NOT NULL DEFAULT '{
    "eyebrow": { "en": "Who We Are", "bn": "আমাদের পরিচয় ও লক্ষ্য" },
    "titleMain": { "en": "People First. Humanity Always.", "bn": "মানুষের পাশে দাঁড়ানোই আমাদের ব্রত —" },
    "titleHighlight": { "en": "Serving with Empathy.", "bn": "মানুষ প্রথম, মানবতাই মূল।" },
    "description": {
      "en": "Founded in Hathazari, Chattogram in 2015, Infinity Bangladesh has grown into a transparent youth humanitarian platform.",
      "bn": "২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে যাত্রা শুরু করে ইনফিনিটি বাংলাদেশ আজ দেশজুড়ে এক স্বচ্ছ ও নিবেদিত তারুণ্যের শক্তিতে পরিণত হয়েছে।"
    },
    "quoteText": {
      "en": "Youth with Purpose. Community with Empathy.",
      "bn": "মানবতার জয়গান গাইতে তারুণ্যের এই নিঃস্বার্থ ঐক্য।"
    },
    "quoteAuthor": "Team Infinity",
    "ctaText": { "en": "Explore Our Full Journey", "bn": "আমাদের সম্পূর্ণ গল্প জানুন" },
    "ctaUrl": "about",
    "imageUrl": "/images/events/winter-warmth.jpg"
  }'::jsonb,
  section_order JSONB NOT NULL DEFAULT '["hero", "impact", "about", "programs", "campaigns", "stories", "gallery", "volunteer", "transparency", "support"]'::jsonb,
  section_visibility JSONB NOT NULL DEFAULT '{
    "hero": true,
    "impact": true,
    "about": true,
    "programs": true,
    "campaigns": true,
    "stories": true,
    "gallery": true,
    "volunteer": true,
    "transparency": true,
    "support": true
  }'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- About Settings
CREATE TABLE IF NOT EXISTS public.about_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  title JSONB NOT NULL DEFAULT '{"en": "About Infinity Bangladesh", "bn": "ইনফিনিটি বাংলাদেশ সম্পর্কে"}'::jsonb,
  subtitle JSONB NOT NULL DEFAULT '{"en": "United for Humanity Since 2015", "bn": "২০১৫ সাল থেকে মানবতার সেবায় একতাবদ্ধ"}'::jsonb,
  mission JSONB NOT NULL DEFAULT '{"en": "Empowering underprivileged communities with dignity and transparent humanitarian service.", "bn": "মর্যাদা ও স্বচ্ছ মানবিক সেবার মাধ্যমে সুবিধাবঞ্চিত মানুষের পাশে দাঁড়ানো।"}'::jsonb,
  vision JSONB NOT NULL DEFAULT '{"en": "A compassionate society where every person lives with dignity and opportunity.", "bn": "একটি সহমর্মিতাপূর্ণ সমাজ যেখানে প্রতিটি মানুষ আত্মমর্যাদার সাথে বসবাস করতে পারে।"}'::jsonb,
  history JSONB NOT NULL DEFAULT '{"en": "Started in Hathazari, Chattogram in 2015...", "bn": "২০১৫ সালে চট্টগ্রামের হাটহাজারীতে একদল তরুণ শিক্ষার্থীর উদ্যোগে যাত্রা শুরু..."}'::jsonb,
  established_year TEXT NOT NULL DEFAULT '2015',
  location TEXT NOT NULL DEFAULT 'Hathazari, Chattogram, Bangladesh',
  hero_image_url TEXT NOT NULL DEFAULT '/images/infinity-cover-hero.jpg',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Header Settings
CREATE TABLE IF NOT EXISTS public.header_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  logo_url TEXT NOT NULL DEFAULT '/brand/infinity-logo.png',
  show_notice_bar BOOLEAN NOT NULL DEFAULT TRUE,
  notice_bar_text JSONB NOT NULL DEFAULT '{"en": "Welcome to the official digital platform of Infinity Bangladesh — Team Infinity | United for Humanity | Est. 2015", "bn": "ইনফিনিটি বাংলাদেশ-এর অফিসিয়াল ডিজিটাল প্ল্যাটফর্মে স্বাগতম — টিম ইনফিনিটি | মানবতার জন্য একতাবদ্ধ | প্রতিষ্ঠিত ২০১৫"}'::jsonb,
  show_search BOOLEAN NOT NULL DEFAULT TRUE,
  show_language_switcher BOOLEAN NOT NULL DEFAULT TRUE,
  support_button_text JSONB NOT NULL DEFAULT '{"en": "Support Us", "bn": "সহায়তা করুন"}'::jsonb,
  support_button_url TEXT NOT NULL DEFAULT 'donate',
  show_support_button BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Footer Settings
CREATE TABLE IF NOT EXISTS public.footer_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  footer_logo_url TEXT NOT NULL DEFAULT '/brand/infinity-logo.png',
  description JSONB NOT NULL DEFAULT '{"en": "Infinity Bangladesh (Team Infinity) is a youth-driven volunteer social organization founded in Hathazari, Chattogram in 2015.", "bn": "ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর অলাভজনক সামাজিক ও মানবিক সংগঠন। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু।"}'::jsonb,
  address TEXT NOT NULL DEFAULT 'Hathazari, Chattogram, Bangladesh',
  phone TEXT NOT NULL DEFAULT '+880 1800-000000',
  email TEXT NOT NULL DEFAULT 'contact@infinitybangladesh.org',
  copyright_text JSONB NOT NULL DEFAULT '{"en": "© 2015–2026 Infinity Bangladesh. All rights reserved. United for Humanity.", "bn": "© ২০১৫–২০২৬ ইনফিনিটি বাংলাদেশ। সর্বস্বত্ব সংরক্ষিত। মানবতার জন্য একতাবদ্ধ।"}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Social Links
CREATE TABLE IF NOT EXISTS public.social_links (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  label TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Volunteer Settings
CREATE TABLE IF NOT EXISTS public.volunteer_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  cta_text JSONB NOT NULL DEFAULT '{"en": "Join Volunteer Force", "bn": "স্বেচ্ছাসেবী হিসেবে যোগ দিন"}'::jsonb,
  google_form_url TEXT NOT NULL DEFAULT '',
  description JSONB NOT NULL DEFAULT '{"en": "Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.", "bn": "আপনার মেধা, সময় এবং সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে টিম ইনফিনিটির সাথে যুক্ত হোন।"}'::jsonb,
  cover_image_url TEXT NOT NULL DEFAULT '/images/events/winter-warmth.jpg',
  benefits JSONB NOT NULL DEFAULT '{"en": ["Hands-on grassroots field experience", "Official Certificate of Humanitarian Service", "Leadership & emergency disaster response training", "Ethical and transparent youth community"], "bn": ["মাঠপর্যায়ে সরাসরি সামাজিক কাজের বাস্তব অভিজ্ঞতা", "অফিসিয়াল সার্টিফিকেট ও মূল্যায়ন", "নেতৃত্ব ও দুর্যোগ মোকাবেলা প্রশিক্ষণ", "স্বচ্ছ ও ইতিবাচক তরুণ নেটওয়ার্ক"]}'::jsonb,
  requirements JSONB NOT NULL DEFAULT '{"en": ["Dedication to humanitarian service", "Strict adherence to Code of Conduct", "Team spirit and mutual respect"], "bn": ["মানবকল্যাণে কাজ করার আন্তরিক ইচ্ছা", "সংগঠনের নীতি ও আচরণবিধির প্রতি শ্রদ্ধাশীলতা", "পারস্পরিক সহযোগিতা ও নিষ্ঠা"]}'::jsonb,
  contact_email TEXT NOT NULL DEFAULT 'volunteer@infinitybangladesh.org',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Support & Donation Settings
CREATE TABLE IF NOT EXISTS public.support_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  cta_text JSONB NOT NULL DEFAULT '{"en": "Support Our Humanitarian Work", "bn": "মানবতার সেবায় সহায়তা করুন"}'::jsonb,
  description JSONB NOT NULL DEFAULT '{"en": "Your contribution transforms into verified aid on the ground. 100% transparent and audited.", "bn": "আপনার সহায়তা সরাসরি মাঠপর্যায়ে সুবিধাবঞ্চিত মানুষের কাছে পৌঁছে দেওয়া হয়। শতভাগ স্বচ্ছ ও জবাবদিহিতামূলক।"}'::jsonb,
  bkash_number TEXT NOT NULL DEFAULT '01800-000000',
  bkash_type TEXT NOT NULL DEFAULT 'Merchant / Personal',
  nagad_number TEXT NOT NULL DEFAULT '01800-000000',
  nagad_type TEXT NOT NULL DEFAULT 'Official Personal / Merchant',
  bank_details JSONB NOT NULL DEFAULT '{
    "bankName": "Official Bank Account Required",
    "accountName": "Infinity Bangladesh / Team Infinity",
    "accountNumber": "0000-000000000",
    "branchName": "Hathazari Branch, Chattogram",
    "routingNumber": "000000000"
  }'::jsonb,
  qr_code_image_url TEXT DEFAULT '',
  payment_instructions JSONB NOT NULL DEFAULT '{"en": "Please include your name and campaign reference in the transaction counter.", "bn": "অনুগ্রহ করে ট্রানজেকশনে আপনার নাম ও রেফারেন্স উল্লেখ করুন।"}'::jsonb,
  support_email TEXT NOT NULL DEFAULT 'donate@infinitybangladesh.org',
  support_phone TEXT NOT NULL DEFAULT '+880 1800-000000',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Settings
CREATE TABLE IF NOT EXISTS public.contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  address JSONB NOT NULL DEFAULT '{"en": "Hathazari, Chattogram, Bangladesh", "bn": "হাটহাজারী, চট্টগ্রাম, বাংলাদেশ"}'::jsonb,
  phone TEXT NOT NULL DEFAULT '+880 1800-000000',
  email TEXT NOT NULL DEFAULT 'contact@infinitybangladesh.org',
  office_hours JSONB NOT NULL DEFAULT '{"en": "Saturday - Thursday: 10:00 AM - 6:00 PM", "bn": "শনিবার - বৃহস্পতিবার: সকাল ১০:০০ - সন্ধ্যা ৬:০০"}'::jsonb,
  google_maps_embed_url TEXT NOT NULL DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3686.2736208047025!2d91.8049!3d22.5073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2f1a6f022417%3A0x7d6f51c11bb8c8e9!2sHathazari%2C%20Chattogram!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd',
  emergency_helpline TEXT DEFAULT '+880 1800-000000',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SEO Settings
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_title JSONB NOT NULL DEFAULT '{"en": "Infinity Bangladesh | United for Humanity | Official Website", "bn": "ইনফিনিটি বাংলাদেশ | মানবতার জন্য একতাবদ্ধ | অফিসিয়াল ওয়েবসাইট"}'::jsonb,
  meta_description JSONB NOT NULL DEFAULT '{"en": "Infinity Bangladesh (Team Infinity) is a youth-driven humanitarian organization founded in 2015 in Hathazari, Chattogram.", "bn": "ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি তারুণ্যনির্ভর সামাজিক ও মানবিক সংগঠন। প্রতিষ্ঠিত ২০১৫, হাটহাজারী, চট্টগ্রাম।"}'::jsonb,
  keywords TEXT[] NOT NULL DEFAULT ARRAY['Infinity Bangladesh', 'Team Infinity', 'United for Humanity', 'Hathazari', 'Chattogram', 'Eid Joy', 'Winter Relief', 'Humanitarian NGO Bangladesh'],
  og_image_url TEXT NOT NULL DEFAULT '/images/infinity-cover-hero.jpg',
  organization_name TEXT NOT NULL DEFAULT 'Infinity Bangladesh',
  canonical_url TEXT NOT NULL DEFAULT 'https://infinitybangladesh.org',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Navigation Items
CREATE TABLE IF NOT EXISTS public.navigation_items (
  id TEXT PRIMARY KEY,
  label JSONB NOT NULL,
  path TEXT NOT NULL,
  is_external BOOLEAN NOT NULL DEFAULT FALSE,
  is_dropdown BOOLEAN NOT NULL DEFAULT FALSE,
  children JSONB DEFAULT '[]'::jsonb,
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Banners
CREATE TABLE IF NOT EXISTS public.banners (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  subtitle JSONB DEFAULT '{}'::jsonb,
  desktop_image_url TEXT NOT NULL,
  mobile_image_url TEXT DEFAULT '',
  cta_text JSONB DEFAULT '{}'::jsonb,
  cta_url TEXT DEFAULT '',
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  placement TEXT NOT NULL DEFAULT 'homepage_hero',
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 4. CONTENT MANAGEMENT TABLES
-- ==============================================================================

-- Programs / Our Work
CREATE TABLE IF NOT EXISTS public.programs (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  category TEXT NOT NULL,
  short_description JSONB NOT NULL,
  full_details JSONB NOT NULL,
  impact_highlights JSONB NOT NULL DEFAULT '{"en": [], "bn": []}'::jsonb,
  image_url TEXT NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'HeartHandshake',
  status TEXT NOT NULL DEFAULT 'active',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Campaigns
CREATE TABLE IF NOT EXISTS public.campaigns (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  date TEXT NOT NULL,
  location JSONB NOT NULL,
  category TEXT NOT NULL,
  description JSONB NOT NULL,
  objectives JSONB NOT NULL DEFAULT '{"en": [], "bn": []}'::jsonb,
  activities JSONB NOT NULL DEFAULT '{"en": [], "bn": []}'::jsonb,
  beneficiaries JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  impact JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  status TEXT NOT NULL DEFAULT 'active',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  target_amount_bdt TEXT DEFAULT '',
  raised_amount_bdt TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  gallery_images TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  video_url TEXT DEFAULT '',
  report_url TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Impact Metrics
CREATE TABLE IF NOT EXISTS public.impact_metrics (
  id TEXT PRIMARY KEY,
  label JSONB NOT NULL,
  value TEXT NOT NULL,
  description JSONB NOT NULL,
  icon_name TEXT NOT NULL DEFAULT 'Sparkles',
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Stories
CREATE TABLE IF NOT EXISTS public.stories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  person_or_community JSONB NOT NULL,
  location JSONB NOT NULL,
  date TEXT NOT NULL,
  story JSONB NOT NULL,
  impact JSONB NOT NULL,
  image_url TEXT NOT NULL,
  campaign_slug TEXT DEFAULT '',
  consent_confirmed BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Media Library
CREATE TABLE IF NOT EXISTS public.media_library (
  id TEXT PRIMARY KEY,
  file_name TEXT NOT NULL,
  url TEXT NOT NULL,
  file_size TEXT NOT NULL DEFAULT '0 KB',
  mime_type TEXT NOT NULL DEFAULT 'image/jpeg',
  category TEXT NOT NULL DEFAULT 'General',
  alt_text TEXT NOT NULL DEFAULT '',
  caption TEXT DEFAULT '',
  usage_tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery Albums
CREATE TABLE IF NOT EXISTS public.gallery_albums (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  description JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  cover_image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Events',
  date TEXT NOT NULL DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Gallery Photos
CREATE TABLE IF NOT EXISTS public.gallery_photos (
  id TEXT PRIMARY KEY,
  album_id TEXT REFERENCES public.gallery_albums(id) ON DELETE CASCADE,
  title JSONB NOT NULL,
  caption JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Events',
  date TEXT NOT NULL DEFAULT '',
  location JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  campaign_slug TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Transparency Reports
CREATE TABLE IF NOT EXISTS public.transparency_reports (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  type TEXT NOT NULL,
  year TEXT NOT NULL,
  description JSONB NOT NULL,
  upload_date TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size TEXT NOT NULL DEFAULT '1.0 MB',
  status TEXT NOT NULL DEFAULT 'official',
  display_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- News Articles
CREATE TABLE IF NOT EXISTS public.news_articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  excerpt JSONB NOT NULL,
  content JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  author TEXT NOT NULL DEFAULT 'Infinity Desk',
  date TEXT NOT NULL,
  image_url TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  status TEXT NOT NULL DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Event Items
CREATE TABLE IF NOT EXISTS public.event_items (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title JSONB NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL DEFAULT '',
  location JSONB NOT NULL,
  description JSONB NOT NULL,
  image_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'upcoming',
  registration_open BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Partners
CREATE TABLE IF NOT EXISTS public.partners (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo_url TEXT DEFAULT '',
  website TEXT DEFAULT '',
  type TEXT NOT NULL DEFAULT 'Institutional',
  description JSONB NOT NULL,
  partnership_year TEXT NOT NULL DEFAULT '2025',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Committees & Leadership
CREATE TABLE IF NOT EXISTS public.committees (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name JSONB NOT NULL,
  type TEXT NOT NULL DEFAULT 'EXECUTIVE',
  year TEXT NOT NULL DEFAULT '2026',
  description JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  sort_order INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT TRUE,
  banner_image_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.persons (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  bangla_name TEXT NOT NULL,
  english_name TEXT NOT NULL,
  photo_url TEXT DEFAULT '',
  photo_position TEXT DEFAULT 'center top',
  photo_zoom NUMERIC DEFAULT 1.0,
  short_bio JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  full_bio JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  district TEXT DEFAULT 'Chattogram',
  facebook_url TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  joining_year TEXT DEFAULT '2015',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.positions (
  id TEXT PRIMARY KEY,
  name JSONB NOT NULL,
  level INT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 0,
  description JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.committee_members (
  id TEXT PRIMARY KEY,
  committee_id TEXT NOT NULL REFERENCES public.committees(id) ON DELETE CASCADE,
  person_id TEXT NOT NULL REFERENCES public.persons(id) ON DELETE CASCADE,
  position_id TEXT NOT NULL REFERENCES public.positions(id) ON DELETE CASCADE,
  serial_number INT NOT NULL DEFAULT 1,
  sort_order INT NOT NULL DEFAULT 0,
  is_featured_leader BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. INTERACTION, AUDIT & TRANSACTION TABLES
-- ==============================================================================

-- Volunteer Applications
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL,
  upazila TEXT DEFAULT '',
  age TEXT DEFAULT '',
  occupation TEXT DEFAULT '',
  blood_group TEXT DEFAULT '',
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  interests TEXT[] DEFAULT ARRAY[]::TEXT[],
  motivation TEXT DEFAULT '',
  previous_experience TEXT DEFAULT '',
  availability TEXT DEFAULT '',
  message TEXT DEFAULT '',
  agreed_code_of_conduct BOOLEAN NOT NULL DEFAULT TRUE,
  status TEXT NOT NULL DEFAULT 'New',
  admin_notes TEXT DEFAULT '',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Donation Records
CREATE TABLE IF NOT EXISTS public.donation_records (
  id TEXT PRIMARY KEY,
  receipt_number TEXT UNIQUE,
  donor_name TEXT NOT NULL,
  donor_email TEXT DEFAULT '',
  donor_phone TEXT DEFAULT '',
  amount_bdt NUMERIC NOT NULL DEFAULT 0,
  campaign_slug TEXT DEFAULT '',
  campaign_title TEXT DEFAULT '',
  donation_type TEXT DEFAULT 'one-time',
  payment_method TEXT NOT NULL DEFAULT 'bKash',
  transaction_id TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Successful',
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT DEFAULT '',
  donated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Unread',
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Admin Profiles (links to auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role admin_role NOT NULL DEFAULT 'viewer',
  avatar_url TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::TEXT,
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.header_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transparency_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE id = auth.uid() AND is_active = TRUE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Public Read Policies (Allow anyone to view published website content)
CREATE POLICY "Public can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Public can view homepage config" ON public.homepage_config FOR SELECT USING (true);
CREATE POLICY "Public can view about settings" ON public.about_settings FOR SELECT USING (true);
CREATE POLICY "Public can view header settings" ON public.header_settings FOR SELECT USING (true);
CREATE POLICY "Public can view footer settings" ON public.footer_settings FOR SELECT USING (true);
CREATE POLICY "Public can view social links" ON public.social_links FOR SELECT USING (active = true);
CREATE POLICY "Public can view volunteer settings" ON public.volunteer_settings FOR SELECT USING (true);
CREATE POLICY "Public can view support settings" ON public.support_settings FOR SELECT USING (true);
CREATE POLICY "Public can view contact settings" ON public.contact_settings FOR SELECT USING (true);
CREATE POLICY "Public can view seo settings" ON public.seo_settings FOR SELECT USING (true);
CREATE POLICY "Public can view navigation" ON public.navigation_items FOR SELECT USING (active = true);
CREATE POLICY "Public can view banners" ON public.banners FOR SELECT USING (active = true);
CREATE POLICY "Public can view programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Public can view campaigns" ON public.campaigns FOR SELECT USING (true);
CREATE POLICY "Public can view metrics" ON public.impact_metrics FOR SELECT USING (active = true);
CREATE POLICY "Public can view stories" ON public.stories FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view media" ON public.media_library FOR SELECT USING (true);
CREATE POLICY "Public can view gallery albums" ON public.gallery_albums FOR SELECT USING (is_published = true);
CREATE POLICY "Public can view gallery photos" ON public.gallery_photos FOR SELECT USING (true);
CREATE POLICY "Public can view reports" ON public.transparency_reports FOR SELECT USING (status = 'official');
CREATE POLICY "Public can view news" ON public.news_articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view events" ON public.event_items FOR SELECT USING (true);
CREATE POLICY "Public can view partners" ON public.partners FOR SELECT USING (true);
CREATE POLICY "Public can view committees" ON public.committees FOR SELECT USING (status = 'ACTIVE');
CREATE POLICY "Public can view persons" ON public.persons FOR SELECT USING (active = true);
CREATE POLICY "Public can view positions" ON public.positions FOR SELECT USING (true);
CREATE POLICY "Public can view committee members" ON public.committee_members FOR SELECT USING (status = 'ACTIVE');

-- Public Submission Policies
CREATE POLICY "Public can submit volunteer applications" ON public.volunteer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit contact messages" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can record donations" ON public.donation_records FOR INSERT WITH CHECK (true);

-- Authenticated Admin Management Policies (Admins can do everything)
CREATE POLICY "Admins full access site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access homepage_config" ON public.homepage_config FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access about_settings" ON public.about_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access header_settings" ON public.header_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access footer_settings" ON public.footer_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access social_links" ON public.social_links FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access volunteer_settings" ON public.volunteer_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access support_settings" ON public.support_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access contact_settings" ON public.contact_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access seo_settings" ON public.seo_settings FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access navigation_items" ON public.navigation_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access banners" ON public.banners FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access programs" ON public.programs FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access campaigns" ON public.campaigns FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access impact_metrics" ON public.impact_metrics FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access stories" ON public.stories FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access media_library" ON public.media_library FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access gallery_albums" ON public.gallery_albums FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access gallery_photos" ON public.gallery_photos FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access transparency_reports" ON public.transparency_reports FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access news_articles" ON public.news_articles FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access event_items" ON public.event_items FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access partners" ON public.partners FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access committees" ON public.committees FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access persons" ON public.persons FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access positions" ON public.positions FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access committee_members" ON public.committee_members FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access volunteer_applications" ON public.volunteer_applications FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access donation_records" ON public.donation_records FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access contact_messages" ON public.contact_messages FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access admin_profiles" ON public.admin_profiles FOR ALL USING (public.is_admin());
CREATE POLICY "Admins full access audit_logs" ON public.audit_logs FOR ALL USING (public.is_admin());

-- Storage Buckets Configuration SQL
INSERT INTO storage.buckets (id, name, public)
VALUES ('infinity-media', 'infinity-media', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('infinity-documents', 'infinity-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public can view infinity media" ON storage.objects FOR SELECT USING (bucket_id = 'infinity-media');
CREATE POLICY "Public can view infinity documents" ON storage.objects FOR SELECT USING (bucket_id = 'infinity-documents');
CREATE POLICY "Admins can upload infinity media" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('infinity-media', 'infinity-documents') AND public.is_admin());
CREATE POLICY "Admins can update infinity media" ON storage.objects FOR UPDATE USING (bucket_id IN ('infinity-media', 'infinity-documents') AND public.is_admin());
CREATE POLICY "Admins can delete infinity media" ON storage.objects FOR DELETE USING (bucket_id IN ('infinity-media', 'infinity-documents') AND public.is_admin());

-- Default Singletons Seed
INSERT INTO public.site_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.homepage_config (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.about_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.header_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.footer_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.volunteer_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.support_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.contact_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
INSERT INTO public.seo_settings (id) VALUES ('default') ON CONFLICT (id) DO NOTHING;
