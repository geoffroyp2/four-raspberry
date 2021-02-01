import React, { useCallback, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { ReferenceInfosEditMode, setReferenceInfosEditMode } from "@redux/displayStateReducers/referenceDisplaySlice";
import { CurrentReferenceID, memorizeReference } from "@redux/dataReducers/referenceSlice";
import { cancelChanges, showLoadTable } from "@reduxStore/UIState";

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
  const currentReferenceID = useSelector(CurrentReferenceID);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [SavePending, setSavePending] = useState<boolean>(false);
  const [NewPending, setNewPending] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    setDeletePending(true);
    await db.reference.deleteSelected();
    setDeletePending(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSavePending(true);
    await db.reference.updateSimple();
    setSavePending(false);
    dispatch(setReferenceInfosEditMode(false));
  }, [dispatch]);

  const handleNew = useCallback(async () => {
    setNewPending(true);
    await db.reference.createOne();
    setNewPending(false);
  }, []);

  const handleEdit = useCallback(() => {
    dispatch(memorizeReference());
    dispatch(setReferenceInfosEditMode(true));
  }, [dispatch]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      {editMode ? (
        <CancelButton clickCallback={() => cancelChanges("Reference")} />
      ) : (
        <DeleteButton clickCallback={handleDelete} pending={DeletePending} disabled={currentReferenceID === "default"} />
      )}
      <ButtonGroup>
        {editMode ? (
          <SaveButton pending={SavePending} clickCallback={handleSave} />
        ) : (
          <EditButton disabled={currentReferenceID === "default"} clickCallback={handleEdit} />
        )}
        <LoadButton disabled={editMode} clickCallback={() => showLoadTable("Reference")} />
        <NewButton disabled={editMode} clickCallback={handleNew} pending={NewPending} />
      </ButtonGroup>
    </Container>
  );
};

export default ReferenceInfoCardButtons;
