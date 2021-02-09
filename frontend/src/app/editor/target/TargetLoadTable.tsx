import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTargetLoadAmount,
  selectTargetLoadPage,
  selectTargetLoadRowSelected,
  selectTargetPageAmount,
  selectTargetShowLoad,
  setTargetLoadPage,
  setTargetLoadRowSelected,
  setTargetShowLoad,
} from "./state/targetDisplaySlice";
import { selectTargetLoadList } from "./state/targetDataSlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

import { loadTargetList } from "./utils/loadData";

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

  const fetchData = useCallback(() => {
    loadTargetList(loadPage, amount);
  }, [loadPage, amount]);

  return (
    <LoadTableModal
      show={selectTargetShowLoad}
      setShow={setTargetShowLoad}
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
