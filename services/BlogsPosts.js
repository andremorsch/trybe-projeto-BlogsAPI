const { Op } = require('sequelize');
const { BlogPosts, Categorie, User } = require('../models');

const prepareResponse = (success, code, message = '') => ({
  success,
  code,
  message,
});

const genericValidations = (title, categoryIds, content) => {
  if (!title) return prepareResponse(false, 400, '"title" is required');
  if (!categoryIds) return prepareResponse(false, 400, '"categoryIds" is required');
  if (!content) return prepareResponse(false, 400, '"content" is required');

  return prepareResponse(true, 201, '');
};

const validateCategorie = async (categorie) => {
  const categories = await Categorie.findAll({ where: { id: { [Op.or]: categorie } } });
  if (!categories.length) {
    return prepareResponse(false, 400, '"categoryIds" not found');
    }
  return prepareResponse(true, 201, '');
};

const create = async (title = '', categoryIds = '', content = '', email = '') => {
  try {
    const genericValidationsResp = genericValidations(title, categoryIds, content);
    const validateCategorieResp = await validateCategorie(categoryIds);

    if (!genericValidationsResp.success) {
      return prepareResponse(false, 400, genericValidationsResp.message);
    }
    if (!validateCategorieResp.success) {
    return prepareResponse(false, 400, validateCategorieResp.message);
    }

    const { dataValues: { id } } = await User.findOne({ where: { email } });
    const createdBlogsPosts = await BlogPosts.create({ userId: id, title, content });
    const response = prepareResponse(true, 201, createdBlogsPosts);
    
    return response;
  } catch (error) {
    return prepareResponse(false, 415, error.message);
  }
};

module.exports = {
  create,
};