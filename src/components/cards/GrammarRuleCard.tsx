import React from 'react';
import { BookOpen, Volume2, Sparkles, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';
import { GrammarRule } from '../../types';
import { WordSpans } from '../common/WordSpans';
import { SpeechService } from '../../services/speechService';

interface GrammarRuleCardProps {
  rule: GrammarRule;
  onNext: () => void;
  onWordClick: (word: string) => void;
  targetWords?: string[];
}

export const GrammarRuleCard: React.FC<GrammarRuleCardProps> = ({
  rule,
  onNext,
  onWordClick,
  targetWords = []
}) => {
  const handlePlayAudio = (text: string) => {
    SpeechService.speak(text, 0.9);
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
      {/* Rule Header */}
      <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <BookOpen className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
              Grammar Focus & Rule Guide
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-1">
            {rule.title}
          </h2>
        </div>
      </div>

      {/* Formula Badge */}
      {rule.formulaBadge && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-indigo-950/60 border border-indigo-500/30 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Key Structural Pattern
            </div>
            <div className="text-base sm:text-lg font-mono font-semibold text-white mt-0.5">
              {rule.formulaBadge}
            </div>
          </div>
        </div>
      )}

      {/* Detailed English Explanation */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Rule Breakdown
        </h4>
        <div className="text-slate-200 text-base leading-relaxed bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
          <WordSpans
            text={rule.explanation}
            onWordClick={onWordClick}
            targetWords={targetWords}
          />
        </div>
      </div>

      {/* Illustrative Examples */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Model Examples (Click words for definitions)</span>
        </h4>
        <div className="space-y-2.5">
          {rule.examples.map((eg, index) => (
            <div
              key={index}
              className="group p-4 rounded-2xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/60 transition-all flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="text-base sm:text-lg font-medium text-white">
                  <WordSpans
                    text={eg.english}
                    onWordClick={onWordClick}
                    targetWords={targetWords}
                  />
                </div>
                {eg.note && (
                  <p className="text-xs text-indigo-300 font-sans">
                    💡 {eg.note}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => handlePlayAudio(eg.english)}
                  className="p-2 text-slate-400 hover:text-indigo-300 hover:bg-indigo-600/20 rounded-xl transition-colors"
                  title="Listen to native pronunciation"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
                <a
                  href={SpeechService.getGoogleTranslateUrl(eg.english)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-xl transition-colors"
                  title="Open in Google Translate"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tips */}
      {rule.tips && rule.tips.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-amber-200 text-sm space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <Lightbulb className="w-4 h-4" /> Pro Tip & Common Pitfall
          </div>
          {rule.tips.map((tip, idx) => (
            <p key={idx} className="leading-relaxed">
              {tip}
            </p>
          ))}
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-4 flex items-center justify-end">
        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Start Practice Cards</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
