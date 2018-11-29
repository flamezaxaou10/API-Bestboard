var mongoose = require('mongoose')
var Board = new mongoose.Schema({
  boardName: { type: String, required: true },
  colorName: {type: String, default: 'native'},
  notiSetting: {type: Object},
  userId: {type: String, required: true}
})

module.exports = mongoose.model('board', Board)