const mongoose = require('mongoose')
const validator = require('validator')

const complaintSchema = new mongoose.Schema({
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Ngo'
    }
},{
    timestamps: true
})

const Complaint = mongoose.model('Complaint', complaintSchema)

module.exports = Complaint