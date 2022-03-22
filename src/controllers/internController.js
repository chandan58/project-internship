const mongoose = require("mongoose")
const internModel = require('../models/internModel')

const CreateIntern = async function (req, res) {
    try {
        let intern = req.body
        let name = req.body.name
        let mobile = req.body.mobile
        let collegeId= req.body.collegeId
        let email = req.body.email

        if (!name) return res.status(400).send({ status: false, msg: "name is required" })
        if (!mobile) return res.status(400).send({ status: false, msg: "mobile is required" })
        if (!collegeId) return res.status(400).send({ status: false, msg: "collegeId is required" })
        if (!email) return res.status(400).send({ status: false, msg: "email is required" })

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }
        if (!(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(mobile))) {
            res.status(400).send({ status: false, message: `phoneNumber should be a valid number` })
            return
        }
        
        const isEmailUsed = await internModel.findOne({ email });
        if (isEmailUsed) {
            return res.status(400).send({
                status: false,
                msg: "email already used "
            })
        }

        const isMobileisUsed = await internModel.findOne({ mobile });
        if (isMobileisUsed) {
            return res.status(400).send({
                status: false,
                msg: "phoneNumber is already used "
            })
        }
        let internCreated = await internModel.create(intern)
        res.status(201).send({ status: true, msg: internCreated })
    } catch (error) {
        res.status(400).send({ status: false, msg: error.message })
    }
}


module.exports.CreateIntern = CreateIntern




