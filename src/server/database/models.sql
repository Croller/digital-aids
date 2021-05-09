
-- CREATE SCHEMA "DigitalCarte";
-- ALTER DATABASE "DigitalCarte" SET timezone TO 'Europe/Moscow';

CREATE TABLE IF NOT EXISTS data_users (
  number serial,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  login varchar DEFAULT NULL,
  password varchar DEFAULT NULL,
  surname varchar DEFAULT NULL,
  name varchar DEFAULT NULL,
  middlename varchar DEFAULT NULL,
  birthdate timestamp with time zone DEFAULT NULL,
  phone bigint array DEFAULT NULL,
  email varchar array DEFAULT NULL,
  language varchar DEFAULT 'en', -- DICTIONARY dictionary_translate
  roles int array DEFAULT NULL, -- DICTIONARY data_roles
  restaurants varchar ARRAY DEFAULT NULL, -- DICTIONARY data_restaurant
  enter_at timestamp with time zone NOT NULL DEFAULT NOW(),
  meta jsonb DEFAULT '{"browser": "NULL", "ip": "NULL", "geo": "NULL"}',
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_roles (
  id serial primary key,
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  create_restaurant BOOLEAN DEFAULT FALSE,
  update_restaurant BOOLEAN DEFAULT FALSE,
  delete_restaurant BOOLEAN DEFAULT FALSE,
  create_user BOOLEAN DEFAULT FALSE,
  update_user BOOLEAN DEFAULT FALSE,
  delete_user BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_restaurants (
  number serial,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  address VARCHAR DEFAULT NULL,
  email VARCHAR ARRAY DEFAULT NULL,
  website VARCHAR ARRAY DEFAULT NULL,
  opinion VARCHAR DEFAULT NULL,
  phone VARCHAR ARRAY DEFAULT NULL,
  currency VARCHAR ARRAY DEFAULT '{"EUR"}', -- DICTIONARY dictionary_currency
  cuisine VARCHAR ARRAY DEFAULT NULL,
  employees VARCHAR ARRAY DEFAULT NULL,
  avg_price FLOAT DEFAULT 0.00,
  languages VARCHAR ARRAY DEFAULT '{"NULL", "en"}', -- DICTIONARY dictionary_translate
  images VARCHAR ARRAY DEFAULT NULL,
  socials jsonb DEFAULT '{"thefork":{"rate":0,"url":"NULL", "comments":0},"tripadvisor":{"rate":"0","url":"NULL", "comments":0},"facebook":"NULL","instagram":"NULL"}',
  at_work jsonb DEFAULT '{"description":"9:00-22:00","mon":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000","2020-01-01T00:00:00.000"]}',
  options jsonb DEFAULT '{"specialsDeals":{"max":"1"},"foodtips":{"max":"5"}}',
  geom GEOMETRY DEFAULT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_categories (
  number serial,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent VARCHAR NULL,
  restaurant VARCHAR NOT NULL,
  key VARCHAR DEFAULT NULL,
  type VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}',
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_categories_translate (
  id VARCHAR NOT NULL, -- DICTIONARY data_categories
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS data_dishes (
  number serial,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR NOT NULL, -- DICTIONARY data_categories
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  count INT DEFAULT 0,
  key VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  price jsonb DEFAULT '[{"amount": "1", "cost": "0.00", "unit": "pc"}]', -- unit DICTIONARY dictionary_translate
  options jsonb DEFAULT '{}',
  allergens VARCHAR ARRAY DEFAULT '{}', -- DICTIONARY dictionary_translate
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_dishes_translate (
  id VARCHAR NOT NULL, -- DICTIONARY data_dishes
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}'
);


CREATE TABLE IF NOT EXISTS dictionary_currency (
  number serial,
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  symbol VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_currency_translate (
  id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_currency
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_languages (
  number serial,
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_languages_translate (
  id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_languages
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_allergens (
  number serial,
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_allergens_translate (
  id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_allergens
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_units (
  number serial,
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_units_translate (
  id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_units
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_days (
  number serial,
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_days_translate (
  id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_days
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);








-- allergens
-- unit
-- week_days
-- type_categories
-- CREATE TABLE IF NOT EXISTS dictionary_translate (
--   number serial,
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
--   parent VARCHAR NOT NULL, -- DICTIONARY
--   tablename VARCHAR NOT NULL, -- TABLE NAME
--   name VARCHAR DEFAULT NULL,
--   fullname VARCHAR DEFAULT NULL,
--   description VARCHAR DEFAULT NULL
-- );


-- CREATE TABLE IF NOT EXISTS dictionary_type_categories (
--   number serial,
--   id VARCHAR DEFAULT NULL,
--   name VARCHAR DEFAULT NULL,
--   fullname VARCHAR DEFAULT NULL,
--   description VARCHAR DEFAULT NULL,
--   options jsonb DEFAULT NULL
-- );


  -- categories
  -- offers INT ARRAY DEFAULT NULL, -- DICTIONARY data_offers
  -- foodtips INT ARRAY DEFAULT NULL, -- DICTIONARY data_foodtips
  -- opinions INT ARRAY DEFAULT NULL, -- DICTIONARY data_opinions


-- CREATE TABLE data_socials (
--   id serial primary key,
--   fork VARCHAR DEFAULT NULL,
--   tripadvisor VARCHAR DEFAULT NULL,
--   facebook VARCHAR DEFAULT NULL,
--   instagram VARCHAR DEFAULT NULL
-- );

-- CREATE TABLE data_at_work (
--   id serial primary key,
--   mon timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   tue timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   wed timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   thu timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   fri timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sat timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sun timestamp with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000"}'
-- );

  -- '{"thefork":{"name":"TheFork","rate":NULL,"url":NULL},"tripadvisor":{"name":"Tripadviser","rate":NULL,"url":NULL},"facebook":{"name":"Facebook","rate":NULL,"url":NULL},"instagram":{"name":"Instagram","rate":NULL,"url":NULL}}'

-- '{"mon":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000]}'


-- CREATE TABLE description_data_users (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_roles (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   name varchar,
--   description varchar
-- );

-- CREATE TABLE description_dictionary_roles (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- // --------------------------------------------------

-- CREATE TABLE data_krt (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
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
  -- is_deleted BOOLEAN DEFAULT FALSE
--   type_zone number[],
-- );

-- CREATE TABLE description_data_krt (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN
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
--   is_finish BOOLEAN DEFAULT FALSE,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_district (
--   id serial primary key,
--   name varchar,
--   fullname varchar,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_district (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_monitoring_part_data_monitoring (
--   id serial primary key,
--   name varchar,
--   fullname varchar
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_monitoring_part_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_monitoring_group_data_monitoring (
--   id serial primary key,
--   name varchar,
--   fullname varchar,
--   order_at int,
--   monitoring_part int,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_monitoring_group_data_monitoring (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE description_tables (
--   id serial primary key,
--   key varchar,
--   name varchar,
--   system BOOLEAN,
--   dictionary varchar
-- );

-- CREATE TABLE dictionary_type_zone_krt (
--   id serial primary key,
--   name varchar,
--   description varchar,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_type_zone_krt (
--   key varchar,
--   name varchar,
--   type varchar,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary varchar
-- );
