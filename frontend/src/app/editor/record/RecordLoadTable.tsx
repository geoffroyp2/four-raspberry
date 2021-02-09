import React, { FC, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectRecordLoadList } from "./state/recordDataSlice";
import {
  selectRecordShowLoad,
  selectRecordLoadPage,
  selectRecordLoadAmount,
  selectRecordLoadRowSelected,
  setRecordShowLoad,
  setRecordLoadPage,
  setRecordLoadRowSelected,
  selectRecordPageAmount,
} from "./state/recordDisplaySlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";
import { loadRecordList } from "./utils/loadData";

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

  const fetchData = useCallback(() => {
    loadRecordList(loadPage, amount);
  }, [loadPage, amount]);

  return (
    <LoadTableModal
      show={selectRecordShowLoad}
      setShow={setRecordShowLoad}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      pagination={
        <LoadTablePagination
          pageAmount={selectRecordPageAmount}
          page={selectRecordLoadPage}
          setPage={setRecordLoadPage}
        />
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
