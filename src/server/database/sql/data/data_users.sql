-- INSERT INTO data_restaurants (key, name) VALUES
-- ('example', 'Example');

-- TRUNCATE data_users RESTART IDENTITY CASCADE;

INSERT INTO data_users_test (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{79104643015}', '79104643015@yandex.ru', TRUE),
('root_backAdmin', 'root_back_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, NULL, TRUE),
('owner', 'owner_DigitalAids2021Test', 'Owner', 'O', 'O', NULL, NULL, NULL, TRUE),
('owner_back', 'owner_back_DigitalAids2021Test', 'Owner Back', 'O', 'O', NULL, NULL, NULL, TRUE),
('manager', 'manager_DigitalAids2021Test', 'Manager', 'M', 'M', NULL, NULL, NULL, TRUE),
('manager_back', 'manager_back_DigitalAids2021Test', 'Manager Back', 'M', 'M', NULL, NULL, NULL, TRUE),
('employee', 'employee_DigitalAids2021Test', 'Employee', 'E', 'E', NULL, NULL, NULL, TRUE),
('guest', 'guest_DigitalAids2021Test', 'Guest', 'G', 'G', NULL, NULL, NULL, TRUE);

with _insert as 
(
  INSERT INTO data_roles_test (name, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET roles=ARRAY[(select id from _insert)]
where login = 'rootAdmin';

with _insert as 
(
  INSERT INTO data_roles_test (name, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Admin Back', FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET roles=ARRAY[(select id from _insert)]
where login = 'root_backAdmin';

with _role_current as 
(
  INSERT INTO data_roles_test (name, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Guest', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET roles=ARRAY[(select id from _role_current)]
where login = 'guest';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles_test WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles_test (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Owner', (select id from _restaurant), FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
  SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'owner';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles_test WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles_test (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Owner Back', (select id from _restaurant), FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'owner_back';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles_test WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles_test (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Manager', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'manager';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles_test WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles_test (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Manager Back', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'manager_back';

with _restaurant as 
(
  SELECT * FROM data_restaurants WHERE key='example'
)
, _role_guest as 
(
  SELECT * FROM data_roles_test WHERE name='Guest'
)
, _role_current as 
(
  INSERT INTO data_roles_test (name, restaurant, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Employee', (select id from _restaurant), FALSE, FALSE, FALSE, FALSE, FALSE, FALSE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET
    roles=ARRAY[(select id from _role_guest), (select id from _role_current)]
where login = 'employee';

-- SELECT * FROM data_restaurants;
SELECT * FROM data_users_test;
SELECT * FROM data_roles_test;