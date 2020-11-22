import React, { useCallback, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphDescription, selectedGraphId, setDescription } from "../../../../redux/reducers/graphs/graphSlice";

import EditButton from "../utils/EditButton";
import db from "../../../../../db/handler";
import { infoLeftCol, infoMidCol, infoRightCol, infoRow } from "../utils/styles";

const ProgramDescription = () => {
  const graphDescription = useSelector(selectedGraphDescription);
  const graphId = useSelector(selectedGraphId);
  const dispatch = useDispatch();

  const [FieldDescription, setFieldDescription] = useState<string>(graphDescription);
  const [Editing, setEditing] = useState<boolean>(false);
  const [PendingValidation, setPendingValidation] = useState<boolean>(false);

  const validate = useCallback(() => {
    setPendingValidation(true);
    db.updateGraph(graphId, { description: FieldDescription }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      dispatch(setDescription(newGraph.name));
    });
  }, [dispatch, graphId, FieldDescription]);

  return (
    <Row className={infoRow}>
      <Col className={infoLeftCol}>Nom</Col>
      <Col className={infoMidCol}>
        {Editing ? (
          <FormControl
            as="textarea"
            value={FieldDescription}
            rows={Math.ceil(FieldDescription.length / 33)}
            onChange={(e) => setFieldDescription(e.target.value)}
          />
        ) : (
          <span>{FieldDescription}</span>
        )}
      </Col>
      <Col className={infoRightCol}>
        <EditButton
          buttonState={Editing}
          pendingState={PendingValidation}
          disabled={false}
          onEdit={() => setEditing(true)}
          onValid={validate}
        />
      </Col>
    </Row>
  );
};

export default ProgramDescription;
