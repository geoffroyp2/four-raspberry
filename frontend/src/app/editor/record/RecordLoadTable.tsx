import React, { useCallback } from "react";

import { batch, useDispatch, useSelector } from "react-redux";
import { store } from "../../../store/store";
import { selectRecordLoadList, setCurrentRecordId, setRecordLoadList } from "./state/recordDataSlice";
import {
  selectRecordShowLoad,
  selectRecordLoadPage,
  selectRecordLoadAmount,
  selectRecordLoadRowSelected,
  setRecordTotalAmount,
  setRecordShowLoad,
  setRecordLoadPage,
  setRecordLoadRowSelected,
  selectRecordPageAmount,
} from "./state/recordDisplaySlice";

import { fetchRecordPage } from "./state/request";
import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

const loadRecordList = async (page: number, amount: number) => {
  const recordRes = await fetchRecordPage(page, amount);
  batch(() => {
    store.dispatch(setRecordTotalAmount(recordRes.records.count));
    store.dispatch(setRecordLoadList(recordRes.records.rows));
  });
};

const tableColumns = ["Nom", "Description", "Four", "Courbe de référence"];

const RecordLoadTable = () => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectRecordLoadPage);
  const amount = useSelector(selectRecordLoadAmount);
  const currentList = useSelector(selectRecordLoadList);
  const rowSelected = useSelector(selectRecordLoadRowSelected);

  const fetchData = useCallback(() => {
    loadRecordList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSelect = useCallback(() => {
    dispatch(setCurrentRecordId(rowSelected));
    dispatch(setRecordShowLoad(false));
  }, [dispatch, rowSelected]);

  return (
    <LoadTableModal
      show={selectRecordShowLoad}
      setShow={setRecordShowLoad}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={handleSelect}
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
