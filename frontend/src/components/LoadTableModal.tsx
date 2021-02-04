import { RootState } from "@store/store";
import React, { useEffect } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./styles/modal.scss";

type Props = {
  show: (state: RootState) => boolean;
  setShow: (payload: boolean) => void;
  fetchData: () => void;
  handleSelect: () => void;
  columns: string[];
  children: JSX.Element[];
  pagination: JSX.Element;
};

const LoadTableModal = ({ show, setShow, fetchData, handleSelect, columns, children, pagination }: Props) => {
  const dispatch = useDispatch();
  const showTable = useSelector(show);

  useEffect(() => {
    if (showTable) fetchData();
  }, [showTable, fetchData]);

  return (
    <Modal centered show={showTable} onHide={() => dispatch(setShow(false))} dialogClassName="modal-loadTable">
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
        <Button onClick={() => dispatch(setShow(false))}> Annuler</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoadTableModal;
