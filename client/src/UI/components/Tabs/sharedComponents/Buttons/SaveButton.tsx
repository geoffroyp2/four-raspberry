import React from "react";
import { Button, Spinner } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
  pending: boolean;
};

const SaveButton = ({ clickCallback, pending }: Props) => {
  return (
    <Button className="btn-primary" onClick={clickCallback}>
      {pending && <Spinner as="span" animation="border" size="sm" role="status" />}
      <span className="pl-1">Enregistrer</span>
    </Button>
  );
};

export default SaveButton;
