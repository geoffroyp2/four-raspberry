import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphDescription, setDescription } from "../../../../redux/reducers/graphSlice";

import { infoLeftCol, infoMidCol, infoRow } from "../utils/styles";
import { editState } from "../../../../redux/reducers/UIControlsSlice";

const ProgramDescription = () => {
  const editMode = useSelector(editState);
  const description = useSelector(selectedGraphDescription);
  const dispatch = useDispatch();

  return (
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
  );
};

export default ProgramDescription;
