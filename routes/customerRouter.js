const router = require ('express').Router()
const customerController = require ('../controllers/customerController')

router.post ('/register', customerController.register)
router.post ('/login', customerController.login)
router.get ('/products', customerController.getProduct)
router.get ('/categories', customerController.getCategory)
router.get ('/products/:id', customerController.getProductById)


module.exports = router