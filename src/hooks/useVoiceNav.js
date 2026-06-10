import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Map of language codes to SpeechRecognition language codes
const LANGUAGE_MAP = {
  en: 'en-IN',
  hi: 'hi-IN',
  mr: 'mr-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  gu: 'gu-IN',
  kn: 'kn-IN',
};

export function useVoiceNav() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(false);
  const [navigatedTo, setNavigatedTo] = useState('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    setSupported(!!SpeechRecognition);
  }, []);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = LANGUAGE_MAP[i18n.language] || 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;

    recognition.onstart = () => {
      setIsListening(true);
      setNavigatedTo('');
    };
    recognition.onend = () => setIsListening(false);

    recognition.onresult = (event) => {
      const spoken = event.results[0][0].transcript.toLowerCase().trim();
      setTranscript(spoken);
      
      // Get voice commands from translations
      const commandsMap = t('voice.commandsMap', { returnObjects: true });
      
      // Check for matches against each route's keywords
      for (const [route, keywords] of Object.entries(commandsMap)) {
        if (keywords.some(keyword => spoken.includes(keyword.toLowerCase()))) {
          setNavigatedTo(keywords[0]);
          setTimeout(() => {
            navigate(`/${route}`);
            setNavigatedTo('');
          }, 800);
          return;
        }
      }
    };

    recognition.start();
  };

  return { startListening, isListening, transcript, supported, navigatedTo };
}
