import React, { FC, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectLoadTables, setLoadTable } from "@editor/_state/editorSlice";
import {
  selectPieceLoadAmount,
  selectPieceLoadPage,
  selectPieceLoadRowSelected,
  selectPiecePageAmount,
  setPieceLoadPage,
  setPieceLoadRowSelected,
} from "./_state/pieceDisplaySlice";
import { selectPieceLoadList } from "./_state/pieceDataSlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

import { loadPieceList } from "./utils/queries";

const tableColumns = ["Nom", "Description", "Émail"];

type Props = {
  select: () => void;
};

const PieceLoadTable: FC<Props> = ({ select }) => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectPieceLoadPage);
  const amount = useSelector(selectPieceLoadAmount);
  const currentList = useSelector(selectPieceLoadList);
  const rowSelected = useSelector(selectPieceLoadRowSelected);
  const showTable = useSelector(selectLoadTables);

  const fetchData = useCallback(() => {
    loadPieceList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSetShow = useCallback(
    (val: boolean) => {
      dispatch(setLoadTable({ piece: val }));
    },
    [dispatch]
  );

  return (
    <LoadTableModal
      show={showTable.piece}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      handleCancel={() => handleSetShow(false)}
      pagination={
        <LoadTablePagination pageAmount={selectPiecePageAmount} page={selectPieceLoadPage} setPage={setPieceLoadPage} />
      }
    >
      {currentList.map((e, i) => (
        <tr
          key={`rl${i}`}
          className={e.id === rowSelected ? "table-primary" : ""}
          onClick={() => dispatch(setPieceLoadRowSelected(e.id || -1))}
        >
          <td>{e.name}</td>
          <td>{e.description}</td>
          <td>{e.formula?.name || "-"}</td>
        </tr>
      ))}
    </LoadTableModal>
  );
};

export default PieceLoadTable;
