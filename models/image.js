'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    image: DataTypes.BLOB
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};