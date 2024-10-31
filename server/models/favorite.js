"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Favorite.init(
    {
      UserId: DataTypes.INTEGER,
      GameId: DataTypes.INTEGER,
      GameName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
