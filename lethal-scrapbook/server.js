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

// Endpoint to add a new game
app.post('/games', async (req, res) => {
  try {
    const { startDate, finalQuota } = req.body;
    const result = await pool.query(
      'INSERT INTO Games (StartDate, FinalQuota) VALUES ($1, $2) RETURNING *',
      [startDate, finalQuota]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new moon
app.post('/moons', async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      'INSERT INTO Moons (Name) VALUES ($1) RETURNING *',
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new facility
app.post('/facilities', async (req, res) => {
  try {
    const { moonId } = req.body;
    const result = await pool.query(
      'INSERT INTO Facilities (MoonID) VALUES ($1) RETURNING *',
      [moonId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new entrance
app.post('/entrances', async (req, res) => {
  try {
    const { facilityId, type } = req.body;
    const result = await pool.query(
      'INSERT INTO Entrances (FacilityID, Type) VALUES ($1, $2) RETURNING *',
      [facilityId, type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to add a new strategy
app.post('/strategies', async (req, res) => {
  try {
    const { description } = req.body;
    const result = await pool.query(
      'INSERT INTO Strategies (Description) VALUES ($1) RETURNING *',
      [description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/runs', (req, res) => {
  app.post('/runs', async (req, res) => {
  try {
    const { gameId, moonId, day, strategies, crewFatalities, survived, scrapCollected, entrancesUsed } = req.body;
    const result = await pool.query(
      'INSERT INTO Runs (GameID, MoonID, Day, Strategies, CrewFatalities, Survived, ScrapCollected, EntrancesUsed) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [gameId, moonId, day, strategies, crewFatalities, survived, scrapCollected, entrancesUsed]
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
