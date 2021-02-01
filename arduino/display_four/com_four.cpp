#include <com_four.h>

bool ComFour::ping() {
    Wire.beginTransmission(slaveAdress);
    Wire.write(mess_ping);
    Wire.endTransmission();

    byte answer = Wire.requestFrom(slaveAdress, 1);
    if (!answer) {
        Serial.println("2e Arduino introuvable");
        return false;
    } else if (Wire.read() == mess_ok) {
        Serial.println("communication etablie");
        return true;
    } else {
        Serial.println("mauvaise réponse");
        return false;
    }
}

bool ComFour::sendValue(byte type, int value) {
    Wire.beginTransmission(slaveAdress);
    Wire.write(type);
    sendData(value);
    Wire.endTransmission();
}

bool ComFour::requestSensorValues(int *temp, int *oxy) {
    Wire.beginTransmission(slaveAdress);
    Wire.write(data_request);
    Wire.endTransmission();
    byte answer = Wire.requestFrom(slaveAdress, 4);
    if (answer) {
        *temp = readData();
        *oxy = readData();
        return true;
    } else {
        Serial.println("valeurs non reçues");
        return false;
    }
}

void ComFour::sendData(int data) {
    Wire.write((byte)(data & 0x00FF));        //lsb
    Wire.write((byte)((data & 0xFF00) >> 8)); //msb
}

int ComFour::readData() {
    int data = 0;
    data += Wire.read();
    data += (Wire.read() << 8);
    return data;
}

ComFour com = ComFour();

// ComFour::ComFour(int rx, int tx) : com(rx, tx) {}
// int ComFour::available() { return com.available(); }
// void ComFour::begin() { com.begin(38400); }

// void ComFour::linkData(byte id, long *data) {
//     switch (id) {
//     case data_time:
//         time = data;
//         break;
//     case data_temp:
//         temperature = data;
//         break;
//     case data_oxy:
//         oxygene = data;
//         break;
//     }
// }

// byte ComFour::read() {
//     byte id = com.read();
//     switch (id) {
//     case data_time:
//         *time = readLong();
//         sendConfirm();
//         break;
//     case data_temp:
//         *temperature = readLong();
//         sendConfirm();
//         break;
//     case data_oxy:
//         *oxygene = readLong();
//         sendConfirm();
//         break;
//     case data_graph:
//         break;
//     case data_startLog:
//         break;
//     default:
//         sendConfirm(data_error);
//         id = data_error;
//         break;
//     }
//     return id;
// }

// void ComFour::sendConfirm(byte message) { com.write(message); }

// bool ComFour::waitConfirm(int maxTime) {
//     // Serial.print("waiting for confimation, exit status: ");
//     unsigned long int t0 = millis(), t1;
//     while (!com.available()) {
//         t1 = millis();
//         if (t1 - t0 > maxTime) {
//             // Serial.println("confirmation timeout");
//             return false;
//         }
//     }
//     byte messageId = com.read();
//     if (messageId != data_ok) {
//         Serial.println("confirmation wrong message, code " + String(messageId));
//         return false;
//     }
//     // Serial.println("success, code " + String(messageId));
//     return true;
// }

// bool ComFour::sendGraph(Point *graph, byte size, byte graphId) {
//     //Send header
//     com.write(data_graph);
//     com.write(graphId);
//     com.write(size);

//     if (!waitConfirm(1000)) //wait a bit longer because memomy allocation needed
//         return false;

//     //Send points
//     for (byte i = 0; i < size; i++) {
//         // Serial.println(String(i));
//         com.write(i);
//         if (!waitConfirm())
//             return false;
//         sendData(graph[i].x);
//         sendData(graph[i].y);
//     }
//     return true;
// }

// void *ComFour::readGraphInfo(byte *outputArray) {
//     com.readBytes(intB, 2);
//     outputArray[0] = intB[0]; //id
//     outputArray[1] = intB[1]; //size
// }

// int ComFour::readLogId() {
//     return readInt();
// }

// void ComFour::wait() {
//     //To synchronize i/o
//     while (!com.available()) {
//     }
// }

// Point *ComFour::readGraph(byte size) {
//     //allocate the new point array on the heap
//     Point *graph = new Point[size];
//     sendConfirm();

//     //Read points
//     for (byte i = 0; i < size; i++) {
//         wait();
//         // Serial.println(String(i));
//         if ((byte)com.read() != i) {
//             sendConfirm(data_error);
//             return nullptr;
//         } else
//             sendConfirm();
//         graph[i].x = readInt();
//         graph[i].y = readInt();
//     }
//     return graph;
// }

// bool ComFour::sendMessage(byte id, long message) {
//     sendId(id);
//     sendData(message);
//     return waitConfirm();
// }

// bool ComFour::sendMessage(byte id, int message) {
//     sendId(id);
//     sendData(message);
//     return waitConfirm();
// }

// long ComFour::readLong() {
//     long result = 0;
//     wait();
//     com.readBytes(longB, 4);
//     for (byte i = 0; i < 4; i++) {
//         result |= (long)(byte)longB[i] << 8 * i;
//     }
//     return result;
// }

// int ComFour::readInt() {
//     int result = 0;
//     wait();
//     com.readBytes(intB, 2);
//     for (byte i = 0; i < 2; i++) {
//         result |= (int)(byte)intB[i] << 8 * i;
//     }
//     return result;
// }

// void ComFour::sendId(byte id) { com.write(id); }
// void ComFour::sendData(long data) {
//     for (byte i = 0; i < 4; i++) {
//         com.write((byte)((data & (long)0xff << 8 * i) >> 8 * i));
//     }
// }
// void ComFour::sendData(int data) {
//     for (byte i = 0; i < 2; i++) {
//         com.write((byte)((data & (int)0xff << 8 * i) >> 8 * i));
//     }
// }