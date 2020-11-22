import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedGraphId, selectedGraphType, setType } from "../../../../redux/reducers/graphs/graphSlice";

import db from "../../../../../db/handler";
import { infoLeftCol, infoMidCol, infoRightCol, infoRow } from "../utils/styles";
import { Col, FormControl, Row } from "react-bootstrap";
import EditButton from "../utils/EditButton";

const ProgramType = () => {
  const graphType = useSelector(selectedGraphType);
  const graphId = useSelector(selectedGraphId);
  const dispatch = useDispatch();

  const [FieldType, setFieldType] = useState<boolean>(graphType);
  const [Editing, setEditing] = useState<boolean>(false);
  const [PendingValidation, setPendingValidation] = useState<boolean>(false);

  const toggleEdit = useCallback(() => {
    setFieldType(graphType);
    setEditing(true);
  }, [graphType]);

  const validate = useCallback(() => {
    setPendingValidation(true);
    db.updateGraph(graphId, { graphType: FieldType }, (newGraph) => {
      setPendingValidation(false);
      setEditing(false);
      dispatch(setType(newGraph.graphType));
    });
  }, [dispatch, graphId, FieldType]);
  return (
    <Row className={infoRow}>
      <Col className={infoLeftCol}>Type</Col>
      <Col className={infoMidCol}>
        {Editing ? (
          <FormControl
            as="select"
            defaultValue={FieldType ? "Modèle" : "Cuisson"}
            onChange={(e) => setFieldType(e.target.value === "Modèle" ? true : false)}
          >
            <option value={"Modèle"}>Modèle</option>
            <option value={"Cuisson"}>Cuisson</option>
          </FormControl>
        ) : (
          <span>{graphType ? "Modèle" : "Cuisson"}</span>
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

export default ProgramType;
