import React from "react";
import { useSelector } from "react-redux";

import { CurrentTab } from "@redux/displayStateReducers/generalDisplaySlice";

import TabsColumn from "./TabsColumn";
import NavButtons from "./NavButtons";

import RunTab from "@UITabs/Run/RunTab";
import ReferenceTab from "@UITabs/Reference/ReferenceTab";
import RecordTab from "@UITabs/Record/RecordTab";
import PieceTab from "@UITabs/Piece/PieceTab";
import FormulaTab from "@UITabs/Formula/FormulaTab";
import { Col } from "react-bootstrap";

const tabs = [<RunTab />, <ReferenceTab />, <RecordTab />, <PieceTab />, <FormulaTab />];

const MainZone = () => {
  const currentTab = useSelector(CurrentTab);

  return (
    <div className="d-flex h-100">
      <Col className="col-1 d-flex justify-content-between flex-column p-0">
        <TabsColumn />
        <NavButtons />
      </Col>
      <Col className="p-0 pl-1 m-0">{tabs[currentTab]}</Col>
    </div>
  );
};

export default MainZone;
