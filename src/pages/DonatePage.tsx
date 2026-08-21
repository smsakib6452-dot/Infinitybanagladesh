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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
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
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-display">
              {isBn ? 'অফিসিয়াল একাউন্ট ও মার্চেন্ট চ্যানেল' : 'Verified Donation Accounts'}
            </h3>
            <p className="text-xs text-slate-500">
              {isBn ? 'অনুমোদিত চ্যানেলে সরাসরি সহায়তা পাঠানো যাবে।' : 'Send your contributions directly through verified accounts.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1">
            <span className="text-[11px] font-bold text-rose-600 block">bKash Personal / Merchant</span>
            <p className="text-base font-mono font-bold text-slate-900">01831-XXXXXX</p>
            <span className="text-[10px] text-slate-500">{isBn ? 'রেফারেন্স: Infinity' : 'Ref: Infinity'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1">
            <span className="text-[11px] font-bold text-amber-600 block">Nagad Personal</span>
            <p className="text-base font-mono font-bold text-slate-900">01831-XXXXXX</p>
            <span className="text-[10px] text-slate-500">{isBn ? 'রেফারেন্স: Infinity' : 'Ref: Infinity'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1">
            <span className="text-[11px] font-bold text-[#006A4E] block">Bank Account (Hathazari, CTG)</span>
            <p className="text-xs font-mono font-bold text-slate-900">Infinity Bangladesh</p>
            <span className="text-[10px] text-slate-500">Islami Bank Bangladesh Ltd.</span>
          </div>
        </div>
      </div>

      {/* Main Donation Form & Instant Receipt */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Donation Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleDonationSubmit}
            className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-10 space-y-6 shadow-warm-md"
          >
            <div className="space-y-1 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900 font-display">
                {isBn ? 'অনুদানের তথ্য ফরম' : 'Contribution Details Form'}
              </h3>
              <p className="text-xs text-slate-500">
                {isBn ? 'আপনার অবদানের বিবরণ নিশ্চিত করতে ফরমটি পূরণ করুন।' : 'Record your contribution for verified receipt generation.'}
              </p>
            </div>

            {/* Amount Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'অনুদানের পরিমাণ (Amount in BDT) *' : 'Donation Amount (BDT) *'}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {presetAmounts.map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAmount(p)}
                    className={`py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      amount === p
                        ? 'bg-[#006A4E] text-white shadow-warm-sm'
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-800 border border-[#EAE3D9]'
                    }`}
                  >
                    ৳{p}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <input
                  type="number"
                  min="100"
                  required
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder={isBn ? 'অন্যান্য পরিমাণ লিখুন (টাকা)' : 'Custom Amount in BDT'}
                  className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                />
              </div>
            </div>

            {/* Campaign Destination */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'যে তহবিলে অনুদান দিতে চান *' : 'Target Fund / Campaign *'}
              </label>
              <select
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              >
                <option value="General Humanitarian Fund">
                  {isBn ? 'সাধারণ মানবিক তহবিল' : 'General Humanitarian Fund'}
                </option>
                {campaigns.map(c => (
                  <option key={c.id} value={c.title.en}>
                    {tText(c.title)}
                  </option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'মাধ্যম (Payment Channel) *' : 'Payment Channel *'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['bKash', 'Nagad', 'Bank Transfer', 'In-Kind / Physical Support'].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setPaymentMethod(m as any)}
                    className={`py-2 px-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                      paymentMethod === m
                        ? 'bg-[#006A4E] text-white shadow-warm-sm'
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE1] text-slate-700 border border-[#EAE3D9]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Transaction ID */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'ট্রানজেকশন আইডি (TrxID) / ব্যাংক ভাউচার নং' : 'Transaction ID (TrxID) / Voucher'}
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder={isBn ? 'উদা: 9A8B7C6D' : 'e.g. 9A8B7C6D'}
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>

            {/* Anonymous Toggle & Donor Details */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="rounded text-[#006A4E] focus:ring-[#006A4E]"
                />
                <span className="text-xs font-bold text-slate-800">
                  {isBn ? 'নাম প্রকাশে অনিচ্ছুক হিসেবে অনুদান দিতে চাই' : 'Donate anonymously (Hide name on public records)'}
                </span>
              </label>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-800">
                      {isBn ? 'আপনার নাম (Donor Name) *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required={!isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={isBn ? 'উদা: মোহাম্মদ রাশেদ' : 'e.g. Mohammad Rashed'}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {isBn ? 'ইমেইল (Email - রশিদের জন্য)' : 'Email (For Receipt)'}
                    </label>
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="donor@example.com"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {isBn ? 'ফোন নম্বর (Phone)' : 'Phone Number'}
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? 'অনুদানের তথ্য সাবমিট করুন ও রসিদ তৈরি করুন' : 'Submit & Generate Official Receipt'}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Receipt Generation Preview */}
        <div className="lg:col-span-5">
          {receiptData ? (
            <div className="bg-white rounded-3xl border-2 border-[#006A4E] p-6 sm:p-8 space-y-6 shadow-warm-lg animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#006A4E]">
                    Official Digital Acknowledgment
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 font-display">
                    Infinity Bangladesh
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#E6F3EF] text-[#006A4E] flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'রসিদ নম্বর:' : 'Receipt No:'}</span>
                  <span className="font-mono font-bold text-[#006A4E]">{receiptData.receiptNumber}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'দাতার নাম:' : 'Donor Name:'}</span>
                  <span className="font-bold text-slate-900">{receiptData.donorName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'পরিমাণ:' : 'Amount:'}</span>
                  <span className="font-extrabold text-base text-slate-900">৳{receiptData.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'তহবিল:' : 'Fund:'}</span>
                  <span className="font-medium text-slate-800">{receiptData.campaign}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">{isBn ? 'মাধ্যম:' : 'Method:'}</span>
                  <span className="font-medium text-slate-800">{receiptData.method}</span>
                </div>
                {receiptData.trxId && (
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">{isBn ? 'ট্রানজেকশন:' : 'TrxID:'}</span>
                    <span className="font-mono text-slate-800">{receiptData.trxId}</span>
                  </div>
                )}
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">{isBn ? 'তারিখ:' : 'Date:'}</span>
                  <span className="text-slate-700">{receiptData.date}</span>
                </div>
              </div>

              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] text-[11px] text-slate-600 text-center">
                {isBn
                  ? 'টিম ইনফিনিটি আপনার এই আন্তরিক সহযোগিতার প্রতি কৃতজ্ঞ। প্রতিটি টাকার হিসাব জনসমক্ষে সংরক্ষিত থাকবে।'
                  : 'Team Infinity is deeply grateful for your generous solidarity. May this bring peace and smiles.'}
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-colors cursor-pointer"
              >
                {isBn ? 'রসিদ প্রিন্ট বা সেভ করুন' : 'Print / Save Official Receipt'}
              </button>
            </div>
          ) : (
            <div className="bg-[#FAF7F2] rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-4 text-center">
              <ShieldCheck className="w-10 h-10 text-[#006A4E] mx-auto" />
              <h4 className="font-bold text-slate-900 text-sm font-display">
                {isBn ? 'স্বচ্ছ তহবিল ট্র্যাকিং ও তাৎক্ষণিক রসিদ' : 'Transparent Fund Tracking'}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isBn
                  ? 'বামপাশের ফরম পূরণ করে সাবমিট করলে আপনার জন্য স্বয়ংক্রিয়ভাবে একটি প্রাতিষ্ঠানিক ডিজিটাল রসিদ প্রস্তুত হবে।'
                  : 'Submit your donation details on the left to generate an authentic digital receipt for audit verification.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
