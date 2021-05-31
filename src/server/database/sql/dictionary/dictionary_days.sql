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

INSERT INTO dictionary_days_translate (id, language, name) VALUES
  ('mon', 'es', 'Lun'),
  ('tue', 'es', 'Mar'),
  ('wed', 'es', 'Mie'),
  ('thu', 'es', 'Jue'),
  ('fri', 'es', 'Vie'),
  ('sat', 'es', 'Sab'),
  ('sun', 'es', 'Do'),
  -- el
  -- -
  ('mon', 'it', 'Lun'),
  ('tue', 'it', 'Mar'),
  ('wed', 'it', 'Mer'),
  ('thu', 'it', 'Gio'),
  ('fri', 'it', 'Ven'),
  ('sat', 'it', 'Sab'),
  ('sun', 'it', 'Do'),

  ('mon', 'de', 'Mon'),
  ('tue', 'de', 'Die'),
  ('wed', 'de', 'Mit'),
  ('thu', 'de', 'Don'),
  ('fri', 'de', 'Fre'),
  ('sat', 'de', 'Sam'),
  ('sun', 'de', 'So'),

  ('mon', 'fr', 'Lun'),
  ('tue', 'fr', 'Mar'),
  ('wed', 'fr', 'Mer'),
  ('thu', 'fr', 'Jeu'),
  ('fri', 'fr', 'Ven'),
  ('sat', 'fr', 'Sam'),
  ('sun', 'fr', 'Di'),

  ('mon', 'no', 'Man'),
  ('tue', 'no', 'Tir'),
  ('wed', 'no', 'Ons'),
  ('thu', 'no', 'Tor'),
  ('fri', 'no', 'Fre'),
  ('sat', 'no', 'Lør'),
  ('sun', 'no', 'Sø'),
  -- ja
  -- -
  -- ko
  -- -
  ('mon', 'es', 'Пн'),
  ('tue', 'es', 'Вт'),
  ('wed', 'es', 'Ср'),
  ('thu', 'es', 'Чт'),
  ('fri', 'es', 'Пт'),
  ('sat', 'es', 'Сб'),
  ('sun', 'es', 'Вс');
  -- zh
  -- -

SELECT * FROM dictionary_days_translate;
