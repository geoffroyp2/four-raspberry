import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
  disabled: boolean;
};

const EditButton = ({ clickCallback, disabled }: Props) => {
  return (
    <Button className="btn-primary" onClick={clickCallback} disabled={disabled}>
      Modifier
    </Button>
  );
};

export default EditButton;
