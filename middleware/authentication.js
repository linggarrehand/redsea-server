const { Customer } = require("../models");
const { verifyToken } = require('../helpers/jwt')

async function authentication (req, res, next) {
    try {
        let access_token = req.headers.access_token
        if (!access_token) throw ({name: 'invalid_token'})

        let payload = verifyToken(access_token)

        let customer = await Customer.findByPk (payload.id)
        if (!customer) throw ({name: 'invalid_token'})
        req.customer = {
            id : customer.id,
            email : customer.email,
        }
        next ()
    } catch (err) {
        next(err)
    }
}

module.exports = authentication