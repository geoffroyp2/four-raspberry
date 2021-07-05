import React, { FC } from "react";
import { Col, Row } from "react-bootstrap";
import "../styles/infoCard.scss";

import { RootState } from "@app/store";

import { Piece } from "@baseTypes/database/GQLResTypes";
import { useSelector } from "react-redux";
import EditIcon from "@src/assets/EditIcon";
import GotoIcon from "@src/assets/GotoIcon";

type Props = {
  data: (state: RootState) => Piece;
  setShowTable: (val: boolean) => void;
  goto: () => void;
};

const FormulaField: FC<Props> = ({ data, setShowTable, goto }) => {
  const currentData = useSelector(data);

  return (
    <Row className="editField targetField" noGutters>
      <Col className="colContent">
        <label>Émail:</label>
        <span> {currentData.formula?.name || "-"}</span>
      </Col>
      <Col className="colButtons">
        <EditIcon onClick={() => setShowTable(true)} />
        {currentData.formula?.id && <GotoIcon onClick={goto} />}
      </Col>
    </Row>
  );
};

export default FormulaField;
