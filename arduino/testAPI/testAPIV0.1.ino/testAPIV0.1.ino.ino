#include "ESP8266WiFi.h"
#include "DHT.h"

const char *ssid = "HASTAG F";
const char *passw = "asdfzxcv";

#define host "192.168.43.219"
#define port 5582
#define DHTPIN 4
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

String response;
float value;
String _str, _res, _t, _h, _f;
float t, h, f;


void setup() {

  Serial.begin(115200);
  WiFi.begin(ssid, passw);

  Serial.print("WiFi connecting..");

  while ((WiFi.status() != WL_CONNECTED)) {
    delay(200);
    Serial.print(".");
  }
 
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("Connected !");
    
  } else {
    Serial.println("Disconnected !");
  }
}

void loop() {
  t = dht.readTemperature();
  f = dht.readTemperature(true);
  h = dht.readHumidity();
  if (isnan(t) || isnan(h)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  Serial.println("Temperature is " + String(t) + " celcuis");
  Serial.println("Temperature is " + String(f) + " fahrenheit");
  Serial.println("Humidity is " + String(h) + " %RH");
  Serial.println("----------------------------------------");
  Serial.println(WriteDHT(t, h, f));
  delay(10);

}

String sayHi() {
  WiFiClient client;
  if (client.connect(host, port)) {
    _str = "GET /dht";
    _str += " HTTP/1.1\r\n";
    _str += "Host: ";
    _str += host;
    _str += ":";
    _str += port;
    _str += "\r\n";
    _str += "Connection: keep-alive\r\n\r\n";

    client.print(_str);

    delay(3000);

    while (client.available()) {
      _res = client.readStringUntil('\r');
    }

    return _res;

  } else {
    //..
  }
}

String WriteDHT (float t, float h, float f) {

  _t = String(t);
  _h = String(h);
  _f = String(f);

  WiFiClient client;
  if (client.connect(host, port)) {
    String postData = "";
    postData += "sensorId=d0001";
    postData += "&attributes.temperature.celsius.value=" + _t;
    postData += "&attributes.humidity.value=" + _h;
    int contentLength = postData.length();
    Serial.println(contentLength);
    _str = "POST /dht/";
    _str += " HTTP/1.1\r\n";
    _str += "Host: ";
    _str += host;
    _str += ":";
    _str += port;
    _str += "\r\n";
    _str += "Content-Type: application/x-www-form-urlencoded\r\n";
    _str += "Content-Length: " + String(contentLength) + "\r\n\r\n";
    _str += postData;
    client.print(_str);
    Serial.println(_str);
    delay(50);
    
    while (client.available()) {
      _res = client.readStringUntil('\r');
    }

    return _res;
  } else {
    //Nothing..
  }
}
