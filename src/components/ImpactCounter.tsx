import React from 'react';
import { ImpactMetric } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { Users, HeartHandshake, Flag, Sparkles, Award, MapPin } from 'lucide-react';

const METRIC_ICONS: Record<string, React.ReactNode> = {
  Users: <Users className="w-6 h-6 text-[#006A4E]" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6 text-[#006A4E]" />,
  Flag: <Flag className="w-6 h-6 text-[#006A4E]" />,
  Sparkles: <Sparkles className="w-6 h-6 text-[#D97706]" />,
  Award: <Award className="w-6 h-6 text-[#006A4E]" />,
  MapPin: <MapPin className="w-6 h-6 text-[#006A4E]" />
};

interface ImpactCounterProps {
  metric: ImpactMetric;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({ metric }) => {
  const { tText } = useLanguage();

  const icon = METRIC_ICONS[metric.iconName] || <Sparkles className="w-6 h-6 text-[#006A4E]" />;

  return (
    <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col items-center text-center space-y-3 relative overflow-hidden group hover:-translate-y-1">
      {/* Decorative top accent */}
      <div className="w-12 h-1 bg-gradient-to-r from-[#006A4E] to-[#D97706] rounded-full" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-[#E6F3EF] border border-[#C2E2D7] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      {/* Number and Label */}
      <div className="space-y-1">
        <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {metric.value}
        </div>
        <h4 className="text-sm sm:text-base font-bold text-[#006A4E]">
          {tText(metric.label)}
        </h4>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
        {tText(metric.description)}
      </p>

      {/* Verified Groundwork Marker */}
      <div className="pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[10px] font-bold text-amber-700 uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>Verified Groundwork</span>
      </div>
    </div>
  );
};
