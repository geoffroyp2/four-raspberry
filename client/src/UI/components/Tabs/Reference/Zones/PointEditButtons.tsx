import React, { useCallback, useState } from "react";
import { Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { CurrentReference, rollbackReferenceChanges } from "@redux/dataReducers/referenceSlice";
import { setReferencePointEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";

import db from "@db/handler";

import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";

const ReferencePointEditButtons = () => {
  const dispatch = useDispatch();
  const currentReference = useSelector(CurrentReference);

  const [PendingState, setPendingState] = useState<boolean>(false);

  const cancel = useCallback(() => {
    dispatch(rollbackReferenceChanges());
    dispatch(setReferencePointEditMode(false));
  }, [dispatch]);

  const save = useCallback(async () => {
    setPendingState(true);
    await db.reference.updateSimple({ ...currentReference, points: [...currentReference.points].sort((a, b) => a.x - b.x) });
    setPendingState(false);
    dispatch(setReferencePointEditMode(false));
  }, [dispatch, currentReference]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <CancelButton clickCallback={cancel} />
      <SaveButton clickCallback={save} pending={PendingState} />
    </Container>
  );
};

export default ReferencePointEditButtons;
