import React, { useCallback } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../utils/styles";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphReference } from "../../../../redux/reducers/graphSlice";
import { setEdit, setLoadTableProps, setPointEdit, setShowLoadTable } from "../../../../redux/reducers/UIControlsSlice";

const ProgramGraphRef = () => {
  const graphRef = useSelector(selectedGraphReference);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(setShowLoadTable(true));
    dispatch(setPointEdit(false));
    dispatch(setEdit(false));
    dispatch(setLoadTableProps({ setRef: true, filter: { graphType: true } }));
  }, [dispatch]);

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Courbe de Référence</Col>
        <Col className={infoMidCol}>
          <span>{graphRef?.name || "-"}</span>
          <Button className="btn-sm btn-secondary float-right" onClick={handleClick}>
            Selectionner
          </Button>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default ProgramGraphRef;
