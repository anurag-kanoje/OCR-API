import { Client } from '@elastic/elasticsearch';
import { dbConfig } from '../config/database.js';

class SearchService {
  constructor() {
    this.client = new Client(dbConfig.elasticsearch);
  }

  async indexDocument(document) {
    return this.client.index({
      index: 'documents',
      document: {
        text: document.text,
        summary: document.summary,
        metadata: document.metadata,
        timestamp: new Date()
      }
    });
  }

  async search(query, options = {}) {
    const {
      from = 0,
      size = 10,
      filters = {}
    } = options;

    const must = [
      { match: { text: query } }
    ];

    if (filters.userId) {
      must.push({ term: { 'metadata.userId': filters.userId } });
    }

    if (filters.tags) {
      must.push({ terms: { 'metadata.tags': filters.tags } });
    }

    return this.client.search({
      index: 'documents',
      from,
      size,
      query: {
        bool: { must }
      }
    });
  }
}

export const searchService = new SearchService();