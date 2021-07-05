import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/infoCard.scss";

import { Formula, Piece, Record, Target } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import { dateToDisplayString } from "@utils/dateFormat";

type Props = {
  data: (state: RootState) => Record | Target | Piece | Formula;
};

const DateField: FC<Props> = ({ data }) => {
  const currentData = useSelector(data);

  return (
    <Row className="editField dateField flex-column" noGutters>
      <Col className="colContent">
        <label>Créé le:</label>
        <span> {dateToDisplayString(currentData.createdAt) || "-"}</span>
      </Col>
      <Col className="colContent">
        <label>Dernière modification:</label>
        <span> {dateToDisplayString(currentData.updatedAt) || "-"}</span>
      </Col>
    </Row>
  );
};

export default DateField;
