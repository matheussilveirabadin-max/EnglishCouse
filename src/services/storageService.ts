import { AppState, ErrorLogItem, ModuleProgress, SyncSettings, VocabularyItem } from '../types';
import { allModules } from '../data/modulesData';
import { initialVocabularyBank } from '../data/vocabularyBankData';

const STORAGE_KEY = 'antigravity_english_study_hub_v1';

export class StorageService {
  public static getInitialState(): AppState {
    const today = new Date().toISOString().split('T')[0];

    // Initialize progress for all 44 modules
    const initialProgress: Record<number, ModuleProgress> = {};
    for (const m of allModules) {
      initialProgress[m.id] = {
        moduleId: m.id,
        status: m.id === 1 ? 'in-progress' : 'not-started',
        score: 0,
        completedQuestions: 0,
        totalQuestions: m.questions.length,
        attemptsCount: 0
      };
    }

    const defaultSettings: SyncSettings = {
      spreadsheetId: import.meta.env.VITE_GOOGLE_SPREADSHEET_ID || '',
      apiKey: '',
      appsScriptUrl: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || '',
      autoSync: false,
      syncStatus: 'idle'
    };

    return {
      currentModuleId: 1,
      currentCardIndex: 0,
      moduleProgress: initialProgress,
      errorLogs: [],
      vocabularyBank: { ...initialVocabularyBank },
      streakDays: 1,
      lastActiveDate: today,
      syncSettings: defaultSettings
    };
  }

