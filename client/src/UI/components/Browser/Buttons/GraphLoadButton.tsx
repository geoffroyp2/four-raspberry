import React from "react";
import { Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setShowLoadTable } from "../../../redux/reducers/UIControlsSlice";

const GraphLoadButton = () => {
  const dispatch = useDispatch();

  return (
    <Button className="btn-primary" onClick={() => dispatch(setShowLoadTable(true))}>
      Ouvrir
    </Button>
  );
};

export default GraphLoadButton;
