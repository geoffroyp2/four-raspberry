#include <menu_four.h>

void MenuFour::loadingScreen(byte stage, bool result) {
    String success = "...OK !";
    String failed = "...Erreur !";
    result ? lcd.setColor(cDarkgreen.r, cDarkgreen.g, cDarkgreen.b) : lcd.setColor(cRed.r, cRed.g, cRed.b);
    switch (stage) {
    case stage_lcd:
        lcd.setColor(cBg.r, cBg.g, cBg.b);
        lcd.setBackColor(cBg.r, cBg.g, cBg.b);
        lcd.fillRect(0, 0, 799, 479);
        lcd.setColor(cDarkgreen.r, cDarkgreen.g, cDarkgreen.b);
        lcd.print(String("Ecran"), 110, 100);
        lcd.print(success, 410, 100);
        break;
    case stage_com:
        lcd.print(String("2e Arduino"), 110, 130);
        lcd.print(result ? success : failed, 410, 130);
        break;
    case stage_clock:
        lcd.print(String("Horloge"), 110, 160);
        lcd.print(result ? success : failed, 410, 160);
        break;
    case stage_sd:
        lcd.print(String("Carte SD"), 110, 190);
        lcd.print(result ? success : failed, 410, 190);
        break;
    case stage_menu:
        lcd.print(String("Creation du menu"), 110, 220);
        lcd.print(success, 410, 220);
        break;
    case stage_wait:
        lcd.setColor(cWhite.r, cWhite.g, cWhite.b);
        lcd.print(String("Appuyer sur un bouton"), 170, 300);
        break;
    case stage_displayMenu:
        lcd.setColor(cBg.r, cBg.g, cBg.b);
        lcd.setBackColor(cBg.r, cBg.g, cBg.b);
        lcd.fillRect(0, 0, 799, 479);
        pages[0].select(true);
        pages[1].select(false);
        pages[2].select(false);
        pages[3].select(false);
        break;
    }
}

bool MenuFour::createMenu() {

    pages[0] = Page(0, &pageSelectMode, p1Texts, p1Buttons, p1Graphs);
    pages[1] = Page(1, &pageSelectMode, p2Texts, p2Buttons);
    pages[2] = Page(2, &pageSelectMode, p3Texts, p3Buttons);
    pages[3] = Page(3, &pageSelectMode, p4Texts, p4Buttons);

    popUpText = Text(400, 240, &cRed, &cBlack, "", align_center);

    createGraphPage();
    createNavPage();
    createActionPage();

    Serial.println("Menu created");
    return true;
}

void MenuFour::createGraphPage() {
    startButton = Button(1, Zone(565, 655, 371, 461), &cDarkgreen, &cBlack, "Start"); //Start
    pages[0].addButton(&startButton);
    pages[0].addButton(new Button(2, Zone(675, 765, 371, 461), &cRed, &cBlack, "Stop")); //Stop

    pages[0].addText(new Text(110, 370, &cBg, &cGrayText, "Temps de cuisson: "));
    programTimeText = Text(530, 370, &cBg, &cGrayText, formatTime(0), align_right);
    pages[0].addText(&programTimeText);
    pages[0].addText(new Text(110, 394, &cBg, &cGrayText, "Temperature mesuree: "));
    rxTempText = Text(530, 394, &cBg, &cGrayText, "0 C", align_right);
    pages[0].addText(&rxTempText);
    pages[0].addText(new Text(110, 418, &cBg, &cGrayText, "Temperature cible: "));
    targetTempText = Text(530, 418, &cBg, &cGrayText, "0 C", align_right);
    pages[0].addText(&targetTempText);
    pages[0].addText(new Text(110, 442, &cBg, &cGrayText, "Oxygene: "));
    rxOxyText = Text(530, 442, &cBg, &cGrayText, "0%", align_right);
    pages[0].addText(&rxOxyText);

    // Graphs
    pages[0].addGraph(new Graph(&cWhite, &refGraph[0], 0), graph_ref);
    pages[0].addGraph(new Graph(&cWhite, &rxTempGraph[0], 0), graph_rxTemp);
    pages[0].addGraph(new Graph(&cWhite, &rxOxyGraph[0], 0), graph_rxOxy);
}

