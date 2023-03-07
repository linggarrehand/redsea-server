const router = require ('express').Router()
const customerRouter = require ('./customerRouter')

router.use ('/customers', customerRouter)

module.exports = router