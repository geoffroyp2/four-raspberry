import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { IGraph } from "../../../../db/src/models/graph/types";
import ProgramTable from "./programTable";
import program from "../../program-logic/program";

type Props = {
  validate: (programSelected: IGraph) => void;
};

const ProgramSelectZone = ({ validate }: Props) => {
  const [programList, setProgramList] = useState<IGraph[]>(program.modelGraphs);
  const [programSelected, setProgramSelected] = useState<IGraph | null>(null);

  return (
    <Container fluid className="border pl-1 pr-1 pt-2 pb-2 w-100 h-100">
      <Row sm={12}>
        <Col sm={5}>
          <ProgramTable select={(graph: IGraph) => setProgramSelected(graph)} />
        </Col>
        <Col sm={7}>
          <div>{programSelected?.description || "noselect"}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProgramSelectZone;
