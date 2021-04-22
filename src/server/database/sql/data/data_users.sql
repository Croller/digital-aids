TRUNCATE data_users RESTART IDENTITY CASCADE;

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, roles) VALUES 
('rootAdmin', 'dcfoodfans2021', 'Admin', 'DC', 'root', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{1, 2, 3, 4, 5}'),
('owner', 'owner2021Test', 'owner', 'ow', 'ner', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{2, 3, 4, 5}'),
('employees', 'employees2021Test', 'employees', 'employ', 'emplo', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{3, 4, 5}'),
('user', 'user2021Test', 'user', 'user', 'user', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{4, 5}'),
('guest', 'guest2021Test', 'guest', 'guest', 'guest', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{5}');

SELECT * FROM data_users;