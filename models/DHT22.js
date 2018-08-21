var mongoose = require('mongoose')
var DHT22 = new mongoose.Schema({
  sensorId: { type: String, required: true },
  desired: {
    temperature: {
      celsius: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: 'Celsius' }
      },
      fahrenheit: {
        value: { type: Number, default: 0 },
        unit: { type: String, default: 'Fahreheit' }
      }
    },
    humidity: {
      value: { type: Number, default: 0 },
      unit: { type: String, default: 'Percent' }
    },
    status: { type: String, default: 'disabled' },
    timestamp: { type: Date, default: Date.now }
  },
  name: "Temperature and Humidity",
  description: "Current Temperature and Humidity",
  language: { type: String, default: 'en-US' },
  sensorInfo: {
    type: "Temperature",
    model: "DHT22"
  },
  categories: [
    {
      name: "Temperature"
    },
    {
      name: "Humidity"
    }
  ],
  location: {
    type: "Fixed",
    address: { type: String },
    city: { type: String },
    county: { type: String },
    country: { type: String },
    postalCode: { type: String },
    freeText: { type: String },
    gps: {
      latitude: { type: Number },
      longitude: { type: Number }
    }
  },
  version: { type: String, default: "1.0"}
})

module.exports = mongoose.model('thing', DHT22)
