import React, { useCallback, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setLoadTableContent, setLoadTableShow } from "@redux/displayStateReducers/generalDisplaySlice";
import { ReferenceInfosEditMode, setReferenceInfosEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";
import {
  CurrentReference,
  CurrentReferenceID,
  memorizeReference,
  rollbackReferenceChanges,
} from "@redux/dataReducers/referenceSlice";

import db from "@db/handler";

import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";
import EditButton from "@UITabs/sharedComponents/Buttons/EditButton";
import LoadButton from "@UITabs/sharedComponents/Buttons/LoadButton";
import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import NewButton from "@UITabs/sharedComponents/Buttons/NewButton";
import DeleteButton from "@UITabs/sharedComponents/Buttons/DeleteButton";

const ReferenceInfoCardButtons = () => {
  const dispatch = useDispatch();

  const editMode = useSelector(ReferenceInfosEditMode);
  const currentReference = useSelector(CurrentReference);
  const currentReferenceID = useSelector(CurrentReferenceID);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [SavePending, setSavePending] = useState<boolean>(false);
  const [NewPending, setNewPending] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    setDeletePending(true);
    await db.reference.deleteOne(currentReferenceID);
    setDeletePending(false);
  }, [currentReferenceID]);

  const handleSave = useCallback(async () => {
    setSavePending(true);
    await db.reference.updateSimple(currentReference);
    setSavePending(false);
    dispatch(setReferenceInfosEditMode(false));
  }, [currentReference, dispatch]);

  const handleEdit = useCallback(() => {
    dispatch(memorizeReference());
    dispatch(setReferenceInfosEditMode(true));
  }, [dispatch]);

  const handleCancel = useCallback(() => {
    dispatch(rollbackReferenceChanges());
    dispatch(setReferenceInfosEditMode(false));
  }, [dispatch]);

  const handleLoad = useCallback(() => {
    dispatch(setLoadTableContent("Reference"));
    dispatch(setLoadTableShow(true));
  }, [dispatch]);

  const handleNew = useCallback(async () => {
    setNewPending(true);
    await db.reference.createOne();
    setNewPending(false);
  }, []);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      {editMode ? (
        <CancelButton clickCallback={handleCancel} />
      ) : (
        <DeleteButton clickCallback={handleDelete} pending={DeletePending} disabled={currentReferenceID === "default"} />
      )}
      <ButtonGroup>
        {editMode ? (
          <SaveButton pending={SavePending} clickCallback={handleSave} />
        ) : (
          <EditButton disabled={currentReferenceID === "default"} clickCallback={handleEdit} />
        )}
        <LoadButton disabled={editMode} clickCallback={handleLoad} />
        <NewButton disabled={editMode} clickCallback={handleNew} pending={NewPending} />
      </ButtonGroup>
    </Container>
  );
};

export default ReferenceInfoCardButtons;
