import React from "react";
import { Col, FormControl, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { useDispatch, useSelector } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { RootState } from "@src/redux/store";

type Props = {
  editSelector: (state: RootState) => boolean;
  valueSelector: (state: RootState) => string;
  changeHandler: ActionCreatorWithPayload<string, string>;
};

const DescriptionField = ({ editSelector, valueSelector, changeHandler }: Props) => {
  const dispatch = useDispatch();
  const edit = useSelector(editSelector);
  const description = useSelector(valueSelector);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Description</Col>
        <Col className={infoMidCol}>
          {edit ? (
            <FormControl
              as="textarea"
              rows={Math.ceil(description.length / 45)}
              value={description}
              onChange={(e) => dispatch(changeHandler(e.target.value))}
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

export default DescriptionField;
