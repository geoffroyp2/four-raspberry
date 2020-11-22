import React, { useCallback, useState } from "react";
import { Button, ButtonGroup, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import db from "../../../../../db/handler";
import { addGraph, deleteSelectedGraph, selectedGraphId } from "../../../../redux/reducers/graphs/graphSlice";

type Props = {
  select: () => void;
};

const ProgramInfosButtons = ({ select }: Props) => {
  const dispatch = useDispatch();
  const graphId = useSelector(selectedGraphId);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [CreatePending, setCreatePending] = useState<boolean>(false);

  const handleDeleteGraph = useCallback(() => {
    setDeletePending(true);
    db.deleteGraph(graphId, () => {
      setDeletePending(false);
      dispatch(deleteSelectedGraph());
    });
  }, [graphId, dispatch]);

  const handleCreateGraph = useCallback(() => {
    setCreatePending(true);
    db.createNewGraph({ graphType: true }, (newGraph) => {
      setCreatePending(false);
      dispatch(addGraph(newGraph));
    });
  }, [dispatch]);

  return (
    <Row className="mr-2 mb-2 ml-2 justify-content-between align-items-end">
      <Button className="btn-danger" onClick={handleDeleteGraph}>
        {DeletePending && <Spinner as="span" animation="border" size="sm" role="status" />}
        <span className="pl-1 pr-1">Supprimer</span>
      </Button>

      <ButtonGroup className="float-left">
        <Button className="btn-info" onClick={handleCreateGraph}>
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
