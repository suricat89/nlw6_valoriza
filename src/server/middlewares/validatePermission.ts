import {RequestHandler} from 'express';
import {StatusCodes} from 'http-status-codes';

export const validatePermission =
  (...permissions): RequestHandler =>
  (req, res, next) => {
    const admin = true;

    if (admin) {
      return next();
    }

    res.status(StatusCodes.UNAUTHORIZED).send({
      error: 'Unauthorized user',
    });
  };
