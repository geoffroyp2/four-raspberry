import React from "react";
import { Container } from "react-bootstrap";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import PointEditTable from "@UITabs/sharedComponents/PointEditTable";

const RecordPointEdit = () => {
  return (
    <ScrollZone
      content={
        <Container className="flex-row justify-content-start rounded pl-2 pt-2 pb-1">
          <PointEditTable graphType={"Record"} />
        </Container>
      }
    />
  );
};

export default RecordPointEdit;
