const express = require('express');
const { Pool } = require('pg');
const path = require('path');


const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/runs', (req, res) => {
  // TODO: Add code to handle data submission
});

app.get('/runs', (req, res) => {
  // TODO: Add code to retrieve and send data
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
