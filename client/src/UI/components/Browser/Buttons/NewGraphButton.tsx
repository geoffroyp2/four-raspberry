import React, { useCallback, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addGraph } from "../../../redux/reducers/graphSlice";

import db from "../../../../db/handler";

const NewGraphButton = () => {
  const dispatch = useDispatch();
  const [Pending, setPending] = useState<boolean>(false);

  const handleCreateGraph = useCallback(() => {
    setPending(true);
    db.createNewGraph({ graphType: true }, (newGraph) => {
      setPending(false);
      dispatch(addGraph(newGraph));
    });
  }, [dispatch]);

  return (
    <Button className="btn-info" onClick={handleCreateGraph}>
      {Pending && <Spinner as="span" animation="border" size="sm" role="status" />}
      <span className="pl-1 pr-1">Nouveau</span>
    </Button>
  );
};

export default NewGraphButton;
