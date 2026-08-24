import React, { useState } from 'react';
import { Clock, Search, ChevronRight, Award } from 'lucide-react';
import { ModuleProgress } from '../../types';
import { allModules } from '../../data/modulesData';

interface ModuleNavigatorProps {
  currentModuleId: number;
  moduleProgress: Record<number, ModuleProgress>;
  onSelectModule: (moduleId: number) => void;
  onClose?: () => void;
}

export const ModuleNavigator: React.FC<ModuleNavigatorProps> = ({
  currentModuleId,
  moduleProgress,
  onSelectModule,
  onClose
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Present Tenses',
    'Past Tenses',
    'Future Forms',
    'Modals',
    'Descriptions & Quantifiers',
    'Prepositions & Clauses',
    'Business & Daily Life',
    'Advanced Structures'
  ];

  const filteredModules = allModules.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.grammarFocus.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.vocabularyTargets.some(v => v.toLowerCase().includes(searchTerm.toLowerCase())) ||
      `module ${m.id}`.includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalMastered = Object.values(moduleProgress).filter(p => p.status === 'mastered').length;
  const overallPercentage = Math.round((totalMastered / allModules.length) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-900/50 via-slate-900 to-indigo-950/40 border border-indigo-500/20 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>English for Everyone Level 2 Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            All 44 Interactive Study Modules
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            Master beginner and pre-intermediate English through 100% immersive card drills, spaced repetition tracking, and continuous vocabulary rotation.
          </p>
        </div>

        {/* Global Progress Bar */}
        <div className="w-full md:w-64 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
            <span>Curriculum Mastery</span>
            <span className="text-indigo-400 font-bold">{overallPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>{totalMastered} of 44 Mastered</span>
            <span>{allModules.length - totalMastered} Remaining</span>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search grammar rules, words, or module #..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Category Pill Scroller */}
        <div className="w-full sm:w-auto overflow-x-auto flex items-center gap-1.5 pb-2 sm:pb-0 scrollbar-thin">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModules.map((m) => {
          const prog = moduleProgress[m.id] || { status: 'not-started', score: 0, attemptsCount: 0 };
          const isCurrent = m.id === currentModuleId;

          let statusBadge = 'bg-slate-800 text-slate-400 border-slate-700';
          let statusText = 'Not Started';

          if (prog.status === 'mastered') {
            statusBadge = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
            statusText = 'Mastered';
          } else if (prog.status === 'in-progress') {
            statusBadge = 'bg-amber-500/20 text-amber-300 border-amber-500/30';
            statusText = 'In Progress';
          }

          return (
            <div
              key={m.id}
              onClick={() => {
                onSelectModule(m.id);
                if (onClose) onClose();
              }}
              className={`group relative bg-slate-900 border rounded-3xl p-5 sm:p-6 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 hover:scale-[1.01] hover:shadow-xl ${
                isCurrent
                  ? 'border-indigo-500 ring-2 ring-indigo-500/30 bg-slate-900/90 shadow-lg shadow-indigo-500/10'
                  : 'border-slate-800/90 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/60 px-2.5 py-1 rounded-lg border border-indigo-800/40">
                    Module {m.id.toString().padStart(2, '0')}
                  </span>
                  <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold border ${statusBadge}`}>
                    {statusText}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {m.grammarFocus}
                </p>
              </div>

              {/* Vocabulary Target Chips */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Target Words:
                </div>
                <div className="flex flex-wrap gap-1">
                  {m.vocabularyTargets.map((w, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] px-2 py-0.5 bg-slate-800 text-slate-300 rounded-md border border-slate-700/50"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{m.estimatedMinutes} mins</span>
                </div>

                <div className="flex items-center gap-1 text-indigo-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                  <span>{isCurrent ? 'Continue' : 'Launch Cards'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredModules.length === 0 && (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-2">
          <p className="text-slate-400 text-base">No modules match your search filters.</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
            className="text-xs text-indigo-400 font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
