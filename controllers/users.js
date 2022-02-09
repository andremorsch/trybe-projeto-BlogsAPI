const usersService = require('../services/users');

const create = async (req, res) => {
  const { displayName, email = '', password = '', image } = req.body;
  const userServiceRes = await usersService.create(displayName, email, password, image);
  if (!userServiceRes.success) {
    return res.status(userServiceRes.code).json({ message: userServiceRes.message });
  }

  return res.status(userServiceRes.code).json({ token: userServiceRes.message });
};

const selectAllUsers = async (req, res) => {
  const allUsers = await usersService.selectAllUsers();
  const { authorization } = req.headers;
  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }

  return res.status(allUsers.code).json(allUsers.message);
};

const selectById = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;

  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }

  const userById = await usersService.selectById(id);
  if (!userById.success) {
    return res.status(userById.code).json({ message: userById.message });
  }
  return res.status(userById.code).json(userById.message);
};

module.exports = {
  create,
  selectAllUsers,
  selectById,
};
