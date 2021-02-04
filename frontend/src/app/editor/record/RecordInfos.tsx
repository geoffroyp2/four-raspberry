import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";

import { store } from "@store/store";
import { useSelector } from "react-redux";
import { selectCurrentRecordId, selectRecordData, setRecordData } from "./state/recordDataSlice";

import { fetchRecord } from "./state/request";

const loadRecord = async (id: number) => {
  const data = await fetchRecord(id);
  console.log(data);
  store.dispatch(setRecordData(data.records.rows[0]));
};

const RecordInfos = () => {
  const recordId = useSelector(selectCurrentRecordId);
  const record = useSelector(selectRecordData);

  useEffect(() => {
    loadRecord(recordId);
  }, [recordId]);

  return (
    <Card className="p-2">
      <Row>
        <Col>
          <p>{record?.id}</p>
          <p>{record?.name}</p>
          <p>{record?.oven}</p>
        </Col>
        <Col>{record?.description}</Col>
      </Row>
    </Card>
  );
};

export default RecordInfos;
