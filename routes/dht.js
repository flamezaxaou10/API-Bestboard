var express = require('express')
var router = express.Router()

const jwt = require('jsonwebtoken')

var dht22 = require('../models/DHT22.js')

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

// Get All
router.get('/', (req, res, next) => {
  dht22.find({}).sort('-_id').limit(2000).exec(function (err, payload) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(200)
  })
})

// Get Single Lasttime
router.get('/last', (req, res, next) => {
  dht22.findOne({}).sort('-_id').exec(function (err, payload) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(200)
  })
})

// Get Follow SensorId
router.get('/:sensorId', (req, res, next) => {
  dht22.find({ sensorId: req.params.sensorId })
    .sort('-timestamp').limit(1500).exec(function (err, payload) {
      if (err) return next(err)
      res.header("Access-Control-Allow-Origin", "*")
      res.json(payload)
      res.status(200)
    })
})

router.post('/', (req, res, next) => {
  dht22.create(req.body, function (err, payload) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(201)
  })
})

// Get last 24 hr
router.get('/last24hr/:sensorId', (req, res, next) => {
  dht22.find({
    timestamp: { $gt: new Date((Date.now() - 24 * 60 * 60 * 1000) * 1) },
    sensorId: req.params.sensorId
  }).sort('-timestamp').exec(function (err, payload) {
    if (err) return next(err)
    var data = []
    payload.forEach(function (element, index) {
      if (index % 10 === 2) {
        data.push(element)
      }
    })
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
    res.status(200)
  })
})

// Get last 7 days
router.get('/last7days/:sensorId', (req, res, next) => {
  dht22.find({
    timestamp: { $gt: new Date(Date.now() - (24 * 60 * 60 * 1000) * 7) },
    sensorId: req.params.sensorId
  }).sort('-timestamp').exec(function (err, payload) {
    if (err) return next(err)
    var data = []
    payload.forEach(function (element, index) {
      if (index % 10 === 2) {
        data.push(element)
      }
    })
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
    res.status(200)
  })
})

// Get last 30 days
router.get('/filterChart/:sensorId', (req, res, next) => {
  dht22.find({
    timestamp: { $gt: new Date(Date.now() - (24 * 60 * 60 * 1000) * 7) },
    sensorId: req.params.sensorId
  }).sort('-timestamp').exec(function (err, payload) {
    if (err) return next(err)
    var data = []
    var hour = []
    var day = []
    var week = []
    payload.forEach(function (element, index) {
      if (index % 10 === 2) {
        week.push(element)
        if (element.timestamp >= new Date(Date.now() - (24 * 60 * 60 * 1000))) {
          day.push(element)
        }
      }
      if (element.timestamp >= new Date(Date.now() - (60 * 60 * 1000))) {
        hour.push(element)
      }
    })
    data.push(week)
    data.push(day)
    data.push(hour)
    
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
    res.status(200)
  })
})

module.exports = router
