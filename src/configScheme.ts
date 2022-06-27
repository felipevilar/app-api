import * as Joi from 'joi';

export default {
  NODE_ENV: Joi.string().default('development'),
  PORT: Joi.number().default(3000),
  DATABASE_URI: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.required(),
};
