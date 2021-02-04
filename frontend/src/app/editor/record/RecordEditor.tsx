import React from "react";
import { Container } from "react-bootstrap";

import RecordInfos from "./RecordInfos";
import RecordButtons from "./RecordButtons";
import RecordLoadTable from "./RecordLoadTable";
const RecordEditor = () => {
  return (
    <Container fluid className="mt-2">
      <RecordButtons />
      <RecordInfos />
      <RecordLoadTable />
    </Container>
  );
};

export default RecordEditor;
