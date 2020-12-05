const express = require('express')
const Ngo = require('../models/ngo')
const auth = require('../middleware/auth1')
const multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()



const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
            return cb(new Error('Please upload an image file'))
        }

        cb( undefined, true)
    }
})

router.post('/ngos',async (req,res)=>{
    const ngo = new Ngo(req.body)

    try{
        await ngo.save()
        const token = await ngo.generateAuthToken()
        res.status(201).send({ngo, token})
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/ngos/login', async (req, res) => {
    try {
        const ngo = await Ngo.findByCredentials(req.body.email, req.body.password)
        const token = await ngo.generateAuthToken()
        res.send({ ngo, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/ngos/logout', auth, async (req, res) => {
    try {
        req.ngo.tokens = req.ngo.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.ngo.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/ngos/logoutAll', auth, async (req, res) => {
    try {
        req.ngo.tokens = []
        await req.ngo.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/ngos/me', auth,async (req,res) =>{
    try{
        const ngo = req.ngo;
        res.send(ngo);
    }catch(e){
        res.send(400).send();
    }
})

router.patch('/ngos/me', auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['password','mobileNo']

    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if(!isValidOperation){
        return res.status(400).send({error: "Invalid updates !"});
    }


    try{
        updates.forEach((update)=> req.ngo[update] = req.body[update])

        await req.ngo.save()

        res.send(req.ngo);
    }catch(e){
        console.log(e);
        res.status(400).send(e);
    }



   
})

router.delete('/ngos/me', auth, async(req,res)=>{
    try{
        req.ngo.remove()        
        res.send(req.ngo);
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
})

router.post('/ngos/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.ngo.avatar = buffer
    await req.ngo.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message })
})

router.delete('/ngos/me/avatar', auth, async (req, res) => {
    req.ngo.avatar = undefined
    await req.ngo.save()
    res.send()
})

router.get('/ngos/:id/avatar', async (req, res) => {
    try {
        const ngo = await Ngo.findById(req.params.id)

        if (!ngo || !ngo.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(ngo.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router