import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { CampaignCard } from '../components/CampaignCard';
import { ProgramCard } from '../components/ProgramCard';
import { ImpactCounter } from '../components/ImpactCounter';
import { StoryCard } from '../components/StoryCard';
import { NewsCard } from '../components/NewsCard';
import { EventCard } from '../components/EventCard';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  Heart,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  MapPin,
  Clock,
  Play,
  Award,
  HandHeart,
  TrendingUp
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const { campaigns, programs, metrics, stories, news, events, gallery } = useData();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const featuredCampaign = campaigns.find(c => c.isFeatured) || campaigns[0];
  const otherCampaigns = campaigns.filter(c => c.id !== featuredCampaign?.id).slice(0, 3);
  const featuredStories = stories.slice(0, 2);

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28 pb-20 overflow-hidden">
      {/* 1. HERO SECTION — WARM HUMANITARIAN EDITORIAL REDESIGN */}
      <section className="relative bg-[#FAF7F2] pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-[#EAE3D9]/70">
        {/* Subtle Organic Background Accents */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#006A4E]/10 rounded-full blur-3xl" />
          {/* Subtle decorative curved background lines */}
          <svg className="absolute right-0 top-1/4 w-72 h-72 text-[#EAE3D9]/60" viewBox="0 0 200 200" fill="none">
            <path d="M20,100 C60,20 140,20 180,100 C140,180 60,180 20,100 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Story & Hero CTAs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3EF] border border-[#C2E2D7] text-[#00523C] text-xs sm:text-sm font-extrabold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#006A4E] animate-pulse" />
                <span className="tracking-wide">
                  {isBn ? 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' : 'TEAM INFINITY — UNITED FOR HUMANITY'}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display">
                {isBn ? (
                  <>
                    একসাথে, আমরা গড়ব <br className="hidden sm:inline" />
                    <span className="text-[#006A4E] relative inline-block">
                      এক সুন্দর মানবিক
                      <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#D97706]/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none" fill="currentColor">
                        <path d="M0,15 Q50,0 100,15 L100,20 L0,20 Z" />
                      </svg>
                    </span>{' '}
                    আগামী।
                  </>
                ) : (
                  <>
                    Together, We Can Create a <br className="hidden sm:inline" />
                    <span className="text-[#006A4E] relative inline-block">
                      Better Tomorrow.
                      <svg className="absolute -bottom-1.5 left-0 w-full h-3.5 text-[#D97706]/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none" fill="currentColor">
                        <path d="M0,15 Q50,0 100,15 L100,20 L0,20 Z" />
                      </svg>
                    </span>
                  </>
                )}
              </h1>

              {/* Supporting Description */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                {isBn
                  ? 'ইনফিনিটি বাংলাদেশ একটি তারুণ্যনির্ভর অলাভজনক সামাজিক উদ্যোগ। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে শুরু করে উৎসবের নতুন পোশাক, রমজান খাদ্য সহায়তা, জরুরি দুর্যোগ সেবা ও শিক্ষা সহায়তা প্রদানের মাধ্যমে আমরা মানুষের মর্যাদা রক্ষায় কাজ করে চলেছি।'
                  : 'Infinity Bangladesh is a volunteer-led social organization driven by passionate youth. From humanitarian support and festive Eid initiatives to emergency relief and community development, we work to protect dignity and create meaningful change across Bangladesh.'}
              </p>

              {/* CTA Action Cluster */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate('donate')}
                  className="px-6 sm:px-7 py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-sm sm:text-base font-extrabold shadow-warm-md hover:shadow-warm-lg transition-all duration-200 flex items-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Heart className="w-5 h-5 fill-white text-white" />
                  <span>{isBn ? 'সহায়তা করুন' : 'Support Our Work'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('volunteer')}
                  className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] active:bg-[#F2ECE1] text-slate-800 text-sm sm:text-base font-bold border-2 border-[#D8CFC4] hover:border-[#006A4E] hover:text-[#006A4E] shadow-warm-sm transition-all duration-200 flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Users className="w-5 h-5 text-[#006A4E]" />
                  <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer'}</span>
                </button>

                {/* Secondary Video Trigger Button */}
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#006A4E] px-3 py-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-full bg-[#E6F3EF] flex items-center justify-center text-[#006A4E]">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                  <span>{isBn ? 'আমাদের গল্প জানুন' : 'Our Story'}</span>
                </button>
              </div>

              {/* 3 Hero Trust Indicators */}
              <div className="pt-6 sm:pt-7 border-t border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-700">
                <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#EAE3D9]/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-[#E6F3EF] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#006A4E]" />
                  </div>
                  <span className="font-bold">{isBn ? '১০০% স্বচ্ছ ও জবাবদিহিতা' : '100% Verified Accountability'}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#EAE3D9]/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <span className="font-bold">{isBn ? 'সরাসরি মাঠপর্যায়ে বিতরণ' : 'Direct Ground-Level Delivery'}</span>
                </div>

                <div className="flex items-center gap-2 bg-white/70 p-2.5 rounded-xl border border-[#EAE3D9]/80 shadow-2xs">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                  </div>
                  <span className="font-bold">{isBn ? 'তারুণ্যনির্ভর স্বেচ্ছাসেবী' : 'Youth Volunteer Network'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signature Organic Framed Field Image */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Warm Amber & Emerald Aura Glow behind image */}
              <div className="absolute -inset-3 bg-gradient-to-tr from-[#D97706]/20 via-[#006A4E]/15 to-transparent rounded-[2.5rem] blur-xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D97706]/15 rounded-full blur-2xl" />

              {/* Main Organic Image Container */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-warm-xl border-4 border-white bg-slate-100 aspect-4/3 sm:aspect-5/4 lg:aspect-4/5">
                <img
                  src={getAssetUrl('/images/infinity-cover-hero.jpg')}
                  alt="Infinity Bangladesh Volunteer Drive Cover"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                {/* Floating Since 2015 Badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-warm-lg border border-[#EAE3D9] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-bold font-display text-sm shrink-0">
                      2015
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">
                        {isBn ? 'প্রতিষ্ঠিত ২০১৫' : 'Established 2015'}
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#006A4E]" />
                        <span>Hathazari, Chattogram</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#00523C]">
                      Team Infinity
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'আমাদের মাঠপর্যায়ের বিস্তৃতি' : 'Verified Groundwork'}
          title={isBn ? 'পরিসংখ্যান ও মানবিক প্রভাব' : 'Our Measured Impact Across Communities'}
          subtitle={
            isBn
              ? 'সকল সংখ্যা ও তথ্য সততা ও নিরপেক্ষতার সাথে যাচাইকৃত।'
              : 'Ground-level metrics verified by Team Infinity audits across communities.'
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {metrics.map(m => (
            <ImpactCounter key={m.id} metric={m} />
          ))}
        </div>
      </section>

      {/* 3. ABOUT / WHO WE ARE (`People First. Humanity Always.`) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] border border-[#EAE3D9] p-7 sm:p-12 lg:p-14 shadow-warm-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Image with Since 2015 Accent */}
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white aspect-4/3 sm:aspect-1/1 bg-slate-100">
                <img
                  src={getAssetUrl('/images/events/winter-warmth.jpg')}
                  alt="Team Infinity Community Service"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-[#006A4E] text-white p-4 sm:p-5 rounded-2xl shadow-warm-lg text-xs sm:text-sm font-semibold max-w-[240px] border border-emerald-400/40">
                <p className="leading-snug">
                  {isBn
                    ? '“মানবতার জয়গান গাইতে তারুণ্যের এই নিঃস্বার্থ ঐক্য।”'
                    : '“Youth with Purpose. Community with Empathy.”'}
                </p>
                <span className="block text-[11px] text-emerald-200 mt-1 font-bold">— Team Infinity</span>
              </div>
            </div>

            {/* Right Column: Mission Story */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F3EF] text-[#00523C] text-xs font-extrabold uppercase tracking-wider border border-[#C2E2D7]">
                {isBn ? 'আমাদের পরিচয় ও লক্ষ্য' : 'Who We Are'}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
                {isBn ? (
                  <>
                    মানুষের পাশে দাঁড়ানোই আমাদের ব্রত — <br />
                    <span className="text-[#006A4E]">মানুষ প্রথম, মানবতাই মূল।</span>
                  </>
                ) : (
                  <>
                    People First. <br />
                    <span className="text-[#006A4E]">Humanity Always.</span>
                  </>
                )}
              </h2>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {isBn
                  ? 'ইনফিনিটি বাংলাদেশ কোনো বাণিজ্যিক বা গতানুগতিক আনুষ্ঠানিক দাতা সংস্থা নয়। ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে একদল স্বপ্নবাজ তরুণের হাত ধরে যাত্রা শুরু হয় টিম ইনফিনিটির। নিজেদের মেধা, সময় ও শ্রমকে একত্রিত করে সুবিধাবঞ্চিত শিশু ও অসহায় মানুষের পাশে দাঁড়ানোই আমাদের মূল প্রত্যয়।'
                  : 'Infinity Bangladesh is an authentic youth-led volunteer initiative founded in Hathazari, Chattogram in 2015. Uniting caring changemakers across Bangladesh, we serve people with absolute dignity, transparency, and genuine hope.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 pt-2">
                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1">
                  <strong className="text-slate-900 block text-sm font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#006A4E]" />
                    {isBn ? 'মর্যাদাপূর্ণ মানবিক সেবা' : 'Dignity First Principle'}
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {isBn
                      ? 'উপকারভোগীদের আত্মসম্মান অক্ষুণ্ণ রেখে আমরা উপহার পৌঁছে দেই।'
                      : 'We ensure all humanitarian aid is delivered with utmost respect.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1">
                  <strong className="text-slate-900 block text-sm font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                    {isBn ? 'স্বচ্ছ তহবিল ব্যবহার' : '100% Fund Integrity'}
                  </strong>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    {isBn
                      ? 'প্রতিটি টাকার হিসাব সংরক্ষণ ও নিরীক্ষা রিপোর্ট উন্মুক্ত।'
                      : 'Every donation directly reaches verified field relief with public audits.'}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="px-6 py-3 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-warm-sm transition-all cursor-pointer"
                >
                  <span>{isBn ? 'আমাদের পূর্ণাঙ্গ ইতিহাস জানুন' : 'Learn More About Us'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR WORK / CORE PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'আমাদের কর্মক্ষেত্রসমূহ' : 'Our Focus Areas'}
          title={isBn ? 'আমরা যে বিষয়ে কাজ করি' : 'What We Do'}
          subtitle={
            isBn
              ? 'সুবিধাবঞ্চিত মানুষের প্রয়োজন বিবেচনায় সুনির্দিষ্ট মানবিক কর্মসূচি।'
              : 'Structured humanitarian pillars designed for lasting ground impact.'
          }
          action={
            <button
              type="button"
              onClick={() => navigate('programs')}
              className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'সকল কর্মসূচি দেখুন' : 'Explore All Programs'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
          alignment="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.slice(0, 3).map(p => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
      </section>

      {/* 5. FEATURED CAMPAIGN SPOTLIGHT (`From Intention to Action.`) */}
      {featuredCampaign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'বিশেষ কর্মসূচি' : 'Featured Campaign'}
            title={isBn ? 'সংকল্প থেকে বাস্তব সেবায়' : 'From Intention to Action.'}
            subtitle={
              isBn
                ? 'উৎসবের আনন্দ ও জরুরি সহায়তা পৌঁছে দিতে আমাদের মাঠপর্যায়ের উদ্যোগ।'
                : 'Real volunteer initiatives transforming intentions into verified support.'
            }
          />

          <div className="bg-white rounded-[2.5rem] border border-[#EAE3D9] overflow-hidden shadow-warm-md grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] bg-slate-100">
              <img
                src={featuredCampaign.imageUrl}
                alt={tText(featuredCampaign.title)}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#006A4E] text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-xs">
                {isBn ? 'চলমান বিশেষ ক্যাম্পেইন' : 'Active Seasonal Initiative'}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                  <span className="flex items-center gap-1 text-[#006A4E]">
                    <Calendar className="w-3.5 h-3.5" />
                    {featuredCampaign.date}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{tText(featuredCampaign.location)}</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {tText(featuredCampaign.title)}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {tText(featuredCampaign.description)}
                </p>

                {/* Objectives list */}
                <div className="space-y-2 pt-2">
                  <strong className="text-xs uppercase font-extrabold tracking-wider text-slate-900 block">
                    {isBn ? 'ক্যাম্পেইনের মূল লক্ষ্যসমূহ:' : 'Key Campaign Objectives:'}
                  </strong>
                  {(isBn ? featuredCampaign.objectives.bn : featuredCampaign.objectives.en).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-[#006A4E] mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('campaigns/detail', featuredCampaign.slug)}
                  className="px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs sm:text-sm font-bold shadow-warm-sm inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>{isBn ? 'সম্পূর্ণ বিবরণ দেখুন' : 'View Campaign Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('donate')}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-[#006A4E] text-xs sm:text-sm font-bold border border-[#EAE3D9] inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                  <span>{isBn ? 'সহায়তা প্রদান করুন' : 'Support Campaign'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. OTHER CAMPAIGNS GRID */}
      {otherCampaigns.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'সাম্প্রতিক ও অন্যান্য উদ্যোগ' : 'Field Initiatives'}
            title={isBn ? 'চলমান ও সম্পন্ন ক্যাম্পেইনসমূহ' : 'Ongoing & Seasonal Campaigns'}
            subtitle={
              isBn
                ? 'দেশের বিভিন্ন প্রান্তে পরিচালিত টিম ইনফিনিটির মাঠপর্যায়ের কার্যক্রম।'
                : 'Volunteer missions serving humanity throughout the year.'
            }
            action={
              <button
                type="button"
                onClick={() => navigate('campaigns')}
                className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? 'সকল ক্যাম্পেইন দেখুন' : 'View All Campaigns'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            }
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherCampaigns.map(c => (
              <CampaignCard key={c.id} campaign={c} />
            ))}
          </div>
        </section>
      )}

      {/* 7. STORIES SECTION (`Real Stories of Dignity & Hope`) */}
      {featuredStories.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'বাস্তব মানবিক গল্প' : 'Human Stories'}
            title={isBn ? 'মর্যাদা ও আশার বাস্তব অভিজ্ঞতা' : 'Real Stories of Dignity & Hope'}
            subtitle={
              isBn
                ? 'সম্মতি ও গোপনীয়তা বজায় রেখে সংরক্ষিত মাঠপর্যায়ের মানবিক অভিজ্ঞতা।'
                : 'Documenting transformational journeys across communities with dignity.'
            }
            action={
              <button
                type="button"
                onClick={() => navigate('stories')}
                className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? 'সকল গল্প পড়ুন' : 'Read All Stories'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            }
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {featuredStories.map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* 8. MEET TEAM INFINITY — LEADERSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'নেতৃত্ব ও পরিচালনা পরিষদ' : 'Leadership & Governance'}
          title={isBn ? 'টিম ইনফিনিটি কার্যনির্বাহী নেতৃত্ব (২০২৬)' : 'Meet Team Infinity Leadership'}
          subtitle={
            isBn
              ? 'মানবিক মূল্যবোধ, স্বচ্ছতা ও সততার সাথে সেবা কার্য পরিচালনায় নিবেদিত নির্বাচিত নেতৃত্ব।'
              : 'Passionate youth changemakers driving our field operations and institutional mission.'
          }
          action={
            <button
              type="button"
              onClick={() => navigate('about/executive-committee')}
              className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'পূর্ণাঙ্গ কার্যনির্বাহী পরিষদ দেখুন' : 'View Full Executive Committee 2026'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
          alignment="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* President */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border-2 border-[#006A4E]/30 hover:border-[#006A4E] transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-[#E6F3EF] text-[#00523C] font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#C2E2D7]">
              #01
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-2xl overflow-hidden bg-[#E6F3EF] border border-[#C2E2D7] mb-3 flex items-center justify-center">
              <img
                src={getAssetUrl('/images/members/exec-1-md-shahidul-alam-sakib.png')}
                alt="MD. SHAHIDUL ALAM SAKIB"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#006A4E] transition-colors font-display">
              {isBn ? 'মোঃ শাহিদুল আলম সাকিব' : 'MD. SHAHIDUL ALAM SAKIB'}
            </h4>
            <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-[#E6F3EF] text-[#00523C] font-bold text-[11px]">
              {isBn ? 'সভাপতি' : 'President'}
            </div>
          </div>

          {/* Senior VP */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border border-[#EAE3D9] hover:border-[#006A4E] transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #02
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3 flex items-center justify-center">
              <img
                src={getAssetUrl('/images/members/exec-2-mohammad-ismail.png')}
                alt="MOHAMMAD ISMAIL"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006A4E] transition-colors font-display">
              {isBn ? 'মোহাম্মদ ইসমাইল' : 'MOHAMMAD ISMAIL'}
            </h4>
            <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
              {isBn ? 'সিনিয়র সহ-সভাপতি' : 'Senior Vice President'}
            </div>
          </div>

          {/* Vice President 1 */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border border-[#EAE3D9] hover:border-[#006A4E] transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #03
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3 flex items-center justify-center">
              <img
                src={getAssetUrl('/images/members/exec-3-joinul-abedin.png')}
                alt="JOINUL ABEDIN"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006A4E] transition-colors font-display">
              {isBn ? 'জয়নুল আবেদীন' : 'JOINUL ABEDIN'}
            </h4>
            <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
              {isBn ? 'সহ-সভাপতি' : 'Vice President'}
            </div>
          </div>

          {/* Vice President 2 */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border border-[#EAE3D9] hover:border-[#006A4E] transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #04
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-2xl overflow-hidden bg-slate-100 border border-slate-200 mb-3 flex items-center justify-center">
              <img
                src={getAssetUrl('/images/members/exec-4-sohel-akram-sobuj.png')}
                alt="SOHEL AKRAM SOBUJ"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006A4E] transition-colors font-display">
              {isBn ? 'সোহেল আকরাম সবুজ' : 'SOHEL AKRAM SOBUJ'}
            </h4>
            <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold text-[11px]">
              {isBn ? 'সহ-সভাপতি' : 'Vice President'}
            </div>
          </div>

          {/* General Secretary */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border-2 border-[#D4182E]/30 hover:border-[#D4182E] transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-[#FDF1F2] text-[#B31224] font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#FCD3D7]">
              #05
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FDF1F2] border border-[#FCD3D7] mb-3 flex items-center justify-center">
              <img
                src={getAssetUrl('/images/members/exec-5-salimur-rahman-opi.png')}
                alt="SALIMUR RAHMAN OPI"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#D4182E] transition-colors font-display">
              {isBn ? 'সলিমুর রহমান অপি' : 'SALIMUR RAHMAN OPI'}
            </h4>
            <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-[#FDF1F2] text-[#B31224] font-bold text-[11px]">
              {isBn ? 'সাধারণ সম্পাদক' : 'General Secretary'}
            </div>
          </div>
        </div>
      </section>

      {/* 9. PHOTO GALLERY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'মাঠপর্যায়ের আলোকচিত্র' : 'Field Moments'}
          title={isBn ? 'কর্মে ও সেবায় আমাদের পদচিহ্ন' : 'Moments of Humanity in the Field'}
          subtitle={
            isBn
              ? 'সম্মতি ও মানবিক মর্যাদা বজায় রেখে সংগৃহীত মুহূর্ত।'
              : 'Authentic volunteer efforts captured across distribution drives.'
          }
          action={
            <button
              type="button"
              onClick={() => navigate('gallery')}
              className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'সম্পূর্ণ গ্যালারি দেখুন' : 'Full Photo Gallery'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
          alignment="left"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {gallery.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 cursor-pointer shadow-warm-sm hover:shadow-warm-md border border-[#EAE3D9]"
            >
              <img
                src={item.imageUrl}
                alt={tText(item.title)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#006A4E]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. VOLUNTEER & SUPPORT DUAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Volunteer CTA */}
          <div className="bg-gradient-to-br from-[#006A4E] to-[#0F4C3A] text-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-warm-lg relative overflow-hidden">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-200">
                {isBn ? 'স্বেচ্ছাসেবী আহ্বান' : 'Join Team Infinity'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {isBn ? 'আপনার সময় গড়তে পারে এক সুন্দর আগামী' : 'Your Time Can Make a Real Difference.'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {isBn
                  ? 'আপনার মেধা, সময় বা শক্তি দিয়ে সুবিধাবঞ্চিত মানুষের পাশে দাঁড়ান। টিম ইনফিনিটিতে যুক্ত হয়ে মানবসেবায় নিজেকে নিয়োজিত করুন।'
                  : 'Whether you can give your time, skills, or youth energy, there is a place for you in Team Infinity. Together we stand united for humanity.'}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate('volunteer')}
                className="px-6 py-3.5 rounded-2xl bg-white hover:bg-emerald-50 text-[#006A4E] font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-warm-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Support CTA */}
          <div className="bg-gradient-to-br from-[#11241E] to-[#0A1612] text-white rounded-[2.5rem] p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-warm-lg border border-emerald-900/60 relative overflow-hidden">
            <div className="space-y-3">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400">
                {isBn ? 'সহায়তার হাত' : 'Direct Support'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {isBn ? 'সরাসরি মানুষের কাছে পৌঁছায় এমন কাজে সহায়তা দিন' : 'Support Work That Directly Reaches People.'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                {isBn
                  ? 'আপনার সামান্য সহযোগিতাও একজন পথশিশুর মুখে হাসি ফোটাতে কিংবা একটি অসহায় পরিবারের জন্য রমজানের খাদ্য জোগাতে সাহায্য করে।'
                  : 'Your honest support enables verified field initiatives, providing clothes, meals, and education directly with complete transparent reporting.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('donate')}
                className="px-6 py-3.5 rounded-2xl bg-[#D4182E] hover:bg-[#B31224] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-warm-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isBn ? 'অনুদান দিন' : 'Support Our Work'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('transparency')}
                className="px-5 py-3.5 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-200 text-xs sm:text-sm font-semibold border border-emerald-800 transition-colors"
              >
                <span>{isBn ? 'তহবিল ব্যবহার দেখুন' : 'See Fund Utilization'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 11. TRANSPARENCY PLEDGE SECTION (`Trust Is Built in the Open.`) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'স্বচ্ছতা ও অডিট' : 'Open Governance'}
          title={isBn ? 'উন্মুক্ততার মাঝেই বিশ্বাসের ভিত্তি' : 'Trust Is Built in the Open.'}
          subtitle={
            isBn
              ? 'টিম ইনফিনিটি প্রতিটি ক্যাম্পেইনের তহবিল ও অডিট রিপোর্ট সবার জন্য উন্মুক্ত রাখে।'
              : 'Infinity Bangladesh publishes verified campaign audits and financial transparency reports.'
          }
        />
        <VerifiedOrganizationPledge />
      </section>

      {/* 12. LATEST NEWS & EVENTS */}
      {news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'সংবাদ ও আপডেট' : 'Latest News'}
            title={isBn ? 'কার্যক্রমের সর্বশেষ খবর' : 'News & Announcements'}
            subtitle={isBn ? 'ইনফিনিটি বাংলাদেশ-এর সাম্প্রতিক সংবাদ ও প্রেস রিলিজ।' : 'Official announcements and field updates from Team Infinity.'}
            action={
              <button
                type="button"
                onClick={() => navigate('news')}
                className="text-xs sm:text-sm font-bold text-[#006A4E] hover:text-[#00523C] inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? 'সকল সংবাদ দেখুন' : 'All News Articles'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            }
            alignment="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {news.slice(0, 2).map(article => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* 13. UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'আসন্ন কর্মসূচি' : 'Upcoming Meets'}
            title={isBn ? 'স্বেচ্ছাসেবী ও সামাজিক ইভেন্টসমূহ' : 'Events & Volunteer Gatherings'}
            subtitle={isBn ? 'টিম ইনফিনিটির আসন্ন কর্মশালা ও মাঠপর্যায়ের কর্মসূচি।' : 'Join interactive sessions, orientations, and field drives.'}
          />

          <div className="space-y-6">
            {events.slice(0, 2).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightbox
          photos={gallery}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};
