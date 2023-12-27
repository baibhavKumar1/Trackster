const express= require('express');
const connection = require('./db');
const UserRouter = require('./Routes/user.route');
const EventRouter = require('./Routes/event.route');
const cors = require('cors')
const app= express();
app.use(cors());
app.use(express.json());
app.use("/user",UserRouter);
app.use("/event",EventRouter)

app.listen(3000,async()=>{
    try{
        await connection;
    console.log("Connected")
    }
    catch(err){
        console.log(err.message)
    }
    console.log("running on 3000")
})