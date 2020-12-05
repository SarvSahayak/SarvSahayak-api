const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const ngoRouter = require('./routers/ngo')
const complaintRouter = require('./routers/complaint')
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res) => {
//     res.status(503).send('Site under mantainance')
// })

app.use(express.json())
app.use(userRouter)
app.use(ngoRouter)
app.use(complaintRouter)

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})