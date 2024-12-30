import { createWorker, createScheduler } from 'tesseract.js';
import { ocrConfig } from '../config/ocr.js';

class OcrService {
  constructor() {
    this.scheduler = null;
    this.workers = new Map();
  }

  async initialize() {
    this.scheduler = createScheduler();
    
    // Initialize workers for each supported language
    for (const lang of ocrConfig.supportedLanguages) {
      const worker = await createWorker();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      this.workers.set(lang, worker);
      this.scheduler.addWorker(worker);
    }
  }

  async extractText(imageBuffer, mimetype, language = 'eng') {
    if (!this.scheduler) {
      await this.initialize();
    }

    if (!ocrConfig.supportedFormats.includes(mimetype)) {
      throw new Error('Unsupported image format');
    }

    const base64Image = imageBuffer.toString('base64');
    const { data: { text } } = await this.scheduler.addJob('recognize', {
      imageData: `data:${mimetype};base64,${base64Image}`,
      options: { lang: language }
    });

    return text;
  }

  async terminate() {
    if (this.scheduler) {
      await this.scheduler.terminate();
      this.scheduler = null;
    }
    
    for (const worker of this.workers.values()) {
      await worker.terminate();
    }
    this.workers.clear();
  }
}

export const ocrService = new OcrService();