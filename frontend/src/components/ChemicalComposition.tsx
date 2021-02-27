import React, { FC } from "react";
import { Formula } from "@baseTypes/database/GQLResTypes";
import { Doughnut } from "react-chartjs-2";
import { RootState } from "@app/store";
import { useSelector } from "react-redux";
import { buildCompositionData } from "./utils/buildCompositionData";
import { compositionOptions } from "./utils/compositionOptions";

type Props = {
  formula: (state: RootState) => Formula;
};

const ChemicalComposition: FC<Props> = ({ formula }) => {
  const currentFormula = useSelector(formula);

  const data = buildCompositionData(currentFormula);
  console.log(data);

  return <Doughnut data={data} options={compositionOptions} />;
};

export default ChemicalComposition;
