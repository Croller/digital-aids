TRUNCATE dictionary_units RESTART IDENTITY CASCADE;

INSERT INTO dictionary_units (id, parent, name) VALUES
  ('gluten', 'Gluten'),
  ('sesame', 'Sesame'),
  ('nuts', 'Nuts'),
  ('crustacean', 'Crustacean'),
  ('eggs', 'Eggs'),
  ('fish', 'Fish'),
  ('mustard', 'Mustard'),
  ('dairy', 'Dairy products'),
  ('celery', 'Celery'),
  ('peanuts', 'Peanuts'),
  ('soya', 'Soya'),
  ('shellfish', 'Sea Mollusks'),
  ('lupins', 'Lupins'),
  ('sulphite', 'Diox, sulfur and sulfites');

SELECT * FROM dictionary_units;
