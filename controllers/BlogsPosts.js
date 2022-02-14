const usersService = require('../services/users');
const BlogsPostsServices = require('../services/BlogsPosts');

const create = async (req, res) => {
  const { authorization = '' } = req.headers;
  const { title, categoryIds, content } = req.body;

  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }
  const email = validateToken.message;
  const createPosts = await BlogsPostsServices.create(title, categoryIds, content, email);
  
  if (!createPosts.success) {
    return res.status(createPosts.code).json({ message: createPosts.message });
  }
  
  return res.status(createPosts.code).json(createPosts.message.dataValues);
};

const selectAll = async (req, res) => {
  const { authorization = '' } = req.headers;

  const validateToken = await usersService.validateToken(authorization);
  if (!validateToken.success) {
    return res.status(validateToken.code).json({ message: validateToken.message });
  }

  const selectAllResp = await BlogsPostsServices.selectAll();

  return res.status(selectAllResp.code).json(selectAllResp.message);
};

module.exports = {
  create,
  selectAll,
};