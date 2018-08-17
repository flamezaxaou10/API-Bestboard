const express = require('express')
const app = express()
const port = 5582

const jwt = require('jsonwebtoken')

const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var users = require('./models/User.js')

var user = require('./routes/user')
var exhtml = require('./routes/html')
var dht22 = require('./routes/dht')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/project', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log('MongoDB Connection Succesful'))
  .catch((err) => console.error(err))

app.set('view engine', 'html')
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// App Start
app.use('/users', user)
app.use('/html', exhtml)
app.use('/dht', dht22)

app.listen(port, () => {
  console.log('Start server at port ' + port + ' >> localhost:' + port)
})

app.get('/', (req, res) => {
  res.send('Hello API ')
})

app.post('/login', (req, res) => {
  users.findOne({user:req.body.user, pass:req.body.pass}, function (err, user) {
    if (err) return next(err)
    if (user != null) {
      const authData = {
        id: user.id,
        user: user.user,
        status: user.status
      }
      console.log(authData)
      jwt.sign({authData}, 'secretkey',{ expiresIn: '3h' }, (err, token) => {
        res.json({
          token: token
        })
      })
    } else {
      res.sendStatus(401)
    }
  })
})
