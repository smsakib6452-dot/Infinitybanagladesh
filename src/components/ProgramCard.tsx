import React from 'react';
import { Program } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import {
  Gift,
  Utensils,
  Sun,
  BookOpen,
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const ICON_MAP: Record<string, React.ReactNode> = {
  Gift: <Gift className="w-6 h-6" />,
  Utensils: <Utensils className="w-6 h-6" />,
  Sun: <Sun className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  ShieldAlert: <ShieldAlert className="w-6 h-6" />
};

interface ProgramCardProps {
  program: Program;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();

  const icon = ICON_MAP[program.iconName] || <Sparkles className="w-6 h-6" />;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between hover:border-teal-300">
      <div className="space-y-4">
        {/* Icon & Category */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-colors">
            {icon}
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {program.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
          {tText(program.title)}
        </h3>

        {/* Short Description */}
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
          {tText(program.shortDescription)}
        </p>

        {/* Highlights bullets */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          {(isBn ? program.impactHighlights.bn : program.impactHighlights.en).slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-6">
        <button
          type="button"
          onClick={() => navigate('programs/detail', program.slug)}
          className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 group-hover:underline cursor-pointer"
        >
          <span>{isBn ? 'কর্মসূচির বিবরণ' : 'Explore Program'}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
