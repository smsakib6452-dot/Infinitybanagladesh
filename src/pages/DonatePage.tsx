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
  Smartphone,
  Info
} from 'lucide-react';

export const DonatePage: React.FC = () => {
  const { isBn, tText } = useLanguage();
  const { campaigns, supportSettings, settings, addDonationRecord } = useData();

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

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const presetAmounts = [500, 1000, 2500, 5000, 10000];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const effectiveName = isAnonymous ? (isBn ? 'নাম প্রকাশে অনিচ্ছুক শুভাকাঙ্ক্ষী' : 'Anonymous Supporter') : donorName;

    const record = {
      donorName: effectiveName,
      isAnonymous,
      donorEmail,
      donorPhone,
      amount,
      amountBDT: amount,
      campaignSlug: selectedCampaign,
      paymentMethod,
      transactionId: transactionId.trim() || undefined,
      notes: note.trim() || undefined
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

  const bKashNum = supportSettings.bKashNumber || settings.bKashNumber || '01800-000000';
  const nagadNum = supportSettings.nagadNumber || settings.nagadNumber || '01800-000000';
  const bankDet = supportSettings.bankDetails || settings.bankDetails;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      <SectionHeading
        badge={isBn ? 'স্বচ্ছ ও দায়িত্বশীল অনুদান' : 'Honest Fund Stewardship'}
        title={tText(supportSettings.ctaText) || (isBn ? 'আপনার সহায়তায় হাসবে সুবিধাবঞ্চিত মানুষ' : 'Support Our Humanitarian Missions')}
        subtitle={
          tText(supportSettings.description) ||
          (isBn
            ? 'টিম ইনফিনিটি সংগৃহীত প্রতিটি অনুদানের যথাযথ ব্যবহার নিশ্চিত করে এবং পূর্ণাঙ্গ অডিট রিপোর্ট প্রকাশ করে।'
            : 'Every Taka donated directly funds field procurement for underprivileged children and distressed families.')
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
          {/* bKash */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-rose-600 block">{supportSettings.bKashType || 'bKash Merchant / Personal'}</span>
              <button
                type="button"
                onClick={() => handleCopy(bKashNum, 'bkash')}
                className="text-slate-400 hover:text-rose-600 p-1"
                title="Copy Number"
              >
                {copiedField === 'bkash' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-base font-mono font-bold text-slate-900">{bKashNum}</p>
            <span className="text-[10px] text-slate-500">{isBn ? 'রেফারেন্স: Infinity' : 'Ref: Infinity'}</span>
          </div>

          {/* Nagad */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-600 block">{supportSettings.nagadType || 'Nagad Personal'}</span>
              <button
                type="button"
                onClick={() => handleCopy(nagadNum, 'nagad')}
                className="text-slate-400 hover:text-amber-600 p-1"
                title="Copy Number"
              >
                {copiedField === 'nagad' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-base font-mono font-bold text-slate-900">{nagadNum}</p>
            <span className="text-[10px] text-slate-500">{isBn ? 'রেফারেন্স: Infinity' : 'Ref: Infinity'}</span>
          </div>

          {/* Bank */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-1 relative group">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#006A4E] block">Bank Account ({bankDet.branchName || 'Chattogram'})</span>
              <button
                type="button"
                onClick={() => handleCopy(`${bankDet.bankName} - ${bankDet.accountNumber}`, 'bank')}
                className="text-slate-400 hover:text-[#006A4E] p-1"
                title="Copy Bank Info"
              >
                {copiedField === 'bank' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs font-mono font-bold text-slate-900 truncate">{bankDet.accountName}</p>
            <p className="text-[11px] text-slate-600">{bankDet.bankName} • {bankDet.accountNumber}</p>
          </div>
        </div>

        {supportSettings.paymentInstructions && (
          <div className="p-3.5 bg-[#E6F3EF] border border-[#C2E2D7] rounded-2xl flex items-start gap-2.5 text-xs text-[#00523C]">
            <Info className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
            <p>{tText(supportSettings.paymentInstructions)}</p>
          </div>
        )}
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
                {isBn ? 'অনুদানের তথ্য নিশ্চিতকরণ' : 'Contribution Details Form'}
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
                placeholder={isBn ? 'উদা: 9J3K8L2P' : 'e.g. 9J3K8L2P or Bank Slip No'}
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>

            {/* Donor Identity */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800">
                  {isBn ? 'দাতার পরিচয়' : 'Donor Information'}
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-[#006A4E] focus:ring-[#006A4E]"
                  />
                  <span>{isBn ? 'গোপন রাখুন (Anonymous)' : 'Make donation anonymous'}</span>
                </label>
              </div>

              {!isAnonymous && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
                  <div className="space-y-1.5 sm:col-span-2">
                    <input
                      type="text"
                      required={!isAnonymous}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder={isBn ? 'আপনার নাম *' : 'Your Full Name *'}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder={isBn ? 'মোবাইল নম্বর (এসএমএস রিসিটের জন্য)' : 'Phone (for SMS receipt)'}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <input
                      type="email"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder={isBn ? 'ইমেইল (ই-রিসিটের জন্য)' : 'Email (for e-receipt)'}
                      className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Note / Blessing */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-800">
                {isBn ? 'বিশেষ বার্তা বা দোয়া (ঐচ্ছিক)' : 'Message or Dedication (Optional)'}
              </label>
              <textarea
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={isBn ? 'আপনার অনুভূতি বা পরামর্শ লিখুন...' : 'Add a note or prayer...'}
                className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-sm shadow-warm-sm transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>{isBn ? 'অনুদান নিশ্চিত করুন ও রিসিট নিন' : 'Confirm Contribution & Get Receipt'}</span>
            </button>
          </form>
        </div>

        {/* Right Receipt & Information Column */}
        <div className="lg:col-span-5 space-y-6">
          {receiptData ? (
            <div className="bg-white rounded-3xl border border-emerald-300 p-6 sm:p-8 space-y-6 shadow-warm-lg animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-[#006A4E] font-bold text-sm">
                  <Receipt className="w-5 h-5" />
                  <span>{isBn ? 'ডিজিটাল মানি রিসিট' : 'Verified Digital Receipt'}</span>
                </div>
                <span className="text-[11px] font-mono bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  {receiptData.receiptNumber}
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{isBn ? 'দাতার নাম:' : 'Donor Name:'}</span>
                  <span className="font-bold text-slate-900">{receiptData.donorName}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{isBn ? 'পরিমাণ:' : 'Amount:'}</span>
                  <span className="font-extrabold text-emerald-800 font-mono text-base">৳{receiptData.amount.toLocaleString()} BDT</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{isBn ? 'তহবিল:' : 'Target Fund:'}</span>
                  <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{receiptData.campaign}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{isBn ? 'পেমেন্ট মাধ্যম:' : 'Method:'}</span>
                  <span className="font-medium text-slate-800">{receiptData.method}</span>
                </div>
                {receiptData.trxId && (
                  <div className="flex justify-between py-1.5 border-b border-slate-50">
                    <span className="text-slate-500">{isBn ? 'ট্রানজেকশন নং:' : 'TrxID:'}</span>
                    <span className="font-mono font-bold text-slate-900">{receiptData.trxId}</span>
                  </div>
                )}
                <div className="flex justify-between py-1.5 border-b border-slate-50">
                  <span className="text-slate-500">{isBn ? 'তারিখ:' : 'Date:'}</span>
                  <span className="font-medium text-slate-800">{receiptData.date}</span>
                </div>
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] text-[11px] text-slate-600 text-center">
                {isBn
                  ? 'টিম ইনফিনিটিতে আস্থা রাখার জন্য আপনাকে আন্তরিক ধন্যবাদ।'
                  : 'Infinity Bangladesh thanks you for standing united for humanity.'}
              </div>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isBn ? 'রিসিট প্রিন্ট / সংরক্ষণ করুন' : 'Print / Save Official Receipt'}</span>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
              <div className="flex items-center gap-3 text-slate-900 font-bold font-display">
                <ShieldCheck className="w-6 h-6 text-[#006A4E]" />
                <span>{isBn ? '১০০% স্বচ্ছতা ও অডিট নিশ্চয়তা' : '100% Stewardship & Audit'}</span>
              </div>

              <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                  <span>{isBn ? 'প্রতিটি টাকার ভাউচার ও ব্যাংক বিবরণ সংরক্ষিত থাকে।' : 'Itemized vendor receipts and field distribution logs maintained.'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                  <span>{isBn ? 'নিয়মিত আয়-ব্যয় ও বাৎসরিক স্বচ্ছতা রিপোর্ট প্রকাশ করা হয়।' : 'Periodic transparency audits published on the website.'}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#006A4E] shrink-0 mt-0.5" />
                  <span>{isBn ? 'স্বেচ্ছাসেবীদের অক্লান্ত পরিশ্রমে প্রশাসনিক খরচ সর্বনিম্ন রাখা হয়।' : 'Volunteer-run model ensuring maximum funds reach beneficiaries.'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
