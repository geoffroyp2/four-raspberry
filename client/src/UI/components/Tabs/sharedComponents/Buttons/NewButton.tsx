import React from "react";
import { Button, Spinner } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
  pending: boolean;
  disabled: boolean;
};

const NewButton = ({ clickCallback, pending, disabled }: Props) => {
  return (
    <Button className="btn-info" disabled={disabled} onClick={clickCallback}>
      {pending && <Spinner as="span" animation="border" size="sm" role="status" />}
      <span className="pl-1 pr-1">Nouveau</span>
    </Button>
  );
};

export default NewButton;
