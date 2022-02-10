const Categorie = (sequelize, DataTypes) => (
  sequelize.define('Categorie', {
    name: DataTypes.STRING,
  }, {
    timestamps: false,
  })
);

module.exports = Categorie;