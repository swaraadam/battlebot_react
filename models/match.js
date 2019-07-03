const mongoose = require('mongoose')

const Schema = mongoose.Schema

const matchSchema = new Schema({
    date:{
        type: Date,
        required: true
    },
    winner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    loser:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Match', matchSchema)