import React, { FC, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { selectRecordLoadList } from "./_state/recordDataSlice";
import {
  selectRecordLoadPage,
  selectRecordLoadAmount,
  selectRecordLoadRowSelected,
  setRecordLoadPage,
  setRecordLoadRowSelected,
  selectRecordPageAmount,
} from "./_state/recordDisplaySlice";
import { selectLoadTables, setLoadTable } from "@editor/_state/editorSlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

import { loadRecordList } from "./utils/queries";

const tableColumns = ["Nom", "Description", "Four", "Courbe de référence"];

type Props = {
  select: () => void;
};

const RecordLoadTable: FC<Props> = ({ select }) => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectRecordLoadPage);
  const amount = useSelector(selectRecordLoadAmount);
  const currentList = useSelector(selectRecordLoadList);
  const rowSelected = useSelector(selectRecordLoadRowSelected);
  const showTable = useSelector(selectLoadTables);

  const fetchData = useCallback(() => {
    loadRecordList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSetShow = useCallback(
    (val: boolean) => {
      dispatch(setLoadTable({ record: val }));
    },
    [dispatch]
  );

  return (
    <LoadTableModal
      show={showTable.record}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      handleCancel={() => handleSetShow(false)}
      pagination={
        <LoadTablePagination pageAmount={selectRecordPageAmount} page={selectRecordLoadPage} setPage={setRecordLoadPage} />
      }
    >
      {currentList.map((e, i) => (
        <tr
          key={`rl${i}`}
          className={e.id === rowSelected ? "table-primary" : ""}
          onClick={() => dispatch(setRecordLoadRowSelected(e.id || -1))}
        >
          <td>{e.name}</td>
          <td>{e.description}</td>
          <td>{e.oven}</td>
          <td>{e.target?.name || "-"}</td>
        </tr>
      ))}
    </LoadTableModal>
  );
};

export default RecordLoadTable;
