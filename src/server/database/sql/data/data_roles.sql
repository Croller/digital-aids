TRUNCATE data_roles RESTART IDENTITY CASCADE;

INSERT INTO data_roles (name, create_restaurant, update_restaurant, delete_restaurant, create_user, update_user, delete_user) VALUES
  ('admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('owner', TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
  ('employees', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('user', FALSE, FALSE, FALSE, FALSE, TRUE, FALSE),
  ('guest', FALSE, FALSE, FALSE, FALSE, FALSE, FALSE);

SELECT * FROM data_roles;