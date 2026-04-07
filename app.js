const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function connectWithRetry(retries = 10, delay = 3000) {
  for (let i = retries; i > 0; i--) {
    try {
      await pool.query('SELECT 1');
      console.log('Connected to database successfully');
      return;
    } catch (err) {
      console.log(`DB not ready, retrying... (${i - 1} left)`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  console.error('Could not connect to database after all retries. Exiting.');
  process.exit(1);
}

app.get('/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const { name, status } = req.body;
    const { rows } = await pool.query(
      'INSERT INTO tasks (name, status) VALUES ($1, $2) RETURNING *',
      [name, status]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

connectWithRetry().then(() => {
  app.listen(3000, () => console.log('App running on port 3000'));
});
