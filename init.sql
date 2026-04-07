CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL
);

INSERT INTO tasks (name, status) VALUES
  ('Buy groceries', 'pending'),
  ('Read a book', 'completed'),
  ('Go for a run', 'pending'),
  ('Write report', 'in-progress'),
  ('Call dentist', 'pending'),
  ('Fix bike', 'completed')
ON CONFLICT DO NOTHING;