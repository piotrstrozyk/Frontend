const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nick: {
        type: String,
        required: true       
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    history: {
        type: Array,
        required: true,
        default: []
    },
    role: {
        type: String, 
        required: true,
        default: "guest"
    },
    lastReview: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const user = mongoose.model('User', userSchema, 'users')

module.exports = user