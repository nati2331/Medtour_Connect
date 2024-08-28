'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure first name is provided
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure last name is provided
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  // Ensure email is provided
      unique: true,      // Ensure email is unique
      validate: {
        isEmail: true,  // Validate email format
      },
    },
    desiredService: {
      type: DataTypes.STRING,
      allowNull: true,   // Allow null values if it's optional
      defaultValue: 'Not specified', // Default value if not provided
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',  // Specify table name if different from model name
    timestamps: true,    // Enable timestamps if needed
  });

  return User;
};
