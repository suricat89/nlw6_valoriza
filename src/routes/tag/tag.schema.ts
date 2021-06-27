import joi from 'joi';

export const postTagSchema = joi.object({
  name: joi.string().required(),
});

export const getTagSchema = joi.object({
  id: joi.string().optional(),
  name: joi.string().optional(),
});
