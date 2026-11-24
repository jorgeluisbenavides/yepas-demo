const assert = require('assert');

if (process.env.APP_ENV !== 'production') {
  require('dotenv').config();
}

const {
  APP_ENV = 'dev',
  PORT = 8001,
  APP_NAME = 'yepas-demo',
  CACHE_KEY = 'test',
  DATABASE = 'postgres://postgres:secret@postgres:5432/postgres',
  EXPIRATION_TOKEN = '1h',
  API_KEY = 'test',
  AUTHORIZATION_SECRET_EXPIRATION = '10m',
  TIMEZONE = 'America/Mexico_City',
} = process.env;

assert(APP_ENV, 'APP_ENV must be provided');
assert(PORT, 'PORT must be provided');
assert(APP_NAME, 'APP_NAME must be provided');
assert(CACHE_KEY, 'CACHE_KEY must be provided');
assert(DATABASE, 'DATABASE must be provided');
assert(EXPIRATION_TOKEN, 'EXPIRATION_TOKEN must be provided');
assert(API_KEY, 'API_KEY must be provided');
assert(AUTHORIZATION_SECRET_EXPIRATION, 'AUTHORIZATION_SECRET_EXPIRATION must be provided');
assert(TIMEZONE, 'TIMEZONE must be provided');

module.exports = {
  APP_ENV,
  APP_NAME,
  ROOT_PATH: `/internal/api/${APP_NAME}`,
  PORT,
  CACHE_KEY,
  DATABASE_CONFIG: {
    client: 'pg',
    connection: DATABASE,
    pool: { min: 1, max: 10 },
    acquireConnectionTimeout: 2000,
    seeds: {
      directory: './seeds',
    },
  },
  API_KEY,
  AUTHORIZATION_SECRET_EXPIRATION,
  TIMEZONE,
};
