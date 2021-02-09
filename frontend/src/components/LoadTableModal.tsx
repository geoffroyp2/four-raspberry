import React, { useEffect, FC } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "./styles/loadTable.scss";

type Props = {
  show: boolean;
  setShow: (value: boolean) => void;
  fetchData: () => void;
  handleSelect: () => void;
  columns: string[];
  children: JSX.Element[];
  pagination: JSX.Element;
};

const LoadTableModal: FC<Props> = ({ show, setShow, fetchData, handleSelect, columns, children, pagination }) => {
  useEffect(() => {
    if (show) fetchData();
  }, [show, fetchData]);

  return (
    <Modal centered show={show} backdrop="static" onHide={() => setShow(false)} dialogClassName="modal-loadTable">
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
        {pagination}
        <Button onClick={handleSelect}> Ouvrir</Button>
        <Button onClick={() => setShow(false)}> Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoadTableModal;
