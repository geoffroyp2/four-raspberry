#ifndef display_four_h
#define display_four_h

#include <define_values.h>
#include <UTFT.h>
#include <structs_four.h>

extern UTFT lcd;

enum graphId : byte {
    graph_ref,
    graph_rxTemp,
    graph_rxOxy
};

enum textAlign : byte {
    align_left,
    align_right,
    align_center
};

class DisplayElement {
  public:
    static UTFT *lcd;
};

class Zone : DisplayElement {
  public:
    int x1;
    int x2;
    int y1;
    int y2;

    Zone() : x1(-1), x2(-1), y1(-1), y2(-1) {}
    Zone(int _x1, int _x2, int _y1, int _y2) : x1(_x1), x2(_x2), y1(_y1), y2(_y2) {}

    float xSize() { return x2 - x1; }
    float ySize() { return y2 - y1; }

    bool intersect(int x, int y) {
        return x >= x1 && x <= x2 && y >= y1 && y <= y2;
    }
    void draw(Color c) {
        lcd->setColor(c.r, c.g, c.b);
        lcd->fillRect(x1, y1, x2, y2);
    }
    void drawOutline(byte thickness, Color c) {
        lcd->setColor(c.r, c.g, c.b);
        lcd->fillRect(x1, y1, x1 + thickness, y2); //left
        lcd->fillRect(x2 - thickness, y1, x2, y2); //right
        lcd->fillRect(x1, y1, x2, y1 + thickness); //top
        lcd->fillRect(x1, y2 - thickness, x2, y2); //bottom
    }
};

static Zone mainZone(menuItemSize, 799, 0, 479);
static Zone graphZone(200, 700, 40, 320);

class Graph : public DisplayElement {
  public:
    Graph();
    Graph(Color *_color, Point *_pointArray, byte _pointAmount);

    static void drawAxis();

    void draw();
    void updateCursors(long time, int value, bool toDraw);
    void updateParam(byte _pointAmount, Color *color = nullptr);

  private:
    Point *pts;
    byte pointAmount;
    int currentX, currentY;
    Color *c;
};

class Text : public DisplayElement {
  public:
    Text();
    Text(int _x, int _y, Color *_bgColor, Color *_txtColor, String _text, byte _alignMode = align_left);

    void update(String text, Color *color = nullptr);
    void draw(bool selected = false);

  private:
    int x;
    int y;
    bool alignMode;
    Color *bc;
    Color *tc;
    String t;
};

class Button : public DisplayElement {
  public:
    Button();
    Button(int _id, Zone _zone, Color *_bgColor, Color *_txtColor, String _text);

    int click();
    void draw(bool selected = false);
    void update(String text, Color *color);

  private:
    int id;
    Color *c;
    Zone z;
    Text t;
};

class Page : public DisplayElement {
  public:
    Page();
    Page(byte _id, bool *pageSelectMode, Text **_textArray = nullptr, Button **_buttonArray = nullptr, Graph **_graphArray = nullptr);

    void draw();
    void select(bool state);
    void buttonSelect(int increment);
    bool drawSelected(bool newSelectState);
    int clickSelected();

    void addText(Text *text);
    void addButton(Button *button);
    void addGraph(Graph *graph, byte type);

    void deleteRefGraph();
    void updateGraphCursors(byte _id, long time, int value);
    void updateGraphParam(byte _id, byte pointAmount, Color *color = nullptr);

  private:
    bool *pgSelect;
    bool selected;
    Zone *mainZonePtr;
    byte id;
    Button menu;
    Text **textArray;
    byte textAmount;
    Button **buttonArray;
    byte buttonAmount;
    byte buttonSelected;
    Graph **graphArray;
    byte graphAmount;
};

#endif