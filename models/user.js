'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    appName: DataTypes.STRING,
    deployUrl: DataTypes.STRING,
    gitHubRepo: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    project: DataTypes.INTEGER
  }, {
    timestamps: true,
    tableName: 'users',
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};