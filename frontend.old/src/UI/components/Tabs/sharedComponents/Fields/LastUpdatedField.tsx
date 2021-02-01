import React from "react";
import { Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow } from "../styles/InfoZoneStyles";

import { useSelector } from "react-redux";

import { RootState } from "@src/redux/store";
import { dateToDisplayString } from "@UIutils/dateFormat";

type Props = {
  valueSelector: (state: RootState) => string;
};

const LastUpdatedField = ({ valueSelector }: Props) => {
  const lastUpdate = useSelector(valueSelector);

  return (
    <Row className={infoRow}>
      <Col className={infoLeftCol}>Dernière Modification</Col>
      <Col className={infoMidCol}>
        <span>{dateToDisplayString(lastUpdate, true)}</span>
      </Col>
    </Row>
  );
};

export default LastUpdatedField;
