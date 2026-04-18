const express = require('express');
const router = express.Router();
const axios = require('axios');

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

router.get('/', async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE
        })

        const apiRes = await axios.get(`${API_BASE_URL}`);
        const data = apiRes.data;

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router;