import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  ArrowRight, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Award
} from 'lucide-react';

import { AppState, Module, Question } from './types';
import { allModules } from './data/modulesData';
import { StorageService } from './services/storageService';
import { SheetsService } from './services/sheetsService';

import { Navbar } from './components/Navbar';
import { GrammarRuleCard } from './components/cards/GrammarRuleCard';
import { MultipleChoiceCard } from './components/cards/MultipleChoiceCard';
import { FillInGapCard } from './components/cards/FillInGapCard';
import { SentenceUnscrambleCard } from './components/cards/SentenceUnscrambleCard';
import { SpeakingPracticeCard } from './components/cards/SpeakingPracticeCard';
import { WordExplainerModal } from './components/explainer/WordExplainerModal';
import { ModuleNavigator } from './components/modules/ModuleNavigator';
import { ErrorReviewDashboard } from './components/review/ErrorReviewDashboard';
import { VocabularyBankView } from './components/vocabulary/VocabularyBankView';
import { SyncSettingsModal } from './components/settings/SyncSettingsModal';

export const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => StorageService.loadState());
  const [activeView, setActiveView] = useState<'practice' | 'modules' | 'review' | 'vocabulary'>('practice');
  
  // Navigation & Card state
  const [currentModuleId, setCurrentModuleId] = useState<number>(() => appState.currentModuleId || 1);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [moduleAnswers, setModuleAnswers] = useState<Record<string, { isCorrect: boolean; userAnswer: string }>>({});
  
  // Explainer & Settings Modals
  const [selectedExplainerWord, setSelectedExplainerWord] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isModuleSelectorOpen, setIsModuleSelectorOpen] = useState<boolean>(false);

  const currentModule: Module = allModules.find(m => m.id === currentModuleId) || allModules[0];
  const totalCardsInModule = 1 + currentModule.questions.length; // 1 Grammar Rule card + questions

  // Persist current module to state
  useEffect(() => {
    const updatedState = { ...appState, currentModuleId, currentCardIndex };
    setAppState(updatedState);
    StorageService.saveState(updatedState);
  }, [currentModuleId, currentCardIndex]);

  // Record word exposures when opening a module
  useEffect(() => {
    if (currentModule.vocabularyTargets && currentModule.vocabularyTargets.length > 0) {
      const updated = StorageService.recordWordExposure(appState, currentModule.vocabularyTargets, currentModule.id);
      setAppState(updated);
    }
  }, [currentModuleId]);

  const handleSelectModule = (moduleId: number) => {
    setCurrentModuleId(moduleId);
    setCurrentCardIndex(0);
    setModuleAnswers({});
    setActiveView('practice');
    setIsModuleSelectorOpen(false);
  };

  const handleRecordAnswer = (question: Question, isCorrect: boolean, userAnswer: string) => {
    setModuleAnswers(prev => ({
      ...prev,
      [question.id]: { isCorrect, userAnswer }
    }));

    if (!isCorrect) {
      // Log error into Spaced Repetition queue
      const updated = StorageService.logError(
        appState,
        currentModule.id,
        currentModule.title,
        question.id,
        question.prompt + ' ' + (question.sentenceContext || ''),
        userAnswer,
        question.correctAnswer,
        question.category || 'Grammar Rule',
        question.explanation,
        question.audioSentence
      );
      setAppState(updated);
    }
  };

  const handleResolveError = (errorId: string, isCorrect: boolean) => {
    const updated = StorageService.resolveErrorReview(appState, errorId, isCorrect);
    setAppState(updated);
  };

  const handleIncrementExposure = (word: string) => {
    const updated = StorageService.recordWordExposure(appState, [word], currentModuleId);
    setAppState(updated);
  };

  const handleCompleteModule = () => {
    // Calculate final score
    const questionsCount = currentModule.questions.length;
    const correctCount = Object.values(moduleAnswers).filter(a => a.isCorrect).length;
    const accuracyScore = questionsCount > 0 ? Math.round((correctCount / questionsCount) * 100) : 100;

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}

    // Update progress in app state
    const currentProgress = appState.moduleProgress[currentModule.id] || {
      moduleId: currentModule.id,
      status: 'not-started',
      score: 0,
      completedQuestions: 0,
      totalQuestions: questionsCount,
      attemptsCount: 0
    };

    const updatedModuleProgress = {
      ...appState.moduleProgress,
      [currentModule.id]: {
        ...currentProgress,
        status: (accuracyScore >= 70 ? 'mastered' : 'in-progress') as AppState['moduleProgress'][number]['status'],
        score: accuracyScore,
        completedQuestions: questionsCount,
        attemptsCount: (currentProgress.attemptsCount || 0) + 1,
        lastPracticedAt: new Date().toISOString(),
        completedAt: new Date().toISOString()
      }
    };

    const newState: AppState = {
      ...appState,
      moduleProgress: updatedModuleProgress
    };

    setAppState(newState);
    StorageService.saveState(newState);

    // Auto-sync if configured
    if (newState.syncSettings.autoSync) {
      SheetsService.syncWithGoogleSheets(newState, newState.syncSettings);
    }
  };

  const handleNextModule = () => {
    if (currentModuleId < allModules.length) {
      handleSelectModule(currentModuleId + 1);
    } else {
      setActiveView('modules');
    }
  };

  const pendingReviewCount = appState.errorLogs.filter(e => e.status === 'Pending').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans">
      {/* Top Navbar */}
      <Navbar
        currentModule={currentModule}
        activeView={activeView}
        onChangeView={setActiveView}
        streakDays={appState.streakDays}
        pendingReviewCount={pendingReviewCount}
        syncStatus={appState.syncSettings.syncStatus}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenModuleSelector={() => setIsModuleSelectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col justify-start">
        
        {/* VIEW 1: ACTIVE PRACTICE DECK */}
        {activeView === 'practice' && (
          <div className="space-y-6 flex-1 flex flex-col justify-start">
            {/* Module Step Indicator */}
            <div className="w-full max-w-3xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                  disabled={currentCardIndex === 0}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous card"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="text-xs font-semibold text-slate-400">
                  Card <span className="text-white font-bold">{currentCardIndex + 1}</span> of <span className="text-white">{totalCardsInModule + 1}</span>
                </div>

                <button
                  onClick={() => setCurrentCardIndex(Math.min(totalCardsInModule, currentCardIndex + 1))}
                  disabled={currentCardIndex >= totalCardsInModule}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next card"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Progress Dots */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {Array.from({ length: totalCardsInModule + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentCardIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentCardIndex
                        ? 'w-6 bg-indigo-500'
                        : idx < currentCardIndex
                        ? 'w-2 bg-emerald-500'
                        : 'w-2 bg-slate-800'
                    }`}
                    title={`Go to Card ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* CARD 0: GRAMMAR RULE CARD */}
            {currentCardIndex === 0 && currentModule.rules[0] && (
              <GrammarRuleCard
                rule={currentModule.rules[0]}
                onNext={() => setCurrentCardIndex(1)}
                onWordClick={(word) => setSelectedExplainerWord(word)}
                targetWords={currentModule.vocabularyTargets}
              />
            )}

            {/* CARDS 1 to N: INTERACTIVE QUESTIONS */}
            {currentCardIndex > 0 && currentCardIndex <= currentModule.questions.length && (() => {
              const qIndex = currentCardIndex - 1;
              const question = currentModule.questions[qIndex];

              if (!question) return null;

              if (question.type === 'multiple-choice') {
                return (
                  <MultipleChoiceCard
                    key={question.id}
                    question={question}
                    onAnswer={(isCorrect, userAnswer) => handleRecordAnswer(question, isCorrect, userAnswer)}
                    onNext={() => setCurrentCardIndex(currentCardIndex + 1)}
                    onWordClick={(word) => setSelectedExplainerWord(word)}
                    targetWords={currentModule.vocabularyTargets}
                  />
                );
              }

              if (question.type === 'fill-gap') {
                return (
                  <FillInGapCard
                    key={question.id}
                    question={question}
                    onAnswer={(isCorrect, userAnswer) => handleRecordAnswer(question, isCorrect, userAnswer)}
                    onNext={() => setCurrentCardIndex(currentCardIndex + 1)}
                    onWordClick={(word) => setSelectedExplainerWord(word)}
                    targetWords={currentModule.vocabularyTargets}
                  />
                );
              }

              if (question.type === 'unscramble') {
                return (
                  <SentenceUnscrambleCard
                    key={question.id}
                    question={question}
                    onAnswer={(isCorrect, userAnswer) => handleRecordAnswer(question, isCorrect, userAnswer)}
                    onNext={() => setCurrentCardIndex(currentCardIndex + 1)}
                    onWordClick={(word) => setSelectedExplainerWord(word)}
                    targetWords={currentModule.vocabularyTargets}
                  />
                );
              }

              if (question.type === 'speaking-shadow') {
                return (
                  <SpeakingPracticeCard
                    key={question.id}
                    question={question}
                    onComplete={() => {
                      handleCompleteModule();
                      setCurrentCardIndex(totalCardsInModule);
                    }}
                    onWordClick={(word) => setSelectedExplainerWord(word)}
                    targetWords={currentModule.vocabularyTargets}
                  />
                );
              }

              return null;
            })()}

            {/* FINAL CARD: MODULE SUMMARY & MASTERY */}
            {currentCardIndex === totalCardsInModule && (() => {
              const questionsCount = currentModule.questions.length;
              const correctCount = Object.values(moduleAnswers).filter(a => a.isCorrect).length;
              const accuracy = questionsCount > 0 ? Math.round((correctCount / questionsCount) * 100) : 100;

              return (
                <div className="w-full max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center space-y-6 animate-scale-in">
                  <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-indigo-500 rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                      Module {currentModule.id} Completed
                    </span>
                    <h2 className="text-3xl font-extrabold text-white">
                      {currentModule.title}
                    </h2>
                    <p className="text-slate-400 text-sm max-w-md mx-auto">
                      {accuracy >= 70
                        ? 'Outstanding performance! You mastered the key grammatical patterns and target lexicon for this unit.'
                        : 'Module completed! Mistakes have been recorded in your Spaced Review queue for reinforcement.'}
                    </p>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center">
                    <div>
                      <div className="text-2xl font-extrabold text-white">{accuracy}%</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-emerald-400">{correctCount}/{questionsCount}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Correct</div>
                    </div>
                    <div>
                      <div className="text-2xl font-extrabold text-indigo-400">{currentModule.vocabularyTargets.length}</div>
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Words Practiced</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentCardIndex(0);
                        setModuleAnswers({});
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-2xl border border-slate-700 transition-colors text-sm"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Practice Again</span>
                    </button>

                    <button
                      onClick={handleNextModule}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] text-sm"
                    >
                      <span>Proceed to Next Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW 2: 44 MODULES CURRICULUM */}
        {activeView === 'modules' && (
          <ModuleNavigator
            currentModuleId={currentModuleId}
            moduleProgress={appState.moduleProgress}
            onSelectModule={handleSelectModule}
          />
        )}

        {/* VIEW 3: SPACED REPETITION ERROR LOGS */}
        {activeView === 'review' && (
          <ErrorReviewDashboard
            errorLogs={appState.errorLogs}
            onResolveError={handleResolveError}
            onWordClick={(word) => setSelectedExplainerWord(word)}
          />
        )}

        {/* VIEW 4: VOCABULARY BANK */}
        {activeView === 'vocabulary' && (
          <VocabularyBankView
            vocabularyBank={appState.vocabularyBank}
            onSelectWord={(word) => setSelectedExplainerWord(word)}
            onIncrementExposure={handleIncrementExposure}
          />
        )}

      </main>

      {/* In-Context English Explainer Modal */}
      <WordExplainerModal
        word={selectedExplainerWord}
        vocabularyBank={appState.vocabularyBank}
        onClose={() => setSelectedExplainerWord(null)}
        onIncrementExposure={handleIncrementExposure}
      />

      {/* Google Sheets Sync Settings Modal */}
      {isSettingsOpen && (
        <SyncSettingsModal
          appState={appState}
          onUpdateSettings={(newSettings) => {
            const updated = { ...appState, syncSettings: newSettings };
            setAppState(updated);
            StorageService.saveState(updated);
          }}
          onImportState={(newState) => {
            setAppState(newState);
            StorageService.saveState(newState);
          }}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {/* Quick Module Switcher Modal */}
      {isModuleSelectorOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModuleSelectorOpen(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">Select Study Module (1 to 44)</h3>
              <button
                onClick={() => setIsModuleSelectorOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <ModuleNavigator
              currentModuleId={currentModuleId}
              moduleProgress={appState.moduleProgress}
              onSelectModule={handleSelectModule}
              onClose={() => setIsModuleSelectorOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