void MenuFour::createNavPage() {
    // SD files
    if (sdCardFour.initRefFiles()) {
        pages[2].addText(new Text(110, 96, &cBg, &cGrayText, "Courbes de reference :"));
        String name, description;
        while (sdCardFour.getRefFilesInfos(name, description)) {
            pages[2].addButton(new Button(
                100 + amountOfRefFiles,
                Zone(160, 160 + (name.length() + 1) * fontSize, 130 + 32 * amountOfRefFiles, 130 + 32 * amountOfRefFiles + 28),
                &cNavBg,
                &cGrayText,
                name));
            pages[2].addText(new Text(
                450, 138 + 32 * amountOfRefFiles,
                &cBg,
                &cGrayText,
                description));
            amountOfRefFiles++;
            name = "";
            description = "";
        }
    }
}

void MenuFour::createActionPage() {
    String bName = "reprendre la derniere cuisson";
    pages[3].addButton(new Button(200, Zone(160, 160 + (bName.length() + 1) * fontSize, 130, 130 + 28), &cNavBg, &cGrayText, bName));
}

void MenuFour::popUp(String text) {
    popUpTime = millis();
    popUpRunning = true;
    popUpText.update(text);
}

void MenuFour::displayPopUp(unsigned long &time) {
    if (popUpRunning) {
        if (time - popUpTime > 5000) {
            pages[pageSelected].draw();
            popUpRunning = false;
        }
    }
}

void MenuFour::giveValPointers(int *_rxTemp, int *_rxOxy) {
    rxTemp = _rxTemp;
    rxOxy = _rxOxy;
}

void MenuFour::setPauseButton(bool pause) {
    if (!pause) {
        startButton.update("Pause", &cOrange);
    } else {
        startButton.update("Start", &cDarkgreen);
    }
}

void MenuFour::handlePress(byte buttonPressed) {
    if (pageSelectMode) {
        if (buttonPressed == 1 && pageSelected > 0) {
            pages[pageSelected].select(false);
            pages[--pageSelected].select(true);
        } else if (buttonPressed == 2 && pageSelected < 3) {
            pages[pageSelected].select(false);
            pages[++pageSelected].select(true);
        } else if (buttonPressed == 4) {
            if (pages[pageSelected].drawSelected(true))
                pageSelectMode = false;
        }
    } else {
        if (buttonPressed == 1) {
            pages[pageSelected].buttonSelect(-1);
        } else if (buttonPressed == 2) {
            pages[pageSelected].buttonSelect(1);
        } else if (buttonPressed == 4) {
            int buttonClicked = pages[pageSelected].clickSelected();
            buttonClick(buttonClicked);
        } else {
            pages[pageSelected].drawSelected(false);
            pageSelectMode = true;
        }
    }
}

void MenuFour::buttonClick(byte buttonId) {
    if (buttonId == 1) {
        if (!program.start()) {
            // TODO show when program started, start button becomes pause button
            // TODO : show on screen
            Serial.println("select a program first");
        }
    } else if (buttonId == 2) {
        if (program.stop()) {
            //show stop on screen
        } else {
            Serial.println("not running");
        }
    } else if (buttonId > 99 && buttonId < 100 + amountOfRefFiles) {
        if (!program.select(buttonId)) {
            Serial.println("Stop program first");
        } else {
            //Go to graph page
            pages[pageSelected].select(false);
            pageSelected = 0;
            pages[0].select(true);
        }
    } else if (buttonId == 200) {
        program.restartFromLast();
        pages[pageSelected].select(false);
        pageSelected = 0;
        pages[0].select(true);
    }
}

void MenuFour::updateDisplay() {
    if (pageSelected == 0) {
        programTimeText.update(formatTime(program.getTime()));
        rxTempText.update(String(*rxTemp, DEC) + " C");
        targetTempText.update(String(program.getTargetTemp(), DEC) + " C");
        rxOxyText.update(String(*rxOxy, DEC));
    }
}

String MenuFour::formatTime(unsigned long _time) {
    String output = "";
    byte h = (_time / 3600000) % 24;
    byte m = (_time / 60000) % 60;
    byte s = (_time / 1000) % 60;
    output += String(h, DEC);
    output += "h";
    output += String(m, DEC);
    output += "m";
    output += String(s, DEC);
    output += "s";
    return output;
}

MenuFour menu = MenuFour();