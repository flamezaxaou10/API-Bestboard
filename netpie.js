var Microgear = require('microgear')
const axios = require('axios');

const server = 'http://172.18.42.222:5582'

const APPID = 'SmartOfficeAt418B'
const APPKEY = 'cphjkAqedWvJm3W'
const APPSECRET = 'ZY3NMF8SM7YPpNSsDfTA0WYyq'

var microgear = Microgear.create({
  key: APPKEY,
  secret: APPSECRET,
  alias: "addToMongoDB"         /*  optional  */
})

microgear.on('message', function (topic, msg) {
  var topicAr = topic.split("/")
  var msgStr = msg + ''
  console.log(topicAr[2])
  if (!topicAr[2].search("table")) {
    var msgi = msgStr.split(",")
    axios.post(server + '/dht', {
      sensorId : topicAr[2],
      desired: {
        temperature: {
          celsius: {
            value: msgi[1]
          },
          fahrenheit: {
            value: (msgi[1] * 1.8) + 32
          }
        },
        humidity: {
          value: msgi[0]
        }
      },
      status: "enabled",
      location: {
        address: "NECTEC ,NSTDA",
        city: "Khlong Luang",
        county: "Pathumthani",
        country: "Thailand",
        postalCode: "12120",
        freeText: "Build 12, Floor 4, Room 418B"
      }
    }).then(function (res) {
      console.log(res)
    }).catch (function (error) {
      console.log(error)
    })
  }
})
microgear.on('connected', function () {
  microgear.subscribe("/#")
  /*microgear.subscribe("/table1") 
  microgear.subscribe("/table2")
  microgear.subscribe("/table3")
  microgear.subscribe("/table4")
  microgear.subscribe("/table5")
  microgear.subscribe("/table6") 
  microgear.subscribe("/state1")
  microgear.subscribe("/countPeople")
  microgear.subscribe("/roomquality1")*/

  //microgear.setAlias('htmlgear')    /* alias can be renamed anytime with this function */
  /*setInterval(function() {
      microgear.chat("htmlgear","Hello from myself at "+Date.now())
  },5000)*/
})

microgear.on('present', function (event) {
  //console.log(event)
})

microgear.on('absent', function (event) {
  console.log(event)
})

//microgear.subscribe("/SmartOfficeAt418B/Table1_ESP")
microgear.connect(APPID)