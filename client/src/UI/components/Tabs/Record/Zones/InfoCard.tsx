import React, { useCallback } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  CurrentRecordID,
  CurrentRecordColor,
  CurrentRecordDate,
  CurrentRecordDescription,
  CurrentRecordName,
  CurrentRecordReference,
  setRecordColor,
  setRecordDate,
  setRecordDescription,
  setRecordName,
  CurrentRecordLastUpdate,
} from "@redux/dataReducers/recordSlice";
import { RecordInfosEditMode } from "@redux/displayStateReducers/recordDisplaySlice";
import { setLoadTableContent, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import NameField from "@UITabs/sharedComponents/Fields/NameField";
import ReferenceField from "@UITabs/sharedComponents/Fields/ReferenceField";
import DateField from "@UITabs/sharedComponents/Fields/DateField";
import GraphColorField from "@UITabs/sharedComponents/Fields/GraphColorField";
import DescriptionField from "@UITabs/sharedComponents/Fields/DescriptionField";
import LastUpdatedField from "@UITabs/sharedComponents/Fields/LastUpdatedField";

const RecordInfoCard = () => {
  const dispatch = useDispatch();
  const currentRecordID = useSelector(CurrentRecordID);

  const handleReferenceSelect = useCallback(() => {
    // show reference select table if a record is selected
    if (currentRecordID !== "default") {
      dispatch(setLoadTableContent("Reference"));
      dispatch(setLoadTableShow(true));
    }
  }, [dispatch, currentRecordID]);

  return (
    <ScrollZone
      content={
        <Container className="pt-1 pr-2 pl-2 flex-row justify-content-start rounded" style={{ overflow: "hidden" }}>
          <NameField editSelector={RecordInfosEditMode} valueSelector={CurrentRecordName} changeHandler={setRecordName} />
          <ReferenceField
            editSelector={RecordInfosEditMode}
            valueSelector={CurrentRecordReference}
            selectHandler={handleReferenceSelect}
          />
          <DateField editSelector={RecordInfosEditMode} valueSelector={CurrentRecordDate} changeHandler={setRecordDate} />
          <GraphColorField editSelector={RecordInfosEditMode} valueSelector={CurrentRecordColor} changeHandler={setRecordColor} />
          <DescriptionField
            editSelector={RecordInfosEditMode}
            valueSelector={CurrentRecordDescription}
            changeHandler={setRecordDescription}
          />
          <LastUpdatedField valueSelector={CurrentRecordLastUpdate} />
        </Container>
      }
    />
  );
};

export default RecordInfoCard;
