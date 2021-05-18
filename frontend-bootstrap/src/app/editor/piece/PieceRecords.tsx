import React, { useCallback } from "react";
import { Container } from "react-bootstrap";
import "./styles/pieceStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { setRecordId } from "@editor/record/_state/recordDataSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import EditorCard from "@components/EditorCard";
import RecordTable from "@components/Tables/RecordTable";
import GotoIcon from "@src/assets/GotoIcon";
import { selectPieceData } from "./_state/pieceDataSlice";

const PieceRecords = () => {
  const dispatch = useDispatch();
  const currentPiece = useSelector(selectPieceData);

  const handleGoto = useCallback(
    (id: number) => {
      dispatch(setRecordId(id));
      dispatch(setCurrentScreen("record"));
    },
    [dispatch]
  );

  const getContent = () => {
    if (currentPiece.records)
      return currentPiece.records.map((e, i) => (
        <tr key={`rpt${i}`}>
          <td>{e.name}</td>
          <td className="goto">
            <GotoIcon onClick={() => handleGoto(e.id || 0)} />
          </td>
        </tr>
      ));
    else return <></>;
  };

  return (
    <EditorCard className="pieceRecords">
      <Container fluid>
        <label>Cuissons</label>
      </Container>
      <RecordTable>{getContent()}</RecordTable>
    </EditorCard>
  );
};

export default PieceRecords;
