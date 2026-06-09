import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VOICE_ROUTES = {
  'home': '/dashboard',
  'dashboard': '/dashboard',
  'scam': '/scam',
  'scam firewall': '/scam',
  'fraud': '/scam',
  'financial twin': '/twin',
  'twin': '/twin',
  'future': '/twin',
  'schemes': '/schemes',
  'scheme': '/schemes',
  'yojana': '/schemes',
  'document': '/docs',
  'documents': '/docs',
  'dastaavej': '/docs',
};

export function useVoiceNav() {
  const navigate = useNavigate();
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
    recognition.lang = 'en-IN';
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
      for (const [phrase, path] of Object.entries(VOICE_ROUTES)) {
        if (spoken.includes(phrase)) {
          setNavigatedTo(phrase);
          setTimeout(() => {
            navigate(path);
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
