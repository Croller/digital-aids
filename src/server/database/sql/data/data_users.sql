with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{89104643015}', '79104643015@yandex.ru', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, access) VALUES 
((select id from _user), '{"root", "owner", "manager", "employee", "account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('root_backAdmin', 'root_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, access) VALUES 
((select id from _user), '{"root", "owner", "manager", "employee", "account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('user_test', 'user_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, access) VALUES 
((select id from _user), '{"account", "guest"}')
RETURNING id;

with _user as 
(
  INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
  ('guest', 'guest_DigitalAids2021Test', 'User', 'U', 'U', NULL, NULL, '@.com', TRUE)
  RETURNING id
)
INSERT INTO data_roles (user_id, access) VALUES 
((select id from _user), '{"guest"}')
RETURNING id;

SELECT * FROM data_users;
SELECT * FROM data_roles;