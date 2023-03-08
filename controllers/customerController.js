const { comparePassword } = require("../helpers/bcrypt");
const { Customer, Product, Category } = require("../models");
const { createToken } = require("../helpers/jwt");
const axios = require("axios");

class customerController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber } = req.body;
      const createCustomer = await Customer.create({
        email,
        password,
        phoneNumber,
      });
      res
        .status(201)
        .json({ id: createCustomer.id, email: createCustomer.email });
    } catch (err) {
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };

      const findCustomer = await Customer.findOne({
        where: {
          email,
        },
      });

      if (!findCustomer) throw { name: "invalid_email_password" };

      const passwordValidated = comparePassword(
        password,
        findCustomer.password
      );

      if (!passwordValidated) throw { name: "invalid_email_password" };

      const payload = {
        id: findCustomer.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
  static async getProduct(req, res, next) {
    let { page, categoryId } = req.query;
    let paramsQuery = {};
    const limit = 6;
    const offset = page ? page * limit : 0;
    paramsQuery.limit = limit;
    paramsQuery.offset = offset;
    paramsQuery.attributes = { exclude: ["createdAt", "updatedAt"] };
    if (categoryId) {
      paramsQuery.where = { categoryId };
    }
    try {
      let product = await Product.findAll(paramsQuery);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async getProductById(req, res, next) {
    try {
      let { id } = req.params;
      let product = await Product.findByPk(id);
      if (!product) throw { name: "NotFound" };
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }
  static async getCategory(req, res, next) {
    try {
      let category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }
  static async getCurrency(req, res, next) {
    try {
      let amount = req.headers.amount;
      let { data } = await axios.request({
        url: `https://www.amdoren.com/api/currency.php?api_key=${process.env.CURRENCY_API}&from=USD&to=IDR&amount=${amount}`,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = customerController;
