TRUNCATE dictionary_order_status RESTART IDENTITY CASCADE;

INSERT INTO dictionary_order_status (id, name) VALUES
  ('waiting', 'waiting'),
  ('cooking', 'cooking'),
  ('delivery', 'delivery'),
  ('payment', 'payment'),
  ('paid', 'paid'),
  ('canceled', 'canceled');

SELECT * FROM dictionary_order_status;

TRUNCATE dictionary_order_status_translate RESTART IDENTITY CASCADE;

INSERT INTO dictionary_order_status_translate (id, language, name) VALUES
  ('waiting', 'ru', 'Ожидание'),
  ('cooking', 'ru', 'Приготовление'),
  ('delivery', 'ru', 'Доставка'),
  ('payment', 'ru', 'Оплата'),
  ('paid', 'ru', 'Оплачен'),
  ('canceled', 'ru', 'Отменен');

SELECT * FROM dictionary_order_status_translate;
