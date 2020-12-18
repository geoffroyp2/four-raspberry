import React, { useCallback } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dbDataRecord } from "@redux/dataReducers/dbDataSlice";

import { dateToDisplayString } from "@UIutils/dateFormat";
import ElementLinkButton from "../Buttons/ElementLinkButton";
import { loadRecord } from "@redux/dataReducers/recordSlice";
import { setCurrentTab } from "@redux/displayStateReducers/generalDisplaySlice";

type Props = {
  valueSelector: (state: RootState) => string[];
  addButton: boolean;
};

const RecordTableField = ({ valueSelector, addButton }: Props) => {
  const dispatch = useDispatch();
  const records = useSelector(dbDataRecord);
  const recordList = useSelector(valueSelector);

  const handleLinkCLick = useCallback(
    (id: string) => {
      dispatch(loadRecord(records[id]));
      dispatch(setCurrentTab("Record"));
    },
    [dispatch, records]
  );

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
                          <ElementLinkButton size={20} onClick={() => handleLinkCLick(p)} />
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
            </tbody>
          </Table>
        </Col>
      </Row>
      {divider}
    </>
  );
};

export default RecordTableField;
