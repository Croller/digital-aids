TRUNCATE data_users RESTART IDENTITY CASCADE;

INSERT INTO data_users (login, password, surname, name, middlename, birthdate, phone, email, roles) VALUES 
('rootAdmin', 'rootAids2021', 'Admin', 'DC', 'root', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{1, 2, 3, 4}'),
('owner', 'ownerAids2021Test', 'owner', 'ow', 'ner', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{2, 3, 4}'),
('employees', 'employeesAids2021Test', 'employees', 'employ', 'emplo', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{3, 4}'),
('user', 'userAids2021Test', 'user', 'user', 'user', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{4}'),
('guest', 'guestAids2021Test', 'guest', 'guest', 'guest', '2020-10-28T10:01:11.258', '{74950000000, 74950000000}', '{"ya@ya.ru", "ya@ya.ru"}', '{5}');

SELECT * FROM data_users;


INSERT INTO data_users_test (login, password, surname, name, middlename, birthdate, phone, email, is_confirmed) VALUES 
('rootAdmin', 'rootAids2021', 'Root', 'R', 'R', '1987-12-21T00:00:00.000', '{79104643015}', '{"79104643015@yandex.ru", "nightcroller@yandex.ru"}', TRUE),
('root_backAdmin', 'root_back_back_DigitalAids2021', 'Root Back', 'R', 'R', '1987-12-21T00:00:00.000', NUll, NULL, TRUE),
('owner', 'owner_DigitalAids2021Test', 'Owner', 'O', 'O', NULL, NULL, NULL, TRUE),
('owner_back', 'owner_back_DigitalAids2021Test', 'Owner Back', 'O', 'O', NULL, NULL, NULL, TRUE),
('manager', 'manager_DigitalAids2021Test', 'Manager', 'M', 'M', NULL, NULL, NULL, TRUE),
('manager_back', 'manager_back_DigitalAids2021Test', 'Manager Back', 'M', 'M', NULL, NULL, NULL, TRUE),
('employee', 'employee_DigitalAids2021Test', 'Employee', 'E', 'E', NULL, NULL, NULL, TRUE),
('guest', 'guest_DigitalAids2021Test', 'Guest', 'G', 'G', NULL, NULL, NULL, TRUE);

with _insert as 
(
  INSERT INTO dictionary_roles_test (name, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET roles=(select id from _insert)
where login = 'rootAdmin';


with _insert as 
(
  INSERT INTO dictionary_roles_test (name, root, root_back, owner, owner_back, manager, manager_back, employee, guest) VALUES 
    ('Root Back', FALSE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE)
    RETURNING id
)
UPDATE data_users_test 
    SET roles=(select id from _insert)
where login = 'root_backAdmin';

