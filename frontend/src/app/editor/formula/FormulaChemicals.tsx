import React, { FC } from "react";
import "./styles/formulaStyles.scss";

import { selectFormulaData } from "./_state/formulaDataSlice";

import ChemicalComposition from "@components/ChemicalComposition";
import EditorCard from "@components/EditorCard";
import CollapsableZone from "@components/CollapsableZone";
import ChemicalEditTable from "./ChemicalEditTable";

const FormulaChemicals: FC = () => {
  return (
    <EditorCard>
      <ChemicalComposition formula={selectFormulaData} />
      <CollapsableZone className="formula-chemical">
        <ChemicalEditTable />
      </CollapsableZone>
    </EditorCard>
  );
};

export default FormulaChemicals;
