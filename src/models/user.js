const mongoose = require('mongoose');
const validator = require('validator')

const User = mongoose.model('User',{

    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required:true,
        lowecase: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid');
            }
        }
   
    },
    password :{
        type: String,
        required: true,
        trim: true,
        // validate(value){
        //     if(value.toLowerCase().includes('password')){
        //         throw new Error('Password canno contain "password')
        //     }
        // }

    },
    title: {
        type: String,
        required: true
    },  
    location:{
        type: String,
        required: true
    },
    mobileNo :{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
        
    }

});


module.exports= User;