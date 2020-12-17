import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { useSelector } from "react-redux";
import { RootState } from "@src/redux/store";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";

type Props = {
  valueSelector: (state: RootState) => string;
  buttonCallback: () => void;
};

const ReferenceField = ({ buttonCallback, valueSelector }: Props) => {
  const dbReferences = useSelector(dbDataReference);
  const reference = useSelector(valueSelector);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Courbe de Référence</Col>
        <Col className={infoMidCol}>
          <span>{dbReferences[reference]?.name || "-"}</span>
          <Button className="btn-sm btn-secondary float-right" onClick={buttonCallback}>
            Selectionner
          </Button>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ReferenceField;
