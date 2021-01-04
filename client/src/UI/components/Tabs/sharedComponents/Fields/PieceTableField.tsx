import React, { useCallback } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { infoLeftCol, infoMidCol, infoRow, divider } from "../styles/InfoZoneStyles";

import { RootState } from "@src/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { dbDataPiece } from "@redux/dataReducers/dbDataSlice";
import { loadPiece } from "@redux/dataReducers/pieceSlice";
import { changeTab } from "@reduxStore/UIState";

import ElementLinkButton from "../Buttons/ElementLinkButton";

import { dateToDisplayString } from "@UIutils/dateFormat";

type Props = {
  valueSelector: (state: RootState) => string[];
  addButton: boolean;
};

const PieceTableField = ({ valueSelector, addButton }: Props) => {
  const dispatch = useDispatch();
  const pieces = useSelector(dbDataPiece);
  const pieceList = useSelector(valueSelector);

  const handleLinkCLick = useCallback(
    (id: string) => {
      dispatch(loadPiece(pieces[id]));
      changeTab("Piece");
    },
    [dispatch, pieces]
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
              {pieceList.length > 0 ? (
                [...pieceList]
                  .sort((a, b) => {
                    return pieces[a].name.localeCompare(pieces[b].name);
                  })
                  .map((p, i) => {
                    return (
                      <tr key={`PointsPreview${i}`}>
                        <td>{pieces[p].name}</td>
                        <td>{dateToDisplayString(pieces[p].date, false)}</td>
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

export default PieceTableField;
