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
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .required(),
});

module.exports = validateUser;
