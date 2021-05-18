import React, { FC } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./styles/modalTables.scss";

type Props = {
  show: boolean;
  data: null; // TODO
  handleSave: () => void;
  handleCancel: () => void;
  columns: string[];
  children: JSX.Element | JSX.Element[];
};

const EditTableModal: FC<Props> = ({ show, data, handleSave, handleCancel, columns, children }) => {
  return (
    <Modal centered show={show} backdrop="static" onHide={handleCancel} dialogClassName="modal-editTable">
      <Modal.Body>
        <Table striped bordered hover className="table-sm" variant="dark">
          <thead>
            <tr>
              {columns.map((e) => (
                <th key={`${e}col`}>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSave}>Sauvegarder</Button>
        <Button onClick={handleCancel}>Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditTableModal;
