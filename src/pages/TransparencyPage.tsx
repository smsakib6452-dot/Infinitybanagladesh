import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { ReportCard } from '../components/ReportCard';
import { VerifiedOrganizationPledge, OfficialInfoBadge } from '../components/OfficialInfoBadge';
import {
  ShieldCheck,
  FileText,
  Lock,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Download
} from 'lucide-react';

export const TransparencyPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { reports } = useData();

  const [typeFilter, setTypeFilter] = useState<'all' | 'Audit' | 'Financial' | 'Impact'>('all');

  const filteredReports = reports.filter(r => {
    if (typeFilter === 'all') return true;
    return r.type.toLowerCase().includes(typeFilter.toLowerCase());
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <SectionHeading
        badge={isBn ? 'দায়বদ্ধতা ও সততা' : 'Radical Transparency'}
        title={isBn ? 'স্বচ্ছতা ও অডিট রিপোর্ট' : 'Transparency & Governance'}
        subtitle={
          isBn
            ? 'টিম ইনফিনিটি প্রতিটি অনুদান এবং ব্যয়ের হিসাব শতভাগ সততার সাথে প্রকাশ করতে অঙ্গীকারবদ্ধ।'
            : 'Explore public audit logs, financial summaries, and verifiable impact reports published by Infinity Bangladesh.'
        }
      />

      {/* Verified Org Pledge */}
      <VerifiedOrganizationPledge />

      {/* Ethical Code of Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isBn ? 'শূন্য অপচয় ও সঠিক ব্যবহার' : 'Zero Waste Policy'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? 'অনুদান সংগ্রহের প্রতিটি অর্থ সরাসরি সুবিধাভোগীদের সামগ্রী ক্রয়ে ব্যয় হয়। কোনো প্রশাসনিক অপচয় সহ্য করা হয় না।'
              : 'Donations are directly mapped to field procurement. Zero leakage or unverified overheads.'}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isBn ? 'উন্মুক্ত অডিট নিরীক্ষা' : 'Public Audit Access'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? 'মৌসুমী প্রতিটি ক্যাম্পেইন সমাপ্তির পর ক্রয় রসিদ এবং বিতরণ সংখ্যার অডিট রিপোর্ট প্রকাশ করা হয়।'
              : 'Following each seasonal campaign, itemized expense receipts and beneficiary summaries are audited.'}
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {isBn ? 'সততা নীতি (Anti-Fabrication)' : 'Anti-Fabrication Pledge'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {isBn
              ? 'আমরা কখনো ভুয়া সংখ্যা, সাজানো ছবি বা কাল্পনিক তথ্য প্রচার করি না। সত্যতা আমাদের সবচেয়ে বড় শক্তি।'
              : 'We strictly reject inflated beneficiary metrics, fake claims, and poverty-exploitative media.'}
          </p>
        </div>
      </div>

      {/* Reports Directory & Download Center */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
            <FileText className="w-4 h-4 text-teal-700" />
            <span>{isBn ? 'রিপোর্ট ক্যাটাগরি:' : 'Report Types:'}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(['all', 'Audit', 'Financial', 'Impact'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(type)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                  typeFilter === type
                    ? 'bg-teal-800 text-white'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {type === 'all' ? (isBn ? 'সকল রিপোর্ট' : 'All Reports') : type}
              </button>
            ))}
          </div>
        </div>

        {/* Report Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Official Registration & Governance Notice */}
      <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-4 border border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white font-display">
              {isBn ? 'প্রাতিষ্ঠানিক ও সরকারি নিবন্ধন তথ্যাবলী' : 'Statutory & Governance Disclosures'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {isBn
                ? 'আইনি স্বচ্ছতা ও তথ্যের নির্ভুলতা রক্ষার্থে আমাদের আইনি উপদেষ্টা প্যানেল সর্বদা সচেষ্ট।'
                : 'Maintained in compliance with NGO Affairs Bureau and Department of Social Services statutory protocols.'}
            </p>
          </div>

          <OfficialInfoBadge className="shrink-0" />
        </div>
      </div>
    </div>
  );
};
