const express = require('express')


 require('./db/mongoose')
const User = require('./models/user') 
const userRouter = require('./routers/user')
const { ObjectID, ObjectId } = require('mongodb');
const { findByIdAndUpdate, update } = require('./models/user');
const app = express()


const port = process.env.PORT||4000;

app.use(express.json());
app.use(userRouter);


app.listen(port,()=>{
    console.log(`App is running up @${port}`);
})

console.log('server is up!!');
