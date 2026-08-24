import React, { useState } from 'react';
import { BookMarked, Search, Volume2, Sparkles } from 'lucide-react';
import { VocabularyItem } from '../../types';
import { RotationEngine } from '../../services/rotationEngine';
import { SpeechService } from '../../services/speechService';

interface VocabularyBankViewProps {
  vocabularyBank: Record<string, VocabularyItem>;
  onSelectWord: (word: string) => void;
  onIncrementExposure: (word: string) => void;
}

export const VocabularyBankView: React.FC<VocabularyBankViewProps> = ({
  vocabularyBank,
  onSelectWord,
  onIncrementExposure
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPos, setSelectedPos] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'grid' | 'rotation' | 'flashcards'>('rotation');

  // Flashcard state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const vocabList = Object.values(vocabularyBank);
  const rotationSpotlight = RotationEngine.getRotationPriorities(vocabularyBank, 6, 'content');

  const filteredVocab = vocabList.filter(item => {
    const matchesSearch = 
      item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.businessExample.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.synonyms && item.synonyms.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesPos = selectedPos === 'All' || item.partOfSpeech === selectedPos;

    return matchesSearch && matchesPos;
  });

  const handleNextFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev + 1) % vocabList.length);
  };

  const handlePrevFlashcard = () => {
    setIsFlipped(false);
    setFlashcardIndex((prev) => (prev - 1 + vocabList.length) % vocabList.length);
  };

  const currentFlashcard = vocabList[flashcardIndex] || vocabList[0];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Vocabulary Bank & Word Bank Rotation Engine</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Rotation Lexicon Tracker
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Continuously monitors exposure counts for business and content words. Low-exposure vocabulary is dynamically rotated into daily exercises for rapid acquisition.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('rotation')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'rotation'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔥 Rotation Spotlight
          </button>
          <button
            onClick={() => setActiveTab('grid')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'grid'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 Full Word Bank ({vocabList.length})
          </button>
          <button
            onClick={() => setActiveTab('flashcards')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'flashcards'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🗂️ Flashcard Deck
          </button>
        </div>
      </div>

      {/* ROTATION SPOTLIGHT VIEW */}
      {activeTab === 'rotation' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Priority Words for Next Study Session</span>
              </h2>
              <p className="text-xs text-slate-400">
                These content words currently have the lowest exposure counts in your learning profile.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rotationSpotlight.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectWord(item.word)}
                className="group bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.01] hover:shadow-xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-800/40">
                      {item.partOfSpeech}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {item.exposureCount} exposures
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors capitalize">
                      {item.word}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        SpeechService.speak(item.word, 0.85);
                      }}
                      className="p-1.5 text-slate-400 hover:text-emerald-300 rounded-lg hover:bg-slate-800"
                      title="Pronounce"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {item.definition}
                  </p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs italic text-slate-400 line-clamp-2">
                  "{item.businessExample}"
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                  <span className="text-slate-500">
                    Modules: {item.moduleReferences.map(m => `#${m}`).join(', ')}
                  </span>
                  <span className="text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    Explain Word &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FULL WORD BANK GRID VIEW */}
      {activeTab === 'grid' && (
        <div className="space-y-5">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search words, definitions, synonyms..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1">
              {['All', 'noun', 'verb', 'adjective', 'adverb'].map((pos) => (
                <button
                  key={pos}
                  onClick={() => setSelectedPos(pos)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedPos === pos
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVocab.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectWord(item.word)}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 transition-all cursor-pointer space-y-3 hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-800/40">
                    {item.partOfSpeech}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-semibold border ${
                    item.masteryLevel === 'Mastered'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : item.masteryLevel === 'Familiar'
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                      : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {item.masteryLevel}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white capitalize">{item.word}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      SpeechService.speak(item.word, 0.85);
                    }}
                    className="p-1.5 text-slate-400 hover:text-emerald-300 rounded-lg hover:bg-slate-800"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {item.definition}
                </p>

                {item.synonyms && item.synonyms.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {item.synonyms.slice(0, 3).map((syn, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 bg-slate-800 text-slate-400 rounded-md">
                        {syn}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs text-slate-400">
                  <span>Exposure: <strong>{item.exposureCount}</strong></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onIncrementExposure(item.word);
                    }}
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    +1 Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FLASHCARD DECK VIEW */}
      {activeTab === 'flashcards' && currentFlashcard && (
        <div className="max-w-xl mx-auto space-y-6 pt-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Card {flashcardIndex + 1} of {vocabList.length}</span>
            <span>Click card to reveal definition & example</span>
          </div>

          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[300px] bg-slate-900 border border-slate-700 hover:border-emerald-500/50 rounded-3xl p-8 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:scale-[1.01]"
          >
            {/* Front */}
            {!isFlipped ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                  {currentFlashcard.partOfSpeech}
                </span>
                <h3 className="text-4xl font-extrabold text-white capitalize tracking-tight">
                  {currentFlashcard.word}
                </h3>
                {currentFlashcard.phonetic && (
                  <span className="text-sm font-mono text-slate-400">
                    {currentFlashcard.phonetic}
                  </span>
                )}
                <div className="pt-4 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      SpeechService.speak(currentFlashcard.word, 0.85);
                    }}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-full"
                    title="Audio"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                <span className="text-xs text-slate-500 pt-4">Tap card to flip</span>
              </div>
            ) : (
              /* Back */
              <div className="space-y-4 animate-fade-in my-auto">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                    English Definition:
                  </div>
                  <p className="text-base text-slate-100 leading-relaxed font-medium">
                    {currentFlashcard.definition}
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs italic text-slate-300">
                  "{currentFlashcard.businessExample}"
                </div>

                {currentFlashcard.synonyms && currentFlashcard.synonyms.length > 0 && (
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 mb-1">Synonyms:</div>
                    <div className="flex flex-wrap gap-1">
                      {currentFlashcard.synonyms.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Flashcard Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevFlashcard}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 text-xs transition-colors"
            >
              &larr; Previous Card
            </button>

            <button
              onClick={() => {
                onIncrementExposure(currentFlashcard.word);
                handleNextFlashcard();
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/30 text-xs transition-all"
            >
              Mark Mastered & Next &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
