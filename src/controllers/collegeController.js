const collegeModel = require('../models/CollegeModel');
const CollegeModel = require('../models/CollegeModel')

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null)
    return false
  if (typeof value === 'string' && value.trim().length === 0)
    return false
  else
    return true;
}
const isBodyRequestValid = function (requestBody) {
  return Object.keys(requestBody).length > 0
}


const createCollege = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isBodyRequestValid(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide college details' })
      return
    }
    const { name, fullName, logoLink } = requestBody;
    if (!isValid(name)) {
      res.status(400).send({ status: false, message: 'name is required' })
      return
    }
    if (!isValid(fullName)) {
      res.status(400).send({ status: false, message: ' fullName is required' })
      return
    }
    if (!isValid(logoLink)) {
      res.status(400).send({ status: false, message: 'LogoLink is required' })
      return
    }


    const collegeData = { name, fullName, logoLink }
    const college = await CollegeModel.create(collegeData);

    res.status(201).send({ status: true, message: `College created successfully`, data: college });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}


const getCollegeDetails = async function (req, res) {
  try {
   let collegeName = req.query.collegeName
   if(!collegeName){ return res.status(400).send({status:false,error:"please provide collegeName in quiry"})}
   let requestedCollege = await collegeModel.findOne({name : collegeName})
   if(!requestedCollege){ return res.status(400).send({status:false,error:"no college found"})}
   let availableInterns = await collegeModel.find({collegeId:requestedCollege._id})

   let result = {name:requestedCollege.name, fullName:requestedCollege.fullName, logoLink: requestedCollege.logoLink}

   if(availableInterns.length >0){
     result["interests"] =  availableInterns 
     return res.status(200).send({ data : result })
   }
   
   if(availableInterns.length >0){
    result["interests"] =  "No interests found" 
    return res.status(200).send({data : result })
  }
   
  } catch (error) {
    res.status(500).send({ error: error.message })
  }
}

module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails




