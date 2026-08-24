import React from 'react';
import { RotationEngine } from '../../services/rotationEngine';

interface WordSpansProps {
  text: string;
  onWordClick?: (word: string) => void;
  targetWords?: string[];
  className?: string;
  wordClassName?: string;
}

export const WordSpans: React.FC<WordSpansProps> = ({
  text,
  onWordClick,
  targetWords = [],
  className = '',
  wordClassName = ''
}) => {
  const tokens = text.split(/(\s+)/);
  const normalizedTargets = new Set(targetWords.map(w => w.toLowerCase().trim()));

  return (
    <span className={`inline-block leading-relaxed ${className}`}>
      {tokens.map((token, index) => {
        // If it's whitespace, render directly
        if (/^\s+$/.test(token)) {
          return <span key={index}>{token}</span>;
        }

        const cleanWord = token.toLowerCase().replace(/[^a-z0-9'-]/g, '').trim();
        const isTarget = normalizedTargets.has(cleanWord);
        const isStructural = RotationEngine.isStructuralWord(cleanWord);
        const isInteractive = cleanWord.length > 1;

        return (
          <span
            key={index}
            onClick={(e) => {
              if (onWordClick && isInteractive) {
                e.stopPropagation();
                onWordClick(cleanWord);
              }
            }}
            title={isInteractive ? `Click to look up "${cleanWord}" in English Dictionary` : undefined}
            className={`cursor-pointer transition-all duration-150 rounded px-1 -mx-0.5 inline-block ${
              isTarget
                ? 'bg-amber-500/20 text-amber-300 font-semibold border-b-2 border-amber-400 hover:bg-amber-500/30'
                : !isStructural && cleanWord.length > 2
                ? 'hover:bg-indigo-500/20 hover:text-indigo-200 border-b border-dashed border-slate-600'
                : 'hover:bg-slate-700/50'
            } ${wordClassName}`}
          >
            {token}
          </span>
        );
      })}
    </span>
  );
};
