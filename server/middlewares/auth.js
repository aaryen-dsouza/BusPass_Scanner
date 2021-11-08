require('dotenv').config();

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {

    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(400).json({
            msg: 'Please sign in.'
        })
    }
    else {
        const token = authorization.replace("Bearer ", "");

        jwt.verify(token, process.env.SECRET_KEY, (error, payload) => {
            if (error) {
                return res.status(400).json({
                    msg: 'Token not valid'
                })
            }
            else {
                req.user = payload,
                    next()
            }
        })
    }
}

module.exports = auth;