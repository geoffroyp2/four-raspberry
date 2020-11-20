import React from "react";
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";

type Props = {
  loadGraph: () => void;
  controls: {
    deleteGraph: () => void;
    createGraph: () => void;
    deletePending: boolean;
    createPending: boolean;
  };
};

const ProgramInfosButtons = ({ loadGraph, controls }: Props) => {
  return (
    <Row className="mr-2 mb-2 ml-2 justify-content-between align-items-end">
      <Button className="btn-danger" onClick={controls.deleteGraph}>
        {controls.deletePending && (
          <Spinner as="span" animation="border" size="sm" role="status" />
        )}
        <span className="pl-1 pr-1">Supprimer</span>
      </Button>

      <ButtonGroup className="float-left">
        <Button className="btn-info" onClick={controls.createGraph}>
          {controls.createPending && (
            <Spinner as="span" animation="border" size="sm" role="status" />
          )}
          <span className="pl-1 pr-1">Nouveau</span>
        </Button>
        <Button className="btn-primary " onClick={loadGraph}>
          Ouvrir
        </Button>
      </ButtonGroup>
    </Row>
  );
};
export default ProgramInfosButtons;
