import React from "react";
import { Container } from "react-bootstrap";
import Scrollbars from "react-custom-scrollbars";

import PointEditTable from "./components/PointEditTable";

const PointEdit = () => {
  return (
    <div className="d-flex flex-column h-100 justify-content-between">
      <Scrollbars
        className="rounded"
        style={{ height: "100%", border: "solid 1px rgba(10,10,10,0.8)", backgroundColor: "#232323", overflow: "hidden" }}
      >
        <Container className="flex-row justify-content-start rounded  pt-2 pb-1">
          <PointEditTable />
        </Container>
      </Scrollbars>
    </div>
  );
};

export default PointEdit;
