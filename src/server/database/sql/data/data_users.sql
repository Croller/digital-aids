DROP TABLE IF EXISTS data_users;
DROP TABLE IF EXISTS data_roles;

-- INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
--   ('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{79104643015}', '79104643015@yandex.ru', TRUE),
--   ('root_backAdmin', 'root_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, NULL, TRUE),
--   ('owner_test', 'owner_DigitalAids2021Test', 'Owner', 'O', 'O', NULL, NULL, NULL, TRUE),
--   ('owner_back_test', 'owner_back_DigitalAids2021Test', 'Owner Back', 'O', 'O', NULL, NULL, NULL, TRUE),
--   ('manager_test', 'manager_DigitalAids2021Test', 'Manager', 'M', 'M', NULL, NULL, NULL, TRUE),
--   ('manager_back_test', 'manager_back_DigitalAids2021Test', 'Manager Back', 'M', 'M', NULL, NULL, NULL, TRUE),
--   ('employee_test', 'employee_DigitalAids2021Test', 'Employee', 'E', 'E', NULL, NULL, NULL, TRUE),
--   ('user_test', 'user_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, NULL, TRUE);
--   ('guest', 'guest_DigitalAids2021Test', 'Guest', 'G', 'G', NULL, NULL, NULL, TRUE);

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{79104643015}', '79104643015@yandex.ru', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, parts) VALUES 
((select id from _user), '{"root", "owner", "manager", "employee", "account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('root_backAdmin', 'root_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, parts) VALUES 
((select id from _user), '{"root", "owner", "manager", "employee", "account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('user_test', 'user_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, parts) VALUES 
((select id from _user), '{"account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('guest', 'guest_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, parts) VALUES 
((select id from _user), '{"guest"}')
RETURNING id;

SELECT * FROM data_users;
SELECT * FROM data_roles;