import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { SectionHeading } from '../components/SectionHeading';
import { OfficialInfoBadge, VerifiedOrganizationPledge } from '../components/OfficialInfoBadge';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Receipt,
  FileText,
  AlertCircle,
  Copy,
  Check,
  Send,
  Building,
  Smartphone
} from 'lucide-react';

export const DonatePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { campaigns, addDonationRecord } = useData();

  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState(campaigns[0]?.title.en || 'General Humanitarian Fund');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Bank Transfer' | 'In-Kind / Physical Support'>('bKash');
  const [amount, setAmount] = useState<number>(1000);
  const [transactionId, setTransactionId] = useState('');
  const [note, setNote] = useState('');

  const [receiptData, setReceiptData] = useState<{
    receiptNumber: string;
    donorName: string;
    amount: number;
    campaign: string;
    date: string;
    method: string;
    trxId?: string;
  } | null>(null);

  const [copiedBank, setCopiedBank] = useState(false);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveName = isAnonymous ? (isBn ? 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী' : 'Anonymous Supporter') : donorName;

    const record = {
      donorName: effectiveName,
      isAnonymous,
      donorEmail,
      donorPhone,
      amount,
      currency: 'BDT',
      campaignTitle: selectedCampaign,
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      note: note.trim() || undefined
    };

    const newRecord = addDonationRecord(record);

    setReceiptData({
      receiptNumber: newRecord.receiptNumber,
      donorName: effectiveName,
      amount,
      campaign: selectedCampaign,
      date: new Date().toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      method: paymentMethod,
      trxId: transactionId.trim() || undefined
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      <SectionHeading
        badge={isBn ? 'স্বচ্ছ ও দায়িত্বশীল অনুদান' : 'Honest Fund Stewardship'}
        title={isBn ? 'আপনার সহায়তায় হাসবে সুবিধাবঞ্চিত মানুষ' : 'Support Our Humanitarian Missions'}
        subtitle={
          isBn
            ? 'টিম ইনফিনিটি সংগৃহীত প্রতিটি অনুদানের যথাযথ ব্যবহার নিশ্চিত করে এবং পূর্ণাঙ্গ অডিট রিপোর্ট প্রকাশ করে।'
            : 'Every Taka donated directly funds field procurement for underprivileged children and distressed families.'
        }
      />

      {/* Verified Org Pledge */}
      <VerifiedOrganizationPledge />

      {/* Official Payment Channels Status */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
            <Building className="w-5 h-5 text-teal-800" />
            {isBn ? 'অফিসিয়াল একাউন্ট ও পেমেন্ট চ্যানেল' : 'Official Payment Channels & Verification Status'}
          </h3>
          <p className="text-xs text-slate-500">
            {isBn
              ? 'প্রাতিষ্ঠানিক সত্যতা নিশ্চিতকরণ নির্দেশিকা (Rule #1) অনুযায়ী নিচের তথ্যগুলো ট্রাস্টি বোর্ড অনুমোদিত।'
              : 'Pursuant to our organizational fact verification charter, official accounts are documented below.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* bKash */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900 text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-rose-700" />
                bKash (বিকাশ)
              </span>
              <OfficialInfoBadge />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'অফিসিয়াল বিকাশ মার্চেন্ট নম্বর শীঘ্রই এখানে সংযুক্ত করা হবে। বিকল্প তথ্যের জন্য যোগাযোগ পাতায় দেখুন।'
                : 'Official bKash merchant account is pending trustee registration.'}
            </p>
          </div>

          {/* Nagad */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-amber-700" />
                Nagad (নগদ)
              </span>
              <OfficialInfoBadge />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'অফিসিয়াল নগদ হিসাব নম্বর যাচাই প্রক্রিয়াধীন রয়েছে।'
                : 'Official Nagad organizational number is undergoing trustee verification.'}
            </p>
          </div>

          {/* Bank */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-slate-700" />
                Bank Transfer
              </span>
              <OfficialInfoBadge />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isBn
                ? 'সংগঠনের প্রাতিষ্ঠানিক ব্যাংক একাউন্ট সংক্রান্ত তথ্য অনুমোদনের পর হালনাগাদ করা হবে।'
                : 'Official institutional bank accounts are reserved for audited releases.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Donation Form & Receipt Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Donation Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleDonationSubmit}
            className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs"
          >
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <h3 className="text-xl font-bold text-slate-900 font-display">
                {isBn ? 'অনুদান নিশ্চিতকরণ ও রসিদ সংগ্রহ' : 'Donation Pledge & Digital Receipt'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn
                  ? 'আপনার অনুদান সরাসরি লিপিবদ্ধ হবে এবং তৎক্ষণাৎ একটি অফিসিয়াল স্বীকৃতি রসিদ প্রস্তুত হবে।'
                  : 'Submit your contribution details to generate an instant audited digital receipt.'}
              </p>
            </div>

            {/* Campaign Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {isBn ? 'কোন কার্যক্রমে অনুদান দিতে চান?' : 'Select Campaign / Humanitarian Fund'} *
              </label>
              <select
                value={selectedCampaign}
                onChange={e => setSelectedCampaign(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
              >
                <option value="General Humanitarian Fund">
                  {isBn ? 'সাধারণ মানবিক তহবিল (সর্বোচ্চ প্রয়োজনে বণ্টন)' : 'General Humanitarian Fund (Where needed most)'}
                </option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.title.en}>
                    {tText(c.title)} ({c.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Selection */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                {isBn ? 'অনুদানের পরিমাণ (BDT)' : 'Donation Amount (BDT)'} *
              </label>
              <div className="flex flex-wrap gap-2">
                {presetAmounts.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setAmount(val)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                      amount === val
                        ? 'bg-teal-800 text-white border-teal-800'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ৳{val.toLocaleString('en-US')}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">৳</span>
                <input
                  type="number"
                  min="50"
                  required
                  value={amount}
                  onChange={e => setAmount(Number(e.target.value))}
                  placeholder="Custom Amount"
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">
                {isBn ? 'পেমেন্ট মাধ্যম' : 'Payment Method'} *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['bKash', 'Nagad', 'Bank Transfer', 'In-Kind / Physical Support'] as const).map(method => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-colors ${
                      paymentMethod === method
                        ? 'bg-teal-50 border-teal-600 text-teal-900 font-bold'
                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Donor Information */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700">
                  {isBn ? 'অনুদাতার তথ্য' : 'Donor Information'}
                </label>
                <label className="flex items-center gap-2 text-xs text-teal-800 font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={e => setIsAnonymous(e.target.checked)}
                    className="w-3.5 h-3.5 text-teal-700 rounded border-slate-300"
                  />
                  <span>{isBn ? 'নাম গোপন রাখুন (Anonymous)' : 'Keep Anonymous'}</span>
                </label>
              </div>

              {!isAnonymous && (
                <div className="space-y-1.5">
                  <input
                    type="text"
                    required={!isAnonymous}
                    value={donorName}
                    onChange={e => setDonorName(e.target.value)}
                    placeholder={isBn ? 'আপনার পূর্ণ নাম' : 'Your Full Name'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  value={donorEmail}
                  onChange={e => setDonorEmail(e.target.value)}
                  placeholder={isBn ? 'ইমেইল অ্যাড্রেস (রসিদের জন্য)' : 'Email for Receipt'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
                <input
                  type="tel"
                  value={donorPhone}
                  onChange={e => setDonorPhone(e.target.value)}
                  placeholder={isBn ? 'মোবাইল নম্বর (ঐচ্ছিক)' : 'Mobile (Optional)'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <input
                  type="text"
                  value={transactionId}
                  onChange={e => setTransactionId(e.target.value)}
                  placeholder={isBn ? 'ট্রানজেকশন আইডি / রেফারেন্স নম্বর (প্রযোজ্য ক্ষেত্রে)' : 'Transaction ID / Reference (if paid)'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
              </div>

              <div className="space-y-1.5">
                <textarea
                  rows={2}
                  value={note}
                  onChange={e => setNote(e.target.value)}
                  placeholder={isBn ? 'কোনো শুভকামনা বা বিশেষ নির্দেশনা (ঐচ্ছিক)...' : 'Words of support or prayer (optional)...'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-teal-700 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Receipt className="w-4 h-4" />
              <span>{isBn ? 'অনুদানের তথ্য সংরক্ষণ ও রসিদ তৈরি করুন' : 'Confirm Donation & Generate Receipt'}</span>
            </button>
          </form>
        </div>

        {/* Digital Receipt Output Panel */}
        <div className="lg:col-span-5 space-y-6">
          {receiptData ? (
            <div className="bg-white rounded-3xl border-2 border-teal-700/40 p-6 sm:p-8 space-y-6 shadow-xl animate-in zoom-in-95">
              {/* Receipt Header */}
              <div className="text-center space-y-2 border-b border-slate-200 pb-4">
                <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
                  <span>Official Donation Acknowledgement</span>
                </div>
                <h4 className="text-lg font-extrabold text-slate-900 font-display">
                  Infinity Bangladesh (টিম ইনফিনিটি)
                </h4>
                <p className="text-[11px] text-slate-500">
                  Tagline: United for Humanity &bull; Bangladesh
                </p>
              </div>

              {/* Receipt Details */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'রসিদ নং:' : 'Receipt No:'}</span>
                  <span className="font-mono font-bold text-slate-900">{receiptData.receiptNumber}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'অনুদাতা:' : 'Donor:'}</span>
                  <span className="font-bold text-slate-900">{receiptData.donorName}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'ক্যাম্পেইন/তহবিল:' : 'Allocated Program:'}</span>
                  <span className="font-medium text-slate-800 text-right max-w-[60%]">{receiptData.campaign}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'পেমেন্ট মাধ্যম:' : 'Payment Method:'}</span>
                  <span className="font-medium text-slate-800">{receiptData.method}</span>
                </div>

                {receiptData.trxId && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">{isBn ? 'রেফারেন্স / TrxID:' : 'Reference:'}</span>
                    <span className="font-mono text-slate-700">{receiptData.trxId}</span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'তারিখ:' : 'Date:'}</span>
                  <span className="text-slate-800">{receiptData.date}</span>
                </div>

                {/* Amount Highlight */}
                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-900 uppercase">
                    {isBn ? 'গৃহীত অনুদান' : 'Contribution'}
                  </span>
                  <span className="text-xl font-extrabold text-teal-950 font-display">
                    BDT ৳{receiptData.amount.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              {/* Receipt Footer Statement */}
              <div className="text-[11px] text-slate-500 text-center leading-relaxed">
                {isBn
                  ? 'এই রসিদটি ডিজিটালভাবে প্রস্তুতকৃত। আপনার অনুদান সরাসরি সুবিধাবঞ্চিত মানুষের সেবায় ব্যবহৃত হবে।'
                  : 'This is an official digital record of your generous support. Thank you for standing United for Humanity.'}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  {isBn ? 'রসিদ প্রিন্ট / সংরক্ষণ' : 'Print / Save Receipt'}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-3xl border border-dashed border-slate-300 p-8 text-center space-y-4">
              <Receipt className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-700">
                  {isBn ? 'ডিজিটাল অনুদান রসিদ প্রিভিউ' : 'Digital Donation Receipt Preview'}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
                  {isBn
                    ? 'বামপাশের ফরম পূরণ করে অনুদান জমা দিন। আপনার জন্য তাৎক্ষণিক ডিজিটাল রসিদ তৈরি হবে।'
                    : 'Fill out the pledge form to preview and generate your official digital donation receipt.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
