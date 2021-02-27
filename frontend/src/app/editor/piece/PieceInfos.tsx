import React, { FC, useCallback, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import EditorCard from "@components/EditorCard";
import { selectPieceEdit, selectPiecePending, setPieceEdit, setPiecePending } from "./_state/pieceStateSlice";
import { selectPieceData, selectPieceId, selectPieceNeedsRefresh } from "./_state/pieceDataSlice";
import { setLoadTable } from "@editor/_state/editorSlice";
import { setCurrentScreen } from "@navBar/MainNavSlice";

import NameField from "@components/InfoCardElements/NameField";
import DescriptionField from "@components/InfoCardElements/DescriptionField";
import DateField from "@components/InfoCardElements/DateField";
import FormulaField from "@components/InfoCardElements/FormulaField";

import { savePieceChanges } from "./utils/editRequests";
import { loadPiece } from "./utils/loadData";
import { setFormulaId } from "@editor/formula/_state/formulaDataSlice";

const PieceInfos: FC = () => {
  const dispatch = useDispatch();
  const needsRefresh = useSelector(selectPieceNeedsRefresh);
  const pieceId = useSelector(selectPieceId);
  const piece = useSelector(selectPieceData);
  const editStates = useSelector(selectPieceEdit);
  const pendingStates = useSelector(selectPiecePending);

  useEffect(() => {
    const load = async () => {
      dispatch(setPiecePending({ data: true }));
      await loadPiece(pieceId);
      dispatch(setPiecePending({ data: false }));
    };
    if (needsRefresh) load();
  }, [dispatch, pieceId, needsRefresh]);

  const handleGoto = useCallback(() => {
    if (piece.formula?.id) {
      dispatch(setFormulaId(piece.formula.id));
      dispatch(setCurrentScreen("formula"));
    }
  }, [dispatch, piece]);

  return (
    <EditorCard>
      {!pendingStates.data && (
        <Row>
          <Col md={6} sm={12}>
            <NameField
              data={selectPieceData}
              validate={savePieceChanges}
              edit={editStates.name}
              setEdit={(val: boolean) => dispatch(setPieceEdit({ name: val }))}
              pending={pendingStates.name}
            />
            <DescriptionField
              data={selectPieceData}
              validate={savePieceChanges}
              edit={editStates.description}
              setEdit={(val: boolean) => dispatch(setPieceEdit({ description: val }))}
              pending={pendingStates.description}
            />
          </Col>
          <Col md={6} sm={12}>
            <FormulaField
              data={selectPieceData}
              setShowTable={(val: boolean) => dispatch(setLoadTable({ formula: val }))}
              goto={handleGoto}
            />
            <DateField data={selectPieceData} />
          </Col>
        </Row>
      )}
    </EditorCard>
  );
};

export default PieceInfos;
