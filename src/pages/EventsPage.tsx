import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../context/RouterContext';
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-14">
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
  const { currentSlug } = useRouter();
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
        <h2 className="text-2xl font-bold text-slate-900 font-display">
          {isBn ? 'ইভেন্ট পাওয়া যায়নি' : 'Event Not Found'}
        </h2>
        <Link
          to="events"
          className="px-5 py-2.5 bg-[#006A4E] text-white rounded-2xl text-sm font-bold cursor-pointer inline-block"
        >
          {isBn ? 'সকল ইভেন্টে ফিরে যান' : 'Back to Events'}
        </Link>
      </div>
    );
  }

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRsvpDone(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Back button */}
      <Link
        to="events"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#006A4E] hover:text-[#00523C] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isBn ? 'সকল ইভেন্টে ফিরে যান' : 'Back to All Events'}</span>
      </Link>

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7]">
          {event.status === 'upcoming' ? (isBn ? 'আসন্ন ইভেন্ট' : 'Upcoming Event') : event.status}
        </span>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
          {tText(event.title)}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs text-slate-700 shadow-2xs">
            <Calendar className="w-4 h-4 text-[#006A4E]" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs text-slate-700 shadow-2xs">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white border border-[#EAE3D9] text-xs text-slate-700 shadow-2xs">
            <MapPin className="w-4 h-4 text-rose-600" />
            <span>{tText(event.location)}</span>
          </div>
        </div>
      </div>

      {/* Featured Banner */}
      <div className="rounded-[2.5rem] overflow-hidden shadow-warm-xl border-4 border-white aspect-16/9 bg-slate-100">
        <img
          src={event.imageUrl}
          alt={tText(event.title)}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description & RSVP Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 shadow-warm-sm">
          <h3 className="text-lg font-bold text-slate-900 font-display">
            {isBn ? 'ইভেন্টের বিবরণ ও উদ্দেশ্য' : 'Event Purpose & Schedule'}
          </h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {tText(event.description)}
          </p>
        </div>

        <div className="lg:col-span-5">
          {isRsvpDone ? (
            <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-8 text-center space-y-4 shadow-warm-md">
              <div className="w-12 h-12 bg-[#E6F3EF] text-[#006A4E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-slate-900 text-base font-display">
                {isBn ? 'রেজিস্ট্রেশন নিশ্চিত হয়েছে!' : 'RSVP Confirmed!'}
              </h4>
              <p className="text-xs text-slate-600">
                {isBn ? 'ইভেন্টের বিস্তারিত তথ্য ইমেইলে পাঠানো হবে।' : 'Check your email for access instructions.'}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleRsvpSubmit}
              className="bg-white rounded-3xl border border-[#EAE3D9] p-6 space-y-4 shadow-warm-md"
            >
              <h4 className="font-bold text-slate-900 text-base font-display">
                {isBn ? 'উপস্থিতি নিশ্চিত করুন (RSVP)' : 'Reserve Your Seat'}
              </h4>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{isBn ? 'আপনার নাম *' : 'Your Name *'}</label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">{isBn ? 'মোবাইল নম্বর *' : 'Phone *'}</label>
                <input
                  type="tel"
                  required
                  value={rsvpPhone}
                  onChange={(e) => setRsvpPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white text-xs font-bold shadow-2xs transition-colors cursor-pointer"
              >
                {isBn ? 'উপস্থিতি নিশ্চিত করুন' : 'Confirm RSVP'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
