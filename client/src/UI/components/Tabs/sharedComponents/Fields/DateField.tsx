import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { useDispatch, useSelector } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

import { dateToInputFormat, dateToISOString, dateToDisplayString } from "@UIutils/dateFormat";

type Props = {
  editSelector: (state: RootState) => boolean;
  valueSelector: (state: RootState) => string;
  changeHandler: ActionCreatorWithPayload<string, string>;
};

const DateField = ({ editSelector, valueSelector, changeHandler }: Props) => {
  const dispatch = useDispatch();
  const edit = useSelector(editSelector);
  const date = useSelector(valueSelector);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Date de Cuisson</Col>
        <Col className={infoMidCol}>
          {edit ? (
            <FormControl
              as="input"
              type="date"
              value={dateToInputFormat(date)}
              onChange={(e) => dispatch(changeHandler(dateToISOString(e.target.value)))}
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

export default DateField;
