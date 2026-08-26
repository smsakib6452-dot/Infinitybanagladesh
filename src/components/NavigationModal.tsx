import React, { useState, useEffect } from 'react';
import { NavigationItem, NavigationSubItem } from '../types';
import { Compass, X, Plus, Trash2, Eye, EyeOff, ExternalLink, Link2, Layers } from 'lucide-react';

interface NavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: NavigationItem | null;
  onSave: (data: Partial<NavigationItem>) => void;
  isBn?: boolean;
}

const PRESET_ROUTES = [
  { value: 'home', label: 'Home / হোম' },
  { value: 'about', label: 'About Us / আমাদের পরিচয়' },
  { value: 'about/executive-committee', label: 'Executive Committee / কার্যনির্বাহী কমিটি' },
  { value: 'about/standing-committees', label: 'Standing Committee / স্থায়ী কমিটি' },
  { value: 'about/past-committees', label: 'Past Leadership / সাবেক কমিটিসমূহ' },
  { value: 'programs', label: 'Programs / কার্যক্রম ও কর্মসূচি' },
  { value: 'campaigns', label: 'Campaigns / ক্যাম্পেইন' },
  { value: 'stories', label: 'Impact Stories / অনুপ্রেরণার গল্প' },
  { value: 'gallery', label: 'Photo Gallery / ফটো গ্যালারি' },
  { value: 'videos', label: 'Video Gallery / ভিডিও গ্যালারি' },
  { value: 'media-coverage', label: 'Media Coverage / প্রেস ও গণমাধ্যম' },
  { value: 'volunteer', label: 'Volunteer Registration / ভলান্টিয়ার আবেদন' },
  { value: 'donate', label: 'Donate / অনলাইন অনুদান' },
  { value: 'transparency', label: 'Transparency & Audit / স্বচ্ছতা ও অডিট' },
  { value: 'news', label: 'News & Announcements / খবর ও নোটিশ' },
  { value: 'events', label: 'Upcoming Events / ইভেন্টস' },
  { value: 'contact', label: 'Contact Us / যোগাযোগ' }
];

