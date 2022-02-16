-- CREATE SCHEMA "DigitalAids";
-- ALTER DATABASE "digital-aids" SET timezone TO 'Europe/Moscow';
CREATE TABLE IF NOT EXISTS data_users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  login VARCHAR NOT NULL,
  password VARCHAR NOT NULL,
  surname VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  middlename VARCHAR DEFAULT NULL,
  birthdate TIMESTAMP with time zone DEFAULT NULL,
  phone VARCHAR DEFAULT NULL,
  email VARCHAR NOT NULL,
  language VARCHAR DEFAULT 'en', -- DICTIONARY dictionary_languages
  meta jsonb DEFAULT '{"browser": "NULL", "ip": "NULL", "geo": "NULL"}',
  is_confirmed BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_users (
  id VARCHAR NOT NULL,
  login VARCHAR DEFAULT NULL,
  password VARCHAR DEFAULT NULL,
  surname VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  middlename VARCHAR DEFAULT NULL,
  birthdate TIMESTAMP with time zone DEFAULT NULL,
  phone VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  language_id VARCHAR DEFAULT NULL, -- DICTIONARY dictionary_languages
  meta jsonb DEFAULT NULL,
  is_confirmed BOOLEAN DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_roles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  description VARCHAR DEFAULT NULL,
  access VARCHAR ARRAY DEFAULT '{"guest"}', -- dictionary_access
  project VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants, data_agros
  project_id VARCHAR DEFAULT NULL,
  options jsonb DEFAULT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_roles (
  id VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL,
  description VARCHAR DEFAULT NULL,
  access VARCHAR ARRAY DEFAULT '{"guest"}', -- dictionary_access
  project VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants, data_agros
  project_id VARCHAR DEFAULT NULL,
  options jsonb DEFAULT NULL,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_restaurants (
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
  languages VARCHAR ARRAY DEFAULT '{"NULL", "en"}', -- DICTIONARY dictionary_languages
  images VARCHAR ARRAY DEFAULT NULL,
  socials jsonb DEFAULT '{"thefork":{"rate":0,"url":"NULL", "comments":0},"tripadvisor":{"rate":"0","url":"NULL", "comments":0},"facebook":"NULL","instagram":"NULL"}',
  at_work jsonb DEFAULT '{"description":"NULL","mon":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"tue":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"wed":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"thu":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"fri":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sat":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"],"sun":["2020-01-01T10:00:00.000","2020-01-01T22:00:00.000"]}',
  options jsonb DEFAULT '{"specialsDeals":{"max":"1"},"foodtips":{"max":"5"}}',
  geojson jsonb DEFAULT NULL,
  geom GEOMETRY DEFAULT NULL,
  is_publish BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_restaurants (
  id VARCHAR DEFAULT NULL,
  key VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  address VARCHAR DEFAULT NULL,
  email VARCHAR ARRAY DEFAULT NULL,
  website VARCHAR ARRAY DEFAULT NULL,
  opinion VARCHAR DEFAULT NULL,
  phone VARCHAR ARRAY DEFAULT NULL,
  currency VARCHAR ARRAY DEFAULT NULL, -- DICTIONARY dictionary_currency
  cuisine VARCHAR ARRAY DEFAULT NULL,
  employees VARCHAR ARRAY DEFAULT NULL,
  avg_price FLOAT DEFAULT NULL,
  languages VARCHAR ARRAY DEFAULT NULL, -- DICTIONARY dictionary_languages
  images VARCHAR ARRAY DEFAULT NULL,
  socials jsonb DEFAULT NULL,
  at_work jsonb DEFAULT NULL,
  options jsonb DEFAULT NULL,
  geojson jsonb DEFAULT NULL,
  geom GEOMETRY DEFAULT NULL,
  is_publish BOOLEAN DEFAULT NULL,
  is_archived BOOLEAN DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent VARCHAR NULL, -- DICTIONARY data_categories
  restaurant VARCHAR NOT NULL,
  key VARCHAR DEFAULT NULL,
  type VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}',
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_categories_translate (
  id VARCHAR NOT NULL, -- DICTIONARY data_categories
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}',
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_categories (
  id VARCHAR DEFAULT NULL,
  parent VARCHAR DEFAULT NULL, -- DICTIONARY data_categories
  restaurant VARCHAR DEFAULT NULL,
  key VARCHAR DEFAULT NULL,
  type VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT NULL,
  is_archived BOOLEAN DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_categories_translate (
  id VARCHAR NULL, -- DICTIONARY data_categories
  language VARCHAR NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_dishes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category VARCHAR NOT NULL, -- DICTIONARY data_categories
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  dish_number INT DEFAULT 0,
  key VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  price jsonb DEFAULT '[{"amount": "1", "cost": "0.00", "unit": "pc"}]', -- unit DICTIONARY dictionary_languages
  options jsonb DEFAULT '{}',
  allergens VARCHAR ARRAY DEFAULT '{}', -- DICTIONARY dictionary_languages
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_dishes_translate (
  id VARCHAR NOT NULL, -- DICTIONARY data_dishes
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT '{}',
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_dishes (
  id VARCHAR DEFAULT NULL,
  category VARCHAR DEFAULT NULL, -- DICTIONARY data_categories
  restaurant VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants
  dish_number INT DEFAULT NULL,
  key VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  images VARCHAR ARRAY DEFAULT NULL,
  price jsonb DEFAULT NULL, -- unit DICTIONARY dictionary_languages
  options jsonb DEFAULT NULL,
  allergens VARCHAR ARRAY DEFAULT NULL, -- DICTIONARY dictionary_languages
  is_archived BOOLEAN DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_dishes_translate (
  id VARCHAR NULL, -- DICTIONARY data_dishes
  language VARCHAR NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL,
  cuisine VARCHAR ARRAY DEFAULT NULL,
  options jsonb DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_reserve (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  phone VARCHAR DEFAULT NULL,
  persons INT NOT NULL,
  table_number INT DEFAULT NULL,
  reserve_at TIMESTAMP with time zone NOT NULL DEFAULT NULL,
  create_user VARCHAR DEFAULT NULL,
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT NULL,
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_reserve (
  id VARCHAR DEFAULT NULL,
  restaurant VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants
  name VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  phone VARCHAR DEFAULT NULL,
  persons INT NOT NULL,
  table_number INT DEFAULT NULL,
  reserve_at TIMESTAMP with time zone DEFAULT NULL,
  create_user VARCHAR DEFAULT NULL,
  create_at TIMESTAMP with time zone DEFAULT NULL,
  is_approved BOOLEAN DEFAULT NULL,
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_opinions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  name VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  rate jsonb DEFAULT '{"service": "NULL", "meal": "NULL", "covid": "NULL", "menu": "NULL", "comments": "NULL"}',
  create_user VARCHAR DEFAULT NULL,
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_opinions (
  id VARCHAR DEFAULT NULL,
  restaurant VARCHAR NULL, -- DICTIONARY data_restaurants
  name VARCHAR DEFAULT NULL,
  email VARCHAR DEFAULT NULL,
  rate jsonb DEFAULT '{"service": "NULL", "meal": "NULL", "covid": "NULL", "menu": "NULL", "comments": "NULL"}',
  create_user VARCHAR DEFAULT NULL,
  create_at TIMESTAMP with time zone NOT NULL,
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);


CREATE TABLE IF NOT EXISTS data_orders (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  table_number INT DEFAULT NULL,
  order_number VARCHAR NOT NULL,
  order_url VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'waiting', --- DICTIONARY dictionary_order_status
  create_user VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  cooked_at TIMESTAMP with time zone DEFAULT NULL,
  cook_options jsonb DEFAULT '{}',
  delivered_at TIMESTAMP with time zone DEFAULT NULL,
  delivery_options jsonb DEFAULT '{}',
  paid_at TIMESTAMP with time zone DEFAULT NULL,
  pay_options jsonb DEFAULT '{}',
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_orders (
  id VARCHAR DEFAULT NULL,
  restaurant VARCHAR DEFAULT NULL, -- DICTIONARY data_restaurants
  table_number INT DEFAULT NULL,
  order_number VARCHAR NULL,
  order_url VARCHAR NULL,
  status VARCHAR DEFAULT NULL,  --- DICTIONARY dictionary_order_status
  create_user VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone DEFAULT NULL,
  cooked_at TIMESTAMP with time zone DEFAULT NULL,
  cook_options jsonb DEFAULT NULL,
  delivered_at TIMESTAMP with time zone DEFAULT NULL,
  delivery_options jsonb DEFAULT NULL,
  paid_at TIMESTAMP with time zone DEFAULT NULL,
  pay_options jsonb DEFAULT NULL,
  is_viewed BOOLEAN DEFAULT NULL,
  is_archived BOOLEAN DEFAULT NULL,
  is_deleted BOOLEAN DEFAULT NULL,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS data_notify (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  description VARCHAR DEFAULT NULL,
  options VARCHAR NOT NULL DEFAULT NULL, -- '{"waiter": "FALSE", "receipt": "FALSE", "napkin": "FALSE", "appliances": "FALSE", "manager": "FALSE"}',
  table_number INT DEFAULT NULL,
  create_user VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS logs_notify (
  id VARCHAR DEFAULT NULL,
  restaurant VARCHAR NOT NULL, -- DICTIONARY data_restaurants
  description VARCHAR DEFAULT NULL,
  options VARCHAR NOT NULL DEFAULT NULL, -- '{"waiter": "FALSE", "receipt": "FALSE", "napkin": "FALSE", "appliances": "FALSE", "manager": "FALSE"}',
  table_number INT DEFAULT NULL,
  create_user VARCHAR DEFAULT NULL, -- DICTIONARY data_users
  create_at TIMESTAMP with time zone NOT NULL DEFAULT NOW(),
  is_viewed BOOLEAN DEFAULT FALSE,
  is_archived BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  change_at TIMESTAMP with time zone DEFAULT NOW(),
  change_user VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_currency (
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
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_units_translate (
  id VARCHAR DEFAULT NULL,
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_days (
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_days_translate (
  id VARCHAR DEFAULT NULL,
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_access (
  id VARCHAR DEFAULT NULL,
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS dictionary_access_translate (
  id VARCHAR DEFAULT NULL,
  language VARCHAR NOT NULL, -- DICTIONARY dictionary_languages
  name VARCHAR DEFAULT NULL,
  fullname VARCHAR DEFAULT NULL,
  description VARCHAR DEFAULT NULL
);