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
    <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-md transition-all flex flex-col justify-between space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-0.5 rounded-full bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
            {report.type}
          </span>
          <span className="text-xs font-bold text-slate-500">
            {report.year}
          </span>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] text-[#006A4E] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display leading-snug">
              {tText(report.title)}
            </h3>
            <span className="text-[11px] text-slate-400">
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
        <div className="flex items-center gap-1.5 text-xs">
          {report.status === 'official' ? (
            <>
              <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
              <span className="text-[#00523C] font-bold text-[11px]">{isBn ? 'সার্টিফাইড অডিট' : 'Certified Audit'}</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 font-medium text-[11px]">{isBn ? 'যাচাই প্রক্রিয়াধীন' : 'Under Review'}</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="px-3.5 py-1.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{isBn ? 'ডাউনলোড' : 'Download'}</span>
        </button>
      </div>
    </div>
  );
};
