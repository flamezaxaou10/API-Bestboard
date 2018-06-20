var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var user = require('../models/User.js')

const jwt = require('jsonwebtoken')

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if(typeof bearerHeader !== 'undefined') {
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

// Get All users
router.get('/', verifyToken, (req, res, next) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if (err) {
      res.sendStatus(403)
    } else {
      user.find(function (err, user) {
        if (err) return next(err)
        res.json(user)
        res.status(200)
      })
    }
  })
})

// Get Single user by ID
router.get('/:id', (req, res, next) => {
  user.findById(req.params.id, function (err, user) {
    if (err) return next(err)
    res.json(user)
    res.status(200)
  })
})

// Get Single user by USER
router.get('/user/:user', (req, res, next) => {
  user.findOne({user:req.params.user}, function (err, user) {
    if (err) return next(err)
    res.json(user)
    res.status(200)
  })
})

// Insert User
router.post('/', (req, res, next) => {
  user.create(req.body, function (err, user) {
    if (err) return next(err)
    res.json(user)
    res.status(201)
  })
})

// UPDATE User
router.put('/:id', function(req, res, next) {
  user.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err)
    res.json(req.body)
  })
  res.status(200)
})

// Delete user by ID
router.delete('/:id', function(req, res, next) {
  user.findByIdAndRemove(req.params.id, req.body, function (err, user) {
    if (err) return next(err)
    res.json(user)
  })
  res.status(200)
})

// Delete user by user
router.delete('/user/:user', function(req, res, next) {
  user.findOneAndRemove({user:req.params.user}, function (err, user) {
    if (err) return next(err)
    res.json(user)
  })
  res.status(200)
})

module.exports = router
