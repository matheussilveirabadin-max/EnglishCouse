export type PartOfSpeech = 
  | 'noun' 
  | 'verb' 
  | 'adjective' 
  | 'adverb' 
  | 'phrasal verb' 
  | 'preposition' 
  | 'pronoun' 
  | 'conjunction';

export type WordLayer = 'structural' | 'content';

export type MasteryLevel = 'New' | 'Learning' | 'Familiar' | 'Mastered';

export type ModuleStatus = 'not-started' | 'in-progress' | 'mastered';

export type ErrorCategory = 
  | 'Grammar Rule' 
  | 'Vocabulary' 
  | 'Word Order' 
  | 'Spelling' 
  | 'Verb Tense' 
  | 'Prepositions';

export type ErrorReviewStatus = 'Pending' | 'Reviewed' | 'Mastered';

export type ExerciseType = 'multiple-choice' | 'fill-gap' | 'unscramble' | 'speaking-shadow';

export interface GrammarRuleExample {
  english: string;
  note?: string;
  highlightWords?: string[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  formulaBadge?: string;
  examples: GrammarRuleExample[];
  tips?: string[];
  contrastWith?: string;
}

export interface Question {
  id: string;
  type: ExerciseType;
  prompt: string;
  instruction: string;
  sentenceContext?: string;
  options?: string[]; // for multiple-choice
  correctAnswer: string; // for gap-fill / multiple choice / unscramble
  alternativeAnswers?: string[];
  hint?: string;
  explanation: string;
  scrambledTokens?: string[]; // for unscramble
  targetWords?: string[]; // words featured in this card for vocabulary lookup
  audioSentence: string; // for listening & speech dictation
  category?: ErrorCategory;
}

export interface Module {
  id: number; // 1 to 44
  unitNumber: number;
  title: string;
  subtitle: string;
  grammarFocus: string;
  level: string; // 'Level 2 (Beginner / Pre-Intermediate)'
  category: 'Present Tenses' | 'Past Tenses' | 'Future Forms' | 'Modals' | 'Descriptions & Quantifiers' | 'Prepositions & Clauses' | 'Business & Daily Life' | 'Advanced Structures';
  estimatedMinutes: number;
  rules: GrammarRule[];
  vocabularyTargets: string[];
  questions: Question[];
}

export interface ModuleProgress {
  moduleId: number;
  status: ModuleStatus;
  score: number; // 0-100%
  completedQuestions: number;
  totalQuestions: number;
  attemptsCount: number;
  lastPracticedAt?: string;
  completedAt?: string;
}

export interface ErrorLogItem {
  id: string;
  timestamp: string;
  moduleId: number;
  moduleTitle: string;
  questionId: string;
  questionPrompt: string;
  userAnswer: string;
  correctAnswer: string;
  errorCategory: ErrorCategory;
  status: ErrorReviewStatus;
  reviewCount: number;
  nextReviewDate: string;
  explanation: string;
  audioSentence: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  partOfSpeech: PartOfSpeech;
  type: WordLayer;
  phonetic?: string;
  definition: string;
  businessExample: string;
  dailyExample: string;
  synonyms: string[];
  antonyms?: string[];
  collocations?: string[];
  exposureCount: number;
  masteryLevel: MasteryLevel;
  lastEncounteredAt?: string;
  moduleReferences: number[];
}

export interface SyncSettings {
  spreadsheetId: string;
  apiKey: string;
  appsScriptUrl: string;
  autoSync: boolean;
  lastSyncTimestamp?: string;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  syncErrorMessage?: string;
}

export interface AppState {
  currentModuleId: number;
  currentCardIndex: number;
  moduleProgress: Record<number, ModuleProgress>;
  errorLogs: ErrorLogItem[];
  vocabularyBank: Record<string, VocabularyItem>;
  streakDays: number;
  lastActiveDate: string;
  syncSettings: SyncSettings;
}
