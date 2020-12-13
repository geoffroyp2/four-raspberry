import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphName, setName } from "@redux/+old/graphSlice";
import { editState } from "@redux/UIControlsSlice";

const ProgramName = () => {
  const editMode = useSelector(editState);
  const name = useSelector(selectedGraphName);
  const dispatch = useDispatch();

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Nom</Col>
        <Col className={infoMidCol}>
          {editMode ? (
            <FormControl as="input" value={name} onChange={(e) => dispatch(setName(e.target.value))} />
          ) : (
            <span>{name}</span>
          )}
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramName;
