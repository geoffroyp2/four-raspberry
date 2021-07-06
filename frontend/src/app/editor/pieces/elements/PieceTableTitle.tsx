import { FC } from "react";

import TableTitle from "@components/tables/TableTitle";
import PieceSearchField from "./PieceSearchField";

const PieceTableTitle: FC = () => {
  return <TableTitle searchField={<PieceSearchField />} />;
};

export default PieceTableTitle;
