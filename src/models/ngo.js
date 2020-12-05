const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Complaint = require('../models/complaint')

const ngoSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required:true,
        trim: true,
        lowecase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
   
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        validate(value) {
            if (value.toLowerCase().includes('password')){
                throw new Error('Password can\'t contain "password"')
            }
        }
    },
    mobileNo: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
        
    }, 
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    categories: [{
        
            type: Number,
            required: true
        
    }],
    lat :{
        type : Number,
        required: true
    },
    long :{
        type: Number,
        required: true
    },
    avatar: {
        type: Buffer
    }

}, {
    timestamps: true
})

ngoSchema.virtual('complaints', {
    ref: 'Complaint',
    localField: '_id',
    foreignField: 'ngo'
})

ngoSchema.methods.toJSON = function () {
    const ngo = this
    const ngoObject = ngo.toObject()
    delete ngoObject.password
    delete ngoObject.tokens
    delete ngoObject.avatar

    return ngoObject
}
ngoSchema.methods.generateAuthToken = async function () {
    const ngo = this
    const token = jwt.sign({ _id: ngo._id.toString() }, process.env.JWT_SECRET)

    ngo.tokens = ngo.tokens.concat({ token })
    await ngo.save()

    return token
}

ngoSchema.statics.findByCredentials = async (email, password) => {
    const ngo = await Ngo.findOne({ email })

    if (!ngo){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, ngo.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return ngo
}

// Hash the plain password before saving
ngoSchema.pre('save', async function (next) {
    const ngo = this

    if (ngo.isModified('password')) {
        ngo.password = await bcrypt.hash(ngo.password, 8)
    }

    next()
})

// Delete complaint before ngo delete

ngoSchema.pre('remove', async function (next) {
    const ngo = this
    await Complaint.deleteMany({ owner: ngo._id })
    next()
})

const Ngo = mongoose.model('Ngo',ngoSchema)


module.exports= Ngo