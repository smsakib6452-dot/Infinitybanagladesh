import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge, VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  MessageSquare
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { isBn } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <SectionHeading
        badge={isBn ? 'যোগাযোগ ও তথ্যসেবা' : 'Connect With Us'}
        title={isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Get in Touch with Team Infinity'}
        subtitle={
          isBn
            ? 'যেকোনো পরামর্শ, সহযোগিতা বা তথ্যের প্রয়োজনে আমাদের সাথে নির্দ্বিধায় যোগাযোগ করুন।'
            : 'Whether you want to partner with us, ask a question, or visit our volunteer hubs, we are here for you.'
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          {isSent ? (
            <div className="bg-white rounded-3xl border border-teal-200 p-8 sm:p-12 text-center space-y-6 shadow-sm animate-in zoom-in-95">
              <div className="w-16 h-16 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  {isBn ? 'আপনার বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message Sent Successfully!'}
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isBn
                    ? 'আমাদের কমিউনিকেশন টিম দ্রুত আপনার সাথে যোগাযোগ করবে।'
                    : 'Thank you for reaching out. Our team will review your inquiry and respond promptly.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setMessage('');
                }}
                className="px-6 py-2 rounded-xl bg-teal-800 text-white text-xs font-bold"
              >
                {isBn ? 'আরেকটি বার্তা পাঠান' : 'Send Another Message'}
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-5 shadow-xs"
            >
              <div className="space-y-1 border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  {isBn ? 'সরাসরি বার্তা পাঠান' : 'Send Direct Message'}
                </h3>
                <p className="text-xs text-slate-500">
                  {isBn ? 'আমরা সাধারণত ২৪ ঘণ্টার মধ্যে উত্তর প্রদান করি।' : 'We usually respond within 24 hours.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{isBn ? 'আপনার নাম' : 'Your Name'} *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder={isBn ? 'নাম লিখুন' : 'Full Name'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{isBn ? 'ইমেইল' : 'Email Address'} *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{isBn ? 'মোবাইল নম্বর' : 'Phone Number'}</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">{isBn ? 'বিষয়' : 'Subject'} *</label>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                  >
                    <option value="General Inquiry">{isBn ? 'সাধারণ জিজ্ঞাসা' : 'General Inquiry'}</option>
                    <option value="Volunteer Query">{isBn ? 'স্বেচ্ছাসেবী সংক্রান্ত' : 'Volunteer Query'}</option>
                    <option value="Donation & Receipt">{isBn ? 'অনুদান ও রসিদ সংক্রান্ত' : 'Donation & Receipt'}</option>
                    <option value="Media & Partnership">{isBn ? 'মিডিয়া ও যৌথ উদ্যোগ' : 'Media & Partnership'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">{isBn ? 'বার্তা' : 'Message'} *</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder={isBn ? 'আপনার বার্তা লিখুন...' : 'Write your message here...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isBn ? 'বার্তা পাঠান' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Contact Info & Compliance Status */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-6 shadow-xl border border-slate-800">
            <div className="space-y-2">
              <h3 className="text-xl font-bold font-display text-white">
                {isBn ? 'যোগাযোগের মাধ্যম ও ঠিকানা' : 'Official Contact Channels'}
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'প্রাতিষ্ঠানিক তথ্যের সত্যতা নিশ্চিতে সকল যোগাযোগ মাধ্যম ট্রাস্টি বোর্ড অনুমোদিত।'
                  : 'Factual verification records maintained under Infinity Bangladesh charter.'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {/* Office Address */}
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white">{isBn ? 'কেন্দ্রীয় কার্যালয় / ঠিকানা:' : 'Registered Office:'}</strong>
                  <OfficialInfoBadge />
                  <p className="text-xs text-slate-400">Dhaka, Bangladesh</p>
                </div>
              </div>

              {/* Official Email */}
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white">{isBn ? 'অফিসিয়াল ইমেইল:' : 'Official Email:'}</strong>
                  <OfficialInfoBadge />
                </div>
              </div>

              {/* Helpline */}
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-white">{isBn ? 'হটলাইন / মোবাইল:' : 'Helpline:'}</strong>
                  <OfficialInfoBadge />
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <strong className="block text-white">{isBn ? 'সক্রিয় সময়:' : 'Operational Hours:'}</strong>
                  <p className="text-xs text-slate-300">Saturday – Thursday: 10:00 AM – 7:00 PM</p>
                  <p className="text-xs text-teal-300">Emergency Relief Desk: 24/7 Active</p>
                </div>
              </div>
            </div>
          </div>

          <VerifiedOrganizationPledge />
        </div>
      </div>
    </div>
  );
};
