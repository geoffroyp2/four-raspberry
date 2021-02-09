import React, { FC } from "react";
import { Record } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, Row } from "react-bootstrap";

type Props = {
  data: (state: RootState) => Record;
};

const TargetField: FC<Props> = ({ data }) => {
  const currentData = useSelector(data);

  return (
    <Row className="editField targetField" noGutters>
      <Col className="colContent">
        <label>Courbe de Référence:</label>
        <span> {currentData.target?.name || "-"}</span>
        <span> {`(Four: ${currentData.oven})` || ""}</span>
      </Col>
    </Row>
  );
};

export default TargetField;
