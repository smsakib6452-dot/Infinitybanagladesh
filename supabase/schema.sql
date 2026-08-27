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
  logo_url TEXT DEFAULT '',
  favicon_url TEXT DEFAULT '',
  banner_announcement TEXT DEFAULT '',
  show_announcement_banner BOOLEAN DEFAULT FALSE,
  bkash_number TEXT DEFAULT '',
  nagad_number TEXT DEFAULT '',
  bank_details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Homepage Configuration
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
    "heroImageUrl": "https://res.cloudinary.com/evj6fhsf/image/upload/v1740248000/infinity-cover-hero.jpg",
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
    "imageUrl": "https://res.cloudinary.com/evj6fhsf/image/upload/v1740248000/winter-warmth.jpg"
  }'::jsonb,
  volunteer_banner JSONB DEFAULT '{}'::jsonb,
  support_banner JSONB DEFAULT '{}'::jsonb,
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
  hero_image_url TEXT NOT NULL DEFAULT '',
  secondary_image_url TEXT DEFAULT '',
  cta_text JSONB DEFAULT '{"en": "Join as a Volunteer", "bn": "স্বেচ্ছাসেবী হিসেবে যোগ দিন"}'::jsonb,
  cta_url TEXT DEFAULT 'volunteer',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Header Settings
CREATE TABLE IF NOT EXISTS public.header_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  logo_url TEXT NOT NULL DEFAULT '',
  logo_alt TEXT NOT NULL DEFAULT 'Infinity Bangladesh Logo',
  show_notice_bar BOOLEAN NOT NULL DEFAULT FALSE,
  notice_bar_text JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  notice_bar_link TEXT DEFAULT '',
  show_search BOOLEAN NOT NULL DEFAULT TRUE,
  show_language_switcher BOOLEAN NOT NULL DEFAULT TRUE,
  support_button_text JSONB DEFAULT '{"en": "Support Us", "bn": "সহায়তা করুন"}'::jsonb,
  support_button_url TEXT DEFAULT 'donate',
  show_support_button BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Footer Settings
CREATE TABLE IF NOT EXISTS public.footer_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  footer_logo_url TEXT NOT NULL DEFAULT '',
  description JSONB NOT NULL DEFAULT '{"en": "A non-profit humanitarian initiative dedicated to serving humanity with dignity.", "bn": "মানবতার সেবায় নিবেদিত একটি অরাজনৈতিক সামাজিক উদ্যোগ।"}'::jsonb,
  address JSONB NOT NULL DEFAULT '{"en": "Hathazari, Chattogram, Bangladesh", "bn": "হাটহাজারী, চট্টগ্রাম, বাংলাদেশ"}'::jsonb,
  phone TEXT NOT NULL DEFAULT '+880 1800-000000',
  email TEXT NOT NULL DEFAULT 'contact@infinitybangladesh.org',
  copyright_text JSONB NOT NULL DEFAULT '{"en": "All rights reserved.", "bn": "সর্বস্বত্ব সংরক্ষিত।"}'::jsonb,
  established_year TEXT NOT NULL DEFAULT '2015',
  show_newsletter BOOLEAN NOT NULL DEFAULT FALSE,
  nav_columns JSONB DEFAULT '[]'::jsonb,
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
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Volunteer Settings
CREATE TABLE IF NOT EXISTS public.volunteer_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  cta_text JSONB DEFAULT '{"en": "Apply to Join Team Infinity", "bn": "টিম ইনফিনিটিতে যোগদানের আবেদন করুন"}'::jsonb,
  google_form_url TEXT DEFAULT '',
  description JSONB DEFAULT '{"en": "Join our volunteer network...", "bn": "আমাদের স্বেচ্ছাসেবক নেটওয়ার্কে যোগ দিন..."}'::jsonb,
  cover_image_url TEXT DEFAULT '',
  benefits JSONB DEFAULT '{"en": [], "bn": []}'::jsonb,
  requirements JSONB DEFAULT '{"en": [], "bn": []}'::jsonb,
  contact_email TEXT NOT NULL DEFAULT 'volunteer@infinitybangladesh.org',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Support Settings
