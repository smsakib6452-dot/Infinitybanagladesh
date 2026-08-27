import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import { EmergencyBloodRequest, EmergencyRequestStatus, BloodDonor } from '../types';
import {
  X,
  Droplet,
  MapPin,
  Calendar,
  Phone,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Save,
  Users,
  ShieldCheck,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface EmergencyRequestAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: EmergencyBloodRequest | null;
  onUpdateStatus: (id: string, status: EmergencyRequestStatus) => void;
}

export const EmergencyRequestAdminModal: React.FC<EmergencyRequestAdminModalProps> = ({
  isOpen,
  onClose,
  request,
  onUpdateStatus
}) => {
  const { isBn } = useLanguage();
  const { bloodDonors } = useData();

  const [status, setStatus] = useState<EmergencyRequestStatus>(request?.status || 'PENDING');

  if (!isOpen || !request) return null;

  // Find matching available donors
  const matchingDonors = bloodDonors.filter(d => {
    if (d.bloodGroup !== request.bloodGroup) return false;
    if (d.approvalStatus !== 'APPROVED') return false;
    if (d.availabilityStatus === 'UNAVAILABLE') return false;
    return true;
  }).sort((a, b) => {
    if (a.district.toLowerCase() === request.district.toLowerCase() && b.district.toLowerCase() !== request.district.toLowerCase()) return -1;
    if (b.district.toLowerCase() === request.district.toLowerCase() && a.district.toLowerCase() !== request.district.toLowerCase()) return 1;
    if (a.availabilityStatus === 'AVAILABLE_EMERGENCY' && b.availabilityStatus !== 'AVAILABLE_EMERGENCY') return -1;
    if (b.availabilityStatus === 'AVAILABLE_EMERGENCY' && a.availabilityStatus !== 'AVAILABLE_EMERGENCY') return 1;
    return (b.totalDonations ?? 0) - (a.totalDonations ?? 0);
  });

  const handleSave = () => {
    onUpdateStatus(request.id, status);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-warm-2xl border border-[#EAE3D9] overflow-hidden my-8 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-rose-700 to-rose-900 text-white p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
              <Droplet className="w-5 h-5 fill-current text-rose-200" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/20">
                {request.emergencyLevel} Urgency
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-display mt-0.5">
                {request.patientName} &bull; {request.bloodGroup} ({request.unitsNeeded} {isBn ? 'ব্যাগ' : 'Units'})
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto flex-1">
          {/* Status Workflow Selector */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
            <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
              {isBn ? 'আবেদনের বর্তমান অবস্থা পরিবর্তন করুন' : 'Update Request Status'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['PENDING', 'PROCESSING', 'FULFILLED', 'CANCELLED'] as EmergencyRequestStatus[]).map(st => {
                const isSelected = status === st;
                return (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatus(st)}
                    className={`py-2 px-3 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                      isSelected
                        ? st === 'FULFILLED'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : st === 'PROCESSING'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : st === 'CANCELLED'
                          ? 'bg-slate-600 text-white border-slate-700'
                          : 'bg-rose-600 text-white border-rose-700 shadow-xs'
                        : 'bg-white text-slate-700 border-[#EAE3D9] hover:bg-slate-50'
                    }`}
                  >
                    {st}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Request Full Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5">
              <p className="text-[11px] font-bold text-slate-500 uppercase">{isBn ? 'হাসপাতাল ও স্থান' : 'Hospital & Location'}</p>
              <p className="text-sm font-extrabold text-slate-900">{request.hospitalName}</p>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{request.upazila}, {request.district}</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#EAE3D9] space-y-1.5">
              <p className="text-[11px] font-bold text-slate-500 uppercase">{isBn ? 'আবেদনকারী ও যোগাযোগের নম্বর' : 'Requester & Contact'}</p>
              <p className="text-sm font-extrabold text-slate-900">{request.requesterName}</p>
              <div className="flex items-center gap-2 pt-0.5">
                <a
                  href={`tel:${request.contactNumber}`}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-xs hover:bg-emerald-100"
                >
                  <Phone className="w-3 h-3" />
                  <span>{request.contactNumber}</span>
                </a>
              </div>
            </div>
          </div>

          {request.additionalNotes && (
            <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 text-xs text-rose-950 space-y-1">
              <p className="font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>{isBn ? 'বিশেষ নির্দেশিকা / নোট' : 'Emergency Notes'}</span>
              </p>
              <p className="leading-relaxed">"{request.additionalNotes}"</p>
            </div>
          )}

          {/* Matched Donors Recommendation Engine */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#006A4E]" />
                <span>
                  {isBn ? `উপযুক্ত ম্যাচিং রক্তদাতা (${matchingDonors.length} জন পাওয়া গেছে)` : `Matching Available Donors (${matchingDonors.length} found)`}
                </span>
              </h4>
            </div>

            {matchingDonors.length === 0 ? (
              <div className="p-5 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-500">
                {isBn ? 'এই মুহূর্তে এই গ্রুপের কোনো সক্রিয় রক্তদাতা পাওয়া যায়নি।' : 'No active available donors found for this blood group.'}
              </div>
            ) : (
              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {matchingDonors.map(donor => (
                  <div
                    key={donor.id}
                    className="p-3.5 rounded-2xl bg-white border border-[#EAE3D9] flex items-center justify-between gap-3 shadow-xs hover:border-[#006A4E]/40 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-slate-900 truncate">
                          {donor.fullName}
                        </span>
                        <span className="px-2 py-0.2 rounded-md bg-rose-50 text-rose-700 font-bold text-[10px]">
                          {donor.bloodGroup}
                        </span>
                        {donor.isVerified && (
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{donor.area}, {donor.upazila}, {donor.district}</span>
                      </p>
                      <p className="text-[10px] text-emerald-700 font-medium">
                        {donor.orgCategory} &bull; {donor.totalDonations} donations
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {donor.phone && (
                        <a
                          href={`tel:${donor.phone}`}
                          className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors"
                          title="Call Donor"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {donor.phone && (
                        <a
                          href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Emergency Blood Request: ${request.patientName} urgently needs ${request.bloodGroup} at ${request.hospitalName}. Can you donate?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                          title="WhatsApp Request"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-[#EAE3D9] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-2xl bg-white border border-[#EAE3D9] text-slate-700 font-bold text-xs hover:bg-[#FAF7F2] transition-all cursor-pointer"
          >
            {isBn ? 'বাতিল' : 'Cancel'}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-2xl bg-[#006A4E] hover:bg-[#00523C] text-white font-extrabold text-xs shadow-warm-sm transition-all flex items-center gap-1.5 cursor-pointer transform hover:-translate-y-0.5"
          >
            <Save className="w-4 h-4" />
            <span>{isBn ? 'স্ট্যাটাস আপডেট সংরক্ষণ' : 'Save Request Status'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
