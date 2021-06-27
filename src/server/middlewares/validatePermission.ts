import {Request, RequestHandler} from 'express';
import {StatusCodes} from 'http-status-codes';
import jwt from 'jsonwebtoken';
import {IJwtData} from '../../common/types';
import environment from '../../config/environment';

export const validatePermission =
  (adminRequired = false): RequestHandler =>
  async (req, res, next) => {
    await validateToken(req);

    if (!req.authenticated.admin && adminRequired) {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        error: 'Unauthorized user',
      });
    }

    return next();
  };

const validateToken = async (req: Request) => {
  const fullToken = req.headers.authorization;
  if (!fullToken) {
    throw new Error('Invalid token');
  }

  const token = extractToken(fullToken);

  try {
    const decoded = jwt.verify(token, environment.jwt.secret) as IJwtData;
    embedTokenData(req, decoded);
  } catch (e) {
    throw new Error('Invalid token');
  }
};

const extractToken = (fullToken: string) => {
  const splitToken = fullToken.split(' ');
  if (splitToken.length === 2 && splitToken[0] === 'Bearer') {
    return splitToken[1];
  }
  return fullToken;
};

const embedTokenData = (req: Request, tokenData: IJwtData) => {
  req.authenticated = tokenData;
};
