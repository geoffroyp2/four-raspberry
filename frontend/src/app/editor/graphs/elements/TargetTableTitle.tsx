import { FC } from "react";

import TableTitle from "@components/tables/TableTitle";
import TargetSearchField from "./TargetSearchField";

const TargetTableTitle: FC = () => {
  return <TableTitle searchField={<TargetSearchField />} />;
};

export default TargetTableTitle;
