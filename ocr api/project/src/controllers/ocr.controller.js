import { ocrService } from '../services/ocr.service.js';
import { summarizationService } from '../services/summarization.service.js';
import { searchService } from '../services/search.service.js';

export const processImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { language = 'eng', summarize = true } = req.body;
    
    // Extract text
    const text = await ocrService.extractText(
      req.file.buffer,
      req.file.mimetype,
      language
    );

    // Generate summary if requested
    let summary = null;
    if (summarize) {
      summary = await summarizationService.summarize(text);
    }

    // Store in search index
    const document = {
      text,
      summary,
      metadata: {
        userId: req.user.id,
        filename: req.file.originalname,
        language,
        timestamp: new Date()
      }
    };
    await searchService.indexDocument(document);

    res.json({
      success: true,
      data: {
        text,
        summary,
        filename: req.file.originalname,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};