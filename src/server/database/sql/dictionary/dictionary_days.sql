TRUNCATE dictionary_days RESTART IDENTITY CASCADE;

INSERT INTO dictionary_days (id, name) VALUES
  ('mon', 'Mon'),
  ('tue', 'Tue'),
  ('wed', 'Wed'),
  ('thu', 'Thu'),
  ('fri', 'Fri'),
  ('sat', 'Sat'),
  ('sun', 'Sun');

SELECT * FROM dictionary_days;
