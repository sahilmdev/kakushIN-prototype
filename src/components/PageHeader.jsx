import { useTranslation } from 'react-i18next';
import LanguageToggle from './LanguageToggle';

export default function PageHeader({ title, subtitle }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-start justify-between mb-7">
      <div>
        <h1 className="font-display text-2xl font-bold text-text-primary tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-text-secondary text-sm font-body mt-0.5">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3">
        <LanguageToggle />
      </div>
    </div>
  );
}
