import React from "react";

import { useSelector } from "react-redux";
import { LoadTableContent } from "@redux/displayStateReducers/generalDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";
import LoadTableButtons from "./Components/LoadTableButtons";

import RecordTable from "./ItemTables/RecordTable";
import ReferenceTable from "./ItemTables/ReferenceTable";
import PieceTable from "./ItemTables/PieceTable";

const tables = {
  Record: <RecordTable />,
  Reference: <ReferenceTable />,
  Piece: <PieceTable />, //<PieceTable />,
  Formula: <></>, //<FormulaTable />,
};

type Props = {
  select: () => void;
  cancel: () => void;
  save: { cb: () => void; pending: boolean } | null;
};

const LoadTable = ({ select, cancel, save }: Props) => {
  const content = useSelector(LoadTableContent);

  return (
    <MainZoneLayout
      fullSpace={tables[content]}
      leftColButtons={<LoadTableButtons select={select} cancel={cancel} save={save} />}
    />
  );
};

export default LoadTable;
