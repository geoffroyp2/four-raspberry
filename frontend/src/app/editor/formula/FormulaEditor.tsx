import React, { useCallback, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { setLoadTable } from "@editor/_state/editorSlice";
import { mainFrameClassName } from "@editor/_shared/styleElements";
import { selectFormulaData, selectFormulaId, setFormulaId, setFormulaNeedsRefresh } from "./_state/formulaDataSlice";
import { selectFormulaLoadRowSelected } from "./_state/formulaDisplaySlice";

import FormulaButtons from "./FormulaButtons";
import FormulaInfos from "./FormulaInfos";
import FormulaLoadTable from "./FormulaLoadTable";
import FormulaPieces from "./FormulaPieces";
import FormulaChemicals from "./FormulaChemicals";
// import TargetButtons from "./TargetButtons";
// import TargetGraph from "./TargetGraph";
// import TargetInfos from "./TargetInfos";
// import TargetLoadTable from "./TargetLoadTable";
// import TargetRecords from "./TargetRecords";
// import RecordPieces from "./RecordPieces";

const FormulaEditor = () => {
  const dispatch = useDispatch();
  const currentFormula = useSelector(selectFormulaData);
  const formulaId = useSelector(selectFormulaId);
  const rowSelected = useSelector(selectFormulaLoadRowSelected);

  // Detect need for refreshing data
  useEffect(() => {
    if (currentFormula.id !== formulaId) dispatch(setFormulaNeedsRefresh(true));
  }, [dispatch, currentFormula.id, formulaId]);

  const handleSelect = useCallback(() => {
    dispatch(setFormulaId(rowSelected));
    dispatch(setLoadTable({ formula: false }));
  }, [dispatch, rowSelected]);

  return (
    <Container fluid className={mainFrameClassName}>
      <FormulaButtons />
      <Row>
        <Col xl={6} md={12}>
          <FormulaInfos />
          <FormulaChemicals />
        </Col>
        <Col xl={6} md={12}>
          <FormulaPieces />
        </Col>
      </Row>

      <FormulaLoadTable select={handleSelect} />
    </Container>
  );
};

export default FormulaEditor;
