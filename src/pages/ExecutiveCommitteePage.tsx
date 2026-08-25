import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { Link } from '../components/Link';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge } from '../components/OfficialInfoBadge';
import {
  Users,
  ShieldCheck,
  Award,
  Calendar,
  Search,
  Sparkles,
  ArrowRight,
  MapPin,
  LayoutGrid
} from 'lucide-react';
import { CommitteeMember, Person, Position } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';

export const ExecutiveCommitteePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { committees, getMembersWithDetails } = useData();

  const activeExecCommittee = committees.find(c => c.type === 'EXECUTIVE' && c.status === 'ACTIVE') || committees.find(c => c.type === 'EXECUTIVE') || committees[0];
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<(CommitteeMember & { person: Person; position: Position }) | null>(null);

  const committeeIdToUse = selectedCommitteeId || activeExecCommittee?.id || 'comm-exec-2026';
  const currentCommittee = committees.find(c => c.id === committeeIdToUse) || activeExecCommittee;
  const allMembers = getMembersWithDetails(committeeIdToUse);

  // Filter members if search query exists
  const filteredMembers = allMembers.filter(m => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameMatch = m.person.fullName.toLowerCase().includes(q) || m.person.banglaName.toLowerCase().includes(q);
    const posMatch = m.position.name.en.toLowerCase().includes(q) || m.position.name.bn.toLowerCase().includes(q);
    return nameMatch || posMatch;
  });

  // Group into tiers for visual hierarchy
  const tier1Members = filteredMembers.filter(m => m.position.level === 1); // President
  const tier2Members = filteredMembers.filter(m => m.position.level === 2); // Senior VP & VPs
  const tier3Members = filteredMembers.filter(m => m.position.level === 3); // General Secretary
  const tier4Members = filteredMembers.filter(m => m.position.level >= 4); // Joint Secs, Dept Secs & Executive

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-14">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F3EF] text-[#00523C] text-xs font-extrabold uppercase tracking-wider border border-[#C2E2D7]">
          <Award className="w-3.5 h-3.5 text-[#006A4E]" />
          <span>{isBn ? 'কার্যনির্বাহী পরিষদ' : 'Executive Leadership'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী কমিটি' : 'Infinity Bangladesh Executive Committee'}
          {currentCommittee && (
            <span className="text-[#006A4E] ml-2 font-display">
              — {currentCommittee.year}
            </span>
          )}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {isBn
            ? 'টিম ইনফিনিটির মানবিক উদ্যোগ, মাঠপর্যায়ের ত্রাণ ও সেবা কার্যক্রম পরিচালনায় নিবেদিত নির্বাচিত কার্যনির্বাহী নেতৃত্ব।'
            : 'The dedicated executive body spearheading humanitarian drives, child empowerment, and volunteer initiatives across Bangladesh.'}
        </p>

        {/* Committee Sub-Navigation */}
        <div className="pt-3 flex flex-wrap justify-center items-center gap-2.5 sm:gap-3">
          <Link
            to="team"
            className="px-4 py-2 rounded-2xl bg-white hover:bg-[#FAF7F2] text-slate-700 text-xs sm:text-sm font-bold border border-[#EAE3D9] transition-all cursor-pointer flex items-center gap-1.5"
          >
            <LayoutGrid className="w-4 h-4 text-[#006A4E]" />
            <span>{isBn ? 'টিম ওভারভিউ' : 'Team Overview'}</span>
          </Link>

          <Link
            to="team/executive-committee"
            className="px-4 py-2 rounded-2xl bg-[#006A4E] text-white text-xs sm:text-sm font-extrabold shadow-warm-sm cursor-pointer"
          >
            {isBn ? `কার্যনির্বাহী পরিষদ (${currentCommittee?.year || '২০২৬'})` : `Executive Committee (${currentCommittee?.year || '2026'})`}
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
      </div>

      {/* Official Hierarchy & Search Bar */}
      <div className="bg-white rounded-[2.5rem] border border-[#EAE3D9] p-6 sm:p-10 space-y-8 shadow-warm-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-[#006A4E]" />
              {tText(currentCommittee.name)}
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              {isBn ? 'মোট কার্যনির্বাহী সদস্য:' : 'Total Executive Members:'} <span className="font-bold text-slate-800">{allMembers.length} {isBn ? 'জন' : 'Leaders'}</span> &bull; {isBn ? 'অনুমোদিত প্রাতিষ্ঠানিক তালিকা' : 'Official Verified Roster'}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'সদস্য বা পদবী খুঁজুন...' : 'Search member or position...'}
              className="w-full pl-9 pr-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* TIER 1: PRESIDENT */}
        {tier1Members.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00523C] bg-[#E6F3EF] px-3.5 py-1 rounded-full border border-[#C2E2D7]">
                {isBn ? 'প্রধান নেতৃত্ব' : 'Presidential Leadership'}
              </span>
            </div>

            <div className="flex justify-center">
              {tier1Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer max-w-sm w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8 text-center shadow-warm-lg border-2 border-[#006A4E]/40 hover:border-[#006A4E] transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 bg-[#E6F3EF] text-[#00523C] font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-[#C2E2D7]">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-32 h-36 sm:w-36 sm:h-40 rounded-t-full rounded-b-2xl overflow-hidden bg-[#E6F3EF] border-2 border-[#006A4E]/30 shadow-inner mb-4 flex items-center justify-center">
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
                      <Users className="w-16 h-16 text-[#006A4E]/60" />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-slate-900 group-hover:text-[#006A4E] transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-2 inline-block px-3.5 py-1 rounded-full bg-[#006A4E] text-white font-extrabold text-xs shadow-xs">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {m.person.shortBio ? tText(m.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ-এর সম্মানিত সভাপতি।' : 'President of Infinity Bangladesh.')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIER 2: SENIOR VICE PRESIDENT & VICE PRESIDENTS */}
        {tier2Members.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 bg-[#FAF7F2] px-3.5 py-1 rounded-full border border-[#EAE3D9]">
                {isBn ? 'সহ-সভাপতি পরিষদ' : 'Vice Presidential Leadership'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tier2Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group cursor-pointer bg-white text-slate-900 rounded-3xl p-5 sm:p-6 text-center shadow-warm-sm border border-[#EAE3D9] hover:border-[#006A4E] transition-all transform hover:-translate-y-1 relative"
                >
                  <div className="absolute top-3 right-3 bg-[#FAF7F2] text-slate-700 font-mono font-bold text-[11px] px-2 py-0.5 rounded-full border border-[#EAE3D9]">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-24 h-28 sm:w-28 sm:h-32 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FAF7F2] border border-[#EAE3D9] mb-3 flex items-center justify-center">
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

                  <h3 className="text-base sm:text-lg font-bold font-display text-slate-900 group-hover:text-[#006A4E] transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-1.5 inline-block px-3 py-0.5 rounded-full bg-[#FAF7F2] text-slate-700 font-semibold text-xs border border-[#EAE3D9]">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIER 3: GENERAL SECRETARY */}
        {tier3Members.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#B31224] bg-[#FDF1F2] px-3.5 py-1 rounded-full border border-[#FCD3D7]">
                {isBn ? 'সাধারণ সম্পাদক' : 'Secretariat Leadership'}
              </span>
            </div>

            <div className="flex justify-center">
              {tier3Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer max-w-sm w-full bg-white text-slate-900 rounded-3xl p-6 sm:p-8 text-center shadow-warm-lg border-2 border-[#D4182E]/40 hover:border-[#D4182E] transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 bg-[#FDF1F2] text-[#B31224] font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-[#FCD3D7]">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-32 h-36 sm:w-36 sm:h-40 rounded-t-full rounded-b-2xl overflow-hidden bg-[#FDF1F2] border-2 border-[#D4182E]/30 shadow-inner mb-4 flex items-center justify-center">
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
                      <Users className="w-16 h-16 text-[#D4182E]/60" />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-slate-900 group-hover:text-[#D4182E] transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-2 inline-block px-3.5 py-1 rounded-full bg-[#D4182E] text-white font-extrabold text-xs shadow-xs">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>

                  <p className="mt-3 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {m.person.shortBio ? tText(m.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ-এর সাধারণ সম্পাদক।' : 'General Secretary of Infinity Bangladesh.')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TIER 4: JOINT GENERAL SECRETARIES & FUNCTIONAL SECRETARIES */}
        {tier4Members.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-slate-100">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 bg-[#FAF7F2] px-3.5 py-1 rounded-full border border-[#EAE3D9]">
                {isBn ? 'যুগ্ম সম্পাদক ও বিভাগীয় সম্পাদকবৃন্দ' : 'Joint Secretaries & Executive Officers'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {tier4Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group cursor-pointer bg-[#FAF7F2] hover:bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-4 text-center border border-[#EAE3D9] hover:border-[#006A4E] hover:shadow-warm-md transition-all relative flex flex-col justify-between min-h-[195px] sm:min-h-[220px]"
                >
                  <div className="absolute top-2.5 right-2.5 bg-white text-slate-700 font-mono font-bold text-[10px] px-1.5 py-0.5 rounded-full border border-slate-200 shadow-2xs">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div>
                    {/* Arch Framing matching official poster style */}
                    <div className="mx-auto w-16 h-20 sm:w-20 sm:h-24 rounded-t-full rounded-b-xl overflow-hidden bg-gradient-to-b from-rose-700 to-rose-900 border border-rose-600/60 mb-2.5 flex items-center justify-center shadow-xs">
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
                        <Users className="w-8 h-8 text-rose-200/70" />
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-[#006A4E] transition-colors font-display line-clamp-2 break-words">
                      {isBn ? m.person.banglaName : m.person.fullName}
                    </h4>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-200/60">
                    <span className="text-[10px] sm:text-[11px] font-semibold text-slate-600 line-clamp-2 leading-tight">
                      {isBn ? m.position.name.bn : m.position.name.en}
                    </span>
                  </div>
                </div>
              ))}
            </div>
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
                  {isBn ? 'ক্রমিক নং:' : 'Serial No:'} #{String(selectedMember.serialNumber).padStart(2, '0')}
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
                <span className="font-medium text-slate-800">{tText(currentCommittee.name)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">{isBn ? 'কার্যকাল:' : 'Tenure Year:'}</span>
                <span className="font-bold text-slate-900">{currentCommittee.year}</span>
              </div>
              {selectedMember.person.district && (
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'জেলা:' : 'District:'}</span>
                  <span className="text-slate-800">{selectedMember.person.district}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed text-center bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#EAE3D9]">
              {selectedMember.person.shortBio ? tText(selectedMember.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী পরিষদের সম্মানিত সদস্য।' : 'Distinguished member of Infinity Bangladesh Executive Council.')}
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
