const mongoose = require('mongoose')

var PersonSchema = new mongoose.Schema({
    name: String,
    salary: Number,
    approved: Boolean
})

var Person = mongoose.model('Person', PersonSchema)

// Export module
module.exports = Person