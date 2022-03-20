const mongoose = require("mongoose")
const AuthorModel = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true},

    title: {
        type: String,
         enum: ["Mr", "Mrs", "Miss"],
         required:true},

    email: {
        type: String, 
        lowercase:true,
        required: true, 
        unique: true},
        
    password: {
        type: String,
        required: true}

}, { timestamps: true })
module.exports=mongoose.model("AuthorModel",AuthorModel)