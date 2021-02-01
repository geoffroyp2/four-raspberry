#include <display_four.h>

UTFT lcd;

void LCDsetColor(UTFT *lcd, Color *c) { lcd->setColor(c->r, c->g, c->b); }
void LCDsetBackColor(UTFT *lcd, Color *c) { lcd->setBackColor(c->r, c->g, c->b); }

Page::Page()
    : selected(false), id(255), menu() {}

Page::Page(byte _id, bool *pageSelectMode, Text **_textArray, Button **_buttonArray, Graph **_graphArray)
    : selected(false),
      pgSelect(pageSelectMode),
      id(_id + 1),
      mainZonePtr(&mainZone),
      menu(Button(id, Zone{0, menuItemSize - 1, _id * menuItemSize, _id * menuItemSize + menuItemSize - 1},
                  &cRed, &cBlack, String(id))),
      textAmount(0),
      textArray(_textArray),
      buttonAmount(0),
      buttonArray(_buttonArray),
      buttonSelected(0),
      graphAmount(0),
      graphArray(_graphArray) {
    if (id == 1) {
        for (byte i = 0; i < 4; i++) {
            graphArray[i] = new Graph();
        }
    }
}

void Page::select(bool state) {
    selected = state;
    draw();
}

void Page::buttonSelect(int increment) {
    if (increment == 1 && buttonSelected < buttonAmount - 1) {
        buttonArray[buttonSelected]->draw(false);
        buttonArray[++buttonSelected]->draw(true);
    } else if (increment == -1 && buttonSelected > 0) {
        buttonArray[buttonSelected]->draw(false);
        buttonArray[--buttonSelected]->draw(true);
    }
}

int Page::clickSelected() {
    if (buttonAmount > 0)
        return buttonArray[buttonSelected]->click();
    else
        return 0;
}

bool Page::drawSelected(bool newSelectState) {
    if (buttonAmount > 0) {
        buttonArray[buttonSelected]->draw(newSelectState);
        return true;
    } else {
        return false;
    }
}

void Page::updateGraphCursors(byte _id, long time, int value) {
    if (id == 1) {
        graphArray[_id]->updateCursors(time, value, selected);
    }
}

void Page::updateGraphParam(byte _id, byte pointAmount, Color *color) {
    if (id == 1) {
        graphArray[_id]->updateParam(pointAmount, color);
    }
}

void Page::draw() {
    if (selected) {
        menu.draw(true);
        mainZonePtr->draw(cBg);
        for (byte i = 0; i < textAmount; i++) {
            textArray[i]->draw();
        }
        for (byte i = 0; i < buttonAmount; i++) {
            if (!*pgSelect) {
                buttonArray[i]->draw(i == buttonSelected);
            } else {
                buttonArray[i]->draw(false);
            }
        }
        if (id == 1) {
            Graph::drawAxis();
            for (byte i = 0; i < graphAmount; i++) {
                graphArray[i]->draw();
            }
        }
    } else {
        menu.draw(false);
    }
}

void Page::addText(Text *text) {
    textArray[textAmount] = text;
    textAmount++;
}

void Page::addButton(Button *button) {
    buttonArray[buttonAmount] = button;
    buttonAmount++;
}

