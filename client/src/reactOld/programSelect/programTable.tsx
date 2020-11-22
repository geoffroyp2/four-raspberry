import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";

import program from "../../programLogic/program";
import { formatDate } from "../../utils/timeFormatter";

type Props = {
  id: string;
  select: (id: string) => void;
  cancel: () => void;
};

const ProgramTable = ({ id, select, cancel }: Props) => {
  const [rowSelected, setRowSelected] = useState<string>(id);

  const rowClick = useCallback((e) => {
    setRowSelected(e.target.id);
  }, []);

  return (
    <Container fluid>
      <Row>
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
              {Object.entries(program.graphs).map(([key, value]) => {
                return (
                  <tr
                    onClick={rowClick}
                    id={key}
                    key={key}
                    className={key === rowSelected ? "table-primary" : ""}
                  >
                    <td id={key}>{value.name}</td>
                    <td id={key}>{value.graphType ? "Modèle" : "Cuisson"}</td>
                    <td id={key}>{formatDate(value.lastUpdated)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </Row>
      <Row className="float-right mr-2 mb-2">
        <ButtonGroup>
          <Button className="btn-secondary btn-lg" onClick={cancel}>
            Annuler
          </Button>
          <Button
            className="btn-primary btn-lg"
            onClick={() => select(rowSelected)}
          >
            Ouvrir
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
};

export default ProgramTable;
