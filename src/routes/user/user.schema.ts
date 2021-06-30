import joi from 'joi';

const emailRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const postUserSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().pattern(emailRegex).allow('admin').required(),
  admin: joi.boolean().optional(),
});

export const getUserSchema = joi.object({
  id: joi.string().optional(),
  name: joi.string().optional(),
  email: joi.string().pattern(emailRegex).allow('admin').optional(),
  admin: joi.boolean().optional(),
});

export const postAuthenticateSchema = joi.object({
  email: joi.string().pattern(emailRegex).allow('admin').required(),
  password: joi.string().required(),
});
