
-- CREATE SCHEMA "apr-postgres";
-- ALTER DATABASE "DigitalCarte" SET timezone TO 'Europe/Moscow';

CREATE TABLE data_users (
  id uuid default uuid_generate_v1() primary key,
  login varchar DEFAULT null,
  password varchar DEFAULT null,
  surname varchar DEFAULT null,
  name varchar DEFAULT null,
  middlename varchar DEFAULT null,
  birthdate timestamp with time zone DEFAULT null,
  phone bigint array DEFAULT null,
  email varchar array DEFAULT null,
  language varchar DEFAULT 'en', -- DICTIONARY dictionary_language
  roles int array DEFAULT null, -- DICTIONARY data_roles
  restaurants varchar ARRAY DEFAULT null, -- DICTIONARY data_restaurant
  enter_at timestamp with time zone NOT NULL DEFAULT NOW(),
  meta jsonb DEFAULT '{"browser": null, "ip": null, "geo": null}',
  is_archived boolean DEFAULT FALSE,
  is_deleted boolean DEFAULT FALSE
);

CREATE TABLE data_roles (
  id serial primary key,
  name VARCHAR DEFAULT null,
  description VARCHAR DEFAULT null,
  create_restaurant BOOLEAN DEFAULT FALSE,
  update_restaurant BOOLEAN DEFAULT FALSE,
  delete_restaurant BOOLEAN DEFAULT FALSE,
  create_user BOOLEAN DEFAULT FALSE,
  update_user BOOLEAN DEFAULT FALSE,
  delete_user BOOLEAN DEFAULT FALSE
);

CREATE TABLE data_restaurants (
  id uuid default uuid_generate_v1() primary key,
  name VARCHAR DEFAULT null, -- REQUIRED
  translate VARCHAR DEFAULT null, -- REQUIRED
  address VARCHAR DEFAULT null,
  email VARCHAR ARRAY DEFAULT null,
  website VARCHAR DEFAULT null,
  opinion VARCHAR DEFAULT null,
  phone bigint ARRAY DEFAULT null,
  currency VARCHAR ARRAY DEFAULT '{"EUR"}', -- DICTIONARY dictionary_currency
  cuisine VARCHAR ARRAY DEFAULT null,
  employees VARCHAR ARRAY DEFAULT null, -- DICTIONARY data_users
  avg_price FLOAT DEFAULT 0,
  languages VARCHAR ARRAY DEFAULT '{null, "en"}', -- DICTIONARY dictionary_language
  images VARCHAR ARRAY DEFAULT null,
  socials jsonb DEFAULT '{"thefork":{"rate":null,"url":null},"tripadviser":{"rate":null,"url":null},"facebook":{"rate":null,"url":null},"instagram":{"rate":null,"url":null}}',
  work_time jsonb DEFAULT '{"mon":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000","2020-01-01T00:00:00.000"]}',
  is_archived boolean DEFAULT FALSE,
  is_deleted boolean DEFAULT FALSE
);

CREATE TABLE dictionary_currency (
  id VARCHAR DEFAULT null,
  name VARCHAR DEFAULT null,
  fullname VARCHAR DEFAULT null,
  description VARCHAR DEFAULT null,
  symbol VARCHAR DEFAULT null
);

CREATE TABLE dictionary_language (
  id VARCHAR DEFAULT null,
  name VARCHAR DEFAULT null,
  fullname VARCHAR DEFAULT null,
  description VARCHAR DEFAULT null
);



  categories
  offers INT ARRAY DEFAULT null, -- DICTIONARY data_offers
  foodtips INT ARRAY DEFAULT null, -- DICTIONARY data_foodtips
  opinions INT ARRAY DEFAULT null, -- DICTIONARY data_opinions



-- CREATE TABLE data_socials (
--   id serial primary key,
--   fork VARCHAR DEFAULT null,
--   tripadviser VARCHAR DEFAULT null,
--   facebook VARCHAR DEFAULT null,
--   instagram VARCHAR DEFAULT null
-- );

-- CREATE TABLE data_work_time (
--   id serial primary key,
--   mon timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   tue timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   wed timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   thu timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   fri timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sat timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sun timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000"}'
-- );

  -- '{"thefork":{"name":"TheFork","rate":null,"url":null},"tripadviser":{"name":"Tripadviser","rate":null,"url":null},"facebook":{"name":"Facebook","rate":null,"url":null},"instagram":{"name":"Instagram","rate":null,"url":null}}'

-- '{"mon":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000]}'


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
--   id uuid default uuid_generate_v1() primary key,
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
--   id uuid default uuid_generate_v1() primary key,
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
  -- is_deleted boolean DEFAULT FALSE
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
--   is_finish boolean DEFAULT FALSE,
--   is_deleted boolean DEFAULT FALSE
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
--   is_deleted boolean DEFAULT FALSE
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
--   is_deleted boolean DEFAULT FALSE
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
--   is_deleted boolean DEFAULT FALSE
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
--   is_deleted boolean DEFAULT FALSE
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
