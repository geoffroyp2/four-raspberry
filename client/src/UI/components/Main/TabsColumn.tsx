import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CurrentTab, TabIDType } from "@redux/displayStateReducers/generalDisplaySlice";
import { changeTab } from "@reduxStore/UIState";

const TabsColumn = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <TabElement
        text="Run"
        color={{ normal: "#407a45", selected: "#12751b" }}
        id={"Run"}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Reference"
        color={{ normal: "#625694", selected: "#371f99" }}
        id={"Reference"}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Record"
        color={{ normal: "#8a5091", selected: "#8a1a99" }}
        id={"Record"}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Piece"
        color={{ normal: "#945050", selected: "#941616" }}
        id={"Piece"}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement text="Formula" color={{ normal: "#bf934d", selected: "#c78214" }} id={"Formula"} height={20} />
    </div>
  );
};

export default TabsColumn;

type TabElementProps = {
  text: string;
  color: { normal: string; selected: string };
  id: TabIDType;
  height: number;
  additionalStyle?: string;
};

const TabElement = ({ text, color, id, height, additionalStyle }: TabElementProps) => {
  const currentTab = useSelector(CurrentTab);

  return (
    <Container
      fluid
      className={`m-0 p-1 border border-dark rounded-right shadow ${additionalStyle}`}
      style={{ height: `${height}%`, background: currentTab === id ? color.selected : color.normal }}
      onClick={() => changeTab(id)}
    >
      {text}
    </Container>
  );
};
