const mongoose = require('mongoose')
const express = require('express')
const Routes = express.Router()
const Todo = require('./Models/Todo/Todo')

Routes.post('/list', async (req, res) => {
    const Post = await Todo.create({
        title: req.body.title,
        description: req.body.description
    })

    return res.json(Post)
})

Routes.delete('/list/:id', async (req, res) => {
    const Post = await Todo.findByIdAndDelete(req.params.id)
    return res.json({})
})

Routes.put('/list/:id', async (req, res) => {
    const Put = await Todo.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description
    }, { new: true })

    return res.json(Put)
})

Routes.get('/list', async (req, res) => {
    const Get = await Todo.find({
        description: new RegExp(req.query.description)
    }, null, {
        sort: { createdAt: -1 }
    })

    return res.json(Get)
})

module.exports = Routes