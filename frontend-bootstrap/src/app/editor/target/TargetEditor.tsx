import React, { useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectTargetData, selectTargetId, setTargetId, setTargetNeedsRefresh } from "./_state/targetDataSlice";
import { selectTargetLoadRowSelected } from "./_state/targetDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import { mainFrameClassName } from "@editor/_shared/styleElements";

import TargetButtons from "./TargetButtons";
import TargetGraph from "./TargetGraph";
import TargetInfos from "./TargetInfos";
import TargetLoadTable from "./TargetLoadTable";
import TargetRecords from "./TargetRecords";
// import RecordPieces from "./RecordPieces";

const TargetEditor = () => {
  const dispatch = useDispatch();
  const currentTarget = useSelector(selectTargetData);
  const targetId = useSelector(selectTargetId);
  const rowSelected = useSelector(selectTargetLoadRowSelected);

  // Detect need for refreshing data
  useEffect(() => {
    if (currentTarget.id !== targetId) dispatch(setTargetNeedsRefresh(true));
  }, [dispatch, currentTarget.id, targetId]);

  const handleSelect = useCallback(() => {
    dispatch(setTargetId(rowSelected));
    dispatch(setLoadTable({ target: false }));
  }, [dispatch, rowSelected]);

  return (
    <Container fluid className={mainFrameClassName}>
      <TargetButtons />
      <Row>
        <Col xl={6} md={12}>
          <TargetInfos />
          <TargetRecords />
          {/* <RecordPieces /> */}
        </Col>
        <Col xl={6} md={12}>
          <TargetGraph />
        </Col>
      </Row>
      <TargetLoadTable select={handleSelect} />
    </Container>
  );
};

export default TargetEditor;
