import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, RotateCcw, Sparkles, ExternalLink } from 'lucide-react';
import { Question } from '../../types';
import { WordSpans } from '../common/WordSpans';
import { SpeechService } from '../../services/speechService';

interface SentenceUnscrambleCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  onNext: () => void;
  onWordClick: (word: string) => void;
  targetWords?: string[];
}

export const SentenceUnscrambleCard: React.FC<SentenceUnscrambleCardProps> = ({
  question,
  onAnswer,
  onNext,
  onWordClick,
  targetWords = []
}) => {
  const [availableTokens, setAvailableTokens] = useState<Array<{ id: string; text: string }>>([]);
  const [selectedTokens, setSelectedTokens] = useState<Array<{ id: string; text: string }>>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const raw = question.scrambledTokens || question.correctAnswer.split(' ');
    // Deterministic shuffle
    const indexed = raw.map((token, i) => ({ id: `token-${i}-${token}`, text: token }));
    const shuffled = [...indexed].sort(() => 0.5 - Math.random());
    setAvailableTokens(shuffled);
    setSelectedTokens([]);
    setIsSubmitted(false);
  }, [question.id]);

  const handleSelectToken = (token: { id: string; text: string }) => {
    if (isSubmitted) return;
    setAvailableTokens(prev => prev.filter(t => t.id !== token.id));
    setSelectedTokens(prev => [...prev, token]);
  };

  const handleRemoveToken = (token: { id: string; text: string }) => {
    if (isSubmitted) return;
    setSelectedTokens(prev => prev.filter(t => t.id !== token.id));
    setAvailableTokens(prev => [...prev, token]);
  };

  const handleReset = () => {
    if (isSubmitted) return;
    const raw = question.scrambledTokens || question.correctAnswer.split(' ');
    const indexed = raw.map((token, i) => ({ id: `token-${i}-${token}`, text: token }));
    setAvailableTokens(indexed.sort(() => 0.5 - Math.random()));
    setSelectedTokens([]);
  };

  const cleanText = (t: string) => t.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '').trim();

  const userSentence = selectedTokens.map(t => t.text).join(' ');
  const isCorrect = isSubmitted && cleanText(userSentence) === cleanText(question.correctAnswer);

  const handleSubmit = () => {
    if (selectedTokens.length === 0 || isSubmitted) return;
    const correct = cleanText(userSentence) === cleanText(question.correctAnswer);
    setIsSubmitted(true);
    onAnswer(correct, userSentence);
    SpeechService.speak(question.audioSentence, 0.9);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Sentence Unscrambler
          </span>
          <button
            onClick={handleReset}
            disabled={isSubmitted || selectedTokens.length === 0}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors px-2.5 py-1 bg-slate-800 rounded-lg disabled:opacity-40"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Words</span>
          </button>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          {question.prompt}
        </h3>
        <p className="text-xs text-slate-400">
          {question.instruction}
        </p>
      </div>

      {/* Assembled Sentence Area */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> Assembled Sentence
        </label>
        <div className={`min-h-[90px] p-4 sm:p-5 rounded-2xl border transition-all flex flex-wrap items-center gap-2 ${
          isSubmitted
            ? isCorrect
              ? 'bg-emerald-950/20 border-emerald-500'
              : 'bg-rose-950/20 border-rose-500'
            : 'bg-slate-950/70 border-dashed border-slate-700'
        }`}>
          {selectedTokens.length === 0 ? (
            <span className="text-slate-500 text-sm italic">
              Click word tokens below to construct the sentence in correct syntax order...
            </span>
          ) : (
            selectedTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleRemoveToken(token)}
                disabled={isSubmitted}
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-base shadow-md transition-all animate-scale-in"
                title="Click to remove from sentence"
              >
                {token.text}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Available Word Chips Pool */}
      {!isSubmitted && availableTokens.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Available Word Tokens
          </label>
          <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 flex flex-wrap gap-2">
            {availableTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => handleSelectToken(token)}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-base transition-all hover:scale-[1.03] active:scale-[0.98]"
              >
                {token.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {isSubmitted && (
        <div className={`p-5 rounded-2xl border animate-fade-in space-y-3 ${
          isCorrect 
            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
            : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
        }`}>
          <div className="flex items-center gap-2 font-bold text-base">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Excellent! Correct Word Order.</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Incorrect Order. Correct sentence: <span className="underline font-bold text-white ml-1">{question.correctAnswer}</span></span>
              </>
            )}
          </div>
          <p className="text-sm leading-relaxed text-slate-200">
            <WordSpans text={question.explanation} onWordClick={onWordClick} targetWords={targetWords} />
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60">
            <button
              onClick={() => SpeechService.speak(question.audioSentence, 0.9)}
              className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Listen Sentence Audio</span>
            </button>

            <a
              href={SpeechService.getGoogleTranslateUrl(question.audioSentence)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <span>Google Translate</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-400">
          💡 Click tokens to add or remove them from the sentence
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedTokens.length === 0}
            className={`px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all ${
              selectedTokens.length > 0
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            Check Sentence
          </button>
        ) : (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Next Card</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
