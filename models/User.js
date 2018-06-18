var mongoose = require('mongoose')
var Userchema = new mongoose.Schema({
  user: String,
  pass: String,
  status: String
})
module.exports = mongoose.model('user', Userchema)
