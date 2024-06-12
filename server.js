require('dotenv').config();
const express = require ('express');
const mongoose = require ('mongoose');

const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection
db.on('error',(error)=> console.error(error));
// This line sets up an event listener on the db connection object to listen for error events.
//.on('error', ...) is an event listener that listens for errors that may occur during the connection or later while interacting with the database.
//(error) => console.error(error): The callback function that runs when an error event is emitted. 
//It receives an error object and logs it to the console using console.error(). 
//This is important for debugging and understanding connection issues.


db.once('open',()=> console.log("Connected to Database:"));
// This line sets up an event listener on the db connection object to listen for the open event.
// Unlike .on, which can handle multiple events of the same type, .once is used to handle an event only once. 
// It listens for the open event which signifies that the connection to the database was successfully established.

app.use(express.json());

const subscriberRouter = require('./routes/subscribers');

app.use('/subscribers', subscriberRouter);

app.listen(PORT,()=> {
    console.log(`Hello from server at ${PORT}`);
});



