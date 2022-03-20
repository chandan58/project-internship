const jwt = require('jsonwebtoken')

const middleware = async (req, res, next) => {
    try {
        const token = req.header('x-api-key')
        if(!token) {
            res.status(403).send({status: false, message: `Missing token request`})
            return;
        }

        const decodedtoken = await jwt.verify(token, 'functionup-thorium')

        if(!decodedtoken) {
            res.status(403).send({status: false, message: `Invalid authentication token in request`})
            return;
        }

        req.authorId = decodedtoken.authorId;

        next()
    } catch (error) {
        console.error(`Error! ${error.message}`)
        res.status(500).send({status: false, message: error.message})
    }
}

module.exports = middleware





