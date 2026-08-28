import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge, VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import { JourneyVideoArchive } from '../components/JourneyVideoArchive';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { StaggerGroup, StaggerItem } from '../components/motion/StaggerGroup';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  Heart,
  Users,
  Target,
  Eye,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Calendar
} from 'lucide-react';

interface AboutPageProps {
  initialTab?: 'overview' | 'mission-vision' | 'team';
}

export const AboutPage: React.FC<AboutPageProps> = ({ initialTab = 'overview' }) => {
  const { isBn, tText } = useLanguage();
  const { navigate, currentPage } = useRouter();
  const { aboutSettings, settings } = useData();

  const orgName = settings.organizationName || (isBn ? 'ইনফিনিটি বাংলাদেশ' : 'Infinity Bangladesh');
  const teamId = settings.teamIdentity || 'Team Infinity';
  const sloganText = isBn
    ? (settings.primary_slogan?.bn || settings.slogan?.bn || 'মানবতার জন্য একতাবদ্ধ')
    : (settings.primary_slogan?.en || settings.slogan?.en || settings.tagline || 'United for Humanity');
  const estYear = aboutSettings.establishedYear || settings.establishedYear || '2015';
  const headLocation = aboutSettings.location || settings.officialAddress || 'Hathazari, Chattogram, Bangladesh';

  const [activeTab, setActiveTab] = useState<'overview' | 'mission-vision' | 'team'>(() => {
    if (currentPage === 'about/mission-vision') return 'mission-vision';
    return initialTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Header Banner */}
      <ScrollReveal effect="fade-up" className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>{tText(aboutSettings.title) || (isBn ? 'আমাদের পরিচিতি ও ইতিহাস' : 'About Infinity Bangladesh')}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {teamId} — {sloganText}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          {tText(aboutSettings.subtitle) || (isBn
            ? `${estYear} সালে চট্টগ্রামের হাটহাজারী থেকে একদল স্বপ্নবান তরুণের হাত ধরে যাত্রা শুরু। দেশের সচেতন যুবসমাজকে একত্রিত করে সুবিধাবঞ্চিত ও প্রান্তিক জনগোষ্ঠীর মুখে হাসি ফোটাতে আমাদের নিরন্তর প্রচেষ্টা।`
            : `Founded in ${headLocation} in ${estYear}. Uniting passionate youth changemakers across Bangladesh to serve underprivileged children and distressed communities with empathy, dignity, and radical transparency.`)}
        </p>

        {/* Sub Navigation Tabs */}
        <div className="pt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-[#006A4E] text-white shadow-warm-sm'
                : 'bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9]'
            }`}
          >
            {isBn ? 'সংক্ষিপ্ত পরিচয় ও গল্প' : 'Overview & Story'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mission-vision')}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'mission-vision'
                ? 'bg-[#006A4E] text-white shadow-warm-sm'
                : 'bg-white hover:bg-[#FAF7F2] text-slate-700 border border-[#EAE3D9]'
            }`}
          >
            {isBn ? 'লক্ষ্য ও মূল্যবোধ' : 'Mission & Values'}
          </button>
        </div>
      </ScrollReveal>

      {/* TAB 1: OVERVIEW & STORY */}
      {activeTab === 'overview' && (
        <div className="space-y-12">
          {/* Main Story & Purpose */}
          <ScrollReveal effect="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-extrabold border border-amber-200">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isBn ? `প্রতিষ্ঠা: ${estYear} সাল` : `Established in ${estYear}`}</span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                  {isBn ? 'আমাদের সূচনার কথা' : 'Our Story & Purpose'}
                </h2>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                  {tText(aboutSettings.history) || (isBn
                    ? `${orgName} কোনো বাণিজ্যিক প্রতিষ্ঠান বা কৃত্রিম এনজিও নয়। এটি চট্টগ্রামের হাটহাজারী থেকে যাত্রা শুরু করা এমন কিছু সহৃদয় তরুণ-তরুণীর সম্মিলিত প্রয়াস, যারা সমাজের অবহেলিত মানুষের বেদনাকে হৃদয়ে অনুভব করে নিজেদের জায়গা থেকে এগিয়ে এসেছেন।`
                    : `${orgName} was born from a simple yet powerful belief in ${headLocation}: real change happens when compassionate youth decide not to look away. Driven entirely by volunteers, ${teamId} unites changemakers across Bangladesh to address grassroots vulnerabilities.`)}
                </p>
                <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                  {isBn
                    ? 'পথশিশুদের ঈদের নতুন জামা দেওয়া থেকে শুরু করে তীব্র শীতে কম্বল বিতরণ এবং আকস্মিক বন্যায় দুর্গতদের কাছে খাবার পৌঁছে দেওয়া — প্রতিটি পদক্ষেপে আমাদের একমাত্র উদ্দেশ্য থাকে মানুষের মুখে হাসি ফোটানো এবং তাদের মানবিক মর্যাদা অটুট রাখা।'
                    : 'From providing brand-new festive clothing to street children during Eid, to midnight blanket drives during cold waves, our initiatives are shaped by genuine empathy, respect, and zero waste.'}
                </p>

                <div className="p-4 bg-[#E6F3EF] rounded-2xl border border-[#C2E2D7] space-y-2">
                  <div className="flex items-center gap-2 text-[#00523C] font-bold text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                    {isBn ? 'অফিসিয়াল সাংগঠনিক তথ্য ও অবস্থান' : 'Official Governance & Location'}
                  </div>
                  <p className="text-xs text-emerald-900 leading-relaxed">
                    {isBn
                      ? `হেডকোয়ার্টার: ${headLocation}। সকল প্রাতিষ্ঠানিক সনদ, সরকারি নিরীক্ষা ও অনুদানের হিসাব স্বচ্ছতার সাথে সংরক্ষিত।`
                      : `Headquarters: ${headLocation}. Established in ${estYear}. Maintained strictly according to factual verified status without fabricated figures.`}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6">
                <JourneyVideoArchive headLocation={headLocation} estYear={estYear} />
              </div>
            </div>
          </ScrollReveal>

          {/* Pillars of Action */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <StaggerItem className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-warm-sm hover:shadow-warm-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {isBn ? 'মানবিক মর্যাদা রক্ষা' : 'Human Dignity First'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'সহায়তা প্রদান কোনো অনুগ্রহ নয়, বরং মানুষের অধিকার। তাই ছবি তোলার নামে উপকারভোগীকে অমর্যাদা করা আমাদের নীতিবিরুদ্ধ।'
                  : 'Aid is a human right, not a favor. We strictly protect beneficiary privacy and avoid humiliating public photography.'}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-warm-sm hover:shadow-warm-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {isBn ? 'শতভাগ প্রকাশ্য স্বচ্ছতা' : 'Radical Transparency'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'সংগৃহীত প্রতিটি অর্থের সদ্ব্যবহার নিশ্চিত করে বিস্তারিত হিসাব ও বিতরণ রিপোর্ট জনসমক্ষে প্রকাশ করা হয়।'
                  : 'Every single donation is documented and verified through regular audit reports and public expense records.'}
              </p>
            </StaggerItem>

            <StaggerItem className="p-6 sm:p-7 rounded-3xl bg-white border border-[#EAE3D9] space-y-3 shadow-warm-sm hover:shadow-warm-md transition-all hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {isBn ? 'স্বেচ্ছাসেবী তারুণ্য' : 'Youth Leadership'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'দেশের সচেতন তরুণ প্রজন্মকে ইতিবাচক সামাজিক কর্মকাণ্ডে সম্পৃক্ত করে দক্ষ ও দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।'
                  : 'Empowering students and young professionals to lead humanitarian drives with high ethical standards.'}
              </p>
            </StaggerItem>
          </StaggerGroup>
        </div>
      )}

      {/* TAB 2: MISSION, VISION & VALUES */}
      {activeTab === 'mission-vision' && (
        <div className="space-y-12">
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <StaggerItem className="bg-gradient-to-br from-[#006A4E] to-[#0A382A] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-warm-lg">
              <div className="w-14 h-14 rounded-2xl bg-white/10 text-emerald-200 flex items-center justify-center border border-white/20">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
                {isBn ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
                {tText(aboutSettings.mission) || (isBn
                  ? 'সুবিধাবঞ্চিত শিশু ও দারিদ্র্যপীড়িত জনগোষ্ঠীর সামাজিক সুরক্ষা, শিক্ষা সহায়তা, দুর্যোগকালীন পুনর্বাসন এবং মৌসুমি খাদ্য ও বস্ত্র সহায়তা পৌঁছে দেওয়া — সম্পূর্ণ নিরপেক্ষতা, স্বচ্ছতা এবং পরম আন্তরিকতার সাথে।'
                  : 'To stand with underprivileged children and distressed families through seasonal welfare drives, educational supplies, winter relief, and disaster aid, driven by youth volunteers with total transparency and dignity.')}
              </p>
            </StaggerItem>

            {/* Vision */}
            <StaggerItem className="bg-gradient-to-br from-[#11241E] to-[#0A1612] text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-warm-lg border border-emerald-900/60">
              <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 text-amber-400 flex items-center justify-center border border-emerald-800">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
                {isBn ? 'আমাদের রূপকল্প (Vision)' : 'Our Vision'}
              </h2>
              <p className="text-emerald-200/90 text-xs sm:text-sm leading-relaxed">
                {tText(aboutSettings.vision) || (isBn
                  ? 'একটি মানবিক, সহানুভূতিশীল ও বৈষম্যহীন বাংলাদেশ গড়ে তোলা — যেখানে প্রতিটি শিশুর মুখে হাসি থাকবে, প্রতিটি মানুষ সম্মানের সাথে বাঁচবে এবং যুবসমাজ ইতিবাচক সমাজ গঠনে নেতৃত্ব দেবে।'
                  : 'To inspire a compassionate, resilient Bangladesh where every child has access to basic care and education, every vulnerable citizen is treated with dignity, and youth actively shape a better society.')}
              </p>
            </StaggerItem>
          </StaggerGroup>

          {/* Core Values */}
          <ScrollReveal effect="fade-up" className="space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 text-center font-display">
              {isBn ? 'আমাদের মূল মূল্যবোধসমূহ' : 'Our Core Values'}
            </h3>

            <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem className="p-6 bg-white rounded-3xl border border-[#EAE3D9] space-y-2 shadow-warm-sm hover:-translate-y-1 transition-all">
                <span className="text-xs font-bold uppercase text-[#006A4E] tracking-wider">01. Humanity</span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{isBn ? 'মানবতা' : 'Humanity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'মানুষের কষ্ট লাঘব করাই আমাদের সর্বপ্রধান ব্রত।' : 'Alleviating human suffering with genuine empathy.'}</p>
              </StaggerItem>

              <StaggerItem className="p-6 bg-white rounded-3xl border border-[#EAE3D9] space-y-2 shadow-warm-sm hover:-translate-y-1 transition-all">
                <span className="text-xs font-bold uppercase text-[#006A4E] tracking-wider">02. Integrity</span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{isBn ? 'সততা ও স্বচ্ছতা' : 'Integrity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'অর্থ ও তথ্যের সঠিক হিসাব সংরক্ষণ এবং জবাবদিহিতা।' : 'Uncompromising honesty in fund stewardship.'}</p>
              </StaggerItem>

              <StaggerItem className="p-6 bg-white rounded-3xl border border-[#EAE3D9] space-y-2 shadow-warm-sm hover:-translate-y-1 transition-all">
                <span className="text-xs font-bold uppercase text-[#006A4E] tracking-wider">03. Dignity</span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{isBn ? 'মর্যাদাবোধ' : 'Dignity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'উপকারভোগীর আত্মসম্মানকে সর্বোচ্চ মূল্যায়ন করা।' : 'Upholding self-respect in every interaction.'}</p>
              </StaggerItem>

              <StaggerItem className="p-6 bg-white rounded-3xl border border-[#EAE3D9] space-y-2 shadow-warm-sm hover:-translate-y-1 transition-all">
                <span className="text-xs font-bold uppercase text-[#006A4E] tracking-wider">04. Unity</span>
                <h4 className="text-lg font-bold text-slate-900 font-display">{isBn ? 'একতা ও ভ্রাতৃত্ব' : 'Unity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'টিম ইনফিনিটি একতাবদ্ধ পরিবারের মতো কাজ করে।' : 'Standing as one dedicated family for humanity.'}</p>
              </StaggerItem>
            </StaggerGroup>
          </ScrollReveal>
        </div>
      )}

      {/* Verified Org Pledge */}
      <ScrollReveal effect="fade-up">
        <VerifiedOrganizationPledge />
      </ScrollReveal>
    </div>
  );
};
