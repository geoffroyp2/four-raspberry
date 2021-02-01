#ifndef program_four_h
#define program_four_h

// #include <arduino.h>
// #include <SPI.h>
// #include <SD.h>
#include <define_values.h>
#include <structs_four.h>
#include <display_four.h>
#include <SDcard_four.h>
#include <ROM_four.h>

class Program {
  public:
    Program(){};
    void giveValPointers(int *_rxTemp, int *_rxOxy);

    bool select(byte id);
    bool start(bool restart = false);
    bool stop();
    void update();
    void restartFromLast();

    bool getStarted() { return started; };
    byte getId() { return programId; };
    byte getPointAmount() { return refGraphPointAmount; };
    int getTargetTemp() { return targetTemp; };
    unsigned long getTime() { return programTime; };

  private:
    void resetRecordedValues();
    void startGraph();
    void loadGraph(SDFile inputFile);
    void logData();
    void calculateTargetTemp();
    Color *getColor(String color);

    bool selected = false;
    bool started = false;
    bool paused = false;

    unsigned long programTime = 0, // total program time
        lastTime = 0,              // time of last measurement
        pauseTotalTime = 0,        // total amount of pause time to substract to program time
        pauseStartTime = 0,        // measure at the start of pause
        pauseCurrentTime = 0;      // current measure of pause time
    int *rxTemp, *rxOxy;
    int targetTemp = 0;

    byte programId = 0;
    byte refGraphPointAmount = 0;
    byte pointsRecorded = 0;
    int nextPointTargetValue = 0;
};

extern Program program;

#endif