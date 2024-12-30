import express from 'express';
import cors from 'cors';
import { config } from './config/index.js';
import { errorHandler } from './middleware/error-handler.js';
import { ocrService } from './services/ocr.service.js';
import { summarizationService } from './services/summarization.service.js';
import ocrRoutes from './routes/ocr.routes.js';
import searchRoutes from './routes/search.routes.js';
import healthRoutes from './routes/health.routes.js';

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use('/api/ocr', ocrRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/health', healthRoutes);

// Error handling
app.use(errorHandler);

// Initialize services and start server
const startServer = async () => {
  try {
    await Promise.all([
      ocrService.initialize(),
      summarizationService.initialize()
    ]);
    
    app.listen(config.port, () => {
      console.log(`OCR API server running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();