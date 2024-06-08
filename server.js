require('dotenv').config();
const express = require ('express');
const mongoose = require ('mongoose');

const app = express();

const PORT = process.env.PORT;

mongoose.connect('mongodb://localhost/subscribers');
const db = mongoose.connection
db.on('error',(error)=> console.error(error));
db.once('open',()=> console.log("Connected to Database:"));

app.listen(PORT,()=> {
    console.log(`Hello from server at ${PORT}`);
});



