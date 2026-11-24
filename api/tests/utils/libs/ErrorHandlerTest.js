const assert = require('assert');
const { describe, it } = require('mocha');

const {
  HandlerError,
  mainHandler,
  errorHandler,
  axiosErrorHandler,
} = require('../../../src/utils/libs/ErrorHandler');
const Errors = require('../../../src/utils/libs/HttpErrors');

const { INTERNAL_ERROR, CONFLICT } = Errors;

describe('ErrorHandler - [UNIT TEST]', () => {
  describe('HandlerError class', () => {
    it('Should create an instance with status provided', () => {
      const cause = new Error('original cause');
      const error = new HandlerError('Validation failed', 400, 'BadRequest', cause);

      assert.strictEqual(error.name, 'HandlerError');
      assert.strictEqual(error.message, 'Validation failed');
      assert.strictEqual(error.code, 400);
      assert.strictEqual(error.status, 'BadRequest');
      assert.strictEqual(error.cause, cause);
    });

    it('Should fallback status to code when status is not provided', () => {
      const error = new HandlerError('Not Found', 404);

      assert.strictEqual(error.code, 404);
      assert.strictEqual(error.status, 404);
    });
  });

  describe('mainHandler middleware', () => {
    it('Should handle error with custom code, status and message', () => {
      let statusCalledWith = null;
      let sendCalledWith = null;
      let nextCalled = false;

      const res = {
        status: (code) => {
          statusCalledWith = code;
          return {
            send: (payload) => {
              sendCalledWith = payload;
              return payload;
            },
          };
        },
      };

      const next = (result) => {
        nextCalled = true;
        return result;
      };

      const customError = {
        code: 400,
        status: 'BadRequest',
        message: 'Invalid payload',
      };

      mainHandler(customError, {}, res, next);

      assert.strictEqual(nextCalled, true);
      assert.strictEqual(statusCalledWith, 400);
      assert.deepStrictEqual(sendCalledWith, customError);
    });

    it('Should fallback to INTERNAL_ERROR defaults when error fields are missing or error is null', () => {
      let statusCalledWith = null;
      let sendCalledWith = null;

      const res = {
        status: (code) => {
          statusCalledWith = code;
          return {
            send: (payload) => {
              sendCalledWith = payload;
              return payload;
            },
          };
        },
      };

      const next = (result) => result;

      mainHandler(null, {}, res, next);

      assert.strictEqual(statusCalledWith, INTERNAL_ERROR.code);
      assert.deepStrictEqual(sendCalledWith, {
        status: INTERNAL_ERROR.status,
        code: INTERNAL_ERROR.code,
        message: INTERNAL_ERROR.message,
      });

      // Also verify with an empty object error {}
      mainHandler({}, {}, res, next);
      assert.strictEqual(statusCalledWith, INTERNAL_ERROR.code);
      assert.deepStrictEqual(sendCalledWith, {
        status: INTERNAL_ERROR.status,
        code: INTERNAL_ERROR.code,
        message: INTERNAL_ERROR.message,
      });
    });
  });

  describe('errorHandler function', () => {
    it('Should return Conflict HandlerError when error code matches procedure codes', () => {
      const error = {
        code: 'P0001',
        message: 'P0001 - El registro ya existe',
      };

      const result = errorHandler(error, 'Default message');

      assert.strictEqual(result.name, 'HandlerError');
      assert.strictEqual(result.code, CONFLICT.code);
      assert.strictEqual(result.status, CONFLICT.status);
      assert.strictEqual(result.message, 'El registro ya existe');
    });

    it('Should use fallback message if error message after hyphen is empty', () => {
      const error = {
        code: 'P0002',
        message: 'P0002 - ',
      };

      const result = errorHandler(error, 'Default message', ['P0002']);

      assert.strictEqual(result.name, 'HandlerError');
      assert.strictEqual(result.code, CONFLICT.code);
      assert.strictEqual(result.status, CONFLICT.status);
      assert.strictEqual(result.message, 'ocurrió un error inesperado');
    });

    it('Should return original error if error already has status and does not match procedure codes', () => {
      const error = {
        code: 'CUSTOM_ERR',
        status: 'CustomStatus',
        message: 'Custom message',
      };

      const result = errorHandler(error, 'Default message', ['P0001']);

      assert.strictEqual(result, error);
    });

    it('Should extract nested e.error if present and e.status is missing', () => {
      const error = {
        error: {
          code: 422,
          status: 'UnprocessableEntity',
          message: 'Nested validation failed',
        },
      };

      const result = errorHandler(error, 'Default message');

      assert.strictEqual(result.name, 'HandlerError');
      assert.strictEqual(result.code, 422);
      assert.strictEqual(result.status, 'UnprocessableEntity');
      assert.strictEqual(result.message, 'Nested validation failed');
    });

    it('Should create HandlerError with default fallback message and INTERNAL_ERROR codes when no nested error status', () => {
      const error = new Error('Database connection failed');

      const result = errorHandler(error, 'Error de servidor');

      assert.strictEqual(result.name, 'HandlerError');
      assert.strictEqual(result.code, INTERNAL_ERROR.code);
      assert.strictEqual(result.status, INTERNAL_ERROR.status);
      assert.strictEqual(result.message, 'Error de servidor');
    });
  });

  describe('axiosErrorHandler function', () => {
    it('Should throw HandlerError with response data when err.response exists', () => {
      const axiosError = {
        response: {
          data: {
            message: 'External service error',
            code: 400,
            status: 'BadRequest',
          },
        },
      };

      assert.throws(
        () => axiosErrorHandler(axiosError, 'PAYMENT-MODULE'),
        (err) => {
          assert.strictEqual(err.name, 'HandlerError');
          assert.strictEqual(err.message, 'External service error');
          assert.strictEqual(err.code, 400);
          assert.strictEqual(err.status, 'BadRequest');
          return true;
        },
      );
    });

    it('Should throw HandlerError with INTERNAL_ERROR defaults when err.response.data is empty and moduleName is omitted', () => {
      const axiosError = {
        response: {},
      };

      assert.throws(
        () => axiosErrorHandler(axiosError),
        (err) => {
          assert.strictEqual(err.name, 'HandlerError');
          assert.strictEqual(err.message, INTERNAL_ERROR.message);
          assert.strictEqual(err.code, INTERNAL_ERROR.code);
          assert.strictEqual(err.status, INTERNAL_ERROR.status);
          return true;
        },
      );
    });

    it('Should throw Error when err.request exists but no response was received', () => {
      const axiosError = {
        request: {
          path: '/api/v1/test',
        },
      };

      assert.throws(
        () => axiosErrorHandler(axiosError, 'HTTP-CLIENT'),
        (err) => err instanceof Error,
      );
    });

    it('Should throw Error when neither response nor request exists', () => {
      const axiosError = new Error('Network setup error');

      assert.throws(
        () => axiosErrorHandler(axiosError),
        (err) => err instanceof Error,
      );
    });
  });
});
