import React, { FC, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { selectFormulaEdit, selectFormulaPending, setFormulaEdit, setFormulaPending } from "./_state/formulaStateSlice";
import { selectFormulaData, selectFormulaId, selectFormulaNeedsRefresh } from "./_state/formulaDataSlice";

import EditorCard from "@components/EditorCard";
import NameField from "@components/InfoCardElements/NameField";
import DescriptionField from "@components/InfoCardElements/DescriptionField";
import DateField from "@components/InfoCardElements/DateField";

import { loadFormula } from "./utils/loadData";
import { saveFormulaChanges } from "./utils/editRequests";

const FormulaInfos: FC = () => {
  const dispatch = useDispatch();
  const needsRefresh = useSelector(selectFormulaNeedsRefresh);
  const formulaId = useSelector(selectFormulaId);
  const editStates = useSelector(selectFormulaEdit);
  const pendingStates = useSelector(selectFormulaPending);

  useEffect(() => {
    const load = async () => {
      dispatch(setFormulaPending({ data: true }));
      await loadFormula(formulaId);
      dispatch(setFormulaPending({ data: false }));
    };
    if (needsRefresh) load();
  }, [dispatch, formulaId, needsRefresh]);

  return (
    <EditorCard>
      {!pendingStates.data && (
        <Row>
          <Col md={6} sm={12}>
            <NameField
              data={selectFormulaData}
              validate={saveFormulaChanges}
              edit={editStates.name}
              setEdit={(val: boolean) => dispatch(setFormulaEdit({ name: val }))}
              pending={pendingStates.name}
            />
            <DescriptionField
              data={selectFormulaData}
              validate={saveFormulaChanges}
              edit={editStates.description}
              setEdit={(val: boolean) => dispatch(setFormulaEdit({ description: val }))}
              pending={pendingStates.description}
            />
          </Col>
          <Col md={6} sm={12}>
            <DateField data={selectFormulaData} />
          </Col>
        </Row>
      )}
    </EditorCard>
  );
};

export default FormulaInfos;
