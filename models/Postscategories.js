module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {}, { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPosts.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    models.Categorie.belongsToMany(models.BlogPosts, {
      as: 'BlogPosts',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};