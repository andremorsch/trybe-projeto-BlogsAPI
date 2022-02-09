const jwt = require('jsonwebtoken');

const { Login, User } = require('../models');

const secret = 'seusecretdetoken';

const jwtConfig = {
  algorithm: 'HS256',
};

// const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const prepareResponse = (success, code, message = '') => ({
  success,
  code,
  message,
});

const validateEmail = async (email) => {
  if (email === 'XXX') return prepareResponse(false, 400, '"email" is required');
  if (!email) return prepareResponse(false, 400, '"email" is not allowed to be empty');
  const userEmail = await User.findAll({ where: { email } });
  if (!userEmail.length) return prepareResponse(false, 400, 'Invalid fields');
  return prepareResponse(true, 400, '');
};

const validatePassword = async (password) => {
  if (password === 'XXX') return prepareResponse(false, 400, '"password" is required');
  if (!password) return prepareResponse(false, 400, '"password" is not allowed to be empty');
  if (password.length < 6) {
    return prepareResponse(false, 400, '"password" length must be 6 characters long');
  }
  return prepareResponse(true, 201, '');
};

const create = async (email, password) => {
  try {
    const validateEmailResp = await validateEmail(email);
    const validatePasswordResp = await validatePassword(password);

    if (!validateEmailResp.success) return validateEmailResp;
    if (!validatePasswordResp.success) return validatePasswordResp;

    await Login.create({ email, password });
    const token = jwt.sign(email, secret, jwtConfig);
    const response = prepareResponse(true, 200, token);
    return response;
  } catch (error) {
    return prepareResponse(false, 400, error);
  }
};

module.exports = {
  create,
};
