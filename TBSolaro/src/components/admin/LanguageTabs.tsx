'use client';

export type Locale = 'vi' | 'en' | 'es';

const TABS: { code: Locale; label: string }[] = [
  { code: 'vi', label: '🇻🇳 VI' },
  { code: 'en', label: '🇬🇧 EN' },
  { code: 'es', label: '🇪🇸 ES' },
];

interface Props {
  value: Locale;
  onChange: (locale: Locale) => void;
}

export default function LanguageTabs({ value, onChange }: Props) {
  return (
    <div className="flex gap-1 border-b border-gray-200 mb-6">
      {TABS.map((tab) => (
        <button
          key={tab.code}
          type="button"
          onClick={() => onChange(tab.code)}
          className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
            value === tab.code
              ? 'bg-white border border-b-white border-gray-200 -mb-px text-brand'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
