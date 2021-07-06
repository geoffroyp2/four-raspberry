import { FC } from "react";

import TableTitle from "@components/tables/TableTitle";
import RecordSearchField from "./RecordSearchField";

const RecordTableTitle: FC = () => {
  return <TableTitle searchField={<RecordSearchField />} />;
};

export default RecordTableTitle;
