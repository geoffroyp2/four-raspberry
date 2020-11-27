import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedGraph, rollbackChanges, selectedGraph } from "@redux/graphSlice";
import { setEdit, editState } from "@redux/UIControlsSlice";

import db from "@db/handler";

const GraphDeleteButton = () => {
  const dispatch = useDispatch();
  const graph = useSelector(selectedGraph);
  const editMode = useSelector(editState);
  const [Pending, setPending] = useState<boolean>(false);
  const [Confirm, setConfirm] = useState<boolean>(false);

  const handleDeleteGraph = useCallback(async () => {
    setPending(true);
    setConfirm(false);

    await db.deleteGraph(graph).then(() => {
      setPending(false);
      dispatch(deleteSelectedGraph());
    });
  }, [graph, dispatch]);

  const handleClick = useCallback(() => {
    if (editMode) {
      dispatch(rollbackChanges());
      dispatch(setEdit(false));
    } else setConfirm(!Confirm);
  }, [dispatch, editMode, Confirm]);

  return (
    <ButtonGroup>
      <Button className={"btn-danger"} onClick={handleClick}>
        {Pending && <Spinner as="span" animation="border" size="sm" role="status" />}
        <span className="pl-1 pr-1">{Confirm || editMode ? "Annuler" : "Supprimer"}</span>
      </Button>
      {Confirm && (
        <Button className="btn-success" onClick={handleDeleteGraph}>
          Confirmer
        </Button>
      )}
    </ButtonGroup>
  );
};

export default GraphDeleteButton;
