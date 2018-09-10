var express = require('express')
var router = express.Router()

var machine = require('../models/Machine.js')

// Get All
router.get('/', (req, res, next) => {
  machine.find().exec(function(err, payload) {
    if(err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(200)
  })
})

// Create Machine
router.post('/', (req, res, next) => {
  machine.create(req.body, function(err, payload){
    if(err) return next(err)
    //res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(201)
  })
})

// Get by machineId
router.get('/:machineId', (req, res, next) => {
  machine.findById(req.params.machineId, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Update MachineId
router.put('/:machineId', function(req, res, next) {
  machine.findByIdAndUpdate(req.params.machineId, req.body, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Remove
router.delete('/:Id', function(req, res, next) {
  machine.findByIdAndRemove({_id:req.params.Id}, function(err, payload) {
    if(err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

module.exports = router
