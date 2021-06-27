import joi from 'joi';

export const postComplimentSchema = joi.object({
  message: joi.string().required(),
  tagId: joi.string().required(),
  userReceiver: joi.string().required(),
});

export const getComplimentReceivedSchema = joi.object({
  userId: joi.string().optional(),
});

export const getComplimentSentSchema = joi.object({
  userId: joi.string().optional(),
});
