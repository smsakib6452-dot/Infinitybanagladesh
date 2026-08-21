import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { isBn } = useLanguage();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      qEn: 'What is Infinity Bangladesh and who runs it?',
      qBn: 'ইনফিনিটি বাংলাদেশ কী এবং কারা এটি পরিচালনা করেন?',
      aEn: 'Infinity Bangladesh (Team Infinity) is an authentic, youth-driven humanitarian and social organization founded in Hathazari, Chattogram in 2015. It is operated entirely by passionate youth volunteers, student leaders, and young professionals dedicated to upholding human dignity through transparent relief, education support, and community welfare.',
      aBn: 'ইনফিনিটি বাংলাদেশ (টিম ইনফিনিটি) ২০১৫ সালে চট্টগ্রামের হাটহাজারী থেকে যাত্রা শুরু করা একটি তারুণ্যনির্ভর সামাজিক ও মানবিক সংগঠন। দেশের সচেতন ছাত্রসমাজ ও তরুণ পেশাজীবীদের নিঃস্বার্থ স্বেচ্ছাসেবার মাধ্যমে সুবিধাবঞ্চিত শিশু, শ্রমজীবী মানুষ এবং প্রান্তিক জনগোষ্ঠীর মুখে হাসি ফোটানো এবং মর্যাদা রক্ষায় এটি পরিচালিত হয়।'
    },
    {
      qEn: 'How does Team Infinity ensure 100% financial transparency?',
      qBn: 'টিম ইনফিনিটি কীভাবে শতভাগ আর্থিক স্বচ্ছতা নিশ্চিত করে?',
      aEn: 'We enforce a radical transparency protocol: every Taka collected is directly tied to verified procurement receipts and public audit summaries. We never inflate statistics, and regular financial audit summaries are published on our Transparency Portal for open inspection.',
      aBn: 'আমরা কঠোর আর্থিক সততা নীতি মেনে চলি: সংগৃহীত প্রতিটি টাকার সরাসরি ক্রয় রসিদ এবং মাঠপর্যায়ের বিতরণ রিপোর্ট সংরক্ষণ করা হয়। কোনো প্রশাসনিক অপচয় বা ভুয়া হিসাব সহ্য করা হয় না এবং আমাদের স্বচ্ছতা পোর্টালে অডিট রিপোর্ট উন্মুক্ত রাখা হয়।'
    },
    {
      qEn: 'What is the "Dignity First" beneficiary principle?',
      qBn: 'উপকারভোগীর "মর্যাদাপূর্ণ মানবিক সেবা" নীতি কী?',
      aEn: 'Aid is a basic human right, not a favor. Team Infinity strictly opposes humiliating public photo ops of distressed individuals. We distribute seasonal gifts, food, and clothes with absolute respect, privacy, and beneficiary consent.',
      aBn: 'সহায়তা কোনো অনুগ্রহ নয়, মানুষের অধিকার। ক্যামেরার সামনে দরিদ্র মানুষকে অপদস্থ করে ছবি তোলার প্রচলিত ধারার বিপরীতে আমরা সম্পূর্ণ সম্মানজনক ও মর্যাদাপূর্ণ উপায়ে উপহারসামগ্রী পৌঁছে দেই।'
    },
    {
      qEn: 'How can I become a volunteer with Team Infinity?',
      qBn: 'আমি কীভাবে টিম ইনফিনিটির স্বেচ্ছাসেবক হতে পারি?',
      aEn: 'Anyone passionate about humanitarian work can apply through our Volunteer Registration page. Select your district, areas of interest (field distribution, logistics, photography, emergency response), and agree to our code of conduct. Our coordination desk will connect with you.',
      aBn: 'মানবিক কাজে আগ্রহী যেকোনো ব্যক্তি আমাদের স্বেচ্ছাসেবী নিবন্ধন পাতার মাধ্যমে আবেদন করতে পারেন। আপনার জেলা এবং আগ্রহের ক্ষেত্র (ত্রাণ বিতরণ, লজিস্টিকস, আলোকচিত্র ইত্যাদি) নির্বাচন করে আবেদন জমা দিলে আমাদের টিম আপনার সাথে যোগাযোগ করবে।'
    },
    {
      qEn: 'Can I donate to a specific campaign like Eid Joy or Winter Clothes?',
      qBn: 'আমি কি নির্দিষ্ট কোনো ক্যাম্পেইনে (যেমন: ঈদ আনন্দ বা শীতবস্ত্র) অনুদান দিতে পারি?',
      aEn: 'Yes! On our Donate page, you can select the specific campaign or project you wish to fund. Your donation will be exclusively earmarked for that cause and documented with a digital receipt.',
      aBn: 'হ্যাঁ! আমাদের অনুদান পাতায় গিয়ে আপনি নির্দিষ্ট ক্যাম্পেইন বা সাধারণ তহবিল নির্বাচন করতে পারেন। আপনার প্রদত্ত অনুদান নির্দিষ্ট সেই খাতেই ব্যয় করা হবে এবং একটি ডিজিটাল প্রাপ্তিস্বীকার রসিদ প্রদান করা হবে।'
    },
    {
      qEn: 'Where is Infinity Bangladesh headquartered?',
      qBn: 'ইনফিনিটি বাংলাদেশ-এর কেন্দ্রীয় কার্যালয় কোথায়?',
      aEn: 'Infinity Bangladesh was established in 2015 and is proudly rooted in Hathazari, Chattogram, Bangladesh, carrying out verified humanitarian relief operations throughout the region and country.',
      aBn: 'ইনফিনিটি বাংলাদেশ ২০১৫ সালে প্রতিষ্ঠিত হয়ে চট্টগ্রামের হাটহাজারীতে কেন্দ্রীয় কার্যালয় রেখে দেশব্যাপী মানবিক ও সামাজিক সেবামূলক কার্যক্রম পরিচালনা করছে।'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-14">
      <SectionHeading
        badge={isBn ? 'সাধারণ প্রশ্নোত্তর' : 'Knowledge Base'}
        title={isBn ? 'সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)' : 'Frequently Asked Questions'}
        subtitle={
          isBn
            ? 'সংগঠনের পরিচালনা, অনুদান, স্বচ্ছতা ও স্বেচ্ছাসেবা সংক্রান্ত গুরুত্বপূর্ণ তথ্যাবলী।'
            : 'Find answers to common questions about our mission, transparency, volunteering, and donation stewardship.'
        }
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-warm-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#006A4E] transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg flex items-center gap-3 font-display">
                  <HelpCircle className="w-5 h-5 text-[#006A4E] shrink-0" />
                  <span>{isBn ? faq.qBn : faq.qEn}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#006A4E]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F2]">
                  {isBn ? faq.aBn : faq.aEn}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
