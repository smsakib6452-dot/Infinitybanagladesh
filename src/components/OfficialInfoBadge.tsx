import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';

import { TransparencySectionConfig } from '../types';

interface OfficialInfoBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export const OfficialInfoBadge: React.FC<OfficialInfoBadgeProps> = ({
  label,
  size = 'sm',
  className = ''
}) => {
  const { isBn } = useLanguage();

  const text = label || (isBn ? '[অফিসিয়াল তথ্য হালনাগাদ আবশ্যক]' : '[OFFICIAL INFORMATION REQUIRED]');

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bold rounded-xl border text-amber-900 bg-amber-50 border-amber-200 ${
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm'
      } ${className}`}
      title="Verified factual record compliant with organizational charter"
    >
      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      <span>{text}</span>
    </span>
  );
};

export const VerifiedOrganizationPledge: React.FC<{ config?: TransparencySectionConfig }> = ({ config }) => {
  const { isBn, tText } = useLanguage();
  const { settings } = useData();

  const orgName = settings.organizationName || (isBn ? 'ইনফিনিটি বাংলাদেশ' : 'Infinity Bangladesh');
  const teamId = settings.teamIdentity || 'Team Infinity';

  const badgeText = tText(config?.badge) || (isBn ? 'স্বচ্ছতার অঙ্গীকার' : 'Institutional Pledge');
  const titleText = tText(config?.title) || (isBn ? `${orgName}-এর সততা ও প্রকাশ্য স্বচ্ছতার অঙ্গীকার` : `${orgName} Strict Transparency & Open Governance`);
  const descText = tText(config?.description) || tText(config?.subtitle) || (isBn
    ? `${teamId} কোনো অতিরঞ্জিত পরিসংখ্যান বা কৃত্রিম দাবি প্রকাশ করে না। সকল তথ্য, অনুদান এবং কার্যক্রমের হিসাব স্বচ্ছতার সাথে নিরপেক্ষভাবে সংরক্ষণ করা হয়। মানুষের আত্মমর্যাদা রক্ষা এবং সেবা প্রদানে সর্বোচ্চ সততা আমাদের মূল ভিত্তি।`
    : `${orgName} operates strictly on factual reporting. Beneficiary counts, campaign expenditures, and administrative records are audited and verified before publication. We hold zero tolerance for fabricated stats or poverty exploitation.`);

  const pill1Text = tText(config?.pill1) || (isBn ? '১০০% নিরীক্ষিত স্বচ্ছ হিসাব' : '100% Audited Fund Tracking');
  const pill2Text = tText(config?.pill2) || (isBn ? 'মর্যাদাপূর্ণ মানবিক সেবা' : 'Dignified Beneficiary Ethics');
  const pill3Text = tText(config?.pill3) || (isBn ? 'তারুণ্যনির্ভর সেবাব্রত' : 'Volunteer-Driven Stewardship');

  return (
    <div className="bg-gradient-to-br from-[#11241E] to-[#0A1612] text-white rounded-3xl p-6 sm:p-10 shadow-warm-lg border border-emerald-900/60 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start gap-5">
        <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shrink-0 shadow-xs">
          <ShieldCheck className="w-7 h-7 text-emerald-400" />
        </div>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-800">
            <span>{badgeText}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white font-display">
            {titleText}
          </h3>

          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-3xl">
            {descText}
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 text-xs text-emerald-200">
            <span className="bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800 font-semibold">
              {pill1Text}
            </span>
            <span className="bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800 font-semibold">
              {pill2Text}
            </span>
            <span className="bg-emerald-950/80 px-3 py-1 rounded-xl border border-emerald-800 font-semibold">
              {pill3Text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
