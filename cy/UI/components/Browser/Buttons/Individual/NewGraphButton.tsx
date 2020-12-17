import React, { useCallback, useState } from "react";
import { Button, Spinner } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addGraph } from "@redux/+old/graphSlice";
import { editState } from "@redux/UIControlsSlice";

import db from "@db/handler";

const NewGraphButton = () => {
  const dispatch = useDispatch();
  const [Pending, setPending] = useState<boolean>(false);
  const editMode = useSelector(editState);

  const handleCreateGraph = useCallback(async () => {
    setPending(true);
    await db.createNewGraph().then((res) => {
      setPending(false);
      dispatch(addGraph(res));
    });
  }, [dispatch]);

  return (
    <Button className="btn-info" disabled={editMode} onClick={handleCreateGraph}>
      {Pending && <Spinner as="span" animation="border" size="sm" role="status" />}
      <span className="pl-1 pr-1">Nouveau</span>
    </Button>
  );
};

export default NewGraphButton;
