import { pipeline } from '@xenova/transformers';

class SummarizationService {
  constructor() {
    this.summarizer = null;
  }

  async initialize() {
    this.summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn');
  }

  async summarize(text, options = {}) {
    if (!this.summarizer) {
      await this.initialize();
    }

    const {
      maxLength = 130,
      minLength = 30,
      doSample = false
    } = options;

    const summary = await this.summarizer(text, {
      max_length: maxLength,
      min_length: minLength,
      do_sample: doSample
    });

    return summary[0].summary_text;
  }
}

export const summarizationService = new SummarizationService();