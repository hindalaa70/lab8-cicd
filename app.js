const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

// Wait for DB to be ready, then start
async function startServer() {
  let retries = 10;
  while (retries > 0) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to PostgreSQL');
      break;
    } catch (err) {
      retries--;
      console.log(`DB not ready, retrying... (${retries} left)`);
      await new Promise(r => setTimeout(r, 3000));
    }
  }

  app.get('/tasks', async (req, res) => {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  });

  app.post('/tasks', async (req, res) => {
    const { name, status } = req.body;
    const result = await pool.query(
      'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *',
      [name, status]
    );
    res.json(result.rows[0]);
  });

  app.listen(3000, () => console.log('App running on port 3000'));
}

startServer();