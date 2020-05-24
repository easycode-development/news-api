const express = require('express');
const cors = require('cors');
const app = express();
const NewsAPI = require('newsapi');

const PORT = 3000;

app.use(cors());
app.use(express.json());

function auth(req, res, next) {
  if (!req.query.apiKey) {
    return res.status(401).send({
      message: "Your API key is invalid or incorrect. Check your key, or go to https://newsapi.org to create a free API key.",
      name: "NewsAPIError: apiKeyInvalid"
    })
  }

  next();
}

app.get('/top-headlines', auth, async (req, res) => {
  try {
    const {
      apiKey,
      country = '',
      category = '',
      language = 'en',
      sources = ''
     } = req.query;

     const newsApi = new NewsAPI(apiKey);
     const response = await newsApi.v2.topHeadlines({
      country,
      category,
      language,
      sources
     });
     res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/everything', auth, async (req, res) => {
  try {
    const {
      apiKey,
      q = '',
      sources = '',
      domains = '',
      from = '',
      to = '',
      language = 'en',
      sortBy = 'relevancy',
      page = 1
     } = req.query;

     const newsApi = new NewsAPI(apiKey);
     const response = await newsApi.v2.everything({
      q,
      sources,
      domains,
      from,
      to,
      language,
      sortBy,
      page
     });
     res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/sources', auth, async (req, res) => {
  try {
    const {
      apiKey,
      category = 'technology',
      language = 'en',
      country = 'us'
     } = req.query;

     const newsApi = new NewsAPI(apiKey);
     const response = await newsApi.v2.sources({
      category,
      language,
      country
     });
     res.status(200).send(response);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {``
  console.log(`Server up and running, PORT: ${PORT}`);
});