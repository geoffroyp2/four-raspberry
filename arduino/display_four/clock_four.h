#ifndef clock_four_h
#define clock_four_h

#include <Wire.h>
#include <RTClib.h>

class Clock {
  public:
    Clock(){};

    bool initClock();
    DateTime now() { return _clock.now(); };

  private:
    RTC_DS1307 _clock;
};

extern Clock clock;

#endif