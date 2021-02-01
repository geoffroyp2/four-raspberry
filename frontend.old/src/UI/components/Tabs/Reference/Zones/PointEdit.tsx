import React from "react";
import { Container } from "react-bootstrap";

import ScrollZone from "@UITabs/sharedComponents/ScrollZone";
import PointEditTable from "@UITabs/sharedComponents/PointEditTable";

const ReferencePointEdit = () => {
  return (
    <ScrollZone
      content={
        <Container className="flex-row justify-content-start rounded pl-2 pt-2 pb-1">
          <PointEditTable graphType={"Reference"} />
        </Container>
      }
    />
  );
};

export default ReferencePointEdit;
