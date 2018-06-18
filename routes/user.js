var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var user = require('../models/User.js')

// Get All users
router.get('/', (req, res, next) => {
  user.find(function (err, user) {
    if (err) return next(err)
    res.json(user)
    res.status(200)
  })

})

// Get Single user by ID
router.get('/:id', (req, res, next) => {
  user.findOne(req.params.id, function (err, user) {
    if (err) return next(err)
    res.json(user)
    res.status(200)
  })
})



// Insert User
router.post('/', (req, res, next) => {
  if (typeof req.body.user !== 'string' || typeof req.body.pass !== 'string') {
    console.log(req.body)
    res.send('Not Found Key:user or pass')
    res.status(404).end()
  } else {
    user.create(req.body, function (err, user) {
      if (err) return next(err)
      res.json(user)
      res.status(201)
    })
  }
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
