const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    content: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    }
})

const comment = mongoose.model('Comment', commentSchema, 'comments')

module.exports = comment