import React, { useState, useEffect } from 'react';
import { FAQItem } from '../types';
import { HelpCircle, X, Check } from 'lucide-react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
  faq?: FAQItem | null;
  onSave: (data: Partial<FAQItem>) => void;
  isBn?: boolean;
}

export const FAQModal: React.FC<FAQModalProps> = ({
  isOpen,
  onClose,
  faq,
  onSave,
  isBn = false
}) => {
  const [questionEn, setQuestionEn] = useState('');
  const [questionBn, setQuestionBn] = useState('');
  const [answerEn, setAnswerEn] = useState('');
  const [answerBn, setAnswerBn] = useState('');
  const [category, setCategory] = useState('Organization');
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [active, setActive] = useState<boolean>(true);

  useEffect(() => {
    if (faq) {
      setQuestionEn(faq.question?.en || '');
      setQuestionBn(faq.question?.bn || '');
      setAnswerEn(faq.answer?.en || '');
      setAnswerBn(faq.answer?.bn || '');
      setCategory(faq.category || 'Organization');
      setDisplayOrder(faq.displayOrder || 1);
      setActive(faq.active !== false);
    } else {
      setQuestionEn('');
      setQuestionBn('');
      setAnswerEn('');
      setAnswerBn('');
      setCategory('Organization');
      setDisplayOrder(1);
      setActive(true);
    }
  }, [faq, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      question: { en: questionEn, bn: questionBn },
      answer: { en: answerEn, bn: answerBn },
      category,
      displayOrder: Number(displayOrder),
      active
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-2.5 text-[#006A4E] font-bold text-lg">
            <HelpCircle className="w-5 h-5 text-[#006A4E]" />
            <span>
              {faq
                ? (isBn ? 'প্রশ্নোত্তর সম্পাদনা করুন' : 'Edit FAQ Item')
                : (isBn ? 'নতুন প্রশ্নোত্তর যুক্ত করুন' : 'Add New FAQ Item')}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 leading-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Question Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Question (English) *</label>
              <input
                type="text"
                required
                value={questionEn}
                onChange={(e) => setQuestionEn(e.target.value)}
                placeholder="e.g. What is Infinity Bangladesh?"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Question (বাংলা) *</label>
              <input
                type="text"
                required
                value={questionBn}
                onChange={(e) => setQuestionBn(e.target.value)}
                placeholder="যেমন: ইনফিনিটি বাংলাদেশ কী?"
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
          </div>

          {/* Answer Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Answer (English) *</label>
              <textarea
                rows={5}
                required
                value={answerEn}
                onChange={(e) => setAnswerEn(e.target.value)}
                placeholder="Provide detailed and transparent answer in English..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Answer (বাংলা) *</label>
              <textarea
                rows={5}
                required
                value={answerBn}
                onChange={(e) => setAnswerBn(e.target.value)}
                placeholder="বিস্তারিত ও স্বচ্ছ উত্তর বাংলায় লিখুন..."
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
          </div>

          {/* Category, Sort Order, Active Status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              >
                <option value="Organization">Organization</option>
                <option value="Transparency">Transparency</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Donations">Donations</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-800">Publication Status</label>
              <div className="pt-1.5 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="faq-active"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="rounded text-[#006A4E] focus:ring-[#006A4E] h-4 w-4"
                />
                <label htmlFor="faq-active" className="text-xs font-bold text-slate-700 cursor-pointer">
                  {active ? 'Published / Visible' : 'Draft / Hidden'}
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#006A4E] hover:bg-[#00523C] text-white rounded-xl text-xs font-bold transition-colors shadow-warm-sm flex items-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{faq ? 'Update FAQ' : 'Save FAQ'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
