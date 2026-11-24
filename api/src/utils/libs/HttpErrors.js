/* eslint-disable max-len */
module.exports = {
  BAD_REQUEST: {
    code: 400,
    status: 'BadRequest',
    message: 'La solicitud no pudo ser procesada debido a datos mal formados o ausentes.',
  },
  CONFLICT: {
    code: 409,
    status: 'Conflict',
    message: ' La solicitud no pudo completarse debido a un conflicto con el estado actual del recurso. Por favor, resuelve el conflicto y vuelve a intentarlo.',
  },
  NOT_FOUND: {
    code: 404,
    status: 'NotFound',
    message: 'El recurso solicitado no se encuentra en el servidor.',
  },
  UNAUTHORIZED: {
    code: 401,
    status: 'Unauthorized',
    message: 'No estás autorizado para acceder a este recurso. Verifica tus credenciales.',
  },
  SERVICE_UNAVAILABLE: {
    code: 503,
    status: 'ServiceUnavailable',
    message: 'El servicio no está disponible en este momento. Por favor, inténtalo nuevamente más tarde.',
  },
  INTERNAL_ERROR: {
    code: 500,
    status: 'InternalError',
    message: 'Se produjo un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.',
  },
  FORBIDDEN: {
    code: 403,
    status: 'Forbidden',
    message: 'No tienes los permisos necesarios para realizar esta acción.',
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    status: 'ToManyRequests',
    message: 'Has alcanzado el límite de solicitudes permitidas en un período de tiempo específico. Por favor, espera y vuelve a intentarlo más tarde.',
  },
};