void Page::addGraph(Graph *graph, byte type) {
    graphArray[type] = graph;
    graphAmount++;
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

Button::Button()
    : z(), t() {}

Button::Button(int _id, Zone _zone, Color *_bgColor, Color *_txtColor, String _text)
    : id(_id), c(_bgColor), z(_zone),
      t(floor((z.x1 + z.x2) / 2) - floor((_text.length() * fontSize) / 2),
        floor((z.y1 + z.y2) / 2) - floor(fontSize / 2),
        _bgColor,
        _txtColor,
        _text) {}

int Button::click() { return id; }

void Button::draw(bool selected) {
    if (selected) {
        z.draw(*c + buttonSelectOffset);
        z.drawOutline(3, cButtonSelect);
    } else {
        z.draw(*c);
    }
    t.draw(selected);
}

void Button::update(String text, Color *color) {
    t.update(text, color);
    c = color;
    draw(true);
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

Text::Text()
    : x(-1), y(-1), t() {}

Text::Text(int _x, int _y, Color *_bgColor, Color *_txtColor, String _text, byte _alignMode)
    : x(_x), y(_y), bc(_bgColor), tc(_txtColor), t(_text), alignMode(_alignMode) {}

void Text::draw(bool selected) {
    lcd->setColor(tc->r, tc->g, tc->b);
    if (selected) {
        Color offsetColor = *bc + buttonSelectOffset;
        lcd->setBackColor(offsetColor.r, offsetColor.g, offsetColor.b);
    } else {
        lcd->setBackColor(bc->r, bc->g, bc->b);
    }
    if (alignMode == align_right) {
        lcd->print(t, x - t.length() * fontSize, y);
    } else if (alignMode == align_center) {
        lcd->print(t, x - t.length() * (fontSize / 2), y);
    } else {
        lcd->print(t, x, y);
    }
}

void Text::update(String text, Color *color) {
    t = text;
    if (color != nullptr) {
        bc = color;
    }
    draw();
}

//------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------

Graph::Graph() : pointAmount(0){};
Graph::Graph(Color *_color, Point *_pointArray, byte _pointAmount)
    : c(_color), pts(_pointArray), pointAmount(_pointAmount), currentX(0), currentY(0) {}

void Graph::updateCursors(long time, int value, bool toDraw) {
    currentX = time / 60000;
    currentY = value;
    if (toDraw) {
        draw();
    }
}

void Graph::updateParam(byte _pointAmount, Color *color) {
    if (color != nullptr) {
        c = color;
    }
    pointAmount = _pointAmount;
}

void Graph::drawAxis() {

    graphZone.draw(cBg);
    LCDsetColor(lcd, &cGrayText);
    LCDsetBackColor(lcd, &cBg);
    lcd->drawLine(graphZone.x1, graphZone.y1, graphZone.x1, graphZone.y2);
    lcd->drawLine(graphZone.x1, graphZone.y2, graphZone.x2, graphZone.y2);

    for (byte i = 1; i < 14; i++) {
        float offset = ((float)i / 13) * (graphZone.ySize());
        lcd->setColor(90, 90, 90);
        lcd->drawLine(graphZone.x1 + 1, graphZone.y2 - offset, graphZone.x2, graphZone.y2 - offset);

        if (i % 2 != 0) {
            LCDsetColor(lcd, &cGrayText);
            lcd->printNumI(i * 100, graphZone.x1 - fontSize * 5, graphZone.y2 - offset - fontSize / 2);
        }
    }
    for (byte i = 1; i < 13; i++) {
        float offset = ((float)i / 12) * (graphZone.xSize());
        lcd->setColor(90, 90, 90);
        lcd->drawLine(graphZone.x1 + offset, graphZone.y2 - 1, graphZone.x1 + offset, graphZone.y1);
        if (i % 2 != 0) {
            LCDsetColor(lcd, &cGrayText);
            lcd->printNumI(i, graphZone.x1 + offset - fontSize / 2, graphZone.y2 + fontSize);
        }
    }
}

void Graph::draw() {
    if (pointAmount > 0) {
        float x, y;
        float lx = (float)graphZone.x1;
        float ly = (float)graphZone.y2 - ((float)pts[0].y / 1300.0f) * (graphZone.ySize());
        LCDsetColor(lcd, c);
        for (byte i = 1; i < pointAmount; i++) {
            x = ((float)pts[i].x / 710.0f) * (graphZone.xSize()) + (float)graphZone.x1;
            y = (float)graphZone.y2 - ((float)pts[i].y / 1300.0f) * (graphZone.ySize());
            lcd->drawLine(lx, ly, x, y);
            lx = x;
            ly = y;
        }

        //Cursors
        Color cursorColors = *c + 100;
        LCDsetColor(lcd, &cursorColors);
        float xOffset = ((float)currentX / 710.0f) * ((float)graphZone.xSize());
        float yOffset = ((float)currentY / 1300.0f) * ((float)graphZone.ySize());
        if (currentX > 0) {
            lcd->drawHLine((float)graphZone.x1 + 1, (float)graphZone.y2 - yOffset, xOffset - 1);
        }
        if (currentY > 0) {
            lcd->drawVLine((float)graphZone.x1 + xOffset, (float)graphZone.y2 - yOffset + 1, yOffset - 1);
        }
    }
}