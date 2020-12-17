import React from "react";
import { Container } from "react-bootstrap";

import ScrollZone from "../../Generic/ScrollZone";
import PointEditTable from "./components/PointEditTable";

const PointEdit = () => {
  return (
    <ScrollZone
      content={
        <Container className="flex-row justify-content-start rounded pl-2 pt-2 pb-1">
          <PointEditTable />
        </Container>
      }
    />
  );
};

export default PointEdit;
