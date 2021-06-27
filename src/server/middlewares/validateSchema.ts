import {RequestHandler} from 'express';
import {ObjectSchema, AsyncValidationOptions} from 'joi';

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

    await schema.validateAsync(obj, options);
    next();
  };
};
