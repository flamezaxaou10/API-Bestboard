var mongoose = require('mongoose')
var Userschema = new mongoose.Schema({
  user: { type: String, required: true },
  pass: { type: String, required: true },
  status: { type: String, default: 'Member' } ,
  timeStamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model('user', Userschema)
