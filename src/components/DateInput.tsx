import React, { useMemo } from 'react';
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
  compact?: boolean;
}

const MONTHS_BN = [
  { value: '01', label: '০১ - জানু' },
  { value: '02', label: '০২ - ফেব' },
  { value: '03', label: '০৩ - মার্চ' },
  { value: '04', label: '০৪ - এপ্রিল' },
  { value: '05', label: '০৫ - মে' },
  { value: '06', label: '০৬ - জুন' },
  { value: '07', label: '০৭ - জুল' },
  { value: '08', label: '০৮ - আগ' },
  { value: '09', label: '০৯ - সেপ্টে' },
  { value: '10', label: '১০ - অক্টো' },
  { value: '11', label: '১১ - নভে' },
  { value: '12', label: '১২ - ডিসে' },
];

const MONTHS_EN = [
  { value: '01', label: '01 - Jan' },
  { value: '02', label: '02 - Feb' },
  { value: '03', label: '03 - Mar' },
  { value: '04', label: '04 - Apr' },
  { value: '05', label: '05 - May' },
  { value: '06', label: '06 - Jun' },
  { value: '07', label: '07 - Jul' },
  { value: '08', label: '08 - Aug' },
  { value: '09', label: '09 - Sep' },
  { value: '10', label: '10 - Oct' },
  { value: '11', label: '11 - Nov' },
  { value: '12', label: '12 - Dec' },
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

    // When all 3 parts are selected, construct YYYY-MM-DD
    if (newYear && newMonth && newDay) {
      const y = parseInt(newYear, 10);
      const m = parseInt(newMonth, 10);
      const maxDays = new Date(y, m, 0).getDate();
      let clampedDay = newDay;
      if (parseInt(newDay, 10) > maxDays) {
        clampedDay = String(maxDays).padStart(2, '0');
      }
      onChange(`${newYear}-${newMonth}-${clampedDay}`);
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

  const selectStyles = `w-full rounded-xl border border-[#EAE3D9] bg-[#FAF7F2] text-slate-800 font-semibold focus:bg-white focus:ring-2 focus:ring-[#006A4E] focus:border-[#006A4E] focus:outline-none transition-all cursor-pointer ${
    compact ? 'px-2 py-1.5 text-xs' : 'px-3 py-2.5 text-xs sm:text-sm'
  } ${disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : ''}`;

  return (
    <div className={`grid grid-cols-3 gap-2 ${className}`} id={id}>
      {/* 1. DAY (DD) */}
      <select
        value={selectedDay}
        onChange={handleDayChange}
        disabled={disabled}
        required={required}
        className={selectStyles}
        aria-label={isBn ? 'দিন (DD)' : 'Day (DD)'}
      >
        <option value="">{isBn ? 'দিন (DD)' : 'Day (DD)'}</option>
        {dayOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* 2. MONTH (MM) */}
      <select
        value={selectedMonth}
        onChange={handleMonthChange}
        disabled={disabled}
        required={required}
        className={selectStyles}
        aria-label={isBn ? 'মাস (MM)' : 'Month (MM)'}
      >
        <option value="">{isBn ? 'মাস (MM)' : 'Month (MM)'}</option>
        {monthOptions.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>

      {/* 3. YEAR (YYYY) */}
      <select
        value={selectedYear}
        onChange={handleYearChange}
        disabled={disabled}
        required={required}
        className={selectStyles}
        aria-label={isBn ? 'বছর (YYYY)' : 'Year (YYYY)'}
      >
        <option value="">{isBn ? 'বছর (Year)' : 'Year (YYYY)'}</option>
        {yearOptions.map((y) => (
          <option key={y.value} value={y.value}>
            {y.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateInput;
