const express = require('express')
const app = express()
const port = 5582

const _ = require("lodash")
const jwt = require('jsonwebtoken')
const passport = require("passport")
const passportJWT = require("passport-jwt")
var ExtractJwt = passportJWT.ExtractJwt
var JwtStrategy = passportJWT.Strategy


const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var user = require('./routes/user')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/project', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log('MongoDB Connection Succesful'))
  .catch((err) => console.error(err))

app.set('view engine', 'html')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// JWT TOKEN
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'ProjectAPI'

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload)
  // usually this would be a database call:
  var user = user[_.findIndex(user, {id: jwt_payload.id})]
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})

passport.use(strategy)
app.use(passport.initialize())

// App Start
app.use('/users', user)

app.listen(port, () => {
  console.log('Start server at port ' + port + ' >> localhost:' + port)
})

app.get('/', (req, res) => {
  res.send('Hello API ')
})
