import React, { useState, useRef, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, HelpCircle, ExternalLink } from 'lucide-react';
import { Question } from '../../types';
import { WordSpans } from '../common/WordSpans';
import { SpeechService } from '../../services/speechService';

interface FillInGapCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  onNext: () => void;
  onWordClick: (word: string) => void;
  targetWords?: string[];
}

export const FillInGapCard: React.FC<FillInGapCardProps> = ({
  question,
  onAnswer,
  onNext,
  onWordClick,
  targetWords = []
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [question.id]);

  const cleanAnswer = (ans: string) => ans.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');

  const checkIsCorrect = (userAns: string) => {
    const cleanedUser = cleanAnswer(userAns);
    const cleanedCorrect = cleanAnswer(question.correctAnswer);
    if (cleanedUser === cleanedCorrect) return true;
    if (question.alternativeAnswers) {
      return question.alternativeAnswers.some(alt => cleanAnswer(alt) === cleanedUser);
    }
    return false;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isSubmitted) return;

    const isCorrect = checkIsCorrect(inputValue);
    setIsSubmitted(true);
    onAnswer(isCorrect, inputValue.trim());
    SpeechService.speak(question.audioSentence, 0.9);
  };

  const isCorrect = isSubmitted && checkIsCorrect(inputValue);

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Fill-in-the-Gap Exercise
          </span>
          {question.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 transition-colors px-2 py-1 bg-amber-500/10 rounded-lg border border-amber-500/20"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
            </button>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          {question.prompt}
        </h3>
        <p className="text-xs text-slate-400">
          {question.instruction}
        </p>
      </div>

      {/* Hint Banner */}
      {showHint && question.hint && (
        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-300 text-xs animate-fade-in">
          💡 <strong>Hint:</strong> {question.hint}
        </div>
      )}

      {/* Sentence Prompt */}
      {question.sentenceContext && (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
          <WordSpans
            text={question.sentenceContext}
            onWordClick={onWordClick}
            targetWords={targetWords}
          />
        </div>
      )}

      {/* Input Field Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isSubmitted}
            placeholder="Type your answer here..."
            className={`w-full px-5 py-4 text-lg bg-slate-800/80 rounded-2xl border transition-all text-white placeholder-slate-500 focus:outline-none ${
              isSubmitted
                ? isCorrect
                  ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                  : 'border-rose-500 bg-rose-950/20 text-rose-300'
                : 'border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
            }`}
          />
          {isSubmitted && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              ) : (
                <XCircle className="w-6 h-6 text-rose-400" />
              )}
            </div>
          )}
        </div>
      </form>

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
                <span>Perfect! Correct Answer.</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Incorrect. Correct form: <span className="underline font-bold text-white ml-1">{question.correctAnswer}</span></span>
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
          Press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300 font-mono">Enter</kbd> to submit
        </div>

        {!isSubmitted ? (
          <button
            onClick={() => handleSubmit()}
            disabled={!inputValue.trim()}
            className={`px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all ${
              inputValue.trim()
                ? 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            Check Answer
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
