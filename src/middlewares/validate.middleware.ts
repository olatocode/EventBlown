/** @format */

const Joi = require('joi');

const validateUser = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(13).required(),
  gender: Joi.string().min(4).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .min(8)
    .max(10)
    .pattern(new RegExp('^[a-zA-Z0-9]{8,10}$'))
    .required(),
});

const validateAdmin = Joi.object({
  userName: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(10).max(13).required(),
  gender: Joi.string().min(4).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

const validateEvent = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  location: Joi.string().min(10).max(13).required(),
  amount: Joi.string().min(4).required(),
  image: Joi.string().required(),
});

module.exports = { validateUser, validateAdmin, validateEvent };
