#include <SDcard_four.h>

bool SDCard::initSD() {
    if (!SDFileSystem.begin(SDChipSelect)) {
        Serial.println("SD init failed");
        return false;
    } else {
        Serial.println("SD initialized");
        _card.init(SPI_HALF_SPEED, SDChipSelect);
        volume.init(_card);
        root.openRoot(volume);
        root.ls(LS_R | LS_DATE | LS_SIZE);
        root.close();
        return true;
    }
}

bool SDCard::initRefFiles() {
    navFolder = SDFileSystem.open("/ref");
    return navFolder ? true : false;
};

bool SDCard::getRefFilesInfos(String &_name, String &_description) {
    navFile = navFolder.openNextFile();
    if (!navFile)
        return false;
    _name = navFile.name();
    while (navFile.peek() != '\r') {
        _description += (char)navFile.read();
    }
    navFile.close();
    return true;
};

SDFile SDCard::getRefFile(byte programId) {
    navFolder = SDFileSystem.open("/ref");
    for (byte i = 99; i < programId; i++) {
        navFile = navFolder.openNextFile();
    }
    navFolder.close();
    return navFile;
}

bool SDCard::startLog(byte programId) {
    DateTime now = clock.now();
    logFileName = "/log/" + String(now.month()) + String(now.day()) +
                  String(now.hour()) + String(now.minute()) + ".TXT";
    logFile = SDFileSystem.open(logFileName, FILE_WRITE);
    if (logFile) {
        logFile.println("Cuisson commencée le " +
                        String(now.day()) + "/" + String(now.month()) + "/" + String(now.year()) + " à " +
                        String(now.hour()) + ":" + String(now.minute()) + ":" + String(now.second()));
        navFolder = SDFileSystem.open("/ref");
        for (byte i = 99; i < programId; i++) {
            navFile = navFolder.openNextFile();
        }
        logFile.println("courbe de référence : " + String(navFile.name()));
        Serial.println(logFileName + " created");

        navFile.close();
        navFolder.close();
        logFile.close();
        return true;

    } else {
        Serial.println("Cannot create log file");
        return false;
    }
};

bool SDCard::writeLog(unsigned long programTime, int rxTemp, int rxOxy) {
    logFile = SDFileSystem.open(logFileName, FILE_WRITE);
    if (logFile) {
        logFile.println(String(programTime, 10) + " " + String(rxTemp, 10) + " " + String(rxOxy, 10));
        logFile.close();
        return true;
    } else {
        Serial.println("log error");
        return false;
    }
};

bool SDCard::stopLog() {
    logFile = SDFileSystem.open(logFileName, FILE_WRITE);
    if (logFile) {
        logFile.println("-- Cuisson Finie --");
        logFile.close();
        return true;
    } else {
        return false;
    }
}

SDCard sdCardFour = SDCard();