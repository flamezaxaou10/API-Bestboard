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

// LOGIN
router.post("/login", function(req, res) {
  if(req.body.name && req.body.password){
    var user = req.body.user
    var pass = req.body.pass
  }
  // usually this would be a database call:
  var user = user[_.findIndex(user, {user: user})]
  if( ! user ){
    res.status(401).json({message:"no such user found"})
  }

  if(user.pass === req.body.pass) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {
      id: user.id,
      name: user.name,
      status: user.status
    }
    var token = jwt.sign(payload, jwtOptions.secretOrKey, jwtOptions.jsonWebTokenOptions)
    res.json({message: "ok", token: token})
  } else {
    res.status(401).json({message:"passwords did not match"})
  }
})

router.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json({message: "Success! You can not see this without a token"})
})

module.exports = router
