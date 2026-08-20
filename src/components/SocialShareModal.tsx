import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Share2, Copy, Check, X, Facebook, MessageSquare, Twitter, Linkedin } from 'lucide-react';

export interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url?: string;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  title,
  url = typeof window !== 'undefined' ? window.location.href : 'https://infinitybangladesh.org'
}) => {
  const { isBn } = useLanguage();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-[#1877F2] hover:bg-[#166fe5]',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    },
    {
      name: 'WhatsApp',
      icon: MessageSquare,
      color: 'bg-[#25D366] hover:bg-[#20bd5a]',
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-[#0A66C2] hover:bg-[#095196]',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    },
    {
      name: 'Twitter / X',
      icon: Twitter,
      color: 'bg-black hover:bg-neutral-800',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2 text-slate-800">
            <Share2 className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-base">
              {isBn ? 'সোশ্যাল মিডিয়ায় শেয়ার করুন' : 'Share on Social Media'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <p className="text-xs text-slate-500 line-clamp-2 italic">
            "{title}"
          </p>

          <div className="grid grid-cols-2 gap-3">
            {shareLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-transform active:scale-95 shadow-sm ${item.color}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 block">
              {isBn ? 'সরাসরি লিঙ্ক কপি করুন' : 'Direct Page Link'}
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-xl border border-slate-200">
              <input
                type="text"
                readOnly
                value={url}
                className="bg-transparent text-xs font-mono text-slate-700 px-2 flex-1 outline-none select-all"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold rounded-lg transition-colors shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'কপি' : 'Copy')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
