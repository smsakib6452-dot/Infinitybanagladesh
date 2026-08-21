import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, HeartHandshake, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="py-10 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E6F3EF] border border-[#C2E2D7] rounded-full text-[#00523C] text-xs font-extrabold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006A4E]" />
            <span>{isBn ? 'গোপনীয়তা ও তথ্য সুরক্ষা নীতিমালা' : 'Privacy & Data Protection Policy'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            {isBn ? 'স্বচ্ছতা ও মানবিক মর্যাদায় আমাদের প্রতিশ্রুতি' : 'Privacy, Dignity & Transparency'}
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm">
            {isBn ? 'সর্বশেষ হালনাগাদ: ২০২৬ | ইনফিনিটি বাংলাদেশ (প্রতিষ্ঠিত ২০১৫, হাটহাজারী)' : 'Last Updated: 2026 | Infinity Bangladesh (Established 2015, Hathazari)'}
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-warm-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              {isBn ? 'মানবিক মর্যাদা ও ফটোগ্রাফি' : 'Dignity & Media Consent'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'সুবিধাবঞ্চিত বা অসহায় ব্যক্তিদের অসম্মানজনক কোনো ছবি তোলা বা প্রকাশ করা কঠোরভাবে নিষিদ্ধ।'
                : 'Beneficiaries are never photographed in degrading or patronizing conditions. Consent is paramount.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-warm-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              {isBn ? 'স্বেচ্ছাসেবক তথ্য সুরক্ষা' : 'Volunteer Data Security'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'স্বেচ্ছাসেবকদের ব্যক্তিগত তথ্য কেবলমাত্র প্রাতিষ্ঠানিক সমন্বয়ে ব্যবহৃত হয়।'
                : 'Volunteer application data is stored securely and never shared with third parties.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EAE3D9] shadow-warm-sm space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base font-display">
              {isBn ? 'দাতার আর্থিক নিরাপত্তা' : 'Donor Privacy & Audit'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'অনুদানের তথ্য হিসাব নিরীক্ষার স্বার্থে সংরক্ষিত থাকলেও সংবেদনশীল আর্থিক তথ্য কখনো প্রকাশ করা হয় না।'
                : 'Donation transaction records are retained solely for public auditing without compromising sensitive identity.'}
            </p>
          </div>
        </div>

        {/* Detailed Policy Content */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#EAE3D9] shadow-warm-sm space-y-8 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-display">
              <FileText className="w-5 h-5 text-[#006A4E]" />
              <span>{isBn ? '১. ভূমিকা ও পরিচয়' : '1. Overview & Organizational Commitment'}</span>
            </h2>
            <p>
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি — United for Humanity) ২০১৫ সালে প্রতিষ্ঠিত একটি যুব স্বেচ্ছাসেবী সামাজিক সংগঠন। আমরা আমাদের সমর্থক, স্বেচ্ছাসেবী, দাতা এবং সেবাগ্রহীতা সকলের গোপনীয়তা ও ব্যক্তিগত তথ্যের নিরাপত্তাকে সর্বোচ্চ গুরুত্ব দিই।'
                : 'Infinity Bangladesh (operating under the team identity "Team Infinity" and tagline "United for Humanity", established in Hathazari in 2015) is committed to protecting the privacy, dignity, and personal data of our volunteers, supporters, donors, and community beneficiaries.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 font-display">
              <CheckCircle2 className="w-5 h-5 text-[#006A4E]" />
              <span>{isBn ? '২. কোন তথ্য সংগ্রহ করা হয়' : '2. Information We Collect'}</span>
            </h2>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600">
              <li>
                <strong>{isBn ? 'স্বেচ্ছাসেবী নিবন্ধন:' : 'Volunteer Applications:'}</strong>{' '}
                {isBn ? 'নাম, ইমেইল, ফোন নম্বর, জেলা, উপজেলা, বয়স, পেশা ও রক্তগ্রুপ।' : 'Full name, email address, phone number, district, upazila, age, occupation, blood group, and skills.'}
              </li>
              <li>
                <strong>{isBn ? 'অনুদান রেকর্ড:' : 'Donation Logs:'}</strong>{' '}
                {isBn ? 'দাতার নাম (বা বেনামী অনুরোধ), ইমেইল, অনুদানের পরিমাণ, লেনদেন বা রেফারেন্স আইডি।' : 'Donor name (or anonymous request), contact email/phone, contributed amount, and transaction reference ID.'}
              </li>
              <li>
                <strong>{isBn ? 'যোগাযোগ বার্তা:' : 'Contact Inquiries:'}</strong>{' '}
                {isBn ? 'আপনার প্রেরিত বার্তা, নাম, বিষয় এবং যোগাযোগের মাধ্যম।' : 'Inquiry subject, sender name, message contents, and email address.'}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
