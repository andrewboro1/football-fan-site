const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;
const FOOTBALL_API_KEY = '67250d597ba146b09d93bc0df03fc477'; // Football-Data.org API Key
const NEWS_API_KEY = 'efba3881297448239fb15ebfa8faacc1'; // NewsAPI Key

app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    try {
        // Fetch live football scores
        const scoresResponse = await axios.get('https://api.football-data.org/v4/teams/19', {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        });
        const scores = scoresResponse.data;

        // Fetch Premier League standings
        const rankingsResponse = await axios.get('https://api.football-data.org/v4/competitions/PL', {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY }
        });
        const rankings = rankingsResponse.data;

        // Fetch football news
        const newsResponse = await axios.get(`https://newsapi.org/v2/everything?q=football&apiKey=${NEWS_API_KEY}`);
        const news = newsResponse.data;

        // Render the data to index.ejs
        res.render('index', { scores, rankings, news });
    } catch (error) {
        // Detailed error logging
        console.error('Error fetching data:', error.response ? error.response.data : error.message);
        
        // Sending an error message to the client
        res.status(500).send('Error fetching data, please try again later.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