CREATE TABLE IF NOT EXISTS public.support_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  cta_text JSONB DEFAULT '{"en": "Support Our Initiatives", "bn": "আমাদের উদ্যোগে সহায়তা করুন"}'::jsonb,
  description JSONB DEFAULT '{"en": "Your contributions create lasting impact.", "bn": "আপনার সহযোগিতা সুবিধাবঞ্চিত মানুষের পাশে দাঁড়াতে সাহায্য করে।"}'::jsonb,
  bkash_number TEXT DEFAULT '01800-000000',
  bkash_type TEXT DEFAULT 'Personal',
  nagad_number TEXT DEFAULT '01800-000000',
  nagad_type TEXT DEFAULT 'Personal',
  bank_details JSONB DEFAULT '{"accountName": "Infinity Bangladesh", "accountNumber": "1234567890", "bankName": "Islami Bank Bangladesh PLC", "branch": "Hathazari Branch", "routingNumber": "125150000"}'::jsonb,
  qr_code_image_url TEXT DEFAULT '',
  payment_instructions JSONB DEFAULT '{"en": "Send money via bKash/Nagad and provide transaction ID.", "bn": "বিকাশ বা নগদ-এ সেন্ড মানি করে ট্রানজেকশন আইডি প্রদান করুন।"}'::jsonb,
  support_email TEXT NOT NULL DEFAULT 'donate@infinitybangladesh.org',
  support_phone TEXT DEFAULT '+880 1800-000000',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Contact Settings
CREATE TABLE IF NOT EXISTS public.contact_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  address JSONB DEFAULT '{"en": "Hathazari, Chattogram, Bangladesh", "bn": "হাটহাজারী, চট্টগ্রাম, বাংলাদেশ"}'::jsonb,
  phone TEXT DEFAULT '+880 1800-000000',
  email TEXT NOT NULL DEFAULT 'contact@infinitybangladesh.org',
  office_hours JSONB DEFAULT '{"en": "Saturday - Thursday: 10:00 AM - 6:00 PM", "bn": "শনিবার - বৃহস্পতিবার: সকাল ১০টা - সন্ধ্যা ৬টা"}'::jsonb,
  google_maps_embed_url TEXT DEFAULT '',
  emergency_helpline TEXT DEFAULT '+880 1800-000000',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- SEO Settings
CREATE TABLE IF NOT EXISTS public.seo_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  site_title JSONB DEFAULT '{"en": "Infinity Bangladesh | United for Humanity", "bn": "ইনফিনিটি বাংলাদেশ | মানবতার সেবায় একতাবদ্ধ"}'::jsonb,
  meta_description JSONB DEFAULT '{"en": "Official website of Infinity Bangladesh...", "bn": "ইনফিনিটি বাংলাদেশের অফিসিয়াল ওয়েবসাইট..."}'::jsonb,
  keywords TEXT[] DEFAULT ARRAY['Infinity Bangladesh', 'Team Infinity', 'Humanitarian NGO', 'Hathazari', 'Chattogram']::TEXT[],
  og_image_url TEXT DEFAULT '',
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
  end_date TEXT DEFAULT '',
  location JSONB NOT NULL,
  category TEXT NOT NULL,
  description JSONB NOT NULL,
  details JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  objectives JSONB NOT NULL DEFAULT '{"en": [], "bn": []}'::jsonb,
  activities JSONB NOT NULL DEFAULT '{"en": [], "bn": []}'::jsonb,
  beneficiaries JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  beneficiaries_count INT DEFAULT 0,
  volunteers_count INT DEFAULT 0,
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
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  seo_title JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  seo_description JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
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
  album_id TEXT,
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

