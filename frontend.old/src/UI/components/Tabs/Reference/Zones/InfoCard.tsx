import React from "react";
import { Container } from "react-bootstrap";

import {
  CurrentReferenceColor,
  CurrentReferenceDescription,
  CurrentReferenceLastUpdate,
  CurrentReferenceName,
  CurrentReferenceRecords,
  setReferenceColor,
  setReferenceDescription,
  setReferenceName,
} from "@redux/dataReducers/referenceSlice";
import { ReferenceInfosEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import NameField from "@UITabs/sharedComponents/Fields/NameField";
import GraphColorField from "@UITabs/sharedComponents/Fields/GraphColorField";
import DescriptionField from "@UITabs/sharedComponents/Fields/DescriptionField";
import LastUpdatedField from "@UITabs/sharedComponents/Fields/LastUpdatedField";
import RecordTableField from "@UITabs/sharedComponents/Fields/RecordTableField";

const ReferenceInfoCard = () => {
  return (
    <ScrollZone
      content={
        <Container className="pt-1 pr-2 pl-2 flex-row justify-content-start rounded" style={{ overflow: "hidden" }}>
          <NameField
            editSelector={ReferenceInfosEditMode}
            valueSelector={CurrentReferenceName}
            changeHandler={setReferenceName}
          />
          <GraphColorField
            editSelector={ReferenceInfosEditMode}
            valueSelector={CurrentReferenceColor}
            changeHandler={setReferenceColor}
          />
          <DescriptionField
            editSelector={ReferenceInfosEditMode}
            valueSelector={CurrentReferenceDescription}
            changeHandler={setReferenceDescription}
          />
          <RecordTableField
            editSelector={ReferenceInfosEditMode}
            valueSelector={CurrentReferenceRecords}
            handleAddRecord={() => {}}
            handleRemoveRecord={() => {}}
            addButton={false}
          />
          <LastUpdatedField valueSelector={CurrentReferenceLastUpdate} />
        </Container>
      }
    />
  );
};

export default ReferenceInfoCard;
