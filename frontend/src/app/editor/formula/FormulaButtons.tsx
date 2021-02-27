import React, { useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./styles/formulaStyles.scss";
import "../_shared/styles.scss";

import { useDispatch, useSelector } from "react-redux";
import { setLoadTable } from "@editor/_state/editorSlice";
import { selectFormulaData } from "./_state/formulaDataSlice";

import ConfirmationModal from "@components/ConfirmationModal";

import { createFormula, deleteFormula } from "./utils/editRequests";

const FormulaButtons = () => {
  const dispatch = useDispatch();
  const currentFormula = useSelector(selectFormulaData);
  const [ShowConfirm, setShowConfirm] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    deleteFormula(currentFormula.id || 0);
    setShowConfirm(false);
  }, [currentFormula]);

  return (
    <Container fluid className="top-buttons d-flex justify-content-end mb-2">
      <Button className="" onClick={() => dispatch(setLoadTable({ formula: true }))}>
        Ouvrir
      </Button>
      <Button className="btn-info" onClick={createFormula}>
        Nouveau
      </Button>
      <Button className="btn-danger" onClick={() => setShowConfirm(true)}>
        Supprimer
      </Button>
      <ConfirmationModal
        show={ShowConfirm}
        setShow={setShowConfirm}
        confirm={handleConfirm}
        name={currentFormula.name || ""}
      />
    </Container>
  );
};

export default FormulaButtons;
