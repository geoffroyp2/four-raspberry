import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
  disabled: boolean;
};

const PointEditButton = ({ clickCallback, disabled }: Props) => {
  return (
    <Button className="btn-secondary btn-sm mt-1 float-right" onClick={clickCallback} disabled={disabled}>
      Modifier les points
    </Button>
  );
};

export default PointEditButton;
