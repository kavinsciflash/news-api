import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Import node-fetch for making HTTP requests in Node.js
import dotenv from 'dotenv'; // Import dotenv for managing environment variables
dotenv.config(); // Load environment variables from .env file if present

const app = express();
const router = express.Router();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/get-news', async (req, res) => {
    const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
    const url = `https://newsapi.org/v2/everything?q=all&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

router.post('/get-category', async (req, res) => {
    const { data } = req.body;
    const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
    const category = data ? data : 'all'; // Assuming you expect a JSON object with a 'category' field

    const url = `https://newsapi.org/v2/everything?q=${category}&apiKey=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        res.send(data);
    } catch (error) {
        console.error('Error fetching category news:', error);
        res.status(500).json({ error: 'Failed to fetch category news' });
    }
});

// Attach router to the app
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
