import React, { useCallback, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import program from "../../program-logic/program";
import { formatDate } from "../../utils/timeFormatter";

type Props = {
  id: string;
  select: () => void;
  refresh: boolean;
};

const ProgramTable = ({ id, select, refresh }: Props) => {
  const [, forceRefresh] = useState<void>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (program.updateReceived) {
      forceRefresh();
      program.updateReceived = false;
    }
  });

  const [programId, setProgramId] = useState<string>(id);

  useEffect(() => {
    if (programId !== id) setProgramId(id);
  }, [programId, id]);

  const [rowSelected, setRowSelected] = useState<string>(
    program.currentSelectedProgram!._id
  );

  const rowClick = useCallback(
    (e) => {
      setRowSelected(e.target.id);
      program.currentSelectedProgram = program.modelGraphs[e.target.id];
      select();
    },
    [select]
  );

  return (
    <Container
      fluid
      className="p-0 m-0"
      style={{
        display: "block",
        position: "relative",
        overflow: "auto",
        height: "100%",
      }}
    >
      <Table size="sm" variant="dark" striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Dernière Modification</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(program.modelGraphs).map(([key, value]) => {
            return (
              <tr
                onClick={rowClick}
                id={key}
                key={key}
                className={key === rowSelected ? "table-primary" : ""}
              >
                <td id={key}>{value.name}</td>
                <td id={key}>{value.graphType}</td>
                <td id={key}>{formatDate(value.lastUpdated)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProgramTable;
