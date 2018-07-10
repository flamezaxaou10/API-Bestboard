var mongoose = require('mongoose')
var DHT22 = new mongoose.Schema({
  sensorId: { type: String, required: true },
  attributes: {
    temperature: {
      celsius: {
        value: {type: Number, default: 0},
        unit: {type: String, default: 'Celsius'}
      },
      fahrenheit: {
        value: {type: Number, default: 0},
        unit: {type: String, default: 'Fahreheit'}
      }
    },
    humidity: {
      value: {type: Number, default: 0},
      unit: {type: String, default: 'Percent'}
    },
    status: { type: String, default: 'disabled' },
    statusUpdateTime: { type: Date, default: Date.now }
  }
  // metadata: {
  //   type: 'sensor',
  //   title: 'Thermometer and Moisture Meter',
  //   model: 'DHT22',
  //    language: 'en-US',
  //    tag: [
  //     'Tempreture',
  //     'Humidity',
  //     'HeatIndex'
  //   ],
  //   comment: {type: String, default: ''},
	// 	author: 'userId',
	// 	location: {
  //     building: {type: String, default: ''},
  //     floor: {type: String, default: ''},
  //     room: {type: String, default: ''}
  //   },
	// 	description: '',
  //   created: '',
  //   version: 0.1
  // }
  
})

module.exports = mongoose.model('thing', DHT22)
