const router = require ('express').Router()
const customerController = require ('../controllers/customerController')
const authentication = require('../middleware/authentication')

router.post ('/register', customerController.register)
router.post ('/login', customerController.login)
router.get ('/products', customerController.getProduct)
router.get ('/categories', customerController.getCategory)
router.get ('/currency', customerController.getCurrency)
router.get ('/details',authentication, customerController.detailProfile)
router.patch ('/subscription',authentication, customerController.changeSubscription)
router.post ('/generate-midtrans-token',authentication, customerController.midtransToken)
router.get ('/products/:id', customerController.getProductById)


module.exports = router