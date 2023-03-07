'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo (models.Customer, {
        foreignKey: 'customerId'
      })
      Product.belongsTo (models.Category, {
        foreignKey: 'categoryId'
      })
      Product.belongsToMany (models.Customer, {
        through: models.ExportList,
        foreignKey: 'productId'
      })
    }
  }
  Product.init({
    name: DataTypes.STRING,
    requested: DataTypes.INTEGER,
    destination: DataTypes.STRING,
    imgUrl: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    customerId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};