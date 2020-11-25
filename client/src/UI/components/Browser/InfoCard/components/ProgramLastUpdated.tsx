import React from "react";
import { Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useSelector } from "react-redux";
import { selectedGraphLastUpdate } from "../../../../redux/reducers/graphSlice";
import { dateToDisplayString } from "../../../../utils/dateFormatting";

const ProgramLastUpdated = () => {
  const lastUpdate = useSelector(selectedGraphLastUpdate);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Dernière Modification</Col>
        <Col className={infoMidCol}>
          <span>{dateToDisplayString(lastUpdate, true)}</span>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramLastUpdated;
