import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphDate, setDate } from "../../../../redux/reducers/graphSlice";
import { editState } from "../../../../redux/reducers/UIControlsSlice";

import { dateToDisplayString, dateToInputFormat, dateToISOString } from "../../../../utils/dateFormatting";

const ProgramName = () => {
  const editMode = useSelector(editState);
  const date = useSelector(selectedGraphDate);
  const dispatch = useDispatch();

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Date de Cuisson</Col>
        <Col className={infoMidCol}>
          {editMode ? (
            <FormControl
              as="input"
              type="date"
              value={dateToInputFormat(date)}
              onChange={(e) => dispatch(setDate(dateToISOString(e.target.value)))}
            />
          ) : (
            <span>{dateToDisplayString(date, false)}</span>
          )}
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramName;
