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
import {
  Heart,
  Users,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  FileText
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { isBn, t, tText } = useLanguage();
  const { navigate } = useRouter();
  const { campaigns, programs, metrics, stories, news, events, gallery } = useData();

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const featuredCampaign = campaigns.find(c => c.isFeatured) || campaigns[0];
  const otherCampaigns = campaigns.filter(c => c.id !== featuredCampaign?.id).slice(0, 3);
  const featuredStory = stories[0];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
        {/* Background authentic humanitarian photography */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85"
            alt="Infinity Bangladesh Volunteer Drive"
            className="w-full h-full object-cover opacity-25 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-bold shadow-sm backdrop-blur-md animate-in fade-in">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span>{isBn ? 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' : 'Team Infinity — United for Humanity'}</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
              {isBn ? (
                <>
                  একসাথে, আমরা গড়ব <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-100">
                    এক সুন্দর মানবিক আগামী।
                  </span>
                </>
              ) : (
                <>
                  Together, We Can Create a <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-100">
                    Better Tomorrow.
                  </span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) একটি নিবেদিতপ্রাণ তারুণ্যনির্ভর সামাজিক উদ্যোগ। সুবিধাবঞ্চিত শিশু, শ্রমজীবী মানুষ এবং প্রান্তিক জনগোষ্ঠীর মুখে হাসি ফোটাতে ও মানবিক মর্যাদা রক্ষায় আমরা কাজ করে চলেছি।'
                : 'Infinity Bangladesh is a volunteer-led social organization driven by passionate youth. From festive Eid clothes for street children to emergency relief, we stand firmly for dignity, transparency, and human empathy.'}
            </p>

            {/* CTA Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => navigate('donate')}
                className="px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white text-base font-bold shadow-lg shadow-teal-900/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Heart className="w-5 h-5 fill-white" />
                <span>{isBn ? 'সহায়তা করুন' : 'Support Our Work'}</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('volunteer')}
                className="px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-100 text-base font-semibold border border-slate-700/80 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Users className="w-5 h-5 text-teal-400" />
                <span>{isBn ? 'স্বেচ্ছাসেবী হিসেবে যোগ দিন' : 'Become a Volunteer'}</span>
              </button>
            </div>

            {/* Trust Markers */}
            <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>{isBn ? 'শতভাগ স্বচ্ছতা ও দায়বদ্ধতা' : '100% Verified Accountability'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isBn ? 'সরাসরি মাঠপর্যায়ে বিতরণ' : 'Direct Ground-level Delivery'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span>{isBn ? 'তারুণ্যনির্ভর নিঃস্বার্থ উদ্যোগ' : 'Youth Volunteer Network'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'আমাদের মাঠপর্যায়ের বিস্তৃতি' : 'Verified Groundwork'}
          title={isBn ? 'পরিসংখ্যান ও প্রভাব' : 'Our Measured Impact Across Communities'}
          subtitle={isBn ? 'সকল সংখ্যা ও তথ্য সততা ও নিরপেক্ষতার সাথে যাচাইকৃত।' : 'Ground-level metrics verified by Team Infinity field audits.'}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map(m => (
            <ImpactCounter key={m.id} metric={m} />
          ))}
        </div>
      </section>

      {/* 3. WHO WE ARE & IDENTITY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-500/30 text-teal-300 text-xs font-bold uppercase">
                {isBn ? 'আমাদের মূল দর্শন' : 'Who We Are'}
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight font-display">
                {isBn ? (
                  <>
                    মানুষের পাশে দাঁড়ানোই আমাদের লক্ষ্য — <br />
                    <span className="text-teal-300">টিম ইনফিনিটি</span>
                  </>
                ) : (
                  <>
                    Standing Shoulder-to-Shoulder for Human Dignity —{' '}
                    <span className="text-teal-300">Team Infinity</span>
                  </>
                )}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isBn
                  ? 'ইনফিনিটি বাংলাদেশ কোনো গতানুগতিক আনুষ্ঠানিক দাতা সংস্থা নয়। এটি দেশের সচেতন ও উদ্যমী তরুণদের একটি মানবিক পরিবার, যারা নিজেদের সময়, শ্রম ও ভালোবাসাকে একত্রিত করে সমাজ পরিবর্তনের প্রত্যয়ে কাজ করে।'
                  : 'Infinity Bangladesh is not a commercial organization. It is an authentic youth-led volunteer initiative uniting caring individuals across Bangladesh to serve people with absolute dignity, accountability, and hope.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 pt-2">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <strong className="text-white block text-sm">
                    {isBn ? 'মর্যাদাপূর্ণ মানবিক সেবা' : 'Dignity First Principle'}
                  </strong>
                  <p className="text-slate-400">
                    {isBn
                      ? 'উপকারভোগীদের আত্মসম্মান অক্ষুণ্ণ রেখে আমরা উপহার পৌঁছে দেই।'
                      : 'We respect every beneficiary, ensuring aid is delivered without humiliating displays.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                  <strong className="text-white block text-sm">
                    {isBn ? 'স্বচ্ছ তহবিল ব্যবহার' : '100% Fund Integrity'}
                  </strong>
                  <p className="text-slate-400">
                    {isBn
                      ? 'প্রতিটি টাকার হিসাব সংরক্ষণ ও নিরীক্ষা রিপোর্ট উন্মুক্ত।'
                      : 'Every single Taka collected is directly utilized for field relief and recorded in public audits.'}
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => navigate('about')}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{isBn ? 'আমাদের সম্পর্কে বিস্তারিত জানুন' : 'Learn More About Us'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800/80">
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Team Infinity Community Service"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-teal-800 text-white p-4 rounded-xl shadow-lg text-xs font-semibold max-w-[220px]">
                {isBn ? 'নিঃস্বার্থ তারুণ্য, মানবতার বিজয়' : 'Youth with Purpose. Community with Empathy.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PROGRAMS (WHAT WE DO) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'আমাদের মূল ক্ষেত্রসমূহ' : 'Our Focus Areas'}
          title={isBn ? 'আমরা যে বিষয়ে কাজ করি' : 'What We Do'}
          subtitle={isBn ? 'সুবিধাবঞ্চিত মানুষের প্রয়োজন বিবেচনায় পরিকল্পিত মানবিক কর্মসূচি।' : 'Structured humanitarian pillars designed for lasting community impact.'}
          action={
            <button
              type="button"
              onClick={() => navigate('programs')}
              className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
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

      {/* 5. FEATURED CAMPAIGN SPOTLIGHT */}
      {featuredCampaign && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'বিশেষ কর্মসূচি' : 'Featured Campaign Spotlight'}
            title={isBn ? 'সুবিধাবঞ্চিতদের সাথে ঈদ আনন্দ' : 'Eid Joy for Underprivileged'}
            subtitle={isBn ? 'উৎসবের আনন্দ ছড়িয়ে দিতে আমাদের অন্যতম প্রধান মৌসুমী উদ্যোগ।' : 'Bringing festive joy, brand new clothes, and special food hampers directly to street children.'}
          />

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[420px] bg-slate-100">
              <img
                src={featuredCampaign.imageUrl}
                alt={tText(featuredCampaign.title)}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-teal-800 text-white text-xs font-bold px-3 py-1 rounded-full">
                {isBn ? 'চলমান বিশেষ ক্যাম্পেইন' : 'Active Seasonal Initiative'}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-teal-700" />
                    {featuredCampaign.date}
                  </span>
                  <span>&bull;</span>
                  <span>{tText(featuredCampaign.location)}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                  {tText(featuredCampaign.title)}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {tText(featuredCampaign.description)}
                </p>

                {/* Objectives list */}
                <div className="space-y-2 pt-2">
                  <strong className="text-xs uppercase font-bold tracking-wider text-slate-900 block">
                    {isBn ? 'ক্যাম্পেইনের মূল লক্ষ্যসমূহ:' : 'Key Campaign Objectives:'}
                  </strong>
                  {(isBn ? featuredCampaign.objectives.bn : featuredCampaign.objectives.en).map((obj, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      <span>{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate('campaigns/detail', featuredCampaign.slug)}
                  className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-sm font-bold shadow-xs inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>{isBn ? 'সম্পূর্ণ বিবরণ দেখুন' : 'View Full Details'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigate('donate')}
                  className="px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-sm font-bold border border-rose-200 inline-flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                  <span>{isBn ? 'এই ক্যাম্পেইনে সহায়তা দিন' : 'Support This Campaign'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. IMPACT STORY HIGHLIGHT */}
      {featuredStory && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'বাস্তব প্রভাব ও মানবিক গল্প' : 'Humanity in Action'}
            title={isBn ? 'একটি অমলিন হাসির গল্প' : 'Real Stories of Dignity & Hope'}
            subtitle={isBn ? 'সম্মতি ও গোপনীয়তা বজায় রেখে সংরক্ষিত বাস্তব মানবিক অভিজ্ঞতা।' : 'Documenting transformational journeys across communities.'}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {stories.slice(0, 2).map(story => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </section>
      )}

      {/* 7. OTHER CAMPAIGNS GRID */}
      {otherCampaigns.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'সাম্প্রতিক ও অন্যান্য উদ্যোগ' : 'Other Initiatives'}
            title={isBn ? 'চলমান ও সম্পন্ন ক্যাম্পেইনসমূহ' : 'Recent & Upcoming Field Campaigns'}
            subtitle={isBn ? 'দেশের বিভিন্ন প্রান্তে পরিচালিত টিম ইনফিনিটির ফিল্ড কার্যক্রম।' : 'Volunteer missions serving humanity throughout the year.'}
            action={
              <button
                type="button"
                onClick={() => navigate('campaigns')}
                className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
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

      {/* 8. MEET TEAM INFINITY — LEADERSHIP SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'নেতৃত্ব ও পরিচালনা পরিষদ' : 'Leadership & Governance'}
          title={isBn ? 'টিম ইনফিনিটি কার্যনির্বাহী নেতৃত্ব' : 'Meet Team Infinity'}
          subtitle={
            isBn
              ? 'মানবিক মূল্যবোধ, স্বচ্ছতা ও সততার সাথে সেবা কার্য পরিচালনায় নিবেদিত নির্বাচিত নেতৃত্ব।'
              : 'Passionate youth changemakers driving our field operations and institutional mission across Bangladesh.'
          }
          action={
            <button
              type="button"
              onClick={() => navigate('about/executive-committee')}
              className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{isBn ? 'পূর্ণাঙ্গ কার্যনির্বাহী কমিটি (২০২৬) দেখুন' : 'View Full Executive Committee 2026'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
          alignment="left"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* President */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-gradient-to-b from-emerald-950 to-teal-900 text-white rounded-3xl p-5 text-center shadow-lg border-2 border-emerald-500/40 hover:border-emerald-400 transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-emerald-500/30 text-emerald-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/40">
              #01
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-emerald-900/60 border border-emerald-400/50 mb-3 flex items-center justify-center">
              <Users className="w-10 h-10 text-emerald-300/70" />
            </div>
            <h4 className="text-sm font-extrabold text-white group-hover:text-emerald-200 transition-colors">
              {isBn ? 'মোঃ শাহিদুল আলম সাকিব' : 'MD. SHAHIDUL ALAM SAKIB'}
            </h4>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 font-bold text-[11px]">
              {isBn ? 'সভাপতি' : 'President'}
            </div>
          </div>

          {/* Senior VP */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-slate-900 text-white rounded-3xl p-5 text-center shadow-md border border-slate-800 hover:border-teal-500 transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-800 text-teal-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #02
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-slate-800 border border-slate-700 mb-3 flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
              {isBn ? 'মোহাম্মদ ইসমাইল' : 'MOHAMMAD ISMAIL'}
            </h4>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px]">
              {isBn ? 'সিনিয়র সহ-সভাপতি' : 'Senior Vice President'}
            </div>
          </div>

          {/* Vice President 1 */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-slate-900 text-white rounded-3xl p-5 text-center shadow-md border border-slate-800 hover:border-teal-500 transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-800 text-teal-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #03
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-slate-800 border border-slate-700 mb-3 flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
              {isBn ? 'জয়নুল আবেদীন' : 'JOINUL ABEDIN'}
            </h4>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px]">
              {isBn ? 'সহ-সভাপতি' : 'Vice President'}
            </div>
          </div>

          {/* Vice President 2 */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-slate-900 text-white rounded-3xl p-5 text-center shadow-md border border-slate-800 hover:border-teal-500 transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-slate-800 text-teal-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full">
              #04
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-slate-800 border border-slate-700 mb-3 flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-500" />
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
              {isBn ? 'সোহেল আকরাম সবুজ' : 'SOHEL AKRAM SOBUJ'}
            </h4>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-[11px]">
              {isBn ? 'সহ-সভাপতি' : 'Vice President'}
            </div>
          </div>

          {/* General Secretary */}
          <div
            onClick={() => navigate('about/executive-committee')}
            className="cursor-pointer group bg-gradient-to-b from-rose-950 to-slate-900 text-white rounded-3xl p-5 text-center shadow-lg border-2 border-rose-500/40 hover:border-rose-400 transition-all transform hover:-translate-y-1 relative"
          >
            <div className="absolute top-3 right-3 bg-rose-500/30 text-rose-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-rose-400/40">
              #05
            </div>
            <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-rose-900/60 border border-rose-400/50 mb-3 flex items-center justify-center">
              <Users className="w-10 h-10 text-rose-300/70" />
            </div>
            <h4 className="text-sm font-extrabold text-white group-hover:text-rose-200 transition-colors">
              {isBn ? 'সলিমুর রহমান অপি' : 'SALIMUR RAHMAN OPI'}
            </h4>
            <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-rose-800 text-rose-200 font-bold text-[11px]">
              {isBn ? 'সাধারণ সম্পাদক' : 'General Secretary'}
            </div>
          </div>
        </div>
      </section>

      {/* 9. PHOTO GALLERY TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={isBn ? 'মাঠপর্যায়ের আলোকচিত্র' : 'Field Photography'}
          title={isBn ? 'কর্মে ও সেবায় আমাদের পদচিহ্ন' : 'Moments of Humanity in the Field'}
          subtitle={isBn ? 'সম্মতি ও মানবিক মর্যাদা বজায় রেখে সংগৃহীত মুহূর্ত।' : 'Authentic volunteer efforts captured across distribution hubs.'}
          action={
            <button
              type="button"
              onClick={() => navigate('gallery')}
              className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
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
              className="group relative aspect-square rounded-xl overflow-hidden bg-slate-100 cursor-pointer shadow-xs hover:shadow-md"
            >
              <img
                src={item.imageUrl}
                alt={tText(item.title)}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-teal-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ImageIcon className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. VOLUNTEER & DONATION CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volunteer Banner */}
          <div className="bg-gradient-to-br from-teal-800 to-emerald-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-lg">
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-teal-200">
                {isBn ? 'স্বেচ্ছাসেবী আহ্বান' : 'Join the Movement'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isBn ? 'টিম ইনফিনিটির সাথে যুক্ত হোন' : 'Be Part of Team Infinity'}
              </h3>
              <p className="text-sm text-teal-100/90 leading-relaxed">
                {isBn
                  ? 'মানবতার জন্য একতাবদ্ধ হওয়া শুরু হয় সচেতন ও সহানুভূতিশীল মানুষের অংশগ্রহণের মাধ্যমে। আপনিও হতে পারেন একজন অগ্রণী সেবক।'
                  : 'United for Humanity starts with people who care. Join our nationwide network of youth changemakers across Bangladesh.'}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate('volunteer')}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-teal-900 font-bold text-sm inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <span>{isBn ? 'আবেদন ফরম পূরণ করুন' : 'Apply to Volunteer'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Direct Support Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between space-y-6 shadow-lg border border-slate-800">
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold tracking-widest text-rose-400">
                {isBn ? 'সহায়তার হাত' : 'Direct Support'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {isBn ? 'সুবিধাবঞ্চিতদের পাশে দাঁড়ান' : 'Empower Communities in Need'}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {isBn
                  ? 'আপনার সামান্য সহযোগিতাও একজন পথশিশুর মুখে হাসি ফোটাতে কিংবা একটি পরিবারের জন্য রমজানের খাদ্য জোগাতে পারে।'
                  : 'Your honest support enables verified field initiatives, providing clothes, meals, and education support directly to those who need it most.'}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={() => navigate('donate')}
                className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>{isBn ? 'অনুদানের তথ্য দেখুন' : 'Support Our Programs'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TRANSPARENCY PLEDGE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <VerifiedOrganizationPledge />
      </section>

      {/* 11. LATEST NEWS & ANNOUNCEMENTS */}
      {news.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'সংবাদ ও আপডেট' : 'Latest News'}
            title={isBn ? 'কার্যক্রমের সর্বশেষ খবর' : 'News & Announcements'}
            subtitle={isBn ? 'ইনফিনিটি বাংলাদেশ-এর সাম্প্রতিক সংবাদ ও প্রেস রিলিজ।' : 'Official announcements and updates from Team Infinity.'}
            action={
              <button
                type="button"
                onClick={() => navigate('news')}
                className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>{isBn ? 'সকল সংবাদ' : 'All News Articles'}</span>
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

      {/* 12. UPCOMING EVENTS */}
      {events.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge={isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming Gatherings'}
            title={isBn ? 'স্বেচ্ছাসেবী ও সামাজিক ইভেন্টসমূহ' : 'Events & Volunteer Meets'}
            subtitle={isBn ? 'টিম ইনফিনিটির আসন্ন কর্মশালা ও কর্মসূচি।' : 'Join interactive sessions and field orientation programs.'}
          />

          <div className="space-y-6">
            {events.slice(0, 2).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox component */}
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
