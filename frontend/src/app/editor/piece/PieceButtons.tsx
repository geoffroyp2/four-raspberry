import React, { FC, useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceData } from "./_state/pieceDataSlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import ConfirmationModal from "@components/ConfirmationModal";

import { createPiece, deletePiece } from "./utils/editRequests";

const PieceButtons: FC = () => {
  const dispatch = useDispatch();
  const currentPiece = useSelector(selectPieceData);
  const [ShowConfirm, setShowConfirm] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    deletePiece(currentPiece.id || 0);
    setShowConfirm(false);
  }, [currentPiece]);

  return (
    <Container fluid className="top-buttons pr-md-4 pr-sm-2 pr-xs-0">
      <Button className="" onClick={() => dispatch(setLoadTable({ piece: true }))}>
        Ouvrir
      </Button>
      <Button className="btn-info" onClick={createPiece}>
        Nouveau
      </Button>
      <Button className="btn-danger" onClick={() => setShowConfirm(true)}>
        Supprimer
      </Button>
      <ConfirmationModal
        show={ShowConfirm}
        setShow={setShowConfirm}
        confirm={handleConfirm}
        name={currentPiece.name || ""}
      />
    </Container>
  );
};

export default PieceButtons;
