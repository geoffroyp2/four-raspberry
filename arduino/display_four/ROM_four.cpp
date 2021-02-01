#include <ROM_four.h>

void ROMFour::printROM() {

    for (int i = 0; i < 4096; i++) {
        if (i % 32 == 0)
            Serial.println("");
        Serial.print(EEPROM.read(i), HEX);
        Serial.print(" ");
    }
    Serial.println("");
}

bool ROMFour::initROM() {
}

union longTime {
    struct {
        byte bArray[4];
    };
    uint32_t full;
};

void ROMFour::saveProgramStart(byte programId) {
    //write start time to memory
    longTime secAmount;
    secAmount.full = clock.now().secondstime();
    Serial.println(secAmount.full, HEX);
    for (byte i = 0; i < 4; i++) {
        EEPROM.write(startTimeAddress + i, secAmount.bArray[i]);
        Serial.println(secAmount.bArray[i], HEX);
    }
    EEPROM.write(startTimeAddress + 4, programId);
}

void ROMFour::secondsSinceLastStart(uint32_t *seconds, byte *id) {
    longTime secAmount;
    for (byte i = 0; i < 4; i++) {
        secAmount.bArray[i] = EEPROM.read(startTimeAddress + i);
        Serial.println(secAmount.bArray[i], HEX);
    }
    Serial.println(secAmount.full, HEX);

    *seconds = clock.now().secondstime() - secAmount.full;
    Serial.println(*seconds, DEC);
    *id = EEPROM.read(startTimeAddress + 4);
}
ROMFour rom = ROMFour();