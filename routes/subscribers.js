const express = require('express');
const Subscriber = require('../models/subscriber');

const router = express.Router();

router.get('/', async (req, res)=>{
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers);
    } catch (error) {
        res.status(500).json({ message: err.message})
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
        res.status(400).json({ message: err.message});
    }
})

router.post('/:id',(req, res) => {
    
})

router.patch('/:id',(req,res) => {
    
})

router.delete('/:id', async(req,res) => {

})

module.exports = router;