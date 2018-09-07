var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  machineId: {type: String, required: true},
  machineName: { type: String, required: true },
  machineType: { type: String }
})

module.exports = mongoose.model('machine', Machine)