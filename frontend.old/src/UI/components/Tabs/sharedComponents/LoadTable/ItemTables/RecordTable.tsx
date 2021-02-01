import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { dbDataRecord, dbDataReference } from "@redux/dataReducers/dbDataSlice";
import { CurrentRecordID } from "@redux/dataReducers/recordSlice";
import {
  LoadTableRowSelected,
  LoadTableSort,
  setLoadTableRowSelected,
  setLoadTableSort,
} from "@redux/displayStateReducers/generalDisplaySlice";

import { LoadTableComponent, LoadTableHeaderCell } from "@UITabs/sharedComponents/LoadTable/Components/LoadTableComponent";

import { recordLoadTableSort } from "@UIutils/loadTableFunctions";
import { dateToDisplayString } from "@UIutils/dateFormat";

const RecordTable = () => {
  const dispatch = useDispatch();

  const tableSort = useSelector(LoadTableSort);
  const rowSelected = useSelector(LoadTableRowSelected);

  const currentRecordID = useSelector(CurrentRecordID);
  const records = useSelector(dbDataRecord);
  const references = useSelector(dbDataReference);

  useEffect(() => {
    // To automatically highlight the current loaded element
    if (!rowSelected && rowSelected !== currentRecordID) dispatch(setLoadTableRowSelected(currentRecordID));
  }, [rowSelected, currentRecordID, dispatch]);

  const handleSort = (e: any) => {
    // Sort parameters when clicking on a header
    if (e.target.id === tableSort.param) {
      dispatch(setLoadTableSort({ param: e.target.id, direction: !tableSort.direction }));
    } else {
      dispatch(setLoadTableSort({ param: e.target.id, direction: true }));
    }
  };

  return (
    <LoadTableComponent
      header={
        <>
          <LoadTableHeaderCell id={"name"} label={"Nom"} width={30} onClick={handleSort} sort={tableSort} />
          <LoadTableHeaderCell id={"reference"} label={"Courbe de Référence"} width={30} onClick={handleSort} sort={tableSort} />
          <LoadTableHeaderCell id={"date"} label={"Date de cuisson"} width={17} onClick={handleSort} sort={tableSort} />
          <LoadTableHeaderCell
            id={"lastUpdated"}
            label={"Dernière modification"}
            width={23}
            onClick={handleSort}
            sort={tableSort}
          />
        </>
      }
      body={Object.values(records)
        // TODO: search field
        // .filter(([key, value]) => {
        //   return filter ? currentGraph._id !== key && graphFilter(value, filter) : true;
        // })
        .sort((a, b) => recordLoadTableSort(a, b, tableSort))
        .map((record) => {
          return (
            <tr
              onClick={(e) => dispatch(setLoadTableRowSelected((e.target as HTMLTableRowElement).id))}
              id={record._id}
              key={record._id}
              className={record._id === rowSelected ? "table-primary" : ""}
            >
              <td id={record._id}>{record.name}</td>
              <td id={record._id}>{record.reference ? references[record.reference].name : "-"}</td>
              <td id={record._id}>{dateToDisplayString(record.date, false)}</td>
              <td id={record._id}>{dateToDisplayString(record.lastUpdated, true)}</td>
            </tr>
          );
        })}
    />
  );
};

export default RecordTable;
