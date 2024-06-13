const express = require('express');
const Subscriber = require('../models/subscriber');
const mongoose = require('mongoose');


const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
});

router.post('/', async(req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        channelSubscribedTo: req.body.channelSubscribedTo
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber);
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
})

//Getting one user
router.get('/:id',validateObjectId, getSubscriber, async (req, res)=>{
    // console.log(subscriber)
    res.json({id:res.subscriber._id , name:res.subscriber.name})
    //Instead of sending just the name field, you can construct an object that includes 
    // both the name and id fields and then send that object as the JSON response.
});


//Update single user
router.patch('/:id',validateObjectId, getSubscriber, async (req,res) => {
    if(req.body.name != null){ 
        res.subscriber.name = req.body.name
    }
    if(req.body.channelSubscribedTo != null){
        res.subscriber.channelSubscribedTo = req.body.channelSubscribedTo
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete single user
router.delete('/:id',validateObjectId, getSubscriber, async(req,res) => {
    try {
        await res.subscriber.deleteOne();
        res.json({ message: 'Deleted Subscriber' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Middleware- to get elements by ID which can be used in other routes

async function getSubscriber (req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        // if (subscriber == null) {
        //     return res.status(404).json({ message : 'Cannot find subscriber' })
        // }
    } catch (err) {
        res.status(500).json({message: err.message});
    }

    res.subscriber = subscriber;
    next()
}

// Middleware to validate ObjectId
function validateObjectId(req, res, next) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ message: `Cann't Find Subscriber !` });
    }
    next();
}

module.exports = router;