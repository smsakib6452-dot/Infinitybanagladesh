import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
      className={`inline-flex items-center gap-1.5 font-medium rounded-md border text-amber-900 bg-amber-50 border-amber-200 ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      } ${className}`}
      title="Verified factual record compliant with Infinity Bangladesh charter"
    >
      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
      <span>{text}</span>
    </span>
  );
};

export const VerifiedOrganizationPledge: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="bg-teal-900 text-white rounded-2xl p-6 sm:p-8 shadow-lg border border-teal-800">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-teal-800 flex items-center justify-center text-teal-300 shrink-0 border border-teal-700">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
            {isBn ? 'ইনফিনিটি বাংলাদেশ-এর সত্যতা ও স্বচ্ছতার অঙ্গীকার' : 'Strict Organizational Transparency & Truthfulness'}
          </h3>
          <p className="text-sm text-teal-100/90 leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটি কোনো অতিরঞ্জিত পরিসংখ্যান বা কৃত্রিম দাবি প্রকাশ করে না। সকল তথ্য, অনুদান এবং কার্যক্রমের হিসাব স্বচ্ছতার সাথে নিরপেক্ষভাবে সংরক্ষণ করা হয়।'
              : 'Infinity Bangladesh operates strictly on factual reporting. Beneficiary counts, campaign expenditures, and administrative records are audited and verified before publication. We hold zero tolerance for fabricated stats or poverty exploitation.'}
          </p>
          <div className="pt-1 flex flex-wrap gap-2 text-xs text-teal-300">
            <span className="bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-800/80">
              {isBn ? '১০০% স্বচ্ছ হিসাব' : '100% Audited Fund Tracking'}
            </span>
            <span className="bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-800/80">
              {isBn ? 'মর্যাদাপূর্ণ মানবিক সহায়তা' : 'Dignified Beneficiary Ethics'}
            </span>
            <span className="bg-teal-950/60 px-2.5 py-1 rounded-md border border-teal-800/80">
              {isBn ? 'তারুণ্যনির্ভর সেবাব্রত' : 'Volunteer-Driven Stewardship'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
