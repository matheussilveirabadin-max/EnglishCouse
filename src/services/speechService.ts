export class SpeechService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;

  /**
   * Generates a direct Google Translate link with preloaded sentence for listening & dictation
   */
  public static getGoogleTranslateUrl(sentence: string): string {
    const encoded = encodeURIComponent(sentence.trim());
    return `https://translate.google.com/?sl=en&tl=en&text=${encoded}&op=translate`;
  }

  /**
   * Play sentence audio using native browser Web Speech API
   */
  public static speak(text: string, rate: number = 0.9): Promise<void> {
    return new Promise((resolve) => {
      if (!this.synth) {
        console.warn('Speech synthesis is not supported in this browser.');
        resolve();
        return;
      }

      this.synth.cancel(); // Stop any active speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate; // slightly slower for language learners
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick a natural English voice if available
      const voices = this.synth.getVoices();
      const preferred = voices.find(v => (v.lang === 'en-US' || v.lang === 'en-GB') && v.name.includes('Natural')) 
        || voices.find(v => v.lang === 'en-US' || v.lang === 'en-GB')
        || voices.find(v => v.lang.startsWith('en'));

      if (preferred) {
        utterance.voice = preferred;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      this.synth.speak(utterance);
    });
  }

  public static stopSpeaking(): void {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Calculates similarity percentage between spoken transcription and target sentence
   */
  public static calculateAccuracy(spoken: string, target: string): {
    accuracyPercentage: number;
    missingWords: string[];
    recognizedWords: string[];
    isFullMatch: boolean;
  } {
    const cleanSpoken = spoken.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim().split(/\s+/).filter(Boolean);
    const cleanTarget = target.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim().split(/\s+/).filter(Boolean);

    if (cleanTarget.length === 0) {
      return { accuracyPercentage: 100, missingWords: [], recognizedWords: [], isFullMatch: true };
    }

    const recognizedWords: string[] = [];
    const missingWords: string[] = [];

    const spokenSet = new Set(cleanSpoken);
    for (const word of cleanTarget) {
      if (spokenSet.has(word)) {
        recognizedWords.push(word);
      } else {
        missingWords.push(word);
      }
    }

    const accuracyPercentage = Math.round((recognizedWords.length / cleanTarget.length) * 100);
    const isFullMatch = accuracyPercentage >= 85;

    return {
      accuracyPercentage,
      missingWords,
      recognizedWords,
      isFullMatch
    };
  }
}
