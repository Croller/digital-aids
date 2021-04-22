TRUNCATE dictionary_allergens RESTART IDENTITY CASCADE;

INSERT INTO dictionary_allergens (id, name) VALUES
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

SELECT * FROM dictionary_allergens;
