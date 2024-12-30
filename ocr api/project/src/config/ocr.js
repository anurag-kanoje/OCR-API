export const ocrConfig = {
  supportedLanguages: ['eng', 'fra', 'deu', 'spa'],
  supportedFormats: ['image/jpeg', 'image/png', 'application/pdf'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  workerPath: 'https://unpkg.com/tesseract.js-core/tesseract-core.wasm.js'
};