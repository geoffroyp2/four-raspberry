#ifndef ROM_four_h
#define ROM_four_h

#include <EEPROM.h>
#include <clock_four.h>

// Adresses : range 0x000 -- 0xFFF

#define startTimeAddress 0x040

class ROMFour {
  public:
    ROMFour(){};
    bool initROM();
    void printROM();
    void saveProgramStart(byte programId);
    void secondsSinceLastStart(uint32_t *seconds, byte *id);

  private:
};

extern ROMFour rom;

#endif