import React, { useCallback, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { CurrentRecordID, memorizeRecord } from "@redux/dataReducers/recordSlice";
import { RecordInfosEditMode, setRecordInfosEditMode } from "@redux/displayStateReducers/recordDisplaySlice";
import { cancelChanges, showLoadTable } from "@reduxStore/UIState";

import db from "@db/handler";

import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";
import EditButton from "@UITabs/sharedComponents/Buttons/EditButton";
import LoadButton from "@UITabs/sharedComponents/Buttons/LoadButton";
import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import NewButton from "@UITabs/sharedComponents/Buttons/NewButton";
import DeleteButton from "@UITabs/sharedComponents/Buttons/DeleteButton";

const RecordInfoCardButtons = () => {
  const dispatch = useDispatch();

  const editMode = useSelector(RecordInfosEditMode);
  const currentRecordID = useSelector(CurrentRecordID);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [SavePending, setSavePending] = useState<boolean>(false);
  const [NewPending, setNewPending] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    setDeletePending(true);
    await db.record.deleteSelected();
    setDeletePending(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSavePending(true);
    await db.record.updateSimple();
    setSavePending(false);
    dispatch(setRecordInfosEditMode(false));
  }, [dispatch]);

  const handleNew = useCallback(async () => {
    setNewPending(true);
    await db.record.createOne();
    setNewPending(false);
  }, []);

  const handleEdit = useCallback(() => {
    dispatch(memorizeRecord());
    dispatch(setRecordInfosEditMode(true));
  }, [dispatch]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      {editMode ? (
        <CancelButton clickCallback={() => cancelChanges("Record")} />
      ) : (
        <DeleteButton clickCallback={handleDelete} pending={DeletePending} disabled={currentRecordID === "default"} />
      )}
      <ButtonGroup>
        {editMode ? (
          <SaveButton pending={SavePending} clickCallback={handleSave} />
        ) : (
          <EditButton disabled={currentRecordID === "default"} clickCallback={handleEdit} />
        )}
        <LoadButton disabled={editMode} clickCallback={() => showLoadTable("Record")} />
        <NewButton disabled={editMode} clickCallback={handleNew} pending={NewPending} />
      </ButtonGroup>
    </Container>
  );
};

export default RecordInfoCardButtons;
