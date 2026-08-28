import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link } from '../components/Link';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  Users,
  ShieldCheck,
  History,
  Award,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Heart,
  UserCheck,
  Clock,
  LayoutGrid
} from 'lucide-react';
import { ScrollReveal } from '../components/motion/ScrollReveal';
import { StaggerGroup, StaggerItem } from '../components/motion/StaggerGroup';

export const TeamOverviewPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { committees, getMembersWithDetails } = useData();

  // 1. Current Executive Committee
  const execCommittee =
    committees.find(c => c.type === 'EXECUTIVE' && c.status === 'ACTIVE') ||
    committees.find(c => c.id === 'comm-exec-2026') ||
    committees[0];

  const execMembers = execCommittee ? getMembersWithDetails(execCommittee.id) : [];

  // 2. Standing Committee (Single central committee)
  const standingCommittee =
    committees.find(c => c.type === 'STANDING' && c.status === 'ACTIVE') ||
    committees.find(c => c.id === 'comm-stand-central');

  const standingMembers = standingCommittee ? getMembersWithDetails(standingCommittee.id) : [];

  // 3. Past Committees Archive (Sorted descending by year)
  const pastCommittees = committees
    .filter(c => c.type === 'PAST' || c.status === 'ARCHIVED')
    .sort((a, b) => {
      const yearA = parseInt(a.year || '0', 10);
      const yearB = parseInt(b.year || '0', 10);
      return yearB - yearA;
    });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-800 pb-20 selection:bg-[#006A4E] selection:text-white">
      
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-gradient-to-b from-[#EAE3D9]/60 via-[#FAF7F2] to-[#FAF7F2] border-b border-[#EAE3D9]">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#006A4E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        
        {/* Subtle Decorative Blobs */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-[#006A4E]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <ScrollReveal effect="fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#EAE3D9] text-[#006A4E] text-xs font-extrabold uppercase tracking-wider shadow-warm-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#006A4E]" />
              <span>{isBn ? 'নেতৃত্ব ও পরিচালনা পরিষদ' : 'Leadership & Governance'}</span>
            </div>
          </ScrollReveal>

          <ScrollReveal effect="fade-up" delay={100}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 font-display tracking-tight leading-tight">
              {isBn ? 'আমাদের টিম ও নেতৃত্ব' : 'Meet Our Team'}
            </h1>
          </ScrollReveal>

          <ScrollReveal effect="fade-up" delay={150}>
            <p className="text-lg sm:text-2xl font-bold text-[#006A4E] font-display max-w-3xl mx-auto">
              {isBn ? 'মানবতার সেবায় একতাবদ্ধ' : 'Together, We Work for Humanity'}
            </p>
          </ScrollReveal>

          <ScrollReveal effect="fade-up" delay={200}>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ পরিচালিত হয় নির্বাচিত কার্যনির্বাহী পরিষদ, দূরদর্শী স্থায়ী কমিটি এবং দেশব্যাপী হাজারো উদ্যমী তরুণ ভলান্টিয়ারদের সমন্বয়ে।'
                : 'Infinity Bangladesh is led by an elected Executive Committee, guided by our permanent Standing Committee, and driven by dedicated youth volunteers nationwide.'}
            </p>
          </ScrollReveal>

          {/* Committee Sub-Navigation */}
          <ScrollReveal effect="fade-up" delay={250}>
            <div className="pt-4 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
              <Link
                to="team"
                className="px-4 py-2 rounded-2xl bg-[#006A4E] text-white text-xs sm:text-sm font-extrabold shadow-warm-sm cursor-pointer flex items-center gap-1.5"
              >
                <LayoutGrid className="w-4 h-4 text-white" />
                <span>{isBn ? 'টিম ওভারভিউ' : 'Team Overview'}</span>
              </Link>

              <Link
                to="team/executive-committee"
                className="px-4 py-2 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer"
              >
                {isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee 2026'}
              </Link>

              <Link
                to="team/standing-committee"
                className="px-4 py-2 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer"
              >
                {isBn ? 'স্থায়ী কমিটি' : 'Standing Committee'}
              </Link>

              <Link
                to="team/past-committees"
                className="px-4 py-2 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer"
              >
                {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-24">

        {/* ---------------------------------------------------- */}
        {/* 2. EXECUTIVE COMMITTEE SECTION */}
        {/* ---------------------------------------------------- */}
        <section id="executive-committee" className="scroll-mt-28 space-y-8">
          <ScrollReveal effect="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D9] pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#006A4E] uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>{isBn ? 'চলতি গভর্নিং বডি' : 'Current Governing Body'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                  {isBn
                    ? (execCommittee?.name?.bn || 'কার্যনির্বাহী পরিষদ ২০২৬')
                    : (execCommittee?.name?.en || 'Executive Committee 2026')}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
                  {isBn
                    ? (execCommittee?.description?.bn || 'মাঠপর্যায়ে মানবিক কার্যক্রম বাস্তবায়ন ও সার্বিক সমন্বয়ের দায়িত্বে নিয়োজিত কার্যনির্বাহী নেতৃত্ব।')
                    : (execCommittee?.description?.en || 'Elected executive leaders directing field operations, child welfare, and nationwide humanitarian initiatives.')}
                </p>
              </div>

              <Link
                to="team/executive-committee"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-extrabold shadow-warm-md transition-all shrink-0 cursor-pointer"
              >
                <span>{isBn ? 'সম্পূর্ণ পরিষদ তালিকা দেখুন (২৭ জন)' : 'View Full Executive Roster'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Top Featured Executive Leaders Grid */}
          <StaggerGroup className="flex flex-wrap justify-center gap-6">
            {execMembers.slice(0, 8).map((item, idx) => {
              const person = item.person;
              const position = item.position;
              return (
                <StaggerItem
                  key={item.id}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.15rem)] max-w-xs"
                >
                  <div
                    className="group bg-white rounded-3xl border border-[#EAE3D9] p-5 shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center space-y-4 h-full"
                  >
                    {/* Member Photo */}
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#006A4E]/20 shadow-inner">
                      {person?.photoUrl ? (
                        <img
                          src={getAssetUrl(person.photoUrl)}
                          alt={person.englishName || person.banglaName || 'Member Photo'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Users className="w-10 h-10" />
                        </div>
                      )}
                      <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-slate-950/70 text-white font-mono text-[10px] font-bold backdrop-blur-xs">
                        #{String(item.serialNumber || idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Identity */}
                    <div className="space-y-1 w-full">
                      <h3 className="text-base font-extrabold text-slate-900 font-display line-clamp-1">
                        {isBn
                          ? (person?.banglaName || person?.fullName || person?.englishName)
                          : (person?.englishName || person?.fullName || person?.banglaName)}
                      </h3>
                      <p className="text-xs font-bold text-[#006A4E] line-clamp-1">
                        {isBn
                          ? (position?.name?.bn || position?.name?.en)
                          : (position?.name?.en || position?.name?.bn)}
                      </p>
                    </div>

                    {/* Subtitle / Bio snippet */}
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic font-sans flex-1">
                      {isBn
                        ? (person?.shortBio?.bn || 'মানবিক সেবা ও সমাজকল্যাণ কার্যক্রমে নিবেদিত।')
                        : (person?.shortBio?.en || 'Dedicated to humanitarian service and community empowerment.')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>

          <div className="text-center pt-2">
            <Link
              to="team/executive-committee"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006A4E] hover:text-[#00523C] group cursor-pointer"
            >
              <span>{isBn ? 'কার্যনির্বাহী পরিষদের সকল ২৭ জন সদস্য ও পদবী দেখুন' : 'Explore all 27 Executive Committee Members & Portfolios'}</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 3. STANDING COMMITTEE SECTION */}
        {/* ---------------------------------------------------- */}
        <section id="standing-committee" className="scroll-mt-28 space-y-8">
          <ScrollReveal effect="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D9] pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#006A4E] uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isBn ? 'স্থায়ী উপদেষ্টা ও পরিচালনা পরিষদ' : 'Permanent Advisory & Governance'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                  {isBn ? 'স্থায়ী কমিটি' : 'Standing Committee'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
                  {isBn
                    ? (standingCommittee?.description?.bn || 'ইনফিনিটি বাংলাদেশ-এর নীতি নির্ধারণ, প্রাতিষ্ঠানিক তত্ত্বাবধান এবং ধারাবাহিকতা রক্ষাকারী অভিভাবক পরিষদ।')
                    : (standingCommittee?.description?.en || 'Central governing body providing strategic counsel, financial integrity oversight, and long-term organizational stewardship.')}
                </p>
              </div>

              <Link
                to="team/standing-committee"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-[#EAE3D9] text-slate-800 text-xs font-extrabold shadow-warm-xs transition-all shrink-0 cursor-pointer"
              >
                <span>{isBn ? 'স্থায়ী কমিটি প্রোফাইল দেখুন' : 'View Standing Committee'}</span>
                <ArrowRight className="w-4 h-4 text-[#006A4E]" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Standing Committee Members Grid */}
          <StaggerGroup className="flex flex-wrap justify-center gap-6">
            {standingMembers.slice(0, 6).map((item, idx) => {
              const person = item.person;
              const position = item.position;
              return (
                <StaggerItem
                  key={item.id}
                  className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm"
                >
                  <div
                    className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 h-full"
                  >
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 border-2 border-[#006A4E]/20 shrink-0">
                      {person?.photoUrl ? (
                        <img
                          src={getAssetUrl(person.photoUrl)}
                          alt={person.englishName || person.banglaName || 'Member'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                          <Users className="w-8 h-8" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F3EF] text-[#006A4E]">
                        {isBn
                          ? (position?.name?.bn || 'স্থায়ী পরিষদ')
                          : (position?.name?.en || 'Standing Panel')}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 font-display truncate">
                        {isBn
                          ? (person?.banglaName || person?.fullName || person?.englishName)
                          : (person?.englishName || person?.fullName || person?.banglaName)}
                      </h3>
                      <p className="text-[11px] text-slate-500 line-clamp-1 font-sans">
                        {isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী পরিষদ' : 'Standing Committee Member'}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 4. PAST COMMITTEES ARCHIVE SECTION */}
        {/* ---------------------------------------------------- */}
        <section id="past-committees" className="scroll-mt-28 space-y-8">
          <ScrollReveal effect="fade-up">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAE3D9] pb-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 uppercase tracking-wider">
                  <History className="w-4 h-4 text-amber-700" />
                  <span>{isBn ? 'ঐতিহাসিক নেতৃত্ব ও আর্কাইভ' : 'Historic Leadership & Archive'}</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
                  {isBn ? 'প্রাক্তন কার্যনির্বাহী কমিটিসমূহ' : 'Past Committees Archive'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed font-sans">
                  {isBn
                    ? 'বিগত বছরগুলোতে নিষ্ঠার সাথে দায়িত্ব পালনকারী প্রাক্তন কার্যনির্বাহী পরিষদের নেতৃত্ব ও অবদানের ঐতিহাসিক সংরক্ষণশালা।'
                    : 'An enduring archive honoring former executive leaders whose service built the foundation of Infinity Bangladesh.'}
                </p>
              </div>

              <Link
                to="team/past-committees"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-extrabold shadow-warm-md transition-all shrink-0 cursor-pointer"
              >
                <span>{isBn ? 'সম্পূর্ণ আর্কাইভ ভিউয়ার' : 'Open Full Archive'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Past Committees Cards */}
          <StaggerGroup className="flex flex-wrap justify-center gap-6">
            {pastCommittees.map(comm => {
              const members = getMembersWithDetails(comm.id);
              return (
                <StaggerItem
                  key={comm.id}
                  className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm"
                >
                  <div
                    className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-6 h-full"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 font-mono text-xs font-extrabold flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{comm.year || 'Historic'}</span>
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {members.length} {isBn ? 'জন সদস্য' : 'Members'}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-lg font-extrabold text-slate-900 font-display">
                          {isBn ? (comm.name.bn || comm.name.en) : (comm.name.en || comm.name.bn)}
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-3">
                          {isBn
                            ? (comm.description?.bn || `${comm.year} সালের জন্য দায়িত্বপ্রাপ্ত কার্যনির্বাহী পরিষদ।`)
                            : (comm.description?.en || `Executive leadership serving Infinity Bangladesh in the year ${comm.year}.`)}
                        </p>
                      </div>
                    </div>

                    <Link
                      to="team/past-committees"
                      slug={comm.id}
                      className="w-full py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE3D9]/60 text-slate-800 text-xs font-bold border border-[#EAE3D9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isBn ? 'কমিটির পূর্ণ তালিকা দেখুন' : 'View Committee Members'}</span>
                      <ChevronRight className="w-4 h-4 text-[#006A4E]" />
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </section>

        {/* ---------------------------------------------------- */}
        {/* 5. VOLUNTEER NETWORK CTA */}
        {/* ---------------------------------------------------- */}
        <ScrollReveal effect="fade-up">
          <section className="bg-gradient-to-br from-[#006A4E] to-[#00523C] text-white rounded-3xl p-8 sm:p-12 shadow-warm-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative max-w-3xl space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold backdrop-blur-xs">
                <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                <span>{isBn ? 'তারুণ্যের শক্তি ও মানবতা' : 'Youth Powered Humanity'}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold font-display">
                {isBn
                  ? 'আপনিও হতে পারেন টিম ইনফিনিটির অংশ'
                  : 'Become a Part of Team Infinity Bangladesh'}
              </h2>

              <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
                {isBn
                  ? 'আমাদের সাথে যুক্ত হয়ে বন্যা দুর্গতদের পাশে দাঁড়ান, সুবিধাবঞ্চিত শিশুদের শিক্ষার আলো দিন এবং মানবতার সেবায় আপনার ভূমিকা রাখুন।'
                  : 'Join our grassroots volunteer network to deliver emergency relief, sponsor children’s education, and spread smiles across Bangladesh.'}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="volunteer"
                  className="px-6 py-3 rounded-xl bg-white text-[#006A4E] font-extrabold text-xs shadow-warm-md hover:bg-slate-100 transition-all cursor-pointer"
                >
                  {isBn ? 'স্বেচ্ছাসেবী হিসেবে নিবন্ধন করুন' : 'Apply as Volunteer'}
                </Link>
                <Link
                  to="contact"
                  className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
                >
                  {isBn ? 'যোগাযোগ করুন' : 'Contact Leadership'}
                </Link>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Verified Org Pledge */}
        
      </div>
    </div>
  );
};
