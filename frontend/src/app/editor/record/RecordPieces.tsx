import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import "./styles/recordStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordData } from "./_state/recordDataSlice";
import { selectRecordPieceDisplay, setRecordPieceDisplay } from "./_state/recordDisplaySlice";

import EditorCard from "@components/EditorCard";
import PieceTable from "@components/Tables/PieceTable";
import ListIcon from "@src/assets/ListIcon";
import TileIcon from "@src/assets/TileIcon";

const RecordPieces = () => {
  const dispatch = useDispatch();
  const currentRecord = useSelector(selectRecordData);
  const currentPieceDisplay = useSelector(selectRecordPieceDisplay);

  const getContent = () => {
    if (currentRecord.pieces)
      switch (currentPieceDisplay) {
        case "list":
          return (
            <PieceTable>
              {currentRecord.pieces?.map((e, i) => (
                <tr key={`rpt${i}`}>
                  <td>{e.name}</td>
                  <td>{e.formula?.name || "-"}</td>
                </tr>
              ))}
            </PieceTable>
          );
        case "grid":
          return <></>;
      }
    return <></>;
  };

  return (
    <EditorCard className="record-pieces">
      <Container fluid>
        <label>Potteries</label>
        <ButtonGroup>
          <Button className="btn-secondary" onClick={() => dispatch(setRecordPieceDisplay("list"))}>
            <ListIcon />
          </Button>
          <Button className="btn-secondary" onClick={() => dispatch(setRecordPieceDisplay("grid"))}>
            <TileIcon />
          </Button>
        </ButtonGroup>
      </Container>
      {getContent()}
    </EditorCard>
  );
};

export default RecordPieces;
