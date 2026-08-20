import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, Download, Printer, X, CheckCircle2, Heart } from 'lucide-react';
import { formatBDT } from '../lib/utils/formatters';

export interface DonationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationData: {
    receiptNumber: string;
    donorName: string;
    amountBDT: number;
    paymentMethod: string;
    campaignTitle: string;
    transactionId?: string;
    date: string;
    donationType: string;
  };
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  isOpen,
  onClose,
  donationData
}) => {
  const { isBn } = useLanguage();

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:shadow-none print:border-none">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-teal-200" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">Infinity Bangladesh</h3>
              <p className="text-xs text-teal-200 font-medium">Team Infinity — United for Humanity</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white print:hidden"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="text-center pb-4 border-b border-slate-100">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isBn ? 'অনুদান নিশ্চিতকরণ রসিদ' : 'Official Donation Receipt'}
            </span>
            <h4 className="text-2xl font-black text-slate-900 mt-1">
              {formatBDT(donationData.amountBDT, isBn)}
            </h4>
            <p className="text-xs text-slate-500 font-mono mt-1">
              {isBn ? 'রসিদ নং:' : 'Receipt No:'} <strong className="text-slate-800">{donationData.receiptNumber}</strong>
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3 text-sm">
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500">{isBn ? 'দাতার নাম:' : 'Donor Name:'}</span>
              <span className="font-semibold text-slate-900">{donationData.donorName}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500">{isBn ? 'ক্যাম্পেইন:' : 'Campaign / Purpose:'}</span>
              <span className="font-medium text-slate-900 text-right max-w-[220px] truncate">{donationData.campaignTitle}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
              <span className="text-slate-500">{isBn ? 'পেমেন্ট মেথড:' : 'Payment Method:'}</span>
              <span className="font-medium text-teal-800">{donationData.paymentMethod}</span>
            </div>
            {donationData.transactionId && (
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500">{isBn ? 'ট্রানজেকশন আইডি:' : 'Trx ID:'}</span>
                <span className="font-mono font-medium text-slate-800">{donationData.transactionId}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-500">{isBn ? 'তারিখ ও সময়:' : 'Date & Time:'}</span>
              <span className="text-slate-700 font-medium">{donationData.date}</span>
            </div>
          </div>

          <div className="bg-teal-50/60 border border-teal-100 rounded-xl p-3.5 flex items-start gap-3 text-xs text-teal-900">
            <Heart className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {isBn
                ? 'আপনার এই আন্তরিক অনুদান সুবিধাবঞ্চিত মানুষের কাছে সরাসরি ও স্বচ্ছতার সাথে পৌঁছাতে আমাদের তরুণ স্বেচ্ছাসেবকদের সহায়তা করবে। ধন্যবাদ।'
                : 'Thank you for your generous support. Your contribution directly empowers youth volunteers to deliver relief with complete transparency and dignity.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
            >
              <Printer className="w-4 h-4" />
              {isBn ? 'রসিদ প্রিন্ট করুন' : 'Print Receipt'}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-xl transition-colors"
            >
              {isBn ? 'বন্ধ করুন' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
