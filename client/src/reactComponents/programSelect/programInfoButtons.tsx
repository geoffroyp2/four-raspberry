import React from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

type Props = {
  suppr: () => void;
  create: () => void;
  load: () => void;
  modify: () => void;
};

const ProgramInfoButtons = ({ suppr, create, load, modify }: Props) => {
  return (
    <Row className="mr-2 mb-2 justify-content-between align-items-end">
      <Button className="btn-danger btn-sm" onClick={suppr}>
        Supprimer
      </Button>

      <ButtonGroup className="float-left">
        <Button className="btn-primary " onClick={load}>
          Ouvrir
        </Button>
        <Button className="btn-primary" onClick={modify}>
          Modifier
        </Button>
        <Button className="btn-info" onClick={create}>
          Nouveau
        </Button>
      </ButtonGroup>
    </Row>
  );
};
export default ProgramInfoButtons;
