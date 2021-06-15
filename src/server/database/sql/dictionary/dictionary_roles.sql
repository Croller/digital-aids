TRUNCATE dictionary_roles RESTART IDENTITY CASCADE;

INSERT INTO dictionary_roles (name, root, create_restaurant, update_restaurant, delete_restaurant, create_user, update_user, delete_user) VALUES
  ('admin', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE),
  ('owner', FALSE, TRUE, TRUE, TRUE, FALSE, TRUE, FALSE),
  ('staff', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
  ('user', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE),
  ('guest', FALSE, FALSE, FALSE, FALSE, TRUE, TRUE, TRUE);

SELECT * FROM dictionary_roles;


-- point: 
-- position: 
-- root: 
-- create_point: 
-- update_point: 
-- delete_point: 
-- view_point: 
-- create_user: 
-- update_user: 
-- delete_user: 
-- view_user: 
-- create_task: 
-- update_task: 
-- delete_task: 
-- view_task: 
-- create_report: 
-- update_report: 
-- delete_report: 
-- view_report: 