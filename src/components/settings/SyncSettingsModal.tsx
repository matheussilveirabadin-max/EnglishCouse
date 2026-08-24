import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ExternalLink, Code2, Download, Upload, Copy, Check, X, AlertCircle, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { AppState, SyncSettings } from '../../types';
import { SheetsService, SyncResult } from '../../services/sheetsService';
import { StorageService } from '../../services/storageService';

interface SyncSettingsModalProps {
  appState: AppState;
  onUpdateSettings: (settings: SyncSettings) => void;
  onImportState: (newState: AppState) => void;
  onClose: () => void;
}

export const SyncSettingsModal: React.FC<SyncSettingsModalProps> = ({
  appState,
  onUpdateSettings,
  onImportState,
  onClose
}) => {
  const [spreadsheetId] = useState(appState.syncSettings.spreadsheetId || SheetsService.SPREADSHEET_ID);
  const [appsScriptUrl, setAppsScriptUrl] = useState(appState.syncSettings.appsScriptUrl || '');
  const [apiKey] = useState(appState.syncSettings.apiKey || '');
  const [autoSync, setAutoSync] = useState(appState.syncSettings.autoSync || false);

  const [isPushing, setIsPushing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  const [syncResult, setSyncResult] = useState<SyncResult | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showScriptCode, setShowScriptCode] = useState(true);

  const scriptCode = SheetsService.getAppsScriptTemplate();
  const sheetUrl = SheetsService.getSpreadsheetUrl(spreadsheetId);

  const handleSave = () => {
    const updated: SyncSettings = {
      spreadsheetId: spreadsheetId.trim(),
      appsScriptUrl: appsScriptUrl.trim(),
      apiKey: apiKey.trim(),
      autoSync,
      lastSyncTimestamp: syncResult?.timestamp || appState.syncSettings.lastSyncTimestamp,
      syncStatus: syncResult?.success ? 'success' : 'idle'
    };
    onUpdateSettings(updated);
  };

  const handleTriggerPush = async () => {
    setIsPushing(true);
    setSyncResult(null);

    const currentSettings: SyncSettings = {
      spreadsheetId: spreadsheetId.trim(),
      appsScriptUrl: appsScriptUrl.trim(),
      apiKey: apiKey.trim(),
      autoSync,
      syncStatus: 'syncing'
    };

    const result = await SheetsService.pushToGoogleSheets(appState, currentSettings);
    setSyncResult(result);
    setIsPushing(false);

    onUpdateSettings({
      ...currentSettings,
      lastSyncTimestamp: result.timestamp,
      syncStatus: result.success ? 'success' : 'error',
      syncErrorMessage: result.success ? undefined : result.message
    });
  };

  const handleTriggerPull = async () => {
    if (!appsScriptUrl.trim()) {
      alert('Please enter your Google Apps Script Web App URL first.');
      return;
    }

    setIsPulling(true);
    setSyncResult(null);

    const currentSettings: SyncSettings = {
      spreadsheetId: spreadsheetId.trim(),
      appsScriptUrl: appsScriptUrl.trim(),
      apiKey: apiKey.trim(),
      autoSync,
      syncStatus: 'syncing'
    };

    const result = await SheetsService.pullFromGoogleSheets(currentSettings);
    setSyncResult(result);
    setIsPulling(false);

    if (result.success && result.fetchedData) {
      const merged: AppState = {
        ...appState,
        moduleProgress: {
          ...appState.moduleProgress,
          ...(result.fetchedData.moduleProgress || {})
        },
        errorLogs: result.fetchedData.errorLogs && result.fetchedData.errorLogs.length > 0
          ? result.fetchedData.errorLogs
          : appState.errorLogs,
        vocabularyBank: {
          ...appState.vocabularyBank,
          ...(result.fetchedData.vocabularyBank || {})
        }
      };
      onImportState(merged);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(scriptCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.moduleProgress && parsed.vocabularyBank) {
          onImportState(parsed);
          alert('Study progress imported successfully!');
        } else {
          alert('Invalid backup JSON format.');
        }
      } catch (err) {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Google Sheets Integration Setup</h2>
              <p className="text-xs text-slate-400">
                Full bi-directional synchronization with your Google Spreadsheet database.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Spreadsheet Info */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 block">
                Target Google Spreadsheet
              </label>
              <span className="text-xs font-mono text-slate-300">
                ID: {spreadsheetId}
              </span>
            </div>
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold rounded-xl border border-emerald-500/30 transition-colors"
            >
              <span>Open Spreadsheet</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 text-center">
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-200 block">Aba 1</span>
              Cronograma de Estudos
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-200 block">Aba 2</span>
              Registro de Erros e Revisão
            </div>
            <div className="p-2 bg-slate-900 rounded-lg">
              <span className="font-semibold text-slate-200 block">Aba 3</span>
              Vocabulary Bank
            </div>
          </div>
        </div>

        {/* Apps Script Web App URL Input */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-300 block">
                Google Apps Script Web App URL
              </label>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                Direct Bi-Directional API
              </span>
            </div>
            <input
              type="text"
              value={appsScriptUrl}
              onChange={(e) => setAppsScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-4 py-3 bg-slate-800 rounded-xl border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Follow the 3-step setup below to deploy your Google Apps Script in 1 minute.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoSyncCheck"
              checked={autoSync}
              onChange={(e) => setAutoSync(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-indigo-500"
            />
            <label htmlFor="autoSyncCheck" className="text-xs text-slate-300 cursor-pointer">
              <strong>Auto-save to Google Sheets</strong> on each completed exercise & practice session
            </label>
          </div>
        </div>

        {/* Sync Actions (Push / Pull) */}
        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Bi-Directional Actions
            </span>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleTriggerPush}
                disabled={isPushing || isPulling}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all disabled:opacity-50"
                title="Save current progress into Google Sheets"
              >
                <ArrowUpCircle className={`w-4 h-4 ${isPushing ? 'animate-spin' : ''}`} />
                <span>{isPushing ? 'Saving...' : 'Save / Push to Sheets'}</span>
              </button>

              <button
                onClick={handleTriggerPull}
                disabled={isPushing || isPulling}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50"
                title="Load saved progress from Google Sheets"
              >
                <ArrowDownCircle className={`w-4 h-4 ${isPulling ? 'animate-spin' : ''}`} />
                <span>{isPulling ? 'Loading...' : 'Load / Pull from Sheets'}</span>
              </button>
            </div>
          </div>

          {syncResult && (
            <div className={`p-3.5 rounded-xl border text-xs animate-fade-in ${
              syncResult.success 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {syncResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-rose-400" />}
                <span>{syncResult.message}</span>
              </div>
              {syncResult.syncedModulesCount !== undefined && (
                <div className="text-[11px] text-slate-300">
                  Modules: {syncResult.syncedModulesCount} | Errors Logged: {syncResult.syncedErrorsCount} | Words Synced: {syncResult.syncedVocabCount}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step-by-Step Apps Script Setup Guide */}
        <div className="border border-slate-800 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowScriptCode(!showScriptCode)}
            className="w-full p-4 bg-slate-800/60 hover:bg-slate-800 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>Step-by-Step Google Apps Script Code (Copy &amp; Paste)</span>
            </div>
            <span>{showScriptCode ? '▲ Hide' : '▼ View Code'}</span>
          </button>

          {showScriptCode && (
            <div className="p-4 bg-slate-950 space-y-3 animate-fade-in">
              <ol className="text-xs text-slate-300 list-decimal list-inside space-y-1">
                <li>Abra a sua planilha Google Sheets (<a href={sheetUrl} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline font-mono">Abrir Planilha</a>).</li>
                <li>No menu superior, clique em <strong>Extensões &gt; Apps Script</strong>.</li>
                <li>Apague qualquer código existente, cole o código abaixo e salve (<code>Ctrl+S</code>).</li>
                <li>Clique no botão azul <strong>Implantar (Deploy) &gt; Nova implantação (New deployment)</strong>.</li>
                <li>No ícone de engrenagem, escolha <strong>Aplicativo da Web (Web App)</strong>.</li>
                <li>Configure: Executar como: <strong>"Eu" (Me)</strong> / Quem pode acessar: <strong>"Qualquer pessoa" (Anyone)</strong>.</li>
                <li>Copie o URL gerado (terminado em <code>/exec</code>) e cole no campo acima!</li>
              </ol>

              <div className="relative pt-2">
                <pre className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-[11px] font-mono text-indigo-200 max-h-52 overflow-y-auto">
                  {scriptCode}
                </pre>
                <button
                  onClick={handleCopyCode}
                  className="absolute top-4 right-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-md"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Código Copiado!' : 'Copiar Código'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Local Backup / Restore */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => StorageService.exportToJson(appState)}
              className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Backup JSON</span>
            </button>

            <label className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Importar Backup JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          <button
            onClick={() => {
              handleSave();
              onClose();
            }}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-md"
          >
            Salvar Configurações &amp; Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
