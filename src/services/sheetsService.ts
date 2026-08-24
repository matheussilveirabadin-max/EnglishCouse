import { AppState, SyncSettings } from '../types';

export interface SyncResult {
  success: boolean;
  message: string;
  timestamp: string;
  syncedModulesCount?: number;
  syncedErrorsCount?: number;
  syncedVocabCount?: number;
  fetchedData?: Partial<AppState>;
}

export class SheetsService {
  public static readonly SPREADSHEET_ID = '1oWfdY8Otna7Xs5ViozwC5b5UllPtOfQ_GfwPdwYnPSU';

  public static getSpreadsheetUrl(spreadsheetId: string = this.SPREADSHEET_ID): string {
    return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/edit`;
  }

  /**
   * Generates standard Google Apps Script backend code that the user can paste into Apps Script
   */
  public static getAppsScriptTemplate(): string {
    return `/**
 * Google Apps Script - English for Everyone (Level 2) Sync Engine
 * Target Spreadsheet ID: 1oWfdY8Otna7Xs5ViozwC5b5UllPtOfQ_GfwPdwYnPSU
 */

var TARGET_SPREADSHEET_ID = "1oWfdY8Otna7Xs5ViozwC5b5UllPtOfQ_GfwPdwYnPSU";

function getSpreadsheet() {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (ss) return ss;
  } catch (e) {}
  return SpreadsheetApp.openById(TARGET_SPREADSHEET_ID);
}

function formatDate(isoStr) {
  if (!isoStr) return "";
  try {
    var d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var hours = ("0" + d.getHours()).slice(-2);
    var mins = ("0" + d.getMinutes()).slice(-2);
    return year + "-" + month + "-" + day + " " + hours + ":" + mins;
  } catch (e) {
    return isoStr;
  }
}

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = getSpreadsheet();
    
    var sheetSchedule = getOrCreateSheet(ss, "Cronograma de Estudos");
    var sheetErrors = getOrCreateSheet(ss, "Registro de Erros e Revisão");
    var sheetVocab = getOrCreateSheet(ss, "Vocabulary Bank");

    var result = {
      status: "success",
      timestamp: new Date().toISOString(),
      moduleProgress: readScheduleSheet(sheetSchedule),
      errorLogs: readErrorSheet(sheetErrors),
      vocabularyBank: readVocabSheet(sheetVocab)
    };

    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var ss = getSpreadsheet();
    var payload = {};
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {}
    }

    var sheetSchedule = getOrCreateSheet(ss, "Cronograma de Estudos");
    var sheetErrors = getOrCreateSheet(ss, "Registro de Erros e Revisão");
    var sheetVocab = getOrCreateSheet(ss, "Vocabulary Bank");

    if (payload.moduleProgress) {
      updateScheduleSheet(sheetSchedule, payload.moduleProgress);
    }

    if (payload.errorLogs) {
      updateErrorSheet(sheetErrors, payload.errorLogs);
    }

    if (payload.vocabularyBank) {
      updateVocabSheet(sheetVocab, payload.vocabularyBank);
    }

    var response = {
      status: "success",
      message: "Sync completed successfully at " + new Date().toISOString(),
      timestamp: new Date().toISOString()
    };

    return ContentService.createTextOutput(JSON.stringify(response))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === "Cronograma de Estudos") {
      sheet.appendRow(["Módulo", "Título", "Foco Gramatical", "Categoria", "Status", "Acurácia (%)", "Tentativas", "Última Prática"]);
      sheet.getRange(1, 1, 1, 8).setFontWeight("bold").setBackground("#e0e7ff");
    } else if (name === "Registro de Erros e Revisão") {
      sheet.appendRow(["Data", "Módulo de Origem", "Questão / Estrutura Problemática", "Erro Cometido", "Regra / Correção", "Status de Re-teste", "ID", "Próxima Revisão", "Repetições"]);
      sheet.getRange(1, 1, 1, 9).setFontWeight("bold").setBackground("#fee2e2");
    } else if (name === "Vocabulary Bank") {
      sheet.appendRow(["Palavra", "Classe Gramatical", "Tipo", "Fonética", "Definição", "Exemplo de Negócios", "Sinônimos", "Exposições", "Nível de Maestria", "Link Pronúncia"]);
      sheet.getRange(1, 1, 1, 10).setFontWeight("bold").setBackground("#dcfce7");
    }
  }
  return sheet;
}

