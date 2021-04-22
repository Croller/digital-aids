TRUNCATE dictionary_units RESTART IDENTITY CASCADE;

INSERT INTO dictionary_units (id, name) VALUES
  ('pc', 'piece'),
  ('kg', 'kg'),
  ('pr', 'portion'),
  ('gr', 'gr'),
  ('kg', 'kg'),
  ('l', 'liter');

SELECT * FROM dictionary_units;
