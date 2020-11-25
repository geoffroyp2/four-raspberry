import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphType, setType } from "../../../../redux/reducers/graphSlice";
import { editState } from "../../../../redux/reducers/UIControlsSlice";

const ProgramType = () => {
  const editMode = useSelector(editState);
  const type = useSelector(selectedGraphType);
  const dispatch = useDispatch();

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Type</Col>
        <Col className={infoMidCol}>
          {editMode ? (
            <FormControl
              as="select"
              defaultValue={type ? "Modèle" : "Cuisson"}
              onChange={(e) => dispatch(setType(e.target.value === "Modèle" ? true : false))}
            >
              <option value={"Modèle"}>Modèle</option>
              <option value={"Cuisson"}>Cuisson</option>
            </FormControl>
          ) : (
            <span>{type ? "Modèle" : "Cuisson"}</span>
          )}
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramType;