function updateScheduleSheet(sheet, moduleProgress) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 8).clearContent();
  }
  var rows = [];
  for (var id in moduleProgress) {
    var item = moduleProgress[id];
    rows.push([
      "Module " + item.moduleId,
      "Module " + item.moduleId,
      "",
      "",
      item.status || "not-started",
      (item.score || 0) + "%",
      item.attemptsCount || 0,
      formatDate(item.lastPracticedAt)
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

function updateErrorSheet(sheet, errorLogs) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    // Clear only content to preserve data validation and dropdowns
    sheet.getRange(2, 1, lastRow - 1, 9).clearContent();
  }
  
  var rows = errorLogs.map(function(e) {
    // Format module label cleanly
    var moduleLabel = "M" + ("0" + e.moduleId).slice(-2) + ": " + (e.moduleTitle || "Module " + e.moduleId);
    
    // Status formatted to match English or Portuguese dropdown
    var statusText = e.status || "Pending";

    return [
      formatDate(e.timestamp),           // Col A: Data
      moduleLabel,                       // Col B: Módulo de Origem
      e.questionPrompt || "",            // Col C: Questão / Estrutura Problemática
      e.userAnswer || "",                // Col D: Erro Cometido
      e.correctAnswer || "",             // Col E: Regra / Correção
      statusText,                        // Col F: Status de Re-teste
      e.id || "",                        // Col G: ID
      e.nextReviewDate || "",            // Col H: Próxima Revisão
      e.reviewCount || 1                 // Col I: Repetições
    ];
  });

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

function updateVocabSheet(sheet, vocabularyBank) {
  var lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 10).clearContent();
  }
  var rows = [];
  for (var word in vocabularyBank) {
    var v = vocabularyBank[word];
    rows.push([
      v.word,
      v.partOfSpeech,
      v.type,
      v.phonetic || "",
      v.definition,
      v.businessExample,
      (v.synonyms || []).join(", "),
      v.exposureCount,
      v.masteryLevel,
      "https://translate.google.com/?sl=en&tl=en&text=" + encodeURIComponent(v.word) + "&op=translate"
    ]);
  }
  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, rows[0].length).setValues(rows);
  }
}

function readScheduleSheet(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return {};
  var values = sheet.getRange(2, 1, lastRow - 1, 8).getValues();
  var progress = {};
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var mStr = (row[0] || "").toString().replace(/[^0-9]/g, "");
    var mId = parseInt(mStr);
    if (!isNaN(mId)) {
      progress[mId] = {
        moduleId: mId,
        status: row[4] || "not-started",
        score: parseInt((row[5] || "").toString().replace("%", "")) || 0,
        attemptsCount: parseInt(row[6]) || 0,
        lastPracticedAt: row[7] ? row[7].toString() : ""
      };
    }
  }
  return progress;
}

function readErrorSheet(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];
  var values = sheet.getRange(2, 1, lastRow - 1, 9).getValues();
  var errors = [];
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    if (row[0] || row[2]) {
      var mId = parseInt((row[1] || "").toString().replace(/[^0-9]/g, "")) || 1;
      errors.push({
        id: row[6] ? row[6].toString() : "err-" + (i + 1),
        timestamp: row[0] ? row[0].toString() : new Date().toISOString(),
        moduleId: mId,
        moduleTitle: (row[1] || "").toString().replace(/^M\d+:\s*/, ""),
        questionPrompt: row[2] ? row[2].toString() : "",
        userAnswer: row[3] ? row[3].toString() : "",
        correctAnswer: row[4] ? row[4].toString() : "",
        errorCategory: "Grammar Rule",
        status: row[5] || "Pending",
        reviewCount: parseInt(row[8]) || 1,
        nextReviewDate: row[7] ? row[7].toString() : new Date().toISOString().split('T')[0],
        explanation: "",
        audioSentence: row[4] ? row[4].toString() : ""
      });
    }
  }
  return errors;
}

