const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const InternSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        unique: true,
    },

    collegeId: {
        type:ObjectId,
        ref: "college"
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },


    isDeleted: {
        type: Boolean,
        default: false
    },

}, { timestamps: true });
module.exports = mongoose.model('interns', InternSchema)



