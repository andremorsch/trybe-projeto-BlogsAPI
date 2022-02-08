// const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = 'seusecretdetoken'; // segredo JWT - qq String

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const prepareResponse = (success, code, message = '') => ({
  success,
  code,
  message,
});

// const userValidations = Joi.object({
//   displayName: Joi.string().min(8).required(),
//   email: Joi.string().email().required(),
//   password: Joi.string().min(6).required().messages({
//     'string.min': '"password" length must be 6 characters long',
//   }),
// });

const create = async (displayName, email, password, image) => {
  const token = jwt.sign({ email }, secret, jwtConfig);

  const response = prepareResponse(true, 201, token);

  return response;
};

module.exports = {
  create,
};
