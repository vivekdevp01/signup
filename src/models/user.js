'use strict';
const {
  Model
} = require('sequelize');
const { ServerConfig } = require('../config');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  const bcrypt=require('bcrypt');
  User.init({
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: true,
      },
      allowNull:false,
      unique:true

    },
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
       }
    },
    username: {
     type: DataTypes.STRING,
     allowNull:false,
     unique:true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password, +ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
  });
  return User;
};