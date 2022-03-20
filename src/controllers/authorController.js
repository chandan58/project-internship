const AuthorModel = require('../models/AuthorModel')
const jwt = require('jsonwebtoken')

// =======================================Function declared here==========================================

const isValid = function (value) {
  if (typeof value === 'undefined' || value === null)
    return false
  if (typeof value === 'string' && value.trim().length === 0)
    return false
  else
    return true;
}
const isTitleValid = function (title) {
  return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}
const isBodyRequestValid = function (requestBody) {
  return Object.keys(requestBody).length > 0
}
// ======================================================================================================

const CreateAuthor = async function (req, res) {
  try {
    const requestBody = req.body;
    if (!isBodyRequestValid(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
      return
    }
    // Extract params
    const { fname, lname, title, email, password } = requestBody;
    // Validation from here
    if (!isValid(fname)) {
      res.status(400).send({ status: false, message: 'First name required' })
      return
    }
    if (!isValid(lname)) {
      res.status(400).send({ status: false, message: 'Last name required' })
      return
    }
    if (!isValid(title)) {
      res.status(400).send({ status: false, message: 'Title required' })
      return
    }
    if (!isTitleValid(title)) {
      res.status(400).send({ status: false, message: `Title should start from Mr, Mrs, Miss ` })
      return
    }
    if (!isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` })
      return
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      res.status(400).send({ status: false, message: `Email should be a valid email address` })
      return
    }
    if (!isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` })
      return
    }
    const isEmailUsed = await AuthorModel.findOne({ email });

    if (isEmailUsed) {
      res.status(400).send({ status: false, message: `${email} email already registered` })
      return
    }
    // Validation ends
    const authorData = { fname, lname, title, email, password }
    const newAuthor = await AuthorModel.create(authorData);

    res.status(201).send({ status: true, message: `Author created successfully`, data: newAuthor });

  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

// ---------------------------------------------------------------------------------------------------------------

const LoginAuthor = async function (req, res) {
  try {
    const requestBody = req.body;
    const { email, password } = requestBody;

    if (!isBodyRequestValid(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request ,please provide login detail' })
      return
    }

    // Validation begins from here

    if (!isValid(email)) {
      res.status(400).send({ status: false, message: `Email is required` })
      return
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      res.status(400).send({ status: false, message: `Email should be a valid` })
      return
    }

    if (!isValid(password)) {
      res.status(400).send({ status: false, message: `Password is required` })
      return
    }
    // Validation ends

    const author = await AuthorModel.findOne({ email, password });

    if (!author) {
      res.status(401).send({ status: false, message: `Invalid login credentials` });
      return
    }

    const token = await jwt.sign({
      authorId: author._id,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 10 * 60 * 60
    }, 'functionup-thorium')

    res.header('x-api-key', token);
    res.status(200).send({ status: true, message: `Author login successfull`, data: { token } });
  } catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}

module.exports.CreateAuthor = CreateAuthor
module.exports.LoginAuthor = LoginAuthor
