var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

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


router.get('/', verifyToken, (req, res, next) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if (err) {
        res.sendStatus(403)
      } else {
        var testhtml = require('../pages/test.html')
        console.log(testhtml)  
        
      }
    })
  })


module.exports = router
