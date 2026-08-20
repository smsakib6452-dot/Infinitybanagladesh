import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge, VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import {
  Heart,
  Users,
  Target,
  Eye,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface AboutPageProps {
  initialTab?: 'overview' | 'mission-vision' | 'team';
}

export const AboutPage: React.FC<AboutPageProps> = ({ initialTab = 'overview' }) => {
  const { isBn, tText } = useLanguage();
  const { navigate, currentPage } = useRouter();

  const [activeTab, setActiveTab] = useState<'overview' | 'mission-vision' | 'team'>(() => {
    if (currentPage === 'about/mission-vision') return 'mission-vision';
    if (currentPage === 'about/team') return 'team';
    return initialTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
          {isBn ? 'আমাদের পরিচিতি ও অঙ্গীকার' : 'About Infinity Bangladesh'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ' : 'Team Infinity — United for Humanity'}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {isBn
            ? 'দেশের সম্ভাবনাময় যুবসমাজকে একত্রিত করে সুবিধাবঞ্চিত ও পিছিয়ে পড়া জনগোষ্ঠীর পাশে দাঁড়াতে আমাদের নিরন্তর প্রচেষ্টা।'
            : 'Uniting passionate youth to serve underprivileged children and vulnerable communities with empathy, dignity, and measurable transparency.'}
        </p>

        {/* Sub Navigation Tabs */}
        <div className="pt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'সংক্ষিপ্ত পরিচয় ও গল্প' : 'Overview & Story'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('mission-vision')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'mission-vision'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'লক্ষ্য ও মূল্যবোধ' : 'Mission & Values'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('team')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-teal-800 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'টিম ইনফিনিটি পরিবার' : 'Team Infinity Network'}
          </button>
          <button
            type="button"
            onClick={() => navigate('about/executive-committee')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>{isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('about/standing-committees')}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all cursor-pointer"
          >
            {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
          </button>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & STORY */}
      {activeTab === 'overview' && (
        <div className="space-y-12 animate-in fade-in">
          {/* Main Story & Purpose */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
                {isBn ? 'আমাদের সূচনার কথা' : 'Our Story & Purpose'}
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {isBn
                  ? 'ইনফিনিটি বাংলাদেশ কোনো বাণিজ্যিক প্রতিষ্ঠান বা কৃত্রিম এনজিও নয়। এটি এমন কিছু সহৃদয় তরুণ-তরুণীর সম্মিলিত প্রচেষ্টা, যারা সমাজের অবহেলিত মানুষের বেদনাকে হৃদয়ে অনুভব করে নিজেদের জায়গা থেকে এগিয়ে এসেছেন।'
                  : 'Infinity Bangladesh was born from a simple yet powerful belief: real change happens when compassionate individuals decide not to look away. Driven entirely by volunteers, Team Infinity unites youth across Bangladesh to address grassroots vulnerabilities.'}
              </p>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {isBn
                  ? 'পথশিশুদের ঈদের নতুন জামা দেওয়া থেকে শুরু করে তীব্র শীতে কম্বল বিতরণ এবং আকস্মিক বন্যায় দুর্গতদের কাছে খাবার পৌঁছে দেওয়া — প্রতিটি পদক্ষেপে আমাদের একমাত্র উদ্দেশ্য থাকে মানুষের মুখে হাসি ফোটানো এবং তাদের মানবিক মর্যাদা অটুট রাখা।'
                  : 'From providing brand-new festive clothing to street children during Eid, to midnight blanket drives during cold waves, our initiatives are shaped by genuine empathy, respect, and zero waste.'}
              </p>

              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-700" />
                  {isBn ? 'অফিসিয়াল সাংগঠনিক তথ্য নীতিমালা' : 'Official Fact Verification Notice'}
                </div>
                <p className="text-xs text-teal-800 leading-relaxed">
                  {isBn
                    ? 'সংগঠনের যাবতীয় প্রাতিষ্ঠানিক সনদ, সরকারি নিবন্ধন নম্বর ও ব্যাংক হিসাবসমূহ ট্রাস্টি বোর্ড কর্তৃক যাচাইয়ের সাপেক্ষে উন্মুক্ত রাখা হয়। কোনো ভুয়া তথ্য বা অসত্য সংখ্যা প্রচার করা হয় না।'
                    : 'All organizational certifications, registration documents, and official bank accounts are maintained strictly according to factual verified status without fabricated figures.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 aspect-4/3 bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=80"
                  alt="Team Infinity Field Service"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Pillars of Action */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'মানবিক মর্যাদা রক্ষা' : 'Human Dignity First'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'সহায়তা প্রদান কোনো অনুগ্রহ নয়, বরং মানুষের অধিকার। তাই ছবি তোলার নামে উপকারভোগীকে অমর্যাদা করা আমাদের নীতিবিরুদ্ধ।'
                  : 'Aid is a human right, not a favor. We strictly protect beneficiary privacy and avoid humiliating public photography.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'শতভাগ স্বচ্ছতা' : 'Radical Transparency'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'সংগৃহীত প্রতিটি অর্থের সদ্ব্যবহার নিশ্চিত করে বিস্তারিত হিসাব ও বিতরণ রিপোর্ট জনসমক্ষে প্রকাশ করা হয়।'
                  : 'Every single donation is documented and verified through regular audit reports and public expense records.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'স্বেচ্ছাসেবী তারুণ্য' : 'Youth Leadership'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isBn
                  ? 'দেশের সচেতন তরুণ প্রজন্মকে ইতিবাচক সামাজিক কর্মকাণ্ডে সম্পৃক্ত করে দক্ষ ও দায়িত্বশীল নাগরিক হিসেবে গড়ে তোলা।'
                  : 'Empowering students and young professionals to lead humanitarian drives with high ethical standards.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MISSION, VISION & VALUES */}
      {activeTab === 'mission-vision' && (
        <div className="space-y-12 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-lg border border-teal-800">
              <div className="w-14 h-14 rounded-2xl bg-teal-800 text-teal-200 flex items-center justify-center">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
                {isBn ? 'আমাদের লক্ষ্য (Mission)' : 'Our Mission'}
              </h2>
              <p className="text-teal-100/90 text-sm sm:text-base leading-relaxed">
                {isBn
                  ? 'সুবিধাবঞ্চিত শিশু ও দারিদ্র্যপীড়িত জনগোষ্ঠীর সামাজিক সুরক্ষা, শিক্ষা সহায়তা, দুর্যোগকালীন পুনর্বাসন এবং মৌসুমি খাদ্য ও বস্ত্র সহায়তা পৌঁছে দেওয়া — সম্পূর্ণ নিরপেক্ষতা, স্বচ্ছতা এবং পরম আন্তরিকতার সাথে।'
                  : 'To stand with underprivileged children and distressed families through seasonal welfare drives, educational supplies, winter relief, and disaster aid, driven by youth volunteers with total transparency and dignity.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-lg border border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-slate-800 text-teal-300 flex items-center justify-center">
                <Eye className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white font-display">
                {isBn ? 'আমাদের রূপকল্প (Vision)' : 'Our Vision'}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {isBn
                  ? 'একটি মানবিক, সহানুভূতিশীল ও বৈষম্যহীন বাংলাদেশ গড়ে তোলা — যেখানে প্রতিটি শিশুর মুখে হাসি থাকবে, প্রতিটি মানুষ সম্মানের সাথে বাঁচবে এবং যুবসমাজ ইতিবাচক সমাজ গঠনে নেতৃত্ব দেবে।'
                  : 'To inspire a compassionate, resilient Bangladesh where every child has access to basic care and education, every vulnerable citizen is treated with dignity, and youth actively shape a better society.'}
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 text-center">
              {isBn ? 'আমাদের মূল মূল্যবোধসমূহ' : 'Our Core Values'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">01. Humanity</span>
                <h4 className="text-lg font-bold text-slate-900">{isBn ? 'মানবতা' : 'Humanity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'মানুষের কষ্ট লাঘব করাই আমাদের সর্বপ্রধান উদ্দেশ্য।' : 'Alleviating human suffering with genuine empathy.'}</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">02. Integrity</span>
                <h4 className="text-lg font-bold text-slate-900">{isBn ? 'সততা ও স্বচ্ছতা' : 'Integrity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'অর্থ ও তথ্যের সঠিক হিসাব সংরক্ষণ এবং জবাবদিহিতা।' : 'Uncompromising honesty in fund stewardship.'}</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">03. Dignity</span>
                <h4 className="text-lg font-bold text-slate-900">{isBn ? 'মর্যাদাবোধ' : 'Dignity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'উপকারভোগীর আত্মসম্মানকে সর্বোচ্চ মূল্যায়ন করা।' : 'Upholding self-respect in every interaction.'}</p>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-2">
                <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">04. Unity</span>
                <h4 className="text-lg font-bold text-slate-900">{isBn ? 'একতা ও ভ্রাতৃত্ব' : 'Unity'}</h4>
                <p className="text-xs text-slate-600">{isBn ? 'টিম ইনফিনিটি একতাবদ্ধ পরিবারের মতো কাজ করে।' : 'Standing as one dedicated family for humanity.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: TEAM & VOLUNTEERS */}
      {activeTab === 'team' && (
        <div className="space-y-10 animate-in fade-in">
          <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-lg font-bold text-slate-900">
                {isBn ? 'টিম ইনফিনিটি নেতৃত্ব ও পরিচালনা পরিষদ' : 'Team Infinity Leadership & Volunteer Structure'}
              </h3>
              <p className="text-xs text-slate-600">
                {isBn
                  ? 'প্রাতিষ্ঠানিক তথ্যের সত্যতা রক্ষার্থে নির্বাহী সদস্যদের তালিকা প্রাতিষ্ঠানিক অনুমোদনের পর হালনাগাদ করা হবে।'
                  : 'In strict compliance with factual reporting guidelines, verified leadership records will be updated upon official certification.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('volunteer')}
              className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
            >
              {isBn ? 'টিমে যুক্ত হোন' : 'Join as Volunteer'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <Users className="w-6 h-6 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">{isBn ? 'কেন্দ্রীয় পরিচালনা পরিষদ' : 'Central Governing Board'}</h4>
                <OfficialInfoBadge />
              </div>
              <p className="text-xs text-slate-600">
                {isBn ? 'নীতি নির্ধারণ, কৌশলগত পরিকল্পনা এবং সার্বিক তত্ত্বাবধান।' : 'Strategic planning, ethical oversight, and organizational policies.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">{isBn ? 'স্বচ্ছতা ও অডিট কমিটি' : 'Audit & Accountability Wing'}</h4>
                <OfficialInfoBadge />
              </div>
              <p className="text-xs text-slate-600">
                {isBn ? 'আর্থিক হিসাব নিরীক্ষা এবং ফান্ড ব্যবহারের নিরপেক্ষ পর্যবেক্ষণ।' : 'Fund auditing, receipt validation, and report publication.'}
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6 text-teal-700" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-slate-900">{isBn ? 'মাঠপর্যায়ের স্বেচ্ছাসেবক নেটওয়ার্ক' : 'Field Volunteer Network'}</h4>
                <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {isBn ? 'দেশব্যাপী সক্রিয়' : 'Nationwide Active'}
                </span>
              </div>
              <p className="text-xs text-slate-600">
                {isBn ? 'সরাসরি বস্তি, গ্রাম এবং দুর্যোগ কবলিত এলাকায় গিয়ে সহায়তা বিতরণ।' : 'Frontline youth delivering goods directly to beneficiaries.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Verified Org Pledge */}
      <VerifiedOrganizationPledge />
    </div>
  );
};
