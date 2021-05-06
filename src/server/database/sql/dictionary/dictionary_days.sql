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
  ('mon', 'es', 'Lun'),
  ('tue', 'es', 'Mar'),
  ('wed', 'es', 'Mer'),
  ('thu', 'es', 'Gio'),
  ('fri', 'es', 'Ven'),
  ('sat', 'es', 'Sab'),
  ('sun', 'es', 'Do'),
  ('mon', 'es', 'Mon'),
  ('tue', 'es', 'Die'),
  ('wed', 'es', 'Mit'),
  ('thu', 'es', 'Don'),
  ('fri', 'es', 'Fre'),
  ('sat', 'es', 'Sam'),
  ('sun', 'es', 'So'),
  ('mon', 'es', 'Lun'),
  ('tue', 'es', 'Mar'),
  ('wed', 'es', 'Mer'),
  ('thu', 'es', 'Jeu'),
  ('fri', 'es', 'Ven'),
  ('sat', 'es', 'Sam'),
  ('sun', 'es', 'Di'),
  ('mon', 'es', 'Man'),
  ('tue', 'es', 'Tir'),
  ('wed', 'es', 'Ons'),
  ('thu', 'es', 'Tor'),
  ('fri', 'es', 'Fre'),
  ('sat', 'es', 'Lør'),
  ('sun', 'es', 'Sø'),
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

SELECT * FROM dictionary_days_translate;
