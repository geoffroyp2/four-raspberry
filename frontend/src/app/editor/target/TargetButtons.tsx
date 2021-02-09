import React from "react";
import { Button, Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setTargetShowLoad } from "./state/targetDisplaySlice";

const TargetButtons = () => {
  const dispatch = useDispatch();

  return (
    <Container fluid className="d-flex justify-content-end mb-2">
      <Button className="btn-info" onClick={() => dispatch(setTargetShowLoad(true))}>
        Ouvrir
      </Button>
    </Container>
  );
};

export default TargetButtons;
