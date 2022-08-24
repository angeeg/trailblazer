const express = require('express')
const app = express()
const methodOverride = require('method-override')


// setup access to .env file 
require('dotenv').config()
const PORT = process.env.PORT

// setup mongoose 
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI
mongoose.connect(mongoURI)
mongoose.connection.once('open', () => {
    console.log('connected to mongo 🦍')
})

// middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.listen(PORT, () => {
    `Server running on port ${PORT} 🥾🚶‍♀️⛰🚶`
})