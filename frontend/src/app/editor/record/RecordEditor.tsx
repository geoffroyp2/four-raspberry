import React, { useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { mainFrameClassName } from "@editor/_shared/styleElements";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData, selectRecordId, setRecordId, setRecordNeedsRefresh } from "./_state/recordDataSlice";
import { selectRecordLoadRowSelected } from "./_state/recordDisplaySlice";
import { selectTargetLoadRowSelected } from "@editor/target/_state/targetDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordGraph from "./RecordGraph";
import RecordPieces from "./RecordPieces";
import RecordLoadTable from "./RecordLoadTable";
import TargetLoadTable from "@editor/target/TargetLoadTable";

import { linkRecordTarget } from "./utils/mutations";

const RecordEditor = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const recordId = useSelector(selectRecordId);

  const RecordRowSelected = useSelector(selectRecordLoadRowSelected);
  const TargetRowSelected = useSelector(selectTargetLoadRowSelected);

  // Detect need for refreshing data
  useEffect(() => {
    if (currentRecord.id !== recordId) dispatch(setRecordNeedsRefresh(true));
  }, [dispatch, currentRecord.id, recordId]);

  const handleLoadRecord = useCallback(() => {
    dispatch(setRecordId(RecordRowSelected));
    dispatch(setLoadTable({ record: false }));
  }, [dispatch, RecordRowSelected]);

  const handleLinkTarget = useCallback(() => {
    linkRecordTarget(currentRecord.id || 0, TargetRowSelected);
    dispatch(setLoadTable({ target: false }));
  }, [dispatch, TargetRowSelected, currentRecord]);

  return (
    <Container fluid className={mainFrameClassName}>
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
