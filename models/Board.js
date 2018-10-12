var mongoose = require('mongoose')
var Board = new mongoose.Schema({
  boardName: { type: String, required: true },
  colorName: {type: String, default: 'native'}
})

module.exports = mongoose.model('board', Board)