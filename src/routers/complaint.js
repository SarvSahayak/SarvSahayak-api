const express = require('express')
const mongoose = require('mongoose')
const Complaint = require('../models/complaint')
const auth = require('../middleware/auth')

const router = new express.Router()
const Ngo = require('../models/ngo')
const { response } = require('express')


    const distance =  (lat1, lon1, lat2, lon2, unit='K')=> {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		const radlat1 = Math.PI * lat1/180;
		const radlat2 = Math.PI * lat2/180;
		const theta = lon1-lon2;
		const radtheta = Math.PI * theta/180;
		let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
       
		return dist;
	}
}





router.post('/complaints',auth, async (req, res) => {
    let ngoId=-1;

    try{
      await  Ngo.find({categories: req.body.category})
    .exec((err,response)=>{
        if(err){
            return console.log(err);
        }
        
        // console.log(response);

        let currDist = Number.MAX_VALUE;
        for(let i=0;i<response.length;i++){
        let dis = distance(response[i].lat,response[i].long,req.body.lat,req.body.long);
            if(dis<currDist){
                currDist=dis;
                ngoId=response[i]._id;
            }
        }

        // console.log(currDist);
      if(currDist>50||ngoId===-1){
        //   console.log(currDist);
            return res.status(400).send('No ngo is found')
        }
        
        
        const complaint =   new  Complaint({
        
            ...req.body,
            owner: req.user._id,
            ngo:mongoose.Types.ObjectId(ngoId) 
            
        })
        try {
             complaint.save()
           
            res.status(201).send(complaint)
        } catch (e) {
            res.status(400).send(e)
        }
         
       
    })
    }catch(e){
        res.status(400).send(e);
    }
    




        

 
})

router.get('/complaints', auth,async (req,res) => {
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


    //my work for checking
    // try{
    //     const complaints = await Complaint.find({})
    //     res.send(complaints);
    // }catch(e){
    //     res.status(500).send()
    // }








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