
-- CREATE SCHEMA "DigitalAids";
ALTER DATABASE "digital-aids" SET timezone TO 'Europe/Moscow';

CREATE TABLE IF NOT EXISTS data_users (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  login VARCHAR DEFAULT NULL,
  password VARCHAR DEFAULT NULL,
  surname VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  middlename VARCHAR DEFAULT NULL,
  birthdate TIMESTAMP with time zone DEFAULT NULL,
  phone BIGINT array DEFAULT NULL,
  email VARCHAR array DEFAULT NULL,
  language VARCHAR DEFAULT 'en', -- DICTIONARY dictionary_translate
  roles int array DEFAULT NULL, -- DICTIONARY data_roles
  restaurants VARCHAR ARRAY DEFAULT NULL, -- DICTIONARY data_restaurant
  enter_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  meta jsonb DEFAULT '{"browser": "NULL", "ip": "NULL", "geo": "NULL"}',
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

DROP TABLE data_users_test;
CREATE TABLE IF NOT EXISTS data_users_test (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  surname VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  middlename VARCHAR DEFAULT NULL,
  birthdate TIMESTAMP with time zone DEFAULT NULL,
  phone VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  language VARCHAR DEFAULT 'en', -- DICTIONARY dictionary_translate
  roles VARCHAR ARRAY DEFAULT '{}', -- DICTIONARY data_roles
  enter_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  meta jsonb DEFAULT '{"browser": "NULL", "ip": "NULL", "geo": "NULL"}',
  is_confirmed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_restaurants (
  number SERIAL,
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
  at_work jsonb DEFAULT '{"description":"NULL","mon":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"]}',
  options jsonb DEFAULT '{"specialsDeals":{"max":"1"},"foodtips":{"max":"5"}}',
  geojson jsonb DEFAULT NULL,
  geom GEOMETRY DEFAULT NULL,
  is_publish BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_categories (
  number SERIAL,
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
  number SERIAL,
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

CREATE TABLE IF NOT EXISTS data_reserve (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR DEFAULT NULL,
  persons INT NOT NULL,
  table_number INT DEFAULT NULL,
  reserve_at TIMESTAMP with time zone NOT NULL DEFAULT NULL,
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_opinions (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  name VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  phone VARCHAR DEFAULT NULL,
  rate jsonb DEFAULT '{"service": "NULL", "meal": "NULL", "covid": "NULL", "menu": "NULL", "comments": "NULL"}',
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_orders (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  table_number INT DEFAULT NULL,
  order_number VARCHAR NOT NULL,
  order_url VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'waiting', --- DICTIONARY dictionary_order_status
  create_by VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  cooked_at TIMESTAMP with time zone DEFAULT NULL,
  cook_options jsonb DEFAULT '{}',
  delivered_at TIMESTAMP with time zone DEFAULT NULL,
  delivery_options jsonb DEFAULT '{}',
  paid_at TIMESTAMP with time zone DEFAULT NULL,
  pay_options jsonb DEFAULT '{}',
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_notify (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  options jsonb DEFAULT '{"waiter": "FALSE", "receipt": "FALSE", "napkin": "FALSE", "appliances": "FALSE", "manager": "FALSE"}',
  table_number INT DEFAULT NULL,
  create_user VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

DROP TABLE data_roles_test;
CREATE TABLE IF NOT EXISTS data_roles_test (
  number SERIAL,
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants
  name VARCHAR DEFAULT NULL,  -- restaurant/groceries/clothing/literature/furniture
  description VARCHAR DEFAULT NULL,
  parent VARCHAR DEFAULT NULL,
  root BOOLEAN DEFAULT FALSE,
  root_back BOOLEAN DEFAULT FALSE,
  owner BOOLEAN DEFAULT FALSE,
  owner_back BOOLEAN DEFAULT FALSE,
  manager BOOLEAN DEFAULT FALSE,
  manager_back BOOLEAN DEFAULT FALSE,
  employee BOOLEAN DEFAULT FALSE,
  guest BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS data_roles_test_translate (
  id VARCHAR NOT NULL, -- DICTIONARY data_roles_test
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_currency (
  number SERIAL,
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
  number SERIAL,
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
  number SERIAL,
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
  number SERIAL,
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
  number SERIAL,
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

-- CREATE TABLE IF NOT EXISTS dictionary_order_status (
--   number SERIAL,
--   id VARCHAR DEFAULT NULL,
--   name VARCHAR DEFAULT NULL,
--   fullname VARCHAR DEFAULT NULL,
--   description VARCHAR DEFAULT NULL
-- );

-- CREATE TABLE IF NOT EXISTS dictionary_order_status_translate (
--   id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_days
--   language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
--   name VARCHAR DEFAULT NULL,
--   fullname VARCHAR DEFAULT NULL,
--   description VARCHAR DEFAULT NULL
-- );







-- allergens
-- unit
-- week_days
-- type_categories
-- CREATE TABLE IF NOT EXISTS dictionary_translate (
--   number SERIAL,
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
--   parent VARCHAR NOT NULL, -- DICTIONARY
--   tablename VARCHAR NOT NULL, -- TABLE NAME
--   name VARCHAR DEFAULT NULL,
--   fullname VARCHAR DEFAULT NULL,
--   description VARCHAR DEFAULT NULL
-- );


-- CREATE TABLE IF NOT EXISTS dictionary_type_categories (
--   number SERIAL,
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
--   id SERIAL primary key,
--   fork VARCHAR DEFAULT NULL,
--   tripadvisor VARCHAR DEFAULT NULL,
--   facebook VARCHAR DEFAULT NULL,
--   instagram VARCHAR DEFAULT NULL
-- );

-- CREATE TABLE data_at_work (
--   id SERIAL primary key,
--   mon TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   tue TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   wed TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   thu TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   fri TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sat TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"}',
--   sun TIMESTAMP with time zone ARRAY DEFAULT '{"2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000"}'
-- );

  -- '{"thefork":{"name":"TheFork","rate":NULL,"url":NULL},"tripadvisor":{"name":"Tripadviser","rate":NULL,"url":NULL},"facebook":{"name":"Facebook","rate":NULL,"url":NULL},"instagram":{"name":"Instagram","rate":NULL,"url":NULL}}'

-- '{"mon":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000", "2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000", "2020-01-01T00:00:00.000]}'


-- CREATE TABLE description_data_users (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE dictionary_roles (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   name VARCHAR,
--   description VARCHAR
-- );

-- CREATE TABLE description_dictionary_roles (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- // --------------------------------------------------

-- CREATE TABLE data_krt (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   name VARCHAR,
--   proiz_zone VARCHAR,
--   prom_zone VARCHAR,
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
--   cadaster_number VARCHAR,
--   address VARCHAR,
--   region VARCHAR,
--   district int,
--   kurt int,
--   geom_string VARCHAR,
  -- is_deleted BOOLEAN DEFAULT FALSE
--   type_zone number[],
-- );

-- CREATE TABLE description_data_krt (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN
-- );

-- CREATE TABLE data_monitoring (
--   id SERIAL primary key,
--   krt int,
--   stage VARCHAR,
--   stage_status VARCHAR,
--   date_start TIMESTAMP with time zone,
--   date_end TIMESTAMP with time zone,
--   stage_next VARCHAR,
--   date_next TIMESTAMP with time zone,
--   descriptions VARCHAR,
--   responsible VARCHAR,
--   monitoring_part int,
--   monitoring_group int,
--   monitoring_group_order int,
--   project_start TIMESTAMP with time zone,
--   project_end TIMESTAMP with time zone,
--   change_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
--   is_finish BOOLEAN DEFAULT FALSE,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_data_monitoring (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE dictionary_district (
--   id SERIAL primary key,
--   name VARCHAR,
--   fullname VARCHAR,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_district (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE dictionary_monitoring_part_data_monitoring (
--   id SERIAL primary key,
--   name VARCHAR,
--   fullname VARCHAR
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_monitoring_part_data_monitoring (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE dictionary_monitoring_group_data_monitoring (
--   id SERIAL primary key,
--   name VARCHAR,
--   fullname VARCHAR,
--   order_at int,
--   monitoring_part int,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_monitoring_group_data_monitoring (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE description_tables (
--   id SERIAL primary key,
--   key VARCHAR,
--   name VARCHAR,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );

-- CREATE TABLE dictionary_type_zone_krt (
--   id SERIAL primary key,
--   name VARCHAR,
--   description VARCHAR,
--   is_deleted BOOLEAN DEFAULT FALSE
-- );

-- CREATE TABLE description_type_zone_krt (
--   key VARCHAR,
--   name VARCHAR,
--   type VARCHAR,
--   required BOOLEAN,
--   edit BOOLEAN,
--   system BOOLEAN,
--   dictionary VARCHAR
-- );
