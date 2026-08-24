import React, { useState } from 'react';
import { Volume2, CheckCircle2, XCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Question } from '../../types';
import { WordSpans } from '../common/WordSpans';
import { SpeechService } from '../../services/speechService';

interface MultipleChoiceCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean, userAnswer: string) => void;
  onNext: () => void;
  onWordClick: (word: string) => void;
  targetWords?: string[];
}

export const MultipleChoiceCard: React.FC<MultipleChoiceCardProps> = ({
  question,
  onAnswer,
  onNext,
  onWordClick,
  targetWords = []
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const options = question.options || [];

  const handleSelect = (option: string) => {
    if (isSubmitted) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted) return;
    const isCorrect = selectedOption.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
    setIsSubmitted(true);
    onAnswer(isCorrect, selectedOption);
    SpeechService.speak(question.audioSentence, 0.9);
  };

  const isCorrect = selectedOption?.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Question Header */}
      <div className="space-y-2 pb-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Multiple Choice Practice
          </span>
          <button
            onClick={() => SpeechService.speak(question.audioSentence, 0.9)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 transition-colors p-1 rounded-lg hover:bg-slate-800"
            title="Listen to full sentence"
          >
            <Volume2 className="w-4 h-4" />
            <span>Audio Preview</span>
          </button>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white">
          {question.prompt}
        </h3>
        <p className="text-xs text-slate-400">
          {question.instruction}
        </p>
      </div>

      {/* Sentence Context */}
      {question.sentenceContext && (
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-lg sm:text-xl text-slate-100 font-medium leading-relaxed">
          <WordSpans
            text={question.sentenceContext}
            onWordClick={onWordClick}
            targetWords={targetWords}
          />
        </div>
      )}

      {/* Options List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {options.map((opt, idx) => {
          const isThisSelected = selectedOption === opt;
          const isThisCorrect = opt.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();

          let btnStyle = 'bg-slate-800/60 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
          if (isSubmitted) {
            if (isThisCorrect) {
              btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
            } else if (isThisSelected && !isThisCorrect) {
              btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200 font-medium';
            } else {
              btnStyle = 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60';
            }
          } else if (isThisSelected) {
            btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white shadow-lg shadow-indigo-500/20 font-semibold';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(opt)}
              disabled={isSubmitted}
              className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 ${btnStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono text-slate-400">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-base">{opt}</span>
              </div>
              {isSubmitted && isThisCorrect && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              )}
              {isSubmitted && isThisSelected && !isThisCorrect && (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Banner */}
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
                <span>Well Done! Correct Answer.</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Incorrect. Added to Spaced Repetition Review.</span>
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

      {/* Actions */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-800">
        <div className="text-xs text-slate-400">
          💡 Click highlighted words to open the English Dictionary
        </div>

        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`px-6 py-3 rounded-2xl font-semibold text-white shadow-lg transition-all ${
              selectedOption
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
