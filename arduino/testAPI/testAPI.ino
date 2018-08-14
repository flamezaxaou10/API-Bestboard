#include "ESP8266WiFi.h"
#include "DHT.h"
#include "RestClient.h"
#include <Ethernet.h>
#include <SPI.h>

const char *ssid = "HASTAG F";
const char *passw = "asdfzxcv";

#define host "192.168.43.219"
#define port 5582
#define DHTPIN 2
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

RestClient client = RestClient("arduino-http-lib-test.herokuapp.com");

String response;
float value;
String _str, _res, _t, _h;
float t, h;


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
    client.dhcp();
  } else {
    Serial.println("Disconnected !");
  }
}

void loop() {
  sayHi();
  t = dht.readTemperature();
  h = dht.readHumidity();
  if (isnan(t) || isnan(h)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  Serial.println("Temperature is " + String(t) + " celcuis");
  Serial.println("Humidity is " + String(h) + " %RH");
  Serial.println("----------------------------------------");
  WriteDHT(t, h);
  delay(5000);

}

String sayHi() {
  response = "";
  int statusCode = client.get("/dht", &response);
  Serial.print("Status code from server: ");
  Serial.println(statusCode);
  Serial.print("Response body from server: ");
  Serial.println(response);
  return String(statusCode);
}

String WriteDHT (float t, float h) {

  _t = String(t);
  _h = String(h);

  String response = "";
  const char* postData = "sensorId=d0001";

  int statusCode = client.post("/dht", postData, &response);

}
