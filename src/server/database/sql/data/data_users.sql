TRUNCATE data_users RESTART IDENTITY CASCADE;

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, roles) VALUES 
('rootAdmin', 'rootAids2021', 'Admin', 'DC', 'root', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{1, 2, 3, 4}'),
('owner', 'ownerAids2021Test', 'owner', 'ow', 'ner', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{2, 3, 4}'),
('employees', 'employeesAids2021Test', 'employees', 'employ', 'emplo', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{3, 4}'),
('user', 'userAids2021Test', 'user', 'user', 'user', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{4}'),
('guest', 'guestAids2021Test', 'guest', 'guest', 'guest', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{5}');

SELECT * FROM data_users;