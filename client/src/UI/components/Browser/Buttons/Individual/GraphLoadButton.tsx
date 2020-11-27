import React from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { editState, setShowLoadTable } from "@redux/UIControlsSlice";

const GraphLoadButton = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(editState);

  return (
    <Button className="btn-primary" disabled={editMode} onClick={() => dispatch(setShowLoadTable(true))}>
      Ouvrir
    </Button>
  );
};

export default GraphLoadButton;
