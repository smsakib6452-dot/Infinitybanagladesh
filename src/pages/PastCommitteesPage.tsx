import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { SectionHeading } from '../components/SectionHeading';
import {
  History,
  Calendar,
  Users,
  Award,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

export const PastCommitteesPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();
  const { committees, getMembersWithDetails } = useData();

  const pastCommittees = committees.filter(c => c.type === 'PAST' || c.status === 'ARCHIVED');
  const [expandedId, setExpandedId] = useState<string | null>(pastCommittees[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider border border-slate-200">
          <History className="w-3.5 h-3.5 text-slate-700" />
          <span>{isBn ? 'সাংগঠনিক ইতিহাস ও নেতৃত্ব' : 'Leadership Archive'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {isBn ? 'প্রাক্তন কার্যনির্বাহী কমিটি আর্কাইভ' : 'Past Committees & Leadership Archive'}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
          {isBn
            ? 'ইনফিনিটি বাংলাদেশ-এর সূচনালগ্ন থেকে বিভিন্ন বর্ষে নিষ্ঠা ও সততার সাথে দায়িত্ব পালনকারী প্রাক্তন নেতৃবৃন্দের গৌরবময় অবদান।'
            : 'Preserving the historic legacy and humanitarian contributions of previous executive leadership councils across service years.'}
        </p>

        {/* Sub-navigation */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('about/executive-committee')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'বর্তমান কার্যনির্বাহী পরিষদ (২০২৬)' : 'Current Executive Committee (2026)'}
          </button>

          <button
            type="button"
            onClick={() => navigate('about/standing-committees')}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition-all cursor-pointer"
          >
            {isBn ? 'স্থায়ী কমিটিসমূহ' : 'Standing Committees'}
          </button>

          <button
            type="button"
            className="px-5 py-2.5 rounded-xl bg-teal-800 text-white text-xs sm:text-sm font-bold shadow-xs cursor-default"
          >
            {isBn ? 'প্রাক্তন কমিটি আর্কাইভ' : 'Past Committees Archive'}
          </button>
        </div>
      </div>

      {/* Past Committees List */}
      <div className="space-y-6">
        {pastCommittees.length > 0 ? (
          pastCommittees.map(comm => {
            const isExpanded = expandedId === comm.id;
            const members = getMembersWithDetails(comm.id);

            return (
              <div
                key={comm.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs transition-all"
              >
                <div
                  onClick={() => toggleExpand(comm.id)}
                  className="p-6 sm:p-8 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-slate-100 text-slate-800 border border-slate-200">
                        {isBn ? 'আর্কাইভ বর্ষ:' : 'Service Term:'} {comm.year}
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
                      {tText(comm.name)}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {tText(comm.description)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-semibold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                      {members.length} {isBn ? 'জন সদস্য' : 'Members'}
                    </span>
                    <div className="p-2 rounded-full bg-slate-100 text-slate-600">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 space-y-6 animate-in fade-in">
                    {members.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {members.map(m => (
                          <div
                            key={m.id}
                            className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-2xs"
                          >
                            <span className="text-[10px] font-mono font-bold text-slate-400">
                              #{String(m.serialNumber).padStart(2, '0')}
                            </span>
                            <h4 className="text-sm font-bold text-slate-900">
                              {isBn ? m.person.banglaName : m.person.fullName}
                            </h4>
                            <p className="text-xs text-teal-800 font-semibold">
                              {isBn ? m.position.name.bn : m.position.name.en}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
                        {isBn
                          ? 'এই বর্ষের সদস্য তালিকা আর্কাইভ নথি থেকে অ্যাডমিন প্যানেলের মাধ্যমে হালনাগাদ করা যাবে।'
                          : 'Roster records for this past term can be added or restored from the Admin Panel.'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
            <History className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              {isBn ? 'কোনো পূর্ববর্তী আর্কাইভ কমিটি পাওয়া যায়নি' : 'No Archived Committees Found'}
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {isBn
                ? 'ভবিষ্যতে নতুন কমিটি গঠনের সময় পূর্ববর্তী কমিটিগুলো স্বয়ংক্রিয়ভাবে এখানে সংরক্ষিত থাকবে।'
                : 'When new annual executive committees are elected in future years, previous terms are archived here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
