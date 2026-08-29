import React, { useMemo } from 'react';
import { Calendar, X, RotateCcw } from 'lucide-react';
import { toBengaliNumerals } from '../lib/utils/formatters';

export interface DateInputProps {
  value?: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  isBn?: boolean;
  min?: string; // YYYY-MM-DD
  max?: string; // YYYY-MM-DD
  required?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  minYear?: number;
  maxYear?: number;
  yearOrder?: 'desc' | 'asc';
  showQuickToday?: boolean;
  showFormattedBadge?: boolean;
  compact?: boolean;
}

const MONTHS_BN = [
  { value: '01', name: 'জানুয়ারি', short: '০১ - জানু' },
  { value: '02', name: 'ফেব্রুয়ারি', short: '০২ - ফেব' },
  { value: '03', name: 'মার্চ', short: '০৩ - মার্চ' },
  { value: '04', name: 'এপ্রিল', short: '০৪ - এপ্রিল' },
  { value: '05', name: 'মে', short: '০৫ - মে' },
  { value: '06', name: 'জুন', short: '০৬ - জুন' },
  { value: '07', name: 'জুলাই', short: '০৭ - জুল' },
  { value: '08', name: 'আগস্ট', short: '০৮ - আগ' },
  { value: '09', name: 'সেপ্টেম্বর', short: '০৯ - সেপ্টে' },
  { value: '10', name: 'অক্টোবর', short: '১০ - অক্টো' },
  { value: '11', name: 'নভেম্বর', short: '১১ - নভে' },
  { value: '12', name: 'ডিসেম্বর', short: '১২ - ডিসে' },
];

const MONTHS_EN = [
  { value: '01', name: 'January', short: '01 - Jan' },
  { value: '02', name: 'February', short: '02 - Feb' },
  { value: '03', name: 'March', short: '03 - Mar' },
  { value: '04', name: 'April', short: '04 - Apr' },
  { value: '05', name: 'May', short: '05 - May' },
  { value: '06', name: 'June', short: '06 - Jun' },
  { value: '07', name: 'July', short: '07 - Jul' },
  { value: '08', name: 'August', short: '08 - Aug' },
  { value: '09', name: 'September', short: '09 - Sep' },
  { value: '10', name: 'October', short: '10 - Oct' },
  { value: '11', name: 'November', short: '11 - Nov' },
  { value: '12', name: 'December', short: '12 - Dec' },
];

