const BlogPosts = (sequelize, DataTypes) => {
  const blogposts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  }, {
    timestamps: false,
  });

  blogposts.associate = (models) => {
    blogposts.belongsTo(models.User, 
    { foreignKey: 'userId', as: 'user' });
  };

  return blogposts;
};

module.exports = BlogPosts; 