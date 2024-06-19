import express from 'express'
import cors from 'cors'

const app = express();
const port = 5000;

app.use(cors());

app.get('/get-news', async (req, res) => {
    const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
    var url = `https://newsapi.org/v2/everything?q=all&apiKey=e654a4c31be24f649f9da1577ae9d25d`;
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
});

app.post('/get-category', async (req, res) => {
    const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
    var url = `https://newsapi.org/v2/everything?q=${req.data}&apiKey=e654a4c31be24f649f9da1577ae9d25d`;
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});