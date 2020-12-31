import React, { useCallback, useState } from "react";
import { Container } from "react-bootstrap";

import db from "@db/handler";

import { useDispatch, useSelector } from "react-redux";
import { CurrentRecord, rollbackRecordChanges } from "@redux/dataReducers/recordSlice";
import { setRecordPointEditMode } from "@redux/displayStateReducers/recordDisplaySlice";

import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";

const RecordPointEditButtons = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(CurrentRecord);

  const [PendingState, setPendingState] = useState<boolean>(false);

  const cancel = useCallback(() => {
    dispatch(rollbackRecordChanges());
    dispatch(setRecordPointEditMode(false));
  }, [dispatch]);

  const save = useCallback(async () => {
    setPendingState(true);
    await db.record.updateSimple({ ...currentRecord, points: [...currentRecord.points].sort((a, b) => a.x - b.x) });
    setPendingState(false);
    dispatch(setRecordPointEditMode(false));
  }, [dispatch, currentRecord]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      <CancelButton clickCallback={cancel} />
      <SaveButton clickCallback={save} pending={PendingState} />
    </Container>
  );
};

export default RecordPointEditButtons;
