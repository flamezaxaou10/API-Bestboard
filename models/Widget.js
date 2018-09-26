var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  machineId: { type: String, required: true },
  widget: {type: Object, max: 0}
})

module.exports = mongoose.model('widget', Machine)