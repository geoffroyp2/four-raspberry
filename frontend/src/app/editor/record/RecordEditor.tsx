import React, { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, setRecordId } from "./_state/recordDataSlice";
import { selectRecordLoadRowSelected } from "./_state/recordDisplaySlice";
import { selectTargetLoadRowSelected } from "@editor/target/_state/targetDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordLoadTable from "./RecordLoadTable";
import RecordGraph from "./RecordGraph";
import RecordPieces from "./RecordPieces";
import TargetLoadTable from "@editor/target/TargetLoadTable";
import { linkRecordTarget } from "./utils/editRequests";

const RecordEditor = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const RecordRowSelected = useSelector(selectRecordLoadRowSelected);
  const TargetRowSelected = useSelector(selectTargetLoadRowSelected);

  const handleLoadRecord = useCallback(() => {
    dispatch(setRecordId(RecordRowSelected));
    dispatch(setLoadTable({ record: false }));
  }, [dispatch, RecordRowSelected]);

  const handleLinkTarget = useCallback(() => {
    linkRecordTarget(currentRecord.id || 0, TargetRowSelected);
    dispatch(setLoadTable({ target: false }));
  }, [dispatch, TargetRowSelected, currentRecord]);

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

      <RecordLoadTable select={handleLoadRecord} />
      <TargetLoadTable select={handleLinkTarget} />
    </Container>
  );
};

export default RecordEditor;
