import React, { useCallback } from "react";
import { Container } from "react-bootstrap";

import SimpleGraph from "@UITabs/sharedComponents/SimpleGraph";
import {
  CurrentRecordColor,
  CurrentRecordID,
  CurrentRecordPoints,
  CurrentRecordReference,
  memorizeRecord,
} from "@redux/dataReducers/recordSlice";
import { useDispatch, useSelector } from "react-redux";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";
import PointEditButton from "@UITabs/sharedComponents/Buttons/PointEditButton";
import { setRecordPointEditMode } from "@redux/displayStateReducers/recordDisplaySlice";

const RecordGraphPreview = () => {
  const dispatch = useDispatch();
  const currentRecordID = useSelector(CurrentRecordID);
  const currentRecordRef = useSelector(CurrentRecordReference);
  const references = useSelector(dbDataReference);

  const handleEdit = useCallback(() => {
    dispatch(memorizeRecord());
    dispatch(setRecordPointEditMode(true));
  }, [dispatch]);

  return (
    <Container
      fluid
      className="m-0 p-1 pt-2 rounded shadow"
      style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}
    >
      <SimpleGraph
        pointsSelector={CurrentRecordPoints}
        colorSelector={CurrentRecordColor}
        refPoints={currentRecordRef ? references[currentRecordRef].points : null}
      />
      <PointEditButton disabled={currentRecordID === "default"} clickCallback={handleEdit} />
    </Container>
  );
};

export default RecordGraphPreview;
