import React from "react";
import { Col, Row } from "react-bootstrap";
import { infoRowDates } from "../utils/styles";

import { formatDate } from "../../../../utils/timeFormatting";
import { selectedGraphDate, selectedGraphLastUpdate } from "../../../../redux/reducers/graphSlice";
import { useSelector } from "react-redux";

const ProgramDates = () => {
  const creationDate = useSelector(selectedGraphDate);
  const lastUpdate = useSelector(selectedGraphLastUpdate);

  return (
    <Row className={infoRowDates}>
      <Col className="pl-0" style={{ borderRight: "1px solid rgba(16,16,16, 0.8)" }}>
        <Col className="text-info">Date de création</Col>
        <Col>{formatDate(creationDate)}</Col>
      </Col>
      <Col className="pl-0">
        <Col className="text-info">Dernière modification</Col>
        <Col>{formatDate(lastUpdate)}</Col>
      </Col>
    </Row>
  );
};

export default ProgramDates;
