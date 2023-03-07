'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      Customer.belongsToMany(models.Category, {
        through: models.Product,
        foreignKey: 'customerId'
      })
      Customer.belongsToMany (models.Product, {
        through: models.ExportList,
        foreignKey: 'customerId'
      })
    }
  }
  Customer.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique : {
        msg: "Email must be unique",
      },
      validate: {
        notNull: {
          msg: "Email is required",
        },
        notEmpty: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Invalid email format",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password is required",
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "phoneNumber is required",
        },
        notEmpty: {
          msg: "phoneNumber is required",
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Customer',
  });
  Customer.beforeCreate ((customer, options) => {
    customer.password = hashPassword (customer.password)
  })
  return Customer;
};