export const DateInput: React.FC<DateInputProps> = ({
  value = '',
  onChange,
  isBn = false,
  min,
  max,
  required = false,
  disabled = false,
  className = '',
  id,
  minYear = 1930,
  maxYear = new Date().getFullYear() + 5,
  yearOrder = 'desc',
  showQuickToday = false,
  showFormattedBadge = true,
  compact = false,
}) => {
  // Parse value (format: YYYY-MM-DD)
  const [selectedYear, selectedMonth, selectedDay] = useMemo(() => {
    if (!value || typeof value !== 'string' || !value.includes('-')) {
      return ['', '', ''];
    }
    const parts = value.split('-');
    if (parts.length >= 3) {
      const y = parts[0] || '';
      const m = parts[1] ? parts[1].padStart(2, '0') : '';
      const d = parts[2] ? parts[2].padStart(2, '0') : '';
      return [y, m, d];
    }
    return ['', '', ''];
  }, [value]);

  // Calculate days in selected month and year
  const daysInMonth = useMemo(() => {
    const y = parseInt(selectedYear, 10) || 2026;
    const m = parseInt(selectedMonth, 10) || 1;
    return new Date(y, m, 0).getDate();
  }, [selectedYear, selectedMonth]);

  // Generate day options 01 - daysInMonth
  const dayOptions = useMemo(() => {
    const days: { value: string; label: string }[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const valStr = String(i).padStart(2, '0');
      days.push({
        value: valStr,
        label: isBn ? toBengaliNumerals(valStr) : valStr,
      });
    }
    return days;
  }, [daysInMonth, isBn]);

  // Month options
  const monthOptions = isBn ? MONTHS_BN : MONTHS_EN;

  // Generate year options
  const yearOptions = useMemo(() => {
    const years: { value: string; label: string }[] = [];
    const start = Math.min(minYear, maxYear);
    const end = Math.max(minYear, maxYear);

    if (yearOrder === 'desc') {
      for (let y = end; y >= start; y--) {
        const valStr = String(y);
        years.push({
          value: valStr,
          label: isBn ? toBengaliNumerals(valStr) : valStr,
        });
      }
    } else {
      for (let y = start; y <= end; y++) {
        const valStr = String(y);
        years.push({
          value: valStr,
          label: isBn ? toBengaliNumerals(valStr) : valStr,
        });
      }
    }
    return years;
  }, [minYear, maxYear, yearOrder, isBn]);

  // Update date state handler
  const handlePartChange = (newDay: string, newMonth: string, newYear: string) => {
    if (!newDay && !newMonth && !newYear) {
      onChange('');
      return;
    }

    // Auto clamp day if needed (e.g. Feb 30 -> Feb 28/29)
    if (newYear && newMonth && newDay) {
      const y = parseInt(newYear, 10);
      const m = parseInt(newMonth, 10);
      const maxDays = new Date(y, m, 0).getDate();
      let clampedDay = newDay;
      if (parseInt(newDay, 10) > maxDays) {
        clampedDay = String(maxDays).padStart(2, '0');
      }
      onChange(`${newYear}-${newMonth}-${clampedDay}`);
    } else if (newYear && newMonth && !newDay) {
      // Partial: not complete yet, but if user only selects year & month, keep empty or emit partial
      // Emitting standard is only when all 3 are selected
      // But we can store partial or wait
      onChange('');
    } else {
      onChange('');
    }
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const y = selectedYear || String(new Date().getFullYear());
    const m = selectedMonth || '01';
    handlePartChange(val, m, y);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const y = selectedYear || String(new Date().getFullYear());
    const d = selectedDay || '01';
    handlePartChange(d, val, y);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const m = selectedMonth || '01';
    const d = selectedDay || '01';
    handlePartChange(d, m, val);
  };

  const handleSetToday = () => {
    const now = new Date();
    const y = String(now.getFullYear());
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    onChange(`${y}-${m}-${d}`);
  };

  const handleClear = () => {
    onChange('');
  };

  // Formatted display string DD/MM/YYYY
  const formattedDisplay = useMemo(() => {
    if (selectedDay && selectedMonth && selectedYear) {
      const dd = selectedDay;
      const mm = selectedMonth;
      const yyyy = selectedYear;
      if (isBn) {
        return `${toBengaliNumerals(dd)}/${toBengaliNumerals(mm)}/${toBengaliNumerals(yyyy)}`;
      }
      return `${dd}/${mm}/${yyyy}`;
    }
    return '';
  }, [selectedDay, selectedMonth, selectedYear, isBn]);

  const selectBaseStyles = `w-full rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-slate-800 font-semibold focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:border-[#006A4E] focus:outline-none transition-all cursor-pointer ${
    compact ? 'px-2 py-1.5 text-xs' : 'px-2.5 sm:px-3 py-2 sm:py-2.5 text-xs sm:text-sm'
  } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`;

  return (
    <div className={`space-y-1.5 ${className}`} id={id}>
      {/* 3 Select Dropdowns: DD / MM / YYYY */}
      <div className="grid grid-cols-12 gap-1.5 sm:gap-2 items-center">
        {/* DAY (DD) */}
        <div className="col-span-4 space-y-0.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isBn ? 'দিন (DD)' : 'Day (DD)'}
            </span>
          </div>
          <div className="relative">
            <select
              value={selectedDay}
              onChange={handleDayChange}
              disabled={disabled}
              required={required}
              className={selectBaseStyles}
              aria-label={isBn ? 'দিন নির্বাচন করুন' : 'Select Day'}
            >
              <option value="">{isBn ? 'দিন (DD)' : 'DD'}</option>
              {dayOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MONTH (MM) */}
        <div className="col-span-4 space-y-0.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isBn ? 'মাস (MM)' : 'Month (MM)'}
            </span>
          </div>
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={handleMonthChange}
              disabled={disabled}
              required={required}
              className={selectBaseStyles}
              aria-label={isBn ? 'মাস নির্বাচন করুন' : 'Select Month'}
            >
              <option value="">{isBn ? 'মাস (MM)' : 'MM'}</option>
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value}>
                  {compact ? m.short : m.short}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* YEAR (YYYY) */}
        <div className="col-span-4 space-y-0.5">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isBn ? 'বছর (Year)' : 'Year (YYYY)'}
            </span>
          </div>
          <div className="relative">
            <select
              value={selectedYear}
              onChange={handleYearChange}
              disabled={disabled}
              required={required}
              className={selectBaseStyles}
              aria-label={isBn ? 'বছর নির্বাচন করুন' : 'Select Year'}
            >
              <option value="">{isBn ? 'বছর (Year)' : 'Year'}</option>
              {yearOptions.map((y) => (
                <option key={y.value} value={y.value}>
                  {y.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Date helpers / Formatted Badge & Quick Actions */}
      <div className="flex items-center justify-between gap-2 text-[11px] pt-0.5">
        <div className="flex items-center gap-1.5">
          {formattedDisplay ? (
            <span className="inline-flex items-center gap-1 font-bold text-[#006A4E] bg-emerald-50/90 border border-emerald-200 px-2 py-0.5 rounded-lg shadow-2xs animate-in fade-in">
              <Calendar className="w-3 h-3 text-[#006A4E]" />
              <span className="font-mono text-xs">{formattedDisplay}</span>
              <span className="text-[9px] font-normal text-emerald-700 opacity-80">(DD/MM/YYYY)</span>
            </span>
          ) : (
            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{isBn ? 'দিন / মাস / বছর (DD/MM/YYYY) নির্বাচন করুন' : 'Select Day / Month / Year (DD/MM/YYYY)'}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 ml-auto">
          {/* Quick Today Button */}
          {showQuickToday && (
            <button
              type="button"
              onClick={handleSetToday}
              disabled={disabled}
              className="text-[10px] font-bold text-[#006A4E] hover:text-[#00523C] bg-emerald-50 hover:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-200 transition-colors flex items-center gap-0.5 cursor-pointer"
              title={isBn ? 'আজকের তারিখ দিন' : 'Set Today'}
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>{isBn ? 'আজকে' : 'Today'}</span>
            </button>
          )}

          {/* Clear Button */}
          {value && (
            <button
              type="button"
              onClick={handleClear}
              disabled={disabled}
              className="text-[10px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-1.5 py-0.5 rounded transition-colors flex items-center gap-0.5 cursor-pointer"
              title={isBn ? 'তারিখ মুছুন' : 'Clear Date'}
            >
              <X className="w-3 h-3" />
              <span>{isBn ? 'রিসেট' : 'Clear'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DateInput;
