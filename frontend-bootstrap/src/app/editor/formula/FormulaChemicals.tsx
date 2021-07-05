import React, { FC, useState } from "react";
import { Button } from "react-bootstrap";
import "./styles/formulaStyles.scss";

import { useDispatch } from "react-redux";
import { resetFormulaTempIngredients, selectFormulaData } from "./_state/formulaDataSlice";

import ChemicalEditTable from "./ChemicalEditTable";
import ChemicalComposition from "@components/ChemicalComposition";
import EditorCard from "@components/EditorCard";
import EditTableModal from "@components/EditTableModal";

const FormulaChemicals: FC = () => {
  const dispatch = useDispatch();
  const [ShowModal, setShowModal] = useState<boolean>(false);

  const handleCancel = () => {
    setShowModal(false);
    dispatch(resetFormulaTempIngredients());
  };

  return (
    <>
      <EditTableModal show={ShowModal} data={null} handleSave={() => {}} handleCancel={handleCancel} columns={[]}>
        <ChemicalEditTable />
      </EditTableModal>
      <EditorCard>
        <div className="composition-container">
          <ChemicalComposition formula={selectFormulaData} />
          <Button onClick={() => setShowModal(true)}>Composition</Button>
        </div>
      </EditorCard>
    </>
  );
};

export default FormulaChemicals;
