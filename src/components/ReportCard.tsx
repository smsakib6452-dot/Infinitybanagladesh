import React from 'react';
import { TransparencyReport } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Download, ShieldCheck, AlertCircle } from 'lucide-react';

interface ReportCardProps {
  report: TransparencyReport;
}

export const ReportCard: React.FC<ReportCardProps> = ({ report }) => {
  const { isBn, tText } = useLanguage();

  const handleDownload = () => {
    if (report.status === 'official' && report.fileUrl !== '#') {
      window.open(report.fileUrl, '_blank');
    } else {
      alert(
        isBn
          ? 'এই রিপোর্টটির অফিসিয়াল পিডিএফ ফাইলটি অডিট কমিটি কর্তৃক যাচাইয়ের প্রক্রিয়াধীন রয়েছে।'
          : 'The official certified PDF for this transparency report is undergoing final trustee verification.'
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-teal-50 text-teal-800 border border-teal-200">
            {report.type}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {report.year}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 leading-snug">
              {tText(report.title)}
            </h3>
            <span className="text-xs text-slate-400">
              {isBn ? 'আপলোড:' : 'Uploaded:'} {report.uploadDate}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {tText(report.description)}
        </p>
      </div>

      {/* Footer / Download Button */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          {report.status === 'official' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-semibold">{isBn ? 'সার্টিফাইড অডিট' : 'Certified Audit'}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 font-medium text-[11px]">{isBn ? 'যাচাই প্রক্রিয়াধীন' : 'Verification Underway'}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডাউনলোড / দেখুন' : 'View / Download'}</span>
        </button>
      </div>
    </div>
  );
};
