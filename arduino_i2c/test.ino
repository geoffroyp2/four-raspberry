#include <Wire.h>

// Simple I2C Communication test

void setup() {
    Serial.begin(115200);
    Wire.begin(0x18);
    // Wire.onReceive(receive);
    Wire.onRequest(request);
}

void loop() {}

uint8_t i = 0;

void request() {
    // Answer with i when requested
    Wire.write(i++);
    if (i == 256) i = 0;
}