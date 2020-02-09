const mongoose = require('mongoose')

const Todo = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Todo', Todo)