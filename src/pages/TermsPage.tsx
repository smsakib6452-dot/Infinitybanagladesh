import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileCheck, Shield, Heart, Scale, Users, AlertCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const { isBn } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/80 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
            <FileCheck className="w-3.5 h-3.5" />
            {isBn ? 'ব্যবহারের শর্তাবলী ও নীতিমালা' : 'Terms of Service & Code of Conduct'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {isBn ? 'নীতিমালা ও স্বেচ্ছাসেবা আচরণবিধি' : 'Terms & Volunteer Ethics'}
          </h1>
          <p className="text-slate-500 text-sm">
            {isBn ? 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) | ২০২৫' : 'Infinity Bangladesh | Team Infinity — United for Humanity (2025)'}
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200/90 shadow-sm space-y-8 text-slate-700 text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-teal-700" />
              {isBn ? '১. সাধারণ ব্যবহারের শর্তাবলী' : '1. Website Terms & General Use'}
            </h2>
            <p>
              {isBn
                ? 'এই ওয়েবসাইটে প্রবেশ এবং ব্যবহারের মাধ্যমে আপনি ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি)-এর সকল প্রকাশ্য নীতিমালা ও নৈতিক মানদণ্ড মেনে নিতে সম্মত হচ্ছেন। এই প্ল্যাটফর্মটি কেবল খাঁটি মানবিক সেবা, সচেতনতা এবং স্বেচ্ছাসেবী সমন্বয়ের উদ্দেশ্যে পরিচালিত হয়।'
                : 'By accessing and utilizing the Infinity Bangladesh digital platform, you agree to comply with our organization principles and community guidelines. This platform is strictly dedicated to ethical social welfare, youth volunteering, and public transparency.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-700" />
              {isBn ? '২. স্বেচ্ছাসেবকদের আচরণবিধি (Code of Conduct)' : '2. Volunteer Code of Conduct & Ethics'}
            </h2>
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-2.5">
              <p className="font-semibold text-slate-900">
                {isBn ? 'টিম ইনফিনিটির প্রতিটি সদস্য ও স্বেচ্ছাসেবীকে নিম্নের মূলনীতিগুলো মেনে চলতে হবে:' : 'All registered Team Infinity volunteers pledge to uphold the following standards:'}
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-2">
                <li>
                  <strong>{isBn ? 'মর্যাদাপূর্ণ আচরণ:' : 'Dignified Treatment:'}</strong>{' '}
                  {isBn ? 'সকল সুবিধাভোগী, সহকর্মী এবং সম্প্রদায়ের সাথে সর্বোচ্চ সহানুভূতি ও শ্রদ্ধাশীল আচরণ করা।' : 'Treating all beneficiaries and community members with utmost dignity and compassion.'}
                </li>
                <li>
                  <strong>{isBn ? 'আর্থিক সততা:' : 'Zero Financial Misconduct:'}</strong>{' '}
                  {isBn ? 'সংগঠনের নামে কোনো অননুমোদিত চাঁদা বা অর্থ সংগ্রহ করা সম্পূর্ণ নিষিদ্ধ।' : 'No volunteer may collect unapproved funds or solicit private money in the name of Team Infinity.'}
                </li>
                <li>
                  <strong>{isBn ? 'অরাজনৈতিক ও নিরপেক্ষ:' : 'Non-Partisan & Secular Integrity:'}</strong>{' '}
                  {isBn ? 'ক্যাম্পেইনে কোনো প্রকার রাজনৈতিক, সাম্প্রদায়িক বা বৈষম্যমূলক অবস্থান প্রশ্রয় না দেওয়া।' : 'All humanitarian relief is delivered without discrimination based on faith, ethnicity, gender, or political belief.'}
                </li>
              </ul>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-teal-700" />
              {isBn ? '৩. অনুদান ও হিসাব নিরীক্ষা নীতিমালা' : '3. Donation & Utilization Integrity'}
            </h2>
            <p>
              {isBn
                ? 'টিম ইনফিনিটি-তে প্রেরিত অনুদান ১০০% নির্ধারিত ক্যাম্পেইনের প্রত্যক্ষ ব্যয় (যেমন: খাদ্যপণ্য, শিক্ষা উপকরণ, শীতবস্ত্র ক্রয় ও মাঠ বিতরণ)-এ ব্যয় করা হয়। সকল ব্যয় ভাউচার নিরীক্ষিত হয় এবং স্বচ্ছতা পৃষ্ঠায় রিপোর্ট প্রকাশ করা হয়।'
                : 'All voluntary donations directly fund field procurement (food grains, clothes, school bags, relief kits). Team Infinity maintains strict zero-administrative-leakage transparency and publishes periodic verification summaries.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-teal-700" />
              {isBn ? '৪. ব্র্যান্ড পরিচিতি ও অফিসিয়াল লোগো' : '4. Official Brand Identity & Logo Protection'}
            </h2>
            <p>
              {isBn
                ? '“Infinity Bangladesh”, “Team Infinity” এবং “United for Humanity” সংগঠনের অফিসিয়াল স্বত্বাধিকারভুক্ত ট্রেডমার্ক ও পরিচয়। সংগঠনের অফিশিয়াল অনুমতি ছাড়া এর লোগো বা নাম ব্যবহার করে কোনো বাণিজ্যিক বা অননুমোদিত প্রচারণা করা আইনত নিষিদ্ধ।'
                : 'The official logos, name "Infinity Bangladesh", identity "Team Infinity", and tagline "United for Humanity" represent the authentic intellectual property of the organization. Unauthorized reproduction or commercial impersonation is prohibited.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
