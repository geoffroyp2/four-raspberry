import React, { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRecordId } from "./state/recordDataSlice";
import { selectRecordLoadRowSelected, setRecordShowLoad } from "./state/recordDisplaySlice";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordLoadTable from "./RecordLoadTable";
import RecordGraph from "./RecordGraph";
import RecordPieces from "./RecordPieces";

const RecordEditor = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(selectRecordLoadRowSelected);

  const handleSelect = useCallback(() => {
    dispatch(setCurrentRecordId(rowSelected));
    dispatch(setRecordShowLoad(false));
  }, [dispatch, rowSelected]);

  return (
    <Container fluid className="mt-2 pl-0 pr-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3">
      <RecordButtons />
      <Row>
        <Col xl={6} md={12}>
          <RecordInfos />
          <RecordPieces />
        </Col>
        <Col xl={6} md={12}>
          <RecordGraph />
        </Col>
      </Row>

      <RecordLoadTable select={handleSelect} />
    </Container>
  );
};

export default RecordEditor;
