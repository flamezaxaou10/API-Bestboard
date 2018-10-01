var express = require('express')
var router = express.Router()
var datasource = require('../models/Datasource.js')



// Get All
router.get('/', (req, res, next) => {
  datasource.find().exec(function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Get All Widget By machineId
router.get('/:machineId', (req, res, next) => {
  datasource.find({machineId: req.params.machineId}, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Create Widget
router.post('/', (req, res, next) => {
  datasource.create(req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-datasouce', 'new')
    res.json(payload)
    res.status(201)
  })
})

// push Widget
router.put('/:widgetId', (req, res, next) => {
  datasource.findByIdAndUpdate(req.params.widgetId, req.body, function (err, payload) {
      if (err) return next(err)
      req.io.emit('update-datasource', 'update')
      res.json(payload)
      res.status(200)
    })
})


// Remove
router.delete('/:widgetId', (req, res, next) => {
  datasource.findByIdAndRemove({ 
    _id: req.params.widgetId }, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-datasource', 'delete')
    res.json(payload)
    res.status(200)
  })
})

module.exports = router