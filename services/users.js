const jwt = require('jsonwebtoken');

const { User } = require('../models');

const secret = 'seusecretdetoken'; // segredo JWT - qq String

const jwtConfig = {
  // expiresIn: '7d',
  algorithm: 'HS256',
};
const REGEX_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

const prepareResponse = (success, code, message = '') => ({
  success,
  code,
  message,
});

const validateEmailTrue = async (email) => {
  const userEmail = await User.findAll({ where: { email } });
  if (userEmail.length) return prepareResponse(false, 409, 'User already registered');
  if (!email) return prepareResponse(false, 400, '"email" is required');
  if (!REGEX_EMAIL.test(email)) return prepareResponse(false, 400, '"email" must be a valid email');

  return prepareResponse(true, 201, '');
};

const validateDisplayName = async (name) => {
  if (name.length < 8) {
    return prepareResponse(false, 400, '"displayName" length must be at least 8 characters long');
  }

  return prepareResponse(true, 201, '');
};

const validatePassword = async (password) => {
  if (!password) return prepareResponse(false, 400, '"password" is required');

  if (password.length < 6) {
    return prepareResponse(false, 400, '"password" length must be 6 characters long');
  }

  return prepareResponse(true, 201, '');
};

const create = async (displayName, email, password, image) => {
  try {
    const validateEmailTrueResp = await validateEmailTrue(email);
    const validateDisplayNameResp = await validateDisplayName(displayName);
    const validatePasswordResp = await validatePassword(password);

    if (!validateEmailTrueResp.success) return validateEmailTrueResp;
    if (!validateDisplayNameResp.success) return validateDisplayNameResp;
    if (!validatePasswordResp.success) return validatePasswordResp;

    await User.create({ displayName, email, password, image });
    const token = jwt.sign(email, secret, jwtConfig);
    const response = prepareResponse(true, 201, token);
    return response;
  } catch (error) {
    return prepareResponse(false, 400, error);
  }
};

module.exports = {
  create,
};
