const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tankSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    logic:{
        type: String,
        required: true
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    followingMatch:{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }
})

module.exports = mongoose.model('Tank', tankSchema)