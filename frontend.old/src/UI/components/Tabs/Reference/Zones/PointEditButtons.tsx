import React, { useCallback, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { setReferencePointEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";
import { cancelChanges } from "@reduxStore/UIState";

import db from "@db/handler";

import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";

const ReferencePointEditButtons = () => {
  const dispatch = useDispatch();

  const [PendingState, setPendingState] = useState<boolean>(false);

  const save = useCallback(async () => {
    setPendingState(true);
    await db.reference.updateSimple();
    setPendingState(false);
    dispatch(setReferencePointEditMode(false));
  }, [dispatch]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <CancelButton clickCallback={() => cancelChanges("Reference")} />
      <SaveButton clickCallback={save} pending={PendingState} />
    </Container>
  );
};

export default ReferencePointEditButtons;
