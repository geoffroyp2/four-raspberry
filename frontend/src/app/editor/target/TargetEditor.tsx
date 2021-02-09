import React, { useCallback } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { setCurrentTargetId } from "./state/targetDataSlice";
import { selectTargetLoadRowSelected, setTargetShowLoad } from "./state/targetDisplaySlice";

// import RecordInfos from "./RecordInfos";
import TargetButtons from "./TargetButtons";
import TargetGraph from "./TargetGraph";
import TargetInfos from "./TargetInfos";
import TargetLoadTable from "./TargetLoadTable";
// import RecordGraph from "./RecordGraph";
// import RecordPieces from "./RecordPieces";
// import { setCurrentRecordId } from "./state/targetDataSlice";
// import { selectRecordLoadRowSelected, setRecordShowLoad } from "./state/targetDisplaySlice";

const TargetEditor = () => {
  const dispatch = useDispatch();
  const rowSelected = useSelector(selectTargetLoadRowSelected);

  const handleSelect = useCallback(() => {
    dispatch(setCurrentTargetId(rowSelected));
    dispatch(setTargetShowLoad(false));
  }, [dispatch, rowSelected]);

  return (
    <Container fluid className="mt-2 pl-0 pr-0 pl-sm-2 pr-sm-2 pl-md-3 pr-md-3">
      <TargetButtons />
      <Row>
        <Col xl={6} md={12}>
          <TargetInfos />
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
