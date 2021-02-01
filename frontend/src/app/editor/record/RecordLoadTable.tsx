import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { selectRecordShowLoad, setRecordShowLoad } from "./state/recordDisplaySlice";
import "./styles/modal.scss";

const RecordLoadTable = () => {
  const dispatch = useDispatch();
  const showLoad = useSelector(selectRecordShowLoad);

  return (
    <Modal centered show={showLoad} onHide={() => dispatch(setRecordShowLoad(false))} dialogClassName="modal-loadTable">
      <Modal.Body>
        <Table striped bordered hover className="table-sm" variant="dark">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Four</th>
              <th>Courbe de Référence</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A</td>
              <td>B</td>
              <td>C</td>
              <td>D</td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button> Ouvrir</Button>
        <Button> Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecordLoadTable;
