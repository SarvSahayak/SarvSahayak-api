const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const complaintRouter = require('./routers/complaint')
const sendMessage = require('./routers/mobileVerify');



const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(complaintRouter)
app.use(sendMessage)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})