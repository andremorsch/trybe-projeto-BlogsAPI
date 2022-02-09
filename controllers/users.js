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

module.exports = {
  create,
  selectAllUsers,
};
