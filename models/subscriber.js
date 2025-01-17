const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,

    },
    channelSubscribedTo:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    }
})


module.exports = mongoose.model('Subscriber', subscriberSchema);