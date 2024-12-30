import test from 'node:test';
import assert from 'node:assert';
import { createWorker } from 'tesseract.js';

test('Tesseract OCR initialization', async (t) => {
  const worker = await createWorker();
  
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  
  const initialized = await worker.isInitialized();
  assert.strictEqual(initialized, true);
  
  await worker.terminate();
});