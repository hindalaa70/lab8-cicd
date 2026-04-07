CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  status TEXT NOT NULL
);

INSERT INTO tasks (name, status) VALUES
  ('Buy groceries', 'pending'),
  ('Read book', 'completed'),
  ('Exercise', 'pending'),
  ('Cook dinner', 'pending'),
  ('Call mom', 'completed'),
  ('Clean house', 'pending'),
  ('Tea', 'pending');
  