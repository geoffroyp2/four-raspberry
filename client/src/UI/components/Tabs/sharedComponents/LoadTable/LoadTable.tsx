import React from "react";

import { LoadTableContent } from "@redux/displayStateReducers/generalDisplaySlice";

import MainZoneLayout from "@UIGeneric/MainZoneLayout";
import LoadTableButtons from "./Components/LoadTableButtons";

import RecordTable from "./ItemTables/RecordTable";
import { useSelector } from "react-redux";
import ReferenceTable from "./ItemTables/ReferenceTable";

const tables = {
  Record: <RecordTable />,
  Reference: <ReferenceTable />,
  Piece: <></>, //<PieceTable />,
  Formula: <></>, //<FormulaTable />,
};

type Props = {
  select: () => void;
  cancel: () => void;
  save: { cb: () => void; pending: boolean } | null;
};

const LoadTable = ({ select, cancel, save }: Props) => {
  const content = useSelector(LoadTableContent);

  return <MainZoneLayout left={[tables[content], <LoadTableButtons select={select} cancel={cancel} save={save} />]} />;
};

export default LoadTable;
