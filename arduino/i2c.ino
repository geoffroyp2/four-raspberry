// #include <Wire.h>

// Simple I2C Communication test

// void setup() {
//     Serial.begin(115200);
//     Wire.begin(0x18);
//     // Wire.onReceive(receive);
//     Wire.onRequest(request);
// }

// void loop() {}

// uint8_t i = 0;

// void request() {
//     // Answer with i when requested
//     Wire.write(i++);
//     if (i == 256) i = 0;
// }

#include <SoftwareSerial.h>

SoftwareSerial Serial2(0,1);

void setup() {
    Serial.begin(9600);
    Serial2.begin(9600);
}

void loop() {
    if (Serial2.available()) {
        Serial.println(Serial2.read());
    }
}
