import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  disabled: boolean;
  clickCallback: () => void;
};

const LoadButton = ({ clickCallback, disabled }: Props) => {
  return (
    <Button className="btn-primary" disabled={disabled} onClick={clickCallback}>
      Ouvrir
    </Button>
  );
};

export default LoadButton;
