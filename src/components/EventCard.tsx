import React from 'react';
import { EventItem } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Calendar, Clock, MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getAssetUrl } from '../lib/utils/assetHelper';

interface EventCardProps {
  event: EventItem;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { isBn, tText } = useLanguage();
  const { navigate } = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row group">
      {/* Event Image */}
      <div className="relative md:w-5/12 aspect-16/9 md:aspect-auto overflow-hidden bg-slate-100 shrink-0">
        <img
          src={getAssetUrl(event.imageUrl)}
          alt={tText(event.title)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-teal-800 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-xs">
          {event.status === 'upcoming' ? (isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming Event') : event.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:w-7/12 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3 text-xs text-teal-800 font-semibold">
            <span className="flex items-center gap-1 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
              <Calendar className="w-3.5 h-3.5 text-teal-700" />
              {event.date}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              {event.time}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
            {tText(event.title)}
          </h3>

          <div className="flex items-start gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{tText(event.location)}</span>
          </div>

          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {tText(event.description)}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('events/detail', event.slug)}
            className="text-sm font-bold text-teal-800 hover:text-teal-900 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>{isBn ? 'বিস্তারিত ও নিবন্ধন' : 'Event Details & RSVP'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {event.registrationOpen && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {isBn ? 'রেজিস্ট্রেশন উন্মুক্ত' : 'Open Registration'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
