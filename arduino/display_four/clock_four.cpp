#include <clock_four.h>

bool Clock::initClock() {
    if (!_clock.begin()) {
        Serial.println("Couldn't find Clock");
        return false;
    } else {
        Serial.println("Clock initialized");
        if (!_clock.isrunning()) {
            Serial.println("Clock lost power need to reset time!");
        } else {
            DateTime now = _clock.now();
            Serial.println(String(now.year()) + "/" + String(now.month()) + "/" + String(now.day()) + " - " +
                           String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second()));
        }
        return true;
    }
};

Clock clock = Clock();