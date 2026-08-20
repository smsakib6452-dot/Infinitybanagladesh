import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { useRouter } from '../context/RouterContext';
import { Handshake, Globe, ExternalLink, ShieldCheck, Building2, GraduationCap, Users2, Sparkles, Send } from 'lucide-react';
import { Toast } from '../components/Toast';

export const PartnersPage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { partners } = useData();
  const { navigate } = useRouter();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [partnerOrgName, setPartnerOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [partnershipType, setPartnershipType] = useState('Institutional');
  const [proposalDetails, setProposalDetails] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const categories = [
    { key: 'All', labelEn: 'All Collaborators', labelBn: 'সকল পার্টনার' },
    { key: 'Institutional', labelEn: 'Institutional & NGOs', labelBn: 'প্রাতিষ্ঠানিক ও এনজিও' },
    { key: 'Academic', labelEn: 'Academic & Campus Clubs', labelBn: 'শিক্ষা প্রতিষ্ঠান ও ক্যাম্পাস ক্লাব' },
    { key: 'Community Alliance', labelEn: 'Community Alliances', labelBn: 'সামাজিক জোট' },
    { key: 'Resource Partner', labelEn: 'Resource Partners', labelBn: 'রিসোর্স পার্টনার' },
  ];

  const filteredPartners = activeCategory === 'All'
    ? partners
    : partners.filter((p) => p.type === activeCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMessage(
      isBn
        ? 'আপনার পার্টনারশিপ প্রস্তাবনাটি সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি যোগাযোগ করবেন।'
        : 'Partnership inquiry submitted successfully. Our team will review your proposal.'
    );
    setShowToast(true);
    setPartnerOrgName('');
    setContactPerson('');
    setEmail('');
    setPhone('');
    setProposalDetails('');
  };

  const getPartnerIcon = (type: string) => {
    switch (type) {
      case 'Academic':
        return GraduationCap;
      case 'Community Alliance':
        return Users2;
      default:
        return Building2;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200/80 rounded-full text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Handshake className="w-3.5 h-3.5" />
            {isBn ? 'সহযোগী ও অংশীদারিত্ব' : 'Partners & Institutional Alliances'}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isBn ? 'ঐক্যের শক্তিতে মানবিক পরিবর্তন' : 'Collaborating for Greater Humanitarian Impact'}
          </h1>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            {isBn
              ? 'টিম ইনফিনিটি বিশ্বাস করে পারস্পরিক সহযোগিতা ও তরুণদের ঐক্যবদ্ধ প্রচেষ্টায় যেকোনো কঠিন মানবিক সংকট মোকাবিলা সম্ভব।'
              : 'Team Infinity partners with youth clubs, academic institutions, and verified social organizations across Bangladesh to amplify community service.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                activeCategory === cat.key
                  ? 'bg-teal-800 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {isBn ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPartners.map((partner) => {
            const Icon = getPartnerIcon(partner.type);
            const isPlaceholder = partner.name.includes('[OFFICIAL');

            return (
              <div
                key={partner.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                      {partner.type}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {partner.name}
                    </h3>
                    <p className="text-xs text-teal-700 font-medium mt-0.5">
                      {isBn ? 'সহযোগিতার বছর:' : 'Partnership Year:'} {partner.partnershipYear}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {tText(partner.description)}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  {isPlaceholder ? (
                    <span className="text-xs font-mono text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
                      [OFFICIAL PARTNER SLOT]
                    </span>
                  ) : (
                    partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-900 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        {isBn ? 'ওয়েবসাইট ভিজিট করুন' : 'Visit Website'}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )
                  )}
                  <span className="text-xs text-slate-400">Team Infinity Alliance</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Partnership Principles & Ethics */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-xl text-teal-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {isBn ? 'পার্টনারশিপ নীতি ও স্বচ্ছতা নীতিমালা' : 'Partnership Transparency & Ethics Policy'}
              </h2>
              <p className="text-xs text-slate-400">Infinity Bangladesh Collaboration Standards</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {isBn
              ? 'ইনফিনিটি বাংলাদেশ কোনো বাণিজ্যিক বিজ্ঞাপন বা স্বার্থের বিনিময় ব্যতীত কেবলমাত্র নিঃস্বার্থ মানবিক সেবা ও সামাজিক উন্নয়নের লক্ষ্যে অন্যান্য দায়িত্বশীল সংগঠনের সাথে যৌথ কার্যক্রম পরিচালনা করে। সকল যৌথ ক্যাম্পেইনে অনুদানের শতভাগ ব্যবহার ও সমন্বিত নিরীক্ষা প্রতিবেদন নিশ্চিত করা হয়।'
              : 'Team Infinity partners with organizations and student bodies exclusively for ethical humanitarian delivery. We never compromise on dignity, zero-leakage relief auditing, or non-commercial community empowerment.'}
          </p>
        </div>

        {/* Partnership Inquiry Form */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              {isBn ? 'আমাদের সাথে পার্টনারশিপ করুন' : 'Initiate a Collaborative Partnership'}
            </h2>
            <p className="text-slate-600 text-sm">
              {isBn
                ? 'আপনার শিক্ষা প্রতিষ্ঠান, যুব সংগঠন বা ক্লাবের সাথে যৌথ ক্যাম্পেইন আয়োজনে ফর্মটি পূরণ করুন।'
                : 'Submit a collaboration proposal for joint seasonal drives, student volunteering, or humanitarian relief.'}
            </p>
          </div>

          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isBn ? 'সংগঠন / প্রতিষ্ঠানের নাম *' : 'Organization / Institution Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={partnerOrgName}
                  onChange={(e) => setPartnerOrgName(e.target.value)}
                  placeholder="e.g. University Youth Club"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isBn ? 'দায়িত্বপ্রাপ্ত ব্যক্তির নাম *' : 'Contact Person Full Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. President / General Secretary"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isBn ? 'অফিসিয়াল ইমেইল *' : 'Official Email Address *'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contact@org.org"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isBn ? 'যোগাযোগের ফোন নম্বর *' : 'Phone / WhatsApp *'}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isBn ? 'পার্টনারশিপের ধরন' : 'Collaboration Type'}
              </label>
              <select
                value={partnershipType}
                onChange={(e) => setPartnershipType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm bg-white"
              >
                <option value="Institutional">Institutional / NGO Collaboration</option>
                <option value="Academic">University / College Student Club</option>
                <option value="Community Alliance">Community Service Alliance</option>
                <option value="Resource Partner">Resource / Logistics Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isBn ? 'প্রস্তাবনা বা সহযোগিতার সংক্ষিপ্ত বিবরণ *' : 'Brief Collaboration Proposal *'}
              </label>
              <textarea
                required
                rows={4}
                value={proposalDetails}
                onChange={(e) => setProposalDetails(e.target.value)}
                placeholder={isBn ? 'কী ধরনের যৌথ কার্যক্রমে আগ্রহী তা উল্লেখ করুন...' : 'Outline your proposed campaign, location, or joint initiative...'}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 outline-none text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-98"
            >
              <Send className="w-4 h-4" />
              {isBn ? 'প্রস্তাবনা জমা দিন' : 'Submit Partnership Proposal'}
            </button>
          </form>
        </div>
      </div>

      <Toast
        isOpen={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </div>
  );
};