export const NavigationModal: React.FC<NavigationModalProps> = ({
  isOpen,
  onClose,
  item,
  onSave,
  isBn = false
}) => {
  const [labelEn, setLabelEn] = useState('');
  const [labelBn, setLabelBn] = useState('');
  const [path, setPath] = useState('about');
  const [isExternal, setIsExternal] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [active, setActive] = useState(true);
  const [children, setChildren] = useState<NavigationSubItem[]>([]);

  // Submenu input state
  const [newSubLabelEn, setNewSubLabelEn] = useState('');
  const [newSubLabelBn, setNewSubLabelBn] = useState('');
  const [newSubPath, setNewSubPath] = useState('');

  useEffect(() => {
    if (item) {
      setLabelEn(item.label?.en || '');
      setLabelBn(item.label?.bn || '');
      setPath(item.path || 'about');
      setIsExternal(!!item.isExternal);
      setIsDropdown(!!item.isDropdown);
      setActive(item.active !== false);
      setChildren(item.children ? [...item.children] : []);
    } else {
      setLabelEn('');
      setLabelBn('');
      setPath('about');
      setIsExternal(false);
      setIsDropdown(false);
      setActive(true);
      setChildren([]);
    }
    setNewSubLabelEn('');
    setNewSubLabelBn('');
    setNewSubPath('');
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleAddSubItem = () => {
    if (!newSubLabelEn.trim() && !newSubLabelBn.trim()) return;
    const newChild: NavigationSubItem = {
      id: `sub-${Date.now()}`,
      label: {
        en: newSubLabelEn.trim() || newSubLabelBn.trim(),
        bn: newSubLabelBn.trim() || newSubLabelEn.trim()
      },
      path: newSubPath.trim() || 'about',
      active: true
    };
    setChildren(prev => [...prev, newChild]);
    setNewSubLabelEn('');
    setNewSubLabelBn('');
    setNewSubPath('');
  };

  const handleRemoveSubItem = (id: string) => {
    setChildren(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleSubItemActive = (id: string) => {
    setChildren(prev => prev.map(c => c.id === id ? { ...c, active: c.active === false ? true : false } : c));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!labelEn.trim() && !labelBn.trim()) return;

    onSave({
      label: {
        en: labelEn.trim() || labelBn.trim(),
        bn: labelBn.trim() || labelEn.trim()
      },
      path: path.trim() || 'home',
      isExternal,
      isDropdown,
      active,
      children: isDropdown ? children : []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-200 relative text-left space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5 text-[#006A4E] font-bold text-lg">
            <Compass className="w-5 h-5 text-[#006A4E]" />
            <span>
              {item
                ? (isBn ? 'মেনু লিঙ্ক সম্পাদনা করুন' : 'Edit Navigation Link')
                : (isBn ? 'নতুন মেনু লিঙ্ক যুক্ত করুন' : 'Add New Navigation Link')}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-xl font-bold p-1 leading-none cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          {/* Label Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-bold text-slate-800">Menu Label (English) *</label>
              <input
                type="text"
                required
                value={labelEn}
                onChange={(e) => setLabelEn(e.target.value)}
                placeholder="e.g. About Us / Our Work"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-800">মেনুর নাম (বাংলা) *</label>
              <input
                type="text"
                required
                value={labelBn}
                onChange={(e) => setLabelBn(e.target.value)}
                placeholder="যেমন: আমাদের পরিচয় / কার্যক্রম"
                className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-bengali focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
              />
            </div>
          </div>

          {/* Route / Target Path */}
          <div className="space-y-2">
            <label className="font-bold text-slate-800 flex items-center justify-between">
              <span>Target Route / URL *</span>
              <span className="text-[11px] font-normal text-slate-500">Select preset or type custom path</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-5">
                <select
                  value={PRESET_ROUTES.some(r => r.value === path) ? path : 'custom'}
                  onChange={(e) => {
                    if (e.target.value !== 'custom') {
                      setPath(e.target.value);
                    }
                  }}
                  className="w-full px-3 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                >
                  <option value="custom">Custom URL / অন্যান্য...</option>
                  {PRESET_ROUTES.map(r => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-7">
                <input
                  type="text"
                  required
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                  placeholder="e.g. about or https://..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-xl text-xs font-mono focus:ring-2 focus:ring-[#006A4E] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Options & Visibility Controls */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#EAE3D9] space-y-3">
            <h4 className="font-bold text-slate-800 text-xs flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#006A4E]" />
              <span>Link Settings & Visibility</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {/* Eye Visibility Toggle */}
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`p-3 rounded-xl border flex items-center justify-between gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-emerald-50 border-emerald-300 text-[#00523C]'
                    : 'bg-slate-100 border-slate-300 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  {active ? <Eye className="w-4 h-4 text-[#006A4E]" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                  <span className="font-bold">{active ? (isBn ? 'দৃশ্যমান' : 'Visible') : (isBn ? 'লুকানো' : 'Hidden')}</span>
                </div>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  active ? 'bg-[#006A4E] text-white' : 'bg-slate-300 text-slate-700'
                }`}>
                  {active ? 'Active' : 'Off'}
                </span>
              </button>

              {/* Is Dropdown Toggle */}
              <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                isDropdown ? 'bg-emerald-50 border-emerald-300 text-[#00523C]' : 'bg-white border-[#EAE3D9] text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={isDropdown}
                  onChange={(e) => setIsDropdown(e.target.checked)}
                  className="rounded text-[#006A4E] focus:ring-[#006A4E] w-4 h-4"
                />
                <span className="font-bold">{isBn ? 'ড্রপডাউন মেনু' : 'Has Dropdown'}</span>
              </label>

              {/* Is External Toggle */}
              <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                isExternal ? 'bg-emerald-50 border-emerald-300 text-[#00523C]' : 'bg-white border-[#EAE3D9] text-slate-700'
              }`}>
                <input
                  type="checkbox"
                  checked={isExternal}
                  onChange={(e) => setIsExternal(e.target.checked)}
                  className="rounded text-[#006A4E] focus:ring-[#006A4E] w-4 h-4"
                />
                <span className="font-bold">{isBn ? 'বাহ্যিক লিঙ্ক (New Tab)' : 'External Link'}</span>
              </label>
            </div>
          </div>

          {/* Submenu Items Manager (If Dropdown Enabled) */}
          {isDropdown && (
            <div className="space-y-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-xs text-[#00523C] flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5 text-[#006A4E]" />
                  <span>{isBn ? 'ড্রপডাউন সাব-মেনু লিংকসমূহ' : 'Dropdown Submenu Links'}</span>
                </h4>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  {children.length} {isBn ? 'টি সাব-লিঙ্ক' : 'sub-items'}
                </span>
              </div>

              {/* Sub-item List */}
              <div className="space-y-2">
                {children.map((sub, idx) => (
                  <div
                    key={sub.id}
                    className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 transition-all ${
                      sub.active !== false
                        ? 'bg-white border-emerald-100 text-slate-800'
                        : 'bg-slate-100/80 border-slate-200 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="w-5 h-5 rounded-md bg-emerald-100 text-[#00523C] text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div className="truncate">
                        <span className="font-bold text-xs">{sub.label.en} ({sub.label.bn})</span>
                        <span className="text-[10px] font-mono text-slate-500 block truncate">Route: {sub.path}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* Sub-item Eye Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleSubItemActive(sub.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer transition-all ${
                          sub.active !== false
                            ? 'bg-emerald-100 text-[#006A4E] hover:bg-emerald-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title={sub.active !== false ? 'Hide Sub-item' : 'Show Sub-item'}
                      >
                        {sub.active !== false ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span className="text-[10px]">{sub.active !== false ? 'Visible' : 'Hidden'}</span>
                      </button>

                      {/* Remove Sub-item */}
                      <button
                        type="button"
                        onClick={() => handleRemoveSubItem(sub.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                        title="Remove Sub-item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {children.length === 0 && (
                  <p className="text-[11px] text-slate-500 italic text-center py-2 bg-white/60 rounded-xl border border-dashed border-emerald-200">
                    {isBn ? 'কোনো সাব-মেনু লিংক নেই। নিচের ফর্ম দিয়ে নতুন সাব-লিংক যোগ করুন।' : 'No sub-items added yet. Add links below.'}
                  </p>
                )}
              </div>

              {/* Add New Sub-item Form */}
              <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-2 pt-3">
                <p className="text-[11px] font-bold text-slate-800">+ Add Submenu Item</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={newSubLabelEn}
                    onChange={(e) => setNewSubLabelEn(e.target.value)}
                    placeholder="Sub-item (English)"
                    className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg text-xs"
                  />
                  <input
                    type="text"
                    value={newSubLabelBn}
                    onChange={(e) => setNewSubLabelBn(e.target.value)}
                    placeholder="সাব-আইটেম (বাংলা)"
                    className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg text-xs font-bengali"
                  />
                  <input
                    type="text"
                    value={newSubPath}
                    onChange={(e) => setNewSubPath(e.target.value)}
                    placeholder="Route (e.g. about/standing-committees)"
                    className="px-2.5 py-1.5 bg-[#FAF7F2] border border-[#EAE3D9] rounded-lg text-xs font-mono"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSubItem}
                  className="px-3 py-1.5 rounded-lg bg-[#006A4E] hover:bg-[#00523C] text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সাব-লিংক যোগ করুন' : 'Add Submenu Link'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#006A4E] text-white font-bold hover:bg-[#00523C] shadow-warm-sm cursor-pointer"
            >
              {item ? 'Update Link' : 'Save Link'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
