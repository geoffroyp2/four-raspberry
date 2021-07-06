import { FC } from "react";

import TableTitle from "@components/tables/TableTitle";
import FormulaSearchField from "./FormulaSearchField";

const FormulaTableTitle: FC = () => {
  return <TableTitle searchField={<FormulaSearchField />} />;
};

export default FormulaTableTitle;