-- Video Documentation & Footage (Video Items)
CREATE TABLE IF NOT EXISTS public.video_items (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  video_url TEXT NOT NULL,
  embed_url TEXT DEFAULT '',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  platform TEXT NOT NULL DEFAULT 'youtube',
  duration TEXT DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  description JSONB NOT NULL DEFAULT '{"en": "", "bn": ""}'::jsonb,
  category TEXT NOT NULL DEFAULT 'General',
  status TEXT NOT NULL DEFAULT 'published',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  source_type TEXT DEFAULT 'url',
  aspect_ratio TEXT NOT NULL DEFAULT '16/9',
  is_shorts BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Journey Video Archive (About Page)
CREATE TABLE IF NOT EXISTS public.journey_videos (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  timeline_label JSONB NOT NULL,
  description JSONB NOT NULL DEFAULT '{"en": "", "bn": ""}'::jsonb,
  category TEXT NOT NULL DEFAULT 'Organizational Journey',
  video_url TEXT NOT NULL DEFAULT '',
  video_platform TEXT NOT NULL DEFAULT 'auto',
  embed_url TEXT DEFAULT '',
  thumbnail_url TEXT DEFAULT '',
  display_order INT NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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

-- FAQs
CREATE TABLE IF NOT EXISTS public.faqs (
  id TEXT PRIMARY KEY,
  question JSONB NOT NULL,
  answer JSONB NOT NULL,
  category TEXT NOT NULL DEFAULT 'General',
  display_order INT NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
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
  social_links JSONB DEFAULT '{}'::jsonb,
  joining_year TEXT DEFAULT '2015',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.positions (
  id TEXT PRIMARY KEY,
  name JSONB NOT NULL,
  level INT NOT NULL DEFAULT 5,
  sort_order INT NOT NULL DEFAULT 10,
  description JSONB DEFAULT '{"en": "", "bn": ""}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.committee_members (
  id TEXT PRIMARY KEY,
  committee_id TEXT NOT NULL,
  person_id TEXT NOT NULL,
  position_id TEXT NOT NULL,
  serial_number INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  is_featured_leader BOOLEAN NOT NULL DEFAULT FALSE,
  start_date TEXT DEFAULT '',
  end_date TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 5. SUBMISSIONS & TRANSACTION TABLES
-- ==============================================================================

-- Volunteer Applications
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  district TEXT NOT NULL DEFAULT 'Chattogram',
  institution TEXT DEFAULT '',
  occupation TEXT DEFAULT '',
  blood_group TEXT DEFAULT '',
  skills TEXT[] DEFAULT ARRAY[]::TEXT[],
  preferred_areas TEXT[] DEFAULT ARRAY[]::TEXT[],
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

-- Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'super_admin',
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
-- BLOOD DONATION NETWORK TABLES
-- ==============================================================================

-- 1. Blood Donors
CREATE TABLE IF NOT EXISTS public.blood_donors (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  photo_url TEXT,
  district TEXT NOT NULL,
  upazila TEXT NOT NULL,
  area TEXT NOT NULL,
  detailed_address TEXT,
  org_category TEXT NOT NULL DEFAULT 'Infinity Bangladesh Volunteer',
  committee_position TEXT,
  availability_status TEXT NOT NULL DEFAULT 'AVAILABLE_EMERGENCY',
  first_donation_date TEXT,
  last_donation_date TEXT,
  total_donations INT NOT NULL DEFAULT 0,
  experience_notes TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT FALSE,
  approval_status TEXT NOT NULL DEFAULT 'PENDING',
  privacy_consent BOOLEAN NOT NULL DEFAULT TRUE,
  show_phone_publicly BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blood_donors_group ON public.blood_donors (blood_group);
CREATE INDEX IF NOT EXISTS idx_blood_donors_district ON public.blood_donors (district);
CREATE INDEX IF NOT EXISTS idx_blood_donors_upazila ON public.blood_donors (upazila);
CREATE INDEX IF NOT EXISTS idx_blood_donors_status ON public.blood_donors (availability_status);
CREATE INDEX IF NOT EXISTS idx_blood_donors_approval ON public.blood_donors (approval_status);

-- 2. Blood Donation History
CREATE TABLE IF NOT EXISTS public.blood_donation_history (
  id TEXT PRIMARY KEY,
  donor_id TEXT NOT NULL REFERENCES public.blood_donors(id) ON DELETE CASCADE,
  donation_date TEXT NOT NULL,
  hospital TEXT NOT NULL,
  district TEXT NOT NULL,
  donation_type TEXT NOT NULL DEFAULT 'VOLUNTARY',
  recipient_reference TEXT,
  notes TEXT,
  is_verified BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blood_history_donor ON public.blood_donation_history (donor_id);
CREATE INDEX IF NOT EXISTS idx_blood_history_date ON public.blood_donation_history (donation_date);

-- 3. Emergency Blood Requests
CREATE TABLE IF NOT EXISTS public.emergency_blood_requests (
  id TEXT PRIMARY KEY,
  requester_name TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  units_needed INT NOT NULL DEFAULT 1,
  hospital_name TEXT NOT NULL,
  district TEXT NOT NULL,
  upazila TEXT NOT NULL,
  emergency_level TEXT NOT NULL DEFAULT 'URGENT',
  required_date TEXT NOT NULL,
  additional_notes TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  matched_donor_ids JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_emergency_requests_group ON public.emergency_blood_requests (blood_group);
CREATE INDEX IF NOT EXISTS idx_emergency_requests_district ON public.emergency_blood_requests (district);
CREATE INDEX IF NOT EXISTS idx_emergency_requests_status ON public.emergency_blood_requests (status);

-- 4. Blood Donation Settings
CREATE TABLE IF NOT EXISTS public.blood_donation_settings (
  id TEXT PRIMARY KEY DEFAULT 'default_blood_settings',
  hero_title JSONB NOT NULL DEFAULT '{"en": "Infinity Blood Donation Network", "bn": "ইনফিনিটি বাংলাদেশ রক্তদান নেটওয়ার্ক"}'::jsonb,
  hero_subtitle JSONB NOT NULL DEFAULT '{"en": "Donate Blood, Save Lives – Be a Hero", "bn": "রক্ত দিন, জীবন বাঁচান — মানবতার সেবায় এগিয়ে আসুন"}'::jsonb,
  emergency_helpline TEXT NOT NULL DEFAULT '+880 1839-008339',
  coordination_email TEXT NOT NULL DEFAULT 'blood@infinitybangladesh.org',
  guidelines_title JSONB NOT NULL DEFAULT '{"en": "Blood Donation Guidelines & Eligibility", "bn": "রক্তদানের নীতিমালা ও আবশ্যিক নির্দেশিকা"}'::jsonb,
  guidelines_text JSONB NOT NULL DEFAULT '{"en": "Age: 18-60 years. Minimum Weight: 45kg for females, 50kg for males. Interval: At least 3-4 months between donations.", "bn": "বয়স: ১৮-৬০ বছর। সর্বনিম্ন ওজন: মহিলাদের ৪৫ কেজি, পুরুষদের ৫০ কেজি। ব্যবধান: প্রতি ৩-৪ মাস পর পর রক্তদান করা নিরাপদ।"}'::jsonb,
  consent_statement JSONB NOT NULL DEFAULT '{"en": "I hereby confirm my willingness to be a voluntary blood donor and consent to Infinity Bangladesh coordinating blood requests.", "bn": "আমি স্বেচ্ছায় রক্তদাতা হিসেবে নিবন্ধিত হতে সম্মত এবং ইনফিনিটি বাংলাদেশ কর্তৃক রক্তদানের সমন্বয়ে তথ্য ব্যবহারে সম্মতি দিচ্ছি।"}'::jsonb,
  enable_public_direct_contact BOOLEAN NOT NULL DEFAULT TRUE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES — FULL READ & WRITE ACCESS FOR ALL CMS TABLES
-- ==============================================================================

-- Enable RLS and grant full select/insert/update/delete policies
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT tablename FROM pg_tables WHERE schemaname = 'public'
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public full access %I" ON public.%I;', tbl, tbl);
    EXECUTE format('CREATE POLICY "Public full access %I" ON public.%I FOR ALL USING (true) WITH CHECK (true);', tbl, tbl);
  END LOOP;
END $$;

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
INSERT INTO public.blood_donation_settings (id) VALUES ('default_blood_settings') ON CONFLICT (id) DO NOTHING;

