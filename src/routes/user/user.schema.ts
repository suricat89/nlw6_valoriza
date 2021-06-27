import joi from 'joi';

export const postUserSchema = joi.object({
  name: joi.string().required(),
  password: joi.string().required(),
  email: joi.string().required(),
  admin: joi.boolean().optional(),
});

export const getUserSchema = joi.object({
  id: joi.string().optional(),
  name: joi.string().optional(),
  email: joi.string().optional(),
  admin: joi.boolean().optional(),
});

export const postAuthenticateSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});
