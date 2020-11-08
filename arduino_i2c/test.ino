#include <Wire.h>

void setup() {
    Serial.begin(115200);
    Wire.begin(0x18);
    // Wire.onReceive(receive);
    Wire.onRequest(request);
}

void loop() {
}

uint8_t i = 0;

void request() {
    Serial.println("got request");
    Wire.write(i++);
    if (i == 256) i = 0;
}