const BlogModel = require("../models/blogs")
const authorModel = require("../models/authorModel")

//2.POST /blogs
const Blogs = async function (req, res) {
    try {
        // Create a blog document from request body. Get authorId in request body only.
        let data = req.body
        let authorId = data.authorId
        let author = await authorModel.findById(authorId)
        if (author) {
            let createBlog = await BlogModel.create(data)
            //Return HTTP status 201 on a succesful blog creation. Also return the blog document
            res.status(201).send({ status: true, data: createBlog })
        } else {
            //Return HTTP status 400 for an invalid request with a response body like this
            res.status(400).send({ status: false, msg: `BAD REQUEST` })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//3.GET /blogs
//Returns all blogs in the collection that aren't deleted and are published
const getBlogsData = async function (req, res) {
    try {
        
        let authorId= req.query.authorId
        let category=req.query.category
        let tags= req.query.tags
        let subcategory=req.query.subcategory
        let allBlogs = await BlogModel.find({isdeleted : false,isPublished:true, $or:[{category:category}, {authorId:authorId},{tags: {$all:[tags]}},{subcategory: {$all:[subcategory]}}]})

        console.log(allBlogs)
        if (allBlogs.length > 0) res.status(200).send({ msg: allBlogs, status: true })
        else res.status(404).send({ msg: "No blog found", status: false })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//4.PUT /blogs/:blogId
const updateBlogs = async function (req, res) {

    try {
        //Check if the blogId exists (must have isDeleted false). If it doesn't, return an HTTP status 404
        let Id = req.params.blogId
        let ifExist = await BlogModel.findOne({_id:Id,isDeleted:false})
        if (!ifExist) {
            return res.status(404).send({ status: false, msg: "Not Found" })
        }
        if (ifExist.isDeleted == false) {
            //Updates a blog by changing its publish status i.e. adds publishedAt date and set published to true
            let data = req.body
            data.publishedAt = new Date()
            data.isPublished = true
            let updatedBlog = await BlogModel.findOneAndUpdate({ _id: Id }, data , { new: true })
            console.log(updatedBlog)
            //Also make sure in the response you return the updated blog document.
            return res.send(updatedBlog)
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//5.DELETE /blogs/:blogId

const deleteBlogs = async function (req, res) {
    try {
        let blogId = req.params.blogId;

        if (!blogId) return res.status(400).send({ error: "blogId should be present in params" });
        let blog = await BlogModel.findById(blogId);

        if (!blog) {
            return res.status(404).send("No such blog exists");
        }
        let deletedBlog = await BlogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
        res.send({ status: "Deleted", data: deletedBlog });

    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//6.DELETE /blogs?queryParams
const deleteBlogByQuery = async function (req, res) {
    try {
        const data = req.query
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "No input provided" })
        }
        const deletByQuery = await BlogModel.updateMany(data, { isDeleted: true, deletedAt: new Date() }, { new: true })
        if (!deletByQuery) return res.status(404).send({ status: false, msg: "No such blog found" })
        res.status(200).send({ status: true, msg: deletByQuery })

    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.Blogs = Blogs
module.exports.getBlogsData = getBlogsData
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
module.exports.deleteBlogByQuery = deleteBlogByQuery 


