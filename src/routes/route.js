const express = require('express');
const router = express.Router();

const collegeController = require('../controllers/collegeController');
const internController = require('../controllers/internController')


//create College
router.post('/createcollege', collegeController.createCollege);
// create Intern
router.post('/createinterns', internController.CreateIntern);
// get CollegeDetails
 router.get('/getcollegedetails', collegeController.GetcollegeDetails);

module.exports = router;