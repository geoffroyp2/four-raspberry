import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedGraph, selectedGraphId, rollbackChanges } from "../../../../redux/reducers/graphSlice";

import db from "../../../../../db/handler";
import { setEdit, editState } from "../../../../redux/reducers/UIControlsSlice";

const GraphDeleteButton = () => {
  const dispatch = useDispatch();
  const graphId = useSelector(selectedGraphId);
  const editMode = useSelector(editState);
  const [Pending, setPending] = useState<boolean>(false);
  const [Confirm, setConfirm] = useState<boolean>(false);

  const handleDeleteGraph = useCallback(() => {
    setPending(true);
    setConfirm(false);
    db.deleteGraph(graphId, () => {
      setPending(false);
      dispatch(deleteSelectedGraph());
    });
  }, [graphId, dispatch]);

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
