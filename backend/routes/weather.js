// In backend/routes/weather.js
const axios = require('axios');
const express = require('express');
const router = express.Router();

router.get('/:location', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${req.params.location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
        );
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching weather data' });
    }
});

module.exports = router;
