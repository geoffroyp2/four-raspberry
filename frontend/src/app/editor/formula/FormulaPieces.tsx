import React, { useCallback } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import "./styles/formulaStyles.scss";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaPieceDisplay, setFormulaPieceDisplay } from "./_state/formulaDisplaySlice";
import { selectFormulaData } from "./_state/formulaDataSlice";
import { setPieceId } from "@editor/piece/_state/pieceDataSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import EditorCard from "@components/EditorCard";
import PieceTable from "@components/Tables/PieceTable";
import ListIcon from "@src/assets/ListIcon";
import TileIcon from "@src/assets/TileIcon";
import GotoIcon from "@src/assets/GotoIcon";

const FormulaPieces = () => {
  const dispatch = useDispatch();
  const currentFormula = useSelector(selectFormulaData);
  const currentPieceDisplay = useSelector(selectFormulaPieceDisplay);

  const handleGoto = useCallback(
    (id: number) => {
      dispatch(setPieceId(id));
      dispatch(setCurrentScreen("piece"));
    },
    [dispatch]
  );

  const getContent = () => {
    if (currentFormula.pieces)
      switch (currentPieceDisplay) {
        case "list":
          return (
            <PieceTable formulaColumn={false}>
              {currentFormula.pieces.map((e, i) => (
                <tr key={`rpt${i}`}>
                  <td>{e.name}</td>
                  <td className="goto">
                    <GotoIcon onClick={() => handleGoto(e.id || 0)} />
                  </td>
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
          <Button className="btn-secondary" onClick={() => dispatch(setFormulaPieceDisplay("list"))}>
            <ListIcon />
          </Button>
          <Button className="btn-secondary" onClick={() => dispatch(setFormulaPieceDisplay("grid"))}>
            <TileIcon />
          </Button>
        </ButtonGroup>
      </Container>
      {getContent()}
    </EditorCard>
  );
};

export default FormulaPieces;
