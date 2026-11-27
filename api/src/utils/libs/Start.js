const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

const getApp = () => app;

const startUp = (envs, prefix, routes, mainHandler, middlewares = []) => {
  const { PORT, APP_NAME, APP_ENV } = envs;

  if (!PORT) throw Error('Missing PORT');
  if (!APP_NAME) throw Error('Missing APP_NAME');
  if (!APP_ENV) throw Error('Missing APP_ENV');

  if (middlewares.length) middlewares.forEach((element) => app.use(element));

  app.use(express.json({ limit: '100mb' })).use(cors()).use(helmet()).use(compression());
  app.use(prefix, routes);
  app.use(mainHandler);

  app.configs = {};

  return app.listen(PORT, () => {
    console.log(`[+] '${APP_NAME}' is Ready`);
    console.log(`[+] Current APP_ENV '${APP_ENV}'`);
    console.log(`[+] Current PORT: '${PORT}'`);
    console.log(`[+] Current PATH ROUTE: 'localhost:${PORT}${prefix}'`);

    console.log('[*] Loaded Middlewares: ' + middlewares.length);

    middlewares.forEach((element) => {
      console.log(`\t + ${element.name}`);
    });
  });
};

module.exports = {
  getApp,
  startUp,
};
