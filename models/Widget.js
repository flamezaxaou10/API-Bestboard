var mongoose = require('mongoose')
var Machine = new mongoose.Schema({
  boardId: { type: String, required: true },
  indexMuuri: { tpye: String},
  widget: {type: Object, max: 0}
})

module.exports = mongoose.model('widget', Machine)