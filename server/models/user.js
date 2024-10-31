"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(models.Favorite, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username required",
          },
          notNull: {
            msg: "Username required",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email Already Taken",
        },
        validate: {
          notEmpty: {
            msg: "Email required",
          },
          notNull: {
            msg: "Email required",
          },
        },
        isEmail: {
          msg: "Must be a valid email address",
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password required",
          },
          notNull: {
            msg: "Password required",
          },
        },
      },
      profilePicture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate(user => {
    user.password = hash(user.password);
  });
  return User;
};
