#ifndef menu_four_h
#define menu_four_h

#include <define_values.h>
#include <display_four.h>
#include <program_four.h>

enum loadingStages : byte {
    stage_lcd,
    stage_com,
    stage_clock,
    stage_sd,
    stage_menu,
    stage_wait,
    stage_displayMenu
};

class MenuFour {
  public:
    MenuFour(){};
    void loadingScreen(byte stage, bool result);
    bool createMenu();
    void handlePress(byte buttonPressed);
    void updateDisplay();
    void giveValPointers(int *_rxTemp, int *_rxOxy);
    void setPauseButton(bool pause);

    void popUp(String text);
    void displayPopUp(unsigned long &time);

    Page pages[4];
    byte pageSelected = 0;
    bool pageSelectMode = true;
    Point refGraph[graphPointAmount], rxTempGraph[graphPointAmount], rxOxyGraph[graphPointAmount];

  private:
    void buttonClick(byte buttonId);
    String formatTime(unsigned long _time);

    void createGraphPage();
    void createNavPage();
    void createActionPage();

    Text *p1Texts[10], *p2Texts[24], *p3Texts[24], *p4Texts[8];
    Button *p1Buttons[4], *p2Buttons[2], *p3Buttons[12], *p4Buttons[6];
    Graph *p1Graphs[3];
    Text programTimeText, rxTempText, targetTempText, rxOxyText;
    Text popUpText;
    Button startButton;

    unsigned long popUpTime;
    bool popUpRunning = false;
    int *rxTemp, *rxOxy;
    byte amountOfRefFiles = 0;
    byte programId = 0;
};

extern MenuFour menu;

#endif