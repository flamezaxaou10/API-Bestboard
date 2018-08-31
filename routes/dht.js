var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

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

router.get('/', (req, res, next) => {
  dht22.find({}).sort('-_id').limit(2000).exec(function (err, data) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
    res.status(200)
  })
})

// Get Single Lasttime
router.get('/last', (req, res, next) => {
  dht22.findOne({}).sort('-_id').exec(function(err, data) {
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
  })
})

router.post('/', (req, res, next) => {
  dht22.create(req.body, function (err, data) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(data)
    res.status(201)
  })
})

router.get('/:sensorId', (req, res, next) => {
  dht22.find({sensorId:req.params.sensorId})
    .sort('-_id').limit(500).exec(function (err, payload) {
    if (err) return next(err)
    res.header("Access-Control-Allow-Origin", "*")
    res.json(payload)
    res.status(200)
  })
})

module.exports = router
