TRUNCATE dictionary_type_categories RESTART IDENTITY CASCADE;

INSERT INTO dictionary_type_categories (id, name, options) VALUES
  ('main', 'Main Menu', '{"fieldsProtected": ["is_archived", "is_deleted"]}'),
  ('daily', 'Daily Menu', '{"daily": {"price": "0.00", "info": "NULL", "descriptions": "NULL","at_work": {"mon":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000","2020-01-01T00:00:00.000"]} }}'),
  ('alcohol', 'Alcohol', '{"checkAge": true}'),
  ('drink', 'Drinks', '{}'),
  ('food', 'Foods', '{}'),
  ('organicWine', 'Organic Wine', '{"fields": ["info"]}'),
  ('foodtips', 'Foodtips', '{"fieldsProtected": ["name", "type_categories"], "rules": {"length": "5"} }'),
  ('specialDeals', 'Special deals', '{"fieldsProtected": ["name", "type_categories"], "rules": {"length": "1"} }');

SELECT * FROM dictionary_type_categories;
