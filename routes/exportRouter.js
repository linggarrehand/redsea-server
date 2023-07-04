const router = require ('express').Router()
const exportController = require ('../controllers/exportController')
const authentication = require('../middleware/authentication')

router.get('/', authentication, exportController.getExport)
router.post('/:productId', authentication, exportController.createExport)

module.exports = router