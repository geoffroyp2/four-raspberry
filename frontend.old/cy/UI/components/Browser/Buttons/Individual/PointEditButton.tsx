import React, { useCallback } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { pointEditState, setEdit, setPointEdit } from "@redux/UIControlsSlice";

const PointEditButton = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(pointEditState);

  const handleClick = useCallback(() => {
    dispatch(setPointEdit(true));
    dispatch(setEdit(false));
  }, [dispatch]);

  return (
    <Button className="btn-sm btn-secondary" disabled={editMode} onClick={handleClick}>
      Modifier les points
    </Button>
  );
};

export default PointEditButton;
