import {RequestHandler} from 'express';
import {ObjectSchema, AsyncValidationOptions} from 'joi';
import {BadRequest} from '../../common/errors';

export enum ValidateItem {
  BODY,
  QUERY,
}

export const validateSchema = (
  schema: ObjectSchema,
  validateItem: ValidateItem,
  options?: AsyncValidationOptions
): RequestHandler => {
  return async (req, res, next) => {
    let obj = {};
    if (validateItem === ValidateItem.BODY) obj = req.body;
    else obj = req.query;

    try {
      await schema.validateAsync(obj, options);
      next();
    } catch (error) {
      throw new BadRequest(error);
    }
  };
};
