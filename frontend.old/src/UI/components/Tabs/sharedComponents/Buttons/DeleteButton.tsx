import React, { useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
  pending: boolean;
  disabled: boolean;
};

const DeleteButton = ({ clickCallback, pending, disabled }: Props) => {
  const [Confirm, setConfirm] = useState<boolean>(false);

  return (
    <ButtonGroup>
      <Button className={"btn-danger"} onClick={() => setConfirm(!Confirm)} disabled={disabled}>
        {pending && <Spinner as="span" animation="border" size="sm" role="status" />}
        <span className="pl-1 pr-1">{Confirm ? "Annuler" : "Supprimer"}</span>
      </Button>
      {Confirm && (
        <Button
          className="btn-success"
          onClick={() => {
            setConfirm(false);
            clickCallback();
          }}
        >
          Confirmer
        </Button>
      )}
    </ButtonGroup>
  );
};

export default DeleteButton;
