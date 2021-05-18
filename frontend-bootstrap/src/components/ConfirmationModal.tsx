import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";
import "./styles/confirmation.scss";

type Props = {
  show: boolean;
  setShow: (val: boolean) => void;
  confirm: () => void;
  name: string;
};

const ConfirmationModal: FC<Props> = ({ show, setShow, confirm, name }) => {
  return (
    <Modal className="confirmation" centered show={show} backdrop="static" onHide={() => setShow(false)}>
      <Modal.Body>Supprimer {name} ?</Modal.Body>
      <Modal.Footer>
        <Button className="btn-danger" onClick={() => setShow(false)}>
          Annuler
        </Button>
        <Button className="btn-success" onClick={confirm}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
