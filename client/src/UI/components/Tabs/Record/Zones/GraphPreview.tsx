import React from "react";
import { Container } from "react-bootstrap";

import SimpleGraph from "@UITabs/sharedComponents/SimpleGraph";
import { CurrentRecordColor, CurrentRecordPoints, CurrentRecordReference } from "@redux/dataReducers/recordSlice";
import { useSelector } from "react-redux";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";

const RecordGraphPreview = () => {
  const currentRecordRef = useSelector(CurrentRecordReference);
  const references = useSelector(dbDataReference);

  return (
    <Container
      fluid
      className="m-0 p-1 rounded shadow"
      style={{ backgroundColor: "#232323", border: "solid 1px rgba(10,10,10,0.8)" }}
    >
      <SimpleGraph
        pointsSelector={CurrentRecordPoints}
        colorSelector={CurrentRecordColor}
        refPoints={currentRecordRef ? references[currentRecordRef].points : null}
      />
    </Container>
  );
};

export default RecordGraphPreview;
