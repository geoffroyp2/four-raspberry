import React, { FC, useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { mainFrameClassName } from "@editor/_shared/styleElements";

import { useDispatch, useSelector } from "react-redux";
import { selectPieceData, selectPieceId, setPieceId, setPieceNeedsRefresh } from "./_state/pieceDataSlice";
import { selectPieceLoadRowSelected } from "./_state/pieceDisplaySlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import { selectFormulaLoadRowSelected } from "@editor/formula/_state/formulaDisplaySlice";

import PieceButtons from "./PieceButtons";
import PieceInfos from "./PieceInfos";
import PiecePhotos from "./PiecePhotos";
import PieceLoadTable from "./PieceLoadTable";
import PieceRecords from "./PieceRecords";
import FormulaLoadTable from "@editor/formula/FormulaLoadTable";
import { linkPieceFormula } from "./utils/mutations";

const PieceEditor: FC = () => {
  const dispatch = useDispatch();
  const currentPiece = useSelector(selectPieceData);
  const pieceId = useSelector(selectPieceId);

  const PieceRowSelected = useSelector(selectPieceLoadRowSelected);
  const FormulaRowSelected = useSelector(selectFormulaLoadRowSelected);

  useEffect(() => {
    if (currentPiece.id !== pieceId) dispatch(setPieceNeedsRefresh(true));
  }, [dispatch, currentPiece.id, pieceId]);

  const handleLoadPiece = useCallback(() => {
    dispatch(setPieceId(PieceRowSelected));
    dispatch(setLoadTable({ piece: false }));
  }, [dispatch, PieceRowSelected]);

  const handleLinkFormula = useCallback(() => {
    linkPieceFormula(currentPiece.id || 0, FormulaRowSelected || 0);
    dispatch(setLoadTable({ formula: false }));
  }, [dispatch, FormulaRowSelected, currentPiece]);

  return (
    <Container fluid className={mainFrameClassName}>
      <PieceButtons />
      <Row>
        <Col xl={6} md={12}>
          <PieceInfos />
          <PiecePhotos />
        </Col>
        <Col xl={6} md={12}>
          <PieceRecords />
        </Col>
      </Row>

      <PieceLoadTable select={handleLoadPiece} />
      <FormulaLoadTable select={handleLinkFormula} />
    </Container>
  );
};

export default PieceEditor;
