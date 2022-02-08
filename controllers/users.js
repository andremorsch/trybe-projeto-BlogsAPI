const usersService = require('../services/users');

const create = async (req, res) => {
  const { displayName, email = '', password = '', image } = req.body;
  const userServiceRes = await usersService.create(displayName, email, password, image);
  if (!userServiceRes.success) {
    return res.status(userServiceRes.code).json({ message: userServiceRes.message });
  }

  return res.status(userServiceRes.code).json({ token: userServiceRes.message });
};

module.exports = {
  create,
};
