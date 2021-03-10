import React, { useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "../_shared/styles.scss";
import "./styles/targetStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { setLoadTable } from "@editor/_state/editorSlice";
import { selectTargetData } from "./_state/targetDataSlice";
import { createTarget, deleteTarget } from "./utils/mutations";

import ConfirmationModal from "@components/ConfirmationModal";

const TargetButtons = () => {
  const dispatch = useDispatch();
  const currentTarget = useSelector(selectTargetData);
  const [ShowConfirm, setShowConfirm] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    deleteTarget(currentTarget.id || 0);
    setShowConfirm(false);
  }, [currentTarget]);

  return (
    <Container fluid className="top-buttons d-flex justify-content-end mb-2">
      <Button className="" onClick={() => dispatch(setLoadTable({ target: true }))}>
        Ouvrir
      </Button>
      <Button className="btn-info" onClick={createTarget}>
        Nouveau
      </Button>
      <Button className="btn-danger" onClick={() => setShowConfirm(true)}>
        Supprimer
      </Button>
      <ConfirmationModal
        show={ShowConfirm}
        setShow={setShowConfirm}
        confirm={handleConfirm}
        name={currentTarget.name || ""}
      />
    </Container>
  );
};

export default TargetButtons;
