import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectLoadTables, setLoadTable } from "@editor/_state/editorSlice";

import LoadTableModal from "@components/LoadTableModal";
import LoadTablePagination from "@components/LoadTablePagination";
import {
  selectChemicalLoadAmount,
  selectChemicalLoadPage,
  selectChemicalLoadRowSelected,
  selectChemicalPageAmount,
  setChemicalLoadPage,
  setChemicalLoadRowSelected,
} from "./_state/chemicalDisplaySlice";
import { selectChemicalLoadList } from "./_state/chemicalDataSlice";

import { loadChemicalList } from "./utils/queries";

const tableColumns = ["Nom", "Nom Chimique", "version"];

type Props = {
  select: () => void;
  cancel: () => void;
};

const ChemicalLoadTable: FC<Props> = ({ select }) => {
  const dispatch = useDispatch();
  const loadPage = useSelector(selectChemicalLoadPage);
  const amount = useSelector(selectChemicalLoadAmount);
  const currentList = useSelector(selectChemicalLoadList);
  const rowSelected = useSelector(selectChemicalLoadRowSelected);
  const showTable = useSelector(selectLoadTables);

  const fetchData = useCallback(() => {
    loadChemicalList(loadPage, amount);
  }, [loadPage, amount]);

  const handleSetShow = useCallback(
    (val: boolean) => {
      dispatch(setLoadTable({ chemical: val }));
    },
    [dispatch]
  );

  return (
    <LoadTableModal
      show={showTable.chemical}
      fetchData={fetchData}
      columns={tableColumns}
      handleSelect={select}
      handleCancel={() => handleSetShow(false)}
      pagination={
        <LoadTablePagination pageAmount={selectChemicalPageAmount} page={selectChemicalLoadPage} setPage={setChemicalLoadPage} />
      }
    >
      {currentList.map((e, i) => (
        <tr
          key={`rl${i}`}
          className={e.id === rowSelected ? "table-primary" : ""}
          onClick={() => dispatch(setChemicalLoadRowSelected(e.id || -1))}
        >
          <td>{e.name}</td>
          <td>{e.chemicalName}</td>
          <td>{e.currentVersion}</td>
        </tr>
      ))}
    </LoadTableModal>
  );
};

export default ChemicalLoadTable;
