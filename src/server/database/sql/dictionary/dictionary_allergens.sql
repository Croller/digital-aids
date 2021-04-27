TRUNCATE dictionary_allergens RESTART IDENTITY CASCADE;

INSERT INTO dictionary_allergens (id, name) VALUES
  ('gluten', 'Gluten'),
  ('sesame', 'Sesame'),
  ('nuts', 'Nuts'),
  ('crustaceans', 'Crustacean'),
  ('eggs', 'Eggs'),
  ('fish', 'Fish'),
  ('mustard', 'Mustard'),
  ('dairy', 'Dairy products'),
  ('celery', 'Celery'),
  ('peanuts', 'Peanuts'),
  ('soya', 'Soya'),
  ('mollusks', 'Sea Mollusks'),
  ('lupins', 'Lupins'),
  ('diox', 'Diox, sulfur and sulfites');

SELECT * FROM dictionary_allergens;