  public static loadState(): AppState {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      if (!serialized) {
        const initial = this.getInitialState();
        this.saveState(initial);
        return initial;
      }
      const parsed: AppState = JSON.parse(serialized);

      // Merge with initial state to guarantee any missing keys (e.g., newly added modules or vocabulary)
      const initial = this.getInitialState();
      
      // Merge module progress
      const mergedProgress = { ...initial.moduleProgress, ...parsed.moduleProgress };
      
      // Merge vocabulary bank
      const mergedVocab = { ...initial.vocabularyBank, ...parsed.vocabularyBank };

      // Update streak
      const today = new Date().toISOString().split('T')[0];
      let streak = parsed.streakDays || 1;
      if (parsed.lastActiveDate) {
        const lastDate = new Date(parsed.lastActiveDate);
        const currentDate = new Date(today);
        const diffDays = Math.floor((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
        if (diffDays === 1) {
          streak += 1;
        } else if (diffDays > 1) {
          streak = 1;
        }
      }

      return {
        ...initial,
        ...parsed,
        moduleProgress: mergedProgress,
        vocabularyBank: mergedVocab,
        streakDays: streak,
        lastActiveDate: today,
        syncSettings: {
          ...initial.syncSettings,
          ...(parsed.syncSettings || {})
        }
      };
    } catch (err) {
      console.error('Failed to parse saved state from LocalStorage:', err);
      return this.getInitialState();
    }
  }

  public static saveState(state: AppState): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('Failed to save state to LocalStorage:', err);
    }
  }

  /**
   * Records an error into the Spaced Repetition queue
   */
  public static logError(
    state: AppState,
    moduleId: number,
    moduleTitle: string,
    questionId: string,
    prompt: string,
    userAnswer: string,
    correctAnswer: string,
    category: ErrorLogItem['errorCategory'],
    explanation: string,
    audioSentence: string
  ): AppState {
    const existingIndex = state.errorLogs.findIndex(
      e => e.questionId === questionId && e.moduleId === moduleId
    );

    const now = new Date();
    const nextDate = new Date();
    nextDate.setDate(now.getDate() + 1); // 1 day interval for new error

    const newError: ErrorLogItem = {
      id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: now.toISOString(),
      moduleId,
      moduleTitle,
      questionId,
      questionPrompt: prompt,
      userAnswer,
      correctAnswer,
      errorCategory: category,
      status: 'Pending',
      reviewCount: existingIndex >= 0 ? state.errorLogs[existingIndex].reviewCount + 1 : 1,
      nextReviewDate: nextDate.toISOString().split('T')[0],
      explanation,
      audioSentence
    };

    let updatedLogs: ErrorLogItem[];
    if (existingIndex >= 0) {
      updatedLogs = [...state.errorLogs];
      updatedLogs[existingIndex] = newError;
    } else {
      updatedLogs = [newError, ...state.errorLogs];
    }

    const newState: AppState = {
      ...state,
      errorLogs: updatedLogs
    };

    this.saveState(newState);
    return newState;
  }

  /**
   * Updates an error after a review re-test
   */
  public static resolveErrorReview(
    state: AppState,
    errorId: string,
    isCorrect: boolean
  ): AppState {
    const updatedLogs = state.errorLogs.map(err => {
      if (err.id !== errorId) return err;

      const now = new Date();
      const nextDate = new Date();
      let nextStatus: ErrorLogItem['status'] = err.status;
      let intervalDays = 1;

      if (isCorrect) {
        if (err.status === 'Pending') {
          nextStatus = 'Reviewed';
          intervalDays = 3;
        } else if (err.status === 'Reviewed') {
          nextStatus = 'Mastered';
          intervalDays = 7;
        }
      } else {
        nextStatus = 'Pending';
        intervalDays = 1;
      }

      nextDate.setDate(now.getDate() + intervalDays);

      return {
        ...err,
        status: nextStatus,
        reviewCount: err.reviewCount + 1,
        nextReviewDate: nextDate.toISOString().split('T')[0]
      };
    });

    const newState: AppState = {
      ...state,
      errorLogs: updatedLogs
    };

    this.saveState(newState);
    return newState;
  }

  /**
   * Increments exposure count and recalculates mastery level for vocabulary words
   */
  public static recordWordExposure(state: AppState, words: string[], moduleId: number): AppState {
    if (!words || words.length === 0) return state;

    const updatedBank = { ...state.vocabularyBank };
    let hasChanges = false;

    for (const rawWord of words) {
      const lower = rawWord.toLowerCase().trim();
      const existing = updatedBank[lower];

      if (existing) {
        const newCount = existing.exposureCount + 1;
        let newLevel: VocabularyItem['masteryLevel'] = existing.masteryLevel;

        if (newCount >= 10) newLevel = 'Mastered';
        else if (newCount >= 5) newLevel = 'Familiar';
        else if (newCount >= 2) newLevel = 'Learning';

        const modRefs = Array.from(new Set([...existing.moduleReferences, moduleId]));

        updatedBank[lower] = {
          ...existing,
          exposureCount: newCount,
          masteryLevel: newLevel,
          lastEncounteredAt: new Date().toISOString(),
          moduleReferences: modRefs
        };
        hasChanges = true;
      }
    }

    if (!hasChanges) return state;

    const newState: AppState = {
      ...state,
      vocabularyBank: updatedBank
    };

    this.saveState(newState);
    return newState;
  }

  /**
   * Exports application state to a downloadable JSON file
   */
  public static exportToJson(state: AppState): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `english_study_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  /**
   * Exports errors to CSV (compatible with Google Sheets tab 'Registro de Erros e Revisão')
   */
  public static exportErrorsToCsv(errorLogs: ErrorLogItem[]): void {
    const headers = ['Error ID', 'Timestamp', 'Module ID', 'Module Title', 'Question', 'User Answer', 'Correct Answer', 'Category', 'Status', 'Review Count', 'Next Review Date', 'Explanation'];
    const rows = errorLogs.map(e => [
      e.id,
      e.timestamp,
      e.moduleId,
      `"${e.moduleTitle.replace(/"/g, '""')}"`,
      `"${e.questionPrompt.replace(/"/g, '""')}"`,
      `"${e.userAnswer.replace(/"/g, '""')}"`,
      `"${e.correctAnswer.replace(/"/g, '""')}"`,
      e.errorCategory,
      e.status,
      e.reviewCount,
      e.nextReviewDate,
      `"${e.explanation.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', encodeURI(csvContent));
    downloadAnchor.setAttribute('download', `registro_erros_revisao_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }
}
