import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  alignment?: 'center' | 'left';
  action?: React.ReactNode;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  alignment = 'center',
  action
}) => {
  const isCenter = alignment === 'center';

  return (
    <div
      className={`mb-10 sm:mb-14 ${
        isCenter
          ? 'text-center max-w-3xl mx-auto'
          : 'flex flex-col md:flex-row md:items-end md:justify-between gap-4'
      }`}
    >
      <div className="space-y-3">
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#E6F3EF] text-[#00523C] border border-[#C2E2D7] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006A4E]" />
            <span>{badge}</span>
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight font-display">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
      </div>

      {action && !isCenter && <div className="shrink-0">{action}</div>}
    </div>
  );
};
