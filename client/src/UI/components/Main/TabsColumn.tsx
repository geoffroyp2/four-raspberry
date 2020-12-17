import React from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CurrentTab, setCurrentTab } from "@redux/displayStateReducers/generalDisplaySlice";

const TabsColumn = () => {
  return (
    <div className="h-100 d-flex flex-column">
      <TabElement
        text="Run"
        color={{ normal: "#407a45", selected: "#12751b" }}
        index={0}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Reference"
        color={{ normal: "#625694", selected: "#371f99" }}
        index={1}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Record"
        color={{ normal: "#8a5091", selected: "#8a1a99" }}
        index={2}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement
        text="Piece"
        color={{ normal: "#945050", selected: "#941616" }}
        index={3}
        height={20}
        additionalStyle="border-bottom-0"
      />
      <TabElement text="Formula" color={{ normal: "#bf934d", selected: "#c78214" }} index={4} height={20} />
    </div>
  );
};

export default TabsColumn;

type TabElementProps = {
  text: string;
  color: { normal: string; selected: string };
  index: 0 | 1 | 2 | 3 | 4;
  height: number;
  additionalStyle?: string;
};

const TabElement = ({ text, color, index, height, additionalStyle }: TabElementProps) => {
  const currentTab = useSelector(CurrentTab);
  const dispatch = useDispatch();
  return (
    <Container
      fluid
      className={`m-0 p-1 border border-dark rounded-right shadow ${additionalStyle}`}
      style={{ height: `${height}%`, background: currentTab === index ? color.selected : color.normal }}
      onClick={() => dispatch(setCurrentTab(index))}
    >
      {text}
    </Container>
  );
};
