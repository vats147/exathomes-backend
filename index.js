const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
// Use PORT from .env or default to 3000
const PORT = process.env.PORT || 3000;

// Use API key from environment variables
const REALIE_API_KEY = process.env.REALIE_API_KEY;

// Use CORS middleware to allow all origins
app.use(cors());

// Proxy endpoint
app.get('/api/status', async (req, res) => {
    res.json("API IS UP AND RUNNING");
});
// Proxy endpoint
app.get('/api/property/search', async (req, res) => {
  try {
    console.log('Inside API');
    // Extract query parameters
    const { county, address, city, state } = req.query;
    console.log({ county, address, city, state })
    // Forward the request to the Realie API
    const response = await axios.get('https://app.realie.ai/api/public/property/search', {
      params: { county, address, city, state },
      headers: {
        'Authorization': REALIE_API_KEY,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // Send the API response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch data from Realie API' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
