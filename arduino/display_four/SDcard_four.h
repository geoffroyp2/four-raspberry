#ifndef SDCard_four_h
#define SDCard_four_h

#include <define_values.h>
#include <SPI.h>
#include <SD.h>
#include <clock_four.h>
#include <menu_four.h>

class SDCard {
  public:
    SDCard(){};

    bool initSD();
    bool initRefFiles();
    bool getRefFilesInfos(String &_name, String &_description);
    SDFile getRefFile(byte programId);
    bool startLog(byte programId);
    bool writeLog(unsigned long programTime, int rxTemp, int rxOxy);
    bool stopLog();

  private:
    SDFile navFolder, navFile, logFile;
    Sd2Card _card;
    SdVolume volume;
    SdFile root;
    String logFileName;
};

extern SDCard sdCardFour;

#endif
