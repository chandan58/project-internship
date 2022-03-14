const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
//const publisherController = require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})



//Project 1
router.post("/createBlog", blogController.Blogs)
router.post("/createAuthor", authorController.createAuthor)
router.get("/getBlogs",blogController.getBlogdata)
router.put("/updateBlogs/:blogId",blogController.updateBlogs)
router.delete("/deleteBlogs/:blogId",blogController.deleteBlogs)

module.exports = router;