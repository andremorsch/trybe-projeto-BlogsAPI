const usersService = require('../services/users');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const userServiceRes = usersService.create(displayName, email, password, image);

  return res.status(userServiceRes.code).json({ token: userServiceRes.message });
};

module.exposts = {
  create,
};
