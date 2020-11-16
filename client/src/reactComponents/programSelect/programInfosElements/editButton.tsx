import React from "react";
import { Button, Spinner } from "react-bootstrap";

type Props = {
  buttonState: boolean;
  pendingState: boolean;
  disabled: boolean;
  onEdit: () => void;
  onValid: () => void;
};

const EditButton = ({
  buttonState,
  pendingState,
  disabled,
  onEdit,
  onValid,
}: Props) => {
  return (
    <Button
      className="btn-secondary btn-sm float-right"
      onClick={buttonState ? onValid : onEdit}
      disabled={disabled}
    >
      {pendingState && (
        <Spinner as="span" animation="border" size="sm" role="status" />
      )}
      <span className="pl-1">{buttonState ? "Valider" : "Edit"}</span>
    </Button>
  );
};

export default EditButton;
