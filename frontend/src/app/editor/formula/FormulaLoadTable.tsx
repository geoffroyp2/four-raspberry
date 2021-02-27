import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectLoadTables, setLoadTable } from "@editor/_state/editorSlice";
import { selectFormulaLoadList } from "./_state/formulaDataSlice";
import {
  selectFormulaLoadAmount,
  selectFormulaLoadPage,
  selectFormulaLoadRowSelected,
  selectFormulaPageAmount,
  setFormulaLoadPage,
  setFormulaLoadRowSelected,
} from "./_state/formulaDisplaySlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";

import { loadFormulaList } from "./utils/loadData";

const tableColumns = ["Nom", "Description"];

type Props = {
  select: () => void;
};

const FormulaLoadTable: FC<Props> = ({ select }) => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectFormulaLoadPage);
  const amount = useSelector(selectFormulaLoadAmount);
  const currentList = useSelector(selectFormulaLoadList);
  const rowSelected = useSelector(selectFormulaLoadRowSelected);
  const showTable = useSelector(selectLoadTables);

  const fetchData = useCallback(() => {
    loadFormulaList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSetShow = useCallback(
    (val: boolean) => {
      dispatch(setLoadTable({ formula: val }));
    },
    [dispatch]
  );

  return (
    <LoadTableModal
      show={showTable.formula}
      setShow={handleSetShow}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      pagination={
        <LoadTablePagination
          pageAmount={selectFormulaPageAmount}
          page={selectFormulaLoadPage}
          setPage={setFormulaLoadPage}
        />
      }
    >
      {currentList.map((e, i) => (
        <tr
          key={`rl${i}`}
          className={e.id === rowSelected ? "table-primary" : ""}
          onClick={() => dispatch(setFormulaLoadRowSelected(e.id || -1))}
        >
          <td>{e.name}</td>
          <td>{e.description}</td>
        </tr>
      ))}
    </LoadTableModal>
  );
};

export default FormulaLoadTable;
