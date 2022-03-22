const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController');
const internController = require('../controllers/internController')



router.post('/createcollege', collegeController.createCollege);
router.post('/createinterns', internController.CreateIntern);
 router.get('/getcollegedetails', collegeController.getCollegeDetails);

module.exports = router;