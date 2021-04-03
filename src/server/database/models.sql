
-- CREATE SCHEMA "apr-postgres";
-- ALTER DATABASE "DigitalCarte" SET timezone TO 'Europe/Moscow';

-- CREATE TABLE data_users (
--   id serial primary key,
--   login varchar, -- REQUIRED
--   password varchar, -- REQUIRED
--   surname varchar DEFAULT null,
--   name varchar, -- REQUIRED
--   middlename varchar DEFAULT null,
--   birthdate timestamp with time zone DEFAULT null,
--   phone bigint array DEFAULT null,
--   email varchar array DEFAULT null,
--   roles int array DEFAULT null,
--   restaurant int ARRAY DEFAULT null,
--   enter_at timestamp with time zone NOT NULL DEFAULT NOW(),
--   is_deleted boolean default false
-- );

-- CREATE TABLE data_restaurant (
--   id serial primary key,
--   name VARCHAR, -- REQUIRED
--   address VARCHAR DEFAULT null,
--   email VARCHAR DEFAULT null,
--   opinion VARCHAR DEFAULT null,
--   phone INT ARRAY DEFAULT null,
--   currency INT DEFAULT null, -- DICTIONARY
--   cuisine VARCHAR ARRAY DEFAULT null,
--   contact jsonb DEFAULT null,
--   avg_price FLOAT DEFAULT 0,
--   lng_main INT DEFAULT 0, -- DICTIONARY
--   lng_support INT ARRAY DEFAULT '{41}', -- DICTIONARY
--   img_logo VARCHAR DEFAULT null,
--   img_photo VARCHAR ARRAY DEFAULT null,
--   social jsonb DEFAULT '{"fork": null, "tripadviser": null, "facebook": null, "instagram": null}',
--   work_time jsonb DEFAULT '{"mon": null, "tue": null, "wed": null, "thu": null, "fri": null, "sat": null, "sun": null}',
--   is_archived boolean default false,
--   is_deleted boolean default false
-- );

-- CREATE TABLE dictionary_currency (
--   id serial primary key,
--   name VARCHAR DEFAULT null,
--   fullname VARCHAR DEFAULT null,
--   description VARCHAR DEFAULT null,
--   symbol VARCHAR DEFAULT null
-- );

-- CREATE TABLE dictionary_language (
--   id serial primary key,
--   name VARCHAR DEFAULT null,
--   fullname VARCHAR DEFAULT null,
--   description VARCHAR DEFAULT null
-- );







-- CREATE TABLE description_data_users (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_roles (
--   id serial primary key,
--   name varchar,
--   description varchar
-- );

-- CREATE TABLE description_dictionary_roles (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- // --------------------------------------------------

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
  -- is_deleted boolean default false
--   type_zone number[],
-- );

-- CREATE TABLE description_data_krt (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean
-- );

-- CREATE TABLE data_monitoring (
--   id serial primary key,
--   krt int,
--   stage varchar,
--   stage_status varchar,
--   date_start timestamp with time zone,
--   date_end timestamp with time zone,
--   stage_next varchar,
--   date_next timestamp with time zone,
--   descriptions varchar,
--   responsible varchar,
--   monitoring_part int,
--   monitoring_group int,
--   monitoring_group_order int,
--   project_start timestamp with time zone,
--   project_end timestamp with time zone,
--   change_at timestamp with time zone NOT NULL DEFAULT NOW(),
--   is_finish boolean default false,
--   is_deleted boolean default false
-- );

-- CREATE TABLE description_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_district (
--   id serial primary key,
--   name varchar,
--   fullname varchar,
--   is_deleted boolean default false
-- );

-- CREATE TABLE description_district (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_monitoring_part_data_monitoring (
--   id serial primary key,
--   name varchar,
--   fullname varchar
--   is_deleted boolean default false
-- );

-- CREATE TABLE description_monitoring_part_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_monitoring_group_data_monitoring (
--   id serial primary key,
--   name varchar,
--   fullname varchar,
--   order_at int,
--   monitoring_part int,
--   is_deleted boolean default false
-- );

-- CREATE TABLE description_monitoring_group_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE description_tables (
--   id serial primary key,
--   key varchar,
--   name varchar,
--   system boolean,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_type_zone_krt (
--   id serial primary key,
--   name varchar,
--   description varchar,
--   is_deleted boolean default false
-- );

-- CREATE TABLE description_type_zone_krt (
--   key varchar,
--   name varchar,
--   type varchar,
--   required boolean,
--   edit boolean,
--   system boolean,
--   dictionary varchar
-- );
