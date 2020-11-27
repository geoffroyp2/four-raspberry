import React, { useCallback, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphPoints, setPoints, selectedGraph, updateGraph } from "@redux/graphSlice";
import { setPointEdit } from "@redux/UIControlsSlice";

import db from "@db/handler";
import { Point } from "@clientTypes/programInterfaces";

const PointEditModeButtons = () => {
  const points = useSelector(selectedGraphPoints);
  const graph = useSelector(selectedGraph);
  const dispatch = useDispatch();

  const [PointsMem] = useState<Point[]>([...points]);
  const [PendingState, setPendingState] = useState<boolean>(false);

  const cancel = useCallback(() => {
    dispatch(setPoints(PointsMem));
    dispatch(setPointEdit(false));
  }, [PointsMem, dispatch]);

  const save = useCallback(async () => {
    setPendingState(true);

    await db.updateGraph(graph).then((res) => {
      setPendingState(false);
      dispatch(updateGraph(res));
      dispatch(setPointEdit(false));
    });
  }, [dispatch, graph]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <Button className="btn-danger" onClick={cancel}>
        Annuler
      </Button>
      <Button onClick={save} className="float-right">
        {PendingState && <Spinner as="span" animation="border" size="sm" role="status" />}
        <span className="pl-1">Enregistrer</span>
      </Button>
    </Container>
  );
};

export default PointEditModeButtons;
