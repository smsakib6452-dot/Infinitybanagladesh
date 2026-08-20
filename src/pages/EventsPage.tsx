import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { EventCard } from '../components/EventCard';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Send,
  Sparkles
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { isBn } = useLanguage();
  const { events } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
      <SectionHeading
        badge={isBn ? 'কর্মশালা ও সভা' : 'Upcoming Gatherings'}
        title={isBn ? 'ইভেন্ট ও সম্মিলন' : 'Events & Volunteer Meetups'}
        subtitle={
          isBn
            ? 'টিম ইনফিনিটির স্বেচ্ছাসেবী ওরিয়েন্টেশন, প্রশিক্ষণ কর্মশালা ও সমন্বয় সভা।'
            : 'Join our physical and online gatherings to collaborate, plan relief drives, and build community.'
        }
      />

      <div className="space-y-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export const EventDetailPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { currentSlug, navigate } = useRouter();
  const { events } = useData();

  const event = events.find(e => e.slug === currentSlug) || events[0];

  const [rsvpName, setRsvpName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpPhone, setRsvpPhone] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [isRsvpDone, setIsRsvpDone] = useState(false);

  if (!event) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          {isBn ? 'ইভেন্ট পাওয়া যায়নি' : 'Event Not Found'}
        </h2>
        <button
          type="button"
          onClick={() => navigate('events')}
          className="px-4 py-2 bg-teal-800 text-white rounded-lg text-sm font-bold"
        >
          {isBn ? 'সকল ইভেন্টে ফিরে যান' : 'Back to Events'}
        </button>
      </div>
    );
  }

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvpDone(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate('events')}
        className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:text-teal-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isBn ? 'সকল ইভেন্টে ফিরে যান' : 'Back to All Events'}</span>
      </button>

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 border border-teal-200">
          {event.status === 'upcoming' ? (isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming Event') : event.status}
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
          {tText(event.title)}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-teal-700 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'তারিখ' : 'Date'}</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{event.date}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <Clock className="w-5 h-5 text-teal-700 shrink-0" />
            <div>
              <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'সময়' : 'Time'}</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900">{event.time}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="truncate">
              <span className="text-[11px] text-slate-500 font-bold block">{isBn ? 'স্থান' : 'Location'}</span>
              <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate block">{tText(event.location)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Photo */}
      <div className="rounded-3xl overflow-hidden shadow-xl aspect-16/9 bg-slate-100 border border-slate-200">
        <img
          src={event.imageUrl}
          alt={tText(event.title)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details & RSVP */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-xl font-bold text-slate-900 font-display">
              {isBn ? 'ইভেন্টের বিবরণ ও উদ্দেশ্য' : 'Event Overview & Agenda'}
            </h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {tText(event.description)}
            </p>
          </div>
        </div>

        {/* RSVP Card */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-display">
                {isBn ? 'ইভেন্টে অংশগ্রহণের নিবন্ধন' : 'RSVP & Event Registration'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'সীমিত আসন। দ্রুত নিবন্ধন সম্পন্ন করুন।' : 'Limited slots. Reserve your seat.'}
              </p>
            </div>

            {isRsvpDone ? (
              <div className="p-6 bg-teal-50 rounded-2xl border border-teal-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-teal-700 mx-auto" />
                <h4 className="font-bold text-teal-900 text-sm">
                  {isBn ? 'আপনার রেজিস্ট্রেশন নিশ্চিত হয়েছে!' : 'Seat Confirmed!'}
                </h4>
                <p className="text-xs text-teal-800">
                  {isBn
                    ? 'আপনার ফোনে বিস্তারিত সময়সূচি ও দিকনির্দেশনা পাঠানো হবে।'
                    : 'We have reserved your spot. Orientation details will be sent via SMS/Email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={e => setRsvpName(e.target.value)}
                  placeholder={isBn ? 'আপনার নাম' : 'Your Name'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />

                <input
                  type="email"
                  required
                  value={rsvpEmail}
                  onChange={e => setRsvpEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />

                <input
                  type="tel"
                  required
                  value={rsvpPhone}
                  onChange={e => setRsvpPhone(e.target.value)}
                  placeholder={isBn ? 'মোবাইল নম্বর' : 'Phone Number'}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isBn ? 'নিবন্ধন নিশ্চিত করুন' : 'Confirm RSVP'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
