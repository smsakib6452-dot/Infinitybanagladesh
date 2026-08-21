import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { BANGLADESH_DISTRICTS } from '../data/bangladeshData';
import { getAssetUrl } from '../lib/utils/assetHelper';
import {
  Users,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  FileCheck,
  ExternalLink
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { volunteerSettings, addVolunteerApplication } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Chattogram');
  const [occupation, setOccupation] = useState('');
  const [bloodGroup, setBloodGroup] = useState('B+');
  const [interests, setInterests] = useState<string[]>(['Field Distribution & Relief']);
  const [motivation, setMotivation] = useState('');
  const [availability, setAvailability] = useState('Weekends');
  const [agreedCodeOfConduct, setAgreedCodeOfConduct] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRef, setSubmittedRef] = useState('');

  const interestOptions = [
    { id: 'Field Distribution & Relief', bn: 'মাঠপর্যায়ে ত্রাণ ও সামগ্রী বিতরণ', en: 'Field Distribution & Relief' },
    { id: 'Logistics & Packing', bn: 'লজিস্টিকস ও প্যাকেজিং ব্যবস্থাপনা', en: 'Logistics & Packing' },
    { id: 'Photography & Media', bn: 'আলোকচিত্র ও মিডিয়া ডকুমেন্টেশন', en: 'Photography & Media' },
    { id: 'Graphic Design & Writing', bn: 'গ্রাফিক ডিজাইন ও কনটেন্ট রাইটিং', en: 'Graphic Design & Writing' },
    { id: 'Event Coordination', bn: 'ইভেন্ট ও সভা সমন্বয়', en: 'Event Coordination' },
    { id: 'Emergency Response', bn: 'জরুরি দুর্যোগ মোকাবেলা দল', en: 'Emergency Response Team' }
  ];

  const handleInterestToggle = (id: string) => {
    setInterests(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreedCodeOfConduct) {
      alert(
        isBn
          ? 'অনুগ্রহ করে টিম ইনফিনিটির নৈতিক আচরণবিধির সাথে সম্মতি প্রকাশ করুন।'
          : 'Please accept the Team Infinity Volunteer Code of Conduct.'
      );
      return;
    }

    const newApp = {
      fullName,
      email,
      phone,
      district,
      occupation,
      bloodGroup,
      interests,
      motivation,
      availability,
      agreedCodeOfConduct
    };

    const ref = addVolunteerApplication(newApp);
    setSubmittedRef(ref);
    setIsSubmitted(true);
  };

  const benefitsList = isBn
    ? volunteerSettings.benefits?.bn || [
        'মাঠপর্যায়ে সরাসরি সামাজিক কাজের বাস্তব অভিজ্ঞতা ও টিমওয়ার্ক',
        'অফিসিয়াল সার্টিফিকেট ও নেতৃত্বের স্বীকৃতি',
        'দুর্যোগ মোকাবেলা, ইভেন্ট ব্যবস্থাপনা ও মাঠপর্যায়ের মানবিক প্রশিক্ষণ'
      ]
    : volunteerSettings.benefits?.en || [
        'Hands-on grassroots field experience across seasonal drives',
        'Official Certificate of Humanitarian Service & leadership recognition',
        'Disaster preparedness, event management & ethical volunteering training'
      ];

  const requirementsList = isBn
    ? volunteerSettings.requirements?.bn || [
        'মানবকল্যাণে কাজ করার আন্তরিক ইচ্ছা ও নিষ্ঠা',
        'সংগঠনের নৈতিক আচরণবিধি ও শিশু সুরক্ষা নীতিমালার প্রতি শ্রদ্ধাশীলতা'
      ]
    : volunteerSettings.requirements?.en || [
        'Dedication to selfless humanitarian service with compassion',
        'Strict adherence to Team Infinity Code of Conduct & child safety rules'
      ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      <SectionHeading
        badge={isBn ? 'স্বেচ্ছাসেবী পরিবারে স্বাগতম' : 'Be Part of Team Infinity'}
        title={tText(volunteerSettings.ctaText) || (isBn ? 'মানবতার সেবায় যোগ দিন' : 'Volunteer With Infinity Bangladesh')}
        subtitle={
          tText(volunteerSettings.description) ||
          (isBn
            ? 'আপনার মেধা, সময় এবং সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে টিম ইনফিনিটির সাথে যুক্ত হোন।'
            : 'Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.')
        }
      />

      {volunteerSettings.googleFormUrl && (
        <div className="bg-[#E6F3EF] border border-[#C2E2D7] rounded-3xl p-6 text-center space-y-3 shadow-warm-xs">
          <p className="text-xs sm:text-sm text-[#00523C] font-semibold">
            {isBn
              ? 'আমাদের গুগল ফর্মের মাধ্যমেও সরাসরি আবেদন করতে পারেন:'
              : 'You can also submit your application directly via our official Google Form:'}
          </p>
          <a
            href={volunteerSettings.googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs sm:text-sm font-bold shadow-warm-sm transition-all"
          >
            <span>{isBn ? 'গুগল ফর্মে আবেদন করুন' : 'Apply via Google Form'}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl border border-emerald-200 p-8 sm:p-12 text-center space-y-6 shadow-warm-lg animate-in zoom-in-95">
              <div className="w-16 h-16 bg-[#E6F3EF] text-[#006A4E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                  {isBn ? 'আবেদনটি সফলভাবে গৃহীত হয়েছে!' : 'Application Successfully Received!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isBn
                    ? 'টিম ইনফিনিটিতে আগ্রহ প্রকাশের জন্য ধন্যবাদ। আমাদের সমন্বয়ক শীঘ্রই আপনার সাথে যোগাযোগ করবেন।'
                    : 'Thank you for stepping forward for humanity. Our volunteer coordinator will reach out to you.'}
                </p>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] inline-block font-mono text-xs text-slate-700">
                {isBn ? 'ট্র্যাকিং রেফারেন্স:' : 'Application Ref:'} <span className="font-bold text-[#006A4E]">{submittedRef}</span>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  {isBn ? 'নতুন আবেদন ফরম' : 'Submit Another Application'}
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-10 space-y-6 shadow-warm-md"
            >
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-extrabold text-slate-900 font-display">
                  {isBn ? 'স্বেচ্ছাসেবী আবেদন ফরম' : 'Volunteer Application Form'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? 'সকল তথ্য সততা ও নির্ভুলতার সাথে পূরণ করুন।' : 'Please provide accurate and verifiable details.'}
                </p>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'সম্পূর্ণ নাম (Full Name) *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isBn ? 'উদা: শাহিদুল আলম' : 'e.g. Shahidul Alam'}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'মোবাইল নম্বর (Phone) *' : 'Phone Number *'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'ইমেইল (Email) *' : 'Email Address *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@mail.com"
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'বর্তমান জেলা (District) *' : 'District *'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  >
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'রক্তের গ্রুপ (Blood Group)' : 'Blood Group'}
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={(e) => setBloodGroup(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-800">
                    {isBn ? 'পেশা / শিক্ষা প্রতিষ্ঠান (Occupation / Institute)' : 'Occupation / Institution'}
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    placeholder={isBn ? 'উদা: শিক্ষার্থী, চট্টগ্রাম বিশ্ববিদ্যালয়' : 'e.g. Student, University of Chittagong'}
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                  />
                </div>
              </div>

              {/* Interests Checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  {isBn ? 'কাজের আগ্রহের ক্ষেত্রসমূহ (Interests) *' : 'Areas of Interest *'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map(opt => {
                    const isChecked = interests.includes(opt.id);
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleInterestToggle(opt.id)}
                        className={`p-3 rounded-2xl border text-xs flex items-center gap-2 cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#E6F3EF] border-[#C2E2D7] text-[#00523C] font-bold shadow-2xs'
                            : 'bg-[#FAF7F2] border-[#EAE3D9] text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${isChecked ? 'bg-[#006A4E] border-[#006A4E] text-white' : 'border-slate-300'}`}>
                          {isChecked && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                        <span>{isBn ? opt.bn : opt.en}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800">
                  {isBn ? 'টিম ইনফিনিটিতে যোগদানের কারণ ও অনুপ্রেরণা' : 'Motivation & Reason for Joining'}
                </label>
                <textarea
                  rows={3}
                  value={motivation}
                  onChange={(e) => setMotivation(e.target.value)}
                  placeholder={isBn ? 'আপনার অনুভূতি ও আগ্রহ সম্পর্কে সংক্ষেপে লিখুন...' : 'Briefly share why you want to serve with Team Infinity...'}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                />
              </div>

              {/* Code of Conduct Checkbox */}
              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedCodeOfConduct}
                    onChange={(e) => setAgreedCodeOfConduct(e.target.checked)}
                    className="mt-0.5 rounded text-[#006A4E] focus:ring-[#006A4E]"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed font-medium">
                    {isBn
                      ? 'আমি শপথ করছি যে টিম ইনফিনিটির নীতি ও মূল্যবোধ মেনে চলব, উপকারভোগীদের মানবিক মর্যাদা অক্ষুণ্ণ রাখব এবং যেকোনো রাজনৈতিক ও বাণিজ্যিক স্বার্থের ঊর্ধ্বে থেকে নিরপেক্ষভাবে সেবা প্রদান করব।'
                      : 'I agree to abide by the Team Infinity Volunteer Code of Conduct, respect beneficiary dignity, and serve selflessly.'}
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{isBn ? 'আবেদন জমা দিন' : 'Submit Volunteer Application'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-5 shadow-warm-sm">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Users className="w-5 h-5 text-[#006A4E]" />
              <span>{isBn ? 'কেন টিম ইনফিনিটিতে যোগ দেবেন?' : 'Why Join Team Infinity?'}</span>
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              {benefitsList.map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl border border-[#EAE3D9] p-6 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm font-display flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
              <span>{isBn ? 'স্বেচ্ছাসেবী নিরাপত্তা ও শর্তাবলী' : 'Code of Conduct & Safety'}</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              {requirementsList.map((req, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-[#006A4E] font-bold">&bull;</span>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
