import React, { FC } from "react";
import { Formula } from "@baseTypes/database/GQLResTypes";
import { Doughnut } from "react-chartjs-2";
import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { buildCompositionData } from "./utils/buildCompositionData";

type Props = {
  formula: (state: RootState) => Formula;
};

const ChemicalComposition: FC<Props> = ({ formula }) => {
  const currentFormula = useSelector(formula);

  const data = buildCompositionData(currentFormula);

  return <Doughnut data={data} />;
};

export default ChemicalComposition;
