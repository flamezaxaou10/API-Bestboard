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

// // Get All Datasource by user
// router.get('/:userId', (req, res, next) => {
//   datasource.find({ userId: req.params.userId }, function (err, payload) {
//     if(err) next(err)
//     res.json(payload)
//     res.status(200)
//   })
// })


// Create Datasource
router.post('/', (req, res, next) => {
  datasource.create(req.body, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-datasource', 'new')
    res.json(payload)
    res.status(201)
  })
})

// push Datasource
router.put('/:datasourceId', (req, res, next) => {
  datasource.findByIdAndUpdate(req.params.datasourceId, req.body, function (err, payload) {
      if (err) return next(err)
      req.io.emit('update-datasource', 'update')
      res.json(payload)
      res.status(200)
    })
})


// Remove
router.delete('/:datasourceId', (req, res, next) => {
  datasource.findByIdAndRemove({ 
    _id: req.params.datasourceId }, function (err, payload) {
    if (err) return next(err)
    req.io.emit('update-datasource', 'delete')
    res.json(payload)
    res.status(200)
  })
})

module.exports = router