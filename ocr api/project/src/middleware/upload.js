import multer from 'multer';
import { config } from '../config/index.js';

const storage = multer.memoryStorage();

export const upload = multer({ 
  storage,
  limits: {
    fileSize: config.maxFileSize
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  }
});