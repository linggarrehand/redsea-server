const { ExportList, Product } = require("../models");

class bookmarkController {
  static async getExport(req, res, next) {
    try {
      let {id} = req.customer
      let exportList = await ExportList.findAll({ 
        where: { customerId: id }, 
        include: {model: Product, attributes: { exclude: ['createdAt', 'updatedAt']}},
        attributes: { exclude: ['createdAt', 'updatedAt']}
      });
      res.status(200).json(exportList);
    } catch (err) {
      next(err);
    }
  }
  static async createExport (req, res, next) {
    try {

        let {id} = req.customer
        let {productId} = req.params
        let product = await Product.findByPk(productId)
        if (!product) throw {name: 'NotFound'}
        await ExportList.create ({customerId: id, productId})
        res.status(201).json({message : `product has been added to your export list`})
    } catch (err) {
        next (err)
    }
}
}

module.exports = bookmarkController;
