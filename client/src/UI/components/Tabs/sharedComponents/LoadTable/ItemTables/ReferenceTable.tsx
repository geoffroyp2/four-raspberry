import React, { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { dbDataReference } from "@redux/dataReducers/dbDataSlice";
import { CurrentReferenceID } from "@redux/dataReducers/referenceSlice";
import {
  LoadTableRowSelected,
  LoadTableSort,
  setLoadTableRowSelected,
  setLoadTableSort,
} from "@redux/displayStateReducers/generalDisplaySlice";

import { LoadTableComponent, LoadTableHeaderCell } from "@UITabs/sharedComponents/LoadTable/Components/LoadTableComponent";

import { referenceLoadTableSort } from "@UIutils/loadTableFunctions";
import { dateToDisplayString } from "@UIutils/dateFormat";

const ReferenceTable = () => {
  const dispatch = useDispatch();

  const tableSort = useSelector(LoadTableSort);
  const rowSelected = useSelector(LoadTableRowSelected);

  const currentReferenceID = useSelector(CurrentReferenceID);
  const references = useSelector(dbDataReference);

  useEffect(() => {
    // To automatically highlight the current loaded element
    if (!rowSelected && rowSelected !== currentReferenceID) dispatch(setLoadTableRowSelected(currentReferenceID));
  }, [rowSelected, currentReferenceID, dispatch]);

  const handleSort = useCallback(
    (e) => {
      // Sort parameters when clicking on a header
      if (e.target.id === tableSort.param) {
        dispatch(setLoadTableSort({ param: e.target.id, direction: !tableSort.direction }));
      } else {
        dispatch(setLoadTableSort({ param: e.target.id, direction: true }));
      }
    },
    [dispatch, tableSort]
  );

  return (
    <LoadTableComponent
      header={
        <>
          <LoadTableHeaderCell id={"name"} label={"Nom"} width={30} onClick={handleSort} sort={tableSort} />
          <LoadTableHeaderCell id={"description"} label={"Description"} width={47} onClick={() => {}} sort={tableSort} />
          <LoadTableHeaderCell
            id={"lastUpdated"}
            label={"Dernière modification"}
            width={23}
            onClick={handleSort}
            sort={tableSort}
          />
        </>
      }
      body={Object.values(references)
        // TODO: search field
        // .filter(([key, value]) => {
        //   return filter ? currentGraph._id !== key && graphFilter(value, filter) : true;
        // })
        .sort((a, b) => referenceLoadTableSort(a, b, tableSort))
        .map((reference) => {
          return (
            <tr
              onClick={(e) => dispatch(setLoadTableRowSelected((e.target as HTMLTableRowElement).id))}
              id={reference._id}
              key={reference._id}
              className={reference._id === rowSelected ? "table-primary" : ""}
            >
              <td id={reference._id}>{reference.name}</td>
              <td id={reference._id}>{reference.description ? reference.description : "-"}</td>
              <td id={reference._id}>{dateToDisplayString(reference.lastUpdated, true)}</td>
            </tr>
          );
        })}
    />
  );
};

export default ReferenceTable;
