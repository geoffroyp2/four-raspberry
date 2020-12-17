import React from "react";
import { Button } from "react-bootstrap";

type Props = {
  clickCallback: () => void;
};

const CancelButton = ({ clickCallback }: Props) => {
  return (
    <Button className={"btn-danger"} onClick={clickCallback}>
      Annuler
    </Button>
  );
};

export default CancelButton;
