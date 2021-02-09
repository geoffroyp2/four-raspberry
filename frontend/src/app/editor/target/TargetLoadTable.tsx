import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTargetLoadAmount,
  selectTargetLoadPage,
  selectTargetLoadRowSelected,
  selectTargetPageAmount,
  setTargetLoadPage,
  setTargetLoadRowSelected,
} from "./_state/targetDisplaySlice";
import { selectTargetLoadList } from "./_state/targetDataSlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

import { loadTargetList } from "./utils/loadData";
import { selectLoadTables, setLoadTable } from "@editor/_state/editorSlice";

const tableColumns = ["Nom", "Description", "Four"];

type Props = {
  select: () => void;
};

const TargetLoadTable: FC<Props> = ({ select }) => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectTargetLoadPage);
  const amount = useSelector(selectTargetLoadAmount);
  const currentList = useSelector(selectTargetLoadList);
  const rowSelected = useSelector(selectTargetLoadRowSelected);
  const showTable = useSelector(selectLoadTables);

  const fetchData = useCallback(() => {
    loadTargetList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSetShow = useCallback(
    (val: boolean) => {
      dispatch(setLoadTable({ target: val }));
    },
    [dispatch]
  );

  return (
    <LoadTableModal
      show={showTable.target}
      setShow={handleSetShow}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      pagination={
        <LoadTablePagination
          pageAmount={selectTargetPageAmount}
          page={selectTargetLoadPage}
          setPage={setTargetLoadPage}
        />
      }
    >
      {currentList.map((e, i) => (
        <tr
          key={`rl${i}`}
          className={e.id === rowSelected ? "table-primary" : ""}
          onClick={() => dispatch(setTargetLoadRowSelected(e.id || -1))}
        >
          <td>{e.name}</td>
          <td>{e.description}</td>
          <td>{e.oven}</td>
        </tr>
      ))}
    </LoadTableModal>
  );
};

export default TargetLoadTable;
