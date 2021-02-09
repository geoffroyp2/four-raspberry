import React, { FC } from "react";
import { Record } from "@baseTypes/database/GQLResTypes";

import { RootState } from "@app/store";
import { useSelector } from "react-redux";

import "../styles/infoCard.scss";
import { Col, Row } from "react-bootstrap";
import EditIcon from "@src/assets/EditIcon";
import GotoIcon from "@src/assets/GotoIcon";

type Props = {
  data: (state: RootState) => Record;
  setShowTable: (val: boolean) => void;
  goto: () => void;
};

const TargetField: FC<Props> = ({ data, setShowTable, goto }) => {
  const currentData = useSelector(data);

  return (
    <Row className="editField targetField" noGutters>
      <Col className="colContent">
        <label>Courbe de Référence:</label>
        <span> {currentData.target?.name || "-"}</span>
        <span> {`(${currentData.oven})` || ""}</span>
      </Col>
      <Col className="colButtons">
        {currentData.target?.id && (
          <>
            <EditIcon onClick={() => setShowTable(true)} />
            <GotoIcon onClick={goto} />
          </>
        )}
      </Col>
    </Row>
  );
};

export default TargetField;
