import React from "react";
import { Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectedGraphType } from "@redux/graphSlice";
import { setProgramStart } from "@redux/UIControlsSlice";

const StartButton = () => {
  const dispatch = useDispatch();
  const graphType = useSelector(selectedGraphType);

  return (
    <Container className="pr-0 align-items-right">
      <Button
        className={"btn-lg float-right " + (graphType ? "btn-success" : "btn-secondary")}
        onClick={() => dispatch(setProgramStart(true))}
        disabled={!graphType}
      >
        Lancer la cuisson
      </Button>
    </Container>
  );
};

export default StartButton;
