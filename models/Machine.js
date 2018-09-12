var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  machineName: { type: String, required: true },
  machineType: { type: String },
  widgets: { type: Array }
})

module.exports = mongoose.model('machine', Machine)