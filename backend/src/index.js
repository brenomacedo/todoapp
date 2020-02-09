const express = require('express')
const app = express()
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.CONNECT, { useNewUrlParser: true, useFindAndModify: true })


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(routes)


app.listen(process.env.PORT)