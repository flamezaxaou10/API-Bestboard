var mongoose = require('mongoose')
var Sensors = new mongoose.Schema({
  sensorId: { type: String, required: true },
  desired: { type: Object, required: true },
  status: { type: String, default: 'enabled' },
  timestamp: { type: Date, default: Date.now },
  metadata: {
    thingId: { type: String, required: true },
    name: { type: String, required: true},
    description: { type: String },
    language: { type: String, default: 'en-US' },
    sensorInfo: {
      type: { type: String, required: true },
      model: { type: String, required: true }
    },
    categories: [{ type: Object }],
    location: {
      type: { type: String, default: 'Fixed' },
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
    version: { type: String, default: '0.1' }
  }
})

module.exports = mongoose.model('sensor', Sensors)
