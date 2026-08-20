import React from 'react';
import { ImpactMetric } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Users, HeartHandshake, Flag, Sparkles } from 'lucide-react';

const METRIC_ICONS: Record<string, React.ReactNode> = {
  Users: <Users className="w-7 h-7" />,
  HeartHandshake: <HeartHandshake className="w-7 h-7" />,
  Flag: <Flag className="w-7 h-7" />,
  Sparkles: <Sparkles className="w-7 h-7" />
};

interface ImpactCounterProps {
  metric: ImpactMetric;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({ metric }) => {
  const { isBn, tText } = useLanguage();

  const icon = METRIC_ICONS[metric.iconName] || <Sparkles className="w-7 h-7" />;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col items-center text-center space-y-3 relative overflow-hidden group">
      <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          {metric.value}
        </div>
        <h4 className="text-base font-bold text-teal-900">
          {tText(metric.label)}
        </h4>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
        {tText(metric.description)}
      </p>

      <div className="absolute top-2 right-2 text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
        Verified
      </div>
    </div>
  );
};
