import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { CampaignCard } from '../components/CampaignCard';
import { Flag, Filter } from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { campaigns } = useData();

  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredCampaigns = campaigns.filter(c => {
    if (statusFilter === 'all') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <SectionHeading
        badge={isBn ? 'মাঠপর্যায়ের উদ্যোগ' : 'Field Initiatives'}
        title={isBn ? 'আমাদের ক্যাম্পেইনসমূহ' : 'Our Campaigns'}
        subtitle={
          isBn
            ? 'সুবিধাবঞ্চিত শিশু ও দারিদ্র্যপীড়িত জনগোষ্ঠীর সহায়তায় পরিচালিত সকল মৌসুমী ও নিয়মিত ক্যাম্পেইন।'
            : 'Explore all active, upcoming, and completed humanitarian campaigns organized by Team Infinity across Bangladesh.'
        }
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-teal-700" />
          <span>{isBn ? 'ফিল্টার করুন:' : 'Filter Status:'}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'all'
                ? 'bg-teal-800 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'সকল ক্যাম্পেইন' : 'All Campaigns'} ({campaigns.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('active')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'active'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'চলমান' : 'Active'} ({campaigns.filter(c => c.status === 'active').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('upcoming')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'upcoming'
                ? 'bg-blue-700 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'আসন্ন' : 'Upcoming'} ({campaigns.filter(c => c.status === 'upcoming').length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('completed')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              statusFilter === 'completed'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {isBn ? 'সম্পন্ন' : 'Completed'} ({campaigns.filter(c => c.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Grid of campaigns */}
      {filteredCampaigns.length === 0 ? (
        <div className="text-center py-16 p-6 bg-white rounded-3xl border border-slate-200 space-y-2">
          <Flag className="w-10 h-10 text-slate-300 mx-auto" />
          <p className="font-bold text-slate-700">
            {isBn ? 'এই ক্যাটাগরিতে কোনো ক্যাম্পেইন নেই।' : 'No campaigns found for this filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map(campaign => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )}
    </div>
  );
};
