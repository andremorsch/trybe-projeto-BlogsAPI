const Login = (sequelize, DataTypes) => (
  sequelize.define('Login', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    timestamps: false,
  })
);

module.exports = Login;
