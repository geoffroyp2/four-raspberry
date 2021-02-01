#ifndef com_four_h
#define com_four_h

// #include <SoftwareSerial.h>
// #include <structs_four.h>
// #include <program_four.h>
#include <Arduino.h>
#include <define_values.h>
#include <Wire.h>

enum dataId : byte {
    mess_error = 10,
    mess_ok,
    mess_ping,
    data_request,
    data_temp,
    com_manual,
    com_auto,
    com_stop,
    com_openValve,
    com_closeValve
};
class ComFour {
  public:
    ComFour(){};
    void begin() { Wire.begin(); };
    bool ping();
    bool sendValue(byte type, int value);
    bool requestSensorValues(int *temp, int *oxy);

  private:
    void sendData(int data);
    int readData();
};

extern ComFour com;

#endif