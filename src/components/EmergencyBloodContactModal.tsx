import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BloodDonor } from '../types';
import { cleanBloodDonor, toSafeString } from '../data/bloodDonationData';
import {
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  Droplet,
  MapPin,
  Clock,
  HeartHandshake,
  AlertTriangle,
  Send
} from 'lucide-react';

interface EmergencyBloodContactModalProps {
  donor: BloodDonor | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEmergencyRequest?: () => void;
  emergencyHelpline?: string;
}

export const EmergencyBloodContactModal: React.FC<EmergencyBloodContactModalProps> = ({
  donor: rawDonor,
  isOpen,
  onClose,
  onOpenEmergencyRequest,
  emergencyHelpline = '+880 1839-008339'
}) => {
  const { isBn } = useLanguage();

  if (!isOpen || !rawDonor) return null;

  const donor = cleanBloodDonor(rawDonor);
  const cleanPhone = donor.phone ? donor.phone.replace(/[^0-9+]/g, '') : '';
  const cleanHelpline = emergencyHelpline.replace(/[^0-9+]/g, '');
  const canDirectContact = donor.showPhonePublicly && Boolean(donor.phone);

  const contactPhone = canDirectContact ? cleanPhone : cleanHelpline;
  const whatsappUrl = `https://wa.me/${contactPhone.replace('+', '')}?text=${encodeURIComponent(
    `Hello, I am contacting via Infinity Bangladesh Blood Donation Network regarding ${donor.bloodGroup} blood requirement.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-warm-2xl border border-[#EAE3D9] overflow-hidden my-8">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-rose-600 to-rose-800 text-white p-6 sm:p-7">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shrink-0">
              <Droplet className="w-6 h-6 fill-current text-rose-200" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                {isBn ? 'জরুরি রক্তদান সমন্বয়' : 'Blood Donation Coordination'}
              </span>
              <h3 className="text-xl font-extrabold text-white font-display mt-0.5">
                {donor.bloodGroup} {isBn ? 'রক্তদাতার যোগাযোগ' : 'Donor Contact'}
              </h3>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Donor Summary Card */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <p className="text-sm font-extrabold text-slate-900 font-display">
                {donor.fullName}
              </p>
              <p className="text-xs text-slate-500 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>{donor.area}, {donor.upazila}</span>
              </p>
              <p className="text-[11px] font-bold text-emerald-700">
                {donor.orgCategory}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-rose-600 text-white font-black text-sm font-display shadow-sm">
                {donor.bloodGroup}
              </span>
            </div>
          </div>

          {/* Contact Mode Box */}
          {canDirectContact ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-600 font-medium">
                {isBn
                  ? 'এই রক্তদাতা সরাসরি যোগাযোগের অনুমতি প্রদান করেছেন। কল অথবা হোয়াটসঅ্যাপের মাধ্যমে এখনই যোগাযোগ করতে পারেন:'
                  : 'This donor has consented to direct public contact. You may reach out immediately via Call or WhatsApp:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${contactPhone}`}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isBn ? 'সরাসরি কল করুন' : 'Call Donor'}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-warm-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-[#00523C] font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
                  <span>{isBn ? 'ইনফিনিটি বাংলাদেশ গোপনীয়তা সুরক্ষা' : 'Privacy Protection Active'}</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {isBn
                    ? 'রক্তদাতার ব্যক্তিগত ফোন নম্বর সুরক্ষিত রয়েছে। ইনফিনিটি বাংলাদেশ ২৪/৭ ব্লাড কো-অর্ডিনেটর ডেস্ক সরাসরি রক্তদাতার সাথে কথা বলে দ্রুত আপনার জন্য রক্তের ব্যবস্থা করে দেবে।'
                    : 'This donor phone number is safeguarded. Team Infinity 24/7 Blood Coordination Helpline will immediately contact this donor for you.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${cleanHelpline}`}
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>{isBn ? 'হেল্পলাইনে কল করুন' : 'Call Helpline'}</span>
                </a>

                <a
                  href={`https://wa.me/${cleanHelpline.replace('+', '')}?text=${encodeURIComponent(
                    `Emergency Blood Assistance needed for ${donor.bloodGroup} in ${donor.district}, ${donor.upazila}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-xs shadow-warm-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Helpline</span>
                </a>
              </div>
            </div>
          )}

          {/* Quick Emergency Request CTA */}
          {onOpenEmergencyRequest && (
            <div className="pt-3 border-t border-[#EAE3D9] text-center space-y-2">
              <p className="text-xs text-slate-500 font-medium">
                {isBn ? 'অথবা তাৎক্ষণিক সাধারণ জরুরি আবেদন পোস্ট করতে চান?' : 'Or submit a verified emergency request?'}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenEmergencyRequest();
                }}
                className="w-full py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#EAE3D9] text-slate-800 font-bold text-xs border border-[#EAE3D9] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-rose-600" />
                <span>{isBn ? 'জরুরি রক্তের আবেদন ফরম পূরণ করুন' : 'Open Emergency Request Form'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
