import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphDescription, setDescription } from "@redux/graphSlice";
import { editState } from "@redux/UIControlsSlice";

import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

const ProgramDescription = () => {
  const editMode = useSelector(editState);
  const description = useSelector(selectedGraphDescription);
  const dispatch = useDispatch();

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Description</Col>
        <Col className={infoMidCol}>
          {editMode ? (
            <FormControl
              as="textarea"
              value={description}
              rows={Math.ceil(description.length / 45)}
              onChange={(e) => dispatch(setDescription(e.target.value))}
            />
          ) : (
            <span>{description}</span>
          )}
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramDescription;
