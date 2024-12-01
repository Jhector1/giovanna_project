import { useState, useEffect } from 'react';

const synth = window.speechSynthesis;

const useTextToSpeech = () => {
  const [defaultEnglishVoice, setDefaultEnglishVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // Function to fetch the available voices
    const populateVoices = () => {
      const availableVoices = synth.getVoices();

      const englishVoice =
        availableVoices.find(
          voice => voice.lang.startsWith('en') && voice.name.toLowerCase().includes('us'),
        ) || availableVoices.find(voice => voice.lang.startsWith('en'));

      setDefaultEnglishVoice(englishVoice || null);
    };

    // Populate voices when the component mounts
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = populateVoices;
    }

    populateVoices();
  }, []);

  const speak = (text: string) => {
    if (synth.speaking) {
      synth.cancel(); // Cancel any ongoing speech before starting new
    }

    const utterance = new SpeechSynthesisUtterance(text);
    if (defaultEnglishVoice) {
      utterance.voice = defaultEnglishVoice;
    }

    synth.speak(utterance);
  };

  return {
    speak,
  };
};

export default useTextToSpeech;
