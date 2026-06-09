import { useTranslation } from 'react-i18next';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'mr', label: 'म' },
];

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  return (
    <div
      className="flex rounded-xl bg-surface-raised border border-border p-0.5 shadow-sm"
      role="radiogroup"
      aria-label="Language selection"
    >
      {LANGS.map(({ code, label }) => (
        <button
          key={code}
          role="radio"
          aria-checked={i18n.language === code}
          aria-label={`Switch to ${code}`}
          onClick={() => i18n.changeLanguage(code)}
          className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
            i18n.language === code
              ? 'bg-primary text-white shadow-sm'
              : 'text-text-secondary hover:text-text-primary cursor-pointer'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
