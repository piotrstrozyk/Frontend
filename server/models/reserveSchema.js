const mongoose = require('mongoose')


const reserveSchema = new mongoose.Schema({
    bookId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    reserveDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    }
})
const reserve = mongoose.model('Reservation', reserveSchema, 'reservations')

module.exports = reserve