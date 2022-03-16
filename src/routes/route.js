const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const blogController = require("../controllers/blogController")
const middleware = require("../middleware/auth.js");


//Project 1
router.post("/createAuthors", authorController.createAuthor)
router.post("/loginAuthor", authorController.loginAuthor)

// PHASE 1
router.post("/createBlog", blogController.Blogs);
router.post("/createAuthor", authorController.createAuthor)
router.get("/getBlogs", blogController.getBlogsData)
router.put("/updateBlogs/:blogId", blogController.updateBlogs)
router.delete("/deleteBlogs/:blogId", blogController.deleteBlogs)
router.delete("/deleteBlogs", blogController.deleteBlogByQuery)

// PHASE 2
// AUTHENTICATION
router.post("/createBlog", middleware.authenticate, blogController.Blogs);
router.post("/createAuthor", authorController.createAuthor)
router.get("/getBlogs", middleware.authenticate, blogController.getBlogsData)
router.put("/updateBlogs/:blogId", middleware.authenticate, blogController.updateBlogs)
router.delete("/deleteBlogs/:blogId", middleware.authenticate, blogController.deleteBlogs)
router.delete("/deleteBlogs", middleware.authenticate, blogController.deleteBlogByQuery)

// AUTHORISATION
router.put("/updateBlogs/:blogId", middleware.authenticate, middleware.authorisation, blogController.updateBlogs)
router.delete("/deleteBlogs/:blogId", middleware.authenticate, middleware.authorisation, blogController.deleteBlogs)
router.delete("/deleteBlogs", middleware.authenticate,middleware.authorisation, blogController.deleteBlogByQuery)

module.exports = router;