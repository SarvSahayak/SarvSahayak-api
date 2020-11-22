const express = require('express')
const Complaint = require('../models/complaint')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/complaints', auth, async (req, res) => {
    const complaint = new Complaint({
        ...req.body,
        owner: req.user._id
    })

    try {
        await complaint.save()
        res.status(201).send(complaint)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/complaints', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if (req.query.status) {
        match.status = req.query.status
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {
        await req.user.populate({
            path: 'complaints',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip) ,
                sort
            }
    }).execPopulate()
        res.send(req.user.complaints)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/complaints/:id', auth, async (req,res) => {
    const _id = req.params.id

    try {
        const complaint = await Complaint.findOne({ _id, owner: req.user._id })

        if (!complaint){
            return res.status(404).send()
        }

        res.send(complaint)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/complaints/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description','status']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid update'})
    }

    try {
        const complaint = await Complaint.findOne({ _id: req.params.id, owner: req.user._id})
        if (!complaint) {
            return res.status(404).send()
        }
        updates.forEach((update) => complaint[update] = req.body[update])
        await complaint.save()
        res.send(complaint)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/complaints/:id', auth, async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if (!complaint) {
            return res.status(404).send()
        }

        res.send(complaint)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router