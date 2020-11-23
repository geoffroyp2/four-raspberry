import React from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { pointEditState, setPointEdit } from "../../../redux/reducers/UIControlsSlice";

const PointEditButton = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(pointEditState);

  return (
    <Button className="btn-sm btn-secondary" disabled={editMode} onClick={() => dispatch(setPointEdit(true))}>
      Modifier les points
    </Button>
  );
};

export default PointEditButton;
