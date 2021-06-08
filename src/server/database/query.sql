-- DROP TABLE IF EXISTS data_users;
-- DROP TABLE IF EXISTS data_restaurants;

-- DROP TABLE IF EXISTS data_categories;
-- DROP TABLE IF EXISTS data_dishes;

-- DROP TABLE IF EXISTS data_categories_translate;
-- DROP TABLE IF EXISTS data_dishes_translate;

-- DROP TABLE IF EXISTS dictionary_roles;
-- DROP TABLE IF EXISTS dictionary_currency;
-- DROP TABLE IF EXISTS dictionary_currency_translate;
-- DROP TABLE IF EXISTS dictionary_languages;
-- DROP TABLE IF EXISTS dictionary_languages_translate;
-- DROP TABLE IF EXISTS dictionary_allergens;
-- DROP TABLE IF EXISTS dictionary_allergens_translate;
-- DROP TABLE IF EXISTS dictionary_units;
-- DROP TABLE IF EXISTS dictionary_units_translate;
-- DROP TABLE IF EXISTS dictionary_days;
-- DROP TABLE IF EXISTS dictionary_days_translate;
-- DROP TABLE IF EXISTS data_reserve;
-- DROP TABLE IF EXISTS data_opinions;
-- DROP TABLE IF EXISTS data_orders;
-- DROP TABLE IF EXISTS data_notify;






-------------------------- TEMP QUERY --------------------------



-- ALTER TABLE data_restaurants RENAME opinion TO description;
-- ALTER TABLE data_restaurants ADD COLUMN number serial;
-- ALTER TABLE data_restaurants ADD is_publish BOOLEAN DEFAULT FALSE;



-- TRUNCATE data_roles RESTART IDENTITY CASCADE;
-- TRUNCATE data_users RESTART IDENTITY CASCADE;
-- TRUNCATE data_restaurants RESTART IDENTITY CASCADE;
-- TRUNCATE data_socials RESTART IDENTITY CASCADE;
-- TRUNCATE data_at_work RESTART IDENTITY CASCADE;

-- SELECT * FROM data_users;
-- SELECT * FROM data_restaurants;
-- SELECT * FROM data_socials;
-- SELECT * FROM data_at_work;
-- SELECT * FROM dictionary_currency;
-- SELECT * FROM dictionary_languages;


-- INSERT INTO data_users (login, password, role, enter_at) VALUES ('view', 'view', '2', '2020-10-28T10:01:11.258')
-- SELECT * FROM data_users;

-- create extension postgis;

-- ALTER TABLE data_krt_monitoring ADD COLUMN project int;
-- SELECT * FROM data_krt;

-- alter user yfhryprmlffmvs superuser
-- select usesuper from pg_user where usename = 'yfhryprmlffmvs';

-- UPDATE pg_user SET usesuper = TRUE WHERE usename = 'yfhryprmlffmvs';

-- DROP TABLE users
-- DROP SCHEMA CASCADE;

-- TRUNCATE dictionary_district RESTART IDENTITY

-- ALTER TABLE users ADD COLUMN enter_at int;
-- ALTER TABLE data_users ALTER COLUMN phone TYPE BIGINT
-- ALTER TABLE data_krt_confirm RENAME disctrict TO district;
-- ALTER TABLE dictionary_dictionary_translate RENAME TO dictionary_translate;
-- ALTER TABLE my_table ADD COLUMN the_geom_mercator geometry(Geometry,3857);
-- ALTER TABLE data_krt DROP COLUMN IF EXISTS geom;

-- alter table presales alter column code type numeric(10,0) using cast(code as numeric);

-- INSERT INTO users (login, password, name, email)
-- VALUES ('admin', '123456789','admin', '79104643015@yandex.ru');

-- INSERT INTO users (enter_at)
-- VALUES (CURRENT_TIMESTAMP);

-- UPDATE triptrick.users SET enter_at = CURRENT_TIMESTAMP WHERE id = 1;

-- DELETE FROM triptrick.users WHERE id = 2;

-- INSERT INTO "Parcels"("Name", the_geom)
--     VALUES ('Corrected_Shape', 
--     ST_TRANSFORM(ST_GeomFromGeoJSON('{
--     "type":"Polygon",
--     "coordinates":[[
--         [-91.23046875,45.460130637921],
--         [-79.8046875,49.837982453085],
--         [-69.08203125,43.452918893555],
--         [-88.2421875,32.694865977875],
--         [-91.23046875,45.460130637921]
--     ]],
--     "crs":{"type":"name","properties":{"name":"EPSG:4326"}}
-- }'),3857));

-- SELECT ST_AsText(ST_Transform(ST_GeomFromGeoJSON
--     (
--         {
--             "type":"Polygon",
--             "coordinates":[
--                 [7.734375,51.835777520452],
--                 [3.8671875,48.341646172375],
--                 [7.20703125,43.580390855608],
--                 [18.6328125,43.834526782237],
--                 [17.9296875,50.289339253292],
--                 [13.7109375,54.059387886624],
--                 [7.734375,51.835777520452]
--             ]
--         }
--     ),4326),3857));




-- TRUNCATE description_data_monitoring CASCADE;
-- TRUNCATE dictionary RESTART IDENTITY;

-- COPY description_data_monitoring(key, name, type, required, edit, system)
-- FROM '/var/opt/app/src/server/database/csv/description_data_monitoring.csv'
-- DELIMITER ';'
-- CSV HEADER;

-- SELECT * FROM description_data_monitoring;

-- ALTER TABLE data_monitoring ADD COLUMN monitoring_group_order int;
-- ALTER TABLE data_monitoring ADD COLUMN project_start timestamp with time zone;
-- ALTER TABLE data_monitoring ADD COLUMN project_end timestamp with time zone;

-- SELECT * FROM data_monitoring;

-- TRUNCATE description_data_krt RESTART IDENTITY;

-- COPY description_data_krt(key, name, type, required, edit, system)
-- FROM '/var/opt/app/src/server/database/csv/description_data_krt.csv'
-- DELIMITER ';'
-- CSV HEADER;

-- SELECT * FROM description_data_krt;

-- DROP TABLE data_krt;

-- CREATE TABLE data_krt (
--   id serial primary key,
--   name varchar,
--   proiz_zone varchar,
--   prom_zone varchar,
--   pzz int,
--   vri text[],
--   area float,
--   area_build float,
--   area_build_residential float,
--   area_build_residential_etc text[],
--   area_build_industrial float,
--   area_build_industrial_etc text[],
--   area_build_public float,
--   area_build_public_etc text[],
--   budget_effect float,
--   budget_invest float,
--   work_places int,
--   work_places_growth int,
--   population int,
--   population_growth int,
--   cadaster_number varchar,
--   address varchar,
--   region varchar,
--   district int,
--   kurt int,
--   geom_string varchar,
--   is_deleted boolean default false
-- );

-- COPY data_krt(name, district)
-- FROM '/var/opt/app/src/server/database/csv/data_krt.csv'
-- DELIMITER ';'
-- CSV HEADER;

-- SELECT * FROM data_krt;