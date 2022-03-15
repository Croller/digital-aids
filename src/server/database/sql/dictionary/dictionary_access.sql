TRUNCATE dictionary_access RESTART IDENTITY CASCADE;

INSERT INTO dictionary_access (id, name) VALUES
  ('root', 'Root'),
  ('owner', 'Owner'),
  ('manager', 'Manager'),
  ('employee', 'Employee'),
  ('account', 'Account'),
  ('guest', 'Guest');

SELECT * FROM dictionary_access;

-- TRUNCATE dictionary_access_translate RESTART IDENTITY CASCADE;

-- INSERT INTO dictionary_access_translate (id, language, name) VALUES;

-- SELECT * FROM dictionary_access_translate;
