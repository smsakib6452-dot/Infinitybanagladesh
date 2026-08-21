import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { faqs } = useData();

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const activeFaqs = faqs
    .filter(f => f.active !== false)
    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

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
        {activeFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={faq.id || index}
              className="bg-white rounded-3xl border border-[#EAE3D9] overflow-hidden shadow-warm-sm transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-[#006A4E] transition-colors cursor-pointer"
              >
                <span className="text-base sm:text-lg flex items-center gap-3 font-display">
                  <HelpCircle className="w-5 h-5 text-[#006A4E] shrink-0" />
                  <span>{tText(faq.question)}</span>
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-[#006A4E]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#FAF7F2]">
                  {tText(faq.answer)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
