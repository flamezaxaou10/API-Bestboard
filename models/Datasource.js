var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  machineId: { type: String, required: true },
  datasource: {type: Object, max: 0 ,require: true}
})

module.exports = mongoose.model('datasource', Machine)