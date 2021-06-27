import {ErrorRequestHandler} from 'express';
import {CustomError} from '../../common/errors';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
};
