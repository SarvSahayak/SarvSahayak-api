const mongoose = require('mongoose')
const validator = require('validator')

const Complaint = mongoose.model('Complaint', {
    description: {
        type: String,
        trim: true,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 00
    }, 
    time: {
        type: String
    
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    }, 
    long: {
        type: Number,
        required: true
    }
})

module.exports = Complaint