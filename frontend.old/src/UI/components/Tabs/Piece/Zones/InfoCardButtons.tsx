import React, { useCallback, useState } from "react";
import { ButtonGroup, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { CurrentPieceID, memorizePiece } from "@redux/dataReducers/pieceSlice";
import { PieceInfosEditMode, setPieceInfosEditMode } from "@redux/displayStateReducers/pieceDisplaySlice";
import { cancelChanges, showLoadTable } from "@reduxStore/UIState";

import db from "@db/handler";

import SaveButton from "@UITabs/sharedComponents/Buttons/SaveButton";
import EditButton from "@UITabs/sharedComponents/Buttons/EditButton";
import LoadButton from "@UITabs/sharedComponents/Buttons/LoadButton";
import CancelButton from "@UITabs/sharedComponents/Buttons/CancelButton";
import NewButton from "@UITabs/sharedComponents/Buttons/NewButton";
import DeleteButton from "@UITabs/sharedComponents/Buttons/DeleteButton";

const PieceInfoCardButtons = () => {
  const dispatch = useDispatch();

  const editMode = useSelector(PieceInfosEditMode);
  const currentPieceID = useSelector(CurrentPieceID);

  const [DeletePending, setDeletePending] = useState<boolean>(false);
  const [SavePending, setSavePending] = useState<boolean>(false);
  const [NewPending, setNewPending] = useState<boolean>(false);

  const handleDelete = useCallback(async () => {
    setDeletePending(true);
    await db.piece.deleteSelected();
    setDeletePending(false);
  }, []);

  const handleSave = useCallback(async () => {
    setSavePending(true);
    await db.piece.updateSimple();
    setSavePending(false);
    dispatch(setPieceInfosEditMode(false));
  }, [dispatch]);

  const handleNew = useCallback(async () => {
    setNewPending(true);
    await db.piece.createOne();
    setNewPending(false);
  }, []);

  const handleEdit = useCallback(() => {
    dispatch(memorizePiece());
    dispatch(setPieceInfosEditMode(true));
  }, [dispatch]);

  return (
    <Container fluid className="d-flex justify-content-between align-items-center">
      {editMode ? (
        <CancelButton clickCallback={() => cancelChanges("Piece")} />
      ) : (
        <DeleteButton clickCallback={handleDelete} pending={DeletePending} disabled={currentPieceID === "default"} />
      )}
      <ButtonGroup>
        {editMode ? (
          <SaveButton pending={SavePending} clickCallback={handleSave} />
        ) : (
          <EditButton disabled={currentPieceID === "default"} clickCallback={handleEdit} />
        )}
        <LoadButton disabled={editMode} clickCallback={() => showLoadTable("Piece")} />
        <NewButton disabled={editMode} clickCallback={handleNew} pending={NewPending} />
      </ButtonGroup>
    </Container>
  );
};

export default PieceInfoCardButtons;
