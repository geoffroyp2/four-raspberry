import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { IGraph } from "../../../../db/src/models/graph/types";
import program from "../../program-logic/program";
import { formatDate } from "../../utils/timeFormatter";

type Props = {
  select: (graph: IGraph) => void;
};

const ProgramTable = ({ select }: Props) => {
  const [rowSelected, setRowSelected] = useState<number>(0);

  useEffect(() => {
    select(program.modelGraphs[rowSelected]);
  }, [select, rowSelected]);

  const rowClick = useCallback(
    (e) => {
      setRowSelected(+e.target.id);
      select(program.modelGraphs[e.target.id]);
    },
    [select]
  );

  return (
    <Table size="sm" variant="dark" striped bordered hover>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Type</th>
          <th>Dernière Modification</th>
        </tr>
      </thead>
      <tbody>
        {program.modelGraphs.map((g, idx) => {
          return (
            <tr
              onClick={rowClick}
              id={`${idx}`}
              key={idx}
              className={idx === rowSelected ? "table-primary" : ""}
            >
              <td id={`${idx}`}>{g.name}</td>
              <td id={`${idx}`}>{g.graphType}</td>
              <td id={`${idx}`}>{formatDate(g.lastUpdated)}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default ProgramTable;
