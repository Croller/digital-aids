INSERT INTO data_roles (name, create_restaurant, update_restaurant, delete_restaurant, create_user, update_user, delete_user) VALUES
  ('admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('owner', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
  ('employees', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('user', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('guest', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, roles, restaurants) VALUES ('rootAdmin', 'dcfoodfans2021', 'Admin', 'DC', 'root', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{1}', '{1}');

INSERT INTO data_restaurants (name) VALUES ('test');

INSERT INTO data_socials (fork) VALUES (NULL);

INSERT INTO data_work_time (mon) VALUES ('{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}');



SELECT * FROM data_roles;
SELECT * FROM data_users;
SELECT * FROM data_restaurants;
SELECT * FROM data_socials;
SELECT * FROM data_work_time;
