const log4js = require('log4js');

const { APP_NAME = 'yepas-node-core' } = process.env;

log4js.configure({
  appenders: {
    console: { type: 'console', layout: { type: 'pattern', pattern: '%[ [%d] [%-5.-5p] [%c] - %m %]' } },
  },
  categories: {
    default: { appenders: ['console'], level: 'all' },
  },
  replaceConsole: true,
});

const getLogger = () => {
  const logger = log4js.getLogger(APP_NAME);

  // if (APP_ENV === 'production') {
  //   logger.level = 'info';
  //   logger.trace = () => {};
  //   logger.debug = () => {};
  // } else {
  //   logger.level = 'all';
  // }

  return {
    trace: logger.trace.bind(logger),
    debug: logger.debug.bind(logger),
    info: logger.info.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    fatal: logger.fatal.bind(logger),
  };
};

module.exports = {
  getLogger,
};
