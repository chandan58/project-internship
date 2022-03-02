const mongoose = require('mongoose');

const PublisherSchema = new mongoose.Schema( {
    name: String,
    headQuarter:String,

}, { timestamps: true });

module.exports = mongoose.model('NewPublisher', PublisherSchema )
