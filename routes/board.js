var express = require('express')
var router = express.Router()

var board = require('../models/Board.js')

// Get All
router.get('/', (req, res, next) => {
  board.find().exec(function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Create Board
router.post('/', (req, res, next) => {
  board.create(req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-board', 'new')
    res.json(payload)
    res.status(201)
  })
})

// Get by boardId by user
router.get('/:userId', (req, res, next) => {
  board.find({userId:req.params.userId}, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Update boardId
router.put('/:boardId', (req, res, next) => {
  board.findByIdAndUpdate(req.params.boardId, req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-board', 'update')
    res.json(payload)
    res.status(200)
  })
})

// Remove
router.delete('/:boardId', (req, res, next) => {
  board.findByIdAndRemove({ _id: req.params.boardId }, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-board', 'delete')
    res.json(payload)
    res.status(200)
  })
})


module.exports = router
