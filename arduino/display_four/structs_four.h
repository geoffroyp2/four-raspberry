#ifndef structs_four_h
#define structs_four_h

#include <UTFT.h>

struct Point {
    int x;
    int y;
    Point() : x(0), y(0) {}
    Point(int _x, int _y) : x(_x), y(_y) {}
};

struct Color {
    byte r;
    byte g;
    byte b;

    Color() : r(0), g(0), b(0) {}
    Color(byte _r, byte _g, byte _b) : r(_r), g(_g), b(_b) {}
    Color operator+(byte offset) {
        return Color((this->r + offset) > 255 ? 255 : this->r + offset,
                     (this->g + offset) > 255 ? 255 : this->g + offset,
                     (this->b + offset) > 255 ? 255 : this->b + offset);
    }
    Color operator-(byte offset) {
        return Color((this->r - offset) >= 0 ? this->r - offset : 0,
                     (this->g - offset) >= 0 ? this->g - offset : 0,
                     (this->b - offset) >= 0 ? this->b - offset : 0);
    }
};

static Color cBlack(0, 0, 0);
static Color cWhite(255, 255, 255);
static Color cRed(255, 0, 0);
static Color cGreen(0, 255, 0);
static Color cBlue(0, 0, 255);
static Color cOrange(255, 200, 40);
static Color cBg(20, 20, 20);
static Color cGrayText(240, 240, 240);
static Color cNavBg(70, 70, 70);
static Color cButtonSelect(70, 70, 240);
static Color cMainZoneSelect(50, 50, 50);
static Color cDarkgreen(0, 190, 30);

#endif