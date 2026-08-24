import React, { useState } from 'react';
import { Volume2, ExternalLink, Bookmark, Check, X, Sparkles, BookOpen, Layers } from 'lucide-react';
import { VocabularyItem } from '../../types';
import { SpeechService } from '../../services/speechService';
import { RotationEngine } from '../../services/rotationEngine';

interface WordExplainerModalProps {
  word: string | null;
  vocabularyBank: Record<string, VocabularyItem>;
  onClose: () => void;
  onIncrementExposure?: (word: string) => void;
}

export const WordExplainerModal: React.FC<WordExplainerModalProps> = ({
  word,
  vocabularyBank,
  onClose,
  onIncrementExposure
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!word) return null;

  const cleanWord = word.toLowerCase().trim();
  const vocabEntry = vocabularyBank[cleanWord];
  const isStructural = RotationEngine.isStructuralWord(cleanWord);

  const handlePlayTTS = async () => {
    setIsPlayingAudio(true);
    await SpeechService.speak(cleanWord, 0.85);
    setIsPlayingAudio(false);
  };

  const handlePlayExample = async (exampleText: string) => {
    setIsPlayingAudio(true);
    await SpeechService.speak(exampleText, 0.9);
    setIsPlayingAudio(false);
  };

  const translateUrl = SpeechService.getGoogleTranslateUrl(cleanWord);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-7 text-slate-100 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold tracking-tight text-white capitalize">{cleanWord}</h3>
                {vocabEntry?.phonetic && (
                  <span className="text-sm font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700">
                    {vocabEntry.phonetic}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                  {vocabEntry?.partOfSpeech || (isStructural ? 'Functional Word' : 'Content Word')}
                </span>
                {vocabEntry && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    vocabEntry.masteryLevel === 'Mastered'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : vocabEntry.masteryLevel === 'Familiar'
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {vocabEntry.masteryLevel} ({vocabEntry.exposureCount} exp)
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Close Explainer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="py-4 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {/* Definition */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> English Definition
            </label>
            <p className="text-slate-200 text-base leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
              {vocabEntry?.definition || (
                isStructural 
                  ? `"${cleanWord}" is a foundational grammatical / structural word in English used to connect and modify core sentence clauses.`
                  : `A high-frequency English content word commonly utilized in professional, academic, and daily communication.`
              )}
            </p>
          </div>

          {/* Business & Context Examples */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5 mb-1.5">
              <Layers className="w-3.5 h-3.5" /> Business Context Example
            </label>
            <div className="bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm text-slate-200 italic">
                  "{vocabEntry?.businessExample || `We ensure that ${cleanWord} is integrated appropriately into our organizational workflow.`}"
                </p>
                <button
                  onClick={() => handlePlayExample(vocabEntry?.businessExample || `We ensure that ${cleanWord} is integrated appropriately into our organizational workflow.`)}
                  className="p-1.5 text-slate-400 hover:text-indigo-300 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0"
                  title="Listen to sentence"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Synonyms & Collocations */}
          {vocabEntry?.synonyms && vocabEntry.synonyms.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                English Synonyms
              </label>
              <div className="flex flex-wrap gap-1.5">
                {vocabEntry.synonyms.map((syn, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {syn}
                  </span>
                ))}
              </div>
            </div>
          )}

          {vocabEntry?.collocations && vocabEntry.collocations.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                Common Collocations
              </label>
              <div className="flex flex-wrap gap-1.5">
                {vocabEntry.collocations.map((col, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950/40 text-indigo-300 border border-indigo-800/40"
                  >
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayTTS}
              disabled={isPlayingAudio}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30"
            >
              <Volume2 className="w-4 h-4" />
              <span>Pronounce Word</span>
            </button>

            {onIncrementExposure && vocabEntry && (
              <button
                onClick={() => {
                  onIncrementExposure(cleanWord);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium rounded-xl border border-slate-700 transition-colors"
                title="Mark as practiced"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Bookmark className="w-4 h-4 text-amber-400" />}
                <span>{copied ? 'Recorded!' : '+1 Exposure'}</span>
              </button>
            )}
          </div>

          <a
            href={translateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-sm font-medium rounded-xl border border-slate-700 transition-colors"
          >
            <span>Google Translate Voice</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
