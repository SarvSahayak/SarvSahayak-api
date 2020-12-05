const jwt = require('jsonwebtoken')
const Ngo = require('../models/ngo')

const auth = async ( req, res, next ) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const ngo = await Ngo.findOne({ _id: decoded._id, 'tokens.token': token})
        if (!ngo) {
            throw new Error()
        }

        req.ngo = ngo
        req.token = token
        next()
    } catch (e) {
        res.status(401).send({ error: "Please authenticate."})
    }
}
module.exports = auth;
