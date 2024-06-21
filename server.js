import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000; // Use environment variable for port, default to 5000

app.use(cors());
app.use(express.json());

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
};

// Set security headers middleware
app.use((req, res, next) => {
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.get('/get-news', async (req, res, next) => {
  try {
    const apiKey = process.env.NODE_APP_GNEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=all&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    next(error);
  }
});

router.post('/get-category', async (req, res, next) => {
  try {
    const { data } = req.body;
    const apiKey = process.env.NODE_APP_GNEWS_API_KEY;
    const category = data || 'all';

    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const responseData = await response.json();
    res.send(responseData);
  } catch (error) {
    next(error);
  }
});

// Attach router to the app
app.use('/', router);

// Error handling middleware (must be declared last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
