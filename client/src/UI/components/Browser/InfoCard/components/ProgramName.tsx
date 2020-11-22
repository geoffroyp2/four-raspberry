import React, { useCallback, useState } from "react";
import { Col, FormControl, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphId, selectedGraphName, setName } from "../../../../redux/reducers/graphs/graphSlice";

import EditButton from "../utils/EditButton";
import db from "../../../../../db/handler";
import { infoLeftCol, infoMidCol, infoRightCol, infoRow } from "../utils/styles";

const ProgramName = () => {
  const graphName = useSelector(selectedGraphName);
  const graphId = useSelector(selectedGraphId);
  const dispatch = useDispatch();

  const [FieldName, setFieldName] = useState<string>(graphName);
  const [Editing, setEditing] = useState<boolean>(false);
  const [PendingValidation, setPendingValidation] = useState<boolean>(false);

  const toggleEdit = useCallback(() => {
    setFieldName(graphName);
    setEditing(true);
  }, [graphName]);

  const validate = useCallback(() => {
    setPendingValidation(true);
    db.updateGraph(graphId, { name: FieldName }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      dispatch(setName(newGraph.name));
    });
  }, [dispatch, graphId, FieldName]);

  return (
    <Row className={infoRow}>
      <Col className={infoLeftCol}>Nom</Col>
      <Col className={infoMidCol}>
        {Editing ? (
          <FormControl as="input" value={FieldName} onChange={(e) => setFieldName(e.target.value)} />
        ) : (
          <span>{graphName}</span>
        )}
      </Col>
      <Col className={infoRightCol}>
        <EditButton
          buttonState={Editing}
          pendingState={PendingValidation}
          disabled={false}
          onEdit={toggleEdit}
          onValid={validate}
        />
      </Col>
    </Row>
  );
};

export default ProgramName;
