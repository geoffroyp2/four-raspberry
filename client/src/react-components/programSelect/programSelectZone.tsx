import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProgramInfos from "./programInfos";
import ProgramTable from "./programTable";

import program from "../../program-logic/program";
import { Graph } from "../../interfaces/Igraph";

const ProgramSelectZone = () => {
  const [programSelected, setProgramSelected] = useState<Graph>({
    ...program.currentSelectedProgram!,
  });
  const [programId, setProgramId] = useState<string>(
    program.currentSelectedProgram!._id
  );
  const [tableShouldRefresh, setTableShouldRefresh] = useState<boolean>(false);

  // signal coming from the program infos to trigger the re-render for the table
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setTableShouldRefresh(false);
  });
  const refreshTable = useCallback(() => {
    setTableShouldRefresh(true);
  }, []);

  const select = useCallback(() => {
    setProgramSelected({ ...program.currentSelectedProgram! });
    setProgramId(program.currentSelectedProgram!._id);
  }, []);

  return (
    <Container fluid className="border pl-1 pr-1 pt-2 pb-2 w-100 h-100">
      <Row noGutters>
        <Col sm={5}>
          <ProgramTable
            select={select}
            id={programId}
            refresh={tableShouldRefresh}
          />
        </Col>
        <Col sm={7}>
          {programSelected && (
            <ProgramInfos id={programId} refresh={refreshTable} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProgramSelectZone;
