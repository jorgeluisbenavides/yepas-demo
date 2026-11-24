const Errors = require('./HttpErrors');

const { error } = require('./Logger').getLogger();

const { INTERNAL_ERROR, CONFLICT } = Errors;

class HandlerError extends Error {
  constructor(message, code, status, cause) {
    super(message, { cause });
    this.name = 'HandlerError';
    this.status = status || code;
    this.code = code;
  }
}

const mainHandler = (err, _req, res, next) => {
  const httpStatus = err && err.code ? err.code : INTERNAL_ERROR.code;
  const errorToForward = {
    status: err && err.status ? err.status : INTERNAL_ERROR.status,
    code: httpStatus,
    message: err && err.message ? err.message : INTERNAL_ERROR.message,
  };

  return next(res.status(httpStatus).send(errorToForward));
};

const getError = (err, codes) => {
  if (err.code && codes.includes(err.code)) {
    const message = err.message.split('-')[1].trim() || 'ocurrió un error inesperado';

    return new HandlerError(
      message,
      CONFLICT.code,
      CONFLICT.status,
    );
  }

  return err;
};

const errorHandler = (err, m, procedureCodes = ['P0001']) => {
  error('...executing: errorHandler()', err);

  const e = getError(err, procedureCodes);

  return e.status ? e
    : new HandlerError(
      e.error && e.error.status ? e.error.message : m,
      e.error && e.error.code ? e.error.code : INTERNAL_ERROR.code,
      e.error && e.error.status ? e.error.status : INTERNAL_ERROR.status,
    );
};

const axiosErrorHandler = (err, moduleName = 'NO-MODULE') => {
  if (err.response) {
    const defaultMessage = 'The request was made and the server responded with a status code';
    error(`${moduleName}: ${defaultMessage} Error: ${err}`, err);
    const data = err.response.data || {};
    throw new HandlerError(
      data.message || INTERNAL_ERROR.message,
      data.code || INTERNAL_ERROR.code,
      data.status || INTERNAL_ERROR.status,
    );
  } else if (err.request) {
    const defaultMessage = 'Request made but no response is received from the server';
    error(`${moduleName}: ${defaultMessage} Error: ${err}`, err);

    throw new Error({ ...err.request, message: defaultMessage });
  } else {
    const defaultMessage = 'Something happened in setting up the request that triggered an Error';
    error(`${moduleName}: ${defaultMessage} Error: ${err}`, err);

    throw new Error({ ...err.response, message: defaultMessage });
  }
};

module.exports = {
  mainHandler,
  errorHandler,
  HandlerError,
  axiosErrorHandler,
};
