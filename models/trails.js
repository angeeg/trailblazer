const mongoose = require('mongoose')

// schema
const trailSchema = new mongoose.Schema({
    name: {type: String, required: true},
    location: {type: String, required: true},
    img: {type: String},
    distance: {type: Number}
})

// model
const Trail = mongoose.model('Trail', trailSchema)

module.exports = Trail 