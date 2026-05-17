const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();


const PORT = process.env.PORT || 3000

const app = express()

// Enable cors
app.use(cors())

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 Mins (m * s * ms)
    max: 500
})
app.use(limiter)
app.set('trust proxy', 1)

// Set static folder
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Routes
app.use('/api', require('./server/routes/weather'))

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))