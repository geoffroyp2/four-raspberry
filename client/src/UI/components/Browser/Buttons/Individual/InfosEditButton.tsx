import React, { useCallback, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { updateGraph, selectedGraph, memorizeGraph } from "../../../../redux/reducers/graphSlice";
import { editState, setEdit } from "../../../../redux/reducers/UIControlsSlice";

import db from "../../../../../db/handler";
import { Graph } from "../../../../../interfaces/Igraph";

const EditButton = () => {
  const dispatch = useDispatch();

  const graph = useSelector(selectedGraph);
  const editMode = useSelector(editState);

  const [PendingState, setPendingState] = useState<boolean>(false);

  const save = useCallback(() => {
    setPendingState(true);
    db.updateGraph(graph, (res: Graph) => {
      dispatch(updateGraph(res));
      dispatch(setEdit(false));
      setPendingState(false);
    });
  }, [dispatch, graph]);

  const edit = useCallback(() => {
    dispatch(memorizeGraph());
    dispatch(setEdit(true));
  }, [dispatch]);

  return (
    <Button className="btn-primary" onClick={editMode ? save : edit}>
      {PendingState && <Spinner as="span" animation="border" size="sm" role="status" />}
      <span className="pl-1">{editMode ? "Enregistrer" : "Modifier"}</span>
    </Button>
  );
};

export default EditButton;
