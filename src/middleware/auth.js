const jwt = require("jsonwebtoken");
const BlogModel = require("../models/blogs")

//Authentication
let authenticate = async function (req, res, next) {
    try {
    //Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called.
    //If the validation fails,
    // return a suitable error message with a corresponding HTTP status code  
    //Set the token, once validated, in the request - x-api-key  
        let token = req.headers["x-api-key"]
        if (!token) {
            return res.status(404).send({ msg: "Token must be Present" })
        }
        next()
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}
//Authorisation
const authorisation = async function (req, res, next) {
    try {
        let token = req.headers["x-api-key"];
        let decodedtoken = jwt.verify(token, "functionup-thorium")
//Make sure that only the owner of the blogs is able to edit or delete the blog.
        let toBeupdatedblogId = req.params.blogId
        if (toBeupdatedblogId) {
            let updatingAuthorId = await BlogModel.find({ _id: toBeupdatedblogId }).select({ authorId: 1, _id: 0 })
            let authorId = updatingAuthorId.map(x => x.authorId)
            console.log(authorId)
            let id = decodedtoken.AuthorId
            if (id != authorId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
        }
        else {
            let AuthorId = req.query.authorId
            toBeupdatedblogId = AuthorId
            let id = decodedtoken.AuthorId
            //In case of unauthorized access return an appropirate error message.
            if (id != AuthorId) return res.status(403).send({ status: false, msg: "You are not authorised to perform this task" })
        }
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: error.message })
    }
}



module.exports.authenticate = authenticate;
module.exports.authorisation = authorisation;

