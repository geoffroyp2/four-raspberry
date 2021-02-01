import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { recordData } from "./state/recordDataSlice";

const RecordInfos = () => {
  const record = useSelector(recordData);
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
