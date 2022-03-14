const BlogModel = require("../models/blogs")
const authorModel = require("../models/authorModel")
//2.POST /blogs
const Blogs = async function (req, res) {
    try {
        let data = req.body
        let authorId = data.authorId
        let author = await authorModel.findById(authorId)
        if (author) {
            let createBlog = await BlogModel.create(data)
            res.status(201).send({ status: true, data: createBlog })
        } else {
            //res.status(400).send({ status: false, msg: `${authorId}is not available,please enter valid authorId` })
            res.status(400).send({ status: false, msg: `BAD REQUEST` })
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

//3.GET /blogs
const getBlogdata = async function (req, res) {
    try {
        let blogerdata = await BlogModel.find({ isDeleted: { $in: ["false"] }, isPublished: { $in: ["true"] } })
        res.status(200).send({ status: true, data: blogerdata });
        if (!blogs) return res.status(404).send({ error: "No such data found" });
        let authorId = req.params.authorId
        let category = req.params.category
        let filterBlogs = await BlogModel.filter({ authorId, category })
        //console.log(filterBlogs)
        // console.log(blogerdata)
        res.status(200).send({ status: true, data: filterBlogs })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }

}

//4
const updateBlogs = async function (req, res) {

    try {

        let Id = req.params.blogId
        let ifExist = await BlogModel.findById(Id)
        if (!ifExist) {
            return res.status(404).send({ status: false, msg: "Not Found" })
        }
        if (ifExist.isDeleted == false) {

            let data = req.body
            data.publishedAt = Date.now()
            data.isPublished = true
            let updatedBlog = await BlogModel.findByIdAndUpdate({ _id: Id }, { $set: data }, { new: true })
            console.log(updatedBlog)
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











module.exports.Blogs = Blogs
module.exports.getBlogdata = getBlogdata
module.exports.updateBlogs = updateBlogs
module.exports.deleteBlogs = deleteBlogs
