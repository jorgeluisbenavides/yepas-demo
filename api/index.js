const { startUp, getApp } = require('./src/utils/libs/Start');
const { mainHandler } = require('./src/utils/libs/ErrorHandler');

const {
  ROOT_PATH, APP_ENV, PORT, APP_NAME,
} = require('./src/configs');

const baseEnviroment = { APP_ENV, PORT, APP_NAME };

const routes = require('./src/routes');

const server = startUp(baseEnviroment, ROOT_PATH, routes, mainHandler);

const app = getApp();

module.exports = [app, server];
