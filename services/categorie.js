const { Categorie } = require('../models');

const prepareResponse = (success, code, message = '') => ({
  success,
  code,
  message,
});

const validateName = (name) => {
  if (!name) {
    return prepareResponse(false, 400, '"name" is required');
  }

  return prepareResponse(true, 201, '');
};

const create = async (name) => {
  try {
  const validateNameRes = validateName(name);

  if (!validateNameRes.success) {
    return prepareResponse(false, validateNameRes.code, validateNameRes.message);
  }

  const createdCategorie = await Categorie.create({ name });
  const response = prepareResponse(true, 201, '');
  response.message = createdCategorie;

  return response;
  } catch (error) {
    return prepareResponse(false, 415, 'caiu no catch');
  }
};  

module.exports = {
  create,
};
