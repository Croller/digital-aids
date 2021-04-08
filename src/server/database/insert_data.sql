INSERT INTO data_roles (name, create_restaurant, update_restaurant, delete_restaurant, create_user, update_user, delete_user) VALUES
  ('admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('owner', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
  ('employees', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('user', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('guest', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, roles, restaurants) VALUES 
('rootAdmin', 'dcfoodfans2021', 'Admin', 'DC', 'root', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{1}', '{"9cff0e3a-97b4-11eb-ab14-fa163ecfa01f"}');

INSERT INTO data_restaurants (id, name) VALUES 
('9cff0e3a-97b4-11eb-ab14-fa163ecfa01f', 'test');




SELECT * FROM data_roles;
SELECT * FROM data_users;
SELECT * FROM data_restaurants;

