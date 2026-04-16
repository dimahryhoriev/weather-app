const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const port = 3000;
const secretKey = process.env.WEATHER_API;

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City not specified' });
        }

        const response = await axios.get(
            `https://api.weatherapi.com/v1/current.json?key=${secretKey}&q=${city}`
        );

        res.json(response.data);
    } catch (error) {
        console.error('Request error: ', error.message);
        res.status(500).json({ error: 'Failed to get weather data' });
    }
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    console.log(`Try to open it http://localhost:${port}/weather?city=Kyiv`);
})