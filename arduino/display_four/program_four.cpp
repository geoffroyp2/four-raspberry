#include <program_four.h>

void Program::giveValPointers(int *_rxTemp, int *_rxOxy) {
    rxTemp = _rxTemp;
    rxOxy = _rxOxy;
}

// select program and load graph
bool Program::select(byte id) {
    if (started) {
        // Dont reselect before stopping
        return false;
    } else {
        selected = true;
        programId = id;

        //find selected program with id and load it's graph
        SDFile sdFile = sdCardFour.getRefFile(programId);
        loadGraph(sdFile);
        sdFile.close();
        return true;
    }
}

bool Program::start(bool restart) {
    if (!selected) {
        // menu.popUp("Selectionner un programme");
        // Dont start before selecting a program
        return false;
    } else if (started) {
        // toggle pause
        paused = !paused;
        if (paused) {
            pauseStartTime = millis();
        } else {
            pauseTotalTime += pauseCurrentTime;
        }
        menu.setPauseButton(paused);
        // menu.popUp(paused ? "Pause" : "Reprise");
        Serial.println(paused ? "paused" : "unpaused");
        return true;
    } else {
        started = true;
        menu.setPauseButton(paused);
        resetRecordedValues();
        if (!restart)
            programTime = 0; //Reset individually so it's not erased on restart

        lastTime = millis();
        sdCardFour.startLog(programId);
        rom.saveProgramStart(programId);
        startGraph();

        // menu.popUp("Debut de cuisson");
        Serial.println("program started");

        return true;
    }
}

bool Program::stop() {
    if (started) {
        //Reset state
        started = false;
        selected = false;
        paused = false;

        //Write logfile footer
        // menu.popUp("Cuisson finie");
        menu.setPauseButton(true);
        Serial.println("program stopped");
        sdCardFour.stopLog();

        return true;
    } else {
        // nothing happens
        return false;
    }
}

void Program::restartFromLast() {
    uint32_t seconds = 0;
    byte id = 0;
    rom.secondsSinceLastStart(&seconds, &id);

    programTime = seconds * 1000;
    select(id);
    start(true);
}

// Update logged values, need to be called from main loop
void Program::update() {
    if (paused) {
        pauseCurrentTime = millis() - pauseStartTime;
    } else if (started && !paused) {
        // programTime = ((millis() - restartTime) - (pauseTimeWhenPaused ? pauseTotalTime : 0)) * debug_timeMult;
        programTime = programTime + (millis() - lastTime) - pauseTotalTime;
        lastTime = millis();
        calculateTargetTemp();
        logData();
    }
}

//Simple reset
void Program::resetRecordedValues() {
    pauseTotalTime = 0;
    pauseCurrentTime = 0;
    pauseStartTime = 0;
    pointsRecorded = 0;
    nextPointTargetValue = 0;
    targetTemp = 0;
}

void Program::logData() {
    // Trace new point on screen
    if (programTime > nextPointTargetValue * 60000) {
        if (menu.pageSelected == 0)
            Graph::drawAxis();

        menu.rxTempGraph[pointsRecorded] = Point(programTime / 60000, *rxTemp);
        menu.rxOxyGraph[pointsRecorded] = Point(programTime / 60000, *rxOxy);
        pointsRecorded++;

        menu.pages[0].updateGraphParam(graph_rxTemp, pointsRecorded);
        menu.pages[0].updateGraphParam(graph_rxOxy, pointsRecorded);

        menu.pages[0].updateGraphCursors(graph_ref, programTime, targetTemp);
        menu.pages[0].updateGraphCursors(graph_rxTemp, programTime, *rxTemp);
        menu.pages[0].updateGraphCursors(graph_rxOxy, 0, 0); // dont draw any cursor but draw graph

        nextPointTargetValue += minutesBetweenPoints;
    }

    sdCardFour.writeLog(programTime, *rxTemp, *rxOxy);
}

void Program::calculateTargetTemp() {
    byte i = 1; // to avoid accessing -1 index
    for (; i < refGraphPointAmount; i++) {
        if (menu.refGraph[i].x * 60000 > programTime)
            break;
    }
    if (i == refGraphPointAmount - 1) {
        stop();
    }
    float pente = (menu.refGraph[i].y - menu.refGraph[i - 1].y) / (menu.refGraph[i].x - menu.refGraph[i - 1].x);
    float yOrig = menu.refGraph[i].y - (pente * menu.refGraph[i].x);
    targetTemp = (programTime / 60000) * pente + yOrig;
}

void Program::startGraph() {
    for (byte i = 0; i < graphPointAmount; i++) { // erase previous graphs
        menu.rxOxyGraph[i].x = 0;
        menu.rxOxyGraph[i].y = 0;
        menu.rxTempGraph[i].x = 0;
        menu.rxTempGraph[i].y = 0;
    }
    menu.pages[0].updateGraphParam(graph_rxOxy, 0, &cWhite);
    menu.pages[0].updateGraphParam(graph_rxTemp, 0, &cDarkgreen);

    menu.rxTempGraph[pointsRecorded] = Point(0, *rxTemp);
    menu.rxOxyGraph[pointsRecorded] = Point(0, *rxOxy);
    pointsRecorded++;
}

void Program::loadGraph(SDFile inputFile) {
    while (inputFile.read() != '\r') { //description line
    }
    inputFile.read(); // for \n after \r

    String color = "";
    while (inputFile.peek() != '\r') { //color line
        color += (char)inputFile.read();
    }
    inputFile.read(); // \r
    inputFile.read(); // \n

    //Useless for now-------------------
    int linesToRead = 0;
    while (inputFile.peek() != '\r') { // amount of points
        linesToRead = linesToRead * 10 + ((int)inputFile.read() - 48);
    }
    inputFile.read(); // \r
    inputFile.read(); // \n
    //----------------------------------

    for (byte i = 0; i < graphPointAmount; i++) { // erase previous graph
        menu.refGraph[i].x = 0;
        menu.refGraph[i].y = 0;
    }
    refGraphPointAmount = 0;
    byte currentState = 0, currentChar;
    Point currentPoint(0, 0);

    while (inputFile.available()) {
        currentChar = inputFile.read();
        switch (currentState) {
        case 0:
            if (currentChar == 32) // ' '
                currentState = 1;
            else
                currentPoint.x = currentPoint.x * 10 + (currentChar - 48);
            break;
        case 1:
            if (currentChar == 13) // '\r'
                currentState = 2;
            else
                currentPoint.y = currentPoint.y * 10 + (currentChar - 48);
            break;
        case 2:
            menu.refGraph[refGraphPointAmount] = currentPoint;
            currentPoint.x = 0;
            currentPoint.y = 0;
            refGraphPointAmount++;
            currentState = 0;
            break;
        }
    }
    menu.refGraph[refGraphPointAmount] = currentPoint; //last point
    refGraphPointAmount++;

    //update graph infos
    menu.pages[0].updateGraphParam(graph_ref, refGraphPointAmount, getColor(color));
}

Color *Program::getColor(String color) {
    char letter = color.charAt(6);
    switch (letter) {
    case 'B':
        return &cBlue;
    case 'G':
        return &cGreen;
    case 'O':
        return &cOrange;
    case 'R':
        return &cRed;
    default:
        return &cWhite;
    }
}

Program program = Program();