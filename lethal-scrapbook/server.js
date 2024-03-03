const express = require('express');
const { Pool } = require('pg');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Lethal Company Game API',
    version: '1.0.0',
    description: 'API for tracking data on games played of Lethal Company',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local server',
    },
  ],
};
const options = { swaggerDefinition, apis: ['./server.js'] };
const swaggerSpec = swaggerJSDoc(options);
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Endpoint to add a new game
/**
 * /games:
 *   post:
 *     summary: Create a new game
 *     description: Endpoint to add a new game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - startDate
 *               - finalQuota
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the game
 *               finalQuota:
 *                 type: integer
 *                 description: Final quota of the game
 *     responses:
 *       201:
 *         description: Game created successfully
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /moons:
 *   post:
 *     summary: Create a new moon
 *     description: Endpoint to add a new moon
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the moon
 *     responses:
 *       201:
 *         description: Moon created successfully
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /facilities:
 *   post:
 *     summary: Create a new facility
 *     description: Endpoint to add a new facility
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - moonId
 *             properties:
 *               moonId:
 *                 type: integer
 *                 description: ID of the moon where the facility is located
 *     responses:
 *       201:
 *         description: Facility created successfully
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /entrances:
 *   post:
 *     summary: Create a new entrance
 *     description: Endpoint to add a new entrance
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - facilityId
 *               - type
 *             properties:
 *               facilityId:
 *                 type: integer
 *                 description: ID of the facility where the entrance is located
 *               type:
 *                 type: string
 *                 description: Type of the entrance
 *     responses:
 *       201:
 *         description: Entrance created successfully
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /strategies:
 *   post:
 *     summary: Create a new strategy
 *     description: Endpoint to add a new strategy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - description
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the strategy
 *     responses:
 *       201:
 *         description: Strategy created successfully
 *       500:
 *         description: Internal server error
 */
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

// Endpoint for mod to send game updates
app.post('/mod/games', async (req, res) => {
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

// Endpoint for mod to send moon updates
app.post('/mod/moons', async (req, res) => {
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

// Endpoint for mod to send facility updates
app.post('/mod/facilities', async (req, res) => {
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

// Endpoint for mod to send entrance updates
app.post('/mod/entrances', async (req, res) => {
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

// Endpoint for mod to send strategy updates
app.post('/mod/strategies', async (req, res) => {
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

// Endpoint for mod to send run updates
app.post('/mod/runs', async (req, res) => {
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
app.get('/game-logging.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game-logging.html'));
});

// Additional routes for handling form submissions and data fetching for the game logging page
