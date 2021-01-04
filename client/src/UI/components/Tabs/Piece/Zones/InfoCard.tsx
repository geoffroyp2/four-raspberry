import React, { useCallback } from "react";
import { Container } from "react-bootstrap";

import { useSelector } from "react-redux";
import {
  CurrentPieceDescription,
  CurrentPieceID,
  CurrentPieceLastUpdate,
  CurrentPieceName,
  CurrentPieceRecords,
  setPieceDescription,
  setPieceName,
} from "@redux/dataReducers/pieceSlice";
import { PieceInfosEditMode } from "@redux/displayStateReducers/pieceDisplaySlice";
import { showLoadTable } from "@reduxStore/UIState";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import NameField from "@UITabs/sharedComponents/Fields/NameField";
import DescriptionField from "@UITabs/sharedComponents/Fields/DescriptionField";
import LastUpdatedField from "@UITabs/sharedComponents/Fields/LastUpdatedField";
import RecordTableField from "@UITabs/sharedComponents/Fields/RecordTableField";

import db from "@db/handler";

const PieceInfoCard = () => {
  const currentPieceID = useSelector(CurrentPieceID);

  const handleRemoveRecord = useCallback(async (id: string) => {
    await db.piece.removeRecord(id);
  }, []);

  return (
    <ScrollZone
      content={
        <Container className="pt-1 pr-2 pl-2 flex-row justify-content-start rounded" style={{ overflow: "hidden" }}>
          <NameField editSelector={PieceInfosEditMode} valueSelector={CurrentPieceName} changeHandler={setPieceName} />
          <DescriptionField
            editSelector={PieceInfosEditMode}
            valueSelector={CurrentPieceDescription}
            changeHandler={setPieceDescription}
          />
          <RecordTableField
            editSelector={PieceInfosEditMode}
            valueSelector={CurrentPieceRecords}
            handleAddRecord={() => showLoadTable("Record")}
            handleRemoveRecord={handleRemoveRecord}
            addButton={currentPieceID !== "default"}
          />
          <LastUpdatedField valueSelector={CurrentPieceLastUpdate} />
        </Container>
      }
    />
  );
};

export default PieceInfoCard;
