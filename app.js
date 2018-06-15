const express = require('express')
const app = express()
const port = 5582

const users = require('./db')

const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log('Start server at port ' + port + ' >> localhost:' + port)
})

app.get('/', (req, res) => {
  res.send('Hello API Agent')
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', (req, res) => {
  if (typeof req.body.user !== 'string' || typeof req.body.pass !== 'string') {
    res.send('Not Found Key:user or pass')
    res.status(404).end()
  } else {
    console.log(req.body)
    users.push(req.body)
    res.status(201).json(req.body)
  }
})
