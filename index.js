const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const holders = require('./routers/holders')
const entrys = require('./routers/entrys')
const latops = require('./routers/latops')

const app = express()
app.use(express.json())
app.use("/api/entrys", entrys)
app.use("/api/holders", holders)
app.use("/api/latops", latops)


app.listen(process.env.PORT, () => {
    console.log('servidor escuchando en el puerto' + process.env.PORT);
    mongoose.connect(process.env.CNX_MONGO)
        .then(() => console.log('Connected!'))
        .catch((error) => console.log(error))
})