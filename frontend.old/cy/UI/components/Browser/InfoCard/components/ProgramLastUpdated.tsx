import React from "react";
import { Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow } from "../utils/styles";

import { useSelector } from "react-redux";
import { selectedGraphLastUpdate } from "@redux/+old/graphSlice";
import { dateToDisplayString } from "@src/UI/+old/utils/dateFormatting";

const ProgramLastUpdated = () => {
  const lastUpdate = useSelector(selectedGraphLastUpdate);

  return (
    <Row className={infoRow}>
      <Col className={infoLeftCol}>Dernière Modification</Col>
      <Col className={infoMidCol}>
        <span>{dateToDisplayString(lastUpdate, true)}</span>
      </Col>
    </Row>
  );
};

export default ProgramLastUpdated;
