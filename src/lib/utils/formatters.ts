/**
 * Utility formatters for Infinity Bangladesh
 * Handles BDT currency formatting, Bengali numeral conversion, localized dates, and slugs.
 */

// Map of English digits to Bengali digits
const BN_DIGITS: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

/**
 * Converts English number/digits string to Bengali numerals
 * Example: 1500 -> ১৫০০, "[X]+" -> "[X]+"
 */
export function toBengaliNumerals(value: string | number): string {
  const str = String(value);
  return str.replace(/[0-9]/g, (match) => BN_DIGITS[match] || match);
}

/**
 * Formats a monetary amount into Bangladeshi Taka (BDT) with proper symbol
 * Example: 1500 (EN) -> ৳ 1,500 | 1500 (BN) -> ৳ ১,৫০০
 */
export function formatBDT(amount: number | string, isBn: boolean = false): string {
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.]/g, '')) : amount;
  if (isNaN(num)) {
    return isBn ? '৳ [নির্ধারিত লক্ষ্য]' : '৳ [Target Defined]';
  }

  const formattedEn = new Intl.NumberFormat('en-BD', {
    style: 'decimal',
    maximumFractionDigits: 0
  }).format(num);

  if (isBn) {
    return `৳ ${toBengaliNumerals(formattedEn)}`;
  }
  return `৳ ${formattedEn}`;
}

/**
 * Formats date into readable string
 */
export function formatDate(dateStr: string, isBn: boolean = false): string {
  if (!dateStr || dateStr.includes('[') || dateStr.toLowerCase().includes('schedule') || dateStr.toLowerCase().includes('drive')) {
    return dateStr;
  }

  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;

    if (isBn) {
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formatted = d.toLocaleDateString('bn-BD', options);
      return formatted;
    }

    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Generates URL-friendly slug from title
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Truncates text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
