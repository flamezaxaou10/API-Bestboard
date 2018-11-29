var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  datasource: {type: Object, max: 0 ,require: true},
  userId: { type: String, required: true}
})

module.exports = mongoose.model('datasource', Machine)

