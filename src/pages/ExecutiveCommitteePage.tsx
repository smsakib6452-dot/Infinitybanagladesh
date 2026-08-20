import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge } from '../components/OfficialInfoBadge';
import {
  Users,
  ShieldCheck,
  Award,
  Calendar,
  ExternalLink,
  Facebook,
  Linkedin,
  Mail,
  Phone,
  Search,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import { CommitteeMember, Person, Position } from '../types';
import { getAssetUrl } from '../lib/utils/assetHelper';

export const ExecutiveCommitteePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const { committees, getMembersWithDetails } = useData();

  const activeExecCommittee = committees.find(c => c.type === 'EXECUTIVE' && c.status === 'ACTIVE') || committees[0];
  const [selectedCommitteeId, setSelectedCommitteeId] = useState<string>(activeExecCommittee?.id || 'comm-exec-2026');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<(CommitteeMember & { person: Person; position: Position }) | null>(null);

  const currentCommittee = committees.find(c => c.id === selectedCommitteeId) || activeExecCommittee;
  const allMembers = getMembersWithDetails(selectedCommitteeId);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
          <Award className="w-3.5 h-3.5 text-teal-700" />
          <span>{isBn ? 'কার্যনির্বাহী পরিষদ' : 'Executive Leadership'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী কমিটি' : 'Infinity Bangladesh Executive Committee'}
          {currentCommittee && (
            <span className="text-teal-800 ml-2">
              — {currentCommittee.year}
            </span>
          )}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {isBn
            ? 'টিম ইনফিনিটির মানবিক উদ্যোগ, মাঠপর্যায়ের ত্রাণ ও সেবা কার্যক্রম পরিচালনায় নিবেদিত নির্বাচিত কার্যনির্বাহী নেতৃত্ব।'
            : 'The dedicated executive body spearheading humanitarian drives, child empowerment, and volunteer initiatives across Bangladesh.'}
        </p>

        {/* Committee Sub-Navigation */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-xs cursor-default"
          >
            {isBn ? `কার্যনির্বাহী পরিষদ (${currentCommittee?.year || '২০২৬'})` : `Executive Committee (${currentCommittee?.year || '2026'})`}
          </button>

          <button
            type="button"
            onClick={() => navigate('about/standing-committees')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
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

      {/* Official Hierarchy & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-800" />
              {tText(currentCommittee.name)}
            </h2>
            <p className="text-xs text-slate-500">
              {isBn ? 'মোট কার্যনির্বাহী সদস্য:' : 'Total Executive Members:'} {allMembers.length} {isBn ? 'জন' : 'Leaders'} &bull; {isBn ? 'অনুমোদিত প্রাতিষ্ঠানিক তালিকা' : 'Official Verified Roster'}
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isBn ? 'সদস্য বা পদবী খুঁজুন...' : 'Search member or position...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-700 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* ==================================================================== */}
        {/* TIER 1: PRESIDENT (Top Centered / Prominent Emerald Card) */}
        {/* ==================================================================== */}
        {tier1Members.length > 0 && (
          <div className="space-y-4 pt-2">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {isBn ? 'প্রধান নেতৃত্ব' : 'Presidential Leadership'}
              </span>
            </div>

            <div className="flex justify-center">
              {tier1Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer max-w-sm w-full bg-gradient-to-b from-emerald-950/90 to-teal-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl border-2 border-emerald-500/40 hover:border-emerald-400 transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 bg-emerald-500/30 text-emerald-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-400/40">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-32 h-36 sm:w-36 sm:h-40 rounded-t-full rounded-b-2xl overflow-hidden bg-emerald-900/60 border-2 border-emerald-400/50 shadow-inner mb-4 flex items-center justify-center">
                    {m.person.photoUrl ? (
                      <img
                        src={getAssetUrl(m.person.photoUrl)}
                        alt={m.person.fullName}
                        className="w-full h-full object-cover transition-all"
                        style={{
                          objectPosition: m.person.photoPosition || 'center 15%',
                          transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                        }}
                      />
                    ) : (
                      <Users className="w-16 h-16 text-emerald-300/60" />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white group-hover:text-emerald-200 transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-1.5 inline-block px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 font-bold text-xs border border-emerald-600/40">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>

                  <p className="mt-3 text-xs text-emerald-100/80 line-clamp-2">
                    {m.person.shortBio ? tText(m.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ-এর সম্মানিত সভাপতি।' : 'President of Infinity Bangladesh.')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TIER 2: SENIOR VICE PRESIDENT & VICE PRESIDENTS */}
        {/* ==================================================================== */}
        {tier2Members.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                {isBn ? 'সহ-সভাপতি পরিষদ' : 'Vice Presidential Leadership'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {tier2Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group cursor-pointer bg-slate-900 text-white rounded-3xl p-5 sm:p-6 text-center shadow-md border border-slate-800 hover:border-teal-500/50 transition-all transform hover:-translate-y-1 relative"
                >
                  <div className="absolute top-3 right-3 bg-slate-800 text-teal-300 font-mono font-bold text-[11px] px-2 py-0.5 rounded-full border border-slate-700">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-24 h-28 sm:w-28 sm:h-32 rounded-t-full rounded-b-xl overflow-hidden bg-slate-800 border border-slate-700 mb-3 flex items-center justify-center">
                    {m.person.photoUrl ? (
                      <img
                        src={getAssetUrl(m.person.photoUrl)}
                        alt={m.person.fullName}
                        className="w-full h-full object-cover transition-all"
                        style={{
                          objectPosition: m.person.photoPosition || 'center 15%',
                          transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                        }}
                      />
                    ) : (
                      <Users className="w-12 h-12 text-slate-500" />
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold text-xs border border-slate-700">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TIER 3: GENERAL SECRETARY (Prominent Crimson Highlight Card) */}
        {/* ==================================================================== */}
        {tier3Members.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                {isBn ? 'সাধারণ সম্পাদক' : 'Secretariat Leadership'}
              </span>
            </div>

            <div className="flex justify-center">
              {tier3Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group relative cursor-pointer max-w-sm w-full bg-gradient-to-b from-rose-950/95 to-slate-900 text-white rounded-3xl p-6 sm:p-8 text-center shadow-xl border-2 border-rose-500/40 hover:border-rose-400 transition-all transform hover:-translate-y-1"
                >
                  <div className="absolute top-4 right-4 bg-rose-500/30 text-rose-300 font-mono font-bold text-xs px-2.5 py-1 rounded-full border border-rose-400/40">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div className="relative mx-auto w-32 h-36 sm:w-36 sm:h-40 rounded-t-full rounded-b-2xl overflow-hidden bg-rose-900/60 border-2 border-rose-400/50 shadow-inner mb-4 flex items-center justify-center">
                    {m.person.photoUrl ? (
                      <img
                        src={getAssetUrl(m.person.photoUrl)}
                        alt={m.person.fullName}
                        className="w-full h-full object-cover transition-all"
                        style={{
                          objectPosition: m.person.photoPosition || 'center 15%',
                          transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                        }}
                      />
                    ) : (
                      <Users className="w-16 h-16 text-rose-300/60" />
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display text-white group-hover:text-rose-200 transition-colors">
                    {isBn ? m.person.banglaName : m.person.fullName}
                  </h3>

                  <div className="mt-1.5 inline-block px-3 py-1 rounded-full bg-rose-800/80 text-rose-200 font-bold text-xs border border-rose-600/40">
                    {isBn ? m.position.name.bn : m.position.name.en}
                  </div>

                  <p className="mt-3 text-xs text-rose-100/80 line-clamp-2">
                    {m.person.shortBio ? tText(m.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ-এর সাধারণ সম্পাদক।' : 'General Secretary of Infinity Bangladesh.')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================================== */}
        {/* TIER 4: JOINT GENERAL SECRETARIES & FUNCTIONAL SECRETARIES */}
        {/* ==================================================================== */}
        {tier4Members.length > 0 && (
          <div className="space-y-4 pt-8 border-t border-slate-100">
            <div className="text-center">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                {isBn ? 'যুগ্ম সম্পাদক ও বিভাগীয় সম্পাদকবৃন্দ' : 'Joint Secretaries & Executive Officers'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {tier4Members.map(m => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="group cursor-pointer bg-slate-50 hover:bg-white rounded-2xl p-3 sm:p-4 text-center border border-slate-200 hover:border-teal-500 hover:shadow-md transition-all relative flex flex-col justify-between"
                >
                  <div className="absolute top-2 right-2 bg-slate-200 text-slate-700 font-mono font-bold text-[10px] px-1.5 py-0.2 rounded">
                    #{String(m.serialNumber).padStart(2, '0')}
                  </div>

                  <div>
                    {/* Arch Framing matching official poster style */}
                    <div className="mx-auto w-16 h-20 sm:w-20 sm:h-24 rounded-t-full rounded-b-lg overflow-hidden bg-gradient-to-b from-rose-700 to-rose-900 border border-rose-600/60 mb-2.5 flex items-center justify-center">
                      {m.person.photoUrl ? (
                        <img
                          src={getAssetUrl(m.person.photoUrl)}
                          alt={m.person.fullName}
                          className="w-full h-full object-cover transition-all"
                          style={{
                            objectPosition: m.person.photoPosition || 'center 15%',
                            transform: m.person.photoZoom ? `scale(${m.person.photoZoom})` : undefined
                          }}
                        />
                      ) : (
                        <Users className="w-8 h-8 text-rose-200/70" />
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-hover:text-teal-800 transition-colors">
                      {isBn ? m.person.banglaName : m.person.fullName}
                    </h4>
                  </div>

                  <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 line-clamp-2 leading-tight">
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
                    src={getAssetUrl(selectedMember.person.photoUrl)}
                    alt={selectedMember.person.fullName}
                    className="w-full h-full object-cover transition-all"
                    style={{
                      objectPosition: selectedMember.person.photoPosition || 'center 15%',
                      transform: selectedMember.person.photoZoom ? `scale(${selectedMember.person.photoZoom})` : undefined
                    }}
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

            <p className="text-xs text-slate-600 leading-relaxed text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
              {selectedMember.person.shortBio ? tText(selectedMember.person.shortBio) : (isBn ? 'ইনফিনিটি বাংলাদেশ কার্যনির্বাহী পরিষদের সম্মানিত সদস্য।' : 'Distinguished member of Infinity Bangladesh Executive Council.')}
            </p>

            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
            >
              {isBn ? 'বন্ধ করুন' : 'Close Profile'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
