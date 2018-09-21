var express = require('express')
var router = express.Router()
var axios = require('axios')

const APPID = 'SmartOfficeAt418B'
const APPKEYSECRET = 'cphjkAqedWvJm3W:ZY3NMF8SM7YPpNSsDfTA0WYyq'

const netpieAPI = "https://api.netpie.io/topic/"


// Get All
router.get('/:topic', (req, res, next) => {
  const topic = req.params.topic
  axios.get(netpieAPI + APPID + "/" + topic + "?auth=" + APPKEYSECRET).then(function (payload) {
    res.json(payload.data)
  })
})

module.exports = router