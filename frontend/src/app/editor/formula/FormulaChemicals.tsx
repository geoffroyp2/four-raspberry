import React, { FC } from "react";
import { selectFormulaData } from "./_state/formulaDataSlice";

import ChemicalComposition from "@components/ChemicalComposition";
import EditorCard from "@components/EditorCard";

const FormulaChemicals: FC = () => {
  return (
    <EditorCard>
      <ChemicalComposition formula={selectFormulaData} />
    </EditorCard>
  );
};

export default FormulaChemicals;
