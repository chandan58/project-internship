const collegeModel = require('../models/CollegeModel');
const internModel = require('../models/internModel')

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
    const college = await collegeModel.create(collegeData);

    res.status(201).send({ status: true, message: `College created successfully`, data: college });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}


const GetcollegeDetails = async function (req, res) {

  try {

      let fix = await collegeModel.findOne({ name: req.query.CollegeName, isDeleted : false })
      console.log(fix)
      if (!fix) {
          res.status(400).send({ status: false, msg: " No college found" })
      }
      else {
          let ID = fix._id
          let data = fix
          let interns = await internModel.find({ collegeId: ID, isDeleted: false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
          if (!interns.length > 0) {
              return res.status(400).send({ status: false, msg: "No Interns applied for an internship" })
          }
          else {
              let details = { name: data.name, fullname: data.fullName, logolink: data.logoLink, interests: interns }
              return res.status(200).send({ status: true, data: details })
          }
      }

  }
  catch (error) {
      res.status(500).send(error.message)
  }
}

module.exports.createCollege = createCollege
module.exports.GetcollegeDetails = GetcollegeDetails




