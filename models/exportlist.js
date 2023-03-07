'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExportList extends Model {
    static associate(models) {
      ExportList.belongsTo (models.Customer, {
        foreignKey: 'customerId'
      })
      ExportList.belongsTo (models.Product, {
        foreignKey: 'productId'
      })
    }
  }
  ExportList.init({
    customerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ExportList',
  });
  return ExportList;
};