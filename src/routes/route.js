const express = require('express');
const router = express.Router();

const authorController = require('../controllers/AuthorController');
const blogController = require('../controllers/blogController')
const middleware = require('../controllers/middleware')


// Author routes

router.post('/createauthors', authorController.CreateAuthor);
router.post('/Authorlogin', authorController.LoginAuthor);

// Blog routes


 router.post('/createblogs', middleware, blogController.CreateBlog);

 router.get('/getblogs', middleware, blogController.GetBlogList);

 router.put('/updateblogs/:blogId', middleware, blogController.UpdateBlogs);

 router.delete('/deleteblogsbyid/:blogId', middleware, blogController.DeleteBlogById);

 router.delete('/deleteblogbyquery', middleware, blogController.deleteBlogByQuery);


 module.exports = router;