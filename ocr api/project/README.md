# OCR API

REST API for extracting text from images using Tesseract.js.

## API Endpoints

### Extract Text from Image
```http
POST /api/ocr/extract-text
```

**Request:**
- Content-Type: multipart/form-data
- Body: 
  - image: Image file (required)

**Response:**
```json
{
  "success": true,
  "data": {
    "text": "Extracted text content",
    "filename": "example.jpg",
    "timestamp": "2024-01-20T12:00:00.000Z"
  }
}
```

### Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-20T12:00:00.000Z"
}
```

## Usage Example

```javascript
// Browser
const formData = new FormData();
formData.append('image', imageFile);

const response = await fetch('http://localhost:3000/api/ocr/extract-text', {
  method: 'POST',
  body: formData
});

const data = await response.json();
console.log(data.data.text);

// Node.js
import fetch from 'node-fetch';
import FormData from 'form-data';
import fs from 'fs';

const form = new FormData();
form.append('image', fs.createReadStream('image.jpg'));

const response = await fetch('http://localhost:3000/api/ocr/extract-text', {
  method: 'POST',
  body: form
});

const data = await response.json();
console.log(data.data.text);
```