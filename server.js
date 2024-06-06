const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// Database setup
const db = require('./database');

// Routes
const bookings = require('./routes/bookings');
app.use('/bookings', bookings);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
