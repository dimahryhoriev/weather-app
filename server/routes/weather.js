const url = require('url')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const apicache = require('apicache')

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

// Init cache
let cache = apicache.middleware

router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...req.query
        })

        const apiRes = await axios.get(`${API_BASE_URL}?${params}`)
        const data = apiRes.data

        // Log the request to the public API
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router