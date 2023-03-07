const { comparePassword } = require("../helpers/bcrypt");
const { Customer } = require("../models");
const { createToken } = require("../helpers/jwt");

class customerController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber } = req.body;
      const createCustomer = await Customer.create({
        email,
        password,
        phoneNumber,
      });
      res.status(201).json({ id: createCustomer.id, email: createCustomer.email });
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

      const passwordValidated = comparePassword(password, findCustomer.password);

      if (!passwordValidated) throw { name: "invalid_email_password" };

      const payload = {
        id: findCustomer.id,
      };
      const access_token = createToken(payload);

      req.customer = {
        id : findCustomer.id,
    }

      res.status(200).json({ access_token });
    } catch (err) {
      next(err);
    }
  }
 
}

module.exports = customerController;
