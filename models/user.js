const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    point:{
        type: Number,
        required: false
    },
    createdTank:[{
        type: Schema.Types.ObjectId,
        ref: 'Tank'
    }]
})

module.exports = mongoose.model('User', userSchema)