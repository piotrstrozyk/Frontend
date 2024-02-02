const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    publishingYear: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array, 
        default: []
    },
    status: {
        type: String,
        required: true,
        default: "available"
    }
})

const book = mongoose.model('Book', bookSchema, 'books')

module.exports = book