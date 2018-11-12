var express = require('express')
var router = express.Router()

const jwt = require('jsonwebtoken')

var sensors = require('../models/Sensors.js')

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    // Next middleware
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

// Get all
router.get('/', (req, res, next) => {
  sensors.find(function (err, data) {
    if (err) return next(err)
    res.json(data)
    res.status(200)
  })
})

// Get Single Lasttime
router.get('/last/:sensorId', (req, res, next) => {
  sensors.findOne({sensorId:req.params.sensorId}).sort('-_id').exec(function (err, data) {
    res.json(data)
  })
})

// Get by sensorId
router.get('/:sensorId', (req, res, next) => {
  sensors.find({sensorId:req.params.sensorId}, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
    res.status(200)
  })
})

// Insert
router.post('/', (req, res, next) => {
  sensors.create(req.body, function (err, data) {
    if (err) return next(err)
    res.json(data)
    res.status(201)
  })
})

// UPDATE Sensor by Id
router.put('/:id', function(req, res, next) {
  user.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err)
    res.json(req.body)
  })
  res.status(200)
})

// Delete by Id
router.delete('/:id', function(req, res, next) {
  user.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err)
    res.json(user)
  })
  res.status(200)
})

// Delete sensor by sensorId
router.delete('/sensorId/:sensorId', function(req, res, next) {
  user.findOneAndRemove({sensorId:req.params.sensorId}, function (err, payload) {
    if (err) return next(err)
    res.json(payload)
  })
  res.status(200)
})

module.exports = router
