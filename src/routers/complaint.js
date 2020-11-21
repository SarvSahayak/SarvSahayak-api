const express = require('express')
const { update } = require('../models/complaint')
const Complaint = require('../models/complaint')
const router = new express.Router()

router.post('/complaints', async (req, res) => {
    const complaint = new Complaint(req.body)

    try {
        await complaint.save()
        res.status(201).send(complaint)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/complaints', async (req,res) => {

    try {
        const complaints = await Complaint.find({})
        res.send(complaints)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/complaints/:id', async (req,res) => {
    const _id = req.params.id

    try {
        const complaint = await Complaint.findById(_id)
        if (!complaint){
            return res.status(404).send()
        }

        res.send(complaint)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/complaints/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid update'})
    }

    try {

        const complaint = await Complaint.findById(req.params.id)
        updates.forEach((update) => complaint[update] = req.body[update])
        await complaint.save()

        // const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true , runValidators: true})

        if (!complaint) {
            return res.status(404).send()
        }

        res.send(complaint)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/complaints/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id)

        if (!complaint) {
            return res.status(404).send()
        }

        res.send(complaint)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router