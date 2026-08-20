import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge } from '../components/OfficialInfoBadge';
import {
  Layers,
  Award,
  Users,
  ShieldCheck,
  BookOpen,
  Heart,
  Briefcase,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Sparkles,
  Search
} from 'lucide-react';
import { CommitteeMember, Person, Position } from '../types';

export const StandingCommitteesPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const { committees, getMembersWithDetails } = useData();

  const [selectedMember, setSelectedMember] = useState<(CommitteeMember & { person: Person; position: Position }) | null>(null);

  // Central Standing Committee (from official reference poster)
  const centralStandingComm = committees.find(c => c.id === 'comm-stand-central') || committees.find(c => c.type === 'STANDING') || committees[0];
  const centralMembers = getMembersWithDetails(centralStandingComm?.id || 'comm-stand-central');

  // Hierarchy grouping for central standing committee
  const chairman = centralMembers.filter(m => m.position.level === 1 || m.position.name.en.toLowerCase().includes('chairman') && !m.position.name.en.toLowerCase().includes('vice'));
  const viceChairmen = centralMembers.filter(m => m.position.level === 2 || m.position.name.en.toLowerCase().includes('vice-chairman') || m.position.name.en.toLowerCase().includes('vice chairman'));
  const regularMembers = centralMembers.filter(m => m.position.level >= 4 || m.position.name.en.toLowerCase().includes('member'));

  // Other Standing Committees
  const otherStandingCommittees = committees.filter(c => c.type === 'STANDING' && c.id !== centralStandingComm?.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
          <Layers className="w-3.5 h-3.5 text-teal-700" />
          <span>{isBn ? 'স্থায়ী পরিষদ ও দিকনির্দেশনা' : 'Standing Governance Council'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী কমিটি' : 'Infinity Bangladesh Standing Committee'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {isBn
            ? 'টিম ইনফিনিটির প্রাতিষ্ঠানিক নীতি নির্ধারণ, দীর্ঘমেয়াদী কৌশলগত পরিকল্পনা এবং মানবিক কার্যক্রমের ধারাবাহিকতা রক্ষায় নিবেদিত স্থায়ী পরিষদ।'
            : 'The permanent governance body providing strategic leadership, institutional policy oversight, and ethical guidance for Infinity Bangladesh.'}
        </p>

        {/* Sub-navigation */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('about/executive-committee')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee (2026)'}
          </button>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-xs cursor-default"
          >
            {isBn ? 'স্থায়ী কমিটি' : 'Standing Committee'}
          </button>

          <button
            type="button"
            onClick={() => navigate('about/past-committees')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. CENTRAL STANDING COMMITTEE HIERARCHY (Official Poster Layout) */}
      {/* ==================================================================== */}
      <div className="bg-gradient-to-b from-teal-950/5 via-white to-slate-50 rounded-3xl border-2 border-teal-900/20 p-6 sm:p-10 space-y-10 shadow-sm relative overflow-hidden">
        {/* Subtle decorative emblem in corner */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        {/* Committee Title Header */}
        <div className="text-center space-y-2 border-b border-teal-900/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900 text-teal-100 text-xs font-bold font-mono tracking-widest uppercase">
            Official Standing Council
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-teal-950 font-display">
            {isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী পরিষদ' : 'Infinity Bangladesh Standing Committee'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            {isBn
              ? 'প্রাতিষ্ঠানিক দিকনির্দেশনা ও দীর্ঘমেয়াদী মানবিক পরিকল্পনায় দায়িত্বপ্রাপ্ত স্থায়ী নেতৃবৃন্দ।'
              : 'Permanent institutional leadership ensuring continuous governance, integrity, and ethical oversight.'}
          </p>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TIER 1: CHAIRMAN (Top Centered / Rounded Arch Card) */}
        {/* ------------------------------------------------------------------ */}
        {chairman.length > 0 && (
          <div className="space-y-3">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-900 bg-teal-100 px-3.5 py-1 rounded-full border border-teal-300">
                {isBn ? 'চেয়ারম্যান' : 'Chairman'}
              </span>
            </div>

            <div className="flex justify-center">
              {chairman.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer max-w-xs sm:max-w-sm w-full bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 text-center shadow-xl border-2 border-teal-600/50 hover:border-teal-400 transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-3 right-3 bg-teal-500/30 text-teal-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-teal-400/40">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  {/* Arch Framing matching official poster style */}
                  <div className="mx-auto w-28 h-32 sm:w-32 sm:h-36 rounded-t-full rounded-b-2xl overflow-hidden bg-slate-800 border-2 border-teal-400/60 shadow-inner mb-3.5 flex items-center justify-center">
                    {m.person.photoUrl ? (
                      <img
                        src={m.person.photoUrl}
                        alt={m.person.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-14 h-14 text-teal-300/70" />
                    )}
                  </div>

                  {/* Name pill container */}
                  <div className="bg-rose-950/90 border border-rose-700/60 text-white rounded-xl py-2 px-3 shadow-md space-y-0.5">
                    <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-display text-white group-hover:text-teal-200 transition-colors">
                      {isBn ? m.person.banglaName : m.person.fullName}
                    </h3>
                    <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                      {isBn ? m.position.name.bn : m.position.name.en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TIER 2: VICE-CHAIRMEN (2 Balanced Cards) */}
        {/* ------------------------------------------------------------------ */}
        {viceChairmen.length > 0 && (
          <div className="space-y-3 pt-2">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                {isBn ? 'ভাইস-চেয়ারম্যান পরিষদ' : 'Vice-Chairmen'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {viceChairmen.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer bg-slate-900 text-white rounded-3xl p-5 text-center shadow-lg border border-slate-800 hover:border-teal-500/60 transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-3 right-3 bg-slate-800 text-teal-300 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-slate-700">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  {/* Arch Framing */}
                  <div className="mx-auto w-24 h-28 sm:w-28 sm:h-32 rounded-t-full rounded-b-xl overflow-hidden bg-slate-800 border border-slate-700 mb-3 flex items-center justify-center">
                    {m.person.photoUrl ? (
                      <img
                        src={m.person.photoUrl}
                        alt={m.person.fullName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Users className="w-12 h-12 text-slate-400" />
                    )}
                  </div>

                  {/* Name pill container */}
                  <div className="bg-rose-950/80 border border-rose-800/60 text-white rounded-xl py-1.5 px-3 shadow-md space-y-0.5">
                    <h4 className="text-sm sm:text-base font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                      {isBn ? m.person.banglaName : m.person.fullName}
                    </h4>
                    <div className="text-[10px] font-bold text-rose-300 uppercase tracking-wider">
                      {isBn ? m.position.name.bn : m.position.name.en}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TIER 3: MEMBERS (6 Cards in 3-col Grid / 2 Rows of 3) */}
        {/* ------------------------------------------------------------------ */}
        {regularMembers.length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-800 bg-slate-100 px-3.5 py-1 rounded-full border border-slate-200">
                {isBn ? 'স্থায়ী কমিটির সদস্যবৃন্দ' : 'Committee Members'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {regularMembers.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer bg-white rounded-2xl p-4 text-center shadow-xs border border-slate-200 hover:border-teal-600 hover:shadow-md transition-all transform hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div className="absolute top-2.5 right-2.5 bg-slate-100 text-slate-700 font-mono font-bold text-[10px] px-1.5 py-0.2 rounded border border-slate-200">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div>
                    {/* Arch Framing matching official poster */}
                    <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-lg overflow-hidden bg-slate-100 border border-slate-300 mb-2.5 flex items-center justify-center">
                      {m.person.photoUrl ? (
                        <img
                          src={m.person.photoUrl}
                          alt={m.person.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Users className="w-10 h-10 text-slate-400" />
                      )}
                    </div>

                    <div className="bg-rose-900 border border-rose-800 text-white rounded-xl py-1 px-2.5 shadow-xs space-y-0.2">
                      <h5 className="text-xs sm:text-sm font-bold font-display text-white group-hover:text-teal-200 transition-colors truncate">
                        {isBn ? m.person.banglaName : m.person.fullName}
                      </h5>
                      <div className="text-[10px] font-bold text-rose-200">
                        {isBn ? m.position.name.bn : m.position.name.en}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* 2. FUNCTIONAL STANDING COMMITTEES (Permanent Wings) */}
      {/* ==================================================================== */}
      {otherStandingCommittees.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-xl font-extrabold text-slate-900 font-display">
              {isBn ? 'অন্যান্য স্থায়ী বিষয়ভিত্তিক পরিষদসমূহ' : 'Specialized Permanent Wings'}
            </h3>
            <p className="text-xs text-slate-500">
              {isBn
                ? 'শিক্ষা, দুর্যোগ ও শিশু সুরক্ষা কার্যক্রমে নিবেদিত স্থায়ী কমিটি।'
                : 'Specialized domain committees managing frontline execution mandates.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherStandingCommittees.map(comm => {
              const members = getMembersWithDetails(comm.id);

              return (
                <div
                  key={comm.id}
                  className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs hover:border-teal-400/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-teal-100 text-teal-900 border border-teal-200">
                      {isBn ? 'স্থায়ী পরিষদ' : 'Permanent Committee'}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {comm.year}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 font-display">
                    {tText(comm.name)}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tText(comm.description)}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>{members.length} {isBn ? 'জন সদস্য দায়িত্বপ্রাপ্ত' : 'Members Assigned'}</span>
                    <span className="text-[11px] text-teal-800 font-bold">
                      {isBn ? 'কার্যক্রম চলমান' : 'Active Mandate'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              ✕
            </button>

            <div className="text-center space-y-3">
              <div className="mx-auto w-24 h-28 rounded-t-full rounded-b-xl overflow-hidden bg-slate-100 border-2 border-teal-600 shadow-md flex items-center justify-center">
                {selectedMember.person.photoUrl ? (
                  <img
                    src={selectedMember.person.photoUrl}
                    alt={selectedMember.person.fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Users className="w-12 h-12 text-teal-800/60" />
                )}
              </div>

              <div className="space-y-1">
                <span className="inline-block font-mono text-xs font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                  {isBn ? 'ক্রমিক নং:' : 'Serial No:'} #{String(selectedMember.serialNumber).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  {isBn ? selectedMember.person.banglaName : selectedMember.person.fullName}
                </h3>
                <p className="text-sm font-bold text-teal-800">
                  {isBn ? selectedMember.position.name.bn : selectedMember.position.name.en}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'সংগঠন:' : 'Organization:'}</span>
                <span className="font-bold text-slate-900">Infinity Bangladesh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'কমিটি:' : 'Committee:'}</span>
                <span className="font-medium text-slate-800">{isBn ? 'স্থায়ী কমিটি' : 'Standing Committee'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'মর্যাদা:' : 'Status:'}</span>
                <span className="font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">{isBn ? 'সক্রিয় পরিষদ' : 'Active Council'}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedMember.person.shortBio ? tText(selectedMember.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী কমিটির সম্মানিত সদস্য।' : 'Distinguished member of Infinity Bangladesh Standing Committee.')}
            </p>

            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isBn ? 'বন্ধ করুন' : 'Close Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
