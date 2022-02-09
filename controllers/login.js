const loginServices = require('../services/login');

const create = async (req, res) => {
  const { email = 'XXX', password = 'XXX' } = req.body;
  const loginServicesRes = await loginServices.create(email, password);
  if (!loginServicesRes.success) {
    return res.status(loginServicesRes.code).json({ message: loginServicesRes.message });
  }

  return res.status(loginServicesRes.code).json({ token: loginServicesRes.message });
};

module.exports = {
  create,
};
