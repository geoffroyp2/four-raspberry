// /*
// Dans URTouchCD.h => valeurs de calibration du touchscreen 7"
// #define CAL_X 0x00164FC7UL
// #define CAL_Y 0x03B880E9UL
// #define CAL_S 0x8031F1DFUL
// */

// #include <URTouch.h>
// #include <UTFT.h>
// #include <SPI.h>
// #include <SD.h>
// #include <Wire.h>
// #include <RTClib.h>
// #include <clock_four.h>
// #include <SDcard_four.h>
// #include <structs_four.h>

#include <define_values.h>
#include <display_four.h>
#include <menu_four.h>
#include <program_four.h>
#include <com_four.h>
#include <ROM_four.h>

UTFT *DisplayElement::lcd = nullptr;

#define button1 19
#define button2 18
#define button3 17
#define button4 16
// #define PWRPin 14

//------------------------------------------------------------------------
// Values
extern uint8_t BigFont[];
int rxTemp = 0, rxOxy = 0;
unsigned long currentTime = 0, lastClickTime = 0, sendTime = 0;
byte bPressed = 0;
//------------------------------------------------------------------------

//Arduino
void setup() {

    Serial.begin(115200);
    for (byte i = button4; i <= button1; i++)
        pinMode(i, INPUT_PULLUP);
    // pinMode(PWRPin, OUTPUT);
    // digitalWrite(PWRPin, HIGH);

    lcd = UTFT(SSD1963_800, 38, 39, 40, 41);
    lcd.InitLCD();
    lcd.clrScr();
    lcd.setFont(BigFont);
    DisplayElement::lcd = &lcd; //A revoir

    menu.loadingScreen(stage_lcd, true);

    com.begin();
    menu.loadingScreen(stage_com, com.ping());
    menu.loadingScreen(stage_clock, clock.initClock());
    menu.loadingScreen(stage_sd, sdCardFour.initSD());
    menu.loadingScreen(stage_menu, menu.createMenu());

    program.giveValPointers(&rxTemp, &rxOxy); // A revoir
    menu.giveValPointers(&rxTemp, &rxOxy);

    menu.loadingScreen(stage_wait, true);
    // rom.printROM();

    while (buttonPressed() == 0) { // wait for input
        ;
    }
    menu.loadingScreen(stage_displayMenu, true);

    lastClickTime = millis();
    sendTime = millis();
}

void loop() {
    currentTime = millis();
    // menu.displayPopUp(currentTime);
    bPressed = buttonPressed();
    if (bPressed && currentTime - lastClickTime > 250) {
        lastClickTime = currentTime;
        menu.handlePress(bPressed);
    }

    if (currentTime - sendTime > 1000) {
        sendTime = currentTime; //update every second
        receiveData();
        sendData();
        program.update();
        menu.updateDisplay();
    }
}

//------------------------------------------------------------------------------------

// Read and return button input
byte buttonPressed() {
    if (digitalRead(button1) == LOW)
        return 1;
    else if (digitalRead(button2) == LOW)
        return 2;
    else if (digitalRead(button3) == LOW)
        return 3;
    else if (digitalRead(button4) == LOW)
        return 4;
    return 0;
}

void sendData() {
    com.sendValue(data_temp, program.getTargetTemp());
}

bool receiveData() {
    return com.requestSensorValues(&rxTemp, &rxOxy);
}
