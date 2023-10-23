//DEPENDENCIES

const express = require('express')
const app = express()
const cors = require('cors')


//CONTROLLERS



//Middleware:
app.use(cors())
app.use(express.json())






module.exports = app