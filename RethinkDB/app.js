var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var config = require(__dirname + '/config.js')

var r = require('rethinkdb')

app.use(bodyParser())
app.use(createConnection)

r.connect(config.rethinkdb, function(err, conn){
  if (err) {
    console.log("not Connect Database")
    console.log(err.message)
    process.exit(1)
  }
  r.table('test').run(conn).then(function(err, result) {
    console.log("Ready.. Starting express...")
    startExpress()
  }).error(function(err){
    r.dbCreate(config.rethinkdb.db).run(conn).finally(function () {
      return r.tableCreate('test').run(conn)
    }).then(function (result) {
      console.log("Ready.. Starting express...")
      startExpress()
      conn.close()      
    }).error(function (err) {
      if (err) {
        console.log("not Connect Database")
        console.log(err)
        process.exit(1)
      }
      console.log("Ready.. Starting express...")
      startExpress()
      conn.close()  
    })
  })
})

app.get('/', (req, res, next) => {
  r.table('test').run(req._rdbConn).then(function(cursor) {
    return cursor.toArray()
  }).then(function(result) {
    // for (var i = 0; i <= 500000; i++) {
    //   r.table('test').insert({
    //     "number": i
    //   }).run(req._rdbConn)
    // }
    res.send((result))
  }).error(handleError(res))
  .finally(next)
})

app.post('/insert', (req, res, next) => {
  r.table('test').insert(req.body).run(req._rdbConn).then(function (result) {
    res.send(result)
  }).error(handleError(res))
  .finally(next)
})

function createConnection(req, res, next) {
  r.connect(config.rethinkdb).then(function (conn) {
    req._rdbConn = conn
    next()
  }).error(handleError(res))
}

function closeConnection(req, res, next) {
  req._rdbConn.close()
}

function handleError(res) {
  return function (error) {
    res.send(500, { error: error.message })
  }
}

function startExpress() {
  app.listen(config.express.port)
  console.log('Listening on port '+config.express.port)
}