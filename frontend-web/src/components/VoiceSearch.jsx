import React, { useState, useEffect } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * VoiceSearch Component
 * Implements browser Web Speech API for zero-friction rural voice input.
 * Supports intelligent parsing of Marathi (mr-IN) and English (en-IN) travel intent phrases.
 * Parses speech like "सावरगाव ते नागपूर" into structured state parameters.
 */
export default function VoiceSearch({ onSpeechParsed }) {
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [transcript, setTranscript] = useState('');

  // Setup Web Speech API recognition instances
  let recognition = null;
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
  }

  // Parse spoken inputs using rule-based natural language patterns tailored for MH villages
  const parseTravelSpeech = (text) => {
    const cleanText = text.toLowerCase().trim();
    let from = '';
    let to = '';

    // Pattern 1: Marathi - "[गाव] ते [शहर/तालुका]" (e.g. "सावरगाव ते नागपूर")
    if (cleanText.includes('ते')) {
      const parts = cleanText.split('ते');
      from = parts[0]?.trim();
      to = parts[1]?.trim();
    }
    // Pattern 2: Marathi - "[गाव] पासून [शहर/तालुका] पर्यंत"
    else if (cleanText.includes('पासून') && cleanText.includes('पर्यंत')) {
      const fromPart = cleanText.split('पासून')[0]?.trim();
      const toPart = cleanText.split('पासून')[1]?.split('पर्यंत')[0]?.trim();
      from = fromPart;
      to = toPart;
    }
    // Pattern 3: English - "from [village] to [town]"
    else if (cleanText.includes('from') && cleanText.includes('to')) {
      const fromPart = cleanText.split('from')[1]?.split('to')[0]?.trim();
      const toPart = cleanText.split('to')[1]?.trim();
      from = fromPart;
      to = toPart;
    }
    // Pattern 4: English - "[village] to [town]"
    else if (cleanText.includes('to')) {
      const parts = cleanText.split('to');
      from = parts[0]?.trim();
      to = parts[1]?.trim();
    }

    // Clean punctuation and excess words (e.g. "जाणे", "एसटी", "बस", "go to", "please")
    const cleanLocation = (loc) => {
      if (!loc) return '';
      return loc
        .replace(/(एसटी|बस|ऑटो|पायवाट|गाडी|मार्गे|पाहिजे|शोध|करा|travel|bus|auto|route|go|want)/gi, '')
        .trim();
    };

    from = cleanLocation(from);
    to = cleanLocation(to);

    if (from || to) {
      onSpeechParsed({ from, to });
    }
  };

  const toggleListening = () => {
    if (!recognition) {
      setErrorMessage("Speech recognition not supported on this browser. Try Chrome/Edge!");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setErrorMessage('');
      setTranscript('');
      
      // Dynamically select language code based on current user locale select
      recognition.lang = i18n.language === 'mr' ? 'mr-IN' : 'en-IN';
      
      try {
        recognition.start();
        setIsListening(true);
      } catch (err) {
        setErrorMessage("Microphone access blocked or already active.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const resultText = event.results[0][0].transcript;
      setTranscript(resultText);
      parseTravelSpeech(resultText);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        setErrorMessage("Microphone permission denied.");
      } else {
        setErrorMessage(`Error: ${event.error}. Please try again.`);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.abort();
    };
  }, [i18n.language]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={toggleListening}
          className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
          title={t('voice_tooltip')}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '999px',
            border: '1.5px solid hsl(var(--border))',
            background: isListening ? 'hsl(var(--msrtc-red) / 0.1)' : 'hsl(var(--secondary) / 0.5)',
            color: isListening ? 'hsl(var(--msrtc-red))' : 'hsl(var(--muted-foreground))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          {isListening ? <Mic size={20} /> : <MicOff size={20} />}
        </button>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isListening ? 'hsl(var(--msrtc-red))' : 'hsl(var(--muted-foreground))' }}>
          {isListening ? t('voice_listening') : t('voice_ready')}
        </span>
      </div>

      {transcript && (
        <div style={{
          fontSize: '0.8rem',
          padding: '0.4rem 0.75rem',
          background: 'hsl(var(--muted) / 0.5)',
          borderRadius: 'var(--radius-sm)',
          fontStyle: 'italic',
          color: 'hsl(var(--foreground))'
        }}>
          "{transcript}"
        </div>
      )}

      {errorMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          fontSize: '0.75rem',
          color: 'hsl(var(--msrtc-red))',
          fontWeight: 500
        }}>
          <AlertCircle size={14} />
          {errorMessage}
        </div>
      )}
    </div>
  );
}
