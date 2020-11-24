import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Container, Row, Spinner, Table } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import db from "../../../db/handler";
import { Graph } from "../../../interfaces/Igraph";
import { selectedGraph, allGraphs, selectGraph, updateGraph } from "../../redux/reducers/graphSlice";
import { loadTableProps, setLoadTableProps, setShowLoadTable } from "../../redux/reducers/UIControlsSlice";

import { graphFilterResult } from "../../utils/graphFilter";
import { formatDate } from "../../utils/timeFormatting";

const ProgramTable = () => {
  const dispatch = useDispatch();

  const graphs = useSelector(allGraphs);
  const currentGraph = useSelector(selectedGraph);
  const { setRef, filter } = useSelector(loadTableProps);

  const [rowSelected, setRowSelected] = useState<string>(currentGraph._id);
  const [PendingState, setPendingState] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (setRef) {
      // set Current Graph reference
      setPendingState(true);

      // Give the new reference at the same time to avoid async problems
      db.updateGraph({ ...currentGraph, graphRef: rowSelected }, (res: Graph) => {
        setPendingState(false);
        dispatch(updateGraph(res));
        dispatch(setLoadTableProps({ setRef: false }));
        dispatch(setShowLoadTable(false));
      });
    } else {
      // Open Graph
      dispatch(selectGraph(rowSelected));
      dispatch(setShowLoadTable(false));
    }
  }, [dispatch, rowSelected, setRef, currentGraph]);

  const handleCancel = useCallback(() => {
    dispatch(setLoadTableProps({ setRef: false }));
    dispatch(setShowLoadTable(false));
  }, [dispatch]);

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
              {Object.entries(graphs)
                .filter(([key, value]) => {
                  return filter ? currentGraph._id !== key && graphFilterResult(value, filter) : true;
                })
                .map(([key, value]) => {
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
          <Button className="btn-secondary" onClick={handleCancel}>
            Annuler
          </Button>
          <Button className="btn-primary" onClick={handleSelect}>
            {PendingState && <Spinner as="span" animation="border" size="sm" role="status" />}
            <span className="pl-1 pr-1">{setRef ? "Sélectionner" : "Ouvrir"}</span>
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
};

export default ProgramTable;
