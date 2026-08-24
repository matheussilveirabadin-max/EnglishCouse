import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Play, Download, Volume2, Search, X } from 'lucide-react';
import { ErrorLogItem } from '../../types';
import { StorageService } from '../../services/storageService';
import { SpeechService } from '../../services/speechService';
import { WordSpans } from '../common/WordSpans';

interface ErrorReviewDashboardProps {
  errorLogs: ErrorLogItem[];
  onResolveError: (errorId: string, isCorrect: boolean) => void;
  onWordClick: (word: string) => void;
}

export const ErrorReviewDashboard: React.FC<ErrorReviewDashboardProps> = ({
  errorLogs,
  onResolveError,
  onWordClick
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Active Review Modal Session state
  const [activeReviewItem, setActiveReviewItem] = useState<ErrorLogItem | null>(null);
  const [reviewInput, setReviewInput] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewCorrect, setReviewCorrect] = useState(false);

  const pendingCount = errorLogs.filter(e => e.status === 'Pending').length;
  const reviewedCount = errorLogs.filter(e => e.status === 'Reviewed').length;
  const masteredCount = errorLogs.filter(e => e.status === 'Mastered').length;

  const filteredLogs = errorLogs.filter(item => {
    const matchesSearch = 
      item.questionPrompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.correctAnswer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.moduleTitle.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleStartReviewItem = (item: ErrorLogItem) => {
    setActiveReviewItem(item);
    setReviewInput('');
    setReviewSubmitted(false);
    setReviewCorrect(false);
  };

  const handleSubmitReview = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!activeReviewItem || !reviewInput.trim() || reviewSubmitted) return;

    const cleanInput = reviewInput.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
    const cleanCorrect = activeReviewItem.correctAnswer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()?]/g, '');
    const isCorrect = cleanInput === cleanCorrect;

    setReviewCorrect(isCorrect);
    setReviewSubmitted(true);
    onResolveError(activeReviewItem.id, isCorrect);
    SpeechService.speak(activeReviewItem.audioSentence, 0.9);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/40 border border-rose-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold uppercase tracking-wider">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Spaced Repetition Review Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Registro de Erros e Revisão
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Retest your past mistakes using interval-spaced repetition. Re-testing transitions errors from <strong>Pending</strong> to <strong>Reviewed</strong> and finally <strong>Mastered</strong>.
          </p>
        </div>

        {/* Stats Chips */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="bg-slate-900 border border-rose-500/30 p-3.5 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-rose-400">{pendingCount}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Pending</div>
          </div>
          <div className="bg-slate-900 border border-amber-500/30 p-3.5 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-amber-400">{reviewedCount}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Reviewed</div>
          </div>
          <div className="bg-slate-900 border border-emerald-500/30 p-3.5 rounded-2xl text-center">
            <div className="text-2xl font-extrabold text-emerald-400">{masteredCount}</div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Mastered</div>
          </div>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Export */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logged errors..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
          {['All', 'Pending', 'Reviewed', 'Mastered'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedStatus === st
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st}
            </button>
          ))}

          <button
            onClick={() => StorageService.exportErrorsToCsv(errorLogs)}
            disabled={errorLogs.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-xl border border-slate-700 transition-colors ml-auto disabled:opacity-40"
            title="Download CSV for Google Sheets"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Error Items List */}
      <div className="space-y-3">
        {filteredLogs.map((item) => (
          <div
            key={item.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                  Module {item.moduleId}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {item.moduleTitle}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {item.errorCategory}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                  item.status === 'Mastered'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : item.status === 'Reviewed'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                }`}>
                  {item.status} ({item.reviewCount} reviews)
                </span>
                <span className="text-[11px] text-slate-500">
                  Next: {item.nextReviewDate}
                </span>
              </div>
            </div>

            {/* Prompt & Answer Comparison */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-200">
                <WordSpans text={item.questionPrompt} onWordClick={onWordClick} />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-950/20 border border-rose-500/30 text-rose-300">
                  <span className="font-semibold block text-[10px] uppercase text-rose-400">Your Answer:</span>
                  <span className="line-through">{item.userAnswer || '(blank)'}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300">
                  <span className="font-semibold block text-[10px] uppercase text-emerald-400">Correct Target:</span>
                  <span className="font-bold">{item.correctAnswer}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
              <button
                onClick={() => SpeechService.speak(item.audioSentence, 0.9)}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-indigo-300 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Play Sentence Audio</span>
              </button>

              <button
                onClick={() => handleStartReviewItem(item)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-600/30 transition-all hover:scale-[1.02]"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Re-Test Now</span>
              </button>
            </div>
          </div>
        ))}

        {filteredLogs.length === 0 && (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto opacity-80" />
            <h3 className="text-lg font-bold text-white">No Errors In This Queue!</h3>
            <p className="text-slate-400 text-xs max-w-sm mx-auto">
              Whenever you encounter difficult questions during practice cards, mistakes are automatically logged here for spaced repetition.
            </p>
          </div>
        )}
      </div>

      {/* Interactive Re-Test Modal */}
      {activeReviewItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveReviewItem(null)}
        >
          <div 
            className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 text-slate-100 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Spaced Repetition Re-Test</h3>
              </div>
              <button
                onClick={() => setActiveReviewItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Prompt */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm font-medium text-slate-100 leading-relaxed">
              <WordSpans text={activeReviewItem.questionPrompt} onWordClick={onWordClick} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmitReview} className="space-y-3">
              <input
                type="text"
                value={reviewInput}
                onChange={(e) => setReviewInput(e.target.value)}
                disabled={reviewSubmitted}
                placeholder="Type the correct English answer..."
                className="w-full px-4 py-3.5 bg-slate-800 rounded-2xl border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                autoFocus
              />
            </form>

            {/* Result */}
            {reviewSubmitted && (
              <div className={`p-4 rounded-2xl border text-xs space-y-1.5 animate-fade-in ${
                reviewCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}>
                <div className="font-bold text-sm">
                  {reviewCorrect ? '🎉 Correct! Progress upgraded.' : '❌ Still incorrect. Kept in Pending queue.'}
                </div>
                <p className="text-slate-300">
                  Target answer: <strong className="text-white">{activeReviewItem.correctAnswer}</strong>
                </p>
                <p className="text-slate-400 pt-1">
                  {activeReviewItem.explanation}
                </p>
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <button
                onClick={() => SpeechService.speak(activeReviewItem.audioSentence, 0.9)}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Volume2 className="w-4 h-4" />
                <span>Sentence Audio</span>
              </button>

              {!reviewSubmitted ? (
                <button
                  onClick={() => handleSubmitReview()}
                  disabled={!reviewInput.trim()}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-md disabled:opacity-40"
                >
                  Submit Re-Test
                </button>
              ) : (
                <button
                  onClick={() => setActiveReviewItem(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
