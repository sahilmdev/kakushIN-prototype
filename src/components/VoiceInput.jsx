import { Mic } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useVoiceNav } from '../hooks/useVoiceNav';

export default function VoiceInput() {
  const { t } = useTranslation();
  const { startListening, isListening, supported, navigatedTo } = useVoiceNav();

  if (!supported) return null;

  return (
    <div className="fixed right-4 md:right-8 bottom-20 md:bottom-8 z-50 flex flex-col items-center gap-2">
      {/* Navigation feedback toast */}
      {navigatedTo && (
        <div className="bg-white text-text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-border animate-fade-in-down whitespace-nowrap">
          {t('voice.navigatingTo')} {navigatedTo}...
        </div>
      )}

      {/* Listening indicator */}
      {isListening && !navigatedTo && (
        <div className="bg-white text-primary text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-border animate-fade-in-down flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          {t('voice.listening')}
        </div>
      )}

      {/* Mic button */}
      <button
        onClick={startListening}
        disabled={isListening}
        aria-label="Voice navigation"
        className={`w-12 h-12 rounded-full bg-primary shadow-lg shadow-blue flex items-center justify-center relative transition-all hover:bg-primary-dark ${
          isListening ? 'scale-110' : ''
        }`}
      >
        {/* Pulse ring when listening */}
        {isListening && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
        )}
        <Mic size={20} className="text-white relative z-10" />
      </button>
    </div>
  );
}
