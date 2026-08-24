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
  Sparkles
} from 'lucide-react';
import { CommitteeMember, Person, Position } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';

export const StandingCommitteesPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const { committees, getMembersWithDetails } = useData();

  const [selectedMember, setSelectedMember] = useState<(CommitteeMember & { person: Person; position: Position }) | null>(null);

  // Dynamic Standing Committees List
  const standingCommittees = committees.filter(c => c.type === 'STANDING');
  const defaultCommittee = standingCommittees.find(c => c.id === 'comm-stand-central') || standingCommittees[0] || committees[0];
  const [activeCommId, setActiveCommId] = useState<string>(defaultCommittee?.id || 'comm-stand-central');

  // Fallback to default if activeCommId not found
  const activeStandingComm = standingCommittees.find(c => c.id === activeCommId) || defaultCommittee;
  const currentMembers = getMembersWithDetails(activeStandingComm?.id);

  // Robust Hierarchy grouping
  const isChairman = (m: CommitteeMember & { position: Position }) => {
    const posName = (m.position?.name?.en || '').toLowerCase();
    return (m.position?.level === 1 || posName.includes('chairman')) && !posName.includes('vice');
  };

  const isViceChairman = (m: CommitteeMember & { position: Position }) => {
    const posName = (m.position?.name?.en || '').toLowerCase();
    return m.position?.level === 2 || posName.includes('vice-chairman') || posName.includes('vice chairman');
  };

  const chairman = currentMembers.filter(isChairman);
  const viceChairmen = currentMembers.filter(isViceChairman);
  const regularMembers = currentMembers.filter(m => !isChairman(m) && !isViceChairman(m));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-14">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3EF] text-[#00523C] text-xs font-extrabold uppercase tracking-wider border border-[#C2E2D7]">
          <Layers className="w-3.5 h-3.5 text-[#006A4E]" />
          <span>{isBn ? 'স্থায়ী পরিষদ ও দিকনির্দেশনা' : 'Standing Governance Council'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী কমিটি' : 'Infinity Bangladesh Standing Committee'}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {isBn
            ? 'টিম ইনফিনিটির প্রাতিষ্ঠানিক নীতি নির্ধারণ, দীর্ঘমেয়াদী কৌশলগত পরিকল্পনা এবং মানবিক কার্যক্রমের ধারাবাহিকতা রক্ষায় নিবেদিত স্থায়ী পরিষদ।'
            : 'The permanent governance body providing strategic leadership, institutional policy oversight, and ethical guidance for Infinity Bangladesh.'}
        </p>

        {/* Sub-navigation */}
        <div className="pt-3 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate('about/executive-committee')}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer"
          >
            {isBn ? 'কার্যনির্বাহী পরিষদ (২০২৬)' : 'Executive Committee (2026)'}
          </button>

          <button
            type="button"
            className="px-5 py-2.5 rounded-2xl bg-[#006A4E] text-white text-xs sm:text-sm font-extrabold shadow-warm-sm cursor-default"
          >
            {isBn ? 'স্থায়ী কমিটি' : 'Standing Committee'}
          </button>

          <button
            type="button"
            onClick={() => navigate('about/past-committees')}
            className="px-5 py-2.5 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer"
          >
            {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
          </button>
        </div>
      </div>

      {/* Dynamic Sub-Committees Selector if multiple standing committees exist */}
      {standingCommittees.length > 1 && (
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto bg-[#FAF7F2] p-2 rounded-2xl border border-[#EAE3D9]">
          {standingCommittees.map(comm => {
            const isSelected = (activeStandingComm?.id || defaultCommittee?.id) === comm.id;
            return (
              <button
                key={comm.id}
                type="button"
                onClick={() => setActiveCommId(comm.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-[#F2ECE1] border border-[#EAE3D9]'
                }`}
              >
                {tText(comm.name)}
              </button>
            );
          })}
        </div>
      )}

      {/* STANDING COMMITTEE HIERARCHY & MEMBERS */}
      <div className="bg-white rounded-[2.5rem] border border-[#EAE3D9] p-6 sm:p-10 space-y-10 shadow-warm-md relative overflow-hidden">
        {/* Committee Title Header */}
        <div className="text-center space-y-2 border-b border-slate-100 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F3EF] text-[#00523C] text-xs font-bold font-mono tracking-widest uppercase border border-[#C2E2D7]">
            Official Standing Council
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-display">
            {activeStandingComm ? tText(activeStandingComm.name) : (isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী পরিষদ' : 'Infinity Bangladesh Standing Committee')}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
            {activeStandingComm && activeStandingComm.description
              ? tText(activeStandingComm.description)
              : (isBn
                ? 'প্রাতিষ্ঠানিক দিকনির্দেশনা ও দীর্ঘমেয়াদী মানবিক পরিকল্পনায় দায়িত্বপ্রাপ্ত স্থায়ী নেতৃবৃন্দ।'
                : 'Permanent institutional leadership ensuring continuous governance, integrity, and ethical oversight.')}
          </p>
        </div>

        {currentMembers.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-[#FAF7F2] rounded-3xl border border-dashed border-[#EAE3D9]">
            <Users className="w-12 h-12 text-slate-400 mx-auto" />
            <p className="text-sm font-bold text-slate-600">
              {isBn ? 'এই কমিটিতে এখনও কোনো সদস্য যুক্ত করা হয়নি।' : 'No members assigned to this standing committee yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-10">
            {/* TIER 1: CHAIRMAN */}
            {chairman.length > 0 && (
              <div className="space-y-3">
                <div className="text-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B31224] bg-[#FDF1F2] px-3.5 py-1 rounded-full border border-[#FCD3D7]">
                    {isBn ? 'চেয়ারম্যান' : 'Chairman'}
                  </span>
                </div>

                <div className="flex justify-center">
                  {chairman.map(m => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className="group relative cursor-pointer max-w-xs sm:max-w-sm w-full bg-white text-slate-900 rounded-3xl p-6 text-center shadow-warm-lg border-2 border-[#D4182E]/40 hover:border-[#D4182E] transition-all transform hover:-translate-y-1"
                    >
                      <div className="absolute top-3 right-3 bg-[#FDF1F2] text-[#B31224] font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#FCD3D7]">
                        #{String(m.serialNumber || 1).padStart(2, '0')}
                      </div>

                      <div className="mx-auto w-28 h-32 sm:w-32 sm:h-36 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FDF1F2] border-2 border-[#D4182E]/30 shadow-inner mb-3.5 flex items-center justify-center">
                        {m.person.photoUrl ? (
                          <img
                            src={getAssetUrl(m.person.photoUrl)}
                            alt={m.person.fullName}
                            className="w-full h-full object-cover transition-all"
                            style={{
                              objectPosition: m.person.photoPosition || 'center 15%',
                              transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getAssetUrl('assets/images/infinity-logo.png');
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <Users className="w-14 h-14 text-[#D4182E]/70" />
                        )}
                      </div>

                      <div className="bg-[#D4182E] text-white rounded-2xl py-2 px-3 shadow-xs space-y-0.5">
                        <h3 className="text-base sm:text-lg font-extrabold tracking-tight font-display text-white transition-colors">
                          {isBn ? m.person.banglaName : m.person.fullName}
                        </h3>
                        <div className="text-[11px] font-bold text-rose-100 uppercase tracking-wider">
                          {isBn ? m.position.name.bn : m.position.name.en}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIER 2: VICE-CHAIRMEN */}
            {viceChairmen.length > 0 && (
              <div className="space-y-3 pt-2">
                <div className="text-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B31224] bg-[#FDF1F2] px-3.5 py-1 rounded-full border border-[#FCD3D7]">
                    {isBn ? 'ভাইস-চেয়ারম্যান পরিষদ' : 'Vice-Chairmen'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  {viceChairmen.map(m => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className="group relative cursor-pointer bg-white text-slate-900 rounded-3xl p-5 text-center shadow-warm-sm border border-[#EAE3D9] hover:border-[#D4182E] transition-all transform hover:-translate-y-1"
                    >
                      <div className="absolute top-3 right-3 bg-[#FAF7F2] text-slate-700 font-mono font-bold text-[10px] px-2 py-0.5 rounded-full border border-[#EAE3D9]">
                        #{String(m.serialNumber || 2).padStart(2, '0')}
                      </div>

                      <div className="mx-auto w-24 h-28 sm:w-28 sm:h-32 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FAF7F2] border border-[#EAE3D9] mb-3 flex items-center justify-center">
                        {m.person.photoUrl ? (
                          <img
                            src={getAssetUrl(m.person.photoUrl)}
                            alt={m.person.fullName}
                            className="w-full h-full object-cover transition-all"
                            style={{
                              objectPosition: m.person.photoPosition || 'center 15%',
                              transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                            }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = getAssetUrl('assets/images/infinity-logo.png');
                            }}
                            loading="lazy"
                          />
                        ) : (
                          <Users className="w-12 h-12 text-slate-400" />
                        )}
                      </div>

                      <div className="bg-[#FAF7F2] border border-[#EAE3D9] text-slate-900 rounded-2xl py-1.5 px-3 shadow-2xs space-y-0.5">
                        <h4 className="text-sm sm:text-base font-bold font-display text-slate-900 group-hover:text-[#D4182E] transition-colors">
                          {isBn ? m.person.banglaName : m.person.fullName}
                        </h4>
                        <div className="text-[10px] font-bold text-[#D4182E] uppercase tracking-wider">
                          {isBn ? m.position.name.bn : m.position.name.en}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TIER 3: REGULAR MEMBERS */}
            {regularMembers.length > 0 && (
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="text-center">
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00523C] bg-[#E6F3EF] px-3.5 py-1 rounded-full border border-[#C2E2D7]">
                    {isBn ? 'স্থায়ী কমিটির সদস্যবৃন্দ' : 'Committee Members'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {regularMembers.map(m => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMember(m)}
                      className="group relative cursor-pointer bg-[#FAF7F2] rounded-3xl p-4 text-center shadow-2xs border border-[#EAE3D9] hover:border-[#006A4E] hover:shadow-warm-md transition-all transform hover:-translate-y-1 flex flex-col justify-between"
                    >
                      <div className="absolute top-2.5 right-2.5 bg-white text-slate-700 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                        #{String(m.serialNumber || 0).padStart(2, '0')}
                      </div>

                      <div>
                        <div className="mx-auto w-20 h-24 rounded-t-full rounded-b-xl overflow-hidden bg-white border border-[#EAE3D9] mb-2.5 flex items-center justify-center shadow-xs">
                          {m.person.photoUrl ? (
                            <img
                              src={getAssetUrl(m.person.photoUrl)}
                              alt={m.person.fullName}
                              className="w-full h-full object-cover transition-all"
                              style={{
                                objectPosition: m.person.photoPosition || 'center 15%',
                                transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                              }}
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = getAssetUrl('assets/images/infinity-logo.png');
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <Users className="w-10 h-10 text-slate-400" />
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-display group-hover:text-[#006A4E] transition-colors leading-snug">
                          {isBn ? m.person.banglaName : m.person.fullName}
                        </h4>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-200/60">
                        <span className="text-[10px] font-bold text-[#006A4E] uppercase tracking-wider block">
                          {isBn ? m.position.name.bn : m.position.name.en}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              ✕
            </button>

            <div className="text-center space-y-3">
              <div className="mx-auto w-24 h-28 rounded-t-full rounded-b-2xl overflow-hidden bg-slate-100 border-2 border-[#006A4E] shadow-md flex items-center justify-center">
                {selectedMember.person.photoUrl ? (
                  <img
                    src={getAssetUrl(selectedMember.person.photoUrl)}
                    alt={selectedMember.person.fullName}
                    className="w-full h-full object-cover transition-all"
                    style={{
                      objectPosition: selectedMember.person.photoPosition || 'center 15%',
                      transform: selectedMember.person.photoZoom ? `scale(${selectedMember.person.photoZoom})` : undefined
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = getAssetUrl('assets/images/infinity-logo.png');
                    }}
                  />
                ) : (
                  <Users className="w-12 h-12 text-[#006A4E]/60" />
                )}
              </div>

              <div className="space-y-1">
                <span className="inline-block font-mono text-xs font-bold text-[#006A4E] bg-[#E6F3EF] px-2.5 py-0.5 rounded-full border border-[#C2E2D7]">
                  {isBn ? 'ক্রমিক নং:' : 'Serial No:'} #{String(selectedMember.serialNumber || 0).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  {isBn ? selectedMember.person.banglaName : selectedMember.person.fullName}
                </h3>
                <p className="text-sm font-bold text-[#006A4E]">
                  {isBn ? selectedMember.position.name.bn : selectedMember.position.name.en}
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'সংগঠন:' : 'Organization:'}</span>
                <span className="font-bold text-slate-900">Infinity Bangladesh</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'কমিটি:' : 'Committee:'}</span>
                <span className="font-medium text-slate-800">
                  {activeStandingComm ? tText(activeStandingComm.name) : 'Standing Committee'}
                </span>
              </div>
              {selectedMember.person.district && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'জেলা:' : 'District:'}</span>
                  <span className="font-medium text-slate-800">{selectedMember.person.district}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-center bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EAE3D9]">
              {selectedMember.person.shortBio ? tText(selectedMember.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ স্থায়ী কমিটির সম্মানিত সদস্য।' : 'Distinguished member of Infinity Bangladesh Standing Committee.')}
            </p>

            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 bg-[#006A4E] hover:bg-[#00523C] text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
            >
              {isBn ? 'বন্ধ করুন' : 'Close Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
