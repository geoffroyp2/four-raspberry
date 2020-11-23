import React, { useState } from "react";
import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraph, allGraphs, selectGraph } from "../../redux/reducers/graphSlice";
import { setShowLoadTable } from "../../redux/reducers/UIControlsSlice";
import { formatDate } from "../../utils/timeFormatting";

const ProgramTable = () => {
  const dispatch = useDispatch();
  const [rowSelected, setRowSelected] = useState<string>(useSelector(selectedGraph)._id);
  const graphs = useSelector(allGraphs);

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
              {Object.entries(graphs).map(([key, value]) => {
                return (
                  <tr
                    onClick={(e) => setRowSelected((e.target as HTMLTableRowElement).id)}
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
          <Button className="btn-secondary" onClick={() => dispatch(setShowLoadTable(false))}>
            Annuler
          </Button>
          <Button
            className="btn-primary"
            onClick={() => {
              dispatch(selectGraph(rowSelected));
              dispatch(setShowLoadTable(false));
            }}
          >
            Ouvrir
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
};

export default ProgramTable;
