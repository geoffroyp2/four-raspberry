import React, { useCallback, useState } from "react";
import { Button, Container } from "react-bootstrap";
import "./styles/recordStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData } from "./_state/recordDataSlice";
import { setLoadTable } from "@editor/_state/editorSlice";

import ConfirmationModal from "@components/ConfirmationModal";

import { createRecord, deleteRecord } from "./utils/editRequests";

const RecordButtons = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const [ShowConfirm, setShowConfirm] = useState<boolean>(false);

  const handleConfirm = useCallback(() => {
    deleteRecord(currentRecord.id || 0);
    setShowConfirm(false);
  }, [currentRecord]);

  return (
    <Container fluid className="record-buttons pr-md-4 pr-sm-2 pr-xs-0">
      <Button className="" onClick={() => dispatch(setLoadTable({ record: true }))}>
        Ouvrir
      </Button>
      <Button className="btn-info" onClick={createRecord}>
        Nouveau
      </Button>
      <Button className="btn-danger" onClick={() => setShowConfirm(true)}>
        Supprimer
      </Button>
      <ConfirmationModal
        show={ShowConfirm}
        setShow={setShowConfirm}
        confirm={handleConfirm}
        name={currentRecord.name || ""}
      />
    </Container>
  );
};

export default RecordButtons;
