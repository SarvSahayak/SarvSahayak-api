const express = require('express');
const router = new express.Router();
const fast2sms = require('fast-two-sms')
const API_KEY = `WsPwgqVbLZdM7BoX6nm5JuEzitYfxk0Qh2v9NC1U4ORHDAc8ra9oQaVwxPOm4iUZbk2A0j8gMpCtdDBW`

 function generateOTP() { 
          
    var digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
} ;

router.post('/sendMessage',async(req,res)=>{
    const options = {authorization : API_KEY,message  : `Your Otp is ${generateOTP()}` , numbers : [req.body.number]}
    try{
    
    const responce = await  fast2sms.sendMessage(options);
        res.status(200).send(responce);
    
    }catch(e){
        
        res.status(404).send(e);
    }
})

module.exports= router;