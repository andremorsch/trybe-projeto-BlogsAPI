const Categorie = (sequelize, DataTypes) => (
  sequelize.define('Categorie', {
    fullName: DataTypes.STRING,
  }, {
    timestamps: false,
  })
);

module.exports = Categorie;