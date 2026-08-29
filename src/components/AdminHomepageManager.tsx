import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useData } from '../context/DataContext';
import {
  Sliders,
  RotateCcw,
  Check,
  ListOrdered,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  ImageIcon,
  FolderOpen,
  ShieldCheck,
  Activity,
  Users,
  BookOpen,
  Flag,
  Heart,
  Droplet,
  Search,
  Newspaper
} from 'lucide-react';
import { AdminTab } from '../pages/AdminPage';
import { getAssetUrl } from '../lib/utils/assetHelper';

interface AdminHomepageManagerProps {
  setActiveTab: (tab: AdminTab) => void;
  openMediaPicker: (onSelect: (url: string) => void) => void;
  showToast: (msg: string) => void;
}

export const AdminHomepageManager: React.FC<AdminHomepageManagerProps> = ({
  setActiveTab,
  openMediaPicker,
  showToast
}) => {
  const { isBn, tText } = useLanguage();
  const {
    homepageConfig,
    updateHomepageConfig,
    aboutSettings,
    metrics,
    programs,
    campaigns,
    stories,
    gallery,
    pressCoverages,
    bloodDonors,
    emergencyBloodRequests
  } = useData();

  const totalRegisteredDonors = bloodDonors.filter(d => d.approvalStatus === 'APPROVED').length;
  const totalActiveDonors = bloodDonors.filter(d => d.approvalStatus === 'APPROVED' && d.availabilityStatus !== 'UNAVAILABLE').length;
  const pendingBloodRequests = emergencyBloodRequests.filter(r => r.status === 'PENDING' || r.status === 'PROCESSING').length;

  return (
    <div className="space-y-8">
      {/* Top Header Control Bar */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 shadow-warm-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E6F3EF] text-[#006A4E] text-xs font-extrabold mb-2 border border-[#C2E2D7]">
            <Sliders className="w-3.5 h-3.5" />
            <span>{isBn ? '১:১ হোমপেজ এডিটর কন্ট্রোল সেন্টার' : '1:1 Homepage Editorial Control Center'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display">
            {isBn ? 'হোমপেজ এডিটর ও সেকশন ম্যানেজার' : 'Homepage Hero, Banners & Section Manager'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            {isBn
              ? 'পাবলিক হোমপেজের প্রতিটি সেকশন হুবহু একই ক্রমে এখানে সাজানো। যেকোনো সেকশনের লেখা, ছবি, বাটন ও দৃশ্যমানতা সরাসরি পরিবর্তন করুন।'
              : 'Every public homepage section is organized in the exact 1:1 sequence below. Directly customize text, images, action CTAs, and visibility.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              const defaultOrder = [
                'hero',
                'impact',
                'about',
                'programs',
                'campaigns',
                'stories',
                'lifeline',
                'gallery',
                'press',
                'volunteer',
                'transparency',
                'support'
              ];
              updateHomepageConfig({ sectionOrder: defaultOrder });
              showToast('Reset section order to default layout');
            }}
            className="px-3.5 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#EAE3D9] text-slate-700 text-xs font-bold border border-[#EAE3D9] flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isBn ? 'ডিফল্ট ক্রম' : 'Reset Order'}</span>
          </button>

          <button
            type="button"
            onClick={() => showToast(isBn ? 'হোমপেজ সেটিংস সংরক্ষিত' : 'Homepage settings saved')}
            className="px-5 py-2 rounded-xl bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs shadow-warm-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>{isBn ? 'সংরক্ষণ সম্পন্ন' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Master Section Sequence & Visibility Quick Map */}
      <div className="bg-white rounded-3xl border border-[#EAE3D9] p-6 shadow-warm-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListOrdered className="w-4 h-4 text-[#006A4E]" />
            <h3 className="text-sm font-bold text-slate-900 font-display">
              {isBn ? 'হোমপেজ সেকশন ক্রম ও দৃশ্যমানতা টেবিল' : 'Homepage Section Sequence & Visibility Quick Map'}
            </h3>
          </div>
          <span className="text-[11px] font-bold text-slate-400">
            {homepageConfig.sectionOrder.length} {isBn ? 'টি সেকশন সক্রিয়' : 'Sections Active'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {homepageConfig.sectionOrder.map((sectionKey, index) => {
            const isVisible = homepageConfig.sectionVisibility[sectionKey] !== false;
            const sectionNames: Record<string, { num: string; en: string; bn: string }> = {
              hero: { num: '01', en: 'Hero Banner & Slogan', bn: 'হিরো ব্যানার ও মূল স্লোগান' },
              impact: { num: '02', en: 'Impact Metrics & Audits', bn: 'পরিসংখ্যান ও মানবিক প্রভাব' },
              about: { num: '03', en: 'About Preview & Purpose', bn: 'সংগঠন পরিচিতি ও লক্ষ্য' },
              programs: { num: '04', en: 'Flagship Programs', bn: 'ধারাবাহিক মানবিক কর্মসূচি' },
              campaigns: { num: '05', en: 'Relief Drives & Campaigns', bn: 'মাঠপর্যায়ের ক্যাম্পেইন' },
              stories: { num: '06', en: 'Impact Stories of Hope', bn: 'বাস্তব জীবনের রূপান্তরের গল্প' },
              lifeline: { num: '07', en: 'Infinity LifeLine Spotlight', bn: 'ইনফিনিটি লাইফলাইন রক্তদান স্পটলাইট' },
              blood_donation: { num: '07', en: 'Infinity LifeLine Spotlight', bn: 'ইনফিনিটি লাইফলাইন রক্তদান স্পটলাইট' },
              gallery: { num: '08', en: 'Photo Gallery & Moments', bn: 'মাঠপর্যায়ের স্মৃতি ও আলোকচিত্র' },
              press: { num: '09', en: 'News & Media Coverage', bn: 'গণমাধ্যমে প্রকাশিত প্রতিবেদন' },
              volunteer: { num: '10', en: 'Volunteer CTA Banner', bn: 'স্বেচ্ছাসেবী আহ্বান ব্যানার' },
              transparency: { num: '11', en: 'Transparency Pledge', bn: 'স্বচ্ছতা ও সততার অঙ্গীকার' },
              support: { num: '12', en: 'Support & Donation Banner', bn: 'অনলাইন অনুদান ও সহায়তা ব্যানার' }
            };
            const sInfo = sectionNames[sectionKey] || { num: `0${index + 1}`, en: `${sectionKey} Section`, bn: `${sectionKey} সেকশন` };

            return (
              <div
                key={sectionKey}
                className="p-3 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-white text-slate-800 text-xs font-extrabold flex items-center justify-center border border-slate-200 shrink-0 font-mono">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-800 block truncate">
                      {isBn ? sInfo.bn : sInfo.en}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      id: {sectionKey}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Move Up */}
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => {
                      if (index === 0) return;
                      const newOrder = [...homepageConfig.sectionOrder];
                      const temp = newOrder[index - 1];
                      newOrder[index - 1] = newOrder[index];
                      newOrder[index] = temp;
                      updateHomepageConfig({ sectionOrder: newOrder });
                      showToast(`Moved ${sectionKey} up`);
                    }}
                    className="p-1 rounded-lg bg-white border border-slate-200 hover:border-[#006A4E] hover:text-[#006A4E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={index === homepageConfig.sectionOrder.length - 1}
                    onClick={() => {
                      if (index === homepageConfig.sectionOrder.length - 1) return;
                      const newOrder = [...homepageConfig.sectionOrder];
                      const temp = newOrder[index + 1];
                      newOrder[index + 1] = newOrder[index];
                      newOrder[index] = temp;
                      updateHomepageConfig({ sectionOrder: newOrder });
                      showToast(`Moved ${sectionKey} down`);
                    }}
                    className="p-1 rounded-lg bg-white border border-slate-200 hover:border-[#006A4E] hover:text-[#006A4E] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Visibility */}
                  <button
                    type="button"
                    onClick={() => {
                      const newVis = { ...homepageConfig.sectionVisibility, [sectionKey]: !isVisible };
                      updateHomepageConfig({ sectionVisibility: newVis });
                      showToast(`Toggled ${sectionKey} visibility`);
                    }}
                    className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                      isVisible ? 'bg-[#E6F3EF] text-[#00523C]' : 'bg-slate-200 text-slate-600'
                    }`}
                    title={isVisible ? 'Visible on Homepage' : 'Hidden from Homepage'}
                  >
                    {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================================= */}
      {/* 01. HERO SECTION */}
      {/* ============================================================= */}
      <div id="sec-01-hero" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        {/* Card Header & 1:1 Mapping Tag */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              01
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'হিরো সেকশন (Hero Section)' : 'Hero Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: Hero Headline, Slogan, Real Photo, Badges & 3 CTAs
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'hero'
          </span>
        </div>

        {/* Slogan & Eyebrow */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Hero Slogan & Eyebrow Badge (আইব্রো ব্যাজ)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Eyebrow (English)</label>
              <input
                type="text"
                value={homepageConfig.hero.eyebrow.en}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, eyebrow: { ...homepageConfig.hero.eyebrow, en: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Eyebrow (বাংলা)</label>
              <input
                type="text"
                value={homepageConfig.hero.eyebrow.bn}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, eyebrow: { ...homepageConfig.hero.eyebrow, bn: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>
        </div>

        {/* Main Headlines */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Main Headline & Green Highlight (মূল শিরোনাম ও হাইলাইট)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Headline Main (English)</label>
              <input
                type="text"
                value={homepageConfig.hero.headlineMain.en}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, headlineMain: { ...homepageConfig.hero.headlineMain, en: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Headline Highlight (English)</label>
              <input
                type="text"
                value={homepageConfig.hero.headlineHighlight.en}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, headlineHighlight: { ...homepageConfig.hero.headlineHighlight, en: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Headline Main (বাংলা)</label>
              <input
                type="text"
                value={homepageConfig.hero.headlineMain.bn}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, headlineMain: { ...homepageConfig.hero.headlineMain, bn: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Headline Highlight (বাংলা)</label>
              <input
                type="text"
                value={homepageConfig.hero.headlineHighlight.bn}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, headlineHighlight: { ...homepageConfig.hero.headlineHighlight, bn: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>
        </div>

        {/* Supporting Description */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Supporting Description (বিবরণ প্যারাগ্রাফ)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description (English)</label>
              <textarea
                rows={3}
                value={homepageConfig.hero.description.en}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, description: { ...homepageConfig.hero.description, en: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">বিবরণ (বাংলা)</label>
              <textarea
                rows={3}
                value={homepageConfig.hero.description.bn}
                onChange={(e) => updateHomepageConfig({
                  hero: { ...homepageConfig.hero, description: { ...homepageConfig.hero.description, bn: e.target.value } }
                })}
                className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>
        </div>

        {/* Hero Real Photography & Established Badge */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#006A4E]" />
              <span>Hero Cover Photo, Crop & Badges (হিরো কভার ফটো ও ব্যাজ)</span>
            </h4>
            <button
              type="button"
              onClick={() => openMediaPicker((url) => {
                updateHomepageConfig({
                  hero: { ...homepageConfig.hero, heroImageUrl: url }
                });
                showToast('Hero image updated from Media Library');
              })}
              className="text-xs text-[#006A4E] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5" />
              <span>Pick from Media Library</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            <div className="sm:col-span-4 aspect-4/3 rounded-2xl overflow-hidden border border-[#EAE3D9] bg-slate-100 relative">
              <img
                src={getAssetUrl(homepageConfig.hero.heroImageUrl)}
                alt="Hero Preview"
                style={{ objectPosition: homepageConfig.hero.heroImageCropPosition || 'center center' }}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded-lg truncate">
                Crop: {homepageConfig.hero.heroImageCropPosition || 'center center'}
              </div>
            </div>

            <div className="sm:col-span-8 space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Hero Image URL</label>
                <input
                  type="text"
                  value={homepageConfig.hero.heroImageUrl}
                  onChange={(e) => updateHomepageConfig({
                    hero: { ...homepageConfig.hero, heroImageUrl: e.target.value }
                  })}
                  className="w-full px-3.5 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Badge Title (EN)</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.badgeTitle?.en || ''}
                    onChange={(e) => updateHomepageConfig({
                      hero: {
                        ...homepageConfig.hero,
                        badgeTitle: { ...(homepageConfig.hero.badgeTitle || { en: '', bn: '' }), en: e.target.value }
                      }
                    })}
                    placeholder="Established 2015"
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">ব্যাজ শিরোনাম (বাংলা)</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.badgeTitle?.bn || ''}
                    onChange={(e) => updateHomepageConfig({
                      hero: {
                        ...homepageConfig.hero,
                        badgeTitle: { ...(homepageConfig.hero.badgeTitle || { en: '', bn: '' }), bn: e.target.value }
                      }
                    })}
                    placeholder="প্রতিষ্ঠিত ২০১৫"
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Established Year</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.badgeYear}
                    onChange={(e) => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, badgeYear: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Badge Location</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.badgeLocation}
                    onChange={(e) => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, badgeLocation: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Badge Tag</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.badgeTag}
                    onChange={(e) => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, badgeTag: e.target.value }
                    })}
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>
              </div>

              {/* Image Alt & Crop Position */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Image Alt Text (SEO)</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.heroImageAlt || ''}
                    onChange={(e) => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, heroImageAlt: e.target.value }
                    })}
                    placeholder="Infinity Bangladesh Humanitarian Group Photo"
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Crop Position (CSS)</label>
                  <input
                    type="text"
                    value={homepageConfig.hero.heroImageCropPosition || 'center center'}
                    onChange={(e) => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, heroImageCropPosition: e.target.value }
                    })}
                    placeholder="center center"
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                  />
                </div>
              </div>

              {/* Quick Crop Chips */}
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span className="text-[10px] font-bold text-slate-400">Presets:</span>
                {['center center', 'center top', 'top center', 'center bottom', '50% 20%'].map(pos => (
                  <button
                    key={pos}
                    type="button"
                    onClick={() => updateHomepageConfig({
                      hero: { ...homepageConfig.hero, heroImageCropPosition: pos }
                    })}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                      (homepageConfig.hero.heroImageCropPosition || 'center center') === pos
                        ? 'bg-[#006A4E] text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-[#006A4E]'
                    }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3 Hero Trust Indicators */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#006A4E]" />
            <span>Hero Trust & Verification Badges (৩টি ট্রাস্ট ব্যাজ)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(homepageConfig.hero.trustIndicators || []).map((indicator, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">
                    Badge #{idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updatedIndicators = [...(homepageConfig.hero.trustIndicators || [])];
                      updatedIndicators[idx] = { ...updatedIndicators[idx], active: !updatedIndicators[idx].active };
                      updateHomepageConfig({ hero: { ...homepageConfig.hero, trustIndicators: updatedIndicators } });
                    }}
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold cursor-pointer transition-colors ${
                      indicator.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {indicator.active ? 'Active' : 'Hidden'}
                  </button>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-slate-600 block">Text (EN)</label>
                  <input
                    type="text"
                    value={indicator.text?.en || ''}
                    onChange={(e) => {
                      const updatedIndicators = [...(homepageConfig.hero.trustIndicators || [])];
                      updatedIndicators[idx] = {
                        ...updatedIndicators[idx],
                        text: { ...(updatedIndicators[idx]?.text || { en: '', bn: '' }), en: e.target.value }
                      };
                      updateHomepageConfig({ hero: { ...homepageConfig.hero, trustIndicators: updatedIndicators } });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-medium text-slate-600 block">লেখা (বাংলা)</label>
                  <input
                    type="text"
                    value={indicator.text?.bn || ''}
                    onChange={(e) => {
                      const updatedIndicators = [...(homepageConfig.hero.trustIndicators || [])];
                      updatedIndicators[idx] = {
                        ...updatedIndicators[idx],
                        text: { ...(updatedIndicators[idx]?.text || { en: '', bn: '' }), bn: e.target.value }
                      };
                      updateHomepageConfig({ hero: { ...homepageConfig.hero, trustIndicators: updatedIndicators } });
                    }}
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Hero Action CTA Buttons */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
            Hero Action CTA Buttons (হিরো ৩টি অ্যাকশন বাটন)
          </h4>

          {/* 1. Primary CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006A4E]" />
                <span className="text-xs font-extrabold text-slate-900">
                  {isBn ? '১. প্রাথমিক বোতাম (Primary Heart Button)' : '1. Primary CTA (Heart Button)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateHomepageConfig({
                  hero: {
                    ...homepageConfig.hero,
                    primaryCta: { ...homepageConfig.hero.primaryCta, active: !homepageConfig.hero.primaryCta.active }
                  }
                })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  homepageConfig.hero.primaryCta.active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {homepageConfig.hero.primaryCta.active ? 'Active' : 'Hidden'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.primaryCta.text.en}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      primaryCta: {
                        ...homepageConfig.hero.primaryCta,
                        text: { ...homepageConfig.hero.primaryCta.text, en: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.primaryCta.text.bn}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      primaryCta: {
                        ...homepageConfig.hero.primaryCta,
                        text: { ...homepageConfig.hero.primaryCta.text, bn: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.primaryCta.url}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      primaryCta: { ...homepageConfig.hero.primaryCta, url: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* 2. Secondary CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                <span className="text-xs font-extrabold text-slate-900">
                  {isBn ? '২. দ্বিতীয় বোতাম (Secondary Volunteer Button)' : '2. Secondary CTA (Users Button)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateHomepageConfig({
                  hero: {
                    ...homepageConfig.hero,
                    secondaryCta: { ...homepageConfig.hero.secondaryCta, active: !homepageConfig.hero.secondaryCta.active }
                  }
                })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  homepageConfig.hero.secondaryCta.active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {homepageConfig.hero.secondaryCta.active ? 'Active' : 'Hidden'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.secondaryCta.text.en}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      secondaryCta: {
                        ...homepageConfig.hero.secondaryCta,
                        text: { ...homepageConfig.hero.secondaryCta.text, en: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.secondaryCta.text.bn}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      secondaryCta: {
                        ...homepageConfig.hero.secondaryCta,
                        text: { ...homepageConfig.hero.secondaryCta.text, bn: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.secondaryCta.url}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      secondaryCta: { ...homepageConfig.hero.secondaryCta, url: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* 3. Story / Video CTA */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-xs font-extrabold text-slate-900">
                  {isBn ? '৩. গল্প / ভিডিও বোতাম (Story Play Button)' : '3. Story / Video CTA (Play Button)'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateHomepageConfig({
                  hero: {
                    ...homepageConfig.hero,
                    storyCta: { ...homepageConfig.hero.storyCta, active: !homepageConfig.hero.storyCta.active }
                  }
                })}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  homepageConfig.hero.storyCta.active
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {homepageConfig.hero.storyCta.active ? 'Active' : 'Hidden'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Button Text (English)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.storyCta.text.en}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      storyCta: {
                        ...homepageConfig.hero.storyCta,
                        text: { ...homepageConfig.hero.storyCta.text, en: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">বোতামের লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.storyCta.text.bn}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      storyCta: {
                        ...homepageConfig.hero.storyCta,
                        text: { ...homepageConfig.hero.storyCta.text, bn: e.target.value }
                      }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-bengali"
                />
              </div>
              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">Target Route / URL (লিংক)</label>
                <input
                  type="text"
                  value={homepageConfig.hero.storyCta.url}
                  onChange={(e) => updateHomepageConfig({
                    hero: {
                      ...homepageConfig.hero,
                      storyCta: { ...homepageConfig.hero.storyCta, url: e.target.value }
                    }
                  })}
                  className="w-full px-3 py-2 bg-white border border-[#EAE3D9] rounded-xl text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 02. IMPACT METRICS SECTION */}
      {/* ============================================================= */}
      <div id="sec-02-impact" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              02
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'প্রভাব ও পরিসংখ্যান সেকশন (Impact Metrics)' : 'Impact Metrics Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Our Measured Impact Across Communities" — Header & 4 Impact Cards
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'impact'
          </span>
        </div>

        {/* Section Presentation Headings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.impactSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                impactSection: {
                  ...(homepageConfig.impactSection || {}),
                  badge: { ...(homepageConfig.impactSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Verified Groundwork"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.impactSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                impactSection: {
                  ...(homepageConfig.impactSection || {}),
                  badge: { ...(homepageConfig.impactSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="আমাদের মাঠপর্যায়ের বিস্তৃতি"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.impactSection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                impactSection: {
                  ...(homepageConfig.impactSection || {}),
                  title: { ...(homepageConfig.impactSection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Our Measured Impact Across Communities"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.impactSection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                impactSection: {
                  ...(homepageConfig.impactSection || {}),
                  title: { ...(homepageConfig.impactSection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="পরিসংখ্যান ও মানবিক প্রভাব"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subtitle Description (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.impactSection?.subtitle?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  impactSection: {
                    ...(homepageConfig.impactSection || {}),
                    subtitle: { ...(homepageConfig.impactSection?.subtitle || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="Ground-level metrics verified by Team Infinity audits across communities."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">সাবটাইটেল বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.impactSection?.subtitle?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  impactSection: {
                    ...(homepageConfig.impactSection || {}),
                    subtitle: { ...(homepageConfig.impactSection?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="সকল সংখ্যা ও তথ্য সততা ও নিরপেক্ষতার সাথে যাচাইকৃত।"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>
        </div>

        {/* Impact Data Source & Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'মাঠপর্যায়ের পরিসংখ্যান ও কাউন্টার কার্ড' : 'Homepage 4 Impact Counter Cards'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `বর্তমান সক্রিয় সংখ্যা: ${metrics.filter(m => m.active !== false).map(m => `${m.value} (${isBn ? m.label.bn : m.label.en})`).join(', ')}`
                : `Currently displaying: ${metrics.filter(m => m.active !== false).map(m => `${m.value} ${m.label.en}`).join(', ')}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('impact')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isBn ? 'পরিসংখ্যান ও কাউন্টার ম্যানেজ করুন →' : 'Manage Metrics in Impact CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 03. ABOUT / WHO WE ARE SECTION */}
      {/* ============================================================= */}
      <div id="sec-03-about" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              03
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'সংগঠন পরিচিতি ও লক্ষ্য (About Preview / Who We Are)' : 'About / Who We Are Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "People First. Humanity Always" — About Preview & Story CTA
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'about'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Eyebrow (English)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.eyebrow?.en || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  eyebrow: { ...(homepageConfig.aboutPreview?.eyebrow || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="About Infinity Bangladesh"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">আইব্রো (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.eyebrow?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  eyebrow: { ...(homepageConfig.aboutPreview?.eyebrow || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সংগঠন পরিচিতি"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Main (English)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.titleMain?.en || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  titleMain: { ...(homepageConfig.aboutPreview?.titleMain || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="People First."
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Highlight (English)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.titleHighlight?.en || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  titleHighlight: { ...(homepageConfig.aboutPreview?.titleHighlight || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Humanity Always."
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.titleMain?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  titleMain: { ...(homepageConfig.aboutPreview?.titleMain || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মানুষের পাশে,"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">হাইলাইট শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.aboutPreview?.titleHighlight?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                aboutPreview: {
                  ...homepageConfig.aboutPreview,
                  titleHighlight: { ...(homepageConfig.aboutPreview?.titleHighlight || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মানবতার তরে সর্বদা।"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description (English)</label>
              <textarea
                rows={3}
                value={homepageConfig.aboutPreview?.description?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  aboutPreview: {
                    ...homepageConfig.aboutPreview,
                    description: { ...(homepageConfig.aboutPreview?.description || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="A youth-driven volunteer organization founded in 2015..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">বিবরণ (বাংলা)</label>
              <textarea
                rows={3}
                value={homepageConfig.aboutPreview?.description?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  aboutPreview: {
                    ...homepageConfig.aboutPreview,
                    description: { ...(homepageConfig.aboutPreview?.description || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="২০১৫ সালে চট্টগ্রামের হাটহাজারীতে প্রতিষ্ঠিত..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* Primary & Secondary About CTAs */}
          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            {/* Primary Story CTA */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2">
              <span className="text-[11px] font-bold text-[#006A4E] block">Primary Button (সম্পূর্ণ গল্প পড়ুন)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Text (EN)</label>
                  <input
                    type="text"
                    value={homepageConfig.aboutPreview?.ctaText?.en || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        ctaText: { ...(homepageConfig.aboutPreview?.ctaText || { en: '', bn: '' }), en: e.target.value }
                      }
                    })}
                    placeholder="Read Our Full Story"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">লেখা (বাংলা)</label>
                  <input
                    type="text"
                    value={homepageConfig.aboutPreview?.ctaText?.bn || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        ctaText: { ...(homepageConfig.aboutPreview?.ctaText || { en: '', bn: '' }), bn: e.target.value }
                      }
                    })}
                    placeholder="আমাদের সম্পূর্ণ যাত্রা পড়ুন"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-medium">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.aboutPreview?.ctaUrl || 'about/story'}
                  onChange={(e) => updateHomepageConfig({
                    aboutPreview: {
                      ...homepageConfig.aboutPreview,
                      ctaUrl: e.target.value
                    }
                  })}
                  placeholder="about/story"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            {/* Secondary Team CTA */}
            <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2">
              <span className="text-[11px] font-bold text-slate-700 block">Secondary Button (নেতৃত্ব কমিটি)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Text (EN)</label>
                  <input
                    type="text"
                    value={homepageConfig.aboutPreview?.secondaryCtaText?.en || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        secondaryCtaText: { ...(homepageConfig.aboutPreview?.secondaryCtaText || { en: '', bn: '' }), en: e.target.value }
                      }
                    })}
                    placeholder="Executive Team"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">লেখা (বাংলা)</label>
                  <input
                    type="text"
                    value={homepageConfig.aboutPreview?.secondaryCtaText?.bn || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        secondaryCtaText: { ...(homepageConfig.aboutPreview?.secondaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                      }
                    })}
                    placeholder="নেতৃত্ব কমিটি"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-medium">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.aboutPreview?.secondaryCtaUrl || 'about/executive-committee'}
                  onChange={(e) => updateHomepageConfig({
                    aboutPreview: {
                      ...homepageConfig.aboutPreview,
                      secondaryCtaUrl: e.target.value
                    }
                  })}
                  placeholder="about/executive-committee"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>
          {/* Mission & Vision Homepage Overrides */}
          <div className="sm:col-span-2 space-y-4 pt-3 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Mission & Vision Highlights (লক্ষ্য ও দর্শন হাইলাইটস)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Mission Card */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2.5">
                <span className="text-xs font-bold text-[#006A4E] block">1. Mission Highlight (আমাদের লক্ষ্য)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Heading (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.missionHeading?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          missionHeading: { ...(homepageConfig.aboutPreview?.missionHeading || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Our Mission"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.missionHeading?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          missionHeading: { ...(homepageConfig.aboutPreview?.missionHeading || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="আমাদের লক্ষ্য"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Short Text (EN)</label>
                  <textarea
                    rows={2}
                    value={homepageConfig.aboutPreview?.missionText?.en || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        missionText: { ...(homepageConfig.aboutPreview?.missionText || { en: '', bn: '' }), en: e.target.value }
                      }
                    })}
                    placeholder="Empower communities through transparent action..."
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">সংক্ষিপ্ত বিবরণ (বাংলা)</label>
                  <textarea
                    rows={2}
                    value={homepageConfig.aboutPreview?.missionText?.bn || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        missionText: { ...(homepageConfig.aboutPreview?.missionText || { en: '', bn: '' }), bn: e.target.value }
                      }
                    })}
                    placeholder="স্বচ্ছতা ও তারুণ্যের শক্তিতে মানুষের পাশে দাঁড়ানো..."
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                  />
                </div>
              </div>

              {/* Vision Card */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2.5">
                <span className="text-xs font-bold text-[#006A4E] block">2. Vision Highlight (আমাদের দর্শন)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Heading (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.visionHeading?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          visionHeading: { ...(homepageConfig.aboutPreview?.visionHeading || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Our Vision"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.visionHeading?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          visionHeading: { ...(homepageConfig.aboutPreview?.visionHeading || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="আমাদের দর্শন"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Short Text (EN)</label>
                  <textarea
                    rows={2}
                    value={homepageConfig.aboutPreview?.visionText?.en || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        visionText: { ...(homepageConfig.aboutPreview?.visionText || { en: '', bn: '' }), en: e.target.value }
                      }
                    })}
                    placeholder="Build a resilient and compassionate society..."
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">সংক্ষিপ্ত বিবরণ (বাংলা)</label>
                  <textarea
                    rows={2}
                    value={homepageConfig.aboutPreview?.visionText?.bn || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        visionText: { ...(homepageConfig.aboutPreview?.visionText || { en: '', bn: '' }), bn: e.target.value }
                      }
                    })}
                    placeholder="একটি বৈষম্যহীন ও স্বাবলম্বী সমাজ বিনির্মাণ..."
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About Preview Image & Floating Badge Controls */}
          <div className="sm:col-span-2 space-y-4 pt-3 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              About Image & Overlay Badge (ছবি ও ওভারলে ব্যাজ)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700">Image URL</label>
                  <input
                    type="text"
                    value={homepageConfig.aboutPreview?.imageUrl || ''}
                    onChange={(e) => updateHomepageConfig({
                      aboutPreview: {
                        ...homepageConfig.aboutPreview,
                        imageUrl: e.target.value
                      }
                    })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Image Alt Text</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageAlt || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageAlt: e.target.value
                        }
                      })}
                      placeholder="Team Infinity Bangladesh"
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-700">Crop (CSS object-position)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageCrop || 'center center'}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageCrop: e.target.value
                        }
                      })}
                      placeholder="center center"
                      className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9]">
                <span className="text-xs font-bold text-slate-900 block">Image Bottom Overlay Card</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Badge Title (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageBadgeTitle?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageBadgeTitle: { ...(homepageConfig.aboutPreview?.imageBadgeTitle || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Team Infinity — United for Humanity"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">ব্যাজ শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageBadgeTitle?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageBadgeTitle: { ...(homepageConfig.aboutPreview?.imageBadgeTitle || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="টিম ইনফিনিটি — মানবতার জন্য একতাবদ্ধ"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Subtitle (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageBadgeSubtitle?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageBadgeSubtitle: { ...(homepageConfig.aboutPreview?.imageBadgeSubtitle || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Serving underserved communities since 2015"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">সাবটাইটেল (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.aboutPreview?.imageBadgeSubtitle?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        aboutPreview: {
                          ...homepageConfig.aboutPreview,
                          imageBadgeSubtitle: { ...(homepageConfig.aboutPreview?.imageBadgeSubtitle || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="২০১৫ সাল থেকে সুবিধাবঞ্চিত মানুষের পাশে"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission/Vision & About CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'লক্ষ্য ও দর্শন (Mission & Vision) ডাটা সংযোগ' : 'Mission & Vision Live Cards'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `মিশন: ${tText(aboutSettings.mission)} | দর্শন: ${tText(aboutSettings.vision)}`
                : `Mission: ${aboutSettings.mission.en} | Vision: ${aboutSettings.vision.en}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('about_cms')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isBn ? 'সম্পূর্ণ পরিচিতি এডিট করুন →' : 'Edit Mission/Vision in About CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 04. FLAGSHIP PROGRAMS SECTION */}
      {/* ============================================================= */}
      <div id="sec-04-programs" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              04
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'ধারাবাহিক কর্মসূচি সেকশন (Flagship Programs)' : 'Flagship Programs Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Sustainable Humanitarian Initiatives" — Header & View All CTA
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'programs'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  badge: { ...(homepageConfig.programsSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Flagship Programs"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  badge: { ...(homepageConfig.programsSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="স্থায়ী কার্যক্রম"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  title: { ...(homepageConfig.programsSection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Sustainable Humanitarian Initiatives"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  title: { ...(homepageConfig.programsSection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="ধারাবাহিক মানবিক কর্মসূচি ও ইভেন্ট"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subtitle Description (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.programsSection?.subtitle?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  programsSection: {
                    ...(homepageConfig.programsSection || {}),
                    subtitle: { ...(homepageConfig.programsSection?.subtitle || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="Recurring seasonal programs providing dignified Eid gifts, winter protection, and relief."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">সাবটাইটেল বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.programsSection?.subtitle?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  programsSection: {
                    ...(homepageConfig.programsSection || {}),
                    subtitle: { ...(homepageConfig.programsSection?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="প্রতি বছর নিয়মিতভাবে আয়োজিত সুবিধাবঞ্চিত মানুষের ঈদ আনন্দ, শীতবস্ত্র ও জরুরি খাদ্য কর্মসূচি।"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">View All Button Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.viewAllText?.en || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  viewAllText: { ...(homepageConfig.programsSection?.viewAllText || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="View All Programs & Events"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">বাটন লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.programsSection?.viewAllText?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                programsSection: {
                  ...(homepageConfig.programsSection || {}),
                  viewAllText: { ...(homepageConfig.programsSection?.viewAllText || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সকল কর্মসূচি ও ইভেন্ট তালিকা দেখুন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>
        </div>

        {/* Programs CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'কর্মসূচি ও ইভেন্ট কার্ড কন্টেন্ট' : 'Program Cards Content (3 cards displayed on Homepage)'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `বর্তমান কর্মসূচি তালিকা: ${programs.map(p => isBn ? p.title.bn : p.title.en).join(', ')}`
                : `Active programs: ${programs.map(p => p.title.en).join(', ')}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('programs')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{isBn ? 'কর্মসূচি ম্যানেজ করুন →' : 'Manage Flagship Programs CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 05. RELIEF CAMPAIGNS SECTION */}
      {/* ============================================================= */}
      <div id="sec-05-campaigns" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              05
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'মাঠপর্যায়ের ক্যাম্পেইন সেকশন (Relief Drives & Campaigns)' : 'Relief Campaigns Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Ongoing Relief Drives & Campaigns" — Header & Featured Badge
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'campaigns'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.campaignsSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                campaignsSection: {
                  ...(homepageConfig.campaignsSection || {}),
                  badge: { ...(homepageConfig.campaignsSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Active Field Drives"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.campaignsSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                campaignsSection: {
                  ...(homepageConfig.campaignsSection || {}),
                  badge: { ...(homepageConfig.campaignsSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মাঠপর্যায়ের ক্যাম্পেইন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.campaignsSection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                campaignsSection: {
                  ...(homepageConfig.campaignsSection || {}),
                  title: { ...(homepageConfig.campaignsSection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Ongoing Relief Drives & Campaigns"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.campaignsSection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                campaignsSection: {
                  ...(homepageConfig.campaignsSection || {}),
                  title: { ...(homepageConfig.campaignsSection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="চলমান মানবিক ক্যাম্পেইন ও সেবা"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Featured Card Badge (EN)</label>
              <input
                type="text"
                value={homepageConfig.campaignsSection?.featuredBadgeText?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  campaignsSection: {
                    ...(homepageConfig.campaignsSection || {}),
                    featuredBadgeText: { ...(homepageConfig.campaignsSection?.featuredBadgeText || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="Featured Campaign"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">ফিচার্ড কার্ড ব্যাজ (বাংলা)</label>
              <input
                type="text"
                value={homepageConfig.campaignsSection?.featuredBadgeText?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  campaignsSection: {
                    ...(homepageConfig.campaignsSection || {}),
                    featuredBadgeText: { ...(homepageConfig.campaignsSection?.featuredBadgeText || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="বিশেষ ফিচার্ড ক্যাম্পেইন"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* Featured Campaign Action CTA Buttons */}
          <div className="sm:col-span-2 space-y-3 pt-2 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Featured Campaign Action Buttons (ফিচার্ড কার্ডের বোতামসমূহ)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Primary Details CTA */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2">
                <span className="text-xs font-bold text-[#006A4E] block">1. Details Button (বিবরণ দেখুন)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Text (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.campaignsSection?.featuredDetailsText?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        campaignsSection: {
                          ...(homepageConfig.campaignsSection || {}),
                          featuredDetailsText: { ...(homepageConfig.campaignsSection?.featuredDetailsText || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="View Campaign Details"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">লেখা (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.campaignsSection?.featuredDetailsText?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        campaignsSection: {
                          ...(homepageConfig.campaignsSection || {}),
                          featuredDetailsText: { ...(homepageConfig.campaignsSection?.featuredDetailsText || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="ক্যাম্পেইন বিবরণ দেখুন"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Target Route</label>
                  <input
                    type="text"
                    value={homepageConfig.campaignsSection?.featuredDetailsUrl || 'campaigns/detail'}
                    onChange={(e) => updateHomepageConfig({
                      campaignsSection: {
                        ...(homepageConfig.campaignsSection || {}),
                        featuredDetailsUrl: e.target.value
                      }
                    })}
                    placeholder="campaigns/detail"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              {/* Secondary Support CTA */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2">
                <span className="text-xs font-bold text-rose-700 block">2. Support Button (সহায়তা করুন)</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Text (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.campaignsSection?.featuredSupportText?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        campaignsSection: {
                          ...(homepageConfig.campaignsSection || {}),
                          featuredSupportText: { ...(homepageConfig.campaignsSection?.featuredSupportText || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Support Campaign"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">লেখা (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.campaignsSection?.featuredSupportText?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        campaignsSection: {
                          ...(homepageConfig.campaignsSection || {}),
                          featuredSupportText: { ...(homepageConfig.campaignsSection?.featuredSupportText || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="সহায়তা করুন"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Target Route</label>
                  <input
                    type="text"
                    value={homepageConfig.campaignsSection?.featuredSupportUrl || 'donate'}
                    onChange={(e) => updateHomepageConfig({
                      campaignsSection: {
                        ...(homepageConfig.campaignsSection || {}),
                        featuredSupportUrl: e.target.value
                      }
                    })}
                    placeholder="donate"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaigns CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'ক্যাম্পেইন কন্টেন্ট ও ফিচার্ড নির্ধারণ' : 'Campaign Cards Content & Goal Progress'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `বর্তমান ক্যাম্পেইন সংখ্যা: ${campaigns.length}টি (ফিচার্ড: ${campaigns.find(c => c.isFeatured)?.title?.bn || 'নির্ধারিত'})`
                : `Total active campaigns: ${campaigns.length} (Featured: ${campaigns.find(c => c.isFeatured)?.title?.en || 'Auto'})`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('campaigns')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{isBn ? 'ক্যাম্পেইন ম্যানেজ করুন →' : 'Manage Relief Campaigns CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 06. IMPACT STORIES SECTION */}
      {/* ============================================================= */}
      <div id="sec-06-stories" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              06
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'মানবিক রূপান্তরের গল্প সেকশন (Impact Stories)' : 'Impact Stories Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Stories of Hope & Grassroots Change" — Header & View All CTA
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'stories'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  badge: { ...(homepageConfig.storiesSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Human Dignity"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  badge: { ...(homepageConfig.storiesSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মানবিক দলিল"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  title: { ...(homepageConfig.storiesSection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Stories of Hope & Grassroots Change"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  title: { ...(homepageConfig.storiesSection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="বাস্তব জীবনের রূপান্তরের গল্প"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">View All Button Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.viewAllText?.en || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  viewAllText: { ...(homepageConfig.storiesSection?.viewAllText || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Read All Human Stories"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">বাটন লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.storiesSection?.viewAllText?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                storiesSection: {
                  ...(homepageConfig.storiesSection || {}),
                  viewAllText: { ...(homepageConfig.storiesSection?.viewAllText || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সকল গল্প পড়ুন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>
        </div>

        {/* Stories CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'বাস্তব জীবনের প্রামাণ্য গল্প কন্টেন্ট' : 'Story Records & Beneficiary Consent'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `সংরক্ষিত গল্পের সংখ্যা: ${stories.length}টি (হোমপেজে প্রথম ২টি প্রদর্শিত)`
                : `Total story records: ${stories.length} (First 2 featured on Homepage)`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('stories')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isBn ? 'গল্প আর্কাইভ ম্যানেজ করুন →' : 'Manage Impact Stories CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 07. INFINITY LIFELINE SPOTLIGHT */}
      {/* ============================================================= */}
      <div id="sec-07-lifeline" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#04140F] text-rose-400 font-extrabold flex items-center justify-center font-mono text-sm shadow-xs border border-emerald-900">
              07
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'ইনফিনিটি লাইফলাইন স্পটলাইট (Infinity LifeLine Blood Spotlight)' : 'Infinity LifeLine Spotlight'}
              </h3>
              <p className="text-xs font-bold text-rose-600">
                Controls Homepage: Infinity LifeLine Spotlight — Brand Identity, Narrative & 3 Action CTAs
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'lifeline'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Eyebrow Badge (EN)</label>
            <input
              type="text"
              value={homepageConfig.lifelineSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                lifelineSection: {
                  ...(homepageConfig.lifelineSection || {}),
                  badge: { ...(homepageConfig.lifelineSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="INFINITY LIFELINE — BLOOD INITIATIVE"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">আইব্রো ব্যাজ (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.lifelineSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                lifelineSection: {
                  ...(homepageConfig.lifelineSection || {}),
                  badge: { ...(homepageConfig.lifelineSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="ইনফিনিটি লাইফলাইন — জরুরি রক্তদান"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Subtitle / Bridge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.lifelineSection?.subtitle?.en || ''}
              onChange={(e) => updateHomepageConfig({
                lifelineSection: {
                  ...(homepageConfig.lifelineSection || {}),
                  subtitle: { ...(homepageConfig.lifelineSection?.subtitle || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="An Emergency Blood Donation Initiative by Infinity Bangladesh 🩸"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">সাবটাইটেল ব্রিজ (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.lifelineSection?.subtitle?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                lifelineSection: {
                  ...(homepageConfig.lifelineSection || {}),
                  subtitle: { ...(homepageConfig.lifelineSection?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="ইনফিনিটি বাংলাদেশ-এর একটি জরুরি মানবিক রক্তদান উদ্যোগ 🩸"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Narrative Description (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.lifelineSection?.description?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  lifelineSection: {
                    ...(homepageConfig.lifelineSection || {}),
                    description: { ...(homepageConfig.lifelineSection?.description || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="A dedicated voluntary emergency blood coordination network powered by Infinity Bangladesh."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.lifelineSection?.description?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  lifelineSection: {
                    ...(homepageConfig.lifelineSection || {}),
                    description: { ...(homepageConfig.lifelineSection?.description || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="সংকটাপন্ন মুহূর্তে রোগীদের জন্য দ্রুত রক্তদাতা অনুসন্ধান এবং মানবিক সেবায় স্বেচ্ছাসেবী রক্তদাতাদের সরাসরি যুক্ত করার প্ল্যাটফর্ম।"
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* 3 LifeLine Action CTA Button Text Overrides */}
          <div className="sm:col-span-2 space-y-3 pt-2 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              LifeLine Action Buttons (৩টি অ্যাকশন বাটন টেক্সট)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Find Donor */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2">
                <span className="text-[11px] font-bold text-rose-700 block">1. Find a Donor (রক্তদাতা খুঁজুন)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.findDonorBtnText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      findDonorBtnText: { ...(homepageConfig.lifelineSection?.findDonorBtnText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="Find a Donor (EN)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.findDonorBtnText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      findDonorBtnText: { ...(homepageConfig.lifelineSection?.findDonorBtnText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="রক্তদাতা খুঁজুন (বাংলা)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                />
              </div>

              {/* 2. Become a Donor */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2">
                <span className="text-[11px] font-bold text-[#006A4E] block">2. Become Donor (রক্তদাতা হোন)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.becomeDonorBtnText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      becomeDonorBtnText: { ...(homepageConfig.lifelineSection?.becomeDonorBtnText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="Become a Blood Donor (EN)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.becomeDonorBtnText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      becomeDonorBtnText: { ...(homepageConfig.lifelineSection?.becomeDonorBtnText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="রক্তদাতা হোন (বাংলা)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                />
              </div>

              {/* 3. Emergency Request */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-2">
                <span className="text-[11px] font-bold text-slate-700 block">3. Emergency Request (রক্তের আবেদন)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.emergencyReqBtnText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      emergencyReqBtnText: { ...(homepageConfig.lifelineSection?.emergencyReqBtnText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="Emergency Request (EN)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.emergencyReqBtnText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      emergencyReqBtnText: { ...(homepageConfig.lifelineSection?.emergencyReqBtnText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="জরুরি রক্তের আবেদন (বাংলা)"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                />
              </div>
            </div>
          </div>

          {/* 4 Narrative Chips */}
          <div className="sm:col-span-2 space-y-3 pt-2 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Narrative Progression Chips (৪টি ন্যারেটিভ চিপস)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Chip 1 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 block">1. Chip 1 (১ ফোঁটা রক্ত)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip1?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip1: { ...(homepageConfig.lifelineSection?.chip1 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="ONE DROP"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip1?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip1: { ...(homepageConfig.lifelineSection?.chip1 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="১ ফোঁটা রক্ত"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>

              {/* Chip 2 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 block">2. Chip 2 (১টি জীবন)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip2?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip2: { ...(homepageConfig.lifelineSection?.chip2 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="ONE LIFE"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip2?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip2: { ...(homepageConfig.lifelineSection?.chip2 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="১টি জীবন"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>

              {/* Chip 3 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-emerald-800 block">3. Chip 3 (১ শুভপ্রভাব)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip3?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip3: { ...(homepageConfig.lifelineSection?.chip3 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="ONE RIPPLE"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip3?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip3: { ...(homepageConfig.lifelineSection?.chip3 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="১ শুভপ্রভাব"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>

              {/* Chip 4 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-rose-800 block">4. Chip 4 (অনন্ত আশা)</span>
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip4?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip4: { ...(homepageConfig.lifelineSection?.chip4 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="INFINITE HOPE"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.lifelineSection?.chip4?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    lifelineSection: {
                      ...(homepageConfig.lifelineSection || {}),
                      chip4: { ...(homepageConfig.lifelineSection?.chip4 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="অনন্ত আশা"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>
            </div>
          </div>

          {/* Coordination Network Header & Portal Link */}
          <div className="sm:col-span-2 space-y-3 pt-2 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Coordination Panel & Gateway Link (সমন্বয় নেটওয়ার্ক ও পোর্টাল লিংক)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Coordination Title & Badge */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Coordination Panel Header</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Title (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.coordinationTitle?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          coordinationTitle: { ...(homepageConfig.lifelineSection?.coordinationTitle || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Live Coordination Network"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.coordinationTitle?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          coordinationTitle: { ...(homepageConfig.lifelineSection?.coordinationTitle || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="লাইভ রক্তদান সমন্বয় নেটওয়ার্ক"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Status Badge (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.coordinationBadge?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          coordinationBadge: { ...(homepageConfig.lifelineSection?.coordinationBadge || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="LIVE"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">স্ট্যাটাস ব্যাজ (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.coordinationBadge?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          coordinationBadge: { ...(homepageConfig.lifelineSection?.coordinationBadge || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="সক্রিয়"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
              </div>

              {/* Gateway Portal Link */}
              <div className="p-3.5 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-2">
                <span className="text-xs font-bold text-slate-900 block">Gateway Footnote Portal Link</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">Link Text (EN)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.portalLinkText?.en || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          portalLinkText: { ...(homepageConfig.lifelineSection?.portalLinkText || { en: '', bn: '' }), en: e.target.value }
                        }
                      })}
                      placeholder="Explore Full LifeLine Portal & Guidelines"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-500 font-medium">লেখা (বাংলা)</label>
                    <input
                      type="text"
                      value={homepageConfig.lifelineSection?.portalLinkText?.bn || ''}
                      onChange={(e) => updateHomepageConfig({
                        lifelineSection: {
                          ...(homepageConfig.lifelineSection || {}),
                          portalLinkText: { ...(homepageConfig.lifelineSection?.portalLinkText || { en: '', bn: '' }), bn: e.target.value }
                        }
                      })}
                      placeholder="সম্পূর্ণ রক্তদান কার্যক্রম ও নির্দেশিকা দেখুন"
                      className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Target Route</label>
                  <input
                    type="text"
                    value={homepageConfig.lifelineSection?.portalUrl || 'blood-donation'}
                    onChange={(e) => updateHomepageConfig({
                      lifelineSection: {
                        ...(homepageConfig.lifelineSection || {}),
                        portalUrl: e.target.value
                      }
                    })}
                    placeholder="blood-donation"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#EAE3D9] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blood Donation System & Live Coordination Network Shortcut */}
        <div className="p-4 rounded-2xl bg-[#04140F] text-white border border-emerald-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>{isBn ? 'লাইভ রক্তদান সমন্বয় প্যানেল ও ডোনার ডেটাবেজ' : 'Live LifeLine Coordination Network & Donor Database'}</span>
            </p>
            <p className="text-[11px] text-slate-300">
              {isBn
                ? `নিবন্ধিত রক্তদাতা: ${totalRegisteredDonors} জন | প্রস্তুত: ${totalActiveDonors} জন | লাইভ আবেদন: ${pendingBloodRequests}টি`
                : `Registered Donors: ${totalRegisteredDonors} | Active Emergency: ${totalActiveDonors} | Pending Requests: ${pendingBloodRequests}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('blood_donation')}
            className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{isBn ? 'রক্তদান নেটওয়ার্ক ম্যানেজ করুন →' : 'Manage Blood Donation CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 08. PHOTO GALLERY SECTION */}
      {/* ============================================================= */}
      <div id="sec-08-gallery" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              08
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'মাঠপর্যায়ের স্মৃতি ও আলোকচিত্র (Photo Gallery)' : 'Photo Gallery Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Moments of Humanity in Action" — Header & View All CTA
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'gallery'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  badge: { ...(homepageConfig.gallerySection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Visual Documentation"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  badge: { ...(homepageConfig.gallerySection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="আলোকচিত্রে টিম ইনফিনিটি"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  title: { ...(homepageConfig.gallerySection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Moments of Humanity in Action"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  title: { ...(homepageConfig.gallerySection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মাঠপর্যায়ের স্মৃতি ও আলোকচিত্র"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">View All Button Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.viewAllText?.en || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  viewAllText: { ...(homepageConfig.gallerySection?.viewAllText || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="View Full Photo Gallery"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">বাটন লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.gallerySection?.viewAllText?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                gallerySection: {
                  ...(homepageConfig.gallerySection || {}),
                  viewAllText: { ...(homepageConfig.gallerySection?.viewAllText || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সম্পূর্ণ ফটো গ্যালারি দেখুন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>
        </div>

        {/* Gallery CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'ফটো অ্যালবাম ও মিডিয়া লাইব্রেরি সংযোগ' : 'Photo Gallery Records (First 6 photos on Homepage)'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `সংরক্ষিত ছবির সংখ্যা: ${gallery.length}টি`
                : `Total gallery photos in repository: ${gallery.length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('gallery_albums')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{isBn ? 'ফটো অ্যালবাম ম্যানেজ করুন →' : 'Manage Gallery & Albums CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 09. PRESS / MEDIA COVERAGE SECTION */}
      {/* ============================================================= */}
      <div id="sec-09-press" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              09
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'গণমাধ্যম ও প্রেস সেকশন (Press & Media Coverage)' : 'Press & Media Coverage Section'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Featured Press & Media Coverage" — Header & View All CTA
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'press'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  badge: { ...(homepageConfig.pressSection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="In The News"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  badge: { ...(homepageConfig.pressSection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="গণমাধ্যমে আমরা"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  title: { ...(homepageConfig.pressSection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Featured Press & Media Coverage"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  title: { ...(homepageConfig.pressSection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="জাতীয় গণমাধ্যমে প্রকাশিত প্রতিবেদন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">View All Button Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.viewAllText?.en || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  viewAllText: { ...(homepageConfig.pressSection?.viewAllText || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="View All Press Coverage"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">বাটন লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.viewAllText?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  viewAllText: { ...(homepageConfig.pressSection?.viewAllText || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সকল সংবাদ দেখুন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Article Link Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.readArticleText?.en || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  readArticleText: { ...(homepageConfig.pressSection?.readArticleText || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Read Article"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">প্রতিবেদন লিংক লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.pressSection?.readArticleText?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                pressSection: {
                  ...(homepageConfig.pressSection || {}),
                  readArticleText: { ...(homepageConfig.pressSection?.readArticleText || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="প্রতিবেদন পড়ুন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>
        </div>

        {/* Press CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'সংবাদ প্রতিবেদন ও গণমাধ্যম আর্কাইভ' : 'Published Press Coverage (3 articles displayed on Homepage)'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? `সংরক্ষিত সংবাদের সংখ্যা: ${pressCoverages.length}টি`
                : `Total published press records: ${pressCoverages.filter(p => p.status === 'published').length}`}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('press')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>{isBn ? 'প্রেস কভারেজ ম্যানেজ করুন →' : 'Manage Press Articles CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 10. VOLUNTEER CTA BANNER */}
      {/* ============================================================= */}
      <div id="sec-10-volunteer" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#11241E] text-emerald-300 font-extrabold flex items-center justify-center font-mono text-sm shadow-xs border border-emerald-800">
              10
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'স্বেচ্ছাসেবী আহ্বান ব্যানার (Volunteer CTA Banner)' : 'Volunteer CTA Banner'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: "Empower Communities with Your Time & Passion" — Dark Emerald Volunteer Banner
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'volunteer'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Eyebrow Badge (EN)</label>
            <input
              type="text"
              value={homepageConfig.volunteerBanner?.badge?.en || homepageConfig.volunteerBanner?.eyebrow?.en || ''}
              onChange={(e) => updateHomepageConfig({
                volunteerBanner: {
                  ...homepageConfig.volunteerBanner,
                  badge: { ...(homepageConfig.volunteerBanner?.badge || { en: '', bn: '' }), en: e.target.value },
                  eyebrow: { ...(homepageConfig.volunteerBanner?.eyebrow || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Be Part of Team Infinity"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">আইব্রো ব্যাজ (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.volunteerBanner?.badge?.bn || homepageConfig.volunteerBanner?.eyebrow?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                volunteerBanner: {
                  ...homepageConfig.volunteerBanner,
                  badge: { ...(homepageConfig.volunteerBanner?.badge || { en: '', bn: '' }), bn: e.target.value },
                  eyebrow: { ...(homepageConfig.volunteerBanner?.eyebrow || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="স্বেচ্ছাসেবী পরিবারে স্বাগতম"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Headline Title (EN)</label>
            <input
              type="text"
              value={homepageConfig.volunteerBanner?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                volunteerBanner: {
                  ...homepageConfig.volunteerBanner,
                  title: { ...(homepageConfig.volunteerBanner?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Empower Communities with Your Time & Passion"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.volunteerBanner?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                volunteerBanner: {
                  ...homepageConfig.volunteerBanner,
                  title: { ...(homepageConfig.volunteerBanner?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="মানবতার সেবায় আপনিও হতে পারেন অগ্রদূত"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subtitle Description (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.volunteerBanner?.subtitle?.en || homepageConfig.volunteerBanner?.description?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  volunteerBanner: {
                    ...homepageConfig.volunteerBanner,
                    subtitle: { ...(homepageConfig.volunteerBanner?.subtitle || { en: '', bn: '' }), en: e.target.value },
                    description: { ...(homepageConfig.volunteerBanner?.description || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="Join a vibrant, ethical youth community committed to transparent grassroots humanitarian action..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">সাবটাইটেল বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.volunteerBanner?.subtitle?.bn || homepageConfig.volunteerBanner?.description?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  volunteerBanner: {
                    ...homepageConfig.volunteerBanner,
                    subtitle: { ...(homepageConfig.volunteerBanner?.subtitle || { en: '', bn: '' }), bn: e.target.value },
                    description: { ...(homepageConfig.volunteerBanner?.description || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="টিম ইনফিনিটি একটি তারুণ্যনির্ভর স্বচ্ছ মানবিক পরিবার..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* Primary Button */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
            <span className="text-xs font-extrabold text-slate-900 block">Primary Button (যোগ দিন বোতাম)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Text (EN)</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.primaryButtonText?.en || homepageConfig.volunteerBanner?.primaryCtaText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      primaryButtonText: { ...(homepageConfig.volunteerBanner?.primaryButtonText || { en: '', bn: '' }), en: e.target.value },
                      primaryCtaText: { ...(homepageConfig.volunteerBanner?.primaryCtaText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Become a Volunteer"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.primaryButtonText?.bn || homepageConfig.volunteerBanner?.primaryCtaText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      primaryButtonText: { ...(homepageConfig.volunteerBanner?.primaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                      primaryCtaText: { ...(homepageConfig.volunteerBanner?.primaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                  placeholder="স্বেচ্ছাসেবী হিসেবে যোগ দিন"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.primaryButtonUrl || homepageConfig.volunteerBanner?.primaryCtaUrl || 'volunteer'}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      primaryButtonUrl: e.target.value,
                      primaryCtaUrl: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="volunteer"
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
            <span className="text-xs font-extrabold text-slate-900 block">Secondary Button (নেতৃত্ব বোতাম)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Text (EN)</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.secondaryButtonText?.en || homepageConfig.volunteerBanner?.secondaryCtaText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      secondaryButtonText: { ...(homepageConfig.volunteerBanner?.secondaryButtonText || { en: '', bn: '' }), en: e.target.value },
                      secondaryCtaText: { ...(homepageConfig.volunteerBanner?.secondaryCtaText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Meet Our Team"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.secondaryButtonText?.bn || homepageConfig.volunteerBanner?.secondaryCtaText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      secondaryButtonText: { ...(homepageConfig.volunteerBanner?.secondaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                      secondaryCtaText: { ...(homepageConfig.volunteerBanner?.secondaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                  placeholder="আমাদের নেতৃত্ব দেখুন"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.volunteerBanner?.secondaryButtonUrl || homepageConfig.volunteerBanner?.secondaryCtaUrl || 'about/executive-committee'}
                  onChange={(e) => updateHomepageConfig({
                    volunteerBanner: {
                      ...homepageConfig.volunteerBanner,
                      secondaryButtonUrl: e.target.value,
                      secondaryCtaUrl: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="about/executive-committee"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 11. INSTITUTIONAL TRANSPARENCY PLEDGE */}
      {/* ============================================================= */}
      <div id="sec-11-transparency" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-[#006A4E] text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              11
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'স্বচ্ছতা ও সততার অঙ্গীকার (Transparency Pledge)' : 'Institutional Transparency Pledge'}
              </h3>
              <p className="text-xs font-bold text-[#006A4E]">
                Controls Homepage: Verified Organization Pledge & Transparency Guarantee Card
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'transparency'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Badge Text (EN)</label>
            <input
              type="text"
              value={homepageConfig.transparencySection?.badge?.en || ''}
              onChange={(e) => updateHomepageConfig({
                transparencySection: {
                  ...(homepageConfig.transparencySection || {}),
                  badge: { ...(homepageConfig.transparencySection?.badge || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Verified Grassroots Organization"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">ব্যাজ লেখা (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.transparencySection?.badge?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                transparencySection: {
                  ...(homepageConfig.transparencySection || {}),
                  badge: { ...(homepageConfig.transparencySection?.badge || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="যাচাইকৃত মানবিক সংগঠন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Title Heading (EN)</label>
            <input
              type="text"
              value={homepageConfig.transparencySection?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                transparencySection: {
                  ...(homepageConfig.transparencySection || {}),
                  title: { ...(homepageConfig.transparencySection?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Team Infinity Bangladesh"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.transparencySection?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                transparencySection: {
                  ...(homepageConfig.transparencySection || {}),
                  title: { ...(homepageConfig.transparencySection?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="টিম ইনফিনিটি বাংলাদেশ"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Description / Subtitle (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.transparencySection?.description?.en || homepageConfig.transparencySection?.subtitle?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  transparencySection: {
                    ...(homepageConfig.transparencySection || {}),
                    description: { ...(homepageConfig.transparencySection?.description || { en: '', bn: '' }), en: e.target.value },
                    subtitle: { ...(homepageConfig.transparencySection?.subtitle || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="A dedicated voluntary organization based in Hathazari, Chattogram..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">বিবরণ / সাবটাইটেল (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.transparencySection?.description?.bn || homepageConfig.transparencySection?.subtitle?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  transparencySection: {
                    ...(homepageConfig.transparencySection || {}),
                    description: { ...(homepageConfig.transparencySection?.description || { en: '', bn: '' }), bn: e.target.value },
                    subtitle: { ...(homepageConfig.transparencySection?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="চট্টগ্রামের হাটহাজারীতে প্রতিষ্ঠিত একটি নির্ভরযোগ্য ও অলাভজনক মানবিক সংগঠন..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* 3 Integrity Badges / Pills */}
          <div className="sm:col-span-2 space-y-3 pt-2 border-t border-slate-100">
            <h5 className="text-[11px] font-extrabold text-slate-800 uppercase tracking-wider">
              Integrity & Transparency Highlights (৩টি সততা ও নিশ্চয়তা পিল)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Pill 1 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-[#006A4E] block">1. Pill 1 (১০০% স্বচ্ছ হিসাব)</span>
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill1?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill1: { ...(homepageConfig.transparencySection?.pill1 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="100% Transparent Accounts"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill1?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill1: { ...(homepageConfig.transparencySection?.pill1 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="১০০% স্বচ্ছ হিসাব"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>

              {/* Pill 2 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-[#006A4E] block">2. Pill 2 (জিরো ফি বিকল্প)</span>
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill2?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill2: { ...(homepageConfig.transparencySection?.pill2 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="Zero Admin Fee Option"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill2?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill2: { ...(homepageConfig.transparencySection?.pill2 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="জিরো এডমিন ফি বিকল্প"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>

              {/* Pill 3 */}
              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EAE3D9] space-y-1.5">
                <span className="text-[11px] font-bold text-[#006A4E] block">3. Pill 3 (পাবলিক অডিট)</span>
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill3?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill3: { ...(homepageConfig.transparencySection?.pill3 || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  placeholder="Open Public Audits"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs"
                />
                <input
                  type="text"
                  value={homepageConfig.transparencySection?.pill3?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    transparencySection: {
                      ...(homepageConfig.transparencySection || {}),
                      pill3: { ...(homepageConfig.transparencySection?.pill3 || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  placeholder="পাবলিক অডিট রিপোর্টস"
                  className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transparency CMS Shortcut */}
        <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <p className="text-xs font-extrabold text-slate-900">
              {isBn ? 'স্বচ্ছতা নীতিমালা ও অডিট রিপোর্টস ডাটা' : 'Institutional Transparency Pledge & Reports'}
            </p>
            <p className="text-[11px] text-slate-600">
              {isBn
                ? 'পাবলিক হোমপেজে সংগঠন পরিচিতি, ১০০% স্বচ্ছ হিসাব ও ডাউনলোডযোগ্য অডিট রিপোর্টের নিশ্চয়তা কার্ড প্রদর্শিত হয়।'
                : 'Renders the Verified Organization Badge, financial integrity pledge, and audit downloads.'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('transparency')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-[#E6F3EF] text-[#006A4E] text-xs font-bold border border-[#C2E2D7] shadow-2xs transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isBn ? 'স্বচ্ছতা রিপোর্টস ম্যানেজ করুন →' : 'Manage Transparency CMS →'}</span>
          </button>
        </div>
      </div>

      {/* ============================================================= */}
      {/* 12. SUPPORT & ONLINE DONATION BANNER */}
      {/* ============================================================= */}
      <div id="sec-12-support" className="bg-white rounded-3xl border border-[#EAE3D9] p-6 sm:p-8 space-y-6 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-2xl bg-amber-600 text-white font-extrabold flex items-center justify-center font-mono text-sm shadow-xs">
              12
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 font-display">
                {isBn ? 'অনলাইন অনুদান ও সহায়তা ব্যানার (Support & Donation Banner)' : 'Support & Donation Banner'}
              </h3>
              <p className="text-xs font-bold text-amber-700">
                Controls Homepage: "Stand With Infinity Bangladesh" — Bottom Donation & Audit Banner
              </p>
            </div>
          </div>
          <span className="text-[11px] text-slate-500 bg-[#FAF7F2] px-3 py-1 rounded-xl border border-[#EAE3D9] font-mono">
            sectionKey: 'support'
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">Headline Title (EN)</label>
            <input
              type="text"
              value={homepageConfig.supportBanner?.title?.en || ''}
              onChange={(e) => updateHomepageConfig({
                supportBanner: {
                  ...(homepageConfig.supportBanner || {} as any),
                  title: { ...(homepageConfig.supportBanner?.title || { en: '', bn: '' }), en: e.target.value }
                }
              })}
              placeholder="Stand With Infinity Bangladesh"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-700">মূল শিরোনাম (বাংলা)</label>
            <input
              type="text"
              value={homepageConfig.supportBanner?.title?.bn || ''}
              onChange={(e) => updateHomepageConfig({
                supportBanner: {
                  ...(homepageConfig.supportBanner || {} as any),
                  title: { ...(homepageConfig.supportBanner?.title || { en: '', bn: '' }), bn: e.target.value }
                }
              })}
              placeholder="সহযোগিতার হাত বাড়িয়ে দিন"
              className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
            />
          </div>

          <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Subtitle Description (EN)</label>
              <textarea
                rows={2}
                value={homepageConfig.supportBanner?.subtitle?.en || ''}
                onChange={(e) => updateHomepageConfig({
                  supportBanner: {
                    ...(homepageConfig.supportBanner || {} as any),
                    subtitle: { ...(homepageConfig.supportBanner?.subtitle || { en: '', bn: '' }), en: e.target.value }
                  }
                })}
                placeholder="Your contributions directly fund verified clothes, nourishment, and winter protection..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">সাবটাইটেল বিবরণ (বাংলা)</label>
              <textarea
                rows={2}
                value={homepageConfig.supportBanner?.subtitle?.bn || ''}
                onChange={(e) => updateHomepageConfig({
                  supportBanner: {
                    ...(homepageConfig.supportBanner || {} as any),
                    subtitle: { ...(homepageConfig.supportBanner?.subtitle || { en: '', bn: '' }), bn: e.target.value }
                  }
                })}
                placeholder="আপনার আর্থিক সহযোগিতা সরাসরি সুবিধাবঞ্চিত শিশুদের নতুন পোশাক..."
                className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali"
              />
            </div>
          </div>

          {/* Primary Button */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
            <span className="text-xs font-extrabold text-slate-900 block">Primary Button (অনুদান বোতাম)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Text (EN)</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.primaryButtonText?.en || homepageConfig.supportBanner?.primaryCtaText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      primaryButtonText: { ...(homepageConfig.supportBanner?.primaryButtonText || { en: '', bn: '' }), en: e.target.value },
                      primaryCtaText: { ...(homepageConfig.supportBanner?.primaryCtaText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Donate to Infinity Bangladesh"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.primaryButtonText?.bn || homepageConfig.supportBanner?.primaryCtaText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      primaryButtonText: { ...(homepageConfig.supportBanner?.primaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                      primaryCtaText: { ...(homepageConfig.supportBanner?.primaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                  placeholder="অনলাইন অনুদান প্রদান"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.primaryButtonUrl || homepageConfig.supportBanner?.primaryCtaUrl || 'donate'}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      primaryButtonUrl: e.target.value,
                      primaryCtaUrl: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="donate"
                />
              </div>
            </div>
          </div>

          {/* Secondary Button */}
          <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#EAE3D9] space-y-2">
            <span className="text-xs font-extrabold text-slate-900 block">Secondary Button (অডিট বোতাম)</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Text (EN)</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.secondaryButtonText?.en || homepageConfig.supportBanner?.secondaryCtaText?.en || ''}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      secondaryButtonText: { ...(homepageConfig.supportBanner?.secondaryButtonText || { en: '', bn: '' }), en: e.target.value },
                      secondaryCtaText: { ...(homepageConfig.supportBanner?.secondaryCtaText || { en: '', bn: '' }), en: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs"
                  placeholder="Audit & Expense Logs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">লেখা (বাংলা)</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.secondaryButtonText?.bn || homepageConfig.supportBanner?.secondaryCtaText?.bn || ''}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      secondaryButtonText: { ...(homepageConfig.supportBanner?.secondaryButtonText || { en: '', bn: '' }), bn: e.target.value },
                      secondaryCtaText: { ...(homepageConfig.supportBanner?.secondaryCtaText || { en: '', bn: '' }), bn: e.target.value }
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bengali"
                  placeholder="স্বচ্ছতা ও অডিট রিপোর্ট"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-bold">Target Route</label>
                <input
                  type="text"
                  value={homepageConfig.supportBanner?.secondaryButtonUrl || homepageConfig.supportBanner?.secondaryCtaUrl || 'transparency'}
                  onChange={(e) => updateHomepageConfig({
                    supportBanner: {
                      ...(homepageConfig.supportBanner || {} as any),
                      secondaryButtonUrl: e.target.value,
                      secondaryCtaUrl: e.target.value
                    }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono"
                  placeholder="transparency"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
