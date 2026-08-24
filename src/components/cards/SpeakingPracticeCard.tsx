import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, Headphones, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { Question } from '../../types';
import { WordSpans } from '../common/WordSpans';
import { SpeechService } from '../../services/speechService';

interface SpeakingPracticeCardProps {
  question: Question;
  onComplete: () => void;
  onWordClick: (word: string) => void;
  targetWords?: string[];
}

export const SpeakingPracticeCard: React.FC<SpeakingPracticeCardProps> = ({
  question,
  onComplete,
  onWordClick,
  targetWords = []
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [spokenText, setSpokenText] = useState('');
  const [accuracyResult, setAccuracyResult] = useState<{
    accuracyPercentage: number;
    missingWords: string[];
    recognizedWords: string[];
    isFullMatch: boolean;
  } | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [isSlowAudio, setIsSlowAudio] = useState(false);

  const recognitionRef = useRef<any>(null);
  const targetSentence = question.correctAnswer || question.audioSentence;

  useEffect(() => {
    // Initialize Web Speech API Speech Recognition if available
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setSpokenText(transcript);
        if (event.results[0].isFinal) {
          const result = SpeechService.calculateAccuracy(transcript, targetSentence);
          setAccuracyResult(result);
          setIsRecording(false);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition event:', event.error);
        if (event.error !== 'no-speech') {
          setSpeechError(`Microphone note: ${event.error}. You can also use the Google Translate link below for voice dictation!`);
        }
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      setSpeechError('Live in-browser speech recognition is optimal in Chrome/Edge. You can use the direct Google Translate link below to test dictation!');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [targetSentence]);

  const handleToggleRecording = () => {
    setSpeechError(null);
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      setSpokenText('');
      setAccuracyResult(null);
      try {
        recognitionRef.current?.start();
        setIsRecording(true);
      } catch (err: any) {
        console.error('Failed to start speech recognition:', err);
        setIsRecording(false);
      }
    }
  };

  const handlePlayAudio = async () => {
    setIsPlayingAudio(true);
    await SpeechService.speak(targetSentence, isSlowAudio ? 0.75 : 0.9);
    setIsPlayingAudio(false);
  };

  const translateUrl = SpeechService.getGoogleTranslateUrl(targetSentence);

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
            <Headphones className="w-3.5 h-3.5" />
            <span>Speaking & Shadowing Hub</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSlowAudio(!isSlowAudio)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                isSlowAudio
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              {isSlowAudio ? '🐢 Slow Speed' : '⚡ Normal Speed'}
            </button>
          </div>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white">
          Target Sentence for Speech Mastery
        </h3>
      </div>

      {/* Target Sentence Display */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/70 border border-slate-800 text-xl sm:text-2xl text-white font-medium leading-relaxed text-center space-y-4">
        <div>
          <WordSpans
            text={targetSentence}
            onWordClick={onWordClick}
            targetWords={targetWords}
          />
        </div>

        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={handlePlayAudio}
            disabled={isPlayingAudio}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isPlayingAudio ? 'Playing...' : 'Shadow Native Voice'}</span>
          </button>
        </div>
      </div>

      {/* Dual Task Instructions (Requirement E) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Speaking Task */}
        <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-2.5">
          <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
            <Mic className="w-4 h-4" />
            <span>🎙️ Speaking Task</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Open the Google Translate link below, tap the microphone icon, and dictate the sentence above. Ensure the speech recognition engine detects <strong>100% of your words</strong> accurately.
          </p>
        </div>

        {/* Listening Task */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
            <Headphones className="w-4 h-4" />
            <span>🎧 Listening Task</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Tap the speaker icon to practice <strong>shadowing</strong> the native pronunciation, word linking, and natural sentence stress patterns.
          </p>
        </div>
      </div>

      {/* In-Browser Mic Test / Dictation Practice */}
      <div className="p-5 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Live Browser Microphone Practice
          </div>
          {accuracyResult && (
            <span className={`text-xs px-2.5 py-1 rounded-full font-bold border ${
              accuracyResult.isFullMatch
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}>
              Accuracy: {accuracyResult.accuracyPercentage}%
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleToggleRecording}
            className={`w-full sm:w-auto px-6 py-3.5 rounded-2xl font-semibold flex items-center justify-center gap-2.5 transition-all shadow-lg ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse shadow-rose-600/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
          >
            {isRecording ? (
              <>
                <MicOff className="w-5 h-5" />
                <span>Recording... (Tap to Stop)</span>
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 text-indigo-400" />
                <span>Test My Voice in Browser</span>
              </>
            )}
          </button>

          <a
            href={translateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3.5 bg-indigo-950/50 hover:bg-indigo-900/60 text-indigo-300 hover:text-white border border-indigo-500/40 rounded-2xl text-sm font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <span>Open in Google Translate</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Spoken Text Feedback */}
        {spokenText && (
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 animate-fade-in space-y-2">
            <div className="text-xs text-slate-400 font-semibold">Detected Speech:</div>
            <p className="italic font-mono text-indigo-200">"{spokenText}"</p>

            {accuracyResult && (
              <div className="pt-2 text-xs space-y-1">
                {accuracyResult.isFullMatch ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Flawless pronunciation and rhythm! You matched all target words.</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Good effort! Missing or mispronounced words: {accuracyResult.missingWords.join(', ') || 'none'}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {speechError && (
          <p className="text-xs text-slate-400 italic">
            {speechError}
          </p>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-400">
          Module practice set completed!
        </div>

        <button
          onClick={onComplete}
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Complete Module & View Summary</span>
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