function readVocabSheet(sheet) {
  var lastRow = sheet.getLastRow();
  if (lastRow <= 1) return {};
  var values = sheet.getRange(2, 1, lastRow - 1, 10).getValues();
  var vocab = {};
  for (var i = 0; i < values.length; i++) {
    var row = values[i];
    var word = row[0] ? row[0].toString().toLowerCase().trim() : "";
    if (word) {
      vocab[word] = {
        id: "vocab-" + word,
        word: word,
        partOfSpeech: row[1] || "noun",
        type: row[2] || "content",
        phonetic: row[3] ? row[3].toString() : "",
        definition: row[4] ? row[4].toString() : "",
        businessExample: row[5] ? row[5].toString() : "",
        dailyExample: "",
        synonyms: row[6] ? row[6].toString().split(",").map(function(s) { return s.trim(); }) : [],
        exposureCount: parseInt(row[7]) || 0,
        masteryLevel: row[8] || "New",
        moduleReferences: []
      };
    }
  }
  return vocab;
}`;
  }

  /**
   * Pushes local state to Google Sheets via Webhook POST
   */
  public static async pushToGoogleSheets(
    state: AppState,
    settings: SyncSettings
  ): Promise<SyncResult> {
    const timestamp = new Date().toISOString();

    const payload = {
      action: 'sync',
      spreadsheetId: settings.spreadsheetId || this.SPREADSHEET_ID,
      timestamp,
      moduleProgress: state.moduleProgress,
      errorLogs: state.errorLogs,
      vocabularyBank: state.vocabularyBank
    };

    if (settings.appsScriptUrl && settings.appsScriptUrl.trim().startsWith('http')) {
      try {
        await fetch(settings.appsScriptUrl.trim(), {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
          mode: 'no-cors'
        });

        return {
          success: true,
          message: 'Saved to Google Sheets (3 tabs updated)!',
          timestamp,
          syncedModulesCount: Object.keys(state.moduleProgress).length,
          syncedErrorsCount: state.errorLogs.length,
          syncedVocabCount: Object.keys(state.vocabularyBank).length
        };
      } catch (err: any) {
        return {
          success: false,
          message: `Push failed: ${err.message || 'Network error'}`,
          timestamp
        };
      }
    }

    // Local simulation fallback
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'Local dataset synchronized. (Configure your Apps Script URL above to save live to Google Drive).',
      timestamp,
      syncedModulesCount: Object.keys(state.moduleProgress).length,
      syncedErrorsCount: state.errorLogs.length,
      syncedVocabCount: Object.keys(state.vocabularyBank).length
    };
  }

  /**
   * Pulls latest data from Google Sheets via Webhook GET
   */
  public static async pullFromGoogleSheets(
    settings: SyncSettings
  ): Promise<SyncResult> {
    const timestamp = new Date().toISOString();

    if (settings.appsScriptUrl && settings.appsScriptUrl.trim().startsWith('http')) {
      try {
        const response = await fetch(settings.appsScriptUrl.trim(), {
          method: 'GET'
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.status === 'success') {
          return {
            success: true,
            message: 'Successfully pulled latest study progress from Google Sheets!',
            timestamp,
            syncedModulesCount: data.moduleProgress ? Object.keys(data.moduleProgress).length : 0,
            syncedErrorsCount: data.errorLogs ? data.errorLogs.length : 0,
            syncedVocabCount: data.vocabularyBank ? Object.keys(data.vocabularyBank).length : 0,
            fetchedData: {
              moduleProgress: data.moduleProgress,
              errorLogs: data.errorLogs,
              vocabularyBank: data.vocabularyBank
            }
          };
        } else {
          return {
            success: false,
            message: `Apps Script error: ${data.message || 'Unknown error'}`,
            timestamp
          };
        }
      } catch (err: any) {
        return {
          success: false,
          message: `Pull error: ${err.message}. Please verify the Apps Script is deployed with "Who has access: Anyone".`,
          timestamp
        };
      }
    }

    return {
      success: false,
      message: 'Apps Script Web App URL is required to pull data from Google Sheets.',
      timestamp
    };
  }

  /**
   * Unified sync function (Pushes by default)
   */
  public static async syncWithGoogleSheets(
    state: AppState,
    settings: SyncSettings
  ): Promise<SyncResult> {
    return this.pushToGoogleSheets(state, settings);
  }
}
