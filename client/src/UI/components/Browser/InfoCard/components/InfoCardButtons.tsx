import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";

type Props = {
  select: () => void;
};

const ProgramInfosButtons = ({ select }: Props) => {
  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [CreatePending, setCreatePending] = useState<boolean>(false);

  const deleteGraph = useCallback(() => {
    console.log("delete");
  }, []);
  const createGraph = useCallback(() => {
    console.log("create");
  }, []);

  return (
    <Row className="mr-2 mb-2 ml-2 justify-content-between align-items-end">
      <Button className="btn-danger" onClick={deleteGraph}>
        {DeletePending && <Spinner as="span" animation="border" size="sm" role="status" />}
        <span className="pl-1 pr-1">Supprimer</span>
      </Button>

      <ButtonGroup className="float-left">
        <Button className="btn-info" onClick={createGraph}>
          {CreatePending && <Spinner as="span" animation="border" size="sm" role="status" />}
          <span className="pl-1 pr-1">Nouveau</span>
        </Button>
        <Button className="btn-primary " onClick={select}>
          Ouvrir
        </Button>
      </ButtonGroup>
    </Row>
  );
};
export default ProgramInfosButtons;
