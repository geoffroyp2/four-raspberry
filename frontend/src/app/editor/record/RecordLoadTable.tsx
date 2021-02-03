import { Record } from "@baseTypes/database/GQLResTypes";
import React, { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { selectRecordShowLoad, setRecordShowLoad } from "./state/recordDisplaySlice";
import { fetchRecordPage } from "./state/request";
import "./styles/modal.scss";

const amountPerPage = 10;

const RecordLoadTable = () => {
  const dispatch = useDispatch();
  const showLoad = useSelector(selectRecordShowLoad);

  const [recordPage, setRecordPage] = useState<Record[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  /** TODO: à déporter et stocker les résultats dans le store */
  useEffect(() => {
    const fetch = async () => {
      const recordRes = await fetchRecordPage(currentPage, amountPerPage);
      setAmount(recordRes.records.count);
      setRecordPage(recordRes.records.rows);
    };
    fetch();
  }, []);

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
            {recordPage.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.oven}</td>
                <td>{e.target?.name || "-"}</td>
              </tr>
            ))}
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
