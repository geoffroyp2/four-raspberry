import React, { useCallback, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { dbDataRecord, deleteRecord, updateRecord } from "@redux/dataReducers/dbDataSlice";
import {
  CurrentRecord,
  CurrentRecordID,
  loadRecord,
  memorizeRecord,
  rollbackRecordChanges,
} from "@redux/dataReducers/recordSlice";
import { RecordInfosEditMode, setRecordInfosEditMode } from "@redux/displayStateReducers/recordDisplaySlice";

import DeleteButton from "@UITabs/sharedComponents/Buttons/DeleteButton";

import db from "@db/handler";
import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";
import EditButton from "@UITabs/sharedComponents/Buttons/EditButton";
import LoadButton from "@UITabs/sharedComponents/Buttons/LoadButton";
import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import NewButton from "@UITabs/sharedComponents/Buttons/NewButton";
import { setLoadTableContent, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";

const RecordInfoCardButtons = () => {
  const dispatch = useDispatch();

  const editMode = useSelector(RecordInfosEditMode);
  const records = useSelector(dbDataRecord);
  const currentRecord = useSelector(CurrentRecord);
  const currentRecordID = useSelector(CurrentRecordID);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [SavePending, setSavePending] = useState<boolean>(false);
  const [NewPending, setNewPending] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    setDeletePending(true);
    await db.record.deleteOne(currentRecordID).then(() => {
      setDeletePending(false);
      dispatch(deleteRecord(currentRecordID)); // delete from the cached elements
      dispatch(loadRecord(Object.values(records)[0])); // auto-select another element after deletion
    });
  }, [currentRecordID, dispatch, records]);

  const handleSave = useCallback(async () => {
    setSavePending(true);
    await db.record.updateOne(currentRecord).then((res) => {
      setSavePending(false);
      dispatch(setRecordInfosEditMode(false));
      dispatch(updateRecord(res)); // update in cached elements
      dispatch(loadRecord(res)); // reload
    });
  }, [currentRecord, dispatch]);

  const handleEdit = useCallback(() => {
    dispatch(memorizeRecord());
    dispatch(setRecordInfosEditMode(true));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(rollbackRecordChanges());
    dispatch(setRecordInfosEditMode(false));
  }, [dispatch]);

  const handleLoad = useCallback(() => {
    dispatch(setLoadTableContent("Record"));
    dispatch(setLoadTableShow(true));
  }, [dispatch]);

  const handleNew = useCallback(async () => {
    setNewPending(true);
    await db.record.createOne().then((res) => {
      setNewPending(false);
      dispatch(updateRecord(res));
      dispatch(loadRecord(res));
    });
  }, [dispatch]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      {editMode ? (
        <CancelButton clickCallback={handleCancel} />
      ) : (
        <DeleteButton clickCallback={handleDelete} pending={DeletePending} disabled={currentRecordID === "default"} />
      )}
      <ButtonGroup>
        {editMode ? (
          <SaveButton pending={SavePending} clickCallback={handleSave} />
        ) : (
          <EditButton disabled={currentRecordID === "default"} clickCallback={handleEdit} />
        )}
        <LoadButton disabled={editMode} clickCallback={handleLoad} />
        <NewButton disabled={editMode} clickCallback={handleNew} pending={NewPending} />
      </ButtonGroup>
    </Container>
  );
};

export default RecordInfoCardButtons;
