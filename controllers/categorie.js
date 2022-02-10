const usersService = require('../services/users');
const categorieService = require('../services/categorie');

const create = async (req, res) => {
  const { name } = req.body;
  const { authorization = '' } = req.headers;

  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }

  const categorieServiceRes = await categorieService.create(name);
  if (!categorieServiceRes.success) {
    return res.status(categorieServiceRes.code).json({ message: categorieServiceRes.message });
  }
  console.log('inicia aqui', categorieServiceRes.message, 'fecha aqui');
  return res.status(categorieServiceRes.code).json({
    id: categorieServiceRes.message.dataValues.id,
    name,
  });
};

const selectAllCategories = async (req, res) => {
  const { authorization = '' } = req.headers;

  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }

  const categorieServiceRes = await categorieService.selectAllCategories();

  return res.status(categorieServiceRes.code).json(categorieServiceRes.message);
};

module.exports = {
  create,
  selectAllCategories,
};
