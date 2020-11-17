import React from "react";
import { Button, ButtonGroup, Row } from "react-bootstrap";

type Props = {
  suppr: () => void;
  create: () => void;
  load: () => void;
};

const ProgramInfosButtons = ({ suppr, create, load }: Props) => {
  return (
    <Row className="mr-2 mb-2 ml-2 justify-content-between align-items-end">
      <Button className="btn-danger" onClick={suppr}>
        Supprimer
      </Button>

      <ButtonGroup className="float-left">
        <Button className="btn-primary " onClick={load}>
          Ouvrir
        </Button>
        <Button className="btn-info" onClick={create}>
          Nouveau
        </Button>
      </ButtonGroup>
    </Row>
  );
};
export default ProgramInfosButtons;
