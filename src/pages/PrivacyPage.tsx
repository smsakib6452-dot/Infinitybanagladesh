import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Lock, Eye, HeartHandshake, UserCheck, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/80 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isBn ? 'গোপনীয়তা ও তথ্য সুরক্ষা নীতিমালা' : 'Privacy & Data Protection Policy'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isBn ? 'স্বচ্ছতা ও মানবিক মর্যাদায় আমাদের প্রতিশ্রুতি' : 'Privacy, Dignity & Transparency'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isBn ? 'সর্বশেষ হালনাগাদ: ২০২৫ | ইনফিনিটি বাংলাদেশ' : 'Last Updated: 2025 | Infinity Bangladesh (Team Infinity)'}
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isBn ? 'মানবিক মর্যাদা ও ফটোগ্রাফি' : 'Dignity & Media Consent'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'সুবিধাবঞ্চিত বা অসহায় ব্যক্তিদের অসম্মানজনক কোনো ছবি তোলা বা প্রকাশ করা কঠোরভাবে নিষিদ্ধ।'
                : 'Beneficiaries are never photographed in degrading or patronizing conditions. Consent is paramount.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
              {isBn ? 'স্বেচ্ছাসেবক তথ্য সুরক্ষা' : 'Volunteer Data Security'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'স্বেচ্ছাসেবকদের ব্যক্তিগত তথ্য, ফোন ও ঠিকানা কেবলমাত্র প্রাতিষ্ঠানিক সমন্বয়ে ব্যবহৃত হয়।'
                : 'Volunteer application data is stored encrypted and never shared with third parties.'}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">
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
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-700" />
              {isBn ? '১. ভূমিকা ও পরিচয়' : '1. Overview & Organizational Commitment'}
            </h2>
            <p>
              {isBn
                ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি — United for Humanity) একটি নিবেদিত যুব স্বেচ্ছাসেবী সামাজিক সংগঠন। আমরা আমাদের সমর্থক, স্বেচ্ছাসেবী, দাতা এবং সেবাগ্রহীতা সকলের গোপনীয়তা ও ব্যক্তিগত তথ্যের নিরাপত্তাকে সর্বোচ্চ গুরুত্ব দিই।'
                : 'Infinity Bangladesh (operating under the team identity "Team Infinity" and tagline "United for Humanity") is committed to protecting the privacy, dignity, and personal data of our volunteers, supporters, donors, and community beneficiaries.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-teal-700" />
              {isBn ? '২. কোন তথ্য সংগ্রহ করা হয়' : '2. Information We Collect'}
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

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Eye className="w-5 h-5 text-teal-700" />
              {isBn ? '৩. সুবিধাভোগীদের মর্যাদা ও মিডিয়া নীতিমালা' : '3. Beneficiary Dignity & Ethical Media Policy'}
            </h2>
            <p>
              {isBn
                ? 'টিম ইনফিনিটি দারিদ্র্য বা অসহায়ত্বকে বাণিজ্যিক প্রচারণার হাতিয়ার হিসেবে ব্যবহার করে না। আমাদের প্রতিটি ফটোগ্রাফি ও ভিডিওচিত্র শিশুদের অভিভাবক বা সুবিধাভোগী ব্যক্তিদের সুস্পষ্ট মৌখিক/লিখিত সম্মতির ভিত্তিতে এবং তাদের আত্মমর্যাদা অক্ষুণ্ণ রেখে সংগৃহীত হয়।'
                : 'Infinity Bangladesh strictly enforces ethical humanitarian media guidelines. We never capture or publish sensationalized images of beneficiaries in distress. All photographs used on this website are consent-grounded and respect individual human dignity.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-700" />
              {isBn ? '৪. তথ্যের সুরক্ষা ও তৃতীয় পক্ষ' : '4. Data Storage & Third-Party Protection'}
            </h2>
            <p>
              {isBn
                ? 'আমরা কখনোই কোনো বাণিজ্যিক বিজ্ঞাপনদাতা বা বাহ্যিক প্রচারক সংস্থার সাথে আমাদের ডেটাবেস শেয়ার বা বিক্রয় করি না। সংগৃহীত সকল তথ্য নিরাপদ সার্ভারে সংরক্ষিত থাকে।'
                : 'We strictly never sell, rent, or lease volunteer or donor contact lists to any commercial advertisers. Access to administrative systems is restricted to authorized executive committee members.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              {isBn ? '৫. যোগাযোগ ও অভিযোগ' : '5. Contact & Privacy Inquiries'}
            </h2>
            <p>
              {isBn
                ? 'আপনার কোনো তথ্য মুছে ফেলা বা সংশোধন করতে চাইলে আমাদের সাথে যোগাযোগ করুন: contact@infinitybangladesh.org [অফিসিয়াল ইমেইল]। '
                : 'If you have any questions or wish to exercise your right to access, rectify, or remove personal volunteer records, contact our desk at: contact@infinitybangladesh.org [OFFICIAL EMAIL].'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
