import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Container, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraph, selectGraph, updateGraph } from "../../../../redux/reducers/graphSlice";
import {
  loadTableProps,
  loadTableRowSelected,
  setLoadTableProps,
  setShowLoadTable,
} from "../../../../redux/reducers/UIControlsSlice";

import db from "../../../../../db/handler";
import { Graph } from "../../../../../interfaces/Igraph";

const ProgramTableButtons = () => {
  const dispatch = useDispatch();
  const { setRef } = useSelector(loadTableProps);
  const currentGraph = useSelector(selectedGraph);
  const rowSelected = useSelector(loadTableRowSelected);

  const [PendingState, setPendingState] = useState<boolean>(false);

  const handleSelect = useCallback(() => {
    if (setRef) {
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
    <Container fluid className="d-flex justify-content-between align-items-center">
      <ButtonGroup className="float-right">
        <Button className="btn-secondary" onClick={handleCancel}>
          Annuler
        </Button>
        <Button className="btn-primary" onClick={handleSelect}>
          {PendingState && <Spinner as="span" animation="border" size="sm" role="status" />}
          <span className="pl-1 pr-1">{setRef ? "Sélectionner" : "Ouvrir"}</span>
        </Button>
      </ButtonGroup>
    </Container>
  );
};

export default ProgramTableButtons;
