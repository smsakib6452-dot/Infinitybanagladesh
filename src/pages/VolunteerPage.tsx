import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { BANGLADESH_DISTRICTS } from '../data/bangladeshData';
import {
  Users,
  CheckCircle2,
  ShieldCheck,
  Heart,
  Sparkles,
  ArrowRight,
  Send,
  HelpCircle,
  FileCheck
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { addVolunteerApplication } = useData();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <SectionHeading
        badge={isBn ? 'স্বেচ্ছাসেবী পরিবারে স্বাগতম' : 'Be Part of Team Infinity'}
        title={isBn ? 'মানবতার সেবায় যোগ দিন' : 'Volunteer With Infinity Bangladesh'}
        subtitle={
          isBn
            ? 'আপনার মেধা, সময় এবং সহমর্মিতা দিয়ে একজন মানুষের মুখে হাসি ফোটাতে টিম ইনফিনিটির সাথে যুক্ত হোন।'
            : 'Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action across Bangladesh.'
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Form Column */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-white rounded-3xl border border-teal-200 p-8 sm:p-12 text-center space-y-6 shadow-lg animate-in zoom-in-95">
              <div className="w-16 h-16 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  {isBn ? 'আপনার আবেদন সফলভাবে গৃহীত হয়েছে!' : 'Application Submitted Successfully!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {isBn
                    ? 'টিম ইনফিনিটি পরিবারের সাথে যুক্ত হওয়ার আগ্রহ প্রকাশ করায় আপনাকে ধন্যবাদ। আমাদের স্বেচ্ছাসেবী দল শীঘ্রই আপনার সাথে যোগাযোগ করবে।'
                    : 'Thank you for your noble commitment. Our volunteer coordination team will review your application and reach out.'}
                </p>
              </div>

              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 max-w-sm mx-auto text-xs space-y-1">
                <span className="text-slate-500 font-medium">{isBn ? 'আবেদন ট্র্যাকিং নম্বর:' : 'Tracking Reference:'}</span>
                <div className="font-mono text-sm font-bold text-teal-900">{submittedRef}</div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setEmail('');
                  setPhone('');
                  setMotivation('');
                }}
                className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold transition-colors"
              >
                {isBn ? 'নতুন আরেকটি আবেদন করুন' : 'Submit Another Application'}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6"
            >
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {isBn ? 'স্বেচ্ছাসেবী নিবন্ধন ফরম' : 'Volunteer Registration Form'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? 'সকল তথ্য নির্ভুলভাবে প্রদান করুন।' : 'Please provide accurate information.'}
                </p>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder={isBn ? 'যেমন: তানভীর আহমেদ' : 'e.g. Tanvir Ahmed'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'মোবাইল নম্বর' : 'Phone Number'} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder={isBn ? '০১৭XXXXXXXX' : '+880 17XXXXXXXX'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'ইমেইল অ্যাড্রেস' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'জেলা (District)' : 'District'} *
                  </label>
                  <select
                    value={district}
                    onChange={e => setDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  >
                    {BANGLADESH_DISTRICTS.map(d => (
                      <option key={d.nameEn} value={d.nameEn}>
                        {isBn ? d.nameBn : d.nameEn} ({d.division})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'বর্তমান পেশা / শিক্ষা প্রতিষ্ঠান' : 'Occupation / Institute'}
                  </label>
                  <input
                    type="text"
                    value={occupation}
                    onChange={e => setOccupation(e.target.value)}
                    placeholder={isBn ? 'যেমন: শিক্ষার্থী, ঢাকা বিশ্ববিদ্যালয়' : 'e.g. Student, University of Dhaka'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {isBn ? 'রক্তের গ্রুপ (ঐচ্ছিক)' : 'Blood Group (Optional)'}
                  </label>
                  <select
                    value={bloodGroup}
                    onChange={e => setBloodGroup(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Area of Interest */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-700 block">
                  {isBn ? 'কাজের আগ্রহের ক্ষেত্রসমূহ (একাধিক নির্বাচনযোগ্য)' : 'Areas of Interest (Select all that apply)'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {interestOptions.map(opt => {
                    const isSelected = interests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleInterestToggle(opt.id)}
                        className={`p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'bg-teal-50 border-teal-500 text-teal-900 font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>{isBn ? opt.bn : opt.en}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Availability */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'কখন সময় দিতে পারবেন?' : 'Availability'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {['Weekends', 'Emergency Relief', 'Flexible / Anytime', 'Events Only'].map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setAvailability(av)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                        availability === av
                          ? 'bg-teal-800 text-white border-teal-800'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motivation */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'টিম ইনফিনিটিতে যুক্ত হওয়ার প্রেরণা / উদ্দেশ্য' : 'Why do you want to join Team Infinity?'}
                </label>
                <textarea
                  rows={3}
                  value={motivation}
                  onChange={e => setMotivation(e.target.value)}
                  placeholder={
                    isBn
                      ? 'সংক্ষেপে আপনার আগ্রহ এবং মানবিক কাজের অভিজ্ঞতা সম্পর্কে লিখুন...'
                      : 'Share a few words about your passion for community service...'
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-teal-700"
                />
              </div>

              {/* Code of Conduct Checkbox */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedCodeOfConduct}
                    onChange={e => setAgreedCodeOfConduct(e.target.checked)}
                    className="mt-1 w-4 h-4 text-teal-700 rounded border-slate-300 focus:ring-teal-600 shrink-0"
                  />
                  <span className="text-xs text-slate-700 leading-relaxed">
                    {isBn
                      ? 'আমি টিম ইনফিনিটির মানবিক আচরণবিধি ও সম্মানজনক আচরণ নীতিমালার সাথে একমত পোষণ করছি। উপকারভোগীর মর্যাদা রক্ষায় আমি অঙ্গীকারবদ্ধ।'
                      : 'I agree to the Team Infinity Volunteer Code of Conduct, committing to uphold beneficiary dignity, honesty, and safety in all activities.'}
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isBn ? 'আবেদন জমা দিন' : 'Submit Volunteer Application'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 space-y-6">
          {/* Why Volunteer Card */}
          <div className="p-8 bg-gradient-to-br from-teal-900 to-slate-900 text-white rounded-3xl space-y-5 shadow-lg border border-teal-800">
            <div className="w-12 h-12 rounded-2xl bg-teal-800 text-teal-200 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-extrabold font-display">
              {isBn ? 'কেন টিম ইনফিনিটির অংশ হবেন?' : 'Why Join Team Infinity?'}
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-teal-100/90">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{isBn ? 'সরাসরি প্রান্তিক মানুষের উপকারে কাজ করার সুযোগ।' : 'Direct hands-on experience helping underserved people.'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{isBn ? 'নেতৃত্ব ও সাংগঠনিক দক্ষতা অর্জনের প্ল্যাটফর্ম।' : 'Leadership, project management, and field communication skills.'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{isBn ? 'দেশব্যাপী সচেতন তরুণদের একটি ইতিবাচক নেটওয়ার্ক।' : 'A supportive, ethical network of youth changemakers across Bangladesh.'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                <span>{isBn ? 'স্বেচ্ছাসেবা প্রশংসাপত্র ও স্বীকৃতি।' : 'Official volunteer certificates and recognitions for dedicated service.'}</span>
              </div>
            </div>
          </div>

          {/* Ethics Box */}
          <div className="p-6 bg-white rounded-3xl border border-slate-200 space-y-3 shadow-xs text-xs text-slate-600">
            <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-teal-700" />
              {isBn ? 'আমাদের স্বেচ্ছাসেবী আচরণবিধি' : 'Volunteer Ethical Guidelines'}
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'টিম ইনফিনিটির প্রতিটি সদস্য নিরপেক্ষতা, সহমর্মিতা এবং নিঃস্বার্থ সেবার নীতি মেনে কাজ করেন। কোনো প্রকার রাজনৈতিক, বাণিজ্যিক বা অমর্যাদাকর আচরণ গ্রহণযোগ্য নয়।'
                : 'Team Infinity members operate on zero discrimination, strict respect for beneficiary privacy, and selfless stewardship.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
