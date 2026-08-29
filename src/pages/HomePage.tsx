import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { CampaignCard } from '../components/CampaignCard';
import { ProgramCard } from '../components/ProgramCard';
import { ImpactCounter } from '../components/ImpactCounter';
import { StoryCard } from '../components/StoryCard';
import { GalleryLightbox } from '../components/GalleryLightbox';
import { VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import { getAssetUrl } from '../lib/utils/assetHelper';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { StaggerGroup, StaggerItem } from '../components/motion/StaggerGroup';
import {
  Heart,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Play,
  Award,
  HandHeart,
  TrendingUp,
  Droplet,
  Search,
  ExternalLink,
  ShieldAlert,
  Target,
  Eye
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const {
    campaigns,
    programs,
    metrics,
    stories,
    gallery,
    pressCoverages,
    homepageConfig,
    aboutSettings,
    bloodDonationSettings,
    bloodDonors,
    emergencyBloodRequests
  } = useData();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const hero = homepageConfig.hero;
  const aboutPreview = homepageConfig.aboutPreview;
  const visibility = homepageConfig.sectionVisibility || {};

  const featuredCampaign = campaigns.find(c => c.isFeatured && c.status !== 'archived') || campaigns[0];
  const otherCampaigns = campaigns.filter(c => c.id !== featuredCampaign?.id && c.status !== 'archived').slice(0, 3);
  const featuredStories = stories.filter(s => s.status !== 'archived').slice(0, 2);
  const activeMetrics = metrics.filter(m => m.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));

  const totalRegisteredDonors = bloodDonationSettings.statTotalDonorsOverride || bloodDonors.length;
  const pendingBloodRequests = emergencyBloodRequests.filter(r => r.status === 'PENDING' || r.status === 'PROCESSING').length;

  const renderTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'CheckCircle2':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />;
      case 'Sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-amber-700" />;
      case 'Heart':
        return <Heart className="w-3.5 h-3.5 text-rose-600" />;
      case 'Users':
        return <Users className="w-3.5 h-3.5 text-[#006A4E]" />;
      case 'Award':
        return <Award className="w-3.5 h-3.5 text-blue-600" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-3.5 h-3.5 text-[#006A4E]" />;
    }
  };

  // Section Rendering Function Map
  const renderSection = (sectionKey: string) => {
    if (visibility[sectionKey] === false) return null;

    switch (sectionKey) {
      case 'hero':
        return (
          <section key="hero" className="relative bg-[#FAF7F2] pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 border-b border-[#EAE3D9]/70">
            {/* Subtle Organic Background Accents */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
              <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl" />
              <div className="absolute top-1/3 -left-20 w-96 h-96 bg-[#006A4E]/10 rounded-full blur-3xl" />
              <svg className="absolute right-0 top-1/4 w-72 h-72 text-[#EAE3D9]/60" viewBox="0 0 200 200" fill="none">
                <path d="M20,100 C60,20 140,20 180,100 C140,180 60,180 20,100 Z" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 6" />
              </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column: Headline, Description & CTAs */}
                <ScrollReveal effect="slide-right" className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
                  {/* Eyebrow Pill */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3EF] border border-[#C2E2D7] text-[#00523C] text-xs sm:text-sm font-extrabold shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#006A4E] animate-pulse" />
                    <span className="tracking-wide">
                      {tText(hero.eyebrow)}
                    </span>
                  </div>

                  {/* Main Headline */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display">
                    {tText(hero.headlineMain)}{' '}
                    <span className="text-[#006A4E] relative inline-block">
                      {tText(hero.headlineHighlight)}
                      <svg className="absolute -bottom-1 left-0 w-full h-3 text-[#D97706]/40 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none" fill="currentColor">
                        <path d="M0,15 Q50,0 100,15 L100,20 L0,20 Z" />
                      </svg>
                    </span>
                  </h1>

                  {/* Supporting Description */}
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl font-normal">
                    {tText(hero.description)}
                  </p>

                  {/* CTA Action Cluster */}
                  <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                    {hero.primaryCta.active && (
                      <Link
                        to={hero.primaryCta.url}
                        isExternal={hero.primaryCta.openInNewTab}
                        className="px-6 sm:px-7 py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] active:bg-[#00402E] text-white text-sm sm:text-base font-extrabold shadow-warm-md hover:shadow-warm-lg transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 touch-min-btn"
                      >
                        <Heart className="w-5 h-5 fill-white text-white" />
                        <span>{tText(hero.primaryCta.text)}</span>
                      </Link>
                    )}

                    {hero.secondaryCta.active && (
                      <Link
                        to={hero.secondaryCta.url}
                        isExternal={hero.secondaryCta.openInNewTab}
                        className="px-6 sm:px-7 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] active:bg-[#F2ECE1] text-slate-800 text-sm sm:text-base font-bold border-2 border-[#D8CFC4] hover:border-[#006A4E] hover:text-[#006A4E] shadow-warm-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5 touch-min-btn"
                      >
                        <Users className="w-5 h-5 text-[#006A4E]" />
                        <span>{tText(hero.secondaryCta.text)}</span>
                      </Link>
                    )}

                    {hero.storyCta.active && (
                      <Link
                        to={hero.storyCta.url}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#006A4E] px-3 py-2 rounded-xl hover:bg-white/60 transition-colors cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-full bg-[#E6F3EF] flex items-center justify-center text-[#006A4E]">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                        <span>{tText(hero.storyCta.text)}</span>
                      </Link>
                    )}
                  </div>

                  {/* 3 Hero Trust Indicators */}
                  <div className="pt-6 sm:pt-7 border-t border-[#EAE3D9] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs text-slate-700">
                    {hero.trustIndicators.filter(t => t.active).map((indicator, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-white/80 p-2.5 rounded-xl border border-[#EAE3D9]/80 shadow-2xs">
                        <div className="w-6 h-6 rounded-full bg-[#E6F3EF] flex items-center justify-center shrink-0">
                          {renderTrustIcon(indicator.icon)}
                        </div>
                        <span className="font-bold">{tText(indicator.text)}</span>
                      </div>
                    ))}
                  </div>
                </ScrollReveal>

                {/* Right Column: Hero Real Photography Container */}
                <ScrollReveal effect="slide-left" delay={0.2} className="lg:col-span-5 relative mt-4 lg:mt-0">
                  <div className="absolute -inset-3 bg-gradient-to-tr from-[#D97706]/20 via-[#006A4E]/15 to-transparent rounded-[2.5rem] blur-xl" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D97706]/15 rounded-full blur-2xl" />

                  {/* Hero Card Container */}
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-warm-xl border-4 border-white bg-[#0F221D]">
                    <div className="relative w-full aspect-4/3 sm:aspect-5/4 lg:aspect-4/5 overflow-hidden">
                      <img
                        src={getAssetUrl(hero.heroImageUrl)}
                        alt={hero.heroImageAlt || 'Infinity Bangladesh Official Photo'}
                        style={{ objectPosition: hero.heroImageCropPosition || 'center center' }}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

                      {/* Floating Established 2015 Badge */}
                      <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-warm-lg border border-[#EAE3D9] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#006A4E] text-white flex items-center justify-center font-bold font-display text-sm shrink-0 shadow-xs">
                            {hero.badgeYear || '2015'}
                          </div>
                          <div>
                            <p className="text-xs font-extrabold text-slate-900 font-display">
                              {isBn ? `প্রতিষ্ঠিত ${hero.badgeYear || '২০১৫'}` : `Established ${hero.badgeYear || '2015'}`}
                            </p>
                            <p className="text-[11px] text-slate-600 flex items-center gap-1 font-medium">
                              <MapPin className="w-3 h-3 text-[#006A4E]" />
                              <span>{hero.badgeLocation || 'Hathazari, Chattogram'}</span>
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
                            {hero.badgeTag || 'Team Infinity'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );

      case 'impact':
        return (
          <section key="impact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={isBn ? 'আমাদের মাঠপর্যায়ের বিস্তৃতি' : 'Verified Groundwork'}
              title={isBn ? 'পরিসংখ্যান ও মানবিক প্রভাব' : 'Our Measured Impact Across Communities'}
              subtitle={
                isBn
                  ? 'সকল সংখ্যা ও তথ্য সততা ও নিরপেক্ষতার সাথে যাচাইকৃত।'
                  : 'Ground-level metrics verified by Team Infinity audits across communities.'
              }
            />

            <StaggerGroup className="flex flex-wrap justify-center gap-5 sm:gap-6">
              {activeMetrics.map((m) => (
                <StaggerItem key={m.id} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.15rem)] max-w-xs flex">
                  <ImpactCounter metric={m} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        );

      case 'about':
        return (
          <section key="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-[2.5rem] border border-[#EAE3D9] p-6 sm:p-10 lg:p-12 shadow-warm-md">
              <ScrollReveal effect="slide-right" className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F3EF] border border-[#C2E2D7] text-[#00523C] text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{tText(aboutPreview.eyebrow) || (isBn ? 'সংগঠন পরিচিতি' : 'About Infinity Bangladesh')}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display leading-tight">
                  {tText(aboutPreview.titleMain)}{' '}
                  <span className="text-[#006A4E]">{tText(aboutPreview.titleHighlight)}</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {tText(aboutPreview.description)}
                </p>

                {/* Mission & Vision Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]/80">
                    <Target className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{isBn ? 'আমাদের লক্ষ্য' : 'Our Mission'}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">{tText(aboutSettings.mission)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D9]/80">
                    <Eye className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{isBn ? 'আমাদের দর্শন' : 'Our Vision'}</h4>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug line-clamp-2">{tText(aboutSettings.vision)}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    to={aboutPreview.ctaUrl || 'about/story'}
                    className="px-6 py-3 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs sm:text-sm font-bold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>{tText(aboutPreview.ctaText) || (isBn ? 'আমাদের সম্পূর্ণ যাত্রা পড়ুন' : 'Read Our Full Story')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="about/executive-committee"
                    className="px-5 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 text-xs sm:text-sm font-bold border border-[#D8CFC4] transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-[#006A4E]" />
                    <span>{isBn ? 'নেতৃত্ব কমিটি' : 'Executive Team'}</span>
                  </Link>
                </div>
              </ScrollReveal>

              <ScrollReveal effect="slide-left" delay={0.2} className="lg:col-span-6">
                <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white aspect-4/3 bg-slate-900 relative">
                  <img
                    src={getAssetUrl(aboutSettings.heroImageUrl || aboutPreview.imageUrl || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80')}
                    alt="Team Infinity Bangladesh"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-6">
                    <div className="text-white space-y-1">
                      <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {isBn ? 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' : 'Team Infinity — United for Humanity'}
                      </p>
                      <p className="text-sm font-medium text-slate-200">
                        {isBn ? '২০১৫ সাল থেকে সুবিধাবঞ্চিত মানুষের পাশে' : 'Serving underserved communities since 2015'}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>
        );

      case 'programs':
        return (
          <section key="programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={isBn ? 'স্থায়ী কার্যক্রম' : 'Flagship Programs'}
              title={isBn ? 'ধারাবাহিক মানবিক কর্মসূচি ও ইভেন্ট' : 'Sustainable Humanitarian Initiatives'}
              subtitle={
                isBn
                  ? 'প্রতি বছর নিয়মিতভাবে আয়োজিত সুবিধাবঞ্চিত মানুষের ঈদ আনন্দ, শীতবস্ত্র ও জরুরি খাদ্য কর্মসূচি।'
                  : 'Recurring seasonal programs providing dignified Eid gifts, winter protection, and relief.'
              }
            />

            <StaggerGroup className="flex flex-wrap justify-center gap-6 sm:gap-8">
              {programs.slice(0, 3).map((program) => (
                <StaggerItem key={program.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.35rem)] max-w-sm flex">
                  <ProgramCard program={program} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="text-center pt-8">
              <Link
                to="programs"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-800 text-xs sm:text-sm font-bold border border-[#EAE3D9] shadow-warm-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{isBn ? 'সকল কর্মসূচি ও ইভেন্ট তালিকা দেখুন' : 'View All Programs & Events'}</span>
                <ArrowRight className="w-4 h-4 text-[#006A4E]" />
              </Link>
            </div>
          </section>
        );

      case 'campaigns':
        return (
          <section key="campaigns" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={isBn ? 'মাঠপর্যায়ের ক্যাম্পেইন' : 'Active Field Drives'}
              title={isBn ? 'চলমান মানবিক ক্যাম্পেইন ও সেবা' : 'Ongoing Relief Drives & Campaigns'}
              subtitle={
                isBn
                  ? 'জরুরি মুহূর্ত ও ক্রান্তিলগ্নে সুবিধাবঞ্চিত অসহায় মানুষের পাশে আমাদের বিশেষ কর্মসূচি।'
                  : 'Targeted emergency drives reaching marginalized families and vulnerable communities.'
              }
            />

            <div className="space-y-8">
              {featuredCampaign && (
                <ScrollReveal effect="fade-up">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-[2.5rem] border border-[#EAE3D9] p-6 sm:p-8 lg:p-10 shadow-warm-md">
                    <div className="lg:col-span-6 space-y-4 text-left">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#006A4E] text-xs font-extrabold border border-emerald-200">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>{isBn ? 'বিশেষ ফিচার্ড ক্যাম্পেইন' : 'Featured Campaign'}</span>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 font-display">
                        {tText(featuredCampaign.title)}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                        {tText(featuredCampaign.description)}
                      </p>

                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <Link
                          to="campaigns/detail"
                          slug={featuredCampaign.slug}
                          className="px-6 py-3 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs sm:text-sm font-bold shadow-warm-sm transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <span>{isBn ? 'ক্যাম্পেইন বিবরণ দেখুন' : 'View Campaign Details'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <Link
                          to="donate"
                          className="px-6 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all flex items-center gap-2 cursor-pointer"
                        >
                          <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                          <span>{isBn ? 'সহায়তা করুন' : 'Support Campaign'}</span>
                        </Link>
                      </div>
                    </div>

                    <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-warm-md border-2 border-white aspect-16/10 bg-slate-100">
                      <img
                        src={getAssetUrl(featuredCampaign.imageUrl)}
                        alt={tText(featuredCampaign.title)}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {otherCampaigns.length > 0 && (
                <StaggerGroup className="flex flex-wrap justify-center gap-6 pt-4">
                  {otherCampaigns.map((c) => (
                    <StaggerItem key={c.id} className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex">
                      <CampaignCard campaign={c} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
              )}
            </div>
          </section>
        );

      case 'stories':
        return (
          <section key="stories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={isBn ? 'মানবিক দলিল' : 'Human Dignity'}
              title={isBn ? 'বাস্তব জীবনের রূপান্তরের গল্প' : 'Stories of Hope & Grassroots Change'}
              subtitle={
                isBn
                  ? 'সম্মতি ও আত্মমর্যাদা বজায় রেখে সংকলিত বাস্তব ঘটনার প্রামাণ্য বিবরণ।'
                  : 'Authentic accounts of community impact documented with verified beneficiary consent.'
              }
            />

            <StaggerGroup className="flex flex-wrap justify-center gap-8">
              {featuredStories.map((story) => (
                <StaggerItem key={story.id} className="w-full md:w-[calc(50%-1rem)] max-w-lg flex">
                  <StoryCard story={story} />
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="text-center pt-8">
              <Link
                to="stories"
                className="px-6 py-3 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-800 text-xs sm:text-sm font-bold border border-[#EAE3D9] shadow-warm-xs transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>{isBn ? 'সকল গল্প পড়ুন' : 'Read All Human Stories'}</span>
                <ArrowRight className="w-4 h-4 text-[#006A4E]" />
              </Link>
            </div>
          </section>
        );

      {/* INFINITY LIFELINE — SPECIALIZED BLOOD INITIATIVE SPOTLIGHT */}
      case 'lifeline':
      case 'blood_donation':
        return (
          <section key="lifeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal effect="fade-up">
              <div className="bg-[#0B0F17] text-white rounded-[2.5rem] p-8 sm:p-12 lg:p-14 border border-rose-900/40 relative overflow-hidden shadow-2xl">
                {/* Ambient Crimson Glows & Ripple Motifs */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-lifeline-glow" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-800/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-5 text-left">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-extrabold uppercase tracking-wider">
                      <Droplet className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-heartbeat" />
                      <span>{isBn ? 'ইনফিনিটি লাইফলাইন — জরুরি রক্তদান' : 'Infinity LifeLine — Blood Initiative'}</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-tight">
                      JUST ONE DROP,{' '}
                      <span className="text-rose-500 inline-block">INFINITY HOPE</span>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl">
                      {isBn
                        ? 'ইনফিনিটি বাংলাদেশের জরুরি রক্তদান ও সমন্বয় উইং। এক ব্যাগ রক্তে বাঁচে একটি অমূল্য প্রাণ। জরুরি প্রয়োজনে রক্তদাতা খুঁজুন কিংবা একজন স্বেচ্ছাসেবী রক্তদাতা হিসেবে নিবন্ধন করুন।'
                        : 'A dedicated emergency blood coordination network powered by Infinity Bangladesh. Finding donors in critical hours and connecting voluntary donors directly with patients.'}
                    </p>

                    {/* 4-Step Narrative Pill */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-rose-200/90 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/40">ONE DROP</span>
                      <span>&rarr;</span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/40">ONE LIFE</span>
                      <span>&rarr;</span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-800/40">ONE RIPPLE</span>
                      <span>&rarr;</span>
                      <span className="px-2.5 py-1 rounded-lg bg-rose-900/60 border border-rose-600/60 text-white font-extrabold">INFINITE HOPE</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <Link
                        to="blood-donation/find-donor"
                        className="px-6 py-3.5 rounded-2xl btn-lifeline-crimson text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-lg transform hover:-translate-y-0.5"
                      >
                        <Search className="w-4 h-4" />
                        <span>{isBn ? 'রক্তদাতা খুঁজুন' : 'Find a Donor'}</span>
                      </Link>

                      <Link
                        to="blood-donation/become-donor"
                        className="px-6 py-3.5 rounded-2xl btn-lifeline-ghost text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                      >
                        <Droplet className="w-4 h-4 text-rose-400" />
                        <span>{isBn ? 'রক্তদাতা হিসেবে নিবন্ধন করুন' : 'Become a Blood Donor'}</span>
                      </Link>

                      <Link
                        to="blood-donation/emergency-request"
                        className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-rose-200 text-xs sm:text-sm font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <ShieldAlert className="w-4 h-4 text-rose-400" />
                        <span>{isBn ? 'জরুরি রক্তের আবেদন' : 'Emergency Request'}</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: LifeLine Live Metrics Box */}
                  <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl border border-rose-900/40 p-6 sm:p-8 space-y-6 backdrop-blur-md">
                    <div className="flex items-center justify-between border-b border-rose-900/30 pb-4">
                      <span className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                        {isBn ? 'লাইভ সমন্বয় পরিসংখ্যান' : 'Live Coordination Network'}
                      </span>
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/30 text-center">
                        <p className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                          {totalRegisteredDonors}+
                        </p>
                        <p className="text-[11px] text-rose-200/80 font-medium mt-1">
                          {isBn ? 'নিবন্ধিত স্বেচ্ছাসেবী রক্তদাতা' : 'Registered Donors'}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/30 text-center">
                        <p className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
                          8+
                        </p>
                        <p className="text-[11px] text-rose-200/80 font-medium mt-1">
                          {isBn ? 'সকল ব্লাড গ্রুপ নেটওয়ার্ক' : 'Blood Groups Covered'}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between text-xs text-slate-300">
                      <span>{isBn ? '২৪/৭ জরুরি হেল্পলাইন:' : '24/7 Helpline:'}</span>
                      <span className="font-bold text-rose-300 font-mono">
                        {bloodDonationSettings.emergencyHelpline || '+880 1830-106452'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </section>
        );

      case 'gallery':
        return (
          <section key="gallery" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={isBn ? 'আলোকচিত্রে টিম ইনফিনিটি' : 'Visual Documentation'}
              title={isBn ? 'মাঠপর্যায়ের স্মৃতি ও আলোকচিত্র' : 'Moments of Humanity in Action'}
              subtitle={
                isBn
                  ? 'আমাদের প্রতিটি মানবিক মুহূর্তের স্বচ্ছ ও মর্যাদাপূর্ণ আলোকচিত্র দলিল।'
                  : 'Capturing youth volunteerism, festive smiles, and transparent distribution drives.'
              }
            />

            <StaggerGroup className="flex flex-wrap justify-center items-center gap-3.5 sm:gap-4 max-w-7xl mx-auto">
              {gallery.slice(0, 6).map((photo, i) => (
                <StaggerItem
                  key={photo.id}
                  className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.7rem)] md:w-[calc(25%-0.75rem)] lg:w-[calc(16.666%-0.85rem)] max-w-[190px] flex-shrink-0"
                >
                  <div
                    onClick={() => setLightboxIndex(i)}
                    data-cursor="view"
                    className="gallery-lightbox-trigger group relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-900 cursor-pointer shadow-warm-xs hover:shadow-warm-md border border-[#EAE3D9] transition-all transform hover:-translate-y-1"
                  >
                    <img
                      src={getAssetUrl(photo.imageUrl)}
                      alt={tText(photo.title)}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex items-end p-2.5 transition-all">
                      <span className="text-[11px] text-white font-bold truncate leading-tight drop-shadow-sm">
                        {tText(photo.title)}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>

            <div className="text-center pt-8">
              <Link
                to="gallery"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-800 font-extrabold text-xs sm:text-sm border border-[#EAE3D9] shadow-warm-xs hover:shadow-warm-sm transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>{isBn ? 'সম্পূর্ণ ফটো গ্যালারি দেখুন' : 'View Full Photo Gallery'}</span>
                <ArrowRight className="w-4 h-4 text-[#006A4E]" />
              </Link>
            </div>

            {lightboxIndex !== null && (
              <GalleryLightbox
                photos={gallery}
                initialIndex={lightboxIndex}
                onClose={() => setLightboxIndex(null)}
              />
            )}
          </section>
        );

      case 'volunteer': {
        const volBanner = homepageConfig.volunteerBanner;
        return (
          <section key="volunteer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#11241E] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-warm-xl border border-emerald-900/40">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <ScrollReveal effect="slide-right" className="lg:col-span-8 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tText(volBanner?.badge) || (isBn ? 'স্বেচ্ছাসেবী পরিবারে স্বাগতম' : 'Be Part of Team Infinity')}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                    {tText(volBanner?.title) || (isBn ? 'মানবতার সেবায় আপনিও হতে পারেন অগ্রদূত' : 'Empower Communities with Your Time & Passion')}
                  </h2>

                  <p className="text-sm sm:text-base text-emerald-200/90 leading-relaxed max-w-2xl font-normal">
                    {tText(volBanner?.subtitle) || (isBn
                      ? 'টিম ইনফিনিটি একটি তারুণ্যনির্ভর স্বচ্ছ মানবিক পরিবার। আপনার মেধা ও সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে আমাদের সাথে যুক্ত হোন।'
                      : 'Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.')}
                  </p>
                </ScrollReveal>

                <ScrollReveal effect="slide-left" delay={0.2} className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <Link
                    to={volBanner?.primaryButtonUrl || volBanner?.primaryCtaUrl || 'volunteer'}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#006A4E] hover:bg-[#008562] active:bg-[#004D38] text-white font-extrabold text-xs sm:text-sm shadow-warm-md transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>{tText(volBanner?.primaryButtonText || volBanner?.primaryCtaText) || (isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to={volBanner?.secondaryButtonUrl || volBanner?.secondaryCtaUrl || 'about/executive-committee'}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4 text-emerald-300" />
                    <span>{tText(volBanner?.secondaryButtonText || volBanner?.secondaryCtaText) || (isBn ? 'আমাদের নেতৃত্ব দেখুন' : 'Meet Our Team')}</span>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </section>
        );
      }

      case 'press': {
        const featuredPress = pressCoverages.filter(p => p.status === 'published').slice(0, 3);
        if (featuredPress.length === 0) return null;
        return (
          <section key="press" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <SectionHeading
                badge={isBn ? 'গণমাধ্যমে আমরা' : 'In The News'}
                title={isBn ? 'জাতীয় গণমাধ্যমে প্রকাশিত প্রতিবেদন' : 'Featured Press & Media Coverage'}
                subtitle={isBn ? 'ইনফিনিটি বাংলাদেশের মানবিক ত্রাণ বিতরণ ও কার্যক্রম নিয়ে প্রকাশিত খবরের একাংশ।' : 'Independent news articles and TV features covering Team Infinity humanitarian drives.'}
              />

              <Link
                to="media-coverage"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border border-[#EAE3D9] hover:border-[#006A4E] text-[#006A4E] text-xs font-bold shadow-warm-xs hover:shadow-warm-sm transition-all cursor-pointer group shrink-0"
              >
                <span>{isBn ? 'সকল সংবাদ দেখুন' : 'View All Press Coverage'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <StaggerGroup className="flex flex-wrap justify-center gap-6">
              {featuredPress.map((item) => (
                <StaggerItem
                  key={item.id}
                  className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm bg-white rounded-3xl border border-[#EAE3D9] p-5 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-extrabold text-[#006A4E] uppercase tracking-wider text-[11px]">
                        {item.outletName}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.publishedDate}</span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 line-clamp-2 group-hover:text-[#006A4E] transition-colors leading-snug">
                      {isBn ? item.title.bn : item.title.en}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {isBn ? item.excerpt.bn : item.excerpt.en}
                    </p>
                  </div>

                  <a
                    href={item.articleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] hover:text-[#00523C] pt-2 border-t border-slate-100"
                  >
                    <span>{isBn ? 'প্রতিবেদন পড়ুন' : 'Read Article'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </section>
        );
      }

      case 'transparency':
        return (
          <ScrollReveal effect="fade-up" key="transparency" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <VerifiedOrganizationPledge />
          </ScrollReveal>
        );

      case 'support': {
        const supBanner = homepageConfig.supportBanner;
        return (
          <ScrollReveal effect="fade-up" key="support" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-[2.5rem] border border-[#EAE3D9] p-8 sm:p-12 text-center space-y-6 shadow-warm-md">
              <div className="w-14 h-14 rounded-3xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center mx-auto shadow-warm-xs">
                <HandHeart className="w-7 h-7" />
              </div>

              <div className="max-w-2xl mx-auto space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {tText(supBanner?.title) || (isBn ? 'সহযোগিতার হাত বাড়িয়ে দিন' : 'Stand With Infinity Bangladesh')}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {tText(supBanner?.subtitle) || (isBn
                    ? 'আপনার আর্থিক সহযোগিতা সরাসরি সুবিধাবঞ্চিত শিশুদের নতুন পোশাক, রমজানের খাদ্য এবং শীতের কম্বল হিসেবে রূপান্তরিত হয়।'
                    : 'Your contributions directly fund verified clothes, nourishment, and winter protection for those who need it most.')}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <Link
                  to={supBanner?.primaryButtonUrl || supBanner?.primaryCtaUrl || 'donate'}
                  className="px-8 py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs sm:text-sm shadow-warm-md transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>{tText(supBanner?.primaryButtonText || supBanner?.primaryCtaText) || (isBn ? 'অনলাইন অনুদান প্রদান' : 'Donate to Infinity Bangladesh')}</span>
                </Link>

                <Link
                  to={supBanner?.secondaryButtonUrl || supBanner?.secondaryCtaUrl || 'transparency'}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-800 font-bold text-xs sm:text-sm border border-[#EAE3D9] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                  <span>{tText(supBanner?.secondaryButtonText || supBanner?.secondaryCtaText) || (isBn ? 'স্বচ্ছতা ও অডিট রিপোর্ট' : 'Audit & Expense Logs')}</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        );
      }

      default:
        return null;
    }
  };

  const defaultSectionOrder = [
    'hero',
    'impact',
    'about',
    'programs',
    'campaigns',
    'stories',
    'lifeline',
    'gallery',
    'press',
    'volunteer',
    'transparency',
    'support'
  ];

  const orderedSections = homepageConfig.sectionOrder && homepageConfig.sectionOrder.length > 0
    ? homepageConfig.sectionOrder.includes('lifeline') || homepageConfig.sectionOrder.includes('blood_donation')
      ? homepageConfig.sectionOrder
      : [...homepageConfig.sectionOrder.slice(0, 6), 'lifeline', ...homepageConfig.sectionOrder.slice(6)]
    : defaultSectionOrder;

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-28 pb-20 overflow-hidden">
      {orderedSections.map(sectionKey => renderSection(sectionKey))}
    </div>
  );
};
