import React from "react";
import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { setLoadTable } from "@editor/_state/editorSlice";

const RecordButtons = () => {
  const dispatch = useDispatch();

  return (
    <Container fluid className="d-flex justify-content-end mb-2">
      <Button className="btn-info" onClick={() => dispatch(setLoadTable({ record: true }))}>
        Ouvrir
      </Button>
    </Container>
  );
};

export default RecordButtons;
