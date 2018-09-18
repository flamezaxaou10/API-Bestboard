var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  machineId: { type: String, required: true },
  widget: {type: Object}
})

module.exports = mongoose.model('widget', Machine)