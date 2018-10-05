const express = require('express')
const app = express()
const port = 5582
const cors = require('cors')
var http = require('http')
var io = require('socket.io')

var server = http.createServer(app)

const jwt = require('jsonwebtoken')

const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

var users = require('./models/User.js')

var user = require('./routes/user')
var exhtml = require('./routes/html')
var dht22 = require('./routes/dht')
var sensors = require('./routes/sensors')
var board = require('./routes/board')
var widget = require('./routes/widget')
var datasource = require('./routes/datasource')
var netpie = require('./routes/netpie')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://localhost/project', { useMongoClient: true, promiseLibrary: require('bluebird') })
  .then(() => console.log('MongoDB Connection Succesful'))
  .catch((err) => console.error(err))

app.set('view engine', 'html')
app.use(logger('dev'))
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }
  next()
})


io = io(server)
app.use(function(req, res, next) {
  req.io = io
  next()
})
// App Start
app.use(cors())
app.use('/users', user)
app.use('/html', exhtml)
app.use('/dht', dht22)
app.use('/sensor', sensors)
app.use('/board', board)
app.use('/widget', widget)
app.use('/datasource', datasource)
app.use('/netpie', netpie)


io.on('connection', client => {
  console.log('user connected')

  // เมื่อ Client ตัดการเชื่อมต่อ
  client.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(port, () => {
  console.log('Start server at port ' + port + ' >> localhost:' + port)
})

app.get('/', (req, res) => {
  res.send('Project API IoT')
})


app.post('/login', (req, res) => {
  users.findOne({ user: req.body.user, pass: req.body.pass }, function (err, user) {
    if (err) return next(err)
    if (user != null) {
      const authData = {
        id: user.id,
        user: user.user,
        status: user.status
      }
      console.log(authData)
      jwt.sign({ authData }, 'secretkey', { expiresIn: '3h' }, (err, token) => {
        res.json({
          token: token
        })
      })
    } else {
      res.sendStatus(401)
    }
  })
})
