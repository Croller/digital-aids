DROP TABLE IF EXISTS data_restaurants;
DROP TABLE IF EXISTS data_users;
DROP TABLE IF EXISTS data_roles;

with _restaurant as 
(
  INSERT INTO data_restaurants (key, name, address, email, phone, currency, cuisine, employees, avg_price, languages, geojson) VALUES
  ('test', 'test', 'Tverskaya St, 1, Moskva, Russia, 125009', '{"79104643015@yandex.ru"}',
    '{"+7 (910) 464-30-15"}', '{"RUB"}', '{"Russian", "Europe"}', '{"Alexander"}', 1200, '{"ru", "en"}',
    '{"type":"Feature","geometry":{"type":"Point","coordinates":[55.6718704,37.724959]},"properties":{}}'::jsonb
  ) RETURNING id
);

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{79104643015}', '79104643015@yandex.ru', TRUE),
  ('root_backAdmin', 'root_back_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, NULL, TRUE),
  ('owner_test', 'owner_DigitalAids2021Test', 'Owner', 'O', 'O', NULL, NULL, NULL, TRUE),
  ('owner_back_test', 'owner_back_DigitalAids2021Test', 'Owner Back', 'O', 'O', NULL, NULL, NULL, TRUE),
  ('manager_test', 'manager_DigitalAids2021Test', 'Manager', 'M', 'M', NULL, NULL, NULL, TRUE),
  ('manager_back_test', 'manager_back_DigitalAids2021Test', 'Manager Back', 'M', 'M', NULL, NULL, NULL, TRUE),
  ('employee_test', 'employee_DigitalAids2021Test', 'Employee', 'E', 'E', NULL, NULL, NULL, TRUE),
  ('user_test', 'user_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, NULL, TRUE);
  ('guest', 'guest_DigitalAids2021Test', 'Guest', 'G', 'G', NULL, NULL, NULL, TRUE);

with _role_current as 
(
  INSERT INTO data_roles (name, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET roles=ARRAY[(select id from _role_current)]
where login = 'rootAdmin';

with _role_current as 
(
  INSERT INTO data_roles (name, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Admin Back', FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET roles=ARRAY[(select id from _role_current)]
where login = 'root_backAdmin';

with _role_current as 
(
  INSERT INTO data_roles (name, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Guest', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE ,TRUE)
    RETURNING id
)
UPDATE data_users 
    SET roles=ARRAY[(select id from _role_current)]
where login = 'guest';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Owner', (select id from _restaurant), FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
  SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'owner';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Owner Back', (select id from _restaurant), FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'owner_back';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Manager', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'manager';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Manager Back', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'manager_back';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, user, guest) VALUES 
    ('Employee', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'employee';

SELECT * FROM data_restaurants;
SELECT * FROM data_users;
SELECT * FROM data_roles;