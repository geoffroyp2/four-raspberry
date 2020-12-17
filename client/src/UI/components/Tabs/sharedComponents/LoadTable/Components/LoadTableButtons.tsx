import React from "react";
import { Button, ButtonGroup, Container, Spinner } from "react-bootstrap";

type Props = {
  select: () => void;
  cancel: () => void;
  save: { cb: () => void; pending: boolean } | null;
};

const LoadTableButtons = ({ select, cancel, save }: Props) => {
  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <ButtonGroup className="float-right">
        <Button className="btn-secondary" onClick={cancel}>
          Annuler
        </Button>
        {save ? (
          <Button className="btn-primary" onClick={save.cb}>
            {save.pending && <Spinner as="span" animation="border" size="sm" role="status" />}
            <span className="pl-1 pr-1">Sélectionner</span>
          </Button>
        ) : (
          <Button className="btn-primary" onClick={select}>
            Ouvrir
          </Button>
        )}
      </ButtonGroup>
    </Container>
  );
};

export default LoadTableButtons;
