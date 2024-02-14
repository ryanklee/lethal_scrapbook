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
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/runs', (req, res) => {
  app.post('/runs', async (req, res) => {
  try {
    const { gameId, moonId, date, scrapCollected, quotaAtTimeOfRun, crewFatalities } = req.body;
    const result = await pool.query(
      'INSERT INTO Runs (GameID, MoonID, Date, ScrapCollected, QuotaAtTimeOfRun, CrewFatalities) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [gameId, moonId, date, scrapCollected, quotaAtTimeOfRun, crewFatalities]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
});

app.get('/runs', (req, res) => {
  app.get('/runs', async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 50;
    const offset = (page - 1) * limit;
    const result = await pool.query(
      'SELECT * FROM Runs ORDER BY RunID LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
