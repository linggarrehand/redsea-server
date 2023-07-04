const router = require ('express').Router()
const customerRouter = require ('./customerRouter')
const exportRouter = require ('./exportRouter')

router.use ('/customers', customerRouter)
router.use ('/exports', exportRouter)

module.exports = router