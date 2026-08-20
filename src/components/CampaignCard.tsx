import React from 'react';
import { Campaign } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  featured?: boolean;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, featured = false }) => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();

  const statusColors = {
    active: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    upcoming: 'bg-blue-100 text-blue-800 border-blue-300',
    completed: 'bg-slate-100 text-slate-700 border-slate-300'
  };

  const statusLabels = {
    active: isBn ? 'চলমান' : 'Active',
    upcoming: isBn ? 'আসন্ন' : 'Upcoming',
    completed: isBn ? 'সম্পন্ন' : 'Completed'
  };

  return (
    <div
      className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col ${
        featured ? 'ring-2 ring-teal-600/30' : ''
      }`}
    >
      {/* Campaign Image Container */}
      <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
        <img
          src={campaign.imageUrl}
          alt={tText(campaign.title)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

        {/* Status Badge & Category */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span
            className={`px-2.5 py-0.5 rounded-full text-xs font-bold border backdrop-blur-xs ${
              statusColors[campaign.status]
            }`}
          >
            {statusLabels[campaign.status]}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-900/70 text-white backdrop-blur-xs">
            {campaign.category}
          </span>
        </div>

        {/* Date / Time */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 font-medium">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-teal-300" />
            {campaign.date}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[50%]">
            <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="truncate">{tText(campaign.location)}</span>
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-2">
            {tText(campaign.title)}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
            {tText(campaign.description)}
          </p>
        </div>

        {/* Beneficiaries Note */}
        <div className="pt-2 border-t border-slate-100 text-xs text-slate-500">
          <strong className="text-slate-700">{isBn ? 'উপকারভোগী:' : 'Beneficiaries:'}</strong>{' '}
          <span className="line-clamp-1">{tText(campaign.beneficiaries)}</span>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('campaigns/detail', campaign.slug)}
            className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>{isBn ? 'বিস্তারিত দেখুন' : 'View Campaign'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => navigate('donate')}
            className="p-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 transition-colors inline-flex items-center gap-1 text-xs font-bold cursor-pointer"
            title="Support this campaign"
          >
            <Heart className="w-3.5 h-3.5 fill-teal-700 text-teal-700" />
            <span className="hidden sm:inline">{isBn ? 'সহায়তা' : 'Support'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
