export const dbConfig = {
  mongodb: {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/ocr_api',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  elasticsearch: {
    node: process.env.ELASTICSEARCH_URL || 'http://localhost:9200'
  }
};