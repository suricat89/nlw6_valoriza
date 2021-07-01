import {Request, RequestHandler} from 'express';
import jwt from 'jsonwebtoken';
import {Unauthorized} from '../../common/errors';
import {IJwtData} from '../../common/types';
import environment from '../../config/environment';

export const validatePermission =
  (adminRequired = false): RequestHandler =>
  async (req, res, next) => {
    await validateToken(req);

    if (!req.authenticated.admin && adminRequired) {
      throw new Unauthorized('Unauthorized user');
    }

    return next();
  };

const validateToken = async (req: Request) => {
  const fullToken = req.headers.authorization;
  if (!fullToken) {
    throw new Unauthorized('Invalid token');
  }

  const token = extractToken(fullToken);

  try {
    const decoded = jwt.verify(token, environment.jwt.secret) as IJwtData;
    embedTokenData(req, decoded);
  } catch (e) {
    throw new Unauthorized('Invalid token');
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
