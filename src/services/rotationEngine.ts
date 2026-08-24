import { VocabularyItem, WordLayer } from '../types';

export class RotationEngine {
  /**
   * Identifies structural / functional words vs content words
   */
  public static isStructuralWord(word: string): boolean {
    const structuralList = new Set([
      'is', 'are', 'was', 'were', 'am', 'be', 'been', 'being',
      'have', 'has', 'had', 'do', 'does', 'did',
      'will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must',
      'in', 'on', 'at', 'to', 'for', 'with', 'by', 'from', 'of', 'about', 'into', 'over', 'after',
      'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them',
      'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'a', 'an', 'the', 'this', 'that', 'these', 'those',
      'and', 'but', 'or', 'so', 'because', 'although', 'if', 'when', 'while'
    ]);
    return structuralList.has(word.toLowerCase().trim());
  }

  /**
   * Sorts vocabulary items by least exposure count to prioritize in rotation
   */
  public static getRotationPriorities(
    vocabBank: Record<string, VocabularyItem>,
    limit: number = 5,
    filterLayer?: WordLayer
  ): VocabularyItem[] {
    const list = Object.values(vocabBank).filter(item => {
      if (filterLayer) return item.type === filterLayer;
      return true;
    });

    // Sort by exposureCount ascending, then by lastEncounteredAt (oldest first)
    list.sort((a, b) => {
      if (a.exposureCount !== b.exposureCount) {
        return a.exposureCount - b.exposureCount;
      }
      const timeA = a.lastEncounteredAt ? new Date(a.lastEncounteredAt).getTime() : 0;
      const timeB = b.lastEncounteredAt ? new Date(b.lastEncounteredAt).getTime() : 0;
      return timeA - timeB;
    });

    return list.slice(0, limit);
  }

  /**
   * Extracts clean tokens from a sentence and classifies them
   */
  public static parseSentenceTokens(sentence: string): Array<{
    word: string;
    clean: string;
    isStructural: boolean;
    hasVocabDefinition: boolean;
  }> {
    const rawTokens = sentence.split(/\s+/);
    return rawTokens.map(token => {
      const clean = token.toLowerCase().replace(/[^a-z0-9'-]/g, '').trim();
      return {
        word: token,
        clean,
        isStructural: this.isStructuralWord(clean),
        hasVocabDefinition: clean.length > 2 && !this.isStructuralWord(clean)
      };
    });
  }
}
