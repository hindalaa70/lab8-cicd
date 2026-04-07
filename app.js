const express = require('express');
const { Pool } = require('pg');
const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

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

app.listen(3000, () => console.log('Server running on port 3000'));
