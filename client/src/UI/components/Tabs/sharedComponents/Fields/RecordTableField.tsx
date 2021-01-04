import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dbDataRecord } from "@redux/dataReducers/dbDataSlice";
import { loadRecord } from "@redux/dataReducers/recordSlice";
import { changeTab } from "@reduxStore/UIState";

import ElementDeleteButton from "../Buttons/ElementDeleteButton";
import ElementLinkButton from "../Buttons/ElementLinkButton";

import { dateToDisplayString } from "@UIutils/dateFormat";

type Props = {
  editSelector: (state: RootState) => boolean;
  valueSelector: (state: RootState) => string[];
  handleRemoveRecord: (id: string) => void;
  handleAddRecord: () => void;
  addButton: boolean;
};

const RecordTableField = ({ editSelector, valueSelector, handleRemoveRecord, handleAddRecord, addButton }: Props) => {
  const dispatch = useDispatch();
  const records = useSelector(dbDataRecord);
  const recordList = useSelector(valueSelector);
  const editMode = useSelector(editSelector);

  const handleLinkCLick = (id: string) => {
    dispatch(loadRecord(records[id]));
    changeTab("Record");
  };

  return (
    <>
      <Row className={infoRow}>
        <Col className={infoLeftCol}>Courbes de Cuisson</Col>
        <Col className={infoMidCol}>
          <Table size="sm" variant="dark" striped bordered className="mb-2">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recordList.length > 0 ? (
                [...recordList]
                  .sort((a, b) => {
                    return records[a].name.localeCompare(records[b].name);
                  })
                  .map((p, i) => {
                    return (
                      <tr key={`PointsPreview${i}`}>
                        <td>{records[p].name}</td>
                        <td>{dateToDisplayString(records[p].date, false)}</td>
                        <td>
                          {addButton && editMode ? (
                            <ElementDeleteButton size={20} onClick={() => handleRemoveRecord(p)} />
                          ) : (
                            <ElementLinkButton size={20} onClick={() => handleLinkCLick(p)} />
                          )}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <tr>
                  <td>-</td>
                  <td>-</td>
                  <td></td>
                </tr>
              )}
              {addButton && (
                <tr>
                  <td colSpan={3}>
                    <Button className="btn-secondary btn-sm float-left" onClick={handleAddRecord}>
                      Ajouter une Cuisson
                    </Button>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default RecordTableField;
