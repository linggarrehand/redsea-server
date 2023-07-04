'use strict';
const { hashPassword } = require("../helpers/bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let dataCustomers = require ('../data.json').Customers
    dataCustomers.forEach(el => {
     el.createdAt = el.updatedAt = new Date ()
     el.password = hashPassword (el.password)
   })
   let dataCategories = require ('../data.json').Categories
   dataCategories.forEach(el => el.createdAt = el.updatedAt = new Date ())

   let dataProducts = require ('../data.json').Products
   dataProducts.forEach(el => {
     el.createdAt = el.updatedAt = new Date ()
   })
   
   await queryInterface.bulkInsert('Customers', dataCustomers, {})
   await queryInterface.bulkInsert('Categories', dataCategories, {})
   await queryInterface.bulkInsert('Products', dataProducts, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Customers', null, {})
    await queryInterface.bulkDelete('Categories', null, {})
    await queryInterface.bulkDelete('Products', null, {})
  }
};
