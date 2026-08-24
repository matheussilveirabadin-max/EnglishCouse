import React from 'react';
import { BookOpen, Layers, RotateCw, BookMarked, Settings, Flame, RefreshCw, ChevronDown } from 'lucide-react';
import { Module } from '../types';

interface NavbarProps {
  currentModule: Module;
  activeView: 'practice' | 'modules' | 'review' | 'vocabulary';
  onChangeView: (view: 'practice' | 'modules' | 'review' | 'vocabulary') => void;
  streakDays: number;
  pendingReviewCount: number;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
  onOpenSettings: () => void;
  onOpenModuleSelector: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentModule,
  activeView,
  onChangeView,
  streakDays,
  pendingReviewCount,
  syncStatus,
  onOpenSettings,
  onOpenModuleSelector
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Active Module Quick Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl">🇬🇧</span>
              <div className="hidden sm:block">
                <span className="text-sm font-extrabold tracking-tight text-white block leading-none">
                  ENGLISH FOR EVERYONE
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                  Level 2 Interactive Hub
                </span>
              </div>
            </div>

            {/* Quick Active Module Pill */}
            <button
              onClick={onOpenModuleSelector}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 text-xs text-slate-200 transition-colors ml-2"
              title="Change active module"
            >
              <span className="font-mono font-bold text-indigo-400">
                M{currentModule.id.toString().padStart(2, '0')}
              </span>
              <span className="hidden md:inline font-medium truncate max-w-[140px]">
                {currentModule.title}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Navigation Views */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => onChangeView('practice')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Practice Cards</span>
            </button>

            <button
              onClick={() => onChangeView('modules')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'modules'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>44 Modules</span>
            </button>

            <button
              onClick={() => onChangeView('review')}
              className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'review'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Spaced Review</span>
              {pendingReviewCount > 0 && (
                <span className="w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center -mr-1">
                  {pendingReviewCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onChangeView('vocabulary')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeView === 'vocabulary'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookMarked className="w-3.5 h-3.5" />
              <span>Word Bank</span>
            </button>
          </nav>

          {/* Right Action Icons & Badges */}
          <div className="flex items-center gap-2">
            {/* Streak Badge */}
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold"
              title="Daily Study Streak"
            >
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{streakDays}d Streak</span>
            </div>

            {/* Sync Pill */}
            <button
              onClick={onOpenSettings}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                syncStatus === 'syncing'
                  ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300'
                  : syncStatus === 'success'
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Google Sheets Sync Status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncStatus === 'syncing' ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {syncStatus === 'syncing' ? 'Syncing...' : syncStatus === 'success' ? 'Sheets Synced' : 'Sync'}
              </span>
            </button>

            {/* Settings Trigger */}
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
              title="Settings & Google Sheets Config"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-800/60 text-xs font-semibold">
          <button
            onClick={() => onChangeView('practice')}
            className={`px-3 py-1 rounded-lg ${activeView === 'practice' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Practice
          </button>
          <button
            onClick={() => onChangeView('modules')}
            className={`px-3 py-1 rounded-lg ${activeView === 'modules' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Modules
          </button>
          <button
            onClick={() => onChangeView('review')}
            className={`relative px-3 py-1 rounded-lg ${activeView === 'review' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Review {pendingReviewCount > 0 && `(${pendingReviewCount})`}
          </button>
          <button
            onClick={() => onChangeView('vocabulary')}
            className={`px-3 py-1 rounded-lg ${activeView === 'vocabulary' ? 'text-indigo-400' : 'text-slate-400'}`}
          >
            Word Bank
          </button>
        </div>
      </div>
    </header>
  );
};
