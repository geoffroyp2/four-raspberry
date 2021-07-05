import { FC } from "react";
import { useSelector } from "react-redux";
import { selectFormulaData } from "./_state/formulaDataSlice";
import SimplePieChart from "@components/graphs/SimplePieChart";

const FormulaComposition: FC = () => {
  const formula = useSelector(selectFormulaData);

  return <SimplePieChart ingredients={formula.ingredients ?? []} />;
};

export default FormulaComposition;
